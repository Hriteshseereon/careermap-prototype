import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import MobileFrame from '@/components/MobileFrame';
import BottomNav from '@/components/BottomNav';
import { ArrowLeft, ExternalLink, MapPin } from 'lucide-react';

const institutes = [
  { name: 'IIT Bombay', location: 'Mumbai, Maharashtra', courses: ['B.Tech', 'M.Tech', 'PhD'], emoji: '🏛️', rank: '#1 Engineering' },
  { name: 'AIIMS Delhi', location: 'New Delhi', courses: ['MBBS', 'MD', 'MS'], emoji: '🏥', rank: '#1 Medical' },
  { name: 'IIM Ahmedabad', location: 'Ahmedabad, Gujarat', courses: ['MBA', 'PGPX', 'PhD'], emoji: '🎓', rank: '#1 Business' },
  { name: 'NID Ahmedabad', location: 'Ahmedabad, Gujarat', courses: ['B.Des', 'M.Des'], emoji: '🎨', rank: '#1 Design' },
  { name: 'BITS Pilani', location: 'Pilani, Rajasthan', courses: ['B.E.', 'M.E.', 'PhD'], emoji: '⚡', rank: '#4 Engineering' },
];

const Institute = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<number | null>(null);

  if (selected !== null) {
    const inst = institutes[selected];
    return (
      <MobileFrame>
        <div className="flex flex-col min-h-[750px]">
          <div className="px-5 pt-4 pb-3 flex items-center gap-3">
            <button onClick={() => setSelected(null)} className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <h1 className="text-lg font-bold font-display">{inst.name}</h1>
          </div>
          <div className="flex-1 overflow-y-auto px-5 pb-4 space-y-4">
            <div className="text-center py-4">
              <div className="text-6xl mb-3">{inst.emoji}</div>
              <h2 className="text-xl font-black font-display">{inst.name}</h2>
              <p className="text-sm text-muted-foreground flex items-center justify-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5" /> {inst.location}
              </p>
              <span className="inline-block mt-2 text-[10px] font-bold px-3 py-1 rounded-full bg-primary/8 text-primary">{inst.rank}</span>
            </div>
            <div className="card-elevated p-4">
              <h3 className="font-bold font-display text-sm text-primary mb-2">About</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">One of India's premier educational institutions known for excellence in education and research.</p>
            </div>
            <div className="card-elevated p-4">
              <h3 className="font-bold font-display text-sm text-primary mb-2">Courses Offered</h3>
              <div className="flex flex-wrap gap-2">
                {inst.courses.map(c => (
                  <span key={c} className="px-3 py-1.5 rounded-lg bg-primary/8 text-primary text-xs font-bold">{c}</span>
                ))}
              </div>
            </div>
            <button className="flex items-center gap-2 text-primary font-bold font-display text-sm">
              <ExternalLink className="w-4 h-4" /> Visit Official Website
            </button>
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
          <h1 className="text-lg font-bold font-display">Institutes</h1>
        </div>
        <div className="flex-1 overflow-y-auto px-5 pb-4 space-y-2.5">
          {institutes.map((inst, i) => (
            <motion.button
              key={inst.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelected(i)}
              className="w-full flex items-center gap-3.5 p-4 rounded-xl bg-card shadow-card border border-border/40 text-left active:scale-[0.98] transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center text-2xl flex-shrink-0">{inst.emoji}</div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold font-display text-sm text-foreground">{inst.name}</h3>
                <p className="text-[11px] text-muted-foreground flex items-center gap-0.5 mt-0.5"><MapPin className="w-3 h-3" />{inst.location}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{inst.courses.join(' · ')}</p>
              </div>
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-career-blue/10 text-career-blue flex-shrink-0">{inst.rank}</span>
            </motion.button>
          ))}
        </div>
        <BottomNav />
      </div>
    </MobileFrame>
  );
};

export default Institute;
