"""
Migration: Add subject column to lessons table if not exists
"""
from app.database import engine
from sqlalchemy import text

with engine.connect() as conn:
    # Check if subject column exists
    try:
        conn.execute(text("SELECT subject FROM lessons LIMIT 1"))
        print("subject column already exists!")
    except Exception:
        # Add subject column
        conn.execute(text("ALTER TABLE lessons ADD COLUMN subject VARCHAR(50) DEFAULT 'history'"))
        conn.commit()
        print("subject column added successfully!")
    
    # Verify
    result = conn.execute(text("SELECT id, title_en, subject FROM lessons LIMIT 3"))
    for row in result:
        print(f"  ID:{row[0]} | {row[1][:30]} | subject={row[2]}")
