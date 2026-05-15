import { BookOpen, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

export function Footer() {
  const { language } = useLanguage();

  const content = language === 'en' ? {
    tagline: "Making O/L education fun, engaging, and accessible for Sri Lankan students — Maths, Science, English & History.",
    subjects: ["📐 Maths", "🔬 Science", "📖 English", "🏛️ History"],
    learningTitle: "Learning",
    learningLinks: ["Maths Lessons", "Science Lessons", "English Lessons", "History Lessons", "Quizzes", "AI Features", "Progress Tracking"],
    aboutTitle: "About",
    aboutLinks: ["About Us", "For Teachers", "Blog", "Contact"],
    supportTitle: "Support",
    supportLinks: ["Help Center", "Community", "Privacy Policy", "Terms of Service"],
    copyright: "© 2026 EduQuest. All rights reserved.",
  } : {
    tagline: "ශ්‍රී ලංකා සිසුන් සඳහා සා.පෙළ අධ්‍යාපනය විනෝදජනක, ආකර්ෂණීය සහ ප්‍රවේශ්‍ය කිරීම — ගණිතය, විද්‍යාව, ඉංග්‍රීසි සහ ඉතිහාසය.",
    subjects: ["📐 ගණිතය", "🔬 විද්‍යාව", "📖 ඉංග්‍රීසි", "🏛️ ඉතිහාසය"],
    learningTitle: "ඉගෙනීම",
    learningLinks: ["ගණිත පාඩම්", "විද්‍යා පාඩම්", "ඉංග්‍රීසි පාඩම්", "ඉතිහාස පාඩම්", "ප්‍රශ්නාවලිය", "AI විශේෂාංග", "ප්‍රගතිය නිරීක්ෂණය"],
    aboutTitle: "ගැන",
    aboutLinks: ["අප ගැන", "ගුරුවරුන් සඳහා", "බ්ලොග්", "සම්බන්ධ වන්න"],
    supportTitle: "සහාය",
    supportLinks: ["උදව් මධ්‍යස්ථානය", "ප්‍රජාව", "රහස්‍යතා ප්‍රතිපත්තිය", "සේවා කොන්දේසි"],
    copyright: "© 2026 EduQuest. සියලු හිමිකම් ඇවිරිණි.",
  };

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-green-600 p-2 rounded-xl">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-extrabold text-white">EduQuest</span>
            </div>
            <p className="text-sm text-gray-400">{content.tagline}</p>
            <div className="flex gap-2 mt-4 flex-wrap">
              {content.subjects.map((s) => (
                <span key={s} className="text-xs bg-gray-800 px-2 py-1 rounded-lg text-gray-300">{s}</span>
              ))}
            </div>
          </div>

          {/* Learning */}
          <div>
            <h4 className="font-bold text-white mb-4">{content.learningTitle}</h4>
            <ul className="space-y-2 text-sm">
              {content.learningLinks.map((link) => (
                <li key={link}><a href="#" className="hover:text-green-400 transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-bold text-white mb-4">{content.aboutTitle}</h4>
            <ul className="space-y-2 text-sm">
              {content.aboutLinks.map((link) => (
                <li key={link}><a href="#" className="hover:text-green-400 transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-white mb-4">{content.supportTitle}</h4>
            <ul className="space-y-2 text-sm">
              {content.supportLinks.map((link) => (
                <li key={link}><a href="#" className="hover:text-green-400 transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">{content.copyright}</p>
          <div className="flex gap-4">
            <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-green-600 transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-green-600 transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-green-600 transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-green-600 transition-colors">
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
