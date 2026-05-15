import { motion, AnimatePresence } from "motion/react";
import { Lock, Star, Crown, CheckCircle, Circle } from "lucide-react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { useLanguage } from "../../contexts/LanguageContext";

interface LessonNode {
  id: string;
  titleKey: string;
  type: "lesson" | "practice" | "story" | "review" | "unit-test";
  completed: boolean;
  locked: boolean;
  stars: number;
  xp: number;
  color: string;
  icon: string;
  row: number;
  col: number;
}

// Enhanced Duolingo v3 style structure - 3-4 lessons per level, then checkpoint
const lessonNodes: LessonNode[] = [
  // UNIT 1: Ancient Egypt (Complete)
  // Level 1
  { id: "1-1", titleKey: "Egypt Basics", type: "lesson", completed: true, locked: false, stars: 3, xp: 10, color: "bg-yellow-500", icon: "🏛️", row: 0, col: 1 },
  { id: "1-2", titleKey: "Pharaohs", type: "lesson", completed: true, locked: false, stars: 3, xp: 10, color: "bg-yellow-500", icon: "👑", row: 1, col: 0 },
  { id: "1-3", titleKey: "Pyramids", type: "lesson", completed: true, locked: false, stars: 3, xp: 10, color: "bg-yellow-500", icon: "🔺", row: 1, col: 2 },
  { id: "1-p1", titleKey: "Practice", type: "practice", completed: true, locked: false, stars: 3, xp: 15, color: "bg-orange-500", icon: "🎯", row: 2, col: 1 },
  
  // Level 2
  { id: "1-4", titleKey: "Hieroglyphics", type: "lesson", completed: true, locked: false, stars: 2, xp: 10, color: "bg-yellow-500", icon: "📜", row: 3, col: 0 },
  { id: "1-5", titleKey: "Mummies", type: "lesson", completed: true, locked: false, stars: 3, xp: 10, color: "bg-yellow-500", icon: "🧟", row: 3, col: 2 },
  { id: "1-6", titleKey: "Nile River", type: "lesson", completed: true, locked: false, stars: 3, xp: 10, color: "bg-yellow-500", icon: "🌊", row: 4, col: 1 },
  { id: "1-s1", titleKey: "Story: Cleopatra", type: "story", completed: true, locked: false, stars: 3, xp: 20, color: "bg-purple-500", icon: "📖", row: 5, col: 1 },
  
  // Unit Review & Test
  { id: "1-r", titleKey: "Unit Review", type: "review", completed: true, locked: false, stars: 3, xp: 25, color: "bg-blue-500", icon: "📝", row: 6, col: 1 },
  { id: "1-t", titleKey: "Egypt Test", type: "unit-test", completed: true, locked: false, stars: 3, xp: 50, color: "bg-gradient-to-r from-yellow-400 to-orange-500", icon: "👑", row: 7, col: 1 },

  // UNIT 2: Ancient Greece (In Progress)
  // Level 1
  { id: "2-1", titleKey: "Greece Intro", type: "lesson", completed: true, locked: false, stars: 3, xp: 10, color: "bg-blue-500", icon: "🏺", row: 9, col: 1 },
  { id: "2-2", titleKey: "Athens", type: "lesson", completed: true, locked: false, stars: 3, xp: 10, color: "bg-blue-500", icon: "🏛️", row: 10, col: 0 },
  { id: "2-3", titleKey: "Sparta", type: "lesson", completed: true, locked: false, stars: 3, xp: 10, color: "bg-blue-500", icon: "⚔️", row: 10, col: 2 },
  { id: "2-p1", titleKey: "Practice", type: "practice", completed: false, locked: false, stars: 0, xp: 15, color: "bg-cyan-500", icon: "🎯", row: 11, col: 1 },
  
  // Level 2 - CURRENT POSITION
  { id: "2-4", titleKey: "Philosophy", type: "lesson", completed: false, locked: false, stars: 0, xp: 10, color: "bg-blue-500", icon: "🧠", row: 12, col: 0 },
  { id: "2-5", titleKey: "Greek Gods", type: "lesson", completed: false, locked: false, stars: 0, xp: 10, color: "bg-blue-500", icon: "⚡", row: 12, col: 2 },
  { id: "2-6", titleKey: "Olympics", type: "lesson", completed: false, locked: false, stars: 0, xp: 10, color: "bg-blue-500", icon: "🏅", row: 13, col: 1 },
  { id: "2-s1", titleKey: "Story: Odyssey", type: "story", completed: false, locked: false, stars: 0, xp: 20, color: "bg-purple-500", icon: "📖", row: 14, col: 1 },
  
  // Unit Review & Test
  { id: "2-r", titleKey: "Unit Review", type: "review", completed: false, locked: false, stars: 0, xp: 25, color: "bg-blue-500", icon: "📝", row: 15, col: 1 },
  { id: "2-t", titleKey: "Greece Test", type: "unit-test", completed: false, locked: false, stars: 0, xp: 50, color: "bg-gradient-to-r from-blue-400 to-cyan-500", icon: "👑", row: 16, col: 1 },

  // UNIT 3: Roman Empire (Locked)
  // Level 1
  { id: "3-1", titleKey: "Rome Intro", type: "lesson", completed: false, locked: true, stars: 0, xp: 10, color: "bg-red-500", icon: "🏛️", row: 18, col: 1 },
  { id: "3-2", titleKey: "Roman Army", type: "lesson", completed: false, locked: true, stars: 0, xp: 10, color: "bg-red-500", icon: "🛡️", row: 19, col: 0 },
  { id: "3-3", titleKey: "Gladiators", type: "lesson", completed: false, locked: true, stars: 0, xp: 10, color: "bg-red-500", icon: "⚔️", row: 19, col: 2 },
  { id: "3-p1", titleKey: "Practice", type: "practice", completed: false, locked: true, stars: 0, xp: 15, color: "bg-orange-500", icon: "🎯", row: 20, col: 1 },
];

interface EnhancedDuolingoPathProps {
  onLessonClick: (lessonId: string) => void;
}

export function EnhancedDuolingoPath({ onLessonClick }: EnhancedDuolingoPathProps) {
  const { t } = useLanguage();
  const currentLessonIndex = lessonNodes.findIndex((l) => !l.completed && !l.locked);
  const totalXP = lessonNodes.filter((l) => l.completed).reduce((sum, l) => sum + l.xp, 0);
  const totalStars = lessonNodes.filter((l) => l.completed).reduce((sum, l) => sum + l.stars, 0);

  const unitBoundaries = [
    { row: 0, nameKey: "unit1.name", titleKey: "unit1.title", color: "from-yellow-400 to-orange-500", emoji: "🏛️" },
    { row: 9, nameKey: "unit2.name", titleKey: "unit2.title", color: "from-blue-400 to-cyan-500", emoji: "🏺" },
    { row: 18, nameKey: "unit3.name", titleKey: "unit3.title", color: "from-red-400 to-pink-500", emoji: "⚔️", locked: true },
  ];

  const getNodeSize = (type: string) => {
    if (type === "unit-test") return "w-24 h-24 text-4xl";
    if (type === "story") return "w-20 h-20 text-3xl";
    return "w-16 h-16 text-2xl";
  };

  return (
    <section className="py-12 bg-white" id="courses">
      <div className="container mx-auto px-4">
        {/* Header Stats */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-3xl p-6 shadow-lg">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-2xl font-extrabold text-gray-900 mb-1">
                  {t("path.title")}
                </h2>
                <p className="text-gray-600">{t("path.subtitle")}</p>
              </div>
              <div className="flex gap-6">
                <div className="text-center">
                  <div className="flex items-center gap-2 mb-1">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span className="text-2xl font-bold text-gray-900">{totalStars}</span>
                  </div>
                  <p className="text-xs text-gray-600">{t("path.stars")}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center gap-2 mb-1">
                    <Crown className="w-5 h-5 text-purple-500" />
                    <span className="text-2xl font-bold text-gray-900">{totalXP}</span>
                  </div>
                  <p className="text-xs text-gray-600">{t("path.totalXP")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lesson Path Grid */}
        <div className="max-w-2xl mx-auto">
          {/* Calculate max rows */}
          {Array.from({ length: Math.max(...lessonNodes.map(l => l.row)) + 1 }).map((_, rowIndex) => {
            const rowLessons = lessonNodes.filter(l => l.row === rowIndex);
            const unitBoundary = unitBoundaries.find((u) => u.row === rowIndex);

            return (
              <div key={rowIndex}>
                {/* Unit Header */}
                {unitBoundary && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="mb-8 mt-8 first:mt-0"
                  >
                    <div className={`bg-gradient-to-r ${unitBoundary.color} rounded-3xl p-6 text-white text-center shadow-xl relative overflow-hidden ${unitBoundary.locked ? 'opacity-60' : ''}`}>
                      {unitBoundary.locked && (
                        <div className="absolute top-4 right-4">
                          <Lock className="w-6 h-6" />
                        </div>
                      )}
                      <div className="text-5xl mb-3">{unitBoundary.emoji}</div>
                      <h3 className="text-sm font-bold uppercase tracking-wide opacity-90">
                        {t(unitBoundary.nameKey)}
                      </h3>
                      <h4 className="text-2xl font-extrabold">{t(unitBoundary.titleKey)}</h4>
                    </div>
                  </motion.div>
                )}

                {/* Lesson Row */}
                {rowLessons.length > 0 && (
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    {[0, 1, 2].map((col) => {
                      const lesson = rowLessons.find(l => l.col === col);
                      if (!lesson) return <div key={col} />;

                      const isCurrentLesson = lessonNodes.findIndex(l => l.id === lesson.id) === currentLessonIndex;

                      return (
                        <motion.div
                          key={lesson.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          className="relative flex justify-center group"
                        >
                          {/* Bird on Current Lesson */}
                          {isCurrentLesson && (
                            <motion.div
                              animate={{
                                y: [0, -15, 0],
                                rotate: [-10, 10, -10],
                              }}
                              transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                              className="absolute -top-16 left-1/2 -translate-x-1/2 text-6xl z-20"
                              style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.2))" }}
                            >
                              🐦
                            </motion.div>
                          )}

                          {/* Lesson Circle */}
                          <button
                            onClick={() => !lesson.locked && onLessonClick(lesson.id)}
                            disabled={lesson.locked}
                            className={`${getNodeSize(lesson.type)} rounded-full ${
                              lesson.type === "unit-test"
                                ? `bg-gradient-to-br ${lesson.color.replace("bg-", "from-")} to-yellow-600`
                                : lesson.color
                            } ${
                              lesson.locked
                                ? "opacity-40 cursor-not-allowed"
                                : "hover:scale-110 cursor-pointer shadow-lg hover:shadow-2xl"
                            } ${
                              isCurrentLesson
                                ? "ring-4 ring-green-400 ring-offset-4 animate-pulse"
                                : ""
                            } ${lesson.completed ? "ring-2 ring-white" : ""} 
                            transition-all duration-300 flex items-center justify-center font-bold relative`}
                          >
                            {lesson.locked ? (
                              <Lock className="w-8 h-8 text-white" />
                            ) : (
                              <span>{lesson.icon}</span>
                            )}

                            {/* Completed Badge */}
                            {lesson.completed && (
                              <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-lg">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                              </div>
                            )}

                            {/* Crown for Unit Tests */}
                            {lesson.type === "unit-test" && !lesson.locked && (
                              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                <Crown className="w-7 h-7 text-yellow-300 drop-shadow-lg" />
                              </div>
                            )}

                            {/* Sparkles for Stories */}
                            {lesson.type === "story" && !lesson.locked && (
                              <div className="absolute -top-2 -right-2">
                                <Circle className="w-5 h-5 text-yellow-300" />
                              </div>
                            )}

                            {/* Zap for Practice */}
                            {lesson.type === "practice" && !lesson.locked && (
                              <div className="absolute -top-2 -right-2">
                                <Circle className="w-5 h-5 text-yellow-300 fill-yellow-300" />
                              </div>
                            )}
                          </button>

                          {/* Stars */}
                          {!lesson.locked && (
                            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-1">
                              {[1, 2, 3].map((star) => (
                                <Star
                                  key={star}
                                  className={`w-4 h-4 ${
                                    star <= lesson.stars
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "fill-gray-200 text-gray-200"
                                  }`}
                                />
                              ))}
                            </div>
                          )}

                          {/* Hover Card */}
                          {!lesson.locked && (
                            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30">
                              <div className="bg-gray-900 text-white px-4 py-3 rounded-xl shadow-xl whitespace-nowrap">
                                <p className="font-bold text-sm mb-1">{lesson.titleKey}</p>
                                <div className="flex items-center gap-3 text-xs">
                                  <span className="flex items-center gap-1">
                                    <Crown className="w-3 h-3" /> {lesson.xp} {t("lesson.xp")}
                                  </span>
                                  {lesson.type === "unit-test" && (
                                    <span className="bg-yellow-500 px-2 py-0.5 rounded-full font-bold">
                                      {t("lesson.boss")}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {/* Bottom Locked Message */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-2 bg-gray-100 px-6 py-3 rounded-full text-gray-600">
              <Lock className="w-5 h-5" />
              <span className="font-semibold">{t("path.locked")}</span>
            </div>
          </motion.div>
        </div>

        {/* Daily Goal Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto mt-12 bg-gradient-to-r from-orange-100 to-red-100 rounded-3xl p-6 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="text-3xl">🔥</div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900">{t("path.dailyGoal")}</h3>
              <p className="text-sm text-gray-600">2/3 {t("path.lessonsCompleted")}</p>
            </div>
            <span className="text-2xl font-extrabold text-orange-600">12</span>
          </div>
          <Progress value={66} className="h-3 bg-orange-200" />
          <p className="text-xs text-gray-600 mt-2">
            {t("path.maintainStreak")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}