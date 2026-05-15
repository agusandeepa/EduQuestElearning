import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { useEffect, useState } from "react";
import {
  getProgress,
  getMathsProgress,
  getEnglishProgress,
  getScienceProgress,
  getLessons,
  getMathsLessons,
  getEnglishLessons,
  getScienceLessons,
} from "../../services/localStorage";
import { Crown, CheckCircle2 } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { useAuth } from "../../hooks/useAuth";

interface CardLearningPathProps {
  onSubjectClick: (subject: "history" | "maths" | "english" | "science") => void;
}

interface SubjectCounts {
  history: number;
  maths: number;
  english: number;
  science: number;
}

export function CardLearningPath({ onSubjectClick }: CardLearningPathProps) {
  const { language } = useLanguage();
  const { user } = useAuth();

  // DB lesson counts — start with local counts, update from API
  const localHistory = getLessons().length;
  const localMaths = getMathsLessons().length;
  const localEnglish = getEnglishLessons().length;
  const localScience = getScienceLessons().length;

  const [dbCounts, setDbCounts] = useState<SubjectCounts>({
    history: localHistory,
    maths: localMaths,
    english: localEnglish,
    science: localScience,
  });

  // Fetch lesson counts from backend API
  useEffect(() => {
    fetch("/api/lessons/")
      .then(r => r.json())
      .then((lessons: { subject?: string }[]) => {
        if (!Array.isArray(lessons)) return;
        const counts: SubjectCounts = { history: 0, maths: 0, english: 0, science: 0 };
        lessons.forEach(l => {
          const s = l.subject as keyof SubjectCounts;
          if (s in counts) counts[s]++;
        });
        // Only update if we got real data
        if (counts.history + counts.maths + counts.science > 0) {
          setDbCounts(counts);
        }
      })
      .catch(() => {
        // fallback to local counts silently
      });
  }, []);

  // Progress from localStorage
  const historyProgress = getProgress();
  const mathsProgress = getMathsProgress();
  const englishProgress = getEnglishProgress();
  const scienceProgress = getScienceProgress();

  const countCompleted = (progressData: { lesson_id: number; completed: boolean }[]) =>
    progressData.filter(p => p.completed).length;

  const subjects = [
    {
      id: "history",
      subject: "history" as const,
      title: "History",
      titleSi: "ඉතිහාසය",
      emoji: "🏛️",
      gradient: "from-yellow-400 to-orange-500",
      description: `Grade 10-11 O/L Sri Lankan History — ${dbCounts.history} lessons across 4 units`,
      descriptionSi: `ශ්‍රේණිය 10-11 ශ්‍රී ලංකා ඉතිහාසය — ඒකක 4 හරහා පාඩම් ${dbCounts.history}`,
      totalLessons: dbCounts.history,
      completed: countCompleted(historyProgress),
    },
    {
      id: "maths",
      subject: "maths" as const,
      title: "Mathematics",
      titleSi: "ගණිතය",
      emoji: "📐",
      gradient: "from-purple-500 to-purple-700",
      description: `Grade 10-11 O/L Maths — ${dbCounts.maths} lessons covering Algebra, Geometry, Trigonometry & more`,
      descriptionSi: `ශ්‍රේණිය 10-11 ගණිතය — බීජ ගණිතය, ජ්‍යාමිතිය, ත්‍රිකෝණමිතිය සහ තවත්`,
      totalLessons: dbCounts.maths,
      completed: countCompleted(mathsProgress),
    },
    {
      id: "english",
      subject: "english" as const,
      title: "English",
      titleSi: "ඉංග්‍රීසි",
      emoji: "📖",
      gradient: "from-blue-500 to-blue-700",
      description: `Grade 10-11 O/L English — ${dbCounts.english} lessons: Grammar, Comprehension, Essay Writing & more`,
      descriptionSi: `ශ්‍රේණිය 10-11 ඉංග්‍රීසි — ව්‍යාකරණ, අවබෝධය, රචනා ලිවීම සහ තවත්`,
      totalLessons: dbCounts.english || localEnglish,
      completed: countCompleted(englishProgress),
    },
    {
      id: "science",
      subject: "science" as const,
      title: "Science",
      titleSi: "විද්‍යාව",
      emoji: "🔬",
      gradient: "from-green-500 to-emerald-700",
      description: `Grade 10-11 O/L Science — ${dbCounts.science} lessons covering Physics, Chemistry & Biology`,
      descriptionSi: `ශ්‍රේණිය 10-11 විද්‍යාව — භෞතික විද්‍යාව, රසායන විද්‍යාව සහ ජීව විද්‍යාව`,
      totalLessons: dbCounts.science,
      completed: countCompleted(scienceProgress),
    },
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900" id="courses">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            {language === 'en' ? 'Your Learning Path' : 'ඔබේ ඉගෙනුම් මාර්ගය'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {language === 'en' 
              ? 'Grade 10-11 O/L Syllabus — History, Mathematics, English & Science'
              : 'ශ්‍රේණිය 10-11 ඕ/සාමාන්‍ය පෙළ — ඉතිහාසය, ගණිතය, ඉංග්‍රීසි සහ විද්‍යාව'}
          </p>
        </motion.div>

        {/* Subject Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {subjects.map((subject, index) => {
            const progress = (subject.completed / subject.totalLessons) * 100;
            const isCompleted = subject.completed === subject.totalLessons;
            const isInProgress = subject.completed > 0 && !isCompleted;

            return (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {/* Subject Card */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-1 duration-300 cursor-pointer h-full flex flex-col"
                  onClick={() => onSubjectClick(subject.subject)}
                >
                  {/* Card Header */}
                  <div className={`relative h-44 bg-gradient-to-br ${subject.gradient} flex items-center justify-center overflow-hidden`}>
                    {/* Decorative circles */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-4 right-4 w-20 h-20 border-4 border-white rounded-full" />
                      <div className="absolute bottom-4 left-4 w-14 h-14 border-4 border-white rounded-full" />
                    </div>

                    {/* Emoji */}
                    <span className="text-7xl drop-shadow-lg">{subject.emoji}</span>

                    {/* Completion badge */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <p className="text-xs font-bold text-gray-900">
                        {subject.completed}/{subject.totalLessons} {language === 'en' ? 'completed' : 'සම්පූර්ණයි'}
                      </p>
                    </div>

                    {/* Crown for fully completed */}
                    {isCompleted && (
                      <div className="absolute top-4 right-4 bg-yellow-400 rounded-full p-2 shadow-lg">
                        <Crown className="w-5 h-5 text-yellow-900" />
                      </div>
                    )}

                    {/* Green check for completed */}
                    {isCompleted && (
                      <div className="absolute bottom-3 right-3">
                        <CheckCircle2 className="w-7 h-7 text-white drop-shadow" />
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {language === 'en' ? subject.title : subject.titleSi}
                    </h3>

                    <p className="text-xs text-gray-500 mb-3 leading-relaxed">
                      {language === 'en' ? subject.description : subject.descriptionSi}
                    </p>

                    {/* Lesson count + completed */}
                    <p className="text-sm text-gray-600 mb-3">
                      {language === 'en'
                        ? `${subject.totalLessons} lessons`
                        : `පාඩම් ${subject.totalLessons}`}
                      {isInProgress && (
                        <span className="text-green-600 font-semibold ml-1">
                          • {subject.completed} {language === 'en' ? 'done' : 'ගිය'}
                        </span>
                      )}
                    </p>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <Progress value={progress} className="h-2" />
                    </div>

                    {/* Button */}
                    <Button
                      onClick={() => onSubjectClick(subject.subject)}
                      className={`w-full rounded-xl mt-auto ${
                        isCompleted
                          ? "bg-yellow-500 hover:bg-yellow-600"
                          : isInProgress
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "bg-green-600 hover:bg-green-700"
                      } text-white font-semibold py-2.5`}
                    >
                      {isCompleted ? (
                        <>
                          <Crown className="w-4 h-4 mr-2 inline" />
                          {language === 'en' ? 'Review' : 'නැවත කරන්න'}
                        </>
                      ) : isInProgress ? (
                        language === 'en' ? 'Continue →' : 'ඉදිරියට →'
                      ) : (
                        language === 'en' ? 'Start Learning →' : 'ඉගෙනීම ආරම්භ කරන්න →'
                      )}
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Message */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 px-6 py-3 rounded-full shadow-md">
            <span className="text-gray-700 font-semibold">
              {language === 'en' 
                ? '🎯 Choose a subject and start your O/L journey!' 
                : '🎯 විෂයක් තෝරා ඔබේ ඕ/සාමාන්‍ය පෙළ ගමන ආරම්භ කරන්න!'}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}