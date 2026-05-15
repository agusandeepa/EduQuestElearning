@echo off
echo ============================================
echo    EduQuest E-Learning Backend Setup
echo ============================================
echo.

cd /d "%~dp0backend"

echo [1/3] Installing dependencies...
pip install -r requirements.txt
echo.

echo [2/3] Setting up database...
python init_db.py
echo.

echo [3/3] Starting backend server...
echo Backend running at: http://localhost:8000
echo API Docs at: http://localhost:8000/docs
echo.
uvicorn app.main:app --reload --port 8000
