import { useState } from "react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  FlaskConical,
  CheckCircle2,
  Star,
  Trophy,
  BookOpen,
  Microscope,
} from "lucide-react";
import { getScienceLessonById, updateScienceProgress, isScienceLessonUnlocked, getScienceLessons } from "../../services/localStorage";
import { VIRTUAL_LABS } from "../../services/science-lessons";
import { VirtualLab } from "./virtual-lab";
import { toast } from "sonner";

interface ScienceLessonViewProps {
  lessonId: number;
  onBack: () => void;
  onComplete?: (score: number) => void;
  onNextLesson?: (nextLessonId: number) => void;
}

export function ScienceLessonView({ lessonId, onBack, onComplete, onNextLesson }: ScienceLessonViewProps) {
  const [currentStep, setCurrentStep] = useState<"content" | "quiz">("content");
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [showLab, setShowLab] = useState(false);

  const lesson = getScienceLessonById(lessonId);
  const hasLab = !!VIRTUAL_LABS[lessonId];

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Lesson not found</h2>
          <Button onClick={onBack}>Go Back</Button>
        </div>
      </div>
    );
  }

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    if (showResults) return;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  };

  const handleSubmitQuiz = () => {
    const questions = lesson.quiz.questions;
    const correctAnswers = questions.filter(q => selectedAnswers[q.id] === q.correct_answer).length;
    const calculatedScore = Math.round((correctAnswers / questions.length) * 100);
    setScore(calculatedScore);
    setShowResults(true);

    const passed = calculatedScore >= 70;
    updateScienceProgress(lessonId, passed, calculatedScore);

    if (passed) {
      toast.success(`🎉 Excellent! You scored ${calculatedScore}%! +${lesson.xp_reward} XP earned!`);
      onComplete?.(calculatedScore);
    } else {
      toast.error(`You scored ${calculatedScore}%. You need 70% to pass. Try again!`);
    }
  };

  const handleNextLesson = () => {
    const allLessons = getScienceLessons();
    const sortedIds = allLessons.map(l => l.id).sort((a, b) => a - b);
    const currentIndex = sortedIds.indexOf(lessonId);
    if (currentIndex < sortedIds.length - 1) {
      const nextId = sortedIds[currentIndex + 1];
      if (isScienceLessonUnlocked(nextId)) {
        onNextLesson?.(nextId);
        setCurrentStep("content");
        setSelectedAnswers({});
        setShowResults(false);
        setScore(0);
      } else {
        toast.info("Complete this lesson with 70%+ to unlock the next one!");
      }
    }
  };

  const allAnswered = lesson.quiz.questions.every(q => selectedAnswers[q.id] !== undefined);
  const passed = score >= 70;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Virtual Lab Modal */}
      <AnimatePresence>
        {showLab && <VirtualLab lessonId={lessonId} onClose={() => setShowLab(false)} />}
      </AnimatePresence>

      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Science
            </Button>
            <div className="flex items-center gap-2">
              <div className="bg-green-100 p-2 rounded-full">
                <FlaskConical className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Science O/L</p>
                <p className="text-sm font-bold text-gray-900 line-clamp-1">{lesson.title}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {hasLab && (
                <Button
                  onClick={() => setShowLab(true)}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs gap-1.5 px-3 py-1.5 h-auto rounded-full"
                >
                  <Microscope className="w-3.5 h-3.5" />
                  Virtual Lab
                </Button>
              )}
              <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-bold text-yellow-700">{lesson.xp_reward} XP</span>
              </div>
            </div>
          </div>

          {/* Step Progress */}
          <div className="flex items-center gap-4 mt-3">
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${currentStep === "content" ? "bg-green-600 text-white" : "bg-green-100 text-green-700"}`}>
              <BookOpen className="w-3 h-3" />
              Learn
            </div>
            <div className="h-px flex-1 bg-gray-200" />
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${currentStep === "quiz" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-500"}`}>
              <CheckCircle2 className="w-3 h-3" />
              Quiz
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {currentStep === "content" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6">
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">{lesson.title}</h1>
              <p className="text-gray-600 mb-6">{lesson.description}</p>

              {/* Virtual Lab CTA inside content */}
              {hasLab && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6 flex items-center gap-4">
                  <div className="bg-emerald-100 p-3 rounded-xl">
                    <Microscope className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-emerald-800 text-sm">Virtual Lab Available! 🔬</p>
                    <p className="text-emerald-700 text-xs">This lesson has an interactive virtual practical experiment.</p>
                  </div>
                  <Button
                    onClick={() => setShowLab(true)}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm"
                  >
                    Open Lab
                  </Button>
                </div>
              )}

              <div className="bg-gray-50 rounded-xl p-6">
                <pre className="whitespace-pre-wrap font-sans text-gray-800 text-sm md:text-base leading-relaxed">
                  {lesson.content.text}
                </pre>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {hasLab && (
                <Button
                  onClick={() => setShowLab(true)}
                  variant="outline"
                  className="border-emerald-400 text-emerald-700 hover:bg-emerald-50 gap-2"
                >
                  <Microscope className="w-4 h-4" />
                  Try Virtual Lab
                </Button>
              )}
              <Button
                onClick={() => setCurrentStep("quiz")}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl text-lg font-semibold"
              >
                Take the Quiz
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>
        )}

        {currentStep === "quiz" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Quiz Progress */}
            <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Quiz Progress</span>
                <span>{Object.keys(selectedAnswers).length}/{lesson.quiz.questions.length} answered</span>
              </div>
              <Progress value={(Object.keys(selectedAnswers).length / lesson.quiz.questions.length) * 100} className="h-2" />
            </div>

            {/* Score Banner */}
            {showResults && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`rounded-2xl p-6 mb-6 text-center shadow-lg ${passed ? 'bg-green-50 border-2 border-green-300' : 'bg-red-50 border-2 border-red-300'}`}
              >
                <div className={`text-5xl font-extrabold mb-2 ${passed ? 'text-green-600' : 'text-red-600'}`}>
                  {score}%
                </div>
                <p className={`text-lg font-semibold ${passed ? 'text-green-700' : 'text-red-700'}`}>
                  {passed ? `🎉 Excellent! You passed!` : `Keep studying! Need 70% to pass.`}
                </p>
                {passed && (
                  <div className="flex items-center justify-center gap-2 mt-3">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    <span className="text-yellow-700 font-bold">+{lesson.xp_reward} XP Earned!</span>
                  </div>
                )}
                {!passed && hasLab && (
                  <button
                    onClick={() => setShowLab(true)}
                    className="mt-3 text-sm text-emerald-600 hover:underline flex items-center gap-1 mx-auto"
                  >
                    <Microscope className="w-4 h-4" />
                    Try the Virtual Lab to understand better
                  </button>
                )}
              </motion.div>
            )}

            {/* Questions */}
            <div className="space-y-6">
              {lesson.quiz.questions.map((question, qIndex) => (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: qIndex * 0.05 }}
                  className="bg-white rounded-2xl shadow-lg p-6"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div className="bg-green-100 text-green-700 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                      {qIndex + 1}
                    </div>
                    <p className="text-gray-900 font-semibold text-base">{question.question}</p>
                  </div>

                  <div className="space-y-3 ml-11">
                    {question.options.map((option, optIndex) => {
                      const isSelected = selectedAnswers[question.id] === optIndex;
                      const isCorrect = question.correct_answer === optIndex;

                      let buttonClass = "w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ";
                      if (!showResults) {
                        buttonClass += isSelected
                          ? "border-green-500 bg-green-50 text-green-700"
                          : "border-gray-200 bg-white hover:border-green-300 hover:bg-green-50 text-gray-700";
                      } else {
                        if (isCorrect) buttonClass += "border-green-500 bg-green-50 text-green-700";
                        else if (isSelected && !isCorrect) buttonClass += "border-red-500 bg-red-50 text-red-700";
                        else buttonClass += "border-gray-200 bg-white text-gray-500";
                      }

                      return (
                        <button
                          key={optIndex}
                          onClick={() => handleAnswerSelect(question.id, optIndex)}
                          className={buttonClass}
                        >
                          <span className="font-bold mr-2">{String.fromCharCode(65 + optIndex)}.</span>
                          {option}
                          {showResults && isCorrect && <span className="ml-2 text-green-600">✓</span>}
                          {showResults && isSelected && !isCorrect && <span className="ml-2 text-red-600">✗</span>}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              {!showResults ? (
                <>
                  <Button variant="outline" onClick={() => setCurrentStep("content")} className="px-6">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Review Lesson
                  </Button>
                  <Button
                    onClick={handleSubmitQuiz}
                    disabled={!allAnswered}
                    className="bg-green-600 hover:bg-green-700 text-white px-8 rounded-xl font-semibold"
                  >
                    Submit Quiz
                    <CheckCircle2 className="w-4 h-4 ml-2" />
                  </Button>
                </>
              ) : (
                <>
                  {!passed && (
                    <Button
                      onClick={() => {
                        setSelectedAnswers({});
                        setShowResults(false);
                        setScore(0);
                        setCurrentStep("content");
                      }}
                      variant="outline"
                      className="px-6"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Try Again
                    </Button>
                  )}
                  {passed && (
                    <Button
                      onClick={handleNextLesson}
                      className="bg-green-600 hover:bg-green-700 text-white px-8 rounded-xl font-semibold"
                    >
                      Next Lesson
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
