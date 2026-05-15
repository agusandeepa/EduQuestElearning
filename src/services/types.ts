// TypeScript interfaces for EduQuest Application

// User interface - matches backend StudentResponse
export interface User {
  id: number;
  email: string;
  username: string;
  full_name: string;
  // Convenience aliases kept for backward-compat with UI components
  name: string;          // alias → full_name
  xp: number;            // alias → total_xp
  level: number;
  streak: number;        // alias → current_streak
  total_xp: number;
  current_streak: number;
  isAdmin?: boolean;
  is_admin?: boolean;
  lastActivityDate?: string;
  notificationSettings?: NotificationSettings;
}

// Notification Settings
export interface NotificationSettings {
  enabled: boolean;
  dailyReminder: boolean;
  reminderTime: string; // Format: "HH:MM" (24-hour)
  streakWarning: boolean;
  achievementNotifications: boolean;
}

// Progress interface for localStorage
export interface Progress {
  lesson_id: number;
  completed: boolean;
  score: number;
  attempts: number;
}

// Quiz Result interface for localStorage
export interface QuizResult {
  lesson_id: number;
  score: number;
  answers: number[];
  date: string;
}

// Lesson interface with full structure
export interface Lesson {
  id: number;
  title: string;
  description: string;
  level: number;
  xp_reward: number;
  order?: number;
  subject?: string;
  theory?: {
    content: string;
    [key: string]: unknown;
  };
  content: {
    text: string;
    image_url?: string;
    video_url?: string;
    video_title?: string;
    video_description?: string;
    animated_id?: string;
  };
  quiz: {
    questions: QuizQuestion[];
  };
}

// Quiz Question interface
export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correct_answer: number;
}

// Legacy interfaces for database compatibility
export interface Student {
  id: string;
  email: string;
  name: string;
  password_hash?: string;
  streak_days: number;
  total_xp: number;
  created_at: string;
}

export interface StudentProgress {
  id: string;
  student_id: string;
  lesson_id: string;
  completed: boolean;
  score: number;
  completed_at: string | null;
}

export interface LeaderboardEntry {
  student_id: string;
  name: string;
  total_xp: number;
  streak_days: number;
  rank: number;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  student: Student;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  name: string;
  password: string;
}