import type { Lesson } from './types';

// Grade 10 & 11 O/L Science Lessons - Sri Lankan Syllabus


export const SCIENCE_UNIT_NAMES: { [key: number]: string } = {
  1: 'Unit 1: Matter & Materials',
  2: 'Unit 2: Forces & Motion',
  3: 'Unit 3: Energy',
  4: 'Unit 4: Living World',
  5: 'Unit 5: Waves & Electricity',
};

// Theory lessons belong to the same units (level field matches unit number)

// ──────────────────────────────────────────────────────────────────────────────
// Virtual Lab Practical data (used by the VirtualLab component)
// Each lesson may have an associated lab
// ──────────────────────────────────────────────────────────────────────────────
export interface LabStep {
  instruction: string;
  action?: string; // button label for interactive step
  observation?: string; // text shown after action
}

export interface VirtualLab {
  title: string;
  objective: string;
  materials: string[];
  steps: LabStep[];
  conclusion: string;
  type: 'titration' | 'motion' | 'photosynthesis' | 'electricity' | 'density';
}

export const VIRTUAL_LABS: { [lessonId: number]: VirtualLab } = {
  1: {
    title: 'Acid-Base Titration with Indicators',
    objective: 'Determine when a neutralisation reaction is complete using a colour indicator.',
    type: 'titration',
    materials: ['Burette', 'Conical flask', 'HCl solution', 'NaOH solution', 'Phenolphthalein indicator', 'White tile'],
    steps: [
      { instruction: 'Fill the burette with NaOH solution to the 0.00 mL mark.' },
      { instruction: 'Add 25 mL of HCl to the conical flask.', action: 'Add HCl', observation: 'Flask contains colourless HCl solution.' },
      { instruction: 'Add 3 drops of phenolphthalein indicator.', action: 'Add Indicator', observation: 'Solution remains colourless — acid is present.' },
      { instruction: 'Slowly open the burette tap and add NaOH dropwise.', action: 'Add NaOH (5 mL)', observation: 'Still colourless — more NaOH needed.' },
      { instruction: 'Continue adding NaOH carefully near the endpoint.', action: 'Add NaOH (last drop)', observation: '🟣 Permanent pink/magenta colour! Endpoint reached.' },
      { instruction: 'Record the volume of NaOH used from the burette.' },
    ],
    conclusion: 'The pink colour at the endpoint shows neutralisation is complete (pH ≈ 7). Volume of NaOH used = volume needed to neutralise the acid.',
  },
  2: {
    title: 'Investigating Density of Irregular Objects',
    objective: 'Find the density of an irregular solid using water displacement.',
    type: 'density',
    materials: ['Measuring cylinder', 'Water', 'Irregular solid (stone)', 'Electronic balance', 'String'],
    steps: [
      { instruction: 'Measure the mass of the solid on the balance.', action: 'Weigh Solid', observation: 'Mass = 48.6 g' },
      { instruction: 'Pour 50 mL of water into the measuring cylinder.', action: 'Add Water', observation: 'Water level is at 50 mL.' },
      { instruction: 'Carefully lower the solid into the water using a string.', action: 'Lower Solid', observation: 'Water level rises to 68 mL. Volume displaced = 18 mL = 18 cm³.' },
      { instruction: 'Calculate density: ρ = mass / volume = 48.6 / 18', action: 'Calculate', observation: 'Density = 2.7 g/cm³ → This is Aluminium!' },
    ],
    conclusion: 'Density = Mass ÷ Volume. The displacement method lets us find the volume of any irregular object. Comparing to known densities identifies the material.',
  },
  3: {
    title: 'Newton\'s Second Law — Trolley & Masses',
    objective: 'Investigate how force and mass affect acceleration (F = ma).',
    type: 'motion',
    materials: ['Dynamics trolley', 'Hanging masses', 'String & pulley', 'Light gate timer', 'Runway'],
    steps: [
      { instruction: 'Set up the trolley on a runway with a pulley at one end.' },
      { instruction: 'Attach 100 g hanging mass and release the trolley.', action: 'Release (100 g)', observation: 'Timer records acceleration = 0.49 m/s².' },
      { instruction: 'Repeat with 200 g hanging mass (same trolley mass).', action: 'Release (200 g)', observation: 'Acceleration = 0.98 m/s². Doubled force → doubled acceleration! ✅' },
      { instruction: 'Now double the trolley mass, keep force at 200 g.', action: 'Release (heavier trolley)', observation: 'Acceleration = 0.49 m/s². Double mass → halved acceleration! ✅' },
    ],
    conclusion: 'F = ma is confirmed. Acceleration is proportional to force and inversely proportional to mass. Graphs of F vs a give a straight line through the origin.',
  },
  4: {
    title: 'Photosynthesis Rate — Pondweed Experiment',
    objective: 'Measure how light intensity affects the rate of photosynthesis.',
    type: 'photosynthesis',
    materials: ['Elodea pondweed', 'Sodium hydrogen carbonate solution', 'Lamp', 'Ruler', 'Beaker', 'Stopwatch'],
    steps: [
      { instruction: 'Place the pondweed in sodium hydrogen carbonate solution (provides CO₂).' },
      { instruction: 'Position the lamp 10 cm from the beaker and count bubbles per minute.', action: 'Count @ 10 cm', observation: '38 bubbles/min — lots of light → fast photosynthesis.' },
      { instruction: 'Move lamp to 20 cm and count again.', action: 'Count @ 20 cm', observation: '24 bubbles/min — less light → slower rate.' },
      { instruction: 'Move lamp to 40 cm.', action: 'Count @ 40 cm', observation: '12 bubbles/min — even slower.' },
      { instruction: 'Move lamp to 80 cm.', action: 'Count @ 80 cm', observation: '6 bubbles/min — very dim light, minimal photosynthesis.' },
    ],
    conclusion: 'As distance increases, light intensity decreases (inverse square law). Fewer bubbles (O₂) mean slower photosynthesis. Light is a limiting factor.',
  },
  5: {
    title: 'Simple Electric Circuit — Series vs Parallel',
    objective: 'Compare current and voltage in series and parallel circuits.',
    type: 'electricity',
    materials: ['Battery (6V)', '3 bulbs', 'Ammeter', 'Voltmeter', 'Connecting wires', 'Switch'],
    steps: [
      { instruction: 'Build a series circuit with 3 bulbs and measure current at each point.', action: 'Series Circuit', observation: 'Ammeter reads same (0.2 A) at all points. All bulbs equally dim.' },
      { instruction: 'Remove one bulb from the series circuit.', action: 'Remove 1 bulb (series)', observation: 'Circuit breaks! Other bulbs go out. 💡❌' },
      { instruction: 'Rebuild as parallel circuit with 3 bulbs.', action: 'Parallel Circuit', observation: 'Each bulb gets full 6 V. Bulbs are bright. Total current = 0.6 A.' },
      { instruction: 'Remove one bulb from the parallel circuit.', action: 'Remove 1 bulb (parallel)', observation: 'Other two bulbs stay ON. 💡💡✅' },
    ],
    conclusion: 'Series: same current everywhere, voltage shared, one break = all off. Parallel: same voltage everywhere, current splits, one break = others unaffected. Household wiring uses parallel.',
  },
};

// ──────────────────────────────────────────────────────────────────────────────
// LESSONS
// ──────────────────────────────────────────────────────────────────────────────
export const SCIENCE_LESSONS = [

  // ===== UNIT 1: MATTER & MATERIALS =====
  {
    id: 1,
    title: 'Acids, Bases & Neutralisation',
    description: 'Understand pH, indicators, acids & bases, and neutralisation reactions in everyday life.',
    level: 1,
    xp_reward: 60,
    content: {
      text: `Acids, Bases & Neutralisation (අම්ල, භෂ්ම සහ උදාසීනකරණය)

pH Scale (pH පරිමාණය):
• 0–6: Acidic | 7: Neutral | 8–14: Alkaline/Basic
• pH 7 = pure water at 25°C

Common Acids (සාමාන්‍ය අම්ල):
• Hydrochloric acid (HCl) — stomach acid, cleaning metals
• Sulfuric acid (H₂SO₄) — car batteries, fertilisers
• Citric acid — lemons, limes
• Acetic acid — vinegar

Common Bases (සාමාන්‍ය භෂ්ම):
• Sodium hydroxide (NaOH) — soap making
• Calcium hydroxide (Ca(OH)₂) — lime, whitewash
• Ammonia (NH₃) — household cleaners
• Sodium carbonate — washing soda

Indicators (දර්ශක):
• Litmus: turns RED in acid, BLUE in alkali
• Phenolphthalein: colourless in acid, PINK in alkali
• Universal indicator: whole range 0–14

Neutralisation (උදාසීනකරණය):
Acid + Base → Salt + Water
HCl + NaOH → NaCl + H₂O
H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O

Real-life Applications:
• Antacids neutralise excess stomach acid
• Lime is used to neutralise acidic soil
• Toothpaste (basic) neutralises mouth acids

🔬 Lab Practical: See Virtual Lab — Acid-Base Titration`,
    },
    quiz: {
      questions: [
        { id: 1, question: 'A solution has pH = 3. It is:', options: ['Strongly alkaline', 'Neutral', 'Weakly acidic', 'Strongly acidic'], correct_answer: 3 },
        { id: 2, question: 'What does phenolphthalein indicator show in an alkaline solution?', options: ['Red', 'Yellow', 'Pink/Magenta', 'Colourless'], correct_answer: 2 },
        { id: 3, question: 'Neutralisation of HCl with NaOH produces:', options: ['H₂O only', 'NaCl + H₂O', 'HNaO + Cl', 'NaOH + H'], correct_answer: 1 },
        { id: 4, question: 'Which acid is found in the human stomach?', options: ['Citric acid', 'Sulfuric acid', 'Hydrochloric acid', 'Acetic acid'], correct_answer: 2 },
        { id: 5, question: 'Farmers add lime to acidic soil in order to:', options: ['Increase acidity', 'Neutralise the acid', 'Add nitrogen', 'Kill bacteria'], correct_answer: 1 },
      ],
    },
  },

  {
    id: 2,
    title: 'Matter: States & Properties',
    description: 'Explore the three states of matter, changes of state, and properties like density and solubility.',
    level: 1,
    xp_reward: 55,
    content: {
      text: `States of Matter (ද්‍රව්‍යයේ අවස්ථා)

Three States (අවස්ථා තුන):
• Solid (ඝන) — fixed shape, fixed volume, particles vibrate
• Liquid (තරල) — no fixed shape, fixed volume, particles slide
• Gas (වායු) — no fixed shape, no fixed volume, particles move freely

Changes of State (අවස්ථා වෙනස්වීම):
• Melting: solid → liquid (absorbs heat)
• Freezing: liquid → solid (releases heat)
• Evaporation / Boiling: liquid → gas (absorbs heat)
• Condensation: gas → liquid (releases heat)
• Sublimation: solid → gas directly (e.g., iodine, dry ice)

Kinetic Theory (චාලක න්‍යාය):
• All matter is made of tiny particles (atoms/molecules)
• Particles are always in motion
• Higher temperature = more kinetic energy = faster movement

Density (ඝනත්වය):
• Density = Mass ÷ Volume (ρ = m/V)
• Units: g/cm³ or kg/m³
• Water density = 1 g/cm³ at 4°C
• Objects denser than water sink; less dense objects float

Solubility (ද්‍රාව්‍යතාව):
• Solute dissolves in solvent to form solution
• Solubility increases with temperature (most solids)
• Solubility decreases with temperature (most gases)
• Saturated solution: no more solute dissolves at that temperature

🔬 Lab Practical: See Virtual Lab — Density by Water Displacement`,
    },
    quiz: {
      questions: [
        { id: 1, question: 'In which state do particles have the most energy?', options: ['Solid', 'Liquid', 'Gas', 'All the same'], correct_answer: 2 },
        { id: 2, question: 'Density = ?', options: ['Volume / Mass', 'Mass × Volume', 'Mass / Volume', 'Mass + Volume'], correct_answer: 2 },
        { id: 3, question: 'Sublimation is the change from:', options: ['Liquid to gas', 'Solid directly to gas', 'Gas to solid', 'Solid to liquid'], correct_answer: 1 },
        { id: 4, question: 'A solution that cannot dissolve any more solute is called:', options: ['Dilute', 'Concentrated', 'Saturated', 'Soluble'], correct_answer: 2 },
        { id: 5, question: 'An object with density 0.7 g/cm³ placed in water will:', options: ['Sink to the bottom', 'Float', 'Dissolve', 'Remain stationary in the middle'], correct_answer: 1 },
      ],
    },
  },

  // ===== UNIT 2: FORCES & MOTION =====
  {
    id: 3,
    title: 'Forces & Newton\'s Laws of Motion',
    description: 'Learn about forces, Newton\'s three laws, and how they explain everyday motion.',
    level: 2,
    xp_reward: 65,
    content: {
      text: `Forces & Newton's Laws (බල සහ නිව්ටන් නියම)

What is a Force? (බලයක් යනු කුමක්ද?):
• A push or pull that can change an object's motion or shape
• Measured in Newtons (N)
• Vector quantity — has both magnitude and direction

Types of Forces (බල වර්ග):
• Gravity / Weight (W = mg) — Earth pulls all objects downward
• Normal force — surface pushes back perpendicular
• Friction — opposes motion (useful in brakes, walking; harmful in machines)
• Tension — force in a stretched string or rope
• Air resistance / Drag — opposes motion through fluids

Newton's First Law (ජඩතා නියමය):
"An object remains at rest or in uniform motion unless acted upon by a net external force."
→ Inertia: tendency to resist change in motion
→ Seat belts protect you because your body keeps moving forward when the car stops

Newton's Second Law (F = ma):
"Net force = mass × acceleration"
F = ma (Force in N, mass in kg, acceleration in m/s²)
• More force = more acceleration
• More mass = less acceleration for same force

Newton's Third Law (ක්‍රියා-ප්‍රතික්‍රියා නියමය):
"For every action, there is an equal and opposite reaction."
• Rocket pushes gas backward → gas pushes rocket forward
• You push on the ground → ground pushes you up

Weight vs Mass:
• Mass (kg): amount of matter — same everywhere
• Weight (N): gravitational force — changes with gravity
• W = mg (g = 10 N/kg on Earth, 1.6 N/kg on Moon)

🔬 Lab Practical: See Virtual Lab — Trolley & Newton's 2nd Law`,
    },
    quiz: {
      questions: [
        { id: 1, question: 'A 5 kg box is pushed with 20 N net force. Its acceleration is:', options: ['100 m/s²', '4 m/s²', '25 m/s²', '0.25 m/s²'], correct_answer: 1 },
        { id: 2, question: 'Newton\'s First Law relates to the concept of:', options: ['Force', 'Inertia', 'Momentum', 'Energy'], correct_answer: 1 },
        { id: 3, question: 'A 60 kg person on the Moon (g = 1.6 N/kg). Their weight on the Moon is:', options: ['60 N', '600 N', '96 N', '37.5 N'], correct_answer: 2 },
        { id: 4, question: 'Which of these is an example of Newton\'s Third Law?', options: ['A falling ball accelerates', 'A rocket propels by expelling gas', 'A car skids on wet road', 'A book rests on a table'], correct_answer: 1 },
        { id: 5, question: 'Friction is a force that:', options: ['Always helps motion', 'Acts in the direction of motion', 'Opposes relative motion', 'Only exists in liquids'], correct_answer: 2 },
      ],
    },
  },

  {
    id: 4,
    title: 'Photosynthesis & Respiration',
    description: 'Understand how plants make food and how all living things release energy.',
    level: 4,
    xp_reward: 60,
    content: {
      text: `Photosynthesis & Respiration (ප්‍රභා සංශ්ලේෂණය සහ ශ්වසනය)

Photosynthesis (ප්‍රභා සංශ්ලේෂණය):
6CO₂ + 6H₂O + Light energy → C₆H₁₂O₆ + 6O₂

• Occurs in CHLOROPLASTS of plant cells
• Chlorophyll (green pigment) absorbs light energy
• Raw materials: Carbon dioxide (from air), Water (from soil)
• Products: Glucose (stored energy), Oxygen (released)

Factors Affecting Photosynthesis Rate:
• Light intensity — more light = faster rate (up to a limit)
• CO₂ concentration — more CO₂ = faster rate
• Temperature — optimum around 25–35°C; enzymes denature above 40°C
• Water availability — needed as raw material

Limiting factors: whichever factor is in shortest supply limits the rate.

Aerobic Respiration (වායු ශ්වසනය):
C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + Energy (ATP)

• Occurs in MITOCHONDRIA
• Releases energy for all life processes: movement, growth, warmth
• Happens ALL the time in ALL living cells

Anaerobic Respiration (anaerobic ශ්වසනය):
In yeast/plants: C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂ + energy
In muscles: C₆H₁₂O₆ → Lactic acid + energy

• No oxygen needed
• Less energy than aerobic
• Lactic acid causes muscle fatigue
• Used in fermentation (bread, beer, yoghurt)

Comparison:
| Feature | Aerobic | Anaerobic |
|---|---|---|
| Oxygen | Required | Not required |
| Energy | More ATP | Less ATP |
| Location | Mitochondria | Cytoplasm |
| Waste | CO₂ + H₂O | Lactic acid / Ethanol |

🔬 Lab Practical: See Virtual Lab — Pondweed Photosynthesis Rate`,
    },
    quiz: {
      questions: [
        { id: 1, question: 'Where does photosynthesis take place inside the cell?', options: ['Nucleus', 'Mitochondria', 'Chloroplasts', 'Cell wall'], correct_answer: 2 },
        { id: 2, question: 'Which gas is produced during photosynthesis?', options: ['Carbon dioxide', 'Nitrogen', 'Oxygen', 'Hydrogen'], correct_answer: 2 },
        { id: 3, question: 'Anaerobic respiration in human muscles produces:', options: ['Ethanol', 'Lactic acid', 'Glucose', 'ATP only'], correct_answer: 1 },
        { id: 4, question: 'Which organelle is responsible for aerobic respiration?', options: ['Chloroplast', 'Nucleus', 'Ribosome', 'Mitochondria'], correct_answer: 3 },
        { id: 5, question: 'If CO₂ concentration is low, photosynthesis rate is limited by:', options: ['Temperature only', 'CO₂ as a limiting factor', 'Light intensity', 'Water availability'], correct_answer: 1 },
      ],
    },
  },

  {
    id: 5,
    title: 'Electricity: Circuits & Current',
    description: 'Explore electric circuits, Ohm\'s Law, series and parallel arrangements, and electrical safety.',
    level: 5,
    xp_reward: 65,
    content: {
      text: `Electricity: Circuits & Current (විදුලිය: පරිපථ සහ ධාරාව)

Key Quantities:
• Current (I) — flow of charge; unit: Ampere (A); measured by ammeter
• Voltage / Potential Difference (V) — electrical "push"; unit: Volt (V); measured by voltmeter
• Resistance (R) — opposition to current flow; unit: Ohm (Ω)

Ohm's Law (ඕම් නියමය):
V = IR  →  I = V/R  →  R = V/I
• At constant temperature, current is proportional to voltage
• Doubling voltage → doubles current

Series Circuits (ශ්‍රේණි පරිපථ):
• Same current flows through all components
• Voltages ADD UP: V_total = V₁ + V₂ + V₃
• Resistances ADD UP: R_total = R₁ + R₂ + R₃
• If one component fails → ALL stop

Parallel Circuits (සමාන්තර පරිපථ):
• Same voltage across all branches
• Currents ADD UP: I_total = I₁ + I₂ + I₃
• Total resistance DECREASES (1/R_total = 1/R₁ + 1/R₂)
• If one component fails → OTHERS still work

Power (බලය):
P = IV = I²R = V²/R
Unit: Watt (W) or kilowatt (kW)
Energy = Power × Time (kWh for electricity bills)

Electrical Safety:
• Fuses melt to break the circuit if current is too high
• Circuit breakers trip and can be reset
• Earth wire connects metal parts to ground → prevents electric shock
• Never use electrical appliances near water

🔬 Lab Practical: See Virtual Lab — Series vs Parallel Circuits`,
    },
    quiz: {
      questions: [
        { id: 1, question: 'A 6 Ω resistor has 3 A flowing through it. The voltage across it is:', options: ['2 V', '18 V', '9 V', '0.5 V'], correct_answer: 1 },
        { id: 2, question: 'In a parallel circuit, if one bulb is removed:', options: ['All bulbs go out', 'The others get dimmer', 'The others continue working normally', 'Current doubles everywhere'], correct_answer: 2 },
        { id: 3, question: 'A device with P = 2000 W runs for 3 hours. Energy used in kWh is:', options: ['2 kWh', '6 kWh', '0.67 kWh', '600 kWh'], correct_answer: 1 },
        { id: 4, question: 'Two 4 Ω resistors in series give a total resistance of:', options: ['2 Ω', '4 Ω', '8 Ω', '16 Ω'], correct_answer: 2 },
        { id: 5, question: 'The purpose of a fuse in a circuit is to:', options: ['Increase the voltage', 'Store electrical energy', 'Protect the circuit from excess current', 'Reduce resistance'], correct_answer: 2 },
      ],
    },
  },

  // ===== UNIT 3: ENERGY =====
  {
    id: 6,
    title: 'Energy: Types, Transfer & Conservation',
    description: 'Study kinetic, potential and other energy forms, and understand the law of conservation of energy.',
    level: 3,
    xp_reward: 55,
    content: {
      text: `Energy: Types, Transfer & Conservation (ශක්තිය)

Types of Energy (ශක්ති වර්ග):
• Kinetic Energy (KE): energy of moving objects — KE = ½mv²
• Gravitational Potential Energy (GPE): GPE = mgh
• Chemical Energy: stored in food, fuel, batteries
• Thermal / Heat Energy: movement of particles
• Electrical Energy: moving charges in a circuit
• Light (Radiant) Energy: electromagnetic waves
• Sound Energy: vibrations in a medium
• Nuclear Energy: stored in atomic nuclei

Energy Transfers:
• Energy cannot be created or destroyed — it can only be CONVERTED
• Law of Conservation of Energy: Total energy before = Total energy after
• Efficiency = (Useful energy output / Total energy input) × 100%

Example — Hydroelectric Power Station:
GPE of water → KE of falling water → KE of turbine → Electrical energy

Heat Transfer:
• Conduction: through solids (particles vibrate and transfer energy)
• Convection: through fluids (hot fluid rises, cold sinks — convection current)
• Radiation: electromagnetic waves (doesn't need a medium — heats Earth from Sun)

Renewable vs Non-Renewable Energy:
Renewable (ප්‍රතිජනනීය):
• Solar, Wind, Hydroelectric, Tidal, Geothermal, Biomass
• Will not run out; less environmental impact

Non-Renewable (ප්‍රතිජනනීය නොවන):
• Coal, Oil, Natural Gas, Nuclear (uranium)
• Will eventually run out; coal/oil/gas release CO₂

Sri Lanka's Energy Mix:
• Hydro dams (Mahaweli) supply significant electricity
• Growing solar and wind capacity
• Petroleum imports for transport`,
    },
    quiz: {
      questions: [
        { id: 1, question: 'A 2 kg ball moving at 4 m/s has kinetic energy of:', options: ['8 J', '16 J', '4 J', '32 J'], correct_answer: 1 },
        { id: 2, question: 'The law of conservation of energy states that energy:', options: ['Can be created from nothing', 'Can be destroyed when used', 'Cannot be created or destroyed, only converted', 'Always becomes heat'], correct_answer: 2 },
        { id: 3, question: 'Heat transfer through a vacuum (like from the Sun to Earth) is by:', options: ['Conduction', 'Convection', 'Radiation', 'All three'], correct_answer: 2 },
        { id: 4, question: 'Which is a renewable energy source?', options: ['Coal', 'Natural gas', 'Solar', 'Petroleum'], correct_answer: 2 },
        { id: 5, question: 'A machine is 40% efficient. If the input is 500 J, useful output is:', options: ['40 J', '500 J', '200 J', '460 J'], correct_answer: 2 },
      ],
    },
  },

  // ===== UNIT 5: WAVES =====
  {
    id: 7,
    title: 'Waves: Sound & Light',
    description: 'Understand wave properties, sound waves, the electromagnetic spectrum and light behaviour.',
    level: 5,
    xp_reward: 60,
    content: {
      text: `Waves: Sound & Light (තරංග: ශබ්ද සහ ආලෝකය)

Wave Properties (තරංග ගුණ):
• Amplitude (A): maximum displacement from rest position
• Wavelength (λ): distance between two consecutive crests
• Frequency (f): number of waves per second; unit: Hertz (Hz)
• Wave speed: v = fλ
• Period (T): T = 1/f

Transverse vs Longitudinal:
• Transverse: particles vibrate PERPENDICULAR to wave direction (light, water waves)
• Longitudinal: particles vibrate PARALLEL to wave direction (sound, P-waves)

Sound Waves (ශබ්ද තරංග):
• Need a medium to travel (cannot travel in vacuum)
• Speed in air ≈ 340 m/s; faster in liquids and solids
• Pitch = frequency (high pitch = high frequency)
• Loudness = amplitude (louder = greater amplitude)
• Ultrasound (>20,000 Hz): medical imaging, sonar

Light (ආලෝකය):
• Electromagnetic wave — travels at 3 × 10⁸ m/s in vacuum
• Travels in straight lines (rectilinear propagation)
• Reflection: angle of incidence = angle of reflection
• Refraction: bending of light when it changes medium
  - Snell's Law: n₁sinθ₁ = n₂sinθ₂
• Total Internal Reflection: occurs when angle > critical angle → optical fibres

Electromagnetic Spectrum (low to high frequency):
Radio → Microwave → Infrared → Visible Light → Ultraviolet → X-rays → Gamma rays

All EM waves:
• Travel at speed of light in vacuum
• Are transverse waves
• Transfer energy without needing a medium`,
    },
    quiz: {
      questions: [
        { id: 1, question: 'A wave has frequency 500 Hz and wavelength 0.68 m. Its speed is:', options: ['500 m/s', '340 m/s', '0.68 m/s', '1.36 m/s'], correct_answer: 1 },
        { id: 2, question: 'Sound cannot travel through:', options: ['Water', 'Steel', 'Vacuum', 'Air'], correct_answer: 2 },
        { id: 3, question: 'Light bending as it passes from air into glass is called:', options: ['Reflection', 'Diffraction', 'Refraction', 'Total internal reflection'], correct_answer: 2 },
        { id: 4, question: 'Which electromagnetic wave has the highest frequency?', options: ['Radio waves', 'X-rays', 'Visible light', 'Gamma rays'], correct_answer: 3 },
        { id: 5, question: 'Ultrasound is used in hospitals for:', options: ['Sterilising equipment', 'Medical imaging', 'Communication', 'Heating patients'], correct_answer: 1 },
      ],
    },
  },

  // ===== UNIT 4: LIVING WORLD =====
  {
    id: 8,
    title: 'Cells: Structure & Function',
    description: 'Compare plant and animal cells, learn organelle functions, and understand cell division.',
    level: 4,
    xp_reward: 55,
    content: {
      text: `Cells: Structure & Function (සෛල: ව්‍යූහය සහ කාර්යයන්)

The Cell Theory (සෛල න්‍යාය):
• All living things are made of cells
• The cell is the basic unit of life
• All cells come from pre-existing cells

Animal Cell Organelles (සත්ව සෛල):
• Nucleus: contains DNA, controls cell activities
• Cell membrane: controls what enters and exits (selectively permeable)
• Cytoplasm: gel-like fluid where chemical reactions occur
• Mitochondria: site of aerobic respiration — produces energy (ATP)
• Ribosome: site of protein synthesis
• Endoplasmic reticulum: transport network inside the cell

Plant Cell (Extra Organelles — ශාක සෛල):
• Cell wall: made of cellulose — provides strength and support
• Chloroplasts: contain chlorophyll — site of photosynthesis
• Vacuole (large central): stores water, maintains turgor pressure

Differences Summary:
| Feature | Animal Cell | Plant Cell |
|---|---|---|
| Cell wall | ✗ | ✓ (cellulose) |
| Chloroplasts | ✗ | ✓ |
| Large vacuole | ✗ | ✓ |
| Shape | Irregular | Regular / fixed |

Diffusion & Osmosis:
• Diffusion: movement of particles from HIGH → LOW concentration (e.g., O₂ into cells)
• Osmosis: diffusion of WATER through a semi-permeable membrane
  - Water moves from dilute → concentrated solution
  - Turgor: plant cells firm when full of water → wilting when water lost

Cell Division:
• Mitosis: produces 2 identical cells — for growth and repair
• Meiosis: produces 4 genetically different cells — for sexual reproduction (gametes)`,
    },
    quiz: {
      questions: [
        { id: 1, question: 'Which organelle is the site of photosynthesis?', options: ['Mitochondria', 'Nucleus', 'Chloroplast', 'Ribosome'], correct_answer: 2 },
        { id: 2, question: 'Plant cell walls are made of:', options: ['Protein', 'Starch', 'Cellulose', 'Lipids'], correct_answer: 2 },
        { id: 3, question: 'Osmosis is the movement of:', options: ['Glucose molecules', 'Water through a semi-permeable membrane', 'All molecules from high to low concentration', 'Oxygen into the cell'], correct_answer: 1 },
        { id: 4, question: 'Mitosis produces:', options: ['4 genetically different cells', '2 identical cells', '1 cell only', 'Gametes only'], correct_answer: 1 },
        { id: 5, question: 'Which organelle controls what enters and leaves the cell?', options: ['Cell wall', 'Nucleus', 'Vacuole', 'Cell membrane'], correct_answer: 3 },
      ],
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // THEORY LESSONS — UNIT 1: MATTER & MATERIALS
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 9,
    title: 'Atomic Structure & the Periodic Table',
    description: 'Understand the structure of atoms, subatomic particles, electron configurations, and how elements are arranged in the Periodic Table.',
    level: 1,
    xp_reward: 65,
    content: {
      text: `Atomic Structure & the Periodic Table (පරමාණු ව්‍යූහය සහ ආවර්ත වගුව)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
THE ATOM (පරමාණුව)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• All matter is made of atoms — the smallest unit of an element
• Every atom has a central nucleus surrounded by electrons

Subatomic Particles (උපපරමාණුක අංශු):
  Proton    → charge +1 | mass 1 amu | found in nucleus
  Neutron   → charge  0 | mass 1 amu | found in nucleus
  Electron  → charge −1 | mass ~0   | orbits in shells

Key Numbers:
• Atomic Number (Z) = number of protons → defines the element
• Mass Number (A)   = protons + neutrons
• Neutrons           = A − Z
• In a neutral atom: protons = electrons

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ELECTRON SHELLS (ඉලෙක්ට්‍රෝන කවල)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Shell 1 → max 2 electrons
Shell 2 → max 8 electrons
Shell 3 → max 8 electrons (O/L level)

Examples:
• Hydrogen  H  (Z=1)  → 1
• Carbon    C  (Z=6)  → 2, 4
• Sodium    Na (Z=11) → 2, 8, 1
• Chlorine  Cl (Z=17) → 2, 8, 7

Isotopes (සමස්ථානික):
• Same element, different number of neutrons
• Examples: Carbon-12 (6p, 6n) and Carbon-14 (6p, 8n)
• Used in carbon dating, nuclear medicine

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
THE PERIODIC TABLE (ආවර්ත වගුව)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Elements arranged in order of increasing atomic number
• PERIODS (rows): crossing a period → filling the same shell
• GROUPS (columns): same number of outer electrons → similar properties

Important Groups:
Group 1  — Alkali Metals (Li, Na, K)
  → 1 outer electron | very reactive | react violently with water
  → Reactivity INCREASES down the group

Group 7  — Halogens (F, Cl, Br, I)
  → 7 outer electrons | non-metals | form salts
  → Reactivity DECREASES down the group

Group 0/18 — Noble Gases (He, Ne, Ar)
  → Full outer shell | extremely unreactive (inert)
  → Used in lights, welding, balloons

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
METALS vs NON-METALS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Metals (left/centre):
  • Shiny, hard, good conductors of heat & electricity
  • Malleable (can be hammered into shapes)
  • High melting points (except mercury)

Non-metals (right side):
  • Poor conductors (except graphite)
  • Brittle when solid
  • Lower melting points

Sri Lanka Connection 🇱🇰:
• Graphite (carbon — non-metal) is mined in Sri Lanka (Bogala mine)
• Ilmenite (titanium ore) is found in Sri Lankan beach sands
• Sri Lanka is one of the world's top graphite exporters`,
    },
    quiz: {
      questions: [
        { id: 1, question: 'An atom has atomic number 17 and mass number 35. How many neutrons does it have?', options: ['17', '35', '18', '52'], correct_answer: 2 },
        { id: 2, question: 'Elements in the same GROUP of the Periodic Table have:', options: ['The same mass number', 'The same number of shells', 'The same number of outer electrons', 'The same number of neutrons'], correct_answer: 2 },
        { id: 3, question: 'Which group contains the Noble Gases?', options: ['Group 1', 'Group 7', 'Group 0/18', 'Group 2'], correct_answer: 2 },
        { id: 4, question: 'Sodium (Na) has atomic number 11. Its electron configuration is:', options: ['2, 9', '2, 8, 1', '3, 8', '8, 3'], correct_answer: 1 },
        { id: 5, question: 'Carbon-12 and Carbon-14 are examples of:', options: ['Different elements', 'Isotopes', 'Ions', 'Compounds'], correct_answer: 1 },
      ],
    },
  },

  {
    id: 10,
    title: 'Chemical Bonding & Compounds',
    description: 'Explore ionic and covalent bonding, how compounds form, and the properties of different bond types.',
    level: 1,
    xp_reward: 60,
    content: {
      text: `Chemical Bonding & Compounds (රසායනික බන්ධන සහ සංයෝග)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WHY ATOMS BOND (පරමාණු බදාගන්නේ ඇයි?)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Atoms bond to achieve a FULL OUTER SHELL (stable noble gas configuration)
• Atoms with incomplete outer shells are chemically reactive
• Bonding can happen by TRANSFERRING or SHARING electrons

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
IONIC BONDING (අයෝනික බන්ධනය)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Forms between a METAL and a NON-METAL
• Metal LOSES electrons → becomes positive ion (cation)
• Non-metal GAINS electrons → becomes negative ion (anion)
• Opposite charges attract → ionic bond

Example — Sodium Chloride (NaCl):
  Na (2,8,1) → loses 1 electron → Na⁺ (2,8) ✓ full shell
  Cl (2,8,7) → gains 1 electron → Cl⁻ (2,8,8) ✓ full shell
  Na⁺ + Cl⁻ → NaCl (table salt)

Properties of Ionic Compounds:
  ✔ High melting & boiling points (strong electrostatic attraction)
  ✔ Conduct electricity when dissolved in water OR when molten
  ✔ Form crystalline structures
  ✔ Usually soluble in water

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
COVALENT BONDING (සහ-සංයෝජක බන්ධනය)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Forms between TWO NON-METALS
• Atoms SHARE pairs of electrons
• Single bond: 1 shared pair (H–H, H–Cl)
• Double bond: 2 shared pairs (O=O, C=O)
• Triple bond: 3 shared pairs (N≡N)

Common Covalent Molecules:
  H₂O  (water)    → 2 single bonds, bent shape
  CO₂             → 2 double bonds, linear shape
  NH₃  (ammonia)  → 3 single bonds, pyramidal
  CH₄  (methane)  → 4 single bonds, tetrahedral

Properties of Covalent Compounds:
  ✔ Generally LOW melting & boiling points
  ✔ Usually do NOT conduct electricity
  ✔ Can be gas, liquid or low-melting solid at room temperature

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
METALLIC BONDING (ලෝහ බන්ධනය)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Metal atoms release outer electrons → "sea of free electrons"
• Positive metal ions held together by the electron sea
• Explains: high conductivity, malleability, high melting points

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WRITING CHEMICAL FORMULAE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Use valency to balance charges:
  NaCl (1:1) | CaCl₂ (1:2) | Al₂O₃ (2:3) | MgO (1:1)

Common Ions to Know:
  Na⁺, K⁺, Ca²⁺, Mg²⁺, Al³⁺ (metals)
  Cl⁻, O²⁻, NO₃⁻, SO₄²⁻, CO₃²⁻ (non-metals / polyatomic)`,
    },
    quiz: {
      questions: [
        { id: 1, question: 'Ionic bonds form between:', options: ['Two non-metals', 'A metal and a non-metal', 'Two metals', 'A metal and a noble gas'], correct_answer: 1 },
        { id: 2, question: 'In covalent bonding, atoms:', options: ['Transfer electrons', 'Share electrons', 'Lose electrons only', 'Gain electrons only'], correct_answer: 1 },
        { id: 3, question: 'Why do ionic compounds have high melting points?', options: ['They have large atoms', 'Strong electrostatic forces between ions', 'They share electrons strongly', 'They are always solid crystals'], correct_answer: 1 },
        { id: 4, question: 'Water (H₂O) has what type of bonding?', options: ['Ionic', 'Metallic', 'Covalent', 'No bonding'], correct_answer: 2 },
        { id: 5, question: 'A sodium ion (Na⁺) forms when sodium:', options: ['Gains 1 electron', 'Loses 1 electron', 'Shares 1 electron', 'Gains 2 electrons'], correct_answer: 1 },
      ],
    },
  },

  {
    id: 11,
    title: 'Chemical Reactions & Equations',
    description: 'Learn to write and balance chemical equations, understand types of reactions, and apply the law of conservation of mass.',
    level: 1,
    xp_reward: 65,
    content: {
      text: `Chemical Reactions & Equations (රසායනික ප්‍රතික්‍රියා සහ සමීකරණ)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WHAT IS A CHEMICAL REACTION?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Reactants → Products (new substances formed)
• Signs of a reaction: colour change, gas produced, precipitate formed,
  temperature change, light emitted

Law of Conservation of Mass (ස්කන්ධ සංරක්ෂණ නියමය):
  "Mass of reactants = Mass of products"
  → Atoms are never created or destroyed, only rearranged

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WRITING & BALANCING EQUATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Steps:
  1. Write word equation
  2. Write symbol equation (unbalanced)
  3. Balance by adding coefficients (NOT by changing formulae)
  4. Add state symbols: (s) solid, (l) liquid, (g) gas, (aq) aqueous

Example:
  Hydrogen + Oxygen → Water
  H₂ + O₂ → H₂O           (unbalanced)
  2H₂ + O₂ → 2H₂O         (balanced ✓)

Example 2 — Burning Magnesium:
  2Mg(s) + O₂(g) → 2MgO(s)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TYPES OF CHEMICAL REACTIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Combination / Synthesis:  A + B → AB
   Example: 2Na + Cl₂ → 2NaCl

2. Decomposition:  AB → A + B
   Example: 2H₂O → 2H₂ + O₂ (electrolysis)
   Example: CaCO₃ → CaO + CO₂ (heating limestone)

3. Displacement (Single):  A + BC → AC + B
   More reactive metal displaces less reactive
   Example: Zn + CuSO₄ → ZnSO₄ + Cu

4. Double Displacement (Precipitation):  AB + CD → AD↓ + CB
   Example: AgNO₃ + NaCl → AgCl↓ + NaNO₃

5. Combustion:
   Complete:   CH₄ + 2O₂ → CO₂ + 2H₂O  (blue flame)
   Incomplete: 2CH₄ + 3O₂ → 2CO + 4H₂O (yellow/sooty flame, CO produced)

6. Oxidation & Reduction (Redox):
   Oxidation = loss of electrons (or gain of oxygen)
   Reduction = gain of electrons (or loss of oxygen)
   OIL RIG: Oxidation Is Loss, Reduction Is Gain

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
REACTIVITY SERIES (ප්‍රතික්‍රියාශීලිතා ශ්‍රේණිය)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Most reactive:  K > Na > Ca > Mg > Al > Zn > Fe > Pb > (H) > Cu > Ag > Au

• More reactive metals react with cold water, dilute acids
• Less reactive metals below hydrogen don't react with dilute acids
• Used to predict displacement reactions`,
    },
    quiz: {
      questions: [
        { id: 1, question: 'Which equation is correctly balanced?', options: ['H₂ + O₂ → H₂O', '2H₂ + O₂ → 2H₂O', 'H₂ + 2O₂ → H₂O₂', '2H₂ + 2O₂ → 2H₂O'], correct_answer: 1 },
        { id: 2, question: 'In a displacement reaction, zinc is added to copper sulfate solution. What forms?', options: ['Copper + zinc sulfate', 'Zinc oxide + copper', 'No reaction occurs', 'Zinc chloride + copper'], correct_answer: 0 },
        { id: 3, question: 'What does OIL RIG stand for in redox reactions?', options: ['Oxygen In, Lose Radicals In Groups', 'Oxidation Is Loss, Reduction Is Gain', 'Outer Ion Loses, Reduces Into Gas', 'Only In Liquid, Reaction In Gas'], correct_answer: 1 },
        { id: 4, question: 'The state symbol (aq) means:', options: ['Solid state', 'Gas state', 'Dissolved in water', 'Liquid state'], correct_answer: 2 },
        { id: 5, question: 'CaCO₃ → CaO + CO₂ is an example of which type of reaction?', options: ['Combination', 'Displacement', 'Combustion', 'Decomposition'], correct_answer: 3 },
      ],
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // THEORY LESSONS — UNIT 2: FORCES & MOTION
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 12,
    title: 'Speed, Velocity & Acceleration',
    description: 'Understand scalar and vector quantities, calculate speed, velocity and acceleration, and interpret distance-time and velocity-time graphs.',
    level: 2,
    xp_reward: 65,
    content: {
      text: `Speed, Velocity & Acceleration (වේගය, ප්‍රවේගය සහ ත්වරණය)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SCALAR vs VECTOR (නිශ්‍ප්‍රදේශ සහ සදිශ)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Scalar quantities — magnitude only:
  speed, distance, mass, temperature, time, energy

Vector quantities — magnitude AND direction:
  velocity, displacement, force, acceleration, momentum

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DISTANCE vs DISPLACEMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Distance: total length of path travelled (scalar)
• Displacement: straight-line distance from start to end + direction (vector)

Example: You walk 4 m East and then 3 m North
  Distance = 7 m | Displacement = 5 m (NE, by Pythagoras)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SPEED & VELOCITY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Speed    = Distance ÷ Time         (m/s)
  Velocity = Displacement ÷ Time     (m/s, with direction)

• Average speed of a trip includes all stops
• Instantaneous speed = speed at a specific moment (car speedometer)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ACCELERATION (ත්වරණය)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  a = (v − u) ÷ t        (m/s²)
  u = initial velocity | v = final velocity | t = time

  Positive a → speeding up
  Negative a (deceleration) → slowing down

SUVAT Equations of Motion:
  v = u + at
  s = ut + ½at²
  v² = u² + 2as
  (s = displacement)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MOTION GRAPHS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Distance–Time (d-t) Graph:
  Flat horizontal line  → stationary (not moving)
  Straight diagonal     → constant speed
  Curved line           → changing speed (acceleration)
  Gradient              = speed

Velocity–Time (v-t) Graph:
  Flat horizontal line  → constant velocity (zero acceleration)
  Straight line up      → constant acceleration
  Straight line down    → constant deceleration
  Gradient              = acceleration
  Area under graph      = displacement (distance travelled)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FREE FALL & TERMINAL VELOCITY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• In free fall (no air resistance): a = g = 10 m/s²
• With air resistance: drag increases as speed increases
• Terminal velocity: drag force = weight → no more acceleration
  → Object falls at constant (maximum) speed
• Parachutes increase drag → lower terminal velocity → safe landing`,
    },
    quiz: {
      questions: [
        { id: 1, question: 'A car travels 120 m in 8 seconds. Its average speed is:', options: ['960 m/s', '15 m/s', '128 m/s', '0.067 m/s'], correct_answer: 1 },
        { id: 2, question: 'On a distance-time graph, the gradient represents:', options: ['Acceleration', 'Force', 'Speed', 'Displacement'], correct_answer: 2 },
        { id: 3, question: 'A ball starts from rest (u=0) and reaches 20 m/s in 4 s. Its acceleration is:', options: ['80 m/s²', '5 m/s²', '0.2 m/s²', '16 m/s²'], correct_answer: 1 },
        { id: 4, question: 'Which quantity is a VECTOR?', options: ['Speed', 'Mass', 'Distance', 'Velocity'], correct_answer: 3 },
        { id: 5, question: 'Terminal velocity is reached when:', options: ['Gravity becomes zero', 'Air resistance equals weight', 'Acceleration equals velocity', 'The object stops completely'], correct_answer: 1 },
      ],
    },
  },

  {
    id: 13,
    title: 'Pressure & Moments',
    description: 'Study pressure in solids, liquids and gases, understand moments and the principle of moments for turning forces.',
    level: 2,
    xp_reward: 60,
    content: {
      text: `Pressure & Moments (පීඩනය සහ බිම්)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PRESSURE (පීඩනය)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Pressure = Force ÷ Area     P = F/A
  Unit: Pascal (Pa) or N/m²   (1 Pa = 1 N/m²)

Key Ideas:
  • Same force, smaller area → GREATER pressure
  • Same force, larger area  → SMALLER pressure

Real-Life Examples:
  • Knife blade: thin edge = high pressure → cuts easily
  • Snowshoes: large area = low pressure → don't sink in snow
  • Drawing pins: sharp point = high pressure to penetrate board
  • Tractor tyres: wide = spread load, low pressure on soft soil

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PRESSURE IN LIQUIDS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  P = hρg
  h = depth (m) | ρ = density (kg/m³) | g = 10 N/kg

Properties:
  • Pressure increases with depth
  • Pressure acts in ALL directions at any point
  • Same pressure at same depth regardless of tank shape
  • Liquids transmit pressure → hydraulic systems

Hydraulic Systems (Pascals Principle):
  • Pressure in = Pressure out
  • F₁/A₁ = F₂/A₂
  • Small force on small piston → large force on large piston
  • Used in: car brakes, hydraulic jacks, dentist chairs

Atmospheric Pressure:
  • ~101,000 Pa = 101 kPa at sea level
  • Decreases with altitude (less air above you)
  • Measured with a barometer

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MOMENTS (turning forces) — බිම්
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Moment = Force × Perpendicular Distance from Pivot
  M = F × d     Unit: Newton-metre (Nm)

Principle of Moments (Balance):
  "For equilibrium, total clockwise moments = total anticlockwise moments"
  F₁ × d₁ = F₂ × d₂

Examples:
  • A 10 N force at 0.3 m from pivot → Moment = 3 Nm
  • See-saw, spanner, crowbar, wheelbarrow, door handle

Centre of Gravity:
  • Point where all the weight appears to act
  • Low centre of gravity → more stable (racing cars, wide bases)
  • High centre of gravity → topples easily (double-decker buses)

Stability:
  Stable    → CG is low, base is wide (pyramid, traffic cone)
  Unstable  → CG is high, base is narrow (tall vase, top-heavy lorry)`,
    },
    quiz: {
      questions: [
        { id: 1, question: 'A force of 60 N acts on an area of 0.02 m². The pressure is:', options: ['1.2 Pa', '3000 Pa', '120 Pa', '0.0003 Pa'], correct_answer: 1 },
        { id: 2, question: 'Pressure in a liquid increases when:', options: ['The surface area increases', 'The depth increases', 'Temperature decreases', 'Volume decreases'], correct_answer: 1 },
        { id: 3, question: 'A 20 N force acts 0.5 m from a pivot. The moment is:', options: ['40 Nm', '10 Nm', '25 Nm', '0.025 Nm'], correct_answer: 1 },
        { id: 4, question: 'Hydraulic systems work because liquids:', options: ['Are compressible', 'Transmit pressure equally in all directions', 'Flow uphill', 'Expand when heated'], correct_answer: 1 },
        { id: 5, question: 'Which object is MOST stable?', options: ['A tall vase with a narrow base', 'A cone sitting on its base', 'A pencil balanced on its tip', 'A ball on top of a hill'], correct_answer: 1 },
      ],
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // THEORY LESSONS — UNIT 3: ENERGY
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 14,
    title: 'Heat & Temperature',
    description: 'Distinguish between heat and temperature, understand specific heat capacity, latent heat, and how heat transfers through materials.',
    level: 3,
    xp_reward: 60,
    content: {
      text: `Heat & Temperature (තාපය සහ උෂ්ණත්වය)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HEAT vs TEMPERATURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Temperature (T):
  • Measure of the average kinetic energy of particles
  • Unit: Celsius (°C) or Kelvin (K)
  • K = °C + 273   |   0 K = absolute zero (−273°C)
  • Measured with a thermometer

Heat (Q):
  • Total thermal energy transferred from hot to cold
  • Unit: Joule (J)
  • Always flows from HIGH temperature → LOW temperature

Key Difference:
  A cup of boiling water (100°C) and a swimming pool (25°C)
  → The pool has FAR more thermal energy (more mass × lower T)
  → The cup has higher temperature but less total heat energy

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SPECIFIC HEAT CAPACITY (c)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Q = mcΔT
  Q = heat energy (J) | m = mass (kg) | c = SHC (J/kg°C) | ΔT = temp change

  • c is different for each material
  • Water: c = 4200 J/kg°C (very high — good for heating systems)
  • Copper: c = 385 J/kg°C | Aluminium: c = 900 J/kg°C

Example: Heat 2 kg of water from 20°C to 80°C
  Q = 2 × 4200 × 60 = 504,000 J = 504 kJ

Why water is used in car radiators and hot water bottles:
  → High SHC means it stores/releases lots of heat per kg

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LATENT HEAT (ගුප්ත තාපය)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Q = mL
  L = specific latent heat (J/kg)

• Heat absorbed/released during a change of state
• Temperature does NOT change during melting or boiling
  → Energy is used to break/form bonds between particles

  Latent heat of fusion (melting): water = 334,000 J/kg
  Latent heat of vaporisation (boiling): water = 2,260,000 J/kg

Heating Curve for Water:
  Ice (−10°C) → [melting plateau at 0°C] → Water → [boiling plateau at 100°C] → Steam

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HEAT TRANSFER (methods recap)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Conduction (සන්නයනය):
  • Through solids | particles vibrate and pass energy along
  • Metals are best conductors (free electrons help)
  • Non-metals and gases are insulators

Convection (ශෝෂ-ප්‍රවාහය):
  • Through fluids (liquids & gases)
  • Hot fluid expands, becomes less dense → rises
  • Cool fluid sinks → convection current forms
  • Sea breezes, central heating, weather systems

Radiation (විකිරණය):
  • Infrared electromagnetic waves
  • Needs NO medium (works in vacuum)
  • Black, dull surfaces: best emitters AND absorbers
  • White, shiny surfaces: best reflectors (poor absorbers)
  • Uses: solar panels, thermal cameras, greenhouse warming

Sri Lanka Connection 🇱🇰:
  • Clay pots keep water cool via evaporation (latent heat)
  • White-painted buildings reflect heat (radiation)
  • Convection drives Sri Lanka's monsoon winds`,
    },
    quiz: {
      questions: [
        { id: 1, question: 'How much heat is needed to raise 3 kg of water by 20°C? (c = 4200 J/kg°C)', options: ['84 J', '252,000 J', '25,200 J', '1,260 J'], correct_answer: 1 },
        { id: 2, question: 'During boiling, the temperature of water:', options: ['Increases steadily', 'Decreases', 'Stays constant', 'Jumps suddenly'], correct_answer: 2 },
        { id: 3, question: 'Which surface is the best emitter of infrared radiation?', options: ['White and shiny', 'Black and dull', 'Silver and smooth', 'Transparent'], correct_answer: 1 },
        { id: 4, question: 'Convection currents are caused by:', options: ['Electrons moving', 'Changes in fluid density due to temperature', 'Electromagnetic waves', 'Vibrating particles in solids'], correct_answer: 1 },
        { id: 5, question: 'A material with a HIGH specific heat capacity:', options: ['Heats up very quickly', 'Stores a lot of energy per kg for a small temperature rise', 'Is always a metal', 'Cannot cool down'], correct_answer: 1 },
      ],
    },
  },

  {
    id: 15,
    title: 'Work, Power & Machines',
    description: 'Calculate work done and power, understand efficiency, and explore simple machines like levers and pulleys.',
    level: 3,
    xp_reward: 60,
    content: {
      text: `Work, Power & Machines (කෘත්‍යය, ශක්තිය සහ යන්ත්‍ර)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WORK DONE (W)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  W = F × d      (Force × distance moved in direction of force)
  Unit: Joule (J) = Newton-metre (Nm)

• Work is done only when a force causes MOVEMENT
• Carrying a heavy box horizontally at constant speed → no work done against gravity
  (force is upward, movement is horizontal — perpendicular → no work)
• Lifting a box → work IS done (force and movement are both upward)

Example: Push 50 N over 3 m → W = 50 × 3 = 150 J

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
POWER (P)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  P = W ÷ t      (Work done ÷ time)    Unit: Watt (W)
  P = F × v      (Force × velocity)

  1 kW = 1000 W | 1 MW = 1,000,000 W

Example: Lift 200 N by 3 m in 6 s
  W = 200 × 3 = 600 J
  P = 600 ÷ 6 = 100 W

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EFFICIENCY (කාර්යක්ෂමතාව)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Efficiency (%) = (Useful energy output ÷ Total energy input) × 100

  • No machine is 100% efficient (friction always wastes some energy as heat)
  • Efficiency can also use power: (Useful power out ÷ Total power in) × 100

Example: Input = 500 J, Useful output = 350 J
  Efficiency = (350 ÷ 500) × 100 = 70%

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SIMPLE MACHINES (සරල යන්ත්‍ර)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Mechanical Advantage (MA):
  MA = Load ÷ Effort
  • MA > 1 means the machine multiplies force (effort < load)

Levers (Class 1, 2, 3):
  Class 1: pivot between effort and load (see-saw, crowbar)
  Class 2: load between pivot and effort (wheelbarrow, nutcracker)
  Class 3: effort between pivot and load (tweezers, fishing rod)

Pulleys:
  • Single fixed pulley: changes direction only (MA = 1)
  • Block and tackle: multiple pulleys → MA increases
  • MA = number of ropes supporting the load

Inclined Plane (ramp):
  • Spreading force over longer distance → reduced effort
  • MA = length of slope ÷ height

Gear Systems:
  Driver gear (small) → Driven gear (large) → speed decreases, force increases
  Driver gear (large) → Driven gear (small) → speed increases, force decreases
  Gear ratio = teeth on driven ÷ teeth on driver`,
    },
    quiz: {
      questions: [
        { id: 1, question: 'A force of 40 N moves an object 5 m. Work done is:', options: ['8 J', '200 J', '45 J', '0.125 J'], correct_answer: 1 },
        { id: 2, question: 'Power is measured in:', options: ['Joules', 'Newtons', 'Watts', 'Pascal'], correct_answer: 2 },
        { id: 3, question: 'A machine has input 400 J and useful output 280 J. Its efficiency is:', options: ['120%', '70%', '30%', '143%'], correct_answer: 1 },
        { id: 4, question: 'Which class of lever has the pivot between the effort and load?', options: ['Class 1', 'Class 2', 'Class 3', 'Class 4'], correct_answer: 0 },
        { id: 5, question: 'A block and tackle with 4 ropes supporting the load has a mechanical advantage of:', options: ['1', '2', '4', '8'], correct_answer: 2 },
      ],
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // THEORY LESSONS — UNIT 4: LIVING WORLD
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 16,
    title: 'Human Body Systems',
    description: 'Study the digestive, circulatory and respiratory systems, their organs, functions and how they work together to keep us alive.',
    level: 4,
    xp_reward: 70,
    content: {
      text: `Human Body Systems (මිනිස් සිරුරේ පද්ධති)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DIGESTIVE SYSTEM (ජීර්ණ පද්ධතිය)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Path of food:
  Mouth → Oesophagus → Stomach → Small intestine → Large intestine → Rectum → Anus

Key Organs & Functions:
  Mouth          → Teeth break food (mechanical); amylase digests starch (chemical)
  Stomach        → Protease enzymes + HCl acid; kills bacteria; churns food → chyme
  Small intestine→ Main site of digestion & ABSORPTION; villi increase surface area
  Large intestine→ Absorbs water; forms solid faeces
  Liver          → Produces bile (emulsifies fats); detoxifies blood; stores glycogen
  Pancreas       → Releases amylase, protease, lipase into small intestine

Enzymes & their substrates:
  Amylase   → Starch → Glucose (mouth & small intestine)
  Protease  → Protein → Amino acids (stomach & small intestine)
  Lipase    → Lipids (fats) → Fatty acids + glycerol (small intestine)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CIRCULATORY SYSTEM (රුධිර සංසරණ පද්ධතිය)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Double circulation (ද්විත්ව රුධිර සංසරණය):
  1. Pulmonary: Heart → Lungs → Heart  (oxygenation)
  2. Systemic:  Heart → Body → Heart   (delivery)

The Heart:
  • 4 chambers: Right Atrium, Right Ventricle, Left Atrium, Left Ventricle
  • Right side carries deoxygenated blood TO the lungs
  • Left side carries oxygenated blood TO the body
  • Valves prevent backflow (bicuspid, tricuspid, aortic, pulmonary)

Blood Vessels:
  Arteries  → carry blood AWAY from heart | thick muscular walls | high pressure
  Veins     → carry blood TO heart | thin walls, valves | low pressure
  Capillaries → tiny vessels | single cell wall | site of exchange with tissues

Blood Components:
  Red blood cells    → carry O₂ via haemoglobin (no nucleus)
  White blood cells  → fight infection (phagocytes, lymphocytes)
  Platelets          → clotting
  Plasma             → liquid; transports glucose, CO₂, hormones, urea

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RESPIRATORY SYSTEM (ශ්වසන පද්ධතිය)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Path of air:
  Nose/Mouth → Trachea → Bronchi → Bronchioles → Alveoli

Alveoli (gas exchange surface):
  • Millions of tiny air sacs → huge surface area
  • Moist, thin walls (one cell thick) → easy diffusion
  • Rich blood supply → steep concentration gradient
  • O₂ diffuses IN; CO₂ diffuses OUT

Breathing mechanism:
  Inhale: diaphragm contracts (flattens) + intercostal muscles contract → rib cage rises
          → thorax volume increases → pressure drops → air rushes in
  Exhale: diaphragm relaxes → rib cage falls → pressure rises → air pushed out

Composition of inhaled vs exhaled air:
  O₂:   inhaled 21% → exhaled 16%
  CO₂:  inhaled 0.04% → exhaled 4%
  N₂:   unchanged ~79%`,
    },
    quiz: {
      questions: [
        { id: 1, question: 'Where is the main site of nutrient absorption in the digestive system?', options: ['Stomach', 'Large intestine', 'Small intestine', 'Liver'], correct_answer: 2 },
        { id: 2, question: 'Which enzyme digests starch?', options: ['Protease', 'Lipase', 'Amylase', 'Pepsin'], correct_answer: 2 },
        { id: 3, question: 'The left ventricle of the heart pumps blood to:', options: ['The lungs', 'The right atrium', 'The whole body', 'The liver only'], correct_answer: 2 },
        { id: 4, question: 'Which blood vessels carry blood AWAY from the heart?', options: ['Veins', 'Capillaries', 'Arteries', 'Venules'], correct_answer: 2 },
        { id: 5, question: 'Gas exchange in the lungs occurs at the:', options: ['Trachea', 'Bronchi', 'Bronchioles', 'Alveoli'], correct_answer: 3 },
      ],
    },
  },

  {
    id: 17,
    title: 'Genetics & Heredity',
    description: 'Understand DNA, genes, chromosomes, inheritance patterns, dominant and recessive alleles, and simple genetic crosses.',
    level: 4,
    xp_reward: 65,
    content: {
      text: `Genetics & Heredity (ජාන විද්‍යාව සහ උරුමය)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
KEY TERMS (ප්‍රධාන පද)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DNA         → molecule that carries genetic information; made of nucleotides
Gene        → section of DNA that codes for a protein (trait)
Chromosome  → coiled strand of DNA; humans have 46 (23 pairs)
Allele      → different version of the same gene (e.g., B or b for eye colour)

Dominant (D) → always expressed when present (capital letter)
Recessive (r) → only expressed when two copies are present (lowercase)

Genotype    → actual alleles present (e.g., Bb)
Phenotype   → visible/physical characteristic (e.g., brown eyes)

Homozygous  → both alleles the same (BB or bb) = "pure breeding"
Heterozygous→ different alleles (Bb) = "hybrid"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MONOHYBRID CROSS (Punnett Square)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Example: Tall (T) is dominant over short (t)
Parents: Tt × Tt

       T        t
T |   TT   |   Tt   |
t |   Tt   |   tt   |

Results:
  TT = tall (homozygous dominant)  — 25%
  Tt = tall (heterozygous)         — 50%
  tt = short (homozygous recessive)— 25%

Genotype ratio:   1 TT : 2 Tt : 1 tt
Phenotype ratio:  3 tall : 1 short

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SEX DETERMINATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Females → XX chromosomes
  Males   → XY chromosomes
  Father determines the sex of the child (50% XX, 50% XY)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MUTATIONS (විකෘති)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Permanent change in DNA sequence
• Can be spontaneous OR caused by mutagens
  Mutagens: UV radiation, X-rays, certain chemicals, cigarette smoke
• Most mutations are harmful; some are neutral; rarely beneficial

Sickle Cell Anaemia:
  • Single gene mutation (recessive)
  • Red blood cells become sickle-shaped → block vessels
  • Carrier (Ss): some protection against malaria → survives in malaria regions

Down Syndrome:
  • Extra copy of chromosome 21 (trisomy 21)
  • Not inherited — caused by non-disjunction during meiosis

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EVOLUTION & NATURAL SELECTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Darwin's Theory:
  1. Variation exists in a population (due to mutations & reproduction)
  2. More offspring are produced than can survive
  3. Those with better adaptations survive & reproduce (survival of the fittest)
  4. Useful traits are passed to next generation → population changes over time`,
    },
    quiz: {
      questions: [
        { id: 1, question: 'An organism with genotype Bb is:', options: ['Homozygous dominant', 'Homozygous recessive', 'Heterozygous', 'A mutation'], correct_answer: 2 },
        { id: 2, question: 'In a cross Tt × Tt, the ratio of tall to short offspring is:', options: ['1:1', '3:1', '1:3', '2:1'], correct_answer: 1 },
        { id: 3, question: 'How many chromosomes do human body cells normally contain?', options: ['23', '46', '48', '92'], correct_answer: 1 },
        { id: 4, question: 'Which sex chromosomes does a human male have?', options: ['XX', 'XY', 'YY', 'XXY'], correct_answer: 1 },
        { id: 5, question: 'Sickle cell anaemia is caused by:', options: ['A virus', 'A single gene mutation', 'An extra chromosome', 'Radiation damage'], correct_answer: 1 },
      ],
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // THEORY LESSONS — UNIT 5: WAVES & ELECTRICITY
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 18,
    title: 'Magnetism & Electromagnetism',
    description: 'Explore permanent magnets, magnetic fields, electromagnetism, motors and generators — the science behind all electric devices.',
    level: 5,
    xp_reward: 70,
    content: {
      text: `Magnetism & Electromagnetism (චුම්භකත්වය සහ විද්‍යුත්-චුම්භකත්වය)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PERMANENT MAGNETS (ස්ථිර චුම්භක)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Magnetic materials: iron, nickel, cobalt, steel
• Poles: North (N) and South (S)
• Like poles REPEL | Unlike poles ATTRACT
• Cannot isolate a single pole — cutting a magnet gives two smaller magnets

Magnetic Field:
  • Region where a magnetic force is experienced
  • Field lines go from North to South outside the magnet
  • Closer field lines = stronger field
  • Earth has a magnetic field (geographic North ≈ magnetic South pole)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ELECTROMAGNETISM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Magnetic Effect of Current:
  • A current-carrying wire creates a magnetic field around it
  • Right-hand thumb rule: thumb → current direction; fingers curl → field direction

Solenoid (coil of wire):
  • Acts like a bar magnet when current flows
  • More turns, more current → stronger field
  • Iron core inside → much stronger (electromagnet)

Uses of Electromagnets:
  • Electric bells, relays, circuit breakers
  • Magnetic locks, scrap metal cranes, MRI scanners
  • Advantages over permanent magnets: can be switched ON/OFF, strength adjustable

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FORCE ON A CURRENT-CARRYING CONDUCTOR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  • A current in a magnetic field experiences a FORCE (motor effect)
  • F = BIl   (B = field strength T, I = current A, l = length m)
  • Fleming's Left-Hand Rule:
      First finger → Field (N→S)
      Second finger→ Current direction
      Thumb        → Motion (Force) direction

Electric Motor (DC):
  • Current in coil + magnetic field → force → coil rotates
  • Split-ring commutator reverses current every half turn → continuous rotation
  • Used in: fans, pumps, drills, electric vehicles

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ELECTROMAGNETIC INDUCTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  • Moving a conductor in a magnetic field (or changing field near conductor)
    → induces an EMF (voltage) → drives a current
  • Faraday's Law: EMF ∝ rate of change of magnetic flux

Ways to increase induced EMF:
  • Move magnet faster
  • Use a stronger magnet
  • More turns on the coil
  • Use an iron core

AC Generator (Alternator):
  • Rotating coil in a magnetic field → alternating EMF
  • Slip rings maintain continuous connection
  • Used in power stations

Transformer:
  • Steps voltage UP or DOWN using electromagnetic induction
  • Vs/Vp = Ns/Np
  • Step-up: more turns on secondary → higher voltage (for transmission)
  • Step-down: fewer turns on secondary → lower voltage (for homes)
  • Power in ≈ Power out (if 100% efficient): VpIp = VsIs`,
    },
    quiz: {
      questions: [
        { id: 1, question: 'What happens when two North poles of magnets are brought together?', options: ['They attract', 'They repel', 'They become neutral', 'Nothing happens'], correct_answer: 1 },
        { id: 2, question: 'An electromagnet can be made stronger by:', options: ['Using a copper core', 'Decreasing the current', 'Adding more turns to the coil', 'Using a smaller battery'], correct_answer: 2 },
        { id: 3, question: "Fleming's Left-Hand Rule is used to find the direction of:", options: ['Induced EMF', 'Magnetic field around a wire', 'Force on a current in a magnetic field', 'Current in a generator'], correct_answer: 2 },
        { id: 4, question: 'A transformer has 200 turns on the primary and 1000 on the secondary. If input is 50 V, output is:', options: ['10 V', '250 V', '50 V', '500 V'], correct_answer: 1 },
        { id: 5, question: 'Which device converts mechanical energy into electrical energy?', options: ['Electric motor', 'Transformer', 'Generator', 'Electromagnet'], correct_answer: 2 },
      ],
    },
  },

  {
    id: 19,
    title: 'Nuclear Physics & Radioactivity',
    description: 'Understand radioactive decay, types of radiation, half-life, nuclear fission and fusion, and real-world applications of nuclear science.',
    level: 5,
    xp_reward: 75,
    content: {
      text: `Nuclear Physics & Radioactivity (න්‍යෂ්ටික භෞතික විද්‍යාව)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RADIOACTIVE DECAY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Unstable nuclei decay spontaneously, emitting radiation
• Cannot be controlled by temperature, pressure or chemical reactions
• Random process — cannot predict when a single nucleus will decay

Types of Radiation:
                Alpha (α)       Beta (β)        Gamma (γ)
Symbol          ₂⁴He            ₋₁⁰e            γ (photon)
Nature          Particle        Particle        EM Wave
Charge          +2              −1              0
Mass            Heavy           Very light      0
Penetration     Low (paper)     Medium (3mm Al) High (cm of lead/m of concrete)
Ionisation      HIGH            Medium          LOW
Speed           Slow            ~0.9c           c (speed of light)

Alpha decay: nucleus loses 2 protons + 2 neutrons → atomic number −2, mass number −4
Beta decay:  neutron → proton + electron (β⁻); atomic number +1, mass number unchanged
Gamma:       no change in atomic/mass number; just energy released

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HALF-LIFE (අර්ධ-ජීවිත කාලය)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Time taken for HALF the radioactive nuclei to decay
• Each half-life → activity halves

Example: Initial count = 800, half-life = 2 days
  After 2 days:  400 counts
  After 4 days:  200 counts
  After 6 days:  100 counts
  After 8 days:   50 counts

N = N₀ × (½)^n     (n = number of half-lives elapsed)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
USES OF RADIOACTIVITY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Medical:
  • Gamma rays → sterilise medical equipment
  • Technetium-99m → medical imaging (short half-life, gamma emitter)
  • Cobalt-60 → radiotherapy for cancer (kills tumour cells)
  • Iodine-131 → thyroid treatment

Industrial:
  • Alpha sources → smoke detectors (ionise air; smoke disrupts ion current)
  • Beta sources → control paper thickness in mills
  • Gamma sources → detect cracks in metal pipes (industrial radiography)

Dating:
  • Carbon-14 (half-life 5,730 years) → date organic materials (archaeology)
  • Uranium-238 (half-life 4.5 billion years) → date rocks and Earth's age

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NUCLEAR FISSION & FUSION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Nuclear Fission:
  • Large nucleus (e.g., U-235) splits into smaller nuclei + neutrons + ENERGY
  • Neutrons released trigger more fission → chain reaction
  • Controlled: nuclear power stations
  • Uncontrolled: atomic bomb
  • Waste is radioactive — major environmental concern

Nuclear Fusion:
  • Small nuclei (e.g., H isotopes) combine to form a larger nucleus + ENERGY
  • Powers the Sun and all stars
  • Releases FAR more energy than fission
  • Requires extremely high temperatures (>100 million °C)
  • Clean — no long-lived radioactive waste
  • Research ongoing (ITER project) — not yet commercially viable`,
    },
    quiz: {
      questions: [
        { id: 1, question: 'Which type of radiation has the highest ionising power?', options: ['Gamma', 'Beta', 'Alpha', 'X-rays'], correct_answer: 2 },
        { id: 2, question: 'A radioactive sample has a count of 640. After 3 half-lives, the count is:', options: ['320', '213', '80', '160'], correct_answer: 2 },
        { id: 3, question: 'Beta decay causes the atomic number to:', options: ['Decrease by 2', 'Increase by 1', 'Stay the same', 'Decrease by 1'], correct_answer: 1 },
        { id: 4, question: 'Smoke detectors use which type of radioactive source?', options: ['Gamma', 'Beta', 'Alpha', 'Neutron'], correct_answer: 2 },
        { id: 5, question: 'Nuclear fusion differs from fission in that fusion:', options: ['Splits large atoms', 'Produces more radioactive waste', 'Joins small nuclei together', 'Only happens in reactors'], correct_answer: 2 },
      ],
    },
  },

  // ===== UNIT 1 ADDITIONAL: MATTER & MATERIALS =====

  {
    id: 20,
    title: 'Solutions, Mixtures & Separation Methods',
    description: 'Learn about solutions, suspensions, colloids and how to separate mixtures using filtration, distillation, chromatography and more.',
    level: 1,
    order: 6,
    xp_reward: 55,
    subject: 'science',
    theory: {
      content: `## Solutions, Mixtures & Separation Methods

### Types of Mixtures

**Pure Substance** — only one type of particle (e.g. distilled water, gold).

**Mixture** — two or more substances mixed but not chemically combined. Can be separated by physical methods.

| Type | Description | Examples |
|------|-------------|---------|
| Solution | Solute dissolved in solvent — clear, homogeneous | Salt water, sugar in water |
| Suspension | Particles do NOT dissolve — cloudy, heterogeneous | Muddy water, chalk in water |
| Colloid | Particles are intermediate size — scatter light | Milk, fog, jelly |

### Key Terms
- **Solute** — substance that dissolves (e.g. salt)
- **Solvent** — substance that does the dissolving (e.g. water)
- **Solubility** — maximum mass of solute that dissolves in 100 g solvent at a given temperature
- **Saturated solution** — no more solute can dissolve at that temperature
- **Concentration** — amount of solute per unit volume of solution

### Separation Methods

**1. Filtration**
- Separates insoluble solid from liquid
- Uses filter paper and funnel
- Residue stays on filter; filtrate passes through
- Example: removing sand from salt water

**2. Evaporation**
- Separates dissolved solid from solvent
- Heat the solution until solvent evaporates
- Solid remains in evaporating basin
- Example: getting salt from salt water

**3. Crystallisation**
- Get pure crystals of solute
- Heat solution, then cool slowly
- Crystals form as solubility decreases
- Better than evaporation for heat-sensitive substances

**4. Distillation**
- Separates liquids with different boiling points OR solvent from solution
- Liquid boils → vapour → condenses back to liquid (distillate)
- Simple distillation: one liquid or solvent
- Fractional distillation: mixture of liquids (e.g. crude oil refining, spirits)

**5. Chromatography**
- Separates mixtures of dissolved substances (e.g. dyes, inks)
- Paper chromatography: spot on baseline → solvent travels up → components separate
- **Rf value** = distance moved by spot ÷ distance moved by solvent
- Used to identify food colourings, amino acids, drugs

**6. Magnetic Separation**
- Uses a magnet to separate magnetic materials from non-magnetic
- Example: iron filings from sand

### Water Purification
1. Sedimentation — heavy particles sink
2. Filtration — removes remaining particles
3. Chlorination — kills bacteria and pathogens
4. Fluoridation — added to strengthen teeth (in some countries)

**Distilled water** — purest form; used in labs and batteries.`,
    },
    quiz: {
      questions: [
        { id: 1, question: 'Which separation method is used to obtain pure crystals from a solution?', options: ['Filtration', 'Crystallisation', 'Chromatography', 'Magnetic separation'], correct_answer: 1 },
        { id: 2, question: 'In chromatography, the Rf value of a substance is:', options: ['Distance of solvent ÷ distance of spot', 'Distance of spot ÷ distance of solvent', 'Mass of spot ÷ mass of solvent', 'Speed of solvent ÷ speed of spot'], correct_answer: 1 },
        { id: 3, question: 'Fractional distillation is used to separate:', options: ['Insoluble solids', 'Liquids with different boiling points', 'Magnetic materials', 'Coloured dyes'], correct_answer: 1 },
        { id: 4, question: 'A saturated solution is one that:', options: ['Contains no solute', 'Can dissolve no more solute at that temperature', 'Has been heated strongly', 'Has been filtered'], correct_answer: 1 },
        { id: 5, question: 'Which method is most suitable for separating iron filings from sand?', options: ['Filtration', 'Distillation', 'Magnetic separation', 'Chromatography'], correct_answer: 2 },
      ],
    },
  },

  {
    id: 21,
    title: 'Metals, Non-Metals & Corrosion',
    description: 'Compare properties of metals and non-metals, explore the reactivity series, and understand rusting and how to prevent corrosion.',
    level: 1,
    order: 7,
    xp_reward: 55,
    subject: 'science',
    theory: {
      content: `## Metals, Non-Metals & Corrosion

### Properties of Metals vs Non-Metals

| Property | Metals | Non-Metals |
|----------|--------|-----------|
| Appearance | Shiny (lustrous) | Dull (except iodine, graphite) |
| State at room temp | Solid (except Hg) | Solid, liquid or gas |
| Melting point | Usually high | Usually low |
| Conductivity | Good (heat & electricity) | Poor (except graphite) |
| Malleability | Can be hammered flat | Brittle (if solid) |
| Ductility | Can be drawn into wire | Not ductile |
| Density | Usually high | Usually low |

### The Reactivity Series (most → least reactive)
**K, Na, Ca, Mg, Al, Zn, Fe, Pb, (H), Cu, Ag, Au**

*Potassium Never Can Make A Zebra Feel Particularly Cheerful And Generally*

- Metals above hydrogen react with dilute acids to produce H₂ gas
- More reactive metal displaces less reactive from solution (displacement reaction)

### Reactions of Metals
**With water:**
- K, Na, Ca react vigorously (K burns pink, Na burns yellow)
- Mg reacts with steam only
- Fe, Cu — do not react with cold/hot water

**With dilute acids:**
- Metal + acid → salt + hydrogen gas
- Example: Zn + H₂SO₄ → ZnSO₄ + H₂↑

**With oxygen:**
- Metal + oxygen → metal oxide
- Example: 4Fe + 3O₂ → 2Fe₂O₃ (rust)

### Corrosion & Rusting
**Rusting** — iron reacts with oxygen AND water to form hydrated iron(III) oxide (rust, Fe₂O₃·xH₂O)

Conditions needed for rusting:
1. Water (or water vapour)
2. Oxygen

**Prevention of Rusting:**
| Method | How it works |
|--------|-------------|
| Painting | Physical barrier |
| Oiling/Greasing | Physical barrier |
| Galvanising | Zinc coating — sacrificial protection |
| Electroplating | Coat with less reactive metal (e.g. tin, chromium) |
| Alloying | Stainless steel (iron + chromium + nickel) |
| Sacrificial protection | Attach more reactive metal (zinc blocks on ships) |

### Alloys
- **Alloy** = mixture of metals (or metal + non-metal)
- Made to improve properties
- Examples:
  - **Steel** = Fe + C (stronger than iron)
  - **Stainless steel** = Fe + Cr + Ni (corrosion resistant)
  - **Bronze** = Cu + Sn (harder than copper)
  - **Brass** = Cu + Zn (corrosion resistant, shiny)
  - **Duralumin** = Al + Cu + Mg (light, strong — aircraft)`,
    },
    quiz: {
      questions: [
        { id: 1, question: 'Which TWO conditions are needed for iron to rust?', options: ['Heat and light', 'Water and oxygen', 'Carbon dioxide and water', 'Acid and salt'], correct_answer: 1 },
        { id: 2, question: 'In the reactivity series, which metal is MOST reactive?', options: ['Gold', 'Copper', 'Potassium', 'Zinc'], correct_answer: 2 },
        { id: 3, question: 'Galvanising protects iron by coating it with:', options: ['Copper', 'Lead', 'Zinc', 'Tin'], correct_answer: 2 },
        { id: 4, question: 'When zinc reacts with dilute sulphuric acid, the products are:', options: ['Zinc oxide + water', 'Zinc sulphate + hydrogen', 'Zinc sulphide + water', 'Zinc sulphate + oxygen'], correct_answer: 1 },
        { id: 5, question: 'Stainless steel is an alloy of iron, chromium and:', options: ['Carbon', 'Copper', 'Nickel', 'Zinc'], correct_answer: 2 },
      ],
    },
  },

  {
    id: 22,
    title: 'Carbon & Its Compounds',
    description: 'Explore carbon allotropes, the carbon cycle, fossil fuels, hydrocarbons, and the importance of carbon in living and non-living systems.',
    level: 1,
    order: 8,
    xp_reward: 60,
    subject: 'science',
    theory: {
      content: `## Carbon & Its Compounds

### Allotropes of Carbon
An **allotrope** is a different physical form of the same element.

| Allotrope | Structure | Properties | Uses |
|-----------|-----------|-----------|------|
| Diamond | Each C bonded to 4 others (tetrahedral lattice) | Very hard, no electrical conductivity, transparent | Cutting tools, jewellery |
| Graphite | Layers of hexagonal rings, weak forces between layers | Soft (layers slide), conducts electricity | Pencils, lubricants, electrodes |
| Fullerene (C₆₀) | 60 C atoms in sphere | Strong, may conduct | Nanotechnology, medicine |

### Carbon Compounds — Hydrocarbons
Compounds containing **only Carbon and Hydrogen**.

**Alkanes** (saturated — only single bonds)
- Methane CH₄, Ethane C₂H₆, Propane C₃H₈, Butane C₄H₁₀
- General formula: CₙH₂ₙ₊₂
- Burn in oxygen → CO₂ + H₂O (complete combustion)

**Alkenes** (unsaturated — contain a C=C double bond)
- Ethene C₂H₄, Propene C₃H₆
- General formula: CₙH₂ₙ
- More reactive than alkanes
- **Bromine water test**: alkenes decolourise bromine water (turns colourless); alkanes do not

### Combustion of Carbon Compounds
**Complete combustion** (plenty of O₂):
→ CO₂ + H₂O + energy

**Incomplete combustion** (limited O₂):
→ CO (carbon monoxide — toxic!) + C (soot) + H₂O

### Fossil Fuels
Formed from remains of ancient organisms over millions of years.
- **Coal** — mainly carbon
- **Petroleum (crude oil)** — mixture of hydrocarbons
- **Natural gas** — mainly methane

**Fractional distillation of crude oil:**
| Fraction | Boiling range | Uses |
|----------|--------------|------|
| Refinery gas | < 25°C | Fuel (LPG) |
| Petrol (gasoline) | 25–60°C | Car fuel |
| Naphtha | 60–180°C | Plastics, chemicals |
| Kerosene | 150–250°C | Jet fuel |
| Diesel | 250–350°C | Lorries, buses |
| Fuel oil | 350–500°C | Ships, power stations |
| Bitumen | > 500°C | Roads, roofing |

### The Carbon Cycle
Carbon moves between atmosphere, organisms and Earth:
1. **Photosynthesis** — plants absorb CO₂ from air
2. **Respiration** — organisms release CO₂
3. **Combustion** — burning fuels releases CO₂
4. **Decomposition** — microbes break down dead matter → CO₂
5. **Carbon locked in fossil fuels** — released when burned

### Greenhouse Effect & Climate Change
- CO₂, methane, water vapour absorb infrared radiation from Earth's surface
- Keeps Earth warm (natural greenhouse effect is essential!)
- **Excess CO₂ from burning fossil fuels** → enhanced greenhouse effect → global warming
- Effects: rising sea levels, extreme weather, habitat loss`,
    },
    quiz: {
      questions: [
        { id: 1, question: 'Graphite conducts electricity because:', options: ['It has a simple molecular structure', 'Each carbon is bonded to 3 others, leaving free electrons between layers', 'It is very hard', 'It contains hydrogen atoms'], correct_answer: 1 },
        { id: 2, question: 'How can you test for an alkene gas?', options: ['Limewater turns milky', 'Damp litmus turns red', 'Bromine water is decolourised', 'It burns with a blue flame'], correct_answer: 2 },
        { id: 3, question: 'Incomplete combustion of a hydrocarbon produces:', options: ['Only CO₂ and water', 'Carbon monoxide and soot', 'Only hydrogen gas', 'Nitrogen oxides'], correct_answer: 1 },
        { id: 4, question: 'The general formula for alkanes is:', options: ['CₙH₂ₙ', 'CₙH₂ₙ₊₂', 'CₙH₂ₙ₋₂', 'CₙHₙ'], correct_answer: 1 },
        { id: 5, question: 'Which fraction from crude oil distillation is used as jet fuel?', options: ['Petrol', 'Bitumen', 'Kerosene', 'Diesel'], correct_answer: 2 },
      ],
    },
  },

  // ===== UNIT 2 ADDITIONAL: FORCES & MOTION =====

  {
    id: 23,
    title: 'Friction, Turning Effect & Simple Machines',
    description: 'Understand friction and its effects, calculate moments (turning effects), and explore levers, pulleys and other simple machines.',
    level: 2,
    order: 4,
    xp_reward: 55,
    subject: 'science',
    theory: {
      content: `## Friction, Turning Effect & Simple Machines

### Friction
**Friction** — a force that opposes relative motion between surfaces in contact.

**Types:**
- **Static friction** — prevents object from starting to move
- **Dynamic (kinetic) friction** — acts on moving object
- **Air resistance (drag)** — friction from air

**Factors affecting friction:**
- Nature of surfaces (rough vs smooth)
- Weight/normal force pressing surfaces together
- NOT dependent on area of contact (for dry surfaces)

**Useful friction:** walking, brakes, writing with pencil
**Harmful friction:** wear of machinery parts, energy waste as heat

**Reducing friction:** lubrication (oil, grease), ball bearings, smooth surfaces, streamlining

### Turning Effect (Moment)
**Moment** = Force × perpendicular distance from pivot
**Unit:** Newton-metre (N m)

**Principle of Moments** (Law of Levers):
For a body in equilibrium:
> Sum of clockwise moments = Sum of anticlockwise moments

**Example:**
A 600 N person sits 1.5 m from the pivot of a seesaw. What force must another person apply at 2 m from the pivot?
- Clockwise moment = 600 × 1.5 = 900 N m
- Anticlockwise: F × 2 = 900 → F = 450 N

### Simple Machines
A machine is a device that makes work easier by changing the size, direction or speed of a force.

**Mechanical Advantage (MA)** = Load ÷ Effort
**Velocity Ratio (VR)** = distance moved by effort ÷ distance moved by load
**Efficiency** = (MA ÷ VR) × 100%

**Types of Levers:**
| Class | Fulcrum position | Example |
|-------|-----------------|---------|
| 1st class | Between load and effort | Seesaw, scissors |
| 2nd class | Load between fulcrum and effort | Wheelbarrow, nutcracker |
| 3rd class | Effort between fulcrum and load | Tweezers, fishing rod |

**Pulleys:**
- Single fixed pulley — changes direction of force (MA = 1)
- Block and tackle — multiple pulleys increase MA
- MA = number of rope sections supporting the load

**Inclined Plane (Ramp):**
- MA = length of slope ÷ vertical height
- Longer ramp → less effort needed (but move further)

**Wheel and Axle:**
- Steering wheel, screwdriver
- MA = radius of wheel ÷ radius of axle

**Wedge:** — splitting (axe, knife) — converts forward motion to sideways force
**Screw:** — converts rotation to linear motion (bolts, jacks)

### Centre of Gravity
- The point through which the entire weight of a body appears to act
- Low centre of gravity → more stable
- Object topples if line of action of weight falls outside its base`,
    },
    quiz: {
      questions: [
        { id: 1, question: 'A force of 20 N is applied 0.5 m from a pivot. The moment is:', options: ['40 N m', '10 N m', '0.025 N m', '20 N m'], correct_answer: 0 },
        { id: 2, question: 'A wheelbarrow is a ______ class lever.', options: ['First', 'Second', 'Third', 'Fourth'], correct_answer: 1 },
        { id: 3, question: 'Which of these REDUCES friction?', options: ['Rough surfaces', 'Heavy load', 'Lubrication with oil', 'Increasing contact area'], correct_answer: 2 },
        { id: 4, question: 'The Principle of Moments states that for equilibrium:', options: ['All forces must be equal', 'Clockwise moments = Anticlockwise moments', 'The load must equal the effort', 'Friction must be zero'], correct_answer: 1 },
        { id: 5, question: 'A pulley system has 4 rope sections supporting the load. Its MA is:', options: ['1', '2', '4', '8'], correct_answer: 2 },
      ],
    },
  },

  // ===== UNIT 3 ADDITIONAL: ENERGY =====

  {
    id: 24,
    title: 'Light: Reflection, Refraction & Optical Instruments',
    description: 'Study the laws of reflection and refraction, total internal reflection, lenses, and how optical instruments like microscopes and telescopes work.',
    level: 3,
    order: 4,
    xp_reward: 65,
    subject: 'science',
    theory: {
      content: `## Light: Reflection, Refraction & Optical Instruments

### Properties of Light
- Light is a transverse electromagnetic wave
- Speed in vacuum: 3 × 10⁸ m/s
- Travels in straight lines (rectilinear propagation)
- Does not need a medium (travels through vacuum)

### Reflection
**Law of Reflection:**
> Angle of incidence = Angle of reflection (both measured from the normal)

**Types of reflection:**
- **Regular (specular)** — smooth surface, clear image (mirrors)
- **Diffuse** — rough surface, scattered light (walls, paper)

**Plane mirror images are:**
- Same size as object
- Same distance behind mirror as object is in front
- Laterally inverted (left-right reversed)
- Virtual (cannot be projected onto a screen)
- Upright

### Refraction
**Refraction** — bending of light as it crosses the boundary between two media of different optical densities.

**Snell's Law:**
> n₁ sin θ₁ = n₂ sin θ₂
> or: n = sin i / sin r (for air-to-medium)

**Refractive index (n)** — ratio of speed of light in vacuum to speed in medium
> n = c / v

Light bends **towards** the normal when entering a denser medium (e.g. air → glass).
Light bends **away** from normal when entering a less dense medium (e.g. glass → air).

### Total Internal Reflection (TIR)
Occurs when:
1. Light travels from denser to less dense medium
2. Angle of incidence > **critical angle**

**Critical angle (c):** sin c = 1/n

**Applications of TIR:**
- Optical fibres (endoscopes, internet cables)
- Diamonds (sparkle)
- Periscopes using prisms

### Lenses
**Convex (converging) lens:**
- Thicker at centre
- Converges parallel rays to focal point F
- Can form real, inverted images OR virtual, upright magnified images
- Used in: magnifying glass, camera, eye (cornea+lens), projector

**Concave (diverging) lens:**
- Thinner at centre
- Diverges rays — always forms virtual, upright, diminished images
- Used in: spectacles for short-sight

**Lens formula:** 1/f = 1/v - 1/u (real-is-positive convention)
**Magnification** = image height / object height = v / u

### The Eye
| Part | Function |
|------|----------|
| Cornea | Main refraction of light |
| Iris/Pupil | Controls amount of light entering |
| Lens | Fine focusing (accommodation) |
| Retina | Contains rods (dim light) and cones (colour) |
| Optic nerve | Carries impulses to brain |

**Short-sightedness (myopia):** image forms in front of retina → corrected by concave lens
**Long-sightedness (hyperopia):** image forms behind retina → corrected by convex lens

### Optical Instruments
- **Simple microscope** — magnifying glass (single convex lens)
- **Compound microscope** — objective lens + eyepiece lens (very high magnification)
- **Refracting telescope** — large objective lens + eyepiece (distant objects)
- **Periscope** — two plane mirrors or prisms at 45°`,
    },
    quiz: {
      questions: [
        { id: 1, question: 'Total internal reflection occurs when light travels from:', options: ['Less dense to more dense medium above critical angle', 'More dense to less dense medium above critical angle', 'Any medium at 90°', 'Denser medium at any angle'], correct_answer: 1 },
        { id: 2, question: 'A plane mirror produces an image that is:', options: ['Real and inverted', 'Virtual and laterally inverted', 'Real and magnified', 'Virtual and magnified'], correct_answer: 1 },
        { id: 3, question: 'Short-sightedness is corrected using a:', options: ['Convex lens', 'Plane mirror', 'Concave lens', 'Prism'], correct_answer: 2 },
        { id: 4, question: 'The refractive index of glass is 1.5. The speed of light in glass is:', options: ['3 × 10⁸ m/s', '4.5 × 10⁸ m/s', '2 × 10⁸ m/s', '1.5 × 10⁸ m/s'], correct_answer: 2 },
        { id: 5, question: 'Optical fibres work because of:', options: ['Diffuse reflection', 'Refraction', 'Total internal reflection', 'Dispersion'], correct_answer: 2 },
      ],
    },
  },

  {
    id: 25,
    title: 'Sound: Properties, Speed & Applications',
    description: 'Explore sound as a longitudinal wave, its properties, how it travels through different media, and applications like sonar and ultrasound.',
    level: 3,
    order: 5,
    xp_reward: 50,
    subject: 'science',
    theory: {
      content: `## Sound: Properties, Speed & Applications

### Nature of Sound
- Sound is a **longitudinal mechanical wave** (particles vibrate parallel to direction of travel)
- Requires a **medium** to travel — cannot travel through vacuum
- Produced by vibrating objects

**Compressions** — regions of high pressure (particles close together)
**Rarefactions** — regions of low pressure (particles spread out)

### Speed of Sound
| Medium | Speed (approx.) |
|--------|----------------|
| Air (20°C) | 340 m/s |
| Water | 1500 m/s |
| Steel | 5000 m/s |

Sound travels faster in solids > liquids > gases
(Particles are closer together in solids — energy transfers faster)

**Speed formula:** v = f × λ (same as all waves)
**Echo formula:** distance = speed × time / 2 (divide by 2 — sound travels there AND back)

### Properties of Sound Waves

**Amplitude** → determines **loudness**
- Large amplitude = loud sound
- Measured in decibels (dB)

**Frequency** → determines **pitch**
- High frequency = high pitch
- Humans hear: 20 Hz to 20,000 Hz

**Ultrasound** — frequencies above 20,000 Hz (beyond human hearing)
**Infrasound** — frequencies below 20 Hz

### Applications of Sound

**Echo:**
- Sound reflected off a surface
- **Reverberation** — many echoes overlapping in a room

**SONAR (Sound Navigation And Ranging):**
- Uses ultrasound pulses to find depth or locate objects underwater
- Ship sends pulse → reflects off seabed → returns to ship
- depth = (speed × time) / 2
- Used by submarines, fishing vessels, mapping ocean floor

**Ultrasound in Medicine:**
- Imaging foetus in womb (safe — no ionising radiation)
- Detecting tumours, kidney stones
- Breaking up kidney stones (lithotripsy)

**Hearing:**
- Sound → ear canal → eardrum vibrates → ossicles (hammer, anvil, stirrup) → cochlea → nerve impulses → brain
- Loud sounds (>85 dB) can cause permanent hearing damage

### Musical Instruments & Resonance
- **Resonance** — when an object vibrates at its natural frequency due to an external vibration
- String instruments — frequency depends on length, tension, and mass of string
- Wind instruments — vibrating column of air
- Shorter string / higher tension → higher frequency (higher pitch)`,
    },
    quiz: {
      questions: [
        { id: 1, question: 'Sound travels fastest in:', options: ['Air', 'Vacuum', 'Water', 'Steel'], correct_answer: 3 },
        { id: 2, question: 'A ship sends a sonar pulse and receives the echo after 0.4 s. If speed of sound in water is 1500 m/s, the depth is:', options: ['300 m', '600 m', '150 m', '1200 m'], correct_answer: 0 },
        { id: 3, question: 'The pitch of a sound is determined by its:', options: ['Amplitude', 'Speed', 'Frequency', 'Wavelength'], correct_answer: 2 },
        { id: 4, question: 'Ultrasound is used in medicine because:', options: ['It is louder than normal sound', 'It has no ionising radiation and is safe for imaging', 'It travels through vacuum', 'It is absorbed by all materials'], correct_answer: 1 },
        { id: 5, question: 'Sound is a longitudinal wave. This means particles vibrate:', options: ['At right angles to wave direction', 'Parallel to the direction of wave travel', 'In circles', 'Up and down only'], correct_answer: 1 },
      ],
    },
  },

  // ===== UNIT 4 ADDITIONAL: LIVING WORLD =====

  {
    id: 26,
    title: 'Nutrition, Digestion & Transport in Humans',
    description: 'Learn about food nutrients, the digestive system, how nutrients are absorbed and transported around the body through blood and the circulatory system.',
    level: 4,
    order: 5,
    xp_reward: 65,
    subject: 'science',
    theory: {
      content: `## Nutrition, Digestion & Transport in Humans

### Nutrients & Their Functions
| Nutrient | Function | Sources |
|----------|----------|---------|
| Carbohydrates | Energy (4 kcal/g) | Rice, bread, potatoes |
| Proteins | Growth & repair | Meat, fish, eggs, dhal |
| Fats/Lipids | Energy store, insulation | Butter, oil, nuts |
| Vitamins | Regulate body processes | Fruits, vegetables |
| Minerals | Bones, teeth, blood | Dairy, leafy greens |
| Water | Transport, temperature regulation | Water, all foods |
| Fibre (roughage) | Aids movement through gut | Vegetables, whole grains |

**Vitamin deficiencies (O/L important):**
- Vitamin A → night blindness
- Vitamin B₁ (thiamine) → beriberi
- Vitamin C → scurvy (bleeding gums)
- Vitamin D → rickets (weak bones)

### The Digestive System
**Mechanical digestion** — physical breakdown (chewing, churning)
**Chemical digestion** — enzymes break large molecules into small ones

| Organ | What happens |
|-------|-------------|
| Mouth | Chewing; salivary amylase breaks starch → maltose |
| Oesophagus | Peristalsis moves food to stomach |
| Stomach | HCl kills bacteria; pepsin breaks proteins → peptides |
| Small intestine | Bile (from liver) emulsifies fats; pancreatic enzymes; absorption of nutrients through villi |
| Large intestine | Water absorbed; faeces formed |
| Rectum/Anus | Faeces stored and eliminated |

**Villi** — finger-like projections in small intestine; increase surface area for absorption; contain blood capillaries and lacteals (for fat)

### Enzymes in Digestion
| Enzyme | Where made | Substrate → Product |
|--------|-----------|---------------------|
| Amylase | Salivary glands, pancreas | Starch → Maltose |
| Protease (pepsin, trypsin) | Stomach, pancreas | Proteins → Amino acids |
| Lipase | Pancreas | Fats → Fatty acids + glycerol |
| Maltase | Small intestine wall | Maltose → Glucose |

### Circulatory System
**Double circulation:**
1. **Pulmonary circulation** — heart → lungs → heart (deoxygenated blood gets oxygenated)
2. **Systemic circulation** — heart → body → heart (oxygenated blood delivers O₂ to cells)

**The Heart:**
- 4 chambers: right atrium, right ventricle, left atrium, left ventricle
- Left side: oxygenated blood (thicker wall — pumps to whole body)
- Right side: deoxygenated blood (pumps to lungs only)
- Valves prevent backflow

**Blood composition:**
| Component | Function |
|-----------|----------|
| Red blood cells (RBC) | Carry O₂ (haemoglobin) |
| White blood cells (WBC) | Fight infection (immune response) |
| Platelets | Blood clotting |
| Plasma | Carries nutrients, CO₂, hormones, waste |

**Blood vessels:**
- **Arteries** — carry blood AWAY from heart; thick elastic walls; high pressure
- **Veins** — carry blood TO heart; thinner walls; have valves; low pressure
- **Capillaries** — one cell thick; site of exchange between blood and cells`,
    },
    quiz: {
      questions: [
        { id: 1, question: 'Which enzyme in the mouth begins the digestion of starch?', options: ['Pepsin', 'Lipase', 'Amylase', 'Trypsin'], correct_answer: 2 },
        { id: 2, question: 'Villi in the small intestine serve to:', options: ['Produce digestive enzymes', 'Increase surface area for absorption', 'Store bile', 'Break down proteins mechanically'], correct_answer: 1 },
        { id: 3, question: 'Vitamin C deficiency causes:', options: ['Rickets', 'Night blindness', 'Beriberi', 'Scurvy'], correct_answer: 3 },
        { id: 4, question: 'The left ventricle of the heart has a thicker wall because it:', options: ['Receives blood from the lungs', 'Pumps blood to the lungs only', 'Pumps blood to the entire body at high pressure', 'Is larger than the right ventricle'], correct_answer: 2 },
        { id: 5, question: 'Which blood vessels have valves to prevent backflow?', options: ['Arteries', 'Capillaries', 'Veins', 'Aorta'], correct_answer: 2 },
      ],
    },
  },

  {
    id: 27,
    title: 'Reproduction in Plants & Animals',
    description: 'Understand sexual and asexual reproduction, pollination and fertilisation in plants, and the human reproductive system and foetal development.',
    level: 4,
    order: 6,
    xp_reward: 60,
    subject: 'science',
    theory: {
      content: `## Reproduction in Plants & Animals

### Types of Reproduction
**Asexual reproduction** — one parent, genetically identical offspring (clones)
- Examples: binary fission (bacteria), budding (yeast), runners (strawberry), tubers (potato), spores (ferns)
- Advantages: fast, no mate needed
- Disadvantages: no genetic variation

**Sexual reproduction** — two parents, genetic variation in offspring
- Involves fusion of male and female gametes (**fertilisation**)
- Produces genetically unique offspring

### Reproduction in Flowering Plants

**Parts of a flower:**
| Part | Function |
|------|----------|
| Stamen (anther + filament) | Produces pollen (male gametes) |
| Carpel (stigma + style + ovary) | Contains ovules (female gametes) |
| Petals | Attract pollinators |
| Sepals | Protect flower bud |
| Nectaries | Produce nectar to attract insects |

**Pollination** — transfer of pollen from anther to stigma

| Wind pollination | Insect pollination |
|-----------------|-------------------|
| Light, smooth pollen | Heavy, sticky pollen |
| No nectar/scent | Nectar, scent, bright petals |
| Large feathery stigma | Small sticky stigma |
| Small, dull flowers | Large, colourful flowers |

**Fertilisation in plants:**
1. Pollen lands on stigma → pollen tube grows down style to ovary
2. Male nucleus travels down tube → fuses with female nucleus in ovule
3. Fertilised ovule → **seed**; ovary wall → **fruit**

**Seed dispersal methods:** wind (maple, dandelion), animals (berries, hooks), water (coconut), explosive (peas)

**Germination conditions:** water, warmth, oxygen (not light)

### Human Reproduction

**Male reproductive system:**
- Testes — produce sperm and testosterone
- Sperm duct (vas deferens), urethra carry sperm out
- Seminal vesicles, prostate gland — produce seminal fluid

**Female reproductive system:**
- Ovaries — produce eggs (ova) and oestrogen/progesterone
- Fallopian tubes (oviducts) — carry egg to uterus; site of fertilisation
- Uterus — where foetus develops
- Cervix — lower part of uterus
- Vagina — birth canal

**Menstrual cycle (~28 days):**
- Day 1–5: Menstruation (uterus lining breaks down)
- Day 6–13: Uterus lining rebuilds (oestrogen)
- Day 14: Ovulation (egg released)
- Day 15–28: Progesterone maintains lining; if no fertilisation → cycle repeats

**Fertilisation to birth:**
1. Sperm fertilises egg in oviduct → **zygote**
2. Zygote divides → **embryo** → implants in uterus
3. Placenta forms — exchange of nutrients and O₂ between mother and foetus
4. After 9 months (gestation) → birth

**Functions of placenta:**
- Passes O₂, glucose, amino acids, vitamins to foetus
- Removes CO₂, urea from foetus
- Prevents most pathogens from reaching foetus
- Produces hormones to maintain pregnancy`,
    },
    quiz: {
      questions: [
        { id: 1, question: 'Pollination is the transfer of pollen from the anther to the:', options: ['Ovary', 'Stigma', 'Petal', 'Ovule'], correct_answer: 1 },
        { id: 2, question: 'Fertilisation in humans takes place in the:', options: ['Uterus', 'Ovary', 'Oviduct (Fallopian tube)', 'Vagina'], correct_answer: 2 },
        { id: 3, question: 'Which of these is a condition for seed germination?', options: ['Light', 'Warm temperature', 'Soil', 'Fertiliser'], correct_answer: 1 },
        { id: 4, question: 'The placenta allows:', options: ['The foetus to breathe air', 'Exchange of nutrients and waste between mother and foetus', 'Sperm to reach the egg', 'The embryo to move freely'], correct_answer: 1 },
        { id: 5, question: 'Asexual reproduction produces offspring that are:', options: ['Genetically unique', 'Genetically identical to the parent', 'Produced from two parents', 'Always larger than the parent'], correct_answer: 1 },
      ],
    },
  },

  {
    id: 28,
    title: 'Ecosystems, Food Chains & Environmental Science',
    description: 'Study ecosystems, food webs, nutrient cycles, human impact on the environment, and conservation strategies.',
    level: 4,
    order: 7,
    xp_reward: 60,
    subject: 'science',
    theory: {
      content: `## Ecosystems, Food Chains & Environmental Science

### Ecology Terms
- **Ecosystem** — all living organisms (biotic) and non-living factors (abiotic) in an area interacting together
- **Habitat** — place where an organism lives
- **Population** — all individuals of one species in an area
- **Community** — all populations of different species in an area
- **Biotic factors** — living: food, predators, competitors, disease
- **Abiotic factors** — non-living: temperature, light, water, soil pH, salinity

### Food Chains & Food Webs
**Food chain:** shows the flow of energy from one organism to another
> Grass → Grasshopper → Frog → Snake → Eagle

- **Producer** — makes its own food via photosynthesis (plants, algae)
- **Primary consumer** — eats producers (herbivore)
- **Secondary consumer** — eats primary consumers
- **Tertiary consumer** — top predator
- **Decomposers** — break down dead matter (bacteria, fungi) → return nutrients to soil

**Food web** — many interconnected food chains (more realistic)

### Energy Flow in Ecosystems
- Only ~10% of energy passes from one trophic level to the next
- Rest is lost as heat (respiration), undigested food, movement
- This is why food chains rarely have more than 4–5 levels
- **Pyramid of numbers/biomass** — shows number or mass at each level (usually narrows upward)

### Nutrient Cycles
**Carbon cycle:** (see Carbon lesson)
**Nitrogen cycle:**
1. Nitrogen in air (78%) → nitrogen-fixing bacteria in soil/root nodules of legumes → nitrates
2. Plants absorb nitrates → make proteins
3. Animals eat plants → proteins pass to animals
4. Dead organisms → decomposers → ammonium ions → nitrifying bacteria → nitrates (back to soil)
5. Denitrifying bacteria → N₂ back to atmosphere

### Human Impact on the Environment

**Deforestation:**
- Loss of habitat, biodiversity
- Increased CO₂ (less photosynthesis)
- Soil erosion, flooding

**Pollution:**
| Type | Cause | Effect |
|------|-------|--------|
| Air | Burning fossil fuels | Acid rain, smog, global warming |
| Water | Sewage, fertiliser runoff | Eutrophication, dead zones |
| Soil | Pesticides, waste | Kills organisms, enters food chain |
| Noise | Industry, traffic | Stress, hearing damage |

**Eutrophication:**
1. Fertilisers wash into water → excess nitrates/phosphates
2. Algae grow rapidly (algal bloom)
3. Algae die → decomposers use O₂ → water depleted of O₂
4. Fish and other aquatic life die

**Global warming:**
- Increased CO₂ → enhanced greenhouse effect → rising temperatures
- Effects: melting ice caps, rising sea levels, extreme weather, species extinction

### Conservation
- **Conservation** — protecting ecosystems and biodiversity
- Methods: national parks, wildlife reserves, seed banks, captive breeding, reducing pollution
- **Sustainable development** — meeting present needs without compromising future generations
- Reducing, Reusing, Recycling (3Rs)
- Sri Lanka: biodiversity hotspot — Sinharaja Forest, Horton Plains, coral reefs`,
    },
    quiz: {
      questions: [
        { id: 1, question: 'In a food chain, which organism is the producer?', options: ['Herbivore', 'Carnivore', 'Decomposer', 'Green plant'], correct_answer: 3 },
        { id: 2, question: 'Eutrophication in a lake is caused by:', options: ['Oil spills', 'Excess fertilisers causing algal blooms', 'Acid rain', 'Heavy metals in water'], correct_answer: 1 },
        { id: 3, question: 'Only about ____% of energy passes from one trophic level to the next:', options: ['50%', '25%', '10%', '1%'], correct_answer: 2 },
        { id: 4, question: 'Nitrogen-fixing bacteria convert:', options: ['Nitrates to nitrogen gas', 'Nitrogen gas to nitrates', 'Oxygen to carbon dioxide', 'Ammonia to proteins'], correct_answer: 1 },
        { id: 5, question: 'Deforestation increases atmospheric CO₂ because:', options: ['Trees release CO₂ when cut', 'Less photosynthesis occurs to absorb CO₂', 'It increases rainfall', 'Soil absorbs more oxygen'], correct_answer: 1 },
      ],
    },
  },

  {
    id: 29,
    title: 'Transport in Plants & Homeostasis',
    description: 'Understand how water and nutrients move through plants via xylem and phloem, and how the body maintains constant internal conditions (homeostasis).',
    level: 4,
    order: 8,
    xp_reward: 55,
    subject: 'science',
    theory: {
      content: `## Transport in Plants & Homeostasis

### Transport in Plants

**Two transport systems:**

| Tissue | What it transports | Direction | Contents |
|--------|-------------------|-----------|---------|
| Xylem | Water & mineral salts | Root → stem → leaves (upward) | Dead, hollow cells with lignin walls |
| Phloem | Sucrose & amino acids (food) | From leaves to rest of plant | Living cells with sieve plates |

**Transpiration** — loss of water vapour from leaves (mainly through stomata)
- Pulls water up through xylem (transpiration pull / cohesion-tension)
- Stomata open in light (photosynthesis needs CO₂) → water vapour escapes

**Factors affecting transpiration rate:**
- Temperature ↑ → transpiration ↑ (more evaporation)
- Light ↑ → stomata open more → transpiration ↑
- Wind → removes water vapour → transpiration ↑
- Humidity ↑ → transpiration ↓ (less diffusion gradient)

**Osmosis in plants:**
- Water enters root hair cells by osmosis (lower water potential in soil)
- Wilting — plant loses too much water; cells become flaccid
- Turgidity — cells full of water; plant stands upright

**Mineral uptake:**
- By active transport (against concentration gradient)
- Requires energy (ATP)
- E.g. nitrates for making proteins; magnesium for chlorophyll

### Homeostasis
**Homeostasis** — maintaining a stable internal environment despite external changes.

**What is regulated:**
- Body temperature (37°C)
- Blood glucose concentration
- Water content (osmoregulation)
- Blood pH

### Temperature Regulation (Thermoregulation)
**Too hot:**
- Sweat glands produce sweat (evaporation cools skin)
- Blood vessels near skin dilate (vasodilation) → more heat lost
- Less metabolic activity

**Too cold:**
- Shivering (muscles contract rapidly → heat generated)
- Blood vessels near skin constrict (vasoconstriction) → less heat lost
- Body hair stands up (goosebumps) — traps air layer (less effective in humans)

### Blood Glucose Regulation
Controlled by hormones from the **pancreas**:

| Hormone | Released when | Effect |
|---------|--------------|--------|
| Insulin | Blood glucose too HIGH | Liver converts glucose → glycogen (storage); cells absorb glucose |
| Glucagon | Blood glucose too LOW | Liver converts glycogen → glucose (released into blood) |

**Diabetes mellitus:**
- **Type 1** — pancreas produces no insulin; controlled by insulin injections
- **Type 2** — cells don't respond to insulin properly; controlled by diet, exercise, medication

### Excretion
- Removal of metabolic waste products from the body
- **Kidneys** — excrete urea (from protein breakdown), excess water and salts → urine
- **Lungs** — excrete CO₂ and water vapour
- **Liver** — converts ammonia → urea (deamination of amino acids)`,
    },
    quiz: {
      questions: [
        { id: 1, question: 'Water moves from the roots to the leaves in plants through:', options: ['Phloem', 'Xylem', 'Stomata', 'Root hairs'], correct_answer: 1 },
        { id: 2, question: 'On a hot day, the body cools itself by:', options: ['Shivering and vasoconstriction', 'Sweating and vasodilation', 'Reducing blood flow to muscles', 'Increasing metabolic rate'], correct_answer: 1 },
        { id: 3, question: 'Insulin is released by the pancreas when blood glucose is:', options: ['Too low', 'Normal', 'Too high', 'Zero'], correct_answer: 2 },
        { id: 4, question: 'Transpiration rate increases when:', options: ['Humidity is high', 'Temperature is low', 'Wind speed increases', 'Stomata are closed'], correct_answer: 2 },
        { id: 5, question: 'Urea is produced in the liver from:', options: ['Excess glucose', 'Excess amino acids (deamination)', 'Carbon dioxide and water', 'Glycogen'], correct_answer: 1 },
      ],
    },
  },

  // ===== UNIT 5 ADDITIONAL: WAVES & ELECTRICITY =====

  {
    id: 30,
    title: 'Electronics: Components & Logic Gates',
    description: 'Learn about basic electronic components — resistors, diodes, LEDs, transistors, capacitors — and how logic gates process digital signals.',
    level: 5,
    order: 5,
    xp_reward: 60,
    subject: 'science',
    theory: {
      content: `## Electronics: Components & Logic Gates

### Electronic vs Electrical
- **Electrical** — large currents, power devices (motors, heaters, lights)
- **Electronic** — tiny currents, processing information (computers, phones, sensors)

### Basic Electronic Components

**Resistor**
- Opposes current flow
- Fixed or variable (rheostat, thermistor, LDR)
- **Thermistor** — resistance decreases as temperature increases
- **LDR (Light Dependent Resistor)** — resistance decreases as light increases
- Used in sensor circuits (automatic street lights, fire alarms)

**Capacitor**
- Stores electrical charge
- Used to smooth DC supply, timing circuits
- C = Q / V (capacitance = charge / voltage, unit: Farad)

**Diode**
- Allows current in one direction only (forward bias)
- **LED (Light Emitting Diode)** — emits light when forward biased
- Uses: indicator lights, traffic lights, energy-saving bulbs
- **Rectification** — converting AC to DC using diodes

**Transistor**
- Acts as an electronic switch or amplifier
- Small base current controls large collector-emitter current
- Used in almost all electronic devices

### Potential Divider (Voltage Divider)
- Two resistors in series across a voltage supply
- Output voltage taken across one resistor:
  **V_out = V_in × R₂ / (R₁ + R₂)**
- Used with LDR/thermistor to create sensor circuits:
  - LDR + resistor → automatic light switch
  - Thermistor + resistor → temperature alarm

### Logic Gates (Digital Electronics)
Digital circuits use two states: **0 (LOW, 0V)** and **1 (HIGH, e.g. 5V)**

| Gate | Symbol | Output = 1 when... |
|------|--------|-------------------|
| NOT | Triangle + circle | Input is 0 |
| AND | Flat back | ALL inputs are 1 |
| OR | Curved back | AT LEAST ONE input is 1 |
| NAND | AND + circle | NOT (AND) — output 0 only when all inputs are 1 |
| NOR | OR + circle | NOT (OR) — output 1 only when all inputs are 0 |

**Truth table example — AND gate:**
| A | B | Output |
|---|---|--------|
| 0 | 0 | 0 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

**Truth table example — OR gate:**
| A | B | Output |
|---|---|--------|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 1 |

### Applications of Logic Gates
- **Burglar alarm:** AND gate — only triggers if both motion sensor AND door sensor activated
- **Safety system:** OR gate — triggers if ANY sensor detects a problem
- **NOT gate:** Automatic light — turns light ON when LDR says it's dark (input = 0)

### Analogue vs Digital Signals
- **Analogue** — continuous signal, infinite values (e.g. sound waves)
- **Digital** — only two values (0 or 1); less prone to noise/interference
- CDs, DVDs, computers use digital signals
- **ADC (Analogue to Digital Converter)** — converts analogue to digital for processing`,
    },
    quiz: {
      questions: [
        { id: 1, question: 'A thermistor has lower resistance when temperature is:', options: ['Low', 'High', 'The same as room temperature', 'Zero'], correct_answer: 1 },
        { id: 2, question: 'An AND gate outputs 1 only when:', options: ['At least one input is 1', 'Both inputs are 0', 'All inputs are 1', 'One input is 0'], correct_answer: 2 },
        { id: 3, question: 'A diode allows current to flow:', options: ['In both directions', 'In one direction only', 'Only when heated', 'Only when there is light'], correct_answer: 1 },
        { id: 4, question: 'In a potential divider, if R₁ = R₂ and V_in = 10V, then V_out across R₂ is:', options: ['10 V', '0 V', '5 V', '2.5 V'], correct_answer: 2 },
        { id: 5, question: 'Which logic gate gives an output of 1 when the input is 0?', options: ['AND', 'OR', 'NOT', 'NAND'], correct_answer: 2 },
      ],
    },
  },

  {
    id: 3031,
    title: 'Electromagnetic Spectrum & Communication',
    description: 'Explore the full electromagnetic spectrum, properties of each wave type, and how electromagnetic waves are used in communication technologies.',
    level: 5,
    order: 6,
    xp_reward: 55,
    subject: 'science',
    theory: {
      content: `## Electromagnetic Spectrum & Communication

### Properties of All Electromagnetic (EM) Waves
- Transverse waves (oscillation perpendicular to direction of travel)
- All travel at the **speed of light** in vacuum: c = 3 × 10⁸ m/s
- Transfer energy without a medium (can travel through vacuum)
- Obey: **v = f × λ** (speed = frequency × wavelength)
- Can be reflected, refracted, diffracted, absorbed

### The Electromagnetic Spectrum
Arranged from longest wavelength (lowest frequency) to shortest (highest frequency/energy):

| Type | Wavelength | Frequency | Uses | Dangers |
|------|-----------|-----------|------|---------|
| Radio waves | > 0.1 m | < 3×10⁹ Hz | Radio, TV, WiFi | None significant |
| Microwaves | 1mm–0.1m | 10⁹–10¹² Hz | Mobile phones, cooking, satellite TV | Internal heating of body tissue |
| Infrared (IR) | 700nm–1mm | 10¹²–10¹⁴ Hz | Remote controls, thermal imaging, toasters | Skin burns |
| Visible light | 400–700nm | ~10¹⁴ Hz | Sight, cameras, fibre optics | Eye damage (intense) |
| Ultraviolet (UV) | 10–400nm | 10¹⁵–10¹⁶ Hz | Sterilisation, detecting forgery, sun tanning | Skin cancer, eye damage |
| X-rays | 0.01–10nm | 10¹⁶–10¹⁹ Hz | Medical imaging, airport security | Cancer-causing (ionising) |
| Gamma rays | < 0.01nm | > 10¹⁹ Hz | Cancer treatment, sterilising medical equipment | Most dangerous — ionising radiation |

**Memory aid (low to high frequency):** 
**R**icky **M**artin **I**s **V**ery **U**nder**X**posed **G**enerally

### Communication Using EM Waves

**Radio waves:**
- Long wave (LW) — diffract around Earth's surface; worldwide reception
- Short wave (SW) — reflect off ionosphere; long distance
- FM radio, TV — line of sight; local transmission

**Microwaves:**
- Satellite communication — waves pass through atmosphere to satellites in orbit
- Mobile phone networks — tall masts, line of sight
- Cooking — water molecules in food absorb microwave energy → heat

**Infrared:**
- TV/device remote controls
- Optical fibre communication (short bursts of IR)
- Night vision cameras, thermal imaging

**Visible light:**
- Optical fibres (TIR) — carry data as pulses of light
- Photography

### Analogue vs Digital Transmission
- **Analogue** signals vary continuously — more affected by noise
- **Digital** (0s and 1s) can be regenerated exactly — clearer signal
- Digital transmission carries more information in same bandwidth

### The Doppler Effect
- When a source of waves moves relative to an observer, the observed frequency changes
- Moving **towards** observer → frequency appears **higher** (shorter wavelength)
- Moving **away** → frequency appears **lower** (longer wavelength)
- Applied to light: **redshift** — galaxies moving away → light shifted to longer wavelengths → evidence for expanding universe`,
    },
    quiz: {
      questions: [
        { id: 1, question: 'All electromagnetic waves in vacuum travel at:', options: ['340 m/s', '1500 m/s', '3 × 10⁸ m/s', '3 × 10⁶ m/s'], correct_answer: 2 },
        { id: 2, question: 'Which part of the EM spectrum is used in TV remote controls?', options: ['Microwaves', 'Ultraviolet', 'Infrared', 'Radio waves'], correct_answer: 2 },
        { id: 3, question: 'Gamma rays are most dangerous because they are:', options: ['Very slow', 'Ionising radiation with very high energy', 'Able to make food hot', 'Unable to pass through materials'], correct_answer: 1 },
        { id: 4, question: 'The Doppler effect for light means a galaxy moving away from us shows:', options: ['Blueshift', 'Redshift', 'No shift', 'UV shift'], correct_answer: 1 },
        { id: 5, question: 'Which EM waves are used to sterilise medical equipment?', options: ['Radio waves', 'Microwaves', 'Infrared', 'Gamma rays'], correct_answer: 3 },
      ],
    },
  },

];
