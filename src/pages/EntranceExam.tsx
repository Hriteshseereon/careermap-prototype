import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import MobileFrame from '@/components/MobileFrame';
import BottomNav from '@/components/BottomNav';
import { ArrowLeft, ExternalLink, Calendar, FileText } from 'lucide-react';

const exams = [
  { name: 'JEE Main', authority: 'NTA', date: 'April 2025', eligibility: 'Class 12 pass (PCM)', color: 'bg-career-blue/10', iconColor: 'text-career-blue' },
  { name: 'NEET UG', authority: 'NTA', date: 'May 2025', eligibility: 'Class 12 pass (PCB)', color: 'bg-career-green/10', iconColor: 'text-career-green' },
  { name: 'CLAT', authority: 'Consortium of NLUs', date: 'December 2024', eligibility: 'Class 12 pass', color: 'bg-career-purple/10', iconColor: 'text-career-purple' },
  { name: 'CUET', authority: 'NTA', date: 'May 2025', eligibility: 'Class 12 pass', color: 'bg-career-orange/10', iconColor: 'text-career-orange' },
  { name: 'BITSAT', authority: 'BITS Pilani', date: 'May 2025', eligibility: 'Class 12 pass (PCM)', color: 'bg-career-pink/10', iconColor: 'text-career-pink' },
  { name: 'CAT', authority: 'IIMs', date: 'November 2025', eligibility: 'Graduate', color: 'bg-gold/10', iconColor: 'text-gold' },
];

const EntranceExam = () => {
  const navigate = useNavigate();

  return (
    <MobileFrame>
      <div className="flex flex-col min-h-[750px]">
        <div className="px-5 pt-4 pb-3 flex items-center gap-3">
          <button onClick={() => navigate('/dashboard')} className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <h1 className="text-lg font-bold font-display">Entrance Exams</h1>
        </div>

        <div className="flex-1 overflow-y-auto px-5 pb-4 space-y-2.5">
          {exams.map((e, i) => (
            <motion.div
              key={e.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="p-4 rounded-xl bg-card shadow-card border border-border/40"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl ${e.color} flex items-center justify-center flex-shrink-0`}>
                    <FileText className={`w-5 h-5 ${e.iconColor}`} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-bold font-display text-sm text-foreground">{e.name}</h3>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{e.authority}</p>
                    <div className="flex items-center gap-1 mt-1 text-[10px] text-muted-foreground">
                      <Calendar className="w-3 h-3" /> {e.date}
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{e.eligibility}</p>
                  </div>
                </div>
                <button className="w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center flex-shrink-0">
                  <ExternalLink className="w-3.5 h-3.5 text-primary" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        <BottomNav />
      </div>
    </MobileFrame>
  );
};

export default EntranceExam;
