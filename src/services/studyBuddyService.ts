// AI Study Buddy & Performance Predictor Service
// Reads REAL data from localStorage for all 4 subjects: History, Maths, English, Science
// AI-powered recommendations via Google Gemini API

import { MATHS_LESSONS } from './maths-lessons';
import { OL_ENGLISH_LESSONS } from './ol-english-lessons';
import { SCIENCE_LESSONS } from './science-lessons';
import { ENGLISH_LESSONS } from './english-lessons';

// ─── Gemini API ───────────────────────────────────────────────────────────────
const GEMINI_API_KEY = (import.meta as unknown as { env: Record<string, string> }).env?.VITE_GEMINI_API_KEY || '';
const GEMINI_MODEL = 'gemini-2.0-flash';

async function callGeminiStudyBuddy(prompt: string): Promise<string> {
  if (!GEMINI_API_KEY) throw new Error('VITE_GEMINI_API_KEY not set');
  const response = await fetch(
    `/gemini-api/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.8, maxOutputTokens: 2048 },
      }),
    }
  );
  if (!response.ok) throw new Error(`Gemini error ${response.status}`);
  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

// ─── Storage Keys (must match localStorage.ts) ───────────────────────────────
const STORAGE_KEYS = {
  USER: 'history_app_user',
  LANGUAGE: 'app_language',
} as const;

// ─── User-specific key helpers (mirrors localStorage.ts exactly) ─────────────
// Progress keys include the userId so each user has isolated data.
function getCurrentUserId(): string {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER);
    if (!raw) return 'guest';
    const user = JSON.parse(raw) as { id?: number | string };
    return user?.id != null ? String(user.id) : 'guest';
  } catch {
    return 'guest';
  }
}

function userProgressKey(subject: 'history' | 'maths' | 'english' | 'science'): string {
  return `${subject}_app_progress_${getCurrentUserId()}`;
}

function userQuizKey(): string {
  return `history_app_quiz_results_${getCurrentUserId()}`;
}

// ─── Subject Config ───────────────────────────────────────────────────────────
export const SUBJECTS = {
  history: {
    key: 'history' as const,
    label: { en: 'History', si: 'ඉතිහාසය' },
    color: '#8b5cf6',
    totalLessons: ENGLISH_LESSONS.length,
  },
  maths: {
    key: 'maths' as const,
    label: { en: 'Maths', si: 'ගණිතය' },
    color: '#3b82f6',
    totalLessons: MATHS_LESSONS.length,
  },
  english: {
    key: 'english' as const,
    label: { en: 'English', si: 'ඉංග්‍රීසි' },
    color: '#10b981',
    totalLessons: OL_ENGLISH_LESSONS.length,
  },
  science: {
    key: 'science' as const,
    label: { en: 'Science', si: 'විද්‍යාව' },
    color: '#f59e0b',
    totalLessons: SCIENCE_LESSONS.length,
  },
} as const;

export type SubjectKey = keyof typeof SUBJECTS;

// ─── Interfaces ───────────────────────────────────────────────────────────────
export interface SubjectStats {
  subject: SubjectKey;
  label: { en: string; si: string };
  color: string;
  completedLessons: number;
  totalLessons: number;
  averageScore: number;
  completionPercent: number;
  weakTopics: WeakArea[];
}

export interface WeakArea {
  topic: string;
  topicSi: string;
  averageScore: number;
  attemptsCount: number;
  lastAttempt: Date;
}

export interface StudyRecommendation {
  type: 'warning' | 'suggestion' | 'motivation' | 'achievement';
  title: { en: string; si: string };
  message: { en: string; si: string };
  icon: string;
  priority: number;
}

export interface PerformancePrediction {
  predictedScore: number;
  examReadiness: number;
  estimatedCompletionDate: Date;
  confidenceLevel: number;
}

export interface StudyPlan {
  dayPlans: DayPlan[];
  totalDays: number;
  estimatedHoursPerWeek: number;
}

export interface DayPlan {
  date: Date;
  lessons: number[];
  estimatedMinutes: number;
  focus: string;
  focusSi: string;
  subject: SubjectKey;
}

export interface LearningStyle {
  visual: number;
  reading: number;
  practical: number;
  score: number;
}

export interface StudyAnalytics {
  totalStudyTime: number;
  averageScore: number;
  completedLessons: number;
  totalLessons: number;
  currentStreak: number;
  longestStreak: number;
  weakAreas: WeakArea[];
  bestStudyTime: 'morning' | 'afternoon' | 'evening' | 'night';
  learningStyle: LearningStyle;
  weeklyProgress: { week: string; lessonsCompleted: number; averageScore: number; id: string }[];
  subjectStats: SubjectStats[];
}

// ─── Private Helpers ──────────────────────────────────────────────────────────
interface StoredProgress {
  lesson_id: number;
  completed: boolean;
  score: number;
  attempts: number;
}

interface StoredUser {
  streak: number;
  lastActivityDate?: string;
  xp?: number;
}

function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function getHistoryProgress(): StoredProgress[] {
  return readStorage<StoredProgress[]>(userProgressKey('history'), []);
}
function getMathsProgress(): StoredProgress[] {
  return readStorage<StoredProgress[]>(userProgressKey('maths'), []);
}
function getEnglishProgress(): StoredProgress[] {
  return readStorage<StoredProgress[]>(userProgressKey('english'), []);
}
function getScienceProgress(): StoredProgress[] {
  return readStorage<StoredProgress[]>(userProgressKey('science'), []);
}
function getStoredUser(): StoredUser {
  return readStorage<StoredUser>(STORAGE_KEYS.USER, { streak: 0 });
}

// Expose quiz key for external use if needed
export function getStudyBuddyQuizKey(): string {
  return userQuizKey();
}

function progressForSubject(subject: SubjectKey): StoredProgress[] {
  switch (subject) {
    case 'history': return getHistoryProgress();
    case 'maths': return getMathsProgress();
    case 'english': return getEnglishProgress();
    case 'science': return getScienceProgress();
  }
}

function completedCount(progress: StoredProgress[]): number {
  return progress.filter(p => p.completed && p.score >= 70).length;
}

function avgScore(progress: StoredProgress[]): number {
  const scored = progress.filter(p => p.score > 0);
  if (scored.length === 0) return 0;
  return Math.round(scored.reduce((s, p) => s + p.score, 0) / scored.length);
}

function estimateStudyMinutes(progress: StoredProgress[]): number {
  return progress.reduce((sum, p) => {
    if (p.completed) return sum + 30;
    if (p.attempts > 0) return sum + 15;
    return sum;
  }, 0);
}

function lessonsForSubject(subject: SubjectKey) {
  switch (subject) {
    case 'history': return ENGLISH_LESSONS;
    case 'maths': return MATHS_LESSONS;
    case 'english': return OL_ENGLISH_LESSONS;
    case 'science': return SCIENCE_LESSONS;
  }
}

function buildWeakAreas(subject: SubjectKey, progress: StoredProgress[]): WeakArea[] {
  const lessons = lessonsForSubject(subject);
  return progress
    .filter(p => p.score > 0 && p.score < 70)
    .map(p => {
      const lesson = lessons.find((l: { id: number; title: string }) => l.id === p.lesson_id);
      return {
        topic: lesson?.title ?? `Lesson ${p.lesson_id}`,
        topicSi: lesson?.title ?? `පාඩම ${p.lesson_id}`,
        averageScore: p.score,
        attemptsCount: p.attempts ?? 1,
        lastAttempt: new Date(),
      };
    })
    .sort((a, b) => a.averageScore - b.averageScore)
    .slice(0, 3);
}

function buildWeeklyProgress(allProgress: StoredProgress[]): StudyAnalytics['weeklyProgress'] {
  const totalCompleted = completedCount(allProgress);
  const perWeek = Math.floor(totalCompleted / 4);
  const extra = totalCompleted % 4;
  const allScored = allProgress.filter(p => p.score > 0);

  return [1, 2, 3, 4].map((w) => {
    const startIdx = (w - 1) * 3;
    const chunk = allScored.slice(startIdx, startIdx + 3);
    const weekAvg = chunk.length > 0
      ? Math.round(chunk.reduce((s, p) => s + p.score, 0) / chunk.length)
      : 0;
    return {
      week: `Week ${w}`,
      lessonsCompleted: perWeek + (w === 4 ? extra : 0),
      averageScore: weekAvg,
      id: `w${w}`,
    };
  });
}

function buildLearningStyle(progress: StoredProgress[]): LearningStyle {
  const completed = progress.filter(p => p.completed);
  if (completed.length === 0) return { visual: 60, reading: 55, practical: 70, score: 62 };
  const highScored = completed.filter(p => p.score >= 80).length;
  const practical = Math.min(Math.round((highScored / completed.length) * 100), 100);
  const visual = Math.min(practical + 10, 100);
  const reading = Math.max(practical - 10, 40);
  return { visual, reading, practical, score: Math.round((visual + reading + practical) / 3) };
}

// ─── Service Class ────────────────────────────────────────────────────────────
class StudyBuddyService {
  private examDate = new Date('2026-12-01');

  getSubjectStats(): SubjectStats[] {
    return (Object.values(SUBJECTS) as Array<typeof SUBJECTS[SubjectKey]>).map(subj => {
      const progress = progressForSubject(subj.key);
      const completed = completedCount(progress);
      const avg = avgScore(progress);
      return {
        subject: subj.key,
        label: subj.label,
        color: subj.color,
        completedLessons: completed,
        totalLessons: subj.totalLessons,
        averageScore: avg,
        completionPercent: subj.totalLessons > 0
          ? Math.round((completed / subj.totalLessons) * 100)
          : 0,
        weakTopics: buildWeakAreas(subj.key, progress),
      };
    });
  }

  getStudyAnalytics(_userId: string): StudyAnalytics {
    const histP = getHistoryProgress();
    const mathP = getMathsProgress();
    const engP = getEnglishProgress();
    const sciP = getScienceProgress();
    const all = [...histP, ...mathP, ...engP, ...sciP];
    const user = getStoredUser();

    const allWeak: WeakArea[] = [
      ...buildWeakAreas('history', histP),
      ...buildWeakAreas('maths', mathP),
      ...buildWeakAreas('english', engP),
      ...buildWeakAreas('science', sciP),
    ].sort((a, b) => a.averageScore - b.averageScore).slice(0, 5);

    const streak = user.streak ?? 0;

    return {
      totalStudyTime: estimateStudyMinutes(all),
      averageScore: avgScore(all),
      completedLessons: completedCount(all),
      totalLessons: Object.values(SUBJECTS).reduce((s, sub) => s + sub.totalLessons, 0),
      currentStreak: streak,
      longestStreak: streak,
      weakAreas: allWeak,
      bestStudyTime: streak > 5 ? 'evening' : 'morning',
      learningStyle: buildLearningStyle(all),
      weeklyProgress: buildWeeklyProgress(all),
      subjectStats: this.getSubjectStats(),
    };
  }

  getRecommendations(_userId: string, _language: 'en' | 'si' = 'en'): StudyRecommendation[] {
    const analytics = this.getStudyAnalytics(_userId);
    const recs: StudyRecommendation[] = [];
    const streak = analytics.currentStreak;

    if (streak === 0) {
      recs.push({
        type: 'warning',
        title: { en: 'Streak at Risk!', si: 'Streak අනතුරේ!' },
        message: {
          en: "⚠️ You haven't studied recently. Start a lesson today to rebuild your streak!",
          si: "⚠️ ඔබ මෑතකදී පාඩම් කර නැහැ. අද පාඩමක් ආරම්භ කරලා streak එක නැවත ගොඩනගන්න!",
        },
        icon: '⚠️', priority: 5,
      });
    } else if (streak >= 7) {
      recs.push({
        type: 'achievement',
        title: { en: '🔥 On Fire!', si: '🔥 විශිෂ්ටයි!' },
        message: {
          en: `🔥 ${streak}-day streak! Incredible dedication. Keep going!`,
          si: `🔥 දින ${streak}ක streak! අදිසාර කැපවීමක්. දිගටම යන්න!`,
        },
        icon: '🔥', priority: 4,
      });
    }

    const weakestSubj = analytics.subjectStats
      .filter(s => s.completedLessons > 0)
      .sort((a, b) => a.averageScore - b.averageScore)[0];
    if (weakestSubj && weakestSubj.averageScore < 70) {
      recs.push({
        type: 'suggestion',
        title: { en: 'Focus Area Identified', si: 'අවධානය යොමු කළ යුතු විෂය' },
        message: {
          en: `📚 You're weakest in ${weakestSubj.label.en} (${weakestSubj.averageScore}%). Focus here to boost your score!`,
          si: `📚 ඔබ ${weakestSubj.label.si} (${weakestSubj.averageScore}%) හි දුර්වලයි. ලකුණු ඉහළ දැමීමට මෙහි අවධානය යොමු කරන්න!`,
        },
        icon: '📚', priority: 4,
      });
    }

    if (analytics.weakAreas.length > 0) {
      const w = analytics.weakAreas[0];
      recs.push({
        type: 'suggestion',
        title: { en: 'Weak Topic Found', si: 'දුර්වල මාතෘකාවක්' },
        message: {
          en: `📖 "${w.topic}" (${w.averageScore}%) needs more practice. Review this lesson again!`,
          si: `📖 "${w.topic}" (${w.averageScore}%) තවත් practice අවශ්‍යයි. මෙම පාඩම නැවත review කරන්න!`,
        },
        icon: '📖', priority: 4,
      });
    }

    const timeEmoji = { morning: '🌅', afternoon: '☀️', evening: '🌆', night: '🌙' };
    const timeNames = {
      morning: { en: 'Morning (8AM - 10AM)', si: 'උදෑසන (8AM - 10AM)' },
      afternoon: { en: 'Afternoon (2PM - 4PM)', si: 'දහවල (2PM - 4PM)' },
      evening: { en: 'Evening (6PM - 8PM)', si: 'සවස (6PM - 8PM)' },
      night: { en: 'Night (8PM - 10PM)', si: 'රාත්‍රිය (8PM - 10PM)' },
    };
    const bt = analytics.bestStudyTime;
    recs.push({
      type: 'suggestion',
      title: { en: 'Best Study Time', si: 'හොඳම අධ්‍යයන වේලාව' },
      message: {
        en: `${timeEmoji[bt]} Your best study time is ${timeNames[bt].en}. Try studying during this period!`,
        si: `${timeEmoji[bt]} ඔබේ හොඳම අධ්‍යයන වේලාව ${timeNames[bt].si}. මෙම කාලයේ අධ්‍යයනය කිරීමට උත්සාහ කරන්න!`,
      },
      icon: timeEmoji[bt], priority: 3,
    });

    const { visual, reading, practical } = analytics.learningStyle;
    const dom = visual >= reading && visual >= practical ? 'visual' : reading >= practical ? 'reading' : 'practical';
    const styleMsg = {
      visual: { en: '🎨 You learn best visually! Use diagrams, mind maps and video lessons.', si: '🎨 ඔබ දෘශ්‍යමය ලෙස හොඳින් ඉගෙන ගන්නවා! රූප සටහන්, mind maps සහ video පාඩම් භාවිතා කරන්න.' },
      reading: { en: '📖 You learn best by reading! Focus on textbooks and written materials.', si: '📖 ඔබ කියවීමෙන් හොඳින් ඉගෙන ගන්නවා! පාඨ්‍යපොත් සහ ලිඛිත ද්‍රව්‍ය කෙරෙහි අවධානය යොමු කරන්න.' },
      practical: { en: '🎯 You learn best by doing! Take quizzes and practice tests regularly.', si: '🎯 ඔබ ප්‍රායෝගිකව හොඳින් ඉගෙන ගන්නවා! නිතිපතා ප්‍රශ්නාවලි සහ පරීක්ෂණ ගන්න.' },
    };
    recs.push({
      type: 'suggestion',
      title: { en: 'Learning Style', si: 'ඉගෙනුම් ශෛලිය' },
      message: styleMsg[dom],
      icon: '💡', priority: 3,
    });

    const notStarted = analytics.subjectStats.filter(s => s.completedLessons === 0);
    if (notStarted.length > 0) {
      const s = notStarted[0];
      recs.push({
        type: 'motivation',
        title: { en: `Start ${s.label.en}!`, si: `${s.label.si} ආරම්භ කරන්න!` },
        message: {
          en: `💪 You haven't started ${s.label.en} yet. Begin your first lesson today!`,
          si: `💪 ඔබ තවම ${s.label.si} ආරම්භ කර නැහැ. අද ඔබේ පළමු පාඩම ආරම්භ කරන්න!`,
        },
        icon: '💪', priority: 3,
      });
    }

    const rem = analytics.totalLessons - analytics.completedLessons;
    if (rem <= 20 && rem > 0) {
      recs.push({
        type: 'motivation',
        title: { en: 'Almost There!', si: 'ළඟාවෙලා ඉන්නේ!' },
        message: {
          en: `💪 Only ${rem} lessons left across all subjects! You can do it!`,
          si: `💪 සියලු විෂයයන් සම්පූර්ණ කිරීමට තවත් පාඩම් ${rem}ක් විතරයි! ඔබට පුළුවන්!`,
        },
        icon: '💪', priority: 2,
      });
    }

    const daysLeft = Math.max(Math.floor((this.examDate.getTime() - Date.now()) / 86400000), 1);
    const lpw = Math.ceil((rem / daysLeft) * 7);
    if (lpw > 0 && lpw <= 10) {
      recs.push({
        type: 'suggestion',
        title: { en: 'Study Pace', si: 'අධ්‍යයන වේගය' },
        message: {
          en: `📅 Complete ${lpw} lesson${lpw > 1 ? 's' : ''} per week across all subjects to finish before the O/L exam!`,
          si: `📅 O/L විභාගයට පෙර අවසන් කිරීමට සෑම සතියකම සියලු විෂයයන් පුරා පාඩම් ${lpw}ක් සම්පූර්ණ කරන්න!`,
        },
        icon: '📅', priority: 2,
      });
    }

    return recs.sort((a, b) => b.priority - a.priority).slice(0, 6);
  }

  predictPerformance(_userId: string): PerformancePrediction {
    const a = this.getStudyAnalytics(_userId);
    const compPct = a.totalLessons > 0 ? (a.completedLessons / a.totalLessons) * 100 : 0;
    const streakScore = Math.min((a.currentStreak / 30) * 100, 100);
    const timeScore = Math.min((a.totalStudyTime / 1800) * 100, 100);
    const predicted = Math.round(a.averageScore * 0.4 + compPct * 0.3 + streakScore * 0.15 + timeScore * 0.15);
    const examReadiness = Math.round(compPct * 0.6 + a.averageScore * 0.4);
    const rem = a.totalLessons - a.completedLessons;
    const pace = a.weeklyProgress.reduce((s, w) => s + w.lessonsCompleted, 0) / Math.max(a.weeklyProgress.length, 1);
    const weeks = rem / Math.max(pace, 0.5);
    const est = new Date();
    est.setDate(est.getDate() + weeks * 7);
    const conf = Math.min(Math.round(a.completedLessons * 2 + a.totalStudyTime / 20), 100);
    return {
      predictedScore: Math.min(Math.max(predicted, 0), 100),
      examReadiness: Math.min(Math.max(examReadiness, 0), 100),
      estimatedCompletionDate: est,
      confidenceLevel: conf,
    };
  }

  generateStudyPlan(_userId: string, targetDate: Date, hoursPerWeek: number): StudyPlan {
    const a = this.getStudyAnalytics(_userId);
    const rem = a.totalLessons - a.completedLessons;
    const daysLeft = Math.max(Math.floor((targetDate.getTime() - Date.now()) / 86400000), 7);
    const lpw = Math.ceil(rem / (daysLeft / 7));
    const minPerLesson = Math.floor((hoursPerWeek * 60) / Math.max(lpw, 1));

    const subjQueue: SubjectKey[] = ['history', 'maths', 'english', 'science'];
    const ptrs: Record<SubjectKey, number> = {
      history: completedCount(getHistoryProgress()) + 1,
      maths: completedCount(getMathsProgress()) + 1,
      english: completedCount(getEnglishProgress()) + 1,
      science: completedCount(getScienceProgress()) + 1,
    };

    const dayPlans: DayPlan[] = [];
    let cur = new Date();
    let qi = 0;

    for (let d = 0; d < Math.min(daysLeft, 90); d++) {
      if (cur.getDay() >= 1 && cur.getDay() <= 6 && d % 2 === 0) {
        const subj = subjQueue[qi % subjQueue.length];
        const ptr = ptrs[subj];
        const lessons = lessonsForSubject(subj) as Array<{ id: number; title: string }>;
        const lesson = lessons[ptr - 1];
        if (lesson && ptr <= SUBJECTS[subj].totalLessons) {
          dayPlans.push({
            date: new Date(cur),
            lessons: [ptr],
            estimatedMinutes: minPerLesson,
            focus: lesson.title,
            focusSi: lesson.title,
            subject: subj,
          });
          ptrs[subj]++;
        }
        qi++;
      }
      cur.setDate(cur.getDate() + 1);
    }

    return { dayPlans, totalDays: dayPlans.length, estimatedHoursPerWeek: hoursPerWeek };
  }

  // ─── AI-Powered Recommendations via Gemini ──────────────────────────────────
  async getAIRecommendations(
    _userId: string,
    language: 'en' | 'si' = 'en'
  ): Promise<StudyRecommendation[]> {
    const analytics = this.getStudyAnalytics(_userId);
    const prediction = this.predictPerformance(_userId);
    const stats = analytics.subjectStats;

    const subjectSummary = stats.map(s =>
      `${s.label.en}: ${s.completedLessons}/${s.totalLessons} lessons done, avg score ${s.averageScore}%`
    ).join('\n');

    const weakTopics = analytics.weakAreas.slice(0, 3).map(w =>
      `"${w.topic}" (avg score: ${w.averageScore}%, attempts: ${w.attemptsCount})`
    ).join(', ') || 'none identified yet';

    const langInstruction = language === 'si'
      ? 'Respond ONLY in Sinhala (සිංහල) language for both title and message fields.'
      : 'Respond in English for both title and message fields.';

    const prompt = `You are an AI Study Buddy for Sri Lankan O/L students. Analyze this student's real performance data and give personalized, encouraging advice.

STUDENT DATA:
- Total study time: ${analytics.totalStudyTime} minutes
- Overall average score: ${analytics.averageScore}%
- Lessons completed: ${analytics.completedLessons} / ${analytics.totalLessons}
- Current streak: ${analytics.currentStreak} days
- Exam readiness: ${prediction.examReadiness}%
- Predicted O/L score: ${prediction.predictedScore}%
- Learning style: visual ${analytics.learningStyle.visual}%, reading ${analytics.learningStyle.reading}%, practical ${analytics.learningStyle.practical}%

SUBJECT BREAKDOWN:
${subjectSummary}

WEAK TOPICS: ${weakTopics}

Generate exactly 5 personalized study recommendations based on this data. ${langInstruction}

Return ONLY a JSON array with exactly 5 objects, no markdown fences:
[
  {
    "type": "warning" | "suggestion" | "motivation" | "achievement",
    "title": "short title (max 6 words)",
    "message": "specific, actionable advice mentioning their real data (1-2 sentences)",
    "icon": "single emoji",
    "priority": 1-5
  }
]

Rules:
- Be specific — mention actual subjects, scores, streaks from the data
- Mix types: include warnings for weak areas, motivation for good streaks, suggestions for improvement
- Keep messages concise and encouraging
- Focus on Sri Lankan O/L exam context`;

    try {
      const raw = await callGeminiStudyBuddy(prompt);
      let clean = raw.replace(/```json|```/g, '').trim();
      const match = clean.match(/\[[\s\S]*\]/);
      if (match) clean = match[0];

      const parsed = JSON.parse(clean) as Array<{
        type: string; title: string; message: string; icon: string; priority: number;
      }>;

      return parsed.map(item => ({
        type: (item.type as StudyRecommendation['type']) || 'suggestion',
        title: { en: item.title, si: item.title },
        message: { en: item.message, si: item.message },
        icon: item.icon || '💡',
        priority: item.priority || 3,
      })).sort((a, b) => b.priority - a.priority);
    } catch (err) {
      console.warn('AI recommendations failed, falling back to rule-based:', err);
      return this.getRecommendations(_userId, language);
    }
  }
}

export const studyBuddyService = new StudyBuddyService();
