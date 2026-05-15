import { motion } from "motion/react";
import { Lock, Star, Trophy, Crown, BookOpen, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";

interface LessonNode {
  id: string;
  title: string;
  type: "lesson" | "practice" | "story" | "review" | "unit-test";
  completed: boolean;
  locked: boolean;
  stars: number;
  xp: number;
  color: string;
  icon: string;
}

// Duolingo-style lesson structure
const lessonNodes: LessonNode[] = [
  // Unit 1: Ancient Egypt (Gold theme)
  { id: "1", title: "Ancient Egypt Intro", type: "lesson", completed: true, locked: false, stars: 3, xp: 10, color: "bg-yellow-500", icon: "🏛️" },
  { id: "2", title: "Pyramids", type: "lesson", completed: true, locked: false, stars: 3, xp: 10, color: "bg-yellow-500", icon: "🔺" },
  { id: "3", title: "Practice: Egypt", type: "practice", completed: true, locked: false, stars: 3, xp: 15, color: "bg-orange-500", icon: "🎯" },
  { id: "4", title: "Pharaohs", type: "lesson", completed: true, locked: false, stars: 2, xp: 10, color: "bg-yellow-500", icon: "👑" },
  { id: "5", title: "Hieroglyphics", type: "lesson", completed: true, locked: false, stars: 3, xp: 10, color: "bg-yellow-500", icon: "📜" },
  { id: "6", title: "Story: Cleopatra", type: "story", completed: true, locked: false, stars: 3, xp: 20, color: "bg-purple-500", icon: "📖" },
  { id: "7", title: "Unit 1 Review", type: "review", completed: true, locked: false, stars: 3, xp: 25, color: "bg-blue-500", icon: "📝" },
  { id: "8", title: "Egypt Unit Test", type: "unit-test", completed: true, locked: false, stars: 3, xp: 50, color: "bg-gradient-to-r from-yellow-400 to-orange-500", icon: "👑" },

  // Unit 2: Ancient Greece (Blue theme) - Current Progress
  { id: "9", title: "Ancient Greece Intro", type: "lesson", completed: true, locked: false, stars: 3, xp: 10, color: "bg-blue-500", icon: "🏺" },
  { id: "10", title: "Athens & Sparta", type: "lesson", completed: true, locked: false, stars: 3, xp: 10, color: "bg-blue-500", icon: "⚔️" },
  { id: "11", title: "Practice: Greece", type: "practice", completed: false, locked: false, stars: 0, xp: 15, color: "bg-cyan-500", icon: "🎯" },
  { id: "12", title: "Greek Philosophy", type: "lesson", completed: false, locked: false, stars: 0, xp: 10, color: "bg-blue-500", icon: "🧠" }, // CURRENT
  { id: "13", title: "Greek Gods", type: "lesson", completed: false, locked: false, stars: 0, xp: 10, color: "bg-blue-500", icon: "⚡" },
  { id: "14", title: "Story: Odyssey", type: "story", completed: false, locked: false, stars: 0, xp: 20, color: "bg-purple-500", icon: "📖" },
  { id: "15", title: "Unit 2 Review", type: "review", completed: false, locked: false, stars: 0, xp: 25, color: "bg-blue-500", icon: "📝" },
  { id: "16", title: "Greece Unit Test", type: "unit-test", completed: false, locked: false, stars: 0, xp: 50, color: "bg-gradient-to-r from-blue-400 to-cyan-500", icon: "👑" },

  // Unit 3: Roman Empire (Red theme) - Locked
  { id: "17", title: "Roman Empire Intro", type: "lesson", completed: false, locked: true, stars: 0, xp: 10, color: "bg-red-500", icon: "🏛️" },
  { id: "18", title: "Roman Army", type: "lesson", completed: false, locked: true, stars: 0, xp: 10, color: "bg-red-500", icon: "🛡️" },
  { id: "19", title: "Practice: Rome", type: "practice", completed: false, locked: true, stars: 0, xp: 15, color: "bg-orange-500", icon: "🎯" },
  { id: "20", title: "Roman Culture", type: "lesson", completed: false, locked: true, stars: 0, xp: 10, color: "bg-red-500", icon: "🏺" },
];

interface DuolingoPathProps {
  onLessonClick: (lessonId: string) => void;
}

export function DuolingoPath({ onLessonClick }: DuolingoPathProps) {
  const currentLessonIndex = lessonNodes.findIndex((l) => !l.completed && !l.locked);
  const totalXP = lessonNodes.filter((l) => l.completed).reduce((sum, l) => sum + l.xp, 0);
  const totalStars = lessonNodes.filter((l) => l.completed).reduce((sum, l) => sum + l.stars, 0);

  // Determine unit boundaries for headers
  const unitBoundaries = [
    { index: 0, name: "Unit 1", title: "Ancient Egypt", color: "from-yellow-400 to-orange-500", emoji: "🏛️" },
    { index: 8, name: "Unit 2", title: "Ancient Greece", color: "from-blue-400 to-cyan-500", emoji: "🏺" },
    { index: 16, name: "Unit 3", title: "Roman Empire", color: "from-red-400 to-pink-500", emoji: "⚔️", locked: true },
  ];

  // Calculate positions for zigzag pattern
  const getPosition = (index: number): "left" | "center" | "right" => {
    const pattern = ["center", "left", "right", "center", "right", "left"];
    return pattern[index % pattern.length] as "left" | "center" | "right";
  };

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
                  Learning Path
                </h2>
                <p className="text-gray-600">Keep learning to unlock more content!</p>
              </div>
              <div className="flex gap-6">
                <div className="text-center">
                  <div className="flex items-center gap-2 mb-1">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span className="text-2xl font-bold text-gray-900">{totalStars}</span>
                  </div>
                  <p className="text-xs text-gray-600">Stars</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center gap-2 mb-1">
                    <Trophy className="w-5 h-5 text-purple-500" />
                    <span className="text-2xl font-bold text-gray-900">{totalXP}</span>
                  </div>
                  <p className="text-xs text-gray-600">Total XP</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lesson Path */}
        <div className="max-w-2xl mx-auto">
          {lessonNodes.map((lesson, index) => {
            const position = getPosition(index);
            const isCurrentLesson = index === currentLessonIndex;
            const unitBoundary = unitBoundaries.find((u) => u.index === index);

            return (
              <div key={lesson.id}>
                {/* Unit Header */}
                {unitBoundary && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="mb-12 mt-8 first:mt-0"
                  >
                    <div className={`bg-gradient-to-r ${unitBoundary.color} rounded-3xl p-6 text-white text-center shadow-xl relative overflow-hidden ${unitBoundary.locked ? 'opacity-60' : ''}`}>
                      {unitBoundary.locked && (
                        <div className="absolute top-4 right-4">
                          <Lock className="w-6 h-6" />
                        </div>
                      )}
                      <div className="text-5xl mb-3">{unitBoundary.emoji}</div>
                      <h3 className="text-sm font-bold uppercase tracking-wide opacity-90">
                        {unitBoundary.name}
                      </h3>
                      <h4 className="text-2xl font-extrabold">{unitBoundary.title}</h4>
                    </div>
                  </motion.div>
                )}

                {/* Lesson Node */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 }}
                  className={`flex justify-${position} mb-6 relative`}
                >
                  {/* Connecting Line */}
                  {index < lessonNodes.length - 1 && (
                    <div
                      className={`absolute top-full left-1/2 w-1 h-6 ${
                        lesson.completed ? "bg-green-400" : "bg-gray-300"
                      } -translate-x-1/2`}
                    />
                  )}

                  <div className="relative group">
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
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        </div>
                      )}

                      {/* Crown for Unit Tests */}
                      {lesson.type === "unit-test" && !lesson.locked && (
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                          <Crown className="w-7 h-7 text-yellow-300 drop-shadow-lg" />
                        </div>
                      )}

                      {/* Sparkles for Stories */}
                      {lesson.type === "story" && !lesson.locked && (
                        <div className="absolute -top-2 -right-2">
                          <Sparkles className="w-5 h-5 text-yellow-300" />
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
                          <p className="font-bold text-sm mb-1">{lesson.title}</p>
                          <div className="flex items-center gap-3 text-xs">
                            <span className="flex items-center gap-1">
                              <Trophy className="w-3 h-3" /> {lesson.xp} XP
                            </span>
                            {lesson.type === "unit-test" && (
                              <span className="bg-yellow-500 px-2 py-0.5 rounded-full font-bold">
                                BOSS
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
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
              <span className="font-semibold">Complete lessons to unlock more content</span>
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
              <h3 className="font-bold text-gray-900">Daily Goal</h3>
              <p className="text-sm text-gray-600">2/3 lessons completed today</p>
            </div>
            <span className="text-2xl font-extrabold text-orange-600">12</span>
          </div>
          <Progress value={66} className="h-3 bg-orange-200" />
          <p className="text-xs text-gray-600 mt-2">
            Complete 1 more lesson to maintain your 12-day streak!
          </p>
        </motion.div>
      </div>
    </section>
  );
}
