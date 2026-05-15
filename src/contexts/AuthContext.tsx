// AuthContext - Backend API version with JWT
// Login/Register → FastAPI backend → JWT token stored → all API calls use it
import { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '../services/types';
import { apiLogin, apiRegister, apiGetMe, apiUpdateStreak, setToken, getToken, removeToken } from '../services/api';
import { logoutUser } from '../services/localStorage';

const USER_KEY = 'history_app_user';

function saveUserLocal(user: User) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function loadUserLocal(): User | null {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// Map backend response to frontend User shape (both field names kept)
function mapBackendUser(bu: {
  id: number;
  email: string;
  username: string;
  full_name: string;
  is_admin: boolean;
  total_xp: number;
  current_streak: number;
}): User {
  return {
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
  };
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<User>;
  register: (email: string, name: string, password: string) => Promise<User>;
  logout: () => void;
  refreshUser: () => void;
  isAuthenticated: boolean;
  backendAvailable: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [backendAvailable, setBackendAvailable] = useState(true);

  useEffect(() => {
    const init = async () => {
      const token = getToken();
      if (!token) {
        const cached = loadUserLocal();
        if (cached) setUser(cached);
        setLoading(false);
        return;
      }
      try {
        const me = await apiGetMe();
        const mapped = mapBackendUser(me);
        saveUserLocal(mapped);
        setUser(mapped);
        setBackendAvailable(true);
      } catch {
        const cached = loadUserLocal();
        if (cached) {
          setUser(cached);
          setBackendAvailable(false);
        } else {
          removeToken();
        }
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    try {
      setLoading(true);
      setError(null);
      const res = await apiLogin(email, password);
      setToken(res.access_token);
      const mapped = mapBackendUser(res.user);
      saveUserLocal(mapped);
      setUser(mapped);
      setBackendAvailable(true);

      // Login කරද්දී streak update කරන්න (admin නෙමෙයි නම්)
      if (res.user.id && res.user.id !== 0) {
        try {
          const streakData = await apiUpdateStreak(res.user.id);
          const updatedUser = {
            ...mapped,
            streak: streakData.current_streak,
            current_streak: streakData.current_streak,
            xp: streakData.total_xp,
            total_xp: streakData.total_xp,
            level: Math.floor(streakData.total_xp / 100) + 1,
          };
          saveUserLocal(updatedUser);
          setUser(updatedUser);
        } catch {
          // streak update fail වුනත් login continue
        }
      }

      return mapped;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, name: string, password: string): Promise<User> => {
    try {
      setLoading(true);
      setError(null);
      const username = email.split('@')[0].replace(/[^a-z0-9_]/gi, '_');
      const res = await apiRegister(username, email, name, password);
      setToken(res.access_token);
      const mapped = mapBackendUser(res.user);
      saveUserLocal(mapped);
      setUser(mapped);
      setBackendAvailable(true);
      return mapped;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Registration failed';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    removeToken();
    logoutUser();
    localStorage.removeItem(USER_KEY);
    setUser(null);
  };

  const refreshUser = async () => {
    const token = getToken();
    if (!token) return;
    try {
      const me = await apiGetMe();
      const mapped = mapBackendUser(me);
      saveUserLocal(mapped);
      setUser(mapped);
    } catch {
      const cached = loadUserLocal();
      if (cached) setUser(cached);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      error,
      login,
      register,
      logout,
      refreshUser,
      isAuthenticated: !!user,
      backendAvailable,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
