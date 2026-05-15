// AI Chat Service for Personal History Tutor & Role-Play
// Supports bilingual conversations with context memory

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  language: 'en' | 'si';
}

export interface ConversationContext {
  userId: string;
  conversationHistory: ChatMessage[];
  studentLevel?: 'weak' | 'average' | 'strong';
  currentTopic?: string;
  mode: 'tutor' | 'roleplay';
  characterName?: string; // For role-play mode
}

export interface HistoricalFigure {
  id: string;
  name: {
    en: string;
    si: string;
  };
  title: {
    en: string;
    si: string;
  };
  period: string;
  image: string;
  description: {
    en: string;
    si: string;
  };
  personality: string;
  keyEvents: string[];
}

// AI Configuration
const AI_CONFIG = {
  useMockData: false,
  apiKey: import.meta.env.VITE_GEMINI_API_KEY || '',
  model: 'gemini-pro',
};

class AIChatService {
  private conversationContext: Map<string, ConversationContext> = new Map();

  // Historical Figures Database
  private historicalFigures: HistoricalFigure[] = [
    {
      id: 'vijaya',
      name: { en: 'King Vijaya', si: 'විජය රජු' },
      title: { en: 'Founder of Sinhala Kingdom', si: 'සිංහල රාජධානියේ ආරම්භකයා' },
      period: '543 BCE',
      image: 'https://images.unsplash.com/photo-1739520937392-8a1784612fd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      description: {
        en: 'Legendary prince who arrived from India and established the first Sinhala kingdom',
        si: 'ඉන්දියාවේ සිට පැමිණ පළමු සිංහල රාජධානිය ස්ථාපිත කළ පුරාවෘත්තමය කුමරු'
      },
      personality: 'Brave, strategic, legendary founder',
      keyEvents: ['Arrival in Tambapanni', 'Marriage to Kuveni', 'Establishment of Sinhala civilization']
    },
    {
      id: 'dutugemunu',
      name: { en: 'King Dutugemunu', si: 'දුටුගැමුණු මහා රජ' },
      title: { en: 'Great Warrior King', si: 'මහා යුද්ධ රජ' },
      period: '161-137 BCE',
      image: 'https://images.unsplash.com/photo-1642603437713-29c53824023c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      description: {
        en: 'Unified Sri Lanka by defeating King Elara, built the Ruwanwelisaya',
        si: 'එළාර රජු පරාජය කර ශ්‍රී ලංකාව එක්සත් කළ, රුවන්වැලි සෑය ඉදිකළ'
      },
      personality: 'Heroic, religious, patriotic, determined',
      keyEvents: ['Defeated King Elara', 'Built Ruwanwelisaya', 'Unified the island']
    },
    {
      id: 'parakramabahu',
      name: { en: 'King Parakramabahu I', si: 'පළමුවන පරාක්‍රමබාහු මහා රජ' },
      title: { en: 'The Great Builder', si: 'මහා නිර්මාණකරු' },
      period: '1153-1186 CE',
      image: 'https://images.unsplash.com/photo-1744100011940-4dd775dd39ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      description: {
        en: 'Built massive irrigation systems, saying "Not even a drop of water should reach the sea without serving man"',
        si: 'විශාල ජලාශ්‍රය පද්ධති ඉදිකළ, "මිනිසාට සේවය නොකර එක් බිංදුවක් වත් මුහුදට නොයා යුතුය" යනුවෙන් කීය'
      },
      personality: 'Visionary, engineering genius, determined',
      keyEvents: ['Built Parakrama Samudra', 'Expanded irrigation', 'Restored Buddhism']
    },
    {
      id: 'keppetipola',
      name: { en: 'Keppetipola Disawe', si: 'කැප්පෙටිපොළ දිසාව' },
      title: { en: 'Freedom Fighter', si: 'නිදහස් සටන්කරු' },
      period: '1819 CE',
      image: 'https://images.unsplash.com/photo-1599328431519-9052b1729db2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      description: {
        en: 'Led the Uva Rebellion against British colonial rule, executed for defending his people',
        si: 'බ්‍රිතාන්‍ය යටත් විජිතවාදයට එරෙහිව උඩරට කැරැල්ල මෙහෙයවූ, ජනතාව වෙනුවෙන් පණ පිදූ වීරයා'
      },
      personality: 'Brave, patriotic, rebellious, principled',
      keyEvents: ['Led Uva Rebellion', 'Fought British rule', 'Executed as a martyr']
    },
    {
      id: 'senanayake',
      name: { en: 'D.S. Senanayake', si: 'ඩි.එස්. සේනානායක' },
      title: { en: 'Father of Independence', si: 'නිදහසේ පියා' },
      period: '1947-1952',
      image: 'https://images.unsplash.com/photo-1575473970760-b50a70461e1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      description: {
        en: 'First Prime Minister of independent Ceylon, led the independence movement peacefully',
        si: 'නිදහස් ලංකාවේ පළමු අගමැති, සාමයෙන් නිදහස් ව්‍යාපාරය මෙහෙයවූ'
      },
      personality: 'Diplomatic, visionary, peaceful leader',
      keyEvents: ['Negotiated independence', 'First PM of Ceylon', 'Agricultural reforms']
    },
    {
      id: 'anula',
      name: { en: 'Queen Anula', si: 'අනුලා දේවී' },
      title: { en: 'First Female Ruler', si: 'පළමු කාන්තා පාලිකාව' },
      period: '47-42 BCE',
      image: 'https://images.unsplash.com/photo-1761414140137-9d6a3c704a8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      description: {
        en: 'First documented female head of state in Sri Lankan history, ruled the Anuradhapura Kingdom',
        si: 'ශ්‍රී ලංකා ඉතිහාසයේ ලියැවුණු පළමු කාන්තා රාජ්‍ය නායිකාව, අනුරාධපුර රාජධානිය පාලනය කළාය'
      },
      personality: 'Ambitious, strong-willed, controversial',
      keyEvents: ['Became Queen', 'Ruled independently', 'Challenging traditional norms']
    }
  ];

  constructor() {
    console.log('🤖 AI Chat Service initialized');
  }

  // Get available historical figures
  getHistoricalFigures(): HistoricalFigure[] {
    return this.historicalFigures;
  }

  // Get specific historical figure
  getHistoricalFigure(id: string): HistoricalFigure | undefined {
    return this.historicalFigures.find(f => f.id === id);
  }

  // Initialize conversation context
  initializeContext(
    userId: string, 
    mode: 'tutor' | 'roleplay',
    language: 'en' | 'si',
    studentLevel?: 'weak' | 'average' | 'strong',
    characterId?: string
  ): void {
    const context: ConversationContext = {
      userId,
      conversationHistory: [],
      studentLevel,
      mode,
      characterName: characterId ? this.getHistoricalFigure(characterId)?.name[language] : undefined
    };

    // Add system message based on mode
    if (mode === 'tutor') {
      const systemMessage = language === 'en' 
        ? `You are an expert Sri Lankan history tutor. You help students learn O/L history syllabus. 
           Adapt your explanations to the student's level: ${studentLevel || 'average'}. 
           Be encouraging, clear, and provide examples.`
        : `ඔබ විශේෂඥ ශ්‍රී ලංකා ඉතිහාස ගුරුවරයෙකි. ඔබ සාමාන්‍ය පෙළ ඉතිහාස විෂය නිර්දේශය ඉගෙන ගැනීමට සිසුන්ට උදව් කරයි.
           ඔබේ පැහැදිලි කිරීම් සිසුන්ගේ මට්ටමට ගැලපෙන ලෙස වෙනස් කරන්න: ${studentLevel === 'weak' ? 'දුර්වල' : studentLevel === 'strong' ? 'ශක්තිමත්' : 'සාමාන්‍ය'}.
           දිරිගන්වන, පැහැදිලි සහ උදාහරණ සහිතව උගන්වන්න.`;

      context.conversationHistory.push({
        id: Date.now().toString(),
        role: 'system',
        content: systemMessage,
        timestamp: new Date(),
        language
      });
    } else if (mode === 'roleplay' && characterId) {
      const figure = this.getHistoricalFigure(characterId);
      if (figure) {
        const systemMessage = language === 'en'
          ? `You are ${figure.name.en}. Respond in first person as this historical figure. 
             Be historically accurate but engaging. Share your experiences, feelings, and motivations.
             Period: ${figure.period}. Personality: ${figure.personality}.`
          : `ඔබ ${figure.name.si} ය. මෙම ඓතිහාසික චරිතය ලෙස පළමු පුද්ගලයාට ප්‍රතිචාර දක්වන්න.
             ඓතිහාසිකව නිවැරදි නමුත් ආකර්ෂණීය වන්න. ඔබේ අත්දැකීම්, හැඟීම් සහ අභිප්‍රේරණ බෙදාගන්න.
             කාල පරිච්ඡේදය: ${figure.period}. පෞරුෂය: ${figure.personality}.`;

        context.conversationHistory.push({
          id: Date.now().toString(),
          role: 'system',
          content: systemMessage,
          timestamp: new Date(),
          language
        });
      }
    }

    this.conversationContext.set(userId, context);
  }

  // Send message and get response
  async sendMessage(
    userId: string,
    message: string,
    language: 'en' | 'si'
  ): Promise<ChatMessage> {
    let context = this.conversationContext.get(userId);
    
    if (!context) {
      // Initialize default context if not exists
      this.initializeContext(userId, 'tutor', language, 'average');
      context = this.conversationContext.get(userId)!;
    }

    // Add user message to history
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      timestamp: new Date(),
      language
    };
    context.conversationHistory.push(userMessage);

    // Get AI response
    let assistantResponse: ChatMessage;

    if (AI_CONFIG.useMockData) {
      // Mock AI response
      assistantResponse = await this.getMockResponse(context, message, language);
    } else {
      // Real AI API call (implement when needed)
      assistantResponse = await this.getRealAIResponse(context, message, language);
    }

    // Add assistant response to history
    context.conversationHistory.push(assistantResponse);

    // Update context
    this.conversationContext.set(userId, context);

    return assistantResponse;
  }

  // Mock AI Response (Demo Mode)
  private async getMockResponse(
    context: ConversationContext,
    message: string,
    language: 'en' | 'si'
  ): Promise<ChatMessage> {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    const mode = context.mode;
    const level = context.studentLevel || 'average';

    let response = '';

    if (mode === 'tutor') {
      response = this.generateTutorResponse(message, language, level);
    } else if (mode === 'roleplay') {
      response = this.generateRoleplayResponse(message, language, context.characterName || '');
    }

    return {
      id: Date.now().toString(),
      role: 'assistant',
      content: response,
      timestamp: new Date(),
      language
    };
  }

  // Generate Tutor Response
  private generateTutorResponse(
    question: string,
    language: 'en' | 'si',
    level: 'weak' | 'average' | 'strong'
  ): string {
    const lowerQuestion = question.toLowerCase();

    // English responses
    if (language === 'en') {
      // King Vijaya questions
      if (lowerQuestion.includes('vijaya')) {
        if (level === 'weak') {
          return `Great question! 😊 King Vijaya is super important in Sri Lankan history!\n\n**Simple Answer:**\n• He came to Sri Lanka in **543 BCE** (that's over 2500 years ago!)\n• He came from **India** with 700 followers\n• He married a princess named **Kuveni**\n• This was the **beginning of Sinhala civilization**\n\n**Why is this important?**\nImagine starting a whole new country! That's what Vijaya did. He's like the founder of Sri Lanka's Sinhala people.\n\n**Easy way to remember:** "**543** BCE - Vijaya's big adventure begins!"\n\nWant me to explain more about Kuveni or what happened next? 🤔`;
        } else if (level === 'strong') {
          return `Excellent question about King Vijaya!\n\n**Historical Context:**\nAccording to the Mahavamsa, Prince Vijaya arrived in Sri Lanka in 543 BCE, coinciding with Buddha's Parinirvana. This synchronicity holds religious and political significance.\n\n**Key Points:**\n1. **Origin:** Son of King Sinhabahu and Queen Sinhasivali from Lala/Vanga (Bengal region)\n2. **Arrival:** Landed at Tambapanni (modern-day Puttalam/Mannar area)\n3. **Political Strategy:** Alliance through marriage with Kuveni, a Yakkha princess\n4. **Consequences:** Established Indo-Aryan culture, Sinhala language foundation\n5. **Later developments:** Sent for Pandyan princess, abandoned Kuveni (controversial)\n\n**Scholarly Debates:**\n- Some historians view this as mythology\n- Others see archaeological evidence of Indo-Aryan migration\n- Important for understanding Sinhala ethnic identity formation\n\nWould you like to discuss the archaeological evidence or the socio-political implications?`;
        } else {
          return `Good question! Let me explain King Vijaya clearly.\n\n**The Story:**\nKing Vijaya came to Sri Lanka in **543 BCE** from India. He's considered the founder of the Sinhala civilization.\n\n**Important Facts:**\n• **When:** 543 BCE (same day as Buddha's Parinirvana according to legend)\n• **From where:** Lala/Vanga region in India\n• **With whom:** 700 followers\n• **Where he landed:** Tambapanni (named because the red soil stained their hands)\n• **Who he married:** Kuveni, a Yakkha princess\n\n**Why Important:**\n1. Marks the traditional beginning of Sinhala history\n2. Established Indo-Aryan culture in Sri Lanka\n3. Foundation of the Sinhala kingdom\n4. Connected to Buddhist arrival (symbolic importance)\n\n**Controversy:** Some historians debate whether Vijaya was a real person or a legend representing migration waves.\n\nNeed more details about any specific aspect?`;
        }
      }

      // Dutugemunu questions
      if (lowerQuestion.includes('dutugemunu') || lowerQuestion.includes('dutugamunu')) {
        if (level === 'weak') {
          return `Awesome! King Dutugemunu is one of the **greatest heroes** in Sri Lankan history! 🏆\n\n**Simple Story:**\n• He was a brave prince who became king\n• He **defeated King Elara** in a famous battle\n• He built the **Ruwanwelisaya** (a huge stupa/dagoba)\n• Ruled from **161-137 BCE**\n\n**Cool Facts:**\n• He had a war elephant named **Kandula** 🐘\n• He united Sri Lanka under one kingdom\n• He was very religious (Buddhist)\n\n**Remember this:** "Dutugemunu defeated Elara and built Ruwanwelisaya!"\n\nWant to hear about his elephant or the battle? 😊`;
        } else {
          return `Excellent! King Dutugemunu is a pivotal figure in Sri Lankan history.\n\n**Historical Background:**\n• **Period:** 161-137 BCE (Anuradhapura Kingdom)\n• **Famous for:** Unifying Sri Lanka by defeating King Elara\n• **Major achievement:** Building the Ruwanwelisaya stupa\n\n**The Elara War:**\n- Elara, a Tamil king, ruled Anuradhapura for 44 years\n- Dutugemunu launched a campaign from Ruhuna (southern kingdom)\n- Famous elephant: Kandula\n- Single combat at Vijithapura where Elara was defeated\n- Dutugemunu gave Elara an honorable burial\n\n**Legacy:**\n1. **Religious:** Built Ruwanwelisaya, Mirisaveti stupa\n2. **Political:** Unified the island under Sinhala Buddhist rule\n3. **Cultural:** Symbol of patriotism and religious devotion\n4. **Literary:** Central figure in Mahavamsa\n\n**Historical Debate:** Modern historians discuss whether the war was purely ethnic or more complex political struggle.\n\nWould you like to know more about the Ruwanwelisaya or the political context?`;
        }
      }

      // Independence questions
      if (lowerQuestion.includes('independence') || lowerQuestion.includes('1948')) {
        return `Great question about Sri Lanka's independence!\n\n**When:** February 4, 1948\n\n**Key Facts:**\n• Sri Lanka gained independence from **British rule**\n• It was a **peaceful** transition (no war)\n• **D.S. Senanayake** became the first Prime Minister\n• The country was called **Ceylon** at that time\n\n**How it happened:**\n1. Independence movement leaders negotiated with Britain\n2. British agreed after World War II\n3. Dominion status granted (still under British Crown initially)\n4. Full republic status came later in 1972\n\n**Important Leaders:**\n• D.S. Senanayake (Father of Independence)\n• Don Stephen Senanayake's leadership was crucial\n• Peaceful negotiations rather than armed struggle\n\n**Remember:** Unlike India, Sri Lanka gained independence peacefully through diplomacy!\n\nWant to know more about D.S. Senanayake or what happened after independence?`;
      }

      // Default response
      return `That's an interesting question! I'd love to help you learn about Sri Lankan history.\n\nCould you be more specific about which topic you'd like to know about? Here are some topics I can help with:\n\n📚 **Popular Topics:**\n• Ancient Period (King Vijaya, Anuradhapura Kingdom)\n• Medieval Period (Polonnaruwa, Kandyan Kingdom)\n• Colonial Period (Portuguese, Dutch, British)\n• Independence Movement (1948)\n• Post-Independence Era\n\nOr ask me anything like:\n• "When did King Vijaya arrive?"\n• "Tell me about Dutugemunu"\n• "How did Sri Lanka gain independence?"\n\nI'm here to help! 😊`;
    } 
    // Sinhala responses
    else {
      // විජය රජු ප්‍රශ්න
      if (lowerQuestion.includes('විජය')) {
        if (level === 'weak') {
          return `හරිම හොඳ ප්‍රශ්නයක්! 😊 විජය රජු ශ්‍රී ලංකා ඉතිහාසයේ අති වැදගත් පුද්ගලයෙක්!\n\n**සරල පිළිතුර:**\n• ඔහු ශ්‍රී ලංකාවට පැමිණියේ **ක්‍රි.පූ 543** දී (අවුරුදු 2500කට වඩා පරණ!)\n• **ඉන්දියාවේ** සිට අනුගාමිකයන් 700ක් සමඟ පැමිණියේය\n• **කුවේණි** නම් කුමරියක් සමඟ විවාහ විය\n• මෙය **සිංහල ශිෂ්ටාචාරයේ ආරම්භය** විය\n\n**මෙය වැදගත් ඇයි?**\nහිතන්න අලුත් රටක් පටන්ගන්න! ඒක තමයි විජය කළේ. ඔහු ශ්‍රී ලංකාවේ සිංහල ජනතාවගේ ආරම්භකයා වගේ.\n\n**මතක තියාගන්න ලේසි ක්‍රමය:** "**543** ක්‍රි.පූ - විජයගේ ලොකු වික්‍රමය පටන්ගන්නවා!"\n\nකුවේණි ගැන හෝ ඊට පස්සේ මොනවද වුනේ කියලා කියන්නද? 🤔`;
        } else {
          return `විජය රජු ගැන හොඳ ප්‍රශ්නයක්!\n\n**ඓතිහාසික සන්දර්භය:**\n• **කාලය:** ක්‍රි.පූ 543 (බුද්ධ ජයන්ති දිනය)  \n• **සිට:** ලාල/වංග ප්‍රදේශය (බෙංගාලය)\n• **සමඟ:** අනුගාමිකයන් 700ක්\n• **පැමිණි තැන:** තම්බපණ්ණි (අද පුත්තලම/මන්නාරම ප්‍රදේශය)\n\n**වැදගත් කරුණු:**\n1. **විවාහය:** යක්ෂ කුමරිය කුවේණි සමඟ විවාහ විය (දේශපාලන උපායමාර්ගය)\n2. **ස්ථාපනය:** ඉන්දු-ආර්ය සංස්කෘතිය හා සිංහල භාෂාවේ පදනම\n3. **පසුව:** පාණ්ඩ්‍ය කුමරියක් සඳහා යවා කුවේණි අත්හැරියේය (මතභේදාත්මක)\n4. **වැදගත්කම:** සිංහල ජාතික අනන්‍යතාවයේ ආරම්භය\n\n**විද්වත් විවාද:**\n• සමහරු මෙය පුරාවෘත්තයක් ලෙස සලකයි\n• අනෙක් අය පුරාවිද්‍යාත්මක සාක්ෂි දක්වති\n• සිංහල ජනවාර්ගික අනන්‍යතාවය තේරුම් ගැනීමට වැදගත්\n\nපුරාවිද්‍යාත්මක සාක්ෂි ගැන වැඩිදුර කතා කරන්නද?`;
        }
      }

      // දුටුගැමුණු ප්‍රශ්න
      if (lowerQuestion.includes('දුටුගැමුණු') || lowerQuestion.includes('දුටු')) {
        if (level === 'weak') {
          return `නියමයි! දුටුගැමුණු මහා රජ ශ්‍රී ලංකා ඉතිහාසයේ **ශ්‍රේෂ්ඨතම වීරයන්ගෙන්** කෙනෙක්! 🏆\n\n**සරල කතාව:**\n• ඔහු රජ වූ නිර්භීත කුමරෙක්\n• ප්‍රසිද්ධ සටනකදී **එළාර රජු පරාජය** කළේය\n• **රුවන්වැලි සෑය** ඉදිකළේය (විශාල දාගැබක්)\n• පාලනය කළේ **ක්‍රි.පූ 161-137**\n\n**නියම කරුණු:**\n• **කඳුල** නම් යුද්ධ අලියෙක් හිටියා 🐘\n• ශ්‍රී ලංකාව එක් රාජධානියක් යටතට ගෙනාවා\n• ඉතා ධාර්මික (බෞද්ධ) රජෙක්\n\n**මතක තියාගන්න:** "දුටුගැමුණු එළාර පරාජය කර රුවන්වැලි සෑය ඉදිකළේය!"\n\nඔහුගේ අලියා ගැන හෝ සටන ගැන අහන්නද? 😊`;
        } else {
          return `නියමයි! දුටුගැමුණු මහා රජ ශ්‍රී ලංකා ඉතිහාසයේ ප්‍රධාන චරිතයක්.\n\n**ඓතිහාසික පසුබිම:**\n• **කාලය:** ක්‍රි.පූ 161-137 (අනුරාධපුර රාජධානිය)\n• **ප්‍රසිද්ධ වන්නේ:** එළාර රජු පරාජය කර ශ්‍රී ලංකාව එක්සත් කිරීම\n• **ප්‍රධාන ජයග්‍රහණය:** රුවන්වැලි මහා සෑය ඉදිකිරීම\n\n**එළාර යුද්ධය:**\n- දෙමළ රජු එළාර වසර 44ක් අනුරාධපුරය පාලනය කළේය\n- දුටුගැමුණු රුහුණෙන් (දකුණු රාජධානිය) ව්‍යාපාරයක් දියත් කළේය\n- ප්‍රසිද්ධ අලියා: කඳුල\n- විජිතපුරයේ එළාර පරාජය කළ තනි සටන\n- දුටුගැමුණු එළාරට ගෞරවනීය භූමදානයක් කළේය\n\n**උරුමය:**\n1. **ධාර්මික:** රුවන්වැලි සෑය, මිරිසවැටි දාගැබ ඉදිකළේය\n2. **දේශපාලන:** දිවයින සිංහල බෞද්ධ පාලනය යටතට ගෙනාවේය\n3. **සංස්කෘතික:** දේශප්‍රේමය හා ධාර්මික භක්තියේ සංකේතය\n\nරුවන්වැලි සෑය ගැන වැඩිදුර දැනගන්නද?`;
        }
      }

      // නිදහස ප්‍රශ්න
      if (lowerQuestion.includes('නිදහස') || lowerQuestion.includes('1948')) {
        return `ශ්‍රී ලංකාවේ නිදහස ගැන හොඳ ප්‍රශ්නයක්!\n\n**කවදා:** 1948 පෙබරවාරි 4\n\n**ප්‍රධාන කරුණු:**\n• ශ්‍රී ලංකාව **බ්‍රිතාන්‍ය පාලනයෙන්** නිදහස ලැබුවා\n• එය **සාමකාමී** සංක්‍රමණයක් (යුද්ධයක් නැහැ)\n• **ඩී.එස්. සේනානායක** පළමු අගමැති වුණා\n• ඒ වෙලාවේ රට හැඳින්වුනේ **ලංකාව** කියලා\n\n**කොහොමද වුනේ:**\n1. නිදහස් ව්‍යාපාර නායකයෝ බ්‍රිතාන්‍යයන් සමඟ සාකච්ඡා කළා\n2. දෙවන ලෝක යුද්ධයෙන් පස්සේ බ්‍රිතාන්‍යයෝ එකඟ වුණා\n3. ඩොමීනියන් තත්ත්වය ලැබුණා (මුලින් බ්‍රිතාන්‍ය කිරුළ යටතේ)\n4. සම්පූර්ණ ජනරජ තත්ත්වය පසුව 1972 දී ලැබුණා\n\n**වැදගත් නායකයෝ:**\n• ඩී.එස්. සේනානායක (නිදහසේ පියා)\n• සාමකාමී සාකච්ඡා මගින් (සන්නද්ධ අරගලයක් නොවේ)\n\n**මතක තියාගන්න:** ඉන්දියාව මෙන් නොව, ශ්‍රී ලංකාව රාජ්‍ය තාන්ත්‍රික ක්‍රම මගින් සාමකාමීව නිදහස ලැබුවා!\n\nඩී.එස්. සේනානායක ගැන හෝ නිදහසෙන් පස්සේ මොනවද වුනේ කියලා දැනගන්නද?`;
      }

      // පෙරනිමි පිළිතුර
      return `ඒක සිත්ගන්නා ප්‍රශ්නයක්! ශ්‍රී ලංකා ඉතිහාසය ඉගෙන ගැනීමට මම උදව් කරන්න කැමතියි.\n\nඔබ කැමති මාතෘකාව ගැන තව ටිකක් නිශ්චිතව කියන්න පුළුවන්ද? මට උදව් කළ හැකි මාතෘකා කිහිපයක්:\n\n📚 **ජනප්‍රිය මාතෘකා:**\n• පුරාතන යුගය (විජය රජු, අනුරාධපුර රාජධානිය)\n• මධ්‍යතන යුගය (පොළොන්නරුව, කඳවුරු රාජධානිය)\n• යටත් විජිත යුගය (පෘතුගීසි, ලන්දේසි, බ්‍රිතාන්‍ය)\n• නිදහස් ව්‍යාපාරය (1948)\n• නිදහසින් පසු යුගය\n\nහෝ මෙහෙම ප්‍රශ්න අහන්න:\n• "විජය රජු පැමිණියේ කවදාද?"\n• "දුටුගැමුණු ගැන කියන්න"\n• "ශ්‍රී ලංකාව නිදහස ලැබුවේ කොහොමද?"\n\nමම උදව් කරන්න ඉන්නවා! 😊`;
    }
  }

  // Generate Roleplay Response (Historical Figure)
  private generateRoleplayResponse(
    question: string,
    language: 'en' | 'si',
    characterName: string
  ): string {
    const lowerQuestion = question.toLowerCase();
    const lowerCharacter = characterName.toLowerCase();

    // English roleplay responses
    if (language === 'en') {
      // King Vijaya
      if (lowerCharacter.includes('vijaya')) {
        if (lowerQuestion.includes('why') || lowerQuestion.includes('come') || lowerQuestion.includes('arrive')) {
          return `*King Vijaya speaks*\n\nAh, you ask why I came to this blessed island? Let me tell you my story...\n\nI was a prince in the land of Lala, son of King Sinhabahu. But I was... troublesome. My father, fearing my ambitions and wild nature, sent me away with 700 of my followers. We were exiled.\n\nWe sailed across the great ocean, and after many days, we landed on this beautiful shore. The soil was red like copper - it stained our hands! So I named this land **Tambapanni** - "copper-colored hands."\n\nBut this was no mere exile - it was destiny! On the very day I arrived, the great Buddha attained Parinirvana. The gods had plans for me and this island.\n\nWhen I met Kuveni, the Yakkha princess, I saw opportunity. Through her, I could understand this land and its people. Yes, I married her. Yes, I later sent for a Pandyan princess for political alliance. These were difficult decisions, but I was building a kingdom, a civilization!\n\nWas I perfect? No. But I was the founder. Everything that came after - the great kingdoms, the Buddhist heritage, the Sinhala people - it all started with my arrival on that fateful day in 543 BCE.\n\nWhat else would you know of my journey, young scholar?`;
        }
        if (lowerQuestion.includes('kuveni')) {
          return `*King Vijaya sighs deeply*\n\nKuveni... you ask about Kuveni. This is the burden I carry in my heart.\n\nShe was a Yakkha princess, powerful and mysterious. When my men and I first arrived, she appeared to us as a young maiden. But she was more than that - she was the protector of this land, connected to forces I barely understood.\n\nShe helped me, loved me, bore me children. Without her knowledge of this island, I would have been lost. She taught me about the Yakkha tribes, the land, the secrets of survival here.\n\nBut I was building a kingdom, and kingdoms require alliances. The elders advised me to marry a Pandyan princess of royal blood to legitimize my rule. Politics demanded it.\n\nSo I sent Kuveni away, along with our children. She cursed me as she left, and I deserved it. They say she was killed by her own Yakkha kinsmen who saw her as a traitor.\n\nDo I regret it? Every day. But would I change it? I... I don't know. A king's choices are never simple. I built a civilization, but at what cost?\n\nThat is my truth, student. History will judge me.`;
        }
        return `*King Vijaya stands proudly*\n\nGreetings, young scholar! I am Vijaya, founder of the Sinhala kingdom. I arrived on this blessed island in 543 BCE, the very day the Buddha attained Parinirvana.\n\nAsk me anything - about my journey from Lala, my marriage to Kuveni, the founding of Tambapanni, or the challenges of building a new civilization in an unknown land.\n\nI have stories to tell and wisdom to share from those ancient days!`;
      }

      // King Dutugemunu
      if (lowerCharacter.includes('dutugemunu') || lowerCharacter.includes('dutugamunu')) {
        if (lowerQuestion.includes('elara') || lowerQuestion.includes('war') || lowerQuestion.includes('battle')) {
          return `*King Dutugemunu's eyes flash with remembered passion*\n\nElara... A worthy opponent and a just ruler. Let me tell you the truth of that war.\n\nWhen I was young, lying in my bed, I felt the pressure of foreign rule on both sides - Elara to the north, another Tamil king to the south. I could not rest! My brother mocked me, calling me a coward. But I was preparing.\n\nElara ruled Anuradhapura for 44 years. He was a just king - I admit that freely. But he was NOT our king. Our sacred city was under foreign control, our people divided, our Buddhist heritage threatened.\n\nI gathered my forces in Ruhuna. My faithful elephant Kandula was by my side - more than an animal, he was my brother in battle! Ten great warriors stood with me, each a champion.\n\nThe final battle at Vijithapura was fierce. Elara and I met in single combat on elephant-back. It was not just a battle of men - it was a clash of kingdoms, of destinies!\n\nWhen I struck the final blow, I felt no joy - only duty fulfilled. I gave Elara a funeral with full honors. He deserved respect, even in death. A just enemy is still just.\n\nBut our land was FREE. That's what mattered. And I built the Ruwanwelisaya to honor the Buddha and celebrate that freedom.\n\nDo you understand? War is terrible, but sometimes necessary for dharma (righteousness).\n\nWhat else would you know of those days?`;
        }
        if (lowerQuestion.includes('ruwanweli') || lowerQuestion.includes('build') || lowerQuestion.includes('stupa')) {
          return `*King Dutugemunu's face lights up with pride*\n\nAh, the Ruwanwelisaya! My greatest achievement - greater even than defeating Elara!\n\nAfter the war, I wanted to create something ETERNAL. Something that would honor the Buddha, inspire my people, and stand as a testament to our faith for thousands of years.\n\nI dreamed of a stupa so magnificent that it would be visible from far away, gleaming white like a pearl! \n\nThe construction was massive - we needed thousands of workers, tons of materials, incredible engineering. I consulted the best architects. We dug deep foundations, built strong walls.\n\nBut here's the beautiful part - this wasn't just MY monument. Common people contributed too! They came with their own hands to help build it. Rich and poor, all united in this sacred work.\n\nI designed it to be 300 feet tall (91 meters) with a beautiful dome shape, like a water bubble or a heap of paddy rice - symbols of prosperity and purity.\n\nSadly, I didn't live to see it completed. My brother Saddha Tissa finished it after my death. But when I was on my deathbed, they told me construction had progressed far enough. I died in peace.\n\nEven today, thousands of years later, it still stands! THAT is immortality - not through conquest, but through faith and creation.\n\nTell me, have you visited it? What did you feel?`;
        }
        return `*King Dutugemunu raises his hand in greeting*\n\nWelcome, young friend! I am Dutugemunu, warrior king of Sri Lanka, defeater of Elara, builder of the great Ruwanwelisaya!\n\nPeople remember me for war, but I was also a man of dharma, devoted to Buddha's teachings. Ask me about my battles, my elephant Kandula, the Ruwanwelisaya, or what it truly means to be a king who serves his people!\n\nSpeak freely - I have no secrets from those who seek knowledge!`;
      }

      // Default roleplay
      return `*${characterName} bows respectfully*\n\nGreetings, student of history! I am honored you wish to speak with me across the ages.\n\nAsk me about my life, my decisions, my era - anything you wish to know. History is not just dates and battles, it is human stories, struggles, triumphs, and regrets.\n\nI am here to share my truth with you. What would you know?`;
    } 
    // Sinhala roleplay responses
    else {
      // විජය රජු
      if (lowerCharacter.includes('විජය')) {
        if (lowerQuestion.includes('ඇයි') || lowerQuestion.includes('ආවේ') || lowerQuestion.includes('පැමිණියේ')) {
          return `*විජය රජු කතා කරයි*\n\nආහ්, මම මේ පොහොසත් දිවයිනට ආවේ ඇයි කියලා ඇහුවාද? මගේ කතාව කියන්නම්...\n\nමම ලාල රටේ කුමරෙක්, සිංහබාහු රජුගේ පුත්. ඒත් මම... කරදරකාරී කෙනෙක්. තාත්තා, මගේ අභිලාෂයන්ට සහ වල් ස්වභාවයට බය වෙලා, මගේ අනුගාමිකයන් 700ක් එක්ක මාව එවලා දැම්මා. අපි පිටුවහල් කරන ලද්දෝ.\n\nඅපි මහා සාගරය හරහා යාත්‍රා කළා, දවස් ගණනකට පස්සේ, මේ ලස්සන වෙරළට බැස්සා. පස රතු වුනා තඹ වගේ - අපේ අත් වලට ඇලුණා! ඒ නිසා මම මේ රටට නම් කළේ **තම්බපණ්ණි** - "තඹ වර්ණ අත්".\n\nඒත් මේක හුදෙක් පිටුවහල් කිරීමක් නෙමෙයි - මේක ඉරණමක්! මම ආපු දවසේම මහා බුදුරජාණන් වහන්සේ පිරිනිවන් පෑවා. දෙවියෝට මට සහ මේ දිවයිනට සැලසුම් තිබුණා.\n\nමම කුවේණිව, යක්ෂ කුමරිය හමු වෙද්දී, අවස්ථාව දුටුවා. ඇය හරහා, මට මේ රට සහ එහි ජනතාව තේරුම් ගන්න පුළුවන්. ඔව්, මම ඇය සමඟ විවාහ වුණා. ඔව්, පසුව දේශපාලන සන්ධානයක් සඳහා පාණ්ඩ්‍ය කුමරියක් සඳහා යැව්වා. මේ අපහසු තීරණ, ඒත් මම රාජධානියක්, ශිෂ්ටාචාරයක් ගොඩනගමින් සිටියා!\n\nමම පරිපූර්ණද? නැහැ. ඒත් මම ආරම්භකයා. පසුව ආපු හැම දෙයක්ම - මහා රාජධානි, බෞද්ධ උරුමය, සිංහල ජනතාව - ඒ හැම දෙයක්ම ආරම්භ වුණේ ක්‍රි.පූ 543 දී මගේ පැමිණීමෙන්.\n\nවැඩිදුර මොනවද දැනගන්න ඕන, තරුණ විද්වතුනි?`;
        }
        if (lowerQuestion.includes('කුවේණි')) {
          return `*විජය රජු ගැඹුරු විශ්වාසයක් හෙළයි*\n\nකුවේණි... කුවේණි ගැන අහනවා. මේ මගේ හිතේ දරන බරයි.\n\nඇය යක්ෂ කුමරියක්, බලවත් සහ අද්භූත. මගේ මිනිස්සු සහ මම ප්‍රථම වරට ආපු වෙලාවේ, ඇය අපට පෙනුනේ තරුණ තරුණියක් විදිහට. ඒත් ඇය ඊට වඩා වැඩියි - ඇය මේ රටේ ආරක්ෂිකාව, මම යන්තමින් තේරුම් ගත් බලවේගවලට සම්බන්ධ.\n\nඇය මට උදව් කළා, ආදරය කළා, දරුවන් බිහි කළා. ඇය නොමැතිව මේ දිවයින ගැන දැනුම, මම අතරමං වෙනවා. ඇය මට යක්ෂ ගෝත්‍ර, රට, දිවි ගලවා ගැනීමේ රහස් ගැන ඉගැන්නුවා.\n\nඒත් මම රාජධානියක් ගොඩනගමින් හිටියා, රාජධානිවලට සන්ධාන අවශ්‍යයි. වැඩිමහලුවෝ මට උපදෙස් දුන්නා රාජකීය රුධිරයේ පාණ්ඩ්‍ය කුමරියක් සමඟ විවාහ වෙන්න මගේ පාලනය නීත්‍යානුකූල කරන්න. දේශපාලනය ඒක ඉල්ලුවා.\n\nඒ නිසා මම කුවේණි එවලා දැම්මා, අපේ දරුවන් එක්කම. ඇය යද්දී මට ශාප කළා, මම ඒකට සුදුසුයි. කියනවා ඇයව මරලා දැම්මේ ඇයගේම යක්ෂ ඥාතීන් ඇයව ද්‍රෝහියෙක් ලෙස දැකපු නිසා කියලා.\n\nමම පසුතැවෙනවද? හැම දවසම. ඒත් මම වෙනස් කරනවද? මම... මම දන්නේ නැහැ. රජෙකුගේ තේරීම් කවදාවත් සරල නැහැ. මම ශිෂ්ටාචාරයක් ගොඩනැගුවා, ඒත් කුමන වියදමකින්ද?\n\nඒක මගේ සත්‍යය, සිසුවනේ. ඉතිහාසය මට විනිශ්චය කරයි.`;
        }
        return `*විජය රජු ආඩම්බරයෙන් සිටිනවා*\n\nආයුබෝවන්, තරුණ විද්වතුනි! මම විජය, සිංහල රාජධානියේ ආරම්භකයා. මම මේ පොහොසත් දිවයිනට පැමිණියේ ක්‍රි.පූ 543 දී, බුදුරජාණන් වහන්සේ පිරිනිවන් පෑ දවසේම.\n\nමගෙන් ඕනෑම දෙයක් අහන්න - ලාලයේ සිට මගේ ගමන, කුවේණි සමඟ විවාහය, තම්බපණ්ණි ආරම්භය, හෝ නොදන්නා රටක නව ශිෂ්ටාචාරයක් ගොඩනැගීමේ අභියෝග ගැන.\n\nමට කතා කියන්න සහ ඒ පුරාණ දිනවල සිට ප්‍රඥාව බෙදා ගන්න තියෙනවා!`;
      }

      // දුටුගැමුණු රජු
      if (lowerCharacter.includes('දුටුගැමුණු') || lowerCharacter.includes('දුටු')) {
        if (lowerQuestion.includes('එළාර') || lowerQuestion.includes('යුද්ධ') || lowerQuestion.includes('සටන')) {
          return `*දුටුගැමුණු රජුගේ ඇස් මතක සහිත ආශාවෙන් දිලිහෙනවා*\n\nඑළාර... සුදුසු විරුද්ධවාදියෙක් සහ යුක්තිවන්ත පාලකයෙක්. ඒ යුද්ධයේ සත්‍යය කියන්නම්.\n\nමම තරුණ වෙලාවේ, මගේ ඇඳේ වැතිරිලා, විදේශීය පාලනයේ පීඩනය දැනුණා දෙපැත්තෙන්ම - උතුරේ එළාර, දකුණේ තව දෙමළ රජෙක්. මට විවේක ගන්න බැහැ! මගේ සහෝදරයා මට සමච්චල් කළා, බියගුල්ලෙක් කියලා. ඒත් මම සූදානම් වෙමින් හිටියා.\n\nඑළාර වසර 44ක් අනුරාධපුරය පාලනය කළා. ඔහු යුක්තිවන්ත රජෙක් - මම ඒක නිදහසේ පිළිගන්නවා. ඒත් ඔහු අපේ රජ නෙමෙයි. අපේ පූජනීය නගරය විදේශීය පාලනය යටතේ, අපේ ජනතාව බෙදිලා, අපේ බෞද්ධ උරුමය තර්ජනයට ලක් වෙලා.\n\nමම රුහුණේ මගේ බලවේග එක්රැස් කළා. මගේ විශ්වාසවන්ත අලි කඳුල මගේ පැත්තේ - සතෙක්ට වඩා, ඔහු මගේ සටනේ සහෝදරයා! මහා රණවිරුවන් දස දෙනෙක් මා සමඟ සිටියා, එක් එක්කෙනා ���ිජිතයෙක්.\n\nවිජිතපුරයේ අවසන් සටන දරුණු විය. එළාර සහ මම අලි පිටෙන් තනි සටනකට ගැටුණෙමු. මේ හුදෙක් මිනිසුන්ගේ සටනක් නෙමෙයි - මේ රාජධානිවල, ඉරණම්වල ගැටුමක්!\n\nමම අවසන් පහර දුන් වෙලාවේ, මට සතුටක් දැනුණේ නැහැ - කර්තව්‍ය සම්පූර්ණ කිරීම විතරයි. මම එළාරට සම්පූර්ණ ගෞරවයෙන් අවමංගල්‍යයක් දුන්නා. ඔහු ගෞරවයට සුදුසුයි, මරණයේදීත්. යුක්තිවන්ත සතුරෙක් තවමත් යුක්තිවන්තයි.\n\nඒත් අපේ රට නිදහස් විය. ඒක ත��යි වැදගත්. සහ මම රුවන්වැලි සෑය ඉදිකළේ බුදුරජාණන් වහන්සේට ගෞරව කරන්න සහ ඒ නිදහස සැමරීමට.\n\nතේරෙනවද? යුද්ධය භයානකයි, ඒත් සමහර වෙලාවට ධර්මය සඳහා අවශ්‍යයි.\n\nවැඩිදුර මොනවද දැනගන්න ඕන?`;
        }
        if (lowerQuestion.includes('රුවන්වැලි') || lowerQuestion.includes('ඉදි') || lowerQuestion.includes('දාගැබ')) {
          return `*දුටුගැමුණු රජුගේ මුහුණ ආඩම්බරයෙන් දිලිහෙනවා*\n\nආහ්, රුවන්වැලි මහා සෑය! මගේ ශ්‍රේෂ්ඨතම ජයග්‍රහණය - එළාර පරාජය කිරීමට වඩා මහත්!\n\nයුද්ධයෙන් පස්සේ, මට නිර්මාණය කරන්න ඕන වුනේ සදාකාලික දෙයක්. බුදුරජාණන් වහන්සේට ගෞරව කරන, මගේ ජනතාව දිරිමත් කරන, සහ අපගේ ඇදහිල්ල සඳහා දහස් ගණන් වසරක් සාක්ෂියක් ලෙස පවතින දෙයක්.\n\nමම සිහින දැක්කා මුතු මැණිකක් වගේ සුදු පැහැයෙන් දිලිහෙන, දුරින් පෙනෙන එතරම් විශ්මිත දාගැබක්!\n\nඉදිකිරීම විශාල විය - අපට දහස් ගණන් කම්කරුවන්, ටොන් ගණනක් ද්‍රව්‍ය, ඇදහිය නොහැකි ඉංජිනේරු විද්‍යාව අවශ්‍ය විය. මම හොඳම ගෘහ නිර්මාණ ශිල්පීන් සමඟ උපදේශනය කළා. අපි ගැඹුරු අත්තිවාරම් හැරුවා, ශක්තිමත් බිත්ති ඉදි කළා.\n\nඒත් මෙන්න ලස්සන කොටස - මේක හුදෙක් මගේ ස්මාරකය නෙමෙයි. සාමාන්‍ය ජනතාවත් දායක වුණා! ඔවුන් ඔවුන්ගේම අත්වලින් උදව් කරන්න ආවා. ධනවත් සහ දුප්පත්, සියල්ලෝම මේ පූජනීය වැඩේ එක්සත් වුණා.\n\nමම එය අඩි 300ක් (මීටර් 91) උස සමඟ සැලසුම් කළා, ලස්සන ගෝලාකාර හැඩයක් සමඟ, ජල බුබුලක් හෝ සහල් රාශියක් වගේ - සමෘද්ධිය සහ පිරිසිදුකමේ සංකේත.\n\nදුක්ඛිතව, මම එය නිම වීම දකින්න දිවුනේ නැහැ. මගේ සහෝදර සද්ධා තිස්ස මගේ මරණයෙන් පසුව එය අවසන් කළා. ඒත් මම මරණ ශය්‍යාවේ සිටියදී, ඔවුන් කිව්වා ඉදිකිරීම ප්‍රමාණවත් තරම් ඉදිරියට ගිහින් කියලා. මම සාමයෙන් මිය ගියා.\n\nදැන් පවා, දහස් ගණන් ��සරකට පසුව, එය තවමත් පවතිනවා! ඒක අමරණීයත්වයයි - ජයග්‍රහණ මගින් නොව, ඇදහිල්ල සහ නිර්මාණය මගින්.\n\nකියන්න, ඔබ එය බැලුවාද? ඔබට මොනවද දැනුනේ?`;
        }
        return `*දුටුගැමුණු රජු ආචාරයෙන් අත් උස්සනවා*\n\nආයුබෝවන්, තරුණ මිතුරනි! මම දුටුගැමුණු, ශ්‍රී ලංකාවේ යුද්ධ රජ, එළාර පරාජය කළ, මහා රුවන්වැලි සෑය ඉදිකළ!\n\nජනතාව මතක තියාගෙන ඉන්නේ මාව යුද්ධ සඳහා, ඒත් මම ධර්මයේ මිනිහෙක්, බුදුරජාණන් වහන්සේගේ ඉගැන්වීම්වලට කැප වූ. මගෙන් අහන්න මගේ සටන්, මගේ අලි කඳුල, රුවන්වැලි සෑය, හෝ තමන්ගේ ජනතාවට සේවය කරන රජෙකු වීමේ සැබෑ අර්ථය!\n\nනිදහසේ කතා කරන්න - දැනුම සොයන අයට මම රහස් නැහැ!`;
      }

      // පෙරනිමි roleplay
      return `*${characterName} ගෞරවයෙන් නමස්කාර කරනවා*\n\nආයුබෝවන්, ඉතිහාස ශිෂ්‍යයනි! මා සමඟ යුගයන් හරහා කතා කිරීමට ඔබ කැමති වීම ගෞරවයක්.\n\nමගේ ජීවිතය, මගේ තීරණ, මගේ යුගය ගැන අහන්න - ඔබ දැනගන්න කැමති ඕනෑම දෙයක්. ඉතිහාසය හුදු දින සහ සටන් නොවේ, එය මානව කතා, අරගල, ජයග්‍රහණ සහ පසුතැවිලි වේ.\n\nමම මෙහි ඉන්නේ මගේ සත්‍යය ඔබ සමඟ බෙදා ගැනීමට. ඔබ දැනගන්න කැමති මොනවද?`;
    }
  }

  // Real AI API Response — Gemini powered
  private async getRealAIResponse(
    context: ConversationContext,
    message: string,
    language: 'en' | 'si'
  ): Promise<ChatMessage> {
    // If no API key, fall back to mock
    if (!AI_CONFIG.apiKey) {
      return this.getMockResponse(context, message, language);
    }

    try {
      const isRoleplay = context.mode === 'roleplay';
      const characterName = context.characterName || 'AI Tutor';
      const subject = context.currentTopic || 'Sri Lankan History';
      const level = context.studentLevel || 'average';

      // Build system prompt based on mode
      const systemPrompt = isRoleplay
        ? `You are ${characterName}, a historical figure from Sri Lanka. You speak in first person, in character. 
           Respond in ${language === 'si' ? 'Sinhala' : 'English'}.
           Stay in character at all times. Be dramatic, emotional, and historically accurate.
           You are speaking to a Sri Lankan O/L student. Keep answers educational but engaging.
           Use *italics* for actions/expressions (e.g. *smiles warmly*).`
        : `You are a friendly, expert Sri Lankan O/L ${subject} tutor.
           Student level: ${level}. Respond in ${language === 'si' ? 'Sinhala' : 'English'}.
           Give clear, structured answers aligned to the Sri Lankan G.C.E. O/L syllabus.
           Use simple language for weak students, more depth for strong students.
           Always encourage and be supportive.`;

      // Build conversation history for context
      const recentHistory = context.conversationHistory.slice(-6); // last 3 turns
      const historyText = recentHistory
        .filter(m => m.role !== 'system')
        .map(m => `${m.role === 'user' ? 'Student' : 'Tutor'}: ${m.content}`)
        .join('\n');

      const fullPrompt = `${systemPrompt}

${historyText ? `Previous conversation:\n${historyText}\n` : ''}
Student: ${message}

Respond naturally and helpfully. Keep response under 300 words.`;

      const response = await fetch(
        `/gemini-api/v1beta/models/gemini-2.0-flash:generateContent?key=${AI_CONFIG.apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: fullPrompt }] }],
            generationConfig: {
              temperature: isRoleplay ? 0.9 : 0.7,
              maxOutputTokens: 1024,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Gemini error: ${response.status}`);
      }

      const data = await response.json();
      const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

      if (!aiText) throw new Error('Empty response from Gemini');

      return {
        id: Date.now().toString(),
        role: 'assistant',
        content: aiText,
        timestamp: new Date(),
        language,
      };
    } catch (e) {
      console.warn('Gemini chat failed, using offline fallback:', e);
      return this.getMockResponse(context, message, language);
    }
  }

  // Get conversation history
  getConversationHistory(userId: string): ChatMessage[] {
    return this.conversationContext.get(userId)?.conversationHistory || [];
  }

  // Clear conversation
  clearConversation(userId: string): void {
    this.conversationContext.delete(userId);
  }

  // Get service status
  getStatus() {
    return {
      configured: !AI_CONFIG.useMockData && AI_CONFIG.apiKey.length > 0,
      model: AI_CONFIG.model,
      mode: AI_CONFIG.useMockData ? 'demo' : 'production'
    };
  }
}

export const aiChatService = new AIChatService();
