import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import MobileFrame from '@/components/MobileFrame';
import BottomNav from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Star, Clock, CheckCircle2 } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import LockedOverlay from '@/components/LockedOverlay';

const mentors = [
  { name: 'Dr. Priya Sharma', spec: 'Career Counselling', exp: '12 years', rating: 4.9, avatar: '👩‍⚕️', tags: ['Counselling', 'Psychology'] },
  { name: 'Prof. Rahul Verma', spec: 'Engineering Guidance', exp: '15 years', rating: 4.8, avatar: '👨‍🏫', tags: ['IIT', 'JEE', 'Engineering'] },
  { name: 'Ms. Anjali Singh', spec: 'Design & Creative Arts', exp: '8 years', rating: 4.7, avatar: '👩‍🎨', tags: ['Design', 'UX', 'NID'] },
  { name: 'Mr. Vikram Patel', spec: 'Business & MBA', exp: '10 years', rating: 4.9, avatar: '👨‍💼', tags: ['MBA', 'CAT', 'Business'] },
];

const slots = ['10:00 AM', '11:30 AM', '2:00 PM', '3:30 PM', '5:00 PM'];

const BookMentor = () => {
  const navigate = useNavigate();
  const { isUnlocked } = useApp();
  const [selected, setSelected] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [booked, setBooked] = useState(false);

  if (!isUnlocked('book-mentor')) {
    return (
      <MobileFrame>
        <div className="flex flex-col min-h-[750px]">
          <div className="px-5 pt-4 pb-3 flex items-center gap-3">
            <button onClick={() => navigate('/dashboard')} className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <h1 className="text-lg font-bold font-display">Book Mentor</h1>
          </div>
          <div className="flex-1 flex items-center">
            <LockedOverlay title="Mentor Booking Locked" description="Subscribe to book one-on-one sessions with expert career mentors." />
          </div>
          <BottomNav />
        </div>
      </MobileFrame>
    );
  }

  if (booked) {
    return (
      <MobileFrame>
        <div className="flex flex-col items-center justify-center min-h-[750px] p-6 text-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-career-green/10 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-career-green" strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl font-black font-display">Booking Confirmed!</h1>
          <p className="text-muted-foreground text-sm max-w-[260px]">Your session with {mentors[selected!].name} at {selectedSlot} is confirmed.</p>
          <Button variant="hero" size="lg" onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
        </div>
      </MobileFrame>
    );
  }

  if (selected !== null) {
    const m = mentors[selected];
    return (
      <MobileFrame>
        <div className="flex flex-col min-h-[750px]">
          <div className="px-5 pt-4 pb-3 flex items-center gap-3">
            <button onClick={() => setSelected(null)} className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <h1 className="text-lg font-bold font-display">Mentor Profile</h1>
          </div>
          <div className="flex-1 overflow-y-auto px-5 pb-4 space-y-4">
            <div className="text-center py-3">
              <div className="text-6xl mb-3">{m.avatar}</div>
              <h2 className="text-xl font-black font-display">{m.name}</h2>
              <p className="text-sm text-primary font-bold">{m.spec}</p>
              <div className="flex items-center justify-center gap-4 mt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-gold fill-gold" />{m.rating}</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{m.exp}</span>
              </div>
              <div className="flex flex-wrap justify-center gap-1.5 mt-3">
                {m.tags.map(t => (
                  <span key={t} className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-primary/8 text-primary">{t}</span>
                ))}
              </div>
            </div>

            <div className="card-elevated p-4">
              <h3 className="font-bold font-display text-sm text-foreground mb-2">Biography</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Expert career counsellor specializing in {m.spec.toLowerCase()} with {m.exp} of experience helping students find their ideal career paths.
              </p>
            </div>

            <div className="card-elevated p-4">
              <h3 className="font-bold font-display text-sm text-foreground mb-3">Available Slots</h3>
              <div className="grid grid-cols-3 gap-2">
                {slots.map(s => (
                  <button
                    key={s}
                    onClick={() => setSelectedSlot(s)}
                    className={`py-2.5 px-3 rounded-lg text-xs font-bold font-display transition-all ${
                      selectedSlot === s ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-muted text-foreground'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <Button variant="hero" size="lg" className="w-full" disabled={!selectedSlot} onClick={() => setBooked(true)}>
              Confirm Booking
            </Button>
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
          <h1 className="text-lg font-bold font-display">Book a Mentor</h1>
        </div>
        <div className="flex-1 overflow-y-auto px-5 pb-4 space-y-3">
          {mentors.map((m, i) => (
            <motion.button
              key={m.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelected(i)}
              className="w-full flex items-center gap-3.5 p-4 rounded-xl bg-card shadow-card border border-border/40 text-left active:scale-[0.98] transition-all"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/8 flex items-center justify-center text-3xl flex-shrink-0">
                {m.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold font-display text-sm text-foreground">{m.name}</h3>
                <p className="text-xs text-primary font-semibold mt-0.5">{m.spec}</p>
                <div className="flex items-center gap-3 mt-1.5 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-0.5"><Star className="w-3 h-3 text-gold fill-gold" />{m.rating}</span>
                  <span>{m.exp}</span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
        <BottomNav />
      </div>
    </MobileFrame>
  );
};

export default BookMentor;
