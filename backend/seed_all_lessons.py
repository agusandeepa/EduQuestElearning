"""
Seed All Lessons Script
History, Maths, Science lessons database එකට add කරන්න
"""
import json
import os
import sys
from pathlib import Path
from dotenv import load_dotenv

# Load .env
_env_path = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(dotenv_path=_env_path)

from app.database import engine, SessionLocal
from app.models import Base, Lesson, QuizQuestion

def seed_all_lessons():
    print("=" * 60)
    print("📚 EduQuest E-Learning - Seed All Lessons")
    print("=" * 60)

    # Create tables if not exist
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()

    try:
        # Load lesson data from JSON
        json_path = Path(__file__).parent / "seed_lessons.json"
        with open(json_path, encoding="utf-8") as f:
            lessons_data = json.load(f)

        # Clear existing lessons
        existing = db.query(Lesson).count()
        if existing > 0:
            print(f"⚠️  Deleting {existing} existing lessons...")
            db.query(QuizQuestion).delete()
            db.query(Lesson).delete()
            db.commit()
            print("✅ Cleared existing lessons")

        print(f"\n🔄 Adding {len(lessons_data)} lessons...")

        history_count = 0
        maths_count = 0
        science_count = 0
        english_count = 0

        for data in lessons_data:
            lesson = Lesson(
                order=data["order"],
                title_en=data["title_en"],
                title_si=data["title_si"],
                description_en=data.get("description_en", ""),
                description_si=data.get("description_si", ""),
                content_en=data.get("content_en", ""),
                content_si=data.get("content_si", ""),
                subject=data.get("subject", "history"),
                xp_reward=data.get("xp_reward", 50),
                difficulty=data.get("difficulty", "beginner"),
                estimated_time=data.get("estimated_time", 15),
            )
            db.add(lesson)
            db.flush()  # get lesson.id before adding quiz questions

            # Add quiz questions if present
            for q in data.get("quiz_questions", []):
                question = QuizQuestion(
                    lesson_id=lesson.id,
                    question_en=q.get("question_en", ""),
                    question_si=q.get("question_si", q.get("question_en", "")),
                    options_en=q.get("options_en", []),
                    options_si=q.get("options_si", q.get("options_en", [])),
                    correct_answer=str(q.get("correct_answer", "0")),
                    difficulty="medium",
                    points=10,
                )
                db.add(question)

            if data["subject"] == "history":
                history_count += 1
            elif data["subject"] == "maths":
                maths_count += 1
            elif data["subject"] == "science":
                science_count += 1
            elif data["subject"] == "english":
                english_count += 1

        db.commit()

        print("\n" + "=" * 60)
        print("🎉 Seeding completed successfully!")
        print("=" * 60)
        print(f"\n📊 Summary:")
        print(f"   ✅ History Lessons:  {history_count}")
        print(f"   ✅ Maths Lessons:    {maths_count}")
        print(f"   ✅ Science Lessons:  {science_count}")
        print(f"   ✅ English Lessons:  {english_count}")
        print(f"   ✅ Total:            {history_count + maths_count + science_count + english_count}")
        print("\n🚀 Restart the backend server now!")
        print("=" * 60)

    except Exception as e:
        print(f"\n❌ Error: {str(e)}")
        db.rollback()
        raise
    finally:
        db.close()


if __name__ == "__main__":
    seed_all_lessons()
