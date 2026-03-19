import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import MobileFrame from '@/components/MobileFrame';
import BottomNav from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Globe, CheckCircle2 } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import LockedOverlay from '@/components/LockedOverlay';

const countries = [
  { flag: '🇺🇸', name: 'USA', desc: 'Top universities, F-1 visa' },
  { flag: '🇬🇧', name: 'United Kingdom', desc: 'World-class education' },
  { flag: '🇨🇦', name: 'Canada', desc: 'PR-friendly policies' },
  { flag: '🇦🇺', name: 'Australia', desc: 'Research & innovation' },
  { flag: '🇩🇪', name: 'Germany', desc: 'Low tuition fees' },
];

const AbroadConsultancy = () => {
  const navigate = useNavigate();
  const { isUnlocked } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isUnlocked('abroad-consultancy')) {
    return (
      <MobileFrame>
        <div className="flex flex-col min-h-[750px]">
          <div className="px-5 pt-4 pb-3 flex items-center gap-3">
            <button onClick={() => navigate('/dashboard')} className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <h1 className="text-lg font-bold font-display">Abroad Consultancy</h1>
          </div>
          <div className="flex-1 flex items-center">
            <LockedOverlay title="Abroad Consultancy Locked" description="Get expert guidance for studying abroad, university selection, and visa assistance." />
          </div>
          <BottomNav />
        </div>
      </MobileFrame>
    );
  }

  if (submitted) {
    return (
      <MobileFrame>
        <div className="flex flex-col items-center justify-center min-h-[750px] p-6 text-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-career-green/10 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-career-green" strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl font-black font-display">Request Sent!</h1>
          <p className="text-muted-foreground text-sm max-w-[260px]">Our abroad counselling team will contact you shortly.</p>
          <Button variant="hero" size="lg" onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
        </div>
      </MobileFrame>
    );
  }

  if (showForm) {
    return (
      <MobileFrame>
        <div className="flex flex-col min-h-[750px] p-5">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => setShowForm(false)} className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <h1 className="text-lg font-bold font-display">Consultation Form</h1>
          </div>
          <div className="flex flex-col gap-3.5 flex-1">
            {[
              { label: 'Preferred Country', placeholder: 'e.g., USA, UK, Canada' },
              { label: 'Course Interest', placeholder: 'e.g., MS in Computer Science' },
              { label: 'Budget Range', placeholder: 'e.g., ₹20-30 LPA' },
              { label: 'Preferred Intake', placeholder: 'e.g., Fall 2025' },
            ].map(f => (
              <div key={f.label}>
                <label className="text-xs font-bold font-display text-muted-foreground mb-1.5 block">{f.label}</label>
                <input placeholder={f.placeholder} className="input-field" />
              </div>
            ))}
            <div>
              <label className="text-xs font-bold font-display text-muted-foreground mb-1.5 block">Additional Message</label>
              <textarea
                placeholder="Any specific requirements..."
                className="w-full h-24 px-4 py-3 rounded-xl border border-border bg-card text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none transition-all"
              />
            </div>
            <Button variant="hero" size="lg" className="w-full mt-auto mb-4" onClick={() => setSubmitted(true)}>
              Submit Request
            </Button>
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
          <h1 className="text-lg font-bold font-display">Abroad Consultancy</h1>
        </div>
        <div className="flex-1 overflow-y-auto px-5 pb-4 space-y-4">
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-2xl bg-teal/10 flex items-center justify-center mx-auto mb-3">
              <Globe className="w-8 h-8 text-teal" strokeWidth={1.5} />
            </div>
            <h2 className="text-xl font-black font-display">Study Abroad</h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-[280px] mx-auto leading-relaxed">
              Get expert guidance on studying in top universities worldwide.
            </p>
          </div>
          <div className="space-y-2">
            {countries.map(c => (
              <div key={c.name} className="flex items-center gap-3 p-3.5 rounded-xl bg-card shadow-card border border-border/40">
                <span className="text-2xl">{c.flag}</span>
                <div>
                  <span className="font-bold font-display text-sm text-foreground">{c.name}</span>
                  <p className="text-[10px] text-muted-foreground">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <Button variant="hero" size="lg" className="w-full" onClick={() => setShowForm(true)}>
            Consult Now →
          </Button>
        </div>
        <BottomNav />
      </div>
    </MobileFrame>
  );
};

export default AbroadConsultancy;
