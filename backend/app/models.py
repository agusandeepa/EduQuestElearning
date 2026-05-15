from sqlalchemy import Column, Integer, String, Boolean, DateTime, Float, ForeignKey, Text, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base


class Student(Base):
    """Student/User model"""
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True, nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(100))
    is_active = Column(Boolean, default=True)
    is_admin = Column(Boolean, default=False)

    # Gamification fields
    total_xp = Column(Integer, default=0)
    current_streak = Column(Integer, default=0)
    longest_streak = Column(Integer, default=0)
    last_activity_date = Column(DateTime(timezone=True), server_default=func.now())

    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    progress = relationship("LessonProgress", back_populates="student")
    quiz_attempts = relationship("QuizAttempt", back_populates="student")
    achievements = relationship("StudentAchievement", back_populates="student")


class Lesson(Base):
    """Lesson model"""
    __tablename__ = "lessons"

    id = Column(Integer, primary_key=True, index=True)
    order = Column(Integer, unique=True, nullable=False)

    # Bilingual content
    title_en = Column(String(200), nullable=False)
    title_si = Column(String(200), nullable=False)
    description_en = Column(Text)
    description_si = Column(Text)
    content_en = Column(Text, nullable=False)
    content_si = Column(Text, nullable=False)

    # Extra bilingual fields (optional)
    period_en = Column(String(100))
    period_si = Column(String(100))
    key_points_en = Column(JSON)
    key_points_si = Column(JSON)

    # Additional resources
    image_url = Column(String(500))
    video_url = Column(String(500))

    # Subject categorization
    subject = Column(String(50), default="history")  # history, maths, science, english

    # Settings
    estimated_time = Column(Integer, default=15)
    difficulty = Column(String(20), default="beginner")
    xp_reward = Column(Integer, default=50)

    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    quiz_questions = relationship("QuizQuestion", back_populates="lesson")
    progress = relationship("LessonProgress", back_populates="lesson")


class QuizQuestion(Base):
    """Quiz questions for each lesson"""
    __tablename__ = "quiz_questions"

    id = Column(Integer, primary_key=True, index=True)
    lesson_id = Column(Integer, ForeignKey("lessons.id"), nullable=False)

    question_en = Column(Text, nullable=False)
    question_si = Column(Text, nullable=False)
    question_type = Column(String(50), default="multiple_choice")

    options_en = Column(JSON)
    options_si = Column(JSON)

    # correct_answer stored as string (index "0","1","2","3" or "true"/"false")
    correct_answer = Column(String(200), nullable=False)

    explanation_en = Column(Text)
    explanation_si = Column(Text)
    difficulty = Column(String(20), default="medium")
    points = Column(Integer, default=10)

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    lesson = relationship("Lesson", back_populates="quiz_questions")


class LessonProgress(Base):
    """Track student progress for each lesson"""
    __tablename__ = "lesson_progress"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)
    lesson_id = Column(Integer, ForeignKey("lessons.id"), nullable=False)

    is_completed = Column(Boolean, default=False)
    is_unlocked = Column(Boolean, default=False)
    completion_percentage = Column(Float, default=0.0)
    best_score = Column(Float, default=0.0)
    attempts = Column(Integer, default=0)

    first_started_at = Column(DateTime(timezone=True), server_default=func.now())
    last_accessed_at = Column(DateTime(timezone=True), server_default=func.now())
    completed_at = Column(DateTime(timezone=True))

    student = relationship("Student", back_populates="progress")
    lesson = relationship("Lesson", back_populates="progress")


class QuizAttempt(Base):
    """Individual quiz attempts and results"""
    __tablename__ = "quiz_attempts"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)
    lesson_id = Column(Integer, ForeignKey("lessons.id"), nullable=False)

    score = Column(Float, nullable=False)
    total_questions = Column(Integer, nullable=False)
    correct_answers = Column(Integer, nullable=False)
    time_taken = Column(Integer)
    answers = Column(JSON)
    xp_earned = Column(Integer, default=0)

    started_at = Column(DateTime(timezone=True), server_default=func.now())
    completed_at = Column(DateTime(timezone=True))

    student = relationship("Student", back_populates="quiz_attempts")


class Achievement(Base):
    """Available achievements in the system"""
    __tablename__ = "achievements"

    id = Column(Integer, primary_key=True, index=True)
    code = Column(String(50), unique=True, nullable=False)
    name_en = Column(String(100), nullable=False)
    name_si = Column(String(100), nullable=False)
    description_en = Column(Text)
    description_si = Column(Text)
    icon = Column(String(100))
    icon_url = Column(String(500))
    badge_color = Column(String(20))
    requirement_type = Column(String(50))
    requirement_value = Column(Integer)
    xp_reward = Column(Integer, default=0)

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    student_achievements = relationship("StudentAchievement", back_populates="achievement")


class StudentAchievement(Base):
    """Track which achievements students have unlocked"""
    __tablename__ = "student_achievements"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)
    achievement_id = Column(Integer, ForeignKey("achievements.id"), nullable=False)
    unlocked_at = Column(DateTime(timezone=True), server_default=func.now())

    student = relationship("Student", back_populates="achievements")
    achievement = relationship("Achievement", back_populates="student_achievements")
