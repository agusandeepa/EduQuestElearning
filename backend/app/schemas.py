from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime

# ============================================
# Student Schemas
# ============================================

class StudentBase(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    email: EmailStr
    full_name: Optional[str] = None

class StudentCreate(StudentBase):
    password: str = Field(..., min_length=6)

class StudentUpdate(BaseModel):
    full_name: Optional[str] = None
    email: Optional[EmailStr] = None

class StudentResponse(StudentBase):
    id: int
    is_active: bool
    is_admin: bool
    total_xp: int
    current_streak: int
    longest_streak: int
    created_at: datetime
    
    class Config:
        from_attributes = True


# ============================================
# Lesson Schemas
# ============================================

class LessonBase(BaseModel):
    order: int
    title_en: str
    title_si: str
    description_en: Optional[str] = None
    description_si: Optional[str] = None
    content_en: str
    content_si: str
    image_url: Optional[str] = None
    video_url: Optional[str] = None
    estimated_time: int = 15
    difficulty: str = "beginner"
    xp_reward: int = 50
    subject: Optional[str] = "history"

class LessonCreate(LessonBase):
    pass

class LessonUpdate(BaseModel):
    title_en: Optional[str] = None
    title_si: Optional[str] = None
    description_en: Optional[str] = None
    description_si: Optional[str] = None
    content_en: Optional[str] = None
    content_si: Optional[str] = None
    image_url: Optional[str] = None
    video_url: Optional[str] = None
    estimated_time: Optional[int] = None
    difficulty: Optional[str] = None
    xp_reward: Optional[int] = None

class LessonResponse(LessonBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True


# ============================================
# Quiz Question Schemas
# ============================================

class QuizQuestionBase(BaseModel):
    lesson_id: int
    question_en: str
    question_si: str
    question_type: str = "multiple_choice"
    options_en: Optional[List[str]] = None
    options_si: Optional[List[str]] = None
    correct_answer: str
    explanation_en: Optional[str] = None
    explanation_si: Optional[str] = None
    difficulty: str = "medium"
    points: int = 10

class QuizQuestionCreate(QuizQuestionBase):
    pass

class QuizQuestionResponse(QuizQuestionBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True


# ============================================
# Progress Schemas
# ============================================

class LessonProgressBase(BaseModel):
    student_id: int
    lesson_id: int
    is_completed: bool = False
    is_unlocked: bool = False
    completion_percentage: float = 0.0
    best_score: float = 0.0
    attempts: int = 0

class LessonProgressCreate(BaseModel):
    lesson_id: int
    is_completed: bool = False
    completion_percentage: float = 0.0
    best_score: float = 0.0

class LessonProgressUpdate(BaseModel):
    is_completed: Optional[bool] = None
    completion_percentage: Optional[float] = None
    best_score: Optional[float] = None

class LessonProgressResponse(LessonProgressBase):
    id: int
    first_started_at: datetime
    last_accessed_at: datetime
    completed_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True


# ============================================
# Quiz Attempt Schemas
# ============================================

class QuizAttemptBase(BaseModel):
    lesson_id: int
    score: float
    total_questions: int
    correct_answers: int
    time_taken: Optional[int] = None
    answers: Optional[dict] = None
    xp_earned: int = 0

class QuizAttemptCreate(QuizAttemptBase):
    student_id: int

class QuizAttemptResponse(QuizAttemptBase):
    id: int
    student_id: int
    started_at: datetime
    completed_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True


# ============================================
# Achievement Schemas
# ============================================

class AchievementBase(BaseModel):
    code: str
    name_en: str
    name_si: str
    description_en: Optional[str] = None
    description_si: Optional[str] = None
    icon: Optional[str] = None
    icon_url: Optional[str] = None
    requirement_type: Optional[str] = None
    requirement_value: Optional[int] = None
    xp_reward: int = 0

class AchievementCreate(AchievementBase):
    pass

class AchievementResponse(AchievementBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class StudentAchievementCreate(BaseModel):
    student_id: int
    achievement_id: int

class StudentAchievementResponse(BaseModel):
    id: int
    student_id: int
    achievement_id: int
    unlocked_at: datetime
    
    class Config:
        from_attributes = True