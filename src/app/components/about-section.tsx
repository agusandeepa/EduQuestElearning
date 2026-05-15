import { motion } from "motion/react";
import { BookOpen, GraduationCap, Award, Sparkles, TrendingUp, Brain } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

export function AboutSection() {
  const { language } = useLanguage();

  const content = language === 'en' ? {
    title: "About",
    titleHighlight: "EduQuest",
    subtitle: "Making O/L education engaging and effective for Sri Lankan students — across Maths, Science, English & History",
    coreSubjectsTitle: "Our",
    coreSubjectsTitleHighlight: "4 Core Subjects",
    subjects: [
      { emoji: "📐", name: "Mathematics", color: "from-blue-400 to-blue-600", topics: "Algebra, Geometry, Statistics" },
      { emoji: "🔬", name: "Science", color: "from-green-400 to-green-600", topics: "Physics, Chemistry, Biology" },
      { emoji: "📖", name: "English", color: "from-yellow-400 to-orange-500", topics: "Grammar, Writing, Literature" },
      { emoji: "🏛️", name: "History", color: "from-purple-400 to-purple-600", topics: "Ancient, Colonial & Independence" },
    ],
    storyTitle: "Our Story",
    storyP1: "Founded by experienced Sri Lankan educators and tech innovators, EduQuest was born from a simple idea: O/L preparation should be engaging, interactive, and effective for every subject. We noticed that students struggled not just with History, but with Maths problem-solving, Science concepts, and English language skills too.",
    storyP2: "Today, we're helping thousands of Grade 10 & 11 students across Sri Lanka master their O/L syllabus in Mathematics, Science, English, and History. By combining expert-crafted lessons with gamification, AI-powered tools, and bilingual support, we've created an experience that makes learning genuinely enjoyable.",
    storyP3: "From algebraic equations to ancient kingdoms, from chemical reactions to English essays — EduQuest is your complete companion for O/L success! 🇱🇰",
    whyTitle: "Why Choose EduQuest?",
    features: [
      { icon: BookOpen, title: "Expert-Crafted Content", description: "Lessons created by experienced Sri Lankan teachers to match O/L curriculum across all 4 subjects.", color: "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400" },
      { icon: GraduationCap, title: "O/L Exam Focused", description: "Aligned with Grade 10 & 11 syllabus covering Maths, Science, English & History.", color: "bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400" },
      { icon: Brain, title: "4 Core Subjects", description: "Complete coverage of Mathematics, Science, English Language, and Sri Lankan History.", color: "bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400" },
      { icon: Sparkles, title: "Gamified Learning", description: "Earn XP, unlock achievements, and maintain streaks while mastering every subject.", color: "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-600 dark:text-yellow-400" },
      { icon: Award, title: "Progress Tracking", description: "Monitor your O/L exam preparation across all subjects with detailed analytics.", color: "bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-400" },
      { icon: TrendingUp, title: "AI-Powered Learning", description: "Smart question generation, essay grading, and personalized study recommendations.", color: "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400" },
    ],
    teamTitle: "Meet Our Expert Team",
    teamSubtitle: "Experienced Sri Lankan educators dedicated to O/L success across all subjects",
    team: [
      { emoji: "👨‍🏫", name: "Mr. Dharmasena", role: "Senior History Teacher", specialty: "Sri Lankan History" },
      { emoji: "👩‍🔬", name: "Ms. Perera", role: "O/L Science Expert", specialty: "Physics, Chemistry & Biology" },
      { emoji: "👨‍💼", name: "Dr. Fernando", role: "Mathematics Consultant", specialty: "Algebra & Geometry" },
      { emoji: "👩‍💻", name: "Ms. Silva", role: "English Language Specialist", specialty: "Grammar & Literature" },
    ],
    stats: [
      { number: "5000+", label: "O/L Students" },
      { number: "163+", label: "Lessons Across Subjects" },
      { number: "4", label: "O/L Subjects" },
      { number: "95%", label: "Success Rate" },
    ],
  } : {
    title: "ගැන",
    titleHighlight: "EduQuest",
    subtitle: "ශ්‍රී ලංකා සා.පෙළ සිසුන් සඳහා ගණිතය, විද්‍යාව, ඉංග්‍රීසි සහ ඉතිහාසය — ඉගෙනීම ආකර්ෂණීය හා ඵලදායී කිරීම",
    coreSubjectsTitle: "අපගේ",
    coreSubjectsTitleHighlight: "මූලික විෂයයන් 4",
    subjects: [
      { emoji: "📐", name: "ගණිතය", color: "from-blue-400 to-blue-600", topics: "බීජ ගණිතය, ජ්‍යාමිතිය, සංඛ්‍යාන" },
      { emoji: "🔬", name: "විද්‍යාව", color: "from-green-400 to-green-600", topics: "භෞතික, රසායන, ජීව විද්‍යාව" },
      { emoji: "📖", name: "ඉංග්‍රීසි", color: "from-yellow-400 to-orange-500", topics: "ව්‍යාකරණ, ලිවීම, සාහිත්‍යය" },
      { emoji: "🏛️", name: "ඉතිහාසය", color: "from-purple-400 to-purple-600", topics: "පුරාණ, යටත් විජිත සහ නිදහස" },
    ],
    storyTitle: "අපගේ කතාව",
    storyP1: "පළපුරුදු ශ්‍රී ලංකා අධ්‍යාපනඥයින් සහ තාක්ෂණ නවෝත්පාදකයින් විසින් ආරම්භ කරන ලද EduQuest, සරල අදහසකින් ඉපදුණි: සා.පෙළ සූදානම සෑම විෂයයකටම ආකර්ෂණීය, interactive හා ඵලදායී විය යුතුය. ඉතිහාසය පමණක් නොව ගණිත ගැටළු, විද්‍යා සංකල්ප සහ ඉංග්‍රීසි කුසලතාවලදීද සිසුන් අසීරු වන බව අපි දුටිමු.",
    storyP2: "අද, ශ්‍රී ලංකාව පුරා 10 සහ 11 ශ්‍රේණිවල දහස් ගණනක් සිසුන්ට ගණිතය, විද්‍යාව, ඉංග්‍රීසි සහ ඉතිහාසය ප්‍රගුණ කිරීමට අපි සහාය වෙමු. expert-crafted පාඩම්, gamification, AI tools සහ දෙභාෂා සහාය ඒකාබද්ධ කිරීමෙන් ඉගෙනීම සත්‍ය ලෙසම ප්‍රසන්න කළ අත්දැකීමක් නිර්මාණය කළෙමු.",
    storyP3: "බීජ ගණිත සමීකරණ සිට පුරාණ රාජධානි, රසායනික ප්‍රතික්‍රියා සිට ඉංග්‍රීසි රචනා දක්වා — EduQuest ඔබේ සා.පෙළ සාර්ථකත්වය සඳහා සම්පූර්ණ සහකරු! 🇱🇰",
    whyTitle: "EduQuest තෝරා ගන්නේ ඇයි?",
    features: [
      { icon: BookOpen, title: "විශේෂඥ-නිර්මිත අන්තර්ගතය", description: "සා.පෙළ විෂය නිර්දේශයට ගැළපෙන ලෙස පළපුරුදු ශ්‍රී ලංකා ගුරුවරුන් විසින් නිර්මාණය කළ පාඩම්.", color: "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400" },
      { icon: GraduationCap, title: "සා.පෙළ විභාගයට කේන්ද්‍රිත", description: "ගණිතය, විද්‍යාව, ඉංග්‍රීසි සහ ඉතිහාසය ආවරණය කරන 10 සහ 11 ශ්‍රේණි විෂය නිර්දේශයට අනුකූල.", color: "bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400" },
      { icon: Brain, title: "මූලික විෂයයන් 4", description: "ගණිතය, විද්‍යාව, ඉංග්‍රීසි සහ ශ්‍රී ලංකා ඉතිහාසය සම්පූර්ණ ආවරණය.", color: "bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400" },
      { icon: Sparkles, title: "Gamified ඉගෙනීම", description: "සෑම විෂයයකම ප්‍රගුණ කරමින් XP උපයා, achievements unlock කර, streaks පවත්වා ගන්න.", color: "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-600 dark:text-yellow-400" },
      { icon: Award, title: "ප්‍රගතිය නිරීක්ෂණය", description: "සියලු විෂයයන් හරහා ඔබේ සා.පෙළ විභාග සූදානම සවිස්තරාත්මකව නිරීක්ෂණය කරන්න.", color: "bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-400" },
      { icon: TrendingUp, title: "AI-Powered ඉගෙනීම", description: "ස්මාර්ට් ප්‍රශ්න උත්පාදනය, රචනා ශ්‍රේණිගත කිරීම සහ පුද්ගලීකරණ අධ්‍යයන නිර්දේශ.", color: "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400" },
    ],
    teamTitle: "අපගේ විශේෂඥ කණ්ඩායම හමුවන්න",
    teamSubtitle: "සියලු විෂයයන් හරහා සා.පෙළ සාර්ථකත්වය සඳහා කැපවූ ශ්‍රී ලංකා අධ්‍යාපනඥයින්",
    team: [
      { emoji: "👨‍🏫", name: "ධර්මසේන මහතා", role: "ජ්‍යෙෂ්ඨ ඉතිහාස ගුරුවරයා", specialty: "ශ්‍රී ලංකා ඉතිහාසය" },
      { emoji: "👩‍🔬", name: "පෙරේරා මහත්මිය", role: "සා.පෙළ විද්‍යා විශේෂඥ", specialty: "භෞතික, රසායන සහ ජීව විද්‍යාව" },
      { emoji: "👨‍💼", name: "ෆර්නාන්දු ආචාර්ය", role: "ගණිත උපදේශක", specialty: "බීජ ගණිතය සහ ජ්‍යාමිතිය" },
      { emoji: "👩‍💻", name: "සිල්වා මහත්මිය", role: "ඉංග්‍රීසි භාෂා විශේෂඥ", specialty: "ව්‍යාකරණ සහ සාහිත්‍යය" },
    ],
    stats: [
      { number: "5000+", label: "සා.පෙළ සිසුන්" },
      { number: "163+", label: "විෂයයන් හරහා පාඩම්" },
      { number: "4", label: "සා.පෙළ විෂයයන්" },
      { number: "95%", label: "සාර්ථකත්ව අනුපාතය" },
    ],
  };

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-white to-green-50 dark:from-gray-950 dark:to-gray-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            {content.title} <span className="text-green-600">{content.titleHighlight}</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {content.subtitle}
          </p>
        </motion.div>

        {/* Subject Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-10">
            {content.coreSubjectsTitle} <span className="text-green-600">{content.coreSubjectsTitleHighlight}</span>
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {content.subjects.map((subject, index) => (
              <motion.div
                key={subject.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`bg-gradient-to-br ${subject.color} rounded-2xl p-6 text-white text-center shadow-lg hover:shadow-xl hover:scale-105 transition-all cursor-pointer`}
              >
                <div className="text-5xl mb-3">{subject.emoji}</div>
                <h4 className="font-bold text-xl mb-2">{subject.name}</h4>
                <p className="text-sm text-white/80">{subject.topics}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-20"
        >
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-2xl">
                <BookOpen className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{content.storyTitle}</h3>
            </div>
            <div className="space-y-4 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              <p>{content.storyP1}</p>
              <p>{content.storyP2}</p>
              <p className="font-semibold text-green-700 dark:text-green-400">{content.storyP3}</p>
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="mb-20">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12"
          >
            {content.whyTitle}
          </motion.h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h4>
                  <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-green-500 to-blue-600 rounded-3xl p-8 md:p-12 text-white"
        >
          <h3 className="text-3xl font-bold text-center mb-4">{content.teamTitle}</h3>
          <p className="text-center text-green-100 mb-12 text-lg">{content.teamSubtitle}</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-colors"
              >
                <div className="text-6xl mb-3">{member.emoji}</div>
                <h4 className="font-bold text-lg mb-1">{member.name}</h4>
                <p className="text-green-100 text-sm mb-2">{member.role}</p>
                <p className="text-xs text-green-200">{member.specialty}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {content.stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-extrabold text-green-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
