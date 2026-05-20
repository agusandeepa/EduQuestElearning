"""
Authentication Router - Login, Register, Token
"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr
from app.database import get_db
from app import models
from app.auth import hash_password, verify_password, create_access_token
import os
from pathlib import Path
from dotenv import load_dotenv
_env_path = Path(__file__).resolve().parent.parent.parent / ".env"
load_dotenv(dotenv_path=_env_path)

router = APIRouter(prefix="/api/auth", tags=["Authentication"])


class LoginRequest(BaseModel):
    email: str
    password: str


class RegisterRequest(BaseModel):
    username: str
    email: EmailStr
    full_name: str | None = None
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    user: dict


@router.post("/login", response_model=TokenResponse)
def login(request: LoginRequest, db: Session = Depends(get_db)):
    """Login with email and password"""

    # Check hardcoded admin (matches frontend)
    admin_email = os.getenv("ADMIN_EMAIL", "admin@eduquestlearning.lk")
    admin_password = os.getenv("ADMIN_PASSWORD", "Admin@2024")

    if request.email == admin_email and request.password == admin_password:
        token = create_access_token({"sub": "admin", "is_admin": True, "email": admin_email})
        return {
            "access_token": token,
            "token_type": "bearer",
            "user": {
                "id": 0,
                "email": admin_email,
                "username": "admin",
                "full_name": "Administrator",
                "is_admin": True,
                "total_xp": 0,
                "current_streak": 0,
            }
        }

    # Find student by email
    student = db.query(models.Student).filter(models.Student.email == request.email).first()
    if not student:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    if not verify_password(request.password, student.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    if not student.is_active:
        raise HTTPException(status_code=403, detail="Account is disabled")

    token = create_access_token({"sub": str(student.id), "is_admin": student.is_admin})
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": student.id,
            "email": student.email,
            "username": student.username,
            "full_name": student.full_name,
            "is_admin": student.is_admin,
            "total_xp": student.total_xp,
            "current_streak": student.current_streak,
        }
    }


@router.post("/register", response_model=TokenResponse)
def register(request: RegisterRequest, db: Session = Depends(get_db)):
    """Register a new student"""

    if db.query(models.Student).filter(models.Student.email == request.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")

    if db.query(models.Student).filter(models.Student.username == request.username).first():
        raise HTTPException(status_code=400, detail="Username already taken")

    student = models.Student(
        username=request.username,
        email=request.email,
        full_name=request.full_name or request.username,
        hashed_password=hash_password(request.password),
        is_admin=False,
    )
    db.add(student)
    db.commit()
    db.refresh(student)

    token = create_access_token({"sub": str(student.id), "is_admin": False})
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": student.id,
            "email": student.email,
            "username": student.username,
            "full_name": student.full_name,
            "is_admin": student.is_admin,
            "total_xp": student.total_xp,
            "current_streak": student.current_streak,
        }
    }


from fastapi import Request

@router.get("/me")
def get_me(request: Request, db: Session = Depends(get_db)):
    """Get current user info from Bearer token"""
    from app.auth import decode_token
    auth_header = request.headers.get("Authorization", "")
    if not auth_header.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Authorization header missing")
    token = auth_header[7:]
    payload = decode_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    student_id = payload.get("sub")
    if student_id == "admin":
        admin_email = os.getenv("ADMIN_EMAIL", "admin@eduquestlearning.lk")
        return {
            "id": 0,
            "email": admin_email,
            "username": "admin",
            "full_name": "Administrator",
            "is_admin": True,
            "total_xp": 0,
            "current_streak": 0,
        }

    student = db.query(models.Student).filter(models.Student.id == int(student_id)).first()
    if not student:
        raise HTTPException(status_code=404, detail="User not found")
    return student
