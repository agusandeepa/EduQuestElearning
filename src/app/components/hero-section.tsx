import { Button } from "./ui/button";
import { motion } from "motion/react";
import { BookOpen, Trophy, Star } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

interface HeroSectionProps {
  onGetStartedClick: () => void;
}

export function HeroSection({ onGetStartedClick }: HeroSectionProps) {
  const { language } = useLanguage();

  const content = language === 'en' ? {
    heading: "Master O/L Subjects the Fun Way",
    subheading: "Master Maths, Science, English & History with gamified lessons, interactive quizzes, and earn rewards as you progress!",
    subjects: [
      { emoji: "📐", label: "Maths", bg: "bg-blue-100 text-blue-700" },
      { emoji: "🔬", label: "Science", bg: "bg-green-100 text-green-700" },
      { emoji: "📖", label: "English", bg: "bg-yellow-100 text-yellow-700" },
      { emoji: "🏛️", label: "History", bg: "bg-purple-100 text-purple-700" },
    ],
    cta: "Start Learning Free",
    stats: [
      { value: "5000+", label: "O/L Students" },
      { value: "163+", label: "Lessons" },
      { value: "4", label: "O/L Subjects" },
    ],
    streakLabel: "5 Day Streak!",
    streakSub: "Keep it up!",
    levelLabel: "Level 12",
    readyTitle: "Ready to Start?",
    readySub: "Join thousands mastering O/L subjects the fun way!",
  } : {
    heading: "O/L විෂයයන් විනෝදජනකව ප්‍රගුණ කරන්න",
    subheading: "ගණිතය, විද්‍යාව, ඉංග්‍රීසි සහ ඉතිහාසය gamified පාඩම්, interactive ප්‍රශ්නාවලිය සහ ත්‍යාග සමඟ ඉගෙන ගන්න!",
    subjects: [
      { emoji: "📐", label: "ගණිතය", bg: "bg-blue-100 text-blue-700" },
      { emoji: "🔬", label: "විද්‍යාව", bg: "bg-green-100 text-green-700" },
      { emoji: "📖", label: "ඉංග්‍රීසි", bg: "bg-yellow-100 text-yellow-700" },
      { emoji: "🏛️", label: "ඉතිහාසය", bg: "bg-purple-100 text-purple-700" },
    ],
    cta: "නොමිලේ ඉගෙනීම ආරම්භ කරන්න",
    stats: [
      { value: "5000+", label: "සා.පෙළ සිසුන්" },
      { value: "163+", label: "පාඩම්" },
      { value: "4", label: "සා.පෙළ විෂයයන්" },
    ],
    streakLabel: "දින 5 ක streak!",
    streakSub: "දිගටම කරගෙන යන්න!",
    levelLabel: "මට්ටම 12",
    readyTitle: "ආරම්භ කිරීමට සූදානම්ද?",
    readySub: "දහස් ගණනක් O/L සිසුන් සමඟ ඉගෙන ගන්න!",
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-green-50 to-white dark:from-gray-950 dark:to-gray-900 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6">
              {content.heading}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
              {content.subheading}
            </p>

            {/* Subject badges */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-8">
              {content.subjects.map((s) => (
                <span key={s.label} className={`px-4 py-2 rounded-full font-semibold text-sm ${s.bg} flex items-center gap-1`}>
                  {s.emoji} {s.label}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Button
                size="lg"
                onClick={onGetStartedClick}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg rounded-2xl shadow-lg"
              >
                {content.cta}
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
              <div className="flex items-center gap-2">
                <div className="bg-green-100 p-2 rounded-lg">
                  <BookOpen className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{content.stats[0].value}</p>
                  <p className="text-sm text-gray-600">{content.stats[0].label}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Trophy className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{content.stats[1].value}</p>
                  <p className="text-sm text-gray-600">{content.stats[1].label}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-yellow-100 p-2 rounded-lg">
                  <Star className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{content.stats[2].value}</p>
                  <p className="text-sm text-gray-600">{content.stats[2].label}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full max-w-md mx-auto">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 bg-white p-4 rounded-2xl shadow-xl border-2 border-yellow-400 z-10"
              >
                <div className="flex items-center gap-2">
                  <Trophy className="w-6 h-6 text-yellow-500" />
                  <div>
                    <p className="font-bold text-sm">{content.streakLabel}</p>
                    <p className="text-xs text-gray-600">{content.streakSub}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-4 -left-4 bg-white p-4 rounded-2xl shadow-xl border-2 border-green-400 z-10"
              >
                <div className="flex items-center gap-2">
                  <Star className="w-6 h-6 text-green-500" />
                  <div>
                    <p className="font-bold text-sm">{content.levelLabel}</p>
                    <p className="text-xs text-gray-600">+250 XP</p>
                  </div>
                </div>
              </motion.div>

              <div className="bg-gradient-to-br from-green-400 to-blue-500 rounded-3xl p-8 shadow-2xl">
                <div className="bg-white rounded-2xl p-6 text-center">
                  <div className="flex justify-center gap-3 text-4xl mb-4">
                    <span>📐</span><span>🔬</span><span>📖</span><span>🏛️</span>
                  </div>
                  <h3 className="font-bold text-xl mb-2">{content.readyTitle}</h3>
                  <p className="text-gray-600 text-sm">{content.readySub}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-64 h-64 bg-green-200 rounded-full blur-3xl opacity-20 -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-20 -z-10" />
    </section>
  );
}
