import { useState } from "react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, CheckCircle2, XCircle, Trophy, Star } from "lucide-react";

interface Lesson {
  id: number;
  title: string;
  type: "video" | "quiz";
  completed: boolean;
  locked: boolean;
  xp: number;
}

interface QuizLessonProps {
  lesson: Lesson;
  onComplete: (xp: number) => void;
  onBack: () => void;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const quizQuestions: Question[] = [
  {
    id: 1,
    question: "What is the largest pyramid in Egypt?",
    options: [
      "The Pyramid of Khafre",
      "The Great Pyramid of Giza (Khufu)",
      "The Pyramid of Menkaure",
      "The Step Pyramid of Djoser"
    ],
    correctAnswer: 1,
    explanation: "The Great Pyramid of Giza, built for Pharaoh Khufu, is the largest pyramid in Egypt and was the tallest man-made structure for over 3,800 years!"
  },
  {
    id: 2,
    question: "How many blocks were used to build the Great Pyramid?",
    options: [
      "About 500,000 blocks",
      "About 1 million blocks",
      "About 2.3 million blocks",
      "About 5 million blocks"
    ],
    correctAnswer: 2,
    explanation: "The Great Pyramid was constructed using approximately 2.3 million stone blocks, each weighing between 2.5 to 15 tons!"
  },
  {
    id: 3,
    question: "What was the primary purpose of the pyramids?",
    options: [
      "Astronomical observatories",
      "Grain storage facilities",
      "Tombs for pharaohs",
      "Military fortresses"
    ],
    correctAnswer: 2,
    explanation: "The pyramids were built as elaborate tombs for pharaohs, designed to protect their bodies and treasures for the afterlife."
  },
  {
    id: 4,
    question: "How long did it take to build the Great Pyramid?",
    options: [
      "About 10 years",
      "About 20 years",
      "About 50 years",
      "About 100 years"
    ],
    correctAnswer: 1,
    explanation: "It's estimated that the Great Pyramid took approximately 20 years to complete, with tens of thousands of workers involved in its construction."
  },
];

export function QuizLesson({ lesson, onComplete, onBack }: QuizLessonProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
  const isCorrect = selectedAnswer === question.correctAnswer;

  const handleAnswerSelect = (index: number) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(index);
      setShowExplanation(true);
      if (index === question.correctAnswer) {
        setCorrectAnswers(correctAnswers + 1);
      }
    }
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizComplete(true);
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setCorrectAnswers(0);
    setQuizComplete(false);
  };

  const scorePercentage = (correctAnswers / quizQuestions.length) * 100;
  const earnedXP = Math.round((scorePercentage / 100) * lesson.xp);

  if (quizComplete) {
    const passed = scorePercentage >= 70;

    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full"
        >
          <div className={`rounded-3xl p-8 md:p-12 text-center shadow-2xl ${
            passed
              ? "bg-gradient-to-br from-green-400 to-green-600"
              : "bg-gradient-to-br from-orange-400 to-red-500"
          }`}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              {passed ? (
                <Trophy className="w-24 h-24 text-white mx-auto mb-6" />
              ) : (
                <Star className="w-24 h-24 text-white mx-auto mb-6" />
              )}
            </motion.div>

            <h2 className="text-4xl font-extrabold text-white mb-4">
              {passed ? "Quiz Complete! 🎉" : "Keep Practicing!"}
            </h2>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-6">
              <div className="text-6xl font-extrabold text-white mb-2">
                {correctAnswers}/{quizQuestions.length}
              </div>
              <p className="text-xl text-white/90">
                {scorePercentage}% Score
              </p>
            </div>

            <p className="text-lg text-white/90 mb-8">
              {passed
                ? `Amazing work! You've earned ${earnedXP} XP`
                : "You need 70% to pass. Try again to earn full XP!"}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {passed ? (
                <Button
                  size="lg"
                  onClick={() => onComplete(earnedXP)}
                  className="bg-white text-green-600 hover:bg-gray-100 rounded-xl px-8"
                >
                  Continue
                  <CheckCircle2 className="w-5 h-5 ml-2" />
                </Button>
              ) : (
                <Button
                  size="lg"
                  onClick={handleRetry}
                  className="bg-white text-orange-600 hover:bg-gray-100 rounded-xl px-8"
                >
                  Try Again
                </Button>
              )}
              
              <Button
                size="lg"
                variant="outline"
                onClick={onBack}
                className="border-2 border-white text-white hover:bg-white/10 rounded-xl px-8"
              >
                Back to Lessons
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <Button
              variant="ghost"
              onClick={onBack}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Exit
            </Button>
            
            <div className="text-center">
              <h2 className="font-bold text-gray-900">{lesson.title}</h2>
              <p className="text-sm text-gray-600">
                Question {currentQuestion + 1} of {quizQuestions.length}
              </p>
            </div>

            <div className="w-20 text-right">
              <span className="font-bold text-green-600">{correctAnswers} ✓</span>
            </div>
          </div>
          
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Question Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-xl mb-8"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
                {question.question}
              </h3>

              <div className="space-y-4">
                {question.options.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const isCorrectAnswer = index === question.correctAnswer;
                  const showResult = showExplanation;

                  let buttonClass = "bg-gray-50 hover:bg-gray-100 border-2 border-gray-200";
                  
                  if (showResult) {
                    if (isCorrectAnswer) {
                      buttonClass = "bg-green-100 border-2 border-green-500";
                    } else if (isSelected && !isCorrectAnswer) {
                      buttonClass = "bg-red-100 border-2 border-red-500";
                    }
                  } else if (isSelected) {
                    buttonClass = "bg-blue-100 border-2 border-blue-500";
                  }

                  return (
                    <motion.button
                      key={index}
                      whileHover={!showResult ? { scale: 1.02 } : {}}
                      whileTap={!showResult ? { scale: 0.98 } : {}}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={showExplanation}
                      className={`w-full p-6 rounded-2xl text-left transition-all ${buttonClass} flex items-center justify-between group`}
                    >
                      <span className="font-medium text-gray-900 flex-1">
                        {option}
                      </span>
                      
                      {showResult && isCorrectAnswer && (
                        <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 ml-4" />
                      )}
                      {showResult && isSelected && !isCorrectAnswer && (
                        <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 ml-4" />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Explanation */}
          <AnimatePresence>
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`rounded-2xl p-6 mb-8 ${
                  isCorrect
                    ? "bg-green-50 border-2 border-green-200"
                    : "bg-orange-50 border-2 border-orange-200"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    {isCorrect ? (
                      <div className="bg-green-500 rounded-full p-2">
                        <CheckCircle2 className="w-6 h-6 text-white" />
                      </div>
                    ) : (
                      <div className="bg-orange-500 rounded-full p-2">
                        <XCircle className="w-6 h-6 text-white" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h4 className={`font-bold mb-2 ${
                      isCorrect ? "text-green-900" : "text-orange-900"
                    }`}>
                      {isCorrect ? "Correct! 🎉" : "Not quite right"}
                    </h4>
                    <p className="text-gray-700">{question.explanation}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Next Button */}
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Button
                size="lg"
                onClick={handleNext}
                className="w-full bg-green-600 hover:bg-green-700 text-white rounded-2xl py-6 text-lg"
              >
                {currentQuestion < quizQuestions.length - 1 ? "Next Question" : "See Results"}
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
