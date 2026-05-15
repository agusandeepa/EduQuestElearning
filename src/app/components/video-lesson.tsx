import { useState } from "react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { motion } from "motion/react";
import { ArrowLeft, CheckCircle2, Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";

interface Lesson {
  id: number;
  title: string;
  type: "video" | "quiz";
  completed: boolean;
  locked: boolean;
  xp: number;
}

interface VideoLessonProps {
  lesson: Lesson;
  onComplete: (xp: number) => void;
  onBack: () => void;
}

export function VideoLesson({ lesson, onComplete, onBack }: VideoLessonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasWatched, setHasWatched] = useState(false);

  // Simulate video playback
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    
    if (!isPlaying && progress < 100) {
      // Simulate video progress
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 2;
          if (newProgress >= 100) {
            clearInterval(interval);
            setIsPlaying(false);
            setHasWatched(true);
            return 100;
          }
          return newProgress;
        });
      }, 200);
    }
  };

  const handleComplete = () => {
    onComplete(lesson.xp);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={onBack}
              className="text-white hover:bg-gray-700 gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            
            <div className="text-center flex-1">
              <h2 className="text-lg font-bold text-white">{lesson.title}</h2>
              <p className="text-sm text-gray-400">Video Lesson • {lesson.xp} XP</p>
            </div>

            <div className="w-24" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Video Player */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black rounded-2xl overflow-hidden shadow-2xl mb-8"
          >
            {/* Video Area */}
            <div className="relative aspect-video bg-gradient-to-br from-yellow-900 to-orange-900">
              {/* Animated Content Placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{
                    scale: isPlaying ? [1, 1.05, 1] : 1,
                    rotate: isPlaying ? [0, 5, -5, 0] : 0,
                  }}
                  transition={{
                    duration: 3,
                    repeat: isPlaying ? Infinity : 0,
                  }}
                  className="text-center"
                >
                  <div className="text-9xl mb-4">🏛️</div>
                  <h3 className="text-3xl font-bold text-white mb-2">
                    {isPlaying ? "Learning in progress..." : lesson.title}
                  </h3>
                  {!isPlaying && progress === 0 && (
                    <p className="text-gray-300">Click play to start the lesson</p>
                  )}
                </motion.div>
              </div>

              {/* Play Button Overlay */}
              {!isPlaying && (
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePlayPause}
                  className="absolute inset-0 flex items-center justify-center group"
                >
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-6 group-hover:bg-white/30 transition-all">
                    <Play className="w-16 h-16 text-white" fill="white" />
                  </div>
                </motion.button>
              )}

              {/* Video Controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                {/* Progress Bar */}
                <div className="mb-4">
                  <Progress value={progress} className="h-1 bg-white/20" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={handlePlayPause}
                      className="text-white hover:scale-110 transition-transform"
                    >
                      {isPlaying ? (
                        <Pause className="w-6 h-6" />
                      ) : (
                        <Play className="w-6 h-6" />
                      )}
                    </button>

                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="text-white hover:scale-110 transition-transform"
                    >
                      {isMuted ? (
                        <VolumeX className="w-6 h-6" />
                      ) : (
                        <Volume2 className="w-6 h-6" />
                      )}
                    </button>

                    <span className="text-white text-sm">
                      {Math.round(progress)}% complete
                    </span>
                  </div>

                  <button className="text-white hover:scale-110 transition-transform">
                    <Maximize className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Lesson Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-8 shadow-lg mb-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Lesson Overview
            </h3>
            <div className="prose max-w-none">
              <p className="text-gray-700 mb-4">
                In this lesson, you'll discover the fascinating world of Ancient Egypt. 
                Learn about the construction of the pyramids, the daily life of Egyptians, 
                and the powerful pharaohs who ruled this magnificent civilization.
              </p>
              
              <h4 className="text-lg font-bold text-gray-900 mb-2">
                Key Topics:
              </h4>
              <ul className="space-y-2 text-gray-700">
                <li>• The geography of Ancient Egypt and the Nile River</li>
                <li>• The Old, Middle, and New Kingdoms</li>
                <li>• Egyptian society and daily life</li>
                <li>• Religious beliefs and the afterlife</li>
                <li>• Famous monuments and architectural achievements</li>
              </ul>
            </div>
          </motion.div>

          {/* Complete Button */}
          {hasWatched && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-500 rounded-2xl p-6 text-center shadow-xl"
            >
              <CheckCircle2 className="w-12 h-12 text-white mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-white mb-2">
                Lesson Complete!
              </h3>
              <p className="text-green-100 mb-6">
                Great job! You've earned {lesson.xp} XP
              </p>
              <Button
                size="lg"
                onClick={handleComplete}
                className="bg-white text-green-600 hover:bg-gray-100 rounded-xl px-8"
              >
                Continue
                <CheckCircle2 className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          )}

          {/* Progress Indicator */}
          {!hasWatched && (
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6 text-center">
              <p className="text-gray-700">
                Watch the full video to complete this lesson and earn {lesson.xp} XP
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
