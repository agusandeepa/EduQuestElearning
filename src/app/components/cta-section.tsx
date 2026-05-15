import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Sparkles, ArrowRight } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

interface CTASectionProps {
  onGetStartedClick: () => void;
}

export function CTASection({ onGetStartedClick }: CTASectionProps) {
  const { language } = useLanguage();

  const content = language === 'en' ? {
    heading: "Start Your O/L Journey Today",
    subheading: "Join thousands of O/L students mastering Maths, Science, English & History. Free forever. Learn at your own pace.",
    cta: "Get Started Free",
  } : {
    heading: "අද ඔබේ සා.පෙළ ගමන ආරම්භ කරන්න",
    subheading: "ගණිතය, විද්‍යාව, ඉංග්‍රීසි සහ ඉතිහාසය ප්‍රගුණ කරන දහස් ගණනක් සා.පෙළ සිසුන් සමඟ එක්වන්න. සදාකාලිකව නොමිලේ. ඔබේ වේගයෙන් ඉගෙන ගන්න.",
    cta: "නොමිලේ ආරම්භ කරන්න",
  };

  return (
    <section className="py-20 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], rotate: [90, 0, 90] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center text-white"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block mb-6"
          >
            <Sparkles className="w-16 h-16 mx-auto" />
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-extrabold mb-6">
            {content.heading}
          </h2>
          <p className="text-lg md:text-xl mb-4 text-white/90 max-w-2xl mx-auto">
            {content.subheading}
          </p>
          <div className="flex justify-center gap-4 flex-wrap mb-8 text-2xl">
            <span>📐</span><span>🔬</span><span>📖</span><span>🏛️</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={onGetStartedClick}
              className="bg-white text-green-600 hover:bg-gray-100 px-10 py-7 text-lg rounded-2xl shadow-xl group"
            >
              {content.cta}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
