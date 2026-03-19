import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import MobileFrame from '@/components/MobileFrame';
import BottomNav from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trophy } from 'lucide-react';

const quizzes = [
  { title: 'Engineering Career Quiz', questions: 5, emoji: '⚙️', desc: 'Test your engineering knowledge' },
  { title: 'Medical Career Quiz', questions: 5, emoji: '🏥', desc: 'Explore medical career paths' },
  { title: 'Business Aptitude Quiz', questions: 5, emoji: '💼', desc: 'Assess your business acumen' },
  { title: 'Technology Trends Quiz', questions: 5, emoji: '💻', desc: 'Stay updated with tech trends' },
];

const sampleQuestions = [
  { q: 'Which programming language is most used in AI?', options: ['Python', 'Java', 'C++', 'Ruby'], correct: 0 },
  { q: 'What does CPU stand for?', options: ['Central Process Unit', 'Central Processing Unit', 'Computer Personal Unit', 'Central Program Unit'], correct: 1 },
  { q: 'HTML is a programming language.', options: ['True', 'False', 'Sometimes', 'Depends'], correct: 1 },
  { q: 'Which company created React?', options: ['Google', 'Microsoft', 'Meta', 'Amazon'], correct: 2 },
  { q: 'RAM stands for?', options: ['Random Access Memory', 'Read Access Memory', 'Run Access Memory', 'Random Assign Memory'], correct: 0 },
];

const Quiz = () => {
  const navigate = useNavigate();
  const [activeQuiz, setActiveQuiz] = useState<number | null>(null);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(5).fill(null));
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (idx: number) => {
    const newAnswers = [...answers];
    newAnswers[current] = idx;
    setAnswers(newAnswers);
  };

  const score = answers.filter((a, i) => a === sampleQuestions[i].correct).length;

  if (showResult) {
    return (
      <MobileFrame>
        <div className="flex flex-col items-center justify-center min-h-[750px] p-6 text-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Trophy className="w-10 h-10 text-primary" strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl font-black font-display">Quiz Complete!</h1>
          <div className="w-28 h-28 rounded-full bg-primary/8 border-[3px] border-primary flex items-center justify-center">
            <span className="text-2xl font-black font-display text-primary">{score}/5</span>
          </div>
          <p className="text-muted-foreground text-sm">
            {score >= 4 ? 'Excellent work! 🎉' : score >= 2 ? 'Good effort! Keep learning.' : "Keep practicing! You'll improve."}
          </p>
          <Button variant="hero" size="lg" onClick={() => { setActiveQuiz(null); setShowResult(false); setAnswers(Array(5).fill(null)); setCurrent(0); }}>
            Try Another Quiz
          </Button>
        </div>
      </MobileFrame>
    );
  }

  if (activeQuiz !== null) {
    return (
      <MobileFrame>
        <div className="flex flex-col min-h-[750px] p-5">
          <div className="flex items-center gap-3 mb-5">
            <button onClick={() => { setActiveQuiz(null); setCurrent(0); setAnswers(Array(5).fill(null)); }} className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <h1 className="text-base font-bold font-display">{quizzes[activeQuiz].title}</h1>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
              <motion.div className="h-full bg-career-green rounded-full" animate={{ width: `${((current + 1) / 5) * 100}%` }} />
            </div>
            <span className="text-xs font-bold text-muted-foreground">{current + 1}/5</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={current} initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -30, opacity: 0 }} className="flex-1 flex flex-col">
              <div className="card-elevated p-4 mb-4">
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mb-2">Question {current + 1}</p>
                <h2 className="text-base font-bold font-display leading-relaxed">{sampleQuestions[current].q}</h2>
              </div>
              <div className="flex flex-col gap-2.5">
                {sampleQuestions[current].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    className={`p-4 rounded-xl text-left font-semibold font-display text-sm transition-all ${
                      answers[current] === i ? 'bg-primary text-primary-foreground shadow-md' : 'bg-card border border-border shadow-card text-foreground'
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
            {current < 4 ? (
              <Button variant="hero" size="lg" className="w-full" disabled={answers[current] === null} onClick={() => setCurrent(c => c + 1)}>
                Next
              </Button>
            ) : (
              <Button variant="hero" size="lg" className="w-full" disabled={answers[current] === null} onClick={() => setShowResult(true)}>
                Finish Quiz
              </Button>
            )}
          </div>
        </div>
      </MobileFrame>
    );
  }

  return (
    <MobileFrame>
      <div className="flex flex-col min-h-[750px]">
        <div className="px-5 pt-4 pb-3 flex items-center gap-3">
          <button onClick={() => navigate('/dashboard')} className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <h1 className="text-lg font-bold font-display">Quizzes</h1>
        </div>
        <div className="flex-1 overflow-y-auto px-5 pb-4 space-y-2.5">
          {quizzes.map((q, i) => (
            <motion.button
              key={q.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setActiveQuiz(i)}
              className="w-full flex items-center gap-3.5 p-4 rounded-xl bg-card shadow-card border border-border/40 text-left active:scale-[0.98] transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-career-blue/10 flex items-center justify-center text-2xl flex-shrink-0">{q.emoji}</div>
              <div>
                <h3 className="font-bold font-display text-sm text-foreground">{q.title}</h3>
                <p className="text-[10px] text-muted-foreground mt-0.5">{q.desc}</p>
                <p className="text-[10px] text-primary font-bold mt-0.5">{q.questions} questions</p>
              </div>
            </motion.button>
          ))}
        </div>
        <BottomNav />
      </div>
    </MobileFrame>
  );
};

export default Quiz;
