import { useState, useCallback } from "react";
import { Button } from "./ui/button";
import {
  ArrowLeft, BookOpen, Sparkles, Loader2, CheckCircle2,
  XCircle, Lightbulb, TrendingUp, TrendingDown, RotateCcw,
  PenLine, GraduationCap, Target, ChevronDown, ChevronUp,
  RefreshCw, FlaskConical, Languages
} from "lucide-react";
import { aiService, EssayGradingResult } from "../../services/aiService";

interface AIEssayGraderProps {
  onBack: () => void;
}

type Subject = "english" | "history" | "science" | "maths";

interface EssayQuestion {
  id: string;
  subject: string;
  question: string;
  modelAnswer: string;
  topic: string;
  points: number;
  hint?: string;
}

const SUBJECT_CONFIG: Record<Subject, {
  label: string; labelSi: string; color: string; light: string; text: string;
  border: string; icon: string; description: string; descriptionSi: string;
}> = {
  english: {
    label: "English", labelSi: "ඉංග්‍රීසි", icon: "📖",
    description: "Essay writing, comprehension, grammar & literature",
    descriptionSi: "රචනා ලිවීම, ව්‍යාකරණ, සාරාංශ · O/L ප්‍රශ්න 10",
    color: "from-blue-500 to-cyan-600",
    light: "from-blue-50 to-cyan-50",
    text: "text-blue-600",
    border: "border-blue-200",
  },
  history: {
    label: "History", labelSi: "ඉතිහාසය", icon: "🏛️",
    description: "Sri Lankan kingdoms, colonial era, world history",
    descriptionSi: "ශ්‍රී ලාංකික රාජධානි, යටත්විජිත යුගය, ලෝක ඉතිහාසය",
    color: "from-amber-500 to-orange-600",
    light: "from-amber-50 to-orange-50",
    text: "text-amber-600",
    border: "border-amber-200",
  },
  science: {
    label: "Science", labelSi: "විද්‍යාව", icon: "🔬",
    description: "Biology, chemistry & physics combined",
    descriptionSi: "ජීව විද්‍යාව, රසායන විද්‍යාව, භෞතික විද්‍යාව",
    color: "from-green-500 to-teal-600",
    light: "from-green-50 to-teal-50",
    text: "text-green-600",
    border: "border-green-200",
  },
  maths: {
    label: "Maths", labelSi: "ගණිතය", icon: "📐",
    description: "Algebra, geometry, trigonometry & statistics",
    descriptionSi: "වීජ ගණිතය, ජ්‍යාමිතිය, ත්‍රිකෝණමිතිය, සංඛ්‍යාන",
    color: "from-purple-500 to-violet-600",
    light: "from-purple-50 to-violet-50",
    text: "text-purple-600",
    border: "border-purple-200",
  },
};

// ── Hardcoded O/L Questions — 10 per subject ─────────────────────────────────
const QUESTIONS: Record<Subject, EssayQuestion[]> = {
  english: [
    {
      id: "en1", subject: "english", topic: "Formal Letter Writing", points: 20,
      question: "Write a formal letter to the Principal of your school requesting permission to organise an environmental awareness programme for students.",
      modelAnswer: "Dear Principal,\n\nI am writing to request your kind permission to organise an Environmental Awareness Programme for the students of our school. This programme aims to educate students on the importance of protecting our natural environment, particularly in the context of Sri Lanka's unique biodiversity.\n\nThe programme will include presentations on deforestation, waste management, and conservation of water resources. We plan to invite a guest speaker from the Central Environmental Authority and conduct a tree-planting activity in the school grounds.\n\nThe event will be held on a Saturday so that regular academic activities will not be disrupted. All necessary arrangements, including seating, materials, and refreshments, will be managed by the Student Environmental Club.\n\nWe believe this programme will greatly benefit the student community and instil a sense of environmental responsibility. I kindly request your approval and guidance for this initiative.\n\nYours faithfully,\n[Your Name]\nGrade 11, Class A",
      hint: "Include: purpose of the letter, details of the programme, why it is beneficial, polite closing"
    },
    {
      id: "en2", subject: "english", topic: "Descriptive Essay", points: 20,
      question: "Write a descriptive essay about a visit to a Sri Lankan village during the harvest season.",
      modelAnswer: "A Visit to a Sri Lankan Village During the Harvest Season\n\nThe morning mist still clung to the paddy fields as our vehicle wound its way along a narrow road lined with coconut palms. We had come to my grandmother's village in the Kurunegala district during the rice harvest season, and the entire countryside was alive with colour and activity.\n\nThe golden paddy stretched endlessly across the flat land, swaying gently in the cool breeze. Groups of men and women worked rhythmically, their sickles glinting in the early sunlight. The sound of their laughter and traditional harvest songs filled the air, creating a melody that seemed to belong to the earth itself.\n\nChildren darted between the sheaves, helping to gather the fallen grain. The smell of fresh paddy mingled with the earthy fragrance of the damp soil, creating a scent that was both rich and comforting. Bullock carts stood ready at the edges of the field, waiting to carry the harvest to the threshing floor.\n\nIn the evening, the whole village gathered to share a meal of rice, vegetables, and traditional sweets. The warm glow of oil lamps lit the faces of young and old alike, as they gave thanks for the bounty of the land. It was a moment of pure joy, reminding me of the deep connection between the Sri Lankan people and their fertile, generous soil.",
      hint: "Use sensory details (sight, sound, smell), describe people and activities, include emotions and atmosphere"
    },
    {
      id: "en3", subject: "english", topic: "Reading Comprehension", points: 15,
      question: "Read the following passage and answer the questions below.\n\n'Sri Lanka's mangrove forests play a vital role in protecting coastal communities from floods and erosion. These dense forests act as a natural barrier against strong waves and storm surges. They also provide a habitat for hundreds of species of fish, birds, and crustaceans. Despite their importance, mangrove forests are being rapidly destroyed due to urban development and shrimp farming.'\n\n(a) What is the main function of mangrove forests according to the passage? (b) Name TWO creatures that live in mangrove habitats. (c) Give TWO reasons for the destruction of mangroves. (d) Suggest a title for this passage.",
      modelAnswer: "(a) The main function of mangrove forests is to protect coastal communities from floods and erosion by acting as a natural barrier against strong waves and storm surges.\n\n(b) Two creatures that live in mangrove habitats are fish and birds. (Also acceptable: crustaceans)\n\n(c) Two reasons for the destruction of mangroves are:\n1. Urban development\n2. Shrimp farming\n\n(d) A suitable title: 'The Importance and Threat to Sri Lanka's Mangrove Forests' (Accept any reasonable title that reflects the content.)",
      hint: "Answer each part clearly and directly, use full sentences, refer back to the passage"
    },
    {
      id: "en4", subject: "english", topic: "Argumentative Essay", points: 25,
      question: "Write an argumentative essay for or against the following statement: 'Mobile phones should be banned in schools.'",
      modelAnswer: "Mobile Phones Should Be Banned in Schools\n\nIn today's digital age, mobile phones have become an inseparable part of daily life. However, the question of whether they should be permitted in schools continues to spark debate among educators, parents, and students alike. I firmly believe that mobile phones should be banned in schools, as their presence causes more harm than good in an academic environment.\n\nFirstly, mobile phones are a major source of distraction. Students who bring phones to school are tempted to check social media, play games, or send messages during lessons. This reduces their concentration and academic performance. Research consistently shows that students who avoid phone use during class achieve significantly better results.\n\nSecondly, mobile phones contribute to cyberbullying. When students have unrestricted access to their devices, they may use them to share harmful messages, images, or videos, targeting their peers. This can cause serious emotional and psychological harm, disrupting the safe learning environment that schools must maintain.\n\nFurthermore, schools provide all necessary resources for learning. Libraries, computer labs, and textbooks are available for educational purposes. Students do not need personal mobile phones to access information during school hours.\n\nIn conclusion, while mobile phones have their uses, their negative impact on concentration, social behaviour, and school safety outweighs any potential benefits. A ban on mobile phones in schools would lead to a more focused, respectful, and productive learning environment for all.",
      hint: "Clearly state your position, provide at least 3 arguments with examples, write a strong conclusion"
    },
    {
      id: "en5", subject: "english", topic: "Summary Writing", points: 15,
      question: "Read the passage below and write a summary in about 60–70 words.\n\n'The ancient city of Anuradhapura is one of Sri Lanka's greatest archaeological treasures. Founded over 2,500 years ago, it served as the first capital of the Sinhalese kingdom. The city is home to magnificent dagobas, ancient reservoirs called wewas, and the sacred Sri Maha Bodhi tree, which is believed to be the oldest living tree in the world with a documented history. Today, Anuradhapura is a UNESCO World Heritage Site visited by pilgrims and tourists from around the globe.'",
      modelAnswer: "Anuradhapura is one of Sri Lanka's most important ancient cities, established over 2,500 years ago as the first Sinhalese capital. It contains remarkable historical monuments including large dagobas, ancient irrigation reservoirs, and the famous Sri Maha Bodhi tree, reputed to be the world's oldest documented living tree. Recognised as a UNESCO World Heritage Site, Anuradhapura today attracts both religious pilgrims and international tourists.",
      hint: "Include only main ideas, do not copy sentences directly, use your own words, stay within the word limit"
    },
    {
      id: "en6", subject: "english", topic: "Grammar – Tenses & Voice", points: 15,
      question: "Rewrite the following sentences as instructed.\n(a) The farmer planted rice in the paddy field. (Change to passive voice)\n(b) She said, 'I am going to Kandy tomorrow.' (Change to reported speech)\n(c) If it rains, we will cancel the match. (Begin with: 'Were it...')\n(d) He has been studying for three hours. (Change to simple past)\n(e) The students are writing the examination now. (Change to past continuous)",
      modelAnswer: "(a) Rice was planted in the paddy field by the farmer.\n(b) She said that she was going to Kandy the next day.\n(c) Were it to rain, we would cancel the match.\n(d) He studied for three hours.\n(e) The students were writing the examination then.",
      hint: "For passive voice: object becomes subject + was/were + past participle; for reported speech: change pronouns and tense"
    },
    {
      id: "en7", subject: "english", topic: "Directed Writing – Notice", points: 15,
      question: "You are the Secretary of the Science Society of your school. Write a notice informing students about an inter-school science exhibition to be held at your school. Include all necessary details.",
      modelAnswer: "SCIENCE SOCIETY\nST. JOSEPH'S NATIONAL SCHOOL\n\nNOTICE\n\nINTER-SCHOOL SCIENCE EXHIBITION\n\nAll students are hereby informed that our school will be hosting the Annual Inter-School Science Exhibition on 15th July 2025 from 9.00 a.m. to 4.00 p.m. in the School Hall.\n\nStudents from Grades 6 to 11 are invited to submit project entries on the theme 'Science for a Sustainable Future.' Projects must be submitted to the Science Laboratory by 10th July 2025.\n\nAll are welcome to visit the exhibition. For further details, please contact the Science Society notice board or the undersigned.\n\nN. Perera\nSecretary\nScience Society\nDate: 25.06.2025",
      hint: "Include: heading, title, date/time/venue, purpose, instructions, signature and date"
    },
    {
      id: "en8", subject: "english", topic: "Literature – Poetry Analysis", points: 20,
      question: "Describe how the poet uses nature to express human emotions in any poem you have studied. Support your answer with examples from the poem.",
      modelAnswer: "In the poem 'The Road Not Taken' by Robert Frost, the poet uses the image of two paths in a forest to represent the choices people face in life. Nature serves as a powerful metaphor for human decision-making and the emotions that accompany it.\n\nThe 'two roads' symbolise two different life choices, while the yellow wood suggests autumn — a time of change and uncertainty. The poet's hesitation at the fork in the road reflects the difficulty of making important decisions. He feels a sense of wistfulness, wishing he could travel both paths.\n\nThe phrase 'way leads on to way' suggests that once a choice is made in life, it is difficult to return. The natural imagery makes the emotional journey feel universal and relatable.\n\nAt the end of the poem, the speaker imagines looking back on his choice 'with a sigh,' suggesting both satisfaction and a touch of regret — emotions that are deeply human. Through the simple but vivid setting of a forest path, Frost successfully captures the complexity of human choice and feeling.",
      hint: "Name the poem and poet, identify the nature imagery, explain what emotions it represents, quote from the poem"
    },
    {
      id: "en9", subject: "english", topic: "Informal Letter Writing", points: 20,
      question: "Write a letter to your friend living in another country describing the celebration of a Sri Lankan festival you recently attended.",
      modelAnswer: "14, Temple Road,\nKolonnawa,\n10th May 2025\n\nDear Saman,\n\nHow are you? I hope you and your family are all well. I'm writing to tell you about the wonderful Vesak festival celebrations we had here last week — I wish you could have been here to experience it!\n\nVesak, which falls on the full moon day in May, is the most sacred Buddhist festival in Sri Lanka. Our whole street was decorated with colourful Vesak lanterns that glowed like stars in the evening sky. The sight was truly breathtaking.\n\nMy family visited the nearby temple for prayers in the morning. In the evening, we walked along the road admiring the elaborate dansalas — stalls set up by kind-hearted people offering free food and drinks to everyone passing by. We enjoyed pittu, string hoppers, and delicious kavum!\n\nThere were also pandols — large illuminated panels depicting stories from the life of the Buddha — set up in the town. The music and lights created a magical atmosphere that I'll never forget.\n\nI do hope you'll be able to visit Sri Lanka during Vesak one day. It's an experience like no other.\n\nWrite back soon!\n\nYour friend,\nKavinda",
      hint: "Use informal language, describe the festival in detail, include sights, sounds and food, express emotions"
    },
    {
      id: "en10", subject: "english", topic: "Directed Writing – Report", points: 20,
      question: "You attended a road safety awareness programme held at your school. Write a report about the event for your school magazine.",
      modelAnswer: "ROAD SAFETY AWARENESS PROGRAMME AT VISHAKA VIDYALAYA\n\nA Road Safety Awareness Programme was held at Vishaka Vidyalaya, Colombo, on 20th April 2025. The event was organised jointly by the school's Prefects' Board and the Sri Lanka Police Traffic Division.\n\nThe programme commenced at 9.00 a.m. in the school hall. Inspector N. Silva of the Colombo Traffic Police delivered the keynote address, highlighting the alarming increase in road accidents involving school students. He stressed the importance of obeying traffic signals, using pedestrian crossings, and wearing helmets when cycling.\n\nA short documentary on road accident statistics in Sri Lanka was screened, which had a powerful impact on the audience. Students also participated in a quiz competition and a poster-making contest on the theme 'Safe Roads Save Lives.' The winners were awarded certificates by the Principal.\n\nThe programme concluded at 12.30 p.m. with a vote of thanks delivered by the Head Prefect. All participants agreed that the event had been highly informative and expressed their commitment to practising safe road behaviour.\n\nReported by: K. Mendis, Grade 11B",
      hint: "Include: heading, date/venue, purpose, what happened, key points discussed, conclusion, reporter's name"
    },
  ],

  history: [
    {
      id: "hi1", subject: "history", topic: "Anuradhapura Kingdom", points: 20,
      question: "Describe the achievements of King Dutugamunu and explain his significance in Sri Lankan history.",
      modelAnswer: "King Dutugamunu, who reigned in the 2nd century BCE, is one of the most celebrated monarchs in Sri Lankan history. His significance lies both in his military victories and his contributions to Buddhist civilisation.\n\nDutugamunu is best known for defeating the South Indian king Elara in battle, thereby reuniting the island under a single Sinhalese king for the first time. According to the Mahavamsa, he felt great remorse for the lives lost in war and undertook extensive religious and architectural works as acts of merit.\n\nHis most outstanding achievement was the construction of the Ruwanwelisaya dagoba in Anuradhapura, one of the largest stupas in the ancient world. He also built the Lohaprasada (Brazen Palace), a nine-storey building said to have had 1,000 rooms, which served as a residence for Buddhist monks.\n\nDutugamunu was also responsible for bringing order and security to the kingdom, improving irrigation systems, and promoting the welfare of his subjects. He is regarded as a national hero in Sri Lanka, and his story is preserved in detail in the Mahavamsa chronicle.\n\nHis reign represents a golden period in Anuradhapura's history, and his legacy as a defender of Buddhism and a unifier of the nation continues to inspire Sri Lankans today.",
      hint: "Cover: military achievements, religious buildings, Ruwanwelisaya, unification of Sri Lanka, Mahavamsa reference"
    },
    {
      id: "hi2", subject: "history", topic: "British Colonial Rule", points: 20,
      question: "Explain how British colonial rule changed the economic and social structure of Sri Lanka.",
      modelAnswer: "British colonial rule, which began in 1815 with the signing of the Kandyan Convention, brought fundamental changes to Sri Lanka's economy and society.\n\nEconomically, the British transformed Sri Lanka into a plantation economy. They introduced large-scale cultivation of coffee, and later tea and rubber, replacing the traditional subsistence agricultural system. The hill country forests were cleared for estate plantations, and thousands of Tamil labourers were brought from South India to work on these estates. This created a new social class and permanently altered the demographic composition of the island.\n\nThe British also developed infrastructure to support the export economy. Railways, roads, and a postal system were constructed, primarily to transport plantation goods to the port of Colombo. The economy became heavily dependent on the export of cash crops, which made it vulnerable to changes in world commodity prices.\n\nSocially, the British introduced an English-medium education system, which created a Western-educated elite class. This group gained access to government jobs and positions of influence, widening the gap between the educated elite and the rural population.\n\nThe British also introduced Roman-Dutch law alongside their own legal system, and Christian missionary activity influenced education and social norms. The traditional Sinhalese and Tamil social structures were disrupted, and a new professional class emerged.\n\nThese changes laid the foundations for many of the social and economic challenges Sri Lanka faced after independence in 1948.",
      hint: "Cover: plantation economy, tea/rubber, Tamil labour, infrastructure, English education, social class changes"
    },
    {
      id: "hi3", subject: "history", topic: "Kandyan Kingdom", points: 20,
      question: "Describe the significance of the Kandyan Convention of 1815 and its impact on Sri Lanka.",
      modelAnswer: "The Kandyan Convention, signed on 2nd March 1815, marked the end of the last independent kingdom in Sri Lanka and the beginning of complete British control over the island.\n\nBefore 1815, the British had already captured the Maritime Provinces (coastal areas) from the Dutch in 1796. However, the Kandyan Kingdom in the central highlands remained independent. Following a rebellion by Kandyan chiefs against King Sri Vikrama Rajasinha, who was considered a tyrannical and foreign ruler from South India, the chiefs invited the British to negotiate.\n\nThe Convention was signed at the Audience Hall in Kandy between the British Governor Robert Brownrigg and the Kandyan chiefs. Under its terms, the Kandyan Kingdom was ceded to the British Crown. The Convention guaranteed the protection of Buddhism, the preservation of the rights and privileges of the Kandyan chiefs and people, and the continuation of existing laws and customs.\n\nHowever, many of these promises were not fully honoured. The Uva-Wellassa Rebellion of 1817–1818, led by Keppetipola Disawe and others, showed widespread resistance to British rule. The British suppressed this rebellion with great brutality, burning villages and destroying crops in the Uva province.\n\nThe Kandyan Convention is significant because it unified the entire island under a single colonial power for the first time, creating the administrative foundation for modern Sri Lanka.",
      hint: "Cover: date and parties involved, terms of the Convention, promises made, consequences, Uva rebellion"
    },
    {
      id: "hi4", subject: "history", topic: "Independence Movement 1948", points: 25,
      question: "Discuss the key factors and events that led to Sri Lanka gaining independence from Britain in 1948.",
      modelAnswer: "Sri Lanka gained independence on 4th February 1948 following decades of political campaigning by nationalist leaders and the broader context of the weakening of the British Empire after World War II.\n\nThe independence movement began with the formation of the Ceylon National Congress in 1919, which initially sought greater participation of Sri Lankans in the colonial government. Leaders such as E.W. Perera, Ponnambalam Arunachalam, and later D.S. Senanayake advocated for political reforms.\n\nThe Donoughmore Constitution of 1931 was a major milestone. It introduced universal suffrage, giving all adults the right to vote regardless of gender or education — one of the earliest countries in Asia to do so. This empowered ordinary Sri Lankans and promoted democratic participation.\n\nD.S. Senanayake, who became the dominant political figure of the late colonial period, worked pragmatically within the British political framework rather than through confrontation. He established the United National Party (UNP) in 1946 and negotiated independence peacefully.\n\nThe end of World War II significantly weakened Britain and accelerated the decolonisation process across Asia. India gained independence in 1947, which strengthened the case for Ceylon's independence.\n\nOn 4th February 1948, Ceylon (Sri Lanka) became a self-governing dominion within the Commonwealth, with D.S. Senanayake as its first Prime Minister. This date is celebrated annually as National Independence Day.",
      hint: "Cover: Ceylon National Congress, Donoughmore Constitution, D.S. Senanayake, World War II impact, date of independence"
    },
    {
      id: "hi5", subject: "history", topic: "Ancient World Civilizations", points: 20,
      question: "Compare the contributions of the ancient Egyptian and Mesopotamian civilisations to human progress.",
      modelAnswer: "The ancient civilisations of Egypt and Mesopotamia were two of the world's earliest great cultures, both arising around 5,000 years ago along major river systems — the Nile in Egypt and the Tigris-Euphrates in Mesopotamia (modern Iraq).\n\nEgypt is renowned for its monumental architecture, particularly the pyramids and the Sphinx at Giza. These structures demonstrate extraordinary engineering skills and reflect the Egyptians' beliefs in life after death. The Egyptians also developed a sophisticated writing system called hieroglyphics, which was used to record religious texts and official documents on papyrus.\n\nThe Mesopotamians, particularly the Sumerians, developed one of the world's first writing systems — cuneiform, inscribed on clay tablets. They also produced the Code of Hammurabi, one of the earliest written legal codes, which established laws governing trade, property, and social behaviour.\n\nBoth civilisations made important contributions to mathematics and astronomy. The Egyptians used geometry for land measurement and pyramid construction, while the Mesopotamians created a base-60 number system still used today in measuring time (60 seconds in a minute, 60 minutes in an hour).\n\nIn agriculture, both civilisations developed irrigation systems to manage water from their respective rivers, supporting large populations. In medicine, the Egyptians documented treatments for various diseases, while Mesopotamian priests also practised healing.\n\nTogether, these civilisations laid the groundwork for science, law, architecture, and writing — forming the foundation of Western and world civilisation.",
      hint: "Cover: location, writing systems, architecture, mathematics/astronomy, agriculture, legal systems"
    },
    {
      id: "hi6", subject: "history", topic: "Portuguese Rule in Sri Lanka", points: 20,
      question: "Describe the impact of Portuguese rule on Sri Lanka from 1505 to 1658.",
      modelAnswer: "The Portuguese arrived in Sri Lanka in 1505 when a fleet led by Lourenço de Almeida landed in Galle. Over the following century and a half, they established control over the coastal areas of the island, known as the Maritime Provinces.\n\nThe Portuguese came primarily for trade, seeking to control the lucrative spice trade, particularly cinnamon, which grew abundantly in Sri Lanka. They established trading posts and forts, including the famous fort at Colombo.\n\nOne of the most significant and controversial impacts of Portuguese rule was the promotion of Christianity. Catholic missionaries, particularly Franciscans and Jesuits, converted thousands of Sri Lankans, especially among the fishing communities along the western and northern coasts. Many temples and kovils were destroyed, and Buddhist and Hindu institutions were suppressed.\n\nThe Portuguese also brought new crops to Sri Lanka, including tobacco, cashew, and papaya, which became permanent features of Sri Lankan agriculture and diet.\n\nPolitically, the Portuguese interfered in the succession disputes of the Kotte and Jaffna kingdoms, installing rulers sympathetic to their interests. Their rule weakened the coastal kingdoms significantly.\n\nHowever, the Portuguese never succeeded in conquering the Kandyan Kingdom, which remained independent largely due to its mountainous terrain.\n\nPortuguese rule ended in 1658 when the Dutch, allied with the Kandyan king Rajasinha II, expelled them from the coastal territories.",
      hint: "Cover: arrival date, trade, Christianity and conversions, destruction of temples, new crops, end of Portuguese rule"
    },
    {
      id: "hi7", subject: "history", topic: "World War I & II", points: 25,
      question: "Explain the causes of World War I and describe how it affected countries beyond Europe.",
      modelAnswer: "World War I, fought from 1914 to 1918, was caused by a complex web of political, military, and national tensions that had been building in Europe for decades.\n\nThe immediate cause was the assassination of Archduke Franz Ferdinand of Austria-Hungary in Sarajevo on 28th June 1914. This single event triggered a chain reaction due to the alliance system that had divided Europe into two armed camps: the Triple Alliance (Germany, Austria-Hungary, and Italy) and the Triple Entente (Britain, France, and Russia).\n\nThe underlying causes included nationalism — particularly the desire of Slavic peoples for independence — imperialism, as European powers competed for colonies worldwide, militarism, as nations built up enormous armies and navies, and the rigid alliance system that meant a small conflict could rapidly escalate.\n\nThe war quickly spread beyond Europe. Britain's colonies, including India, Australia, Canada, and South Africa, sent hundreds of thousands of troops to the front. Ceylon (Sri Lanka) also contributed soldiers and resources to the British war effort.\n\nThe Middle East became a major theatre of war, with Britain and France fighting the Ottoman Empire. This led to the dismemberment of the Ottoman Empire and the creation of new nations in the Arab world, the consequences of which are still felt today.\n\nThe war ended in 1918 with Germany's defeat. The Treaty of Versailles imposed harsh penalties on Germany, which many historians argue planted the seeds of World War II just two decades later.",
      hint: "Cover: assassination of Franz Ferdinand, alliance system, MAIN causes, spread to colonies, impact on Asia/Middle East, Treaty of Versailles"
    },
    {
      id: "hi8", subject: "history", topic: "Polonnaruwa Kingdom", points: 20,
      question: "Describe the achievements of King Parakramabahu I and explain how he transformed Polonnaruwa.",
      modelAnswer: "King Parakramabahu I (1153–1186 CE) is regarded as the greatest monarch of the Polonnaruwa Kingdom and one of the most outstanding rulers in Sri Lankan history. His reign is considered a golden age of civilisation.\n\nHis most famous achievement was the unification of Sri Lanka. At the time of his rise to power, the island was divided into three kingdoms — Ruhuna, Pihiti, and Maya. Parakramabahu I united all three under his rule, declaring his famous principle: 'Not even a little water that comes from the rain must flow into the ocean without being made useful to man.'\n\nThis philosophy guided his extraordinary irrigation works. He built or restored over 165 dams, 3,910 canals, 163 major tanks, and 2,376 minor tanks. The Parakrama Samudra (Sea of Parakrama), an enormous reservoir covering 2,400 hectares, still stands today as a testament to his engineering genius.\n\nParakramabahu I was also a great patron of Buddhism. He built the Lankathilaka, Thuparama, and Rankoth Vehera temples, and reformed the Buddhist Sangha by unifying the three sects of monks.\n\nHe conducted military campaigns in South India and Myanmar (Burma), demonstrating Sri Lanka's international power. He also developed Polonnaruwa into a magnificent city with palaces, pleasure gardens, and libraries.\n\nHis reign represents the height of medieval Sri Lankan civilisation.",
      hint: "Cover: unification, irrigation works, Parakrama Samudra quote, Buddhist buildings, military campaigns"
    },
    {
      id: "hi9", subject: "history", topic: "Non-Aligned Movement", points: 20,
      question: "Explain the origins and objectives of the Non-Aligned Movement and Sri Lanka's role in it.",
      modelAnswer: "The Non-Aligned Movement (NAM) was established in 1961 during the height of the Cold War, when the world was divided between two superpowers — the United States and the Soviet Union. Many newly independent nations of Asia, Africa, and Latin America refused to align themselves with either bloc.\n\nThe movement grew from the Bandung Conference held in Indonesia in 1955, attended by 29 African and Asian nations. Its founding leaders included Jawaharlal Nehru of India, Gamal Abdel Nasser of Egypt, Josip Broz Tito of Yugoslavia, Kwame Nkrumah of Ghana, and Sukarno of Indonesia.\n\nThe core objectives of NAM were: to maintain national sovereignty and independence, to oppose colonialism and imperialism, to promote peaceful coexistence between nations, and to allow developing countries to chart their own foreign policies without pressure from superpowers.\n\nSri Lanka played an active and respected role in the movement. Prime Minister Sirimavo Bandaranaike, the world's first female prime minister, was a strong advocate of non-alignment and was instrumental in organising the 5th NAM Summit in Colombo in 1976, which Sri Lanka hosted. This summit attracted leaders from over 85 nations.\n\nSri Lanka's participation in NAM helped the country maintain diplomatic relations with both Eastern and Western blocs, receive aid and development assistance from multiple sources, and strengthen its international standing as an independent nation.",
      hint: "Cover: Cold War context, Bandung Conference, founding leaders, objectives, Sri Lanka's role, 1976 Colombo Summit"
    },
    {
      id: "hi10", subject: "history", topic: "Dutch Rule in Sri Lanka", points: 20,
      question: "Compare the Dutch and Portuguese colonial rule in Sri Lanka, highlighting the key differences in their policies.",
      modelAnswer: "Both the Portuguese (1505–1658) and the Dutch (1658–1796) controlled the coastal areas of Sri Lanka, but their approaches to governance differed significantly.\n\nThe Portuguese came primarily as Catholic missionaries and traders. They aggressively promoted Christianity, destroying Buddhist temples, Hindu kovils, and mosques. Many Sri Lankans were forcibly converted, and Portuguese surnames (such as Perera, Fernando, and Silva) became common among coastal communities.\n\nThe Dutch, who were Protestant Christians, were less focused on religious conversion. While they did promote Protestantism to some extent and many conversions occurred, their primary motivation was commerce rather than religion. Dutch surnames such as Van der Wall and Jansz were adopted by some communities.\n\nBoth powers used Sri Lanka's cinnamon trade as a major economic priority. The Portuguese imposed heavy taxes and a monopoly on trade. The Dutch were more systematic in their commercial approach, establishing the Dutch East India Company (VOC) as a powerful trading monopoly. They also introduced Roman-Dutch law, which influenced Sri Lanka's legal system long after their departure.\n\nIn terms of administration, the Dutch were more organised and less brutal than the Portuguese. They constructed better roads, introduced a land registration system, and kept more detailed records.\n\nBoth colonial powers failed to conquer the Kandyan Kingdom, which remained independent throughout this period.\n\nDutch rule ended in 1796 when the British took control of the Maritime Provinces.",
      hint: "Cover: religion and conversion policies, trade and economics, administration differences, legal systems, relationship with Kandyan Kingdom"
    },
  ],

  science: [
    {
      id: "sc1", subject: "science", topic: "Photosynthesis & Plant Biology", points: 20,
      question: "Explain the process of photosynthesis. Describe how a Sri Lankan farmer could use scientific knowledge of photosynthesis to increase crop yield.",
      modelAnswer: "Photosynthesis is the process by which green plants use sunlight, water, and carbon dioxide to produce glucose (food) and oxygen. The process takes place mainly in the leaves, in the chloroplasts, which contain the green pigment chlorophyll.\n\nThe chemical equation for photosynthesis is:\n6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂\n\nThe process has two main stages:\n1. Light reactions: Chlorophyll absorbs sunlight and splits water molecules, releasing oxygen as a by-product and producing energy-rich molecules (ATP).\n2. Dark reactions (Calvin cycle): Carbon dioxide from the air is used to produce glucose using the energy from the light reactions.\n\nFactors affecting photosynthesis include light intensity, carbon dioxide concentration, water availability, and temperature.\n\nA Sri Lankan farmer can apply this knowledge in several ways:\n- Ensure adequate irrigation to provide water, as drought reduces photosynthesis and crop yield.\n- Use fertilisers containing magnesium, which is needed for chlorophyll production.\n- Plant crops at appropriate spacing so all leaves receive sufficient sunlight.\n- Grow crops in greenhouses where CO₂ levels and temperature can be controlled.\n- Choose crop varieties with broad leaves that can absorb more light energy.\n\nBy understanding photosynthesis, farmers in Sri Lanka's rice and tea industries can optimise growing conditions and achieve higher yields.",
      hint: "Include: definition, equation, chlorophyll, light and dark reactions, factors affecting it, practical farming applications"
    },
    {
      id: "sc2", subject: "science", topic: "Human Circulatory System", points: 20,
      question: "Describe the structure and function of the human heart and explain how blood circulates through the body.",
      modelAnswer: "The human heart is a muscular organ located slightly to the left of the centre of the chest. It is divided into four chambers: two upper chambers called atria (right atrium and left atrium) and two lower chambers called ventricles (right ventricle and left ventricle). The left and right sides are separated by a muscular wall called the septum.\n\nThe heart functions as a double pump:\n\nPulmonary circulation: Deoxygenated blood from the body enters the right atrium, passes into the right ventricle, and is pumped to the lungs through the pulmonary artery. In the lungs, carbon dioxide is released and oxygen is absorbed. Oxygenated blood returns to the left atrium through the pulmonary veins.\n\nSystemic circulation: Oxygenated blood from the left atrium enters the left ventricle and is pumped out through the aorta (the largest artery) to all parts of the body. Oxygen and nutrients are delivered to cells. The deoxygenated blood returns to the right atrium through the veins (vena cava).\n\nThe heart contains valves — the bicuspid valve (mitral valve) between the left atrium and ventricle, and the tricuspid valve on the right — which prevent backflow of blood.\n\nThe heartbeat is controlled by electrical signals originating from the sinoatrial (SA) node, known as the natural pacemaker. A healthy adult heart beats 60–80 times per minute.\n\nBlood vessels include arteries (carry blood from the heart), veins (carry blood to the heart), and capillaries (thin vessels where gas exchange occurs).",
      hint: "Cover: four chambers, double circulation, pulmonary and systemic circuits, valves, blood vessels, heartbeat rate"
    },
    {
      id: "sc3", subject: "science", topic: "Ecosystems & Food Chains", points: 20,
      question: "Using examples from Sri Lanka, explain the concepts of food chains, food webs, and the importance of maintaining biodiversity in ecosystems.",
      modelAnswer: "A food chain is a sequence showing how energy and nutrients pass from one organism to another in an ecosystem. Each organism in the chain feeds on the one before it.\n\nA Sri Lankan paddy field food chain:\nRice plant → Grasshopper → Frog → Snake → Hawk\n\nIn this chain, the rice plant is the producer (it makes food through photosynthesis). The grasshopper is the primary consumer, the frog is the secondary consumer, the snake is the tertiary consumer, and the hawk is the apex predator.\n\nA food web is a more realistic representation of feeding relationships, as most organisms eat more than one type of food. In Sri Lanka's Sinharaja Rainforest, for example, many animals share food sources — fruiting trees feed birds, monkeys, and insects; these are in turn eaten by multiple predators.\n\nEnergy is lost at each step of the food chain (only about 10% is passed on), which is why there are fewer organisms at higher levels (the energy pyramid).\n\nBiodiversity — the variety of plant and animal species in an ecosystem — is essential for several reasons:\n- It maintains ecological balance. If one species disappears, the whole food web is disrupted.\n- Sri Lanka is a biodiversity hotspot with many endemic species (found nowhere else). The Sri Lankan Leopard, for example, is the apex predator in many ecosystems.\n- Biodiversity provides resources for food, medicine, and industry.\n- Ecosystems with high biodiversity are more resilient to environmental change.\n\nThreats to Sri Lankan biodiversity include deforestation, habitat destruction, poaching, and climate change.",
      hint: "Include: food chain example with Sri Lankan organisms, producer/consumer labels, food web explanation, energy pyramid, importance of biodiversity"
    },
    {
      id: "sc4", subject: "science", topic: "Atoms, Elements & Compounds", points: 20,
      question: "Explain the difference between elements, compounds, and mixtures. Give examples from everyday Sri Lankan life and explain how a mixture can be separated.",
      modelAnswer: "An element is a substance made of only one type of atom that cannot be broken down into simpler substances by chemical means. Examples include oxygen (O), iron (Fe), and gold (Au).\n\nA compound is a substance formed when two or more elements chemically combine in fixed proportions. Compounds have different properties from the elements they contain. Examples relevant to Sri Lanka:\n- Water (H₂O) — essential for paddy cultivation\n- Table salt (NaCl) — used in Sri Lankan cuisine\n- Carbon dioxide (CO₂) — produced when burning firewood\n- Calcium carbonate (CaCO₃) — the main component of limestone used in construction\n\nA mixture consists of two or more substances physically combined, where each substance retains its own properties. Mixtures have no fixed composition and can be separated by physical means. Examples:\n- Sea water (salt dissolved in water)\n- Coconut sambol (a mixture of grated coconut, chilli, and onion)\n- Air (a mixture of nitrogen, oxygen, argon, and other gases)\n\nMethods of separating mixtures:\n1. Filtration — separates insoluble solids from liquids (e.g., filtering sand from water)\n2. Evaporation — removing water to obtain dissolved solids (e.g., making salt from sea water at Hambantota salt flats)\n3. Distillation — separating liquids with different boiling points\n4. Magnetic separation — separating iron filings from sand using a magnet\n5. Decanting — pouring off a liquid from a settled solid",
      hint: "Cover: definitions and examples of each, differences between them, Sri Lankan examples, 3–4 separation methods"
    },
    {
      id: "sc5", subject: "science", topic: "Acids, Bases & Salts", points: 20,
      question: "Describe the properties of acids and bases, explain how to identify them using indicators, and describe a neutralisation reaction with a Sri Lankan example.",
      modelAnswer: "Acids are substances that release hydrogen ions (H⁺) when dissolved in water. They have a sour taste, react with metals to produce hydrogen gas, and turn blue litmus paper red. The pH of an acid is below 7. Common acids include hydrochloric acid (HCl), sulphuric acid (H₂SO₄), and natural acids found in food — citric acid in lime (a very common ingredient in Sri Lankan cooking) and acetic acid in vinegar.\n\nBases are substances that release hydroxide ions (OH⁻) in solution. They have a bitter taste, feel slippery, and turn red litmus paper blue. The pH of a base is above 7. Alkalis are bases that dissolve in water. Examples include sodium hydroxide (NaOH) and calcium hydroxide — used to lime paddy fields in Sri Lanka to reduce soil acidity.\n\nIndicators are substances that change colour depending on whether a solution is acidic or basic:\n- Litmus paper: turns red in acid, blue in base\n- Universal indicator: gives a range of colours from red (strongly acidic) to purple (strongly basic)\n- pH 7 is neutral (e.g., pure water)\n\nNeutralisation occurs when an acid and a base react to form a salt and water:\nAcid + Base → Salt + Water\nHCl + NaOH → NaCl + H₂O\n\nSri Lankan example: When a Sri Lankan farmer applies lime (calcium hydroxide) to acidic paddy soil, neutralisation occurs, raising the pH and making the soil suitable for growing rice. This is a practical application of neutralisation chemistry in agriculture.",
      hint: "Cover: properties of acids and bases, pH scale, litmus/universal indicator, neutralisation equation, practical Sri Lankan agricultural example"
    },
    {
      id: "sc6", subject: "science", topic: "Force, Motion & Energy", points: 20,
      question: "Explain Newton's three laws of motion and give a practical example of each from everyday Sri Lankan life.",
      modelAnswer: "Newton's three laws of motion describe the relationship between forces and the motion of objects.\n\nNewton's First Law (Law of Inertia): An object will remain at rest or continue to move in a straight line at constant speed unless acted upon by an external force.\nSri Lankan example: A coconut resting on the ground will remain there until someone kicks it. A cricket ball bowled on a pitch would continue forever if there were no friction or air resistance to slow it down.\n\nNewton's Second Law: The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass. (F = ma)\nSri Lankan example: A heavy loaded lorry (large mass) needs a much more powerful engine (greater force) to accelerate than an empty tuk-tuk. If you push a loaded bullock cart harder, it accelerates faster.\n\nNewton's Third Law: For every action, there is an equal and opposite reaction.\nSri Lankan example: When a fisherman pushes a traditional oru (outrigger canoe) away from the shore with a pole, the boat moves forward while the pole pushes back against the river bank. When a gun is fired during a military parade, the bullet shoots forward and the gun recoils backward.\n\nThese laws are fundamental to understanding motion and are applied in engineering, transport, and sports throughout Sri Lanka.",
      hint: "State each law clearly, give a Sri Lankan-specific example for each, explain how the example illustrates the law"
    },
    {
      id: "sc7", subject: "science", topic: "Light – Reflection & Refraction", points: 20,
      question: "Explain the laws of reflection and refraction of light. Describe one practical application of each in everyday life in Sri Lanka.",
      modelAnswer: "Reflection is the bouncing back of light when it hits a surface. The two laws of reflection are:\n1. The angle of incidence equals the angle of reflection (both measured from the normal).\n2. The incident ray, the reflected ray, and the normal at the point of incidence all lie in the same plane.\n\nA plane mirror produces a virtual, upright image that is the same size as the object but laterally inverted (left-right reversed). Curved mirrors — concave and convex — produce different types of images.\n\nSri Lankan application of reflection: Rear-view mirrors and wing mirrors in cars and three-wheelers (tuk-tuks) use the principle of reflection, allowing drivers to see behind and beside them without turning around. Concave mirrors are used in dental examination in hospitals.\n\nRefraction is the bending of light when it passes from one medium to another of different optical density. This occurs because light changes speed when it moves between media. The laws of refraction (Snell's Law) state that the ratio of the sine of the angle of incidence to the sine of the angle of refraction is constant for two given media.\n\nWhen light passes from air into a denser medium (like glass or water), it bends towards the normal. When it passes from a denser to a less dense medium, it bends away from the normal.\n\nSri Lankan application of refraction: Convex lenses are used in spectacles prescribed to Sri Lankan patients with long-sightedness (hyperopia). Concave lenses correct short-sightedness. Lenses in cameras used by Sri Lankan wildlife photographers in Yala National Park also depend on refraction to focus images.",
      hint: "State laws of reflection and refraction, draw or describe diagrams, give Sri Lankan real-life applications for each"
    },
    {
      id: "sc8", subject: "science", topic: "Electricity & Circuits", points: 20,
      question: "Explain Ohm's Law and describe the difference between series and parallel circuits. Explain which type is used in household wiring and why.",
      modelAnswer: "Ohm's Law states that the current flowing through a conductor is directly proportional to the potential difference (voltage) across it, provided the temperature remains constant.\n\nFormula: V = IR\nWhere V = voltage (volts), I = current (amperes), R = resistance (ohms)\n\nThis means if the voltage increases, the current increases proportionally. If the resistance increases, the current decreases.\n\nSeries circuit: Components are connected one after another in a single loop. The same current flows through all components. The total resistance is the sum of individual resistances (Rₜ = R₁ + R₂ + R₃). If one component fails, the entire circuit breaks and all components stop working. Example: some types of Christmas fairy lights.\n\nParallel circuit: Components are connected across the same two points, providing multiple paths for current. Each component has the same voltage across it. The total resistance is less than any individual resistance. If one component fails, others continue to work.\n\nHousehold wiring in Sri Lanka (and worldwide) uses parallel circuits for the following reasons:\n1. Each appliance (fan, refrigerator, television, lights) receives the full mains voltage (230V in Sri Lanka).\n2. If one appliance is switched off or breaks, others continue to function independently.\n3. Different appliances can be controlled separately using individual switches.\n4. Additional appliances can be added to the circuit without affecting others.\n\nFuses and circuit breakers are used in parallel household circuits to protect against overloading and short circuits, which could cause fires.",
      hint: "State Ohm's Law with formula, explain series and parallel circuits with their properties, explain why parallel is used in homes"
    },
    {
      id: "sc9", subject: "science", topic: "Human Digestive System", points: 20,
      question: "Trace the journey of a rice meal through the human digestive system, naming the organs involved and describing what happens at each stage.",
      modelAnswer: "Rice is the staple food of Sri Lanka, and its digestion provides an excellent example of how the human digestive system works.\n\n1. Mouth: Digestion begins here. Teeth crush the rice (mechanical digestion). Saliva, containing the enzyme salivary amylase, begins to break down starch in the rice into maltose (a simpler sugar). The tongue shapes food into a bolus (ball) for swallowing.\n\n2. Oesophagus: The bolus travels down the oesophagus to the stomach through muscular contractions called peristalsis.\n\n3. Stomach: Gastric juices (containing hydrochloric acid and enzymes like pepsin) continue digestion. The acid kills bacteria and creates the acidic environment needed for protein digestion. The stomach churns food into a liquid called chyme.\n\n4. Small Intestine: This is the main site of digestion and absorption. The pancreas releases pancreatic juice containing amylase (digests remaining starch), lipase (digests fats), and protease (digests proteins). Bile from the liver (stored in the gall bladder) emulsifies fats. Glucose from digested starch is absorbed into the bloodstream through tiny finger-like projections called villi.\n\n5. Large Intestine: Water is absorbed from undigested material. The remaining waste (faeces) is formed and stored in the rectum.\n\n6. Anus: Faeces is expelled from the body.\n\nThe entire journey takes approximately 24–72 hours.",
      hint: "Follow the order: mouth → oesophagus → stomach → small intestine → large intestine → anus. Name enzymes and their roles at each stage"
    },
    {
      id: "sc10", subject: "science", topic: "Chemical Reactions", points: 20,
      question: "Explain the difference between physical and chemical changes. Describe three types of chemical reactions with equations, using examples relevant to Sri Lanka.",
      modelAnswer: "A physical change alters the form or appearance of a substance without changing its chemical composition. The change is usually reversible. Examples: melting of coconut oil, dissolving salt in water, cutting a gemstone.\n\nA chemical change produces one or more new substances with different properties from the original. It is usually irreversible. Signs of a chemical reaction include: colour change, gas production, heat/light release, formation of a precipitate, and change in smell.\n\nThree important types of chemical reactions:\n\n1. Combustion (Burning):\nA substance reacts with oxygen, releasing heat and light. This is an exothermic reaction.\nExample: Burning firewood (carbon) used in traditional Sri Lankan kitchens:\nC + O₂ → CO₂ + heat\nWhen burning occurs with insufficient oxygen, carbon monoxide (CO) — a toxic gas — is produced instead.\n\n2. Oxidation (Rusting):\nIron reacts with oxygen and water to form iron oxide (rust). This is a slow chemical change.\n4Fe + 3O₂ + 6H₂O → 4Fe(OH)₃ (hydrated iron oxide)\nThis is a major problem in Sri Lanka's coastal areas where salt air accelerates rusting of steel structures and vehicles.\n\n3. Acid-Base Neutralisation:\nAs described earlier, lime (calcium hydroxide) is added to acidic paddy soils:\nCa(OH)₂ + H₂SO₄ → CaSO₄ + 2H₂O\nThis neutralisation reaction improves soil pH for rice cultivation.\n\nUnderstanding these reactions helps Sri Lankan industries (rubber, tea, gem mining) and agriculture to use chemistry effectively.",
      hint: "Define physical vs chemical change, give signs of chemical reactions, provide 3 types with balanced equations and Sri Lankan examples"
    },
  ],

  maths: [
    {
      id: "ma1", subject: "maths", topic: "Linear Equations", points: 15,
      question: "Solve the following linear equations and show all working.\n(a) 3x + 7 = 22\n(b) 2(x − 4) = 3x + 1\n(c) (x/3) + (x/4) = 7",
      modelAnswer: "(a) 3x + 7 = 22\n    3x = 22 − 7\n    3x = 15\n    x = 5\n\n(b) 2(x − 4) = 3x + 1\n    2x − 8 = 3x + 1\n    2x − 3x = 1 + 8\n    −x = 9\n    x = −9\n\n(c) x/3 + x/4 = 7\n    Multiply throughout by 12 (LCM of 3 and 4):\n    4x + 3x = 84\n    7x = 84\n    x = 12\n\nVerification (c): 12/3 + 12/4 = 4 + 3 = 7 ✓",
      hint: "Show step-by-step working, collect like terms on each side, verify your answer by substituting back"
    },
    {
      id: "ma2", subject: "maths", topic: "Simultaneous Equations", points: 20,
      question: "A school canteen sells rice packets and short eats. Three rice packets and two short eats cost Rs. 390. Two rice packets and five short eats cost Rs. 460. Find the cost of one rice packet and one short eat by forming and solving simultaneous equations.",
      modelAnswer: "Let the cost of one rice packet = x rupees\nLet the cost of one short eat = y rupees\n\nForm the equations:\n3x + 2y = 390  ... (1)\n2x + 5y = 460  ... (2)\n\nElimination method:\nMultiply (1) by 5:   15x + 10y = 1950  ... (3)\nMultiply (2) by 2:    4x + 10y =  920  ... (4)\n\nSubtract (4) from (3):\n15x − 4x = 1950 − 920\n11x = 1030\nx = 1030 ÷ 11\nx = Rs. 93.63... \n\nLet me re-check with cleaner numbers:\nMultiply (1) by 2:   6x + 4y = 780   ... (3)\nMultiply (2) by 3:   6x + 15y = 1380  ... (4)\n\nSubtract (3) from (4):\n11y = 600\ny = Rs. 54.55...\n\nUsing exact values: Substitute y back into (1):\n3x + 2(600/11) = 390\n3x = 390 − 1200/11\n3x = (4290 − 1200)/11\n3x = 3090/11\nx = 1030/11 ≈ Rs. 93.64\n\n∴ One rice packet costs approximately Rs. 93.64 and one short eat costs approximately Rs. 54.55.",
      hint: "Define variables, form 2 equations, use elimination or substitution method, show all steps, verify answer"
    },
    {
      id: "ma3", subject: "maths", topic: "Quadratic Equations", points: 20,
      question: "Solve the following quadratic equations, showing all working.\n(a) x² − 7x + 12 = 0 (by factorisation)\n(b) 2x² + 5x − 3 = 0 (by the quadratic formula)\n(c) A rectangular school garden has a length that is 3 m more than its width. If the area is 54 m², find the dimensions.",
      modelAnswer: "(a) x² − 7x + 12 = 0\nFind two numbers that multiply to 12 and add to −7: (−3) and (−4)\n(x − 3)(x − 4) = 0\nx = 3  or  x = 4\n\n(b) 2x² + 5x − 3 = 0\nUsing quadratic formula: x = [−b ± √(b² − 4ac)] / 2a\nHere a = 2, b = 5, c = −3\nx = [−5 ± √(25 + 24)] / 4\nx = [−5 ± √49] / 4\nx = [−5 ± 7] / 4\nx = (−5 + 7)/4 = 2/4 = 1/2\nor x = (−5 − 7)/4 = −12/4 = −3\n∴ x = 1/2  or  x = −3\n\n(c) Let width = x metres\nLength = (x + 3) metres\nArea = x(x + 3) = 54\nx² + 3x − 54 = 0\n(x + 9)(x − 6) = 0\nx = 6  (x = −9 rejected, as length cannot be negative)\n\n∴ Width = 6 m, Length = 9 m\nVerification: 6 × 9 = 54 m² ✓",
      hint: "For (a) factorise by finding factor pairs, for (b) use x = [−b ± √(b²−4ac)]/2a, for (c) form equation from the word problem and reject negative values"
    },
    {
      id: "ma4", subject: "maths", topic: "Geometry – Triangles & Pythagoras", points: 20,
      question: "In triangle ABC, angle B = 90°. AB = 8 cm and BC = 15 cm.\n(a) Calculate the length of AC.\n(b) Calculate angle A, correct to the nearest degree.\n(c) A ladder 17 m long leans against a vertical wall. The foot of the ladder is 8 m from the base of the wall. How high up the wall does the ladder reach?",
      modelAnswer: "(a) By Pythagoras' theorem:\nAC² = AB² + BC²\nAC² = 8² + 15²\nAC² = 64 + 225\nAC² = 289\nAC = √289\nAC = 17 cm\n\n(b) In right-angled triangle ABC:\ntan A = opposite/adjacent = BC/AB = 15/8 = 1.875\nAngle A = tan⁻¹(1.875)\nAngle A ≈ 62°\n\n(c) Let the height the ladder reaches = h metres\nUsing Pythagoras' theorem:\n17² = 8² + h²\n289 = 64 + h²\nh² = 289 − 64\nh² = 225\nh = √225\nh = 15 m\n\n∴ The ladder reaches 15 m up the wall.",
      hint: "Use a² + b² = c² for Pythagoras, use tan/sin/cos for angles, remember to reject impossible values"
    },
    {
      id: "ma5", subject: "maths", topic: "Statistics – Mean, Median, Mode", points: 20,
      question: "The marks scored by 10 students in a Mathematics test are:\n45, 62, 78, 55, 90, 62, 71, 84, 62, 55\n\n(a) Find the mean mark.\n(b) Find the median mark.\n(c) Find the mode.\n(d) If the teacher decides to add 5 bonus marks to every student's score, what will be the new mean?",
      modelAnswer: "(a) Mean = Sum of all marks ÷ Number of students\nSum = 45 + 62 + 78 + 55 + 90 + 62 + 71 + 84 + 62 + 55\nSum = 664\nMean = 664 ÷ 10\nMean = 66.4 marks\n\n(b) Arrange in ascending order:\n45, 55, 55, 62, 62, 62, 71, 78, 84, 90\nSince n = 10 (even), median = average of 5th and 6th values\nMedian = (62 + 62) ÷ 2\nMedian = 62 marks\n\n(c) Mode = the value that appears most frequently\n62 appears 3 times (more than any other value)\nMode = 62 marks\n\n(d) When 5 marks are added to every score:\nNew mean = Old mean + 5\nNew mean = 66.4 + 5\nNew mean = 71.4 marks\n\n(Note: Adding a constant to all values increases the mean by the same constant.)",
      hint: "For mean: sum ÷ count. For median: arrange in order, find middle value(s). For mode: most frequent. For new mean: just add the bonus marks to old mean"
    },
    {
      id: "ma6", subject: "maths", topic: "Trigonometry – SOHCAHTOA", points: 20,
      question: "From the top of a lighthouse 80 m tall on the Sri Lankan southern coast, a boat is observed at an angle of depression of 25°. Calculate the horizontal distance from the base of the lighthouse to the boat.",
      modelAnswer: "Let the horizontal distance = d metres\n\nThe angle of depression from the top of the lighthouse to the boat = 25°\n\nSince the angle of depression equals the angle of elevation (alternate interior angles):\nAngle of elevation from boat to top of lighthouse = 25°\n\nIn the right-angled triangle:\nopposite = height of lighthouse = 80 m\nadjacent = horizontal distance = d\n\nUsing tan:\ntan 25° = opposite/adjacent\ntan 25° = 80/d\nd = 80/tan 25°\nd = 80/0.4663\nd ≈ 171.6 m\n\n∴ The horizontal distance from the base of the lighthouse to the boat is approximately 171.6 metres.\n\nAlternative check using the angle:\nIf we use angle 65° (complement):\ntan 65° = d/80\nd = 80 × tan 65°\nd = 80 × 2.145\nd ≈ 171.6 m ✓",
      hint: "Draw a diagram, identify opposite/adjacent/hypotenuse, angle of depression = angle of elevation (alternate angles), use tan = opp/adj"
    },
    {
      id: "ma7", subject: "maths", topic: "Mensuration – Area & Volume", points: 20,
      question: "A Sri Lankan village well has a cylindrical shape. The inner diameter is 1.4 m and the depth of the water is 6 m. A water tank at a house is in the shape of a cuboid with dimensions 2 m × 1.5 m × 1 m.\n(a) Find the volume of water in the well. (Use π = 22/7)\n(b) Find the capacity of the tank in litres.\n(c) How many times can the tank be completely filled from the well before it runs dry?",
      modelAnswer: "(a) Volume of water in cylindrical well:\nRadius = diameter/2 = 1.4/2 = 0.7 m\nHeight = depth = 6 m\nVolume = πr²h\nVolume = (22/7) × (0.7)² × 6\nVolume = (22/7) × 0.49 × 6\nVolume = (22 × 0.49 × 6) / 7\nVolume = 64.68 / 7\nVolume = 9.24 m³\n\nWait — let me recalculate:\n(22/7) × 0.49 = 22 × 0.07 = 1.54\n1.54 × 6 = 9.24 m³\n\n∴ Volume of water in the well = 9.24 m³\n\n(b) Volume of cuboid tank:\nV = length × width × height\nV = 2 × 1.5 × 1\nV = 3 m³\n\n1 m³ = 1000 litres\nCapacity of tank = 3 × 1000 = 3,000 litres\n\n(c) Number of times tank can be filled:\n= Volume of well ÷ Volume of tank\n= 9.24 ÷ 3\n= 3.08\n\n∴ The tank can be completely filled 3 times from the well.",
      hint: "Cylinder volume = πr²h (remember radius = diameter ÷ 2), cuboid volume = l×w×h, 1 m³ = 1000 litres"
    },
    {
      id: "ma8", subject: "maths", topic: "Sets", points: 15,
      question: "In a class of 40 students, 25 study Sinhala, 20 study Tamil, and 8 study both languages.\n(a) Draw a Venn diagram to represent this information.\n(b) Find the number of students who study only Sinhala.\n(c) Find the number of students who study only Tamil.\n(d) Find the number of students who study neither language.",
      modelAnswer: "Given:\nTotal students = 40\nSinhala (S) = 25\nTamil (T) = 20\nBoth (S ∩ T) = 8\n\n(a) Venn Diagram:\n[Circle S: 17 | Overlap: 8 | Circle T: 12] outside: 3\n\n(b) Students studying only Sinhala:\n= Total Sinhala − Both\n= 25 − 8\n= 17 students\n\n(c) Students studying only Tamil:\n= Total Tamil − Both\n= 20 − 8\n= 12 students\n\n(d) Students studying neither language:\n= Total − (Only Sinhala + Both + Only Tamil)\n= 40 − (17 + 8 + 12)\n= 40 − 37\n= 3 students\n\nUsing the formula:\nn(S ∪ T) = n(S) + n(T) − n(S ∩ T)\n= 25 + 20 − 8\n= 37\nNeither = 40 − 37 = 3 ✓",
      hint: "Draw two overlapping circles, fill in the 'both' section first, then work outwards. Use n(A∪B) = n(A) + n(B) − n(A∩B)"
    },
    {
      id: "ma9", subject: "maths", topic: "Matrices", points: 20,
      question: "Given matrices A = [[2, 3], [1, 4]] and B = [[5, 1], [2, 3]]\n(a) Find A + B\n(b) Find A × B\n(c) Find the determinant of matrix A\n(d) Does matrix A have an inverse? Give a reason.",
      modelAnswer: "(a) A + B:\n[[2+5, 3+1], [1+2, 4+3]]\n= [[7, 4], [3, 7]]\n\n(b) A × B:\nRow 1 × Col 1: (2×5) + (3×2) = 10 + 6 = 16\nRow 1 × Col 2: (2×1) + (3×3) = 2 + 9 = 11\nRow 2 × Col 1: (1×5) + (4×2) = 5 + 8 = 13\nRow 2 × Col 2: (1×1) + (4×3) = 1 + 12 = 13\n\nA × B = [[16, 11], [13, 13]]\n\n(c) Determinant of A:\nFor matrix [[a,b],[c,d]], det = ad − bc\ndet(A) = (2×4) − (3×1)\n= 8 − 3\n= 5\n\n(d) Yes, matrix A has an inverse because its determinant is 5 ≠ 0.\nA matrix has an inverse only when its determinant is not equal to zero.\n\nInverse of A = (1/det) × [[d, −b], [−c, a]]\n= (1/5) × [[4, −3], [−1, 2]]\n= [[4/5, −3/5], [−1/5, 2/5]]",
      hint: "For addition: add corresponding elements. For multiplication: row × column. Determinant of 2×2: ad−bc. Inverse exists only if det ≠ 0"
    },
    {
      id: "ma10", subject: "maths", topic: "Indices & Logarithms", points: 20,
      question: "Simplify the following, showing all working:\n(a) 2³ × 2⁵ ÷ 2⁴\n(b) (3²)³ × 3⁻²\n(c) If log₁₀ 2 = 0.3010, find log₁₀ 8 and log₁₀ 0.5\n(d) Solve for x: log₃(x + 1) = 3",
      modelAnswer: "(a) 2³ × 2⁵ ÷ 2⁴\n= 2^(3+5−4)     [add/subtract indices with same base]\n= 2⁴\n= 16\n\n(b) (3²)³ × 3⁻²\n= 3^(2×3) × 3⁻²    [power of a power: multiply indices]\n= 3⁶ × 3⁻²\n= 3^(6−2)\n= 3⁴\n= 81\n\n(c) log₁₀ 8 = log₁₀ 2³ = 3 × log₁₀ 2 = 3 × 0.3010 = 0.9030\n\nlog₁₀ 0.5 = log₁₀ (1/2) = log₁₀ 1 − log₁₀ 2 = 0 − 0.3010 = −0.3010\n\n(d) log₃(x + 1) = 3\nConvert to index form: x + 1 = 3³\nx + 1 = 27\nx = 26\n\nVerification: log₃(27) = log₃(3³) = 3 ✓",
      hint: "Index laws: aᵐ × aⁿ = aᵐ⁺ⁿ, aᵐ ÷ aⁿ = aᵐ⁻ⁿ, (aᵐ)ⁿ = aᵐⁿ. Log laws: log(aⁿ) = n·log(a), log(a/b) = log(a)−log(b)"
    },
  ],
};

export function AIEssayGrader({ onBack }: AIEssayGraderProps) {
  const [language, setLanguage] = useState<"en" | "si">("en");
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [questions, setQuestions] = useState<EssayQuestion[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<EssayQuestion | null>(null);
  const [answer, setAnswer] = useState("");
  const [isGrading, setIsGrading] = useState(false);
  const [result, setResult] = useState<EssayGradingResult | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showModelAnswer, setShowModelAnswer] = useState(false);

  const wordCount = answer.trim().split(/\s+/).filter(w => w.length > 0).length;
  const cfg = selectedSubject ? SUBJECT_CONFIG[selectedSubject] : null;

  const loadQuestions = useCallback((subject: Subject) => {
    const all = QUESTIONS[subject];
    // Shuffle and pick 10 (all of them, but shuffled for variety)
    const shuffled = [...all].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
    setSelectedQuestion(null);
    setResult(null);
    setAnswer("");
    setShowHint(false);
    setShowModelAnswer(false);
  }, []);

  const handleSubjectSelect = (sub: Subject) => {
    setSelectedSubject(sub);
    loadQuestions(sub);
  };

  const handleSubmit = async () => {
    if (!selectedQuestion || wordCount < 20) return;
    setIsGrading(true);
    try {
      const gradingResult = await aiService.gradeEssay(
        answer,
        selectedQuestion.question,
        selectedQuestion.modelAnswer,
        selectedQuestion.topic
      );
      setResult(gradingResult);
    } catch (error) {
      console.error("Grading error:", error);
    } finally {
      setIsGrading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setAnswer("");
    setShowHint(false);
    setShowModelAnswer(false);
  };

  const handleSelectQuestion = (q: EssayQuestion) => {
    setSelectedQuestion(q);
    setResult(null);
    setAnswer("");
    setShowHint(false);
    setShowModelAnswer(false);
  };

  const ScoreBar = ({ value, label, color }: { value: number; label: string; color: string }) => (
    <div className="mb-3">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-600 dark:text-gray-400">{label}</span>
        <span className="font-semibold">{value}%</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full transition-all duration-1000`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 dark:from-gray-950 dark:to-gray-900">

      {/* ── Header ── */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <button onClick={onBack} className="flex items-center gap-2 text-purple-200 hover:text-white transition-colors text-sm">
              <ArrowLeft className="w-4 h-4" /> {language === "si" ? "නිවසට ආපසු" : "Back to Home"}
            </button>
            <button
              onClick={() => setLanguage(prev => prev === "en" ? "si" : "en")}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full text-sm font-semibold transition-all border border-white/30"
            >
              <Languages className="w-4 h-4" />
              {language === "en" ? "සිංහල" : "English"}
            </button>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-white/20 rounded-xl p-2">
              <PenLine className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                {language === "si" ? "AI රචනා සහ පිළිතුරු ශ්‍රේණිගත කිරීම" : "AI Essay & Answer Grader"}
              </h1>
              <p className="text-purple-200 text-sm">
                {language === "si"
                  ? "ඔබේ පිළිතුර ලියන්න → AI ගුරුවරයකු ලෙස ක්ෂණික ප්‍රතිපෝෂණ ලබා ගන්න"
                  : "Write your answer → Get instant AI feedback like a real teacher"}
              </p>
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto mt-3">
          <span className="bg-white/15 text-white text-xs font-semibold px-3 py-1 rounded-full">
            🇱🇰 {language === "si" ? "ශ්‍රී ලංකා GCE O/L විෂය මාලාව · විෂයකට ප්‍රශ්න 10" : "Sri Lankan G.C.E. O/L Syllabus · 10 Questions per Subject"}
          </span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* ── Subject Selector ── */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
            {language === "si" ? "විෂය තෝරන්න" : "Select Subject"}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {(Object.keys(SUBJECT_CONFIG) as Subject[]).map(sub => {
              const c = SUBJECT_CONFIG[sub];
              const isActive = selectedSubject === sub;
              return (
                <button
                  key={sub}
                  onClick={() => handleSubjectSelect(sub)}
                  className={`py-4 px-3 rounded-xl text-sm font-semibold transition-all flex flex-col items-center gap-1.5 ${
                    isActive
                      ? `bg-gradient-to-r ${c.color} text-white shadow-md`
                      : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  <span className="text-2xl">{c.icon}</span>
                  <span>{language === "si" ? c.labelSi : c.label}</span>
                </button>
              );
            })}
          </div>
          {selectedSubject && cfg && (
            <p className="text-xs text-gray-400 mt-3 flex items-center gap-1">
              <FlaskConical className="w-3 h-3" />
              {language === "si" ? cfg.descriptionSi : `${cfg.description} · 10 O/L syllabus questions ready`}
            </p>
          )}
        </div>

        {/* ── Questions Panel ── */}
        {selectedSubject && cfg && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> {language === "si" ? "ප්‍රශ්නයක් තෝරන්න" : "Choose a Question"}
              </h2>
              <button
                onClick={() => loadQuestions(selectedSubject)}
                className={`flex items-center gap-1.5 text-sm font-semibold ${cfg.text} border ${cfg.border} px-3 py-1.5 rounded-lg hover:opacity-80 transition-opacity`}
              >
                <RefreshCw className="w-3.5 h-3.5" /> {language === "si" ? "මිශ්‍ර කරන්න" : "Shuffle"}
              </button>
            </div>

            <div className="space-y-3">
              {questions.map((q) => {
                const isActive = selectedQuestion?.id === q.id;
                return (
                  <button
                    key={q.id}
                    onClick={() => handleSelectQuestion(q)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all group ${
                      isActive
                        ? `${cfg.border} bg-gradient-to-r ${cfg.light}`
                        : `border-gray-100 dark:border-gray-700 hover:border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700`
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <p className="text-gray-800 font-medium text-sm leading-relaxed line-clamp-2">{q.question}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className={`text-xs font-semibold ${cfg.text}`}>{q.topic}</span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-500">{q.points} {language === "si" ? "ලකුණු" : "marks"}</span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-400">🇱🇰 O/L</span>
                        </div>
                      </div>
                      <Target className={`w-5 h-5 ${cfg.text} ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-60"} transition-opacity flex-shrink-0 mt-1`} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Answer Area ── */}
        {selectedQuestion && cfg && !result && (
          <div className="space-y-4">
            <div className={`bg-gradient-to-r ${cfg.color} text-white rounded-2xl p-6`}>
              <div className="flex items-center gap-2 mb-3">
                <GraduationCap className="w-5 h-5" />
                <span className="text-sm font-medium opacity-90">{selectedQuestion.topic} · {selectedQuestion.points} {language === "si" ? "ලකුණු" : "marks"} · 🇱🇰 O/L</span>
              </div>
              <p className="text-lg font-semibold leading-relaxed whitespace-pre-line">{selectedQuestion.question}</p>

              {selectedQuestion.hint && (
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="mt-3 flex items-center gap-1 text-white/70 hover:text-white text-sm transition-colors"
                >
                  <Lightbulb className="w-4 h-4" />
                  {showHint ? (language === "si" ? "ඉඟිය සඟවන්න" : "Hide hint") : (language === "si" ? "ඉඟිය පෙන්වන්න" : "Show hint")}
                  {showHint ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>
              )}
              {showHint && (
                <div className="mt-2 bg-white/15 rounded-lg px-4 py-2 text-sm text-white/90">
                  💡 {selectedQuestion.hint}
                </div>
              )}
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                {language === "si" ? "ඔබේ පිළිතුර" : "Your Answer"}
              </label>
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder={
                  selectedQuestion.subject === "maths"
                    ? (language === "si"
                        ? "ඔබේ ගනුදෙනු පියවරෙන් පියවර පෙන්වන්න...\n\nපියවර 1:\nපියවර 2:\n..."
                        : "Show your working step by step...\n\nStep 1:\nStep 2:\n...")
                    : (language === "si"
                        ? "ඔබේ සම්පූර්ණ පිළිතුර මෙහි ලියන්න..."
                        : "Write your full answer here...")
                }
                className="w-full h-60 p-4 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition-all resize-none text-gray-800 leading-relaxed"
                style={{ fontFamily: selectedQuestion.subject === "maths" ? "'Courier New', monospace" : "inherit" }}
                disabled={isGrading}
              />
              <div className="flex items-center justify-between mt-4">
                <div>
                  <span className={`text-sm font-medium ${wordCount < 20 ? "text-red-500" : wordCount < 50 ? "text-amber-500" : "text-green-600"}`}>
                    {wordCount} {language === "si" ? "වචන" : "words"}
                  </span>
                  <span className="text-xs text-gray-400 ml-2">· {language === "si" ? "අවම වචන 20ක්" : "Minimum 20 words"}</span>
                </div>
                <div className="flex gap-3 items-center">
                  <button
                    onClick={() => setSelectedQuestion(null)}
                    className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    ← {language === "si" ? "ප්‍රශ්නය වෙනස් කරන්න" : "Change question"}
                  </button>
                  <Button
                    onClick={handleSubmit}
                    disabled={isGrading || wordCount < 20}
                    className={`bg-gradient-to-r ${cfg.color} text-white px-6 py-2 rounded-xl disabled:opacity-50`}
                  >
                    {isGrading ? (
                      <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> {language === "si" ? "ශ්‍රේණිගත කරමින්..." : "Grading..."}</>
                    ) : (
                      <><Sparkles className="w-4 h-4 mr-2" /> {language === "si" ? "AI ශ්‍රේණිගත කිරීමට ඉදිරිපත් කරන්න" : "Submit for AI Grading"}</>
                    )}
                  </Button>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <button
                  onClick={() => setShowModelAnswer(!showModelAnswer)}
                  className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                  {showModelAnswer ? (language === "si" ? "ආදර්ශ පිළිතුර සඟවන්න" : "Hide model answer") : (language === "si" ? "ආදර්ශ පිළිතුර බලන්න" : "View model answer")}
                  {showModelAnswer ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>
                {showModelAnswer && (
                  <div className={`mt-3 p-4 bg-gradient-to-br ${cfg.light} border ${cfg.border} rounded-xl`}>
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-line">{selectedQuestion.modelAnswer}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── Results ── */}
        {result && selectedQuestion && cfg && (
          <div className="space-y-5">
            <div className={`bg-gradient-to-br ${cfg.color} text-white rounded-2xl p-8 shadow-lg`}>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-white/70 text-sm mb-1">{language === "si" ? "ඔබේ ලකුණු" : "Your Score"}</p>
                  <h2 className="text-5xl font-bold">{result.score}<span className="text-2xl font-normal text-white/70">/100</span></h2>
                  <div className="mt-2 inline-block bg-white/20 px-4 py-1 rounded-full">
                    <span className="text-xl font-bold">{result.grade}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white/70 text-sm">{selectedQuestion.topic}</p>
                  <p className="text-white/70 text-sm">{selectedQuestion.points} marks</p>
                  <p className="text-xl font-bold mt-1">
                    {Math.round((result.score / 100) * selectedQuestion.points)}/{selectedQuestion.points}
                  </p>
                </div>
              </div>
              <div className="space-y-1">
                <ScoreBar value={result.historicalAccuracy ?? result.score} label={language === "si" ? "අන්තර්ගත නිරවද්‍යතාව" : "Content Accuracy"} color="bg-white/70" />
                <ScoreBar value={result.grammarScore} label={language === "si" ? "ව්‍යාකරණ සහ භාෂාව" : "Grammar & Language"} color="bg-white/70" />
                <ScoreBar value={result.coherenceScore} label={language === "si" ? "ව්‍යුහය සහ ප්‍රවාහය" : "Structure & Flow"} color="bg-white/70" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-500" /> {language === "si" ? "AI ගුරු ප්‍රතිපෝෂණ" : "AI Teacher Feedback"}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">{result.feedback}</p>
            </div>

            {result.strengths.length > 0 && (
              <div className="bg-green-50 rounded-2xl border border-green-200 p-6">
                <h3 className="font-bold text-green-900 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" /> {language === "si" ? "ඔබ හොඳින් කළ දේ" : "What You Did Well"}
                </h3>
                <ul className="space-y-2">
                  {result.strengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <TrendingUp className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" /> {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {result.missingPoints.length > 0 && (
              <div className="bg-red-50 rounded-2xl border border-red-200 p-6">
                <h3 className="font-bold text-red-900 mb-3 flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-500" /> {language === "si" ? "ඔබ මග හැරිය කරුණු" : "Key Points You Missed"}
                </h3>
                <ul className="space-y-2">
                  {result.missingPoints.map((p, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-red-400 font-bold mt-0.5">•</span> {p}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {result.suggestions.length > 0 && (
              <div className="bg-blue-50 rounded-2xl border border-blue-200 p-6">
                <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-blue-500" /> {language === "si" ? "වැඩිදියුණු කරගන්නේ කෙසේද" : "How to Improve"}
                </h3>
                <ul className="space-y-2">
                  {result.suggestions.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-blue-500 font-bold">{i + 1}.</span> {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {result.weaknesses.length > 0 && (
              <div className="bg-amber-50 rounded-2xl border border-amber-200 p-6">
                <h3 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-amber-500" /> {language === "si" ? "වැඩ කළ යුතු ක්ෂේත්‍ර" : "Areas to Work On"}
                </h3>
                <ul className="space-y-2">
                  {result.weaknesses.map((w, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-amber-400 mt-0.5">•</span> {w}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className={`bg-gradient-to-br ${cfg.light} rounded-2xl border ${cfg.border} p-6`}>
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <BookOpen className="w-5 h-5" /> {language === "si" ? "ආදර්ශ පිළිතුර" : "Model Answer"}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-line">{selectedQuestion.modelAnswer}</p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl border border-gray-200 dark:border-gray-600 p-6">
              <h3 className="font-bold text-gray-700 mb-3 text-sm">{language === "si" ? "ඔබේ පිළිතුර" : "Your Answer"}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed whitespace-pre-wrap">{answer}</p>
            </div>

            <div className="flex gap-3">
              <Button onClick={handleReset} variant="outline" className="flex-1 py-3 rounded-xl flex items-center justify-center gap-2">
                <RotateCcw className="w-4 h-4" /> {language === "si" ? "නැවත උත්සාහ කරන්න" : "Try Again"}
              </Button>
              <Button
                onClick={() => setSelectedQuestion(null)}
                className={`flex-1 py-3 rounded-xl bg-gradient-to-r ${cfg.color} text-white flex items-center justify-center gap-2`}
              >
                <BookOpen className="w-4 h-4" /> {language === "si" ? "ඊළඟ ප්‍රශ්නය" : "Next Question"}
              </Button>
              <Button
                onClick={() => { setSelectedSubject(null); setQuestions([]); setSelectedQuestion(null); handleReset(); }}
                variant="outline"
                className="flex-1 py-3 rounded-xl flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" /> {language === "si" ? "නව විෂයක්" : "New Subject"}
              </Button>
            </div>
          </div>
        )}

        {/* ── Empty state ── */}
        {!selectedSubject && (
          <div className="text-center py-16 text-gray-400">
            <PenLine className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium">{language === "si" ? "ආරම්භ කිරීමට විෂයක් තෝරන්න" : "Select a subject to begin"}</p>
            <p className="text-sm mt-1">{language === "si" ? "විෂයකට O/L ප්‍රශ්න 10 ක් ලබා ගත හැකිය" : "10 O/L syllabus questions available per subject"}</p>
          </div>
        )}
      </div>
    </div>
  );
}
