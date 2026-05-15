// Local Storage Service - Frontend Only Version
// All data stored in browser localStorage
// Progress data is USER-SPECIFIC: each user's progress stored under their ID

import type { User, Lesson, Progress, QuizResult } from './types';

import { ENGLISH_LESSONS } from './english-lessons';
import { SINHALA_LESSONS } from './sinhala-lessons';

import { MATHS_LESSONS } from './maths-lessons';
import { MATHS_SINHALA_LESSONS } from './sinhala.maths.lessons';

import { OL_ENGLISH_LESSONS } from './ol-english-lessons';

import {
  SCIENCE_LESSONS,
  VIRTUAL_LABS,
} from './science-lessons';

import {
  SINHALA_SCIENCE_LESSONS,
} from './sinhala.science.lessons';

const STORAGE_KEYS = {
  USER: 'history_app_user',
  AUTH_TOKEN: 'history_app_auth_token',
  LESSONS: 'history_app_lessons',
  LANGUAGE: 'app_language',
} as const;

// ── User-specific key helpers ─────────────────────────────
// All progress/quiz data is stored under the logged-in user's ID.
// This means User A and User B never share progress data.

function getUserId(): string {
  const user = getUser();
  return user ? String(user.id) : 'guest';
}

function progressKey(subject: 'history' | 'maths' | 'english' | 'science'): string {
  return `${subject}_app_progress_${getUserId()}`;
}

function quizKey(): string {
  return `history_app_quiz_results_${getUserId()}`;
}

// ── Lesson keys used in profile-page.tsx (must match) ──────
// profile-page.tsx reads e.g. localStorage.getItem("history_app_progress")
// We expose helper so profile-page can get the correct key too.
export function getProgressKey(subject: 'history' | 'maths' | 'english' | 'science'): string {
  return progressKey(subject);
}

export function getQuizResultsKey(): string {
  return quizKey();
}

//
// ──────────────────────────────────────────────────────────
// HISTORY LESSONS
// ──────────────────────────────────────────────────────────
//

function getLessonsByLanguage(language: 'en' | 'si' = 'en'): Lesson[] {
  return language === 'si' ? SINHALA_LESSONS : ENGLISH_LESSONS;
}

export function getLessons(): Lesson[] {
  const language = (localStorage.getItem(STORAGE_KEYS.LANGUAGE) as 'en' | 'si') || 'en';
  return getLessonsByLanguage(language);
}

export function getLessonById(id: number): Lesson | null {
  return getLessons().find(l => l.id === id) || null;
}

//
// ──────────────────────────────────────────────────────────
// MATHS LESSONS
// ──────────────────────────────────────────────────────────
//

function getMathsLessonsByLanguage(language: 'en' | 'si' = 'en'): Lesson[] {
  return language === 'si' ? MATHS_SINHALA_LESSONS : MATHS_LESSONS;
}

export function getMathsLessons(): Lesson[] {
  const language = (localStorage.getItem(STORAGE_KEYS.LANGUAGE) as 'en' | 'si') || 'en';
  return getMathsLessonsByLanguage(language);
}

export function getMathsLessonById(id: number): Lesson | null {
  return getMathsLessons().find(l => l.id === id) || null;
}

//
// ──────────────────────────────────────────────────────────
// SCIENCE LESSONS
// ──────────────────────────────────────────────────────────
//

function getScienceLessonsByLanguage(language: 'en' | 'si' = 'en'): Lesson[] {
  return (language === 'si' ? SINHALA_SCIENCE_LESSONS : SCIENCE_LESSONS) as Lesson[];
}

export function getScienceLessons(): Lesson[] {
  const language = (localStorage.getItem(STORAGE_KEYS.LANGUAGE) as 'en' | 'si') || 'en';
  return getScienceLessonsByLanguage(language);
}

export function getScienceLessonById(id: number): Lesson | null {
  return getScienceLessons().find(l => l.id === id) || null;
}

//
// ──────────────────────────────────────────────────────────
// MATHS PROGRESS  (user-specific)
// ──────────────────────────────────────────────────────────
//

export function getMathsProgress(): Progress[] {
  const stored = localStorage.getItem(progressKey('maths'));
  return stored ? JSON.parse(stored) : [];
}

export function saveMathsProgress(progress: Progress[]): void {
  localStorage.setItem(progressKey('maths'), JSON.stringify(progress));
}

export function getMathsLessonProgress(lessonId: number): Progress | null {
  return getMathsProgress().find(p => p.lesson_id === lessonId) || null;
}

export function updateMathsProgress(lessonId: number, completed: boolean, score: number): void {
  const progress = getMathsProgress();
  const existing = progress.find(p => p.lesson_id === lessonId);
  if (existing) {
    existing.completed = completed;
    existing.score = Math.max(existing.score, score);
  } else {
    progress.push({ lesson_id: lessonId, completed, score, attempts: 1 });
  }
  saveMathsProgress(progress);
  if (completed && score >= 70) {
    const lesson = getMathsLessonById(lessonId);
    if (lesson) {
      const user = getUser();
      if (user) updateUser({ xp: user.xp + lesson.xp_reward });
    }
  }
}

export function isMathsLessonUnlocked(lessonId: number): boolean {
  const sortedIds = getMathsLessons().map(l => l.id).sort((a, b) => a - b);
  const index = sortedIds.indexOf(lessonId);
  if (index === 0) return true;
  const prevId = sortedIds[index - 1];
  const prevProgress = getMathsLessonProgress(prevId);
  return prevProgress ? prevProgress.completed && prevProgress.score >= 70 : false;
}

//
// ──────────────────────────────────────────────────────────
// ENGLISH SUBJECT
// ──────────────────────────────────────────────────────────
//

export function getEnglishLessons(): Lesson[] {
  return OL_ENGLISH_LESSONS;
}

export function getEnglishLessonById(id: number): Lesson | null {
  return OL_ENGLISH_LESSONS.find(l => l.id === id) || null;
}

export function getEnglishProgress(): Progress[] {
  const stored = localStorage.getItem(progressKey('english'));
  return stored ? JSON.parse(stored) : [];
}

export function saveEnglishProgress(progress: Progress[]): void {
  localStorage.setItem(progressKey('english'), JSON.stringify(progress));
}

export function getEnglishLessonProgress(lessonId: number): Progress | null {
  return getEnglishProgress().find(p => p.lesson_id === lessonId) || null;
}

export function updateEnglishProgress(lessonId: number, completed: boolean, score: number): void {
  const progress = getEnglishProgress();
  const existing = progress.find(p => p.lesson_id === lessonId);
  if (existing) {
    existing.completed = completed;
    existing.score = Math.max(existing.score, score);
  } else {
    progress.push({ lesson_id: lessonId, completed, score, attempts: 1 });
  }
  saveEnglishProgress(progress);
  if (completed && score >= 70) {
    const lesson = getEnglishLessonById(lessonId);
    if (lesson) {
      const user = getUser();
      if (user) updateUser({ xp: user.xp + lesson.xp_reward });
    }
  }
}

export function isEnglishLessonUnlocked(lessonId: number): boolean {
  const sortedIds = OL_ENGLISH_LESSONS.map(l => l.id).sort((a, b) => a - b);
  const index = sortedIds.indexOf(lessonId);
  if (index === 0) return true;
  const prevId = sortedIds[index - 1];
  const prevProgress = getEnglishLessonProgress(prevId);
  return prevProgress ? prevProgress.completed && prevProgress.score >= 70 : false;
}

//
// ──────────────────────────────────────────────────────────
// SCIENCE PROGRESS  (user-specific)
// ──────────────────────────────────────────────────────────
//

export function getScienceProgress(): Progress[] {
  const stored = localStorage.getItem(progressKey('science'));
  return stored ? JSON.parse(stored) : [];
}

export function saveScienceProgress(progress: Progress[]): void {
  localStorage.setItem(progressKey('science'), JSON.stringify(progress));
}

export function getScienceLessonProgress(lessonId: number): Progress | null {
  return getScienceProgress().find(p => p.lesson_id === lessonId) || null;
}

export function updateScienceProgress(lessonId: number, completed: boolean, score: number): void {
  const progress = getScienceProgress();
  const existing = progress.find(p => p.lesson_id === lessonId);
  if (existing) {
    existing.completed = completed;
    existing.score = Math.max(existing.score, score);
  } else {
    progress.push({ lesson_id: lessonId, completed, score, attempts: 1 });
  }
  saveScienceProgress(progress);
  if (completed && score >= 70) {
    const lesson = getScienceLessonById(lessonId);
    if (lesson) {
      const user = getUser();
      if (user) updateUser({ xp: user.xp + lesson.xp_reward });
    }
  }
}

export function isScienceLessonUnlocked(lessonId: number): boolean {
  const lessons = getScienceLessons();
  const lesson = lessons.find(l => l.id === lessonId);
  if (!lesson) return false;
  const thisUnit = lesson.level;
  const unitLessons = lessons.filter(l => l.level === thisUnit).sort((a, b) => a.id - b.id);
  const allUnits = [...new Set(lessons.map(l => l.level))].sort((a, b) => a - b);
  const isFirstUnit = thisUnit === allUnits[0];
  const lessonIndexInUnit = unitLessons.findIndex(l => l.id === lessonId);

  const isUnitUnlocked = (): boolean => {
    if (isFirstUnit) return true;
    const prevUnit = allUnits[allUnits.indexOf(thisUnit) - 1];
    const prevUnitLessons = lessons.filter(l => l.level === prevUnit);
    const prevUnitLabs = prevUnitLessons.filter(l => !!VIRTUAL_LABS[l.id]);
    if (prevUnitLabs.length > 0) {
      return prevUnitLabs.every(lab => {
        const prog = getScienceLessonProgress(lab.id);
        return prog?.completed && prog.score >= 70;
      });
    }
    return prevUnitLessons.every(l => {
      const prog = getScienceLessonProgress(l.id);
      return prog?.completed && prog.score >= 70;
    });
  };

  if (!isUnitUnlocked()) return false;
  if (lessonIndexInUnit === 0) return true;
  const prevInUnit = unitLessons[lessonIndexInUnit - 1];
  const prevProgress = getScienceLessonProgress(prevInUnit.id);
  return prevProgress ? prevProgress.completed && prevProgress.score >= 70 : false;
}

//
// ──────────────────────────────────────────────────────────
// USER MANAGEMENT
// ──────────────────────────────────────────────────────────
//

export function saveUser(user: User): void {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  // Also persist latest user state into all_users store
  const allUsers = JSON.parse(localStorage.getItem('all_users') || '[]');
  const idx = allUsers.findIndex((u: any) => u.id === user.id);
  if (idx >= 0) {
    // preserve password, merge rest
    allUsers[idx] = { ...allUsers[idx], ...user };
    localStorage.setItem('all_users', JSON.stringify(allUsers));
  }
}

export function getUser(): User | null {
  const stored = localStorage.getItem(STORAGE_KEYS.USER);
  return stored ? JSON.parse(stored) : null;
}

export function updateUser(updates: Partial<User>): void {
  const user = getUser();
  if (user) {
    const updated = { ...user, ...updates };
    saveUser(updated);
  }
}

//
// ──────────────────────────────────────────────────────────
// HISTORY PROGRESS  (user-specific)
// ──────────────────────────────────────────────────────────
//

export function getProgress(): Progress[] {
  const stored = localStorage.getItem(progressKey('history'));
  return stored ? JSON.parse(stored) : [];
}

export function saveProgress(progress: Progress[]): void {
  localStorage.setItem(progressKey('history'), JSON.stringify(progress));
}

export function getLessonProgress(lessonId: number): Progress | null {
  return getProgress().find(p => p.lesson_id === lessonId) || null;
}

export function updateProgress(lessonId: number, completed: boolean, score: number): void {
  const progress = getProgress();
  const existing = progress.find(p => p.lesson_id === lessonId);
  if (existing) {
    existing.completed = completed;
    existing.score = Math.max(existing.score, score);
  } else {
    progress.push({ lesson_id: lessonId, completed, score, attempts: 1 });
  }
  saveProgress(progress);
  if (completed && score >= 70) {
    const lesson = getLessonById(lessonId);
    if (lesson) {
      const user = getUser();
      if (user) updateUser({ xp: user.xp + lesson.xp_reward });
    }
  }
}

export function isLessonUnlocked(lessonId: number): boolean {
  if (lessonId === 1) return true;
  const previousProgress = getLessonProgress(lessonId - 1);
  return previousProgress ? previousProgress.completed && previousProgress.score >= 70 : false;
}

//
// ──────────────────────────────────────────────────────────
// QUIZ RESULTS  (user-specific)
// ──────────────────────────────────────────────────────────
//

export function getQuizResults(): QuizResult[] {
  const stored = localStorage.getItem(quizKey());
  return stored ? JSON.parse(stored) : [];
}

export function saveQuizResult(result: QuizResult): void {
  const results = getQuizResults();
  results.push(result);
  localStorage.setItem(quizKey(), JSON.stringify(results));
}

//
// ──────────────────────────────────────────────────────────
// AUTH
// ──────────────────────────────────────────────────────────
//

export function saveAuthToken(token: string): void {
  localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
}

export function getAuthToken(): string | null {
  return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
}

export function clearAuthToken(): void {
  localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
}

export function getCurrentUser(): User | null {
  return getUser();
}

export function registerUser(email: string, name: string, password: string): User {
  const existingUsers = JSON.parse(localStorage.getItem('all_users') || '[]');
  const exists = existingUsers.find((u: any) => u.email === email);
  if (exists) throw new Error('User already exists');

  const today = new Date().toISOString().split('T')[0];
  const newUser: User = { id: Date.now(), email, name, username: email, full_name: name, xp: 0, total_xp: 0, level: 1, streak: 1, current_streak: 1, lastActivityDate: today };
  existingUsers.push({ ...newUser, password });
  localStorage.setItem('all_users', JSON.stringify(existingUsers));
  saveUser(newUser);
  saveAuthToken('token_' + newUser.id);
  return newUser;
}

export function loginUser(email: string, password: string): User {
  // Hardcoded admin
  if (email === 'admin@edusmart.lk' && password === 'Admin@2024') {
    const adminUser: User = { id: 0, email: 'admin@edusmart.lk', name: 'Administrator', username: 'admin', full_name: 'Administrator', xp: 0, total_xp: 0, level: 1, streak: 0, current_streak: 0, isAdmin: true };
    saveUser(adminUser);
    saveAuthToken('admin_token_0');
    return adminUser;
  }

  const existingUsers = JSON.parse(localStorage.getItem('all_users') || '[]');
  const user = existingUsers.find((u: any) => u.email === email && u.password === password);
  if (!user) throw new Error('Invalid email or password');

  const { password: _, ...userWithoutPassword } = user;

  // ── Streak logic ────────────────────────────────────────────
  const today = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"
  const last = userWithoutPassword.lastActivityDate ?? '';
  let streak = userWithoutPassword.streak ?? 0;

  if (last === today) {
    // Already logged in today — keep streak
  } else if (last === new Date(Date.now() - 86400000).toISOString().split('T')[0]) {
    // Logged in yesterday — increment streak
    streak += 1;
  } else if (last !== '') {
    // Missed a day — reset streak
    streak = 1;
  } else {
    // First ever login
    streak = 1;
  }

  const updatedUser = { ...userWithoutPassword, streak, lastActivityDate: today };

  // Persist updated streak back to all_users
  const idx = existingUsers.findIndex((u: any) => u.email === email);
  if (idx !== -1) {
    existingUsers[idx] = { ...existingUsers[idx], streak, lastActivityDate: today };
    localStorage.setItem('all_users', JSON.stringify(existingUsers));
  }

  // Restore the latest saved user state (XP, streak, etc.)
  saveUser(updatedUser);
  saveAuthToken('token_' + user.id);
  return updatedUser;
}

export function logoutUser(): void {
  logout();
}

export function isAuthenticated(): boolean {
  return !!getAuthToken() && !!getUser();
}

export function findUserByEmail(email: string): User | null {
  const allUsers = JSON.parse(localStorage.getItem('all_users') || '[]');
  const user = allUsers.find((u: any) => u.email === email);
  if (!user) return null;
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword as User;
}

export function resetUserPassword(email: string, newPassword: string): void {
  const allUsers = JSON.parse(localStorage.getItem('all_users') || '[]');
  const idx = allUsers.findIndex((u: any) => u.email === email);
  if (idx === -1) throw new Error('User not found');
  allUsers[idx] = { ...allUsers[idx], password: newPassword };
  localStorage.setItem('all_users', JSON.stringify(allUsers));
}

export function logout(): void {
  clearAuthToken();
  localStorage.removeItem(STORAGE_KEYS.USER);
}

//
// ──────────────────────────────────────────────────────────
// LEADERBOARD
// ──────────────────────────────────────────────────────────
//

export function getLeaderboard() {
  const user = getUser();
  const mockUsers = [
    { id: 1, name: 'Saman Perera',     email: 'saman@example.com', xp: 450, level: 5, streak: 12 },
    { id: 2, name: 'Nimal de Silva',   email: 'nimal@example.com', xp: 380, level: 4, streak: 8  },
    { id: 3, name: 'Kamal Jayawardena',email: 'kamal@example.com', xp: 320, level: 4, streak: 15 },
    { id: 4, name: 'Ruwan Fernando',   email: 'ruwan@example.com', xp: 290, level: 3, streak: 5  },
    { id: 5, name: 'Sunil Rathnayake', email: 'sunil@example.com', xp: 250, level: 3, streak: 10 },
  ];
  if (user) {
    const existingIndex = mockUsers.findIndex(u => u.email === user.email);
    if (existingIndex >= 0) mockUsers[existingIndex] = user;
    else mockUsers.push(user);
  }
  return mockUsers.sort((a, b) => b.xp - a.xp);
}
