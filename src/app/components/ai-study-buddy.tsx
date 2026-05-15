import { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import {
  Brain,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  Calendar,
  Clock,
  Award,
  Target,
  BookOpen,
  BarChart3,
  Zap,
  ArrowLeft,
  Flame,
  CheckCircle2,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../hooks/useAuth';
import { studyBuddyService, StudyRecommendation, SubjectStats } from '../../services/studyBuddyService';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

export function AIStudyBuddy({ onBack }: { onBack: () => void }) {
  const { language } = useLanguage();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'predictions' | 'plan'>('overview');
  const [aiRecommendations, setAiRecommendations] = useState<StudyRecommendation[]>([]);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // ── Reactive data state (auto-updates when localStorage changes) ─────────────
  const [analytics, setAnalytics] = useState(() =>
    user ? studyBuddyService.getStudyAnalytics(String(user.id)) : null
  );
  const [recommendations, setRecommendations] = useState(() =>
    user ? studyBuddyService.getRecommendations(String(user.id), language) : []
  );
  const [prediction, setPrediction] = useState(() =>
    user ? studyBuddyService.predictPerformance(String(user.id)) : null
  );
  const [studyPlan, setStudyPlan] = useState(() =>
    user ? studyBuddyService.generateStudyPlan(String(user.id), new Date('2026-12-01'), 10) : null
  );

  if (!user || !analytics || !prediction || !studyPlan) return null;

  /** Re-read all data from localStorage and refresh state */
  const refreshData = useCallback(() => {
    if (!user) return;
    setAnalytics(studyBuddyService.getStudyAnalytics(String(user.id)));
    setRecommendations(studyBuddyService.getRecommendations(String(user.id), language));
    setPrediction(studyBuddyService.predictPerformance(String(user.id)));
    setStudyPlan(studyBuddyService.generateStudyPlan(String(user.id), new Date('2026-12-01'), 10));
    setLastUpdated(new Date());
  }, [user, language]);

  // ── Auto-update: refresh immediately when the logged-in user changes ──────────
  // This fires when a different user logs in so dashboard shows THEIR data
  useEffect(() => {
    refreshData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  // ── Auto-update: listen to localStorage changes from other tabs/windows ──────
  useEffect(() => {
    const handleStorageEvent = (e: StorageEvent) => {
      if (!e.key) return;
      // Watch user-specific progress keys (format: subject_app_progress_{userId})
      // and also the user key for streak/XP updates
      const isProgressKey =
        e.key.startsWith('history_app_progress_') ||
        e.key.startsWith('maths_app_progress_') ||
        e.key.startsWith('english_app_progress_') ||
        e.key.startsWith('science_app_progress_') ||
        e.key.startsWith('history_app_quiz_results_') ||
        e.key === 'history_app_user';
      if (isProgressKey) {
        refreshData();
      }
    };
    window.addEventListener('storage', handleStorageEvent);
    return () => window.removeEventListener('storage', handleStorageEvent);
  }, [refreshData]);

  // ── Auto-update: poll every 30s to catch same-tab localStorage writes ────────
  useEffect(() => {
    const interval = setInterval(() => {
      refreshData();
    }, 30_000);
    return () => clearInterval(interval);
  }, [refreshData]);

  // ── Auto-update: re-run when tab becomes visible again (user returns) ─────────
  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        refreshData();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [refreshData]);

  // Display: use AI recs if loaded, otherwise fall back to rule-based
  const displayedRecommendations = aiRecommendations.length > 0 ? aiRecommendations : recommendations;

  const loadAIRecommendations = useCallback(async () => {
    if (!user) return;
    setAiLoading(true);
    setAiError(false);
    try {
      const recs = await studyBuddyService.getAIRecommendations(String(user.id), language);
      setAiRecommendations(recs);
      setLastUpdated(new Date());
    } catch {
      setAiError(true);
    } finally {
      setAiLoading(false);
    }
  }, [user, language]);

  useEffect(() => {
    loadAIRecommendations();
  }, [loadAIRecommendations]);

  const content = language === 'en' ? {
    title: 'AI Study Buddy',
    subtitle: 'Your Personal Learning Coach powered by AI',
    tabs: {
      overview: 'Overview',
      predictions: 'Predictions',
      plan: 'Study Plan'
    },
    overview: {
      recommendations: 'Smart Recommendations',
      stats: 'Your Statistics',
      performance: 'Performance Analysis',
      learningStyle: 'Learning Style Analysis',
      weakAreas: 'Areas to Improve',
      progress: 'Weekly Progress'
    },
    predictions: {
      title: 'Exam Readiness Prediction',
      predictedScore: 'Predicted O/L Score',
      readiness: 'Exam Readiness',
      completion: 'Estimated Completion',
      confidence: 'Confidence Level'
    },
    plan: {
      title: 'Personalized Study Plan',
      subtitle: 'AI-generated schedule based on your pace and weak areas',
      totalDays: 'Total Study Days',
      hoursPerWeek: 'Hours per Week',
      upcoming: 'Upcoming Lessons'
    },
    stats: {
      totalTime: 'Total Study Time',
      avgScore: 'Average Score',
      completed: 'Lessons Completed',
      streak: 'Current Streak',
      days: 'days',
      hours: 'hours',
      minutes: 'min'
    }
  } : {
    title: 'AI අධ්‍යයන මිතුරා',
    subtitle: 'AI මගින් බල ගැන්වෙන ඔබේ පුද්ගලික ඉගෙනුම් පුහුණුකරු',
    tabs: {
      overview: 'දළ විශ්ලේෂණය',
      predictions: 'පුරෝකථන',
      plan: 'අධ්‍යයන සැලැස්ම'
    },
    overview: {
      recommendations: 'බුද්ධිමත් නිර්දේශ',
      stats: 'ඔබේ සංඛ්‍යාලේඛන',
      performance: 'කාර්ය සාධන විශ්ලේෂණය',
      learningStyle: 'ඉගෙනුම් ශෛලිය විශ්ලේෂණය',
      weakAreas: 'වැඩිදියුණු කළ යුතු ක්ෂේත්‍ර',
      progress: 'සතිපතා ප්‍රගතිය'
    },
    predictions: {
      title: 'විභාග සූදානම් පුරෝකථනය',
      predictedScore: 'පුරෝකථනය කළ O/L ලකුණු',
      readiness: 'විභාග සූදානම',
      completion: 'ඇස්තමේන්තුගත සම්පූර්ණ කිරීම',
      confidence: 'විශ්වාස මට්ටම'
    },
    plan: {
      title: 'පුද්ගලීකරණය කළ අධ්‍යයන සැලැස්ම',
      subtitle: 'ඔබේ වේගය සහ දුර්වල ක්ෂේත්‍ර මත පදනම්ව AI ජනනය කළ කාලසටහන',
      totalDays: 'මුළු අධ්‍යයන දින',
      hoursPerWeek: 'සතියකට පැය',
      upcoming: 'ඉදිරි පාඩම්'
    },
    stats: {
      totalTime: 'මුළු අධ්‍යයන කාලය',
      avgScore: 'සාමාන්‍ය ලකුණු',
      completed: 'සම්පූර්ණ කළ පාඩම්',
      streak: 'වත්මන් Streak',
      days: 'දින',
      hours: 'පැය',
      minutes: 'මිනිත්තු'
    }
  };

  // Chart colors
  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

  // Prepare chart data
  const learningStyleData = [
    { subject: language === 'en' ? 'Visual' : 'දෘශ්‍යමය', A: analytics.learningStyle.visual, fullMark: 100 },
    { subject: language === 'en' ? 'Reading' : 'කියවීම', A: analytics.learningStyle.reading, fullMark: 100 },
    { subject: language === 'en' ? 'Practical' : 'ප්‍රායෝගික', A: analytics.learningStyle.practical, fullMark: 100 }
  ];

  const completionData = [
    { name: language === 'en' ? 'Completed' : 'සම්පූර්ණයි', value: analytics.completedLessons },
    { name: language === 'en' ? 'Remaining' : 'ඉතිරියි', value: analytics.totalLessons - analytics.completedLessons }
  ];

  // Format time
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours} ${content.stats.hours} ${mins} ${content.stats.minutes}`;
    }
    return `${mins} ${content.stats.minutes}`;
  };

  // Get recommendation icon
  const getRecommendationIcon = (rec: StudyRecommendation) => {
    switch (rec.type) {
      case 'warning': return <AlertTriangle className="w-6 h-6 text-orange-500" />;
      case 'suggestion': return <Lightbulb className="w-6 h-6 text-blue-500" />;
      case 'motivation': return <Zap className="w-6 h-6 text-yellow-500" />;
      case 'achievement': return <Award className="w-6 h-6 text-green-500" />;
      default: return <Brain className="w-6 h-6 text-purple-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-3xl p-8 mb-8 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <Button
              onClick={onBack}
              variant="outline"
              className="bg-white/20 text-white border-white/30 hover:bg-white/30"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {language === 'en' ? 'Back to Home' : 'මුල් පිටුවට'}
            </Button>

            {/* Live data indicator + manual refresh */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-white/20 rounded-full px-3 py-1.5 text-sm">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                {language === 'en' ? 'Live Data' : 'සජීවී දත්ත'}
                {lastUpdated && (
                  <span className="text-white/70 text-xs ml-1">
                    · {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                )}
              </div>
              <Button
                onClick={refreshData}
                variant="outline"
                size="sm"
                className="bg-white/20 text-white border-white/30 hover:bg-white/30"
              >
                <RefreshCw className="w-4 h-4 mr-1" />
                {language === 'en' ? 'Refresh' : 'යාවත්කාලීන'}
              </Button>
            </div>
          </div>
          
          <div className="flex items-center gap-3 mb-3">
            <Brain className="w-10 h-10" />
            <h1 className="text-4xl font-bold">{content.title}</h1>
          </div>
          <p className="text-white/90 text-lg">{content.subtitle}</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-3 mb-8">
          {(['overview', 'predictions', 'plan'] as const).map(tab => (
            <Button
              key={tab}
              onClick={() => setActiveTab(tab)}
              variant={activeTab === tab ? 'default' : 'outline'}
              className={activeTab === tab ? 'bg-gradient-to-r from-purple-600 to-blue-600' : ''}
            >
              {tab === 'overview' && <BarChart3 className="w-4 h-4 mr-2" />}
              {tab === 'predictions' && <TrendingUp className="w-4 h-4 mr-2" />}
              {tab === 'plan' && <Calendar className="w-4 h-4 mr-2" />}
              {content.tabs[tab]}
            </Button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Recommendations */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Lightbulb className="w-6 h-6 text-yellow-500" />
                  {content.overview.recommendations}
                  {aiRecommendations.length > 0 && (
                    <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold">
                      <Sparkles className="w-3 h-3" />
                      {language === 'en' ? 'AI Powered' : 'AI බල ගැන්වූ'}
                    </span>
                  )}
                </h2>
                <div className="flex items-center gap-3">
                  {lastUpdated && (
                    <span className="text-xs text-gray-400">
                      {language === 'en' ? 'Updated' : 'යාවත්කාලීන'}: {lastUpdated.toLocaleTimeString()}
                    </span>
                  )}
                  <Button
                    onClick={loadAIRecommendations}
                    disabled={aiLoading}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <RefreshCw className={`w-4 h-4 ${aiLoading ? 'animate-spin' : ''}`} />
                    {aiLoading
                      ? (language === 'en' ? 'Analyzing...' : 'විශ්ලේෂණය කරනවා...')
                      : (language === 'en' ? 'Refresh AI' : 'AI යාවත්කාලීන')}
                  </Button>
                </div>
              </div>

              {/* Loading skeleton */}
              {aiLoading && aiRecommendations.length === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="p-6 rounded-2xl border-2 border-gray-100 dark:border-gray-700 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 animate-pulse">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-gray-200" />
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-2/3" />
                          <div className="h-3 bg-gray-200 rounded w-full" />
                          <div className="h-3 bg-gray-200 rounded w-4/5" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Error notice */}
              {aiError && (
                <div className="mb-4 p-3 rounded-xl bg-orange-50 border border-orange-200 text-sm text-orange-700">
                  {language === 'en'
                    ? '⚠️ AI analysis unavailable. Showing smart recommendations instead.'
                    : '⚠️ AI විශ්ලේෂණය නොලැබුණා. ඒ වෙනුවට smart නිර්දේශ පෙන්වනවා.'}
                </div>
              )}

              {/* Recommendations grid */}
              {(!aiLoading || displayedRecommendations.length > 0) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {displayedRecommendations.map((rec, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-6 rounded-2xl border-2 ${
                        rec.type === 'warning' ? 'bg-orange-50 border-orange-200' :
                        rec.type === 'suggestion' ? 'bg-blue-50 border-blue-200' :
                        rec.type === 'motivation' ? 'bg-yellow-50 border-yellow-200' :
                        'bg-green-50 border-green-200'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {getRecommendationIcon(rec)}
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 mb-2">{rec.title[language]}</h3>
                          <p className="text-sm text-gray-700">{rec.message[language]}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-3xl p-6 shadow-xl"
              >
                <Clock className="w-8 h-8 mb-3 opacity-80" />
                <p className="text-sm opacity-90 mb-1">{content.stats.totalTime}</p>
                <p className="text-3xl font-bold">{formatTime(analytics.totalStudyTime)}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-3xl p-6 shadow-xl"
              >
                <Target className="w-8 h-8 mb-3 opacity-80" />
                <p className="text-sm opacity-90 mb-1">{content.stats.avgScore}</p>
                <p className="text-3xl font-bold">{analytics.averageScore}%</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-3xl p-6 shadow-xl"
              >
                <BookOpen className="w-8 h-8 mb-3 opacity-80" />
                <p className="text-sm opacity-90 mb-1">{content.stats.completed}</p>
                <p className="text-3xl font-bold">{analytics.completedLessons}/{analytics.totalLessons}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-3xl p-6 shadow-xl"
              >
                <Flame className="w-8 h-8 mb-3 opacity-80" />
                <p className="text-sm opacity-90 mb-1">{content.stats.streak}</p>
                <p className="text-3xl font-bold">{analytics.currentStreak} {content.stats.days}</p>
              </motion.div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Weekly Progress */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">{content.overview.progress}</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analytics.weeklyProgress}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="id" tickFormatter={(value) => {
                      const item = analytics.weeklyProgress.find(w => w.id === value);
                      return item?.week || value;
                    }} />
                    <YAxis />
                    <Tooltip labelFormatter={(value) => {
                      const item = analytics.weeklyProgress.find(w => w.id === value);
                      return item?.week || value;
                    }} />
                    <Legend />
                    <Bar 
                      dataKey="lessonsCompleted" 
                      fill="#10b981" 
                      name={language === 'en' ? 'Lessons' : 'පාඩම්'} 
                    />
                    <Bar 
                      dataKey="averageScore" 
                      fill="#3b82f6" 
                      name={language === 'en' ? 'Score' : 'ලකුණු'} 
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Completion Progress */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">{content.stats.completed}</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={completionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {completionData.map((entry, index) => (
                        <Cell key={`completion-cell-${entry.name}-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Learning Style */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">{content.overview.learningStyle}</h3>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={learningStyleData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar name="Score" dataKey="A" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Subject Progress */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-purple-500" />
                {language === 'en' ? 'Subject Progress' : 'විෂය ප්‍රගතිය'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {analytics.subjectStats.map((subj: SubjectStats) => (
                  <motion.div
                    key={subj.subject}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl p-5 hover:shadow-md transition-all"
                    style={{ border: `2px solid ${subj.color}40`, background: `${subj.color}08` }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-bold text-gray-900">
                        {language === 'en' ? subj.label.en : subj.label.si}
                      </span>
                      <span
                        className="text-sm font-semibold px-3 py-1 rounded-full text-white"
                        style={{ backgroundColor: subj.color }}
                      >
                        {subj.completedLessons}/{subj.totalLessons}
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-3 mb-2">
                      <div
                        className="h-3 rounded-full transition-all duration-700"
                        style={{ width: `${subj.completionPercent}%`, backgroundColor: subj.color }}
                      />
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{subj.completionPercent}% {language === 'en' ? 'complete' : 'සම්පූර්ණයි'}</span>
                      <span>
                        {language === 'en' ? 'Avg:' : 'සාමා:'}{' '}
                        <span className="font-semibold" style={{ color: subj.color }}>
                          {subj.averageScore > 0 ? `${subj.averageScore}%` : (language === 'en' ? 'N/A' : 'නැත')}
                        </span>
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Weak Areas */}
            {analytics.weakAreas.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">{content.overview.weakAreas}</h3>
                <div className="space-y-4">
                  {analytics.weakAreas.map((area, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="flex justify-between mb-2">
                          <span className="font-semibold text-gray-900">
                            {language === 'en' ? area.topic : area.topicSi}
                          </span>
                          <span className="text-sm text-gray-600">{area.averageScore}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full"
                            style={{ width: `${area.averageScore}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Predictions Tab */}
        {activeTab === 'predictions' && (
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-blue-500" />
                {content.predictions.title}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200">
                  <p className="text-sm text-gray-600 mb-2">{content.predictions.predictedScore}</p>
                  <p className="text-4xl font-bold text-blue-600">{prediction.predictedScore}%</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200">
                  <p className="text-sm text-gray-600 mb-2">{content.predictions.readiness}</p>
                  <p className="text-4xl font-bold text-green-600">{prediction.examReadiness}%</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
                  <p className="text-sm text-gray-600 mb-2">{content.predictions.completion}</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {prediction.estimatedCompletionDate.toLocaleDateString(language === 'si' ? 'si-LK' : 'en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border-2 border-orange-200">
                  <p className="text-sm text-gray-600 mb-2">{content.predictions.confidence}</p>
                  <p className="text-4xl font-bold text-orange-600">{prediction.confidenceLevel}%</p>
                </div>
              </div>

              <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border-2 border-blue-200">
                <p className="text-gray-700 dark:text-gray-300 text-center">
                  {language === 'en'
                    ? '🎯 Based on your current performance and study patterns, our AI predicts you will score well. Keep up the great work!'
                    : '🎯 ඔබේ වත්මන් කාර්ය සාධනය සහ අධ්‍යයන රටාවන් අනුව, අපගේ AI ඔබ හොඳින් ලකුණු ලබා ගන්නා බව පුරෝකථනය කරයි. හොඳ වැඩ දිගටම කරගෙන යන්න!'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Study Plan Tab */}
        {activeTab === 'plan' && (
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-purple-500" />
                {content.plan.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{content.plan.subtitle}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-purple-50 rounded-2xl p-6 border-2 border-purple-200">
                  <p className="text-sm text-gray-600 mb-2">{content.plan.totalDays}</p>
                  <p className="text-3xl font-bold text-purple-600">{studyPlan.totalDays}</p>
                </div>
                <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
                  <p className="text-sm text-gray-600 mb-2">{content.plan.hoursPerWeek}</p>
                  <p className="text-3xl font-bold text-blue-600">{studyPlan.estimatedHoursPerWeek}</p>
                </div>
                <div className="bg-green-50 rounded-2xl p-6 border-2 border-green-200">
                  <p className="text-sm text-gray-600 mb-2">{content.stats.completed}</p>
                  <p className="text-3xl font-bold text-green-600">
                    {analytics.completedLessons}/{analytics.totalLessons}
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-4">{content.plan.upcoming}</h3>
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {studyPlan.dayPlans.slice(0, 14).map((day, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 border-2 border-purple-100 hover:border-purple-300 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="bg-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                          {day.date.getDate()}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {day.date.toLocaleDateString(language === 'si' ? 'si-LK' : 'en-US', {
                              weekday: 'long',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </p>
                          <p className="text-sm text-gray-600">
                            {language === 'en' ? 'Focus: ' : 'අවධානය: '}
                            <span className="font-semibold">{language === 'en' ? day.focus : day.focusSi}</span>
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">
                          {language === 'en' ? 'Lessons:' : 'පාඩම්:'} {day.lessons.join(', ')}
                        </p>
                        <p className="text-sm font-semibold text-purple-600">
                          {day.estimatedMinutes} {content.stats.minutes}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}