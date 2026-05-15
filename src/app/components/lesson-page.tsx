import { useState, useMemo, useEffect } from "react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { motion } from "motion/react";
import { Play, CheckCircle2, Lock, ArrowLeft, ArrowRight, Star, Trophy, BookOpen } from "lucide-react";
import { SriLankanLessonView } from "./sri-lankan-lesson-view";
import { getLessons, getProgress } from "../../services/localStorage";
import { useLanguage } from "../../contexts/LanguageContext";
import { useAuth } from "../../hooks/useAuth";

interface LessonPageProps {
  onBack: () => void;
}

export function LessonPage({ onBack }: LessonPageProps) {
  const { language } = useLanguage();
  const { user } = useAuth();
  const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null);
  
  const lessons = getLessons();
  const [progressData, setProgressData] = useState(getProgress());

  useEffect(() => {
    setProgressData(getProgress());
  }, [user?.id]);

  // Get lesson status
  const getLessonStatus = (lessonId: number) => {
    const progress = progressData.find(p => p.lesson_id === lessonId);
    return {
      completed: progress?.completed || false,
      score: progress?.score || 0,
    };
  };

  // Calculate total XP and completion
  const totalXP = useMemo(() => {
    return progressData.reduce((sum, p) => {
      if (p.completed) {
        const lesson = lessons.find(l => l.id === p.lesson_id);
        return sum + (lesson?.xp_reward || 0);
      }
      return sum;
    }, 0);
  }, [progressData, lessons]);

  const completedCount = progressData.filter(p => p.completed).length;
  const progressPercent = (completedCount / lessons.length) * 100;

  // If a lesson is selected, show the lesson view
  if (selectedLessonId !== null) {
    return (
      <SriLankanLessonView
        lessonId={selectedLessonId}
        onBack={() => setSelectedLessonId(null)}
        onComplete={() => setSelectedLessonId(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-orange-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={onBack}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Courses
            </Button>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="font-bold">{totalXP} XP</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-green-600" />
                <span className="font-bold">{completedCount}/{lessons.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Course Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            {language === 'en' ? 'Sri Lankan History' : 'ශ්‍රී ලංකා ඉතිහාසය'}
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            {language === 'en' 
              ? 'Grade 10-11 O/L History - From King Vijaya to 1948 Independence'
              : 'ශ්‍රේණිය 10-11 ඕ/සාමාන්‍ය පෙළ ඉතිහාසය - විජය රජුගේ ගොඩබෑමේ සිට 1948 නිදහස දක්වා'}
          </p>
          
          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>{language === 'en' ? 'Course Progress' : 'පාඨමාලා ප්‍රගතිය'}</span>
              <span className="font-bold">{Math.round(progressPercent)}%</span>
            </div>
            <Progress value={progressPercent} className="h-3" />
          </div>
        </motion.div>

        {/* Lesson Path */}
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gray-300" />

            {lessons.map((lesson, index) => {
              const status = getLessonStatus(lesson.id);
              const isLocked = index > 0 && !getLessonStatus(lessons[index - 1].id).completed;

              return (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative mb-6"
                >
                  {/* Lesson Node */}
                  <div className="flex items-center gap-4">
                    {/* Icon Circle */}
                    <div className="relative z-10 flex-shrink-0">
                      <motion.button
                        onClick={() => !isLocked && setSelectedLessonId(lesson.id)}
                        disabled={isLocked}
                        whileHover={!isLocked ? { scale: 1.1 } : {}}
                        whileTap={!isLocked ? { scale: 0.95 } : {}}
                        className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                          status.completed
                            ? "bg-green-500 shadow-lg shadow-green-200"
                            : isLocked
                            ? "bg-gray-300"
                            : "bg-yellow-400 shadow-lg shadow-yellow-200 hover:shadow-xl"
                        }`}
                      >
                        {status.completed ? (
                          <CheckCircle2 className="w-8 h-8 text-white" />
                        ) : isLocked ? (
                          <Lock className="w-8 h-8 text-gray-600" />
                        ) : (
                          <BookOpen className="w-8 h-8 text-white" />
                        )}
                      </motion.button>
                    </div>

                    {/* Lesson Card */}
                    <motion.div
                      whileHover={!isLocked ? { scale: 1.02 } : {}}
                      onClick={() => !isLocked && setSelectedLessonId(lesson.id)}
                      className={`flex-1 bg-white rounded-2xl p-6 shadow-md cursor-pointer transition-all ${
                        isLocked
                          ? "opacity-60 cursor-not-allowed"
                          : "hover:shadow-lg"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-bold text-gray-500 uppercase">
                              Lesson {lesson.id}
                            </span>
                            {status.completed && (
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-bold">
                                Completed · {status.score}%
                              </span>
                            )}
                          </div>
                          <h3 className="text-lg font-bold text-gray-900 mb-1">
                            {lesson.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2 line-clamp-1">
                            {lesson.description}
                          </p>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span>{lesson.xp_reward} XP</span>
                          </div>
                        </div>
                        
                        {!isLocked && (
                          <Button
                            className={`${
                              status.completed
                                ? "bg-yellow-500 hover:bg-yellow-600"
                                : "bg-green-600 hover:bg-green-700"
                            } text-white rounded-xl`}
                          >
                            {status.completed ? "Review" : "Start"}
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Completion Card */}
          {completedCount === lessons.length && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl p-8 text-center text-white shadow-2xl"
            >
              <Trophy className="w-16 h-16 mx-auto mb-4" />
              <h2 className="text-3xl font-extrabold mb-2">
                සියලු පාඩම් සම්පූර්ණයි!
              </h2>
              <h3 className="text-2xl font-bold mb-2">
                Unit Complete!
              </h3>
              <p className="text-lg mb-6">
                You've mastered Sri Lankan History! 🎉
              </p>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3 inline-block mb-6">
                <div className="flex items-center gap-2">
                  <Star className="w-6 h-6" />
                  <span className="font-bold text-xl">Total: {totalXP} XP</span>
                </div>
              </div>
              <br />
              <Button
                onClick={onBack}
                size="lg"
                className="bg-white text-orange-600 hover:bg-gray-100 rounded-xl"
              >
                Back to Home
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}