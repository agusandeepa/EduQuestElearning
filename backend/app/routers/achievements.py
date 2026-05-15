from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app import models, schemas
from datetime import datetime

router = APIRouter(
    prefix="/api/achievements",
    tags=["Achievements"]
)

@router.get("/", response_model=List[schemas.AchievementResponse])
def get_all_achievements(db: Session = Depends(get_db)):
    """සියලුම achievements ගන්න"""
    achievements = db.query(models.Achievement).all()
    return achievements

@router.get("/student/{student_id}", response_model=List[schemas.StudentAchievementResponse])
def get_student_achievements(student_id: int, db: Session = Depends(get_db)):
    """Student එකෙක්ගේ unlocked achievements ගන්න"""
    student_achievements = db.query(models.StudentAchievement).filter(
        models.StudentAchievement.student_id == student_id
    ).all()
    return student_achievements

@router.post("/unlock", response_model=schemas.StudentAchievementResponse)
def unlock_achievement(
    unlock_data: schemas.StudentAchievementCreate,
    db: Session = Depends(get_db)
):
    """Achievement එකක් unlock කරන්න"""
    
    # Check if already unlocked
    existing = db.query(models.StudentAchievement).filter(
        models.StudentAchievement.student_id == unlock_data.student_id,
        models.StudentAchievement.achievement_id == unlock_data.achievement_id
    ).first()
    
    if existing:
        raise HTTPException(status_code=400, detail="Achievement already unlocked")
    
    # Create new achievement unlock
    new_unlock = models.StudentAchievement(
        student_id=unlock_data.student_id,
        achievement_id=unlock_data.achievement_id,
        unlocked_at=datetime.utcnow()
    )
    
    db.add(new_unlock)
    db.commit()
    db.refresh(new_unlock)
    
    return new_unlock
