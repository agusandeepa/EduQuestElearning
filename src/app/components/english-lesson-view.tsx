import { useState } from "react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Languages,
  CheckCircle2,
  Star,
  Trophy,
  BookOpen,
} from "lucide-react";
import {
  getEnglishLessonById,
  updateEnglishProgress,
  isEnglishLessonUnlocked,
  getEnglishLessons,
} from "../../services/localStorage";
import { toast } from "sonner";

interface EnglishLessonViewProps {
  lessonId: number;
  onBack: () => void;
  onComplete?: (score: number) => void;
  onNextLesson?: (nextLessonId: number) => void;
}

export function EnglishLessonView({ lessonId, onBack, onComplete, onNextLesson }: EnglishLessonViewProps) {
  const [currentStep, setCurrentStep] = useState<"content" | "quiz">("content");
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const lesson = getEnglishLessonById(lessonId);

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
    const correctCount = questions.filter(q => selectedAnswers[q.id] === q.correct_answer).length;
    const calculatedScore = Math.round((correctCount / questions.length) * 100);
    setScore(calculatedScore);
    setShowResults(true);

    const passed = calculatedScore >= 70;
    updateEnglishProgress(lessonId, passed, calculatedScore);

    if (passed) {
      toast.success(`🎉 Well done! You scored ${calculatedScore}%! +${lesson.xp_reward} XP earned!`);
      onComplete?.(calculatedScore);
    } else {
      toast.error(`You scored ${calculatedScore}%. You need 70% to pass. Try again!`);
    }
  };

  const handleNextLesson = () => {
    const allLessons = getEnglishLessons();
    const sortedIds = allLessons.map(l => l.id).sort((a, b) => a - b);
    const currentIndex = sortedIds.indexOf(lessonId);
    if (currentIndex < sortedIds.length - 1) {
      const nextId = sortedIds[currentIndex + 1];
      if (isEnglishLessonUnlocked(nextId)) {
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to English
            </Button>
            <div className="flex items-center gap-2">
              <div className="bg-blue-100 p-2 rounded-full">
                <Languages className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">English O/L</p>
                <p className="text-sm font-bold text-gray-900 line-clamp-1">{lesson.title}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-bold text-yellow-700">{lesson.xp_reward} XP</span>
            </div>
          </div>

          {/* Step tabs */}
          <div className="flex items-center gap-4 mt-3">
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${currentStep === "content" ? "bg-blue-600 text-white" : "bg-green-100 text-green-700"}`}>
              <BookOpen className="w-3 h-3" />
              Learn
            </div>
            <div className="h-px flex-1 bg-gray-200" />
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${currentStep === "quiz" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-500"}`}>
              <CheckCircle2 className="w-3 h-3" />
              Quiz
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">

        {/* CONTENT STEP */}
        {currentStep === "content" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6">
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">{lesson.title}</h1>
              <p className="text-gray-600 mb-6">{lesson.description}</p>
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                <pre className="whitespace-pre-wrap font-sans text-gray-800 text-sm md:text-base leading-relaxed">
                  {lesson.content.text}
                </pre>
              </div>
            </div>
            <div className="text-center">
              <Button
                onClick={() => setCurrentStep("quiz")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl text-lg font-semibold"
              >
                Take the Quiz
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>
        )}

        {/* QUIZ STEP */}
        {currentStep === "quiz" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Progress bar */}
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
                className={`rounded-2xl p-6 mb-6 text-center shadow-lg ${passed ? "bg-green-50 border-2 border-green-300" : "bg-red-50 border-2 border-red-300"}`}
              >
                <div className={`text-5xl font-extrabold mb-2 ${passed ? "text-green-600" : "text-red-600"}`}>
                  {score}%
                </div>
                <p className={`text-lg font-semibold ${passed ? "text-green-700" : "text-red-700"}`}>
                  {passed ? "🎉 Excellent! You passed!" : "Keep practicing! Need 70% to pass."}
                </p>
                {passed && (
                  <div className="flex items-center justify-center gap-2 mt-3">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    <span className="text-yellow-700 font-bold">+{lesson.xp_reward} XP Earned!</span>
                  </div>
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
                    <div className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                      {qIndex + 1}
                    </div>
                    <p className="text-gray-900 font-semibold text-base">{question.question}</p>
                  </div>

                  <div className="space-y-3 ml-11">
                    {question.options.map((option, optIndex) => {
                      const isSelected = selectedAnswers[question.id] === optIndex;
                      const isCorrect = question.correct_answer === optIndex;

                      let cls = "w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ";
                      if (!showResults) {
                        cls += isSelected
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50 text-gray-700";
                      } else {
                        if (isCorrect) cls += "border-green-500 bg-green-50 text-green-700";
                        else if (isSelected && !isCorrect) cls += "border-red-500 bg-red-50 text-red-700";
                        else cls += "border-gray-200 bg-white text-gray-400";
                      }

                      return (
                        <button key={optIndex} onClick={() => handleAnswerSelect(question.id, optIndex)} className={cls}>
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
                    <ArrowLeft className="w-4 h-4 mr-2" />Review Lesson
                  </Button>
                  <Button
                    onClick={handleSubmitQuiz}
                    disabled={!allAnswered}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-xl font-semibold"
                  >
                    Submit Quiz <CheckCircle2 className="w-4 h-4 ml-2" />
                  </Button>
                </>
              ) : (
                <>
                  {!passed && (
                    <Button
                      variant="outline"
                      onClick={() => { setSelectedAnswers({}); setShowResults(false); setScore(0); setCurrentStep("content"); }}
                      className="px-6"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />Try Again
                    </Button>
                  )}
                  {passed && (
                    <Button
                      onClick={handleNextLesson}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-xl font-semibold"
                    >
                      Next Lesson <ArrowRight className="w-4 h-4 ml-2" />
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
