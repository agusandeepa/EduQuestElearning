import type { Lesson } from './types';

// Grade 10 & 11 O/L History Lessons - English Version (Expanded Syllabus)
export const ENGLISH_LESSONS: Lesson[] = [
  // Grade 10 - Prehistoric & Ancient Period
  {
    id: 1,
    title: "Prehistoric Sri Lanka - Stone Age",
    description: "Early human settlements and archaeological findings in Sri Lanka (500,000 BC - 900 BC)",
    level: 1,
    xp_reward: 50,
    content: {
      text: `Prehistoric Sri Lanka (500,000 BC - 900 BC)

Paleolithic Age (500,000 - 37,000 BC):
Evidence of early human habitation found in caves like Fa-Hien Cave (Bulathsinhala), Batadombalena (Kuruwita), and Bundala.

Mesolithic Age (37,000 - 2,900 BC):
Balangoda Man - Ancient human species discovered in Balangoda area. Average height 5'9", skilled hunters and gatherers.

Neolithic Age (2,900 - 900 BC):
• Introduction of agriculture
• Pottery making
• Domestication of animals
• Permanent settlements

Archaeological Sites:
• Sigiriya rock shelter
• Dambulla caves
• Ibbankatuwa prehistoric burial site
• Pomparippu ancient settlements

Cultural Development:
These prehistoric people laid the foundation for later civilizations through tool-making, agricultural practices, and social organization.`,
      animated_id: "prehistoric-sl",
      video_title: "Prehistoric Sri Lanka — Stone Age Animation",
      video_description: "An animated journey through the Paleolithic, Mesolithic and Neolithic ages of Sri Lanka.",
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "What is the ancient human species discovered in Balangoda?",
          options: ["Homo Erectus", "Balangoda Man", "Neanderthal", "Homo Habilis"],
          correct_answer: 1,
        },
        {
          id: 2,
          question: "Which cave provided evidence of Paleolithic Age?",
          options: ["Dambulla", "Fa-Hien Cave", "Sigiriya", "Batadombalena"],
          correct_answer: 1,
        },
        {
          id: 3,
          question: "When did the Neolithic Age begin in Sri Lanka?",
          options: ["2,900 BC", "900 BC", "37,000 BC", "500,000 BC"],
          correct_answer: 0,
        },
        {
          id: 4,
          question: "What was introduced during the Neolithic Age?",
          options: ["Writing", "Agriculture", "Iron tools", "Buddhism"],
          correct_answer: 1,
        },
      ],
    },
  },
  {
    id: 2,
    title: "The Beginning of Sri Lanka - King Vijaya",
    description: "Prince Vijaya's arrival in Sri Lanka and the beginning of the Sinhalese nation (543 BC)",
    level: 1,
    xp_reward: 50,
    content: {
      text: `Prince Vijaya's Arrival in Sri Lanka (543 BC)

Prince Vijaya was the son of King Sinhabahu of Sinhapura (present-day Bengal) in northern India. He and his 700 followers landed at Mahiyangana.

Marriage with Kuveni:
Prince Vijaya married Kuveni, the indigenous leader of the island. Later, he strategically sent her away and married the daughter of King Pandu Vasudeva from the Madra Kingdom.

Foundation of the Sinhalese Nation:
King Vijaya established his capital at Tambapanni (now Mannar). He is considered the first king of the Sinhalese nation. King Vijaya ruled for 38 years (543-505 BC).

Historical Significance:
• Beginning of the Sinhalese nation
• Introduction of Aryan culture to the island
• Initiation of urbanization
• Development of agriculture`,
      animated_id: "vijaya-arrival",
      video_title: "Prince Vijaya's Arrival — Animated Story",
      video_description: "An animated story of Prince Vijaya sailing from Bengal, landing at Mahiyangana, and founding the Sinhalese nation.",
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "When did King Vijaya arrive in Sri Lanka?",
          options: ["543 BC", "437 BC", "247 BC", "161 AD"],
          correct_answer: 0,
        },
        {
          id: 2,
          question: "Where did King Vijaya first land?",
          options: ["Colombo", "Galle", "Mahiyangana", "Trincomalee"],
          correct_answer: 2,
        },
        {
          id: 3,
          question: "What was the name of the indigenous leader Vijaya married?",
          options: ["Kuveni", "Viharamahadevi", "Subhadra", "Sugala"],
          correct_answer: 0,
        },
        {
          id: 4,
          question: "What was King Vijaya's first capital?",
          options: ["Anuradhapura", "Polonnaruwa", "Tambapanni", "Kotte"],
          correct_answer: 2,
        },
      ],
    },
  },
  {
    id: 3,
    title: "Anuradhapura Era - King Pandukabhaya",
    description: "Establishment of Anuradhapura Kingdom and the first organized rule (437 BC)",
    level: 1,
    xp_reward: 60,
    content: {
      text: `King Pandukabhaya and Anuradhapura Kingdom (437-367 BC)

King Pandukabhaya was the son of King Panduvasudeva and Queen Bhadrakacchanadevi. He established Anuradhapura, the first major city of Sri Lanka.

Establishment of Anuradhapura:
In 437 BC, King Pandukabhaya made Anuradhapura his capital. It was located in a fertile area between the Malwathu Oya and Kaddamba rivers.

Administrative Reforms:
• Introduction of urban planning system
• Beginning of irrigation systems (Abhaya Wewa, Basawakkulama Tank)
• Establishment of 10 administrative divisions
• Strengthening the legal system

Economic Development:
• Development of rice cultivation
• Establishment of trade routes
• Introduction of tax system
• Industrial development

Religious Contribution:
He supported the construction of temples like Abhayagiriya, Vessagiriya, and Tissamaharama. After Vijaya's lineage, Pandukabhaya started a continuous ruling dynasty.`,
      animated_id: "pandukabhaya-anuradhapura",
      video_title: "King Pandukabhaya — Anuradhapura Animated Story",
      video_description: "An animated journey through Pandukabhaya's rise, the founding of Anuradhapura, his irrigation works, and lasting legacy.",
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "Who made Anuradhapura the capital?",
          options: ["Vijaya", "Pandukabhaya", "Dutugemunu", "Devanampiyatissa"],
          correct_answer: 1,
        },
        {
          id: 2,
          question: "When was Anuradhapura established?",
          options: ["543 BC", "437 BC", "247 BC", "161 AD"],
          correct_answer: 1,
        },
        {
          id: 3,
          question: "Which tank was built by King Pandukabhaya?",
          options: ["Parakrama Samudra", "Minneriya", "Abhaya Wewa", "Kala Wewa"],
          correct_answer: 2,
        },
        {
          id: 4,
          question: "Between which rivers was Anuradhapura located?",
          options: ["Mahaweli - Amban", "Kalu - Kelani", "Malwathu - Kaddamba", "Deduru - Kalu"],
          correct_answer: 2,
        },
      ],
    },
  },
  {
    id: 4,
    title: "Ancient World Civilizations",
    description: "Mesopotamia, Egypt, Indus Valley & China – early human civilizations",
    level: 2,
    xp_reward: 100,
    content: {
      text: `Ancient World Civilizations

Mesopotamian Civilization (3500–539 BC):
Located between the Tigris and Euphrates rivers (modern Iraq).
• Sumerians developed the first writing system – Cuneiform.
• City-states: Ur, Uruk, Babylon, Nineveh.
• Hammurabi's Code – one of the earliest written legal codes.
• Advances in mathematics, astronomy, and agriculture.
• Irrigation systems supported large populations.

Egyptian Civilization (3100–30 BC):
Developed along the Nile River; divided into Upper and Lower Egypt.
• Pharaohs ruled as god-kings.
• Hieroglyphics – picture writing system.
• Great Pyramids of Giza built as royal tombs.
• Advanced medicine, architecture, and agriculture.
• Important pharaohs: Ramesses II, Tutankhamun, Cleopatra VII.

Indus Valley Civilization (2600–1900 BC):
Located in present-day Pakistan and northwest India.
• Well-planned cities: Mohenjo-daro, Harappa.
• Advanced drainage and sanitation systems.
• Trade with Mesopotamia confirmed by archaeological evidence.
• Script still not fully deciphered.
• Declined possibly due to climate change or floods.

Chinese Civilization (2100 BC onwards):
Developed along the Yellow (Huang He) and Yangtze rivers.
• Shang Dynasty – earliest confirmed dynasty; oracle bones.
• Great Wall of China built to protect from northern invaders.
• Silk Road connected China to Western civilizations.
• Inventions: paper, printing, gunpowder, compass.
• Confucianism and Taoism shaped Chinese society.

Common Features of Early Civilizations:
• River valleys provided fertile land.
• Writing systems developed.
• Organized governments and religions.
• Trade and commerce flourished.`,
      animated_id: "ancient-world-civilizations",
      video_title: "Ancient World Civilizations — Animated Journey",
      video_description: "An animated journey through Mesopotamia, Egypt, Indus Valley and China — the four cradles of human civilization.",
      image_url: "https://images.unsplash.com/photo-1568393691622-c7ba131d1b16?w=800",
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "Which was the first writing system developed in Mesopotamia?",
          options: ["Hieroglyphics", "Cuneiform", "Sanskrit", "Oracle Bones Script"],
          correct_answer: 1,
        },
        {
          id: 2,
          question: "Where was the Indus Valley Civilization mainly located?",
          options: ["Egypt and Sudan", "Iraq and Syria", "Pakistan and northwest India", "China and Mongolia"],
          correct_answer: 2,
        },
        {
          id: 3,
          question: "What was Hammurabi's Code?",
          options: ["A military strategy", "One of the earliest written legal codes", "A trade agreement", "A religious text"],
          correct_answer: 1,
        },
        {
          id: 4,
          question: "What connected China to Western civilizations for trade?",
          options: ["The Great Wall", "The Silk Road", "The Nile River", "The Spice Route"],
          correct_answer: 1,
        },
      ],
    },
  },
  {
    id: 5,
    title: "Greek and Roman Civilizations",
    description: "Democracy, philosophy, and empire – Ancient Greece and Rome's legacy",
    level: 2,
    xp_reward: 100,
    content: {
      text: `Greek and Roman Civilizations

Ancient Greek Civilization (800–146 BC):

City-States (Polis):
• Athens and Sparta were the most powerful city-states.
• Athens: birthplace of democracy under Cleisthenes (508 BC).
• Sparta: military society focused on warrior training.

Greek Culture & Contributions:
• Philosophy: Socrates, Plato, Aristotle.
• Mathematics: Pythagoras, Euclid.
• Science: Archimedes, Hippocrates (medicine).
• Olympic Games began in 776 BC.
• Greek drama, poetry and architecture (Parthenon).

Alexander the Great (356–323 BC):
• Conquered Persia, Egypt, and reached India.
• Spread Greek (Hellenistic) culture across Asia.
• Founded Alexandria in Egypt.

Roman Civilization (753 BC – 476 AD):

Roman Republic (509–27 BC):
• Senate and elected officials governed.
• Roman law – basis for many modern legal systems.
• Conquered most of the Mediterranean world.

Roman Empire (27 BC – 476 AD):
• Augustus Caesar became the first Emperor.
• Pax Romana – 200 years of relative peace.
• Engineering: roads, aqueducts, the Colosseum.
• Spread of Christianity began under Roman rule.
• Declined due to invasions, economic problems, and political instability.

Legacy:
• Democracy, republic concepts from Greece and Rome.
• Latin language influenced European languages.
• Roman architecture and law still influential today.`,
      animated_id: "greek-roman-civilizations",
      video_title: "Greek & Roman Civilizations — Animated Story",
      video_description: "An animated journey from Athens and Sparta through Alexander the Great's conquests to the rise and fall of the Roman Empire.",
      image_url: "https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=800",
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "Who is considered the father of democracy in Athens?",
          options: ["Socrates", "Pericles", "Cleisthenes", "Alexander"],
          correct_answer: 2,
        },
        {
          id: 2,
          question: "When did the first Olympic Games take place?",
          options: ["776 BC", "490 BC", "300 BC", "100 AD"],
          correct_answer: 0,
        },
        {
          id: 3,
          question: "Who became the first Roman Emperor?",
          options: ["Julius Caesar", "Augustus Caesar", "Nero", "Constantine"],
          correct_answer: 1,
        },
        {
          id: 4,
          question: "What was the 'Pax Romana'?",
          options: ["A Roman military unit", "A period of about 200 years of peace", "A Roman trade route", "A Roman legal code"],
          correct_answer: 1,
        },
      ],
    },
  },
  {
    id: 6,
    title: "Asian Civilizations – India and China",
    description: "Maurya & Gupta Empires of India; Tang & Ming Dynasties of China",
    level: 2,
    xp_reward: 110,
    content: {
      text: `Asian Civilizations – India and China

Maurya Empire (322–185 BC):
• Founded by Chandragupta Maurya after defeating the Nanda Dynasty.
• Emperor Ashoka (268–232 BC): greatest Maurya ruler.
• After witnessing destruction in the Kalinga War (261 BC), Ashoka embraced Buddhism.
• Ashoka sent Buddhist missionaries to Sri Lanka (Arahat Mahinda) and other regions.
• Built pillars and rock edicts throughout the empire.
• He promoted Dhamma (righteous living), non-violence, and religious tolerance.

Gupta Empire (320–550 AD) – Golden Age of India:
• Art, literature, mathematics, and science flourished.
• Aryabhata calculated the value of Pi and proposed Earth rotates on its axis.
• Sanskrit literature: Kalidasa wrote Shakuntala and Meghaduta.
• Universities like Nalanda attracted scholars from across Asia.
• Hindu art and temple architecture developed greatly.

Tang Dynasty of China (618–907 AD):
• Considered a golden age of Chinese civilization.
• Buddhism flourished; Chinese pilgrims visited India (Xuanzang).
• Capital Chang'an (Xi'an) was a cosmopolitan city.
• Woodblock printing invented.
• Silk Road trade at its peak.

Ming Dynasty (1368–1644):
• Built the Forbidden City in Beijing.
• Great Wall reinforced and extended.
• Zheng He's voyages (1405–1433) reached Africa and Southeast Asia.
• Porcelain, silk and tea major exports.

Connections to Sri Lanka:
• Indian Buddhism spread to Sri Lanka via Ashoka's mission.
• Chinese pilgrim Fa-Hien visited Sri Lanka in 5th century AD.
• Trade links with both India and China throughout history.`,
      image_url: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800",
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "Which war made Emperor Ashoka turn to Buddhism?",
          options: ["Mahabharata War", "Kalinga War", "Battle of Plassey", "Panipat War"],
          correct_answer: 1,
        },
        {
          id: 2,
          question: "Who calculated the value of Pi during the Gupta Empire?",
          options: ["Chanakya", "Kalidasa", "Aryabhata", "Nagarjuna"],
          correct_answer: 2,
        },
        {
          id: 3,
          question: "Which Chinese explorer's voyages reached Africa?",
          options: ["Xuanzang", "Fa-Hien", "Marco Polo", "Zheng He"],
          correct_answer: 3,
        },
        {
          id: 4,
          question: "Which university in ancient India attracted scholars from across Asia?",
          options: ["Taxila", "Nalanda", "Vikramashila", "Vallabhi"],
          correct_answer: 1,
        },
      ],
    },
  },
  {
    id: 7,
    title: "Arrival of Buddhism - Arahat Mahinda",
    description: "Arahat Mahinda bringing Buddhism to Sri Lanka (247 BC)",
    level: 3,
    xp_reward: 70,
    content: {
      text: `Arrival of Buddhism (247 BC)

King Devanampiyatissa (247-207 BC):
King Devanampiyatissa, contemporary of Emperor Ashoka of the Mauryan Empire, ruled Sri Lanka. Friendship with Emperor Ashoka began.

Arrival of Arahat Mahinda:
In 247 BC, on the full moon day of the month of Poson, Arahat Mahinda met King Devanampiyatissa at Missaka Pabbata (Mihintale). He preached the Ambatthala Jataka (Mango Jataka).

Culahatthipadopama Sutta:
At Mahamewna Gardens, he preached the Culahatthipadopama Sutta to the king and royal family. Thousands, including the king, converted to Buddhism.

Sanghamitta Theri:
Arahat Mahinda's sister, Theri Sanghamitta, brought the sacred Sri Maha Bodhi sapling to Sri Lanka. It was planted at Mahamewna Gardens in Anuradhapura.

Impact of Buddhism:
• Construction of Mahavihara, Cetiyagiriya, Tissa Wewa
• Building monasteries for monks
• Establishment of Buddhist libraries
• Spread of Dhamma teachings across the island
• Beginning of Bhikkhuni Sasana for nuns`,
      image_url: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800",
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "Who brought Buddhism to Sri Lanka?",
          options: ["Sanghamitta", "Mahinda", "Ashoka", "Buddha"],
          correct_answer: 1,
        },
        {
          id: 2,
          question: "Where did Mahinda meet the king?",
          options: ["Anuradhapura", "Mihintale", "Mahamewna", "Kelaniya"],
          correct_answer: 1,
        },
        {
          id: 3,
          question: "During which king's reign did Buddhism arrive?",
          options: ["Vijaya", "Pandukabhaya", "Devanampiyatissa", "Dutugemunu"],
          correct_answer: 2,
        },
        {
          id: 4,
          question: "Who brought the Sri Maha Bodhi?",
          options: ["Mahinda", "Sanghamitta", "Ashoka", "Devanampiyatissa"],
          correct_answer: 1,
        },
      ],
    },
  },
  {
    id: 8,
    title: "King Dutugemunu the Great",
    description: "The Elara War and strengthening Sinhala-Buddhist nationalism (161-137 BC)",
    level: 3,
    xp_reward: 80,
    content: {
      text: `King Dutugemunu the Great (161-137 BC)

Life Story:
King Dutugemunu was the son of King Kavantissa and Queen Viharamahadevi. He was born in Ruhuna (Southern Sri Lanka) and from childhood vowed to fight against Tamil invaders.

The Elara War:
In 161 BC, King Dutugemunu fought against King Elara, a Tamil ruler who had invaded Anuradhapura. Riding his elephant Kandula, he defeated Elara and recaptured Anuradhapura.

Achievements:
• Construction of Ruwanwelisaya (largest stupa in Sri Lanka)
• Mirisawetiya Dagoba
• Lohaprasada (Brazen Palace)
• Reconstruction of Anuradhapura

National Hero:
King Dutugemunu is considered a heroic king who united Sinhala-Buddhist nationalism. He fought to protect Buddhism and afterward did tremendous work to develop it.

Ten Great Warriors:
Among the ten great warriors who helped King Dutugemunu were heroes like Nandhimitra, Velusumana, Theraputtabhaya, Bharana, Gothayimbara, and others.`,
      image_url: "https://images.unsplash.com/photo-1588424518797-16889058fc95?w=800",
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "Which Tamil king did Dutugemunu defeat?",
          options: ["Maga", "Elara", "Kalinga", "Chandasoka"],
          correct_answer: 1,
        },
        {
          id: 2,
          question: "What is the largest stupa built by Dutugemunu?",
          options: ["Ruwanwelisaya", "Mirisawetiya", "Jetavanaramaya", "Abhayagiriya"],
          correct_answer: 0,
        },
        {
          id: 3,
          question: "In which region was Dutugemunu born?",
          options: ["Anuradhapura", "Polonnaruwa", "Ruhuna", "Mayarata"],
          correct_answer: 2,
        },
        {
          id: 4,
          question: "What was the name of Dutugemunu's elephant?",
          options: ["Kandula", "Vijayaba", "Maliya", "Parvata"],
          correct_answer: 0,
        },
      ],
    },
  },
  {
    id: 9,
    title: "Polonnaruwa Era - Parakramabahu I",
    description: "Polonnaruwa Kingdom and the Golden Age of Sri Lanka (1153-1186 AD)",
    level: 3,
    xp_reward: 90,
    content: {
      text: `King Parakramabahu the Great (1153-1186 AD)

Coronation:
Parakramabahu the Great united the three kingdoms of Dakkinadesa, Pihiti, and Rajarata, unifying Sri Lanka. He was the greatest king of the Polonnaruwa era.

Parakrama Samudra:
He built the Parakrama Samudra, the world's largest ancient man-made reservoir. Its current size is 2400 hectares.

Architectural Development:
• Vatadage (Temple of the Tooth)
• Gal Vihara (Rock Temple)
• Nissanka Malla Garden
• Rankoth Vihara (Northern Temple)
• Lankatilaka Temple
• Thuparamaya

Economic Development:
• Development of irrigation systems (Parakrama Samudra, Giritale Tank)
• Doubling rice harvests
• Development of foreign trade (with China, Burma, India)
• Strengthening monetary system

Buddhist Reforms:
He united the Buddhist Sangha by merging the three Buddhist sects (Mahavihara, Abhayagiri, Jetavanarama).`,
      image_url: "https://images.unsplash.com/photo-1577717903315-1691ae25f661?w=800",
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "Who built Parakrama Samudra?",
          options: ["Vijayabahu", "Parakramabahu I", "Nissankamalla", "Vikramabahu III"],
          correct_answer: 1,
        },
        {
          id: 2,
          question: "What is the Temple of the Tooth in Polonnaruwa called?",
          options: ["Lankatilaka", "Vatadage", "Thuparamaya", "Gal Vihara"],
          correct_answer: 1,
        },
        {
          id: 3,
          question: "When did Parakramabahu I rule?",
          options: ["1055-1110 AD", "1153-1186 AD", "1200-1232 AD", "1187-1196 AD"],
          correct_answer: 1,
        },
        {
          id: 4,
          question: "How many Buddhist sects did Parakramabahu I unite?",
          options: ["Two", "Three", "Four", "Five"],
          correct_answer: 1,
        },
      ],
    },
  },
  // Grade 11 - Medieval & Colonial Period (1232-1948 AD)
  {
    id: 10,
    title: "Medieval Kingdoms – Dambadeniya to Gampola",
    description: "Sri Lankan kingdoms after Polonnaruwa era: Dambadeniya, Yapahuwa & Gampola (1220–1412)",
    level: 3,
    xp_reward: 110,
    content: {
      text: `Medieval Kingdoms of Sri Lanka (1220–1412)

Decline of Polonnaruwa (after 1215):
After King Parakramabahu II, Polonnaruwa declined due to Magha's invasion from South India (1215 AD). Magha devastated the Rajarata civilisation, destroying irrigation systems and forcing the population southward.

Dambadeniya Kingdom (1220–1272):
• Founded by Vijayabahu III; capital at Dambadeniya.
• King Parakramabahu II (1236–1270) was the greatest ruler.
• Sacred Tooth Relic and Bowl Relic were protected here.
• He defeated Magha's forces and restored Buddhism.
• The Tripitaka (Buddhist scripture) was rewritten under his patronage.

Yapahuwa Kingdom (1272–1284):
• Capital shifted to Yapahuwa fortress rock.
• The Sacred Tooth Relic was kept here.
• Portuguese later tried to take the Tooth Relic.
• King Bhuvanekabahu I ruled from here.

Kurunegala Kingdom (1284–1341):
• Capital at Kurunegala (Hasthishaila).
• Several kings ruled briefly; an unstable period.
• Trading with foreign merchants continued.

Gampola Kingdom (1341–1412):
• Capital near present-day Kandy.
• King Parakramabahu V and Vikramabahu III ruled.
• Buddhism and arts flourished.
• Gadaladeniya, Lankatilaka, and Embekke temples built.
• This period laid foundations for the Kotte and Kandyan kingdoms.`,
      image_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "Who invaded and destroyed Polonnaruwa in 1215 AD?",
          options: ["Kalinga Magha", "Parakramabahu", "Vijayabahu", "Nissankamalla"],
          correct_answer: 0,
        },
        {
          id: 2,
          question: "Which king of Dambadeniya protected the Sacred Tooth Relic?",
          options: ["Vijayabahu III", "Parakramabahu II", "Bhuvanekabahu I", "Vikramabahu III"],
          correct_answer: 1,
        },
        {
          id: 3,
          question: "The Gadaladeniya and Lankatilaka temples were built during which kingdom?",
          options: ["Dambadeniya", "Yapahuwa", "Kurunegala", "Gampola"],
          correct_answer: 3,
        },
        {
          id: 4,
          question: "Which fortress rock served as the capital of Yapahuwa?",
          options: ["Sigiriya", "Yapahuwa Rock", "Pidurangala", "Dambulla"],
          correct_answer: 1,
        },
      ],
    },
  },
  {
    id: 11,
    title: "Plantation Economy and Economic Changes",
    description: "Tea, rubber, coconut plantations and colonial economy",
    level: 4,
    xp_reward: 130,
    content: {
      text: `Plantation Economy (19th-20th Century)

Coffee Era (1830-1870):
British rulers started coffee plantations in the central highlands. Sale of crown lands began through the Colebrooke Commission. The industry was destroyed by coffee leaf disease.

Tea Era (1867-Present):
James Taylor started the first tea plantation in Loolecondera in 1867. Thomas Lipton expanded tea trade. Sri Lanka became the world's leading tea producer.

Rubber Industry (1876-Present):
Rubber plants were brought to Sri Lanka in 1876. Plantations started in Kalutara, Horana, and Agalawatta areas. It became the main export commodity in the 20th century.

Indian Labor:
Thousands of Tamil workers were brought from South India to work on plantations. This demographic change altered the social structure.

Economic Impact:
• Free trade policy
• Emergence of monetary economy
• Dominance of export industries
• Country's dependence on plantation sector
• Establishment of banks and financial institutions`,
      image_url: "https://images.unsplash.com/photo-1563551447-2fa2c2b8e75c?w=800",
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "Who started the first tea plantation in Sri Lanka?",
          options: ["Thomas Lipton", "James Taylor", "Henry Bird", "George Bird"],
          correct_answer: 1,
        },
        {
          id: 2,
          question: "When did tea plantations begin?",
          options: ["1830", "1848", "1867", "1876"],
          correct_answer: 2,
        },
        {
          id: 3,
          question: "When was rubber brought to Sri Lanka?",
          options: ["1830", "1867", "1876", "1900"],
          correct_answer: 2,
        },
        {
          id: 4,
          question: "From where were workers brought for plantations?",
          options: ["China", "Burma", "South India", "Malaysia"],
          correct_answer: 2,
        },
      ],
    },
  },
  {
    id: 12,
    title: "Portuguese Colonization of Sri Lanka",
    description: "First European colonizers – Portuguese trade, rule & conflicts (1505–1658)",
    level: 4,
    xp_reward: 120,
    content: {
      text: `Portuguese Colonization of Sri Lanka (1505–1658)

Arrival of the Portuguese (1505):
The Portuguese arrived in Sri Lanka in 1505 under Lorenzo de Almeida. They came primarily for the lucrative spice trade, especially cinnamon.

Control of Coastal Areas:
• Portuguese established forts in Colombo (1518), Galle, Jaffna and Trincomalee.
• They never fully controlled the Kandyan Kingdom in the central highlands.
• The Kingdom of Kotte was the main political entity they dealt with in the lowlands.

Conversion to Christianity:
• Portuguese missionaries actively spread Roman Catholicism.
• King Dharmapala of Kotte converted to Christianity (1557).
• Many coastal communities were converted, especially fishermen.
• Church schools were established – an early form of Western education in Sri Lanka.

Economic Impact:
• Portuguese monopolized the cinnamon trade.
• Heavy taxation was imposed on the local population.
• They disrupted traditional trade networks with Arab and Indian merchants.

Resistance Movements:
• Sitawaka Kingdom under Mayadunne and Rajasinha I fiercely resisted Portuguese expansion.
• Rajasinha I besieged Colombo fort in 1587 and nearly expelled the Portuguese.
• The Kandyan Kingdom under Vimaladharmasuriya I also resisted successfully.

End of Portuguese Rule:
• The Dutch allied with Kandyan King Rajasinha II and expelled the Portuguese.
• By 1658, the Portuguese were completely removed from Sri Lanka.
• Portuguese rule lasted approximately 153 years.`,
      image_url: "https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?w=800",
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "In which year did the Portuguese first arrive in Sri Lanka?",
          options: ["1498", "1505", "1520", "1550"],
          correct_answer: 1,
        },
        {
          id: 2,
          question: "Which king of Kotte converted to Christianity?",
          options: ["Parakramabahu VI", "Bhuvanekabahu VII", "Dharmapala", "Mayadunne"],
          correct_answer: 2,
        },
        {
          id: 3,
          question: "Who allied with the Dutch to expel the Portuguese?",
          options: ["Mayadunne", "Rajasinha I", "Rajasinha II", "Vimaladharmasuriya I"],
          correct_answer: 2,
        },
        {
          id: 4,
          question: "What was the main spice the Portuguese sought in Sri Lanka?",
          options: ["Pepper", "Cardamom", "Cinnamon", "Cloves"],
          correct_answer: 2,
        },
      ],
    },
  },

  {
    id: 13,
    title: "The Kandyan Kingdom",
    description: "Last independent Sri Lankan kingdom – kings, culture & resistance (1469–1815)",
    level: 4,
    xp_reward: 130,
    content: {
      text: `The Kandyan Kingdom (1469–1815)

Establishment:
The Kandyan Kingdom (Senkadagala) was established around 1469. Located in the central highlands, its geography made it extremely difficult for European powers to conquer.

Important Kings:
• Vimaladharmasuriya I (1591–1604): Brought the Sacred Tooth Relic to Kandy; built the first Temple of the Tooth.
• Rajasinha II (1635–1687): Allied with the Dutch to expel the Portuguese; signed the Treaty of 1638.
• Kirti Sri Rajasinha (1747–1782): Invited higher ordination (Upasampadha) from Siam; founded the Siam Nikaya.
• Sri Wickrama Rajasinha (1798–1815): Last king; ceded the kingdom to the British via the Kandyan Convention.

Cultural Significance:
• Centre of Sinhalese Buddhist culture and arts.
• The Sacred Tooth Relic (Dalada Maligawa) became a symbol of legitimate kingship.
• Kandyan dance, music and crafts flourished during this era.
• The Esala Perahera festival became a grand national ceremony.

Resistance to Europeans:
• Resisted Portuguese and Dutch for over 150 years.
• Terrain, guerrilla warfare and diplomatic skill protected the kingdom.
• Even the British struggled to capture Kandy initially (1803 disaster).

Fall of the Kandyan Kingdom (1815):
• Kandyan Convention signed on 2 March 1815.
• Kandyan chiefs, dissatisfied with Sri Wickrama Rajasinha's harsh rule, invited the British.
• Sri Lanka came under complete British rule for the first time.
• The Uva Rebellion (1817–1818) was the last major uprising against British rule.`,
      image_url: "https://images.unsplash.com/photo-1567473030492-533b30c5494c?w=800",
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "Who built the first Temple of the Tooth in Kandy?",
          options: ["Rajasinha I", "Vimaladharmasuriya I", "Kirti Sri Rajasinha", "Parakramabahu"],
          correct_answer: 1,
        },
        {
          id: 2,
          question: "The Kandyan Convention was signed in which year?",
          options: ["1796", "1802", "1815", "1818"],
          correct_answer: 2,
        },
        {
          id: 3,
          question: "Who invited Buddhism's higher ordination from Siam?",
          options: ["Rajasinha II", "Vimaladharmasuriya II", "Kirti Sri Rajasinha", "Narendra Sinha"],
          correct_answer: 2,
        },
        {
          id: 4,
          question: "What was the last major uprising against British rule after 1815?",
          options: ["Matale Rebellion", "1848 Rebellion", "Uva Rebellion", "Wellassa Rebellion"],
          correct_answer: 2,
        },
      ],
    },
  },

  {
    id: 14,
    title: "Colebrooke-Cameron Reforms & Colonial Society",
    description: "British administrative and social reforms that reshaped colonial Ceylon (1833–1900)",
    level: 4,
    xp_reward: 120,
    content: {
      text: `Colebrooke-Cameron Reforms & Colonial Society (1833–1900)

Colebrooke-Cameron Commission (1833):
Major reforms introduced by British commissioners W.M.G. Colebrooke and C.H. Cameron:
• Unified administration replacing regional systems.
• Legislative Council established with some unofficial members.
• Executive Council created to advise the Governor.
• Free trade principles applied – abolished monopolies.
• Slavery abolished in Sri Lanka (1844).

Education Reforms:
• English-medium schools established throughout the country.
• Colombo Academy (later Royal College) founded in 1835.
• Missionary societies opened schools: American Ceylon Mission, Wesleyan Mission.
• A new English-educated elite emerged.
• Local language education (Sinhala and Tamil) was initially neglected.

Social Changes:
• A new middle class emerged through English education.
• Caste barriers weakened due to new economic opportunities.
• Women's education slowly began through missionary schools.
• Printing press introduced – first Sinhala newspapers published.

Legal Reforms:
• Roman-Dutch law maintained alongside British law.
• Customary laws (Kandyan Law and Tesawalamai) were partially preserved.
• A structured court system was established island-wide.

Impact on Society:
• English education created social divisions between the educated elite and rural masses.
• Traditional temple-based education declined.
• New professions emerged: lawyers, doctors, government servants.
• Buddhist and Hindu revival movements arose in response to Christian missionary activity.`,
      image_url: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800",
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "In which year were the Colebrooke-Cameron reforms introduced?",
          options: ["1815", "1833", "1848", "1870"],
          correct_answer: 1,
        },
        {
          id: 2,
          question: "What was Colombo Academy later renamed?",
          options: ["University of Colombo", "Royal College", "S. Thomas' College", "Trinity College"],
          correct_answer: 1,
        },
        {
          id: 3,
          question: "When was slavery officially abolished in Sri Lanka?",
          options: ["1815", "1833", "1844", "1858"],
          correct_answer: 2,
        },
        {
          id: 4,
          question: "What council was created to advise the Governor under the reforms?",
          options: ["State Council", "Legislative Council", "Executive Council", "District Council"],
          correct_answer: 2,
        },
      ],
    },
  },

  {
    id: 15,
    title: "The 1818 and 1848 Rebellions",
    description: "Uva-Wellassa Rebellion and the Matale Rebellion – early resistance to British rule",
    level: 4,
    xp_reward: 130,
    content: {
      text: `The 1818 and 1848 Rebellions Against British Rule

Uva-Wellassa Rebellion (1817–1818):

Causes:
• Resentment over the Kandyan Convention (1815) which ceded the kingdom.
• Heavy taxation imposed by British authorities.
• Forced labour (rajakariya) continued.
• Dissatisfaction of Kandyan chieftains who felt British broke promises.
• A pretender claimed to be a prince of the royal line.

Key Leaders:
• Keppetipola Dissawe: Chief leader; former British ally who changed sides.
• Pilimatalawa: Senior Kandyan chieftain.
• Madugalle Dissawe: Supported the rebellion.

Course of Events:
• Rebellion spread across Uva and Wellassa provinces.
• British used brutal suppression – burning villages, destroying crops.
• Cattle slaughtered to deprive rebels of food.
• The population of Uva-Wellassa drastically reduced.

Aftermath:
• Keppetipola Dissawe was captured and executed (1818).
• His skull is preserved in Scotland (Kandy National Museum replica).
• British tightened grip; many Kandyan rights were abolished.

Matale Rebellion (1848):

Causes:
• Imposition of new taxes: dog tax, gun tax, road ordinance.
• Economic hardship from coffee blight.
• Anti-Christian feeling among Buddhist clergy.

Leaders:
• Puran Appu: Main leader, a carpenter.
• Gongalegoda Banda: Proclaimed king by rebels.

Outcome:
• Quickly suppressed by British forces.
• Puran Appu was captured and executed.
• Led to some tax reforms by the British.

Significance:
Both rebellions showed that Sri Lankans never fully accepted colonial subjugation. They inspired later nationalist movements.`,
      image_url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800",
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "Who was the main leader of the Uva-Wellassa Rebellion?",
          options: ["Puran Appu", "Keppetipola Dissawe", "Gongalegoda Banda", "Pilimatalawa"],
          correct_answer: 1,
        },
        {
          id: 2,
          question: "What was one cause of the 1848 Matale Rebellion?",
          options: ["Kandyan Convention", "The 'Sinhala Only' Act", "Imposition of new taxes", "Plantation policy"],
          correct_answer: 2,
        },
        {
          id: 3,
          question: "Who led the 1848 Rebellion and was proclaimed king?",
          options: ["Keppetipola", "Puran Appu", "Gongalegoda Banda", "Madugalle"],
          correct_answer: 2,
        },
        {
          id: 4,
          question: "Where is Keppetipola Dissawe's skull preserved?",
          options: ["British Museum, London", "A museum in Scotland", "Kandy National Museum", "Colombo Museum"],
          correct_answer: 1,
        },
      ],
    },
  },
  {
    id: 16,
    title: "National Independence Movement",
    description: "Struggle for independence and 1948 independence",
    level: 5,
    xp_reward: 140,
    content: {
      text: `National Independence Movement (1900-1948)

Initial Steps:
• Lanka Sabha (1890) - Ponnambalam Ramanathan
• Young Lanka Movement (1915)
• Ceylon National Congress (1919) - Ponnambalam Arunachalam

1915 Sinhala-Muslim Riots:
Sinhala-Buddhist people rose up due to the ban on Vesak processions. The British carried out severe repression. Leaders like D.S. Senanayake, F.R. Senanayake, and H. Sri Nissanka were arrested.

Anagarika Dharmapala:
Dharmapala, who led the Buddhist revival, inspired national consciousness. He founded the Maha Bodhi Society to protect Buddhist rights.

Donoughmore Constitution (1931):
• Universal suffrage
• State Council
• Executive Committee system
• Increased Sri Lankan leadership

Soulbury Constitution (1946):
• Internal self-government
• Parliamentary democracy
• Paving the way for independence

February 4, 1948 - Independence:
Sri Lanka became an independent dominion with D.S. Senanayake as Prime Minister.`,
      image_url: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800",
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "When did Sri Lanka gain independence?",
          options: ["February 4, 1946", "August 15, 1947", "February 4, 1948", "September 18, 1948"],
          correct_answer: 2,
        },
        {
          id: 2,
          question: "Who was the first Prime Minister?",
          options: ["D.S. Senanayake", "S.W.R.D. Bandaranaike", "J.R. Jayewardene", "Dudley Senanayake"],
          correct_answer: 0,
        },
        {
          id: 3,
          question: "Which constitution introduced universal suffrage?",
          options: ["Colebrooke", "Donoughmore", "Soulbury", "Manning"],
          correct_answer: 1,
        },
        {
          id: 4,
          question: "Who led the Buddhist revival?",
          options: ["Ponnambalam Ramanathan", "Anagarika Dharmapala", "Pilivithalave", "Hikkaduve"],
          correct_answer: 1,
        },
      ],
    },
  },

  // ─── MISSING O/L SYLLABUS LESSONS ────────────────────────────────────────────

  {
    id: 17,
    title: "Buddhist & Cultural Revival Movements",
    description: "The 19th-century awakening of Buddhism, Hindu culture and national identity",
    level: 5,
    xp_reward: 140,
    content: {
      text: `Buddhist & Cultural Revival Movements (19th Century)

Background:
British colonial rule and Christian missionary activity led to a decline in Buddhism and traditional Sri Lankan culture. This sparked powerful revival movements.

Buddhist Revival – Panadura Vadaya (1873):
• A great public debate between Buddhist monk Migettuwatte Gunananda and Christian clergy.
• Buddhism won widespread public support and boosted confidence in the Sangha.
• News of the debate reached the West and attracted Colonel Henry Steel Olcott.

Colonel Olcott & the Theosophical Society:
• American Colonel Olcott and Madame Blavatsky founded the Theosophical Society.
• Olcott arrived in Sri Lanka in 1880 and championed Buddhism.
• The Buddhist flag was designed in 1885 by Olcott and local Buddhists.
• Buddhist schools (pirivenas) were established to counter missionary schools.

Anagarika Dharmapala (1864–1933):
• Born David Hewavitarne; became the greatest Buddhist revivalist.
• Founded the Maha Bodhi Society (1891) to restore Bodh Gaya for Buddhists.
• Championed Sinhala Buddhist nationalism and social reform.
• Started the Sinhala journal "Sinhala Bauddhaya."
• Inspired Ceylonese to reclaim their cultural identity.

Hindu Tamil Revival:
• Arumuga Navalar (1822–1879) led the Hindu revival among the Tamil community.
• Translated Hindu religious texts and established Hindu schools.
• Opposed Christian conversions among Tamils.

Political Impact:
These revival movements gradually transformed into political consciousness, laying the groundwork for the national independence movement.`,
      image_url: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=800",
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "What was the Panadura Vadaya of 1873?",
          options: ["A political meeting", "A debate between Buddhists and Christians", "A temple inauguration", "A cultural festival"],
          correct_answer: 1,
        },
        {
          id: 2,
          question: "Who designed the Buddhist flag in 1885?",
          options: ["Anagarika Dharmapala", "Migettuwatte Gunananda", "Colonel Olcott", "Arumuga Navalar"],
          correct_answer: 2,
        },
        {
          id: 3,
          question: "Who founded the Maha Bodhi Society?",
          options: ["Colonel Olcott", "Migettuwatte Gunananda", "Anagarika Dharmapala", "Arumuga Navalar"],
          correct_answer: 2,
        },
        {
          id: 4,
          question: "Who led the Hindu revival among Tamil communities?",
          options: ["Anagarika Dharmapala", "Colonel Olcott", "Ponnambalam Ramanathan", "Arumuga Navalar"],
          correct_answer: 3,
        },
      ],
    },
  },

  {
    id: 18,
    title: "Post-Independence Sri Lanka (1948–1978)",
    description: "Political developments, language issues and social changes after independence",
    level: 5,
    xp_reward: 150,
    content: {
      text: `Post-Independence Sri Lanka (1948–1978)

Early Independence Period (1948–1956):
• D.S. Senanayake became the first Prime Minister of independent Ceylon.
• Sri Lanka remained a Dominion under the British Crown initially.
• United National Party (UNP) dominated early politics.
• Dudley Senanayake succeeded his father in 1952.

The 1956 Revolution – S.W.R.D. Bandaranaike:
• S.W.R.D. Bandaranaike won the 1956 election with the Sri Lanka Freedom Party (SLFP).
• Official Language Act 1956 ("Sinhala Only") made Sinhala the sole official language.
• This caused deep Tamil resentment and communal tensions.
• Bandaranaike–Chelvanayakam Pact (B-C Pact, 1957) attempted reconciliation but was abrogated.
• Bandaranaike was assassinated in 1959 by a Buddhist monk.

Sirimavo Bandaranaike (1960–1965 & 1970–1977):
• World's first female Prime Minister (1960).
• Nationalised schools, newspapers and key industries.
• Republican Constitution of 1972: Ceylon became "Sri Lanka"; Buddhism given the foremost place.
• Land reform (1972) redistributed plantation lands.

Major Constitutional Changes:
• 1972 Constitution: Sri Lanka became a Republic – broke formal ties with the British Crown.
• 1978 Constitution: J.R. Jayewardene introduced the Executive Presidency system.
• Sri Lanka became the Democratic Socialist Republic of Sri Lanka.

Tamil Political Demands:
• Federal Party formed by S.J.V. Chelvanayakam demanded Tamil autonomy.
• Tamil United Liberation Front (TULF) later demanded a separate state (Eelam).
• These tensions eventually led to the civil conflict that began in the 1980s.`,
      image_url: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800",
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "Who was Sri Lanka's first female Prime Minister?",
          options: ["Chandrika Kumaratunga", "Sirimavo Bandaranaike", "Vijaya Kumaratunga", "Hema Senanayake"],
          correct_answer: 1,
        },
        {
          id: 2,
          question: "The 'Sinhala Only' Official Language Act was passed in which year?",
          options: ["1948", "1952", "1956", "1960"],
          correct_answer: 2,
        },
        {
          id: 3,
          question: "Under which constitution did Ceylon become the Republic of Sri Lanka?",
          options: ["Soulbury Constitution", "1948 Constitution", "1972 Constitution", "1978 Constitution"],
          correct_answer: 2,
        },
        {
          id: 4,
          question: "Who introduced the Executive Presidency in Sri Lanka?",
          options: ["S.W.R.D. Bandaranaike", "Sirimavo Bandaranaike", "Dudley Senanayake", "J.R. Jayewardene"],
          correct_answer: 3,
        },
      ],
    },
  },
  {
    id: 19,
    title: "World Wars and Their Impact on Sri Lanka",
    description: "World War I & II – causes, key events, and effects on Ceylon",
    level: 5,
    xp_reward: 150,
    content: {
      text: `World Wars and Their Impact on Sri Lanka

World War I (1914–1918):

Causes:
• Assassination of Archduke Franz Ferdinand of Austria (June 28, 1914).
• Alliance system: Triple Alliance (Germany, Austria-Hungary, Italy) vs Triple Entente (Britain, France, Russia).
• Nationalism, militarism, imperialism and alliance tensions.

Key Events:
• Trench warfare on the Western Front.
• Use of new weapons: poison gas, tanks, aeroplanes.
• USA entered the war in 1917.
• Ended with Armistice on November 11, 1918.
• Treaty of Versailles (1919) – Germany heavily punished.

Impact on Ceylon:
• Ceylon (Sri Lanka) fought as part of the British Empire.
• Ceylonese soldiers served in various theatres.
• 1915 Sinhala-Muslim riots occurred during wartime; British crackdown was harsh.
• Economic hardship; food prices rose.

World War II (1939–1945):

Causes:
• Rise of Adolf Hitler and Nazi Germany.
• Hitler's aggression – invasion of Poland (September 1, 1939).
• Failure of League of Nations to maintain peace.
• Japan's expansionism in Asia.

Key Events:
• Germany's Blitzkrieg swept through Europe.
• Battle of Britain (1940).
• Japan attacked Pearl Harbor (December 7, 1941) – USA joined the war.
• Holocaust: Nazi genocide of 6 million Jews.
• Allied D-Day invasion of Normandy (1944).
• Atomic bombs dropped on Hiroshima and Nagasaki (August 1945).
• Japan surrendered – war ended September 2, 1945.

Direct Impact on Ceylon:
• Japanese bombed Colombo and Trincomalee (April 5–9, 1942).
• Allied South East Asia Command (SEAC) headquarters established in Kandy.
• Ceylon was a critical Allied base in the Indian Ocean.
• The war accelerated demands for independence from Britain.
• Ceylon gained independence just 3 years after WW2 ended (1948).`,
      image_url: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=800",
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "What event triggered the start of World War I?",
          options: [
            "Invasion of Poland",
            "Assassination of Archduke Franz Ferdinand",
            "Attack on Pearl Harbor",
            "Fall of France",
          ],
          correct_answer: 1,
        },
        {
          id: 2,
          question: "When did Japan bomb Colombo during World War II?",
          options: ["December 1941", "January 1942", "April 1942", "August 1945"],
          correct_answer: 2,
        },
        {
          id: 3,
          question: "Where was the Allied South East Asia Command (SEAC) HQ established?",
          options: ["Colombo", "Galle", "Kandy", "Trincomalee"],
          correct_answer: 2,
        },
        {
          id: 4,
          question: "The Treaty of Versailles (1919) was signed after which war?",
          options: ["World War II", "World War I", "The Crimean War", "The Boer War"],
          correct_answer: 1,
        },
      ],
    },
  },
];