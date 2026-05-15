// Quick Access Section - Navigate to new features
import { Trophy, Settings, Sparkles, Brain, TrendingUp, PenLine } from 'lucide-react';

interface QuickAccessProps {
  onAchievementsClick: () => void;
  onAdminClick: () => void;
  isAdmin?: boolean;
  onAIPracticeClick?: () => void;
  onAITutorClick?: () => void;
  onStudyBuddyClick?: () => void;
  onEssayGraderClick?: () => void;
  language?: 'en' | 'si';
}

const translations = {
  en: {
    title: "Modern Learning Tools",
    subtitle: "Additional features to enhance your learning experience",
    achievements: {
      title: "Achievements",
      description: "View your successes and unlocked badges",
      count: "12 achievements",
      action: "View →"
    },
    aiPractice: {
      title: "AI Practice",
      description: "Unlimited AI-generated questions with instant feedback",
      count: "∞ questions",
      action: "Start →"
    },
    aiTutor: {
      title: "AI Tutor",
      description: "Personalized learning with an AI tutor",
      count: "24/7 support",
      action: "Start →"
    },
    historicalRoleplay: {
      title: "Historical Roleplay",
      description: "Immerse yourself in historical scenarios",
      count: "Multiple scenarios",
      action: "Start →"
    },
    studyBuddy: {
      title: "AI Study Buddy",
      description: "Personalized learning coach with performance predictions",
      count: "Smart insights",
      action: "Start →"
    },
    essayGrader: {
      title: "AI Essay Grader",
      description: "Write answers and get instant AI feedback like a real teacher",
      count: "All subjects",
      action: "Try →"
    },
    featuresTitle: "🎯 EduQuest Features",
    features: [
      "Interactive 2D/3D Lessons",
      "Gamified Learning",
      "AI Chatbot Support",
      "Mobile-friendly",
      "Progress Tracking"
    ]
  },
  si: {
    title: "වැඩිදුර ඉගෙනීමේ මෙවලම්",
    subtitle: "ඔබේ ඉගෙනීමේ අත්දැකීම වැඩිදියුණු කිරීමට අමතර විශේෂාංග",
    achievements: {
      title: "ජයග්‍රහණ",
      description: "ඔබේ සාර්ථකත්වයන් සහ අනාවරණය කළ ලාංඡන බලන්න",
      count: "12 ජයග්‍රහණ",
      action: "බලන්න →"
    },
    aiPractice: {
      title: "AI Practice",
      description: "අනන්ත සාදර්ශනය සාදන ප්‍රශ්න සහ සිදුවීම් පිළිගැනීම",
      count: "∞ ප්‍රශ්න",
      action: "ආරම්භ කරන්න →"
    },
    aiTutor: {
      title: "AI Tutor",
      description: "පුද්ගලික ඉගෙනීමේ සහය සඳහා AI තුටරය",
      count: "24/7 සහය",
      action: "ආරම්භ කරන්න →"
    },
    historicalRoleplay: {
      title: "Historical Roleplay",
      description: "ඉතිහාසික සැනාරියන් දියුණු කිරීම",
      count: "බොහෝ සැනාරියන්",
      action: "ආරම්භ කරන්න →"
    },
    studyBuddy: {
      title: "AI Study Buddy",
      description: "කාර්ය සාධන පුරෝකථන සහිත පුද්ගලීකරණ ඉගෙනුම් පුහුණුකරු",
      count: "බුද්ධිමත් අවබෝධය",
      action: "ආරම්භ කරන්න →"
    },
    essayGrader: {
      title: "AI Essay Grader",
      description: "පිළිතුරු ලියා AI ගුරුවරයෙකු ලෙස ක්ෂණික feedback ලබාගන්න",
      count: "සියලු විෂයයන්",
      action: "උත්සාහ කරන්න →"
    },
    featuresTitle: "🎯 EduQuest විශේෂාංග",
    features: [
      "Interactive 2D/3D පාඩම්",
      "Gamified Learning",
      "AI Chatbot සහාය",
      "Mobile-friendly",
      "Progress Tracking"
    ]
  }
};

export function QuickAccessSection({ onAchievementsClick, onAdminClick, isAdmin = false, onAIPracticeClick, onAITutorClick, onStudyBuddyClick, onEssayGraderClick, language = 'en' }: QuickAccessProps) {
  const t = translations[language];

  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Achievements */}
          <button
            onClick={onAchievementsClick}
            className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
          >
            <div className="bg-gradient-to-br from-yellow-500 to-orange-600 p-8 text-white">
              <Trophy className="w-12 h-12 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2">{t.achievements.title}</h3>
              <p className="text-yellow-100 text-sm">
                {t.achievements.description}
              </p>
            </div>
            <div className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-gray-800 dark:to-gray-750">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-700 dark:text-gray-300 font-medium">{t.achievements.count}</span>
                <span className="text-orange-600 dark:text-orange-400 font-semibold group-hover:translate-x-1 transition-transform">
                  {t.achievements.action}
                </span>
              </div>
            </div>
          </button>

          {/* AI Practice */}
          {onAIPracticeClick && (
            <button
              onClick={onAIPracticeClick}
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
            >
              <div className="bg-gradient-to-br from-indigo-500 to-blue-600 p-8 text-white">
                <Sparkles className="w-12 h-12 mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-2">{t.aiPractice.title}</h3>
                <p className="text-indigo-100 text-sm">
                  {t.aiPractice.description}
                </p>
              </div>
              <div className="p-6 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-gray-800 dark:to-gray-750">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{t.aiPractice.count}</span>
                  <span className="text-blue-600 dark:text-blue-400 font-semibold group-hover:translate-x-1 transition-transform">
                    {t.aiPractice.action}
                  </span>
                </div>
              </div>
            </button>
          )}

          {/* AI Tutor */}
          {onAITutorClick && (
            <button
              onClick={onAITutorClick}
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
            >
              <div className="bg-gradient-to-br from-green-500 to-teal-600 p-8 text-white">
                <Brain className="w-12 h-12 mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-2">{t.aiTutor.title}</h3>
                <p className="text-green-100 text-sm">
                  {t.aiTutor.description}
                </p>
              </div>
              <div className="p-6 bg-gradient-to-br from-green-50 to-teal-50 dark:from-gray-800 dark:to-gray-750">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{t.aiTutor.count}</span>
                  <span className="text-teal-600 dark:text-teal-400 font-semibold group-hover:translate-x-1 transition-transform">
                    {t.aiTutor.action}
                  </span>
                </div>
              </div>
            </button>
          )}

          {/* AI Study Buddy */}
          {onStudyBuddyClick && (
            <button
              onClick={onStudyBuddyClick}
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
            >
              <div className="bg-gradient-to-br from-emerald-500 to-green-600 p-8 text-white">
                <TrendingUp className="w-12 h-12 mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-2">{t.studyBuddy.title}</h3>
                <p className="text-emerald-100 text-sm">
                  {t.studyBuddy.description}
                </p>
              </div>
              <div className="p-6 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-gray-800 dark:to-gray-750">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{t.studyBuddy.count}</span>
                  <span className="text-green-600 dark:text-green-400 font-semibold group-hover:translate-x-1 transition-transform">
                    {t.studyBuddy.action}
                  </span>
                </div>
              </div>
            </button>
          )}

          {/* AI Essay Grader */}
          {onEssayGraderClick && (
            <button
              onClick={onEssayGraderClick}
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
            >
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-8 text-white">
                <PenLine className="w-12 h-12 mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-2">{t.essayGrader.title}</h3>
                <p className="text-purple-100 text-sm">
                  {t.essayGrader.description}
                </p>
              </div>
              <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-750">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{t.essayGrader.count}</span>
                  <span className="text-purple-600 dark:text-purple-400 font-semibold group-hover:translate-x-1 transition-transform">
                    {t.essayGrader.action}
                  </span>
                </div>
              </div>
            </button>
          )}
        </div>

        {/* Feature Highlights */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border-2 border-purple-200 dark:border-purple-900">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 text-center">
              {t.featuresTitle}
            </h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              {t.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
                  <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
