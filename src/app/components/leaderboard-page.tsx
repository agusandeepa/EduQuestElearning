import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Trophy, Flame, Star, BookOpen, Calculator, FlaskConical, Globe, Zap, TrendingUp, Crown, Award } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { getProgressKey } from "../../services/localStorage";

interface LeaderboardPageProps {
  onBack: () => void;
  onStartLearning?: () => void;
}

type SubjectFilter = "all" | "history" | "maths" | "english" | "science";

interface LeaderboardUser {
  rank: number;
  name: string;
  xp: number;
  streak: number;
  avatar: string;
  flag: string;
  isCurrentUser?: boolean;
  subjectXP: Record<string, number>;
  level: number;
  badge: string;
}

function readLS<T>(key: string, fallback: T): T {
  try { const r = localStorage.getItem(key); return r ? JSON.parse(r) : fallback; } catch { return fallback; }
}

interface SP { lesson_id: number; completed: boolean; score: number; attempts: number; }
interface StoredUser { name?: string; xp?: number; streak?: number; }

function calcSubjectXP(progressKey: string): number {
  return readLS<SP[]>(progressKey, []).filter(p => p.completed && p.score >= 70).length * 50;
}

function getLevelBadge(xp: number): { level: number; badge: string } {
  if (xp >= 2000) return { level: 10, badge: "🏆" };
  if (xp >= 1500) return { level: 8,  badge: "💎" };
  if (xp >= 1000) return { level: 6,  badge: "🥇" };
  if (xp >= 500)  return { level: 4,  badge: "⭐" };
  if (xp >= 200)  return { level: 2,  badge: "🌱" };
  return { level: 1, badge: "🔰" };
}

const GLOBAL_COMPETITORS: Omit<LeaderboardUser, "rank">[] = [
  { name:"Kavindi Perera",     xp:2450,streak:45,avatar:"🦁",flag:"🇱🇰",subjectXP:{history:700,maths:650,english:600,science:500},level:10,badge:"🏆" },
  { name:"Saman Bandara",     xp:2380,streak:38,avatar:"🐯",flag:"🇱🇰",subjectXP:{history:600,maths:700,english:500,science:580},level:10,badge:"🏆" },
  { name:"Nimali Fernando",   xp:2310,streak:42,avatar:"🦊",flag:"🇱🇰",subjectXP:{history:550,maths:600,english:700,science:460},level:8, badge:"💎" },
  { name:"Ravindu Silva",     xp:2280,streak:35,avatar:"🐻",flag:"🇱🇰",subjectXP:{history:600,maths:580,english:500,science:600},level:8, badge:"💎" },
  { name:"Thilini Raj",      xp:2150,streak:30,avatar:"🐼",flag:"🇱🇰",subjectXP:{history:500,maths:550,english:600,science:500},level:8, badge:"💎" },
  { name:"Kasun Herath",     xp:2090,streak:28,avatar:"🦅",flag:"🇱🇰",subjectXP:{history:500,maths:500,english:490,science:600},level:6, badge:"🥇" },
  { name:"Dinusha Wijeya",   xp:1950,streak:25,avatar:"🦋",flag:"🇱🇰",subjectXP:{history:450,maths:500,english:550,science:450},level:6, badge:"🥇" },
  { name:"Sachini Gamage",   xp:1880,streak:22,avatar:"🦜",flag:"🇱🇰",subjectXP:{history:450,maths:450,english:480,science:500},level:6, badge:"🥇" },
  { name:"Lahiru Mendis",    xp:1820,streak:20,avatar:"🐲",flag:"🇱🇰",subjectXP:{history:400,maths:500,english:420,science:500},level:4, badge:"⭐" },
  { name:"Amali Dissanayake",xp:1750,streak:18,avatar:"🦄",flag:"🇱🇰",subjectXP:{history:400,maths:450,english:500,science:400},level:4, badge:"⭐" },
];

const SUBJECT_CONFIG = {
  all:     { label:{en:"All Subjects",si:"සියලු"},  icon:Trophy,        color:"#16a34a", light:"#f0fdf4", border:"#bbf7d0" },
  history: { label:{en:"History",     si:"ඉතිහාසය"}, icon:Globe,         color:"#7c3aed", light:"#faf5ff", border:"#ddd6fe" },
  maths:   { label:{en:"Maths",       si:"ගණිතය"},   icon:Calculator,    color:"#2563eb", light:"#eff6ff", border:"#bfdbfe" },
  english: { label:{en:"English",     si:"ඉංග්‍රීසි"}, icon:BookOpen,      color:"#16a34a", light:"#f0fdf4", border:"#bbf7d0" },
  science: { label:{en:"Science",     si:"විද්‍යාව"},  icon:FlaskConical,  color:"#d97706", light:"#fefce8", border:"#fde68a" },
} as const;

export function LeaderboardPage({ onBack, onStartLearning }: LeaderboardPageProps) {
  const { language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<SubjectFilter>("all");
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [currentUser, setCurrentUser] = useState<LeaderboardUser | null>(null);

  useEffect(() => {
    const su = readLS<StoredUser>("history_app_user", {});
    const hXP  = calcSubjectXP(getProgressKey("history"));
    const mXP  = calcSubjectXP(getProgressKey("maths"));
    const eXP  = calcSubjectXP(getProgressKey("english"));
    const sXP  = calcSubjectXP(getProgressKey("science"));
    const totalXP = (su.xp ?? 0) || (hXP + mXP + eXP + sXP);
    const { level, badge } = getLevelBadge(totalXP);

    const me: Omit<LeaderboardUser, "rank"> = {
      name: su.name ?? (language === "en" ? "You" : "ඔබ"),
      xp: totalXP, streak: su.streak ?? 0, avatar: "😊", flag: "🇱🇰",
      isCurrentUser: true, subjectXP: { history: hXP, maths: mXP, english: eXP, science: sXP }, level, badge,
    };

    const sorted = [...GLOBAL_COMPETITORS, me]
      .sort((a, b) => b.xp - a.xp)
      .map((u, i) => ({ ...u, rank: i + 1 }));

    setLeaderboard(sorted);
    setCurrentUser(sorted.find(u => u.isCurrentUser) ?? null);
  }, [language]);

  const filteredBoard = activeFilter === "all"
    ? leaderboard
    : [...leaderboard]
        .sort((a, b) => (b.subjectXP[activeFilter] ?? 0) - (a.subjectXP[activeFilter] ?? 0))
        .map((u, i) => ({ ...u, rank: i + 1 }));

  const top3 = filteredBoard.slice(0, 3);
  const rest  = filteredBoard.slice(3);

  const getXP = (u: LeaderboardUser) =>
    activeFilter === "all" ? u.xp : (u.subjectXP[activeFilter] ?? 0);

  const SubjectIcon = SUBJECT_CONFIG[activeFilter].icon;
  const cfg = SUBJECT_CONFIG[activeFilter];

  const L = (e: string, s: string) => language === "en" ? e : s;

  // Podium order: 2nd, 1st, 3rd
  const podiumOrder = top3.length === 3 ? [top3[1], top3[0], top3[2]] : top3;
  const podiumHeights = [70, 100, 55];
  const podiumColors = ["#94a3b8", "#f59e0b", "#f97316"]; // silver, gold, bronze
  const podiumRealIdx = [1, 0, 2]; // actual rank positions

  return (
    <div className="min-h-screen bg-[#f0fdf4] dark:bg-gray-950">

      {/* Top green bar */}
      <div className="h-1 w-full" style={{ background: "linear-gradient(90deg,#16a34a,#22c55e,#4ade80)" }} />

      {/* BG blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full opacity-10" style={{ background: "#16a34a", filter: "blur(80px)" }} />
        <div className="absolute bottom-0 -left-16 w-64 h-64 rounded-full opacity-8" style={{ background: "#22c55e", filter: "blur(60px)" }} />
      </div>

      {/* Header */}
      <div className="relative z-10 max-w-2xl mx-auto px-5 pt-5 pb-4">
        <div className="flex items-center gap-3 mb-5">
          <Button variant="ghost" onClick={onBack}
            className="text-gray-600 dark:text-gray-400 dark:text-gray-400 hover:text-green-700 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 gap-2 font-semibold">
            <ArrowLeft className="w-4 h-4" />{L("Back", "ආපසු")}
          </Button>
        </div>

        {/* Title */}
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3 shadow-lg"
            style={{ background: "linear-gradient(135deg,#16a34a,#22c55e)" }}>
            <Trophy className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-3xl font-black text-gray-900">{L("Leaderboard", "ලකුණු පුවරුව")}</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{L("Compete with Sri Lankan learners", "ශ්‍රී ලාංකික ශිෂ්‍යයන් සමඟ තරඟ කරන්න")}</p>
        </motion.div>

        {/* Subject Filter */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {(Object.keys(SUBJECT_CONFIG) as SubjectFilter[]).map(key => {
            const c = SUBJECT_CONFIG[key];
            const Icon = c.icon;
            const active = activeFilter === key;
            return (
              <motion.button key={key} onClick={() => setActiveFilter(key)} whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all border-2"
                style={active
                  ? { background: c.color, color: "white", borderColor: c.color, boxShadow: `0 4px 12px ${c.color}44` }
                  : { background: "white", color: "#6b7280", borderColor: "#e5e7eb" }}>
                <Icon className="w-3.5 h-3.5" />
                {L(c.label.en, c.label.si)}
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="relative z-10 px-5 pb-10 max-w-2xl mx-auto">

        {/* Podium */}
        {top3.length === 3 && (
          <motion.div key={activeFilter} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 dark:border-gray-700 p-6 pt-8">
              <div className="flex items-end justify-center gap-4">
                {podiumOrder.map((user, i) => {
                  const pc = podiumColors[i];
                  const ph = podiumHeights[i];
                  const isFirst = user.rank === 1;

                  return (
                    <motion.div key={user.rank} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.12 }} className="flex flex-col items-center flex-1 max-w-[130px]">

                      {/* Card */}
                      <div className="w-full rounded-2xl p-3 text-center mb-2 relative border-2 shadow-sm"
                        style={{ borderColor: pc + "66", background: isFirst ? "#fefce8" : "#fafafa" }}>
                        {isFirst && (
                          <motion.div animate={{ rotate: [-5, 5, -5] }} transition={{ duration: 2, repeat: Infinity }}
                            className="absolute -top-4 left-1/2 -translate-x-1/2 text-2xl">👑</motion.div>
                        )}
                        <div className="text-3xl mt-1 mb-1">{user.avatar}</div>
                        <div className="text-lg mb-0.5">{user.rank === 1 ? "🥇" : user.rank === 2 ? "🥈" : "🥉"}</div>
                        <p className="text-gray-800 text-xs font-bold leading-tight truncate px-1">
                          {user.isCurrentUser ? L("You", "ඔබ") : user.name.split(" ")[0]}
                        </p>
                        <p className="font-black text-sm mt-0.5" style={{ color: pc }}>
                          {getXP(user).toLocaleString()} XP
                        </p>
                        <div className="flex items-center justify-center gap-1 text-xs text-orange-500 mt-0.5">
                          <Flame className="w-3 h-3" />{user.streak}d
                        </div>
                      </div>

                      {/* Podium block */}
                      <div className="w-full rounded-t-xl" style={{ height: ph, background: `linear-gradient(180deg,${pc}cc,${pc}66)` }} />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* Current user card (if not top 3) */}
        {currentUser && currentUser.rank > 3 && (
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
            className="mb-4 rounded-2xl p-4 border-2 border-green-400 dark:border-green-600 bg-green-50 dark:bg-green-900/20 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="text-center min-w-[44px]">
                <p className="text-green-600 text-xs font-bold">{L("Your Rank","ඔබේ ශ්‍රේණිය")}</p>
                <p className="text-green-700 text-2xl font-black">#{currentUser.rank}</p>
              </div>
              <div className="text-3xl">{currentUser.avatar}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-gray-800 font-bold">{L("You","ඔබ")}</p>
                  <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded-full font-bold">{L("YOU","ඔබ")}</span>
                  <span className="text-xs text-gray-400">{currentUser.badge} Lv.{currentUser.level}</span>
                </div>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="flex items-center gap-1 text-green-700 text-sm font-bold">
                    <Star className="w-3.5 h-3.5" />{getXP(currentUser).toLocaleString()} XP
                  </span>
                  <span className="flex items-center gap-1 text-orange-500 text-xs">
                    <Flame className="w-3 h-3" />{currentUser.streak}d
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Rankings list */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden mb-5">
          {/* Header */}
          <div className="p-4 flex items-center gap-2 border-b border-gray-50"
            style={{ background: `linear-gradient(90deg,${cfg.color}10,${cfg.color}05)` }}>
            <SubjectIcon className="w-5 h-5" style={{ color: cfg.color }} />
            <h2 className="text-gray-800 font-black text-base">{L("Rankings","ශ්‍රේණිගත කිරීම")}</h2>
            <span className="ml-auto text-gray-400 text-sm">{L(cfg.label.en, cfg.label.si)}</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={activeFilter} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="divide-y divide-gray-50">
              {filteredBoard.map((user, index) => {
                const xpVal = getXP(user);
                const maxXP = getXP(filteredBoard[0]) || 1;
                const barPct = Math.round((xpVal / maxXP) * 100);
                const isMe = user.isCurrentUser;

                return (
                  <motion.div key={`${activeFilter}-${user.rank}`}
                    initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.03 }}
                    className="relative px-4 py-3 transition-all"
                    style={isMe ? { background: "#f0fdf4", borderLeft: "3px solid #16a34a" } : {}}>

                    {/* XP bar background */}
                    <div className="absolute inset-0 pointer-events-none"
                      style={{ width: `${barPct}%`, background: isMe ? "#16a34a08" : "#f9fafb", borderRadius: 0 }} />

                    <div className="relative flex items-center gap-3">
                      {/* Rank */}
                      <div className="w-8 text-center shrink-0">
                        {user.rank <= 3
                          ? <span className="text-xl">{user.rank===1?"🥇":user.rank===2?"🥈":"🥉"}</span>
                          : <span className="text-gray-400 font-bold text-sm">#{user.rank}</span>}
                      </div>

                      <div className="text-2xl shrink-0">{user.avatar}</div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className={`font-bold text-sm truncate ${isMe?"text-green-700":"text-gray-800"}`}>
                            {isMe ? L("You","ඔබ") : user.name}
                          </span>
                          <span>{user.flag}</span>
                          {isMe && <span className="text-xs bg-green-600 text-white px-1.5 py-0.5 rounded-full font-bold">{L("YOU","ඔබ")}</span>}
                          <span className="text-sm">{user.badge}</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-400 mt-0.5">
                          <span className="flex items-center gap-0.5 font-semibold" style={{color:cfg.color}}>
                            <Star className="w-3 h-3" />{xpVal.toLocaleString()} XP
                          </span>
                          <span className="flex items-center gap-0.5 text-orange-500">
                            <Flame className="w-3 h-3" />{user.streak}d
                          </span>
                        </div>
                      </div>

                      {/* Subject dots */}
                      {activeFilter === "all" && (
                        <div className="hidden sm:flex flex-col gap-0.5 shrink-0">
                          {(["history","maths","english","science"] as const).map(s => (
                            <div key={s} className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: SUBJECT_CONFIG[s].color, opacity: (user.subjectXP[s]??0)>0?1:0.15 }} />
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Subject XP breakdown for current user */}
        {currentUser && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 mb-5">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-4 h-4 text-green-600" />
              <h3 className="text-gray-800 font-bold text-sm">{L("Your Subject XP","ඔබේ විෂය XP")}</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {(["history","maths","english","science"] as const).map(s => {
                const c = SUBJECT_CONFIG[s];
                const Icon = c.icon;
                const xp = currentUser.subjectXP[s] ?? 0;
                return (
                  <div key={s} className="rounded-2xl p-3.5 flex items-center gap-3 border"
                    style={{ background: c.light, borderColor: c.border }}>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: "white", boxShadow: `0 0 0 2px ${c.border}` }}>
                      <Icon className="w-4.5 h-4.5" style={{ color: c.color }} />
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400 text-xs">{L(c.label.en, c.label.si)}</p>
                      <p className="font-black text-base" style={{ color: c.color }}>
                        {xp.toLocaleString()} <span className="text-xs font-normal text-gray-400">XP</span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="rounded-3xl p-6 text-center shadow-lg overflow-hidden relative"
          style={{ background: "linear-gradient(135deg,#16a34a,#22c55e)", boxShadow: "0 8px 32px #16a34a44" }}>
          <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white opacity-10" />
          <div className="absolute -left-4 -bottom-4 w-24 h-24 rounded-full bg-white opacity-8" />
          <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 2, repeat: Infinity }} className="relative">
            <Trophy className="w-10 h-10 text-white mx-auto mb-3 opacity-90" />
          </motion.div>
          <h3 className="text-xl font-black text-white mb-1 relative">{L("Climb the Leaderboard!","ලකුණු පුවරුව ඉහළ නැග්ගන්න!")}</h3>
          <p className="text-white/80 text-sm mb-4 relative">{L("Complete lessons to earn XP and beat the competition","XP ලබා ගෙන තරඟය ජය ගැනීමට පාඩම් සම්පූර්ණ කරන්න")}</p>
          <Button onClick={onStartLearning ?? onBack}
            className="bg-white font-bold hover:bg-gray-50 dark:bg-gray-700 rounded-xl px-6 relative shadow-md" style={{ color: "#16a34a" }}>
            <Zap className="w-4 h-4 mr-1.5" />{L("Start Learning","ඉගෙනීම ආරම්භ")}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
