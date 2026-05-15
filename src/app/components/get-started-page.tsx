import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { ArrowRight, ArrowLeft, Check, BookOpen, Target, Sparkles, Calculator, FlaskConical, Globe, Zap, Trophy, Star } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

interface GetStartedPageProps {
  onComplete: () => void;
}

// ─── Step definitions ─────────────────────────────────────────────────────────
const STEPS = [
  { id:1, component:"welcome" },
  { id:2, component:"subjects" },
  { id:3, component:"goal" },
  { id:4, component:"level" },
  { id:5, component:"complete" },
];

// ─── Data ─────────────────────────────────────────────────────────────────────
const SUBJECTS = [
  { id:"maths",   emoji:"📐", icon:Calculator,   title:{en:"Maths",   si:"ගණිතය"  }, desc:{en:"Numbers & problem solving", si:"ගණිත ගැටලු විසඳීම"}, color:"#2563eb", light:"#eff6ff", border:"#bfdbfe", grad:"from-blue-400 to-indigo-500" },
  { id:"science", emoji:"🔬", icon:FlaskConical,  title:{en:"Science", si:"විද්‍යාව" }, desc:{en:"Explore the natural world",  si:"ස්වාභාවික ලෝකය ගවේෂණය"}, color:"#d97706", light:"#fefce8", border:"#fde68a", grad:"from-amber-400 to-orange-500" },
  { id:"english", emoji:"📖", icon:BookOpen,      title:{en:"English", si:"ඉංග්‍රීසි"}, desc:{en:"Language & communication",  si:"භාෂාව හා සන්නිවේදනය"  }, color:"#16a34a", light:"#f0fdf4", border:"#bbf7d0", grad:"from-emerald-400 to-green-500" },
  { id:"history", emoji:"🏛️", icon:Globe,         title:{en:"History", si:"ඉතිහාසය"}, desc:{en:"Sri Lankan & world history", si:"ශ්‍රී ලාංකික ඉතිහාසය"   }, color:"#7c3aed", light:"#faf5ff", border:"#ddd6fe", grad:"from-violet-400 to-purple-500" },
];

const GOALS = [
  { id:"student",    emoji:"🎓", title:{en:"O/L Student",        si:"O/L ශිෂ්‍යයා"      }, desc:{en:"Preparing for O/L exams",   si:"O/L විභාගයට සූදානම්"   } },
  { id:"enthusiast", emoji:"💡", title:{en:"Subject Enthusiast",  si:"විෂය ලෝලියා"      }, desc:{en:"Learning for knowledge",    si:"දැනුම සඳහා ඉගෙනීම"    } },
  { id:"teacher",    emoji:"👨‍🏫", title:{en:"Educator",           si:"ගුරුවරයෙක්"        }, desc:{en:"Teaching these subjects",   si:"මෙම විෂයයන් ඉගැන්වීම" } },
  { id:"curious",    emoji:"🤔", title:{en:"Just Curious",        si:"කුතුහලයෙන්"        }, desc:{en:"Exploring & discovering",   si:"ගවේෂණය සහ සොයා යාම"   } },
];

const LEVELS = [
  { id:"beginner",     emoji:"🌱", title:{en:"Beginner",     si:"ආරම්භකයා"  }, desc:{en:"New to these subjects", si:"නව ශිෂ්‍යයෙක්"    } },
  { id:"intermediate", emoji:"📖", title:{en:"Intermediate", si:"මැදි මට්ටම"  }, desc:{en:"Some knowledge",        si:"යම් දැනුමක් ඇත"  } },
  { id:"advanced",     emoji:"🎯", title:{en:"Advanced",     si:"උසස් මට්ටම"  }, desc:{en:"Strong foundation",     si:"ශක්තිමත් පදනමක්" } },
];

export function GetStartedPage({ onComplete }: GetStartedPageProps) {
  const { language } = useLanguage();
  const [step, setStep] = useState(0);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedGoal, setSelectedGoal]   = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");

  const L = (e: string, s: string) => language === "en" ? e : s;

  const toggleSubject = (id: string) =>
    setSelectedSubjects(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);

  const canProceed = () => {
    switch (STEPS[step].component) {
      case "welcome":   return true;
      case "subjects":  return selectedSubjects.length > 0;
      case "goal":      return selectedGoal !== "";
      case "level":     return selectedLevel !== "";
      case "complete":  return true;
      default:          return false;
    }
  };

  const next = () => step < STEPS.length - 1 ? setStep(step + 1) : onComplete();
  const back = () => step > 0 && setStep(step - 1);

  const subjectColors: Record<string, { color: string; light: string }> = Object.fromEntries(
    SUBJECTS.map(s => [s.id, { color: s.color, light: s.light }])
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "linear-gradient(135deg, #22c55e 0%, #3b82f6 50%, #8b5cf6 100%)" }}>

      <div className="w-full max-w-3xl">
        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex gap-2 mb-2">
            {STEPS.map((s, i) => (
              <motion.div key={s.id} className="flex-1 h-2 rounded-full overflow-hidden"
                style={{ background: "rgba(255,255,255,0.25)" }}>
                {i <= step && (
                  <motion.div className="h-full rounded-full bg-white"
                    initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 0.4 }} />
                )}
              </motion.div>
            ))}
          </div>
          <p className="text-white/80 text-center text-sm font-medium">
            {L(`Step ${step + 1} of ${STEPS.length}`, `පියවර ${step + 1} / ${STEPS.length}`)}
          </p>
        </div>

        {/* Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden">

          <AnimatePresence mode="wait">
            <motion.div key={step}
              initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -32 }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              className="flex flex-col min-h-[520px]">

              {/* ══ WELCOME ══ */}
              {STEPS[step].component === "welcome" && (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                  <motion.div className="text-7xl mb-5"
                    animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}>
                    👋
                  </motion.div>
                  <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">
                    {L("Welcome to EduQuest!", "EduQuest ට へようこそ!")}
                  </h1>
                  <p className="text-gray-500 text-lg mb-8">
                    {L("Let's personalize your learning journey", "ඔබේ ඉගෙනුම් ගමන පෞද්ගලීකරණය කරමු")}
                  </p>

                  {/* Subject preview icons */}
                  <div className="flex gap-3 mb-8">
                    {SUBJECTS.map((s, i) => (
                      <motion.div key={s.id}
                        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.08 }}
                        className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-sm"
                        style={{ background: `linear-gradient(135deg, ${s.color}22, ${s.color}44)`, border: `2px solid ${s.border}` }}>
                        {s.emoji}
                      </motion.div>
                    ))}
                  </div>

                  {/* Feature pills */}
                  <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-gray-600">
                    {[
                      { icon: BookOpen, label: L("163+ Lessons", "පාඩම් 163+"), color: "#16a34a" },
                      { icon: Target,   label: L("Personalized Path", "පෞද්ගලීකෘත මාර්ගය"), color: "#2563eb" },
                      { icon: Sparkles, label: L("Gamified", "ක්‍රීඩා රටාව"), color: "#7c3aed" },
                      { icon: Trophy,   label: L("4 Subjects", "විෂයයන් 4"), color: "#d97706" },
                    ].map(f => {
                      const Icon = f.icon;
                      return (
                        <div key={f.label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border bg-gray-50">
                          <Icon className="w-4 h-4" style={{ color: f.color }} />
                          <span>{f.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ══ SUBJECTS ══ */}
              {STEPS[step].component === "subjects" && (
                <div className="flex-1 flex flex-col p-8">
                  <div className="text-center mb-6">
                    <h1 className="text-3xl font-black text-gray-900 mb-2">
                      {L("Choose your subjects", "ඔබේ විෂයයන් තෝරන්න")}
                    </h1>
                    <p className="text-gray-500">{L("Select all subjects you want to study", "ඉගෙනීමට අවශ්‍ය සියලු විෂයයන් තෝරන්න")}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 flex-1">
                    {SUBJECTS.map((s, i) => {
                      const selected = selectedSubjects.includes(s.id);
                      const Icon = s.icon;
                      return (
                        <motion.button key={s.id} onClick={() => toggleSubject(s.id)}
                          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.07 }}
                          whileTap={{ scale: 0.97 }}
                          className="p-5 rounded-2xl border-2 transition-all text-left relative overflow-hidden"
                          style={selected
                            ? { borderColor: s.color, background: s.light, boxShadow: `0 4px 16px ${s.color}33` }
                            : { borderColor: "#e5e7eb", background: "white" }}>

                          {selected && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                              className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center"
                              style={{ background: s.color }}>
                              <Check className="w-3.5 h-3.5 text-white" />
                            </motion.div>
                          )}

                          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-3"
                            style={{ background: selected ? `${s.color}22` : "#f9fafb", border: `2px solid ${selected ? s.border : "#e5e7eb"}` }}>
                            {s.emoji}
                          </div>
                          <h3 className="font-black text-gray-900 text-base mb-0.5">
                            {L(s.title.en, s.title.si)}
                          </h3>
                          <p className="text-gray-500 text-xs">{L(s.desc.en, s.desc.si)}</p>
                        </motion.button>
                      );
                    })}
                  </div>
                  <p className="text-center text-xs text-gray-400 mt-4">
                    {selectedSubjects.length > 0
                      ? L(`${selectedSubjects.length} subject${selectedSubjects.length > 1 ? "s" : ""} selected`, `විෂයයන් ${selectedSubjects.length}ක් තෝරා ගත්`)
                      : L("Select at least one subject", "අවම වශයෙන් විෂයයක් තෝරන්න")}
                  </p>
                </div>
              )}

              {/* ══ GOAL ══ */}
              {STEPS[step].component === "goal" && (
                <div className="flex-1 flex flex-col p-8">
                  <div className="text-center mb-6">
                    <h1 className="text-3xl font-black text-gray-900 mb-2">{L("What's your goal?", "ඔබේ අරමුණ කුමක්ද?")}</h1>
                    <p className="text-gray-500">{L("Choose what you want to achieve", "ඔබ ළඟා කිරීමට කැමති දේ තෝරන්න")}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 flex-1">
                    {GOALS.map((g, i) => {
                      const sel = selectedGoal === g.id;
                      return (
                        <motion.button key={g.id} onClick={() => setSelectedGoal(g.id)}
                          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                          whileTap={{ scale: 0.97 }}
                          className="p-6 rounded-2xl border-2 transition-all text-left relative"
                          style={sel
                            ? { borderColor: "#16a34a", background: "#f0fdf4", boxShadow: "0 4px 16px #16a34a33" }
                            : { borderColor: "#e5e7eb", background: "white" }}>
                          {sel && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                              className="absolute top-3 right-3 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                              <Check className="w-3.5 h-3.5 text-white" />
                            </motion.div>
                          )}
                          <div className="text-4xl mb-3">{g.emoji}</div>
                          <h3 className="font-black text-gray-900 text-base mb-1">{L(g.title.en, g.title.si)}</h3>
                          <p className="text-gray-500 text-sm">{L(g.desc.en, g.desc.si)}</p>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ══ LEVEL ══ */}
              {STEPS[step].component === "level" && (
                <div className="flex-1 flex flex-col p-8">
                  <div className="text-center mb-6">
                    <h1 className="text-3xl font-black text-gray-900 mb-2">{L("Choose your level", "ඔබේ මට්ටම තෝරන්න")}</h1>
                    <p className="text-gray-500">{L("Help us customize your experience", "ඔබේ අත්දැකීම අභිරුචිකරණය කිරීමට")}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-4 flex-1">
                    {LEVELS.map((lv, i) => {
                      const sel = selectedLevel === lv.id;
                      return (
                        <motion.button key={lv.id} onClick={() => setSelectedLevel(lv.id)}
                          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.09 }}
                          whileTap={{ scale: 0.97 }}
                          className="p-6 rounded-2xl border-2 transition-all text-center relative"
                          style={sel
                            ? { borderColor: "#2563eb", background: "#eff6ff", boxShadow: "0 4px 16px #2563eb33" }
                            : { borderColor: "#e5e7eb", background: "white" }}>
                          {sel && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                              className="absolute top-3 right-3 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                              <Check className="w-3.5 h-3.5 text-white" />
                            </motion.div>
                          )}
                          <motion.div className="text-5xl mb-3"
                            animate={sel ? { scale: [1, 1.15, 1] } : {}} transition={{ duration: 0.4 }}>
                            {lv.emoji}
                          </motion.div>
                          <h3 className="font-black text-gray-900 text-base mb-1">{L(lv.title.en, lv.title.si)}</h3>
                          <p className="text-gray-500 text-sm">{L(lv.desc.en, lv.desc.si)}</p>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ══ COMPLETE ══ */}
              {STEPS[step].component === "complete" && (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}
                    className="text-7xl mb-5">🎉</motion.div>
                  <h1 className="text-3xl font-black text-gray-900 mb-1">{L("You're all set!", "සූදානම් !")}</h1>
                  <p className="text-gray-500 mb-6">{L("Your personalized learning path is ready", "ඔබේ පෞද්ගලීකෘත ඉගෙනුම් මාර්ගය සූදානම්")}</p>

                  {/* Summary card */}
                  <div className="w-full max-w-md rounded-2xl p-5 mb-6 text-left border"
                    style={{ background: "linear-gradient(135deg, #f0fdf4, #eff6ff)", borderColor: "#bbf7d0" }}>
                    <h3 className="font-black text-gray-800 text-center mb-4">{L("Your Profile", "ඔබේ පැතිකඩ")}</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="text-gray-500 text-sm w-20">{L("Goal:", "අරමුණ:")}</span>
                        <span className="font-bold text-gray-900">
                          {GOALS.find(g => g.id === selectedGoal) ? L(GOALS.find(g => g.id === selectedGoal)!.title.en, GOALS.find(g => g.id === selectedGoal)!.title.si) : "—"}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-gray-500 text-sm w-20">{L("Level:", "මට්ටම:")}</span>
                        <span className="font-bold text-gray-900">
                          {LEVELS.find(l => l.id === selectedLevel) ? L(LEVELS.find(l => l.id === selectedLevel)!.title.en, LEVELS.find(l => l.id === selectedLevel)!.title.si) : "—"}
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-gray-500 text-sm w-20 pt-0.5">{L("Subjects:", "විෂයයන්:")}</span>
                        <div className="flex flex-wrap gap-2">
                          {selectedSubjects.map(id => {
                            const s = SUBJECTS.find(x => x.id === id);
                            if (!s) return null;
                            return (
                              <span key={id} className="text-xs px-2.5 py-1 rounded-full font-bold text-white"
                                style={{ background: s.color }}>
                                {s.emoji} {L(s.title.en, s.title.si)}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* XP welcome bonus */}
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                    className="flex items-center gap-2 px-5 py-3 rounded-2xl border border-yellow-200 bg-yellow-50">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span className="text-yellow-700 font-bold text-sm">
                      {L("🎁 You earned 50 XP for signing up!", "🎁 ලියාපදිංචි වීම සඳහා XP 50ක් ලැබුණා!")}
                    </span>
                  </motion.div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between items-center px-8 py-5 border-t border-gray-100">
                <Button variant="ghost" onClick={back} disabled={step === 0}
                  className="gap-2 text-gray-500 hover:text-gray-700 font-semibold">
                  <ArrowLeft className="w-4 h-4" />{L("Back", "ආපසු")}
                </Button>

                <div className="flex items-center gap-2">
                  {/* Dot indicators */}
                  {STEPS.map((_, i) => (
                    <div key={i} className="rounded-full transition-all"
                      style={{ width: i === step ? 20 : 8, height: 8,
                        background: i === step ? "#16a34a" : i < step ? "#bbf7d0" : "#e5e7eb" }} />
                  ))}
                </div>

                <motion.button whileTap={{ scale: 0.97 }} onClick={next} disabled={!canProceed()}
                  className="flex items-center gap-2 px-7 py-3 rounded-2xl font-bold text-white text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ background: canProceed() ? "linear-gradient(135deg,#16a34a,#22c55e)" : "#d1d5db",
                    boxShadow: canProceed() ? "0 4px 16px #16a34a44" : "none" }}>
                  {step === STEPS.length - 1 ? (
                    <><Zap className="w-4 h-4" />{L("Start Learning", "ඉගෙනීම ආරම්භ")}</>
                  ) : (
                    <>{L("Continue", "ඉදිරියට")}<ArrowRight className="w-4 h-4" /></>
                  )}
                </motion.button>
              </div>

            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
