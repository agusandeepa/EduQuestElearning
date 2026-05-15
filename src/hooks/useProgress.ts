// useProgress Hook - Backend PRIMARY, localStorage fallback
// Backend = source of truth for all user progress data
// User A's data never leaks to User B — all keyed by student ID from backend
import { useState, useEffect } from 'react';
import type { Progress, QuizResult } from '../services/types';
import {
  getLessonProgress,
  updateProgress,
  saveQuizResult,
  getQuizResults,
  getProgressKey,
} from '../services/localStorage';
import { apiUpdateProgress, apiGetProgress, getToken } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

export function useProgress() {
  const { user, refreshUser } = useAuth();
  const [progress, setProgress] = useState<Progress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProgress();
  }, [user?.id]); // user ID change වූ විට (login/logout/switch) refetch

  const fetchProgress = async () => {
    try {
      setLoading(true);
      setError(null);

      if (user && user.id && user.id !== 0 && getToken()) {
        // ── Logged in: backend = source of truth ──────────────────
        try {
          const backendData = await apiGetProgress(user.id);
          if (backendData && backendData.length > 0) {
            // Backend data → frontend Progress format
            const mapped: Progress[] = backendData.map((bp: any) => ({
              lesson_id: bp.lesson_id,
              completed: bp.is_completed,
              score: bp.best_score,
              attempts: bp.attempts ?? 1,
            }));
            // User-specific localStorage key ගැ save (offline fallback)
            const key = getProgressKey('history');
            localStorage.setItem(key, JSON.stringify(mapped));
            setProgress(mapped);
            return;
          }
        } catch {
          // Backend unavailable — fall through to localStorage
        }
      }

      // ── Not logged in or backend unavailable: localStorage ───────
      const key = getProgressKey('history');
      const stored = localStorage.getItem(key);
      setProgress(stored ? JSON.parse(stored) : []);
    } catch (err) {
      setError('Failed to load progress');
    } finally {
      setLoading(false);
    }
  };

  const checkLessonProgress = (lessonId: number): Progress | null => {
    // Check in-memory first
    const inMem = progress.find(p => p.lesson_id === lessonId);
    if (inMem) return inMem;
    return getLessonProgress(lessonId);
  };

  const submitQuiz = async (
    lessonId: number,
    answers: number[]
  ): Promise<QuizResult> => {
    try {
      setLoading(true);
      setError(null);

      const quizResult: QuizResult = {
        lesson_id: lessonId,
        score: 0,
        answers,
        date: new Date().toISOString(),
      };
      saveQuizResult(quizResult);
      const result = quizResult;

      // Sync to backend — backend auto-awards XP on completion
      if (user && user.id && user.id !== 0 && getToken()) {
        try {
          await apiUpdateProgress(user.id, {
            lesson_id: lessonId,
            is_completed: result.score >= 60,
            completion_percentage: result.score,
            best_score: result.score,
          });
          // Refresh user XP/streak from backend
          await refreshUser();
        } catch {
          // Backend unavailable — localStorage already saved
        }
      }

      await fetchProgress();
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to submit quiz';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const markLessonComplete = async (lessonId: number, score: number) => {
    try {
      setLoading(true);
      setError(null);

      const newProgress = updateProgress(lessonId, true, score);

      // Sync to backend — backend auto-awards XP
      if (user && user.id && user.id !== 0 && getToken()) {
        try {
          await apiUpdateProgress(user.id, {
            lesson_id: lessonId,
            is_completed: true,
            completion_percentage: 100,
            best_score: score,
          });
          // Refresh user XP/streak from backend
          await refreshUser();
        } catch {
          // Backend unavailable — localStorage already saved
        }
      }

      await fetchProgress();
      return newProgress;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update progress';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getQuizHistory = (): QuizResult[] => {
    return getQuizResults();
  };

  return {
    progress,
    loading,
    error,
    checkLessonProgress,
    submitQuiz,
    markLessonComplete,
    getQuizHistory,
    refetch: fetchProgress,
  };
}
