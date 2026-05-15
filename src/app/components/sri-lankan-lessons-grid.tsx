import { useMemo, useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { BookOpen, Lock, CheckCircle2, Star, Trophy, ArrowLeft, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { getLessons, getProgress } from "../../services/localStorage";
import { useAuth } from "../../hooks/useAuth";
import { useLanguage } from "../../contexts/LanguageContext";
import type { Lesson } from "../../services/types";


interface SriLankanLessonsGridProps {
  onLessonClick: (lessonId: number) => void;
  onBack?: () => void;
  onRoleplayClick?: () => void;
}

export function SriLankanLessonsGrid({ onLessonClick, onBack, onRoleplayClick }: SriLankanLessonsGridProps) {
  const { user } = useAuth();
  const { language } = useLanguage();
  const lessons = getLessons();
  const [progressData, setProgressData] = useState(getProgress());
  const nextLessonRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setProgressData(getProgress());
  }, [user?.id]);

  // Calculate next lesson to do from progressData state (user-aware)
  const autoOpenNextLesson = useMemo(() => {
    const next = lessons.find(l => {
      const p = progressData.find(pr => pr.lesson_id === l.id);
      return !p || !p.completed;
    });
    return next ? next.id : null;
  }, [progressData, lessons]);

  // Scroll to next lesson when progress loads
  useEffect(() => {
    if (autoOpenNextLesson && nextLessonRef.current) {
      setTimeout(() => {
        nextLessonRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 400);
    }
  }, [autoOpenNextLesson]);

  // Get lesson progress
  const getLessonStatus = (lessonId: number) => {
    const progress = progressData.find(p => p.lesson_id === lessonId);
    return {
      completed: progress?.completed || false,
      score: progress?.score || 0,
    };
  };

  // Check unlock using local progressData state (user-aware)
  const isLessonUnlocked = (lessonId: number): boolean => {
    if (lessonId === 1) return true;
    const prev = progressData.find(p => p.lesson_id === lessonId - 1);
    return prev ? prev.completed && prev.score >= 70 : false;
  };

  // Group lessons by level (unit)
  const lessonsByUnit = useMemo(() => {
    const units: { [key: number]: Lesson[] } = {};
    lessons.forEach(lesson => {
      if (!units[lesson.level]) {
        units[lesson.level] = [];
      }
      units[lesson.level].push(lesson);
    });
    return units;
  }, [lessons]);

  const unitNames: { [key: number]: { name: string; nameSi: string; color: string; gradient: string } } = {
    1: { 
      name: "Early Sri Lanka (543 BC – 437 BC)", 
      nameSi: "ශ්‍රී ලංකාවේ ආරම්භය (ක්‍රි.පූ. 543 – 437)",
      color: "bg-yellow-500",
      gradient: "from-yellow-400 to-orange-500"
    },
    2: { 
      name: "World Civilizations", 
      nameSi: "ලෝක ශිෂ්ටාචාර",
      color: "bg-teal-500",
      gradient: "from-teal-400 to-cyan-500"
    },
    3: { 
      name: "Buddhist Era & Medieval Sri Lanka (247 BC – 1412 AD)", 
      nameSi: "බෞද්ධ යුගය සහ මධ්‍යකාලීන ශ්‍රී ලංකාව",
      color: "bg-blue-500",
      gradient: "from-blue-400 to-blue-600"
    },
    4: { 
      name: "Colonial Period (1505 – 1948)", 
      nameSi: "යටත් විජිත යුගය (1505 – 1948)",
      color: "bg-pink-500",
      gradient: "from-pink-400 to-pink-600"
    },
    5: { 
      name: "Modern Sri Lanka (1948 – Present)", 
      nameSi: "නූතන ශ්‍රී ලංකාව (1948 – වර්තමානය)",
      color: "bg-purple-500",
      gradient: "from-purple-400 to-purple-600"
    },
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900" id="all-lessons">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        {onBack && (
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-orange-700 hover:bg-orange-50"
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
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
            All History Lessons
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Grade 10-11 O/L History Syllabus - From King Vijaya to 1948 Independence
          </p>
        </motion.div>


        {/* Lessons by Unit */}
        <div className="max-w-6xl mx-auto space-y-12">

          {/* Interactive Tools — Map & Roleplay */}
          {onRoleplayClick && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4"
            >
              <div className="mb-6">
                <div className="inline-block bg-gradient-to-r from-green-500 to-teal-500 px-6 py-3 rounded-full shadow-lg">
                  <h3 className="text-xl font-bold text-white">✨ Interactive Tools</h3>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* Historical Roleplay Card */}
                {onRoleplayClick && (
                  <div
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer group"
                    onClick={onRoleplayClick}
                  >
                    <div className="relative h-32 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center p-4">
                      <div className="absolute top-3 left-3 bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-md">
                        <span className="text-xs font-bold text-purple-700">AI Powered</span>
                      </div>
                      <MessageCircle className="w-14 h-14 text-white/80 group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="p-5">
                      <h4 className="text-lg font-bold text-gray-900 mb-2">Talk to Historical Figures</h4>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        Have a conversation with legendary Sri Lankan heroes and leaders using AI!
                      </p>
                      <div className="flex items-center gap-4 mb-4 text-sm">
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4 text-purple-500" />
                          <span className="font-semibold text-gray-700">AI Chat</span>
                        </div>
                      </div>
                      <Button
                        onClick={onRoleplayClick}
                        className="w-full rounded-xl font-semibold bg-purple-600 hover:bg-purple-700 text-white"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Start Roleplay
                      </Button>
                    </div>
                  </div>
                )}

              </div>
            </motion.div>
          )}
          {Object.entries(lessonsByUnit).map(([level, unitLessons]) => {
            const levelNum = parseInt(level);
            const unitInfo = unitNames[levelNum];
            
            return (
              <div key={level}>
                {/* Unit Header */}
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

                {/* Lesson Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {unitLessons.map((lesson, index) => {
                    const status = getLessonStatus(lesson.id);
                    const isUnlocked = isLessonUnlocked(lesson.id);
                    const isNextLesson = autoOpenNextLesson === lesson.id;
                    
                    return (
                      <motion.div
                        key={lesson.id}
                        ref={isNextLesson ? nextLessonRef : null}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all group ${
                          isUnlocked ? 'hover:shadow-xl' : 'opacity-75'
                        }`}>
                          {/* Card Header */}
                          <div className={`relative h-32 bg-gradient-to-br ${unitInfo.gradient} flex items-center justify-center p-4 ${
                            !isUnlocked ? 'opacity-50' : ''
                          }`}>
                            {/* Lesson Number */}
                            <div className="absolute top-3 left-3 bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm w-10 h-10 rounded-full flex items-center justify-center shadow-md">
                              <span className="text-lg font-bold text-gray-900">{lesson.id}</span>
                            </div>

                            {/* Lock Badge for Locked Lessons */}
                            {!isUnlocked && (
                              <div className="absolute top-3 right-3">
                                <div className="bg-gray-500 rounded-full p-1.5 shadow-lg">
                                  <Lock className="w-5 h-5 text-white" />
                                </div>
                              </div>
                            )}

                            {/* Completion Badge */}
                            {status.completed && isUnlocked && (
                              <div className="absolute top-3 right-3">
                                <div className="bg-green-500 rounded-full p-1.5 shadow-lg">
                                  <CheckCircle2 className="w-5 h-5 text-white" />
                                </div>
                              </div>
                            )}

                            {/* Book Icon */}
                            {isUnlocked ? (
                              <BookOpen className="w-12 h-12 text-white/80" />
                            ) : (
                              <Lock className="w-12 h-12 text-white/80" />
                            )}
                          </div>

                          {/* Card Content */}
                          <div className="p-5">
                            {/* Title */}
                            <h4 className={`text-lg font-bold mb-2 line-clamp-2 min-h-[3.5rem] ${
                              isUnlocked ? 'text-gray-900' : 'text-gray-500'
                            }`}>
                              {lesson.title}
                            </h4>

                            {/* Description */}
                            <p className={`text-sm mb-4 line-clamp-2 min-h-[2.5rem] ${
                              isUnlocked ? 'text-gray-600' : 'text-gray-400'
                            }`}>
                              {isUnlocked ? lesson.description : 'Complete the previous lesson to unlock'}
                            </p>

                            {/* Stats */}
                            <div className="flex items-center gap-4 mb-4 text-sm">
                              <div className="flex items-center gap-1">
                                <Star className={`w-4 h-4 ${isUnlocked ? 'text-yellow-500' : 'text-gray-400'}`} />
                                <span className={`font-semibold ${isUnlocked ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500'}`}>
                                  {lesson.xp_reward} XP
                                </span>
                              </div>
                              
                              {status.completed && isUnlocked && (
                                <Badge variant="secondary" className="bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 hover:bg-green-100">
                                  <Trophy className="w-3 h-3 mr-1" />
                                  {status.score}%
                                </Badge>
                              )}
                            </div>

                            {/* Action Button */}
                            <Button
                              onClick={() => isUnlocked && onLessonClick(lesson.id)}
                              disabled={!isUnlocked}
                              className={`w-full rounded-xl font-semibold ${
                                !isUnlocked
                                  ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed hover:bg-gray-300'
                                  : status.completed
                                  ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                                  : 'bg-green-600 hover:bg-green-700 text-white'
                              }`}
                            >
                              {!isUnlocked ? (
                                <>
                                  <Lock className="w-4 h-4 mr-2" />
                                  Locked
                                </>
                              ) : status.completed ? (
                                <>
                                  <Trophy className="w-4 h-4 mr-2" />
                                  Review Lesson
                                </>
                              ) : (
                                <>
                                  <BookOpen className="w-4 h-4 mr-2" />
                                  Start Lesson
                                </>
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
              <BookOpen className="w-5 h-5 text-blue-600" />
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