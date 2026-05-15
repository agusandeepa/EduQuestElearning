import { motion } from "motion/react";
import { Users, BookOpen, GraduationCap, TrendingUp } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

export function StatsSection() {
  const { language } = useLanguage();

  const content = language === 'en' ? {
    title: "Join O/L Students Community",
    subtitle: "Designed specifically for Sri Lankan O/L students and teachers — Maths, Science, English & History",
    stats: [
      {
        icon: Users,
        value: "5000+",
        label: "O/L Students",
        description: "Learning across all subjects",
        color: "bg-blue-500",
      },
      {
        icon: GraduationCap,
        value: "4",
        label: "O/L Subjects",
        description: "Maths, Science, English & History",
        color: "bg-green-500",
      },
      {
        icon: BookOpen,
        value: "163+",
        label: "Lessons",
        description: "Across 4 O/L subjects",
        color: "bg-yellow-500",
      },
      {
        icon: TrendingUp,
        value: "95%",
        label: "Success Rate",
        description: "O/L exam preparation",
        color: "bg-purple-500",
      },
    ]
  } : {
    title: "සා.පෙළ සිසුන්ගේ ප්‍රජාවට එක්වන්න",
    subtitle: "ශ්‍රී ලංකා සා.පෙළ සිසුන් සහ ගුරුවරුන් සඳහා — ගණිතය, විද්‍යාව, ඉංග්‍රීසි සහ ඉතිහාසය",
    stats: [
      {
        icon: Users,
        value: "5000+",
        label: "සා.පෙළ සිසුන්",
        description: "සියලු විෂයයන් ඉගෙන ගන්නවා",
        color: "bg-blue-500",
      },
      {
        icon: GraduationCap,
        value: "4",
        label: "සා.පෙළ විෂයයන්",
        description: "ගණිතය, විද්‍යාව, ඉංග්‍රීසි සහ ඉතිහාසය",
        color: "bg-green-500",
      },
      {
        icon: BookOpen,
        value: "163+",
        label: "පාඩම්",
        description: "විෂයයන් 4ක් හරහා",
        color: "bg-yellow-500",
      },
      {
        icon: TrendingUp,
        value: "95%",
        label: "සාර්ථකත්ව අනුපාතය",
        description: "සා.පෙළ විභාග සූදානම",
        color: "bg-purple-500",
      },
    ]
  };

  return (
    <section className="py-16 bg-gradient-to-br from-green-600 to-blue-600 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            {content.title}
          </h2>
          <p className="text-lg text-green-100 max-w-2xl mx-auto">
            {content.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {content.stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div
                  className={`${stat.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-extrabold mb-2">{stat.value}</div>
                <div className="text-xl font-bold mb-1">{stat.label}</div>
                <div className="text-sm text-green-100">{stat.description}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
