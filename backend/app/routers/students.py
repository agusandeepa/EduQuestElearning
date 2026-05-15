from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app import models, schemas
from app.auth import hash_password, decode_token
from datetime import datetime, date, timedelta

router = APIRouter(
    prefix="/api/students",
    tags=["Students"]
)


def get_current_student(request: Request, db: Session) -> models.Student | None:
    """Bearer token ගෙන් current student ගන්න"""
    auth = request.headers.get("Authorization", "")
    if not auth.startswith("Bearer "):
        return None
    token = auth[7:]
    payload = decode_token(token)
    if not payload:
        return None
    student_id = payload.get("sub")
    if not student_id or student_id == "admin":
        return None
    return db.query(models.Student).filter(models.Student.id == int(student_id)).first()


@router.get("/leaderboard", response_model=List[schemas.StudentResponse])
def get_leaderboard(limit: int = 50, db: Session = Depends(get_db)):
    """Top students by XP for leaderboard"""
    students = (
        db.query(models.Student)
        .filter(models.Student.is_active == True, models.Student.is_admin == False)
        .order_by(models.Student.total_xp.desc())
        .limit(limit)
        .all()
    )
    return students


@router.get("/", response_model=List[schemas.StudentResponse])
def get_all_students(db: Session = Depends(get_db)):
    """All active students"""
    return db.query(models.Student).filter(models.Student.is_active == True).all()

@router.post("/register", response_model=schemas.StudentResponse)
def register_student(student: schemas.StudentCreate, db: Session = Depends(get_db)):
    """නව student කෙනෙක් register කරන්න"""
    
    # Check if username already exists
    existing_user = db.query(models.Student).filter(
        models.Student.username == student.username
    ).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists")
    
    # Check if email already exists
    existing_email = db.query(models.Student).filter(
        models.Student.email == student.email
    ).first()
    if existing_email:
        raise HTTPException(status_code=400, detail="Email already exists")
    
    # Create new student with bcrypt password hashing
    new_student = models.Student(
        username=student.username,
        email=student.email,
        full_name=student.full_name,
        hashed_password=hash_password(student.password),
    )
    
    db.add(new_student)
    db.commit()
    db.refresh(new_student)
    
    return new_student

@router.get("/{student_id}", response_model=schemas.StudentResponse)
def get_student(student_id: int, db: Session = Depends(get_db)):
    """Student එකෙක්ගේ profile ගන්න"""
    student = db.query(models.Student).filter(models.Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    return student


@router.put("/{student_id}/xp")
def update_student_xp(student_id: int, request: Request, db: Session = Depends(get_db)):
    """Student ගේ XP update කරන්න — lesson complete වූ විට call කරන්න"""
    import json as _json
    body = {}
    try:
        import asyncio
        body = asyncio.get_event_loop().run_until_complete(request.json())
    except Exception:
        pass

    student = db.query(models.Student).filter(models.Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    xp_to_add = body.get("xp_to_add", 0)
    if xp_to_add > 0:
        student.total_xp += xp_to_add
        db.commit()
        db.refresh(student)

    return {
        "id": student.id,
        "total_xp": student.total_xp,
        "level": (student.total_xp // 100) + 1,
        "current_streak": student.current_streak,
    }


@router.put("/{student_id}/streak")
async def update_student_streak(student_id: int, request: Request, db: Session = Depends(get_db)):
    """Login කරද්දී streak update කරන්න"""
    student = db.query(models.Student).filter(models.Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    today = date.today()
    last_active = student.last_activity_date
    last_date = last_active.date() if last_active else None

    if last_date == today:
        pass  # Already active today
    elif last_date == today - timedelta(days=1):
        student.current_streak += 1
        if student.current_streak > student.longest_streak:
            student.longest_streak = student.current_streak
    elif last_date is None or last_date < today - timedelta(days=1):
        student.current_streak = 1

    student.last_activity_date = datetime.utcnow()
    db.commit()
    db.refresh(student)

    return {
        "id": student.id,
        "current_streak": student.current_streak,
        "longest_streak": student.longest_streak,
        "total_xp": student.total_xp,
    }


@router.get("/{student_id}/progress", response_model=List[schemas.LessonProgressResponse])
def get_student_progress(student_id: int, db: Session = Depends(get_db)):
    """Student එකෙක්ගේ lesson progress ගන්න"""
    progress = db.query(models.LessonProgress).filter(
        models.LessonProgress.student_id == student_id
    ).all()
    return progress

@router.post("/{student_id}/progress", response_model=schemas.LessonProgressResponse)
def update_lesson_progress(
    student_id: int,
    progress_data: schemas.LessonProgressCreate,
    db: Session = Depends(get_db)
):
    """Lesson progress update කරන්න — XP ද auto-update"""
    
    # Check if progress already exists
    existing_progress = db.query(models.LessonProgress).filter(
        models.LessonProgress.student_id == student_id,
        models.LessonProgress.lesson_id == progress_data.lesson_id
    ).first()
    
    xp_already_awarded = False

    if existing_progress:
        was_completed = existing_progress.is_completed
        existing_progress.is_completed = progress_data.is_completed
        existing_progress.completion_percentage = progress_data.completion_percentage
        existing_progress.best_score = max(existing_progress.best_score, progress_data.best_score)
        existing_progress.attempts += 1
        existing_progress.last_accessed_at = datetime.utcnow()
        
        if progress_data.is_completed and not was_completed:
            existing_progress.completed_at = datetime.utcnow()
        else:
            xp_already_awarded = True  # Already completed before, don't re-award XP
        
        db.commit()
        db.refresh(existing_progress)
        result = existing_progress
    else:
        new_progress = models.LessonProgress(
            student_id=student_id,
            lesson_id=progress_data.lesson_id,
            is_completed=progress_data.is_completed,
            is_unlocked=True,
            completion_percentage=progress_data.completion_percentage,
            best_score=progress_data.best_score,
            attempts=1
        )
        
        if progress_data.is_completed:
            new_progress.completed_at = datetime.utcnow()
        
        db.add(new_progress)
        db.commit()
        db.refresh(new_progress)
        result = new_progress

    # Auto-award XP to student when lesson completed for the first time
    if progress_data.is_completed and not xp_already_awarded:
        lesson = db.query(models.Lesson).filter(models.Lesson.id == progress_data.lesson_id).first()
        student = db.query(models.Student).filter(models.Student.id == student_id).first()
        if lesson and student:
            student.total_xp += lesson.xp_reward
            # Update streak
            today = date.today()
            last_active = student.last_activity_date
            last_date = last_active.date() if last_active else None
            if last_date != today:
                if last_date == today - timedelta(days=1):
                    student.current_streak += 1
                    if student.current_streak > student.longest_streak:
                        student.longest_streak = student.current_streak
                elif last_date is None or last_date < today - timedelta(days=1):
                    student.current_streak = 1
                student.last_activity_date = datetime.utcnow()
            db.commit()

    return result
