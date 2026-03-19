import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import MobileFrame from '@/components/MobileFrame';
import BottomNav from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Lock, Check, Brain } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

const CareerAssessment = () => {
  const navigate = useNavigate();
  const { isUnlocked } = useApp();
  const reportUnlocked = isUnlocked('psychometric-report');

  return (
    <MobileFrame>
      <div className="flex flex-col min-h-[750px]">
        <div className="px-5 pt-4 pb-3 flex items-center gap-3">
          <button onClick={() => navigate('/dashboard')} className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <h1 className="text-lg font-bold font-display">Career Assessment</h1>
        </div>

        <div className="flex-1 overflow-y-auto px-5 pb-4 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center text-center gap-4 pt-4"
          >
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Brain className="w-10 h-10 text-primary" strokeWidth={1.5} />
            </div>
            <h2 className="text-xl font-black font-display">Psychometric Assessment</h2>
            <p className="text-sm text-muted-foreground max-w-[280px] leading-relaxed">
              Discover your aptitude, personality traits, and ideal career matches through our comprehensive test.
            </p>

            <Button variant="hero" size="xl" onClick={() => navigate('/psychometric-test')} className="gap-2">
              Start Test →
            </Button>
          </motion.div>

          <div className="card-elevated p-4">
            <h3 className="font-bold font-display text-sm mb-3">Test Features</h3>
            {['50 MCQ Questions', '30 Minutes Duration', 'Aptitude & Personality', 'AI-Powered Analysis'].map(f => (
              <div key={f} className="flex items-center gap-2.5 py-2 border-b border-border/60 last:border-0">
                <div className="w-4 h-4 rounded-full bg-career-green/15 flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 text-career-green" strokeWidth={3} />
                </div>
                <span className="text-sm text-foreground">{f}</span>
              </div>
            ))}
          </div>

          <div className="card-elevated p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold font-display text-sm">Detailed Report</h3>
              {!reportUnlocked && <Lock className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />}
            </div>
            <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
              Get a comprehensive career report with personalized recommendations.
            </p>
            {reportUnlocked ? (
              <Button variant="secondary" size="sm">Download Report</Button>
            ) : (
              <Button variant="locked" size="sm" onClick={() => navigate('/subscription')} className="gap-1.5">
                <Lock className="w-3 h-3" /> Unlock for ₹1,500
              </Button>
            )}
          </div>
        </div>
        <BottomNav />
      </div>
    </MobileFrame>
  );
};

export default CareerAssessment;
