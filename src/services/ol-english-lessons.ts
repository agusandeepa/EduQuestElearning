import type { Lesson } from './types';

// Grade 10 & 11 O/L English Language & Literature - Sri Lankan Syllabus
// Based on Department of Examinations Sri Lanka O/L English paper pattern
export const OL_ENGLISH_LESSONS: Lesson[] = [

  // ===== UNIT 1: GRAMMAR =====
  {
    id: 2001,
    title: "Parts of Speech",
    description: "Nouns, pronouns, verbs, adjectives, adverbs, prepositions, conjunctions and interjections — foundation of English grammar.",
    level: 1,
    xp_reward: 50,
    content: {
      text: `Parts of Speech

Every word in a sentence belongs to one of 8 parts of speech.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. NOUN — Names a person, place, thing or idea.
   • Common noun: teacher, city, book
   • Proper noun: Colombo, Ravi, Monday (always capitalized)
   • Abstract noun: happiness, freedom, love
   • Collective noun: a flock of birds, a team of players

2. PRONOUN — Replaces a noun to avoid repetition.
   • Personal: I, you, he, she, it, we, they
   • Possessive: my, your, his, her, its, our, their
   • Relative: who, which, that
   Example: Ravi is a student. He studies hard.

3. VERB — Shows action or state of being.
   • Action verb: run, write, eat, think
   • Linking verb: is, am, are, was, were, seem, become
   • Auxiliary verb: have, has, do, will, can, should

4. ADJECTIVE — Describes a noun or pronoun.
   • The tall building / a beautiful flower / three cats
   • Articles (a, an, the) are also adjectives

5. ADVERB — Modifies a verb, adjective or another adverb.
   • Manner: quickly, carefully, well
   • Time: yesterday, now, soon, already
   • Place: here, there, everywhere
   • Frequency: always, never, often, sometimes

6. PREPOSITION — Shows relationship between noun and other words.
   • at, in, on, by, for, with, about, between, through
   Example: The book is on the table.

7. CONJUNCTION — Joins words, phrases or clauses.
   • Coordinating: for, and, nor, but, or, yet, so (FANBOYS)
   • Subordinating: because, although, when, if, since, unless
   • Correlative: either...or, neither...nor, both...and

8. INTERJECTION — Expresses strong emotion.
   • Oh! Wow! Hurray! Oops! Alas!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EXAM TIP:
In O/L papers, you are often asked to:
→ Identify the part of speech of an underlined word
→ Fill in blanks with correct word forms
→ Remember: the same word can be different parts of speech depending on context
   Example: "run" can be a verb (I run fast) or noun (a run in the park)`
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "Identify the part of speech of the underlined word: 'She speaks VERY clearly.'",
          options: ["Adjective", "Adverb", "Preposition", "Conjunction"],
          correct_answer: 1,
        },
        {
          id: 2,
          question: "Which sentence contains a collective noun?",
          options: ["The dog barked loudly.", "A pride of lions roared.", "She runs every morning.", "He is very clever."],
          correct_answer: 1,
        },
        {
          id: 3,
          question: "Choose the correct conjunction: 'I wanted to go _____ it was raining heavily.'",
          options: ["and", "but", "or", "so"],
          correct_answer: 1,
        },
        {
          id: 4,
          question: "Which word is an abstract noun?",
          options: ["Mountain", "Teacher", "Courage", "Flower"],
          correct_answer: 2,
        },
        {
          id: 5,
          question: "Identify the verb type in: 'The soup SMELLS delicious.'",
          options: ["Action verb", "Auxiliary verb", "Linking verb", "Transitive verb"],
          correct_answer: 2,
        },
      ],
    },
  },

  {
    id: 2002,
    title: "Tenses — Simple, Continuous & Perfect",
    description: "All 12 tenses with formation rules, signal words and common O/L exam usage.",
    level: 1,
    xp_reward: 50,
    content: {
      text: `English Tenses

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SIMPLE TENSES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Simple Present:  Subject + V1 (s/es for he/she/it)
  Use: habits, facts, general truths
  Signal words: always, usually, often, never, every day
  Example: She walks to school every day.

Simple Past:  Subject + V2
  Use: completed actions in the past
  Signal words: yesterday, last week, ago, in 2010
  Example: They visited the museum yesterday.

Simple Future:  Subject + will + V1
  Use: predictions, decisions, promises
  Signal words: tomorrow, next week, soon
  Example: He will finish the project tomorrow.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTINUOUS TENSES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Present Continuous:  Subject + is/am/are + V-ing
  Use: actions happening RIGHT NOW, temporary situations
  Signal words: now, at the moment, currently, look!
  Example: The children are playing in the garden now.

Past Continuous:  Subject + was/were + V-ing
  Use: ongoing action interrupted by another past action
  Signal words: while, when, as
  Example: She was reading when the phone rang.

Future Continuous:  Subject + will be + V-ing
  Use: action in progress at a future time
  Example: This time tomorrow, I will be travelling to Kandy.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PERFECT TENSES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Present Perfect:  Subject + have/has + V3
  Use: past action with present relevance, experience
  Signal words: already, yet, just, ever, never, since, for
  Example: I have already finished my homework.

Past Perfect:  Subject + had + V3
  Use: action completed BEFORE another past action
  Signal words: before, after, by the time, when
  Example: By the time she arrived, they had already left.

Future Perfect:  Subject + will have + V3
  Use: action completed before a future time
  Example: By next year, she will have graduated.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EXAM TIP — Common O/L Questions:
→ Fill in the blank with correct tense
→ Identify the tense of a sentence
→ Correct the error in tense usage
→ Rewrite sentences changing tense`
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "Choose the correct tense: 'By the time I arrived, she _____ already left.'",
          options: ["has", "had", "have", "was"],
          correct_answer: 1,
        },
        {
          id: 2,
          question: "Which sentence is in the Present Perfect tense?",
          options: ["She was cooking dinner.", "He has visited Paris twice.", "They will go tomorrow.", "I study every day."],
          correct_answer: 1,
        },
        {
          id: 3,
          question: "Fill in: 'Look! The children _____ in the rain.'",
          options: ["play", "played", "are playing", "have played"],
          correct_answer: 2,
        },
        {
          id: 4,
          question: "Identify the tense: 'She had been studying for three hours before the exam started.'",
          options: ["Past Perfect", "Past Continuous", "Past Perfect Continuous", "Simple Past"],
          correct_answer: 2,
        },
        {
          id: 5,
          question: "Choose the correct form: 'I _____ this song since I was a child.'",
          options: ["know", "knew", "have known", "had known"],
          correct_answer: 2,
        },
      ],
    },
  },

  {
    id: 2003,
    title: "Active & Passive Voice",
    description: "Understanding active and passive voice transformations — a key O/L exam topic.",
    level: 1,
    xp_reward: 50,
    content: {
      text: `Active and Passive Voice

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ACTIVE VOICE
Subject + Verb + Object
The focus is on WHO does the action.
Example: The teacher explained the lesson.
         (Subject = teacher, doing the action)

PASSIVE VOICE
Object + be verb + Past Participle (+ by + Subject)
The focus is on WHAT is done or WHO receives the action.
Example: The lesson was explained by the teacher.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONVERSION RULES BY TENSE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Simple Present:
  Active:  She writes a letter.
  Passive: A letter is written by her.

Simple Past:
  Active:  He broke the window.
  Passive: The window was broken by him.

Simple Future:
  Active:  They will build a bridge.
  Passive: A bridge will be built by them.

Present Continuous:
  Active:  She is baking a cake.
  Passive: A cake is being baked by her.

Past Continuous:
  Active:  They were repairing the road.
  Passive: The road was being repaired by them.

Present Perfect:
  Active:  He has painted the wall.
  Passive: The wall has been painted by him.

Modal Verbs:
  Active:  You must complete the task.
  Passive: The task must be completed by you.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PRONOUN CHANGES in Passive:
  I → me        We → us
  He → him      She → her
  They → them   Who → whom

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WHEN TO USE PASSIVE:
• When the doer is unknown: The car was stolen.
• When the doer is unimportant: Rice is grown in Sri Lanka.
• In formal/scientific writing

EXAM TIP:
→ Change active to passive (and vice versa) is very common
→ Don't forget to change the pronoun
→ The tense of 'be' must match the original tense`
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "Change to passive: 'The students cleaned the classroom.'",
          options: [
            "The classroom is cleaned by the students.",
            "The classroom was cleaned by the students.",
            "The classroom has been cleaned by the students.",
            "The classroom were cleaned by the students."
          ],
          correct_answer: 1,
        },
        {
          id: 2,
          question: "Change to active: 'A letter is being written by her.'",
          options: [
            "She wrote a letter.",
            "She writes a letter.",
            "She is writing a letter.",
            "She has written a letter."
          ],
          correct_answer: 2,
        },
        {
          id: 3,
          question: "Which is the correct passive form of: 'They have built a new hospital.'?",
          options: [
            "A new hospital was built by them.",
            "A new hospital has been built by them.",
            "A new hospital is built by them.",
            "A new hospital had been built by them."
          ],
          correct_answer: 1,
        },
        {
          id: 4,
          question: "Change to passive: 'Someone stole my bicycle.'",
          options: [
            "My bicycle is stolen.",
            "My bicycle has been stolen.",
            "My bicycle was stolen.",
            "My bicycle had been stolen."
          ],
          correct_answer: 2,
        },
        {
          id: 5,
          question: "Identify the passive sentence:",
          options: [
            "The dog chased the cat.",
            "Rice is eaten by many Sri Lankans.",
            "She will complete the work.",
            "They are building a house."
          ],
          correct_answer: 1,
        },
      ],
    },
  },

  {
    id: 2004,
    title: "Reported Speech (Direct & Indirect)",
    description: "Converting direct speech to indirect speech — tense changes, pronoun changes, time expressions.",
    level: 1,
    xp_reward: 50,
    content: {
      text: `Reported Speech (Direct & Indirect Speech)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DIRECT SPEECH: The exact words spoken, in quotation marks.
  He said, "I am tired."

INDIRECT SPEECH: Reporting what someone said, without quotation marks.
  He said that he was tired.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TENSE CHANGES (Backshift):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Direct              →  Indirect
am/is/are           →  was/were
was/were            →  had been
has/have            →  had
will                →  would
can                 →  could
may                 →  might
shall               →  should
Simple Present      →  Simple Past
Simple Past         →  Past Perfect
Present Continuous  →  Past Continuous

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PRONOUN CHANGES:
  "I" → he/she (depending on speaker)
  "we" → they
  "my" → his/her
  "you" → I/he/she/they (depending on listener)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TIME & PLACE EXPRESSION CHANGES:
  now          → then
  today        → that day
  yesterday    → the day before / the previous day
  tomorrow     → the next day / the following day
  here         → there
  this         → that
  these        → those
  last week    → the previous week

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
REPORTING QUESTIONS:
Yes/No questions → asked if/whether
  "Are you ready?" → She asked if I was ready.

Wh- questions → use the wh- word
  "Where do you live?" → He asked where I lived.
  (No auxiliary, verb goes after subject!)

REPORTING COMMANDS/REQUESTS:
  told + object + to + infinitive
  "Close the door." → She told him to close the door.
  "Please help me." → He asked her to help him.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EXAM TIP:
→ This is a VERY common O/L exam question
→ Write "said that" or "told + person + that" for statements
→ Never use quotation marks in indirect speech`
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "Change to indirect speech: He said, 'I will come tomorrow.'",
          options: [
            "He said that he will come tomorrow.",
            "He said that he would come the next day.",
            "He said that he comes the next day.",
            "He told that he would come tomorrow."
          ],
          correct_answer: 1,
        },
        {
          id: 2,
          question: "Change to indirect speech: She asked, 'Do you like cricket?'",
          options: [
            "She asked if I liked cricket.",
            "She asked whether I like cricket.",
            "She asked if do I like cricket.",
            "She asked that I liked cricket."
          ],
          correct_answer: 0,
        },
        {
          id: 3,
          question: "Change to indirect speech: The teacher said, 'Open your books.'",
          options: [
            "The teacher said to open your books.",
            "The teacher told to open their books.",
            "The teacher told them to open their books.",
            "The teacher said that open books."
          ],
          correct_answer: 2,
        },
        {
          id: 4,
          question: "Which word does 'now' change to in indirect speech?",
          options: ["soon", "then", "that time", "here"],
          correct_answer: 1,
        },
        {
          id: 5,
          question: "Change to direct speech: She said that she had finished her homework.",
          options: [
            "She said, 'I finished my homework.'",
            "She said, 'I have finished my homework.'",
            "She said, 'I had finished my homework.'",
            "She said, 'She has finished her homework.'"
          ],
          correct_answer: 1,
        },
      ],
    },
  },

  {
    id: 2005,
    title: "Conditionals (If Clauses)",
    description: "Zero, First, Second and Third conditionals — structure, usage and O/L exam patterns.",
    level: 1,
    xp_reward: 50,
    content: {
      text: `Conditional Sentences (If Clauses)

Conditional sentences have two parts:
• IF clause (condition) + Main clause (result)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ZERO CONDITIONAL — General truths / facts
Structure: If + Simple Present, Simple Present
Use: Things that are always true
Example: If you heat water to 100°C, it boils.
         If it rains, the ground gets wet.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FIRST CONDITIONAL — Real / possible future situations
Structure: If + Simple Present, will + V1
Use: Situations likely to happen
Example: If it rains tomorrow, we will cancel the picnic.
         If you study hard, you will pass the exam.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECOND CONDITIONAL — Unreal / imaginary present or future
Structure: If + Simple Past, would + V1
Use: Hypothetical, unlikely or impossible situations
Example: If I had a million rupees, I would travel the world.
         If she were the president, she would change the laws.
Note: Use "were" (not "was") for all subjects in formal writing

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
THIRD CONDITIONAL — Unreal past (things that didn't happen)
Structure: If + Past Perfect, would have + V3
Use: Imagining a different past; expressing regret
Example: If I had studied harder, I would have passed the exam.
         If she had left earlier, she would not have missed the bus.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MIXED CONDITIONAL — Combines 2nd and 3rd
If + Past Perfect, would + V1
Example: If I had taken medicine yesterday, I would feel better now.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EXAM TIP:
→ You can start with the main clause first (no comma needed):
   We will cancel the picnic if it rains tomorrow.
→ Very common: rewrite sentences using the correct conditional
→ Watch for the signal: "wish" sentences use 2nd and 3rd conditional patterns
   I wish I had more time. (2nd)
   I wish I had studied harder. (3rd)`
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "Complete: 'If I _____ a bird, I would fly to the mountains.'",
          options: ["am", "was", "were", "will be"],
          correct_answer: 2,
        },
        {
          id: 2,
          question: "Which conditional is: 'If you heat ice, it melts.'?",
          options: ["First conditional", "Second conditional", "Zero conditional", "Third conditional"],
          correct_answer: 2,
        },
        {
          id: 3,
          question: "Complete: 'If she had called me, I _____ helped her.'",
          options: ["would have", "will have", "would", "had"],
          correct_answer: 0,
        },
        {
          id: 4,
          question: "Choose the correct sentence (First Conditional):",
          options: [
            "If it rains, we stayed home.",
            "If it rains, we will stay home.",
            "If it rained, we would stay home.",
            "If it had rained, we would have stayed home."
          ],
          correct_answer: 1,
        },
        {
          id: 5,
          question: "Rewrite using Third Conditional: 'She didn't study, so she failed.'",
          options: [
            "If she studied, she wouldn't fail.",
            "If she had studied, she would not have failed.",
            "If she studies, she will not fail.",
            "If she were to study, she would not fail."
          ],
          correct_answer: 1,
        },
      ],
    },
  },

  // ===== UNIT 2: COMPREHENSION =====
  {
    id: 2006,
    title: "Reading Comprehension — Strategies & Skills",
    description: "How to read passages, find main ideas, infer meaning and answer comprehension questions correctly.",
    level: 2,
    xp_reward: 55,
    content: {
      text: `Reading Comprehension Skills

In the O/L English paper, comprehension passages test your ability to:
• Understand the main idea
• Find specific details
• Infer meaning
• Understand vocabulary in context
• Identify the author's purpose/tone

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TYPES OF COMPREHENSION QUESTIONS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. LITERAL questions — Answer is directly in the text
   • "According to the passage, what is...?"
   • Strategy: Locate the relevant sentence and paraphrase it.

2. INFERENTIAL questions — Answer is implied, not stated
   • "What does the writer suggest about...?"
   • Strategy: Read between the lines; use context clues.

3. VOCABULARY questions — Word meaning from context
   • "What does the word '___' mean in paragraph 2?"
   • Strategy: Read the sentence before and after; find synonyms.

4. MAIN IDEA questions
   • "What is the main idea of the passage?"
   • Strategy: It is usually in the first or last paragraph; avoid very specific details.

5. TRUE / FALSE questions
   • Carefully check every word; "all", "never", "always" are traps.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP-BY-STEP APPROACH:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Step 1: Read the questions FIRST — know what to look for
Step 2: Read the passage carefully — don't rush
Step 3: Underline key words in questions
Step 4: Find the relevant part of the passage
Step 5: Answer in complete sentences (unless told otherwise)
Step 6: Use your OWN words — do not copy full sentences

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ANSWERING TIPS:
• Begin answers with the question words when possible
  Q: "Why did the farmer work hard?"
  A: "The farmer worked hard because..."
• Do NOT begin with "Because" alone
• Word limit — stay within it
• Write clearly and neatly — marks can be lost for illegible writing

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TONE & ATTITUDE VOCABULARY:
Positive: enthusiastic, optimistic, appreciative, humorous
Negative: critical, pessimistic, sarcastic, disapproving
Neutral: informative, objective, factual, descriptive`
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "In a comprehension passage, an 'inferential' question asks you to:",
          options: [
            "Copy a sentence directly from the text",
            "Find information that is stated word-for-word",
            "Read between the lines and use context",
            "Summarize the whole passage"
          ],
          correct_answer: 2,
        },
        {
          id: 2,
          question: "When asked for the meaning of an unfamiliar word, the best strategy is to:",
          options: [
            "Guess randomly",
            "Skip the question",
            "Look at the context of surrounding sentences",
            "Use the word's spelling to guess"
          ],
          correct_answer: 2,
        },
        {
          id: 3,
          question: "Which is the correct way to begin a comprehension answer to 'Why did she leave early?'",
          options: [
            "Because she was tired.",
            "She left early because she was tired.",
            "Tired, she left early.",
            "Left early because of tiredness."
          ],
          correct_answer: 1,
        },
        {
          id: 4,
          question: "The main idea of a passage is usually found:",
          options: [
            "Only in the middle paragraphs",
            "In the first or last paragraph",
            "Only in dialogue sections",
            "Never stated directly"
          ],
          correct_answer: 1,
        },
        {
          id: 5,
          question: "A passage written in an 'objective' tone means the writer:",
          options: [
            "Strongly supports one side",
            "Tries to entertain with humor",
            "Presents facts without personal opinion",
            "Expresses sadness and regret"
          ],
          correct_answer: 2,
        },
      ],
    },
  },

  {
    id: 2007,
    title: "Comprehension — Practice Passage (Environment)",
    description: "A full O/L-style comprehension passage on the environment with all question types.",
    level: 2,
    xp_reward: 60,
    content: {
      text: `COMPREHENSION PRACTICE PASSAGE

Read the following passage carefully:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
THE IMPORTANCE OF PROTECTING OUR FORESTS

   Forests cover approximately 31% of the Earth's total land area. They are home to more than 80% of the world's land animals, plants and insects. Yet, every year, millions of hectares of forest are destroyed due to deforestation — the clearing of trees by humans for agriculture, logging and urban development.

   Deforestation has severe consequences. When trees are cut down, the carbon they stored is released into the atmosphere as carbon dioxide, contributing to climate change. Without tree roots to hold soil in place, heavy rains cause soil erosion and flooding. Communities that depend on forests for food, medicine and livelihoods lose everything when forests disappear.

   In Sri Lanka, forests once covered nearly 80% of the island. Today, that figure has dropped to around 29%. The Sinharaja Forest Reserve, a UNESCO World Heritage Site, is one of the last remaining patches of tropical rainforest in Sri Lanka. It provides a home for many endemic species — animals and plants found nowhere else on Earth.

   Conservation efforts are underway. The government has established national parks and protected zones. Community-based programmes educate villagers about sustainable farming that does not require burning forests. Young people are planting trees through school programmes, giving the forests a chance to recover.

   The future of our forests depends on every individual. Small actions — refusing to use products made from illegally logged wood, planting a tree in your garden, or simply spreading awareness — can make a difference. After all, we do not inherit the Earth from our ancestors; we borrow it from our children.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

GLOSSARY:
• deforestation — cutting down large areas of forest
• endemic — native to a particular place only
• sustainable — able to continue without harming the environment
• livelihoods — ways people earn their living

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HOW TO ANSWER (Exam Format):

Q: What percentage of Earth's land is covered by forests?
A: Approximately 31% of the Earth's land area is covered by forests.

Q: Name TWO consequences of deforestation mentioned in the passage.
A: Two consequences are: (i) the release of carbon dioxide which contributes to climate change, and (ii) soil erosion and flooding caused by the removal of tree roots.

Q: What does the word 'endemic' mean as used in paragraph 3?
A: The word 'endemic' means native to or found only in a particular place.

Q: What is the writer's main message in the final paragraph?
A: The writer's main message is that every individual can help save forests through small but meaningful actions.`
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "According to the passage, what percentage of forest remains in Sri Lanka today?",
          options: ["80%", "31%", "29%", "50%"],
          correct_answer: 2,
        },
        {
          id: 2,
          question: "Why is the Sinharaja Forest Reserve significant?",
          options: [
            "It is the largest forest in Asia.",
            "It is a UNESCO World Heritage Site with endemic species.",
            "It was planted by the government recently.",
            "It covers 80% of Sri Lanka."
          ],
          correct_answer: 1,
        },
        {
          id: 3,
          question: "What does 'sustainable farming' mean in the context of this passage?",
          options: [
            "Farming that requires cutting down forests",
            "Farming that can continue without harming the environment",
            "Large-scale commercial farming",
            "Farming using chemicals"
          ],
          correct_answer: 1,
        },
        {
          id: 4,
          question: "The tone of the final paragraph is best described as:",
          options: ["Angry and blaming", "Hopeful and encouraging", "Sad and hopeless", "Humorous and light"],
          correct_answer: 1,
        },
        {
          id: 5,
          question: "What does the last sentence ('we do not inherit...') suggest?",
          options: [
            "We should take everything from the environment.",
            "The environment belongs to our ancestors.",
            "We have a responsibility to preserve the Earth for future generations.",
            "Children should not be involved in environmental issues."
          ],
          correct_answer: 2,
        },
      ],
    },
  },

  // ===== UNIT 3: WRITING =====
  {
    id: 2008,
    title: "Essay Writing — Structure & Types",
    description: "How to write formal essays — argumentative, descriptive, narrative and discursive — with O/L exam format.",
    level: 3,
    xp_reward: 60,
    content: {
      text: `Essay Writing for O/L English

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ESSAY STRUCTURE (5-Paragraph Format):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

INTRODUCTION (Paragraph 1):
• Hook — an interesting opening sentence
• Background — brief context
• Thesis statement — your main argument/point

BODY PARAGRAPH 1 (Point 1 + Example + Explanation)
BODY PARAGRAPH 2 (Point 2 + Example + Explanation)
BODY PARAGRAPH 3 (Point 3 + Example + Explanation)

CONCLUSION (Final Paragraph):
• Restate thesis in different words
• Summarize main points
• Closing thought / call to action

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TYPES OF ESSAYS IN O/L EXAM:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. NARRATIVE ESSAY — Tells a story (real or imaginary)
   • Use past tense, first person (I)
   • Include: characters, setting, problem, climax, resolution
   • Topics: An unforgettable day / A frightening experience

2. DESCRIPTIVE ESSAY — Describes a person, place or thing
   • Use vivid adjectives and sensory details (sight, sound, smell)
   • Topics: Describe your hometown / A person you admire

3. ARGUMENTATIVE / PERSUASIVE ESSAY — Takes a clear position
   • State your opinion clearly
   • Give reasons with evidence
   • Acknowledge and counter the opposing view
   • Topics: Should school uniforms be compulsory? / Technology in education

4. DISCURSIVE ESSAY — Presents BOTH sides of an issue
   • Present both advantages and disadvantages
   • Use linking words: However, On the other hand, Although
   • End with a balanced conclusion
   • Topics: Advantages and disadvantages of social media

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
USEFUL LINKING WORDS:
Addition:    Furthermore, Moreover, In addition, Also
Contrast:    However, Nevertheless, On the other hand, Although
Cause:       Because, Since, As a result, Therefore, Thus
Example:     For instance, For example, Such as, To illustrate
Conclusion:  In conclusion, To sum up, Finally, Therefore

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
O/L EXAM MARKING CRITERIA:
• Content — relevant, well-developed ideas (40%)
• Language — grammar, vocabulary, sentence variety (40%)
• Format — correct structure and paragraphing (20%)

EXAM TIP:
→ Write at least 200–250 words
→ Plan before you write (2 minutes for outline)
→ Use a variety of sentence structures
→ Avoid repetition — use synonyms`
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "In an essay, the THESIS STATEMENT is found in the:",
          options: ["Conclusion", "Body paragraph", "Introduction", "Title"],
          correct_answer: 2,
        },
        {
          id: 2,
          question: "Which type of essay presents BOTH advantages and disadvantages?",
          options: ["Narrative", "Descriptive", "Argumentative", "Discursive"],
          correct_answer: 3,
        },
        {
          id: 3,
          question: "Which linking word best introduces a CONTRASTING idea?",
          options: ["Furthermore", "Therefore", "However", "For instance"],
          correct_answer: 2,
        },
        {
          id: 4,
          question: "For a narrative essay, which tense is most commonly used?",
          options: ["Simple Present", "Simple Past", "Future Perfect", "Present Continuous"],
          correct_answer: 1,
        },
        {
          id: 5,
          question: "A good essay conclusion should:",
          options: [
            "Introduce completely new points",
            "Copy the introduction word for word",
            "Restate the thesis and summarize main points",
            "Only give examples"
          ],
          correct_answer: 2,
        },
      ],
    },
  },

  {
    id: 2009,
    title: "Letter Writing — Formal & Informal",
    description: "Writing formal letters (complaint, application, request) and informal letters — O/L exam format.",
    level: 3,
    xp_reward: 55,
    content: {
      text: `Letter Writing

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INFORMAL LETTER (to a friend or relative)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FORMAT:
[Your address — top right]
[Date]

[Greeting] Dear Saman, / Dear Aunty,

[Opening paragraph] — Ask about their wellbeing
  "I hope this letter finds you in good health..."

[Body] — Main purpose, news, experiences

[Closing paragraph] — Wishes, mention of next letter
  "Give my love to the family..."

[Sign-off] Your friend, / With love,
[Your name]

Language: Friendly, casual, contractions (I'm, don't), first person

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FORMAL LETTER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FORMAT:
[Your address — top right]
[Date]
[Recipient's name/title]
[Recipient's address — left side]

[Salutation]
  Known name:   Dear Mr. Perera, / Dear Ms. Silva,
  Unknown name: Dear Sir, / Dear Madam,

[Subject line] — e.g., Re: Application for the Post of...

[Opening] — State purpose clearly
  "I am writing with reference to..."
  "I wish to bring to your attention..."

[Body] — Develop your point with facts and details

[Closing]
  "I look forward to a favourable response."
  "I hope this matter will receive your prompt attention."

[Sign-off]
  Known name:   Yours sincerely,
  Unknown name: Yours faithfully,
[Your full name]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
COMMON FORMAL LETTER TYPES IN O/L:
• Letter of complaint (to a shop/authority)
• Letter of application (for a job/position)
• Letter requesting information
• Letter to a newspaper editor

IMPORTANT RULES:
• NEVER use contractions in formal letters (don't → do not)
• Use formal vocabulary throughout
• Be polite even when complaining
• Yours sincerely = when you know the name
• Yours faithfully = when you DON'T know the name`
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "In a formal letter, when you do NOT know the recipient's name, you should end with:",
          options: ["Yours sincerely,", "With love,", "Yours faithfully,", "Best regards,"],
          correct_answer: 2,
        },
        {
          id: 2,
          question: "Which of the following is correct for a FORMAL letter?",
          options: [
            "I'm writing to tell you about the problem.",
            "I am writing to bring this matter to your attention.",
            "Hope you're doing well!",
            "Can't believe what happened!"
          ],
          correct_answer: 1,
        },
        {
          id: 3,
          question: "In an informal letter, where does your address go?",
          options: ["Bottom left", "Top left", "Top right", "Middle of the page"],
          correct_answer: 2,
        },
        {
          id: 4,
          question: "Which opening is suitable for a letter of complaint?",
          options: [
            "Dear Nimal, how are you?",
            "I am writing to express my dissatisfaction with your service.",
            "Hey! You won't believe what happened!",
            "I hope this letter finds you well."
          ],
          correct_answer: 1,
        },
        {
          id: 5,
          question: "Which sign-off is correct when writing to 'Dear Mr. Fernando,'?",
          options: ["Yours faithfully,", "Yours sincerely,", "With love,", "Best wishes,"],
          correct_answer: 1,
        },
      ],
    },
  },

  {
    id: 2010,
    title: "Summary Writing",
    description: "How to write accurate, concise summaries — O/L exam technique for reducing a passage to key points.",
    level: 3,
    xp_reward: 55,
    content: {
      text: `Summary Writing

In the O/L exam, you will be asked to:
"Write a summary of the passage in about __ words."
"List the main points of the passage."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP-BY-STEP METHOD:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STEP 1: Read the passage carefully (twice if needed)
STEP 2: Identify the TOPIC of the passage
STEP 3: Find the MAIN POINT of each paragraph (ignore examples and minor details)
STEP 4: Write the main points in YOUR OWN WORDS
STEP 5: Connect points using linking words
STEP 6: Check the word count — stay within limits

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WHAT TO INCLUDE:
✓ Main ideas and key facts
✓ The writer's main argument
✓ Important conclusions

WHAT TO LEAVE OUT:
✗ Examples and illustrations
✗ Repeated information
✗ Direct quotes
✗ Minor details and statistics (unless essential)
✗ The writer's exact words

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LANGUAGE TIPS:
• Write in the THIRD PERSON (he, she, they, the writer)
• Use the PRESENT tense for the writer's ideas:
  "The writer states that..." / "The passage explains..."
• Use your own vocabulary — paraphrase, don't copy

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
COMMON MISTAKES TO AVOID:
• Copying sentences directly from the passage
• Including your own opinions
• Going over the word limit
• Missing the main point of a paragraph
• Starting with "This passage is about..."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EXAMPLE:
Original: "Forests cover approximately 31% of the Earth's land. They are home to over 80% of land animals. Deforestation destroys millions of hectares every year."

Summary: Forests, which cover nearly a third of the Earth and shelter most land wildlife, are being rapidly destroyed by deforestation.

(Reduced from 3 sentences to 1 — main facts kept, minor details removed)`
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "In summary writing, which should you LEAVE OUT?",
          options: ["Main ideas", "Key arguments", "Examples and minor details", "The writer's conclusions"],
          correct_answer: 2,
        },
        {
          id: 2,
          question: "Which tense is recommended when referring to the writer's ideas in a summary?",
          options: ["Past tense", "Present tense", "Future tense", "Past perfect"],
          correct_answer: 1,
        },
        {
          id: 3,
          question: "A good summary should be written in:",
          options: [
            "The exact words of the original passage",
            "Your own words",
            "First person (I, my)",
            "The future tense only"
          ],
          correct_answer: 1,
        },
        {
          id: 4,
          question: "What should be the FIRST step in summary writing?",
          options: [
            "Start writing immediately",
            "Count the words",
            "Read the passage carefully to understand the main ideas",
            "Look up difficult words in a dictionary"
          ],
          correct_answer: 2,
        },
        {
          id: 5,
          question: "Which is the best opening for a summary?",
          options: [
            "This passage is about forests.",
            "I think forests are important.",
            "The passage discusses the importance of forests and the threat of deforestation.",
            "According to the text, 'Forests cover 31% of Earth.'"
          ],
          correct_answer: 2,
        },
      ],
    },
  },

  // ===== UNIT 4: VOCABULARY =====
  {
    id: 2011,
    title: "Vocabulary — Synonyms, Antonyms & Word Forms",
    description: "Building vocabulary through synonyms, antonyms, word families and context — essential for O/L papers.",
    level: 4,
    xp_reward: 50,
    content: {
      text: `Vocabulary Building

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SYNONYMS — Words with similar meaning
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
happy → joyful, delighted, cheerful, pleased, content
sad → miserable, unhappy, sorrowful, gloomy, downcast
big → large, enormous, huge, massive, vast
small → tiny, little, miniature, petite, microscopic
important → significant, crucial, vital, essential, critical
difficult → challenging, hard, demanding, complex, tough
beautiful → attractive, gorgeous, stunning, lovely, elegant
fast → rapid, swift, speedy, quick, hasty
show → demonstrate, display, exhibit, reveal, present
help → assist, aid, support, contribute, facilitate

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ANTONYMS — Words with opposite meaning
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ancient ↔ modern        success ↔ failure
accept ↔ reject         increase ↔ decrease
praise ↔ criticize      courage ↔ cowardice
innocent ↔ guilty       generous ↔ stingy
optimistic ↔ pessimistic  rural ↔ urban

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WORD FAMILIES (same root, different parts of speech):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Noun         Verb        Adjective    Adverb
beauty       beautify    beautiful    beautifully
decision     decide      decisive     decisively
education    educate     educational  educationally
pollution    pollute     polluted     —
solution     solve       solvable     —
knowledge    know        knowledgeable knowledgeably
danger       endanger    dangerous    dangerously
imagination  imagine     imaginative  imaginatively

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
COMMON PREFIXES & SUFFIXES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Prefix    Meaning    Example
un-       not        unhappy, unfair, unknown
dis-      not/away   disagree, dishonest, disappear
re-       again      rewrite, rebuild, recycle
mis-      wrongly    misunderstand, misuse, mislead
over-     too much   overwork, overcrowded, overlook
pre-      before     preview, prehistoric, prepare

Suffix    Meaning           Example
-ful      full of           careful, hopeful, painful
-less     without           careless, homeless, hopeless
-ment     state/action      development, improvement, movement
-tion/-sion  action/state   education, decision, pollution
-ness     state of being    happiness, sadness, darkness
-ous      having quality of  dangerous, famous, generous

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EXAM TIP:
→ Use context clues to guess word meanings
→ Word family questions: "Use the correct form of the word in brackets"
→ Example: "The teacher gave a ________ (decide) answer." → decisive`
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "Choose the best SYNONYM for 'crucial':",
          options: ["unimportant", "vital", "similar", "distant"],
          correct_answer: 1,
        },
        {
          id: 2,
          question: "What is the ANTONYM of 'generous'?",
          options: ["kind", "wealthy", "stingy", "honest"],
          correct_answer: 2,
        },
        {
          id: 3,
          question: "Choose the correct word form: 'His speech was very _______ (impress).'",
          options: ["impress", "impression", "impressive", "impressively"],
          correct_answer: 2,
        },
        {
          id: 4,
          question: "The prefix 'mis-' means:",
          options: ["again", "not/wrongly", "before", "too much"],
          correct_answer: 1,
        },
        {
          id: 5,
          question: "Which word means 'full of hope'?",
          options: ["hopeless", "hopefulness", "hopefully", "hopeful"],
          correct_answer: 3,
        },
      ],
    },
  },

  // ===== UNIT 5: LITERATURE =====
  {
    id: 2012,
    title: "Poetry — Analysis & Literary Devices",
    description: "Understanding poems, identifying literary devices (simile, metaphor, personification) and answering poetry questions.",
    level: 5,
    xp_reward: 60,
    content: {
      text: `Poetry Analysis

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LITERARY DEVICES (Figures of Speech):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SIMILE — Compares two things using 'like' or 'as'
  "Her smile was as bright as the sun."
  "He ran like the wind."

METAPHOR — States one thing IS another (no 'like' or 'as')
  "Life is a journey."
  "The classroom was a zoo."

PERSONIFICATION — Giving human qualities to non-human things
  "The wind whispered through the trees."
  "The stars danced in the night sky."

ALLITERATION — Repetition of the same consonant sound at the start of words
  "Peter Piper picked a peck of pickled peppers."
  "The sun sank slowly in the silver sea."

ONOMATOPOEIA — Words that sound like what they describe
  buzz, hiss, splash, crackle, thunder, whisper

HYPERBOLE — Exaggeration for effect
  "I've told you a million times!"
  "She cried an ocean of tears."

RHYME — Words with the same ending sound
  moon/June, day/say, light/night

REPETITION — Repeating a word or phrase for emphasis
  "We shall fight on the beaches, we shall fight on the landing grounds..."

IMAGERY — Language that appeals to the senses (sight, sound, smell, touch, taste)
  "The golden leaves fell softly to the damp earth."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RHYME SCHEME — Pattern of rhymes (labelled A, B, C...)
  "Roses are red,"     — A
  "Violets are blue,"  — B
  "Sugar is sweet,"    — A (if it rhymed with red)
  "And so are you."    — B

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HOW TO ANSWER POETRY QUESTIONS:
• "What does the poet mean by ___?"
  → Explain in your own words what the image suggests
• "What figure of speech is used?"
  → Name it, quote the example, explain the effect
• "What is the mood/tone of the poem?"
  → Is it joyful, melancholic, fearful, hopeful, angry?

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EXAM TIP:
When identifying a figure of speech:
1. Name it (simile, metaphor etc.)
2. Quote the exact words
3. Explain the effect/meaning`
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "'The moon was a ghostly galleon tossed upon cloudy seas.' This is an example of:",
          options: ["Simile", "Metaphor", "Personification", "Alliteration"],
          correct_answer: 1,
        },
        {
          id: 2,
          question: "'The leaves laughed in the breeze.' What figure of speech is this?",
          options: ["Hyperbole", "Onomatopoeia", "Personification", "Simile"],
          correct_answer: 2,
        },
        {
          id: 3,
          question: "Which sentence contains a SIMILE?",
          options: [
            "The city never sleeps.",
            "He was a lion in battle.",
            "Her voice was like music to his ears.",
            "The thunder roared angrily."
          ],
          correct_answer: 2,
        },
        {
          id: 4,
          question: "'She cried a river of tears.' This is an example of:",
          options: ["Alliteration", "Onomatopoeia", "Simile", "Hyperbole"],
          correct_answer: 3,
        },
        {
          id: 5,
          question: "Which of the following is an example of ALLITERATION?",
          options: [
            "The bee buzzed busily by the blooming bush.",
            "Life is like a box of chocolates.",
            "The sea roared with anger.",
            "He waited for a million years."
          ],
          correct_answer: 0,
        },
      ],
    },
  },

  {
    id: 2013,
    title: "Prose & Drama — Story Analysis",
    description: "Analysing short stories and drama extracts — characters, themes, plot, setting and exam answering technique.",
    level: 5,
    xp_reward: 60,
    content: {
      text: `Prose and Drama Analysis

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
KEY ELEMENTS OF A STORY / DRAMA:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. PLOT — The sequence of events
   • Exposition: Introduction of characters and setting
   • Rising Action: Events building towards the climax
   • Climax: The turning point / most intense moment
   • Falling Action: Events after the climax
   • Resolution: How the story ends

2. CHARACTERS
   • Protagonist: The main character (hero)
   • Antagonist: The character who opposes the protagonist (villain)
   • Dynamic character: Changes during the story
   • Static character: Does not change
   Ways to understand character:
   → What they SAY, DO, THINK
   → What OTHERS say about them
   → How they LOOK (appearance)

3. SETTING — Time and place of the story
   • Physical setting: Where it happens
   • Time setting: When it happens (era, season, time of day)
   • Atmosphere: The mood created by the setting

4. THEME — The central message or lesson
   Common themes: friendship, courage, justice, sacrifice, identity, nature vs technology
   Example: "The story explores the theme of courage under difficult circumstances."

5. CONFLICT — The problem in the story
   • Man vs Man (character vs character)
   • Man vs Nature (character vs environment)
   • Man vs Self (internal struggle)
   • Man vs Society (character vs community/rules)

6. NARRATIVE POINT OF VIEW
   • First person: "I" — narrator is in the story
   • Third person limited: "he/she" — narrator knows one character's thoughts
   • Third person omniscient: narrator knows ALL characters' thoughts

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ANSWERING LITERATURE QUESTIONS:
• Always QUOTE from the text to support your answer
• Use the format: Point → Quote → Explain (PQE)
  "The character is brave [Point]. We know this because he 'stepped forward without hesitation' [Quote]. This shows that he does not allow fear to stop him [Explain]."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EXAM TIP:
→ Read drama extracts carefully for stage directions (in brackets/italics)
→ Stage directions tell you about mood, action and character emotion
→ For character questions: don't just say "he is kind" — prove it with evidence`
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "The CLIMAX of a story is:",
          options: [
            "The introduction of the characters",
            "The turning point or most intense moment",
            "The ending of the story",
            "The setting of the story"
          ],
          correct_answer: 1,
        },
        {
          id: 2,
          question: "A 'dynamic' character is one who:",
          options: [
            "Appears in every scene",
            "Speaks the most dialogue",
            "Changes or develops during the story",
            "Is always the villain"
          ],
          correct_answer: 2,
        },
        {
          id: 3,
          question: "Which type of conflict is shown when a sailor struggles to survive a storm?",
          options: ["Man vs Man", "Man vs Self", "Man vs Nature", "Man vs Society"],
          correct_answer: 2,
        },
        {
          id: 4,
          question: "In a story told in FIRST PERSON, what pronoun does the narrator use?",
          options: ["He", "She", "I", "They"],
          correct_answer: 2,
        },
        {
          id: 5,
          question: "When answering a literature question, the PQE method stands for:",
          options: [
            "Paragraph, Question, Example",
            "Point, Quote, Explain",
            "Plot, Question, Evidence",
            "Point, Question, Evaluate"
          ],
          correct_answer: 1,
        },
      ],
    },
  },

  // ===== UNIT 6: EXAM PAPER PRACTICE =====
  {
    id: 2014,
    title: "O/L Exam Paper — Section A (Grammar MCQ)",
    description: "Practice the exact O/L English paper Section A format — 25 MCQ grammar questions.",
    level: 6,
    xp_reward: 70,
    content: {
      text: `O/L English Paper — Section A Format

The O/L English paper consists of:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PAPER STRUCTURE (Sri Lanka O/L):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Part I   — Multiple Choice Questions (Grammar, Vocabulary)
Part II  — Reading Comprehension
Part III — Writing (Letter / Essay / Summary)
Part IV  — Literature (Prose, Poetry, Drama)

Total time: 2 hours 30 minutes
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

COMMON GRAMMAR MCQ TOPICS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. ARTICLES (a, an, the)
   Use 'a' before consonant sounds: a book, a university (yoo sound)
   Use 'an' before vowel sounds: an apple, an hour (silent h)
   Use 'the' for specific, known things: the sun, the book I gave you.

2. SUBJECT-VERB AGREEMENT
   • Singular subject → singular verb: The dog barks.
   • Plural subject → plural verb: The dogs bark.
   • Tricky: Everyone/Someone/Nobody + singular verb
     "Everyone IS happy." ✓ (not "are")
   • Either...or / Neither...nor → verb agrees with NEAREST subject
     "Neither the students nor the teacher WAS present." ✓

3. QUESTION TAGS
   Positive statement → negative tag
     "She is smart, ISN'T she?"
   Negative statement → positive tag
     "He can't swim, CAN he?"
   "I am" → "aren't I?" (special case)

4. PREPOSITIONS
   at + specific time: at 7 o'clock, at noon
   on + days/dates: on Monday, on 25th December
   in + months/years/places: in March, in 2024, in Colombo

5. PHRASAL VERBS
   give up = stop trying
   look after = take care of
   bring up = raise (a child)
   put off = postpone
   find out = discover
   turn down = refuse/reject
   carry on = continue
   break down = stop working

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EXAM STRATEGY FOR MCQs:
→ Read all 4 options before choosing
→ Eliminate clearly wrong answers first
→ Check grammar rules if unsure
→ Don't leave any answer blank
→ First instinct is often correct`
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "Choose the correct article: 'She is _____ honest person.'",
          options: ["a", "an", "the", "no article needed"],
          correct_answer: 1,
        },
        {
          id: 2,
          question: "Choose the correct form: 'Neither the teacher nor the students _____ present.'",
          options: ["was", "were", "is", "are"],
          correct_answer: 1,
        },
        {
          id: 3,
          question: "Add the correct question tag: 'You haven't finished, _____?'",
          options: ["have you", "haven't you", "did you", "didn't you"],
          correct_answer: 0,
        },
        {
          id: 4,
          question: "Choose the correct preposition: 'My birthday is _____ the 15th of August.'",
          options: ["in", "at", "on", "by"],
          correct_answer: 2,
        },
        {
          id: 5,
          question: "What does the phrasal verb 'put off' mean?",
          options: ["to start immediately", "to postpone", "to turn off a light", "to give up"],
          correct_answer: 1,
        },
      ],
    },
  },

  {
    id: 2015,
    title: "O/L Exam Paper — Full Practice (Mixed)",
    description: "A complete O/L-style mixed practice test covering all English paper topics — grammar, vocabulary, comprehension and writing.",
    level: 6,
    xp_reward: 70,
    content: {
      text: `O/L English — Full Exam Practice

This is your final revision session. It covers ALL topics from the O/L English paper.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
QUICK REVISION CHECKLIST:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

GRAMMAR ✓
□ Parts of speech (noun, verb, adjective, adverb, preposition, conjunction)
□ All 12 tenses (formation + signal words)
□ Active and passive voice (all tenses)
□ Direct and indirect speech (tense backshift + pronoun changes)
□ Conditional sentences (zero, 1st, 2nd, 3rd)
□ Articles (a, an, the)
□ Subject-verb agreement
□ Question tags
□ Prepositions of time and place
□ Phrasal verbs

VOCABULARY ✓
□ Synonyms and antonyms
□ Word families (noun/verb/adjective/adverb forms)
□ Prefixes and suffixes

READING ✓
□ Comprehension strategies (literal, inferential, vocabulary, main idea)
□ Answering in complete sentences
□ Summary writing technique

WRITING ✓
□ Essay types (narrative, descriptive, argumentative, discursive)
□ Formal and informal letters
□ Linking words and paragraph structure

LITERATURE ✓
□ Figures of speech (simile, metaphor, personification, alliteration, hyperbole, onomatopoeia)
□ Story elements (plot, character, setting, theme, conflict, POV)
□ PQE method for literature answers

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EXAM DAY TIPS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Read the ENTIRE question before answering
2. Manage your time: 
   Part I (MCQ) = ~30 mins
   Part II (Comprehension) = ~40 mins  
   Part III (Writing) = ~40 mins
   Part IV (Literature) = ~40 mins
3. Plan essays before you write (5-point outline = 2 minutes)
4. Check for spelling and grammar errors at the end
5. Write neatly — examiners reward clear, readable answers
6. Answer in FULL SENTENCES unless asked for a list

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
COMMON MISTAKES TO AVOID:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✗ Writing "Because..." to start an answer
✗ Copying the question in the answer
✗ Using contractions in formal writing (don't → do not)
✗ Forgetting pronoun changes in reported speech
✗ Not quoting from text in literature answers
✗ Going over the word limit in summary writing
✗ Using "Yours sincerely" when you don't know the name
✗ Forgetting to change signs in conditionals

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
YOU ARE READY. GOOD LUCK! 🎓`
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "Change to passive: 'The government will build a new hospital.'",
          options: [
            "A new hospital will be built by the government.",
            "A new hospital would be built by the government.",
            "A new hospital is built by the government.",
            "A new hospital was built by the government."
          ],
          correct_answer: 0,
        },
        {
          id: 2,
          question: "Change to indirect speech: 'Where do you live?' she asked him.",
          options: [
            "She asked him where does he live.",
            "She asked him where he lived.",
            "She asked him where he lives.",
            "She asked him that where he lived."
          ],
          correct_answer: 1,
        },
        {
          id: 3,
          question: "Choose the correct form: 'If I _____ you, I would apologize immediately.'",
          options: ["am", "was", "were", "will be"],
          correct_answer: 2,
        },
        {
          id: 4,
          question: "'The sun smiled down on the harvested fields.' Which figure of speech is this?",
          options: ["Simile", "Hyperbole", "Personification", "Alliteration"],
          correct_answer: 2,
        },
        {
          id: 5,
          question: "Which closing is correct for a letter starting 'Dear Sir,'?",
          options: ["Yours sincerely,", "With love,", "Yours faithfully,", "Kind regards,"],
          correct_answer: 2,
        },
      ],
    },
  },

  // ===== UNIT 1 (continued): GRAMMAR FOUNDATIONS =====
  {
    id: 2016,
    title: "Articles — A, An, The",
    description: "Correct use of definite and indefinite articles in English sentences.",
    level: 1,
    xp_reward: 45,
    content: {
      text: `Articles — A, An, The

INDEFINITE ARTICLES: A / AN
Use 'a' or 'an' when referring to something for the first time, or any one of a kind.

• A — before words starting with a CONSONANT sound
  a book, a car, a university (sounds like 'yoo'), a European

• AN — before words starting with a VOWEL sound
  an apple, an hour (silent 'h'), an honest man, an MBA

DEFINITE ARTICLE: THE
Use 'the' when both speaker and listener know what is being referred to.

When to use THE:
✓ Something mentioned before: "I saw a dog. The dog was brown."
✓ Unique things: the sun, the moon, the sky, the President
✓ Superlatives: the best, the tallest, the most beautiful
✓ Rivers, oceans, mountain ranges: the Nile, the Pacific, the Himalayas
✓ Groups of islands/countries: the Maldives, the UK
✓ Musical instruments: she plays the piano

When NOT to use an article:
✗ General plural nouns: Dogs are loyal. (not 'the dogs')
✗ Names of people, cities, countries (mostly): London, Sri Lanka
✗ Languages, subjects, sports: English, Maths, cricket
✗ Meals: I had lunch. (not 'the lunch')

Common Mistakes:
• I go to the school every day. ✗ → I go to school every day. ✓
• She is best student. ✗ → She is the best student. ✓
• I like the music. ✗ (in general) → I like music. ✓`,
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "Choose the correct article: '___ honest person always tells the truth.'",
          options: ["A", "An", "The", "No article"],
          correct_answer: 1,
        },
        {
          id: 2,
          question: "Which sentence is correct?",
          options: ["She plays a piano.", "She plays an piano.", "She plays the piano.", "She plays piano."],
          correct_answer: 2,
        },
        {
          id: 3,
          question: "Fill in the blank: 'I bought ___ new phone yesterday.'",
          options: ["a", "an", "the", "no article needed"],
          correct_answer: 0,
        },
        {
          id: 4,
          question: "Which does NOT need an article?",
          options: ["___ Pacific Ocean", "___ Mount Everest", "___ cricket", "___ Eiffel Tower"],
          correct_answer: 2,
        },
        {
          id: 5,
          question: "'___ sun rises in the east.' Which article fits?",
          options: ["A", "An", "The", "No article"],
          correct_answer: 2,
        },
      ],
    },
  },

  {
    id: 2017,
    title: "Prepositions",
    description: "Prepositions of time, place, direction, and common prepositional phrases.",
    level: 1,
    xp_reward: 45,
    content: {
      text: `Prepositions

A preposition links a noun/pronoun to another word in the sentence.

PREPOSITIONS OF PLACE:
• in — enclosed space: in the box, in the room, in Sri Lanka
• on — surface: on the table, on the wall, on the bus
• at — specific point: at the door, at the station, at home
• under — below: under the bridge
• above/over — higher than: above sea level, over the fence
• between — in the middle of two: between A and B
• among — in the middle of many: among the crowd
• beside/next to — at the side of: beside the river
• in front of / behind: in front of the class

PREPOSITIONS OF TIME:
• at — specific time: at 3 o'clock, at noon, at night
• on — days and dates: on Monday, on 14th February
• in — months, years, seasons, long periods: in January, in 2024, in the morning
• since — from a point in time: since 2010
• for — duration: for three hours
• by — not later than: by tomorrow
• during — throughout a period: during the exam
• until/till — up to a time: until midnight

PREPOSITIONS OF MOVEMENT:
• to — direction: go to school
• into — entering: walk into the room
• out of — exiting: come out of the house
• through — passing: run through the forest
• across — from one side to another: swim across the river
• along — following a line: walk along the road

Common Prepositional Phrases:
• interested in, good at, afraid of, angry with, responsible for, pleased with`,
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "Choose the correct preposition: 'The meeting is ___ Monday morning.'",
          options: ["in", "at", "on", "by"],
          correct_answer: 2,
        },
        {
          id: 2,
          question: "'She has been living here ___ 2018.' Which preposition is correct?",
          options: ["for", "since", "during", "by"],
          correct_answer: 1,
        },
        {
          id: 3,
          question: "'The cat is ___ the table.' (below the table)",
          options: ["on", "above", "under", "beside"],
          correct_answer: 2,
        },
        {
          id: 4,
          question: "Which is correct? 'He is good ___ mathematics.'",
          options: ["in", "on", "at", "for"],
          correct_answer: 2,
        },
        {
          id: 5,
          question: "'I will finish this ___ 5 PM.' (not later than 5 PM)",
          options: ["until", "since", "by", "during"],
          correct_answer: 2,
        },
      ],
    },
  },

  {
    id: 2018,
    title: "Question Tags",
    description: "Forming and using question tags correctly in English.",
    level: 1,
    xp_reward: 40,
    content: {
      text: `Question Tags

A question tag is a short question added to the end of a statement to check information or ask for agreement.

BASIC RULE:
• Positive statement → Negative tag
• Negative statement → Positive tag

Structure: [auxiliary verb + n't], [pronoun]?
          OR [auxiliary verb], [pronoun]?

Examples:
• You are coming, aren't you?
• She isn't ready, is she?
• They have finished, haven't they?
• He can swim, can't he?
• It was raining, wasn't it?
• You don't like coffee, do you?

SPECIAL CASES:
• 'I am' → tag is 'aren't I?'
  I am late, aren't I?

• With 'Let's' → tag is 'shall we?'
  Let's go, shall we?

• With imperatives → tag is 'will you?'
  Close the door, will you?
  Don't be late, will you?

• With 'nobody / nothing / no one' (negative subjects) → positive tag
  Nobody came, did they?
  Nothing happened, did it?

• With 'everyone / someone' → use 'they'
  Everyone enjoyed the party, didn't they?

Tense must match:
• She was singing, wasn't she? ✓
• She was singing, isn't she? ✗

Pronoun must match subject:
• The dog is barking, isn't it? ✓
• The dog is barking, isn't he? ✗`,
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "Complete: 'You have done your homework, ___?'",
          options: ["have you", "haven't you", "didn't you", "do you"],
          correct_answer: 1,
        },
        {
          id: 2,
          question: "Complete: 'She doesn't like fish, ___?'",
          options: ["does she", "doesn't she", "did she", "is she"],
          correct_answer: 0,
        },
        {
          id: 3,
          question: "Complete: 'Let's take a break, ___?'",
          options: ["will we", "won't we", "shall we", "do we"],
          correct_answer: 2,
        },
        {
          id: 4,
          question: "Complete: 'I am the tallest, ___?'",
          options: ["am I not", "aren't I", "isn't I", "am I"],
          correct_answer: 1,
        },
        {
          id: 5,
          question: "Complete: 'Nobody told you, ___?'",
          options: ["didn't they", "did they", "haven't they", "don't they"],
          correct_answer: 1,
        },
      ],
    },
  },

  {
    id: 2019,
    title: "Clauses — Main, Subordinate and Relative",
    description: "Understanding main clauses, subordinate clauses, relative clauses and conjunctions.",
    level: 1,
    xp_reward: 55,
    content: {
      text: `Clauses — Main, Subordinate and Relative

CLAUSE: A group of words containing a subject and a verb.

MAIN CLAUSE (Independent Clause):
• Makes complete sense on its own
• Can stand alone as a sentence
• Example: "She went to the market."

SUBORDINATE CLAUSE (Dependent Clause):
• Cannot stand alone — depends on the main clause
• Introduced by subordinating conjunctions

Common Subordinating Conjunctions:
• Time: when, while, before, after, until, since, as soon as
• Cause: because, since, as
• Condition: if, unless, provided that
• Contrast: although, though, even though, whereas
• Purpose: so that, in order that

Examples:
• "She went to the market because she needed vegetables."
  Main: She went to the market | Subordinate: because she needed vegetables
• "Although it was raining, they continued playing."

RELATIVE CLAUSES:
Gives more information about a noun using relative pronouns.

Relative Pronouns:
• who — for people (subject): The man who lives next door...
• whom — for people (object): The teacher whom I respect...
• which — for things/animals: The book which I read...
• that — for people or things: The car that I bought...
• whose — possession: The girl whose bag was stolen...

Defining Relative Clause: Identifies which one
• The student who won the prize was very happy. (no commas)

Non-defining Relative Clause: Adds extra information
• My sister, who lives in Colombo, is a doctor. (use commas, cannot use 'that')`,
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "Identify the subordinate clause: 'He left early because he was tired.'",
          options: ["He left early", "because he was tired", "He left", "was tired"],
          correct_answer: 1,
        },
        {
          id: 2,
          question: "Choose the correct relative pronoun: 'The woman ___ bag was stolen reported it to the police.'",
          options: ["who", "whom", "whose", "which"],
          correct_answer: 2,
        },
        {
          id: 3,
          question: "Which conjunction introduces a condition?",
          options: ["because", "although", "unless", "while"],
          correct_answer: 2,
        },
        {
          id: 4,
          question: "'Although she was tired, she finished the work.' The word 'although' shows:",
          options: ["Cause", "Contrast", "Time", "Condition"],
          correct_answer: 1,
        },
        {
          id: 5,
          question: "Which sentence has a non-defining relative clause?",
          options: [
            "The boy who studies hard will pass.",
            "My father, who is a doctor, works at the hospital.",
            "The book that I lost was expensive.",
            "Students who are late must wait outside."
          ],
          correct_answer: 1,
        },
      ],
    },
  },

  {
    id: 2020,
    title: "Modal Verbs",
    description: "Using can, could, may, might, must, should, would, shall and ought to correctly.",
    level: 1,
    xp_reward: 50,
    content: {
      text: `Modal Verbs

Modal verbs are auxiliary verbs that express ability, possibility, permission, obligation, or advice.
They are NEVER used alone — always followed by a base verb (infinitive without 'to').

KEY MODALS AND THEIR USES:

CAN / COULD:
• Ability: I can swim. / She could run fast when she was young.
• Permission (informal): Can I go out? / Could I use your phone? (more polite)
• Possibility: It can be very hot in July.
• Request: Could you help me, please?

MAY / MIGHT:
• Permission (formal): May I come in?
• Possibility: It may rain today. / It might be true. (might = less certain)

MUST / HAVE TO:
• Strong obligation: You must wear a seatbelt. (internal rule/authority)
• Necessity: I have to finish this by Friday. (external rule)
• Logical deduction: She must be tired — she worked all night.
• MUST NOT = prohibition: You must not smoke here.
• DON'T HAVE TO = no obligation: You don't have to come.

SHOULD / OUGHT TO:
• Advice: You should see a doctor. / You ought to study harder.
• Expectation: The bus should arrive soon.

WILL / WOULD:
• Future: I will call you later.
• Willingness: Will you help me?
• Polite request: Would you please sit down?
• Habit in the past: He would walk to school every day.
• Conditional: I would go if I had time.

SHALL:
• Offers/suggestions: Shall I help? / Shall we go?
• Future (formal, first person): I shall return.`,
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "'You ___ not park here — it's a no-parking zone.' Which modal is correct?",
          options: ["should", "would", "must", "might"],
          correct_answer: 2,
        },
        {
          id: 2,
          question: "Which sentence expresses possibility?",
          options: [
            "You must finish by 5 PM.",
            "It might rain this evening.",
            "Can you speak louder?",
            "She will come tomorrow."
          ],
          correct_answer: 1,
        },
        {
          id: 3,
          question: "'You ___ wear a uniform — it's optional.' Which is correct?",
          options: ["must not", "don't have to", "cannot", "should not"],
          correct_answer: 1,
        },
        {
          id: 4,
          question: "Which modal is most polite for making a request?",
          options: ["Can you help me?", "Will you help me?", "Could you help me?", "Must you help me?"],
          correct_answer: 2,
        },
        {
          id: 5,
          question: "'She ___ be the manager — she has her own office.' (logical deduction)",
          options: ["might", "should", "must", "could"],
          correct_answer: 2,
        },
      ],
    },
  },

  {
    id: 2021,
    title: "Subject-Verb Agreement",
    description: "Rules for matching subjects and verbs correctly in English sentences.",
    level: 1,
    xp_reward: 45,
    content: {
      text: `Subject-Verb Agreement

The verb must agree with its subject in NUMBER (singular/plural) and PERSON.

BASIC RULE:
• Singular subject → singular verb (add -s/-es)
• Plural subject → plural verb (no -s)

Examples:
• The dog barks. / The dogs bark.
• She writes well. / They write well.

TRICKY CASES:

1. Collective nouns (team, class, family, committee):
   Usually treated as SINGULAR in Sri Lankan/British English:
   • The team is ready. ✓
   • The committee has decided. ✓

2. Words joined by AND → usually plural:
   • Tom and Jerry are here.
   BUT: Bread and butter is my favourite. (one idea)

3. With OR / NOR → verb agrees with the CLOSER subject:
   • Neither the teacher nor the students are ready.
   • Either the boys or the girl is wrong.

4. Indefinite pronouns → SINGULAR:
   everyone, everyone, anyone, someone, nobody, each, every, either, neither
   • Everyone is welcome. ✓
   • Each of the students has a book. ✓

5. Phrases between subject and verb — ignore them:
   • The box of chocolates is on the table. (subject = box)
   • One of the boys was absent. (subject = one)

6. There is / There are:
   • There is a book on the table.
   • There are two books on the table.

7. Titles, subjects, amounts → SINGULAR:
   • Mathematics is difficult.
   • Ten kilometres is a long walk.`,
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "Choose the correct verb: 'The news ___ surprising.'",
          options: ["are", "is", "were", "have been"],
          correct_answer: 1,
        },
        {
          id: 2,
          question: "Choose the correct verb: 'Neither the boys nor the girl ___ ready.'",
          options: ["are", "is", "were", "have been"],
          correct_answer: 1,
        },
        {
          id: 3,
          question: "Choose the correct verb: 'Everyone in the class ___ passed the test.'",
          options: ["have", "has", "had", "were"],
          correct_answer: 1,
        },
        {
          id: 4,
          question: "Choose the correct verb: 'The committee ___ meeting tomorrow.'",
          options: ["are", "is", "were", "have been"],
          correct_answer: 1,
        },
        {
          id: 5,
          question: "Choose the correct verb: 'One of the students ___ absent today.'",
          options: ["are", "were", "is", "have been"],
          correct_answer: 2,
        },
      ],
    },
  },

  // ===== UNIT 2 (continued): READING COMPREHENSION =====
  {
    id: 2022,
    title: "Comprehension — Inferring Meaning",
    description: "Reading between the lines — making inferences and understanding implied meaning.",
    level: 2,
    xp_reward: 55,
    content: {
      text: `Comprehension — Inferring Meaning

INFERENCE means understanding what is SUGGESTED but not directly STATED.
The writer implies; the reader infers.

TYPES OF COMPREHENSION QUESTIONS:

1. LITERAL questions — Answer is directly in the text
   Signal words: "According to the passage…", "The author states that…"
   Strategy: Find the exact line in the passage.

2. INFERENTIAL questions — Answer is implied
   Signal words: "What does the writer suggest?", "Why do you think…?", "What can we infer?"
   Strategy: Use clues + your own knowledge.

3. VOCABULARY IN CONTEXT questions
   Signal words: "The word '___' in paragraph 2 means…"
   Strategy: Use surrounding words (context clues) to guess meaning.

4. MAIN IDEA / THEME questions
   Signal words: "What is the passage mainly about?", "What is the writer's purpose?"
   Strategy: Look at topic sentences and the overall message.

5. AUTHOR'S TONE AND ATTITUDE
   Words that describe tone: critical, sympathetic, humorous, sarcastic, informative, persuasive

STRATEGIES FOR COMPREHENSION:
• Read the questions FIRST so you know what to look for
• Skim for the main idea, scan for specific details
• Underline key words in questions
• Find the relevant paragraph before answering
• Use your OWN words unless asked to quote
• For 'give evidence from the passage' — use direct quotes or references

Answering Tips:
• Answer in full sentences unless told otherwise
• Match the number of marks to the number of points
• Don't copy entire paragraphs — select relevant parts`,
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "What type of question asks you to understand what the writer implies but does not directly state?",
          options: ["Literal", "Inferential", "Vocabulary", "Summary"],
          correct_answer: 1,
        },
        {
          id: 2,
          question: "For a vocabulary question, what is the best strategy?",
          options: [
            "Use a dictionary",
            "Skip it",
            "Use the surrounding words (context clues)",
            "Guess randomly"
          ],
          correct_answer: 2,
        },
        {
          id: 3,
          question: "Which is the best first step when attempting a comprehension passage?",
          options: [
            "Read the passage from start to finish slowly",
            "Read the questions first",
            "Write the answers immediately",
            "Read only the first paragraph"
          ],
          correct_answer: 1,
        },
        {
          id: 4,
          question: "If a question is worth 2 marks, how many points should your answer generally have?",
          options: ["1", "2", "3", "4"],
          correct_answer: 1,
        },
        {
          id: 5,
          question: "A writer who praises something sarcastically is said to have what kind of tone?",
          options: ["Informative", "Sympathetic", "Sarcastic", "Persuasive"],
          correct_answer: 2,
        },
      ],
    },
  },

  {
    id: 2023,
    title: "Comprehension — Advertisements and Notices",
    description: "Reading and interpreting advertisements, notices, signs, and other functional texts.",
    level: 2,
    xp_reward: 50,
    content: {
      text: `Comprehension — Advertisements and Notices

The Sri Lankan O/L English exam includes functional texts like:
• Advertisements (job ads, product ads)
• Public notices
• Signs and warnings
• Timetables and schedules
• Forms and charts
• Labels and instructions

READING ADVERTISEMENTS:
Key features to notice:
• Product/Service being advertised
• Target audience (who is it for?)
• Key benefits or features
• Price, contact details, offer
• Language: persuasive, positive, exaggerated

READING NOTICES:
• Who is the notice from? (authority/organization)
• Who is it for? (target audience)
• What is the main message?
• Are there conditions or warnings?

READING INSTRUCTIONS/LABELS:
• Read in sequence (steps must be followed in order)
• Note warnings (DANGER, CAUTION, WARNING)
• Identify ingredients or components

READING TIMETABLES:
• Check rows vs columns carefully
• Note departure vs arrival times
• Look for special symbols or footnotes

Common Question Types:
• "Who is this notice intended for?"
• "What does the advertisement offer?"
• "According to the label, what should you NOT do?"
• "At what time does the bus depart from Colombo?"
• "What is the purpose of this notice?"

Language of Advertisements:
• Superlatives: the best, the finest, the most reliable
• Imperatives: Call now! Visit us today!
• Rhetorical questions: Why pay more?
• Emotional appeals: For your family's safety...`,
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "An advertisement says 'Call now — Limited offer!' This is an example of:",
          options: ["Warning", "Creating urgency", "Giving instructions", "Informing"],
          correct_answer: 1,
        },
        {
          id: 2,
          question: "When reading a timetable, what should you check carefully?",
          options: [
            "Only the first column",
            "Rows vs columns and what each represents",
            "Only the prices",
            "Only the destination names"
          ],
          correct_answer: 1,
        },
        {
          id: 3,
          question: "A label says 'Keep out of reach of children.' This is a:",
          options: ["Advertisement", "Warning", "Instruction step", "Timetable entry"],
          correct_answer: 1,
        },
        {
          id: 4,
          question: "The language used in advertisements is mainly:",
          options: ["Factual and neutral", "Persuasive and positive", "Threatening and negative", "Technical and complex"],
          correct_answer: 1,
        },
        {
          id: 5,
          question: "'Why pay more when you can get the best for less?' This is a:",
          options: ["Simile", "Metaphor", "Rhetorical question", "Hyperbole"],
          correct_answer: 2,
        },
      ],
    },
  },

  // ===== UNIT 3 (continued): WRITING SKILLS =====
  {
    id: 2024,
    title: "Descriptive Writing",
    description: "Techniques for vivid descriptive writing using sensory details, adjectives, and figurative language.",
    level: 3,
    xp_reward: 55,
    content: {
      text: `Descriptive Writing

Descriptive writing paints a picture with words. The reader should be able to SEE, HEAR, SMELL, TASTE, and FEEL what you are describing.

PURPOSE: To create a vivid impression of a person, place, object, or event.

KEY TECHNIQUES:

1. SENSORY DETAILS (use all 5 senses):
   • Sight: the golden sunset, crumbling walls, sparkling water
   • Sound: the deafening roar of thunder, rustling leaves
   • Smell: the sharp scent of rain on dry earth
   • Touch/Feel: the rough bark of the tree, sticky humidity
   • Taste: the bitter tang of unripe mangoes

2. FIGURATIVE LANGUAGE:
   • Simile: The moon was like a silver coin in the sky.
   • Metaphor: The road was a grey ribbon winding through the hills.
   • Personification: The wind whispered through the bamboo.
   • Onomatopoeia: The waves crashed and hissed on the shore.
   • Alliteration: The still, silent street stretched ahead.

3. STRONG VOCABULARY:
   • Replace weak adjectives with precise ones
   • big → enormous, gigantic, towering
   • nice → enchanting, breathtaking, serene
   • said → whispered, exclaimed, muttered

4. VARIED SENTENCE STRUCTURE:
   • Mix short sentences (for impact) and long sentences (for flow)
   • Use different sentence starters

5. SHOW, DON'T TELL:
   • Tell: She was nervous.
   • Show: Her hands trembled as she reached for the door handle.

STRUCTURE:
• Opening — Set the scene dramatically
• Middle — Describe in detail (zoom in on key features)
• Ending — Leave an impression (a thought, feeling, or image)`,
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "'The thunder growled like an angry giant.' This is an example of:",
          options: ["Metaphor and personification", "Simile and personification", "Alliteration", "Onomatopoeia"],
          correct_answer: 1,
        },
        {
          id: 2,
          question: "Which sentence SHOWS rather than TELLS?",
          options: [
            "He was very angry.",
            "His face turned red and his fists clenched at his sides.",
            "The man felt upset.",
            "She noticed he was angry."
          ],
          correct_answer: 1,
        },
        {
          id: 3,
          question: "Which of these is an example of onomatopoeia?",
          options: [
            "The moon was a ghost",
            "The birds sang beautifully",
            "The bees buzzed lazily in the garden",
            "Life is a journey"
          ],
          correct_answer: 2,
        },
        {
          id: 4,
          question: "Replacing 'walked slowly' with 'shuffled' is an example of:",
          options: ["Using figurative language", "Using precise/strong vocabulary", "Using a simile", "Alliteration"],
          correct_answer: 1,
        },
        {
          id: 5,
          question: "In descriptive writing, what does 'sensory detail' mean?",
          options: [
            "Using only visual descriptions",
            "Describing using all five senses",
            "Using statistics and facts",
            "Writing in the first person only"
          ],
          correct_answer: 1,
        },
      ],
    },
  },

  {
    id: 2025,
    title: "Report Writing",
    description: "Writing formal reports — structure, language, and features of report writing.",
    level: 3,
    xp_reward: 55,
    content: {
      text: `Report Writing

A report is a formal piece of writing that presents facts, findings, or information about a specific topic or event.

TYPES OF REPORTS in O/L:
• School event report (sports day, excursion, debate)
• Incident/accident report
• Survey report
• Meeting report (minutes)

STRUCTURE OF A REPORT:

1. HEADING / TITLE
   • Centred, bold if possible
   • Example: Report on the Annual Science Exhibition

2. INTRODUCTION (What, When, Where, Who)
   • State the purpose/occasion
   • Example: "This report presents the findings of the Annual Science Exhibition held at..."

3. BODY (Main Content)
   • Organised into sections or paragraphs
   • Use factual, formal language
   • Third person: 'Students participated...' NOT 'I saw students...'
   • Past tense for past events

4. CONCLUSION
   • Summary of what happened / findings
   • Recommendations if required

5. NAME AND DATE
   • Written by: [Your Name]
   • Date: [Date]

LANGUAGE FEATURES:
• Formal: avoid slang and contractions
• Passive voice: "The event was organised by..."
• Facts, not opinions (unless asked for recommendations)
• Precise language: "Approximately 200 students attended..."

Example Opening:
"This report aims to provide an account of the Inter-School Debate Competition held on 15th March 2024 at Mahinda College, Galle."

COMMON MISTAKES:
✗ Starting with "I" — write in third person
✗ Using informal language
✗ Missing the heading or date
✗ Writing opinions instead of facts`,
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "Which person (first, second, or third) should be used in a formal report?",
          options: ["First person (I, we)", "Second person (you)", "Third person (he, she, they)", "Any person"],
          correct_answer: 2,
        },
        {
          id: 2,
          question: "Which is the correct opening for a school event report?",
          options: [
            "I am writing to tell you about our sports day.",
            "This report presents an account of the Annual Sports Day held on...",
            "Hey everyone! Our sports day was awesome!",
            "The sports day. It was on Friday."
          ],
          correct_answer: 1,
        },
        {
          id: 3,
          question: "Which tense is mainly used when reporting on a past event?",
          options: ["Present tense", "Future tense", "Past tense", "Present perfect"],
          correct_answer: 2,
        },
        {
          id: 4,
          question: "What should the CONCLUSION of a report contain?",
          options: [
            "A dramatic story ending",
            "A summary of findings and possibly recommendations",
            "A list of all participants",
            "An apology for any mistakes"
          ],
          correct_answer: 1,
        },
        {
          id: 5,
          question: "Which sentence is most appropriate for a formal report?",
          options: [
            "The show was totally amazing!",
            "It was the best event ever, I think.",
            "The performance was well-received by the audience.",
            "We all had so much fun at the event."
          ],
          correct_answer: 2,
        },
      ],
    },
  },

  {
    id: 2026,
    title: "Speech Writing and Debate",
    description: "Writing and delivering speeches, structure of a speech, and debate language.",
    level: 3,
    xp_reward: 55,
    content: {
      text: `Speech Writing and Debate

A speech is a formal piece of spoken (or written) communication delivered to an audience.

TYPES OF SPEECHES in O/L:
• Persuasive speech (arguing a point of view)
• Welcome/vote of thanks speech
• Debate speech (for or against a motion)

STRUCTURE OF A SPEECH:

1. SALUTATION (Greeting the audience)
   • "Honourable judges, respected teachers, and dear friends..."
   • "Good morning/afternoon, everyone..."

2. INTRODUCTION
   • State your topic/motion clearly
   • Hook the audience (a question, shocking fact, or quotation)
   • Example: "Have you ever considered how much plastic we throw away each day?"

3. BODY (3 main points)
   • Point 1 + explanation + example/evidence
   • Point 2 + explanation + example/evidence
   • Point 3 + explanation + example/evidence
   • Use connectives: Firstly, Furthermore, In addition, However, Most importantly

4. CONCLUSION
   • Summarise your main points
   • End with a strong, memorable statement or call to action
   • "Therefore, I urge you all to..."

5. THANK YOU
   • "Thank you for your kind attention."

DEBATE LANGUAGE:
• Proposing the motion: "I firmly believe that..."
• Opposing: "I strongly oppose the motion..."
• Agreeing with previous speaker: "As my colleague rightly pointed out..."
• Countering: "However, we must consider that..."
• Concluding: "In conclusion, it is clear that..."

PERSUASIVE TECHNIQUES:
• Rhetorical questions: "Is this the future we want for our children?"
• Statistics: "Studies show that 80% of..."
• Emotional appeal: "Think of the impact on future generations."
• Rule of three: "We must act now, act together, and act wisely."`,
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "What is the first part of a formal speech called?",
          options: ["Introduction", "Body", "Salutation", "Conclusion"],
          correct_answer: 2,
        },
        {
          id: 2,
          question: "'Is this the world we want to leave for our children?' This is a:",
          options: ["Statement", "Simile", "Rhetorical question", "Fact"],
          correct_answer: 2,
        },
        {
          id: 3,
          question: "How many main points should a speech body typically have for O/L?",
          options: ["1", "2", "3", "5"],
          correct_answer: 2,
        },
        {
          id: 4,
          question: "Which phrase is used to OPPOSE a motion in a debate?",
          options: [
            "I firmly support...",
            "I strongly oppose the motion that...",
            "As my colleague said...",
            "Thank you for listening."
          ],
          correct_answer: 1,
        },
        {
          id: 5,
          question: "A good speech conclusion should:",
          options: [
            "Introduce new points",
            "Just say 'thank you'",
            "Summarise and end with a strong/memorable statement",
            "Repeat the introduction word for word"
          ],
          correct_answer: 2,
        },
      ],
    },
  },

  {
    id: 2027,
    title: "Narrative Writing",
    description: "Writing engaging stories with strong plot, characters, setting, and narrative techniques.",
    level: 3,
    xp_reward: 60,
    content: {
      text: `Narrative Writing

Narrative writing tells a story. It can be fiction (imagined) or based on real experience.

ELEMENTS OF A GOOD STORY:

1. PLOT (What happens)
   Structure:
   • Exposition — Introduction of setting and characters
   • Rising Action — Events build up, problem introduced
   • Climax — The most exciting/tense moment
   • Falling Action — Events after the climax
   • Resolution — How the story ends

2. CHARACTERS
   • Protagonist: main character
   • Antagonist: opponent/villain
   • Show character through: dialogue, actions, thoughts, appearance
   • Use 'show don't tell': "She bit her lip and looked away." (nervous)

3. SETTING (When and Where)
   • Time: past, present, night, day, season
   • Place: described with sensory details
   • Atmosphere: creates mood (eerie, peaceful, chaotic)

4. NARRATIVE PERSPECTIVE:
   • First person (I/we) — feels personal and direct
   • Third person (he/she/they) — wider view, more flexible

5. DIALOGUE:
   • Makes story lively and realistic
   • Shows character personality
   • New speaker = new paragraph
   • Use speech marks correctly: "Come here," she said.

NARRATIVE TECHNIQUES:
• Flashback: going back in time to explain events
• Foreshadowing: hinting at what will happen
• Cliffhanger: ending a chapter/scene at a tense moment
• Suspense: making the reader want to know what happens next

EXAM TIPS:
• Plan before writing (5 minutes)
• Strong opening — start in the middle of action or with dialogue
• Varied vocabulary and sentence structure
• Check spelling, punctuation, and grammar`,
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "What is the CLIMAX of a story?",
          options: [
            "The introduction of characters",
            "The resolution at the end",
            "The most exciting or tense moment",
            "The setting description"
          ],
          correct_answer: 2,
        },
        {
          id: 2,
          question: "Which narrative technique hints at events that will happen later?",
          options: ["Flashback", "Foreshadowing", "Cliffhanger", "Dialogue"],
          correct_answer: 1,
        },
        {
          id: 3,
          question: "In first-person narrative, the story is told using:",
          options: ["He/she/they", "You/your", "I/we/my", "One/ones"],
          correct_answer: 2,
        },
        {
          id: 4,
          question: "'She trembled and gripped the railing tightly.' This SHOWS the character is:",
          options: ["Happy", "Angry", "Frightened or nervous", "Bored"],
          correct_answer: 2,
        },
        {
          id: 5,
          question: "When a new character speaks in dialogue, you should:",
          options: [
            "Continue in the same paragraph",
            "Start a new paragraph",
            "Use brackets",
            "Use capital letters for the whole sentence"
          ],
          correct_answer: 1,
        },
      ],
    },
  },

  {
    id: 2028,
    title: "Email Writing",
    description: "Writing formal and informal emails, structure, language, and email etiquette.",
    level: 3,
    xp_reward: 45,
    content: {
      text: `Email Writing

An email (electronic mail) is a common form of written communication. Emails can be FORMAL or INFORMAL.

FORMAL EMAIL STRUCTURE:
1. Subject line — Clear and specific
   "Application for the Post of Library Assistant"

2. Salutation
   • Known person: Dear Mr. Silva, / Dear Ms. Perera,
   • Unknown: Dear Sir/Madam, OR To Whom It May Concern,

3. Opening line — State purpose
   "I am writing to enquire about..."
   "I am writing with reference to your advertisement..."

4. Body — Main message in paragraphs
   • Paragraph 1: Reason for writing
   • Paragraph 2+: Details and relevant information

5. Closing line
   "I look forward to hearing from you."
   "Please do not hesitate to contact me for further information."

6. Sign-off
   • Known name: Yours sincerely,
   • Unknown: Yours faithfully,
   • Then: Your full name

INFORMAL EMAIL STRUCTURE:
1. Subject: "Catch up soon?"
2. Salutation: Hi [Name], / Hey [Name],
3. Opening: "How are you? Hope you're doing well!"
4. Body: conversational, can use contractions (I'm, you're)
5. Sign-off: Best wishes, / Take care, / Love, / [First name only]

FORMAL vs INFORMAL:
| Feature        | Formal               | Informal              |
|----------------|----------------------|-----------------------|
| Salutation     | Dear Mr./Ms. + surname | Hi/Hey + first name |
| Language       | Formal, no slang     | Casual, contractions  |
| Sign-off       | Yours sincerely/faithfully | Love/Take care  |
| Purpose        | Business/official    | Friends/family        |`,
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "You are writing a formal email to someone you don't know by name. Which sign-off is correct?",
          options: ["Yours sincerely,", "Yours faithfully,", "Love,", "Best,"],
          correct_answer: 1,
        },
        {
          id: 2,
          question: "Which is an appropriate subject line for a formal email applying for a job?",
          options: [
            "Job!!",
            "Application for the Post of Accounts Clerk",
            "Hi there",
            "Please read this"
          ],
          correct_answer: 1,
        },
        {
          id: 3,
          question: "Which salutation is correct for a formal email when you know the recipient's name?",
          options: ["Hey John,", "Dear Mr. Fernando,", "Hello there,", "To John,"],
          correct_answer: 1,
        },
        {
          id: 4,
          question: "Which sentence is appropriate for a FORMAL email opening?",
          options: [
            "OMG, I can't believe this!",
            "I am writing to enquire about the vacancy advertised...",
            "How are you doing? Miss you heaps!",
            "Sup! Got your message."
          ],
          correct_answer: 1,
        },
        {
          id: 5,
          question: "Contractions like 'I'm' and 'you're' are acceptable in:",
          options: ["Formal emails only", "Informal emails only", "Both formal and informal", "Neither"],
          correct_answer: 1,
        },
      ],
    },
  },

  // ===== UNIT 4 (continued): VOCABULARY =====
  {
    id: 2029,
    title: "Word Formation — Prefixes and Suffixes",
    description: "Building new words using prefixes and suffixes, and understanding word families.",
    level: 4,
    xp_reward: 50,
    content: {
      text: `Word Formation — Prefixes and Suffixes

Understanding how words are built helps you guess meanings of new words and expand vocabulary.

PREFIXES (added to the BEGINNING of a word):

Negative Prefixes:
• un-: unhappy, unclear, unfair, undo
• dis-: disagree, disappear, dishonest, disobey
• im-: impossible, impatient, immature, imperfect
• in-: incorrect, invisible, inactive, independent
• ir-: irregular, irresponsible, irrelevant
• il-: illegal, illegible, illogical
• mis-: misunderstand, mislead, misbehave

Other Prefixes:
• re-: redo, rewrite, return, rebuild (again)
• pre-: preview, prehistoric, predict (before)
• post-: postpone, postwar (after)
• over-: overwork, overcome, overuse (too much)
• under-: underestimate, underwork (too little)
• inter-: international, interact (between)
• sub-: submarine, subway, subtitle (under)
• super-: superhero, supernatural (above/beyond)
• co-: cooperate, coexist (together)
• anti-: antibiotic, antisocial (against)

SUFFIXES (added to the END of a word):

Noun suffixes:
• -tion/-sion: education, decision, information
• -ment: government, enjoyment, development
• -ness: happiness, sadness, darkness
• -er/-or: teacher, doctor, farmer
• -ist: artist, scientist, journalist
• -ity: ability, creativity, similarity

Adjective suffixes:
• -ful: beautiful, helpful, careful
• -less: careless, harmless, useless
• -ous: famous, dangerous, nervous
• -able/-ible: comfortable, responsible
• -al: natural, national, traditional
• -ive: creative, sensitive, effective

Verb suffixes:
• -en: widen, lengthen, strengthen
• -ify: simplify, clarify, identify
• -ise/-ize: realise, organize, modernise`,
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "What does the prefix 're-' mean?",
          options: ["Before", "Against", "Again", "Under"],
          correct_answer: 2,
        },
        {
          id: 2,
          question: "Which word uses a negative prefix?",
          options: ["Submarine", "Preview", "Dishonest", "Cooperate"],
          correct_answer: 2,
        },
        {
          id: 3,
          question: "What suffix turns the adjective 'dark' into a noun?",
          options: ["-ful", "-ness", "-ive", "-al"],
          correct_answer: 1,
        },
        {
          id: 4,
          question: "The word 'irresponsible' means:",
          options: ["Very responsible", "Not responsible", "Overly responsible", "Somewhat responsible"],
          correct_answer: 1,
        },
        {
          id: 5,
          question: "Which suffix creates an adjective meaning 'full of danger'?",
          options: ["danger-ment", "danger-ness", "danger-ous", "danger-tion"],
          correct_answer: 2,
        },
      ],
    },
  },

  {
    id: 2030,
    title: "Idioms and Phrasal Verbs",
    description: "Common English idioms and phrasal verbs used in the Sri Lankan O/L exam.",
    level: 4,
    xp_reward: 50,
    content: {
      text: `Idioms and Phrasal Verbs

IDIOMS:
An idiom is a phrase whose meaning is different from the literal meanings of its words.

Common Idioms for O/L:
• Bite the bullet — endure a painful situation bravely
• Break the ice — start a conversation in an awkward situation
• Hit the nail on the head — say exactly the right thing
• Miss the boat — miss an opportunity
• Cost an arm and a leg — be very expensive
• Once in a blue moon — very rarely
• Under the weather — feeling unwell/sick
• Piece of cake — something very easy
• Let the cat out of the bag — reveal a secret accidentally
• Burn the midnight oil — work very late into the night
• A blessing in disguise — something that seems bad but turns out good
• Beat around the bush — avoid the main topic
• Every cloud has a silver lining — every bad situation has a positive side
• The ball is in your court — it's your decision/responsibility now
• Spill the beans — reveal secret information

PHRASAL VERBS:
A phrasal verb is a verb + preposition/adverb combination with a new meaning.

Common Phrasal Verbs:
• give up — stop trying: Don't give up on your dreams.
• give in — surrender: She finally gave in to his request.
• put off — postpone: Don't put off what you can do today.
• put up with — tolerate: I can't put up with this noise.
• look after — take care of: She looks after her elderly parents.
• look up to — admire/respect: He looks up to his teacher.
• look into — investigate: The police looked into the case.
• run out of — have none left: We've run out of milk.
• come across — find by chance: I came across an old photograph.
• take after — resemble: She takes after her mother.
• carry on — continue: Please carry on with your work.
• break down — stop working (machine) / lose emotional control`,
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "'She burned the midnight oil studying for exams.' This means she:",
          options: [
            "Lit a candle while studying",
            "Studied very late at night",
            "Used a lot of electricity",
            "Failed her exams"
          ],
          correct_answer: 1,
        },
        {
          id: 2,
          question: "'The project cost an arm and a leg.' This means it was:",
          options: ["Painful", "Very expensive", "Very dangerous", "Easy to complete"],
          correct_answer: 1,
        },
        {
          id: 3,
          question: "What does the phrasal verb 'put off' mean?",
          options: ["Turn off", "Postpone", "Give up", "Tolerate"],
          correct_answer: 1,
        },
        {
          id: 4,
          question: "'She takes after her grandmother.' This means she:",
          options: [
            "Takes care of her grandmother",
            "Resembles her grandmother",
            "Follows her grandmother",
            "Looks after her grandmother"
          ],
          correct_answer: 1,
        },
        {
          id: 5,
          question: "'Every cloud has a silver lining' means:",
          options: [
            "Clouds bring rain",
            "Silver is found in clouds",
            "Every bad situation has something positive",
            "Weather always changes"
          ],
          correct_answer: 2,
        },
      ],
    },
  },

  // ===== UNIT 5 (continued): LITERATURE =====
  {
    id: 2031,
    title: "Poetry — Types and Forms",
    description: "Understanding different types of poems including sonnets, ballads, odes, and free verse.",
    level: 5,
    xp_reward: 55,
    content: {
      text: `Poetry — Types and Forms

Poetry is a form of literary expression that uses language in a concentrated, imaginative way.

TYPES OF POETRY:

1. LYRIC POEM:
   • Expresses personal feelings or emotions
   • Usually short
   • Examples: odes, elegies, sonnets

2. NARRATIVE POEM:
   • Tells a story
   • Has characters, plot, and setting
   • Examples: ballads, epics

3. DRAMATIC POEM:
   • Characters speak in the poem
   • Monologue or dialogue form
   • Example: dramatic monologue

4. SONNET:
   • 14 lines, written in iambic pentameter
   • Shakespearean: 3 quatrains + 1 couplet (ABAB CDCD EFEF GG)
   • Petrarchan: octave (8 lines) + sestet (6 lines)
   • Usually about love or nature

5. BALLAD:
   • Tells a story, often tragic or romantic
   • Written in quatrains (4-line stanzas)
   • Often has a refrain (repeated line/stanza)
   • Originally meant to be sung

6. ODE:
   • A poem of praise or celebration
   • Written in honour of a person, event, or thing
   • Example: "Ode to a Nightingale" by Keats

7. ELEGY:
   • A mournful poem about death or loss
   • Often written as a lament

8. FREE VERSE:
   • No fixed rhyme scheme or metre
   • Follows natural speech rhythms
   • Very common in modern poetry

POETIC TERMS:
• Stanza: a group of lines (like a paragraph)
• Couplet: 2 lines
• Quatrain: 4 lines
• Rhyme scheme: pattern of rhymes (ABAB, AABB)
• Metre: the rhythm/beat of the poem
• Refrain: a repeated line or stanza`,
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "How many lines does a sonnet have?",
          options: ["10", "12", "14", "16"],
          correct_answer: 2,
        },
        {
          id: 2,
          question: "A poem written to mourn someone's death is called a/an:",
          options: ["Ode", "Ballad", "Elegy", "Sonnet"],
          correct_answer: 2,
        },
        {
          id: 3,
          question: "Free verse poetry is characterized by:",
          options: [
            "Strict rhyme scheme",
            "Exactly 14 lines",
            "No fixed rhyme scheme or metre",
            "Always having 4-line stanzas"
          ],
          correct_answer: 2,
        },
        {
          id: 4,
          question: "A group of lines in a poem is called a:",
          options: ["Verse", "Stanza", "Couplet", "Metre"],
          correct_answer: 1,
        },
        {
          id: 5,
          question: "Which type of poem tells a story, often with a repeated refrain?",
          options: ["Sonnet", "Ode", "Elegy", "Ballad"],
          correct_answer: 3,
        },
      ],
    },
  },

  {
    id: 2032,
    title: "Drama — Features and Analysis",
    description: "Understanding plays — acts, scenes, stage directions, themes, and analysing dramatic text.",
    level: 5,
    xp_reward: 55,
    content: {
      text: `Drama — Features and Analysis

Drama is a form of literature written for performance on stage.

KEY FEATURES OF A PLAY:

1. ACTS AND SCENES:
   • Acts: major divisions of a play (like chapters)
   • Scenes: smaller divisions within acts
   • A full play usually has 3 or 5 acts

2. CHARACTERS:
   • Protagonist: main character
   • Antagonist: opposing character/force
   • Round characters: complex, developed
   • Flat characters: one-dimensional

3. DIALOGUE:
   • The spoken words of characters
   • Reveals character personality, relationships, and plot
   • Each character's name appears before their lines

4. STAGE DIRECTIONS:
   • Instructions in brackets/italics
   • Tell actors how to move, speak, or react
   • Describe the setting
   • Example: [Enter HAMLET, looking distressed]

5. SOLILOQUY:
   • A character speaks thoughts aloud, alone on stage
   • The audience hears inner thoughts
   • Famous example: Hamlet's "To be or not to be"

6. ASIDE:
   • A character speaks to the audience, not to other characters
   • Other characters on stage cannot hear it

7. MONOLOGUE:
   • A long speech by one character (others may be present)

TYPES OF DRAMA:
• Tragedy: ends in disaster/death of the protagonist
• Comedy: light-hearted, ends happily
• Tragicomedy: mix of both

ANALYSING DRAMA:
• Theme: the central message (love, jealousy, power, justice)
• Conflict: internal (within a character) or external (with others/society)
• Dramatic irony: audience knows something characters don't`,
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "What is a SOLILOQUY in a play?",
          options: [
            "A conversation between two characters",
            "A character speaking thoughts aloud when alone on stage",
            "Instructions for the actor",
            "A repeated speech by the main character"
          ],
          correct_answer: 1,
        },
        {
          id: 2,
          question: "Stage directions are written in:",
          options: [
            "Capital letters",
            "Bold text",
            "Brackets or italics",
            "Quotation marks"
          ],
          correct_answer: 2,
        },
        {
          id: 3,
          question: "A play that ends in the death or downfall of the main character is a:",
          options: ["Comedy", "Tragedy", "Farce", "Musical"],
          correct_answer: 1,
        },
        {
          id: 4,
          question: "When a character speaks to the AUDIENCE and other characters cannot hear, this is called:",
          options: ["Soliloquy", "Monologue", "Aside", "Dialogue"],
          correct_answer: 2,
        },
        {
          id: 5,
          question: "Dramatic irony occurs when:",
          options: [
            "Two characters argue on stage",
            "The audience knows something that characters on stage do not",
            "The play is very long",
            "A character speaks in rhyme"
          ],
          correct_answer: 1,
        },
      ],
    },
  },

  // ===== UNIT 6 (continued): EXAM PRACTICE =====
  {
    id: 2033,
    title: "Gap Filling and Cloze Tests",
    description: "Strategies for completing gap-fill exercises and cloze passages accurately.",
    level: 6,
    xp_reward: 50,
    content: {
      text: `Gap Filling and Cloze Tests

Gap-filling and cloze tests are common question types in the Sri Lankan O/L English paper.

TYPES OF GAP-FILL EXERCISES:

1. GRAMMAR-BASED GAPS:
   • Choosing the correct tense
   • Articles (a, an, the)
   • Prepositions
   • Pronouns
   • Conjunctions
   • Modal verbs

2. VOCABULARY-BASED GAPS:
   • Synonyms
   • Word forms (noun, verb, adjective, adverb)
   • Contextually appropriate words

3. CLOZE TEST:
   • A passage with several words removed
   • May provide a word list (easier) or not (harder)
   • Must fill each blank to make the passage grammatically correct and meaningful

STRATEGIES FOR GAP FILLING:

Step 1: Read the WHOLE sentence (and surrounding sentences) before filling the blank.

Step 2: Identify what TYPE of word is needed:
   • Is it a verb? → check tense, subject-verb agreement
   • Is it a noun? → singular or plural?
   • Is it an adjective? → what noun does it describe?
   • Is it a preposition? → what verb/adjective does it follow?

Step 3: Use context clues — what does the sentence mean overall?

Step 4: Check for collocations (words that go together):
   • make a decision (not 'do a decision')
   • do homework (not 'make homework')
   • take a photo (not 'make a photo')

Common Collocations:
• make: make a mistake, make a speech, make a suggestion
• do: do research, do damage, do a favour
• have: have a shower, have a meal, have an argument
• take: take a break, take action, take a risk

Step 5: Re-read the completed sentence — does it make sense?`,
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "Fill in the gap: 'She has been working here ___ 2019.'",
          options: ["for", "since", "during", "by"],
          correct_answer: 1,
        },
        {
          id: 2,
          question: "Fill in the gap: 'He ___ a mistake in his essay.'",
          options: ["did", "made", "took", "had"],
          correct_answer: 1,
        },
        {
          id: 3,
          question: "Fill in the gap: 'I need ___ umbrella. It looks like rain.'",
          options: ["a", "an", "the", "no article"],
          correct_answer: 0,
        },
        {
          id: 4,
          question: "What is the first step when attempting a cloze test?",
          options: [
            "Fill each gap immediately as you read",
            "Read only the gapped sentences",
            "Read the whole passage before filling any gap",
            "Fill only the gaps you are sure about"
          ],
          correct_answer: 2,
        },
        {
          id: 5,
          question: "Fill in the gap: 'Everyone ___ expected to attend the assembly.'",
          options: ["are", "were", "is", "have been"],
          correct_answer: 2,
        },
      ],
    },
  },

  {
    id: 2034,
    title: "Sentence Transformation",
    description: "Rewriting sentences using different structures while keeping the same meaning.",
    level: 6,
    xp_reward: 55,
    content: {
      text: `Sentence Transformation

Sentence transformation requires you to rewrite a sentence using a given word or structure WITHOUT changing the meaning.

COMMON TRANSFORMATION TYPES:

1. ACTIVE ↔ PASSIVE:
   Active: The teacher corrected the papers.
   Passive: The papers were corrected by the teacher.

2. DIRECT ↔ INDIRECT SPEECH:
   Direct: She said, "I am tired."
   Indirect: She said that she was tired.

3. DEGREE OF COMPARISON:
   • Positive: He is as tall as his brother.
   • Comparative: He is not taller than his brother.
   • Superlative: He is the tallest in his family. 
   → All three can express similar ideas!

4. AFFIRMATIVE ↔ NEGATIVE:
   • She is honest. → She is not dishonest.
   • He always comes on time. → He never comes late.

5. SIMPLE ↔ COMPLEX:
   Simple: Despite the rain, they played.
   Complex: Although it was raining, they played.

6. CONDITIONAL FORMS:
   • "Work hard or you'll fail."
   → If you don't work hard, you will fail.
   → Unless you work hard, you will fail.

7. USING GIVEN WORDS:
   Example: Rewrite using 'unless':
   "Study hard or you won't pass." 
   → "You won't pass unless you study hard."

8. TOO…TO / ENOUGH…TO:
   • The box is too heavy to lift. (= so heavy that I can't lift it)
   • She is old enough to drive. (= she has the required age)
   • He is too young to vote. → He is not old enough to vote.

TIPS:
• Keep the MEANING the same — only the form changes
• Check tense, pronouns, and punctuation
• Read both sentences aloud to check they mean the same thing`,
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "Rewrite in passive: 'The students completed the project.' The project ___",
          options: [
            "was completed by the students.",
            "is completed by the students.",
            "completed by the students.",
            "had completed by the students."
          ],
          correct_answer: 0,
        },
        {
          id: 2,
          question: "Rewrite using 'unless': 'Study hard or you will fail.'",
          options: [
            "Unless you fail, you will study hard.",
            "You will fail unless you study hard.",
            "Unless studying hard, you will fail.",
            "You study hard unless you fail."
          ],
          correct_answer: 1,
        },
        {
          id: 3,
          question: "Rewrite using 'too…to': 'She was so tired that she couldn't walk.'",
          options: [
            "She was very tired to walk.",
            "She was too tired to walk.",
            "She was enough tired to walk.",
            "She was too tired for walking."
          ],
          correct_answer: 1,
        },
        {
          id: 4,
          question: "Direct to indirect: 'He said, \"I will come tomorrow.\"'",
          options: [
            "He said that he will come tomorrow.",
            "He said that he would come the next day.",
            "He said that I will come tomorrow.",
            "He told that he will come the next day."
          ],
          correct_answer: 1,
        },
        {
          id: 5,
          question: "Which is correct negative of 'She always arrives on time'?",
          options: [
            "She doesn't always arrive on time.",
            "She never arrives late.",
            "She is not always arrives on time.",
            "She don't arrive on time."
          ],
          correct_answer: 1,
        },
      ],
    },
  },

  // ===== UNIT 1 (continued): GRAMMAR =====
  {
    id: 2035,
    title: "Conjunctions and Connectives",
    description: "Using conjunctions to join clauses and connectives to link ideas in sentences and paragraphs.",
    level: 1,
    xp_reward: 50,
    content: {
      text: `Conjunctions and Connectives

CONJUNCTIONS join words, phrases, or clauses together.

Co-ordinating Conjunctions (FANBOYS):
• For, And, Nor, But, Or, Yet, So
• Join two independent clauses of equal importance
• I wanted to go, but it was raining.
• She studied hard, so she passed the exam.

Subordinating Conjunctions:
• Join a subordinate clause to a main clause
• because, although, since, unless, while, when, if, after, before, until
• I stayed home because I was sick.
• Although it was late, he kept working.

Correlative Conjunctions (pairs):
• both...and, either...or, neither...nor, not only...but also
• Neither the teacher nor the student was late.
• Not only did she sing, but she also danced.

CONNECTIVES link ideas within and between paragraphs:

Adding: furthermore, moreover, in addition, also, besides
Contrasting: however, on the other hand, nevertheless, despite, whereas
Cause/Effect: therefore, as a result, consequently, thus, hence
Sequencing: firstly, secondly, finally, subsequently, meanwhile
Exemplifying: for example, for instance, such as, namely
Summarising: in conclusion, to sum up, overall, in brief

Using Connectives in Writing:
• Start a new point: Firstly, the government should...
• Add a point: Furthermore, students need...
• Contrast: However, there are drawbacks...
• Conclude: In conclusion, it is clear that...`
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "Choose the correct conjunction: 'I will come _____ I finish my work.'",
          options: ["but", "when", "so", "and"],
          correct_answer: 1,
        },
        {
          id: 2,
          question: "Which is a co-ordinating conjunction?",
          options: ["although", "because", "but", "since"],
          correct_answer: 2,
        },
        {
          id: 3,
          question: "Fill in: '_____ it was cold, she wore a light jacket.'",
          options: ["Because", "Although", "So", "When"],
          correct_answer: 1,
        },
        {
          id: 4,
          question: "Which connective shows CONTRAST?",
          options: ["Furthermore", "Therefore", "However", "Finally"],
          correct_answer: 2,
        },
        {
          id: 5,
          question: "Complete: 'Neither the boys _____ the girls wanted to leave early.'",
          options: ["or", "and", "but", "nor"],
          correct_answer: 3,
        },
      ],
    },
  },

  {
    id: 2036,
    title: "Adjectives and Adverbs",
    description: "Using adjectives to describe nouns and adverbs to modify verbs, adjectives, and other adverbs.",
    level: 1,
    xp_reward: 50,
    content: {
      text: `Adjectives and Adverbs

ADJECTIVES describe or modify NOUNS.

Types of Adjectives:
• Descriptive: tall, beautiful, heavy, cold
• Quantitative: some, many, few, enough, several
• Demonstrative: this, that, these, those
• Interrogative: which, what, whose
• Possessive: my, your, his, her, our, their

Order of Adjectives (when using multiple):
Opinion → Size → Age → Shape → Colour → Origin → Material → Purpose
• a beautiful small old wooden box ✓
• a wooden small beautiful old box ✗

Degrees of Comparison:
• Positive: tall, happy, good, bad
• Comparative: taller, happier, better, worse (-er or more)
• Superlative: tallest, happiest, best, worst (-est or most)

Rules:
• One syllable: add -er/-est (tall → taller → tallest)
• Two syllables ending -y: change to -ier/-iest
• Three+ syllables: use more/most (more beautiful, most intelligent)
• Irregular: good/better/best, bad/worse/worst, many/more/most

ADVERBS modify VERBS, ADJECTIVES, or other ADVERBS.

Types:
• Manner: slowly, carefully, well, badly, quickly
• Time: now, soon, already, yet, still, today
• Place: here, there, everywhere, nearby
• Frequency: always, usually, often, sometimes, rarely, never
• Degree: very, quite, rather, too, enough, extremely

Formation: adjective + -ly → quickly, carefully, badly
Exceptions: good → well, fast → fast, hard → hard`
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "Which sentence uses the correct order of adjectives?",
          options: [
            "A red big old car",
            "A big old red car",
            "An old red big car",
            "A red old big car"
          ],
          correct_answer: 1,
        },
        {
          id: 2,
          question: "What is the superlative form of 'beautiful'?",
          options: ["beautifulest", "more beautiful", "most beautiful", "most beautifullest"],
          correct_answer: 2,
        },
        {
          id: 3,
          question: "Identify the adverb: 'She spoke very softly.'",
          options: ["She", "spoke", "very", "softly"],
          correct_answer: 3,
        },
        {
          id: 4,
          question: "What is the comparative of 'good'?",
          options: ["gooder", "more good", "better", "best"],
          correct_answer: 2,
        },
        {
          id: 5,
          question: "Which adverb shows FREQUENCY?",
          options: ["quickly", "here", "always", "very"],
          correct_answer: 2,
        },
      ],
    },
  },

  {
    id: 2037,
    title: "Pronouns and Determiners",
    description: "Personal, reflexive, relative, and indefinite pronouns; using determiners correctly.",
    level: 1,
    xp_reward: 50,
    content: {
      text: `Pronouns and Determiners

PRONOUNS replace nouns to avoid repetition.

Personal Pronouns:
• Subject: I, you, he, she, it, we, they
• Object: me, you, him, her, it, us, them
• Possessive: mine, yours, his, hers, its, ours, theirs

Reflexive Pronouns (-self/-selves):
• myself, yourself, himself, herself, itself, ourselves, yourselves, themselves
• Use when subject and object are the same: She hurt herself.
• For emphasis: He himself admitted the mistake.

Relative Pronouns (introduce relative clauses):
• who → for people (subject)
• whom → for people (object)
• which → for things
• that → for people or things
• whose → possession
• The man who called was my uncle.
• The book that I read was interesting.

Indefinite Pronouns:
• everyone, someone, anyone, no one, nobody
• everything, something, anything, nothing
• Use singular verb: Everyone is ready. Nothing was found.

DETERMINERS come before nouns:
• Articles: a, an, the
• Possessives: my, your, his, her, our, their
• Demonstratives: this, that, these, those
• Quantifiers: some, any, many, much, few, little, several, all, both, each, every
• Numbers: one, two, first, second

Quantifiers:
• Countable nouns: many, few, a few, several, a number of
• Uncountable nouns: much, little, a little, a great deal of
• Both: some, any, a lot of, plenty of, all`
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "Choose the correct pronoun: 'Between you and ___, this is a secret.'",
          options: ["I", "me", "myself", "mine"],
          correct_answer: 1,
        },
        {
          id: 2,
          question: "Which relative pronoun is correct? 'The girl ___ won the prize is my sister.'",
          options: ["which", "whom", "whose", "who"],
          correct_answer: 3,
        },
        {
          id: 3,
          question: "Which quantifier goes with uncountable nouns?",
          options: ["many", "few", "much", "several"],
          correct_answer: 2,
        },
        {
          id: 4,
          question: "'Everyone ___ invited to the party.' Choose the correct verb.",
          options: ["are", "were", "is", "have been"],
          correct_answer: 2,
        },
        {
          id: 5,
          question: "He cooked the meal ___. (He cooked it alone, no help)",
          options: ["him", "his own", "himself", "he"],
          correct_answer: 2,
        },
      ],
    },
  },

  {
    id: 2038,
    title: "Nouns — Types and Number",
    description: "Types of nouns, forming plurals, countable vs uncountable, and collective nouns.",
    level: 1,
    xp_reward: 45,
    content: {
      text: `Nouns — Types and Number

TYPES OF NOUNS:

Common Nouns: general names for people, places, things
• teacher, city, book, river, car

Proper Nouns: specific names (always capitalised)
• Colombo, Dilshan, Kandy, Amazon, Monday

Abstract Nouns: ideas, feelings, qualities
• love, courage, happiness, freedom, knowledge, wisdom

Concrete Nouns: things you can see or touch
• table, flower, rain, music

Collective Nouns: groups of people/animals/things
• a herd of cattle, a flock of birds, a bunch of flowers
• a class of students, a team of players, a pack of wolves
• a pride of lions, a school of fish, a swarm of bees

Countable vs Uncountable Nouns:
• Countable: book/books, child/children, idea/ideas
• Uncountable: water, advice, information, luggage, furniture, news, money

Note: Uncountable nouns take singular verbs and cannot use a/an directly.
• ✗ an information → ✓ a piece of information
• ✗ advices → ✓ pieces of advice

FORMING PLURALS:
Regular: + s (book → books, car → cars)
• -s, -ss, -sh, -ch, -x + es: bus → buses, box → boxes
• consonant + y → ies: city → cities, baby → babies
• -f/-fe → ves: leaf → leaves, knife → knives

Irregular Plurals:
• man → men, woman → women, child → children
• tooth → teeth, foot → feet, mouse → mice
• ox → oxen, sheep → sheep, deer → deer, fish → fish`
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "Which is a collective noun?",
          options: ["elephant", "running", "herd", "quickly"],
          correct_answer: 2,
        },
        {
          id: 2,
          question: "What is the plural of 'child'?",
          options: ["childs", "childes", "children", "childrens"],
          correct_answer: 2,
        },
        {
          id: 3,
          question: "Which is an uncountable noun?",
          options: ["table", "advice", "book", "student"],
          correct_answer: 1,
        },
        {
          id: 4,
          question: "'Happiness' is what type of noun?",
          options: ["Proper", "Concrete", "Collective", "Abstract"],
          correct_answer: 3,
        },
        {
          id: 5,
          question: "Which sentence is correct?",
          options: [
            "Can you give me an advice?",
            "I need some informations.",
            "She gave me a piece of advice.",
            "He bought a furniture."
          ],
          correct_answer: 2,
        },
      ],
    },
  },

  // ===== UNIT 2 (continued): READING COMPREHENSION =====
  {
    id: 2039,
    title: "Comprehension — Tables, Forms and Schedules",
    description: "Reading and extracting information from tables, timetables, forms, and schedules.",
    level: 2,
    xp_reward: 55,
    content: {
      text: `Comprehension — Tables, Forms and Schedules

Reading Non-Linear Texts:
Non-linear texts present information in visual formats — you don't read them from top to bottom like a story. They include: tables, forms, timetables, schedules, charts, diagrams, menus, and catalogues.

STRATEGIES for Reading Tables:
1. Read all headings (row headings and column headings) first
2. Identify what each row and column represents
3. Locate the intersection to find specific data
4. Note any footnotes or special symbols

TIMETABLES:
• Look at both the horizontal and vertical axes
• Departure and arrival times use 24-hour or 12-hour format
• 24-hour: 1300 = 1:00 PM, 0800 = 8:00 AM
• Calculate duration: 1350 - 0920 = 4 hours 30 minutes

FORMS:
Types commonly seen in O/L:
• Application forms (job, school, club membership)
• Order forms
• Registration forms
• Survey questionnaires

Key parts of a form:
• Personal details section (name, address, date of birth)
• Purpose of the form
• Signature and date

Exam Question Types:
• "According to the table, what time does the train leave?"
• "Which product costs the least?"
• "How long does the journey take?"
• "Fill in the form using information from the passage."
• "What information is missing from the form?"

Tips:
• Always refer back to the text/table — do not guess
• Note the exact wording asked for
• Watch for AM/PM or 24-hour clock differences`
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "What should you read FIRST when looking at a table?",
          options: ["The last row", "The footnotes", "All the headings", "The middle column"],
          correct_answer: 2,
        },
        {
          id: 2,
          question: "Convert 1445 (24-hour) to 12-hour time.",
          options: ["2:45 AM", "2:45 PM", "4:45 PM", "12:45 PM"],
          correct_answer: 1,
        },
        {
          id: 3,
          question: "A train departs at 0920 and arrives at 1350. How long is the journey?",
          options: ["3 hours 30 minutes", "4 hours 30 minutes", "4 hours", "5 hours"],
          correct_answer: 1,
        },
        {
          id: 4,
          question: "In a reading comprehension, your answer must be based on:",
          options: ["Your own opinion", "General knowledge", "The text provided", "What sounds logical"],
          correct_answer: 2,
        },
        {
          id: 5,
          question: "Which is a non-linear text?",
          options: ["A novel chapter", "A timetable", "A poem", "A speech"],
          correct_answer: 1,
        },
      ],
    },
  },

  {
    id: 2040,
    title: "Comprehension — Graphs, Diagrams and Visuals",
    description: "Interpreting bar graphs, pie charts, line graphs, flow charts, and labelled diagrams.",
    level: 2,
    xp_reward: 55,
    content: {
      text: `Comprehension — Graphs, Diagrams and Visuals

READING GRAPHS:
Bar Graphs (column/horizontal):
• Each bar represents a category
• Height/length shows value
• Compare bars to find highest, lowest, trends
• Always check axis labels and scale

Line Graphs:
• Shows change over time
• Rising line = increase, falling line = decrease
• Steep slope = rapid change

Pie Charts:
• Circle divided into sectors showing proportions
• Each sector represents a percentage of the whole
• All sectors must total 100%

VOCABULARY for describing graphs:
Rising: increased, rose, went up, climbed, grew, surged
Falling: decreased, fell, dropped, declined, reduced
Stable: remained constant, stayed the same, levelled off
Peak: reached a maximum, peaked at, hit its highest point
Trough: reached a minimum, fell to its lowest point

FLOW CHARTS:
• Show a process or sequence of steps
• Follow arrows in order
• Decision diamonds have Yes/No paths

LABELLED DIAGRAMS:
• Read labels carefully
• Understand the relationship between parts
• Answer questions about function or location of parts

Exam Tips:
• Read axis labels before reading data
• Note the units (%, kg, years, etc.)
• When describing trends, use numbers/figures from the graph
• Compare data points using: more than, less than, twice as many, half`
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "In a pie chart, what must all the sectors add up to?",
          options: ["360", "100%", "50%", "200%"],
          correct_answer: 1,
        },
        {
          id: 2,
          question: "A line graph shows a steep downward slope. This means:",
          options: ["Rapid increase", "Slow increase", "Rapid decrease", "No change"],
          correct_answer: 2,
        },
        {
          id: 3,
          question: "Which word best describes data that 'remained constant'?",
          options: ["Increased", "Stable", "Declined", "Peaked"],
          correct_answer: 1,
        },
        {
          id: 4,
          question: "What shape represents a DECISION in a flow chart?",
          options: ["Rectangle", "Circle", "Diamond", "Arrow"],
          correct_answer: 2,
        },
        {
          id: 5,
          question: "Before reading data in a graph, you should first check:",
          options: ["The title and axis labels", "The footnotes only", "The colours used", "Nothing — just start reading"],
          correct_answer: 0,
        },
      ],
    },
  },

  // ===== UNIT 3 (continued): WRITING SKILLS =====
  {
    id: 2041,
    title: "Argumentative and Discursive Writing",
    description: "Writing balanced arguments and one-sided persuasive essays on given topics.",
    level: 3,
    xp_reward: 65,
    content: {
      text: `Argumentative and Discursive Writing

ARGUMENTATIVE ESSAY:
• Takes ONE side and argues for it strongly
• Persuades the reader to agree with your point of view

DISCURSIVE ESSAY:
• Presents BOTH sides of an argument
• Concludes with your own view or a balanced verdict

STRUCTURE:

Introduction:
• Hook the reader (quote, statistic, question)
• State the topic/issue clearly
• Give your thesis statement (your position)

Body Paragraphs:
• Each paragraph = ONE main idea
• Topic sentence → Evidence/Explanation → Example → Link back
• Use connectives: Firstly, Furthermore, In addition, However, On the other hand

Conclusion:
• Restate your main argument (in different words)
• Summarise key points
• End with a strong closing statement

PERSUASIVE TECHNIQUES:
• Facts and statistics: "Research shows that 70% of..."
• Expert opinion: "According to scientists..."
• Rhetorical questions: "Can we afford to ignore this?"
• Emotive language: "the suffering of innocent children"
• Rule of three: "It is cheap, easy, and effective."
• Counter-argument + rebuttal: "Some argue... However, this fails to consider..."

Common Topics in O/L:
• Social media and its effects
• Environmental issues
• Education and technology
• Health and lifestyle
• Gender equality
• Youth and society`
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "What is the main difference between an argumentative and a discursive essay?",
          options: [
            "Length",
            "Argumentative takes one side; discursive presents both",
            "Discursive uses no examples",
            "Argumentative has no conclusion"
          ],
          correct_answer: 1,
        },
        {
          id: 2,
          question: "Which is an example of a rhetorical question?",
          options: [
            "The temperature is 35 degrees.",
            "Can we really afford to ignore climate change?",
            "Trees produce oxygen.",
            "Many experts agree on this issue."
          ],
          correct_answer: 1,
        },
        {
          id: 3,
          question: "What should a topic sentence do?",
          options: [
            "Conclude the essay",
            "State the main idea of the paragraph",
            "Give a counter-argument",
            "Repeat the introduction"
          ],
          correct_answer: 1,
        },
        {
          id: 4,
          question: "Which connective would you use to introduce the OTHER side of an argument?",
          options: ["Furthermore", "In addition", "On the other hand", "Therefore"],
          correct_answer: 2,
        },
        {
          id: 5,
          question: "A 'rebuttal' in an essay means:",
          options: [
            "Agreeing with the other side",
            "Giving statistics",
            "Countering or disproving the opposing argument",
            "Summarising your own argument"
          ],
          correct_answer: 2,
        },
      ],
    },
  },

  {
    id: 2042,
    title: "Notice, Poster and Advertisement Writing",
    description: "Writing clear, effective notices, posters, and advertisements for various purposes.",
    level: 3,
    xp_reward: 55,
    content: {
      text: `Notice, Poster and Advertisement Writing

NOTICE WRITING:
A notice is a formal announcement to inform a group of people about an event, meeting, or important information.

Structure of a Notice:
1. Name of organisation/school (at the top)
2. Title: NOTICE (in capitals, underlined)
3. Date
4. Body: What, When, Where, Who, Why
5. Signature and designation of the writer

Features:
• Formal language
• Brief and to the point
• No unnecessary details
• Present/Future tense
• Use of headings and clear layout

Example:
ST. MARY'S COLLEGE
NOTICE
15 January 2025
This is to inform all students that the Annual Sports Day will be held on 25 January 2025 at the school grounds. All students are required to attend by 7.30 a.m.
Signed: The Principal

POSTER WRITING:
• Eye-catching headline
• Key information clearly presented
• Brief — bullet points or short phrases
• Include: event, date, time, venue, contact details
• May include a slogan or tagline

ADVERTISEMENT WRITING:
Types: Job ads, product ads, lost-and-found, property rental

Structure:
• Headline (bold, attention-grabbing)
• Body (details, features, benefits)
• Contact information
• Call to action: "Apply now!", "Call today!"

Classified Ads (short notices):
• For sale: "Honda Civic 2019, low mileage, excellent condition. Call 0712345678."
• Lost: "Lost: Brown wallet near Galle Road. Reward offered. Call..."
• Wanted: "Experienced English tutor needed for Grade 11 student..."`
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "What should appear at the TOP of a school notice?",
          options: ["The signature", "The date", "The organisation name", "Contact details"],
          correct_answer: 2,
        },
        {
          id: 2,
          question: "A notice should be:",
          options: [
            "Long and detailed like a letter",
            "Brief, formal and informative",
            "Informal and chatty",
            "Written in bullet points only"
          ],
          correct_answer: 1,
        },
        {
          id: 3,
          question: "Which is NOT a key detail to include in a notice about an event?",
          options: ["Date", "Venue", "The writer's personal opinion", "Time"],
          correct_answer: 2,
        },
        {
          id: 4,
          question: "A poster should mainly be:",
          options: [
            "Full of long paragraphs",
            "Eye-catching with brief key information",
            "Written in formal letter style",
            "Always in black and white"
          ],
          correct_answer: 1,
        },
        {
          id: 5,
          question: "Which type of advertisement would you use if you LOST something?",
          options: ["Product advertisement", "Job advertisement", "Lost-and-found classified", "Property advertisement"],
          correct_answer: 2,
        },
      ],
    },
  },

  {
    id: 2043,
    title: "Formal Letter Writing — Complaint and Request",
    description: "Writing formal complaint letters, request letters, and letters of application.",
    level: 3,
    xp_reward: 60,
    content: {
      text: `Formal Letter Writing — Complaint and Request

STRUCTURE OF A FORMAL LETTER:
1. Sender's address (top right)
2. Date (below sender's address)
3. Recipient's name and address (top left)
4. Salutation: Dear Sir/Madam, Dear Mr./Ms. [Name]
5. Subject line (optional but useful)
6. Body (introduction, details, action required)
7. Closing: Yours faithfully (when you don't know the name)
           Yours sincerely (when you know the name)
8. Signature and full name

COMPLAINT LETTER:
• State clearly what you are complaining about
• Give factual details (dates, amounts, reference numbers)
• Explain how it affected you
• State what action you expect
• Remain polite even if annoyed

Useful phrases:
• "I am writing to express my dissatisfaction with..."
• "On [date], I purchased/visited/experienced..."
• "I would appreciate it if you could..."
• "I look forward to hearing from you."

REQUEST LETTER:
• State your request clearly and politely
• Give reasons for the request
• Provide relevant details
• Thank the reader in advance

Useful phrases:
• "I am writing to request..."
• "I would be grateful if you could..."
• "I would appreciate your assistance in..."

LETTER OF APPLICATION:
• State the position you are applying for
• Mention where you saw the advertisement
• Highlight relevant qualifications and experience
• Express enthusiasm
• Request an interview

Opening: "I wish to apply for the post of..."
Closing: "I hope you will consider my application favourably."`
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "When should you use 'Yours faithfully' to close a letter?",
          options: [
            "When you know the recipient's name",
            "When you don't know the recipient's name",
            "In informal letters only",
            "Always, in all letters"
          ],
          correct_answer: 1,
        },
        {
          id: 2,
          question: "In a complaint letter, you should:",
          options: [
            "Be rude and demanding",
            "Be emotional and dramatic",
            "Be factual, polite, and state expected action",
            "Avoid giving specific details"
          ],
          correct_answer: 2,
        },
        {
          id: 3,
          question: "Where does the SENDER'S address go in a formal letter?",
          options: ["Top left", "Bottom of the letter", "Top right", "Next to the salutation"],
          correct_answer: 2,
        },
        {
          id: 4,
          question: "Which phrase is most appropriate for a formal request?",
          options: [
            "Give me the information ASAP.",
            "I would be grateful if you could provide the information.",
            "Hey, can you send me details?",
            "I need this urgently, so please hurry."
          ],
          correct_answer: 1,
        },
        {
          id: 5,
          question: "A letter of application should mention:",
          options: [
            "Your personal problems",
            "The position applied for and relevant qualifications",
            "Your complaints about the job",
            "Only your name and address"
          ],
          correct_answer: 1,
        },
      ],
    },
  },

  {
    id: 2044,
    title: "Informal Letter and Personal Writing",
    description: "Writing informal letters, diary entries, journal entries, and personal anecdotes.",
    level: 3,
    xp_reward: 50,
    content: {
      text: `Informal Letter and Personal Writing

INFORMAL LETTER:
Written to a friend, family member, or someone you know well.

Structure:
1. Your address (top right) — optional in very informal letters
2. Date
3. Salutation: Dear [First name], Hi [Name],
4. Opening line: "How are you?" / "I hope this letter finds you well."
5. Body: natural, conversational tone
6. Closing: Love, With love, Best wishes, Yours, Take care,
7. Your first name only

Features of Informal Writing:
• Conversational and friendly tone
• Can use contractions: I'm, it's, can't, won't
• Personal anecdotes and feelings
• Questions to engage the reader
• Exclamation marks and casual expressions

DIARY ENTRY:
• Date and day at the top
• "Dear Diary," as opening
• Written in first person (I, my, me)
• Honest, personal, emotional
• Past tense for events, present for feelings
• No need for formal structure

Example:
Thursday, 15 January 2025
Dear Diary,
Today was one of the most exciting days of my life! We had our school trip to Sigiriya...

PERSONAL ANECDOTE:
• True story from personal experience
• Hook the reader at the start
• Use sensory details (what you saw, heard, felt)
• Build up to the main event
• Reflect on what you learned or felt

JOURNAL ENTRY:
Similar to a diary but may be less personal — can be a travel journal, learning journal, science journal.`
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "Which closing is appropriate for an informal letter to a friend?",
          options: ["Yours faithfully,", "Yours sincerely,", "Best wishes,", "Respectfully,"],
          correct_answer: 2,
        },
        {
          id: 2,
          question: "Can you use contractions like 'it's' and 'I'm' in an informal letter?",
          options: ["Never", "Only in the conclusion", "Yes, it's natural and acceptable", "Only in formal letters"],
          correct_answer: 2,
        },
        {
          id: 3,
          question: "A diary entry should begin with:",
          options: ["To whom it may concern,", "Dear Diary, plus the date", "Yours faithfully,", "A formal subject line"],
          correct_answer: 1,
        },
        {
          id: 4,
          question: "In personal writing, which tense is used for events that already happened?",
          options: ["Present tense", "Future tense", "Past tense", "Conditional tense"],
          correct_answer: 2,
        },
        {
          id: 5,
          question: "What makes a personal anecdote engaging?",
          options: [
            "Very formal language",
            "Avoiding emotions and opinions",
            "Sensory details and a clear build-up",
            "Using only facts with no feelings"
          ],
          correct_answer: 2,
        },
      ],
    },
  },

  // ===== UNIT 4 (continued): VOCABULARY =====
  {
    id: 2045,
    title: "Spelling Rules and Common Errors",
    description: "Key spelling rules, commonly misspelled words, and homophones in English.",
    level: 4,
    xp_reward: 50,
    content: {
      text: `Spelling Rules and Common Errors

KEY SPELLING RULES:

1. i before e, except after c:
• believe, achieve, field, piece ✓
• receive, ceiling, deceive ✓ (after c)
• EXCEPTIONS: weird, neighbour, weight, height, their

2. Doubling the final consonant:
• For short vowel + consonant words, double before -ing/-ed
• run → running, sit → sitting, stop → stopped
• Do NOT double if word ends in 2 consonants or has long vowel
• talk → talking, meet → meeting

3. Dropping the silent -e:
• Before a vowel suffix: make → making, hope → hoping
• Keep before consonant suffix: love → lovely, safe → safety

4. Changing y to i:
• Before a suffix (except -ing): carry → carried, happy → happiness
• Keep y before -ing: carry → carrying

COMMONLY CONFUSED WORDS (Homophones):
• there/their/they're: There is a cat. Their cat. They're coming.
• to/too/two: I want to go too. Two cats.
• your/you're: Is this your book? You're late.
• its/it's: The cat licked its paw. It's raining.
• affect/effect: Noise affects sleep. (verb) The effect is bad. (noun)
• then/than: First this, then that. Taller than I am.
• accept/except: I accept the gift. Everyone except him.
• lose/loose: Don't lose your key. A loose tooth.
• advice/advise: Give advice (noun). I advise you (verb).
• principal/principle: School principal. A moral principle.`
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "Which spelling is correct?",
          options: ["recieve", "recieve", "receive", "receve"],
          correct_answer: 2,
        },
        {
          id: 2,
          question: "Choose the correct word: 'Can I borrow ___ pen?'",
          options: ["you're", "your", "yore", "youre"],
          correct_answer: 1,
        },
        {
          id: 3,
          question: "Which is correct? 'The medicine had a strange ___.'",
          options: ["affect", "effect", "affact", "efect"],
          correct_answer: 1,
        },
        {
          id: 4,
          question: "Correct spelling when adding -ing to 'run':",
          options: ["runing", "running", "runeing", "runding"],
          correct_answer: 1,
        },
        {
          id: 5,
          question: "Choose the correct sentence:",
          options: [
            "Their going to the market.",
            "There going to the market.",
            "They're going to the market.",
            "Theyre going to the market."
          ],
          correct_answer: 2,
        },
      ],
    },
  },

  {
    id: 2046,
    title: "Formal and Informal Register",
    description: "Understanding and using appropriate language register in different situations.",
    level: 4,
    xp_reward: 55,
    content: {
      text: `Formal and Informal Register

REGISTER refers to the style and tone of language used in different situations.

FORMAL REGISTER:
Used in: official letters, reports, essays, speeches, interviews, academic writing

Features:
• Full words (no contractions): I am, it is, cannot, will not
• Formal vocabulary: commence, sufficient, regarding, consequently
• Passive voice: "It has been decided that..."
• Complex sentences with formal connectives
• Impersonal tone: "It is believed that..." rather than "I think..."
• No slang, colloquialisms, or emotive casual language

Formal Vocabulary Examples:
Informal → Formal
• ask → enquire / request
• but → however / nevertheless
• show → demonstrate / indicate
• need → require
• get → obtain / receive
• start → commence / initiate
• end → conclude / terminate

INFORMAL REGISTER:
Used in: conversations, text messages, informal letters, diary entries, social media

Features:
• Contractions: I'm, it's, can't, won't, I'd
• Colloquial expressions: kind of, loads of, a bit, stuff
• Slang: cool, awesome, wanna, gonna
• Short, simple sentences
• First person and direct address
• Rhetorical questions and exclamations

Code-Switching:
• Adjusting your language depending on the audience and context
• Important skill in both real life and O/L exams

Exam Tip:
• Always check: Who is the audience? What is the purpose? What is the context?
• Mixing registers (formal + slang) in one piece is an error`
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "Which sentence uses FORMAL register?",
          options: [
            "Gonna give you a call later!",
            "I would like to request your assistance.",
            "Hey, can you help me out?",
            "That's totally cool with me."
          ],
          correct_answer: 1,
        },
        {
          id: 2,
          question: "What is the formal equivalent of 'start'?",
          options: ["begin", "commence", "kick off", "get going"],
          correct_answer: 1,
        },
        {
          id: 3,
          question: "Which context requires INFORMAL language?",
          options: [
            "A letter of complaint to a company",
            "A text message to your best friend",
            "A job application letter",
            "A formal speech"
          ],
          correct_answer: 1,
        },
        {
          id: 4,
          question: "Which feature is found in FORMAL writing?",
          options: [
            "Contractions like 'I'm'",
            "Slang expressions",
            "Impersonal tone",
            "Short, chatty sentences"
          ],
          correct_answer: 2,
        },
        {
          id: 5,
          question: "Code-switching means:",
          options: [
            "Using only one language style always",
            "Adjusting language style to suit audience and context",
            "Mixing English with Sinhala",
            "Using slang in formal writing"
          ],
          correct_answer: 1,
        },
      ],
    },
  },

  // ===== UNIT 5 (continued): LITERATURE =====
  {
    id: 2047,
    title: "Short Story — Elements and Analysis",
    description: "Analysing the elements of a short story: plot, character, setting, theme, and narrative voice.",
    level: 5,
    xp_reward: 60,
    content: {
      text: `Short Story — Elements and Analysis

ELEMENTS OF A SHORT STORY:

1. PLOT (the story structure):
• Exposition: Introduction of characters and setting
• Rising action: Events leading to the climax
• Climax: The turning point / most intense moment
• Falling action: Events after the climax
• Resolution / Denouement: How things conclude

2. CHARACTERS:
• Protagonist: The main character (hero/heroine)
• Antagonist: The character working against the protagonist
• Static character: Does not change throughout the story
• Dynamic character: Changes or develops during the story
• Round character: Complex, lifelike
• Flat character: One-dimensional, simple

3. SETTING:
• Time and place of the story
• Can create mood (dark forest = danger, sunny beach = happiness)
• Can reflect character's emotional state (pathetic fallacy)

4. THEME:
• The central message or idea the author wants to convey
• Not just the topic — it is a statement about life
• e.g., "Greed leads to destruction" not just "money"

5. NARRATIVE VOICE:
• First person (I, we): narrator is a character
• Third person limited: narrator follows one character's thoughts
• Third person omniscient: narrator knows all characters' thoughts

6. TONE AND MOOD:
• Tone: Author's attitude (humorous, sad, ironic, angry)
• Mood: How the reader feels (tense, joyful, fearful)

Literary Devices in Short Stories:
• Foreshadowing: hints about what will happen
• Flashback: return to earlier events
• Irony: when things are opposite to what is expected
• Symbolism: objects/characters representing bigger ideas`
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "The CLIMAX of a story is:",
          options: [
            "The beginning of the story",
            "The introduction of characters",
            "The turning point or most intense moment",
            "How the story ends"
          ],
          correct_answer: 2,
        },
        {
          id: 2,
          question: "A character who changes during the story is called:",
          options: ["Flat", "Static", "Antagonist", "Dynamic"],
          correct_answer: 3,
        },
        {
          id: 3,
          question: "If a story is told using 'I', what narrative voice is used?",
          options: ["Third person omniscient", "Second person", "First person", "Third person limited"],
          correct_answer: 2,
        },
        {
          id: 4,
          question: "Which literary device hints at what will happen later in a story?",
          options: ["Flashback", "Foreshadowing", "Irony", "Symbolism"],
          correct_answer: 1,
        },
        {
          id: 5,
          question: "The THEME of a story is best described as:",
          options: [
            "The title of the story",
            "Where the story takes place",
            "The central message the author conveys",
            "The name of the main character"
          ],
          correct_answer: 2,
        },
      ],
    },
  },

  {
    id: 2048,
    title: "Poetry — Comprehension and Appreciation",
    description: "Reading and appreciating poems: meaning, imagery, rhythm, rhyme, and poetic devices.",
    level: 5,
    xp_reward: 60,
    content: {
      text: `Poetry — Comprehension and Appreciation

UNDERSTANDING A POEM:
1. Read the whole poem first — get a general impression
2. Identify the speaker (persona)
3. Identify the subject / topic
4. Look at title, first and last lines for clues
5. Work through difficult lines carefully
6. Identify the mood and tone

POETIC DEVICES:

Imagery: Language that creates pictures in the reader's mind
• Visual: "golden fields of wheat"
• Auditory: "the rustling of dried leaves"
• Tactile: "the rough bark of the old tree"

Simile: Comparing using 'like' or 'as'
• "Her eyes were like stars."
• "He ran as fast as a cheetah."

Metaphor: Saying something IS something else (no like/as)
• "Life is a journey."
• "The classroom was a zoo."

Personification: Giving human qualities to non-human things
• "The wind whispered through the trees."
• "The sun smiled down on us."

Alliteration: Repetition of the same consonant sound at the start of words
• "The slippery snake slid silently."

Onomatopoeia: Words that sound like what they describe
• buzz, crash, hiss, sizzle, roar, murmur

Repetition: Repeating words or phrases for emphasis
• "We shall fight on the beaches, we shall fight on the seas..."

Rhyme and Rhythm:
• End rhyme: Last words of lines rhyme
• Rhyme scheme: ABAB, ABCB, AABB (couplets)
• Rhythm: The beat or flow created by stressed/unstressed syllables`
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "Which line uses a SIMILE?",
          options: [
            "The moon is a lantern.",
            "The moon glowed softly.",
            "The moon shone like a lantern.",
            "The moon whispered to the night."
          ],
          correct_answer: 2,
        },
        {
          id: 2,
          question: "\"The trees danced in the breeze\" is an example of:",
          options: ["Simile", "Alliteration", "Personification", "Onomatopoeia"],
          correct_answer: 2,
        },
        {
          id: 3,
          question: "Which word is an example of ONOMATOPOEIA?",
          options: ["beautiful", "crash", "quickly", "sad"],
          correct_answer: 1,
        },
        {
          id: 4,
          question: "\"Peter Piper picked a peck of pickled peppers\" uses:",
          options: ["Rhyme", "Onomatopoeia", "Alliteration", "Metaphor"],
          correct_answer: 2,
        },
        {
          id: 5,
          question: "The TONE of a poem refers to:",
          options: [
            "The rhyme scheme",
            "The author's attitude or feeling toward the subject",
            "The length of the poem",
            "The number of stanzas"
          ],
          correct_answer: 1,
        },
      ],
    },
  },

  // ===== UNIT 6: EXAM PRACTICE =====
  {
    id: 2049,
    title: "O/L English Paper — Section B (Reading) Practice",
    description: "Full practice for Section B of the O/L English paper — reading comprehension questions.",
    level: 6,
    xp_reward: 75,
    content: {
      text: `O/L English Paper — Section B (Reading) Practice

THE READING PAPER — What to expect:
The Sri Lankan O/L English Language paper tests your ability to:
• Extract information from passages
• Understand main ideas and supporting details
• Infer meaning from context
• Understand vocabulary in context
• Understand writer's purpose and attitude

TYPES OF QUESTIONS:

1. True/False/Not Given:
• True: The statement matches the text
• False: The statement contradicts the text
• Not Given: The information is not in the text
• Tip: Do NOT use your own knowledge — only use the text!

2. Short Answer Questions:
• Answer ONLY what is asked
• Use the exact words from the passage where possible
• Keep answers brief and precise

3. Vocabulary in Context:
• "What does the word '___' in paragraph 2 mean?"
• Use context clues from the surrounding sentences
• Check if the meaning makes sense when substituted

4. Inference Questions:
• "What can we conclude about...?"
• "What does the writer imply when he says...?"
• The answer is NOT stated directly — you must read between the lines

5. Writer's Purpose / Attitude:
• WHY did the writer include this information?
• How does the writer FEEL about the subject?
• Look for emotive words, tone indicators

EXAM STRATEGY:
1. Read the questions FIRST before reading the passage
2. Underline key words in each question
3. Read the passage actively, noting where answers may be
4. Always go back to the text to support your answer
5. Check your answers make grammatical sense`
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "When answering 'True/False/Not Given' questions, you should:",
          options: [
            "Use your background knowledge",
            "Only use information from the passage",
            "Guess if you are not sure",
            "Look online for the answer"
          ],
          correct_answer: 1,
        },
        {
          id: 2,
          question: "An inference question asks you to:",
          options: [
            "Copy text directly from the passage",
            "Count the number of paragraphs",
            "Understand what is implied but not directly stated",
            "Translate the passage"
          ],
          correct_answer: 2,
        },
        {
          id: 3,
          question: "When finding the meaning of an unknown word in a passage, you should:",
          options: [
            "Skip the question",
            "Use the dictionary",
            "Use context clues from surrounding sentences",
            "Choose the longest option"
          ],
          correct_answer: 2,
        },
        {
          id: 4,
          question: "What is the BEST exam strategy before reading a comprehension passage?",
          options: [
            "Read the passage three times fully",
            "Read the questions first",
            "Write your answers immediately",
            "Skip difficult passages"
          ],
          correct_answer: 1,
        },
        {
          id: 5,
          question: "The writer's ATTITUDE in a text can be identified by looking at:",
          options: [
            "The number of words used",
            "The paragraph structure",
            "Emotive language and tone indicators",
            "The font and spacing"
          ],
          correct_answer: 2,
        },
      ],
    },
  },

  {
    id: 2050,
    title: "O/L English Paper — Section C (Writing) Practice",
    description: "Structured practice for Section C writing tasks — guided and free writing for O/L exams.",
    level: 6,
    xp_reward: 75,
    content: {
      text: `O/L English Paper — Section C (Writing) Practice

SECTION C — What to expect:
The writing section tests your ability to produce clear, accurate, organised written English.

COMMON WRITING TASKS:
1. Guided Writing (using given prompts/notes)
2. Free Writing (essay, letter, story, description)
3. Completing/continuing a piece of writing
4. Writing from a visual stimulus (picture, diagram)

GUIDED WRITING:
• You are given bullet points, notes, or a table
• Expand these into full, connected sentences and paragraphs
• Do NOT just copy the notes — develop them
• Use appropriate connectives to link ideas
• Maintain consistent tense and register

FREE ESSAY WRITING — Checklist:
☐ Have I addressed the topic/task fully?
☐ Is my introduction clear and engaging?
☐ Does each paragraph have one main idea?
☐ Have I used connectives and varied sentence structures?
☐ Is my vocabulary varied and appropriate?
☐ Have I checked spelling, punctuation, and grammar?
☐ Is my conclusion effective and not just a repetition?

MARKS ALLOCATION (typical):
• Content and relevance: 40%
• Organisation and structure: 30%
• Language accuracy (grammar, spelling, punctuation): 30%

COMMON ERRORS TO AVOID:
• Subject-verb disagreement: "He go to school" ✗ / "He goes to school" ✓
• Wrong tense: mixing past and present without reason
• Spelling mistakes on common words
• No paragraphing — one block of text
• Writing too little (below word count requirement)
• Going off topic

TIME MANAGEMENT in Exam:
• Plan: 5 minutes
• Write: 25 minutes
• Check: 5 minutes`
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "In guided writing, what should you do with the given bullet points?",
          options: [
            "Copy them exactly as given",
            "Ignore them and write freely",
            "Expand them into full, connected sentences",
            "Number them and answer each separately"
          ],
          correct_answer: 2,
        },
        {
          id: 2,
          question: "Which is the MOST important thing to check after finishing your essay?",
          options: [
            "The number of words",
            "Spelling, grammar, and punctuation",
            "Whether the title is underlined",
            "The margins of the page"
          ],
          correct_answer: 1,
        },
        {
          id: 3,
          question: "Each body paragraph should contain:",
          options: [
            "Multiple topics",
            "Only one main idea",
            "The conclusion",
            "A list of facts only"
          ],
          correct_answer: 1,
        },
        {
          id: 4,
          question: "What percentage of writing marks typically goes to language accuracy?",
          options: ["10%", "50%", "30%", "70%"],
          correct_answer: 2,
        },
        {
          id: 5,
          question: "Which is a common writing error to AVOID in O/L exams?",
          options: [
            "Using paragraphs",
            "Varying sentence structure",
            "Mixing tenses randomly",
            "Using connectives"
          ],
          correct_answer: 2,
        },
      ],
    },
  },

  {
    id: 2051,
    title: "Punctuation — Full Stop to Semicolon",
    description: "Correct use of full stops, commas, apostrophes, speech marks, colons, and semicolons.",
    level: 1,
    xp_reward: 50,
    content: {
      text: `Punctuation — Full Stop to Semicolon

FULL STOP (.):
• Ends a complete sentence
• Used in abbreviations: Dr., Mr., etc., e.g.

COMMA (,):
• Separating items in a list: I bought apples, oranges, mangoes, and grapes.
• After introductory phrases: After the rain, the sun appeared.
• Before conjunctions joining independent clauses: I wanted to go, but she refused.
• Around non-essential clauses: My teacher, who is very kind, helped me.

APOSTROPHE ('):
• Possession: the teacher's book, the students' bags (plural)
• Contraction: it's = it is, can't = cannot, I've = I have
• NOTE: its (possessive pronoun) has NO apostrophe: The dog wagged its tail.

SPEECH MARKS / QUOTATION MARKS (""):
• Enclose direct speech: She said, "Come here."
• Comma before opening speech marks
• Full stop/question mark INSIDE closing speech marks

QUESTION MARK (?):
• Ends a direct question: Where are you going?
• NOT used after indirect questions: She asked where he was going.

EXCLAMATION MARK (!):
• Expresses strong emotion, surprise, commands
• Use sparingly in formal writing

COLON (:):
• Introduces a list: You will need: a pen, paper, and a ruler.
• Introduces an explanation or example
• After a formal salutation: Dear Sir:

SEMICOLON (;):
• Joins two closely related independent clauses
• I studied hard; I still failed the test.
• In complex lists where items contain commas`
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "Which sentence uses a comma correctly?",
          options: [
            "I, like mangoes.",
            "After the match, we went home.",
            "She, went to school.",
            "He, is a doctor."
          ],
          correct_answer: 1,
        },
        {
          id: 2,
          question: "Which is correct?",
          options: [
            "The cat licked it's paws.",
            "The cat licked its paws.",
            "The cat licked its' paws.",
            "The cat licked its paw's."
          ],
          correct_answer: 1,
        },
        {
          id: 3,
          question: "Where does the full stop go in direct speech? She said, \"I am ready\"",
          options: [
            "After the closing speech mark",
            "Before the opening speech mark",
            "Inside the closing speech mark",
            "There is no full stop"
          ],
          correct_answer: 2,
        },
        {
          id: 4,
          question: "Which sentence correctly uses a semicolon?",
          options: [
            "I was tired; but I kept going.",
            "It rained all day; we stayed indoors.",
            "She; went to the shop.",
            "He ran; quickly."
          ],
          correct_answer: 1,
        },
        {
          id: 5,
          question: "When do you NOT use a question mark?",
          options: [
            "After a direct question",
            "After an indirect question (reported speech)",
            "After 'What time is it?'",
            "After 'Who called?'"
          ],
          correct_answer: 1,
        },
      ],
    },
  },

  {
    id: 2052,
    title: "Sentence Types and Structures",
    description: "Simple, compound, complex, and compound-complex sentences for varied writing.",
    level: 1,
    xp_reward: 55,
    content: {
      text: `Sentence Types and Structures

TYPES OF SENTENCES by purpose:
• Declarative: Makes a statement. (The sky is blue.)
• Interrogative: Asks a question. (Is the sky blue?)
• Imperative: Gives a command or instruction. (Close the door.)
• Exclamatory: Expresses strong emotion. (What a beautiful day!)

TYPES OF SENTENCES by structure:

1. SIMPLE SENTENCE:
• Contains ONE independent clause (subject + verb + object)
• The dog barked.
• She read the book quickly.

2. COMPOUND SENTENCE:
• Two or more independent clauses joined by a co-ordinating conjunction (FANBOYS) or semicolon
• I wanted coffee, but she preferred tea.
• He studied hard; he passed the exam.

3. COMPLEX SENTENCE:
• One independent clause + one or more subordinate (dependent) clauses
• Subordinate clause starts with: because, although, when, if, since, while, unless, after
• Although it was raining, we went out.
• She succeeded because she worked hard.

4. COMPOUND-COMPLEX SENTENCE:
• At least two independent clauses AND one subordinate clause
• When I arrived, the match had started, and the crowd was cheering.

WHY SENTENCE VARIETY MATTERS:
• Using only simple sentences = choppy, immature writing
• Varied structures = fluent, sophisticated writing
• Mix short (for impact) and long (for detail) sentences

Sentence Beginnings — Vary them:
• Start with a subordinate clause: Although she was tired, she finished the task.
• Start with a participial phrase: Running down the hill, he tripped.
• Start with an adverb: Suddenly, the lights went out.`
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "Which is a COMPOUND sentence?",
          options: [
            "She sings beautifully.",
            "Because she practised daily, she improved.",
            "She sings, and he plays guitar.",
            "The talented, hardworking girl sings."
          ],
          correct_answer: 2,
        },
        {
          id: 2,
          question: "\"Although it was late, he kept working.\" This is a:",
          options: ["Simple sentence", "Compound sentence", "Complex sentence", "Exclamatory sentence"],
          correct_answer: 2,
        },
        {
          id: 3,
          question: "Which word CANNOT start a subordinate clause?",
          options: ["because", "although", "and", "when"],
          correct_answer: 2,
        },
        {
          id: 4,
          question: "\"Stop!\" is an example of which sentence type?",
          options: ["Declarative", "Interrogative", "Imperative", "Exclamatory"],
          correct_answer: 2,
        },
        {
          id: 5,
          question: "Why should writers vary their sentence structures?",
          options: [
            "To make the writing longer",
            "To confuse the reader",
            "To create fluent, sophisticated writing",
            "Because grammar rules require it"
          ],
          correct_answer: 2,
        },
      ],
    },
  },
];

export const ENGLISH_UNIT_NAMES: { [key: number]: { name: string; color: string; gradient: string } } = {
  1: { name: "Grammar Foundations", color: "bg-blue-500", gradient: "from-blue-400 to-blue-600" },
  2: { name: "Reading Comprehension", color: "bg-teal-500", gradient: "from-teal-400 to-teal-600" },
  3: { name: "Writing Skills", color: "bg-green-500", gradient: "from-green-400 to-green-600" },
  4: { name: "Vocabulary & Word Study", color: "bg-yellow-500", gradient: "from-yellow-400 to-yellow-600" },
  5: { name: "Literature", color: "bg-purple-500", gradient: "from-purple-400 to-purple-600" },
  6: { name: "Exam Paper Practice", color: "bg-red-500", gradient: "from-red-400 to-red-600" },
};
