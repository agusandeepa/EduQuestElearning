import type { Lesson } from './types';

// Grade 10 & 11 O/L Mathematics Lessons - Sri Lankan Syllabus
export const MATHS_LESSONS: Lesson[] = [
  // ===== UNIT 1: NUMBER SYSTEMS =====
  {
    id: 1001,
    title: "Number Systems - Natural Numbers & Integers",
    description: "Understanding natural numbers, integers, and their properties on the number line.",
    level: 1,
    xp_reward: 50,
    content: {
      text: `Number Systems (සංඛ්‍යා පද්ධති)

Natural Numbers (ස්වාභාවික සංඛ්‍යා):
• Numbers used for counting: 1, 2, 3, 4, 5, ...
• Also called positive integers
• Symbol: ℕ

Whole Numbers (සම්පූර්ණ සංඛ්‍යා):
• Natural numbers + zero: 0, 1, 2, 3, ...
• Symbol: W

Integers (පූර්ණ සංඛ්‍යා):
• Positive and negative whole numbers + zero
• ..., -3, -2, -1, 0, 1, 2, 3, ...
• Symbol: ℤ

Number Line (සංඛ්‍යා රේඛාව):
• Integers are represented on a straight line
• Zero is at the center
• Positive numbers go to the right
• Negative numbers go to the left

Ordering Integers:
• -5 < -3 < -1 < 0 < 2 < 4
• The further right on the number line, the greater the value

Absolute Value (නිරපේක්ෂ අගය):
• Distance from zero on the number line
• |5| = 5, |-5| = 5, |0| = 0
• Always non-negative

Operations with Integers:
• Addition: (-3) + (-4) = -7 | 5 + (-3) = 2
• Subtraction: 5 - (-3) = 5 + 3 = 8
• Multiplication: (-3) × (-4) = 12 | (-3) × 4 = -12
• Division: (-12) ÷ (-3) = 4 | (-12) ÷ 3 = -4

Rules for Signs:
• (+) × (+) = (+) | (-) × (-) = (+)
• (+) × (-) = (-) | (-) × (+) = (-)`
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "Which of the following is NOT an integer?",
          options: ["-5", "0", "3.5", "100"],
          correct_answer: 2,
        },
        {
          id: 2,
          question: "What is the value of (-4) × (-3)?",
          options: ["-12", "12", "-7", "7"],
          correct_answer: 1,
        },
        {
          id: 3,
          question: "What is the absolute value of -8?",
          options: ["-8", "0", "8", "-1/8"],
          correct_answer: 2,
        },
        {
          id: 4,
          question: "Which is correct on the number line?",
          options: ["-3 > 2", "-5 > -1", "0 < -4", "-2 < 1"],
          correct_answer: 3,
        },
        {
          id: 5,
          question: "What is (-15) ÷ 3?",
          options: ["5", "-5", "45", "-45"],
          correct_answer: 1,
        },
      ],
    },
  },

  {
    id: 1002,
    title: "Fractions, Decimals & Percentages",
    description: "Converting between fractions, decimals, and percentages; operations with rational numbers.",
    level: 1,
    xp_reward: 50,
    content: {
      text: `Fractions, Decimals & Percentages (භාග, දශම සහ ප්‍රතිශතය)

Fractions (භාග):
• Numerator/Denominator → a/b where b ≠ 0
• Proper fraction: numerator < denominator (3/5)
• Improper fraction: numerator ≥ denominator (7/4)
• Mixed number: 1¾

Converting Fractions to Decimals:
• Divide numerator by denominator
• 3/4 = 0.75 | 1/3 = 0.333... | 2/5 = 0.4

Converting Decimals to Fractions:
• 0.75 = 75/100 = 3/4
• 0.125 = 125/1000 = 1/8

Percentages (ප්‍රතිශතය):
• Means "per hundred" (out of 100)
• 75% = 75/100 = 0.75
• To find % of a number: (% ÷ 100) × number
• Example: 20% of 150 = (20/100) × 150 = 30

Key Conversions:
• 1/4 = 25% = 0.25
• 1/2 = 50% = 0.5
• 3/4 = 75% = 0.75
• 1/5 = 20% = 0.2
• 1/10 = 10% = 0.1

Operations with Fractions:
• Addition/Subtraction: Use common denominator
  3/4 + 1/6 = 9/12 + 2/12 = 11/12
• Multiplication: Numerator × Numerator / Denominator × Denominator
  2/3 × 3/4 = 6/12 = 1/2
• Division: Multiply by the reciprocal
  2/3 ÷ 4/5 = 2/3 × 5/4 = 10/12 = 5/6

Percentage Increase/Decrease:
• Increase = (New - Original) / Original × 100%
• Decrease = (Original - New) / Original × 100%`
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "What is 3/8 as a percentage?",
          options: ["37.5%", "38%", "30.8%", "83%"],
          correct_answer: 0,
        },
        {
          id: 2,
          question: "What is 15% of 240?",
          options: ["30", "36", "24", "16"],
          correct_answer: 1,
        },
        {
          id: 3,
          question: "Simplify: 2/3 ÷ 4/9",
          options: ["8/27", "3/2", "2/3", "6/4"],
          correct_answer: 1,
        },
        {
          id: 4,
          question: "A shirt costs Rs. 800. Price increases by 25%. New price is?",
          options: ["Rs. 825", "Rs. 1000", "Rs. 900", "Rs. 1200"],
          correct_answer: 1,
        },
        {
          id: 5,
          question: "Which decimal is equal to 5/8?",
          options: ["0.58", "0.625", "0.5", "0.8"],
          correct_answer: 1,
        },
      ],
    },
  },

  {
    id: 1003,
    title: "Ratio and Proportion",
    description: "Understanding ratios, direct and inverse proportion, and solving proportion problems.",
    level: 1,
    xp_reward: 50,
    content: {
      text: `Ratio and Proportion (අනුපාත සහ සමානුපාත)

Ratio (අනුපාත):
• Comparison of two quantities of the same kind
• Written as a:b or a/b
• Example: If a class has 20 boys and 15 girls → ratio = 20:15 = 4:3

Simplifying Ratios:
• Find HCF and divide both parts
• 24:36 → HCF = 12 → 2:3

Dividing in a Given Ratio:
• Total parts = sum of ratio parts
• Example: Divide Rs. 1200 in ratio 3:5
  Total parts = 8
  First share = 3/8 × 1200 = Rs. 450
  Second share = 5/8 × 1200 = Rs. 750

Proportion (සමානුපාත):
• Two ratios are equal: a:b = c:d
• Cross multiplication: a×d = b×c

Direct Proportion (සෘජු සමානුපාත):
• As one quantity increases, the other increases
• y = kx (k is constant)
• Example: If 5 pens cost Rs. 75, find cost of 8 pens
  5 pens → Rs. 75 | 8 pens → ?
  Cost = 75/5 × 8 = Rs. 120

Inverse Proportion (ප්‍රතිලෝම සමානුපාත):
• As one quantity increases, the other decreases
• y = k/x (k is constant)
• Example: 4 workers finish a job in 6 days
  Time for 8 workers = (4 × 6) / 8 = 3 days

Three-part Ratio:
• a:b:c = 2:3:5
• Divide quantity accordingly`
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "Simplify the ratio 48:60",
          options: ["4:5", "8:10", "12:15", "6:7"],
          correct_answer: 0,
        },
        {
          id: 2,
          question: "Divide Rs. 2100 in the ratio 2:3:2. What is the largest share?",
          options: ["Rs. 600", "Rs. 900", "Rs. 300", "Rs. 700"],
          correct_answer: 1,
        },
        {
          id: 3,
          question: "If 6 notebooks cost Rs. 180, how much do 10 notebooks cost?",
          options: ["Rs. 250", "Rs. 280", "Rs. 300", "Rs. 320"],
          correct_answer: 2,
        },
        {
          id: 4,
          question: "8 men can build a wall in 12 days. How many days will 16 men take?",
          options: ["24 days", "6 days", "8 days", "10 days"],
          correct_answer: 1,
        },
        {
          id: 5,
          question: "If x:y = 3:4 and y:z = 2:3, find x:z",
          options: ["1:2", "6:8", "3:6", "1:1"],
          correct_answer: 0,
        },
      ],
    },
  },

  // ===== UNIT 2: ALGEBRA =====
  {
    id: 1004,
    title: "Algebraic Expressions",
    description: "Simplifying algebraic expressions, expanding brackets, and factorization.",
    level: 2,
    xp_reward: 60,
    content: {
      text: `Algebraic Expressions (වීජීය ප්‍රකාශන)

Basic Terms:
• Variable: A letter representing an unknown (x, y, a, b)
• Coefficient: Number in front of variable (3x → coefficient is 3)
• Constant: A fixed number (5, -3)
• Term: Parts separated by + or - (3x², -2x, 5)
• Expression: Collection of terms

Like Terms:
• Have the same variable and power
• 3x² and -5x² are like terms
• 3x and 3x² are NOT like terms

Simplifying:
• Collect like terms
• 3x + 5y - 2x + y = x + 6y
• 4a² - 3a + 2a² + 5a = 6a² + 2a

Expanding Brackets:
• a(b + c) = ab + ac
• (a + b)(c + d) = ac + ad + bc + bd
• (a + b)² = a² + 2ab + b²
• (a - b)² = a² - 2ab + b²
• (a + b)(a - b) = a² - b²

Factorization:
• Common factor: 6x² + 9x = 3x(2x + 3)
• Difference of squares: x² - 9 = (x+3)(x-3)
• Perfect square: x² + 6x + 9 = (x+3)²
• Quadratic trinomial: x² + 5x + 6 = (x+2)(x+3)

Substitution:
• Replace variable with given value
• If x = 3: 2x² - x + 1 = 2(9) - 3 + 1 = 16`
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "Simplify: 5x + 3y - 2x - y",
          options: ["3x + 2y", "7x + 2y", "3x + 4y", "7x + 4y"],
          correct_answer: 0,
        },
        {
          id: 2,
          question: "Expand: (x + 3)(x - 5)",
          options: ["x² - 2x - 15", "x² + 2x - 15", "x² - 8x - 15", "x² - 2x + 15"],
          correct_answer: 0,
        },
        {
          id: 3,
          question: "Factorize: x² - 16",
          options: ["(x-4)(x-4)", "(x+4)(x+4)", "(x+4)(x-4)", "(x-2)(x+8)"],
          correct_answer: 2,
        },
        {
          id: 4,
          question: "If a = 2 and b = -3, find 2a² - b",
          options: ["5", "11", "1", "-5"],
          correct_answer: 1,
        },
        {
          id: 5,
          question: "Factorize: 2x² + 8x",
          options: ["2(x² + 8x)", "x(2x + 8)", "2x(x + 4)", "2x(x + 8)"],
          correct_answer: 2,
        },
      ],
    },
  },

  {
    id: 1005,
    title: "Equations & Inequalities",
    description: "Solving linear equations, simultaneous equations, and linear inequalities.",
    level: 2,
    xp_reward: 60,
    content: {
      text: `Equations & Inequalities (සමීකරණ සහ අසමානතා)

Linear Equations (රේඛීය සමීකරණ):
• Variable has power of 1 only
• Goal: Isolate the variable
• Example: 3x + 7 = 16 → 3x = 9 → x = 3

Solving Steps:
1. Remove brackets (expand)
2. Collect like terms
3. Isolate variable (use inverse operations)
4. Check your answer

Example: 2(x - 3) = 4x + 2
  2x - 6 = 4x + 2
  -6 - 2 = 4x - 2x
  -8 = 2x
  x = -4

Simultaneous Equations (යුගල සමීකරණ):
Two equations with two unknowns.

Method 1 - Elimination:
  2x + 3y = 12 ... (1)
  x - y = 1    ... (2)
  (2) × 3: 3x - 3y = 3
  Add with (1): 5x = 15 → x = 3
  Sub in (2): 3 - y = 1 → y = 2

Method 2 - Substitution:
  From (2): x = 1 + y
  Sub in (1): 2(1+y) + 3y = 12 → 5y = 10 → y = 2

Inequalities (අසමානතා):
• < (less than), > (greater than)
• ≤ (less than or equal), ≥ (greater than or equal)
• Solve like equations BUT:
  When multiplying/dividing by negative number, FLIP the sign!
  
Example: -2x > 6 → x < -3 (sign flipped!)

Number Line Representation:
• Open circle (○) for strict inequality (< or >)
• Closed circle (●) for ≤ or ≥`
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "Solve: 4x - 5 = 19",
          options: ["x = 3", "x = 6", "x = 5", "x = 4"],
          correct_answer: 1,
        },
        {
          id: 2,
          question: "Solve the simultaneous equations: x + y = 7 and x - y = 3",
          options: ["x=4, y=3", "x=5, y=2", "x=3, y=4", "x=6, y=1"],
          correct_answer: 1,
        },
        {
          id: 3,
          question: "Solve: 3(2x + 1) = 21",
          options: ["x = 3", "x = 4", "x = 2", "x = 7"],
          correct_answer: 0,
        },
        {
          id: 4,
          question: "Solve the inequality: -3x ≤ 12",
          options: ["x ≤ -4", "x ≥ -4", "x ≤ 4", "x ≥ 4"],
          correct_answer: 1,
        },
        {
          id: 5,
          question: "If 2x + 3y = 11 and x + 2y = 7, find y",
          options: ["y = 1", "y = 2", "y = 3", "y = 4"],
          correct_answer: 2,
        },
      ],
    },
  },

  {
    id: 1006,
    title: "Indices (Powers & Roots)",
    description: "Laws of indices, negative and fractional indices, and simplifying expressions.",
    level: 2,
    xp_reward: 60,
    content: {
      text: `Indices / Exponents (ඝාතාංක)

Basic Notation:
• aⁿ = a × a × a × ... (n times)
• a is the base, n is the index/exponent
• 2⁴ = 2×2×2×2 = 16

Laws of Indices:
1. Multiplication: aᵐ × aⁿ = aᵐ⁺ⁿ
   2³ × 2⁴ = 2⁷ = 128

2. Division: aᵐ ÷ aⁿ = aᵐ⁻ⁿ
   5⁶ ÷ 5² = 5⁴ = 625

3. Power of a Power: (aᵐ)ⁿ = aᵐⁿ
   (3²)³ = 3⁶ = 729

4. Zero Index: a⁰ = 1 (a ≠ 0)
   5⁰ = 1, 100⁰ = 1

5. Negative Index: a⁻ⁿ = 1/aⁿ
   2⁻³ = 1/8, 5⁻² = 1/25

6. Fractional Index: a^(1/n) = ⁿ√a
   4^(1/2) = √4 = 2
   27^(1/3) = ∛27 = 3

7. Combined: a^(m/n) = (ⁿ√a)ᵐ
   8^(2/3) = (∛8)² = 2² = 4

Standard Form (Scientific Notation):
• a × 10ⁿ where 1 ≤ a < 10
• 45,000 = 4.5 × 10⁴
• 0.0063 = 6.3 × 10⁻³`
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "Simplify: x³ × x⁵",
          options: ["x¹⁵", "x⁸", "x²", "2x⁸"],
          correct_answer: 1,
        },
        {
          id: 2,
          question: "What is 4^(3/2)?",
          options: ["6", "8", "12", "16"],
          correct_answer: 1,
        },
        {
          id: 3,
          question: "Simplify: (2³)²",
          options: ["2⁵", "2⁶", "4³", "2⁸"],
          correct_answer: 1,
        },
        {
          id: 4,
          question: "What is 3⁻²?",
          options: ["-9", "-6", "1/9", "1/6"],
          correct_answer: 2,
        },
        {
          id: 5,
          question: "Write 0.000456 in standard form",
          options: ["4.56 × 10⁻⁴", "45.6 × 10⁻⁵", "4.56 × 10⁻³", "0.456 × 10⁻³"],
          correct_answer: 0,
        },
      ],
    },
  },

  // ===== UNIT 3: GEOMETRY =====
  {
    id: 1007,
    title: "Lines, Angles & Triangles",
    description: "Types of angles, angle relationships, triangle properties and congruence.",
    level: 3,
    xp_reward: 60,
    content: {
      text: `Lines, Angles & Triangles (රේඛා, කෝණ සහ ත්‍රිකෝණ)

Types of Angles:
• Acute: 0° < angle < 90°
• Right: angle = 90°
• Obtuse: 90° < angle < 180°
• Straight: angle = 180°
• Reflex: 180° < angle < 360°

Angle Relationships:
• Complementary angles: sum = 90°
• Supplementary angles: sum = 180°
• Vertically opposite angles: equal
• Angles on a straight line: sum = 180°
• Angles around a point: sum = 360°

Parallel Lines:
When two parallel lines are cut by a transversal:
• Corresponding angles: equal (F-shape)
• Alternate angles: equal (Z-shape)  
• Co-interior angles: sum = 180° (C-shape)

Triangles:
• Sum of interior angles = 180°
• Exterior angle = sum of two non-adjacent interior angles

Types of Triangles:
• Equilateral: all sides equal, all angles = 60°
• Isosceles: two sides equal, two base angles equal
• Scalene: all sides different, all angles different
• Right-angled: one angle = 90°

Congruence (RHS, SAS, ASA, SSS, AAS):
Two triangles are congruent if they have:
• SSS: three sides equal
• SAS: two sides and included angle equal
• ASA: two angles and included side equal
• AAS: two angles and non-included side equal
• RHS: right angle, hypotenuse, side equal`
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "In a triangle, two angles are 65° and 75°. Find the third angle.",
          options: ["30°", "40°", "50°", "60°"],
          correct_answer: 1,
        },
        {
          id: 2,
          question: "Two parallel lines are cut by a transversal. Corresponding angles are:",
          options: ["Supplementary", "Complementary", "Equal", "Double of each other"],
          correct_answer: 2,
        },
        {
          id: 3,
          question: "An exterior angle of a triangle is 110°. One non-adjacent interior angle is 45°. The other is:",
          options: ["65°", "55°", "45°", "70°"],
          correct_answer: 0,
        },
        {
          id: 4,
          question: "Which congruence condition uses two sides and the angle BETWEEN them?",
          options: ["SSS", "ASA", "SAS", "AAS"],
          correct_answer: 2,
        },
        {
          id: 5,
          question: "In an isosceles triangle, the apex angle is 40°. Find the base angles.",
          options: ["60° each", "70° each", "80° each", "40° each"],
          correct_answer: 1,
        },
      ],
    },
  },

  {
    id: 1008,
    title: "Pythagoras' Theorem",
    description: "Applying Pythagoras' theorem to find unknown sides in right-angled triangles.",
    level: 3,
    xp_reward: 60,
    content: {
      text: `Pythagoras' Theorem (පයිතගරස් ප්‍රමේය)

The Theorem:
In a right-angled triangle:
• c² = a² + b²
• c = hypotenuse (longest side, opposite the right angle)
• a and b = the two shorter sides (legs)

Finding the Hypotenuse:
• c = √(a² + b²)
• Example: a=3, b=4 → c = √(9+16) = √25 = 5

Finding a Leg:
• a = √(c² - b²)
• Example: c=13, b=12 → a = √(169-144) = √25 = 5

Pythagorean Triples (Common Right Triangles):
• 3, 4, 5 (multiply: 6,8,10 or 9,12,15)
• 5, 12, 13
• 8, 15, 17
• 7, 24, 25

Checking if Right-angled:
• If a² + b² = c², then right-angled
• 9² + 12² = 81 + 144 = 225 = 15² ✓

Real-life Applications:
• Finding diagonal of rectangle: d = √(l² + w²)
• Example: 8m × 6m rectangle → diagonal = √(64+36) = √100 = 10m
• Ladder problems, ramp heights, distance problems

3D Pythagoras:
• Find space diagonal of cuboid: d = √(l² + w² + h²)`
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "A right triangle has legs 5cm and 12cm. Find the hypotenuse.",
          options: ["13cm", "17cm", "11cm", "15cm"],
          correct_answer: 0,
        },
        {
          id: 2,
          question: "The hypotenuse is 25cm and one leg is 7cm. Find the other leg.",
          options: ["18cm", "20cm", "24cm", "26cm"],
          correct_answer: 2,
        },
        {
          id: 3,
          question: "A ladder 10m long leans against a wall. The foot is 6m from the wall. How high does it reach?",
          options: ["6m", "7m", "8m", "9m"],
          correct_answer: 2,
        },
        {
          id: 4,
          question: "Is a triangle with sides 8, 15, 17 a right-angled triangle?",
          options: ["Yes", "No", "Cannot determine", "Only if acute"],
          correct_answer: 0,
        },
        {
          id: 5,
          question: "Find the diagonal of a rectangle 9cm × 12cm.",
          options: ["13cm", "14cm", "15cm", "21cm"],
          correct_answer: 2,
        },
      ],
    },
  },

  {
    id: 1009,
    title: "Area and Perimeter",
    description: "Calculating areas and perimeters of plane figures including composite shapes.",
    level: 3,
    xp_reward: 60,
    content: {
      text: `Area and Perimeter (වර්ගඵලය සහ පරිධිය)

Key Formulas:

Rectangle:
• Perimeter = 2(l + w)
• Area = l × w

Square:
• Perimeter = 4s
• Area = s²

Triangle:
• Perimeter = a + b + c
• Area = ½ × base × height
• Heron's Formula: A = √[s(s-a)(s-b)(s-c)] where s = (a+b+c)/2

Parallelogram:
• Perimeter = 2(a + b)
• Area = base × height

Trapezium:
• Area = ½ × (a + b) × h (where a,b are parallel sides, h is height)

Circle:
• Circumference = 2πr = πd
• Area = πr² (π ≈ 3.14159 or 22/7)

Sector of Circle:
• Arc Length = (θ/360) × 2πr
• Area of Sector = (θ/360) × πr²

Composite Shapes:
• Break into known shapes
• Add or subtract areas as needed
• Example: L-shape = two rectangles

Units:
• Length: cm, m, km
• Area: cm², m², km²
• 1 m² = 10,000 cm²
• 1 hectare = 10,000 m²`
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "Find the area of a triangle with base 12cm and height 8cm.",
          options: ["48cm²", "96cm²", "40cm²", "24cm²"],
          correct_answer: 0,
        },
        {
          id: 2,
          question: "A circle has radius 7cm. Find its area. (π = 22/7)",
          options: ["44cm²", "154cm²", "49cm²", "22cm²"],
          correct_answer: 1,
        },
        {
          id: 3,
          question: "Find the area of a trapezium with parallel sides 8cm and 12cm, height 5cm.",
          options: ["50cm²", "100cm²", "60cm²", "40cm²"],
          correct_answer: 0,
        },
        {
          id: 4,
          question: "A sector has radius 6cm and angle 60°. Find arc length. (π = 22/7)",
          options: ["6.28cm", "6.67cm", "7.28cm", "6cm"],
          correct_answer: 1,
        },
        {
          id: 5,
          question: "A rectangle has area 84cm² and width 7cm. Find the perimeter.",
          options: ["22cm", "38cm", "24cm", "42cm"],
          correct_answer: 1,
        },
      ],
    },
  },

  // ===== UNIT 4: MENSURATION =====
  {
    id: 1010,
    title: "Volume and Surface Area",
    description: "Calculating volumes and surface areas of 3D solids: cuboids, cylinders, cones, spheres.",
    level: 4,
    xp_reward: 70,
    content: {
      text: `Volume and Surface Area (පරිමාව සහ මතුපිට වර්ගඵලය)

Cuboid (ඝනකය):
• Volume = l × w × h
• Surface Area = 2(lw + lh + wh)

Cube:
• Volume = a³
• Surface Area = 6a²

Cylinder:
• Volume = πr²h
• Curved Surface Area = 2πrh
• Total Surface Area = 2πr(r + h)

Cone:
• Volume = ⅓πr²h
• Slant height: l = √(r² + h²)
• Curved Surface Area = πrl
• Total Surface Area = πr(r + l)

Sphere:
• Volume = 4/3 πr³
• Surface Area = 4πr²

Hemisphere:
• Volume = 2/3 πr³
• Curved Surface Area = 2πr²
• Total Surface Area = 3πr²

Prism:
• Volume = Area of cross-section × length

Pyramid:
• Volume = ⅓ × base area × height

Units:
• Volume: cm³, m³, litres (1 litre = 1000 cm³)

Example - Cylinder:
r = 5cm, h = 10cm
Volume = π(5²)(10) = 250π ≈ 785.4 cm³
CSA = 2π(5)(10) = 100π ≈ 314.2 cm²`
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "Find the volume of a cylinder with radius 3cm and height 7cm. (π = 22/7)",
          options: ["186cm³", "198cm³", "176cm³", "154cm³"],
          correct_answer: 1,
        },
        {
          id: 2,
          question: "Find the surface area of a cube with side 5cm.",
          options: ["150cm²", "125cm²", "75cm²", "25cm²"],
          correct_answer: 0,
        },
        {
          id: 3,
          question: "A cone has radius 6cm and height 8cm. Find slant height.",
          options: ["14cm", "12cm", "10cm", "8cm"],
          correct_answer: 2,
        },
        {
          id: 4,
          question: "Find the volume of a sphere with radius 3cm. (π = 3.14)",
          options: ["113.04cm³", "36π cm³", "108cm³", "Both A and B"],
          correct_answer: 3,
        },
        {
          id: 5,
          question: "A cuboid is 4cm × 3cm × 6cm. What is its volume?",
          options: ["36cm³", "72cm³", "48cm³", "54cm³"],
          correct_answer: 1,
        },
      ],
    },
  },

  // ===== UNIT 5: STATISTICS =====
  {
    id: 1011,
    title: "Statistics - Data Representation",
    description: "Organizing data using frequency tables, histograms, pie charts and stem-and-leaf diagrams.",
    level: 5,
    xp_reward: 60,
    content: {
      text: `Statistics - Data Representation (සංඛ්‍යාන - දත්ත නිරූපණය)

Types of Data:
• Raw data: unorganized collected data
• Discrete data: can only take specific values (no. of students)
• Continuous data: can take any value in a range (height, weight)

Frequency Table (වාර වගුව):
• Tally marks used to count occurrences
• Frequency = number of times a value occurs
• Class interval used for large data

Grouped Frequency Table:
• Example: marks 0-9, 10-19, 20-29...
• Class width = upper class boundary - lower class boundary
• Midpoint = (lower + upper) / 2

Bar Chart:
• Bars for discrete/categorical data
• Bars do NOT touch (for discrete data)
• Height represents frequency

Histogram:
• For continuous grouped data
• Bars TOUCH each other
• Area of bar = frequency (if equal class widths)

Pie Chart:
• Circle divided into sectors
• Angle = (frequency/total) × 360°
• Example: 30 students out of 120 → (30/120) × 360° = 90°

Stem-and-Leaf Diagram:
• Shows shape of distribution
• Stem = tens digit, Leaf = units digit
• 4|3 7 8 means 43, 47, 48

Line Graph:
• Shows change over time
• Points connected with lines`
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "In a survey of 90 students, 30 like cricket. What is the pie chart angle for cricket?",
          options: ["90°", "120°", "60°", "180°"],
          correct_answer: 1,
        },
        {
          id: 2,
          question: "What is the midpoint of the class interval 20-30?",
          options: ["20", "25", "30", "10"],
          correct_answer: 1,
        },
        {
          id: 3,
          question: "In a histogram, what does the area of each bar represent?",
          options: ["Mean", "Mode", "Frequency", "Range"],
          correct_answer: 2,
        },
        {
          id: 4,
          question: "What type of data would you use a histogram for?",
          options: ["Categorical data", "Discrete data", "Continuous grouped data", "Qualitative data"],
          correct_answer: 2,
        },
        {
          id: 5,
          question: "In a stem-and-leaf diagram, 7|2 5 8 represents which values?",
          options: ["7, 2, 5, 8", "72, 75, 78", "27, 57, 87", "7.2, 7.5, 7.8"],
          correct_answer: 1,
        },
      ],
    },
  },

  {
    id: 1012,
    title: "Statistics - Mean, Median, Mode & Range",
    description: "Calculating measures of central tendency and spread for raw and grouped data.",
    level: 5,
    xp_reward: 60,
    content: {
      text: `Measures of Central Tendency (කේන්ද්‍රීය ප්‍රවණතා)

Mean (මධ්‍යක අගය / සාමාන්‍ය):
• Sum of all values ÷ number of values
• Mean = Σx / n
• Example: 3, 5, 7, 9, 11 → Mean = 35/5 = 7

Mean from Frequency Table:
• Mean = Σfx / Σf
• Multiply each value by its frequency, add all, divide by total frequency

Mean from Grouped Data:
• Use midpoint of each class as x value
• Mean ≈ Σfx / Σf (estimated mean)

Median (මධ්‍යස්ථ):
• Middle value when data is arranged in order
• If n is odd: median = ((n+1)/2)th value
• If n is even: median = average of (n/2)th and (n/2+1)th values
• Example: 2, 4, 6, 8, 10 → n=5, median = 3rd value = 6

Mode (ප්‍රකාරය):
• Most frequently occurring value
• Can be no mode, one mode, or multiple modes
• Example: 3, 5, 5, 7, 9 → mode = 5

Range (පරාසය):
• Range = Maximum - Minimum
• Measures spread of data
• Example: 3, 8, 12, 15, 20 → Range = 20 - 3 = 17

Interquartile Range (IQR):
• Lower quartile Q1 = median of lower half
• Upper quartile Q3 = median of upper half
• IQR = Q3 - Q1 (middle 50% of data)

Choosing the Right Average:
• Mean: uses all values, affected by extremes
• Median: good for skewed data, not affected by extremes
• Mode: good for categorical data`
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "Find the mean of: 4, 8, 6, 10, 12",
          options: ["7", "8", "9", "10"],
          correct_answer: 1,
        },
        {
          id: 2,
          question: "Find the median of: 3, 7, 9, 2, 5, 11, 8",
          options: ["5", "7", "8", "9"],
          correct_answer: 1,
        },
        {
          id: 3,
          question: "In a dataset: 4, 6, 6, 7, 9, 9, 9, 12. What is the mode?",
          options: ["6", "7", "9", "Both 6 and 9"],
          correct_answer: 2,
        },
        {
          id: 4,
          question: "A dataset has mean 15 and the total of all values is 135. How many values are there?",
          options: ["7", "8", "9", "10"],
          correct_answer: 2,
        },
        {
          id: 5,
          question: "Which measure of central tendency is most affected by extreme values?",
          options: ["Mode", "Median", "Mean", "Range"],
          correct_answer: 2,
        },
      ],
    },
  },

  // ===== UNIT 6: TRIGONOMETRY =====
  {
    id: 1013,
    title: "Trigonometry - Sin, Cos, Tan",
    description: "Using trigonometric ratios to find unknown sides and angles in right-angled triangles.",
    level: 6,
    xp_reward: 70,
    content: {
      text: `Trigonometry (ත්‍රිකෝණමිතිය)

Trigonometric Ratios (for right-angled triangles):
Using reference angle θ:
• sin θ = Opposite / Hypotenuse = O/H
• cos θ = Adjacent / Hypotenuse = A/H
• tan θ = Opposite / Adjacent = O/A

Memory Aid: SOH-CAH-TOA

Special Angles:
| Angle | sin   | cos   | tan   |
|-------|-------|-------|-------|
| 0°    | 0     | 1     | 0     |
| 30°   | 1/2   | √3/2  | 1/√3  |
| 45°   | 1/√2  | 1/√2  | 1     |
| 60°   | √3/2  | 1/2   | √3    |
| 90°   | 1     | 0     | —     |

Finding Missing Sides:
• Label: H (hypotenuse), O (opposite to θ), A (adjacent)
• Choose ratio that connects what you know and want
• Example: Find x if angle = 35°, H = 10cm
  sin 35° = x/10 → x = 10 sin 35° ≈ 5.74cm

Finding Missing Angles:
• Use inverse trig: θ = sin⁻¹(O/H)
• Example: O = 5, H = 8 → θ = sin⁻¹(5/8) ≈ 38.7°

Angle of Elevation & Depression:
• Elevation: angle measured UP from horizontal
• Depression: angle measured DOWN from horizontal
• Both use right triangle with horizontal as adjacent`
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "In a right triangle, the opposite side is 5 and hypotenuse is 10. Find the angle.",
          options: ["30°", "45°", "60°", "90°"],
          correct_answer: 0,
        },
        {
          id: 2,
          question: "Find the side adjacent to 40° if the hypotenuse is 15cm.",
          options: ["15 sin40°", "15 cos40°", "15 tan40°", "15 ÷ cos40°"],
          correct_answer: 1,
        },
        {
          id: 3,
          question: "What is tan 45°?",
          options: ["0", "1/√2", "√3/2", "1"],
          correct_answer: 3,
        },
        {
          id: 4,
          question: "A flagpole casts a shadow 12m long. The angle of elevation to the top is 30°. Height of pole?",
          options: ["4√3 m", "6m", "12tan30° m", "Both A and C"],
          correct_answer: 3,
        },
        {
          id: 5,
          question: "In triangle ABC, angle B = 90°. If AB = 7 and BC = 24, find sin A.",
          options: ["7/25", "24/25", "7/24", "24/7"],
          correct_answer: 1,
        },
      ],
    },
  },

  // ===== UNIT 7: SETS =====
  {
    id: 1014,
    title: "Sets and Venn Diagrams",
    description: "Set notation, operations (union, intersection, complement), and problem solving with Venn diagrams.",
    level: 7,
    xp_reward: 60,
    content: {
      text: `Sets and Venn Diagrams (කුලක සහ වෙන් රූප සටහන්)

Basic Definitions:
• Set: A well-defined collection of distinct objects
• Element: A member of a set
• a ∈ A means "a is an element of A"
• a ∉ A means "a is NOT an element of A"

Types of Sets:
• Universal Set (U or ε): Contains all elements under consideration
• Empty Set (∅ or {}): Has no elements
• Subset: A ⊆ B means every element of A is also in B
• Proper subset: A ⊂ B means A ⊆ B and A ≠ B

Set Notation:
• n(A) = number of elements in set A
• A = {1, 2, 3, 4, 5} → n(A) = 5

Set Operations:
• Union (A ∪ B): Elements in A OR B (or both)
• Intersection (A ∩ B): Elements in BOTH A and B
• Complement (A'): Elements NOT in A (but in U)
• Difference (A - B): Elements in A but NOT in B

Venn Diagrams:
• Circles inside a rectangle (universal set)
• Two circles represent two sets
• Overlapping region = intersection

Formula for Two Sets:
• n(A ∪ B) = n(A) + n(B) - n(A ∩ B)

Example:
In a class of 40 students:
- 25 like cricket (C), 20 like football (F), 10 like both
- n(C ∪ F) = 25 + 20 - 10 = 35
- Neither sport: 40 - 35 = 5

De Morgan's Laws:
• (A ∪ B)' = A' ∩ B'
• (A ∩ B)' = A' ∪ B'`
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "If A = {2,4,6,8} and B = {4,8,12}, find A ∩ B",
          options: ["{2,4,6,8,12}", "{4,8}", "{2,6}", "{12}"],
          correct_answer: 1,
        },
        {
          id: 2,
          question: "If n(A) = 30, n(B) = 25, n(A ∩ B) = 10, find n(A ∪ B)",
          options: ["45", "55", "65", "35"],
          correct_answer: 0,
        },
        {
          id: 3,
          question: "U = {1,2,3,4,5,6,7,8}, A = {2,4,6,8}. Find A'.",
          options: ["{1,3,5,7}", "{2,4,6,8}", "{}", "{1,2,3,4,5,6,7,8}"],
          correct_answer: 0,
        },
        {
          id: 4,
          question: "In a class of 50, 30 study Maths, 25 study Science, 10 study both. How many study neither?",
          options: ["5", "10", "15", "55"],
          correct_answer: 0,
        },
        {
          id: 5,
          question: "Which symbol represents the union of two sets?",
          options: ["∩", "∪", "⊂", "∈"],
          correct_answer: 1,
        },
      ],
    },
  },

  // ===== UNIT 8: GRAPHS =====
  {
    id: 1015,
    title: "Graphs & Functions",
    description: "Cartesian coordinates, linear graphs, gradient, and interpreting real-life graphs.",
    level: 8,
    xp_reward: 70,
    content: {
      text: `Graphs and Functions (ලේඛ සහ ශ්‍රිත)

Cartesian Coordinates:
• Two axes: x-axis (horizontal), y-axis (vertical)
• Origin (0, 0) where axes meet
• Point (x, y): x is horizontal distance, y is vertical distance
• Quadrants: I (+,+) II (-,+) III (-,-) IV (+,-)

Linear Graphs (y = mx + c):
• m = gradient (slope)
• c = y-intercept (where line crosses y-axis)
• Example: y = 2x + 3 → gradient = 2, y-intercept = 3

Gradient Formula:
• m = (y₂ - y₁) / (x₂ - x₁)
• Positive gradient: slopes upward left to right
• Negative gradient: slopes downward left to right
• Zero gradient: horizontal line
• Undefined gradient: vertical line

Plotting Linear Graphs:
• Make a table of values
• Plot points and draw straight line

Parallel Lines:
• Same gradient → y = 3x + 2 and y = 3x - 5 are parallel

Perpendicular Lines:
• Product of gradients = -1
• If m₁ = 2, then m₂ = -1/2

Distance Formula:
• d = √[(x₂-x₁)² + (y₂-y₁)²]

Midpoint Formula:
• M = ((x₁+x₂)/2, (y₁+y₂)/2)

Real-life Graphs:
• Distance-Time: gradient = speed
• Speed-Time: gradient = acceleration, area = distance`
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "Find the gradient of the line passing through (2,3) and (6,11).",
          options: ["1", "2", "3", "4"],
          correct_answer: 1,
        },
        {
          id: 2,
          question: "What is the y-intercept of y = 3x - 7?",
          options: ["3", "7", "-7", "-3"],
          correct_answer: 2,
        },
        {
          id: 3,
          question: "Which line is parallel to y = 2x + 5?",
          options: ["y = 3x + 5", "y = 2x - 3", "y = -2x + 5", "y = ½x + 5"],
          correct_answer: 1,
        },
        {
          id: 4,
          question: "Find the midpoint of (4, -2) and (10, 6).",
          options: ["(7, 2)", "(6, 4)", "(7, 4)", "(14, 4)"],
          correct_answer: 0,
        },
        {
          id: 5,
          question: "On a distance-time graph, what does a steeper line represent?",
          options: ["Greater distance", "Longer time", "Higher speed", "Acceleration"],
          correct_answer: 2,
        },
      ],
    },
  },

  // ===== UNIT 2 (continued): ALGEBRA =====
  {
    id: 1016,
    title: "Simultaneous Equations",
    description: "Solving pairs of linear equations using substitution and elimination methods.",
    level: 2,
    xp_reward: 60,
    content: {
      text: `Simultaneous Equations (යුගල සමීකරණ)

What are Simultaneous Equations?
• Two equations with two unknowns (usually x and y)
• We find the values that satisfy BOTH equations at the same time

Method 1 - Elimination (ඉවත් කිරීමේ ක්‍රමය):
• Make coefficients of one variable equal
• Add or subtract the equations to eliminate that variable

Example: Solve 3x + 2y = 12 and x - 2y = 4
  Step 1: Add both equations → 4x = 16 → x = 4
  Step 2: Substitute x = 4 into x - 2y = 4 → 4 - 2y = 4 → y = 0
  Solution: x = 4, y = 0

Method 2 - Substitution (ආදේශ ක්‍රමය):
• Make one variable the subject of one equation
• Substitute into the other equation

Example: Solve x + y = 5 and 2x - y = 4
  Step 1: From first: x = 5 - y
  Step 2: Substitute: 2(5 - y) - y = 4 → 10 - 2y - y = 4 → y = 2
  Step 3: x = 5 - 2 = 3
  Solution: x = 3, y = 2

Graphical Interpretation:
• Each equation represents a straight line
• The solution is the point where the two lines intersect
• Parallel lines → No solution
• Same line → Infinite solutions

Word Problems:
• Define variables clearly
• Form two equations from given information
• Solve using elimination or substitution`
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "Solve: x + y = 7 and x - y = 3. What is x?",
          options: ["2", "5", "3", "7"],
          correct_answer: 1,
        },
        {
          id: 2,
          question: "Solve: 2x + y = 8 and x + y = 5. What is x?",
          options: ["1", "2", "3", "4"],
          correct_answer: 2,
        },
        {
          id: 3,
          question: "If 3x - 2y = 1 and x + 2y = 7, what is y?",
          options: ["1", "2", "3", "4"],
          correct_answer: 1,
        },
        {
          id: 4,
          question: "Two numbers add to 20 and differ by 6. What is the larger number?",
          options: ["7", "13", "14", "16"],
          correct_answer: 1,
        },
        {
          id: 5,
          question: "What does it mean graphically when two simultaneous equations have no solution?",
          options: ["Lines intersect", "Lines are parallel", "Lines are identical", "Lines are perpendicular"],
          correct_answer: 1,
        },
      ],
    },
  },

  {
    id: 1017,
    title: "Quadratic Equations",
    description: "Solving quadratic equations by factorisation, completing the square, and the quadratic formula.",
    level: 2,
    xp_reward: 70,
    content: {
      text: `Quadratic Equations (ද්විමාත්‍ර සමීකරණ)

Standard Form: ax² + bx + c = 0, where a ≠ 0

Method 1 - Factorisation (සාධකනය):
• Find two numbers that multiply to ac and add to b
• Rewrite and factor

Example: x² + 5x + 6 = 0
  Numbers: 2 and 3 (2 × 3 = 6, 2 + 3 = 5)
  (x + 2)(x + 3) = 0
  x = -2 or x = -3

Method 2 - Quadratic Formula (ද්විමාත්‍ර සූත්‍රය):
  x = (-b ± √(b² - 4ac)) / 2a

Example: 2x² - 5x + 2 = 0 (a=2, b=-5, c=2)
  x = (5 ± √(25 - 16)) / 4 = (5 ± 3) / 4
  x = 2 or x = 0.5

Discriminant (Δ = b² - 4ac):
• Δ > 0: Two distinct real roots
• Δ = 0: One repeated real root
• Δ < 0: No real roots

Method 3 - Completing the Square:
• x² + bx = (x + b/2)² - (b/2)²

Example: x² + 6x - 7 = 0
  (x + 3)² - 9 - 7 = 0
  (x + 3)² = 16
  x + 3 = ±4 → x = 1 or x = -7

Sum and Product of Roots:
• If roots are α and β: α + β = -b/a and αβ = c/a`
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "Solve x² - 5x + 6 = 0. What are the roots?",
          options: ["x = 2 and x = 3", "x = -2 and x = -3", "x = 1 and x = 6", "x = -1 and x = -6"],
          correct_answer: 0,
        },
        {
          id: 2,
          question: "For equation 2x² - 3x - 2 = 0, what is the discriminant?",
          options: ["7", "9", "17", "25"],
          correct_answer: 2,
        },
        {
          id: 3,
          question: "If discriminant = 0, how many roots does the equation have?",
          options: ["0", "1", "2", "3"],
          correct_answer: 1,
        },
        {
          id: 4,
          question: "For x² - 7x + 10 = 0, what is the sum of the roots?",
          options: ["10", "-7", "7", "-10"],
          correct_answer: 2,
        },
        {
          id: 5,
          question: "Which method can always be used to solve any quadratic equation?",
          options: ["Factorisation", "Graphing", "Quadratic formula", "Trial and error"],
          correct_answer: 2,
        },
      ],
    },
  },

  {
    id: 1018,
    title: "Surds and Logarithms",
    description: "Understanding surds, simplifying radical expressions, and working with logarithms.",
    level: 2,
    xp_reward: 65,
    content: {
      text: `Surds and Logarithms (කරණි සහ ලඝුගණක)

SURDS (කරණි):
A surd is an irrational root that cannot be simplified to a whole number.
• √2, √3, √5 are surds
• √4 = 2 (NOT a surd)

Simplifying Surds:
• √12 = √(4 × 3) = 2√3
• √50 = √(25 × 2) = 5√2
• √72 = √(36 × 2) = 6√2

Operations with Surds:
• Addition: 3√2 + 5√2 = 8√2 (like terms only!)
• Multiplication: √3 × √5 = √15
• √a × √a = a
• (√a + √b)(√a - √b) = a - b (difference of squares)

Rationalising the Denominator:
• Multiply top and bottom by the surd
• 3/√2 = 3√2/2
• 1/(√3 + 1) × (√3 - 1)/(√3 - 1) = (√3 - 1)/2

LOGARITHMS (ලඝුගණක):
Definition: log_a(x) = y means a^y = x

Laws of Logarithms:
• log(AB) = log A + log B (Product rule)
• log(A/B) = log A - log B (Quotient rule)
• log(A^n) = n log A (Power rule)
• log_a(a) = 1
• log_a(1) = 0

Common Logarithms (base 10):
• log 100 = 2 (since 10² = 100)
• log 1000 = 3

Natural Logarithm (base e):
• ln(e) = 1

Changing Base: log_a(b) = log(b) / log(a)`
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "Simplify √75",
          options: ["5√3", "3√5", "15√3", "25√3"],
          correct_answer: 0,
        },
        {
          id: 2,
          question: "What is 2√3 + 5√3?",
          options: ["7√6", "7√3", "10√3", "7√9"],
          correct_answer: 1,
        },
        {
          id: 3,
          question: "If log 2 = 0.301, what is log 8?",
          options: ["0.602", "0.903", "2.408", "0.301"],
          correct_answer: 1,
        },
        {
          id: 4,
          question: "What is log_5(25)?",
          options: ["1", "2", "5", "10"],
          correct_answer: 1,
        },
        {
          id: 5,
          question: "Rationalise the denominator of 4/√2",
          options: ["2√2", "4√2", "2", "√8"],
          correct_answer: 0,
        },
      ],
    },
  },

  {
    id: 1019,
    title: "Matrices",
    description: "Introduction to matrices, matrix operations, and solving equations using matrices.",
    level: 2,
    xp_reward: 70,
    content: {
      text: `Matrices (න්‍යාස)

What is a Matrix?
• A rectangular array of numbers arranged in rows and columns
• Denoted by capital letters: A, B, C
• Size: m × n (m rows, n columns)

Types of Matrices:
• Row matrix: 1 × n (one row)
• Column matrix: m × 1 (one column)
• Square matrix: m × m (equal rows and columns)
• Identity matrix (I): Square matrix with 1s on diagonal, 0s elsewhere
• Zero matrix (O): All elements are 0

Matrix Addition & Subtraction:
• Matrices must have the SAME order
• Add/subtract corresponding elements
• [1 2; 3 4] + [5 6; 7 8] = [6 8; 10 12]

Scalar Multiplication:
• Multiply every element by the scalar
• 3 × [1 2; 3 4] = [3 6; 9 12]

Matrix Multiplication (A × B):
• Columns of A must equal rows of B
• For (m×n)(n×p) → result is m×p
• Each element = row of A · column of B

For 2×2: [a b; c d] × [e f; g h] = [ae+bg af+bh; ce+dg cf+dh]

Determinant of 2×2 Matrix:
• det[a b; c d] = ad - bc

Inverse of a 2×2 Matrix:
• A⁻¹ = (1/det A) × [d -b; -c a]
• Only exists when det A ≠ 0

Solving Equations using Matrices:
• AX = B → X = A⁻¹B`
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "A matrix with 3 rows and 2 columns has order:",
          options: ["2 × 3", "3 × 2", "6 × 1", "3 × 3"],
          correct_answer: 1,
        },
        {
          id: 2,
          question: "What is the determinant of [3 1; 2 4]?",
          options: ["10", "14", "8", "12"],
          correct_answer: 0,
        },
        {
          id: 3,
          question: "Which condition must be met to multiply matrix A by matrix B?",
          options: ["Same order", "Columns of A = Rows of B", "Rows of A = Columns of B", "Both square"],
          correct_answer: 1,
        },
        {
          id: 4,
          question: "For identity matrix I, what is A × I?",
          options: ["O", "I", "A", "A²"],
          correct_answer: 2,
        },
        {
          id: 5,
          question: "The inverse matrix exists only when:",
          options: ["det A = 1", "det A = 0", "det A ≠ 0", "A is a row matrix"],
          correct_answer: 2,
        },
      ],
    },
  },

  // ===== UNIT 3 (continued): GEOMETRY =====
  {
    id: 1020,
    title: "Circle Theorems",
    description: "Properties of circles, angles in circles, chords, tangents, and cyclic quadrilaterals.",
    level: 3,
    xp_reward: 65,
    content: {
      text: `Circle Theorems (වෘත්ත ප්‍රමේයයන්)

Key Circle Theorems:

1. Angle at Centre = 2 × Angle at Circumference
   • Angle subtended at the centre is twice the angle at circumference (same arc)

2. Angles in the Same Segment are Equal
   • Angles subtended by the same arc on the same side are equal

3. Angle in a Semicircle = 90°
   • Any angle in a semicircle (in a triangle where the hypotenuse is the diameter) is 90°

4. Opposite Angles of a Cyclic Quadrilateral add to 180°
   • ∠A + ∠C = 180° and ∠B + ∠D = 180°

5. Tangent-Radius Theorem
   • A tangent to a circle is perpendicular to the radius at the point of contact
   • ∠OPT = 90° where O is centre, P is point of contact

6. Two Tangents from External Point
   • Tangent lengths from an external point are equal

7. Alternate Segment Theorem (Tangent-Chord Angle)
   • The angle between a tangent and a chord equals the inscribed angle on the opposite side

8. Chord Properties
   • A perpendicular from the centre bisects the chord
   • Equal chords are equidistant from the centre

Notation:
• Arc AB is written as AB⌢
• Chord: straight line joining two points on circle
• Secant: line that cuts circle at two points`
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "An angle at the centre is 80°. What is the angle at the circumference subtended by the same arc?",
          options: ["160°", "40°", "80°", "20°"],
          correct_answer: 1,
        },
        {
          id: 2,
          question: "What is the angle in a semicircle?",
          options: ["45°", "60°", "90°", "180°"],
          correct_answer: 2,
        },
        {
          id: 3,
          question: "In a cyclic quadrilateral, one angle is 110°. What is its opposite angle?",
          options: ["70°", "110°", "55°", "250°"],
          correct_answer: 0,
        },
        {
          id: 4,
          question: "What is the angle between a tangent and the radius at the point of contact?",
          options: ["45°", "60°", "90°", "180°"],
          correct_answer: 2,
        },
        {
          id: 5,
          question: "Two tangents from an external point to a circle have lengths 5 cm and 3x - 1 cm. What is x?",
          options: ["1", "2", "3", "4"],
          correct_answer: 1,
        },
      ],
    },
  },

  {
    id: 1021,
    title: "Similarity and Congruence",
    description: "Conditions for similar and congruent triangles, scale factors, and area/volume ratios.",
    level: 3,
    xp_reward: 60,
    content: {
      text: `Similarity and Congruence (සමාන සහ ගතිය)

CONGRUENCE (ගතිය / Equal in shape and size):
Two figures are congruent if they are exactly the same shape and size.

Conditions for Congruent Triangles:
• SSS (Side-Side-Side): All 3 sides equal
• SAS (Side-Angle-Side): Two sides and included angle equal
• ASA (Angle-Side-Angle): Two angles and included side equal
• AAS (Angle-Angle-Side): Two angles and non-included side equal
• RHS (Right-Hypotenuse-Side): Right angle, hypotenuse, one side equal

SIMILARITY (සාමාන්‍ය රූප / Same shape, different size):
Two figures are similar if they have the same angles and proportional sides.

Conditions for Similar Triangles:
• AA (Angle-Angle): Two pairs of equal angles
• SSS (Side-Side-Side): All sides in proportion
• SAS: Two sides in proportion and included angle equal

Scale Factor (k):
• Ratio of corresponding sides
• k = length in image / length in original

Ratios for Similar Figures:
• Length ratio = k
• Area ratio = k²
• Volume ratio = k³

Example: Two similar triangles with sides in ratio 1:3
  Area ratio = 1:9
  If area of small triangle = 5 cm², area of large = 45 cm²

Basic Proportionality Theorem (Thales):
• A line parallel to one side of a triangle divides the other two sides proportionally`
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "Two triangles have sides 3, 4, 5 and 6, 8, 10. Are they:",
          options: ["Congruent only", "Similar only", "Both congruent and similar", "Neither"],
          correct_answer: 1,
        },
        {
          id: 2,
          question: "Two similar shapes have a length ratio of 1:4. What is their area ratio?",
          options: ["1:4", "1:8", "1:16", "1:64"],
          correct_answer: 2,
        },
        {
          id: 3,
          question: "Which condition proves two triangles are congruent using one side and two angles?",
          options: ["SSS", "SAS", "ASA", "AA"],
          correct_answer: 2,
        },
        {
          id: 4,
          question: "Two similar cylinders have radius ratio 2:3. What is the volume ratio?",
          options: ["2:3", "4:9", "8:27", "6:9"],
          correct_answer: 2,
        },
        {
          id: 5,
          question: "In ΔABC, DE is parallel to BC. If AD = 3, DB = 6, AE = 4, what is EC?",
          options: ["2", "4", "8", "12"],
          correct_answer: 2,
        },
      ],
    },
  },

  {
    id: 1022,
    title: "Loci and Constructions",
    description: "Understanding loci, geometric constructions using compass and straight edge.",
    level: 3,
    xp_reward: 55,
    content: {
      text: `Loci and Constructions (දිය යාත්‍රා සහ ඉදිකිරීම්)

LOCI (දිය යාත්‍රා):
A locus is the path traced by a point that moves according to a rule.

Common Loci:
1. Fixed distance from a point → Circle
   • Locus of points 5 cm from A = circle, centre A, radius 5 cm

2. Equal distance from two points → Perpendicular bisector
   • Locus of points equidistant from A and B = perpendicular bisector of AB

3. Fixed distance from a line → Two parallel lines
   • Locus of points 3 cm from line L = two lines parallel to L

4. Equal distance from two lines → Angle bisector
   • Locus of points equidistant from two lines = angle bisector

CONSTRUCTIONS (ඉදිකිරීම්):
Bisecting an Angle:
1. Draw arcs from vertex to cut both arms
2. Draw arcs from intersection points
3. Join vertex to intersection

Perpendicular Bisector:
1. Draw arcs from both endpoints (more than half length)
2. Connect the two intersection points

Constructing 60° Angle:
1. Draw base line
2. Draw arc from endpoint
3. With same radius, mark arc from intersection
4. Join to get 60°

Constructing 90° Angle:
• Use perpendicular bisector method
• Or bisect a 180° angle

Parallel Lines:
• Using alternate angles with a transversal

Applications:
• Scale drawings
• Maps and navigation
• Architecture and engineering`
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "What is the locus of all points equidistant from two fixed points A and B?",
          options: ["Circle", "Perpendicular bisector of AB", "Angle bisector", "Parallel line"],
          correct_answer: 1,
        },
        {
          id: 2,
          question: "What shape is the locus of points at a fixed distance from a given point?",
          options: ["Line", "Square", "Circle", "Ellipse"],
          correct_answer: 2,
        },
        {
          id: 3,
          question: "The locus equidistant from two intersecting lines forms a/an:",
          options: ["Perpendicular bisector", "Angle bisector", "Circle", "Parallel line"],
          correct_answer: 1,
        },
        {
          id: 4,
          question: "To construct a 60° angle, you only need a:",
          options: ["Protractor", "Ruler only", "Compass and straight edge", "Set square"],
          correct_answer: 2,
        },
        {
          id: 5,
          question: "A dog is on a 10m lead attached to a pole. What shape does its locus make?",
          options: ["Square with side 10m", "Circle with radius 10m", "Rectangle", "Line"],
          correct_answer: 1,
        },
      ],
    },
  },

  // ===== UNIT 5 (continued): STATISTICS =====
  {
    id: 1023,
    title: "Probability",
    description: "Basic probability, sample spaces, events, and simple probability calculations.",
    level: 5,
    xp_reward: 60,
    content: {
      text: `Probability (සම්භාවිතාව)

Definition:
Probability of an event = (Number of favourable outcomes) / (Total number of outcomes)
P(A) = n(A) / n(S)

Key Terminology:
• Experiment: An action with observable outcomes
• Sample Space (S): Set of ALL possible outcomes
• Event (A): A subset of the sample space
• Certain event: P(A) = 1
• Impossible event: P(A) = 0
• 0 ≤ P(A) ≤ 1 always

Complementary Events:
• P(A') = 1 - P(A)
• If P(rain) = 0.3, then P(no rain) = 0.7

Types of Events:
• Mutually exclusive: Cannot happen at same time
  P(A or B) = P(A) + P(B)
• Independent events: One does not affect the other
  P(A and B) = P(A) × P(B)
• Combined events:
  P(A or B) = P(A) + P(B) - P(A and B)

Tree Diagrams:
• Used to list all outcomes of combined events
• Multiply along branches for probability
• Add outcomes that satisfy the event

Example - Rolling a die:
S = {1, 2, 3, 4, 5, 6}, n(S) = 6
P(even) = 3/6 = 1/2
P(prime) = P({2,3,5}) = 3/6 = 1/2
P(greater than 4) = P({5,6}) = 2/6 = 1/3

Frequency and Probability:
• Relative frequency = frequency / total trials
• As trials increase, relative frequency → theoretical probability`
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "A bag has 3 red and 5 blue balls. What is P(red)?",
          options: ["3/5", "3/8", "5/8", "1/3"],
          correct_answer: 1,
        },
        {
          id: 2,
          question: "If P(A) = 0.4, what is P(A')?",
          options: ["0.4", "0.6", "1.4", "0"],
          correct_answer: 1,
        },
        {
          id: 3,
          question: "A coin is tossed twice. What is the probability of getting two heads?",
          options: ["1/2", "1/4", "1/3", "3/4"],
          correct_answer: 1,
        },
        {
          id: 4,
          question: "Events A and B are mutually exclusive. P(A) = 0.3 and P(B) = 0.5. What is P(A or B)?",
          options: ["0.15", "0.2", "0.8", "1.0"],
          correct_answer: 2,
        },
        {
          id: 5,
          question: "A die is rolled. What is P(odd or greater than 4)?",
          options: ["1/6", "2/3", "5/6", "4/6"],
          correct_answer: 1,
        },
      ],
    },
  },

  {
    id: 1024,
    title: "Frequency Distribution and Histograms",
    description: "Grouped data, frequency tables, histograms, cumulative frequency, and box plots.",
    level: 5,
    xp_reward: 60,
    content: {
      text: `Frequency Distribution and Histograms (සංඛ්‍යාත බෙදා හැරීම)

Grouped Frequency Tables:
• Data organised into class intervals
• Class width = Upper boundary - Lower boundary
• Midpoint = (Upper + Lower) / 2
• Frequency density = Frequency / Class width

Example:
| Height (cm) | Frequency | Midpoint |
|-------------|-----------|----------|
| 150-159     | 5         | 154.5    |
| 160-169     | 12        | 164.5    |
| 170-179     | 8         | 174.5    |

Histogram (ඉතිහාස):
• Bars touch each other (no gaps)
• X-axis: class intervals
• Y-axis: frequency (or frequency density)
• Area of bar ∝ Frequency

Estimating Mean from Grouped Data:
• Mean ≈ Σ(midpoint × frequency) / Σfrequency

Cumulative Frequency (සමුච්චිත සංඛ්‍යාත):
• Running total of frequencies
• Plot as cumulative frequency curve (ogive)
• S-shaped curve

From Cumulative Frequency Curve:
• Median = value at n/2
• Lower Quartile (Q1) = value at n/4
• Upper Quartile (Q3) = value at 3n/4
• Interquartile Range (IQR) = Q3 - Q1

Box Plot (Box and Whisker):
• Shows: Minimum, Q1, Median, Q3, Maximum
• Box contains middle 50% of data
• Whiskers extend to min and max`
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "In a histogram, what does the area of each bar represent?",
          options: ["Frequency density", "Class width", "Frequency", "Midpoint"],
          correct_answer: 2,
        },
        {
          id: 2,
          question: "The class interval 20 ≤ x < 30 has frequency 15. What is the frequency density?",
          options: ["1.5", "150", "0.15", "30"],
          correct_answer: 0,
        },
        {
          id: 3,
          question: "On a cumulative frequency curve with 80 values, the median is at:",
          options: ["40th value", "20th value", "60th value", "80th value"],
          correct_answer: 0,
        },
        {
          id: 4,
          question: "Q1 = 45 and Q3 = 75. What is the IQR?",
          options: ["45", "75", "30", "120"],
          correct_answer: 2,
        },
        {
          id: 5,
          question: "What shape is a cumulative frequency curve?",
          options: ["V-shape", "Bell shape", "S-shape", "Straight line"],
          correct_answer: 2,
        },
      ],
    },
  },

  // ===== UNIT 6 (continued): TRIGONOMETRY =====
  {
    id: 1025,
    title: "Trigonometry - Sine Rule and Cosine Rule",
    description: "Using sine and cosine rules for non-right-angled triangles and finding areas.",
    level: 6,
    xp_reward: 70,
    content: {
      text: `Sine Rule and Cosine Rule (සයින් නිතිය සහ කොසයින් නිතිය)

SINE RULE (සයින් නිතිය):
a/sin A = b/sin B = c/sin C

Use when given:
• Two angles and one side (AAS or ASA)
• Two sides and a non-included angle (SSA) — be careful of the ambiguous case!

Example: In △ABC, A = 40°, B = 75°, a = 8 cm. Find b.
  8/sin 40° = b/sin 75°
  b = 8 × sin 75° / sin 40° ≈ 12.0 cm

COSINE RULE (කොසයින් නිතිය):
Finding a side: a² = b² + c² - 2bc cos A
Finding an angle: cos A = (b² + c² - a²) / 2bc

Use when given:
• Three sides (SSS)
• Two sides and included angle (SAS)

Example: a = 7, b = 5, C = 60°. Find c.
  c² = 49 + 25 - 2(7)(5)cos 60°
  c² = 74 - 70(0.5) = 74 - 35 = 39
  c = √39 ≈ 6.24 cm

AREA OF A TRIANGLE:
Area = ½ab sin C
(where a and b are two sides and C is the included angle)

Special Values (remember these!):
• sin 30° = 0.5, cos 30° = √3/2, tan 30° = 1/√3
• sin 45° = √2/2, cos 45° = √2/2, tan 45° = 1
• sin 60° = √3/2, cos 60° = 0.5, tan 60° = √3
• sin 90° = 1, cos 90° = 0`
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "In a triangle, a = 10, A = 30°, B = 45°. Using sine rule, what is b?",
          options: ["10√2", "10", "5√2", "20"],
          correct_answer: 0,
        },
        {
          id: 2,
          question: "In a triangle with sides 5, 7, 8. What is cos of the largest angle?",
          options: ["1/5", "1/7", "5/14", "1/4"],
          correct_answer: 0,
        },
        {
          id: 3,
          question: "When should you use the cosine rule instead of the sine rule?",
          options: ["Two angles given", "Two sides and included angle given", "Three angles given", "One side and two angles given"],
          correct_answer: 1,
        },
        {
          id: 4,
          question: "What is the area of a triangle with sides 6 and 8 cm and included angle 30°?",
          options: ["12 cm²", "24 cm²", "48 cm²", "6 cm²"],
          correct_answer: 0,
        },
        {
          id: 5,
          question: "For the sine rule, which letters represent the SIDES of a triangle?",
          options: ["A, B, C", "a, b, c", "α, β, γ", "x, y, z"],
          correct_answer: 1,
        },
      ],
    },
  },

  {
    id: 1026,
    title: "Bearings and Angles of Elevation/Depression",
    description: "Three-figure bearings, angles of elevation and depression, and applied trigonometry.",
    level: 6,
    xp_reward: 55,
    content: {
      text: `Bearings and Angles of Elevation/Depression

BEARINGS (දිශාංග):
• Always measured CLOCKWISE from NORTH
• Always written as 3 digits (e.g., 045°, 270°)
• North = 000°, East = 090°, South = 180°, West = 270°

Cardinal Directions:
• N = 000°    NE = 045°
• E = 090°    SE = 135°
• S = 180°    SW = 225°
• W = 270°    NW = 315°

Back Bearing:
• Bearing from B to A = bearing from A to B ± 180°
• If bearing A→B = 070°, then bearing B→A = 250°

ANGLE OF ELEVATION (ඉහල දර්ශන කෝණය):
• Angle measured UPWARD from horizontal
• Looking UP at an object
• Used to find height of tall objects

ANGLE OF DEPRESSION (පහල දර්ශන කෝණය):
• Angle measured DOWNWARD from horizontal
• Looking DOWN at an object
• Angle of elevation = angle of depression (alternate angles)

Solving Problems:
1. Draw a clear diagram
2. Label the right-angled triangle
3. Identify the angle, opposite, adjacent, hypotenuse
4. Use SOH-CAH-TOA

Example:
A person stands 50m from a tree and looks up at 32° elevation.
Height = 50 × tan 32° ≈ 31.2m`
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "What is the bearing for due South?",
          options: ["090°", "270°", "180°", "000°"],
          correct_answer: 2,
        },
        {
          id: 2,
          question: "If the bearing from A to B is 130°, what is the bearing from B to A?",
          options: ["310°", "230°", "040°", "260°"],
          correct_answer: 0,
        },
        {
          id: 3,
          question: "A building casts a shadow 30m long. The angle of elevation of the sun is 50°. What is the building height?",
          options: ["30 tan 50°", "30 sin 50°", "30 cos 50°", "30/tan 50°"],
          correct_answer: 0,
        },
        {
          id: 4,
          question: "From a cliff 60m high, the angle of depression to a boat is 25°. What is the horizontal distance to the boat?",
          options: ["60 tan 25°", "60/tan 25°", "60 sin 25°", "60/sin 25°"],
          correct_answer: 1,
        },
        {
          id: 5,
          question: "Bearings are always measured clockwise from which direction?",
          options: ["South", "East", "West", "North"],
          correct_answer: 3,
        },
      ],
    },
  },

  // ===== UNIT 9: SEQUENCES & PATTERNS =====
  {
    id: 1027,
    title: "Sequences and Series",
    description: "Arithmetic and geometric sequences, nth term formulas, and sum of series.",
    level: 2,
    xp_reward: 65,
    content: {
      text: `Sequences and Series (අනුක්‍රම සහ ශ්‍රේණි)

ARITHMETIC SEQUENCE / PROGRESSION (AP) (සමාන්තර ශ්‍රේණිය):
• Each term differs from the previous by a constant (common difference d)
• General form: a, a+d, a+2d, a+3d, ...

Key Formulas for AP:
• nth term: Tₙ = a + (n-1)d
• Sum of n terms: Sₙ = n/2 × [2a + (n-1)d]  OR  Sₙ = n/2 × (first + last)

Where: a = first term, d = common difference, n = number of terms

Example: AP: 3, 7, 11, 15, ...
  a = 3, d = 4
  T₁₀ = 3 + 9(4) = 39
  S₁₀ = 10/2 × (3 + 39) = 5 × 42 = 210

GEOMETRIC SEQUENCE / PROGRESSION (GP) (ජ්‍යාමිතික ශ්‍රේණිය):
• Each term is multiplied by a constant ratio r
• General form: a, ar, ar², ar³, ...

Key Formulas for GP:
• nth term: Tₙ = arⁿ⁻¹
• Sum of n terms: Sₙ = a(rⁿ - 1)/(r - 1) when r ≠ 1
• Sum to infinity (|r| < 1): S∞ = a/(1-r)

Example: GP: 2, 6, 18, 54, ...
  a = 2, r = 3
  T₅ = 2 × 3⁴ = 162
  S₄ = 2(3⁴ - 1)/(3-1) = 2(80)/2 = 80

Identifying the type:
• Constant difference → AP
• Constant ratio → GP
• Neither → other patterns (e.g., square numbers, Fibonacci)`
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "Find the 10th term of the AP: 5, 9, 13, 17, ...",
          options: ["37", "41", "45", "49"],
          correct_answer: 1,
        },
        {
          id: 2,
          question: "What is the common ratio of the GP: 4, 12, 36, 108?",
          options: ["4", "8", "3", "2"],
          correct_answer: 2,
        },
        {
          id: 3,
          question: "Find the sum of the first 6 terms of AP: 2, 5, 8, ...",
          options: ["57", "51", "48", "60"],
          correct_answer: 0,
        },
        {
          id: 4,
          question: "Find the 5th term of GP: 3, 6, 12, 24, ...",
          options: ["36", "42", "48", "96"],
          correct_answer: 2,
        },
        {
          id: 5,
          question: "A GP has first term 8 and common ratio 1/2. What is the sum to infinity?",
          options: ["4", "8", "16", "∞"],
          correct_answer: 2,
        },
      ],
    },
  },

  // ===== UNIT 10: VECTORS =====
  {
    id: 1028,
    title: "Vectors",
    description: "Introduction to vectors, vector operations, position vectors, and geometric applications.",
    level: 3,
    xp_reward: 65,
    content: {
      text: `Vectors (දිශාකාර)

What is a Vector?
• A quantity with BOTH magnitude (size) and direction
• Represented by an arrow: →AB or bold letter a
• Scalar: has magnitude only (e.g., temperature, speed)
• Vector: has magnitude and direction (e.g., force, velocity)

Notation:
• Column vector: a = (x/y) where x is horizontal, y is vertical
• Magnitude: |a| = √(x² + y²)

Vector Operations:
• Addition: (a/b) + (c/d) = (a+c / b+d)
• Subtraction: (a/b) - (c/d) = (a-c / b-d)
• Scalar multiplication: k(a/b) = (ka/kb)

Position Vectors:
• Position vector of A = →OA (from origin O to point A)
• →AB = →OB - →OA = b - a

Parallel Vectors:
• Two vectors are parallel if one is a scalar multiple of the other
• If →AB = k→CD, then AB is parallel to CD

Midpoint:
• Midpoint M of AB: →OM = (a + b)/2

Unit Vector:
• Vector of magnitude 1
• Unit vector in direction of a = a/|a|

Collinear Points:
• Three points A, B, C are collinear if →AB = k→AC for some scalar k

Examples:
• If a = (3/4), |a| = √(9+16) = √25 = 5
• If a = (2/1) and b = (-1/3), then a + b = (1/4)`
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "What is the magnitude of vector (3, 4)?",
          options: ["3", "4", "5", "7"],
          correct_answer: 2,
        },
        {
          id: 2,
          question: "If a = (2, 5) and b = (3, -1), what is a + b?",
          options: ["(5, 4)", "(1, 6)", "(5, 6)", "(6, 4)"],
          correct_answer: 0,
        },
        {
          id: 3,
          question: "If →OA = a and →OB = b, what is →AB?",
          options: ["a + b", "a - b", "b - a", "b + a"],
          correct_answer: 2,
        },
        {
          id: 4,
          question: "Vector 3a is parallel to a. True or False?",
          options: ["True", "False", "Sometimes", "Cannot determine"],
          correct_answer: 0,
        },
        {
          id: 5,
          question: "A = (1, 2) and B = (5, 6). What is the position vector of the midpoint M of AB?",
          options: ["(3, 4)", "(2, 4)", "(4, 8)", "(6, 8)"],
          correct_answer: 0,
        },
      ],
    },
  },

  // ===== UNIT 11: MENSURATION (advanced) =====
  {
    id: 1029,
    title: "Circles - Arc Length, Sector and Segment",
    description: "Calculating arc length, area of sectors, and area of circular segments.",
    level: 4,
    xp_reward: 60,
    content: {
      text: `Circles - Arc Length, Sector and Segment (හීනය, ක්ෂේත්‍රය)

KEY CIRCLE FORMULAS:
• Circumference = 2πr or πd
• Area of circle = πr²

ARC LENGTH (හීනය):
• A fraction of the circumference
• Arc length = (θ/360°) × 2πr
• Where θ is the angle at the centre in degrees

SECTOR AREA (ක්ෂේත්‍රය ‍- කේක් කැබලි ආකාරය):
• A "pizza slice" of the circle
• Area of sector = (θ/360°) × πr²

SEGMENT (කොටස):
• Region between a chord and the arc
• Area of segment = Area of sector - Area of triangle
• Area of triangle = ½r² sin θ
• So: Area of segment = (θ/360°)πr² - ½r² sin θ

RADIAN MEASURE:
• π radians = 180°
• 1 radian ≈ 57.3°
• In radians: Arc length = rθ
• Area of sector = ½r²θ

Conversions:
• Degrees to radians: multiply by π/180
• Radians to degrees: multiply by 180/π

Example:
Circle radius 10 cm, sector angle 72°
Arc length = (72/360) × 2π(10) = (1/5) × 20π = 4π ≈ 12.6 cm
Sector area = (72/360) × π(10²) = (1/5) × 100π = 20π ≈ 62.8 cm²`
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "Find the arc length of a sector with radius 6 cm and angle 60°.",
          options: ["2π cm", "6π cm", "12π cm", "π cm"],
          correct_answer: 0,
        },
        {
          id: 2,
          question: "Find the area of a sector with radius 9 cm and angle 40°.",
          options: ["9π cm²", "81π/9 cm²", "9π/9 cm²", "81π cm²"],
          correct_answer: 1,
        },
        {
          id: 3,
          question: "How many radians is 90°?",
          options: ["π/4", "π/2", "π", "2π"],
          correct_answer: 1,
        },
        {
          id: 4,
          question: "A sector has radius 5 cm and arc length 10 cm. What is the angle in radians?",
          options: ["1", "2", "5", "10"],
          correct_answer: 1,
        },
        {
          id: 5,
          question: "Area of segment = Area of sector minus area of what?",
          options: ["Circle", "Rectangle", "Triangle", "Another sector"],
          correct_answer: 2,
        },
      ],
    },
  },

  // ===== UNIT 12: LINEAR PROGRAMMING =====
  {
    id: 1030,
    title: "Linear Programming",
    description: "Formulating and solving linear programming problems using graphs and inequalities.",
    level: 8,
    xp_reward: 70,
    content: {
      text: `Linear Programming (රේඛීය ක්‍රමලේඛනය)

What is Linear Programming?
• A method to find the optimal (maximum or minimum) value of a linear function
• Subject to a set of linear constraints (inequalities)
• Used in real-world optimisation problems

Steps to Solve:
1. Define variables (e.g., x = number of item A, y = number of item B)
2. Write the objective function (what to maximise or minimise)
3. Write the constraints as inequalities
4. Draw the feasible region on a graph
5. Find the vertices (corner points) of the feasible region
6. Evaluate the objective function at each vertex
7. Select the optimal solution

Graphing Inequalities:
• Draw the boundary line (use equality first)
• Dashed line: strict inequality (< or >)
• Solid line: ≤ or ≥
• Shade the correct region (test a point)

Feasible Region:
• The region satisfying ALL constraints simultaneously
• Optimal solution always occurs at a VERTEX of this region

Example:
Maximise P = 3x + 2y
Subject to: x + y ≤ 10, 2x + y ≤ 14, x ≥ 0, y ≥ 0

Vertices: (0,0), (0,10), (4,6), (7,0)
Evaluate P at each:
• P(0,0) = 0
• P(0,10) = 20
• P(4,6) = 24 ← Maximum!
• P(7,0) = 21`
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "In linear programming, where is the optimal solution always found?",
          options: ["Centre of feasible region", "Vertex of feasible region", "Any point inside the region", "On the x-axis"],
          correct_answer: 1,
        },
        {
          id: 2,
          question: "Which graph is used for a constraint with ≤?",
          options: ["Dashed line, shade below", "Solid line, shade below", "Dashed line, shade above", "No line needed"],
          correct_answer: 1,
        },
        {
          id: 3,
          question: "The feasible region is the area that satisfies:",
          options: ["Any one constraint", "Most constraints", "All constraints simultaneously", "No constraints"],
          correct_answer: 2,
        },
        {
          id: 4,
          question: "Maximise P = 5x + 3y. Which vertex gives maximum if options are (0,6), (3,4), (5,0)?",
          options: ["(0,6) giving 18", "(3,4) giving 27", "(5,0) giving 25", "(3,4) giving 24"],
          correct_answer: 1,
        },
        {
          id: 5,
          question: "x ≥ 0 and y ≥ 0 as constraints mean:",
          options: ["Both variables can be negative", "We work in the first quadrant only", "x and y must be integers", "No restriction"],
          correct_answer: 1,
        },
      ],
    },
  },

  // ===== UNIT 13: COORDINATE GEOMETRY =====
  {
    id: 1031,
    title: "Coordinate Geometry",
    description: "Straight line equations, gradient, midpoint, distance, and perpendicular lines.",
    level: 8,
    xp_reward: 60,
    content: {
      text: `Coordinate Geometry (ඛණ්ඩාංක ජ්‍යාමිතිය)

The Coordinate Plane:
• x-axis (horizontal) and y-axis (vertical)
• Origin (0, 0) is the intersection

Distance Formula:
• d = √[(x₂ - x₁)² + (y₂ - y₁)²]

Midpoint Formula:
• M = ((x₁ + x₂)/2 , (y₁ + y₂)/2)

Gradient (Slope):
• m = (y₂ - y₁) / (x₂ - x₁)
• Positive m: line goes up left to right
• Negative m: line goes down left to right
• m = 0: horizontal line
• m = ∞: vertical line

Equation of a Straight Line:
• Slope-intercept form: y = mx + c
• Point-slope form: y - y₁ = m(x - x₁)
• Standard form: ax + by + c = 0

Finding the Equation:
1. Find gradient m from two points
2. Use y - y₁ = m(x - x₁) with one point

Parallel Lines:
• Same gradient: m₁ = m₂

Perpendicular Lines:
• Gradients multiply to -1: m₁ × m₂ = -1
• Perpendicular gradient = -1/m

Equation of a Circle (centre O, radius r):
• x² + y² = r² (centred at origin)
• (x - h)² + (y - k)² = r² (centre at (h, k))`
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "Find the distance between (1, 2) and (4, 6).",
          options: ["3", "4", "5", "7"],
          correct_answer: 2,
        },
        {
          id: 2,
          question: "Find the midpoint of (2, 4) and (8, 10).",
          options: ["(5, 7)", "(6, 7)", "(5, 6)", "(4, 6)"],
          correct_answer: 0,
        },
        {
          id: 3,
          question: "What is the gradient of the line through (1, 3) and (4, 9)?",
          options: ["1", "2", "3", "4"],
          correct_answer: 1,
        },
        {
          id: 4,
          question: "A line has gradient 3. What is the gradient of a perpendicular line?",
          options: ["3", "-3", "1/3", "-1/3"],
          correct_answer: 3,
        },
        {
          id: 5,
          question: "What is the equation of a circle centred at origin with radius 5?",
          options: ["x + y = 5", "x² + y² = 25", "x² + y² = 5", "(x-5)² + (y-5)² = 1"],
          correct_answer: 1,
        },
      ],
    },
  },

  // ===== UNIT 14: NUMBER THEORY =====
  {
    id: 1032,
    title: "Number Theory - Factors, Multiples and Primes",
    description: "Prime factorisation, HCF, LCM, and properties of numbers.",
    level: 1,
    xp_reward: 50,
    content: {
      text: `Number Theory - Factors, Multiples and Primes

Prime Numbers (ප්‍රාථමික සංඛ්‍යා):
• Numbers with exactly TWO factors: 1 and itself
• 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, ...
• 1 is NOT a prime number
• 2 is the only EVEN prime number

Composite Numbers:
• Numbers with more than two factors
• e.g., 12 = 1 × 12 = 2 × 6 = 3 × 4

Prime Factorisation:
• Expressing a number as a product of prime factors
• Use factor tree or repeated division
• 60 = 2² × 3 × 5

Highest Common Factor (HCF) / GCD:
• Largest factor common to two or more numbers
• Method: Prime factorise, take common primes with lowest power
• HCF(12, 18) = 6

Lowest Common Multiple (LCM):
• Smallest multiple common to two or more numbers
• Method: Prime factorise, take all primes with highest power
• LCM(12, 18) = 36

Relationship: HCF × LCM = Product of two numbers
  6 × 36 = 12 × 18 = 216 ✓

Divisibility Rules:
• 2: last digit even
• 3: digit sum divisible by 3
• 4: last two digits divisible by 4
• 5: ends in 0 or 5
• 9: digit sum divisible by 9
• 10: ends in 0`
    },
    quiz: {
      questions: [
        {
          id: 1,
          question: "What is the prime factorisation of 72?",
          options: ["2³ × 3²", "2² × 3³", "2⁴ × 3", "2 × 3 × 12"],
          correct_answer: 0,
        },
        {
          id: 2,
          question: "Find the HCF of 24 and 36.",
          options: ["6", "8", "12", "72"],
          correct_answer: 2,
        },
        {
          id: 3,
          question: "Find the LCM of 8 and 12.",
          options: ["4", "24", "48", "96"],
          correct_answer: 1,
        },
        {
          id: 4,
          question: "Is 97 a prime number?",
          options: ["Yes", "No", "Cannot determine", "It depends"],
          correct_answer: 0,
        },
        {
          id: 5,
          question: "HCF of two numbers is 4 and LCM is 48. If one number is 12, what is the other?",
          options: ["12", "16", "24", "48"],
          correct_answer: 1,
        },
      ],
    },
  },
];

// Unit info for Maths
export const MATHS_UNIT_NAMES: { [key: number]: { name: string; color: string; gradient: string } } = {
  1: { name: "Number Systems & Arithmetic", color: "bg-blue-500", gradient: "from-blue-400 to-blue-600" },
  2: { name: "Algebra", color: "bg-purple-500", gradient: "from-purple-400 to-purple-600" },
  3: { name: "Geometry", color: "bg-green-500", gradient: "from-green-400 to-green-600" },
  4: { name: "Mensuration", color: "bg-orange-500", gradient: "from-orange-400 to-orange-600" },
  5: { name: "Statistics & Probability", color: "bg-pink-500", gradient: "from-pink-400 to-pink-600" },
  6: { name: "Trigonometry", color: "bg-red-500", gradient: "from-red-400 to-red-600" },
  7: { name: "Sets", color: "bg-teal-500", gradient: "from-teal-400 to-teal-600" },
  8: { name: "Graphs, Functions & Linear Programming", color: "bg-indigo-500", gradient: "from-indigo-400 to-indigo-600" },
  9: { name: "Sequences & Series", color: "bg-yellow-500", gradient: "from-yellow-400 to-yellow-600" },
  10: { name: "Vectors", color: "bg-cyan-500", gradient: "from-cyan-400 to-cyan-600" },
  11: { name: "Coordinate Geometry", color: "bg-violet-500", gradient: "from-violet-400 to-violet-600" },
};
