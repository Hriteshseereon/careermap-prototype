import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import MobileFrame from '@/components/MobileFrame';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ChevronLeft, ChevronRight, Trophy, BarChart3 } from 'lucide-react';

const questions = [
  { q: 'I enjoy working with numbers and data.', options: ['Strongly Agree', 'Agree', 'Neutral', 'Disagree'] },
  { q: 'I prefer creative tasks over analytical ones.', options: ['Strongly Agree', 'Agree', 'Neutral', 'Disagree'] },
  { q: 'I like helping and mentoring others.', options: ['Strongly Agree', 'Agree', 'Neutral', 'Disagree'] },
  { q: 'I am comfortable with public speaking.', options: ['Strongly Agree', 'Agree', 'Neutral', 'Disagree'] },
  { q: 'I enjoy learning about technology and gadgets.', options: ['Strongly Agree', 'Agree', 'Neutral', 'Disagree'] },
  { q: 'I like to plan and organize events.', options: ['Strongly Agree', 'Agree', 'Neutral', 'Disagree'] },
  { q: 'I prefer working alone rather than in teams.', options: ['Strongly Agree', 'Agree', 'Neutral', 'Disagree'] },
  { q: 'I am interested in how businesses operate.', options: ['Strongly Agree', 'Agree', 'Neutral', 'Disagree'] },
  { q: 'I enjoy reading and writing.', options: ['Strongly Agree', 'Agree', 'Neutral', 'Disagree'] },
  { q: 'I find scientific experiments fascinating.', options: ['Strongly Agree', 'Agree', 'Neutral', 'Disagree'] },
];

const PsychometricTest = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>(Array(questions.length).fill(null));
  const [completed, setCompleted] = useState(false);

  const select = (option: string) => {
    const newAnswers = [...answers];
    newAnswers[current] = option;
    setAnswers(newAnswers);
  };

  const handleFinish = () => setCompleted(true);

  if (completed) {
    const score = Math.floor(Math.random() * 20 + 70);
    return (
      <MobileFrame>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center min-h-[750px] p-6 text-center gap-5"
        >
          <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Trophy className="w-10 h-10 text-primary" strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl font-black font-display">Test Complete!</h1>
          <div className="w-28 h-28 rounded-full bg-primary/8 border-[3px] border-primary flex items-center justify-center">
            <span className="text-3xl font-black font-display text-primary">{score}%</span>
          </div>
          <p className="text-muted-foreground text-sm max-w-[260px] leading-relaxed">
            Great job! Your detailed career report is available after payment.
          </p>
          <Button variant="hero" size="lg" onClick={() => navigate('/subscription')} className="gap-2">
            <BarChart3 className="w-4 h-4" /> Get Detailed Report
          </Button>
          <Button variant="ghost" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </motion.div>
      </MobileFrame>
    );
  }

  return (
    <MobileFrame>
      <div className="flex flex-col min-h-[750px] p-5">
        <div className="flex items-center gap-3 mb-5">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <h1 className="text-base font-bold font-display">Psychometric Test</h1>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              animate={{ width: `${((current + 1) / questions.length) * 100}%` }}
            />
          </div>
          <span className="text-xs font-bold font-display text-muted-foreground min-w-[40px] text-right">
            {current + 1}/{questions.length}
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -30, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex-1 flex flex-col"
          >
            <div className="card-elevated p-5 mb-4">
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mb-2">Question {current + 1}</p>
              <h2 className="text-base font-bold font-display leading-relaxed">{questions[current].q}</h2>
            </div>
            <div className="flex flex-col gap-2.5">
              {questions[current].options.map((opt, i) => (
                <button
                  key={opt}
                  onClick={() => select(opt)}
                  className={`p-4 rounded-xl text-left font-semibold font-display text-sm transition-all duration-200 ${
                    answers[current] === opt
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'bg-card border border-border shadow-card text-foreground hover:border-primary/30'
                  }`}
                >
                  <span className="mr-2 text-xs opacity-60">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex gap-3 mt-auto pt-6 pb-4">
          <Button
            variant="outline"
            size="lg"
            className="flex-1"
            disabled={current === 0}
            onClick={() => setCurrent(c => c - 1)}
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </Button>
          {current < questions.length - 1 ? (
            <Button
              variant="hero"
              size="lg"
              className="flex-1"
              disabled={!answers[current]}
              onClick={() => setCurrent(c => c + 1)}
            >
              Next <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              variant="hero"
              size="lg"
              className="flex-1"
              disabled={!answers[current]}
              onClick={handleFinish}
            >
              Finish Test
            </Button>
          )}
        </div>
      </div>
    </MobileFrame>
  );
};

export default PsychometricTest;
