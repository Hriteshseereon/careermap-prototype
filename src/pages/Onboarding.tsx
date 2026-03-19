import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import MobileFrame from '@/components/MobileFrame';
import { ChevronRight } from 'lucide-react';

// Step 2 — Current Stage
const stageOptions = [
  { label: 'Class 8–10', emoji: '📚' },
  { label: 'Class 11–12', emoji: '🎒' },
  { label: 'College Student', emoji: '🏫' },
  { label: 'Graduate / Job Seeker', emoji: '🎓' },
  { label: 'Working Professional', emoji: '💼' },
];

// Step 3 — Primary Objective
const objectiveOptions = [
  { label: 'To choose a career path', emoji: '🗺️' },
  { label: 'I feel uncertain about my future', emoji: '🤔' },
  { label: 'To improve my career opportunities', emoji: '📈' },
  { label: 'To explore courses and colleges', emoji: '🏛️' },
];

// Step 4 — Career Clarity
const clarityOptions = [
  { label: 'Clear on my goal, need the right path', emoji: '🎯' },
  { label: 'Choosing between a few options', emoji: '⚖️' },
  { label: "Confused between my choice and parents' expectations", emoji: '😟' },
  { label: 'I keep changing my options', emoji: '🔄' },
  { label: 'I have limited awareness of options', emoji: '🌫️' },
];

// Step 5 — Areas of Interest (multi-select)
const interestOptions = [
  { label: 'Science and Technology', emoji: '🔬' },
  { label: 'Business and Management', emoji: '💹' },
  { label: 'Creative Fields and Design', emoji: '🎨' },
  { label: 'Healthcare and Medical', emoji: '🏥' },
  { label: 'Information Technology', emoji: '💻' },
  { label: 'Law and Government', emoji: '⚖️' },
];

// Step 6 — Key Strengths (multi-select)
const strengthOptions = [
  { label: 'Analytical Thinking', emoji: '🧠' },
  { label: 'Communication', emoji: '💬' },
  { label: 'Creativity', emoji: '✨' },
  { label: 'Leadership', emoji: '👑' },
  { label: 'Problem-solving', emoji: '🧩' },
];

// Step 7 — Career Priorities (multi-select)
const priorityOptions = [
  { label: 'High Earning Potential', emoji: '💰' },
  { label: 'Passion and Interest', emoji: '❤️' },
  { label: 'Work-Life Balance', emoji: '⚡' },
  { label: 'Growth and Advancement', emoji: '🚀' },
];

// Step 8 — Guidance Preference
const guidanceOptions = [
  { label: 'Yes, I would like counselling', emoji: '🤝' },
  { label: 'Maybe after an assessment', emoji: '📋' },
  { label: 'I prefer to explore on my own', emoji: '🧭' },
];

// Total steps: 0 (Welcome) + 1 (Name) + 2–8 (the 7 new steps) + 9 (Done) = 10 steps (0–9)
const TOTAL_STEPS = 10;

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  // Step 1
  const [name, setName] = useState('');
  // Step 2
  const [selectedStage, setSelectedStage] = useState('');
  // Step 3
  const [selectedObjective, setSelectedObjective] = useState('');
  // Step 4
  const [selectedClarity, setSelectedClarity] = useState('');
  // Step 5
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  // Step 6
  const [selectedStrengths, setSelectedStrengths] = useState<string[]>([]);
  // Step 7
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  // Step 8
  const [selectedGuidance, setSelectedGuidance] = useState('');

  const toggleMulti = (
    val: string,
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>
  ) => setList(prev => prev.includes(val) ? prev.filter(x => x !== val) : [...prev, val]);

  const canProceed = () => {
    if (step === 1) return name.trim().length > 0;
    if (step === 2) return selectedStage !== '';
    if (step === 3) return selectedObjective !== '';
    if (step === 4) return selectedClarity !== '';
    if (step === 5) return selectedInterests.length > 0;
    if (step === 6) return selectedStrengths.length > 0;
    if (step === 7) return selectedPriorities.length > 0;
    if (step === 8) return selectedGuidance !== '';
    return true;
  };

  const next = () => {
    if (step < TOTAL_STEPS - 1) setStep(step + 1);
    else navigate('/login');
  };

  const variants = {
    enter: { x: 40, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -40, opacity: 0 },
  };

  // Pill button for single-select
  const PillSingle = ({
    option, selected, onSelect,
  }: { option: { label: string; emoji: string }; selected: string; onSelect: (v: string) => void }) => (
    <button
      onClick={() => onSelect(option.label)}
      className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-semibold text-sm text-left transition-all duration-200 border ${
        selected === option.label
          ? 'bg-primary text-primary-foreground border-primary shadow-md scale-[1.01]'
          : 'bg-card border-border text-foreground hover:border-primary/40 hover:bg-muted/40'
      }`}
    >
      <span className="text-xl shrink-0">{option.emoji}</span>
      <span className="leading-tight">{option.label}</span>
    </button>
  );

  // Pill button for multi-select
  const PillMulti = ({
    option, selected, onToggle,
  }: { option: { label: string; emoji: string }; selected: string[]; onToggle: (v: string) => void }) => (
    <button
      onClick={() => onToggle(option.label)}
      className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-semibold text-sm text-left transition-all duration-200 border ${
        selected.includes(option.label)
          ? 'bg-primary text-primary-foreground border-primary shadow-md scale-[1.01]'
          : 'bg-card border-border text-foreground hover:border-primary/40 hover:bg-muted/40'
      }`}
    >
      <span className="text-xl shrink-0">{option.emoji}</span>
      <span className="leading-tight">{option.label}</span>
      {selected.includes(option.label) && (
        <span className="ml-auto text-xs font-bold bg-white/20 rounded-full w-5 h-5 flex items-center justify-center">✓</span>
      )}
    </button>
  );

  return (
    <MobileFrame>
      <div className="flex flex-col min-h-[750px] p-5">
        {/* Progress dots / bar — hide on welcome & done screens */}
        {step > 0 && step < TOTAL_STEPS - 1 && (
          <div className="flex items-center gap-1.5 mb-5">
            {Array.from({ length: TOTAL_STEPS - 2 }).map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-1 rounded-full transition-all duration-400 ${
                  i < step ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25 }}
            className="flex-1 flex flex-col"
          >

            {/* ── Step 0: Welcome ── */}
            {step === 0 && (
              <div className="flex-1 flex flex-col items-center justify-center text-center gap-6 px-2">
                <div className="text-7xl animate-float">🧭</div>
                <h1 className="text-2xl font-black font-display text-foreground leading-tight">
                  Hi! I'm your Career Guide 👋
                </h1>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-[280px]">
                  Answer a few quick questions and I'll help you discover the best career path for your future.
                </p>
                <Button variant="hero" size="xl" onClick={next} className="gap-2 mt-2">
                  Start Journey <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            )}

            {/* ── Step 1: Name ── */}
            {step === 1 && (
              <div className="flex-1 flex flex-col gap-5 pt-6">
                <div className="text-5xl text-center">📝</div>
                <div className="text-center">
                  <h2 className="text-xl font-bold font-display">What's your name?</h2>
                  <p className="text-muted-foreground text-xs mt-1">So I can personalise your experience</p>
                </div>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="input-field h-14 text-base"
                />
                <Button variant="hero" size="lg" onClick={next} disabled={!canProceed()} className="mt-auto mb-8 gap-2">
                  Next <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            )}

            {/* ── Step 2: Current Stage ── */}
            {step === 2 && (
              <div className="flex-1 flex flex-col gap-4 pt-4">
                <div className="text-5xl text-center">🎓</div>
                <div className="text-center">
                  <h2 className="text-xl font-bold font-display">Current Stage</h2>
                  <p className="text-muted-foreground text-xs mt-1">Where are you in your journey?</p>
                </div>
                <div className="flex flex-col gap-2.5">
                  {stageOptions.map(o => (
                    <PillSingle key={o.label} option={o} selected={selectedStage} onSelect={setSelectedStage} />
                  ))}
                </div>
                <Button variant="hero" size="lg" onClick={next} disabled={!canProceed()} className="mt-auto mb-6 gap-2">
                  Next <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            )}

            {/* ── Step 3: Primary Objective ── */}
            {step === 3 && (
              <div className="flex-1 flex flex-col gap-4 pt-4">
                <div className="text-5xl text-center">🎯</div>
                <div className="text-center">
                  <h2 className="text-xl font-bold font-display">Primary Objective</h2>
                  <p className="text-muted-foreground text-xs mt-1">What brings you here today?</p>
                </div>
                <div className="flex flex-col gap-2.5">
                  {objectiveOptions.map(o => (
                    <PillSingle key={o.label} option={o} selected={selectedObjective} onSelect={setSelectedObjective} />
                  ))}
                </div>
                <Button variant="hero" size="lg" onClick={next} disabled={!canProceed()} className="mt-auto mb-6 gap-2">
                  Next <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            )}

            {/* ── Step 4: Career Clarity ── */}
            {step === 4 && (
              <div className="flex-1 flex flex-col gap-4 pt-4">
                <div className="text-5xl text-center">🔍</div>
                <div className="text-center">
                  <h2 className="text-xl font-bold font-display">Career Clarity</h2>
                  <p className="text-muted-foreground text-xs mt-1">How clear are you about your direction?</p>
                </div>
                <div className="flex flex-col gap-2.5">
                  {clarityOptions.map(o => (
                    <PillSingle key={o.label} option={o} selected={selectedClarity} onSelect={setSelectedClarity} />
                  ))}
                </div>
                <Button variant="hero" size="lg" onClick={next} disabled={!canProceed()} className="mt-auto mb-6 gap-2">
                  Next <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            )}

            {/* ── Step 5: Areas of Interest ── */}
            {step === 5 && (
              <div className="flex-1 flex flex-col gap-4 pt-4">
                <div className="text-5xl text-center">✨</div>
                <div className="text-center">
                  <h2 className="text-xl font-bold font-display">Areas of Interest</h2>
                  <p className="text-muted-foreground text-xs mt-1">Select all that apply</p>
                </div>
                <div className="flex flex-col gap-2.5">
                  {interestOptions.map(o => (
                    <PillMulti
                      key={o.label}
                      option={o}
                      selected={selectedInterests}
                      onToggle={v => toggleMulti(v, selectedInterests, setSelectedInterests)}
                    />
                  ))}
                </div>
                <Button variant="hero" size="lg" onClick={next} disabled={!canProceed()} className="mt-auto mb-6 gap-2">
                  Next <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            )}

            {/* ── Step 6: Key Strengths ── */}
            {step === 6 && (
              <div className="flex-1 flex flex-col gap-4 pt-4">
                <div className="text-5xl text-center">💪</div>
                <div className="text-center">
                  <h2 className="text-xl font-bold font-display">Key Strengths</h2>
                  <p className="text-muted-foreground text-xs mt-1">What are your core strengths? Pick all that fit.</p>
                </div>
                <div className="flex flex-col gap-2.5">
                  {strengthOptions.map(o => (
                    <PillMulti
                      key={o.label}
                      option={o}
                      selected={selectedStrengths}
                      onToggle={v => toggleMulti(v, selectedStrengths, setSelectedStrengths)}
                    />
                  ))}
                </div>
                <Button variant="hero" size="lg" onClick={next} disabled={!canProceed()} className="mt-auto mb-6 gap-2">
                  Next <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            )}

            {/* ── Step 7: Career Priorities ── */}
            {step === 7 && (
              <div className="flex-1 flex flex-col gap-4 pt-4">
                <div className="text-5xl text-center">🌟</div>
                <div className="text-center">
                  <h2 className="text-xl font-bold font-display">Career Priorities</h2>
                  <p className="text-muted-foreground text-xs mt-1">What matters most to you in a career?</p>
                </div>
                <div className="flex flex-col gap-2.5">
                  {priorityOptions.map(o => (
                    <PillMulti
                      key={o.label}
                      option={o}
                      selected={selectedPriorities}
                      onToggle={v => toggleMulti(v, selectedPriorities, setSelectedPriorities)}
                    />
                  ))}
                </div>
                <Button variant="hero" size="lg" onClick={next} disabled={!canProceed()} className="mt-auto mb-6 gap-2">
                  Next <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            )}

            {/* ── Step 8: Guidance Preference ── */}
            {step === 8 && (
              <div className="flex-1 flex flex-col gap-4 pt-4">
                <div className="text-5xl text-center">🤝</div>
                <div className="text-center">
                  <h2 className="text-xl font-bold font-display">Guidance Preference</h2>
                  <p className="text-muted-foreground text-xs mt-1">Would you like expert career guidance?</p>
                </div>
                <div className="flex flex-col gap-2.5">
                  {guidanceOptions.map(o => (
                    <PillSingle key={o.label} option={o} selected={selectedGuidance} onSelect={setSelectedGuidance} />
                  ))}
                </div>
                <Button variant="hero" size="lg" onClick={next} disabled={!canProceed()} className="mt-auto mb-6 gap-2">
                  Finish <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            )}

            {/* ── Step 9: Done ── */}
            {step === 9 && (
              <div className="flex-1 flex flex-col items-center justify-center text-center gap-6 px-2">
                <div className="text-7xl">🎉</div>
                <h1 className="text-2xl font-black font-display text-foreground leading-tight">
                  Your profile is ready,<br />{name || 'Explorer'}!
                </h1>
                <p className="text-muted-foreground max-w-[280px] text-sm leading-relaxed">
                  We've personalised your career journey. Let's sign you in to get started!
                </p>
                <Button variant="hero" size="xl" onClick={next} className="gap-2">
                  Continue <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>
    </MobileFrame>
  );
};

export default Onboarding;