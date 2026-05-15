import { motion } from "motion/react";
import { Lock, BookOpen, Calculator, FlaskConical, Languages, Globe, Monitor, MessageSquare } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

interface ComingSoonSubjectsProps {
  onMathsClick?: () => void;
  onEnglishClick?: () => void;
  onScienceClick?: () => void;
  onHistoryClick?: () => void;
}

export function ComingSoonSubjects({ onMathsClick, onEnglishClick, onScienceClick, onHistoryClick }: ComingSoonSubjectsProps) {
  const { language } = useLanguage();

  const content = language === 'en' ? {
    title: 'All Subjects in One Place!',
    subtitle: 'Master your O/L exams with AI-powered learning across all subjects',
    comingSoon: 'Coming Soon',
    availableNow: 'Available Now',
    startLearning: 'Start Learning',
    lockText: 'Coming Soon',
    notifyText: 'We\'re working hard to bring this subject to you!',
    stayTuned: 'Stay Tuned!',
    bottomDesc: 'History, Mathematics, English & Science are fully available now! Tamil, Geography & IT coming very soon.',

    historyTitle: 'History',
    historyDesc: 'Sri Lankan O/L History (Grade 10 & 11)',

    englishTitle: 'English',
    englishDesc: 'Grammar, Literature & Comprehension',

    mathsTitle: 'Mathematics',
    mathsDesc: 'Algebra, Geometry & Calculus',

    scienceTitle: 'Science',
    scienceDesc: 'Physics, Chemistry & Biology',

    tamilTitle: 'Tamil',
    tamilDesc: 'Tamil Language & Literature',

    geographyTitle: 'Geography',
    geographyDesc: 'Physical & Human Geography',

    itTitle: 'ICT',
    itDesc: 'Information & Communication Technology',
  } : {
    title: 'සියලු විෂයයන් එක තැනකින්!',
    subtitle: 'AI-powered ඉගෙනීමෙන් සියලු විෂයයන්හි O/L විභාගය ජය ගන්න',
    comingSoon: 'ඉක්මනින්',
    availableNow: 'දැන් ලබා ගත හැකිය',
    startLearning: 'ඉගෙනීම ආරම්භ කරන්න',
    lockText: 'ඉක්මනින් එයි',
    notifyText: 'අපි ඔබට මෙම විෂය ගෙන ඒමට වෙහෙසෙමු!',
    stayTuned: 'බලාගෙන ඉන්න!',
    bottomDesc: 'ඉතිහාසය, ගණිතය, ඉංග්‍රීසි සහ විද්‍යාව දැන් සම්පූර්ණයෙන් ලබා ගත හැකිය! දෙමළ, භූගෝල විද්‍යාව සහ ICT ඉක්මනින් එයි.',

    historyTitle: 'ඉතිහාසය',
    historyDesc: 'ශ්‍රී ලාංකික ඕ/ල ඉතිහාසය (10 සහ 11 ශ්‍රේණි)',

    englishTitle: 'ඉංග්‍රීසි',
    englishDesc: 'ව්‍යාකරණ, සාහිත්‍යය සහ අවබෝධය',

    mathsTitle: 'ගණිතය',
    mathsDesc: 'වීජ ගණිතය, ජ්‍යාමිතිය සහ කලනය',

    scienceTitle: 'විද්‍යාව',
    scienceDesc: 'භෞතික විද්‍යාව, රසායන විද්‍යාව සහ ජීව විද්‍යාව',

    tamilTitle: 'දෙමළ',
    tamilDesc: 'දෙමළ භාෂාව සහ සාහිත්‍යය',

    geographyTitle: 'භූගෝල විද්‍යාව',
    geographyDesc: 'භෞතික සහ මානව භූගෝල විද්‍යාව',

    itTitle: 'ICT',
    itDesc: 'තොරතුරු හා සන්නිවේදන තාක්ෂණය',
  };

  const availableSubjects = [
    {
      id: 'history',
      icon: BookOpen,
      title: content.historyTitle,
      description: content.historyDesc,
      gradient: 'from-green-400 to-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      glowColor: 'from-green-400 to-green-600',
    },
    {
      id: 'english',
      icon: Languages,
      title: content.englishTitle,
      description: content.englishDesc,
      gradient: 'from-blue-400 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      glowColor: 'from-blue-400 to-blue-600',
    },
    {
      id: 'maths',
      icon: Calculator,
      title: content.mathsTitle,
      description: content.mathsDesc,
      gradient: 'from-purple-400 to-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      glowColor: 'from-purple-400 to-purple-600',
    },
    {
      id: 'science',
      icon: FlaskConical,
      title: content.scienceTitle,
      description: content.scienceDesc,
      gradient: 'from-emerald-400 to-teal-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
      glowColor: 'from-emerald-400 to-teal-600',
    },
  ];

  const comingSoonSubjects = [
    {
      id: 'tamil',
      icon: MessageSquare,
      title: content.tamilTitle,
      description: content.tamilDesc,
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-500',
      borderColor: 'border-orange-200',
      bgColor: 'bg-orange-50',
      badgeColor: 'bg-orange-400',
    },
    {
      id: 'geography',
      icon: Globe,
      title: content.geographyTitle,
      description: content.geographyDesc,
      iconBg: 'bg-cyan-100',
      iconColor: 'text-cyan-600',
      borderColor: 'border-cyan-200',
      bgColor: 'bg-cyan-50',
      badgeColor: 'bg-cyan-500',
    },
    {
      id: 'it',
      icon: Monitor,
      title: content.itTitle,
      description: content.itDesc,
      iconBg: 'bg-indigo-100',
      iconColor: 'text-indigo-600',
      borderColor: 'border-indigo-200',
      bgColor: 'bg-indigo-50',
      badgeColor: 'bg-indigo-500',
    },
  ];

  const handleClick = (id: string) => {
    if (id === 'history') onHistoryClick?.();
    if (id === 'maths') onMathsClick?.();
    if (id === 'english') onEnglishClick?.();
    if (id === 'science') onScienceClick?.();
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-green-50 dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", duration: 0.6 }}
            className="inline-block mb-4"
          >
            <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
              {content.comingSoon} 🚀
            </div>
          </motion.div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            {content.title}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            {content.subtitle}
          </p>
        </motion.div>

        {/* ---- AVAILABLE NOW SUBJECTS ---- */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-6 max-w-7xl mx-auto"
        >
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-sm font-bold text-green-600 bg-green-100 px-4 py-1 rounded-full">
            ✓ {content.availableNow}
          </span>
          <div className="flex-1 h-px bg-gray-200" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-12">
          {availableSubjects.map((subject, index) => {
            const Icon = subject.icon;
            return (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
                onClick={() => handleClick(subject.id)}
              >
                <div className={`relative h-full ${subject.bgColor} border-2 ${subject.borderColor} rounded-3xl p-6 transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer`}>
                  {/* Available Badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                    className="absolute -top-3 -right-3 z-10"
                  >
                    <div className={`bg-gradient-to-r ${subject.gradient} text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg`}>
                      ✓ {content.availableNow}
                    </div>
                  </motion.div>

                  {/* Icon */}
                  <div className="mb-4">
                    <div className={`${subject.iconBg} ${subject.iconColor} w-16 h-16 rounded-2xl flex items-center justify-center`}>
                      <Icon className="w-8 h-8" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{subject.title}</h3>
                  <p className="text-sm mb-4 text-gray-600">{subject.description}</p>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mt-4">
                    <div className={`bg-gradient-to-r ${subject.gradient} text-white px-4 py-2 rounded-xl text-sm font-bold text-center shadow-lg`}>
                      {content.startLearning}
                    </div>
                  </motion.div>
                </div>

                {/* Glow Effect */}
                <div className={`absolute -inset-1 bg-gradient-to-r ${subject.glowColor} rounded-3xl blur-lg opacity-20 -z-10`} />
              </motion.div>
            );
          })}
        </div>

        {/* ---- COMING SOON SUBJECTS ---- */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-6 max-w-7xl mx-auto"
        >
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-sm font-bold text-gray-500 bg-gray-100 px-4 py-1 rounded-full">
            🔒 {content.comingSoon}
          </span>
          <div className="flex-1 h-px bg-gray-200" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {comingSoonSubjects.map((subject, index) => {
            const Icon = subject.icon;
            return (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className={`relative h-full ${subject.bgColor} border-2 ${subject.borderColor} border-dashed rounded-3xl p-6 opacity-80`}>
                  {/* Coming Soon Badge */}
                  <div className="absolute -top-3 -right-3 z-10">
                    <div className={`${subject.badgeColor} text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg`}>
                      🔒 {content.comingSoon}
                    </div>
                  </div>

                  {/* Lock overlay icon */}
                  <div className="absolute top-4 right-4">
                    <Lock className="w-5 h-5 text-gray-400" />
                  </div>

                  {/* Icon */}
                  <div className="mb-4">
                    <div className={`${subject.iconBg} ${subject.iconColor} w-16 h-16 rounded-2xl flex items-center justify-center opacity-70`}>
                      <Icon className="w-8 h-8" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-2 text-gray-600">{subject.title}</h3>
                  <p className="text-sm mb-4 text-gray-400">{subject.description}</p>

                  <div className="mt-4 flex items-center gap-2 text-gray-400 text-sm">
                    <Lock className="w-4 h-4" />
                    <span className="font-semibold">{content.lockText}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">{content.notifyText}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg max-w-2xl mx-auto border-2 border-green-200">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="bg-green-100 p-2 rounded-full">
                <BookOpen className="w-5 h-5 text-green-600" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                {content.stayTuned}
              </h4>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {content.bottomDesc}
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
