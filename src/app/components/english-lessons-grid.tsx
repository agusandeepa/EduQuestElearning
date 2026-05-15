import { motion } from "motion/react";
import { BookOpen, Lock, CheckCircle2, Star, Trophy, Languages, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useMemo } from "react";
import { getEnglishLessons, getEnglishProgress, isEnglishLessonUnlocked } from "../../services/localStorage";
import { useLanguage } from "../../contexts/LanguageContext";
import { ENGLISH_UNIT_NAMES } from "../../services/ol-english-lessons";
import type { Lesson } from "../../services/types";

interface EnglishLessonsGridProps {
  onLessonClick: (lessonId: number) => void;
  onBack?: () => void;
}

export function EnglishLessonsGrid({ onLessonClick, onBack }: EnglishLessonsGridProps) {
  const { language } = useLanguage();
  const lessons = getEnglishLessons();
  const progressData = getEnglishProgress();

  const getLessonStatus = (lessonId: number) => {
    const progress = progressData.find(p => p.lesson_id === lessonId);
    return {
      completed: progress?.completed || false,
      score: progress?.score || 0,
    };
  };

  const lessonsByUnit = useMemo(() => {
    const units: { [key: number]: Lesson[] } = {};
    lessons.forEach(lesson => {
      if (!units[lesson.level]) units[lesson.level] = [];
      units[lesson.level].push(lesson);
    });
    return units;
  }, [lessons]);

  return (
    <section className="py-16 bg-gradient-to-b from-white to-blue-50 dark:from-gray-950 dark:to-gray-900" id="english-lessons">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        {onBack && (
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </div>
        )}
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
            <Languages className="w-4 h-4" />
            Sri Lankan O/L English
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
            All English Lessons
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Grade 10–11 O/L English Syllabus — Grammar, Comprehension, Writing, Vocabulary & Literature
          </p>
        </motion.div>

        {/* Lessons by Unit */}
        <div className="max-w-6xl mx-auto space-y-12">
          {Object.entries(lessonsByUnit).map(([level, unitLessons]) => {
            const levelNum = parseInt(level);
            const unitInfo = ENGLISH_UNIT_NAMES[levelNum] || {
              name: `Unit ${level}`,
              color: "bg-gray-500",
              gradient: "from-gray-400 to-gray-600",
            };

            return (
              <div key={level}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="mb-6"
                >
                  <div className={`inline-block bg-gradient-to-r ${unitInfo.gradient} px-6 py-3 rounded-full shadow-lg`}>
                    <h3 className="text-xl font-bold text-white">
                      Unit {level}: {unitInfo.name}
                    </h3>
                  </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {unitLessons.map((lesson, index) => {
                    const status = getLessonStatus(lesson.id);
                    const isUnlocked = isEnglishLessonUnlocked(lesson.id);

                    return (
                      <motion.div
                        key={lesson.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all group ${isUnlocked ? "hover:shadow-xl" : "opacity-75"}`}>
                          {/* Card Header */}
                          <div className={`relative h-32 bg-gradient-to-br ${unitInfo.gradient} flex items-center justify-center p-4 ${!isUnlocked ? "opacity-50" : ""}`}>
                            <div className="absolute top-3 left-3 bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm w-10 h-10 rounded-full flex items-center justify-center shadow-md">
                              <span className="text-sm font-bold text-gray-900">{lesson.id - 2000}</span>
                            </div>

                            {!isUnlocked && (
                              <div className="absolute top-3 right-3">
                                <div className="bg-gray-500 rounded-full p-1.5 shadow-lg">
                                  <Lock className="w-5 h-5 text-white" />
                                </div>
                              </div>
                            )}

                            {status.completed && isUnlocked && (
                              <div className="absolute top-3 right-3">
                                <div className="bg-green-500 rounded-full p-1.5 shadow-lg">
                                  <CheckCircle2 className="w-5 h-5 text-white" />
                                </div>
                              </div>
                            )}

                            {isUnlocked ? (
                              <Languages className="w-12 h-12 text-white/80" />
                            ) : (
                              <Lock className="w-12 h-12 text-white/80" />
                            )}
                          </div>

                          {/* Card Content */}
                          <div className="p-5">
                            <h4 className={`text-lg font-bold mb-2 line-clamp-2 min-h-[3.5rem] ${isUnlocked ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"}`}>
                              {lesson.title}
                            </h4>
                            <p className={`text-sm mb-4 line-clamp-2 min-h-[2.5rem] ${isUnlocked ? "text-gray-600 dark:text-gray-400" : "text-gray-400"}`}>
                              {isUnlocked ? lesson.description : "Complete the previous lesson to unlock"}
                            </p>

                            <div className="flex items-center gap-4 mb-4 text-sm">
                              <div className="flex items-center gap-1">
                                <Star className={`w-4 h-4 ${isUnlocked ? "text-yellow-500" : "text-gray-400"}`} />
                                <span className={`font-semibold ${isUnlocked ? "text-gray-700 dark:text-gray-300" : "text-gray-400"}`}>
                                  {lesson.xp_reward} XP
                                </span>
                              </div>
                              {status.completed && isUnlocked && (
                                <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                                  <Trophy className="w-3 h-3 mr-1" />
                                  {status.score}%
                                </Badge>
                              )}
                            </div>

                            <Button
                              onClick={() => isUnlocked && onLessonClick(lesson.id)}
                              disabled={!isUnlocked}
                              className={`w-full rounded-xl font-semibold ${
                                !isUnlocked
                                  ? "bg-gray-300 text-gray-500 cursor-not-allowed hover:bg-gray-300"
                                  : status.completed
                                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                                  : "bg-blue-700 hover:bg-blue-800 text-white"
                              }`}
                            >
                              {!isUnlocked ? (
                                <><Lock className="w-4 h-4 mr-2" />Locked</>
                              ) : status.completed ? (
                                <><Trophy className="w-4 h-4 mr-2" />Review Lesson</>
                              ) : (
                                <><BookOpen className="w-4 h-4 mr-2" />Start Lesson</>
                              )}
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-6 bg-white dark:bg-gray-800 px-8 py-4 rounded-full shadow-lg">
            <div className="flex items-center gap-2">
              <Languages className="w-5 h-5 text-blue-600" />
              <span className="font-bold text-gray-900">{lessons.length} Lessons</span>
            </div>
            <div className="w-px h-6 bg-gray-300" />
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span className="font-bold text-gray-900">
                {progressData.filter(p => p.completed).length} Completed
              </span>
            </div>
            <div className="w-px h-6 bg-gray-300" />
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="font-bold text-gray-900">
                {progressData.reduce((sum, p) => sum + (p.completed ? lessons.find(l => l.id === p.lesson_id)?.xp_reward || 0 : 0), 0)} XP
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
