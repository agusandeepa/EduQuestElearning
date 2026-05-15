import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FlaskConical, Play, CheckCircle2, ChevronRight, Beaker, Zap, Leaf, Atom, Activity } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { VIRTUAL_LABS } from "../../services/science-lessons";
import type { VirtualLab as VirtualLabType } from "../../services/science-lessons";

interface VirtualLabProps {
  lessonId: number;
  onClose: () => void;
}

// ── Animated illustrations per lab type ──────────────────────────────────────

function TitrationViz({ step, triggered }: { step: number; triggered: boolean }) {
  // colour changes at step 4 (index 3 = NaOH last drop step)
  const flaskColour = triggered && step >= 4 ? "#c084fc" : "#e0f2fe";
  const buretteFill = Math.min(100, step * 20);

  return (
    <svg viewBox="0 0 200 220" className="w-full max-w-[220px] mx-auto">
      {/* Burette */}
      <rect x="88" y="10" width="24" height="90" rx="4" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
      <rect x="90" y="12" width="20" height={buretteFill * 0.85} rx="2" fill="#60a5fa" />
      <text x="100" y="8" textAnchor="middle" fontSize="10" fill="#1e40af">Burette</text>
      <rect x="96" y="98" width="8" height="14" rx="2" fill="#475569" />
      {/* Drop */}
      {step >= 2 && step < 5 && (
        <motion.ellipse cx="100" cy="125" rx="4" ry="6" fill="#60a5fa"
          animate={{ cy: [125, 148] }} transition={{ repeat: Infinity, duration: 1.2, ease: "easeIn" }} />
      )}
      {/* Flask */}
      <path d="M70 130 L60 200 Q100 215 140 200 L130 130 Z" fill={flaskColour} stroke="#0ea5e9" strokeWidth="2" />
      <rect x="85" y="112" width="30" height="20" rx="4" fill={flaskColour} stroke="#0ea5e9" strokeWidth="2" />
      <text x="100" y="210" textAnchor="middle" fontSize="10" fill="#0e7490">Flask</text>
      {/* White tile */}
      <rect x="55" y="205" width="90" height="10" rx="3" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1" />
    </svg>
  );
}

function DensityViz({ step }: { step: number }) {
  const waterLevel = step >= 1 ? 80 : 120;
  const showStone = step >= 2;
  const levelAfter = step >= 2 ? 60 : waterLevel;

  return (
    <svg viewBox="0 0 200 220" className="w-full max-w-[220px] mx-auto">
      {/* Cylinder */}
      <rect x="60" y="30" width="80" height="160" rx="6" fill="none" stroke="#64748b" strokeWidth="3" />
      {/* Water */}
      <rect x="63" y={levelAfter} width="74" height={190 - levelAfter} rx="4" fill="#bfdbfe" opacity="0.8" />
      {/* Measurements */}
      {[0, 25, 50, 75, 100].map((v, i) => (
        <g key={i}>
          <line x1="60" y1={180 - i * 32} x2="70" y2={180 - i * 32} stroke="#94a3b8" strokeWidth="1" />
          <text x="55" y={184 - i * 32} textAnchor="end" fontSize="9" fill="#64748b">{v}</text>
        </g>
      ))}
      {/* Stone */}
      {showStone && (
        <motion.ellipse cx="100" cy="165" rx="18" ry="14" fill="#78716c" stroke="#57534e" strokeWidth="2"
          initial={{ cy: 40 }} animate={{ cy: 165 }} transition={{ duration: 0.8, ease: "easeIn" }} />
      )}
      {/* Scale */}
      {step === 0 && (
        <g>
          <rect x="65" y="10" width="70" height="20" rx="4" fill="#f0fdf4" stroke="#22c55e" strokeWidth="2" />
          <text x="100" y="24" textAnchor="middle" fontSize="11" fill="#15803d" fontWeight="bold">48.6 g</text>
        </g>
      )}
    </svg>
  );
}

function MotionViz({ step }: { step: number }) {
  const trolleyX = step >= 1 ? 60 + step * 18 : 40;
  const massWeight = step === 2 ? "200 g" : step >= 1 ? "100 g" : "—";

  return (
    <svg viewBox="0 0 240 160" className="w-full max-w-[260px] mx-auto">
      {/* Runway */}
      <rect x="10" y="110" width="200" height="8" rx="3" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
      {/* Pulley */}
      <circle cx="215" cy="105" r="10" fill="#cbd5e1" stroke="#64748b" strokeWidth="2" />
      {/* String */}
      <line x1={trolleyX + 40} y1="105" x2="215" y2="105" stroke="#92400e" strokeWidth="2" />
      <line x1="215" y1="115" x2="215" y2="145" stroke="#92400e" strokeWidth="2" />
      {/* Hanging mass */}
      <rect x="203" y="145" width="24" height="20" rx="3" fill="#f59e0b" stroke="#d97706" strokeWidth="2" />
      <text x="215" y="158" textAnchor="middle" fontSize="9" fill="#78350f">{massWeight}</text>
      {/* Trolley */}
      <motion.g animate={{ x: step >= 1 ? step * 12 : 0 }} transition={{ duration: 0.5 }}>
        <rect x="30" y="90" width="60" height="20" rx="4" fill="#818cf8" stroke="#4f46e5" strokeWidth="2" />
        <circle cx="45" cy="113" r="6" fill="#c7d2fe" stroke="#4f46e5" strokeWidth="2" />
        <circle cx="75" cy="113" r="6" fill="#c7d2fe" stroke="#4f46e5" strokeWidth="2" />
        <text x="60" y="105" textAnchor="middle" fontSize="9" fill="white">Trolley</text>
      </motion.g>
      {/* Timer */}
      {step >= 1 && (
        <g>
          <rect x="10" y="10" width="100" height="30" rx="6" fill="#ecfdf5" stroke="#22c55e" strokeWidth="2" />
          <text x="60" y="30" textAnchor="middle" fontSize="11" fill="#15803d" fontWeight="bold">
            a = {step === 3 ? "0.49" : step === 2 ? "0.49" : "0.98"} m/s²
          </text>
        </g>
      )}
    </svg>
  );
}

function PhotosynthesisViz({ step }: { step: number }) {
  const distances = [10, 20, 40, 80];
  const bubbles = [38, 24, 12, 6];
  const dist = step >= 1 ? distances[Math.min(step - 1, 3)] : 5;
  const bpm = step >= 1 ? bubbles[Math.min(step - 1, 3)] : 0;
  const lampX = Math.min(60 + dist * 1.2, 190);

  return (
    <svg viewBox="0 0 240 180" className="w-full max-w-[260px] mx-auto">
      {/* Beaker */}
      <path d="M60 60 L45 160 Q100 175 155 160 L140 60 Z" fill="#d1fae5" stroke="#059669" strokeWidth="2" opacity="0.8" />
      <rect x="75" y="44" width="50" height="20" rx="4" fill="#d1fae5" stroke="#059669" strokeWidth="2" />
      {/* Pondweed */}
      <ellipse cx="100" cy="130" rx="22" ry="28" fill="#16a34a" opacity="0.9" />
      <line x1="100" y1="100" x2="100" y2="44" stroke="#15803d" strokeWidth="3" />
      {/* Bubbles */}
      {step >= 1 && Array.from({ length: Math.min(Math.ceil(bpm / 8), 5) }).map((_, i) => (
        <motion.circle key={i} cx={85 + i * 8} cy={100} r={3} fill="white" opacity={0.8}
          animate={{ cy: [100, 50], opacity: [0.8, 0] }}
          transition={{ repeat: Infinity, duration: 2, delay: i * 0.4 }} />
      ))}
      {/* Lamp */}
      <motion.g animate={{ x: lampX - 30 }}>
        <circle cx="30" cy="80" r="18" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" />
        <text x="30" y="85" textAnchor="middle" fontSize="10" fill="#713f12">💡</text>
      </motion.g>
      {/* BPM label */}
      {step >= 1 && (
        <g>
          <rect x="155" y="10" width="80" height="30" rx="6" fill="#ecfdf5" stroke="#22c55e" strokeWidth="2" />
          <text x="195" y="30" textAnchor="middle" fontSize="11" fill="#15803d" fontWeight="bold">{bpm} bpm</text>
        </g>
      )}
      <text x="100" y="175" textAnchor="middle" fontSize="9" fill="#374151">Distance: {dist} cm</text>
    </svg>
  );
}

function ElectricityViz({ step }: { step: number }) {
  const isParallel = step >= 2;
  const bulb1On = step !== 1;
  const bulb2On = step !== 1;
  const bulb3On = !(step === 1) && !(step === 3);

  return (
    <svg viewBox="0 0 260 180" className="w-full max-w-[280px] mx-auto">
      {/* Battery */}
      <rect x="10" y="75" width="30" height="30" rx="4" fill="#fef9c3" stroke="#ca8a04" strokeWidth="2" />
      <text x="25" y="93" textAnchor="middle" fontSize="9" fill="#713f12" fontWeight="bold">6V</text>
      {/* Wires */}
      <line x1="40" y1="80" x2="80" y2="80" stroke="#374151" strokeWidth="2" />
      <line x1="40" y1="100" x2="80" y2="100" stroke={isParallel ? "#374151" : "#94a3b8"} strokeWidth="2" />
      <line x1="200" y1="80" x2="240" y2="80" stroke="#374151" strokeWidth="2" />
      <line x1="240" y1="80" x2="240" y2="100" stroke="#374151" strokeWidth="2" />
      <line x1="240" y1="100" x2="200" y2="100" stroke="#374151" strokeWidth="2" />
      {/* Bulbs */}
      {[80, 130, 170].map((x, i) => {
        const on = [bulb1On, bulb2On, bulb3On][i];
        return (
          <g key={i}>
            <circle cx={x + 20} cy="90" r="16" fill={on ? "#fef08a" : "#e2e8f0"}
              stroke={on ? "#ca8a04" : "#94a3b8"} strokeWidth="2" />
            <text x={x + 20} y="95" textAnchor="middle" fontSize="14">{on ? "💡" : "⚫"}</text>
            {isParallel && <line x1={x + 20} y1="74" x2={x + 20} y2="60" stroke="#374151" strokeWidth="2" />}
            {isParallel && <line x1={x + 20} y1="106" x2={x + 20} y2="120" stroke="#374151" strokeWidth="2" />}
          </g>
        );
      })}
      {isParallel && (
        <>
          <line x1="60" y1="60" x2="200" y2="60" stroke="#374151" strokeWidth="2" />
          <line x1="60" y1="120" x2="200" y2="120" stroke="#374151" strokeWidth="2" />
          <line x1="60" y1="60" x2="60" y2="80" stroke="#374151" strokeWidth="2" />
          <line x1="60" y1="100" x2="60" y2="120" stroke="#374151" strokeWidth="2" />
        </>
      )}
      <text x="130" y="165" textAnchor="middle" fontSize="10" fill="#374151" fontWeight="bold">
        {isParallel ? "Parallel Circuit" : "Series Circuit"}
      </text>
    </svg>
  );
}

const LAB_ICONS: { [key: string]: React.ReactNode } = {
  titration: <FlaskConical className="w-5 h-5" />,
  density: <Beaker className="w-5 h-5" />,
  motion: <Activity className="w-5 h-5" />,
  photosynthesis: <Leaf className="w-5 h-5" />,
  electricity: <Zap className="w-5 h-5" />,
};

const LAB_COLOURS: { [key: string]: string } = {
  titration: "from-purple-500 to-pink-500",
  density: "from-slate-500 to-blue-500",
  motion: "from-indigo-500 to-violet-500",
  photosynthesis: "from-green-500 to-emerald-500",
  electricity: "from-yellow-500 to-orange-500",
};

// ── Main Component ────────────────────────────────────────────────────────────
export function VirtualLab({ lessonId, onClose }: VirtualLabProps) {
  const lab: VirtualLabType | undefined = VIRTUAL_LABS[lessonId];
  const [currentStep, setCurrentStep] = useState(0);
  const [triggeredSteps, setTriggeredSteps] = useState<Set<number>>(new Set());
  const [completed, setCompleted] = useState(false);

  if (!lab) {
    return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md text-center shadow-xl">
          <FlaskConical className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">No Virtual Lab</h3>
          <p className="text-gray-600 mb-4">This lesson does not have an associated virtual practical.</p>
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    );
  }

  const step = lab.steps[currentStep];
  const isLastStep = currentStep === lab.steps.length - 1;
  const triggered = triggeredSteps.has(currentStep);
  const colourClass = LAB_COLOURS[lab.type] || "from-green-500 to-teal-500";

  const handleAction = () => {
    setTriggeredSteps(prev => new Set([...prev, currentStep]));
  };

  const handleNext = () => {
    if (isLastStep) {
      setCompleted(true);
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const renderViz = () => {
    const stepIdx = currentStep;
    switch (lab.type) {
      case 'titration': return <TitrationViz step={stepIdx} triggered={triggered} />;
      case 'density': return <DensityViz step={stepIdx} />;
      case 'motion': return <MotionViz step={stepIdx} />;
      case 'photosynthesis': return <PhotosynthesisViz step={stepIdx} />;
      case 'electricity': return <ElectricityViz step={stepIdx} />;
      default: return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-3 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-4"
      >
        {/* Header */}
        <div className={`bg-gradient-to-r ${colourClass} p-5 rounded-t-2xl text-white`}>
          <div className="flex items-center gap-3 mb-1">
            {LAB_ICONS[lab.type]}
            <span className="text-xs font-semibold uppercase tracking-wider opacity-80">Virtual Lab Practical</span>
          </div>
          <h2 className="text-xl font-extrabold">{lab.title}</h2>
          <p className="text-sm opacity-85 mt-1">{lab.objective}</p>
        </div>

        <div className="p-5">
          {!completed ? (
            <>
              {/* Progress bar */}
              <div className="flex items-center gap-2 mb-5">
                {lab.steps.map((_, i) => (
                  <div key={i}
                    className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                      i < currentStep ? 'bg-green-400' : i === currentStep ? 'bg-blue-400' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                {/* Visualization */}
                <div className="bg-gray-50 rounded-xl p-4 flex flex-col items-center justify-center min-h-[200px]">
                  {renderViz()}
                </div>

                {/* Step panel */}
                <div className="flex flex-col gap-4">
                  {/* Materials (shown at step 0) */}
                  {currentStep === 0 && (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                      <p className="text-xs font-bold text-amber-700 mb-2 uppercase tracking-wide">Materials Needed</p>
                      <ul className="space-y-1">
                        {lab.materials.map((m, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-amber-900">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                            {m}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Instruction */}
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex-1">
                    <Badge className="mb-2 text-xs bg-blue-100 text-blue-700 border-0">
                      Step {currentStep + 1} of {lab.steps.length}
                    </Badge>
                    <p className="text-gray-800 font-medium text-sm leading-relaxed">{step.instruction}</p>

                    {/* Action button */}
                    {step.action && !triggered && (
                      <Button
                        onClick={handleAction}
                        className="mt-3 bg-green-500 hover:bg-green-600 text-white text-sm gap-2 w-full"
                      >
                        <Play className="w-4 h-4" />
                        {step.action}
                      </Button>
                    )}

                    {/* Observation */}
                    <AnimatePresence>
                      {(triggered || !step.action) && step.observation && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-3 bg-white border border-green-200 rounded-lg p-3"
                        >
                          <p className="text-xs font-bold text-green-700 mb-1">🔍 Observation:</p>
                          <p className="text-sm text-green-900">{step.observation}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Next button */}
                  <Button
                    onClick={handleNext}
                    disabled={!!(step.action && !triggered)}
                    className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
                  >
                    {isLastStep ? (
                      <>See Conclusion <CheckCircle2 className="w-4 h-4" /></>
                    ) : (
                      <>Next Step <ChevronRight className="w-4 h-4" /></>
                    )}
                  </Button>
                </div>
              </div>
            </>
          ) : (
            /* Conclusion */
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              <div className="text-center mb-5">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-9 h-9 text-green-500" />
                </div>
                <h3 className="text-xl font-extrabold text-gray-900">Lab Complete! 🎉</h3>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-5">
                <p className="text-xs font-bold text-green-700 mb-2 uppercase tracking-wide">Conclusion</p>
                <p className="text-gray-800 leading-relaxed">{lab.conclusion}</p>
              </div>
              <Button onClick={onClose} className="w-full bg-green-500 hover:bg-green-600 text-white">
                Back to Lesson
              </Button>
            </motion.div>
          )}

          {/* Close */}
          {!completed && (
            <button onClick={onClose} className="mt-4 text-xs text-gray-400 hover:text-gray-600 transition-colors w-full text-center">
              Close Lab
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
