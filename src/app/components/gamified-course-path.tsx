import { motion } from "motion/react";
import { Lock, Star, Trophy, Crown, Flame, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";

interface Lesson {
  id: string;
  title: string;
  type: "lesson" | "quiz" | "boss";
  completed: boolean;
  locked: boolean;
  stars: number;
  position: { x: number; y: number };
  color: string;
  icon: string;
}

const lessons: Lesson[] = [
  // Ancient Egypt Unit
  { id: "1", title: "Introduction to Ancient Egypt", type: "lesson", completed: true, locked: false, stars: 3, position: { x: 50, y: 5 }, color: "from-yellow-400 to-orange-500", icon: "🏛️" },
  { id: "2", title: "The Pyramids of Giza", type: "lesson", completed: true, locked: false, stars: 3, position: { x: 30, y: 15 }, color: "from-yellow-400 to-orange-500", icon: "🔺" },
  { id: "3", title: "Quiz: Early Egypt", type: "quiz", completed: true, locked: false, stars: 3, position: { x: 50, y: 25 }, color: "from-purple-400 to-purple-600", icon: "📝" },
  { id: "4", title: "Pharaohs and Queens", type: "lesson", completed: true, locked: false, stars: 2, position: { x: 70, y: 35 }, color: "from-yellow-400 to-orange-500", icon: "👑" },
  { id: "5", title: "Hieroglyphics", type: "lesson", completed: true, locked: false, stars: 3, position: { x: 50, y: 45 }, color: "from-yellow-400 to-orange-500", icon: "📜" },
  
  // Ancient Greece Unit (Current Progress)
  { id: "6", title: "Ancient Greece Begins", type: "boss", completed: true, locked: false, stars: 3, position: { x: 30, y: 55 }, color: "from-blue-400 to-blue-600", icon: "🏺" },
  { id: "7", title: "Athens and Sparta", type: "lesson", completed: true, locked: false, stars: 3, position: { x: 50, y: 65 }, color: "from-blue-400 to-blue-600", icon: "⚔️" },
  { id: "8", title: "Greek Philosophy", type: "lesson", completed: false, locked: false, stars: 0, position: { x: 70, y: 75 }, color: "from-blue-400 to-blue-600", icon: "🧠" }, // CURRENT - Bird is here
  { id: "9", title: "Greek Mythology", type: "lesson", completed: false, locked: false, stars: 0, position: { x: 50, y: 85 }, color: "from-blue-400 to-blue-600", icon: "⚡" },
  { id: "10", title: "Quiz: Greece", type: "quiz", completed: false, locked: false, stars: 0, position: { x: 30, y: 95 }, color: "from-purple-400 to-purple-600", icon: "📝" },
  
  // Roman Empire (Locked)
  { id: "11", title: "Rise of Rome", type: "boss", completed: false, locked: true, stars: 0, position: { x: 50, y: 105 }, color: "from-red-400 to-red-600", icon: "🏛️" },
  { id: "12", title: "Roman Conquest", type: "lesson", completed: false, locked: true, stars: 0, position: { x: 70, y: 115 }, color: "from-red-400 to-red-600", icon: "🛡️" },
  { id: "13", title: "Roman Culture", type: "lesson", completed: false, locked: true, stars: 0, position: { x: 50, y: 125 }, color: "from-red-400 to-red-600", icon: "🏺" },
  { id: "14", title: "Fall of Rome", type: "lesson", completed: false, locked: true, stars: 0, position: { x: 30, y: 135 }, color: "from-red-400 to-red-600", icon: "💔" },
  { id: "15", title: "Rome Boss Battle", type: "boss", completed: false, locked: true, stars: 0, position: { x: 50, y: 145 }, color: "from-red-400 to-red-600", icon: "👑" },
];

interface GamifiedCoursePathProps {
  onLessonClick: (lessonId: string) => void;
}

export function GamifiedCoursePath({ onLessonClick }: GamifiedCoursePathProps) {
  // Find current lesson (first incomplete lesson)
  const currentLessonIndex = lessons.findIndex(l => !l.completed && !l.locked);
  const currentLesson = lessons[currentLessonIndex];

  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden" id="courses">
      {/* Decorative clouds */}
      <motion.div
        animate={{ x: [0, 30, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 left-10 text-6xl opacity-40"
      >
        ☁️
      </motion.div>
      <motion.div
        animate={{ x: [0, -30, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-40 right-10 text-5xl opacity-40"
      >
        ☁️
      </motion.div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Your Learning Journey 🗺️
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Follow the path through history! Complete lessons to unlock new adventures.
          </p>
        </motion.div>

        {/* Stats Bar */}
        <div className="max-w-md mx-auto mb-8 bg-white rounded-2xl shadow-lg p-4 flex items-center justify-around">
          <div className="text-center">
            <div className="flex items-center gap-1 justify-center mb-1">
              <Flame className="w-5 h-5 text-orange-500" />
              <span className="text-2xl font-bold text-gray-900">12</span>
            </div>
            <p className="text-xs text-gray-600">Day Streak</p>
          </div>
          <div className="text-center">
            <div className="flex items-center gap-1 justify-center mb-1">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="text-2xl font-bold text-gray-900">24</span>
            </div>
            <p className="text-xs text-gray-600">Total Stars</p>
          </div>
          <div className="text-center">
            <div className="flex items-center gap-1 justify-center mb-1">
              <Trophy className="w-5 h-5 text-purple-500" />
              <span className="text-2xl font-bold text-gray-900">720</span>
            </div>
            <p className="text-xs text-gray-600">XP Points</p>
          </div>
        </div>

        {/* Game Path */}
        <div className="max-w-2xl mx-auto relative">
          <div className="relative min-h-[1600px] bg-gradient-to-b from-green-100 via-blue-100 to-purple-100 rounded-3xl shadow-2xl p-8 overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-20 left-10 text-4xl">🌳</div>
              <div className="absolute top-60 right-10 text-4xl">🌳</div>
              <div className="absolute top-100 left-20 text-4xl">🏔️</div>
              <div className="absolute bottom-40 right-20 text-4xl">🏔️</div>
            </div>

            {/* Winding Path SVG */}
            <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
              <defs>
                <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FCD34D" />
                  <stop offset="50%" stopColor="#60A5FA" />
                  <stop offset="100%" stopColor="#F472B6" />
                </linearGradient>
              </defs>
              <path
                d={`
                  M ${lessons[0].position.x}% ${lessons[0].position.y}%
                  ${lessons.map((l, i) => {
                    if (i === 0) return '';
                    const prev = lessons[i - 1];
                    return `Q ${(prev.position.x + l.position.x) / 2}% ${prev.position.y}%, ${l.position.x}% ${l.position.y}%`;
                  }).join(' ')}
                `}
                fill="none"
                stroke="url(#pathGradient)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray="20 10"
                opacity="0.4"
              />
            </svg>

            {/* Lessons */}
            {lessons.map((lesson, index) => {
              const isCurrentLesson = index === currentLessonIndex;
              const isBossLesson = lesson.type === "boss";
              const size = isBossLesson ? "w-24 h-24" : "w-20 h-20";

              return (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="absolute"
                  style={{
                    left: `${lesson.position.x}%`,
                    top: `${lesson.position.y}%`,
                    transform: "translate(-50%, -50%)",
                    zIndex: 10,
                  }}
                >
                  <div className="relative">
                    {/* Lesson Node */}
                    <button
                      onClick={() => !lesson.locked && onLessonClick(lesson.id)}
                      disabled={lesson.locked}
                      className={`${size} rounded-full bg-gradient-to-br ${lesson.color} 
                        ${lesson.locked ? "opacity-50 cursor-not-allowed" : "hover:scale-110 cursor-pointer"} 
                        ${isCurrentLesson ? "ring-4 ring-white ring-offset-4 ring-offset-blue-400 animate-pulse" : ""}
                        ${lesson.completed ? "ring-2 ring-green-500" : ""}
                        transition-all duration-300 shadow-xl flex items-center justify-center text-3xl relative`}
                    >
                      {lesson.locked ? (
                        <Lock className="w-8 h-8 text-white" />
                      ) : (
                        <span>{lesson.icon}</span>
                      )}
                      
                      {/* Completion Check */}
                      {lesson.completed && (
                        <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1">
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        </div>
                      )}
                      
                      {/* Boss Crown */}
                      {isBossLesson && !lesson.locked && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                          <Crown className="w-6 h-6 text-yellow-400 drop-shadow-lg" />
                        </div>
                      )}
                    </button>

                    {/* Stars */}
                    {!lesson.locked && lesson.stars > 0 && (
                      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-0.5">
                        {[1, 2, 3].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= lesson.stars
                                ? "fill-yellow-400 text-yellow-400"
                                : "fill-gray-300 text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    )}

                    {/* Lesson Title */}
                    <div className="absolute top-full mt-8 left-1/2 -translate-x-1/2 w-32 text-center">
                      <p className={`text-xs font-bold ${lesson.locked ? "text-gray-400" : "text-gray-900"}`}>
                        {lesson.title}
                      </p>
                      {lesson.type === "boss" && !lesson.locked && (
                        <span className="inline-block mt-1 text-xs bg-purple-500 text-white px-2 py-0.5 rounded-full">
                          BOSS
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Animated Bird Character - At current lesson */}
            {currentLesson && (
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [-5, 5, -5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute text-6xl"
                style={{
                  left: `${currentLesson.position.x}%`,
                  top: `${currentLesson.position.y - 15}%`,
                  transform: "translate(-50%, -50%)",
                  zIndex: 20,
                  filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.3))",
                }}
              >
                🐦
              </motion.div>
            )}

            {/* Unit Banners */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 rounded-full font-bold shadow-lg">
              ⭐ Ancient Egypt
            </div>
            <div className="absolute top-[52%] left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-400 to-blue-600 text-white px-6 py-2 rounded-full font-bold shadow-lg">
              🏛️ Ancient Greece
            </div>
            <div className="absolute top-[102%] left-1/2 -translate-x-1/2 bg-gradient-to-r from-red-400 to-red-600 text-white px-6 py-2 rounded-full font-bold shadow-lg opacity-50">
              🔒 Roman Empire
            </div>
          </div>
        </div>

        {/* Next Lesson Card */}
        {currentLesson && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto mt-8 bg-white rounded-2xl shadow-xl p-6"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${currentLesson.color} flex items-center justify-center text-3xl`}>
                {currentLesson.icon}
              </div>
              <div>
                <p className="text-sm text-gray-600">Next Lesson</p>
                <h3 className="text-lg font-bold text-gray-900">{currentLesson.title}</h3>
              </div>
            </div>
            <Button
              onClick={() => onLessonClick(currentLesson.id)}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-xl text-lg"
            >
              Continue Learning 🚀
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
