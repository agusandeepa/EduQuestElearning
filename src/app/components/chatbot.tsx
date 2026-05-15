import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X, Send, Minimize2, Bot, User } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "../../contexts/LanguageContext";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export function Chatbot() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: language === 'en' 
        ? "Hi! I'm your Sri Lankan History AI Assistant. Ask me anything about our rich history! 🏛️"
        : "ආයුබෝවන්! මම ඔබේ ශ්‍රී ලංකා ඉතිහාස AI සහායකයා. අපේ ඉතිහාසය ගැන ඕනෑම දෙයක් අහන්න! 🏛️",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Update welcome message when language changes
  useEffect(() => {
    setMessages([{
      id: 1,
      text: language === 'en' 
        ? "Hi! I'm your Sri Lankan History AI Assistant. Ask me anything about our rich history! 🏛️"
        : "ආයුබෝවන්! මම ඔබේ ශ්‍රී ලංකා ඉතිහාස AI සහායකයා. අපේ ඉතිහාසය ගැන ඕනෑම දෙයක් අහන්න! 🏛️",
      sender: "bot",
      timestamp: new Date(),
    }]);
  }, [language]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputValue("");

    // Simulate bot response with typing delay
    setTimeout(() => {
      const botResponse = getBotResponse(inputValue);
      const botMessage: Message = {
        id: Date.now() + 1,
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 800);
  };

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();

    // Detect if query is in Sinhala or English and respond accordingly
    const isSinhalaQuery = /[\u0D80-\u0DFF]/.test(userInput);
    
    // King Vijaya / විජය රජු
    if (input.includes("vijaya") || input.includes("විජය")) {
      return isSinhalaQuery || language === 'si'
        ? "විජය රජු ක්‍රි.පූ. 543 දී ශ්‍රී ලංකාවට පැමිණියා. ඔහු උතුරු ඉන්දියාවේ සිංහපුරයේ සිංහබාහු රජුගේ පුත්‍රයා වුණා. විජය රජු කුවේණි සමග විවාහ වී පසුව පාණ්ඩු වාසුදේව රජුගේ දියණිය සමග විවාහ වුණා. ඔහු තඹපණ්ණි (මන්නාරම) අගනුවර කර සිංහල ජාතියේ පදනම ගැහුවා. 🏛️"
        : "King Vijaya arrived in Sri Lanka in 543 BC from Sinhapura in North India. He was the son of King Sinhabahu. Vijaya married Kuveni and later married the daughter of King Pandu Vasudeva. He established his capital at Tambapanni (Mannar) and founded the Sinhalese nation. 🏛️";
    }

    // Anuradhapura / අනුරාධපුර
    if (input.includes("anuradhapura") || input.includes("අනුරාධපුර")) {
      return isSinhalaQuery || language === 'si'
        ? "අනුරාධපුර යුගය ක්‍රි.පූ. 377 සිට ක්‍රි.ව. 1017 දක්වා පැවතුණා. පණ්ඩුකාභය රජු විසින් අනුරාධපුරය අගනුවර කරන ලදී. මේ යුගයේ දේවානම්පියතිස්ස, දුටුගැමුණු, වලගම්බා, වසභ වැනි ශ්‍රේෂ්ඨ රජවරු සිටියා. රුවන්වැලි සෑය, ජේතවනාරාමය, අභයගිරිය වැනි මහා ස්ථූප ගොඩනැගුණා. 📿"
        : "The Anuradhapura period lasted from 377 BC to 1017 AD. King Pandukabhaya made Anuradhapura the capital. Great kings like Devanampiyatissa, Dutugemunu, Valagamba, and Vasabha ruled during this era. Magnificent stupas like Ruwanweliseya, Jetavanaramaya, and Abhayagiriya were built. 📿";
    }

    // Polonnaruwa / පොළොන්නරුව
    if (input.includes("polonnaruwa") || input.includes("පොළොන්නරුව") || input.includes("parakramabahu") || input.includes("පරාක්‍රමබාහු")) {
      return isSinhalaQuery || language === 'si'
        ? "පොළොන්නරුව යුගය 1056-1236 දක්වා පැවතුණා. මේ යුගයේ විජයබාහු I, පරාක්‍රමබාහු මහා රජු, නිශ්ශංකමල්ල වැනි රජවරු සිටියා. පරාක්‍රමබාහු මහා රජු පරාක්‍රම සමුද්‍රය ගොඩනැගුවා. ගල්විහාරය, වතදාගේ, ලංකාතිලක වැනි අපූරු ස්මාරක තිබෙනවා. 🏛️"
        : "The Polonnaruwa period lasted from 1056-1236 AD. Great kings like Vijayabahu I, Parakramabahu the Great, and Nissankamalla ruled during this era. King Parakramabahu built the Parakrama Samudra reservoir. Beautiful monuments like Gal Vihara, Vatadage, and Lankatilaka can be seen there. 🏛️";
    }

    // Sigiriya / සීගිරිය
    if (input.includes("sigiriya") || input.includes("සීගිරිය") || input.includes("kashyapa") || input.includes("කාශ්‍යප")) {
      return isSinhalaQuery || language === 'si'
        ? "සීගිරිය කාශ්‍යප රජු විසින් ක්‍රි.ව. 477-495 අතර ගොඩනැඟුණා. ඔහු තම පියා දාතුසේන මහරජු මරා සිටිය අතර මෝගලාන සොහොයුරා බිය නිසා සීගිරිය බලකොටුවක් ලෙස ගොඩනැගුවා. සීගිරි සිතුවම්, දර්පණ තලය, සිංහ දොරටුව ලෝ ප්‍රසිද්ධයි. UNESCO ලෝක උරුම ස්ථානයක්. 🦁"
        : "Sigiriya was built by King Kashyapa between 477-495 AD. He killed his father King Dhatusena and built Sigiriya as a fortress, fearing his brother Moggallana. The Sigiriya frescoes, Mirror Wall, and Lion Gate are world-famous. It's a UNESCO World Heritage Site. 🦁";
    }

    // Kandyan Kingdom / මහනුවර රාජධානිය
    if (input.includes("kandy") || input.includes("මහනුවර") || input.includes("kandyan") || input.includes("sri wickrama")) {
      return isSinhalaQuery || language === 'si'
        ? "කදිම්රාජ්‍ය යනු 1469-1815 දක්වා පැවති අවසන් සිංහල රාජධානියයි. මහනුවර අගනුවර වුණා. 1815 දී ශ්‍රී වික්‍රම රාජසිංහ අවසන් රජු බ්‍රිතාන්‍යයන්ට යටත් වුණා. දළදා මාලිගාව, මහනුවර කදිම රාජධානියේ ප්‍රධාන ස්ථානයක්. 👑"
        : "The Kandyan Kingdom was the last Sinhalese kingdom, lasting from 1469-1815. Kandy was the capital. In 1815, the last king Sri Wickrama Rajasinghe was overthrown by the British. The Temple of the Tooth (Dalada Maligawa) is the main landmark of the Kandyan Kingdom. 👑";
    }

    // Buddhism / බුද්ධාගම
    if (input.includes("buddhism") || input.includes("බුද්ධාගම") || input.includes("mahinda") || input.includes("මහින්ද")) {
      return isSinhalaQuery || language === 'si'
        ? "බුදුදහම ශ්‍රී ලංකාවට ක්‍රි.පූ. 307 දී පැමිණියා. අරහත් මහින්ද මහ තෙරණ විසින් දේවානම්පියතිස්ස රජුට බුදුදහම හඳුන්වා දෙන ලදී. මිහින්තලේ දී මහා මෙත්වරණය සිදු විය. ශ්‍රී මහා බෝධිය, දළදා දාතුන්, ජයශ්‍රී මහා බෝධිය වැනි ශ්‍රී බුදුරදුන්ගේ ශාස්තෘන් පදනම් අප රටේ තිබෙනවා. ☸️"
        : "Buddhism arrived in Sri Lanka in 307 BC through Arahath Mahinda Thero. He introduced Buddhism to King Devanampiyatissa at Mihintale. Sri Lanka has sacred Buddhist relics including Sri Maha Bodhi tree, Tooth Relic, and many ancient temples. ☸️";
    }

    // Independence / නිදහස
    if (input.includes("independence") || input.includes("නිදහස") || input.includes("1948") || input.includes("senanayake") || input.includes("සෙනානායක")) {
      return isSinhalaQuery || language === 'si'
        ? "ශ්‍රී ලංකාව 1948 පෙබරවාරි 4 වන දින බ්‍රිතාන්‍ය පාලනයෙන් නිදහස ලබා ගත්තා. ඩී.එස්. සේනානායක මහතා පළමු අගමැති වුණා. ශ්‍රී ලංකාව ඉන්දියාවට පසුව දකුණු ආසියාවේ නිදහස ලබා ගත් දෙවන රට විය. 🇱🇰"
        : "Sri Lanka gained independence from British rule on February 4, 1948. D.S. Senanayake became the first Prime Minister. Sri Lanka was the second country in South Asia to gain independence after India. 🇱🇰";
    }

    // Colonial Period / යටත් විජිත යුගය
    if (input.includes("colonial") || input.includes("යටත් විජිත") || input.includes("portuguese") || input.includes("dutch") || input.includes("british")) {
      return isSinhalaQuery || language === 'si'
        ? "යටත් විජිත යුගය තුන් කාල පරිච්ඡේදවලින් සමන්විත විය:\n🇵🇹 පෘතුගීසි යුගය (1505-1658)\n🇳🇱 ලන්දේසි යුගය (1658-1796)\n🇬🇧 බ්‍රිතාන්‍ය යුගය (1796-1948)\nයුරෝපීයයන් විසින් කුළුබඩු වෙළඳාම, කෝපි, තේ වගාවන් හඳුන්වා දෙන ලදී."
        : "The Colonial Period had three phases:\n🇵🇹 Portuguese (1505-1658)\n🇳🇱 Dutch (1658-1796)\n🇬🇧 British (1796-1948)\nEuropeans introduced spice trade, coffee and tea plantations to Sri Lanka.";
    }

    // Dutugemunu / දුටුගැමුණු
    if (input.includes("dutugemunu") || input.includes("දුටුගැමුණු") || input.includes("elara") || input.includes("එළාර")) {
      return isSinhalaQuery || language === 'si'
        ? "දුටුගැමුණු රජු (ක්‍රි.පූ. 161-137) ශ්‍රී ලංකා ඉතිහාසයේ ශ්‍රේෂ්ඨතම රජවරුන්ගෙන් කෙනෙක්. ඔහු එළාර රජු පරාජය කර රට එක්සත් කළා. රුවන්වැලි සෑය, මිරිසවැටිය ඔහු විසින් ගොඩනැඟුණා. ඔහුගේ 10 මහා යෝධයන් ප්‍රසිද්ධයි. ⚔️"
        : "King Dutugemunu (161-137 BC) was one of Sri Lanka's greatest kings. He defeated King Elara and united the country. He built the Ruwanweliseya and Mirisavetiya stupas. His 10 giant warriors are legendary. ⚔️";
    }

    // Ancient civilizations / පුරාණ ශිෂ්ටාචාර
    if (input.includes("civilization") || input.includes("ශිෂ්ටාචාර") || input.includes("stone age") || input.includes("ගල් යුගය")) {
      return isSinhalaQuery || language === 'si'
        ? "ශ්‍රී ලංකාවේ ප්‍රාග් ඓතිහාසික යුගය:\n🗿 පැලියොලිතික යුගය (ක්‍රි.පූ. 500,000-37,000) - ෆා-හියන් ලෙන, බටදොඹලෙන\n🏺 මෙසොලිතික යුගය (ක්‍රි.පූ. 37,000-2,900) - බලන්ගොඩ මිනිසා\n🌾 නියොලිතික යුගය (ක්‍රි.පූ. 2,900-900) - කෘෂිකර්මාන්තය ආරම්භය"
        : "Sri Lankan Prehistoric Period:\n🗿 Paleolithic (500,000-37,000 BC) - Fa-Hien Cave, Batadombalena\n🏺 Mesolithic (37,000-2,900 BC) - Balangoda Man\n🌾 Neolithic (2,900-900 BC) - Beginning of Agriculture";
    }

    // General help / උදව්
    if (input.includes("help") || input.includes("උදව්") || input.includes("what can you") || input.includes("මොනවද කියන්න")) {
      return isSinhalaQuery || language === 'si'
        ? "මට ඔබට උදව් කළ හැකි දේවල්:\n📚 ශ්‍රී ලංකා ඉතිහාසය (විජය රජුගේ සිට නිදහස දක්වා)\n🏛️ පුරාණ රාජධානි (අනුරාධපුර, පොළොන්නරුව, මහනුවර)\n👑 ශ්‍රේෂ්ඨ රජවරු සහ රැජින\n🗿 පුරාවිද්‍යාව සහ ස්මාරක\n☸️ බුද්ධාගමේ ඉතිහාසය\n🇱🇰 යටත් විජිත යුගය සහ නිදහස\n\nඔබට දැන ගැනීමට අවශ්‍ය දෙයක් විමසන්න!"
        : "I can help you with:\n📚 Sri Lankan History (King Vijaya to Independence)\n🏛️ Ancient Kingdoms (Anuradhapura, Polonnaruwa, Kandy)\n👑 Great Kings and Queens\n🗿 Archaeology and Monuments\n☸️ Buddhist History\n🇱🇰 Colonial Period and Independence\n\nAsk me anything you'd like to know!";
    }

    // Greetings / ආචාර
    if (input.includes("hello") || input.includes("hi") || input.includes("ආයුබෝවන්") || input.includes("හලෝ") || input.includes("හායි")) {
      return isSinhalaQuery || language === 'si'
        ? "ආයුබෝවන්! 👋 ඔබට අද ඉතිහාසය ගැන දැන ගන්න සූදානමින් ද? මට ශ්‍රී ලංකා ඉතිහාසය ගැන ඕනෑම දෙයක් අහන්න පුළුවන්! විජය රජු, දුටුගැමුණු, සීගිරිය, අනුරාධපුර, නිදහස - මොනවා ගැනද දැන ගන්න ඕන?"
        : "Hello! 👋 Ready to explore Sri Lankan history today? Ask me anything about King Vijaya, Dutugemunu, Sigiriya, Anuradhapura, Independence, or any historical topic!";
    }

    // Thank you / ස්තූතියි
    if (input.includes("thank") || input.includes("ස්තූති") || input.includes("බොහොම")) {
      return isSinhalaQuery || language === 'si'
        ? "සාදරයෙන්! 😊 ඔබට තව ප්‍රශ්න තිබේ නම් විමසන්න. ඉගෙනීම දිගටම කරගෙන යන්න! 📚"
        : "You're welcome! 😊 Feel free to ask more questions. Keep learning! 📚";
    }

    // Default response
    return isSinhalaQuery || language === 'si'
      ? "ඒක හොඳ ප්‍රශ්නයක්! 🤔 මට ශ්‍රී ලංකා ඉතිහාසය ගැන - විජය රජු, අනුරාධපුර, පොළොන්නරුව, සීගිරිය, දුටුගැමුණු, මහනුවර රාජධානිය, නිදහස ආදිය ගැන කියන්න පුළුවන්. නිශ්චිත කරුණක් විමසන්න!"
      : "That's a great question! 🤔 I can help you with Sri Lankan history topics like King Vijaya, Anuradhapura, Polonnaruwa, Sigiriya, Dutugemunu, Kandyan Kingdom, Independence, and more. Try asking about a specific topic!";
  };

  const translations = {
    en: {
      title: "History AI Assistant",
      subtitle: "Ask me anything about Sri Lankan history!",
      placeholder: "Type your question...",
      send: "Send",
    },
    si: {
      title: "ඉතිහාස AI සහායකයා",
      subtitle: "ශ්‍රී ලංකා ඉතිහාසය ගැන ඕනෑම දෙයක් අහන්න!",
      placeholder: "ඔබේ ප්‍රශ්නය ටයිප් කරන්න...",
      send: "යවන්න",
    },
  };

  const t = translations[language];

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full shadow-2xl flex items-center justify-center z-50 hover:shadow-xl transition-shadow"
          >
            <MessageCircle className="w-7 h-7" />
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold animate-pulse">
              AI
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-6 right-6 w-96 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col"
            style={{ height: isMinimized ? "60px" : "600px" }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-blue-500 p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-2xl">
                  🤖
                </div>
                <div>
                  <h3 className="font-bold">{t.title}</h3>
                  <p className="text-xs text-green-100">{t.subtitle}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="hover:bg-white/20 p-2 rounded-lg transition-colors"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-white/20 p-2 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            {!isMinimized && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-2 ${
                        message.sender === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      {message.sender === "bot" && (
                        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                      )}
                      <div
                        className={`max-w-[75%] p-3 rounded-2xl ${
                          message.sender === "user"
                            ? "bg-green-600 text-white rounded-br-none"
                            : "bg-white text-gray-900 rounded-bl-none shadow-md"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.text}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.sender === "user"
                              ? "text-green-100"
                              : "text-gray-500"
                          }`}
                        >
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      {message.sender === "user" && (
                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="w-4 h-4 text-gray-700" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 bg-white border-t border-gray-200">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSend()}
                      placeholder={t.placeholder}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                    />
                    <Button
                      onClick={handleSend}
                      disabled={!inputValue.trim()}
                      className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-xl px-5 disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
