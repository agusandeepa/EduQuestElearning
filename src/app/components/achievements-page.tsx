// Achievements & Badges Page — Bilingual, Real Data, Beautiful UI
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../../hooks/useAuth';
import { useProgress } from '../../hooks/useProgress';
import { checkAchievements, getAchievementProgress, ACHIEVEMENTS } from '../../services/achievements';
import { getMathsProgress, getEnglishProgress, getScienceProgress } from '../../services/localStorage';
import { apiGetProgress, getToken } from '../../services/api';
import { useLanguage } from '../../contexts/LanguageContext';
import {
  Trophy, Award, Lock, ChevronLeft, Star, Zap,
  Filter, Search, CheckCircle, Clock
} from 'lucide-react';
import type { Progress } from '../../services/types';

type FilterType = 'all' | 'unlocked' | 'locked';
type RarityFilter = 'all' | 'common' | 'rare' | 'epic' | 'legendary';

const RARITY_META = {
  common:    { label: { en: 'Common',    si: 'සාමාන්‍ය'  }, color: 'text-gray-500',   bg: 'bg-gray-100',    border: 'border-gray-300'    },
  rare:      { label: { en: 'Rare',      si: 'දුලභ'      }, color: 'text-blue-600',   bg: 'bg-blue-50',     border: 'border-blue-300'    },
  epic:      { label: { en: 'Epic',      si: 'එපික්'     }, color: 'text-purple-600', bg: 'bg-purple-50',   border: 'border-purple-300'  },
  legendary: { label: { en: 'Legendary', si: 'ඉතිහාසික' }, color: 'text-yellow-600', bg: 'bg-yellow-50',   border: 'border-yellow-400'  },
};

export function AchievementsPage({ onBack }: { onBack: () => void }) {
  const { user } = useAuth();
  const { progress } = useProgress();
  const { language } = useLanguage();

  const [mathsProg, setMathsProg]     = useState<Progress[]>([]);
  const [englishProg, setEnglishProg] = useState<Progress[]>([]);
  const [scienceProg, setScienceProg] = useState<Progress[]>([]);
  const [filter, setFilter]           = useState<FilterType>('all');
  const [rarity, setRarity]           = useState<RarityFilter>('all');
  const [search, setSearch]           = useState('');

  useEffect(() => {
    const loadProgress = async () => {
      if (user && user.id && user.id !== 0 && getToken()) {
        // Backend ගෙන් all subject progress load කරන්න
        try {
          const backendData = await apiGetProgress(user.id);
          if (backendData && backendData.length > 0) {
            const toProgress = (subjectIds: number[]): Progress[] =>
              backendData
                .filter((bp: any) => subjectIds.includes(bp.lesson_id))
                .map((bp: any) => ({
                  lesson_id: bp.lesson_id,
                  completed: bp.is_completed,
                  score: bp.best_score,
                  attempts: bp.attempts ?? 1,
                }));
            // Maths: 1000-1031, Science: 2000-2035, English: 3000-3051, History: 1-24
            setMathsProg(toProgress(Array.from({length: 32}, (_, i) => 1000 + i)));
            setScienceProg(toProgress(Array.from({length: 36}, (_, i) => 2000 + i)));
            setEnglishProg(toProgress(Array.from({length: 52}, (_, i) => 3000 + i)));
            return;
          }
        } catch { /* fallback to localStorage */ }
      }
      // Fallback: localStorage
      setMathsProg(getMathsProgress());
      setEnglishProg(getEnglishProgress());
      setScienceProg(getScienceProgress());
    };
    loadProgress();
  }, [user?.id]);

  const t = {
    back:           language === 'en' ? 'Back'                     : 'ආපසු',
    title:          language === 'en' ? 'Achievements'             : 'ජයග්‍රහණ',
    subtitle:       language === 'en' ? 'Your progress & badges'   : 'ඔබේ ප්‍රගතිය සහ ලාංඡන',
    unlocked:       language === 'en' ? 'Unlocked'                 : 'අනාවරණය',
    locked:         language === 'en' ? 'Locked'                   : 'අගුළු දමා ඇත',
    all:            language === 'en' ? 'All'                      : 'සියල්ල',
    completed:      language === 'en' ? 'Completed'                : 'සම්පූර්ණ',
    progress:       language === 'en' ? 'Progress'                 : 'ප්‍රගතිය',
    unlockedOn:     language === 'en' ? 'Unlocked on'              : 'අනාවරණ දිනය',
    noResults:      language === 'en' ? 'No achievements found'    : 'ජයග්‍රහණ හමු නොවිණි',
    search:         language === 'en' ? 'Search achievements...'   : 'ජයග්‍රහණ සොයන්න...',
    tips:           language === 'en' ? 'How to earn achievements?' : 'ජයග්‍රහණ ලබා ගන්නේ කෙසේද?',
    tipItems: language === 'en' ? [
      '📖 Complete lessons to earn XP and lesson badges',
      '🔥 Keep your daily streak going for streak rewards',
      '💯 Score 100% on any quiz for the Perfect Score badge',
      '🌟 Complete at least 1 lesson in all 4 subjects to become an All-Rounder',
      '🚀 Collect XP to level up and unlock level achievements',
    ] : [
      '📖 පාඩම් සම්පූර්ණ කිරීමෙන් XP සහ පාඩම් ලාංඡන ලබා ගන්න',
      '🔥 දිනපතා streak එක තබා ගැනීමෙන් streak ලාංඡන ලබා ගන්න',
      '💯 ඕනෑම ප්‍රශ්නාවලියකින් 100% ලබා ගැනීමෙන් Perfect Score ලාංඡනය',
      '🌟 සිව්ම විෂයයන්හි පාඩම් 1ක් සම්පූර්ণ කිරීමෙන් All-Rounder ලාංඡනය',
      '🚀 XP එකතු කරමින් level ඉහළ නංවා level ජයග්‍රහණ ලබා ගන්න',
    ],
  };

  // Guest fallback
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl p-10 shadow-xl">
          <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <p className="text-gray-700 font-semibold mb-4">
            {language === 'en' ? 'Please log in to view your achievements' : 'ජයග්‍රහණ බැලීමට ලොග් වන්න'}
          </p>
          <button onClick={onBack} className="px-6 py-2 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700">
            {t.back}
          </button>
        </div>
      </div>
    );
  }

  const achievements = checkAchievements(user, progress, mathsProg, englishProg, scienceProg);
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount    = achievements.length;
  const percent       = Math.round((unlockedCount / totalCount) * 100);

  // Filters
  const filtered = achievements.filter(a => {
    const matchStatus = filter === 'all' ? true : filter === 'unlocked' ? a.unlocked : !a.unlocked;
    const matchRarity = rarity === 'all' ? true : a.rarity === rarity;
    const label = language === 'en' ? a.title.en : a.title.si;
    const matchSearch = label.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchRarity && matchSearch;
  });

  // Sort: unlocked first, then by rarity weight
  const rarityOrder = { legendary: 4, epic: 3, rare: 2, common: 1 };
  const sorted = [...filtered].sort((a, b) => {
    if (a.unlocked !== b.unlocked) return a.unlocked ? -1 : 1;
    return rarityOrder[b.rarity] - rarityOrder[a.rarity];
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-yellow-50 to-orange-50">

      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium">
              <ChevronLeft className="w-5 h-5" />
              {t.back}
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Trophy className="w-6 h-6 text-yellow-500" />
                {t.title}
              </h1>
              <p className="text-sm text-gray-500">{t.subtitle}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 rounded-3xl shadow-2xl p-8 text-white overflow-hidden relative"
        >
          {/* Background decoration */}
          <div className="absolute right-6 top-4 opacity-10 text-[120px] select-none">🏆</div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <Trophy className="w-10 h-10" />
                <span className="text-4xl font-extrabold">{unlockedCount} <span className="text-white/70 text-2xl">/ {totalCount}</span></span>
              </div>
              <p className="text-yellow-100 font-medium">
                {language === 'en' ? 'Achievements Unlocked' : 'ජයග්‍රහණ අනාවරණය'}
              </p>
            </div>

            {/* Stats pills */}
            <div className="flex flex-wrap gap-3">
              {[
                { icon: <Zap className="w-4 h-4" />, val: user.xp,    label: 'XP' },
                { icon: <Star className="w-4 h-4" />, val: `L${user.level}`, label: language === 'en' ? 'Level' : 'මට්ටම' },
                { icon: <Award className="w-4 h-4" />, val: `${user.streak}🔥`, label: 'Streak' },
              ].map((stat, i) => (
                <div key={i} className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-3 text-center min-w-[72px]">
                  <div className="flex items-center justify-center gap-1 text-white/80 mb-1">{stat.icon}</div>
                  <div className="font-extrabold text-lg leading-none">{stat.val}</div>
                  <div className="text-xs text-yellow-100 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm text-yellow-100 mb-1">
              <span>{percent}% {language === 'en' ? 'complete' : 'සම්පූර්ණ'}</span>
              <span>{totalCount - unlockedCount} {language === 'en' ? 'remaining' : 'ඉතිරි'}</span>
            </div>
            <div className="bg-white/20 rounded-full h-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percent}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="bg-white h-full rounded-full"
              />
            </div>
          </div>
        </motion.div>

        {/* Rarity Summary Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {(['common', 'rare', 'epic', 'legendary'] as const).map(r => {
            const meta  = RARITY_META[r];
            const total = achievements.filter(a => a.rarity === r).length;
            const done  = achievements.filter(a => a.rarity === r && a.unlocked).length;
            return (
              <div key={r} className={`${meta.bg} border ${meta.border} rounded-2xl p-4 text-center`}>
                <div className={`text-xl font-extrabold ${meta.color}`}>{done}/{total}</div>
                <div className={`text-xs font-semibold mt-1 ${meta.color}`}>{meta.label[language]}</div>
              </div>
            );
          })}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm p-4 flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={t.search}
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-yellow-400"
            />
          </div>

          {/* Status filter */}
          <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
            {(['all', 'unlocked', 'locked'] as FilterType[]).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${filter === f ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
              >
                {f === 'all' ? t.all : f === 'unlocked' ? t.unlocked : t.locked}
              </button>
            ))}
          </div>

          {/* Rarity filter */}
          <div className="flex gap-1 flex-wrap">
            {(['all', 'common', 'rare', 'epic', 'legendary'] as RarityFilter[]).map(r => {
              const meta = r === 'all' ? null : RARITY_META[r];
              return (
                <button
                  key={r}
                  onClick={() => setRarity(r)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${rarity === r ? (meta ? `${meta.bg} ${meta.border} ${meta.color}` : 'bg-gray-800 text-white border-gray-800') : 'bg-white border-gray-200 text-gray-500 hover:border-gray-400'}`}
                >
                  {r === 'all' ? t.all : meta!.label[language]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Achievements Grid */}
        {sorted.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <Trophy className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>{t.noResults}</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sorted.map((achievement, i) => {
              const progPct = getAchievementProgress(user, progress, achievement, mathsProg, englishProg, scienceProg);
              const meta    = RARITY_META[achievement.rarity];
              const title   = language === 'en' ? achievement.title.en : achievement.title.si;
              const desc    = language === 'en' ? achievement.description.en : achievement.description.si;

              return (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className={`relative rounded-2xl overflow-hidden border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                    achievement.unlocked
                      ? `bg-gradient-to-br from-white to-yellow-50 ${meta.border} shadow-md`
                      : 'bg-white border-gray-200 opacity-80'
                  }`}
                >
                  {/* Rarity stripe */}
                  <div className={`h-1 w-full bg-gradient-to-r ${achievement.color}`} />

                  {/* Unlocked/Locked badge */}
                  <div className="absolute top-3 right-3">
                    {achievement.unlocked
                      ? <div className="bg-green-500 text-white rounded-full p-1.5 shadow"><CheckCircle className="w-3.5 h-3.5" /></div>
                      : <div className="bg-gray-300 text-white rounded-full p-1.5"><Lock className="w-3.5 h-3.5" /></div>
                    }
                  </div>

                  <div className="p-5">
                    {/* Icon */}
                    <div className={`text-5xl text-center mb-3 ${achievement.unlocked ? '' : 'grayscale opacity-50'}`}>
                      {achievement.icon}
                    </div>

                    {/* Rarity badge */}
                    <div className="flex justify-center mb-3">
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${meta.bg} ${meta.color} border ${meta.border}`}>
                        {meta.label[language]}
                      </span>
                    </div>

                    {/* Title & Desc */}
                    <h3 className={`text-base font-extrabold text-center mb-1 ${achievement.unlocked ? 'text-gray-900' : 'text-gray-500'}`}>
                      {title}
                    </h3>
                    <p className={`text-xs text-center leading-relaxed mb-4 ${achievement.unlocked ? 'text-gray-600' : 'text-gray-400'}`}>
                      {desc}
                    </p>

                    {/* Progress bar (locked) */}
                    {!achievement.unlocked && (
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs text-gray-400">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{t.progress}</span>
                          <span className="font-bold">{progPct}%</span>
                        </div>
                        <div className="bg-gray-100 rounded-full h-2 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progPct}%` }}
                            transition={{ duration: 0.8, ease: 'easeOut', delay: i * 0.04 }}
                            className={`bg-gradient-to-r ${achievement.color} h-full rounded-full`}
                          />
                        </div>
                      </div>
                    )}

                    {/* Unlocked date */}
                    {achievement.unlocked && achievement.unlockedAt && (
                      <div className="pt-3 border-t border-yellow-100 text-center">
                        <p className="text-xs text-green-600 font-semibold flex items-center justify-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          {t.unlockedOn}: {new Date(achievement.unlockedAt).toLocaleDateString(language === 'si' ? 'si-LK' : 'en-GB')}
                        </p>
                      </div>
                    )}

                    {/* Fully unlocked glow */}
                    {achievement.unlocked && (
                      <div className={`absolute inset-0 bg-gradient-to-br ${achievement.color} opacity-5 pointer-events-none`} />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200"
        >
          <h3 className="font-extrabold text-blue-900 mb-4 flex items-center gap-2 text-lg">
            <Trophy className="w-5 h-5 text-blue-500" />
            {t.tips}
          </h3>
          <ul className="space-y-2">
            {t.tipItems.map((tip, i) => (
              <li key={i} className="text-sm text-blue-800 flex items-start gap-2">
                <span className="mt-0.5 shrink-0">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </motion.div>

      </div>
    </div>
  );
}
