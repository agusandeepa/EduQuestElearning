import { useState } from "react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { motion } from "motion/react";
import { 
  ArrowLeft, 
  ArrowRight,
  BookOpen, 
  CheckCircle2, 
  Star, 
  Trophy,
  Volume2,
  Bookmark,
  Share2,
  Languages
} from "lucide-react";
import { getLessonById, updateProgress, isLessonUnlocked, getLessons } from "../../services/localStorage";
import { SINHALA_LESSONS } from "../../services/sinhala-lessons";
import { ENGLISH_LESSONS } from "../../services/english-lessons";
import type { Lesson } from "../../services/types";
import { toast } from "sonner";
import { LessonVideoPlayer } from "./lesson-video-player";
import { LessonAnimatedPlayer } from "./lesson-animated-player";
import { useLanguage } from "../../contexts/LanguageContext";
import { notificationService } from "../../services/notificationService";

interface SriLankanLessonViewProps {
  lessonId: number;
  onBack: () => void;
  onComplete?: (score: number) => void;
  onNextLesson?: (nextLessonId: number) => void;
}

export function SriLankanLessonView({ lessonId, onBack, onComplete, onNextLesson }: SriLankanLessonViewProps) {
  const { language } = useLanguage();
  const [currentStep, setCurrentStep] = useState<"content" | "quiz">("content");
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);

  const lesson = getLessonById(lessonId);

  // Get the opposite-language version of this lesson for the translate button
  const translatedLesson = language === 'en'
    ? SINHALA_LESSONS.find(l => l.id === lessonId)
    : ENGLISH_LESSONS.find(l => l.id === lessonId);

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {language === 'en' ? 'Lesson not found' : 'පාඩම හමු වුණේ නැත'}
          </h2>
          <Button onClick={onBack}>
            {language === 'en' ? 'Go Back' : 'ආපසු යන්න'}
          </Button>
        </div>
      </div>
    );
  }

  const handleQuizSubmit = () => {
    let correctCount = 0;
    lesson.quiz.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correct_answer) {
        correctCount++;
      }
    });
    
    const finalScore = Math.round((correctCount / lesson.quiz.questions.length) * 100);
    setScore(finalScore);
    setShowResults(true);
    
    // Save progress
    updateProgress(lessonId, finalScore >= 70, finalScore);
    
    // Update last activity and streak (only if passing score)
    if (finalScore >= 70) {
      notificationService.updateLastActivity();
    }
    
    // Show toast notification when lesson is completed and next lesson is unlocked
    if (finalScore >= 70) {
      const nextLessonId = lessonId + 1;
      const allLessons = getLessons();
      const nextLesson = allLessons.find(l => l.id === nextLessonId);
      
      if (nextLesson && isLessonUnlocked(nextLessonId)) {
        toast.success(language === 'en' ? '🎉 New Lesson Unlocked!' : '🎉 නව පාඩමක් අනලොක් විය!', {
          description: language === 'en' 
            ? `You can now access "${nextLesson.title}"`
            : `ඔබට දැන් "${nextLesson.title}" ප්‍රවේශ විය හැක`,
          duration: 5000,
        });
      }
    }
    
    if (onComplete) {
      onComplete(finalScore);
    }
  };

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answerIndex,
    });
  };

  const handleNextLesson = () => {
    const nextLessonId = lessonId + 1;
    if (isLessonUnlocked(nextLessonId) && onNextLesson) {
      onNextLesson(nextLessonId);
    }
  };

  const progress = currentStep === "content" ? 0 : 50;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">
                {language === 'en' ? 'Back' : 'ආපසු'}
              </span>
            </button>
            
            <div className="flex items-center gap-4">
              <div className="hidden md:block">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <BookOpen className="w-4 h-4" />
                  <span>
                    {language === 'en' ? 'Lesson' : 'පාඩම'} {lessonId}
                  </span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Bookmark className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Share2 className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {currentStep === "content" ? (
          // Lesson Content
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            {/* Lesson Header */}
            <div className="bg-gradient-to-r from-green-600 to-blue-600 p-8 text-white">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">
                  {language === 'en' ? 'Level' : 'මට්ටම'} {lesson.level}
                </span>
                <span className="bg-yellow-400/20 px-3 py-1 rounded-full text-sm font-semibold">
                  {lesson.xp_reward} XP
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold mb-3">{lesson.title}</h1>
              <p className="text-green-100 text-lg">{lesson.description}</p>
            </div>

            {/* Animated Player */}
            {lesson.content.animated_id && (
              <div className="p-6 pb-0">
                <LessonAnimatedPlayer
                  animatedId={lesson.content.animated_id}
                  title={lesson.content.video_title || lesson.title}
                />
              </div>
            )}

            {/* Video Player */}
            {lesson.content.video_url && (
              <div className="p-6">
                <LessonVideoPlayer
                  videoUrl={lesson.content.video_url}
                  title={lesson.content.video_title || lesson.title}
                  description={lesson.content.video_description}
                />
              </div>
            )}

            {/* Lesson Image — only show if no animated player */}
            {lesson.content.image_url && !lesson.content.animated_id && (
              <div className="px-6">
                <img 
                  src={lesson.content.image_url} 
                  alt={lesson.title}
                  className="w-full h-64 object-cover rounded-xl"
                />
              </div>
            )}

            {/* Lesson Text Content */}
            <div className="p-8">
              <div className="prose prose-lg max-w-none">
                <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                  {lesson.content.text}
                </div>
              </div>

              {/* Translate Button */}
              <div className="mt-6 flex justify-start">
                {translatedLesson && (
                  <Button
                    onClick={() => setShowTranslation(!showTranslation)}
                    variant="outline"
                    className="flex items-center gap-2 border-2 border-purple-300 text-purple-700 hover:bg-purple-50 hover:border-purple-500 font-semibold rounded-xl px-5 py-2 transition-all"
                  >
                    <Languages className="w-4 h-4" />
                    {showTranslation
                      ? (language === 'en' ? 'Hide Sinhala' : 'සිංහල සඟවන්න')
                      : (language === 'en' ? 'සිංහලෙන් බලන්න 🇱🇰' : 'View in English 🇬🇧')}
                  </Button>
                )}
              </div>

              {/* Translated Content */}
              {showTranslation && translatedLesson && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-6 bg-purple-50 border-2 border-purple-200 rounded-xl"
                >
                  <div className="flex items-center gap-2 mb-3 text-purple-700 font-semibold text-sm">
                    <Languages className="w-4 h-4" />
                    {language === 'en' ? 'සිංහල පරිවර්තනය' : 'English Version'}
                  </div>
                  <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                    {translatedLesson.content.text}
                  </div>
                </motion.div>
              )}

              {/* Action Button */}
              <div className="mt-8 flex justify-center">
                <Button
                  onClick={() => setCurrentStep("quiz")}
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-6 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  {language === 'en' ? 'Start Quiz' : 'ප්‍රශ්නාවලිය ආරම්භ කරන්න'}
                  <ArrowRight className="w-6 h-6 ml-2" />
                </Button>
              </div>
            </div>
          </motion.div>
        ) : !showResults ? (
          // Quiz Section
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
              {language === 'en' ? 'Quiz Time!' : 'ප්‍රශ්නාවලි කාලය!'}
            </h2>
            
            <div className="space-y-8">
              {lesson.quiz.questions.map((question, qIndex) => (
                <div key={question.id} className="border-b pb-6 last:border-b-0">
                  <h3 className="font-bold text-lg text-gray-900 mb-4">
                    {qIndex + 1}. {question.question}
                  </h3>
                  
                  <div className="space-y-3">
                    {question.options.map((option, optIndex) => (
                      <button
                        key={optIndex}
                        onClick={() => handleAnswerSelect(question.id, optIndex)}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                          selectedAnswers[question.id] === optIndex
                            ? "border-green-600 bg-green-50"
                            : "border-gray-200 hover:border-green-300 hover:bg-gray-50"
                        }`}
                      >
                        <span className="font-medium">{option}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <Button
                onClick={handleQuizSubmit}
                disabled={Object.keys(selectedAnswers).length !== lesson.quiz.questions.length}
                size="lg"
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-6 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
              >
                {language === 'en' ? 'Submit Quiz' : 'ප්‍රශ්නාවලිය ඉදිරිපත් කරන්න'}
              </Button>
            </div>
          </motion.div>
        ) : (
          // Results Section
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-lg p-8 text-center"
          >
            <div className="mb-6">
              {score >= 70 ? (
                <Trophy className="w-24 h-24 text-yellow-500 mx-auto mb-4" />
              ) : (
                <CheckCircle2 className="w-24 h-24 text-blue-500 mx-auto mb-4" />
              )}
            </div>

            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
              {score >= 70 
                ? (language === 'en' ? '🎉 Congratulations!' : '🎉 සුභ පැතුම්!')
                : (language === 'en' ? 'Keep Practicing!' : 'දිගටම පුහුණු වන්න!')}
            </h2>
            
            <div className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 mb-4">
              {score}%
            </div>

            <p className="text-gray-600 mb-8">
              {score >= 70 
                ? (language === 'en' 
                    ? `You've earned ${lesson.xp_reward} XP!` 
                    : `ඔබ ${lesson.xp_reward} XP උපයා ගත්තා!`)
                : (language === 'en'
                    ? 'You need 70% to pass. Try again!'
                    : 'සමත් වීමට 70% අවශ්‍යයි. නැවත උත්සාහ කරන්න!')}
            </p>

            <div className="flex gap-4 justify-center">
              <Button
                onClick={onBack}
                variant="outline"
                size="lg"
                className="px-8"
              >
                {language === 'en' ? 'Back to Lessons' : 'පාඩම් වෙත ආපසු'}
              </Button>
              
              {score >= 70 && isLessonUnlocked(lessonId + 1) && (
                <Button
                  onClick={handleNextLesson}
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8"
                >
                  {language === 'en' ? 'Next Lesson' : 'ඊළඟ පාඩම'}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}