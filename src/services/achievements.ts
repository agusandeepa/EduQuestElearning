// Achievements & Badges System — Bilingual (EN/SI), All 4 Subjects
import type { User, Progress } from './types';

export interface Achievement {
  id: string;
  title: { en: string; si: string };
  description: { en: string; si: string };
  icon: string;
  requirement: number;
  type: 'xp' | 'lessons' | 'streak' | 'quiz_score' | 'level' | 'subject_lessons';
  subject?: 'history' | 'maths' | 'english' | 'science';
  unlocked: boolean;
  unlockedAt?: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  color: string;
}

export const ACHIEVEMENTS: Achievement[] = [
  // ── XP Achievements ──────────────────────────────────────────────────
  {
    id: 'first_steps', icon: '🎯', requirement: 50, type: 'xp', rarity: 'common', color: 'from-blue-400 to-blue-600',
    title: { en: 'First Steps', si: 'පළමු පියවර' },
    description: { en: 'Earn your first 50 XP', si: 'XP 50ක් ලබා ගන්න' },
    unlocked: false,
  },
  {
    id: 'knowledge_seeker', icon: '📚', requirement: 200, type: 'xp', rarity: 'common', color: 'from-green-400 to-green-600',
    title: { en: 'Knowledge Seeker', si: 'දැනුම් සොයන්නා' },
    description: { en: 'Earn 200 XP points', si: 'XP 200ක් ලබා ගන්න' },
    unlocked: false,
  },
  {
    id: 'rising_star', icon: '⭐', requirement: 500, type: 'xp', rarity: 'rare', color: 'from-yellow-400 to-orange-500',
    title: { en: 'Rising Star', si: 'නැගෙන තරුව' },
    description: { en: 'Earn 500 XP points', si: 'XP 500ක් ලබා ගන්න' },
    unlocked: false,
  },
  {
    id: 'champion', icon: '👑', requirement: 1000, type: 'xp', rarity: 'epic', color: 'from-purple-500 to-pink-600',
    title: { en: 'Champion', si: 'ශූරයා' },
    description: { en: 'Earn 1000 XP points', si: 'XP 1000ක් ලබා ගන්න' },
    unlocked: false,
  },
  {
    id: 'legend', icon: '💫', requirement: 2000, type: 'xp', rarity: 'legendary', color: 'from-yellow-500 to-red-600',
    title: { en: 'Legend', si: 'ඉතිහාස නිර්මාතෘ' },
    description: { en: 'Earn 2000 XP — you are a legend!', si: 'XP 2000ක් — ඔබ ශ්‍රේෂ්ඨයි!' },
    unlocked: false,
  },

  // ── Lesson Achievements ───────────────────────────────────────────────
  {
    id: 'first_lesson', icon: '📖', requirement: 1, type: 'lessons', rarity: 'common', color: 'from-teal-400 to-cyan-500',
    title: { en: 'First Lesson', si: 'පළමු පාඩම' },
    description: { en: 'Complete your first lesson', si: 'පළමු පාඩම සම්පූර්ණ කරන්න' },
    unlocked: false,
  },
  {
    id: 'lesson_5', icon: '🎓', requirement: 5, type: 'lessons', rarity: 'common', color: 'from-blue-400 to-indigo-500',
    title: { en: 'Lesson Streak', si: 'පාඩම් ශ්‍රේණිය' },
    description: { en: 'Complete 5 lessons', si: 'පාඩම් 5ක් සම්පූර්ණ කරන්න' },
    unlocked: false,
  },
  {
    id: 'lesson_10', icon: '🏅', requirement: 10, type: 'lessons', rarity: 'rare', color: 'from-orange-400 to-red-500',
    title: { en: 'Dedicated Learner', si: 'කැපවූ ශිෂ්‍යයා' },
    description: { en: 'Complete 10 lessons', si: 'පාඩම් 10ක් සම්පූර්ණ කරන්න' },
    unlocked: false,
  },
  {
    id: 'lesson_25', icon: '🏆', requirement: 25, type: 'lessons', rarity: 'epic', color: 'from-purple-500 to-indigo-600',
    title: { en: 'Super Scholar', si: 'සුපිරි සිසුවා' },
    description: { en: 'Complete 25 lessons', si: 'පාඩම් 25ක් සම්පූර්ණ කරන්න' },
    unlocked: false,
  },

  // ── Streak Achievements ───────────────────────────────────────────────
  {
    id: 'streak_3', icon: '🔥', requirement: 3, type: 'streak', rarity: 'common', color: 'from-orange-400 to-red-500',
    title: { en: '3-Day Streak', si: 'දින 3ක ශ්‍රේණිය' },
    description: { en: 'Maintain a 3-day learning streak', si: 'දින 3ක streak එකක් තබා ගන්න' },
    unlocked: false,
  },
  {
    id: 'streak_7', icon: '⚡', requirement: 7, type: 'streak', rarity: 'rare', color: 'from-yellow-400 to-orange-500',
    title: { en: 'Week Warrior', si: 'සතිය ජය ගත්හ' },
    description: { en: 'Maintain a 7-day streak', si: 'දින 7ක streak එකක් තබා ගන්න' },
    unlocked: false,
  },
  {
    id: 'streak_30', icon: '💎', requirement: 30, type: 'streak', rarity: 'legendary', color: 'from-cyan-500 to-blue-600',
    title: { en: 'Monthly Champion', si: 'මාසික ශූරයා' },
    description: { en: 'Maintain a 30-day streak!', si: 'දින 30ක streak — ඔබ අපූරුයි!' },
    unlocked: false,
  },

  // ── Subject-Specific ─────────────────────────────────────────────────
  {
    id: 'history_hero', icon: '🏛️', requirement: 3, type: 'subject_lessons', subject: 'history', rarity: 'common', color: 'from-purple-400 to-blue-500',
    title: { en: 'History Hero', si: 'ඉතිහාස වීරයා' },
    description: { en: 'Complete 3 History lessons', si: 'ඉතිහාස පාඩම් 3ක් සම්පූර්ණ කරන්න' },
    unlocked: false,
  },
  {
    id: 'maths_wizard', icon: '🧮', requirement: 3, type: 'subject_lessons', subject: 'maths', rarity: 'common', color: 'from-orange-400 to-red-500',
    title: { en: 'Maths Wizard', si: 'ගණිත විශේෂඥ' },
    description: { en: 'Complete 3 Maths lessons', si: 'ගණිත පාඩම් 3ක් සම්පූර්ණ කරන්න' },
    unlocked: false,
  },
  {
    id: 'english_ace', icon: '✍️', requirement: 3, type: 'subject_lessons', subject: 'english', rarity: 'common', color: 'from-green-400 to-teal-500',
    title: { en: 'English Ace', si: 'ඉංග්‍රීසි ශූරයා' },
    description: { en: 'Complete 3 English lessons', si: 'ඉංග්‍රීසි පාඩම් 3ක් සම්පූර්ණ කරන්න' },
    unlocked: false,
  },
  {
    id: 'science_star', icon: '🔬', requirement: 3, type: 'subject_lessons', subject: 'science', rarity: 'common', color: 'from-cyan-400 to-blue-500',
    title: { en: 'Science Star', si: 'විද්‍යා තරුව' },
    description: { en: 'Complete 3 Science lessons', si: 'විද්‍යා පාඩම් 3ක් සම්පූර්ණ කරන්න' },
    unlocked: false,
  },
  {
    id: 'all_rounder', icon: '🌟', requirement: 1, type: 'subject_lessons', rarity: 'epic', color: 'from-yellow-400 to-pink-500',
    title: { en: 'All-Rounder', si: 'සම්පූර්ණ ශිෂ්‍යයා' },
    description: { en: 'Complete at least 1 lesson in all 4 subjects', si: 'සිව්ම විෂයයන්හි පාඩම් 1ක් සම්පූර්ණ කරන්න' },
    unlocked: false,
  },

  // ── Quiz Achievements ────────────────────────────────────────────────
  {
    id: 'perfect_quiz', icon: '💯', requirement: 100, type: 'quiz_score', rarity: 'rare', color: 'from-green-400 to-emerald-600',
    title: { en: 'Perfect Score!', si: 'සම්පූර්ණ ලකුණු!' },
    description: { en: 'Score 100% on any quiz', si: 'ඕනෑම ප්‍රශ්නාවලියකින් 100% ලබා ගන්න' },
    unlocked: false,
  },

  // ── Level Achievements ───────────────────────────────────────────────
  {
    id: 'level_5', icon: '🌠', requirement: 5, type: 'level', rarity: 'rare', color: 'from-indigo-400 to-purple-500',
    title: { en: 'Level 5 Reached', si: 'මට්ටම 5 ළඟා විය' },
    description: { en: 'Reach Level 5', si: 'මට්ටම 5ට පැමිණෙන්න' },
    unlocked: false,
  },
  {
    id: 'level_10', icon: '🚀', requirement: 10, type: 'level', rarity: 'legendary', color: 'from-red-500 to-pink-600',
    title: { en: 'Level 10 Master', si: 'මට්ටම 10 ප්‍රවීණ' },
    description: { en: 'Reach the maximum Level 10!', si: 'උපරිම මට්ටම 10ට ළඟා වෙන්න!' },
    unlocked: false,
  },
];

export function checkAchievements(
  user: User,
  progress: Progress[],
  mathsProgress: Progress[] = [],
  englishProgress: Progress[] = [],
  scienceProgress: Progress[] = []
): Achievement[] {
  const achievements = ACHIEVEMENTS.map(a => ({ ...a }));
  const completedHistory = progress.filter(p => p.completed).length;
  const completedMaths = mathsProgress.filter(p => p.completed).length;
  const completedEnglish = englishProgress.filter(p => p.completed).length;
  const completedScience = scienceProgress.filter(p => p.completed).length;
  const totalCompleted = completedHistory + completedMaths + completedEnglish + completedScience;

  achievements.forEach(a => {
    let current = 0;
    switch (a.type) {
      case 'xp': current = user.xp; break;
      case 'lessons': current = totalCompleted; break;
      case 'streak': current = user.streak; break;
      case 'level': current = user.level; break;
      case 'quiz_score':
        const allProgress = [...progress, ...mathsProgress, ...englishProgress, ...scienceProgress];
        current = allProgress.some(p => p.score >= 100) ? 100 : 0;
        break;
      case 'subject_lessons':
        if (a.id === 'all_rounder') {
          current = (completedHistory > 0 && completedMaths > 0 && completedEnglish > 0 && completedScience > 0) ? 1 : 0;
        } else {
          const map: Record<string, number> = { history: completedHistory, maths: completedMaths, english: completedEnglish, science: completedScience };
          current = a.subject ? (map[a.subject] ?? 0) : 0;
        }
        break;
    }
    if (current >= a.requirement) {
      a.unlocked = true;
      a.unlockedAt = a.unlockedAt || new Date().toISOString();
    }
  });

  return achievements;
}

export function getAchievementProgress(
  user: User,
  progress: Progress[],
  achievement: Achievement,
  mathsProgress: Progress[] = [],
  englishProgress: Progress[] = [],
  scienceProgress: Progress[] = []
): number {
  const completedHistory = progress.filter(p => p.completed).length;
  const completedMaths = mathsProgress.filter(p => p.completed).length;
  const completedEnglish = englishProgress.filter(p => p.completed).length;
  const completedScience = scienceProgress.filter(p => p.completed).length;
  const totalCompleted = completedHistory + completedMaths + completedEnglish + completedScience;

  let current = 0;
  switch (achievement.type) {
    case 'xp': current = user.xp; break;
    case 'lessons': current = totalCompleted; break;
    case 'streak': current = user.streak; break;
    case 'level': current = user.level; break;
    case 'quiz_score':
      const all = [...progress, ...mathsProgress, ...englishProgress, ...scienceProgress];
      current = all.some(p => p.score >= 100) ? 100 : 0;
      break;
    case 'subject_lessons':
      if (achievement.id === 'all_rounder') {
        const have = [completedHistory > 0, completedMaths > 0, completedEnglish > 0, completedScience > 0].filter(Boolean).length;
        return Math.round((have / 4) * 100);
      }
      const m: Record<string, number> = { history: completedHistory, maths: completedMaths, english: completedEnglish, science: completedScience };
      current = achievement.subject ? (m[achievement.subject] ?? 0) : 0;
      break;
  }
  return Math.min(Math.round((current / achievement.requirement) * 100), 100);
}

export function getUnlockedAchievements(user: User, progress: Progress[]): Achievement[] {
  return checkAchievements(user, progress).filter(a => a.unlocked);
}
