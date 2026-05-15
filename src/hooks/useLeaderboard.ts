// useLeaderboard Hook - Backend version with localStorage fallback
import { useState, useEffect } from 'react';
import type { User } from '../services/types';
import { getLeaderboard as getLocalLeaderboard } from '../services/localStorage';
import { apiGetLeaderboard, getToken } from '../services/api';

export function useLeaderboard() {
  const [leaderboard, setLeaderboard] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      setError(null);

      if (getToken()) {
        try {
          const backendUsers = await apiGetLeaderboard();
          // Map backend fields to frontend User shape
          const mapped: User[] = backendUsers
            .map(bu => ({
              id: bu.id,
              email: bu.email,
              username: bu.username,
              full_name: bu.full_name,
              name: bu.full_name,
              xp: bu.total_xp,
              level: Math.floor(bu.total_xp / 100) + 1,
              streak: bu.current_streak,
              total_xp: bu.total_xp,
              current_streak: bu.current_streak,
              isAdmin: bu.is_admin,
              is_admin: bu.is_admin,
            }))
            .sort((a, b) => b.total_xp - a.total_xp);
          setLeaderboard(mapped);
          return;
        } catch {
          // Backend unavailable — fall through to localStorage
        }
      }

      // Fallback: localStorage mock data
      const localData = getLocalLeaderboard();
      setLeaderboard(localData as User[]);
    } catch (err) {
      setError('Failed to load leaderboard');
    } finally {
      setLoading(false);
    }
  };

  return {
    leaderboard,
    loading,
    error,
    refetch: fetchLeaderboard,
  };
}
