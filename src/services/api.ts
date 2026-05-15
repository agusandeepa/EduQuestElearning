// API Service - All backend calls go through here
// Dev: vite proxies /api → http://localhost:8000 (no CORS issues)
// Prod: set VITE_API_URL to your deployed backend

const API_BASE = import.meta.env.VITE_API_URL || '';
const TOKEN_KEY = 'history_app_auth_token';

// ── Token helpers ─────────────────────────────────────────
export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function removeToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

// ── Base fetch wrapper ────────────────────────────────────
async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail || `Request failed: ${res.status}`);
  }

  return res.json() as Promise<T>;
}

// ── Auth API ──────────────────────────────────────────────
export interface BackendUser {
  id: number;
  email: string;
  username: string;
  full_name: string;
  is_admin: boolean;
  total_xp: number;
  current_streak: number;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: BackendUser;
}

export async function apiLogin(email: string, password: string): Promise<AuthResponse> {
  return apiFetch<AuthResponse>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function apiRegister(
  username: string,
  email: string,
  full_name: string,
  password: string
): Promise<AuthResponse> {
  return apiFetch<AuthResponse>('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ username, email, full_name, password }),
  });
}

export async function apiGetMe(): Promise<BackendUser> {
  return apiFetch<BackendUser>('/api/auth/me');
}

// ── Progress API ──────────────────────────────────────────
export interface ProgressPayload {
  lesson_id: number;
  is_completed: boolean;
  completion_percentage: number;
  best_score: number;
}

export async function apiUpdateProgress(
  studentId: number,
  payload: ProgressPayload
): Promise<void> {
  return apiFetch<void>(`/api/students/${studentId}/progress`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function apiGetProgress(studentId: number) {
  return apiFetch<ProgressPayload[]>(`/api/students/${studentId}/progress`);
}

// ── XP & Streak API ───────────────────────────────────────
export async function apiUpdateXP(studentId: number, xpToAdd: number): Promise<{total_xp: number, level: number, current_streak: number}> {
  return apiFetch(`/api/students/${studentId}/xp`, {
    method: 'PUT',
    body: JSON.stringify({ xp_to_add: xpToAdd }),
  });
}

export async function apiUpdateStreak(studentId: number): Promise<{current_streak: number, longest_streak: number, total_xp: number}> {
  return apiFetch(`/api/students/${studentId}/streak`, {
    method: 'PUT',
  });
}

// ── Leaderboard API ───────────────────────────────────────
export async function apiGetLeaderboard(): Promise<BackendUser[]> {
  // Get all students sorted by XP from backend
  return apiFetch<BackendUser[]>('/api/students/leaderboard').catch(() => {
    // Fallback: if no dedicated endpoint, get top students list
    return apiFetch<BackendUser[]>('/api/students/');
  });
}

// ── Health check ──────────────────────────────────────────
export async function apiHealthCheck(): Promise<boolean> {
  try {
    await fetch(`${API_BASE}/health`);
    return true;
  } catch {
    return false;
  }
}
