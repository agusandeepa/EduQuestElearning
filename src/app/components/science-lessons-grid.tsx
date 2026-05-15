import { motion } from "motion/react";
import { FlaskConical, Lock, CheckCircle2, Star, Trophy, Microscope, ArrowLeft, BookOpen } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useMemo } from "react";
import { getScienceLessons, getScienceProgress, isScienceLessonUnlocked } from "../../services/localStorage";
import { useLanguage } from "../../contexts/LanguageContext";
import { SCIENCE_UNIT_NAMES, VIRTUAL_LABS } from "../../services/science-lessons";
import type { Lesson } from "../../services/types";

interface ScienceLessonsGridProps {
  onLessonClick: (lessonId: number) => void;
  onBack?: () => void;
}

export function ScienceLessonsGrid({ onLessonClick, onBack }: ScienceLessonsGridProps) {
  const { language } = useLanguage();
  const lessons = getScienceLessons();
  const progressData = getScienceProgress();

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
    <section className="py-16 bg-gradient-to-b from-white to-green-50 dark:from-gray-950 dark:to-gray-900" id="science-lessons">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        {onBack && (
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-green-700 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20"
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
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
            <FlaskConical className="w-4 h-4" />
            Sri Lankan O/L Science
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
            All Science Lessons
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Grade 10–11 O/L Science — Physics, Chemistry & Biology with interactive Virtual Lab Practicals 🔬
          </p>

          {/* Lab badge */}
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-semibold mt-3">
            <Microscope className="w-4 h-4" />
            5 Virtual Lab Practicals Included
          </div>
        </motion.div>

        {/* Lessons by Unit */}
        <div className="max-w-6xl mx-auto space-y-12">
          {Object.entries(lessonsByUnit).map(([level, unitLessons]) => {
            const levelNum = parseInt(level);
            const unitName = SCIENCE_UNIT_NAMES[levelNum] || `Unit ${levelNum}`;

            return (
              <motion.div
                key={level}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                {/* Unit Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-green-600 text-white px-4 py-2 rounded-xl font-extrabold text-sm">
                    {unitName}
                  </div>
                  <div className="h-px flex-1 bg-green-200" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">{unitLessons.length} lesson{unitLessons.length > 1 ? 's' : ''}</span>
                </div>

                {/* Lessons Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {unitLessons.map((lesson, idx) => {
                    const { completed, score } = getLessonStatus(lesson.id);
                    const unlocked = isScienceLessonUnlocked(lesson.id);
                    const hasLab = !!VIRTUAL_LABS[lesson.id];
                    const isTheory = !hasLab;

                    return (
                      <motion.div
                        key={lesson.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <div
                          className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all group ${unlocked ? 'hover:shadow-xl cursor-pointer' : 'opacity-75'}`}
                          onClick={() => unlocked && onLessonClick(lesson.id)}
                        >
                          {/* Card Header */}
                          <div className={`relative h-32 flex items-center justify-center p-4 ${
                            isTheory ? 'bg-gradient-to-br from-green-400 to-emerald-600' : 'bg-gradient-to-br from-green-500 to-teal-600'
                          } ${!unlocked ? 'opacity-50' : ''}`}>
                            {/* Lesson Number */}
                            <div className="absolute top-3 left-3 bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm w-10 h-10 rounded-full flex items-center justify-center shadow-md">
                              <span className="text-lg font-bold text-gray-900">{lesson.id}</span>
                            </div>

                            {/* Lock badge - top right */}
                            {!unlocked && (
                              <div className="absolute top-3 right-3">
                                <div className="bg-gray-500 rounded-full p-1.5 shadow-lg">
                                  <Lock className="w-5 h-5 text-white" />
                                </div>
                              </div>
                            )}

                            {/* Completed badge */}
                            {completed && unlocked && (
                              <div className="absolute top-3 right-3">
                                <div className="bg-green-500 rounded-full p-1.5 shadow-lg">
                                  <CheckCircle2 className="w-5 h-5 text-white" />
                                </div>
                              </div>
                            )}

                            {/* Center icon */}
                            {unlocked
                              ? isTheory
                                ? <BookOpen className="w-12 h-12 text-white/80" />
                                : <FlaskConical className="w-12 h-12 text-white/80" />
                              : <Lock className="w-12 h-12 text-white/80" />
                            }
                          </div>

                          {/* Card Content */}
                          <div className="p-5">
                            {/* Lab / Theory badge */}
                            <div className="mb-2">
                              {hasLab ? (
                                <Badge className="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 border-0 text-xs gap-1">
                                  <Microscope className="w-3 h-3" /> Lab
                                </Badge>
                              ) : (
                                <Badge className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 border-0 text-xs gap-1">
                                  <BookOpen className="w-3 h-3" /> Theory
                                </Badge>
                              )}
                            </div>

                            {/* Title */}
                            <h4 className={`text-base font-bold mb-2 line-clamp-2 min-h-[3rem] ${unlocked ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-500'}`}>
                              {lesson.title}
                            </h4>

                            {/* Description */}
                            <p className={`text-sm mb-4 line-clamp-2 min-h-[2.5rem] ${unlocked ? 'text-gray-600 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500'}`}>
                              {unlocked ? lesson.description : 'Complete the previous lesson to unlock'}
                            </p>

                            {/* Footer */}
                            <div className="flex items-center gap-4 mb-4">
                              <div className="flex items-center gap-1">
                                <Star className={`w-4 h-4 ${unlocked ? 'text-yellow-500' : 'text-gray-400'}`} />
                                <span className={`text-sm font-semibold ${unlocked ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500'}`}>{lesson.xp_reward} XP</span>
                              </div>
                              {completed && unlocked && (
                                <Badge variant="secondary" className="bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 hover:bg-green-100">
                                  <Trophy className="w-3 h-3 mr-1" />{score}%
                                </Badge>
                              )}
                            </div>

                            {/* Action Button */}
                            <Button
                              onClick={() => unlocked && onLessonClick(lesson.id)}
                              disabled={!unlocked}
                              className={`w-full rounded-xl font-semibold ${
                                !unlocked
                                  ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed hover:bg-gray-300'
                                  : completed
                                  ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                                  : 'bg-green-600 hover:bg-green-700 text-white'
                              }`}
                            >
                              {!unlocked ? (
                                <><Lock className="w-4 h-4 mr-2" />Locked</>
                              ) : completed ? (
                                <><Trophy className="w-4 h-4 mr-2" />Review Lesson</>
                              ) : (
                                isTheory
                                  ? <><BookOpen className="w-4 h-4 mr-2" />Start Lesson</>
                                  : <><FlaskConical className="w-4 h-4 mr-2" />Start Lab</>
                              )}
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
