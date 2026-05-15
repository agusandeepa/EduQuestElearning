import { useState } from "react";
import { Button } from "./ui/button";
import { motion } from "motion/react";
import {
  Sparkles,
  Loader2,
  CheckCircle2,
  Zap,
  Target,
  Brain,
  History,
  Calculator,
  FlaskConical,
  Languages,
  X,
} from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { useAuth } from "../../hooks/useAuth";

export type Subject = "history" | "english" | "maths" | "science";

export interface GeneratedQuestion {
  id: string;
  question: string;
  type: "mcq" | "true-false" | "fill-blank" | "essay";
  options?: string[];
  correctAnswer: number | string;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
  topic: string;
  points: number;
}

// ── COMPREHENSIVE OFFLINE QUESTION BANK ──────────────────────────────────────
// Used as fallback when Gemini API is unavailable / key is missing.
// Each topic has multiple questions; we shuffle + slice to the requested count.


// ── SINHALA QUESTION BANKS (used when language === "si") ─────────────────────
const SINHALA_HISTORY_QUESTIONS: GeneratedQuestion[] = [
  { id: "sh1", question: "ශ්‍රී ලංකා ඉතිහාස ග්‍රන්ථ අනුව, විජය රජු ශ්‍රී ලංකාවට පැමිණියේ ආසන්නව:", type: "mcq", options: ["ක්‍රි.පූ. 543", "ක්‍රි.පූ. 483", "ක්‍රි.පූ. 600", "ක්‍රි.පූ. 300"], correctAnswer: 0, explanation: "මහාවංශය අනුව, විජය රජු ක්‍රි.පූ. 543 ලංකාවට පැමිණියේ, ඒ ශාක්‍යමුනි බුදුරජාණන් වහන්සේ පිරිනිවීමේ වර්ෂයට සමකාලීනව.", difficulty: "easy", topic: "Ancient Period – Arrival of King Vijaya & Early Settlements", points: 1 },
  { id: "sh2", question: "විජය රජු ශ්‍රී ලංකාවට පැමිණියේ:", type: "mcq", options: ["ඉන්දියාවෙන් (සිංහපුර, බෙංගාල ප්‍රදේශ)", "චීනයෙන්", "අරාබියෙන්", "මියන්මාරයෙන්"], correctAnswer: 0, explanation: "මහාවංශය අනුව, විජය උතුරු ඉන්දියාවේ සිංහපුර (බෙංගාල/ගුජරාට් ප්‍රදේශ) නගරයෙන් ශ්‍රී ලංකාවට ආවේය.", difficulty: "easy", topic: "Ancient Period – Arrival of King Vijaya & Early Settlements", points: 1 },
  { id: "sh3", question: "මහාවංශය ලියූයේ මහානාම හිමි විසිනි.", type: "true-false", correctAnswer: "true", explanation: "ශ්‍රී ලංකාවේ ශ්‍රේෂ්ඨ ඉතිහාස ග්‍රන්ථය වන මහාවංශය, ක්‍රි.ව. 5-6 සියවස් අතරතුර බෞද්ධ භික්ෂු මහානාම හිමිවිසින් රචිත විය.", difficulty: "easy", topic: "Ancient Period – Arrival of King Vijaya & Early Settlements", points: 1 },
  { id: "sh4", question: "ළදරු ලේඛන ග්‍රන්ථ 'ලංකා' නාමය ව්‍යුත්පත්ති ___.", type: "fill-blank", correctAnswer: "සිංහලේ හෝ සිංහල ජනතාව", explanation: "දිවයිනට සිංහලේ/ලංකා නම යෙදුනේ සිංහල (සිංහ ජනතා) පදිංචිකරුවන් හා සම්බන්ධව.", difficulty: "medium", topic: "Ancient Period – Arrival of King Vijaya & Early Settlements", points: 2 },
  { id: "sh5", question: "විජය රජු යටතේ ශ්‍රී ලංකාවේ පළමු රාජධානිය:", type: "mcq", options: ["තම්බපන්නිය", "අනුරාධපුරය", "පොළොන්නරු", "සීගිරිය"], correctAnswer: 0, explanation: "තම්බපන්නිය ශ්‍රී ලංකාවේ විජය රජුගේ පළමු නිවාස ස්ථානය විය.", difficulty: "easy", topic: "Ancient Period – Arrival of King Vijaya & Early Settlements", points: 1 },
  { id: "sh6", question: "අනුරාධපුරය ශ්‍රී ලංකාවේ රාජධානිය ලෙස 1,000 වසරකට වැඩි කාලයක් සේවය කළේය.", type: "true-false", correctAnswer: "true", explanation: "අනුරාධපුරය ආසන්නව 1,400 වසර් (ක්‍රි.පූ. 4 සිය – ක්‍රි.ව. 10 සිය) ෂ්ටා ශ්‍රේෂ්ඨ ශ්‍රීලංකාවේ ළදරු රාජධානිය ලෙස සේවය කළේය.", difficulty: "easy", topic: "Ancient Period – Anuradhapura Kingdom", points: 1 },
  { id: "sh7", question: "ශ්‍රී ලංකාවට බුදු දහම හඳුන්වා දුන්නේ:", type: "mcq", options: ["මහින්ද හිමි", "සංඝමිත්තා හිමි", "තිස්ස රජ", "විජය රජ"], correctAnswer: 0, explanation: "අශෝක අධිරාජ්‍යයාගේ පුත් වූ අරහතුන් වහන්සේ මහින්ද හිමි, දේවානම්පියතිස්ස රජු ගේ රාජ්‍ය කාලයේ ශ්‍රී ලංකාවට බෞද්ධ ශාසනය ගෙන ආවෝය.", difficulty: "easy", topic: "Ancient Period – Spread of Buddhism in Sri Lanka", points: 1 },
  { id: "sh8", question: "දුටුගැමුණු රජු ඇළ රජ (ඇල්ලාළ) ජය ගත් සටන:", type: "mcq", options: ["අනුරාධපුරය", "විජිතපුරය", "පොළොන්නරු", "තම්බපන්නිය"], correctAnswer: 0, explanation: "නිශ්චිත සටන සිදු වූයේ අනුරාධපුරය හිදී, දුටුගැමුණු රජු ඒකල සටනේදී ඇළ රජ (ඇල්ලාළ) ඝාතනය කළේය.", difficulty: "medium", topic: "Ancient Period – King Dutugemunu & the Elara War", points: 2 },
  { id: "sh9", question: "රුවන්වැලිසාය ස්තූපය ඉදිකළ රජු:", type: "mcq", options: ["දුටුගැමුණු", "පළමු පරාක්‍රමබාහු", "දේවානම්පියතිස්ස", "නිශ්ශංකමල්ල"], correctAnswer: 0, explanation: "දුටුගැමුණු රජු අනුරාධපුරය හි රුවන්වැලිසාය (මහාතූප) ඉදිකළේය.", difficulty: "medium", topic: "Ancient Period – Anuradhapura Kingdom", points: 2 },
  { id: "sh10", question: "ශ්‍රී ලංකාවේ ළමු ජලාශය ඉදිකළේ පණ්ඩුකාභය රජු ය.", type: "true-false", correctAnswer: "false", explanation: "ජලාශ ඉදිකිරීම් ඊට පෙරාලෙව ආරම්භ වූ; ක්‍රි.ව. 2 සිය වළල්ල රජු ප්‍රධාන ජලාශ ඉදිකිරීම සමඟ ගනිමු. නමුදු, පණ්ඩුකාභය රජු අනුරාධපුරය ස්ථාපිත කළේය.", difficulty: "hard", topic: "Ancient Period – Irrigation Civilisation (Tanks & Dagabas)", points: 3 },
  { id: "sh11", question: "පෘතුගීසීන් ශ්‍රී ලංකාවට පැමිණියේ:", type: "mcq", options: ["1505", "1658", "1815", "1948"], correctAnswer: 0, explanation: "1505 දී 8 වන වීරපරාක්‍රමබාහු රජු ගේ රාජ්‍ය සමයේ පෘතුගීසීන් ශ්‍රී ලංකාවට ළමු වතාවට ගෙදිනිය.", difficulty: "easy", topic: "Colonial Period – Portuguese Rule in Sri Lanka", points: 1 },
  { id: "sh12", question: "ශ්‍රී ලංකාවේ යටත් විජිත බලය ලෙස ලන්දේසීන් පෘතුගීසීන් ප්‍රතිස්ථාපනය කළේ:", type: "mcq", options: ["1658", "1505", "1796", "1815"], correctAnswer: 0, explanation: "ලන්දේසි නැගෙනහිර ඉන්දීය සමාගම (VOC) 1638 සිට 1658 දක්වා පෘතුගීසීන්ගෙන් වෙරළ ප්‍රදේශ අල්ලා ගත්තේය.", difficulty: "medium", topic: "Colonial Period – Dutch Rule in Sri Lanka", points: 2 },
  { id: "sh13", question: "ශ්‍රී ලංකාව 1948 පෙබරවාරි 4 දා බ්‍රිතාන්‍යයෙන් නිදහස ලැබිය.", type: "true-false", correctAnswer: "true", explanation: "ලංකාව (දැන් ශ්‍රී ලංකාව) 1948 පෙබරවාරි 4 දා බ්‍රිතාන්‍ය 植民 පාලනයෙන් නිදහස ලැබිය.", difficulty: "easy", topic: "Modern Period – Independence Movement & 1948 Independence", points: 1 },
  { id: "sh14", question: "1815 උඩරට ගිවිසුමෙන් උඩරට රාජධානිය ___ ට භාරදෙන ලදී.", type: "mcq", options: ["බ්‍රිතාන්‍යයට", "පෘතුගාලයට", "නෙදර්ලන්තයට", "ප්‍රංශයට"], correctAnswer: 0, explanation: "1815 මාර්තු 2 දා අත්සන් කළ උඩරට ගිවිසුමෙන් (Udarata Givisum) උඩරට රාජධානිය බ්‍රිතාන්‍යයට භාරදෙන ලදී.", difficulty: "medium", topic: "Colonial Period – British Rule in Sri Lanka", points: 2 },
  { id: "sh15", question: "පොළොන්නරු රාජධානිය ශ්‍රී ලංකාවේ රාජධානිය ලෙස අනුරාධපුරයෙන් පසු පෙළ ගැසිනි.", type: "true-false", correctAnswer: "true", explanation: "ක්‍රි.ව. 10 සියවස දී අනුරාධපුරය බිඳ වැටීමෙන් පසු, පොළොන්නරු නව රාජධානිය බවට පත් විය.", difficulty: "easy", topic: "Medieval Period – Polonnaruwa Kingdom", points: 1 },
  { id: "sh16", question: "පළමු පරාක්‍රමබාහු රජු ___ හි ප්‍රසිද්ධ පරාක්‍රම සමුද්‍ර ජලාශය ඉදිකළේය.", type: "mcq", options: ["පොළොන්නරු", "අනුරාධපුරය", "කන්ද", "සීගිරිය"], correctAnswer: 0, explanation: "12 වන සියවසේ ශ්‍රී ලංකාවේ පළමු පරාක්‍රමබාහු රජු විසින් පොළොන්නරු හි ජල සම්භාරය ඉදිකළේය.", difficulty: "medium", topic: "Medieval Period – Polonnaruwa Kingdom", points: 2 },
  { id: "sh17", question: "ඌව-වෙල්ලස්ස කැරළ්ල (1817-1818) ___ ට එරෙහිව සිදු විය.", type: "fill-blank", correctAnswer: "බ්‍රිතාන්‍ය පාලනය", explanation: "ඌව-වෙල්ලස්ස කැරළ්ල ශ්‍රී ලංකාවේ බ්‍රිතාන්‍ය යටත් විජිත පාලනයට එරෙහි ප්‍රධාන නැගිටීමක් විය.", difficulty: "medium", topic: "Colonial Period – Uva Rebellion 1817–1818", points: 2 },
];

const SINHALA_ENGLISH_QUESTIONS: GeneratedQuestion[] = [
  { id: "se1", question: "Passive voice (කර්මකාරක) ලෙස ලියා ඇති වාක්‍යය කුමක්ද?", type: "mcq", options: ["She wrote the letter.", "The letter was written by her.", "She is writing the letter.", "She had written the letter."], correctAnswer: 1, explanation: "Passive voice හි subject ක්‍රියාව ලබා ගනී. 'The letter was written by her' යනු subject (letter) ක්‍රියාව ලබා ගන්නා ආකාරය පෙන්වයි.", difficulty: "easy", topic: "Grammar – Active & Passive Voice", points: 1 },
  { id: "se2", question: "Adverb (ක්‍රියා විශේෂණය) noun (නාමය) වෙනස් කරයි.", type: "true-false", correctAnswer: "false", explanation: "Adverb, verb, adjective, හෝ වෙනත් adverb වෙනස් කරයි — noun නොව. Noun වෙනස් කරන්නේ adjective.", difficulty: "easy", topic: "Grammar – Adjectives & Adverbs", points: 1 },
  { id: "se3", question: "'By the time she arrived, he ___ (already/leave).' නිවැරදි tense:", type: "mcq", options: ["already left", "had already left", "has already left", "already leaving"], correctAnswer: 1, explanation: "Past Perfect tense (had + past participle) අතීත ක්‍රියාවකට පෙර සම්පූර්ණ වූ ක්‍රියාවක් ප්‍රකාශ කිරීමට භාවිතා කෙරේ.", difficulty: "medium", topic: "Grammar – Tenses (Present, Past, Future & Perfect)", points: 2 },
  { id: "se4", question: "ප්‍රතිවිරෝධය (contrast) පෙන්වන conjunction (සන්ධිය) ___.", type: "fill-blank", correctAnswer: "although / but / however", explanation: "'Although', 'but', 'however' අදහස් අතර ප්‍රතිවිරෝධය පෙන්වයි.", difficulty: "easy", topic: "Grammar – Conjunctions & Prepositions", points: 1 },
  { id: "se5", question: "She said, 'I am tired' - නිවැරදි reported speech:", type: "mcq", options: ["She said she is tired.", "She said she was tired.", "She said she were tired.", "She said she be tired."], correctAnswer: 1, explanation: "Reported speech හි reporting verb past tense ලෙස ඇති විට 'am' → 'was' වෙනස් වේ.", difficulty: "medium", topic: "Grammar – Direct & Indirect (Reported) Speech", points: 2 },
  { id: "se6", question: "'If it rains, we will cancel the match.' - මෙය ___ conditional.", type: "mcq", options: ["Zero", "First", "Second", "Third"], correctAnswer: 1, explanation: "First Conditional = 'if + present simple, will + infinitive'. සත්‍ය/සාධ්‍ය අනාගත තත්ත්වයන් ගැන.", difficulty: "medium", topic: "Grammar – Conditionals (Zero, First, Second & Third)", points: 2 },
  { id: "se7", question: "'She plays tennis every day, ___?' - හිස් තැන:", type: "fill-blank", correctAnswer: "doesn't she", explanation: "ධනාත්මක simple present වාක්‍ය සඳහා question tag ඍණාත්මකව ලියයි: 'doesn't she?'", difficulty: "easy", topic: "Grammar – Question Tags & Short Answers", points: 1 },
  { id: "se8", question: "'Runs' යන verb singular subject සමඟ ගැළපේ.", type: "true-false", correctAnswer: "true", explanation: "Subject-Verb Agreement: singular subjects simple present හි '-s' සහිත verb ගනී.", difficulty: "easy", topic: "Grammar – Subject-Verb Agreement", points: 1 },
  { id: "se9", question: "'Hour' යන වචනයට ඉදිරියෙන් කුමන article?", type: "mcq", options: ["a", "an", "the", "article නැත"], correctAnswer: 1, explanation: "නිහඬ 'h' නිසා 'hour' ස්වර ශබ්දයකින් ආරම්භ වන බව හැඟෙන නිසා 'an' ලිපිය ගැනේ.", difficulty: "medium", topic: "Grammar – Articles (a, an, the)", points: 2 },
  { id: "se10", question: "'Ancient' (පෞරාණික) වෙත opposite:", type: "mcq", options: ["old", "modern", "historical", "classic"], correctAnswer: 1, explanation: "'Modern' (නූතන) යනු 'ancient' (ඉතා පෙරාතු) ට ප්‍රතිවිරුද්ධ.", difficulty: "easy", topic: "Vocabulary – Word Forms, Synonyms & Antonyms", points: 1 },
  { id: "se11", question: "Formal letter (නිල ලිපිය) හි formal ___ ඇතුළත් විය යුතුය.", type: "fill-blank", correctAnswer: "salutation / greeting", explanation: "'Dear Sir/Madam,' වැනි formal salutation (ආමන්ත්‍රණය) ඇතුළත් විය යුතුය.", difficulty: "easy", topic: "Writing – Formal Letter Writing", points: 1 },
  { id: "se12", question: "Metaphor (රූපකය) 'like' හෝ 'as' නොයොදා සෘජු සැසඳීමක් කරයි.", type: "true-false", correctAnswer: "true", explanation: "Metaphor 'Life is a journey' ලෙස ඍජුව ප්‍රකාශ කරයි. Simile 'like'/'as' භාවිතා කරයි.", difficulty: "easy", topic: "Literature – Poetry Analysis & Figures of Speech", points: 1 },
  { id: "se13", question: "'tolerate or endure' (ඉවසීම) අර්ථ දෙන phrasal verb:", type: "mcq", options: ["put off", "put out", "put up with", "put down"], correctAnswer: 2, explanation: "'Put up with' = අපහසු දෙයක් ඉවසීම. 'I can't put up with this noise.'", difficulty: "hard", topic: "Vocabulary – Phrasal Verbs & Idioms", points: 3 },
  { id: "se14", question: "Simple sentence හට independent clause ___ ක් ඇත.", type: "mcq", options: ["දෙකක්", "එකක්", "තුනක්", "කිහිපයක්"], correctAnswer: 1, explanation: "Simple sentence හි independent clause (ස්වාධීන ප්‍රකාශ) එකක් පමණ ඇත.", difficulty: "easy", topic: "Grammar – Sentences (Simple, Compound & Complex)", points: 1 },
  { id: "se15", question: "Comprehension passage හි main idea (ප්‍රධාන අදහස) සොයා ගන්නේ:", type: "mcq", options: ["ශීර්ෂය පමණ කියවීමෙන්", "සෑම ඡේදයක්ම ප්‍රවේශමෙන් කියවීමෙන්", "අවසාන ඡේදය කියවීමෙන්", "නිගමනය කියවීමෙන්"], correctAnswer: 1, explanation: "Main idea සෑම ඡේදයක්ම ප්‍රවේශමෙන් කියවීමෙන් සොයා ගත හැකිය.", difficulty: "easy", topic: "Reading – Comprehension Passages", points: 1 },
];

const SINHALA_MATHS_QUESTIONS: GeneratedQuestion[] = [
  { id: "sm1", question: "x සඳහා විසඳන්න: 2x + 4 = 10", type: "mcq", options: ["2", "3", "4", "5"], correctAnswer: 1, explanation: "2x + 4 = 10 → 2x = 6 → x = 3", difficulty: "easy", topic: "Algebra – Linear Equations & Inequalities", points: 1 },
  { id: "sm2", question: "පාදය 8 cm සහ උස 5 cm ත්‍රිකෝණයක වර්ගඵලය:", type: "mcq", options: ["40 cm²", "20 cm²", "13 cm²", "80 cm²"], correctAnswer: 1, explanation: "වර්ගඵලය = ½ × 8 × 5 = 20 cm²", difficulty: "easy", topic: "Mensuration – Area & Perimeter of 2D Shapes", points: 1 },
  { id: "sm3", question: "2³ × 2² ගේ අගය:", type: "mcq", options: ["2⁵", "2⁶", "4⁵", "2⁴"], correctAnswer: 0, explanation: "2³ × 2² = 2^(3+2) = 2⁵ = 32", difficulty: "easy", topic: "Algebra – Indices & Logarithms", points: 1 },
  { id: "sm4", question: "ත්‍රිකෝණයක කෝණ 3ේ එකතුව ___ .", type: "fill-blank", correctAnswer: "180°", explanation: "ඕනෑම ත්‍රිකෝණයක අන්තරීය කෝණ 180° ට සමාන.", difficulty: "easy", topic: "Geometry – Lines, Angles & Triangles", points: 1 },
  { id: "sm5", question: "x² - 9 සාධකීකරණය:", type: "mcq", options: ["(x-3)(x-3)", "(x+3)(x-3)", "(x+9)(x-1)", "(x-9)(x+1)"], correctAnswer: 1, explanation: "x² - 3² = (x+3)(x-3)", difficulty: "medium", topic: "Algebra – Polynomials & Factorisation", points: 2 },
  { id: "sm6", question: "Gradient 0 ඇති රේඛාව සිරස් රේඛාවකි.", type: "true-false", correctAnswer: "false", explanation: "Gradient 0 = තිරස් රේඛාව. සිරස් රේඛාවේ gradient අනිශ්චිත.", difficulty: "medium", topic: "Graphs – Linear & Quadratic Functions", points: 2 },
  { id: "sm7", question: "x + y = 5 සහ x - y = 1 නම් x = ?", type: "mcq", options: ["2", "3", "4", "5"], correctAnswer: 1, explanation: "2x = 6 → x = 3, y = 2", difficulty: "medium", topic: "Algebra – Simultaneous Equations", points: 2 },
  { id: "sm8", question: "සිදු විය නොහැකි සිදුවීමක සම්භාවිතාව:", type: "mcq", options: ["1", "0.5", "0", "-1"], correctAnswer: 2, explanation: "සම්භාවිතාව 0 = කිසිවිටෙකත් නොසිදු වන.", difficulty: "easy", topic: "Probability – Basic Concepts & Simple Events", points: 1 },
  { id: "sm9", question: "අරය r, උස h සිලින්ඩරයක ඝනඵලය:", type: "mcq", options: ["πr²h", "2πrh", "πrh²", "2πr²h"], correctAnswer: 0, explanation: "ඝනඵලය = πr²h", difficulty: "medium", topic: "Mensuration – Volume & Surface Area of 3D Solids", points: 2 },
  { id: "sm10", question: "sin θ = ප්‍රතිවිරුද්ධ ÷ ___.", type: "fill-blank", correctAnswer: "කර්ණය (hypotenuse)", explanation: "SOH = Sin = Opposite/Hypotenuse", difficulty: "easy", topic: "Trigonometry – Ratios, Identities & Applications", points: 1 },
  { id: "sm11", question: "A = {1,2,3}, B = {2,3,4} නම් A ∩ B =", type: "mcq", options: ["{1,2,3,4}", "{2,3}", "{1,4}", "{1,2,3,4,5}"], correctAnswer: 1, explanation: "{2,3} A හා B දෙකෙහිම ඇත.", difficulty: "easy", topic: "Sets – Union, Intersection, Complement & Venn Diagrams", points: 1 },
  { id: "sm12", question: "4, 7, 13, 16 ගේ මධ්‍යකය:", type: "mcq", options: ["8", "9", "10", "11"], correctAnswer: 2, explanation: "(4+7+13+16)÷4 = 40÷4 = 10", difficulty: "easy", topic: "Statistics – Mean, Median, Mode, Range & Frequency Tables", points: 1 },
  { id: "sm13", question: "x² - 5x + 6 = 0 හි විසඳුම් x=2 සහ x=3.", type: "true-false", correctAnswer: "true", explanation: "(x-2)(x-3)=0 → x=2 හෝ x=3 ✓", difficulty: "medium", topic: "Algebra – Quadratic Equations", points: 2 },
];

const SINHALA_SCIENCE_QUESTIONS: GeneratedQuestion[] = [
  { id: "ss1", question: "සෛලයේ 'බල ගෘහය' ලෙස හඳුන්වන කොටස:", type: "mcq", options: ["න්‍යෂ්ටිය", "මයිටොකොන්ඩ්‍රියා", "ක්ලෝරොප්ලාස්ට්", "රයිබොසෝම"], correctAnswer: 1, explanation: "මයිටොකොන්ඩ්‍රියා ATP ජනනය කරයි.", difficulty: "easy", topic: "Biology – Cell Structure & Organisation", points: 1 },
  { id: "ss2", question: "ප්‍රකාශ සංස්ලේෂණය හිදී ශාක ඔක්සිජන් නිකුත් කරයි.", type: "true-false", correctAnswer: "true", explanation: "6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂. ඔක්සිජන් ද්විතීයිකව නිකුත් වේ.", difficulty: "easy", topic: "Biology – Photosynthesis & Respiration", points: 1 },
  { id: "ss3", question: "ශාක ප්‍රකාශ සංස්ලේෂණ ක්‍රියාවලිය සඳහා ___ ශෝෂණය කරයි.", type: "mcq", options: ["ඔක්සිජන්", "නයිට්‍රජන්", "කාබන් ඩයොක්සයිඩ්", "හයිඩ්‍රජන්"], correctAnswer: 2, explanation: "ශාක CO₂ ශෝෂණය කර ග්ලූකෝස් නිර්මාණය කරයි.", difficulty: "easy", topic: "Biology – Photosynthesis & Respiration", points: 1 },
  { id: "ss4", question: "මුඛයේ පිෂ්ඨය ජීර්ණය කරන ප්‍රෝටීනේස ___.", type: "fill-blank", correctAnswer: "ලාලා ඇමිලේස් (salivary amylase)", explanation: "ලාලාවේ ඇමිලේස් මුඛ ජීර්ණය ආරම්භ කරයි.", difficulty: "medium", topic: "Biology – Human Digestive System", points: 2 },
  { id: "ss5", question: "මිනිස් හදවතේ කුටි ගණන:", type: "mcq", options: ["2", "3", "4", "6"], correctAnswer: 2, explanation: "කුටි 4: දකුණු ආලිංදය, දකුණු කෝෂ්ඨය, වම් ආලිංදය, වම් කෝෂ්ඨය.", difficulty: "easy", topic: "Biology – Human Circulatory System", points: 1 },
  { id: "ss6", question: "රතු රුධිර සෛල ඔක්සිජන් ප්‍රවාහනය කරන හීමොග්ලොබින් අඩංගු.", type: "true-false", correctAnswer: "true", explanation: "හීමොග්ලොබින් ඔක්සිජන් ප්‍රවාහනය කරයි.", difficulty: "easy", topic: "Biology – Human Circulatory System", points: 1 },
  { id: "ss7", question: "පාරම්පරිකත්වයේ මූලික ඒකකය:", type: "mcq", options: ["ගුණ ශ්‍රේෂ්ඨාගාරය", "ජානය", "DNA", "සෛලය"], correctAnswer: 1, explanation: "ජානය (gene) = DNA කොටසකි.", difficulty: "medium", topic: "Biology – Genetics & Heredity", points: 2 },
  { id: "ss8", question: "ක්‍ර. සං. 6 ඇති මූලද්‍රව්‍යයේ සංකේතය:", type: "mcq", options: ["O", "N", "C", "Na"], correctAnswer: 2, explanation: "කාබන් (C) ප්‍ර. සං. 6.", difficulty: "easy", topic: "Chemistry – Atoms, Elements & the Periodic Table", points: 1 },
  { id: "ss9", question: "අම්ලය නිල් ලිට්මස් රතු කරයි.", type: "true-false", correctAnswer: "true", explanation: "අම්ල = නිල් ලිට්මස් රතු. භෂ්ම = රතු ලිට්මස් නිල්.", difficulty: "easy", topic: "Chemistry – Acids, Bases & Salts", points: 1 },
  { id: "ss10", question: "ඉලෙක්ට්‍රෝන ස්ථාන මාරු කිරීම සිදු කරන රාසායනික බන්ධනය:", type: "mcq", options: ["සහසංයෝජිත බන්ධනය", "ආයනික බන්ධනය", "ලෝහ බන්ධනය", "හයිඩ්‍රජන් බන්ධනය"], correctAnswer: 1, explanation: "ආයනික බන්ධනය ඉලෙක්ට්‍රෝන ස්ථාන මාරු කිරීමෙන් ගොඩ නැගේ.", difficulty: "medium", topic: "Chemistry – Chemical Bonding", points: 2 },
  { id: "ss11", question: "ජලයේ රාසායනික සූත්‍රය ___.", type: "fill-blank", correctAnswer: "H₂O", explanation: "H₂O = හයිඩ්‍රජන් 2 + ඔක්සිජන් 1.", difficulty: "easy", topic: "Chemistry – Water & Solutions", points: 1 },
  { id: "ss12", question: "විදුලි ප්‍රතිරෝධ ඒකකය:", type: "mcq", options: ["වෝල්ට්", "ඇම්පියර්", "ඔහ්ම්", "වොට්"], correctAnswer: 2, explanation: "ඔහ්ම් (Ω).", difficulty: "easy", topic: "Physics – Electricity & Circuits", points: 1 },
  { id: "ss13", question: "වේගය = දුර ÷ කාලය.", type: "true-false", correctAnswer: "true", explanation: "Speed = Distance/Time.", difficulty: "easy", topic: "Physics – Motion, Speed & Velocity", points: 1 },
  { id: "ss14", question: "ඝනතා-අඩු මාධ්‍යයකට ආලෝකය ගමන් කළ විට, ___ ලෙස ඒකාකාරව හෙලී යයි.", type: "fill-blank", correctAnswer: "ඈත් (away)", explanation: "ආලෝකය ඝනතා-අඩු මාධ්‍යයකට ඇතුළු වූ විට සාමාන්‍ය රේඛාවෙන් ඈත් ලෙස.", difficulty: "medium", topic: "Physics – Light – Reflection & Refraction", points: 2 },
  { id: "ss15", question: "බලය SI ඒකකය:", type: "mcq", options: ["ජූල්", "වොට්", "නිව්ටන්", "පාස්කල්"], correctAnswer: 2, explanation: "නිව්ටන් (N). F = ma.", difficulty: "easy", topic: "Physics – Forces, Work, Energy & Power", points: 1 },
];

const SINHALA_QUESTION_BANKS: Partial<Record<Subject, GeneratedQuestion[]>> = {
  history: SINHALA_HISTORY_QUESTIONS,
  english: SINHALA_ENGLISH_QUESTIONS,
  maths: SINHALA_MATHS_QUESTIONS,
  science: SINHALA_SCIENCE_QUESTIONS,
};

const QUESTION_BANK: Record<Subject, GeneratedQuestion[]> = {
  history: [
    // --- Ancient Period ---
    { id: "h1", question: "According to Sri Lankan chronicles, King Vijaya arrived in Sri Lanka in approximately:", type: "mcq", options: ["543 BCE", "483 BCE", "600 BCE", "300 BCE"], correctAnswer: 0, explanation: "King Vijaya arrived around 543 BCE, the year that coincides with the Parinirvana of the Buddha according to the Mahavamsa.", difficulty: "easy", topic: "Ancient Period – Arrival of King Vijaya & Early Settlements", points: 1 },
    { id: "h2", question: "King Vijaya arrived in Sri Lanka from:", type: "mcq", options: ["India (Sinhapura, Bengal region)", "China", "Arabia", "Myanmar"], correctAnswer: 0, explanation: "According to the Mahavamsa, Vijaya came from Sinhapura in northern India (Bengal/Gujarat region).", difficulty: "easy", topic: "Ancient Period – Arrival of King Vijaya & Early Settlements", points: 1 },
    { id: "h3", question: "The Mahavamsa was written by Thero Mahanama.", type: "true-false", correctAnswer: "true", explanation: "The Mahavamsa, the great chronicle of Sri Lanka, was compiled by the Buddhist monk Mahanama in the 5th–6th century CE.", difficulty: "easy", topic: "Ancient Period – Arrival of King Vijaya & Early Settlements", points: 1 },
    { id: "h4", question: "The name 'Lanka' in ancient texts was derived from ___.", type: "fill-blank", correctAnswer: "Sinhale or the Sinhala people", explanation: "The island was called Sinhale/Lanka, linked to the Sinhala (lion people) settlers.", difficulty: "medium", topic: "Ancient Period – Arrival of King Vijaya & Early Settlements", points: 2 },
    { id: "h5", question: "Which kingdom became the first capital of Sri Lanka under King Vijaya?", type: "mcq", options: ["Tambapanni", "Anuradhapura", "Polonnaruwa", "Sigiriya"], correctAnswer: 0, explanation: "Tambapanni was the first settlement of King Vijaya in Sri Lanka.", difficulty: "easy", topic: "Ancient Period – Arrival of King Vijaya & Early Settlements", points: 1 },
    { id: "h6", question: "Anuradhapura was the capital of Sri Lanka for over 1,000 years.", type: "true-false", correctAnswer: "true", explanation: "Anuradhapura served as the ancient capital for approximately 1,400 years (4th century BCE – 10th century CE).", difficulty: "easy", topic: "Ancient Period – Anuradhapura Kingdom", points: 1 },
    { id: "h7", question: "Who introduced Buddhism to Sri Lanka?", type: "mcq", options: ["Mahinda Thero", "Sanghamitta Thero", "King Tissa", "King Vijaya"], correctAnswer: 0, explanation: "Arahant Mahinda Thero, son of Emperor Asoka, introduced Buddhism to Sri Lanka during King Devanampiya Tissa's reign.", difficulty: "easy", topic: "Ancient Period – Spread of Buddhism in Sri Lanka", points: 1 },
    { id: "h8", question: "King Dutugemunu defeated King Elara at the Battle of:", type: "mcq", options: ["Anuradhapura", "Vijithapura", "Polonnaruwa", "Tambapanni"], correctAnswer: 0, explanation: "The decisive battle was fought at Anuradhapura, where Dutugemunu killed Elara in single combat.", difficulty: "medium", topic: "Ancient Period – King Dutugemunu & the Elara War", points: 2 },
    { id: "h9", question: "The Ruwanwelisaya stupa was built by King:", type: "mcq", options: ["Dutugemunu", "Parakramabahu I", "Devanampiya Tissa", "Nissanka Malla"], correctAnswer: 0, explanation: "King Dutugemunu built the Ruwanwelisaya (Mahathupa) in Anuradhapura.", difficulty: "medium", topic: "Ancient Period – Anuradhapura Kingdom", points: 2 },
    { id: "h10", question: "The first irrigation tank in Sri Lanka was built by King Pandukabhaya.", type: "true-false", correctAnswer: "false", explanation: "Irrigation works began earlier; King Vasabha (2nd century CE) is credited with major tank construction. However Pandukabhaya established Anuradhapura.", difficulty: "hard", topic: "Ancient Period – Irrigation Civilisation (Tanks & Dagabas)", points: 3 },
    // --- Colonial Period ---
    { id: "h11", question: "The Portuguese arrived in Sri Lanka in:", type: "mcq", options: ["1505", "1658", "1815", "1948"], correctAnswer: 0, explanation: "The Portuguese first arrived in Sri Lanka in 1505 during the reign of King Vira Parakramabahu VIII.", difficulty: "easy", topic: "Colonial Period – Portuguese Rule in Sri Lanka", points: 1 },
    { id: "h12", question: "The Dutch replaced the Portuguese as the colonial power in Sri Lanka in:", type: "mcq", options: ["1658", "1505", "1796", "1815"], correctAnswer: 0, explanation: "The Dutch East India Company (VOC) captured the coastal regions from the Portuguese between 1638 and 1658.", difficulty: "medium", topic: "Colonial Period – Dutch Rule in Sri Lanka", points: 2 },
    { id: "h13", question: "Sri Lanka gained independence from Britain on February 4, 1948.", type: "true-false", correctAnswer: "true", explanation: "Ceylon (now Sri Lanka) gained independence from British rule on 4 February 1948.", difficulty: "easy", topic: "Modern Period – Independence Movement & 1948 Independence", points: 1 },
    { id: "h14", question: "The Uva Rebellion (1817–1818) was against ___.", type: "fill-blank", correctAnswer: "British rule", explanation: "The Uva-Wellassa rebellion was a major uprising against British colonial rule in Sri Lanka.", difficulty: "medium", topic: "Colonial Period – Uva Rebellion 1817–1818", points: 2 },
    { id: "h15", question: "The Kandyan Convention of 1815 formally ceded the Kandyan Kingdom to:", type: "mcq", options: ["Britain", "Portugal", "Netherlands", "France"], correctAnswer: 0, explanation: "The Kandyan Convention (Sinhala: Udarata Givisum) signed on 2 March 1815 handed the Kandyan Kingdom to the British.", difficulty: "medium", topic: "Colonial Period – British Rule in Sri Lanka", points: 2 },
    { id: "h16", question: "The Polonnaruwa Kingdom succeeded Anuradhapura as the capital of Sri Lanka.", type: "true-false", correctAnswer: "true", explanation: "After the fall of Anuradhapura around the 10th century, Polonnaruwa became the new capital.", difficulty: "easy", topic: "Medieval Period – Polonnaruwa Kingdom", points: 1 },
    { id: "h17", question: "King Parakramabahu I built the famous Parakrama Samudra tank in:", type: "mcq", options: ["Polonnaruwa", "Anuradhapura", "Kandy", "Sigiriya"], correctAnswer: 0, explanation: "The Parakrama Samudra is a large irrigation reservoir built in Polonnaruwa by King Parakramabahu I in the 12th century.", difficulty: "medium", topic: "Medieval Period – Polonnaruwa Kingdom", points: 2 },
  ],

  english: [
    // --- Grammar ---
    { id: "e1", question: "Which sentence is written in the passive voice?", type: "mcq", options: ["She wrote the letter.", "The letter was written by her.", "She is writing the letter.", "She had written the letter."], correctAnswer: 1, explanation: "In passive voice, the subject receives the action. 'The letter was written by her' shows the subject (letter) receiving the action.", difficulty: "easy", topic: "Grammar – Active & Passive Voice", points: 1 },
    { id: "e2", question: "An adverb modifies a noun.", type: "true-false", correctAnswer: "false", explanation: "An adverb modifies a verb, adjective, or another adverb — not a noun. Adjectives modify nouns.", difficulty: "easy", topic: "Grammar – Adjectives & Adverbs", points: 1 },
    { id: "e3", question: "Choose the correct tense: 'By the time she arrived, he ___ (already/leave).'", type: "mcq", options: ["already left", "had already left", "has already left", "already leaving"], correctAnswer: 1, explanation: "The Past Perfect tense (had + past participle) is used for an action completed before another past action.", difficulty: "medium", topic: "Grammar – Tenses (Present, Past, Future & Perfect)", points: 2 },
    { id: "e4", question: "The conjunction that shows contrast between two clauses is ___.", type: "fill-blank", correctAnswer: "although / but / however", explanation: "Conjunctions like 'although', 'but', and 'however' show contrast between ideas.", difficulty: "easy", topic: "Grammar – Conjunctions & Prepositions", points: 1 },
    { id: "e5", question: "Which is the correct reported speech for 'She said, \"I am tired\"'?", type: "mcq", options: ["She said she is tired.", "She said she was tired.", "She said she were tired.", "She said she be tired."], correctAnswer: 1, explanation: "In reported (indirect) speech, present tense 'am' shifts to past tense 'was' when the reporting verb is in past tense.", difficulty: "medium", topic: "Grammar – Direct & Indirect (Reported) Speech", points: 2 },
    { id: "e6", question: "\"If it rains, we will cancel the match.\" This is a ___ conditional.", type: "mcq", options: ["Zero", "First", "Second", "Third"], correctAnswer: 1, explanation: "The First Conditional uses 'if + present simple, will + infinitive' to talk about real/possible future situations.", difficulty: "medium", topic: "Grammar – Conditionals (Zero, First, Second & Third)", points: 2 },
    { id: "e7", question: "She plays tennis every day, ___?", type: "fill-blank", correctAnswer: "doesn't she", explanation: "Question tags for positive sentences in simple present use a negative tag: 'doesn't she?'", difficulty: "easy", topic: "Grammar – Question Tags & Short Answers", points: 1 },
    { id: "e8", question: "The verb 'runs' agrees with a singular subject.", type: "true-false", correctAnswer: "true", explanation: "Subject-Verb Agreement rule: singular subjects take verbs with '-s' (he runs, she sings) in simple present.", difficulty: "easy", topic: "Grammar – Subject-Verb Agreement", points: 1 },
    { id: "e9", question: "Which article is used before 'hour'?", type: "mcq", options: ["a", "an", "the", "no article"], correctAnswer: 1, explanation: "We use 'an' before words that begin with a vowel sound. 'Hour' starts with a silent 'h', so it sounds like a vowel ('our').", difficulty: "medium", topic: "Grammar – Articles (a, an, the)", points: 2 },
    // --- Vocabulary & Writing ---
    { id: "e10", question: "The antonym (opposite) of 'ancient' is:", type: "mcq", options: ["old", "modern", "historical", "classic"], correctAnswer: 1, explanation: "'Modern' means belonging to the present time, which is the opposite of 'ancient' (very old).", difficulty: "easy", topic: "Vocabulary – Word Forms, Synonyms & Antonyms", points: 1 },
    { id: "e11", question: "A formal letter must include the sender's address, date, recipient's address, and a formal ___.", type: "fill-blank", correctAnswer: "salutation / greeting", explanation: "Formal letters follow a set structure including a formal salutation (e.g., 'Dear Sir/Madam,').", difficulty: "easy", topic: "Writing – Formal Letter Writing", points: 1 },
    { id: "e12", question: "A metaphor makes a direct comparison WITHOUT using 'like' or 'as'.", type: "true-false", correctAnswer: "true", explanation: "A metaphor is a figure of speech that directly states one thing IS another (e.g., 'Life is a journey'). Similes use 'like' or 'as'.", difficulty: "easy", topic: "Literature – Poetry Analysis & Figures of Speech", points: 1 },
    { id: "e13", question: "Which phrasal verb means 'to tolerate or endure'?", type: "mcq", options: ["put off", "put out", "put up with", "put down"], correctAnswer: 2, explanation: "'Put up with' means to tolerate something unpleasant (e.g., 'I can't put up with this noise').", difficulty: "hard", topic: "Vocabulary – Phrasal Verbs & Idioms", points: 3 },
  ],

  maths: [
    { id: "m1", question: "Solve for x: 2x + 4 = 10", type: "mcq", options: ["2", "3", "4", "5"], correctAnswer: 1, explanation: "2x + 4 = 10 → 2x = 6 → x = 3", difficulty: "easy", topic: "Algebra – Linear Equations & Inequalities", points: 1 },
    { id: "m2", question: "The area of a triangle with base 8 cm and height 5 cm is:", type: "mcq", options: ["40 cm²", "20 cm²", "13 cm²", "80 cm²"], correctAnswer: 1, explanation: "Area = ½ × base × height = ½ × 8 × 5 = 20 cm²", difficulty: "easy", topic: "Mensuration – Area & Perimeter of 2D Shapes", points: 1 },
    { id: "m3", question: "The value of 2³ × 2² is:", type: "mcq", options: ["2⁵", "2⁶", "4⁵", "2⁴"], correctAnswer: 0, explanation: "When multiplying same bases, add the powers: 2³ × 2² = 2^(3+2) = 2⁵ = 32", difficulty: "easy", topic: "Algebra – Indices & Logarithms", points: 1 },
    { id: "m4", question: "The sum of angles in a triangle is ___ degrees.", type: "fill-blank", correctAnswer: "180", explanation: "The interior angles of any triangle always add up to 180°.", difficulty: "easy", topic: "Geometry – Lines, Angles & Triangles", points: 1 },
    { id: "m5", question: "Factorise: x² - 9", type: "mcq", options: ["(x-3)(x-3)", "(x+3)(x-3)", "(x+9)(x-1)", "(x-9)(x+1)"], correctAnswer: 1, explanation: "x² - 9 is a difference of two squares: x² - 3² = (x+3)(x-3)", difficulty: "medium", topic: "Algebra – Polynomials & Factorisation", points: 2 },
    { id: "m6", question: "A line with gradient (slope) 0 is a vertical line.", type: "true-false", correctAnswer: "false", explanation: "A line with gradient 0 is HORIZONTAL (y = constant). A vertical line has an undefined gradient.", difficulty: "medium", topic: "Graphs – Linear & Quadratic Functions", points: 2 },
    { id: "m7", question: "Solve the simultaneous equations: x + y = 5 and x - y = 1. Find x.", type: "mcq", options: ["2", "3", "4", "5"], correctAnswer: 1, explanation: "Adding both equations: 2x = 6 → x = 3. Then y = 5 - 3 = 2.", difficulty: "medium", topic: "Algebra – Simultaneous Equations", points: 2 },
    { id: "m8", question: "The probability of an impossible event is:", type: "mcq", options: ["1", "0.5", "0", "-1"], correctAnswer: 2, explanation: "Probability ranges from 0 (impossible) to 1 (certain). An impossible event has probability 0.", difficulty: "easy", topic: "Probability – Basic Concepts & Simple Events", points: 1 },
    { id: "m9", question: "The volume of a cylinder with radius r and height h is:", type: "mcq", options: ["πr²h", "2πrh", "πrh²", "2πr²h"], correctAnswer: 0, explanation: "Volume of cylinder = πr²h where r is the radius and h is the height.", difficulty: "medium", topic: "Mensuration – Volume & Surface Area of 3D Solids", points: 2 },
    { id: "m10", question: "In a right-angled triangle, sin θ = opposite ÷ ___.", type: "fill-blank", correctAnswer: "hypotenuse", explanation: "SOH-CAH-TOA: Sin = Opposite/Hypotenuse, Cos = Adjacent/Hypotenuse, Tan = Opposite/Adjacent", difficulty: "easy", topic: "Trigonometry – Ratios, Identities & Applications", points: 1 },
    { id: "m11", question: "If A = {1,2,3} and B = {2,3,4}, then A ∩ B is:", type: "mcq", options: ["{1,2,3,4}", "{2,3}", "{1,4}", "{1,2,3,4,5}"], correctAnswer: 1, explanation: "A ∩ B (intersection) contains elements found in BOTH sets. {2,3} are in both A and B.", difficulty: "easy", topic: "Sets – Union, Intersection, Complement & Venn Diagrams", points: 1 },
    { id: "m12", question: "The mean of 4, 7, 13, 16 is:", type: "mcq", options: ["8", "9", "10", "11"], correctAnswer: 2, explanation: "Mean = (4 + 7 + 13 + 16) ÷ 4 = 40 ÷ 4 = 10", difficulty: "easy", topic: "Statistics – Mean, Median, Mode, Range & Frequency Tables", points: 1 },
    { id: "m13", question: "Solve x² - 5x + 6 = 0. The solutions are x = 2 and x = 3.", type: "true-false", correctAnswer: "true", explanation: "Factorising: (x-2)(x-3) = 0 → x = 2 or x = 3. Check: 4-10+6=0 ✓ and 9-15+6=0 ✓", difficulty: "medium", topic: "Algebra – Quadratic Equations", points: 2 },
  ],

  science: [
    // --- Biology ---
    { id: "s1", question: "Which organelle is known as the 'powerhouse of the cell'?", type: "mcq", options: ["Nucleus", "Mitochondria", "Chloroplast", "Ribosome"], correctAnswer: 1, explanation: "Mitochondria produce ATP (energy) through cellular respiration, earning the name 'powerhouse of the cell'.", difficulty: "easy", topic: "Biology – Cell Structure & Organisation", points: 1 },
    { id: "s2", question: "During photosynthesis, plants release oxygen as a by-product.", type: "true-false", correctAnswer: "true", explanation: "Photosynthesis: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂. Oxygen (O₂) is released as a by-product.", difficulty: "easy", topic: "Biology – Photosynthesis & Respiration", points: 1 },
    { id: "s3", question: "Which gas do plants absorb during photosynthesis?", type: "mcq", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], correctAnswer: 2, explanation: "Plants absorb CO₂ (carbon dioxide) and use it with water to produce glucose during photosynthesis.", difficulty: "easy", topic: "Biology – Photosynthesis & Respiration", points: 1 },
    { id: "s4", question: "The enzyme that digests starch in the mouth is called ___.", type: "fill-blank", correctAnswer: "salivary amylase", explanation: "Salivary amylase (ptyalin) in saliva begins the digestion of starch into maltose in the mouth.", difficulty: "medium", topic: "Biology – Human Digestive System", points: 2 },
    { id: "s5", question: "The human heart has ___ chambers.", type: "mcq", options: ["2", "3", "4", "6"], correctAnswer: 2, explanation: "The human heart has 4 chambers: right atrium, right ventricle, left atrium, left ventricle.", difficulty: "easy", topic: "Biology – Human Circulatory System", points: 1 },
    { id: "s6", question: "Red blood cells contain haemoglobin which carries oxygen.", type: "true-false", correctAnswer: "true", explanation: "Haemoglobin is an iron-containing protein in red blood cells (erythrocytes) that binds and transports oxygen.", difficulty: "easy", topic: "Biology – Human Circulatory System", points: 1 },
    { id: "s7", question: "The basic unit of heredity is:", type: "mcq", options: ["Chromosome", "Gene", "DNA", "Cell"], correctAnswer: 1, explanation: "A gene is the basic unit of heredity — a segment of DNA that codes for a specific protein or trait.", difficulty: "medium", topic: "Biology – Genetics & Heredity", points: 2 },
    // --- Chemistry ---
    { id: "s8", question: "The symbol for the element with atomic number 6 is:", type: "mcq", options: ["O", "N", "C", "Na"], correctAnswer: 2, explanation: "Carbon (C) has atomic number 6, meaning it has 6 protons in its nucleus.", difficulty: "easy", topic: "Chemistry – Atoms, Elements & the Periodic Table", points: 1 },
    { id: "s9", question: "An acid turns blue litmus paper red.", type: "true-false", correctAnswer: "true", explanation: "Acids turn blue litmus paper red. Bases/alkalis turn red litmus paper blue.", difficulty: "easy", topic: "Chemistry – Acids, Bases & Salts", points: 1 },
    { id: "s10", question: "Which type of chemical bond involves the transfer of electrons?", type: "mcq", options: ["Covalent bond", "Ionic bond", "Metallic bond", "Hydrogen bond"], correctAnswer: 1, explanation: "Ionic bonds are formed by the transfer of electrons from one atom to another, forming positive and negative ions.", difficulty: "medium", topic: "Chemistry – Chemical Bonding", points: 2 },
    { id: "s11", question: "The chemical formula for water is ___.", type: "fill-blank", correctAnswer: "H₂O", explanation: "Water is made up of 2 hydrogen atoms and 1 oxygen atom: H₂O.", difficulty: "easy", topic: "Chemistry – Water & Solutions", points: 1 },
    // --- Physics ---
    { id: "s12", question: "The unit of electrical resistance is:", type: "mcq", options: ["Volt", "Ampere", "Ohm", "Watt"], correctAnswer: 2, explanation: "Electrical resistance is measured in Ohms (Ω), named after Georg Ohm who formulated Ohm's Law.", difficulty: "easy", topic: "Physics – Electricity & Circuits", points: 1 },
    { id: "s13", question: "Speed = Distance ÷ Time.", type: "true-false", correctAnswer: "true", explanation: "Speed is defined as the distance travelled per unit time: Speed = Distance/Time (m/s or km/h).", difficulty: "easy", topic: "Physics – Motion, Speed & Velocity", points: 1 },
    { id: "s14", question: "When light travels from a denser medium to a less dense medium, it bends ___ from the normal.", type: "fill-blank", correctAnswer: "away", explanation: "Refraction: when light enters a less dense medium it speeds up and bends away from the normal line.", difficulty: "medium", topic: "Physics – Light – Reflection & Refraction", points: 2 },
    { id: "s15", question: "The SI unit of force is:", type: "mcq", options: ["Joule", "Watt", "Newton", "Pascal"], correctAnswer: 2, explanation: "Force is measured in Newtons (N), named after Sir Isaac Newton. F = ma (Force = mass × acceleration).", difficulty: "easy", topic: "Physics – Forces, Work, Energy & Power", points: 1 },
    { id: "s16", question: "Sound cannot travel through a vacuum.", type: "true-false", correctAnswer: "true", explanation: "Sound is a mechanical wave that requires a medium (solid, liquid, or gas) to travel. It cannot travel through a vacuum.", difficulty: "easy", topic: "Physics – Waves & Sound", points: 1 },
  ],
};

// Shuffle array helper
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── OFFLINE FALLBACK QUESTION GENERATOR ──────────────────────────────────────
function getOfflineQuestions(
  subject: Subject,
  topic: string,
  count: number,
  questionTypes: string[],
  difficulty: string,
  language: "en" | "si" = "en"
): GeneratedQuestion[] {
  const bank =
    language === "si" && SINHALA_QUESTION_BANKS[subject]
      ? SINHALA_QUESTION_BANKS[subject]!
      : QUESTION_BANK[subject];

  // 1) Try to find questions for the exact topic
  let pool = bank.filter((q) => q.topic === topic);

  // 2) If not enough, use ALL questions for the subject
  if (pool.length < count) {
    pool = bank;
  }

  // 3) Filter by question type if not all types selected
  const filtered = pool.filter((q) => questionTypes.includes(q.type));
  const finalPool = filtered.length >= Math.min(count, 2) ? filtered : pool;

  // 4) Shuffle and take the required count; re-stamp IDs and topic
  const selected = shuffle(finalPool)
    .slice(0, count)
    .map((q, i) => ({ ...q, id: `q${i + 1}`, topic }));

  return selected;
}

// ── GEMINI API CALL ───────────────────────────────────────────────────────────
async function generateQuestionsFromAI(params: {
  subject: Subject;
  topic: string;
  difficulty: string;
  count: number;
  questionTypes: string[];
  language: "en" | "si";
}): Promise<GeneratedQuestion[]> {
  const typesDesc = params.questionTypes.join(", ");
  const prompt = `You are an expert Sri Lankan O/L (Grade 10-11) examination question creator. You ONLY generate questions strictly within the official Sri Lankan O/L syllabus. Never go outside the syllabus scope.

Generate exactly ${params.count} practice questions for Sri Lankan O/L students.
SUBJECT: ${params.subject.toUpperCase()}
SYLLABUS TOPIC: "${params.topic}" (official Sri Lankan O/L syllabus topic)
DIFFICULTY: ${params.difficulty}
QUESTION TYPES (mix these): ${typesDesc}
LANGUAGE: ${params.language === "si" ? "Sinhala (use Sinhala script; keep scientific/math terms in English)" : "English"}

STRICT RULES:
- Questions MUST be based ONLY on the Sri Lankan O/L syllabus for "${params.topic}".
- Style questions like real O/L past paper questions.
- For "fill-blank": correctAnswer = the exact word/phrase that fills the blank.
- For "essay": correctAnswer = a model answer outline (3-5 sentences).
- Explanations must reference the O/L syllabus clearly.

Respond ONLY with a valid JSON array (no markdown, no preamble, no extra text). Each object must have:
{
  "id": "q1",
  "question": "...",
  "type": "mcq" | "true-false" | "fill-blank" | "essay",
  "options": ["A","B","C","D"] (only for mcq, omit for others),
  "correctAnswer": 0 (index for mcq) | "true"/"false" (for true-false) | "answer text" (for fill-blank/essay),
  "explanation": "...",
  "difficulty": "easy"|"medium"|"hard",
  "topic": "${params.topic}",
  "points": 1-5
}
Return ONLY the JSON array.`;

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  // If no API key is set, go straight to offline fallback
  if (!apiKey || apiKey.trim() === "") {
    console.warn("No Gemini API key found. Using offline question bank.");
    return getOfflineQuestions(params.subject, params.topic, params.count, params.questionTypes, params.difficulty, params.language);
  }

  try {
    const url = `/gemini-api/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: { maxOutputTokens: 4096 },
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Check for API-level errors (e.g. invalid key, quota exceeded)
    if (data.error) {
      throw new Error(`Gemini API error: ${data.error.message}`);
    }

    const raw = data.candidates?.[0]?.content?.parts?.[0]?.text || "[]";
    const clean = raw.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);

    if (!Array.isArray(parsed) || parsed.length === 0) {
      throw new Error("Empty response from Gemini API");
    }

    return parsed.map((q: GeneratedQuestion, i: number) => ({ ...q, id: q.id || `q${i + 1}` }));
  } catch (err) {
    console.error("Gemini question generation error:", err);
    console.info("Falling back to offline question bank.");
    // Fallback to offline question bank
    return getOfflineQuestions(params.subject, params.topic, params.count, params.questionTypes, params.difficulty, params.language);
  }
}

// ── TOPIC OPTIONS (Sri Lankan O/L Syllabus) ───────────────────────────────────
const SINHALA_HISTORY_TOPICS: string[] = [
  "පුරාණ යුගය – විජය රජු ලංකාවට පැමිණීම",
  "පුරාණ යුගය – අනුරාධපුර රාජධානිය",
  "පුරාණ යුගය – දුටුගැමුණු රජු",
  "පුරාණ යුගය – වාරි ශිෂ්ඨාචාරය (ජලාශ)",
  "පුරාණ යුගය – ශ්‍රී ලංකාවට බෞද්ධ ශාසනය",
  "මධ්‍යකාලීන යුගය – පොළොන්නරු රාජධානිය",
  "මධ්‍යකාලීන යුගය – කන්ද රාජධානිය",
  "යටත් විජිත යුගය – ශ්‍රී ලංකාවේ පෘතුගීසි පාලනය",
  "යටත් විජිත යුගය – ශ්‍රී ලංකාවේ ලන්දේසි පාලනය",
  "යටත් විජිත යුගය – ශ්‍රී ලංකාවේ බ්‍රිතාන්‍ය පාලනය",
  "යටත් විජිත යුගය – 1817-1818 ඌව කැරළ්ල",
  "නූතන යුගය – නිදහස් ව්‍යාපාරය සහ 1948 නිදහස",
  "නූතන යුගය – නිදහස් අනතු දේශපාලන ඉතිහාසය",
  "නූතන යුගය – ශ්‍රී ලංකා ආණ්ඩුක්‍රම ව්‍යවස්ථාව",
];

const SINHALA_ENGLISH_TOPICS: string[] = [
  "ව්‍යාකරණ – සරල, සංයුක්ත සහ සංකීර්ණ වාක්‍ය",
  "ව්‍යාකරණ – කාල (වර්තමාන, අතීත, අනාගත, Perfect)",
  "ව්‍යාකරණ – කර්තෘකාරක සහ කර්මකාරක (Active & Passive Voice)",
  "ව්‍යාකරණ – ඍජු සහ වක්‍ර කතනය (Reported Speech)",
  "ව්‍යාකරණ – Conditionals (Zero, First, Second & Third)",
  "ව්‍යාකරණ – Question Tags සහ Short Answers",
  "ව්‍යාකරණ – Conjunctions සහ Prepositions",
  "ව්‍යාකරණ – Articles (a, an, the)",
  "ව්‍යාකරණ – Adjectives සහ Adverbs",
  "ව්‍යාකරණ – Subject-Verb Agreement",
  "වචන කෝෂය – Word Forms, Synonyms සහ Antonyms",
  "වචන කෝෂය – Phrasal Verbs සහ Idioms",
  "කියවීම – Comprehension Passages",
  "රචනා – Formal Letter Writing",
  "රචනා – Informal Letter Writing",
  "රචනා – Argumentative Essay",
  "රචනා – Descriptive & Narrative Essay",
  "රචනා – Sentence Transformation & Editing",
  "සාහිත්‍ය – Poetry Analysis සහ Figures of Speech",
  "සන්නිවේදනය – Dialogues & Conversations",
];

const SINHALA_MATHS_TOPICS: string[] = [
  "සංඛ්‍යා පද්ධතිය – සැබෑ සංඛ්‍යා සහ සංඛ්‍යා පාදය",
  "කට්ටල – එකමිල, ඡේදනය සහ Venn රූප",
  "වීජ ගණිතය – රේඛීය සමීකරණ",
  "වීජ ගණිතය – ද්විත්ව සමීකරණ",
  "වීජ ගණිතය – සමගාමී සමීකරණ",
  "වීජ ගණිතය – ඝාතාංක සහ ලාගරිතම",
  "වීජ ගණිතය – බහුපද සහ සාධකීකරණය",
  "ජ්‍යාමිතිය – රේඛා, කෝණ සහ ත්‍රිකෝණ",
  "ජ්‍යාමිතිය – සවර්ගය සහ සමානරූප ත්‍රිකෝණ",
  "ජ්‍යාමිතිය – වෘත්ත සිද්ධාන්ත",
  "ත්‍රිකෝණාසනිත – අනුපාත සහ යෙදුම්",
  "ක්ෂේත්‍රමිතිය – 2D හැඩතල වල වර්ගඵලය",
  "ක්ෂේත්‍රමිතිය – 3D හැඩතල වල ඝනඵලය",
  "සංඛ්‍යාන – මධ්‍යකය, මධ්‍යස්ථය, ප්‍රකෘතිය",
  "සම්භාවිතාව – මූලික සංකල්ප",
  "ප්‍රස්ථාර – රේඛීය සහ ද්විත්ව කාර්යයන්",
  "දෛශික (Vectors) – මූලික කාර්යයන්",
  "න්‍යාස (Matrices) – ක්‍රියාකාරිත්ව සහ ප්‍රතිලෝමය",
];

const SINHALA_SCIENCE_TOPICS: string[] = [
  "ජීව විද්‍යාව – සෛල ව්‍යූහය",
  "ජීව විද්‍යාව – ප්‍රකාශ සංස්ලේෂණය සහ ශ්වසනය",
  "ජීව විද්‍යාව – මානව ජීර්ණ පද්ධතිය",
  "ජීව විද්‍යාව – මානව රක්ත සංසරණ පද්ධතිය",
  "ජීව විද්‍යාව – මානව ශ්වසන පද්ධතිය",
  "ජීව විද්‍යාව – ජාන විද්‍යාව සහ පාරම්පරිකත්වය",
  "ජීව විද්‍යාව – පරිසර පද්ධති",
  "රසායනය – පරමාණු, මූලද්‍රව්‍ය සහ කාලානුක්‍රමික වගුව",
  "රසායනය – රාසායනික බන්ධනය",
  "රසායනය – රාසායනික ප්‍රතික්‍රියා",
  "රසායනය – අම්ල, භෂ්ම සහ ලවණ",
  "රසායනය – ජලය සහ ද්‍රාවණ",
  "භෞතික විද්‍යාව – චලිතය, වේගය සහ ත්වරණය",
  "භෞතික විද්‍යාව – බල, කාර්යය සහ ශක්තිය",
  "භෞතික විද්‍යාව – ආලෝකය – පරාවර්තනය සහ ආවර්ජනය",
  "භෞතික විද්‍යාව – විදුලිය සහ පරිපථ",
  "භෞතික විද්‍යාව – තරංග සහ ශබ්දය",
];

function getTopicOptions(subject: Subject, language: "en" | "si"): string[] {
  if (language === "si") {
    const siTopics: Partial<Record<Subject, string[]>> = {
      history: SINHALA_HISTORY_TOPICS,
      english: SINHALA_ENGLISH_TOPICS,
      maths: SINHALA_MATHS_TOPICS,
      science: SINHALA_SCIENCE_TOPICS,
    };
    if (siTopics[subject]) return siTopics[subject]!;
  }
  return TOPIC_OPTIONS[subject];
}

const TOPIC_OPTIONS: Record<Subject, string[]> = {
  history: [
    "Ancient Period – Arrival of King Vijaya & Early Settlements",
    "Ancient Period – Anuradhapura Kingdom",
    "Ancient Period – King Dutugemunu & the Elara War",
    "Ancient Period – Irrigation Civilisation (Tanks & Dagabas)",
    "Ancient Period – Spread of Buddhism in Sri Lanka",
    "Medieval Period – Polonnaruwa Kingdom",
    "Medieval Period – Kandyan Kingdom & Culture",
    "Medieval Period – Sri Lankan Arts, Architecture & Literature",
    "Colonial Period – Portuguese Rule in Sri Lanka",
    "Colonial Period – Dutch Rule in Sri Lanka",
    "Colonial Period – British Rule in Sri Lanka",
    "Colonial Period – Uva Rebellion 1817–1818",
    "Colonial Period – Economic & Social Changes under Colonial Rule",
    "Modern Period – Independence Movement & 1948 Independence",
    "Modern Period – Post-Independence Political History",
    "Modern Period – Sri Lankan Constitution & Governance",
  ],
  english: [
    "Grammar – Sentences (Simple, Compound & Complex)",
    "Grammar – Tenses (Present, Past, Future & Perfect)",
    "Grammar – Active & Passive Voice",
    "Grammar – Direct & Indirect (Reported) Speech",
    "Grammar – Conditionals (Zero, First, Second & Third)",
    "Grammar – Question Tags & Short Answers",
    "Grammar – Conjunctions & Prepositions",
    "Grammar – Articles (a, an, the)",
    "Grammar – Adjectives & Adverbs",
    "Grammar – Subject-Verb Agreement",
    "Vocabulary – Word Forms, Synonyms & Antonyms",
    "Vocabulary – Phrasal Verbs & Idioms",
    "Reading – Comprehension Passages",
    "Writing – Formal Letter Writing",
    "Writing – Informal Letter Writing",
    "Writing – Argumentative Essay Writing",
    "Writing – Descriptive & Narrative Essay Writing",
    "Writing – Sentence Transformation & Editing",
    "Literature – Poetry Analysis & Figures of Speech",
    "Communication – Dialogues & Conversations",
  ],
  maths: [
    "Number System – Real Numbers, Integers & Number Bases",
    "Sets – Union, Intersection, Complement & Venn Diagrams",
    "Algebra – Linear Equations & Inequalities",
    "Algebra – Quadratic Equations",
    "Algebra – Simultaneous Equations",
    "Algebra – Indices & Logarithms",
    "Algebra – Polynomials & Factorisation",
    "Algebra – Algebraic Fractions",
    "Geometry – Lines, Angles & Triangles",
    "Geometry – Congruence & Similarity of Triangles",
    "Geometry – Quadrilaterals & Polygons",
    "Geometry – Circles & Circle Theorems",
    "Geometry – Constructions",
    "Trigonometry – Ratios, Identities & Applications",
    "Mensuration – Area & Perimeter of 2D Shapes",
    "Mensuration – Volume & Surface Area of 3D Solids",
    "Statistics – Mean, Median, Mode, Range & Frequency Tables",
    "Statistics – Histograms, Bar Graphs & Pie Charts",
    "Probability – Basic Concepts & Simple Events",
    "Graphs – Linear & Quadratic Functions",
    "Vectors – Basics & Operations",
    "Matrices – Operations, Inverse & Determinants",
  ],
  science: [
    "Biology – Cell Structure & Organisation",
    "Biology – Photosynthesis & Respiration",
    "Biology – Human Digestive System",
    "Biology – Human Circulatory System",
    "Biology – Human Respiratory System",
    "Biology – Human Excretory System",
    "Biology – Nervous System & Sense Organs",
    "Biology – Reproduction in Plants",
    "Biology – Reproduction in Animals & Humans",
    "Biology – Genetics & Heredity",
    "Biology – Ecology & Ecosystems",
    "Biology – Microorganisms, Disease & Immunity",
    "Chemistry – Atoms, Elements & the Periodic Table",
    "Chemistry – Chemical Bonding",
    "Chemistry – Chemical Reactions & Equations",
    "Chemistry – Acids, Bases & Salts",
    "Chemistry – Metals & Non-Metals",
    "Chemistry – Carbon & Its Compounds",
    "Chemistry – Water & Solutions",
    "Physics – Measurement & Units",
    "Physics – Motion, Speed & Velocity",
    "Physics – Forces, Work, Energy & Power",
    "Physics – Pressure in Solids, Liquids & Gases",
    "Physics – Heat & Temperature",
    "Physics – Light – Reflection & Refraction",
    "Physics – Electricity & Circuits",
    "Physics – Magnetism & Electromagnetism",
    "Physics – Waves & Sound",
  ],
};

const SUBJECT_META: Record<Subject, { label: { en: string; si: string }; icon: React.ReactNode; color: string }> = {
  history: { label: { en: "History", si: "ඉතිහාසය" }, icon: <History className="w-4 h-4" />, color: "from-purple-600 to-blue-600" },
  english: { label: { en: "English", si: "ඉංග්‍රීසි" }, icon: <Languages className="w-4 h-4" />, color: "from-green-600 to-teal-600" },
  maths: { label: { en: "Maths", si: "ගණිතය" }, icon: <Calculator className="w-4 h-4" />, color: "from-orange-500 to-red-500" },
  science: { label: { en: "Science", si: "විද්‍යාව" }, icon: <FlaskConical className="w-4 h-4" />, color: "from-cyan-600 to-blue-600" },
};

interface AIQuestionGeneratorProps {
  onQuestionsGenerated: (questions: GeneratedQuestion[]) => void;
  onClose: () => void;
}

export function AIQuestionGenerator({ onQuestionsGenerated, onClose }: AIQuestionGeneratorProps) {
  const { language } = useLanguage();
  const { user } = useAuth();

  const [subject, setSubject] = useState<Subject>("history");
  const [topic, setTopic] = useState(() => getTopicOptions('history', (localStorage.getItem('app_language') as 'en'|'si') || 'en')[0]);
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard" | "mixed">("mixed");
  const [count, setCount] = useState(10);
  const [questionTypes, setQuestionTypes] = useState<string[]>(["mcq", "true-false"]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState<GeneratedQuestion[]>([]);

  const content = {
    title: language === "en" ? "AI Question Generator" : "AI ප්‍රශ්න උත්පාදක",
    subjectLabel: language === "en" ? "Subject" : "විෂය",
    topicLabel: language === "en" ? "Topic" : "මාතෘකාව",
    difficultyLabel: language === "en" ? "Difficulty Level" : "දුෂ්කරතා මට්ටම",
    countLabel: language === "en" ? "Number of Questions" : "ප්‍රශ්න ගණන",
    typesLabel: language === "en" ? "Question Types" : "ප්‍රශ්න වර්ග",
    generateBtn: language === "en" ? "Generate Questions" : "ප්‍රශ්න උත්පාදනය කරන්න",
    generating: language === "en" ? "AI is creating your questions..." : "AI ප්‍රශ්න නිර්මාණය කරමින්...",
    success: language === "en" ? "Questions Generated!" : "ප්‍රශ්න උත්පාදනය විය!",
    startQuiz: language === "en" ? "Start Practice Quiz" : "ප්‍රශ්නාවලිය ආරම්භ කරන්න",
    regenerate: language === "en" ? "Generate New Questions" : "නව ප්‍රශ්න උත්පාදනය කරන්න",
    cancel: language === "en" ? "Cancel" : "අවලංගු කරන්න",
    difficulties: {
      easy: language === "en" ? "Easy" : "පහසු",
      medium: language === "en" ? "Medium" : "මධ්‍යම",
      hard: language === "en" ? "Hard" : "දුෂ්කර",
      mixed: language === "en" ? "Mixed" : "මිශ්‍ර",
    },
    types: {
      mcq: language === "en" ? "Multiple Choice" : "බහු තේරීම",
      "true-false": language === "en" ? "True/False" : "සත්‍ය/අසත්‍ය",
      essay: language === "en" ? "Essay" : "රචනා",
      "fill-blank": language === "en" ? "Fill in Blank" : "හිස් තැන්",
    },
  };

  const handleSubjectChange = (s: Subject) => {
    setSubject(s);
    setTopic(getTopicOptions(s, language)[0]);
  };

  const toggleQuestionType = (type: string) => {
    if (questionTypes.includes(type)) {
      if (questionTypes.length === 1) return;
      setQuestionTypes(questionTypes.filter((t) => t !== type));
    } else {
      setQuestionTypes([...questionTypes, type]);
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const effectiveDifficulty = difficulty === "mixed" ? "mixed (include easy, medium, and hard)" : difficulty;
      const questions = await generateQuestionsFromAI({
        subject,
        topic,
        difficulty: effectiveDifficulty,
        count,
        questionTypes,
        language,
      });
      setGeneratedQuestions(questions);
      setGenerated(true);
      setTimeout(() => {
        onQuestionsGenerated(questions);
      }, 1500);
    } catch (error) {
      // Even if generateQuestionsFromAI throws unexpectedly, use offline bank
      const fallback = getOfflineQuestions(subject, topic, count, questionTypes, difficulty, language);
      setGeneratedQuestions(fallback);
      setGenerated(true);
      setTimeout(() => {
        onQuestionsGenerated(fallback);
      }, 1500);
    } finally {
      setIsGenerating(false);
    }
  };

  const meta = SUBJECT_META[subject];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className={`bg-gradient-to-r ${meta.color} text-white p-7 rounded-t-3xl relative`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-all"
            title={language === "en" ? "Close" : "වසන්න"}
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3 mb-1">
            <Sparkles className="w-7 h-7" />
            <h2 className="text-2xl font-bold">{content.title}</h2>
          </div>
          <p className="text-white/90 text-sm">
            {language === "en" ? "Generate unlimited practice questions powered by AI" : "AI මගින් අසීමිත ප්‍රශ්න උත්පාදනය කරන්න"}
          </p>
        </div>

        {/* Form */}
        {!generated && (
          <div className="p-7 space-y-5">
            {/* Subject Selector */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">{content.subjectLabel}</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(Object.keys(SUBJECT_META) as Subject[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSubjectChange(s)}
                    disabled={isGenerating}
                    className={`flex items-center justify-center gap-2 p-3 rounded-xl font-semibold text-sm transition-all ${
                      subject === s
                        ? `bg-gradient-to-r ${SUBJECT_META[s].color} text-white shadow-lg scale-105`
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {SUBJECT_META[s].icon}
                    {SUBJECT_META[s].label[language]}
                  </button>
                ))}
              </div>
            </div>

            {/* Topic */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">{content.topicLabel}</label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 outline-none text-sm"
                disabled={isGenerating}
              >
                {getTopicOptions(subject, language).map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* Difficulty */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">{content.difficultyLabel}</label>
              <div className="grid grid-cols-4 gap-2">
                {(["easy", "medium", "hard", "mixed"] as const).map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setDifficulty(diff)}
                    disabled={isGenerating}
                    className={`p-2 rounded-xl font-semibold text-sm transition-all ${
                      difficulty === diff
                        ? "bg-purple-600 text-white shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {content.difficulties[diff]}
                  </button>
                ))}
              </div>
            </div>

            {/* Count */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                {content.countLabel}: {count}
              </label>
              <input
                type="range"
                min="5"
                max="20"
                step="5"
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                disabled={isGenerating}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>5</span><span>10</span><span>15</span><span>20</span>
              </div>
            </div>

            {/* Question Types */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">{content.typesLabel}</label>
              <div className="grid grid-cols-2 gap-2">
                {(["mcq", "true-false", "essay", "fill-blank"] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => toggleQuestionType(type)}
                    disabled={isGenerating}
                    className={`p-3 rounded-xl font-semibold text-sm transition-all ${
                      questionTypes.includes(type)
                        ? "bg-green-600 text-white shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {questionTypes.includes(type) && <CheckCircle2 className="w-4 h-4 inline mr-1" />}
                    {content.types[type]}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <Button
              onClick={handleGenerate}
              disabled={isGenerating || questionTypes.length === 0}
              className={`w-full bg-gradient-to-r ${meta.color} text-white py-6 text-base rounded-xl hover:opacity-90`}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  {content.generating}
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 mr-2" />
                  {content.generateBtn}
                </>
              )}
            </Button>

            <Button onClick={onClose} variant="outline" className="w-full" disabled={isGenerating}>
              {content.cancel}
            </Button>
          </div>
        )}

        {/* Success State */}
        {generated && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 text-center"
          >
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
              <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-4" />
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{content.success}</h3>
            <p className="text-gray-600 mb-6">
              {generatedQuestions.length} {language === "en" ? "questions" : "ප්‍රශ්න"} • {content.difficulties[difficulty]} • {topic}
            </p>
            <div className="space-y-3">
              <Button
                onClick={() => onQuestionsGenerated(generatedQuestions)}
                className={`w-full bg-gradient-to-r ${meta.color} text-white py-5 text-base rounded-xl hover:opacity-90`}
              >
                <Target className="w-5 h-5 mr-2" />
                {content.startQuiz}
              </Button>
              <Button onClick={() => setGenerated(false)} variant="outline" className="w-full">
                {content.regenerate}
              </Button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
