import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import MobileFrame from '@/components/MobileFrame';
import BottomNav from '@/components/BottomNav';
import { ArrowLeft, Award, Calendar, ChevronRight } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import LockedOverlay from '@/components/LockedOverlay';

const scholarships = [
  { name: 'INSPIRE Scholarship', eligibility: 'Top 1% in Class 12', amount: '₹80,000/year', deadline: 'March 2025', tag: 'Merit Based' },
  { name: 'National Talent Search', eligibility: 'Class 10 students', amount: '₹1,250/month', deadline: 'November 2024', tag: 'National' },
  { name: 'KVPY Fellowship', eligibility: 'Class 11-12 Science', amount: '₹5,000-7,000/month', deadline: 'August 2025', tag: 'Science' },
  { name: 'Pragati Scholarship', eligibility: 'Girl students in tech', amount: '₹50,000/year', deadline: 'December 2024', tag: 'Girls in Tech' },
];

const Scholarship = () => {
  const navigate = useNavigate();
  const { isUnlocked } = useApp();

  if (!isUnlocked('scholarship')) {
    return (
      <MobileFrame>
        <div className="flex flex-col min-h-[750px]">
          <div className="px-5 pt-4 pb-3 flex items-center gap-3">
            <button onClick={() => navigate('/dashboard')} className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <h1 className="text-lg font-bold font-display">Scholarships</h1>
          </div>
          <div className="flex-1 flex items-center">
            <LockedOverlay title="Scholarship Info Locked" description="Subscribe to access scholarship listings, eligibility details, and application deadlines." />
          </div>
          <BottomNav />
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
          <h1 className="text-lg font-bold font-display">Scholarships</h1>
        </div>
        <div className="flex-1 overflow-y-auto px-5 pb-4 space-y-2.5">
          {scholarships.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="p-4 rounded-xl bg-card shadow-card border border-border/40"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-career-green/10 flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 text-career-green" strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <h3 className="font-bold font-display text-sm text-foreground">{s.name}</h3>
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-primary/8 text-primary flex-shrink-0">{s.tag}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-1">{s.eligibility}</p>
                  <p className="text-xs text-career-green font-bold mt-1">{s.amount}</p>
                  <div className="flex items-center gap-1 mt-1 text-[10px] text-muted-foreground">
                    <Calendar className="w-3 h-3" /> Deadline: {s.deadline}
                  </div>
                </div>
              </div>
              <button className="mt-3 flex items-center gap-1 text-xs text-primary font-bold font-display">
                View Details <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </div>
        <BottomNav />
      </div>
    </MobileFrame>
  );
};

export default Scholarship;
