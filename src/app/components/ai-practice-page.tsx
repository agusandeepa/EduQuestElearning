import { useState } from "react";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, Sparkles, Brain, Target, Zap, CheckCircle2, XCircle } from "lucide-react";
import { AIQuestionGenerator, GeneratedQuestion } from "./ai-question-generator";
import { EssayQuestion } from "./essay-question";
import { useLanguage } from "../../contexts/LanguageContext";

interface AIPracticePageProps {
  onBack: () => void;
}

export function AIPracticePage({ onBack }: AIPracticePageProps) {
  const { language } = useLanguage();
  const [showGenerator, setShowGenerator] = useState(false);
  const [questions, setQuestions] = useState<GeneratedQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isQuizActive, setIsQuizActive] = useState(false);

  // Answer feedback state
  const [selectedAnswer, setSelectedAnswer] = useState<number | string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const content = language === 'en' ? {
    title: 'AI-Powered Practice',
    subtitle: 'Generate unlimited questions tailored to your needs',
    generate: 'Generate Questions',
    yourScore: 'Your Score',
    question: 'Question',
    nextQuestion: 'Next Question',
    finishQuiz: 'Finish Quiz',
    quizComplete: 'Quiz Complete!',
    finalScore: 'Final Score',
    tryAgain: 'Practice Again',
    backHome: 'Back to Home',
    correct: 'Correct!',
    wrong: 'Wrong!',
    explanation: 'Explanation',
    trueLabel: 'True',
    falseLabel: 'False',
    features: {
      unlimited: { title: 'Unlimited Questions', desc: 'AI generates fresh questions every time' },
      adaptive: { title: 'Adaptive Difficulty', desc: 'Questions match your skill level' },
      instant: { title: 'Instant Feedback', desc: 'Get detailed explanations immediately' },
      personalized: { title: 'Personalized Learning', desc: 'Focus on your weak areas automatically' },
    },
  } : {
    title: 'AI-බලගතු පුහුණුව',
    subtitle: 'ඔබේ අවශ්‍යතාවන්ට අනුකූලව අසීමිත ප්‍රශ්න උත්පාදනය කරන්න',
    generate: 'ප්‍රශ්න උත්පාදනය කරන්න',
    yourScore: 'ඔබේ ලකුණු',
    question: 'ප්‍රශ්නය',
    nextQuestion: 'මීළඟ ප්‍රශ්නය',
    finishQuiz: 'ප්‍රශ්නාවලිය අවසන් කරන්න',
    quizComplete: 'ප්‍රශ්නාවලිය සම්පූර්ණයි!',
    finalScore: 'අවසන් ලකුණු',
    tryAgain: 'නැවත පුහුණු වන්න',
    backHome: 'මුල් පිටුවට',
    correct: 'නිවැරදියි!',
    wrong: 'වැරදියි!',
    explanation: 'පැහැදිලි කිරීම',
    trueLabel: 'සත්‍ය',
    falseLabel: 'අසත්‍ය',
    features: {
      unlimited: { title: 'අසීමිත ප්‍රශ්න', desc: 'AI සෑම අවස්ථාවකම නව ප්‍රශ්න නිර්මාණය කරයි' },
      adaptive: { title: 'අනුකූලතා දුෂ්කරතාව', desc: 'ඔබේ කුශලතා මට්ටමට ප්‍රශ්න ගැලපේ' },
      instant: { title: 'ක්ෂණික ප්‍රතිචාරය', desc: 'වහාම විස්තරාත්මක පැහැදිලි කිරීම් ලබා ගන්න' },
      personalized: { title: 'පුද්ගලාරෝපිත ඉගෙනීම', desc: 'ස්වයංක්‍රීයව ඔබේ දුර්වල ක්ෂේත්‍ර කෙරෙහි අවධානය යොමු කරයි' },
    },
  };

  const handleQuestionsGenerated = (generatedQuestions: GeneratedQuestion[]) => {
    setQuestions(generatedQuestions);
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsQuizActive(true);
    setShowGenerator(false);
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  const handleAnswer = (chosen: number | string, correctAnswer: number | string, points: number) => {
    if (isAnswered) return;
    const correct = String(chosen).toLowerCase() === String(correctAnswer).toLowerCase()
      || chosen === correctAnswer;
    setSelectedAnswer(chosen);
    setIsAnswered(true);
    setIsCorrect(correct);
    if (correct) setScore(prev => prev + points);
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    setIsCorrect(false);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsQuizActive(false);
    }
  };

  const handleQuestionComplete = (earnedPoints: number) => {
    setScore(prev => prev + earnedPoints);
    setTimeout(() => handleNextQuestion(), 2000);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);
  const percentage = totalPoints > 0 ? Math.round((score / totalPoints) * 100) : 0;

  // Helper: get button style for MCQ/TF based on answer state
  const getOptionStyle = (optionValue: number | string) => {
    if (!isAnswered) {
      return "border-gray-300 hover:border-purple-500 hover:bg-purple-50";
    }
    const isThisSelected = String(optionValue).toLowerCase() === String(selectedAnswer).toLowerCase()
      || optionValue === selectedAnswer;
    const isThisCorrect = String(optionValue).toLowerCase() === String(currentQuestion.correctAnswer).toLowerCase()
      || optionValue === currentQuestion.correctAnswer;

    if (isThisCorrect) return "border-green-500 bg-green-50 text-green-800";
    if (isThisSelected && !isThisCorrect) return "border-red-500 bg-red-50 text-red-800";
    return "border-gray-200 dark:border-gray-700 opacity-50";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-gray-950 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 shadow-sm border-b dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium"
              >
                <ChevronLeft className="w-5 h-5" />
                {language === 'en' ? 'Back' : 'ආපසු'}
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-purple-500" />
                  {content.title}
                </h1>
                <p className="text-sm text-gray-600">{content.subtitle}</p>
              </div>
            </div>

            {isQuizActive && (
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm text-gray-600">{content.yourScore}</p>
                  <p className="text-2xl font-bold text-purple-600">{score}/{totalPoints}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">{content.question}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {currentQuestionIndex + 1}/{questions.length}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Landing State */}
        {!isQuizActive && questions.length === 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-4xl mx-auto">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", duration: 0.6 }} className="mb-8">
              <div className="inline-block p-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-6">
                <Brain className="w-16 h-16 text-white" />
              </div>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">{content.title}</h2>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">{content.subtitle}</p>
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {Object.entries(content.features).map(([key, feature], i) => (
                <motion.div key={key} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-700 dark:border-gray-700 hover:border-purple-400 transition-all">
                  <div className="bg-purple-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                    {key === 'unlimited' && <Zap className="w-6 h-6 text-purple-600" />}
                    {key === 'adaptive' && <Target className="w-6 h-6 text-purple-600" />}
                    {key === 'instant' && <Sparkles className="w-6 h-6 text-purple-600" />}
                    {key === 'personalized' && <Brain className="w-6 h-6 text-purple-600" />}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
            <Button onClick={() => setShowGenerator(true)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-8 text-xl rounded-2xl shadow-2xl">
              <Sparkles className="w-6 h-6 mr-3" />
              {content.generate}
            </Button>
          </motion.div>
        )}

        {/* Quiz Active State */}
        {isQuizActive && currentQuestion && (
          <div>
            {currentQuestion.type === 'essay' ? (
              <EssayQuestion
                question={currentQuestion.question}
                modelAnswer={currentQuestion.correctAnswer as string}
                topic={currentQuestion.topic}
                points={currentQuestion.points}
                onComplete={handleQuestionComplete}
              />
            ) : (
              <div className="max-w-4xl mx-auto">
                <AnimatePresence mode="wait">
                  <motion.div key={currentQuestionIndex} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-4">
                    <div className="mb-4">
                      <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                        {currentQuestion.difficulty.toUpperCase()} • {currentQuestion.points} pts
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-6">{currentQuestion.question}</h3>

                    {/* MCQ Options */}
                    {currentQuestion.type === 'mcq' && currentQuestion.options && (
                      <div className="space-y-3">
                        {currentQuestion.options.map((option, i) => (
                          <button key={i} disabled={isAnswered}
                            onClick={() => handleAnswer(i, currentQuestion.correctAnswer, currentQuestion.points)}
                            className={`w-full p-4 text-left rounded-xl border-2 transition-all font-medium ${getOptionStyle(i)}`}>
                            <span className="font-bold mr-3">{String.fromCharCode(65 + i)}.</span>
                            {option}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* True/False Options - Sinhala aware */}
                    {currentQuestion.type === 'true-false' && (
                      <div className="flex gap-4">
                        {[
                          { label: content.trueLabel, value: 'true' },
                          { label: content.falseLabel, value: 'false' },
                        ].map(({ label, value }) => (
                          <button key={value} disabled={isAnswered}
                            onClick={() => handleAnswer(value, currentQuestion.correctAnswer, currentQuestion.points)}
                            className={`flex-1 p-6 rounded-xl border-2 transition-all font-bold text-lg ${getOptionStyle(value)}`}>
                            {label}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Fill in the blank */}
                    {currentQuestion.type === 'fill-blank' && (
                      <FillBlankInput
                        correctAnswer={currentQuestion.correctAnswer as string}
                        points={currentQuestion.points}
                        onAnswer={(chosen) => handleAnswer(chosen, currentQuestion.correctAnswer, currentQuestion.points)}
                        isAnswered={isAnswered}
                        language={language}
                      />
                    )}

                    {/* Feedback Banner */}
                    <AnimatePresence>
                      {isAnswered && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                          className={`mt-5 p-4 rounded-xl flex items-start gap-3 ${isCorrect ? 'bg-green-50 border border-green-300' : 'bg-red-50 border border-red-300'}`}>
                          {isCorrect
                            ? <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
                            : <XCircle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />}
                          <div>
                            <p className={`font-bold text-base ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                              {isCorrect ? content.correct : content.wrong}
                            </p>
                            <p className="text-sm text-gray-700 mt-1">
                              <span className="font-semibold">{content.explanation}: </span>
                              {currentQuestion.explanation}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </AnimatePresence>

                {/* Next button - only shows after answering */}
                <AnimatePresence>
                  {isAnswered && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                      <Button onClick={handleNextQuestion}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-6 text-lg rounded-xl">
                        {currentQuestionIndex < questions.length - 1 ? content.nextQuestion : content.finishQuiz}
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        )}

        {/* Quiz Complete State */}
        {!isQuizActive && questions.length > 0 && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-2xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">{content.quizComplete}</h2>
              <div className="my-8">
                <div className="text-6xl font-extrabold text-purple-600 mb-2">{percentage}%</div>
                <p className="text-xl text-gray-600">{content.finalScore}: {score}/{totalPoints}</p>
              </div>
              <div className="flex gap-4">
                <Button onClick={() => { setQuestions([]); setShowGenerator(true); }}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-6 text-lg rounded-xl">
                  {content.tryAgain}
                </Button>
                <Button onClick={onBack} variant="outline" className="flex-1 py-6 text-lg">
                  {content.backHome}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {showGenerator && (
        <AIQuestionGenerator
          onQuestionsGenerated={handleQuestionsGenerated}
          onClose={() => setShowGenerator(false)}
        />
      )}
    </div>
  );
}

// ── Fill-in-the-blank sub-component ──────────────────────────────────────────
function FillBlankInput({
  correctAnswer,
  points,
  onAnswer,
  isAnswered,
  language,
}: {
  correctAnswer: string;
  points: number;
  onAnswer: (val: string) => void;
  isAnswered: boolean;
  language: string;
}) {
  const [value, setValue] = useState("");
  const placeholder = language === 'en' ? 'Type your answer here...' : 'ඔබේ පිළිතුර ටයිප් කරන්න...';
  const submitLabel = language === 'en' ? 'Submit Answer' : 'පිළිතුර ඉදිරිපත් කරන්න';

  return (
    <div className="space-y-3">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter' && value.trim() && !isAnswered) onAnswer(value.trim()); }}
        disabled={isAnswered}
        placeholder={placeholder}
        className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-purple-500 outline-none text-base"
      />
      {!isAnswered && (
        <button
          onClick={() => { if (value.trim()) onAnswer(value.trim()); }}
          disabled={!value.trim()}
          className="w-full p-4 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 disabled:opacity-40 transition-all"
        >
          {submitLabel}
        </button>
      )}
    </div>
  );
}
