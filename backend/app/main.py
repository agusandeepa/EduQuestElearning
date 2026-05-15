from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import lessons, students, quizzes, achievements, auth
import os
from pathlib import Path
from dotenv import load_dotenv

_env_path = Path(__file__).resolve().parent.parent.parent / ".env"
load_dotenv(dotenv_path=_env_path)

app = FastAPI(
    title="EduQuest E-Learning API",
    version="1.0.0",
    description="Backend API for EduQuest E-Learning Platform"
)

# CORS - .env හි ALLOWED_ORIGINS set කරන්න (comma separated)
# Default: localhost dev URLs
_raw_origins = os.getenv(
    "ALLOWED_ORIGINS",
    "http://localhost:5173,http://localhost:3000,http://127.0.0.1:5173"
)
allowed_origins = [o.strip() for o in _raw_origins.split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(lessons.router)
app.include_router(students.router)
app.include_router(quizzes.router)
app.include_router(achievements.router)


@app.get("/")
def root():
    return {
        "message": "EduQuest E-Learning API",
        "version": "1.0.0",
        "status": "running",
        "endpoints": {
            "auth": "/api/auth",
            "lessons": "/api/lessons",
            "students": "/api/students",
            "quizzes": "/api/quizzes",
            "achievements": "/api/achievements",
            "docs": "/docs"
        }
    }


@app.get("/health")
def health_check():
    return {"status": "healthy"}
