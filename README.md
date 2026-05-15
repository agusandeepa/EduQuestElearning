# 🎓 EduSmart - O/L Learning Platform

Sri Lankan O/L students සඳහා AI-powered interactive learning platform.

**Subjects:** History · Maths · English · Science  
**Languages:** English & Sinhala (bilingual)  
**Features:** AI Tutor, Quizzes, Leaderboard, Achievements, Study Buddy

---

## 🚀 Quick Start

### Frontend (React + Vite)

```bash
# Install dependencies
npm install

# Create .env file (copy from .env.example and add your keys)
cp .env.example .env
# Edit .env and add your VITE_GEMINI_API_KEY

# Start dev server
npm run dev
```
Open [http://localhost:5173](http://localhost:5173)

---

### Backend (FastAPI + SQLite)

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Initialize database (creates tables + seed data)
python init_db.py

# Start backend server
uvicorn app.main:app --reload
```
API docs: [http://localhost:8000/docs](http://localhost:8000/docs)

---

## 🔑 Environment Variables

Copy `.env.example` to `.env` and fill in:

| Variable | Description |
|---|---|
| `VITE_GEMINI_API_KEY` | Google Gemini API key (free at aistudio.google.com) |
| `DATABASE_URL` | SQLite (default) or PostgreSQL URL |
| `ADMIN_EMAIL` | Admin login email |
| `ADMIN_PASSWORD` | Admin login password |
| `SECRET_KEY` | JWT secret key (change in production!) |

---

## 📁 Project Structure

```
EduSmart/
├── src/                    # React frontend
│   ├── app/
│   │   ├── App.tsx         # Main app with routing
│   │   └── components/     # All UI components
│   ├── services/           # Data & API services
│   ├── contexts/           # React contexts (Auth, Theme, Language)
│   ├── hooks/              # Custom React hooks
│   └── styles/             # CSS (Tailwind + theme)
├── backend/                # FastAPI backend
│   ├── app/
│   │   ├── main.py         # FastAPI app + routers
│   │   ├── models.py       # SQLAlchemy models
│   │   ├── schemas.py      # Pydantic schemas
│   │   ├── auth.py         # JWT + password hashing
│   │   ├── database.py     # DB connection
│   │   └── routers/        # API route handlers
│   ├── init_db.py          # Database seed script
│   └── requirements.txt
├── .env.example            # Environment template
├── .gitignore
└── package.json
```

---

## 👤 Default Admin Account

Email: `admin@edusmart.lk`  
Password: `Admin@2024` *(change in production!)*

---

## 🛠️ Tech Stack

**Frontend:** React 18, TypeScript, Vite, Tailwind CSS v4, shadcn/ui, Lucide  
**Backend:** FastAPI, SQLAlchemy, SQLite/PostgreSQL, JWT, bcrypt  
**AI:** Google Gemini API

---

*Built as a Final Year Project — EduSmart Team 2024*
