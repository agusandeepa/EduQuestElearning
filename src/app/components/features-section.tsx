import { motion } from "motion/react";
import { Brain, Target, Trophy, BookOpen, Zap, Calendar } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

export function FeaturesSection() {
  const { language } = useLanguage();

  const content = language === 'en' ? {
    title: "Why Choose",
    titleHighlight: "EduQuest",
    subtitle: "Everything you need to master all 4 O/L subjects, all in one place",
    features: [
      { icon: Brain, title: "Smart Learning", description: "AI-powered lessons adapt to your learning pace and style across all 4 subjects", color: "from-purple-400 to-purple-600" },
      { icon: Target, title: "Goal Setting", description: "Set daily goals and track your progress with detailed analytics per subject", color: "from-blue-400 to-blue-600" },
      { icon: Trophy, title: "Achievements", description: "Earn badges, trophies, and unlock special rewards as you learn", color: "from-yellow-400 to-yellow-600" },
      { icon: BookOpen, title: "O/L Syllabus", description: "Complete coverage of Grade 10 & 11 Maths, Science, English & History curriculum", color: "from-green-400 to-green-600" },
      { icon: Zap, title: "Quick Lessons", description: "Learn in just 5-10 minutes a day with bite-sized content for every subject", color: "from-orange-400 to-orange-600" },
      { icon: Calendar, title: "Streaks", description: "Build a learning habit with daily streaks and reminders across subjects", color: "from-red-400 to-red-600" },
    ],
    subjects: [
      { emoji: "📐", name: "Mathematics", desc: "Algebra, Geometry, Statistics & more", color: "border-blue-400 bg-blue-50 dark:bg-blue-900/20" },
      { emoji: "🔬", name: "Science", desc: "Physics, Chemistry & Biology", color: "border-green-400 bg-green-50 dark:bg-green-900/20" },
      { emoji: "📖", name: "English", desc: "Grammar, Writing & Literature", color: "border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20" },
      { emoji: "🏛️", name: "History", desc: "Sri Lankan History — Ancient to Modern", color: "border-purple-400 bg-purple-50 dark:bg-purple-900/20" },
    ],
  } : {
    title: "ඇයි",
    titleHighlight: "EduQuest",
    subtitle: "O/L විෂයයන් 4ම ප්‍රගුණ කිරීමට ඔබට අවශ්‍ය සෑම දෙයක්ම එක තැනකින්",
    features: [
      { icon: Brain, title: "ස්මාර්ට් ඉගෙනීම", description: "AI-powered පාඩම් ඔබේ ඉගෙනීමේ වේගයට සහ විෂයයන් 4ටම අනුවර්තනය වෙනවා", color: "from-purple-400 to-purple-600" },
      { icon: Target, title: "ඉලක්ක සැකසීම", description: "දෛනික ඉලක්ක සකස් කර විෂය අනුව ඔබේ ප්‍රගතිය නිරීක්ෂණය කරන්න", color: "from-blue-400 to-blue-600" },
      { icon: Trophy, title: "ජයග්‍රහණ", description: "ඉගෙනෙද්දී badges, trophies උපයා විශේෂ ත්‍යාග unlock කරන්න", color: "from-yellow-400 to-yellow-600" },
      { icon: BookOpen, title: "සා.පෙළ විෂය නිර්දේශය", description: "10 සහ 11 ශ්‍රේණිවල ගණිතය, විද්‍යාව, ඉංග්‍රීසි සහ ඉතිහාසය සම්පූර්ණ ආවරණය", color: "from-green-400 to-green-600" },
      { icon: Zap, title: "ඉක්මන් පාඩම්", description: "දිනකට මිනිත්තු 5-10ක් පමණක් ගෙන සෑම විෂයයකටම bite-sized content", color: "from-orange-400 to-orange-600" },
      { icon: Calendar, title: "Streaks", description: "විෂයයන් හරහා දෛනික streaks සහ reminders සමඟ ඉගෙනීමේ පුරුද්ද ගොඩ නගා ගන්න", color: "from-red-400 to-red-600" },
    ],
    subjects: [
      { emoji: "📐", name: "ගණිතය", desc: "බීජ ගණිතය, ජ්‍යාමිතිය, සංඛ්‍යාන සහ තව", color: "border-blue-400 bg-blue-50 dark:bg-blue-900/20" },
      { emoji: "🔬", name: "විද්‍යාව", desc: "භෞතික, රසායන සහ ජීව විද්‍යාව", color: "border-green-400 bg-green-50 dark:bg-green-900/20" },
      { emoji: "📖", name: "ඉංග්‍රීසි", desc: "ව්‍යාකරණ, ලිවීම සහ සාහිත්‍යය", color: "border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20" },
      { emoji: "🏛️", name: "ඉතිහාසය", desc: "ශ්‍රී ලංකා ඉතිහාසය — පුරාණ සිට නූතන", color: "border-purple-400 bg-purple-50 dark:bg-purple-900/20" },
    ],
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Subject Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            {content.title} <span className="text-green-600">{content.titleHighlight}</span>?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            {content.subtitle}
          </p>

          {/* Subject Tags */}
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            {content.subjects.map((subject) => (
              <div
                key={subject.name}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl border-2 ${subject.color} shadow-sm`}
              >
                <span className="text-2xl">{subject.emoji}</span>
                <div className="text-left">
                  <p className="font-bold text-gray-900 dark:text-white text-sm">{subject.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{subject.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {content.features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-700 hover:border-green-400 dark:hover:border-green-500 transition-all hover:shadow-lg">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
