import { useState } from "react";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "motion/react";
import { 
  Loader2, 
  CheckCircle2, 
  XCircle, 
  Lightbulb, 
  TrendingUp, 
  TrendingDown,
  BookOpen,
  Sparkles
} from "lucide-react";
import { aiService, EssayGradingResult } from "../../services/aiService";
import { useLanguage } from "../../contexts/LanguageContext";

interface EssayQuestionProps {
  question: string;
  modelAnswer: string;
  topic: string;
  points: number;
  onComplete: (score: number, feedback: EssayGradingResult) => void;
}

export function EssayQuestion({ 
  question, 
  modelAnswer, 
  topic, 
  points,
  onComplete 
}: EssayQuestionProps) {
  const { language } = useLanguage();
  const [answer, setAnswer] = useState("");
  const [isGrading, setIsGrading] = useState(false);
  const [result, setResult] = useState<EssayGradingResult | null>(null);
  const [showModelAnswer, setShowModelAnswer] = useState(false);

  const content = language === 'en' ? {
    title: 'Essay Question',
    placeholder: 'Write your answer here... (Minimum 50 words recommended)',
    wordCount: 'Word Count',
    minWords: 'Recommended: 50-200 words',
    submit: 'Submit for AI Grading',
    grading: 'AI is grading your essay...',
    viewModel: 'View Model Answer',
    hideModel: 'Hide Model Answer',
    modelAnswer: 'Model Answer',
    yourAnswer: 'Your Answer',
    score: 'Score',
    grade: 'Grade',
    strengths: 'Strengths',
    weaknesses: 'Areas to Improve',
    suggestions: 'Suggestions',
    missingPoints: 'Missing Key Points',
    feedback: 'Detailed Feedback',
    historicalAccuracy: 'Historical Accuracy',
    grammar: 'Grammar & Structure',
    coherence: 'Coherence & Flow',
    tryAgain: 'Revise & Resubmit',
    continue: 'Continue to Next Question'
  } : {
    title: 'රචනා ප්‍රශ්නය',
    placeholder: 'ඔබේ පිළිතුර මෙහි ලියන්න... (අවම වශයෙන් වචන 50ක් නිර්දේශිතයි)',
    wordCount: 'වචන ගණන',
    minWords: 'නිර්දේශිත: වචන 50-200',
    submit: 'AI ශ්‍රේණිගත කිරීම සඳහා ඉදිරිපත් කරන්න',
    grading: 'AI ඔබේ රචනය ශ්‍රේණිගත කරමින්...',
    viewModel: 'ආදර්ශ පිළිතුර බලන්න',
    hideModel: 'ආදර්ශ පිළිතුර සඟවන්න',
    modelAnswer: 'ආදර්ශ පිළිතුර',
    yourAnswer: 'ඔබේ පිළිතුර',
    score: 'ලකුණු',
    grade: 'ශ්‍රේණිය',
    strengths: 'ශක්තිමත් කරුණු',
    weaknesses: 'වැඩිදියුණු කළ යුතු අංශ',
    suggestions: 'යෝජනා',
    missingPoints: 'මග හැරුණු ප්‍රධාන කරුණු',
    feedback: 'විස්තරාත්මක ප්‍රතිචාරය',
    historicalAccuracy: 'ඓතිහාසික නිරවද්‍යතාවය',
    grammar: 'ව්‍යාකරණ හා ව්‍යුහය',
    coherence: 'සමගිය හා ප්‍රවාහය',
    tryAgain: 'සංශෝධනය කර නැවත ඉදිරිපත් කරන්න',
    continue: 'මීළඟ ප්‍රශ්නයට යන්න'
  };

  const wordCount = answer.trim().split(/\s+/).filter(w => w.length > 0).length;
  const minWords = 20; // Minimum to submit

  const handleSubmit = async () => {
    if (wordCount < minWords) {
      alert(`Please write at least ${minWords} words.`);
      return;
    }

    setIsGrading(true);

    try {
      const gradingResult = await aiService.gradeEssay(
        answer,
        question,
        modelAnswer,
        topic
      );

      setResult(gradingResult);
      
      // Calculate score based on points available
      const earnedPoints = Math.round((gradingResult.score / 100) * points);
      onComplete(earnedPoints, gradingResult);
    } catch (error) {
      console.error('Essay grading error:', error);
      alert('Error grading essay. Please try again.');
    } finally {
      setIsGrading(false);
    }
  };

  const handleRevise = () => {
    setResult(null);
    // Keep the answer so they can revise it
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      {/* Question Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-3 mb-3">
          <BookOpen className="w-6 h-6" />
          <h3 className="text-xl font-bold">{content.title}</h3>
          <span className="ml-auto bg-white/20 px-3 py-1 rounded-full text-sm">
            {points} {language === 'en' ? 'Points' : 'ලකුණු'}
          </span>
        </div>
        <p className="text-lg leading-relaxed">{question}</p>
      </div>

      {/* Answer Input */}
      {!result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-2 border-gray-200"
        >
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {content.yourAnswer}
            </label>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder={content.placeholder}
              className="w-full h-64 p-4 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all resize-none"
              disabled={isGrading}
            />
          </div>

          {/* Word Count & Submit */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className={`text-sm font-semibold ${
                wordCount < minWords ? 'text-red-500' : 
                wordCount < 50 ? 'text-yellow-500' : 
                'text-green-500'
              }`}>
                {content.wordCount}: {wordCount}
              </span>
              <span className="text-xs text-gray-500">{content.minWords}</span>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={isGrading || wordCount < minWords}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg rounded-xl"
            >
              {isGrading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  {content.grading}
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  {content.submit}
                </>
              )}
            </Button>
          </div>

          {/* Model Answer Toggle */}
          <div className="mt-6 pt-6 border-t-2 border-gray-200">
            <Button
              onClick={() => setShowModelAnswer(!showModelAnswer)}
              variant="outline"
              className="w-full"
            >
              {showModelAnswer ? content.hideModel : content.viewModel}
            </Button>

            <AnimatePresence>
              {showModelAnswer && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 p-4 bg-blue-50 border-2 border-blue-200 rounded-xl"
                >
                  <h4 className="font-bold text-blue-900 mb-2">{content.modelAnswer}:</h4>
                  <p className="text-gray-700 leading-relaxed">{modelAnswer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}

      {/* Grading Results */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            {/* Score Card */}
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-3xl font-bold mb-2">{content.score}: {result.score}/100</h3>
                  <p className="text-xl">{content.grade}: {result.grade}</p>
                </div>
                <div className="text-6xl font-bold opacity-20">{result.grade}</div>
              </div>

              {/* Sub-scores */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <p className="text-sm opacity-80 mb-1">{content.historicalAccuracy}</p>
                  <p className="text-2xl font-bold">{result.historicalAccuracy}%</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <p className="text-sm opacity-80 mb-1">{content.grammar}</p>
                  <p className="text-2xl font-bold">{result.grammarScore}%</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <p className="text-sm opacity-80 mb-1">{content.coherence}</p>
                  <p className="text-2xl font-bold">{result.coherenceScore}%</p>
                </div>
              </div>
            </div>

            {/* Detailed Feedback */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-200">
              <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-500" />
                {content.feedback}
              </h4>
              <p className="text-gray-700 leading-relaxed">{result.feedback}</p>
            </div>

            {/* Strengths */}
            {result.strengths.length > 0 && (
              <div className="bg-green-50 rounded-2xl p-6 border-2 border-green-200">
                <h4 className="text-lg font-bold text-green-900 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  {content.strengths}
                </h4>
                <ul className="space-y-2">
                  {result.strengths.map((strength, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <TrendingUp className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Weaknesses */}
            {result.weaknesses.length > 0 && (
              <div className="bg-orange-50 rounded-2xl p-6 border-2 border-orange-200">
                <h4 className="text-lg font-bold text-orange-900 mb-3 flex items-center gap-2">
                  <TrendingDown className="w-5 h-5" />
                  {content.weaknesses}
                </h4>
                <ul className="space-y-2">
                  {result.weaknesses.map((weakness, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-orange-600 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{weakness}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Suggestions */}
            {result.suggestions.length > 0 && (
              <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
                <h4 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  {content.suggestions}
                </h4>
                <ul className="space-y-2">
                  {result.suggestions.map((suggestion, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold mt-1 flex-shrink-0">{i + 1}.</span>
                      <span className="text-gray-700">{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Missing Points */}
            {result.missingPoints.length > 0 && (
              <div className="bg-red-50 rounded-2xl p-6 border-2 border-red-200">
                <h4 className="text-lg font-bold text-red-900 mb-3 flex items-center gap-2">
                  <XCircle className="w-5 h-5" />
                  {content.missingPoints}
                </h4>
                <ul className="space-y-2">
                  {result.missingPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-red-600 font-bold mt-1 flex-shrink-0">•</span>
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Your Answer (for reference) */}
            <div className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-200">
              <h4 className="text-lg font-bold text-gray-900 mb-3">{content.yourAnswer}</h4>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{answer}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                onClick={handleRevise}
                variant="outline"
                className="flex-1 py-6 text-lg"
              >
                {content.tryAgain}
              </Button>
              <Button
                onClick={() => {/* Continue handled by parent */}}
                className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-6 text-lg"
              >
                {content.continue}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
