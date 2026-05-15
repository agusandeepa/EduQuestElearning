import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Send,
  User,
  Loader2,
  Trash2,
  Sparkles,
  Crown,
  Swords,
  ArrowLeft,
  MessageCircle
} from 'lucide-react';
import { Button } from './ui/button';
import { aiChatService, ChatMessage, HistoricalFigure } from '../../services/aiChatService';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../hooks/useAuth';

export function HistoricalRoleplay({ onBack }: { onBack: () => void }) {
  const { language } = useLanguage();
  const { user } = useAuth();
  
  const [selectedFigure, setSelectedFigure] = useState<HistoricalFigure | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const historicalFigures = aiChatService.getHistoricalFigures();

  const content = language === 'en' ? {
    title: 'Talk to Historical Figures',
    subtitle: 'Have a conversation with legendary Sri Lankan heroes and leaders!',
    selectPrompt: 'Choose a historical figure to chat with:',
    backButton: 'Choose Different Figure',
    placeholder: 'Ask me anything...',
    send: 'Send',
    clear: 'Clear Chat',
    thinking: 'is thinking...',
    chatWith: 'Chatting with',
    empty: 'Start the conversation! Ask about their life, decisions, or era.',
    suggestions: {
      title: 'Conversation Starters:',
      vijaya: [
        'Why did you come to Sri Lanka?',
        'Tell me about Kuveni',
        'What was your greatest challenge?'
      ],
      dutugemunu: [
        'Why did you fight King Elara?',
        'Tell me about the Ruwanwelisaya',
        'What inspired you?'
      ],
      parakramabahu: [
        'Why did you build so many tanks?',
        'What was your vision for Sri Lanka?',
        'Tell me about your achievements'
      ],
      keppetipola: [
        'Why did you rebel against the British?',
        'What motivated your sacrifice?',
        'Do you have any regrets?'
      ],
      senanayake: [
        'How did you achieve independence peacefully?',
        'What was your vision for Ceylon?',
        'What challenges did you face?'
      ],
      anula: [
        'How did you become Queen?',
        'What challenges did you face as a female ruler?',
        'Tell me about your reign'
      ]
    }
  } : {
    title: 'ඓතිහාසික චරිත සමඟ කතා කරන්න',
    subtitle: 'ශ්‍රී ලංකාවේ පුරාවෘත්තමය වීරයන් හා නායකයන් සමඟ සංවාදයක නිරත වන්න!',
    selectPrompt: 'කතා කිරීමට ඓතිහාසික චරිතයක් තෝරන්න:',
    backButton: 'වෙනත් චරිතයක් තෝරන්න',
    placeholder: 'ඕනෑම දෙයක් අහන්න...',
    send: 'යවන්න',
    clear: 'Chat එක මකන්න',
    thinking: 'සිතමින්...',
    chatWith: 'සමඟ කතාබස්',
    empty: 'සංවාදය ආරම්භ කරන්න! ඔවුන්ගේ ජීවිතය, තීරණ හෝ යුගය ගැන අහන්න.',
    suggestions: {
      title: 'සංවාද ආරම්භක:',
      vijaya: [
        'ඔබ ශ්‍රී ලංකාවට ආවේ ඇයි?',
        'කුවේණි ගැන කියන්න',
        'ඔබේ ලොකුම අභියෝගය මොකද්ද?'
      ],
      dutugemunu: [
        'ඔබ එළාර රජුට එරෙහිව සටන් කළේ ඇයි?',
        'රුවන්වැලි සෑය ගැන කියන්න',
        'ඔබට ප්‍රේරණය වුණේ මොකෙන්ද?'
      ],
      parakramabahu: [
        'ඔබ මෙතරම් වැව් ඉදිකළේ ඇයි?',
        'ශ්‍රී ලංකාව සඳහා ඔබේ දැක්ම මොකද්ද?',
        'ඔබේ ජයග්‍රහණ ගැන කියන්න'
      ],
      keppetipola: [
        'ඔබ බ්‍රිතාන්‍යයන්ට එරෙහිව කැරැල්ල ඇති කළේ ඇයි?',
        'ඔබේ පරිත්‍යාගයට ප්‍රේරණය වුණේ මොකෙන්ද?',
        'ඔබට පසුතැවිලිද?'
      ],
      senanayake: [
        'ඔබ සාමකාමීව නිදහස ලබා ගත්තේ කොහොමද?',
        'ලංකාව සඳහා ඔබේ දැක්ම මොකද්ද?',
        'ඔබ මුහුණ දුන් අභියෝග මොනවාද?'
      ],
      anula: [
        'ඔබ රජිනි වුණේ ඇයි?',
        'ස්ත්‍රී රජුවක් ලෙස ප්‍රධාන වුණේ අභියෝග මොනවාද?',
        'ඔබේ රජාව ගැන කියන්න'
      ]
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSelectFigure = (figure: HistoricalFigure) => {
    setSelectedFigure(figure);
    setMessages([]);
    
    if (user) {
      aiChatService.initializeContext(String(user.id), 'roleplay', language, undefined, figure.id);
      
      // Add welcome message from the character
      const welcomeContent = language === 'en'
        ? `*${figure.name.en} appears before you*\n\nGreetings, seeker of knowledge! I am ${figure.name.en}, ${figure.title.en}. I lived during ${figure.period}.\n\n${figure.description.en}\n\nAsk me anything about my life, my times, or my decisions. I will speak to you from the heart, sharing both my triumphs and my regrets.`
        : `*${figure.name.si} ඔබ ඉදිරියට පැමිණේ*\n\nආයුබෝවන්, දැනුම් සොයන්නා! මම ${figure.name.si}, ${figure.title.si}. මම ජීවත් වුණේ ${figure.period} කාලයේ.\n\n${figure.description.si}\n\nමගේ ජීවිතය, මගේ කාලය හෝ මගේ තීරණ ගැන ඕනෑම දෙයක් අහන්න. මම ඔබට හදවතින්ම කතා කරමින්, මගේ ජයග්‍රහණ සහ පසුතැවිලි දෙකම බෙදා ගන්නම්.`;

      const welcomeMsg: ChatMessage = {
        id: 'welcome',
        role: 'assistant',
        content: welcomeContent,
        timestamp: new Date(),
        language
      };
      setMessages([welcomeMsg]);
    }
  };

  const handleBackToSelection = () => {
    setSelectedFigure(null);
    setMessages([]);
    if (user) {
      aiChatService.clearConversation(String(user.id));
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading || !user || !selectedFigure) return;

    const userMsg = inputMessage.trim();
    setInputMessage('');
    setIsLoading(true);

    try {
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'user',
        content: userMsg,
        timestamp: new Date(),
        language
      };
      setMessages(prev => [...prev, userMessage]);

      const aiResponse = await aiChatService.sendMessage(String(user.id), userMsg, language);
      setMessages(prev => [...prev, aiResponse]);

    } catch (error) {
      console.error('Chat error:', error);
      const errorMsg: ChatMessage = {
        id: Date.now().toString(),
        role: 'assistant',
        content: language === 'en' 
          ? 'Forgive me, I seem to have lost my voice for a moment. Ask again?'
          : 'සමාවන්න, මට මොහොතකට මගේ හඬ අහිමි වුනා. නැවත අහන්නද?',
        timestamp: new Date(),
        language
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleClearChat = () => {
    if (user && selectedFigure) {
      aiChatService.clearConversation(String(user.id));
      aiChatService.initializeContext(String(user.id), 'roleplay', language, undefined, selectedFigure.id);
      
      const welcomeContent = language === 'en'
        ? `*${selectedFigure.name.en} nods*\n\nLet us begin anew. Ask me your questions, and I shall answer truthfully.`
        : `*${selectedFigure.name.si} හිස නමයි*\n\nදැන් අලුතින් පටන් ගනිමු. ඔබේ ප්‍රශ්න අහන්න, මම සත්‍යයෙන් පිළිතුරු දෙන්නම්.`;

      const welcomeMsg: ChatMessage = {
        id: 'welcome-' + Date.now(),
        role: 'assistant',
        content: welcomeContent,
        timestamp: new Date(),
        language
      };
      setMessages([welcomeMsg]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getSuggestions = (figureId: string): string[] => {
    const suggestionMap: { [key: string]: string[] } = {
      vijaya: content.suggestions.vijaya,
      dutugemunu: content.suggestions.dutugemunu,
      parakramabahu: content.suggestions.parakramabahu,
      keppetipola: content.suggestions.keppetipola,
      senanayake: content.suggestions.senanayake,
      anula: content.suggestions.anula
    };
    return suggestionMap[figureId] || [];
  };

  // Character Selection Screen
  if (!selectedFigure) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-3xl p-8 mb-8 shadow-xl">
            <Button
              onClick={onBack}
              variant="outline"
              className="mb-4 bg-white/20 text-white border-white/30 hover:bg-white/30"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {language === 'en' ? 'Back to Home' : 'මුල් පිටුවට'}
            </Button>
            
            <div className="flex items-center gap-3 mb-3">
              <Crown className="w-10 h-10" />
              <h1 className="text-4xl font-bold">{content.title}</h1>
            </div>
            <p className="text-white/90 text-lg">{content.subtitle}</p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-6">{content.selectPrompt}</h2>

          {/* Character Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {historicalFigures.map((figure, index) => (
              <motion.button
                key={figure.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                onClick={() => handleSelectFigure(figure)}
                className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all text-left group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={figure.image}
                    alt={figure.name[language]}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-1">{figure.name[language]}</h3>
                    <p className="text-white/90 text-sm">{figure.title[language]}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 mb-3">{figure.description[language]}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-indigo-600">{figure.period}</span>
                    <Sparkles className="w-5 h-5 text-indigo-600 group-hover:scale-125 transition-transform" />
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Chat Screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header with character info */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-3xl p-6 mb-8 shadow-xl">
          <Button
            onClick={handleBackToSelection}
            variant="outline"
            className="mb-4 bg-white/20 text-white border-white/30 hover:bg-white/30"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {content.backButton}
          </Button>
          
          <div className="flex items-center gap-4">
            <img
              src={selectedFigure.image}
              alt={selectedFigure.name[language]}
              className="w-20 h-20 rounded-full object-cover border-4 border-white/30"
            />
            <div>
              <h2 className="text-3xl font-bold mb-1">{content.chatWith} {selectedFigure.name[language]}</h2>
              <p className="text-white/90">{selectedFigure.title[language]} • {selectedFigure.period}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chat Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              {/* Messages */}
              <div className="h-[600px] overflow-y-auto p-6 space-y-4">
                <AnimatePresence>
                  {messages.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center text-gray-400 py-20"
                    >
                      <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>{content.empty}</p>
                    </motion.div>
                  ) : (
                    messages.map((msg, index) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        {msg.role === 'assistant' && (
                          <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden border-2 border-indigo-200">
                            <img
                              src={selectedFigure.image}
                              alt={selectedFigure.name[language]}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        
                        <div
                          className={`max-w-[80%] p-4 rounded-2xl ${
                            msg.role === 'user'
                              ? 'bg-gradient-to-br from-green-500 to-blue-500 text-white'
                              : 'bg-gradient-to-br from-indigo-50 to-purple-50 text-gray-900 border-2 border-indigo-100'
                          }`}
                        >
                          <div className="whitespace-pre-wrap break-words">{msg.content}</div>
                          <div className="text-xs mt-2 opacity-70">
                            {msg.timestamp.toLocaleTimeString(language === 'si' ? 'si-LK' : 'en-US', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        </div>

                        {msg.role === 'user' && (
                          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-white" />
                          </div>
                        )}
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-3"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden border-2 border-indigo-200">
                      <img
                        src={selectedFigure.image}
                        alt={selectedFigure.name[language]}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="bg-indigo-50 p-4 rounded-2xl border-2 border-indigo-100">
                      <div className="flex items-center gap-2 text-indigo-600">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>{selectedFigure.name[language]} {content.thinking}</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t bg-gray-50 p-4">
                <div className="flex gap-3">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={content.placeholder}
                    disabled={isLoading}
                    className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none disabled:opacity-50"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 px-6"
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                  <Button
                    onClick={handleClearChat}
                    variant="outline"
                    disabled={isLoading}
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Suggestions Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Swords className="w-6 h-6 text-indigo-600" />
                {content.suggestions.title}
              </h3>
              <div className="space-y-2">
                {getSuggestions(selectedFigure.id).map((suggestion, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setInputMessage(suggestion)}
                    className="w-full text-left px-4 py-3 bg-indigo-50 hover:bg-indigo-100 rounded-xl text-sm text-gray-700 transition-colors"
                  >
                    {suggestion}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-6 border-2 border-indigo-200">
              <h4 className="font-bold text-gray-900 mb-3">
                {language === 'en' ? 'About This Figure:' : 'මෙම චරිතය ගැන:'}
              </h4>
              <p className="text-sm text-gray-700 mb-4">{selectedFigure.description[language]}</p>
              <div className="space-y-2">
                <p className="text-xs font-semibold text-indigo-600 uppercase">
                  {language === 'en' ? 'Key Events:' : 'ප්‍රධාන සිදුවීම්:'}
                </p>
                <ul className="text-sm text-gray-700 space-y-1">
                  {selectedFigure.keyEvents.map((event, i) => (
                    <li key={i}>• {event}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}