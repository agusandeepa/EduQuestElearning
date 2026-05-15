// useLessons Hook - Local Storage Version
import { useState, useEffect } from 'react';
import type { Lesson } from '../services/types';
import { getLessons, getLessonById } from '../services/localStorage';

export function useLessons() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLessons();
  }, []);

  const fetchLessons = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = getLessons();
      setLessons(data);
    } catch (err) {
      setError('Failed to load lessons');
    } finally {
      setLoading(false);
    }
  };

  const getLesson = (id: number): Lesson | null => {
    return getLessonById(id);
  };

  return {
    lessons,
    loading,
    error,
    getLesson,
    refetch: fetchLessons,
  };
}
