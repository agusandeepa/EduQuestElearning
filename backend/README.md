# EduQuest E-Learning Backend

FastAPI backend for EduQuest E-Learning Learning Platform.

## Quick Setup

### 1. Go to backend folder
```bash
cd EduQuest E-Learning/backend
```

### 2. Install dependencies
```bash
pip install -r requirements.txt
```

### 3. Setup database
```bash
python init_db.py
```

### 4. Start server
```bash
uvicorn app.main:app --reload --port 8000
```

Server runs at: http://localhost:8000  
API Docs at: http://localhost:8000/docs

## Admin Login
- Email: `admin@eduquestlearning.lk`
- Password: `Admin@2024`

## API Endpoints
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register
- `GET /api/auth/me` - Current user
- `GET /api/lessons/` - All lessons
- `GET /api/students/leaderboard` - Leaderboard
- `POST /api/students/{id}/progress` - Update progress

## Notes
- Uses SQLite database (no PostgreSQL needed locally)
- Database file: `edusmart.db` (auto-created)
- `.env` file must be at project root (EduQuest E-Learning/ folder)
