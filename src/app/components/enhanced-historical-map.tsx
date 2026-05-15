// Enhanced Historical Map - Map-based Learning with Quiz Features
import { useState } from 'react';
import { MapPin, Info, X, Trophy, Filter, Globe } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '../../contexts/LanguageContext';

interface HistoricalLocation {
  id: number;
  name: string;
  nameEn: string;
  event: string;
  eventEn: string;
  period: string;
  description: string;
  descriptionEn: string;
  coordinates: { x: number; y: number };
  lessonId?: number;
  category: 'ancient' | 'medieval' | 'colonial' | 'modern';
}

interface WorldLocation {
  id: number;
  name: string;
  nameEn: string;
  event: string;
  eventEn: string;
  period: string;
  description: string;
  descriptionEn: string;
  coordinates: { x: number; y: number };
  lessonId?: number;
  category: 'asia' | 'europe' | 'africa' | 'americas' | 'oceania' | 'colonial' | 'modern';
}

interface MapQuizQuestion {
  id: number;
  question: string;
  questionEn: string;
  locationId: number;
  options: string[];
  optionsEn: string[];
  correct_answer: number;
}

const HISTORICAL_LOCATIONS: HistoricalLocation[] = [
  {
    id: 1,
    name: 'ෆා-හියන් ලෙන',
    nameEn: 'Fa-Hien Cave',
    event: 'ප්‍රාග් ඓතිහාසික නිවාස',
    eventEn: 'Prehistoric Settlement',
    period: 'ක්‍රි.පූ. 37,000',
    description: 'මධ්‍යගත ශිලා යුගයේ බැලංගොඩ මිනිසුන්ගේ සාක්ෂි හමු වූ ස්ථානය.',
    descriptionEn: 'Site where evidence of Balangoda Man from Mesolithic period was found.',
    coordinates: { x: 41, y: 62 },
    lessonId: 1,
    category: 'ancient',
  },
  {
    id: 2,
    name: 'මහියංගනය',
    nameEn: 'Mahiyangana',
    event: 'විජය රජු ගොඩබෑම',
    eventEn: 'King Vijaya\'s Landing',
    period: 'ක්‍රි.පූ. 543',
    description: 'විජය රජු ශ්‍රී ලංකාවට පැමිණ මහියංගනයේ ගොඩබැස්සේය. සිංහල ජාතියේ ආරම්භය.',
    descriptionEn: 'King Vijaya landed here marking the beginning of the Sinhalese nation.',
    coordinates: { x: 53, y: 38 },
    lessonId: 2,
    category: 'ancient',
  },
  {
    id: 3,
    name: 'තඹපණ්ණි',
    nameEn: 'Tambapanni',
    event: 'විජයගේ ප්‍රථම අගනගරය',
    eventEn: 'Vijaya\'s First Capital',
    period: 'ක්‍රි.පූ. 543-505',
    description: 'විජය රජු විසින් පිහිටුවන ලද ප්‍රථම අගනගරය (දැන් මන්නාරම ප්‍රදේශය).',
    descriptionEn: 'First capital established by King Vijaya (now Mannar area).',
    coordinates: { x: 42, y: 22 },
    lessonId: 2,
    category: 'ancient',
  },
  {
    id: 4,
    name: 'අනුරාධපුරය',
    nameEn: 'Anuradhapura',
    event: 'අනුරාධපුර රාජධානිය',
    eventEn: 'Anuradhapura Kingdom',
    period: 'ක්‍රි.පූ. 437 - ක්‍රි.ව. 1017',
    description: 'පණ්ඩුකාභය රජු විසින් ආරම්භ කරන ලද ප්‍රථම ප්‍රධාන නගරය. 1400 වසරක් රාජධානිය.',
    descriptionEn: 'First major city established by King Pandukabhaya. Capital for 1400 years.',
    coordinates: { x: 50, y: 25 },
    lessonId: 3,
    category: 'ancient',
  },
  {
    id: 5,
    name: 'මිහින්තලේ',
    nameEn: 'Mihintale',
    event: 'බුද්ධාගමනය',
    eventEn: 'Arrival of Buddhism',
    period: 'ක්‍රි.පූ. 247',
    description: 'මහින්ද මහරහතන් වහන්සේ දේවානම්පියතිස්ස රජු හමුවූ මිස්සක පව්ව.',
    descriptionEn: 'Missaka Pabbata where Arahat Mahinda met King Devanampiyatissa.',
    coordinates: { x: 52, y: 27 },
    lessonId: 4,
    category: 'ancient',
  },
  {
    id: 6,
    name: 'රුවන්වැලිසෑය',
    nameEn: 'Ruwanwelisaya',
    event: 'දුටුගැමුණු යුගය',
    eventEn: 'Dutugemunu Era',
    period: 'ක්‍රි.පූ. 140-137',
    description: 'දුටුගැමුණු රජු ඉදිකළ ශ්‍රී ලංකාවේ විශාලතම ස්තූපය.',
    descriptionEn: 'The largest stupa built by King Dutugemunu.',
    coordinates: { x: 50, y: 26 },
    lessonId: 5,
    category: 'ancient',
  },
  {
    id: 7,
    name: 'සීගිරිය',
    nameEn: 'Sigiriya',
    event: 'කාශ්‍යප රජු කාලය',
    eventEn: 'King Kashyapa Era',
    period: 'ක්‍රි.ව. 477-495',
    description: 'කාශ්‍යප රජු ඉදිකළ අප්‍රතිම පර්වත බලකොටුව සහ මාලිගාව.',
    descriptionEn: 'Rock fortress and palace built by King Kashyapa.',
    coordinates: { x: 52, y: 32 },
    category: 'ancient',
  },
  {
    id: 8,
    name: 'පොළොන්නරුව',
    nameEn: 'Polonnaruwa',
    event: 'පොළොන්නරුව රාජධානිය',
    eventEn: 'Polonnaruwa Kingdom',
    period: 'ක්‍රි.ව. 1055-1232',
    description: 'අනුරාධපුරයෙන් පසු දෙවන ප්‍රධාන රාජධානිය. පරාක්‍රමබාහු යුගය.',
    descriptionEn: 'Second major kingdom after Anuradhapura. Parakramabahu era.',
    coordinates: { x: 55, y: 30 },
    lessonId: 6,
    category: 'medieval',
  },
  {
    id: 9,
    name: 'දඹදෙණිය',
    nameEn: 'Dambadeniya',
    event: 'දඹදෙණිය රාජධානිය',
    eventEn: 'Dambadeniya Kingdom',
    period: 'ක්‍රි.ව. 1220-1345',
    description: 'පොළොන්නරුවෙන් පසු මාරු වූ තුන්වන රාජධානිය.',
    descriptionEn: 'Third kingdom after Polonnaruwa era.',
    coordinates: { x: 47, y: 42 },
    category: 'medieval',
  },
  {
    id: 10,
    name: 'ගම්පොල',
    nameEn: 'Gampola',
    event: 'ගම්පොල රාජධානිය',
    eventEn: 'Gampola Kingdom',
    period: 'ක්‍රි.ව. 1341-1408',
    description: 'කෙළණිය සහ රායිගම රාජධානි සමඟ එකවර පැවති රාජධානිය.',
    descriptionEn: 'Kingdom that existed alongside Kelaniya and Raigama.',
    coordinates: { x: 48, y: 50 },
    category: 'medieval',
  },
  {
    id: 11,
    name: 'යාපනය',
    nameEn: 'Jaffna',
    event: 'යාපනය රාජධානිය',
    eventEn: 'Jaffna Kingdom',
    period: 'ක්‍රි.ව. 1215-1619',
    description: 'උතුරු ශ්‍රී ලංකාවේ ප්‍රබල තමිල රාජධානිය.',
    descriptionEn: 'Powerful Tamil kingdom in Northern Sri Lanka.',
    coordinates: { x: 48, y: 10 },
    category: 'medieval',
  },
  {
    id: 12,
    name: 'කෝට්ටේ',
    nameEn: 'Kotte',
    event: 'කෝට්ටේ රාජධානිය',
    eventEn: 'Kingdom of Kotte',
    period: 'ක්‍රි.ව. 1412-1597',
    description: 'පරාක්‍රමබාහු VI විසින් එක්සත් කරන ලද අවසාන ප්‍රධාන රාජධානිය.',
    descriptionEn: 'Last major kingdom united by Parakramabahu VI.',
    coordinates: { x: 43, y: 56 },
    lessonId: 7,
    category: 'medieval',
  },
  {
    id: 13,
    name: 'කළඹ',
    nameEn: 'Colombo',
    event: 'යටත්විජිත අගනගරය',
    eventEn: 'Colonial Capital',
    period: 'ක්‍රි.ව. 1505-1948',
    description: 'පෘතුගීසි, ලන්දේසි සහ බ්‍රිතාන්‍ය යටත්විජිත අගනගරය.',
    descriptionEn: 'Portuguese, Dutch and British colonial capital.',
    coordinates: { x: 43, y: 57 },
    lessonId: 8,
    category: 'colonial',
  },
  {
    id: 14,
    name: 'ගාල්ල',
    nameEn: 'Galle',
    event: 'පෘතුගීසි ආගමනය',
    eventEn: 'Portuguese Arrival',
    period: 'ක්‍රි.ව. 1505',
    description: '1505 පෘතුගීසින් ලොරෙන්සෝ ද අල්මෙයිඩා යටතේ පැමිණියේ මෙහිදී.',
    descriptionEn: 'Portuguese under Lorenzo de Almeida arrived here in 1505.',
    coordinates: { x: 47, y: 68 },
    lessonId: 7,
    category: 'colonial',
  },
  {
    id: 15,
    name: 'මහනුවර',
    nameEn: 'Kandy',
    event: 'කඳුරට රාජධානිය',
    eventEn: 'Kandyan Kingdom',
    period: 'ක්‍රි.ව. 1469-1815',
    description: 'අවසාන ස්වාධීන සිංහල රාජධානිය. 1815 කැන්ඩි් එකගත්ම බලපත්‍රය.',
    descriptionEn: 'Last independent Sinhala kingdom. 1815 Kandyan Convention.',
    coordinates: { x: 48, y: 48 },
    lessonId: 9,
    category: 'colonial',
  },
  {
    id: 16,
    name: 'නුවරඑළිය',
    nameEn: 'Nuwara Eliya',
    event: 'තේ වතු යුගය',
    eventEn: 'Tea Plantation Era',
    period: 'ක්‍රි.ව. 1867',
    description: 'ජේම්ස් ටේලර් විසින් ලුලේකොන්දෙර තේ වතු ආරම්භ කළේය.',
    descriptionEn: 'James Taylor started tea plantations in Loolecondera.',
    coordinates: { x: 47, y: 54 },
    lessonId: 10,
    category: 'colonial',
  },
  {
    id: 17,
    name: 'ත්‍රිකුණාමලය',
    nameEn: 'Trincomalee',
    event: 'යුද්ධ වරාය',
    eventEn: 'Strategic Harbor',
    period: 'ක්‍රි.ව. 1600-1950',
    description: 'යටත්විජිත බලවතුන් අතර තරඟකාරී වරාය නගරය.',
    descriptionEn: 'Harbor city contested by colonial powers.',
    coordinates: { x: 58, y: 28 },
    category: 'colonial',
  },
  {
    id: 18,
    name: 'හොරණ',
    nameEn: 'Horana',
    event: 'රබර් වතු',
    eventEn: 'Rubber Plantations',
    period: 'ක්‍රි.ව. 1876',
    description: '1876 ශ්‍රී ලංකාවට රබර් පැළ ගෙන එන ලදී.',
    descriptionEn: 'Rubber plants brought to Sri Lanka in 1876.',
    coordinates: { x: 45, y: 60 },
    lessonId: 10,
    category: 'modern',
  },
];

const WORLD_LOCATIONS: WorldLocation[] = [
  {
    id: 1,
    name: 'පාරිස්',
    nameEn: 'Paris',
    event: 'පාරිස් රාජධානිය',
    eventEn: 'Capital of France',
    period: 'ක්‍රි.පූ. 300',
    description: 'පාරිස් රාජධානිය සහ පාරිස් පාලාත්‍රයේ මාදිය.',
    descriptionEn: 'Capital of France and the heart of Parisian culture.',
    coordinates: { x: 50, y: 50 },
    category: 'europe',
  },
  {
    id: 2,
    name: 'නියුවාල් ලියෝලා',
    nameEn: 'New York City',
    event: 'අත්‍යන්ත ප්‍රධාන අගනගරය',
    eventEn: 'Major City',
    period: 'ක්‍රි.ව. 1625',
    description: 'අත්‍යන්ත ප්‍රධාන අගනගරය සහ පාරිශාදික ප්‍රධාන අගනගරය.',
    descriptionEn: 'Major city and political capital.',
    coordinates: { x: 55, y: 55 },
    category: 'americas',
  },
  {
    id: 3,
    name: 'කොළඹ',
    nameEn: 'Colombo',
    event: 'යටත්විජිත අගනගරය',
    eventEn: 'Colonial Capital',
    period: 'ක්‍රි.ව. 1505-1948',
    description: 'පෘතුගීසි, ලන්දේසි සහ බ්‍රිතාන්‍ය යටත්විජිත අගනගරය.',
    descriptionEn: 'Portuguese, Dutch and British colonial capital.',
    coordinates: { x: 43, y: 57 },
    lessonId: 8,
    category: 'colonial',
  },
  {
    id: 4,
    name: 'ගාල්ල',
    nameEn: 'Galle',
    event: 'පෘතුගීසි ආගමනය',
    eventEn: 'Portuguese Arrival',
    period: 'ක්‍රි.ව. 1505',
    description: '1505 පෘතුගීසින් ලොරෙන්සෝ ද අල්මෙයිඩා යටතේ පැමිණියේ මෙහිදී.',
    descriptionEn: 'Portuguese under Lorenzo de Almeida arrived here in 1505.',
    coordinates: { x: 47, y: 68 },
    lessonId: 7,
    category: 'colonial',
  },
  {
    id: 5,
    name: 'මහනුවර',
    nameEn: 'Kandy',
    event: 'කඳුරට රාජධානිය',
    eventEn: 'Kandyan Kingdom',
    period: 'ක්‍රි.ව. 1469-1815',
    description: 'අවසාන ස්වාධීන සිංහල රාජධානිය. 1815 කැන්ඩි් එකගත්ම බලපත්‍රය.',
    descriptionEn: 'Last independent Sinhala kingdom. 1815 Kandyan Convention.',
    coordinates: { x: 48, y: 48 },
    lessonId: 9,
    category: 'colonial',
  },
  {
    id: 6,
    name: 'නුවරඑළිය',
    nameEn: 'Nuwara Eliya',
    event: 'තේ වතු යුගය',
    eventEn: 'Tea Plantation Era',
    period: 'ක්‍රි.ව. 1867',
    description: 'ජේම්ස් ටේලර් විසින් ලුලේකොන්දෙර තේ වතු ආරම්භ කළේය.',
    descriptionEn: 'James Taylor started tea plantations in Loolecondera.',
    coordinates: { x: 47, y: 54 },
    lessonId: 10,
    category: 'colonial',
  },
  {
    id: 7,
    name: 'ත්‍රිකුණාමලය',
    nameEn: 'Trincomalee',
    event: 'යුද්ධ වරාය',
    eventEn: 'Strategic Harbor',
    period: 'ක්‍රි.ව. 1600-1950',
    description: 'යටත්විජිත බලවතුන් අතර තරඟකාරී වරාය නගරය.',
    descriptionEn: 'Harbor city contested by colonial powers.',
    coordinates: { x: 58, y: 28 },
    category: 'colonial',
  },
  {
    id: 8,
    name: 'හොරණ',
    nameEn: 'Horana',
    event: 'රබර් වතු',
    eventEn: 'Rubber Plantations',
    period: 'ක්‍රි.ව. 1876',
    description: '1876 ශ්‍රී ලංකාවට රබර් පැළ ගෙන එන ලදී.',
    descriptionEn: 'Rubber plants brought to Sri Lanka in 1876.',
    coordinates: { x: 45, y: 60 },
    lessonId: 10,
    category: 'modern',
  },
];

const MAP_QUIZ_QUESTIONS: MapQuizQuestion[] = [
  {
    id: 1,
    question: 'විජය රජු ගොඩබැස්සේ කොතැනින්ද?',
    questionEn: 'Where did King Vijaya land?',
    locationId: 2,
    options: ['අනුරාධපුරය', 'මහියංගනය', 'කොළඹ', 'ත්‍රිකුණාමලය'],
    optionsEn: ['Anuradhapura', 'Mahiyangana', 'Colombo', 'Trincomalee'],
    correct_answer: 1,
  },
  {
    id: 2,
    question: 'මහින්ද මහරහතන් වහන්සේ රජු හමුවූ ස්ථානය?',
    questionEn: 'Where did Arahat Mahinda meet the king?',
    locationId: 5,
    options: ['අනුරාධපුරය', 'මිහින්තලේ', 'පොළොන්නරුව', 'කෑගල්ල'],
    optionsEn: ['Anuradhapura', 'Mihintale', 'Polonnaruwa', 'Kegalle'],
    correct_answer: 1,
  },
  {
    id: 3,
    question: 'පරාක්‍රම සමුද්‍රය පිහිටා ඇත්තේ කොහේද?',
    questionEn: 'Where is Parakrama Samudra located?',
    locationId: 8,
    options: ['අනුරාධපුරය', 'කෑගල්ල', 'පොළොන්නරුව', 'මහනුවර'],
    optionsEn: ['Anuradhapura', 'Kegalle', 'Polonnaruwa', 'Kandy'],
    correct_answer: 2,
  },
  {
    id: 4,
    question: 'පෘතුගීසින් 1505 පැමිණියේ කොතැනට ද?',
    questionEn: 'Where did the Portuguese arrive in 1505?',
    locationId: 14,
    options: ['කොළඹ', 'ගාල්ල', 'මන්නාරම', 'යාපනය'],
    optionsEn: ['Colombo', 'Galle', 'Mannar', 'Jaffna'],
    correct_answer: 1,
  },
  {
    id: 5,
    question: '1815 කැන්ඩි් එකගත්ම බලපත්‍රය අත්සන් කළේ කොහිදීද?',
    questionEn: 'Where was the 1815 Kandyan Convention signed?',
    locationId: 15,
    options: ['කොළඹ', 'කෝට්ටේ', 'මහනුවර', 'ගාල්ල'],
    optionsEn: ['Colombo', 'Kotte', 'Kandy', 'Galle'],
    correct_answer: 2,
  },
];

export function EnhancedHistoricalMap({ onBack }: { onBack: () => void }) {
  const { language } = useLanguage();
  const [selectedLocation, setSelectedLocation] = useState<HistoricalLocation | null>(null);
  const [hoveredLocation, setHoveredLocation] = useState<number | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [quizMode, setQuizMode] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const filteredLocations = filterCategory === 'all' 
    ? HISTORICAL_LOCATIONS 
    : HISTORICAL_LOCATIONS.filter(loc => loc.category === filterCategory);

  const handleQuizAnswer = (answerIndex: number) => {
    const currentQuestion = MAP_QUIZ_QUESTIONS[currentQuizIndex];
    const isCorrect = answerIndex === currentQuestion.correct_answer;
    
    setSelectedAnswer(answerIndex);
    
    if (isCorrect) {
      setQuizScore(prev => prev + 1);
      const location = HISTORICAL_LOCATIONS.find(loc => loc.id === currentQuestion.locationId);
      if (location) {
        setSelectedLocation(location);
      }
    }

    setTimeout(() => {
      if (currentQuizIndex < MAP_QUIZ_QUESTIONS.length - 1) {
        setCurrentQuizIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setSelectedLocation(null);
      } else {
        setShowResult(true);
      }
    }, 2000);
  };

  const resetQuiz = () => {
    setQuizMode(false);
    setCurrentQuizIndex(0);
    setQuizScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setSelectedLocation(null);
  };

  const currentQuestion = quizMode ? MAP_QUIZ_QUESTIONS[currentQuizIndex] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                ← {language === 'en' ? 'Back' : 'ආපසු'}
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {language === 'en' ? 'Historical Map' : 'ඉතිහාස සිතියම'}
                </h1>
                <p className="text-sm text-gray-600">
                  {language === 'en' ? 'Important historical locations of Sri Lanka' : 'ශ්‍රී ලංකා ඉතිහාසයේ වැදගත් ස්ථාන'}
                </p>
              </div>
            </div>
            <Button
              onClick={() => setQuizMode(!quizMode)}
              className={`${quizMode ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'} text-white`}
            >
              <Trophy className="w-4 h-4 mr-2" />
              {quizMode ? (language === 'en' ? 'Exit Quiz' : 'ප්‍රශ්න වලින් ඉවත් වන්න') : (language === 'en' ? 'Start Quiz' : 'ප්‍රශ්න ආරම්භ කරන්න')}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Filter */}
        <div className="mb-6 bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-semibold text-gray-700">
                {language === 'en' ? 'Filter by Period:' : 'කාල පරිච්ඡේදය අනුව:'}
              </span>
            </div>
            {['all', 'ancient', 'medieval', 'colonial', 'modern'].map((category) => (
              <button
                key={category}
                onClick={() => setFilterCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterCategory === category
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {language === 'en' 
                  ? category.charAt(0).toUpperCase() + category.slice(1)
                  : category === 'all' ? 'සියල්ල' 
                  : category === 'ancient' ? 'පුරාණ' 
                  : category === 'medieval' ? 'මධ්‍යකාලීන' 
                  : category === 'colonial' ? 'යටත්විජිත' 
                  : 'නවීන'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Map Area */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-green-600" />
                {language === 'en' ? 'Sri Lanka Map' : 'ශ්‍රී ලංකා සිතියම'}
              </h2>
              
              {/* SVG Map */}
              <div className="relative w-full aspect-[3/4] bg-gradient-to-br from-blue-100 to-green-100 rounded-lg overflow-hidden">
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full"
                  style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}
                >
                  <rect width="100" height="100" fill="#bfdbfe" />
                  
                  <path
                    d="M 45 10 Q 55 8, 60 15 L 65 30 Q 68 40, 65 50 L 60 65 Q 55 75, 48 80 Q 40 85, 35 80 L 30 70 Q 28 60, 30 50 L 35 35 Q 38 20, 45 10 Z"
                    fill="#86efac"
                    stroke="#16a34a"
                    strokeWidth="0.5"
                  />
                  
                  {filteredLocations.map((location) => {
                    const isSelected = selectedLocation?.id === location.id;
                    const isHovered = hoveredLocation === location.id;
                    
                    return (
                      <g key={location.id}>
                        <circle
                          cx={location.coordinates.x}
                          cy={location.coordinates.y}
                          r={isSelected ? 4 : isHovered ? 3 : 2}
                          fill={isSelected ? '#dc2626' : location.category === 'ancient' ? '#16a34a' : location.category === 'medieval' ? '#2563eb' : location.category === 'colonial' ? '#d97706' : '#8b5cf6'}
                          stroke="#fff"
                          strokeWidth="0.5"
                          className="cursor-pointer transition-all"
                          onClick={() => setSelectedLocation(location)}
                          onMouseEnter={() => setHoveredLocation(location.id)}
                          onMouseLeave={() => setHoveredLocation(null)}
                        />
                        {isHovered && (
                          <text
                            x={location.coordinates.x}
                            y={location.coordinates.y - 5}
                            fontSize="3"
                            fill="#1f2937"
                            textAnchor="middle"
                            className="font-bold pointer-events-none"
                          >
                            {language === 'en' ? location.nameEn : location.name}
                          </text>
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Legend */}
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                  {language === 'en' ? 'Map Legend' : 'සිතියම් සංකේත'}
                </h3>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-600"></div>
                    <span>{language === 'en' ? 'Ancient' : 'පුරාණ'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                    <span>{language === 'en' ? 'Medieval' : 'මධ්‍යකාලීන'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-amber-600"></div>
                    <span>{language === 'en' ? 'Colonial' : 'යටත්විජිත'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple-600"></div>
                    <span>{language === 'en' ? 'Modern' : 'නවීන'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-1">
            {quizMode && !showResult ? (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">
                    {language === 'en' ? 'Map Quiz' : 'සිතියම් ප්‍රශ්න'}
                  </h3>
                  <span className="text-sm text-gray-600">
                    {currentQuizIndex + 1}/{MAP_QUIZ_QUESTIONS.length}
                  </span>
                </div>

                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-600 mb-2">
                    {language === 'en' ? 'Score' : 'ලකුණු'}
                  </div>
                  <div className="text-2xl font-bold text-green-600">{quizScore}</div>
                </div>

                {currentQuestion && (
                  <div>
                    <p className="text-base font-semibold text-gray-900 mb-4">
                      {language === 'en' ? currentQuestion.questionEn : currentQuestion.question}
                    </p>

                    <div className="space-y-2">
                      {currentQuestion.options.map((_, index) => {
                        const isCorrect = index === currentQuestion.correct_answer;
                        const isSelected = selectedAnswer === index;
                        const showFeedback = selectedAnswer !== null;

                        return (
                          <button
                            key={index}
                            onClick={() => handleQuizAnswer(index)}
                            disabled={selectedAnswer !== null}
                            className={`w-full text-left p-3 rounded-lg border-2 transition-colors ${
                              showFeedback
                                ? isCorrect
                                  ? 'bg-green-100 border-green-600 text-green-900'
                                  : isSelected
                                  ? 'bg-red-100 border-red-600 text-red-900'
                                  : 'bg-gray-50 border-gray-200 text-gray-600'
                                : 'bg-white border-gray-200 hover:border-green-400 hover:bg-green-50'
                            }`}
                          >
                            {language === 'en' ? currentQuestion.optionsEn[index] : currentQuestion.options[index]}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ) : quizMode && showResult ? (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="text-center">
                  <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {language === 'en' ? 'Quiz Complete!' : 'ප්‍රශ්න අවසන්!'}
                  </h3>
                  <p className="text-lg text-gray-600 mb-4">
                    {language === 'en' ? 'Your Score:' : 'ඔබේ ලකුණු:'}
                  </p>
                  <div className="text-4xl font-bold text-green-600 mb-6">
                    {quizScore}/{MAP_QUIZ_QUESTIONS.length}
                  </div>
                  <p className="text-sm text-gray-600 mb-6">
                    {language === 'en' 
                      ? `You got ${Math.round((quizScore / MAP_QUIZ_QUESTIONS.length) * 100)}% correct!`
                      : `ඔබ ${Math.round((quizScore / MAP_QUIZ_QUESTIONS.length) * 100)}% නිවැරදියි!`}
                  </p>
                  <Button onClick={resetQuiz} className="w-full bg-green-600 hover:bg-green-700 text-white">
                    {language === 'en' ? 'Try Again' : 'නැවත උත්සාහ කරන්න'}
                  </Button>
                </div>
              </div>
            ) : selectedLocation ? (
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    {language === 'en' ? selectedLocation.nameEn : selectedLocation.name}
                  </h3>
                  <button
                    onClick={() => setSelectedLocation(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-semibold text-gray-500 mb-1">
                      {language === 'en' ? 'Event' : 'සිදුවීම'}
                    </div>
                    <div className="text-base text-gray-900">
                      {language === 'en' ? selectedLocation.eventEn : selectedLocation.event}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-semibold text-gray-500 mb-1">
                      {language === 'en' ? 'Period' : 'කාල පරිච්ඡේදය'}
                    </div>
                    <div className="text-base text-gray-900">{selectedLocation.period}</div>
                  </div>

                  <div>
                    <div className="text-sm font-semibold text-gray-500 mb-1">
                      {language === 'en' ? 'Description' : 'විස්තරය'}
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {language === 'en' ? selectedLocation.descriptionEn : selectedLocation.description}
                    </p>
                  </div>

                  {selectedLocation.lessonId && (
                    <div className="pt-4 border-t">
                      <button className="inline-flex items-center gap-2 text-sm text-green-600 hover:text-green-700 font-medium">
                        <Info className="w-4 h-4" />
                        {language === 'en' ? 'View Related Lesson' : 'සම්බන්ධිත පාඩම බලන්න'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  {language === 'en' ? 'Location List' : 'ස්ථාන ලැයිස්තුව'}
                </h3>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {filteredLocations.map((location) => (
                    <button
                      key={location.id}
                      onClick={() => setSelectedLocation(location)}
                      className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
                    >
                      <div className="font-semibold text-gray-900 text-sm">
                        {language === 'en' ? location.nameEn : location.name}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        {language === 'en' ? location.eventEn : location.event}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">
                {language === 'en' ? 'How to use the map?' : 'සිතියම භාවිතා කරන්නේ කෙසේද?'}
              </h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• {language === 'en' ? 'Click on location markers to view details' : 'ස්ථාන විස්තර බලන්න මාර්කර් මත click කරන්න'}</li>
                <li>• {language === 'en' ? 'Use the filter to view locations by time period' : 'කාල පරිච්ඡේදය අනුව ස්ථාන බලන්න filter භාවිතා කරන්න'}</li>
                <li>• {language === 'en' ? 'Start the quiz to test your knowledge' : 'ඔබේ දැනුම පරීක්ෂා කරන්න ප්‍රශ්න ආරම්භ කරන්න'}</li>
                <li>• {language === 'en' ? 'Explore 18 important historical locations' : 'වැදගත් ඉතිහාස ස්ථාන 18ක් ගවේෂණය කරන්න'}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}