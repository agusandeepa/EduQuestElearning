/**
 * AI Service for EduQuest
 * Powered by Google Gemini API — Sri Lankan O/L Syllabus
 * Works WITH or WITHOUT API key (offline fallback mode)
 */

// ─── Types ─────────────────────────────────────────────────────────────────────
export interface EssayGradingResult {
  score: number;
  grade: string;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  missingPoints: string[];
  feedback: string;
  improvedVersion?: string;
  historicalAccuracy: number;
  grammarScore: number;
  coherenceScore: number;
}

export interface GeneratedQuestion {
  id: string;
  question: string;
  type: 'mcq' | 'true-false' | 'fill-blank' | 'essay' | 'match';
  options?: string[];
  correctAnswer: number | string;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
  points: number;
}

export interface QuestionGenerationParams {
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'mixed';
  count: number;
  questionTypes?: ('mcq' | 'true-false' | 'essay' | 'fill-blank')[];
  focusAreas?: string[];
  language?: 'en' | 'si';
}

export interface EssayQuestion {
  id: string;
  subject: string;
  question: string;
  modelAnswer: string;
  topic: string;
  points: number;
  hint?: string;
}

// ─── Sri Lankan O/L Syllabus Context ──────────────────────────────────────────
const SUBJECT_SYLLABUS: Record<string, string> = {
  english: `Sri Lankan G.C.E. O/L English Language syllabus.
Topics: formal & informal letter writing, discursive and descriptive essays,
reading comprehension (environmental, social, cultural Sri Lankan topics), grammar
(tenses, articles, prepositions, conjunctions, reported speech, passive voice),
summary writing, directed writing (notices, reports, speeches, reviews).
Use Sri Lankan contexts: village life, nature, environment, education, culture.`,

  history: `Sri Lankan G.C.E. O/L History syllabus.
Topics: Ancient kingdoms (Anuradhapura, Polonnaruwa, Dambadeniya, Kotte, Kandyan kingdom),
colonial era (Portuguese 1505, Dutch 1658, British 1815), independence 1948,
ancient world civilizations (Mesopotamia, Egypt, Indus Valley, China),
Asian history (India, China, Japan), World War I & II, United Nations,
Non-Aligned Movement. Key figures: King Vijaya, Dutugamunu, Parakramabahu I,
D.S. Senanayake. Mahavamsa as historical source.`,

  science: `Sri Lankan G.C.E. O/L Combined Science syllabus.
Biology: cell structure, photosynthesis, respiration, human body systems
(digestion, circulation, respiration, nervous system, excretion), reproduction,
genetics basics, ecosystems, food chains, health and disease.
Chemistry: matter, elements/compounds/mixtures, atomic structure, chemical reactions,
acids/bases/salts, metals/non-metals, carbon compounds.
Physics: measurement, force and motion, work/power/energy, pressure, heat,
light (reflection/refraction/lenses), sound, electricity (Ohm's law, circuits),
magnetism, Earth and space.`,

  maths: `Sri Lankan G.C.E. O/L Mathematics syllabus.
Topics: number systems, LCM/HCF, ratio and proportion, percentage, profit/loss,
simple and compound interest, algebraic expressions, factorization, linear equations,
simultaneous equations, quadratic equations, geometry theorems (Pythagoras,
angle in semicircle, tangent-radius), area and volume (2D/3D shapes), statistics
(mean, median, mode, frequency tables, histograms, pie charts), sets, matrices,
trigonometry (SOHCAHTOA, angles of elevation/depression), indices and logarithms.`,
};

const SUBJECT_TOPICS: Record<string, string[]> = {
  english: [
    "Formal Letter Writing", "Informal Letter Writing", "Descriptive Essay",
    "Argumentative Essay", "Reading Comprehension", "Summary Writing",
    "Directed Writing – Notice", "Directed Writing – Report/Speech",
    "Grammar – Tenses & Voice", "Literature – Poetry Analysis",
  ],
  history: [
    "Anuradhapura Kingdom", "Polonnaruwa Kingdom", "Kandyan Kingdom",
    "Portuguese Rule in Sri Lanka", "Dutch Rule in Sri Lanka",
    "British Colonial Rule", "Independence Movement 1948",
    "Ancient World Civilizations", "World War I & II", "Non-Aligned Movement",
  ],
  science: [
    "Photosynthesis & Plant Biology", "Human Digestive System",
    "Human Circulatory System", "Ecosystems & Food Chains",
    "Atoms, Elements & Compounds", "Acids, Bases & Salts",
    "Chemical Reactions", "Force, Motion & Energy",
    "Light – Reflection & Refraction", "Electricity & Circuits",
  ],
  maths: [
    "Linear Equations", "Simultaneous Equations", "Quadratic Equations",
    "Geometry – Triangles & Pythagoras", "Geometry – Circles & Theorems",
    "Mensuration – Area & Volume", "Statistics – Mean, Median, Mode",
    "Trigonometry – SOHCAHTOA", "Angles of Elevation & Depression",
    "Indices & Logarithms", "Sets", "Matrices",
  ],
};

// ─── Offline Question Bank ─────────────────────────────────────────────────────
const OFFLINE_QUESTIONS: Record<string, GeneratedQuestion[]> = {
  history: [
    {
      id: 'h1', topic: 'Anuradhapura Kingdom',
      question: 'Which king defeated King Elara and unified Sri Lanka?',
      type: 'mcq', options: ['King Vijaya', 'King Dutugamunu', 'Parakramabahu I', 'Mahasena'],
      correctAnswer: 1, difficulty: 'easy', points: 10,
      explanation: 'King Dutugamunu (161-137 BCE) defeated King Elara and unified the island under one rule.',
    },
    {
      id: 'h2', topic: 'Colonial Era',
      question: 'In which year did the Portuguese first arrive in Sri Lanka?',
      type: 'mcq', options: ['1498', '1505', '1658', '1815'],
      correctAnswer: 1, difficulty: 'easy', points: 10,
      explanation: 'The Portuguese arrived in Sri Lanka in 1505 under Lourenço de Almeida.',
    },
    {
      id: 'h3', topic: 'Independence',
      question: 'Sri Lanka gained independence from British rule in 1948.',
      type: 'true-false', correctAnswer: 'true', difficulty: 'easy', points: 10,
      explanation: 'Ceylon (now Sri Lanka) gained independence on February 4, 1948, with D.S. Senanayake as the first Prime Minister.',
    },
    {
      id: 'h4', topic: 'Polonnaruwa Kingdom',
      question: 'King Parakramabahu I built the famous _______ reservoir in Polonnaruwa.',
      type: 'fill-blank', correctAnswer: 'Parakrama Samudra', difficulty: 'medium', points: 15,
      explanation: 'Parakrama Samudra (Sea of Parakrama) is the massive reservoir built by King Parakramabahu I.',
    },
    {
      id: 'h5', topic: 'Ancient Kingdoms',
      question: 'Explain the significance of the Mahavamsa as a historical source for Sri Lankan history.',
      type: 'essay', correctAnswer: 'The Mahavamsa is a chronicle written by monk Mahanama in the 5th century CE. It records the history of Sri Lanka from the arrival of King Vijaya. It is significant because it provides detailed accounts of ancient kings, Buddhist traditions, and historical events.', difficulty: 'hard', points: 25,
      explanation: 'The Mahavamsa is the most important primary source for ancient Sri Lankan history.',
    },
  ],
  science: [
    {
      id: 's1', topic: 'Photosynthesis & Plant Biology',
      question: 'What are the raw materials needed for photosynthesis?',
      type: 'mcq', options: ['Oxygen and glucose', 'Carbon dioxide and water', 'Nitrogen and sunlight', 'Glucose and water'],
      correctAnswer: 1, difficulty: 'easy', points: 10,
      explanation: 'Photosynthesis requires carbon dioxide (CO₂) and water (H₂O), using sunlight energy to produce glucose and oxygen.',
    },
    {
      id: 's2', topic: 'Electricity & Circuits',
      question: 'Ohm\'s Law states that V = IR. If voltage is 12V and resistance is 4Ω, what is the current?',
      type: 'mcq', options: ['2A', '3A', '4A', '48A'],
      correctAnswer: 1, difficulty: 'medium', points: 15,
      explanation: 'I = V/R = 12/4 = 3A. Ohm\'s Law: Current = Voltage ÷ Resistance.',
    },
    {
      id: 's3', topic: 'Atoms, Elements & Compounds',
      question: 'An atom is the smallest unit of an element that retains its chemical properties.',
      type: 'true-false', correctAnswer: 'true', difficulty: 'easy', points: 10,
      explanation: 'Atoms are the basic building blocks of matter. Each element has a unique type of atom.',
    },
    {
      id: 's4', topic: 'Acids, Bases & Salts',
      question: 'The pH of a neutral solution is _______.',
      type: 'fill-blank', correctAnswer: '7', difficulty: 'easy', points: 10,
      explanation: 'Pure water and neutral solutions have a pH of 7. Below 7 is acidic, above 7 is basic/alkaline.',
    },
  ],
  maths: [
    {
      id: 'm1', topic: 'Quadratic Equations',
      question: 'Solve: x² - 5x + 6 = 0. What are the values of x?',
      type: 'mcq', options: ['x = 1, x = 6', 'x = 2, x = 3', 'x = -2, x = -3', 'x = 2, x = -3'],
      correctAnswer: 1, difficulty: 'medium', points: 15,
      explanation: 'Factorize: (x-2)(x-3) = 0, so x = 2 or x = 3.',
    },
    {
      id: 'm2', topic: 'Geometry – Triangles & Pythagoras',
      question: 'In a right triangle, if the two shorter sides are 3cm and 4cm, what is the hypotenuse?',
      type: 'mcq', options: ['5 cm', '6 cm', '7 cm', '25 cm'],
      correctAnswer: 0, difficulty: 'easy', points: 10,
      explanation: 'By Pythagoras theorem: c² = 3² + 4² = 9 + 16 = 25, so c = 5 cm.',
    },
    {
      id: 'm3', topic: 'Statistics – Mean, Median, Mode',
      question: 'The mean of 5 numbers is 10. If four numbers are 8, 12, 9, 11, the fifth number is _______.',
      type: 'fill-blank', correctAnswer: '10', difficulty: 'medium', points: 15,
      explanation: 'Sum = 5 × 10 = 50. Known sum = 8+12+9+11 = 40. Fifth number = 50-40 = 10.',
    },
  ],
  english: [
    {
      id: 'e1', topic: 'Grammar – Tenses & Voice',
      question: 'Change to passive voice: "The teacher corrects the papers."',
      type: 'mcq',
      options: ['The papers are corrected by the teacher.', 'The papers were corrected by the teacher.', 'The papers corrected by the teacher.', 'The teacher is correcting the papers.'],
      correctAnswer: 0, difficulty: 'medium', points: 15,
      explanation: 'Passive voice: Object + "to be" + past participle + "by" + subject. Present tense uses "are/is".',
    },
    {
      id: 'e2', topic: 'Formal Letter Writing',
      question: 'A formal letter should use casual, friendly language.',
      type: 'true-false', correctAnswer: 'false', difficulty: 'easy', points: 10,
      explanation: 'Formal letters use polite, professional language. Casual language is used in informal/friendly letters.',
    },
  ],
};

const OFFLINE_ESSAY_QUESTIONS: Record<string, EssayQuestion[]> = {
  history: [
    {
      id: 'eq1', subject: 'history', topic: 'Anuradhapura Kingdom', points: 20,
      question: 'Describe the importance of the Anuradhapura Kingdom in Sri Lankan history. What were its major achievements?',
      modelAnswer: 'The Anuradhapura Kingdom (377 BCE – 1017 CE) was the first established kingdom in Sri Lanka and lasted for over 1,400 years. Its major achievements include: (1) Introduction of Buddhism by Mahinda Thero during King Devanampiyatissa\'s reign in 247 BCE, (2) Construction of massive dagobas such as Ruwanwelisaya, Jetavanaramaya, and Abhayagiri, (3) Development of advanced irrigation systems including tanks like Nuwara Wewa and Tissa Wewa, (4) Establishment of a sophisticated urban civilization with planned city layouts, (5) Creation of the Mahavamsa chronicle which documented history. The kingdom\'s fall came due to repeated invasions from South India and the capital shifting to Polonnaruwa.',
      hint: 'Key points: Introduction of Buddhism, dagoba construction, irrigation systems, Mahavamsa, duration of the kingdom',
    },
    {
      id: 'eq2', subject: 'history', topic: 'British Colonial Rule', points: 20,
      question: 'Explain how British colonial rule affected Sri Lanka economically and socially.',
      modelAnswer: 'British colonial rule (1815-1948) had profound effects on Sri Lanka. Economically: (1) The British established plantation agriculture, clearing forests for tea, rubber, and coconut estates, (2) They built roads, railways, and ports to export plantation products, (3) Local cottage industries declined due to cheap imported British goods, (4) Tamil workers were brought from India to work on plantations, creating demographic changes. Socially: (1) English education was introduced, creating an English-educated elite class, (2) Christian missionary schools spread Western education, (3) Traditional social structures were disrupted, (4) A new middle class emerged. The British also codified laws and established a modern civil service, which had lasting effects on governance after independence.',
      hint: 'Key points: Plantation economy, infrastructure development, English education, demographic changes, social class changes',
    },
  ],
  science: [
    {
      id: 'es1', subject: 'science', topic: 'Photosynthesis & Plant Biology', points: 20,
      question: 'Explain the process of photosynthesis and its importance to living things.',
      modelAnswer: 'Photosynthesis is the process by which green plants make their own food using sunlight. The equation is: Carbon dioxide + Water → Glucose + Oxygen (with light energy). The process occurs in chloroplasts, which contain chlorophyll — the green pigment that absorbs sunlight. In the light-dependent stage, sunlight splits water molecules, releasing oxygen as a byproduct. In the light-independent stage, CO₂ is used to make glucose. Importance: (1) Produces oxygen that all living things need for respiration, (2) Forms the base of all food chains, (3) Removes CO₂ from the atmosphere, reducing greenhouse effect, (4) Produces glucose used for plant growth and stored as starch. Without photosynthesis, there would be no food for herbivores, and consequently no food for carnivores or humans.',
      hint: 'Key points: Equation, chloroplasts/chlorophyll, light and dark reactions, oxygen production, food chain base',
    },
  ],
  maths: [
    {
      id: 'em1', subject: 'maths', topic: 'Simultaneous Equations', points: 20,
      question: 'Solve the simultaneous equations: 2x + 3y = 12 and x - y = 1. Show all working.',
      modelAnswer: 'Step 1: Label the equations. Equation 1: 2x + 3y = 12. Equation 2: x - y = 1. Step 2: From Equation 2, express x: x = 1 + y. Step 3: Substitute into Equation 1: 2(1 + y) + 3y = 12. Step 4: Expand: 2 + 2y + 3y = 12. Step 5: Simplify: 5y = 10, so y = 2. Step 6: Substitute y = 2 back into x = 1 + y: x = 1 + 2 = 3. Step 7: Verify — Check in Equation 1: 2(3) + 3(2) = 6 + 6 = 12 ✓. Check in Equation 2: 3 - 2 = 1 ✓. Answer: x = 3, y = 2.',
      hint: 'Key steps: Label equations, use substitution or elimination method, show all working, verify your answer',
    },
  ],
  english: [
    {
      id: 'ee1', subject: 'english', topic: 'Formal Letter Writing', points: 20,
      question: 'Write a formal letter to your school principal requesting permission to start an environmental club.',
      modelAnswer: '123, Kandy Road,\nNegombo.\n15th May 2025.\n\nThe Principal,\nSt. Mary\'s College,\nNegombo.\n\nDear Sir/Madam,\n\nSubject: Request to Start an Environmental Club\n\nI am writing to respectfully request your permission and support to establish an Environmental Club at our school. As students, we have observed increasing environmental issues such as littering, improper waste disposal, and lack of awareness about conservation in our community.\n\nThe proposed club would organize activities such as school garden projects, waste separation programmes, and environmental awareness campaigns. We believe this would not only benefit our school environment but also teach students valuable lessons about sustainability.\n\nWe kindly request a room for weekly meetings and permission to display awareness posters around the school. We assure you that all activities will be conducted responsibly and will not interfere with academic work.\n\nWe would be grateful for your consideration of this request.\n\nYours faithfully,\nA.B. Perera\n(Grade 11, Class A)',
      hint: 'Key points: Proper address format, formal salutation, clear subject line, polite tone, specific request with reasons, formal closing',
    },
  ],
};

// ─── Gemini API helper ─────────────────────────────────────────────────────────
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const GEMINI_MODEL = 'gemini-2.0-flash';

async function callGemini(prompt: string): Promise<string> {
  if (!GEMINI_API_KEY) {
    throw new Error('NO_API_KEY');
  }

  const response = await fetch(
    `/gemini-api/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2048,
        },
      }),
    }
  );

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Gemini API error ${response.status}: ${err}`);
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

function extractJSON<T>(raw: string, isArray: boolean): T {
  let clean = raw.replace(/```json|```/g, '').trim();
  const pattern = isArray ? /\[[\s\S]*\]/ : /\{[\s\S]*\}/;
  const match = clean.match(pattern);
  if (match) clean = match[0];
  return JSON.parse(clean) as T;
}

// ─── AI Service Class ──────────────────────────────────────────────────────────
class AIService {

  private detectSubject(topic: string): string {
    const t = topic.toLowerCase();
    if (/algebra|geometry|trigon|statistic|calculus|maths|equation|matrix|indices|logarithm|mensuration|simultaneous|quadratic|pythagoras/.test(t)) return 'maths';
    if (/history|kingdom|colonial|war|ancient|civilization|independence|vijaya|british|dutch|portuguese|anuradhapura|polonnaruwa|kandyan|mahavamsa/.test(t)) return 'history';
    if (/biology|chemistry|physics|science|photosynthesis|cell|atom|force|electricity|ecosystem|acid|light|digestion|respiration|circuit/.test(t)) return 'science';
    return 'english';
  }

  // ── Offline Fallbacks ──────────────────────────────────────────────────────

  private offlineGrade(studentAnswer: string): EssayGradingResult {
    const wordCount = studentAnswer.trim().split(/\s+/).length;
    // Basic scoring based on length and content
    let score = 45;
    if (wordCount > 50) score = 55;
    if (wordCount > 100) score = 62;
    if (wordCount > 150) score = 68;

    const gradeMap: [number, string][] = [
      [90, 'A+'], [85, 'A'], [80, 'A-'], [75, 'B+'], [70, 'B'],
      [65, 'B-'], [60, 'C+'], [55, 'C'], [50, 'C-'], [40, 'D'], [0, 'F'],
    ];
    const grade = gradeMap.find(([min]) => score >= min)?.[1] || 'F';

    return {
      score,
      grade,
      strengths: [
        'Answer attempts to address the question',
        wordCount > 80 ? 'Good answer length with adequate detail' : 'Shows basic understanding of the topic',
      ],
      weaknesses: [
        'AI grading unavailable — add VITE_GEMINI_API_KEY for detailed feedback',
        wordCount < 100 ? 'Answer could be more detailed with specific examples' : 'Could include more specific facts',
      ],
      suggestions: [
        'Add specific dates, names, and events from the Sri Lankan O/L syllabus',
        'Structure your answer with an introduction, body paragraphs, and conclusion',
        'Add VITE_GEMINI_API_KEY to .env for full AI-powered grading',
      ],
      missingPoints: [
        'Full analysis requires Gemini API key',
        'Add key examples and specific facts',
      ],
      feedback: `Your answer has ${wordCount} words. ${wordCount < 80 ? 'Try to write more — aim for at least 150 words for a full O/L answer.' : 'Good effort! For full AI-powered feedback, add your Gemini API key to the .env file.'} Score is estimated based on answer length.`,
      historicalAccuracy: score - 5,
      grammarScore: score,
      coherenceScore: score - 3,
    };
  }

  private offlineQuestions(topic: string, count: number): GeneratedQuestion[] {
    const subject = this.detectSubject(topic);
    const pool = OFFLINE_QUESTIONS[subject] || OFFLINE_QUESTIONS.history;
    // Return up to `count` questions, cycling if needed
    const result: GeneratedQuestion[] = [];
    for (let i = 0; i < count; i++) {
      result.push({ ...pool[i % pool.length], id: `offline_${i + 1}` });
    }
    return result;
  }

  private offlineEssayQuestions(subject: string): EssayQuestion[] {
    const key = subject.toLowerCase();
    return OFFLINE_ESSAY_QUESTIONS[key] || OFFLINE_ESSAY_QUESTIONS.history;
  }

  // ── Public API ─────────────────────────────────────────────────────────────

  /**
   * Grade an essay — uses Gemini if key available, offline fallback otherwise
   */
  async gradeEssay(
    studentAnswer: string,
    question: string,
    modelAnswer: string,
    topic: string
  ): Promise<EssayGradingResult> {
    // Try Gemini first
    if (GEMINI_API_KEY) {
      const subject = this.detectSubject(topic);
      const syllabus = SUBJECT_SYLLABUS[subject] || SUBJECT_SYLLABUS.english;

      const prompt = `You are a strict but fair Sri Lankan G.C.E. O/L ${subject} examiner.

SYLLABUS CONTEXT:
${syllabus}

QUESTION: ${question}
TOPIC: ${topic}

MODEL ANSWER:
${modelAnswer}

STUDENT ANSWER:
${studentAnswer}

Grade this answer strictly according to Sri Lankan O/L marking standards.
Respond ONLY with a valid JSON object. No markdown, no backticks, no extra text:
{
  "score": <integer 0-100>,
  "grade": "<A+|A|A-|B+|B|B-|C+|C|C-|D|F>",
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "weaknesses": ["<weakness 1>", "<weakness 2>"],
  "suggestions": ["<suggestion 1>", "<suggestion 2>", "<suggestion 3>"],
  "missingPoints": ["<missing point 1>", "<missing point 2>", "<missing point 3>"],
  "feedback": "<2-3 sentences of constructive, exam-style feedback>",
  "historicalAccuracy": <integer 0-100>,
  "grammarScore": <integer 0-100>,
  "coherenceScore": <integer 0-100>
}

Grading scale: A+>=90, A>=85, A->=80, B+>=75, B>=70, B->=65, C+>=60, C>=55, C->=50, D>=40, F<40
Criteria: content accuracy 40%, completeness 30%, grammar 15%, coherence 15%.`;

      try {
        const raw = await callGemini(prompt);
        return extractJSON<EssayGradingResult>(raw, false);
      } catch (e) {
        console.warn('Gemini grading failed, using offline fallback:', e);
      }
    }

    // Offline fallback
    return this.offlineGrade(studentAnswer);
  }

  /**
   * Generate quiz questions — uses Gemini if key available, offline bank otherwise
   */
  async generateQuestions(params: QuestionGenerationParams): Promise<GeneratedQuestion[]> {
    // Try Gemini first
    if (GEMINI_API_KEY) {
      const subject = this.detectSubject(params.topic);
      const syllabus = SUBJECT_SYLLABUS[subject] || SUBJECT_SYLLABUS.english;
      const types = params.questionTypes?.join(', ') || 'mcq, true-false, essay, fill-blank';

      const prompt = `You are an expert Sri Lankan G.C.E. O/L ${subject} question setter.

SYLLABUS:
${syllabus}

Generate exactly ${params.count} questions about "${params.topic}".
Difficulty: ${params.difficulty}. Types to use: ${types}.
${params.focusAreas ? `Focus on: ${params.focusAreas.join(', ')}` : ''}

Respond ONLY with a valid JSON array. No markdown, no backticks, no extra text:
[
  {
    "id": "q1",
    "question": "<question>",
    "type": "<mcq|true-false|essay|fill-blank>",
    "options": ["<A>","<B>","<C>","<D>"],
    "correctAnswer": <index for mcq | "true"/"false" | text>,
    "explanation": "<explanation>",
    "difficulty": "<easy|medium|hard>",
    "topic": "${params.topic}",
    "points": <10|15|20|25|30>
  }
]

Rules:
- Questions must match actual Sri Lankan O/L exam style and difficulty
- MCQ options must be plausible (good distractors)
- Essay questions must be analytical, not just descriptive
- Include specific dates, names, events relevant to Sri Lanka
- For maths: include numerical values and ask for working
- points: 10=easy short, 15=medium, 20-25=hard, 30=essay`;

      try {
        const raw = await callGemini(prompt);
        return extractJSON<GeneratedQuestion[]>(raw, true);
      } catch (e) {
        console.warn('Gemini question generation failed, using offline bank:', e);
      }
    }

    // Offline fallback — return from pre-built bank
    return this.offlineQuestions(params.topic, params.count);
  }

  /**
   * Generate essay questions — uses Gemini if key available, offline bank otherwise
   */
  async generateEssayQuestions(subject: string): Promise<EssayQuestion[]> {
    // Try Gemini first
    if (GEMINI_API_KEY) {
      const subjectKey = subject.toLowerCase();
      const topics = SUBJECT_TOPICS[subjectKey] || SUBJECT_TOPICS.english;
      const syllabus = SUBJECT_SYLLABUS[subjectKey] || SUBJECT_SYLLABUS.english;
      const chosen = [...topics].sort(() => Math.random() - 0.5).slice(0, 5);

      const prompt = `You are an expert Sri Lankan G.C.E. O/L ${subject} question setter.

SYLLABUS:
${syllabus}

Generate exactly 5 essay/structured answer questions, one for each of these topics:
${chosen.map((t, i) => `${i + 1}. ${t}`).join('\n')}

Respond ONLY with a valid JSON array. No markdown, no backticks, no extra text:
[
  {
    "id": "q1",
    "subject": "${subjectKey}",
    "question": "<detailed O/L level question>",
    "modelAnswer": "<comprehensive model answer 150-250 words, factually accurate>",
    "topic": "<topic name from the list above>",
    "points": <15|20|25>,
    "hint": "<list 3-4 key points the student should cover>"
  }
]

Rules:
- Questions must be genuine O/L exam style — analytical, specific, detailed
- For English: use Sri Lankan contexts (environment, education, village, culture)
- For History: reference specific kings, dates, events, places in Sri Lanka
- For Maths: include a numerical problem; model answer must show step-by-step working
- For Science: application-based scenario with Sri Lankan context
- Model answers must be complete, well-structured, and mark-worthy
- Hints: list 3-4 specific key points to include`;

      try {
        const raw = await callGemini(prompt);
        return extractJSON<EssayQuestion[]>(raw, true);
      } catch (e) {
        console.warn('Gemini essay question generation failed, using offline bank:', e);
      }
    }

    // Offline fallback
    return this.offlineEssayQuestions(subject);
  }

  /**
   * Analyze student weak areas from quiz history
   */
  async analyzeWeakAreas(quizHistory: any[]): Promise<string[]> {
    const topics: Record<string, { total: number; correct: number }> = {};
    quizHistory.forEach(quiz => {
      quiz.questions?.forEach((q: any) => {
        const topic = q.topic || 'General';
        if (!topics[topic]) topics[topic] = { total: 0, correct: 0 };
        topics[topic].total++;
        if (q.isCorrect) topics[topic].correct++;
      });
    });
    const weak = Object.entries(topics)
      .filter(([_, s]) => s.correct / s.total < 0.6)
      .map(([t]) => t).slice(0, 3);
    return weak.length > 0 ? weak : ['Ancient Period'];
  }

  /**
   * Get study recommendations based on student performance
   */
  async getStudyRecommendations(studentProfile: any): Promise<string[]> {
    const recs: string[] = [];
    if (studentProfile.averageScore < 60) {
      recs.push('Focus on fundamentals — review basic concepts first');
      recs.push('Try easier difficulty questions to build confidence');
    } else if (studentProfile.averageScore < 80) {
      recs.push("You're doing well! Challenge yourself with harder questions");
      recs.push('Focus on essay-type questions to deepen understanding');
    } else {
      recs.push('Excellent progress! Try teaching concepts to others');
      recs.push('Focus on advanced analytical questions');
    }
    if (studentProfile.streak < 3) recs.push('Build a daily study habit — consistency is key!');
    return recs;
  }

  isConfigured(): boolean {
    return !!GEMINI_API_KEY && GEMINI_API_KEY !== 'your_gemini_api_key_here';
  }

  getStatus() {
    return {
      configured: this.isConfigured(),
      provider: 'Google Gemini',
      model: GEMINI_MODEL,
      mode: this.isConfigured() ? '🟢 Live AI (Gemini)' : '🟡 Offline Mode (built-in questions)',
    };
  }
}

export const aiService = new AIService();
