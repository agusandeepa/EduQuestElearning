// Admin Dashboard - Full Featured Admin Panel with Persistent Lesson CRUD
import { useState, useEffect, useCallback } from 'react';
import {
  Users, BookOpen, BarChart3, Award, TrendingUp,
  Download, ChevronLeft, Calendar, Target, Trash2,
  Edit3, Plus, X, Save, CheckCircle, AlertCircle,
  FileText, History, Calculator, FlaskConical, Languages,
  Search, RefreshCw, Eye, ShieldCheck
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import {
  getLessons, getMathsLessons, getEnglishLessons, getScienceLessons,
  getProgress, getMathsProgress, getEnglishProgress, getScienceProgress,
  logoutUser,
} from '../../services/localStorage';
import type { Lesson, QuizQuestion } from '../../services/types';

// ── Custom lessons localStorage keys ──────────────────────────────────────
const CUSTOM_LESSONS_KEY = 'admin_custom_lessons';
const DELETED_LESSONS_KEY = 'admin_deleted_lessons';

interface CustomLessonRecord extends Lesson {
  subject: string;
  isCustom?: boolean;
}

interface DeletedRecord {
  subject: string;
  id: number;
}

function getCustomLessons(): CustomLessonRecord[] {
  try {
    const raw = localStorage.getItem(CUSTOM_LESSONS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveCustomLessons(lessons: CustomLessonRecord[]): void {
  localStorage.setItem(CUSTOM_LESSONS_KEY, JSON.stringify(lessons));
}

function getDeletedLessons(): DeletedRecord[] {
  try {
    const raw = localStorage.getItem(DELETED_LESSONS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveDeletedLessons(deleted: DeletedRecord[]): void {
  localStorage.setItem(DELETED_LESSONS_KEY, JSON.stringify(deleted));
}

// ── Types ──────────────────────────────────────────────────────────────────
interface StudentRecord {
  id: number;
  name: string;
  email: string;
  xp: number;
  level: number;
  streak: number;
}

interface SubjectStat {
  subject: string;
  icon: React.ReactNode;
  color: string;
  total: number;
  completed: number;
  avgScore: number;
}

// ── Helpers ────────────────────────────────────────────────────────────────
function getAllUsers(): StudentRecord[] {
  try {
    const raw = localStorage.getItem('all_users');
    if (!raw) return getMockStudents();
    const users = JSON.parse(raw);
    return users.map(({ password: _p, ...u }: any) => u);
  } catch {
    return getMockStudents();
  }
}

function getMockStudents(): StudentRecord[] {
  return [
    { id: 1, name: 'Saman Perera', email: 'saman@example.com', xp: 450, level: 5, streak: 12 },
    { id: 2, name: 'Nimal de Silva', email: 'nimal@example.com', xp: 380, level: 4, streak: 8 },
    { id: 3, name: 'Kamal Jayawardena', email: 'kamal@example.com', xp: 320, level: 4, streak: 15 },
    { id: 4, name: 'Ruwan Fernando', email: 'ruwan@example.com', xp: 290, level: 3, streak: 5 },
    { id: 5, name: 'Sunil Rathnayake', email: 'sunil@example.com', xp: 250, level: 3, streak: 10 },
    { id: 6, name: 'Dilhani Wickrama', email: 'dilhani@example.com', xp: 180, level: 2, streak: 3 },
  ];
}

function calcLevel(xp: number) {
  if (xp >= 1000) return 10;
  if (xp >= 700) return 7;
  if (xp >= 500) return 6;
  if (xp >= 400) return 5;
  if (xp >= 300) return 4;
  if (xp >= 200) return 3;
  if (xp >= 100) return 2;
  return 1;
}

function exportCSV(students: StudentRecord[]) {
  const header = ['#', 'Name', 'Email', 'XP', 'Level', 'Streak'].join(',');
  const rows = students.map((s, i) =>
    [i + 1, `"${s.name}"`, s.email, s.xp, s.level, s.streak].join(',')
  );
  const csv = [header, ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `myedu_students_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

function exportReport(students: StudentRecord[], subjectStats: SubjectStat[]) {
  const lines: string[] = [
    'MyEdu - Admin Report',
    `Generated: ${new Date().toLocaleString()}`,
    '',
    '=== STUDENT SUMMARY ===',
    ['Name', 'Email', 'XP', 'Level', 'Streak'].join(','),
    ...students.map(s => [`"${s.name}"`, s.email, s.xp, s.level, s.streak].join(',')),
    '',
    '=== SUBJECT STATS ===',
    ['Subject', 'Total Lessons', 'Completed', 'Avg Score %'].join(','),
    ...subjectStats.map(s => [s.subject, s.total, s.completed, s.avgScore].join(',')),
  ];
  const blob = new Blob([lines.join('\n')], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `myedu_report_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// ── Empty lesson template ──────────────────────────────────────────────────
function emptyNewLesson() {
  return {
    title: '',
    description: '',
    subject: 'history',
    level: 1,
    xp_reward: 50,
    content_text: '',
    questions: [{ question: '', options: ['', '', '', ''], correct_answer: 0 }] as {
      question: string; options: string[]; correct_answer: number;
    }[],
  };
}

// ── Main Component ─────────────────────────────────────────────────────────
export function AdminDashboard({ onBack }: { onBack: () => void }) {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'lessons' | 'reports'>('overview');

  const [students, setStudents] = useState<StudentRecord[]>([]);
  const [allLessons, setAllLessons] = useState<{ subject: string; lessons: Lesson[] }[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [lessonFilter, setLessonFilter] = useState<'all' | 'history' | 'maths' | 'english' | 'science'>('all');
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const [subjectStats, setSubjectStats] = useState<SubjectStat[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Lesson modals
  const [viewingLesson, setViewingLesson] = useState<(Lesson & { subject: string; isCustom?: boolean }) | null>(null);
  const [editingLesson, setEditingLesson] = useState<CustomLessonRecord | null>(null);
  const [showAddLesson, setShowAddLesson] = useState(false);
  const [newLesson, setNewLesson] = useState(emptyNewLesson());
  const [editForm, setEditForm] = useState<{
    title: string; description: string; level: number; xp_reward: number;
    content_text: string;
    questions: { question: string; options: string[]; correct_answer: number }[];
  } | null>(null);


  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ── Load data ──
  const loadData = () => {
    const s = getAllUsers();
    setStudents(s);

    const deleted = getDeletedLessons();
    const custom = getCustomLessons();

    const isDeleted = (subject: string, id: number) =>
      deleted.some(d => d.subject === subject && d.id === id);

    const filterAndMerge = (subject: string, staticLessons: Lesson[]): Lesson[] => {
      const active = staticLessons.filter(l => !isDeleted(subject, l.id));
      const customForSubject = custom.filter(c => c.subject === subject);
      return [...active, ...customForSubject];
    };

    const historyL = filterAndMerge('history', getLessons());
    const mathsL = filterAndMerge('maths', getMathsLessons());
    const englishL = filterAndMerge('english', getEnglishLessons());
    const scienceL = filterAndMerge('science', getScienceLessons());

    setAllLessons([
      { subject: 'history', lessons: historyL },
      { subject: 'maths', lessons: mathsL },
      { subject: 'english', lessons: englishL },
      { subject: 'science', lessons: scienceL },
    ]);

    const hProg = getProgress();
    const mProg = getMathsProgress();
    const eProg = getEnglishProgress();
    const sProg = getScienceProgress();

    const calcAvg = (prog: any[]) => {
      const done = prog.filter(p => p.completed);
      return done.length ? Math.round(done.reduce((sum, p) => sum + p.score, 0) / done.length) : 0;
    };

    setSubjectStats([
      { subject: 'History', icon: <History className="w-5 h-5" />, color: 'from-purple-500 to-blue-500', total: historyL.length, completed: hProg.filter(p => p.completed).length, avgScore: calcAvg(hProg) },
      { subject: 'Maths', icon: <Calculator className="w-5 h-5" />, color: 'from-orange-500 to-red-500', total: mathsL.length, completed: mProg.filter(p => p.completed).length, avgScore: calcAvg(mProg) },
      { subject: 'English', icon: <Languages className="w-5 h-5" />, color: 'from-green-500 to-teal-500', total: englishL.length, completed: eProg.filter(p => p.completed).length, avgScore: calcAvg(eProg) },
      { subject: 'Science', icon: <FlaskConical className="w-5 h-5" />, color: 'from-cyan-500 to-blue-500', total: scienceL.length, completed: sProg.filter(p => p.completed).length, avgScore: calcAvg(sProg) },
    ]);
  };

  useEffect(() => { loadData(); }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    loadData();
    setTimeout(() => setIsRefreshing(false), 800);
    showToast(language === 'en' ? 'Dashboard refreshed!' : 'Dashboard යාවත්කාලීන කෙරිණි!', 'success');
  };


  // ── Computed values ──
  const totalStudents = students.length;
  const activeStudents = students.filter(s => s.streak > 0).length;
  const totalLessons = allLessons.reduce((sum, s) => sum + s.lessons.length, 0);
  const avgXP = totalStudents ? Math.round(students.reduce((sum, s) => sum + s.xp, 0) / totalStudents) : 0;

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredLessons = allLessons
    .filter(g => lessonFilter === 'all' || g.subject === lessonFilter)
    .flatMap(g => {
      const custom = getCustomLessons();
      return g.lessons.map(l => ({
        ...l,
        subject: g.subject,
        isCustom: custom.some(c => c.subject === g.subject && c.id === l.id),
      }));
    });

  // ── DELETE lesson ──
  const handleDeleteLesson = (lesson: Lesson & { subject: string; isCustom?: boolean }) => {
    const msg = language === 'en' ? 'Delete this lesson permanently?' : 'මෙම පාඩම ස්ථිරවම මකන්නද?';
    if (!confirm(msg)) return;

    if (lesson.isCustom) {
      // Remove from custom lessons
      const updated = getCustomLessons().filter(c => !(c.subject === lesson.subject && c.id === lesson.id));
      saveCustomLessons(updated);
    } else {
      // Add to deleted list so static lesson is hidden
      const deleted = getDeletedLessons();
      if (!deleted.some(d => d.subject === lesson.subject && d.id === lesson.id)) {
        deleted.push({ subject: lesson.subject, id: lesson.id });
        saveDeletedLessons(deleted);
      }
    }
    showToast(language === 'en' ? 'Lesson deleted!' : 'පාඩම මකා දමන ලදී!', 'success');
    loadData();
  };

  // ── ADD lesson ──
  const handleAddLesson = () => {
    if (!newLesson.title.trim()) {
      showToast(language === 'en' ? 'Title is required' : 'මාතෘකාව අවශ්‍යයි', 'error');
      return;
    }
    if (newLesson.questions.some(q => !q.question.trim())) {
      showToast(language === 'en' ? 'All questions need text' : 'සියලුම ප්‍රශ්නවලට පෙළ අවශ්‍යයි', 'error');
      return;
    }
    const custom = getCustomLessons();
    const allIds = [
      ...getLessons(), ...getMathsLessons(), ...getEnglishLessons(), ...getScienceLessons(),
      ...custom,
    ].map(l => l.id);
    const newId = allIds.length > 0 ? Math.max(...allIds) + 1 : 1000;

    const lesson: CustomLessonRecord = {
      id: newId,
      title: newLesson.title.trim(),
      description: newLesson.description.trim(),
      level: newLesson.level,
      xp_reward: newLesson.xp_reward,
      subject: newLesson.subject,
      isCustom: true,
      content: { text: newLesson.content_text.trim() || newLesson.description.trim() },
      quiz: {
        questions: newLesson.questions.map((q, i) => ({
          id: i + 1,
          question: q.question.trim(),
          options: q.options.map(o => o.trim() || `Option ${String.fromCharCode(65 + i)}`),
          correct_answer: q.correct_answer,
        })),
      },
    };

    custom.push(lesson);
    saveCustomLessons(custom);
    showToast(language === 'en' ? 'Lesson added successfully!' : 'පාඩම සාර්ථකව එකතු කරන ලදී!', 'success');
    setShowAddLesson(false);
    setNewLesson(emptyNewLesson());
    loadData();
  };

  // ── EDIT lesson (open modal) ──
  const openEditModal = (lesson: Lesson & { subject: string; isCustom?: boolean }) => {
    setEditingLesson({ ...lesson, subject: lesson.subject, isCustom: lesson.isCustom });
    setEditForm({
      title: lesson.title,
      description: lesson.description,
      level: lesson.level,
      xp_reward: lesson.xp_reward,
      content_text: lesson.content?.text || '',
      questions: lesson.quiz.questions.map(q => ({
        question: q.question,
        options: [...q.options],
        correct_answer: q.correct_answer,
      })),
    });
  };

  // ── SAVE edit ──
  const handleSaveEdit = () => {
    if (!editForm || !editingLesson) return;
    if (!editForm.title.trim()) {
      showToast(language === 'en' ? 'Title is required' : 'මාතෘකාව අවශ්‍යයි', 'error');
      return;
    }
    const custom = getCustomLessons();
    const existing = custom.findIndex(c => c.subject === editingLesson.subject && c.id === editingLesson.id);

    const updatedLesson: CustomLessonRecord = {
      ...editingLesson,
      title: editForm.title.trim(),
      description: editForm.description.trim(),
      level: editForm.level,
      xp_reward: editForm.xp_reward,
      isCustom: true,
      content: { text: editForm.content_text.trim() || editForm.description.trim() },
      quiz: {
        questions: editForm.questions.map((q, i) => ({
          id: i + 1,
          question: q.question.trim(),
          options: q.options.map(o => o.trim()),
          correct_answer: q.correct_answer,
        })),
      },
    };

    if (existing >= 0) {
      custom[existing] = updatedLesson;
    } else {
      // Was a static lesson — save as custom override, mark original as deleted
      const deleted = getDeletedLessons();
      if (!deleted.some(d => d.subject === editingLesson.subject && d.id === editingLesson.id)) {
        deleted.push({ subject: editingLesson.subject, id: editingLesson.id });
        saveDeletedLessons(deleted);
      }
      custom.push(updatedLesson);
    }
    saveCustomLessons(custom);
    showToast(language === 'en' ? 'Lesson updated!' : 'පාඩම යාවත්කාලීන කෙරිණි!', 'success');
    setEditingLesson(null);
    setEditForm(null);
    loadData();
  };

  // ── Subject helpers ──
  const subjectBadge = (subject: string) => {
    const map: Record<string, string> = {
      history: 'bg-purple-100 text-purple-700',
      maths: 'bg-orange-100 text-orange-700',
      english: 'bg-green-100 text-green-700',
      science: 'bg-cyan-100 text-cyan-700',
    };
    return map[subject] || 'bg-gray-100 text-gray-700';
  };

  const subjectLabel = (subject: string) => {
    if (language === 'si') {
      const map: Record<string, string> = { history: 'ඉතිහාසය', maths: 'ගණිතය', english: 'ඉංග්‍රීසි', science: 'විද්‍යාව' };
      return map[subject] || subject;
    }
    return subject.charAt(0).toUpperCase() + subject.slice(1);
  };

  // ── Question editor helpers ──
  const addQuestion = (form: typeof newLesson, setForm: (f: typeof newLesson) => void) => {
    setForm({ ...form, questions: [...form.questions, { question: '', options: ['', '', '', ''], correct_answer: 0 }] });
  };

  const removeQuestion = (form: typeof newLesson, setForm: (f: typeof newLesson) => void, idx: number) => {
    if (form.questions.length <= 1) return;
    const qs = [...form.questions];
    qs.splice(idx, 1);
    setForm({ ...form, questions: qs });
  };

  // ──────────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-5 py-3 rounded-xl shadow-xl text-white text-sm font-semibold transition-all ${toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
          {toast.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={onBack} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium">
                <ChevronLeft className="w-5 h-5" />
                {language === 'en' ? 'Back' : 'ආපසු'}
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-green-600" />
                  {language === 'en' ? 'Admin Dashboard' : 'පරිපාලක පාලක පැනලය'}
                </h1>
                <p className="text-sm text-gray-500">{language === 'en' ? 'Real-time student & lesson management' : 'සිසුන් සහ පාඩම් කළමනාකරණය'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={handleRefresh} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <RefreshCw className={`w-4 h-4 transition-transform duration-700 ${isRefreshing ? 'animate-spin' : ''}`} />
                {language === 'en' ? 'Refresh' : 'යාවත්කාලීන'}
              </button>
              <button
                onClick={() => { logoutUser(); onBack(); }}
                className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg border border-red-200"
              >
                <ShieldCheck className="w-4 h-4" />
                {language === 'en' ? 'Sign Out' : 'ඉවත් වන්න'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Stats Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { icon: <Users className="w-8 h-8 opacity-80" />, value: totalStudents, badge: language === 'en' ? 'Total' : 'මුළු', color: 'from-blue-500 to-blue-600', sub: language === 'en' ? 'Students' : 'සිසුන්' },
            { icon: <TrendingUp className="w-8 h-8 opacity-80" />, value: activeStudents, badge: language === 'en' ? 'Active' : 'ක්‍රියාකාරී', color: 'from-green-500 to-green-600', sub: language === 'en' ? 'Active Students' : 'සක්‍රීය සිසුන්' },
            { icon: <BookOpen className="w-8 h-8 opacity-80" />, value: totalLessons, badge: language === 'en' ? 'All' : 'සියල්ල', color: 'from-purple-500 to-purple-600', sub: language === 'en' ? 'Total Lessons' : 'මුළු පාඩම්' },
            { icon: <Award className="w-8 h-8 opacity-80" />, value: avgXP, badge: language === 'en' ? 'Average' : 'සාමාන්‍ය', color: 'from-orange-500 to-orange-600', sub: language === 'en' ? 'Avg XP Points' : 'සාමාන්‍ය XP' },
          ].map((card, i) => (
            <div key={i} className={`bg-gradient-to-br ${card.color} rounded-xl p-6 text-white shadow-lg`}>
              <div className="flex items-center justify-between mb-2">
                {card.icon}
                <span className="text-xs bg-white/20 px-2 py-1 rounded-full">{card.badge}</span>
              </div>
              <div className="text-3xl font-bold mb-1">{card.value}</div>
              <p className="text-white/80 text-sm">{card.sub}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <div className="flex gap-1 px-4 overflow-x-auto">
              {(['overview', 'students', 'lessons', 'reports'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-4 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${activeTab === tab ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                  {tab === 'overview' && (language === 'en' ? '📊 Overview' : '📊 දළ විශ්ලේෂණය')}
                  {tab === 'students' && (language === 'en' ? '👥 Students' : '👥 සිසුන්')}
                  {tab === 'lessons' && (language === 'en' ? '📚 Lessons' : '📚 පාඩම්')}
                  {tab === 'reports' && (language === 'en' ? '📄 Reports' : '📄 වාර්තා')}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">

            {/* ── OVERVIEW TAB ── */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-900">{language === 'en' ? 'Subject Progress Overview' : 'විෂය ප්‍රගති දළ විශ්ලේෂණය'}</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {subjectStats.map((stat, i) => (
                    <div key={i} className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`bg-gradient-to-r ${stat.color} text-white p-2 rounded-lg`}>{stat.icon}</div>
                        <h4 className="font-bold text-gray-900">{stat.subject}</h4>
                      </div>
                      <div className="grid grid-cols-3 gap-3 mb-3">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-900">{stat.total}</div>
                          <div className="text-xs text-gray-500">{language === 'en' ? 'Total' : 'මුළු'}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">{stat.completed}</div>
                          <div className="text-xs text-gray-500">{language === 'en' ? 'Done' : 'සම්පූර්ණ'}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">{stat.avgScore}%</div>
                          <div className="text-xs text-gray-500">{language === 'en' ? 'Avg Score' : 'සාමාන්‍ය'}</div>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`bg-gradient-to-r ${stat.color} h-2 rounded-full transition-all`}
                          style={{ width: stat.total ? `${Math.min(100, Math.round((stat.completed / stat.total) * 100))}%` : '0%' }}
                        />
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        {stat.total ? Math.round((stat.completed / stat.total) * 100) : 0}% {language === 'en' ? 'completion rate' : 'සම්පූර්ණ කිරීමේ අනුපාතය'}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="grid md:grid-cols-3 gap-4 mt-4">
                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-200 flex items-center gap-3">
                    <Calendar className="w-8 h-8 text-blue-600" />
                    <div>
                      <div className="text-2xl font-bold text-gray-900">
                        {students.length ? Math.round(students.reduce((s, u) => s + u.streak, 0) / students.length) : 0}
                      </div>
                      <p className="text-sm text-gray-600">{language === 'en' ? 'Avg Streak (days)' : 'සාමාන්‍ය Streak'}</p>
                    </div>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4 border border-green-200 flex items-center gap-3">
                    <Target className="w-8 h-8 text-green-600" />
                    <div>
                      <div className="text-2xl font-bold text-gray-900">
                        {subjectStats.length ? Math.round(subjectStats.reduce((s, st) => s + st.avgScore, 0) / subjectStats.length) : 0}%
                      </div>
                      <p className="text-sm text-gray-600">{language === 'en' ? 'Overall Avg Score' : 'සමස්ත සාමාන්‍ය ලකුණු'}</p>
                    </div>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-4 border border-purple-200 flex items-center gap-3">
                    <TrendingUp className="w-8 h-8 text-purple-600" />
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{totalLessons}</div>
                      <p className="text-sm text-gray-600">{language === 'en' ? 'Total O/L Lessons' : 'සා/පෙළ පාඩම් ගණන'}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── STUDENTS TAB ── */}
            {activeTab === 'students' && (
              <div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
                  <h3 className="text-lg font-bold text-gray-900">{language === 'en' ? 'Student List' : 'සිසුන්ගේ ලැයිස්තුව'}</h3>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-56">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        placeholder={language === 'en' ? 'Search students...' : 'සිසුන් සොයන්න...'}
                        className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                      />
                    </div>
                    <button
                      onClick={() => exportCSV(filteredStudents)}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-semibold whitespace-nowrap"
                    >
                      <Download className="w-4 h-4" />
                      {language === 'en' ? 'Export CSV' : 'CSV ගොනුව'}
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto rounded-xl border border-gray-200">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        {['#', language === 'en' ? 'Name' : 'නම', 'Email', 'XP', language === 'en' ? 'Level' : 'මට්ටම', 'Streak'].map(h => (
                          <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredStudents.length === 0 ? (
                        <tr><td colSpan={6} className="text-center py-10 text-gray-400">{language === 'en' ? 'No students found' : 'සිසුන් හමු නොවිණි'}</td></tr>
                      ) : filteredStudents.sort((a, b) => b.xp - a.xp).map((s, i) => (
                        <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 text-sm text-gray-500">{i + 1}</td>
                          <td className="px-4 py-3 font-semibold text-gray-900">{s.name}</td>
                          <td className="px-4 py-3 text-sm text-gray-500">{s.email}</td>
                          <td className="px-4 py-3 text-sm font-bold text-blue-600">{s.xp}</td>
                          <td className="px-4 py-3">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-800">
                              {language === 'en' ? 'Level' : 'මට්ටම'} {calcLevel(s.xp)}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm font-semibold text-gray-800">{s.streak} 🔥</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-gray-400 mt-2">{language === 'en' ? `Showing ${filteredStudents.length} of ${totalStudents} students` : `${totalStudents} සිසුන්ගෙන් ${filteredStudents.length} ක් දිස් වේ`}</p>
              </div>
            )}

            {/* ── LESSONS TAB ── */}
            {activeTab === 'lessons' && (
              <div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
                  <h3 className="text-lg font-bold text-gray-900">{language === 'en' ? 'Lesson Management' : 'පාඩම් කළමනාකරණය'}</h3>
                  <div className="flex gap-2 flex-wrap items-center">
                    {(['all', 'history', 'maths', 'english', 'science'] as const).map(f => (
                      <button
                        key={f}
                        onClick={() => setLessonFilter(f)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all ${lessonFilter === f ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                      >
                        {f === 'all' ? (language === 'en' ? 'All' : 'සියල්ල') : subjectLabel(f)}
                      </button>
                    ))}
                    <button
                      onClick={() => { setShowAddLesson(true); setNewLesson(emptyNewLesson()); }}
                      className="flex items-center gap-1.5 px-4 py-1.5 bg-green-600 text-white text-xs font-bold rounded-full hover:bg-green-700 transition-colors ml-2"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      {language === 'en' ? 'Add Lesson' : 'පාඩමක් එකතු කරන්න'}
                    </button>
                  </div>
                </div>

                {/* Info banner — now shows "changes are persistent" */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4 flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-green-700">
                    {language === 'en'
                      ? 'Add, edit, and delete lessons — changes are saved to this browser\'s storage and are persistent across sessions.'
                      : 'පාඩම් Add, Edit, Delete කළ හැකිය — වෙනස්කම් browser storage හි ස්ථිරව සුරකිනු ලැබේ.'}
                  </p>
                </div>

                <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                  {filteredLessons.length === 0 ? (
                    <div className="text-center py-10 text-gray-400">{language === 'en' ? 'No lessons found' : 'පාඩම් හමු නොවිණි'}</div>
                  ) : filteredLessons.map(lesson => (
                    <div key={`${lesson.subject}-${lesson.id}`} className={`flex items-start justify-between p-4 rounded-xl border transition-colors group ${lesson.isCustom ? 'bg-green-50 border-green-200 hover:border-green-400' : 'bg-gray-50 border-gray-200 hover:border-green-300'}`}>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${subjectBadge(lesson.subject)}`}>{subjectLabel(lesson.subject)}</span>
                          <span className="text-xs text-gray-400">L{lesson.level} • {lesson.xp_reward} XP • {lesson.quiz.questions.length} Qs</span>
                          {lesson.isCustom && (
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">
                              {language === 'en' ? '✏️ Custom' : '✏️ අභිරුචි'}
                            </span>
                          )}
                        </div>
                        <h4 className="font-semibold text-gray-900 truncate">{lesson.title}</h4>
                        <p className="text-xs text-gray-500 mt-0.5 truncate">{lesson.description}</p>
                      </div>
                      <div className="flex gap-1 ml-3 shrink-0">
                        <button
                          onClick={() => setViewingLesson(lesson)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title={language === 'en' ? 'View' : 'බලන්න'}
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openEditModal(lesson)}
                          className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                          title={language === 'en' ? 'Edit' : 'සංස්කරණය'}
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteLesson(lesson)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title={language === 'en' ? 'Delete' : 'මකන්න'}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-2">{filteredLessons.length} {language === 'en' ? 'lessons' : 'පාඩම්'}</p>
              </div>
            )}

            {/* ── REPORTS TAB ── */}
            {activeTab === 'reports' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900">{language === 'en' ? 'Generate Reports' : 'වාර්තා ජනනය'}</h3>
                  <button
                    onClick={() => exportReport(students, subjectStats)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-semibold"
                  >
                    <Download className="w-4 h-4" />
                    {language === 'en' ? 'Export Full Report' : 'සම්පූර්ණ වාර්තාව'}
                  </button>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {subjectStats.map((stat, i) => (
                    <div key={i} className="bg-white border-2 border-gray-200 rounded-xl p-5 hover:border-green-400 transition-all">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`bg-gradient-to-r ${stat.color} text-white p-2 rounded-lg`}>{stat.icon}</div>
                        <div>
                          <h4 className="font-bold text-gray-900">{stat.subject} {language === 'en' ? 'Report' : 'වාර්තාව'}</h4>
                          <p className="text-xs text-gray-500">{language === 'en' ? 'Live data from progress records' : 'ප්‍රගති දත්ත වලින්'}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        <div className="bg-gray-50 rounded-lg p-3 text-center">
                          <div className="text-xl font-bold text-gray-900">{stat.total}</div>
                          <div className="text-xs text-gray-500">{language === 'en' ? 'Lessons' : 'පාඩම්'}</div>
                        </div>
                        <div className="bg-green-50 rounded-lg p-3 text-center">
                          <div className="text-xl font-bold text-green-600">{stat.completed}</div>
                          <div className="text-xs text-gray-500">{language === 'en' ? 'Completed' : 'සම්පූර්ණ'}</div>
                        </div>
                        <div className="bg-blue-50 rounded-lg p-3 text-center">
                          <div className="text-xl font-bold text-blue-600">{stat.avgScore}%</div>
                          <div className="text-xs text-gray-500">{language === 'en' ? 'Avg Score' : 'සාමාන්‍ය'}</div>
                        </div>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2 mb-1">
                        <div className={`bg-gradient-to-r ${stat.color} h-2 rounded-full`} style={{ width: stat.total ? `${Math.min(100, Math.round((stat.completed / stat.total) * 100))}%` : '0%' }} />
                      </div>
                      <p className="text-xs text-gray-400">
                        {stat.total ? Math.round((stat.completed / stat.total) * 100) : 0}% {language === 'en' ? 'completion' : 'සම්පූර්ණ'}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-5">
                  <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-yellow-500" />
                    {language === 'en' ? 'Top Students by XP' : 'ඉහළ සිසුන් (XP අනුව)'}
                  </h4>
                  <div className="space-y-2">
                    {students.sort((a, b) => b.xp - a.xp).slice(0, 5).map((s, i) => (
                      <div key={s.id} className="flex items-center gap-3">
                        <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white ${i === 0 ? 'bg-yellow-400' : i === 1 ? 'bg-gray-400' : i === 2 ? 'bg-amber-600' : 'bg-gray-300'}`}>
                          {i + 1}
                        </span>
                        <span className="flex-1 text-sm font-medium text-gray-900">{s.name}</span>
                        <span className="text-sm font-bold text-blue-600">{s.xp} XP</span>
                        <span className="text-sm text-gray-400">{s.streak}🔥</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ══════════ VIEW LESSON MODAL ══════════ */}
      {viewingLesson && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b">
              <div>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${subjectBadge(viewingLesson.subject)}`}>{subjectLabel(viewingLesson.subject)}</span>
                <h3 className="font-bold text-gray-900 mt-1">{viewingLesson.title}</h3>
              </div>
              <button onClick={() => setViewingLesson(null)} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-5 space-y-4">
              <p className="text-sm text-gray-600">{viewingLesson.description}</p>
              <div className="flex gap-3 flex-wrap">
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">Level {viewingLesson.level}</span>
                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">{viewingLesson.xp_reward} XP</span>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">{viewingLesson.quiz.questions.length} Questions</span>
              </div>
              {viewingLesson.content?.text && (
                <div>
                  <h4 className="text-sm font-bold text-gray-700 mb-1">{language === 'en' ? 'Content' : 'අන්තර්ගතය'}</h4>
                  <p className="text-xs text-gray-600 bg-gray-50 rounded-lg p-3 line-clamp-4">{viewingLesson.content.text}</p>
                </div>
              )}
              <div>
                <h4 className="text-sm font-bold text-gray-700 mb-2">{language === 'en' ? 'Quiz Questions' : 'ප්‍රශ්නාවලිය'}</h4>
                <div className="space-y-2">
                  {viewingLesson.quiz.questions.map((q, i) => (
                    <div key={i} className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs font-semibold text-gray-700">Q{i + 1}. {q.question}</p>
                      <div className="mt-1 space-y-0.5">
                        {q.options.map((opt, oi) => (
                          <p key={oi} className={`text-xs pl-3 ${oi === q.correct_answer ? 'text-green-600 font-semibold' : 'text-gray-500'}`}>
                            {String.fromCharCode(65 + oi)}. {opt} {oi === q.correct_answer ? '✓' : ''}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════ EDIT LESSON MODAL ══════════ */}
      {editingLesson && editForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b sticky top-0 bg-white z-10">
              <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-amber-500" />
                {language === 'en' ? 'Edit Lesson' : 'පාඩම සංස්කරණය'}
              </h3>
              <button onClick={() => { setEditingLesson(null); setEditForm(null); }} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-5 space-y-4">
              {/* Basic fields */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">{language === 'en' ? 'Title *' : 'මාතෘකාව *'}</label>
                  <input value={editForm.title} onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-green-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">{language === 'en' ? 'Subject' : 'විෂය'}</label>
                  <input value={subjectLabel(editingLesson.subject)} disabled
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-500" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">{language === 'en' ? 'Description' : 'විස්තරය'}</label>
                <textarea value={editForm.description} onChange={e => setEditForm({ ...editForm, description: e.target.value })} rows={2}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 resize-none" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">{language === 'en' ? 'Level' : 'මට්ටම'}</label>
                  <input type="number" min={1} max={10} value={editForm.level} onChange={e => setEditForm({ ...editForm, level: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-green-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">XP Reward</label>
                  <input type="number" min={10} step={10} value={editForm.xp_reward} onChange={e => setEditForm({ ...editForm, xp_reward: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-green-500" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">{language === 'en' ? 'Lesson Content' : 'පාඩම් අන්තර්ගතය'}</label>
                <textarea value={editForm.content_text} onChange={e => setEditForm({ ...editForm, content_text: e.target.value })} rows={3}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 resize-none"
                  placeholder={language === 'en' ? 'Lesson content text...' : 'පාඩම් පෙළ...'} />
              </div>

              {/* Quiz questions */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-gray-600">{language === 'en' ? 'Quiz Questions' : 'ප්‍රශ්නාවලිය'}</label>
                  <button
                    onClick={() => setEditForm({ ...editForm, questions: [...editForm.questions, { question: '', options: ['', '', '', ''], correct_answer: 0 }] })}
                    className="text-xs text-green-600 hover:text-green-700 font-semibold flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> {language === 'en' ? 'Add Question' : 'ප්‍රශ්නයක් එකතු කරන්න'}
                  </button>
                </div>
                <div className="space-y-3">
                  {editForm.questions.map((q, qi) => (
                    <div key={qi} className="bg-gray-50 rounded-xl p-3 border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-gray-600">Q{qi + 1}</span>
                        {editForm.questions.length > 1 && (
                          <button onClick={() => {
                            const qs = [...editForm.questions]; qs.splice(qi, 1);
                            setEditForm({ ...editForm, questions: qs });
                          }} className="text-red-400 hover:text-red-600"><X className="w-3.5 h-3.5" /></button>
                        )}
                      </div>
                      <input value={q.question}
                        onChange={e => { const qs = [...editForm.questions]; qs[qi] = { ...qs[qi], question: e.target.value }; setEditForm({ ...editForm, questions: qs }); }}
                        placeholder={language === 'en' ? 'Question text...' : 'ප්‍රශ්නය...'}
                        className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 mb-2" />
                      <div className="grid grid-cols-2 gap-2">
                        {q.options.map((opt, oi) => (
                          <div key={oi} className="flex items-center gap-1.5">
                            <input type="radio" name={`edit-correct-${qi}`} checked={q.correct_answer === oi}
                              onChange={() => { const qs = [...editForm.questions]; qs[qi] = { ...qs[qi], correct_answer: oi }; setEditForm({ ...editForm, questions: qs }); }}
                              className="accent-green-600" title={language === 'en' ? 'Correct answer' : 'නිවැරදි පිළිතුර'} />
                            <input value={opt}
                              onChange={e => { const qs = [...editForm.questions]; const opts = [...qs[qi].options]; opts[oi] = e.target.value; qs[qi] = { ...qs[qi], options: opts }; setEditForm({ ...editForm, questions: qs }); }}
                              placeholder={`${String.fromCharCode(65 + oi)}`}
                              className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-green-500" />
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-gray-400 mt-1">{language === 'en' ? '🔘 Select the correct answer' : '🔘 නිවැරදි පිළිතුර තෝරන්න'}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button onClick={() => { setEditingLesson(null); setEditForm(null); }}
                  className="flex-1 py-2.5 border border-gray-300 text-gray-600 rounded-xl text-sm font-semibold hover:bg-gray-50">
                  {language === 'en' ? 'Cancel' : 'අවලංගු කරන්න'}
                </button>
                <button onClick={handleSaveEdit}
                  className="flex-1 py-2.5 bg-green-600 text-white rounded-xl text-sm font-bold hover:bg-green-700 flex items-center justify-center gap-2">
                  <Save className="w-4 h-4" />
                  {language === 'en' ? 'Save Changes' : 'වෙනස්කම් සුරකින්න'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════ ADD LESSON MODAL ══════════ */}
      {showAddLesson && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b sticky top-0 bg-white z-10">
              <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                <Plus className="w-5 h-5 text-green-500" />
                {language === 'en' ? 'Add New Lesson' : 'නව පාඩමක් එකතු කරන්න'}
              </h3>
              <button onClick={() => setShowAddLesson(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">{language === 'en' ? 'Title *' : 'මාතෘකාව *'}</label>
                  <input value={newLesson.title} onChange={e => setNewLesson({ ...newLesson, title: e.target.value })}
                    placeholder={language === 'en' ? 'Lesson title...' : 'පාඩමේ මාතෘකාව...'}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-green-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">{language === 'en' ? 'Subject *' : 'විෂය *'}</label>
                  <select value={newLesson.subject} onChange={e => setNewLesson({ ...newLesson, subject: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-green-500">
                    <option value="history">{language === 'en' ? 'History' : 'ඉතිහාසය'}</option>
                    <option value="maths">{language === 'en' ? 'Maths' : 'ගණිතය'}</option>
                    <option value="english">{language === 'en' ? 'English' : 'ඉංග්‍රීසි'}</option>
                    <option value="science">{language === 'en' ? 'Science' : 'විද්‍යාව'}</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">{language === 'en' ? 'Description' : 'විස්තරය'}</label>
                <textarea value={newLesson.description} onChange={e => setNewLesson({ ...newLesson, description: e.target.value })} rows={2}
                  placeholder={language === 'en' ? 'Short description...' : 'කෙටි විස්තරය...'}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 resize-none" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">{language === 'en' ? 'Level' : 'මට්ටම'}</label>
                  <input type="number" min={1} max={10} value={newLesson.level} onChange={e => setNewLesson({ ...newLesson, level: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-green-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">XP Reward</label>
                  <input type="number" min={10} step={10} value={newLesson.xp_reward} onChange={e => setNewLesson({ ...newLesson, xp_reward: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-green-500" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">{language === 'en' ? 'Lesson Content' : 'පාඩම් අන්තර්ගතය'}</label>
                <textarea value={newLesson.content_text} onChange={e => setNewLesson({ ...newLesson, content_text: e.target.value })} rows={3}
                  placeholder={language === 'en' ? 'Lesson content text...' : 'පාඩම් පෙළ...'}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 resize-none" />
              </div>

              {/* Quiz questions */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-gray-600">{language === 'en' ? 'Quiz Questions *' : 'ප්‍රශ්නාවලිය *'}</label>
                  <button
                    onClick={() => setNewLesson({ ...newLesson, questions: [...newLesson.questions, { question: '', options: ['', '', '', ''], correct_answer: 0 }] })}
                    className="text-xs text-green-600 hover:text-green-700 font-semibold flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> {language === 'en' ? 'Add Question' : 'ප්‍රශ්නයක් එකතු කරන්න'}
                  </button>
                </div>
                <div className="space-y-3">
                  {newLesson.questions.map((q, qi) => (
                    <div key={qi} className="bg-gray-50 rounded-xl p-3 border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-gray-600">Q{qi + 1}</span>
                        {newLesson.questions.length > 1 && (
                          <button onClick={() => {
                            const qs = [...newLesson.questions]; qs.splice(qi, 1);
                            setNewLesson({ ...newLesson, questions: qs });
                          }} className="text-red-400 hover:text-red-600"><X className="w-3.5 h-3.5" /></button>
                        )}
                      </div>
                      <input value={q.question}
                        onChange={e => { const qs = [...newLesson.questions]; qs[qi] = { ...qs[qi], question: e.target.value }; setNewLesson({ ...newLesson, questions: qs }); }}
                        placeholder={language === 'en' ? 'Question text...' : 'ප්‍රශ්නය...'}
                        className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 mb-2" />
                      <div className="grid grid-cols-2 gap-2">
                        {q.options.map((opt, oi) => (
                          <div key={oi} className="flex items-center gap-1.5">
                            <input type="radio" name={`new-correct-${qi}`} checked={q.correct_answer === oi}
                              onChange={() => { const qs = [...newLesson.questions]; qs[qi] = { ...qs[qi], correct_answer: oi }; setNewLesson({ ...newLesson, questions: qs }); }}
                              className="accent-green-600" title={language === 'en' ? 'Correct answer' : 'නිවැරදි පිළිතුර'} />
                            <input value={opt}
                              onChange={e => { const qs = [...newLesson.questions]; const opts = [...qs[qi].options]; opts[oi] = e.target.value; qs[qi] = { ...qs[qi], options: opts }; setNewLesson({ ...newLesson, questions: qs }); }}
                              placeholder={`Option ${String.fromCharCode(65 + oi)}`}
                              className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-green-500" />
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-gray-400 mt-1">{language === 'en' ? '🔘 Select the correct answer' : '🔘 නිවැරදි පිළිතුර තෝරන්න'}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowAddLesson(false)}
                  className="flex-1 py-2.5 border border-gray-300 text-gray-600 rounded-xl text-sm font-semibold hover:bg-gray-50">
                  {language === 'en' ? 'Cancel' : 'අවලංගු කරන්න'}
                </button>
                <button onClick={handleAddLesson}
                  className="flex-1 py-2.5 bg-green-600 text-white rounded-xl text-sm font-bold hover:bg-green-700 flex items-center justify-center gap-2">
                  <Save className="w-4 h-4" />
                  {language === 'en' ? 'Save Lesson' : 'පාඩම සුරකින්න'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
