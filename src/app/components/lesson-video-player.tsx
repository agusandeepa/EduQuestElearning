// Lesson Video Player Component
import { useState } from 'react';
import { Play, X, Video, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface LessonVideoPlayerProps {
  videoUrl: string;
  videoUrlSi?: string; // Sinhala version if available
  title: string;
  titleSi?: string;
  description?: string;
  descriptionSi?: string;
  thumbnail?: string;
}

export function LessonVideoPlayer({
  videoUrl,
  videoUrlSi,
  title,
  titleSi,
  description,
  descriptionSi,
  thumbnail,
}: LessonVideoPlayerProps) {
  const { language } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  // Get the appropriate video URL based on language
  const currentVideoUrl = language === 'si' && videoUrlSi ? videoUrlSi : videoUrl;
  const currentTitle = language === 'si' && titleSi ? titleSi : title;
  const currentDescription = language === 'si' && descriptionSi ? descriptionSi : description;

  // Convert YouTube URL to embed format
  const getEmbedUrl = (url: string) => {
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    } else if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
    return url; // Return as is if already an embed URL
  };

  if (!isExpanded) {
    return (
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 border border-purple-200 mb-6">
        <button
          onClick={() => setIsExpanded(true)}
          className="w-full flex items-center justify-between text-left"
        >
          <div className="flex items-center gap-3">
            <div className="bg-purple-600 p-2 rounded-lg">
              <Video className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">
                {language === 'en' ? 'Educational Video' : 'අධ්‍යාපනික වීඩියෝව'}
              </h3>
              <p className="text-sm text-gray-600">{currentTitle}</p>
            </div>
          </div>
          <ChevronDown className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl overflow-hidden border-2 border-purple-200 shadow-lg mb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
              <Video className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">
                {language === 'en' ? 'Educational Video' : 'අධ්‍යාපනික වීඩියෝව'}
              </h3>
              <p className="text-sm text-purple-100">{currentTitle}</p>
            </div>
          </div>
          <button
            onClick={() => setIsExpanded(false)}
            className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Video Container */}
      <div className="p-4">
        {!isPlaying ? (
          // Video Thumbnail/Preview
          <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden group cursor-pointer">
            {thumbnail ? (
              <img
                src={thumbnail}
                alt={currentTitle}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-purple-900 to-blue-900 flex items-center justify-center">
                <Video className="w-20 h-20 text-white/50" />
              </div>
            )}
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
              <button
                onClick={() => setIsPlaying(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white rounded-full p-6 transform hover:scale-110 transition-transform shadow-2xl"
              >
                <Play className="w-12 h-12 ml-1" />
              </button>
            </div>

            {/* Duration Badge (Optional) */}
            <div className="absolute bottom-4 right-4 bg-black/80 text-white text-sm px-3 py-1 rounded-lg">
              {language === 'en' ? 'Educational Content' : 'අධ්‍යාපනික අන්තර්ගතය'}
            </div>
          </div>
        ) : (
          // Video Player (YouTube Embed)
          <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
            <iframe
              src={getEmbedUrl(currentVideoUrl)}
              title={currentTitle}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
            
            {/* Close Button */}
            <button
              onClick={() => setIsPlaying(false)}
              className="absolute top-4 right-4 bg-black/80 hover:bg-black text-white p-2 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Video Description */}
        {currentDescription && (
          <div className="mt-4 bg-white rounded-lg p-4 border border-purple-200">
            <p className="text-sm text-gray-700 leading-relaxed">
              {currentDescription}
            </p>
          </div>
        )}

        {/* Video Info */}
        <div className="mt-3 flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>{language === 'en' ? 'Educational Resource' : 'අධ්‍යාපනික සම්පත'}</span>
          </div>
          {language === 'si' && videoUrlSi && (
            <div className="flex items-center gap-2">
              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-semibold">
              {'සිංහල අනුවාදය ලබා ගත හැක'}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
