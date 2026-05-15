import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Send,
  Bot,
  User,
  Loader2,
  Trash2,
  Brain,
  Sparkles,
  BookOpen,
  MessageCircle,
  ArrowLeft,
  Calculator,
  FlaskConical,
  Languages,
  History
} from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../hooks/useAuth';

export type Subject = 'history' | 'english' | 'maths' | 'science';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  language: 'en' | 'si';
}

// ══════════════════════════════════════════════════════════════════════════════
// OFFLINE FALLBACK — Rule-based AI Tutor (no API needed)
// Handles common O/L questions when all APIs are unavailable
// ══════════════════════════════════════════════════════════════════════════════

const OFFLINE_KNOWLEDGE: Record<string, Array<{ keywords: string[]; answer: string }>> = {
  history: [
    {
      keywords: ['vijaya', 'vijay', 'විජය', 'vijayaraja'],
      answer: `King Vijaya arrived in Sri Lanka in 543 BC, according to the Mahavamsa. He was the first king of Sri Lanka and came from North India (Bengal). He landed at Thambapanni (modern Chilaw) with 700 followers. He married Kuveni, a local Yaksha princess, and later married a princess from Madurai.

Key facts for O/L exam:
• Year: 543 BC
• Origin: North India (Sinhapura, Bengal)
• Landing place: Thambapanni
• Source: Mahavamsa chronicle
• He founded the Sinhala dynasty`,
    },
    {
      keywords: ['mahavamsa', 'මහාවංශය', 'mahawansa'],
      answer: `The Mahavamsa is the Great Chronicle of Sri Lanka, written in Pali by Ven. Mahanama Thero in the 5th century AD. It is one of the most important historical sources for Sri Lankan history.

Key facts:
• Written in: Pali language
• Author: Ven. Mahanama Thero
• Period covered: From arrival of King Vijaya (543 BC) to King Mahasena (4th century AD)
• Continued as: Culavamsa
• Importance: Primary historical source for ancient Sri Lankan history
• UNESCO: Recognized as a world heritage document`,
    },
    {
      keywords: ['dutugemunu', 'dutugamunu', 'dutugamune', 'දුටුගැමුණු', 'dutu'],
      answer: `King Dutugemunu (161–137 BC) was the greatest warrior king of ancient Sri Lanka. He united Sri Lanka by defeating the South Indian king Elara.

Key facts for O/L:
• Father: King Kavantissa
• Mother: Queen Viharamahadevi
• Defeated: King Elara (Tamil king who ruled Anuradhapura)
• Battle location: Vijithapura
• Built: Ruwanwelisaya (Mahathupa) stupa
• Built: Mirisawetiya stupa
• Capital: Anuradhapura
• Significance: First king to unify Sri Lanka under one rule`,
    },
    {
      keywords: ['anuradhapura', 'අනුරාධපුරය', 'anuradhapure'],
      answer: `Anuradhapura Kingdom was the first and longest-ruling ancient kingdom of Sri Lanka (377 BC – 1017 AD).

Key facts:
• Founded by: King Pandukabhaya in 377 BC
• Capital: Anuradhapura city
• Famous kings: Devanampiyatissa, Dutugemunu, Parakramabahu I
• Buddhism introduced: During reign of King Devanampiyatissa (247 BC) by Mahinda Thero
• Famous monuments: Ruwanwelisaya, Jetavanaramaya, Sri Maha Bodhi
• Ended: When Chola king Rajendra invaded in 1017 AD`,
    },
    {
      keywords: ['polonnaruwa', 'පොළොන්නරුව', 'polonnaruwe'],
      answer: `Polonnaruwa Kingdom (1017–1215 AD) was the second major kingdom of Sri Lanka after Anuradhapura.

Key facts:
• Capital moved from Anuradhapura after Chola invasion
• Greatest king: Parakramabahu I (1153–1186 AD)
• Parakramabahu built: Parakrama Samudra (massive irrigation lake)
• Famous quote: "Not a drop of rain should flow to the sea without being used by man"
• Other great king: Nissankamalla
• Ended: Due to invasions from South India
• Famous sites: Gal Vihara, Vatadage, Rankoth Vehera`,
    },
    {
      keywords: ['portuguese', 'port', 'පෘතුගීසි', 'portugeeisi'],
      answer: `The Portuguese arrived in Sri Lanka in 1505 AD under the command of Lourenço de Almeida.

Key facts for O/L:
• Arrived: 1505 AD
• First contact: Galle
• They controlled: Coastal areas (Maritime provinces)
• Religion: Spread Roman Catholicism
• Impact: Converted many to Christianity, destroyed Buddhist temples
• Controlled: Colombo, Jaffna, coastal trade
• Expelled by: Dutch in 1658 AD
• Period of control: 1505–1658 (153 years)`,
    },
    {
      keywords: ['dutch', 'ලන්දේසි', 'landeesi'],
      answer: `The Dutch arrived in Sri Lanka in 1602 and took control from the Portuguese in 1658 AD.

Key facts:
• Arrived: 1602 (first contact)
• Gained control: 1658 (expelled Portuguese)
• Alliance with: Kandyan king Rajasinha II
• Controlled: Coastal regions (maritime provinces)
• Religion: Dutch Reformed Church (Protestantism)
• Famous for: Dutch canals (still exist in Colombo)
• Legal system: Roman-Dutch law (still influences Sri Lankan law)
• Expelled by: British in 1796 AD`,
    },
    {
      keywords: ['british', 'england', 'english rule', 'colonial', 'බ්‍රිතාන්‍ය', 'britanya'],
      answer: `The British took control of Sri Lanka's coastal areas in 1796 and captured the entire island including Kandy in 1815.

Key facts:
• Coastal areas: 1796 (from Dutch)
• Entire island: 1815 (Kandyan Convention)
• Kandyan Convention: Signed 2nd March 1815
• Administrative capital: Colombo
• Independence granted: 4th February 1948
• First Prime Minister: D.S. Senanayake
• Impact: Railways, roads, plantations (tea, rubber), English education system`,
    },
    {
      keywords: ['independence', '1948', 'freedom', 'නිදහස', 'nidahas'],
      answer: `Sri Lanka gained independence from British rule on 4th February 1948.

Key facts for O/L:
• Date: 4th February 1948
• First Prime Minister: D.S. Senanayake (Father of the Nation)
• First Governor-General: Lord Soulbury
• Independence Act: Ceylon Independence Act 1947
• Capital: Colombo
• Name at independence: Ceylon (changed to Sri Lanka in 1972)
• 4th February is celebrated as Independence Day annually`,
    },
    {
      keywords: ['uva', 'rebellion', 'uva wellassa', 'උව', 'කැරැල්ල', 'uwa'],
      answer: `The Uva Wellassa Rebellion (1817–1818) was a major uprising against British rule in the Uva and Wellassa provinces.

Key facts:
• Years: 1817–1818
• Leaders: Keppetipola Disava, Madugalle Disava, Pilimatalawa
• Cause: British broke promises made in the Kandyan Convention (1815)
• Region: Uva and Wellassa provinces
• Result: British suppressed the rebellion brutally
• Keppetipola: Captured and executed; his skull was taken to Britain (returned in 1997)
• Significance: First major armed resistance against British in Sri Lanka`,
    },
    {
      keywords: ['kandyan', 'kandy', 'kingdom', 'කඳුරට', 'kandurat', 'mahanuwara'],
      answer: `The Kandyan Kingdom (1469–1815) was the last independent kingdom of Sri Lanka.

Key facts:
• Founded: 1469 AD
• Capital: Kandy (Senkadagalapura)
• Resisted: Portuguese and Dutch successfully for centuries
• Famous kings: Rajasinha II, Sri Vikrama Rajasinha (last king)
• Fell to: British in 1815 (Kandyan Convention)
• Sacred: Temple of the Tooth Relic (Dalada Maligawa)
• Significance: Preserved Sinhala culture and Buddhism during colonial period`,
    },
  ],
  maths: [
    {
      keywords: ['quadratic', 'x²', 'x^2'],
      answer: `Quadratic Equations — Step by Step

A quadratic equation has the form: ax² + bx + c = 0

Method 1 — Factorization:
Example: x² + 5x + 6 = 0
Step 1: Find two numbers that multiply to 6 and add to 5 → (2 and 3)
Step 2: Factor: (x + 2)(x + 3) = 0
Step 3: Solve: x = -2 or x = -3

Method 2 — Quadratic Formula:
x = (-b ± √(b² - 4ac)) / 2a

Example: 2x² + 5x + 3 = 0
a=2, b=5, c=3
x = (-5 ± √(25-24)) / 4
x = (-5 ± 1) / 4
x = -1 or x = -3/2

Remember for O/L: Always check your answers by substituting back!`,
    },
    {
      keywords: ['pythagoras', 'pythagorean'],
      answer: `Pythagoras Theorem

In a right-angled triangle:
a² + b² = c²
where c is the hypotenuse (longest side, opposite the right angle)

Example 1 — Find hypotenuse:
If a = 3, b = 4, find c
c² = 3² + 4² = 9 + 16 = 25
c = √25 = 5

Example 2 — Find a side:
If c = 13, b = 5, find a
a² = 13² - 5² = 169 - 25 = 144
a = √144 = 12

Common Pythagorean triples to remember:
• 3, 4, 5
• 5, 12, 13
• 8, 15, 17

O/L tip: Always identify which side is the hypotenuse first!`,
    },
    {
      keywords: ['trigonometry', 'trig', 'sohcahtoa', 'sin', 'cos', 'tan'],
      answer: `Trigonometry — SOHCAHTOA

For a right-angled triangle:
• SOH: sin θ = Opposite / Hypotenuse
• CAH: cos θ = Adjacent / Hypotenuse  
• TOA: tan θ = Opposite / Adjacent

Common angles to memorize:
Angle | sin  | cos  | tan
  0°  |  0   |  1   |  0
 30°  | 1/2  | √3/2 | 1/√3
 45°  | 1/√2 | 1/√2 |  1
 60°  | √3/2 | 1/2  |  √3
 90°  |  1   |  0   | undefined

Example:
In triangle ABC, angle A = 30°, hypotenuse = 10cm. Find opposite side.
sin 30° = opposite / 10
1/2 = opposite / 10
opposite = 5cm`,
    },
    {
      keywords: ['simultaneous', 'linear equation', 'two equation'],
      answer: `Simultaneous Equations — Two Methods

Method 1 — Elimination:
2x + 3y = 12  ... (1)
4x - y = 10   ... (2)

Multiply (2) by 3: 12x - 3y = 30  ... (3)
Add (1) + (3): 14x = 42
x = 3
Substitute in (1): 6 + 3y = 12 → y = 2

Method 2 — Substitution:
From (2): y = 4x - 10
Substitute in (1): 2x + 3(4x-10) = 12
2x + 12x - 30 = 12
14x = 42, x = 3, y = 2

Answer: x = 3, y = 2
✓ Check: 2(3)+3(2)=12 ✓ and 4(3)-2=10 ✓`,
    },
    {
      keywords: ['area', 'circle', 'volume', 'cylinder', 'sphere', 'mensuration'],
      answer: `Mensuration Formulas — O/L Essential

2D SHAPES:
• Circle: Area = πr², Circumference = 2πr
• Triangle: Area = ½ × base × height
• Rectangle: Area = l × w, Perimeter = 2(l+w)
• Trapezium: Area = ½(a+b)h

3D SHAPES:
• Cylinder: Volume = πr²h, Surface area = 2πr(r+h)
• Sphere: Volume = 4/3 πr³, Surface area = 4πr²
• Cone: Volume = 1/3 πr²h, Slant surface = πrl
• Cuboid: Volume = l×w×h, Surface area = 2(lw+lh+wh)

Use π = 3.14 or 22/7 for calculations

O/L tip: Always write the formula first, then substitute values!`,
    },
    {
      keywords: ['mean', 'median', 'mode', 'statistics', 'average'],
      answer: `Statistics — Mean, Median, Mode

MEAN (Average):
Mean = Sum of all values / Number of values
Example: 5, 8, 12, 6, 9 → Mean = 40/5 = 8

MEDIAN (Middle value):
Arrange in order, find middle value
Example: 3, 5, 7, 9, 11 → Median = 7 (middle)
For even count: average of two middle values
Example: 4, 6, 8, 10 → Median = (6+8)/2 = 7

MODE (Most frequent):
Value that appears most often
Example: 3, 5, 5, 7, 8, 5, 9 → Mode = 5

For Frequency Tables:
Mean = Σ(fx) / Σf
where f = frequency, x = value`,
    },
    {
      keywords: ['factori', 'factor'],
      answer: `Factorization — Methods for O/L

Method 1 — Common Factor:
6x² + 9x = 3x(2x + 3)

Method 2 — Difference of Squares:
a² - b² = (a+b)(a-b)
Example: x² - 25 = (x+5)(x-5)

Method 3 — Trinomial (ax² + bx + c):
x² + 7x + 12
Find two numbers: multiply to 12, add to 7 → (3 and 4)
= (x + 3)(x + 4)

Method 4 — Grouping:
ac + ad + bc + bd
= a(c+d) + b(c+d)
= (a+b)(c+d)

O/L tip: Always look for common factors FIRST before using other methods!`,
    },
  ],
  science: [
    {
      keywords: ['photosynthesis', 'ප්‍රකාශ සංස්ලේෂණය', 'prakasha'],
      answer: `Photosynthesis

Photosynthesis is the process by which green plants make their own food using sunlight.

Word equation:
Carbon dioxide + Water → Glucose + Oxygen
(in presence of sunlight and chlorophyll)

Chemical equation:
6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂

Conditions needed:
1. Sunlight (energy source)
2. Chlorophyll (in chloroplasts — green pigment)
3. Carbon dioxide (from air through stomata)
4. Water (absorbed by roots)

Products:
• Glucose — used for energy, growth
• Oxygen — released into air (we breathe this!)

Where it happens: Chloroplasts (mainly in leaves)

O/L tip: Remember the equation and the 4 conditions needed!`,
    },
    {
      keywords: ['respiration', 'breathing'],
      answer: `Respiration vs Breathing

RESPIRATION (chemical process in cells):
Glucose + Oxygen → Carbon dioxide + Water + Energy
C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + Energy (ATP)

Happens in: Mitochondria of every living cell

ANAEROBIC RESPIRATION (without oxygen):
Glucose → Lactic acid + Energy (in animals/humans)
Glucose → Ethanol + CO₂ + Energy (in yeast/plants)

BREATHING (physical process):
• Inhalation: diaphragm contracts, chest expands, air enters lungs
• Exhalation: diaphragm relaxes, chest contracts, air leaves

Difference:
• Breathing = physical movement of air in/out of lungs
• Respiration = chemical release of energy from glucose in cells`,
    },
    {
      keywords: ['digestive', 'digestion', 'stomach'],
      answer: `Human Digestive System

ORGANS AND FUNCTIONS:
1. Mouth — mechanical digestion (teeth), saliva (amylase breaks starch)
2. Oesophagus — food pipe, carries food to stomach (peristalsis)
3. Stomach — gastric juice (pepsin breaks protein, HCl kills bacteria)
4. Small intestine — main digestion and absorption
   • Duodenum: bile (from liver) emulsifies fat; pancreatic juice
   • Ileum: nutrients absorbed into bloodstream via villi
5. Large intestine — water absorbed, faeces formed
6. Rectum — stores faeces
7. Anus — faeces expelled

DIGESTIVE ENZYMES:
• Amylase → starch to sugar (mouth, pancreas)
• Pepsin → protein to peptides (stomach)
• Lipase → fat to fatty acids (pancreas)

O/L tip: Know which enzyme acts on which food type!`,
    },
    {
      keywords: ['atom', 'element', 'compound', 'molecule', 'mixture'],
      answer: `Atoms, Elements, Compounds and Mixtures

ATOM: Smallest particle of an element that can exist
• Contains: protons (+), neutrons (neutral) in nucleus; electrons (-) orbiting

ELEMENT: Pure substance made of one type of atom only
• Examples: Iron (Fe), Oxygen (O), Carbon (C), Gold (Au)

COMPOUND: Two or more elements chemically joined
• Properties differ from original elements
• Fixed ratio
• Examples: Water (H₂O), Salt (NaCl), Carbon dioxide (CO₂)
• Separated by: Chemical reactions only

MIXTURE: Two or more substances physically mixed
• Properties of each substance kept
• Variable ratio
• Examples: Air, sea water, soil
• Separated by: Physical methods (filtration, distillation, evaporation)

O/L tip: Compounds cannot be separated by physical methods — only chemical!`,
    },
    {
      keywords: ['acid', 'base', 'alkali', 'ph', 'salt'],
      answer: `Acids, Bases and Salts

pH SCALE:
• pH 0–6: Acid (lower pH = stronger acid)
• pH 7: Neutral
• pH 8–14: Alkali/Base (higher pH = stronger alkali)

ACIDS:
• Taste sour, turn blue litmus RED
• Examples: HCl (hydrochloric), H₂SO₄ (sulphuric), HNO₃ (nitric)
• Natural acids: citric acid (lemons), acetic acid (vinegar)

BASES/ALKALIS:
• Turn red litmus BLUE
• Examples: NaOH (sodium hydroxide), NH₃ (ammonia)
• Natural: baking soda, soap

NEUTRALIZATION:
Acid + Base → Salt + Water
HCl + NaOH → NaCl + H₂O

SALT FORMATION:
• Acid + Metal → Salt + Hydrogen
• Acid + Metal Oxide → Salt + Water
• Acid + Carbonate → Salt + Water + CO₂`,
    },
    {
      keywords: ['newton', 'force', 'motion', 'law'],
      answer: `Newton's Laws of Motion

FIRST LAW (Law of Inertia):
An object remains at rest or in uniform motion unless acted upon by an external force.
Example: Passengers jerk forward when a bus suddenly stops.

SECOND LAW:
Force = Mass × Acceleration
F = ma
Example: F = 5kg × 2m/s² = 10N
Unit of force: Newton (N)

THIRD LAW:
For every action, there is an equal and opposite reaction.
Example: When you push a wall, the wall pushes back with equal force.

Important terms:
• Weight = mass × g (g = 10 m/s² on Earth)
• 1 Newton = force to accelerate 1kg by 1m/s²
• Friction: force opposing motion

O/L tip: F=ma is the most used formula — know it well!`,
    },
    {
      keywords: ['electricity', 'circuit', 'ohm', 'current', 'voltage', 'resistance'],
      answer: `Electricity and Circuits

OHM'S LAW:
V = I × R
• V = Voltage (Volts, V)
• I = Current (Amperes, A)
• R = Resistance (Ohms, Ω)

Example: V=12V, R=4Ω → I = V/R = 12/4 = 3A

SERIES CIRCUIT:
• Same current flows through all components
• Total resistance: R_total = R₁ + R₂ + R₃
• Voltage shared between components

PARALLEL CIRCUIT:
• Voltage same across all branches
• Total resistance: 1/R_total = 1/R₁ + 1/R₂
• Current splits between branches

POWER:
P = V × I = I²R = V²/R
Unit: Watts (W)

O/L tip: Series = same current; Parallel = same voltage`,
    },
  ],
  english: [
    {
      keywords: ['formal letter', 'formal'],
      answer: `Formal Letter Writing — O/L Format

STRUCTURE:
1. Your address (top right)
2. Date (below your address)
3. Recipient's name and address (left)
4. Salutation: Dear Sir/Madam, or Dear Mr./Ms. [Name],
5. Subject line (optional but recommended)
6. Body paragraphs:
   - Para 1: Purpose/reason for writing
   - Para 2: Main content/details
   - Para 3: Request/action needed
7. Closing: Yours faithfully (if you don't know name)
       OR  Yours sincerely (if you know their name)
8. Signature and your name (printed)

FORMAL LANGUAGE RULES:
✓ Use complete sentences
✓ No contractions (write "do not" not "don't")
✓ Professional vocabulary
✗ No slang or informal expressions

Example opening: "I am writing to enquire about..."
Example closing: "I look forward to your prompt response."`,
    },
    {
      keywords: ['passive', 'active voice', 'passive voice'],
      answer: `Active and Passive Voice

ACTIVE VOICE: Subject does the action
Structure: Subject + Verb + Object
Example: "The cat caught the mouse."

PASSIVE VOICE: Object becomes subject, action done to it
Structure: Subject + to be + Past Participle (+ by + agent)
Example: "The mouse was caught by the cat."

CONVERSION RULES:

Present Simple:
Active: She writes a letter.
Passive: A letter is written by her.

Past Simple:
Active: He broke the window.
Passive: The window was broken by him.

Future:
Active: They will build a house.
Passive: A house will be built by them.

Present Perfect:
Active: She has completed the work.
Passive: The work has been completed by her.

O/L tip: Focus on changing the verb form and the pronoun (he→him, she→her, they→them)`,
    },
    {
      keywords: ['tense', 'present', 'past', 'future', 'perfect'],
      answer: `Tenses — Quick Reference Guide

PRESENT:
• Simple: I walk / She walks (habits, facts)
• Continuous: I am walking (happening now)
• Perfect: I have walked (just completed)
• Perfect Continuous: I have been walking (started past, still continuing)

PAST:
• Simple: I walked (completed action)
• Continuous: I was walking (was in progress)
• Perfect: I had walked (before another past action)
• Perfect Continuous: I had been walking

FUTURE:
• Simple: I will walk
• Continuous: I will be walking
• Perfect: I will have walked

COMMON SIGNAL WORDS:
• Yesterday, ago, last → Past Simple
• Just, already, yet, ever → Present Perfect
• While, when → Past Continuous
• Tomorrow, next week, soon → Future`,
    },
    {
      keywords: ['essay', 'composition', 'writing'],
      answer: `Essay Writing — O/L Guide

STRUCTURE (5 paragraphs):
1. Introduction (3-4 sentences)
   • Hook: interesting opening sentence
   • Background: brief context
   • Thesis: your main point/argument

2. Body Paragraph 1 — First main point
   • Topic sentence → Evidence → Explanation

3. Body Paragraph 2 — Second main point
   • Topic sentence → Evidence → Explanation

4. Body Paragraph 3 — Third main point
   • Topic sentence → Evidence → Explanation

5. Conclusion (3-4 sentences)
   • Restate thesis (in different words)
   • Summarise main points
   • Closing thought

USEFUL LINKING WORDS:
• Adding: Furthermore, Moreover, In addition
• Contrasting: However, Nevertheless, On the other hand
• Concluding: Therefore, In conclusion, To summarise

O/L tip: Write 250-300 words. Quality over quantity!`,
    },
    {
      keywords: ['article', 'the', 'a', 'an'],
      answer: `Articles — A, An, The

INDEFINITE ARTICLES (A / AN):
Used for non-specific, general nouns

"A" — before consonant sounds:
• a book, a car, a university (u sounds like 'yu')
• a European country, a one-way street

"AN" — before vowel sounds:
• an apple, an orange, an hour (h is silent)
• an honest man, an MBA degree

DEFINITE ARTICLE (THE):
Used for specific, already mentioned, or unique things
• The sun, the moon (only one exists)
• Please close the door (specific door)
• The Mahavamsa (specific book)
• The Nile, The Indian Ocean (rivers, oceans)

NO ARTICLE needed:
• Proper nouns: Sri Lanka, Colombo
• Languages: English, Sinhala
• Sports: Football, Cricket
• General plural: Dogs are loyal animals.`,
    },
    {
      keywords: ['reported speech', 'indirect speech', 'direct speech'],
      answer: `Reported Speech (Indirect Speech)

DIRECT → REPORTED SPEECH changes:

1. Inverted commas removed
2. Verb tense goes back one step:
   • am/is/are → was/were
   • do/does → did
   • will → would
   • can → could
   • have/has → had

3. Pronouns change:
   • I → he/she
   • my → his/her
   • we → they

4. Time expressions change:
   • now → then
   • today → that day
   • tomorrow → the next day
   • yesterday → the previous day

EXAMPLES:
Direct: "I am tired," she said.
Reported: She said that she was tired.

Direct: "I will come tomorrow," he said.
Reported: He said that he would come the next day.

Direct: "Do you study English?" she asked me.
Reported: She asked me whether I studied English.`,
    },
  ],
};

/**
 * Offline rule-based response — matches question to best knowledge entry
 */
function getOfflineResponse(question: string, subject: string, language: 'en' | 'si'): string | null {
  const q = question.toLowerCase();
  const entries = OFFLINE_KNOWLEDGE[subject] || [];

  for (const entry of entries) {
    if (entry.keywords.some(kw => q.includes(kw))) {
      if (language === 'si') {
        return entry.answer + `\n\n💡 (සටහන: මෙය offline දත්ත ගබඩාවෙන් ලබා දෙනු ලැබේ. සම්පූර්ණ AI පිළිතුරු සඳහා Gemini API key එකක් add කරන්න.)`;
      }
      return entry.answer + `\n\n(Note: This response is from the offline knowledge base. Add a Gemini API key in .env for full AI-powered responses.)`;
    }
  }

  // Generic fallback
  const genericMsg = language === 'si'
    ? `සමාවන්න, "${question}" ගැන මට දැනට offline පිළිතුරක් නැහැ.

📚 **ඉතිහාසය** — මෙවා ගැන අහන්න:
• විජය රජු, මහාවංශය, දුටුගැමුණු, අනුරාධපුරය
• පොළොන්නරුව, කඳුරට රාජධානිය
• පෘතුගීසි, ලන්දේසි, බ්‍රිතාන්‍ය යටත් විජිතය
• නිදහස 1948, උඩරට ගිවිසුම, උවා කැරැල්ල

🔢 **ගණිතය** — මෙවා ගැන අහන්න:
• වර්ගීය සමීකරණ, ද්විපද සූත්‍රය
• පයිතගරස් නියමය, ත්‍රිකෝණමිතිය
• සමගාමී සමීකරණ, සංඛ්‍යා ලේඛන
• ව්‍යාප්තිය, රාශිය, සිලින්ඩරය

🔬 **විද්‍යාව** — මෙවා ගැන අහන්න:
• ප්‍රකාශ සංස්ලේෂණය, ශ්වසනය, ජීර්ණය
• පරමාණු, මූලද්‍රව්‍ය, සංයෝග
• අම්ල, භස්ම, ලවණ, pH අගය
• නිව්ටන් නියාම, විද්‍යුතය, ඕම් නියමය

✍️ **ඉංග්‍රීසි** — මෙවා ගැන අහන්න:
• formal letter, passive voice, tenses
• essay writing, articles, reported speech

👉 වෙනත් ප්‍රශ්නයක් try කරන්න!`
    : `Sorry, I don't have offline data for "${question}".

Without an API key, I can answer basic questions on:

📚 History: Vijaya, Mahavamsa, Dutugemunu, Anuradhapura, Polonnaruwa, Portuguese/Dutch/British rule, Independence 1948, Uva Rebellion, Kandyan Kingdom
🔢 Maths: Quadratic equations, Pythagoras, trigonometry, simultaneous equations, mensuration, statistics
🔬 Science: Photosynthesis, respiration, digestion, atoms/elements/compounds, acids/bases, Newton's laws, electricity
✍️ English: Formal letter, passive voice, tenses, essay writing, articles, reported speech

To unlock full AI responses, add your free Gemini API key:
https://aistudio.google.com/apikey
Then add to .env: VITE_GEMINI_API_KEY=your_key_here`;

  return genericMsg;
}

// ══════════════════════════════════════════════════════════════════════════════
// MAIN API CALL — Anthropic (primary) → Gemini with retry → Offline fallback
// ══════════════════════════════════════════════════════════════════════════════
async function callAnthropicChat(
  conversationHistory: { role: 'user' | 'assistant'; content: string }[],
  systemPrompt: string,
  subject?: string,
  language?: 'en' | 'si'
): Promise<string> {

  // ── 1. Try Anthropic Claude (primary, most reliable) ──────────────────────
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: systemPrompt,
        messages: conversationHistory,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const text = data.content?.[0]?.text || '';
      if (text) return text;
    }
  } catch {
    // fall through to Gemini
  }

  // ── 2. Try Gemini with retry on 429 ───────────────────────────────────────
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (apiKey && apiKey !== 'your_gemini_api_key_here' && apiKey.trim() !== '') {
    const url = `/gemini-api/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    const geminiHistory = conversationHistory.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }));
    const body = JSON.stringify({
      system_instruction: { parts: [{ text: systemPrompt }] },
      contents: geminiHistory,
      generationConfig: { maxOutputTokens: 1000, temperature: 0.7 },
    });

    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        if (attempt > 0) await new Promise(res => setTimeout(res, attempt === 1 ? 2000 : 5000));
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body,
        });
        if (response.ok) {
          const data = await response.json();
          const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
          if (text) return text;
        }
        if (response.status === 429 && attempt < 2) continue;
        if (response.status === 403) break; // bad key, skip to offline
        if (response.status !== 429) break;
      } catch {
        if (attempt === 2) break;
      }
    }
  }

  // ── 3. Offline fallback — rule-based knowledge base ───────────────────────
  const lastUserMsg = conversationHistory[conversationHistory.length - 1]?.content || '';
  const offlineResp = getOfflineResponse(lastUserMsg, subject || 'history', language || 'en');
  if (offlineResp) return offlineResp;

  return language === 'si'
    ? 'සමාවන්න, AI service එකට connect වෙන්න බැහැ. කරුණාකර API key check කරන්න නැතිනම් පසුව උත්සාහ කරන්න.'
    : 'Sorry, could not connect to AI service. Please check your API key or try again later.';
}

function buildSystemPrompt(
  subject: Subject,
  level: 'weak' | 'average' | 'strong',
  language: 'en' | 'si'
): string {
  const levelMap = { weak: 'beginner (use simple language, short sentences, lots of encouragement)', average: 'intermediate (standard detail, balanced)', strong: 'advanced (deep analysis, technical depth)' };
  const levelDesc = levelMap[level];

  const subjectPrompts: Record<Subject, Record<'en' | 'si', string>> = {
    history: {
      en: `You are an expert Sri Lankan History tutor for O/L students. You specialize in the Sri Lanka O/L History syllabus covering ancient, medieval, colonial, and post-independence eras. Adapt your explanations to the student's level: ${levelDesc}. Be encouraging, use examples, and help with exam preparation. Always relate answers to the Sri Lankan curriculum.`,
      si: `ඔබ O/L සිසුන් සඳහා විශේෂඥ ශ්‍රී ලංකා ඉතිහාස ගුරුවරයෙකි. ශ්‍රී ලංකා O/L ඉතිහාස විෂය නිර්දේශය ආවරණය කරමින් සිසුන්ගේ ඉගෙනුම් මට්ටමට: ${levelDesc} ගැලපෙන ලෙස පිළිතුරු දෙන්න. ශ්‍රී ලංකා විෂය නිර්දේශයට සෑම විටම සම්බන්ධ වන්න. සිංහල හෝ ඉංග්‍රීසි භාවිතයෙන් පිළිතුරු දෙන්න.`,
    },
    english: {
      en: `You are an expert English Language and Literature tutor for Sri Lankan O/L students. You help with grammar, essay writing, comprehension passages, letter writing, poetry analysis, and all parts of the Sri Lanka O/L English exam. Adapt to the student's level: ${levelDesc}. Give clear examples, correct mistakes kindly, and boost confidence.`,
      si: `ඔබ ශ්‍රී ලංකා O/L සිසුන් සඳහා ඉංග්‍රීසි භාෂා ගුරුවරයෙකි. ව්‍යාකරණ, රචනා ලිවීම, English exam preparation ආදිය ගැන උදව් කරන්න. සිසුන්ගේ ඉගෙනුම් මට්ටමට: ${levelDesc} ගැලපෙන ලෙස පිළිතුරු දෙන්න. සිංහල හෝ ඉංග්‍රීසි භාවිතයෙන් පිළිතුරු දෙන්න.`,
    },
    maths: {
      en: `You are an expert Mathematics tutor for Sri Lankan O/L students. You cover the full O/L Maths syllabus including algebra, geometry, trigonometry, statistics, number theory, and more. Adapt to the student's level: ${levelDesc}. Show step-by-step working, explain concepts clearly, and help with past paper problems. Use simple language for beginners.`,
      si: `ඔබ ශ්‍රී ලංකා O/L සිසුන් සඳහා ගණිත ගුරුවරයෙකි. ජ්‍යාමිතිය, ත්‍රිකෝණමිතිය, සංඛ්‍යා, සංඛ්‍යාන ආදිය O/L ගණිත විෂය නිර්දේශය ආවරණය කරන්න. සිසුන්ගේ ඉගෙනුම් මට්ටමට: ${levelDesc} ගැලපෙන ලෙස step-by-step වැඩ ක්‍රම පෙන්වන්න. සිංහල හෝ ඉංග්‍රීසි භාවිතයෙන් පිළිතුරු දෙන්න.`,
    },
    science: {
      en: `You are an expert Science tutor for Sri Lankan O/L students. You cover all three branches: Biology (human body, plants, ecology), Chemistry (elements, compounds, reactions), and Physics (forces, electricity, waves, optics). Adapt to the student's level: ${levelDesc}. Use diagrams described in text, real-life examples, and help with practical and theory sections of the O/L exam.`,
      si: `ඔබ ශ්‍රී ලංකා O/L සිසුන් සඳහා විද්‍යා ගුරුවරයෙකි. ජීව විද්‍යාව, රසායන විද්‍යාව සහ භෞතික විද්‍යාව ආවරණය කරන්න. සිසුන්ගේ ඉගෙනුම් මට්ටමට: ${levelDesc} ගැලපෙන ලෙස සැබෑ ජීවිත උදාහරණ සමඟ පිළිතුරු දෙන්න. සිංහල හෝ ඉංග්‍රීසි භාවිතයෙන් පිළිතුරු දෙන්න.`,
    },
  };

  return subjectPrompts[subject][language];
}

const SUBJECT_CONFIG: Record<Subject, {
  icon: React.ReactNode;
  color: string;
  gradient: string;
  cardBg: string;
  cardBorder: string;
  iconColor: string;
  label: { en: string; si: string };
  examples: { en: string[]; si: string[] };
  placeholder: { en: string; si: string };
}> = {
  history: {
    icon: <History className="w-5 h-5" />,
    color: 'from-purple-600 to-blue-600',
    gradient: 'bg-gradient-to-r from-purple-600 to-blue-600',
    cardBg: 'bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-700 dark:to-gray-800',
    cardBorder: 'border-purple-200 dark:border-gray-600',
    iconColor: 'text-purple-600 dark:text-purple-400',
    label: { en: 'History', si: 'ඉතිහාසය' },
    examples: {
      en: ['When did King Vijaya arrive?', 'Tell me about Dutugemunu', 'What is the Mahavamsa?', 'How did Sri Lanka gain independence?', 'Explain the Uva Rebellion'],
      si: ['විජය රජු පැමිණියේ කවදාද?', 'දුටුගැමුණු ගැන කියන්න', 'මහාවංශය කුමක්ද?', 'ශ්‍රී ලංකාව නිදහස ලැබුවේ කොහොමද?', 'උඩරට කැරැල්ල පැහැදිලි කරන්න'],
    },
    placeholder: { en: 'Ask a history question... e.g., "Who was King Vijaya?"', si: 'ඉතිහාස ප්‍රශ්නයක් අහන්න...' },
  },
  english: {
    icon: <Languages className="w-5 h-5" />,
    color: 'from-green-600 to-teal-600',
    gradient: 'bg-gradient-to-r from-green-600 to-teal-600',
    cardBg: 'bg-gradient-to-br from-green-50 to-teal-50 dark:from-gray-700 dark:to-gray-800',
    cardBorder: 'border-green-200 dark:border-gray-600',
    iconColor: 'text-green-600 dark:text-green-400',
    label: { en: 'English', si: 'ඉංග්‍රීසි' },
    examples: {
      en: ['What is the difference between "their" and "there"?', 'How do I write a formal letter?', 'Explain passive voice with examples', 'What are adverbs?', 'How to write a good essay introduction?'],
      si: ['Formal letter ලියන්නේ කොහොමද?', 'Passive voice කුමක්ද?', 'Adverbs කුමක්ද?', 'Essay introduction ලියන්නේ කොහොමද?', '"Their" සහ "there" වල වෙනස කුමක්ද?'],
    },
    placeholder: { en: 'Ask an English question... e.g., "How do I use present perfect?"', si: 'ඉංග්‍රීසි ප්‍රශ්නයක් අහන්න...' },
  },
  maths: {
    icon: <Calculator className="w-5 h-5" />,
    color: 'from-orange-500 to-red-500',
    gradient: 'bg-gradient-to-r from-orange-500 to-red-500',
    cardBg: 'bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-700 dark:to-gray-800',
    cardBorder: 'border-orange-200 dark:border-gray-600',
    iconColor: 'text-orange-500 dark:text-orange-400',
    label: { en: 'Maths', si: 'ගණිතය' },
    examples: {
      en: ['How do I solve quadratic equations?', 'Explain Pythagoras theorem', 'What is trigonometry?', 'How to find the area of a circle?', 'What are simultaneous equations?'],
      si: ['ද්විඝාත සමීකරණ සාදන්නේ කොහොමද?', 'පයිතගරස් ප්‍රමේයය කුමක්ද?', 'ත්‍රිකෝණමිතිය ගැන කියන්න', 'වෘත්තයේ වර්ගඵලය සොයන්නේ කොහොමද?', 'Simultaneous equations සාදන්නේ කොහොමද?'],
    },
    placeholder: { en: 'Ask a maths question... e.g., "How do I solve x² + 5x + 6 = 0?"', si: 'ගණිත ප්‍රශ්නයක් අහන්න...' },
  },
  science: {
    icon: <FlaskConical className="w-5 h-5" />,
    color: 'from-cyan-600 to-blue-600',
    gradient: 'bg-gradient-to-r from-cyan-600 to-blue-600',
    cardBg: 'bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-gray-700 dark:to-gray-800',
    cardBorder: 'border-cyan-200 dark:border-gray-600',
    iconColor: 'text-cyan-600 dark:text-cyan-400',
    label: { en: 'Science', si: 'විද්‍යාව' },
    examples: {
      en: ['What is photosynthesis?', 'Explain Newton\'s laws of motion', 'What is the difference between atoms and molecules?', 'How does the human digestive system work?', 'What is an electric circuit?'],
      si: ['ප්‍රකාශ සංශ්ලේෂණය ගැන කියන්න', 'නිවුටන්ගේ ගමන් නීති කුමක්ද?', 'ඇටම් සහ අණු වල වෙනස කුමක්ද?', 'ජීර්ණ පද්ධතිය ක්‍රියා කරන්නේ කොහොමද?', 'විද්‍යුත් පරිපථය ගැන කියන්න'],
    },
    placeholder: { en: 'Ask a science question... e.g., "What is photosynthesis?"', si: 'විද්‍යා ප්‍රශ්නයක් අහන්න...' },
  },
};

export function AITutor({ onBack }: { onBack: () => void }) {
  const { language } = useLanguage();
  const { user } = useAuth();

  const [subject, setSubject] = useState<Subject>('history');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [studentLevel, setStudentLevel] = useState<'weak' | 'average' | 'strong'>('average');
  // conversationHistory for Anthropic API (only user/assistant roles)
  const [apiHistory, setApiHistory] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const cfg = SUBJECT_CONFIG[subject];

  const levelLabels = {
    weak: language === 'en' ? 'Beginner' : 'ආරම්භක',
    average: language === 'en' ? 'Intermediate' : 'අතරමැදි',
    strong: language === 'en' ? 'Advanced' : 'උසස්',
  };

  const welcomeMessages: Record<Subject, Record<'en' | 'si', string>> = {
    history: {
      en: "Hello! I'm your AI History Tutor. Ask me anything about Sri Lankan history — from ancient times to independence! 📚",
      si: "ආයුබෝවන්! මම ඔබේ AI ඉතිහාස ගුරුවරයා. පුරාතන කාලයේ සිට නිදහස දක්වා ශ්‍රී ලංකා ඉතිහාසය ගැන ඕනෑම දෙයක් අහන්න! 📚",
    },
    english: {
      en: "Hello! I'm your AI English Tutor. Ask me about grammar, writing, comprehension, or any part of your O/L English exam! ✍️",
      si: "ආයුබෝවන්! මම ඔබේ AI ඉංග්‍රීසි ගුරුවරයා. ව්‍යාකරණ, ලිවීම, comprehension, හෝ O/L English exam ගැන ඕනෑම දෙයක් අහන්න! ✍️",
    },
    maths: {
      en: "Hello! I'm your AI Maths Tutor. Ask me any O/L maths question — algebra, geometry, trigonometry, statistics — I'll explain step by step! 🔢",
      si: "ආයුබෝවන්! මම ඔබේ AI ගණිත ගුරුවරයා. O/L ගණිත ප්‍රශ්න ඕනෑම — ජ්‍යාමිතිය, ත්‍රිකෝණමිතිය, සංඛ්‍යාන — step by step පෙන්වන්නම්! 🔢",
    },
    science: {
      en: "Hello! I'm your AI Science Tutor. Ask me about Biology, Chemistry, or Physics for your O/L exam! 🔬",
      si: "ආයුබෝවන්! මම ඔබේ AI විද්‍යා ගුරුවරයා. O/L විභාගය සඳහා ජීව විද්‍යාව, රසායන විද්‍යාව, හෝ භෞතික විද්‍යාව ගැන ඕනෑම දෙයක් අහන්න! 🔬",
    },
  };

  // Reset chat when subject or level changes
  useEffect(() => {
    const welcomeMsg: ChatMessage = {
      id: 'welcome-' + Date.now(),
      role: 'assistant',
      content: welcomeMessages[subject][language],
      timestamp: new Date(),
      language,
    };
    setMessages([welcomeMsg]);
    setApiHistory([]);
  }, [subject, studentLevel, language]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMsg = inputMessage.trim();
    setInputMessage('');
    setIsLoading(true);

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: userMsg,
      timestamp: new Date(),
      language,
    };
    setMessages(prev => [...prev, userMessage]);

    const newHistory: { role: 'user' | 'assistant'; content: string }[] = [
      ...apiHistory,
      { role: 'user', content: userMsg },
    ];

    try {
      const systemPrompt = buildSystemPrompt(subject, studentLevel, language);
      const aiText = await callAnthropicChat(newHistory, systemPrompt, subject, language);

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiText,
        timestamp: new Date(),
        language,
      };
      setMessages(prev => [...prev, aiMessage]);
      setApiHistory([...newHistory, { role: 'assistant', content: aiText }]);
    } catch (error) {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: language === 'en'
          ? 'Sorry, I encountered an error. Please try again.'
          : 'සමාවන්න, දෝෂයක් ඇති විය. කරුණාකර නැවත උත්සාහ කරන්න.',
        timestamp: new Date(),
        language,
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleClearChat = () => {
    const welcomeMsg: ChatMessage = {
      id: 'welcome-' + Date.now(),
      role: 'assistant',
      content: welcomeMessages[subject][language],
      timestamp: new Date(),
      language,
    };
    setMessages([welcomeMsg]);
    setApiHistory([]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className={`${cfg.gradient} text-white rounded-3xl p-8 mb-6 shadow-xl`}>
          <Button
            onClick={onBack}
            variant="outline"
            className="mb-4 bg-white/20 text-white border-white/30 hover:bg-white/30"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {language === 'en' ? 'Back to Home' : 'මුල් පිටුවට'}
          </Button>

          <div className="flex items-center gap-3 mb-2">
            <Brain className="w-10 h-10" />
            <h1 className="text-3xl font-bold">
              {language === 'en' ? 'AI Personal Tutor' : 'AI පුද්ගලික ගුරුවරයා'}
            </h1>
          </div>
          <p className="text-white/90 mb-6">
            {language === 'en'
              ? 'Ask me anything! I adapt to your learning level.'
              : 'ඕනෑම දෙයක් අහන්න! මම ඔබේ ඉගෙනුම් මට්ටමට අනුවර්තනය වෙනවා.'}
          </p>

          {/* Subject Selector */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">
              {language === 'en' ? 'Select Subject:' : 'විෂය තෝරන්න:'}
            </label>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(SUBJECT_CONFIG) as Subject[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setSubject(s)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${
                    subject === s
                      ? 'bg-white text-gray-800 shadow-lg scale-105'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  {SUBJECT_CONFIG[s].icon}
                  {SUBJECT_CONFIG[s].label[language]}
                </button>
              ))}
            </div>
          </div>

          {/* Learning Level Selector */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              {language === 'en' ? 'Your Learning Level:' : 'ඔබේ ඉගෙනුම් මට්ටම:'}
            </label>
            <div className="flex flex-wrap gap-2">
              {(['weak', 'average', 'strong'] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => setStudentLevel(level)}
                  className={`px-5 py-2 rounded-xl font-semibold transition-all ${
                    studentLevel === level
                      ? 'bg-white text-gray-800 shadow-lg scale-105'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  {levelLabels[level]}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat Area */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden">
              {/* Messages */}
              <div className="h-[540px] overflow-y-auto p-6 space-y-4">
                <AnimatePresence>
                  {messages.map((msg, index) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(index * 0.05, 0.3) }}
                      className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {msg.role === 'assistant' && (
                        <div className={`flex-shrink-0 w-9 h-9 ${cfg.gradient} rounded-full flex items-center justify-center`}>
                          <Bot className="w-5 h-5 text-white" />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                          msg.role === 'user'
                            ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                        }`}
                      >
                        <div className="whitespace-pre-wrap break-words">{msg.content}</div>
                        <div className="text-xs mt-2 opacity-60">
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                      {msg.role === 'user' && (
                        <div className="flex-shrink-0 w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isLoading && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                    <div className={`flex-shrink-0 w-9 h-9 ${cfg.gradient} rounded-full flex items-center justify-center`}>
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-2xl">
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>{language === 'en' ? 'AI is thinking...' : 'AI සිතමින්...'}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80 p-4">
                <div className="flex gap-3">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={cfg.placeholder[language]}
                    disabled={isLoading}
                    className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none disabled:opacity-50 text-sm"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    className={`${cfg.gradient} text-white px-5 hover:opacity-90`}
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                  <Button onClick={handleClearChat} variant="outline" disabled={isLoading}>
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-5">
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                {language === 'en' ? 'What I Can Do:' : 'මට කළ හැකි දේ:'}
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                {[
                  language === 'en' ? '📚 Answer any subject question' : '📚 ඕනෑම විෂය ප්‍රශ්නයකට පිළිතුරු',
                  language === 'en' ? '🎯 Adapt to your level' : '🎯 ඔබේ මට්ටමට අනුගත වීම',
                  language === 'en' ? '💡 Step-by-step explanations' : '💡 Step-by-step පැහැදිලි කිරීම්',
                  language === 'en' ? '🔄 Remember our conversation' : '🔄 සංවාදය මතක තබාගැනීම',
                  language === 'en' ? '📖 Help with exam prep' : '📖 විභාග සූදානමට උදව්',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`${cfg.cardBg} rounded-3xl p-5 border-2 ${cfg.cardBorder}`}>
              <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2 text-sm">
                <BookOpen className={`w-4 h-4 ${cfg.iconColor}`} />
                {language === 'en' ? `Example ${cfg.label.en} Questions:` : `නිදර්ශන ${cfg.label.si} ප්‍රශ්න:`}
              </h4>
              <ul className="space-y-2 text-xs text-gray-700 dark:text-gray-300">
                {cfg.examples[language].map((ex, i) => (
                  <li
                    key={i}
                    className="cursor-pointer hover:text-purple-700 transition-colors"
                    onClick={() => setInputMessage(ex)}
                  >
                    • {ex}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
