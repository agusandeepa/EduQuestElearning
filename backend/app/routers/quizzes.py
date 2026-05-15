from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app import models, schemas
from datetime import datetime

router = APIRouter(
    prefix="/api/quizzes",
    tags=["Quizzes"]
)

@router.post("/submit", response_model=schemas.QuizAttemptResponse)
def submit_quiz(
    quiz_submission: schemas.QuizAttemptCreate,
    db: Session = Depends(get_db)
):
    """Quiz attempt එකක් submit කරන්න"""
    
    # Calculate score
    total_questions = quiz_submission.total_questions
    correct_answers = quiz_submission.correct_answers
    score = (correct_answers / total_questions * 100) if total_questions > 0 else 0
    
    # Create quiz attempt
    new_attempt = models.QuizAttempt(
        student_id=quiz_submission.student_id,
        lesson_id=quiz_submission.lesson_id,
        score=score,
        total_questions=total_questions,
        correct_answers=correct_answers,
        time_taken=quiz_submission.time_taken,
        answers=quiz_submission.answers,
        xp_earned=quiz_submission.xp_earned,
        completed_at=datetime.utcnow()
    )
    
    db.add(new_attempt)
    db.commit()
    db.refresh(new_attempt)
    
    return new_attempt

@router.get("/student/{student_id}", response_model=List[schemas.QuizAttemptResponse])
def get_student_quiz_attempts(student_id: int, db: Session = Depends(get_db)):
    """Student එකෙක්ගේ quiz attempts ගන්න"""
    attempts = db.query(models.QuizAttempt).filter(
        models.QuizAttempt.student_id == student_id
    ).order_by(models.QuizAttempt.completed_at.desc()).all()
    
    return attempts

@router.get("/lesson/{lesson_id}/student/{student_id}")
def get_lesson_quiz_attempts(lesson_id: int, student_id: int, db: Session = Depends(get_db)):
    """එක lesson එකක student කෙනෙක්ගේ attempts ගන්න"""
    attempts = db.query(models.QuizAttempt).filter(
        models.QuizAttempt.lesson_id == lesson_id,
        models.QuizAttempt.student_id == student_id
    ).order_by(models.QuizAttempt.completed_at.desc()).all()
    
    return attempts
