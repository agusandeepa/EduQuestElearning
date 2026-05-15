from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app import models, schemas

router = APIRouter(
    prefix="/api/lessons",
    tags=["Lessons"]
)

@router.get("/", response_model=List[schemas.LessonResponse])
def get_all_lessons(db: Session = Depends(get_db)):
    """සියලුම lessons ගන්න"""
    lessons = db.query(models.Lesson).order_by(models.Lesson.order).all()
    return lessons

@router.get("/{lesson_id}", response_model=schemas.LessonResponse)
def get_lesson_by_id(lesson_id: int, db: Session = Depends(get_db)):
    """එක lesson එකක් ID එකෙන් ගන්න"""
    lesson = db.query(models.Lesson).filter(models.Lesson.id == lesson_id).first()
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")
    return lesson

@router.get("/{lesson_id}/questions", response_model=List[schemas.QuizQuestionResponse])
def get_lesson_questions(lesson_id: int, db: Session = Depends(get_db)):
    """Lesson එකක quiz questions ගන්න"""
    questions = db.query(models.QuizQuestion).filter(
        models.QuizQuestion.lesson_id == lesson_id
    ).all()
    return questions
