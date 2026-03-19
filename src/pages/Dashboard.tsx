import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import MobileFrame from '@/components/MobileFrame';
import BottomNav from '@/components/BottomNav';
import { useApp } from '@/contexts/AppContext';
import { Bell, BookOpen, Brain, GraduationCap, Building2, Users, Award, Globe, HelpCircle, Lock, ChevronRight, Star, Clock, MapPin, Calendar, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const moduleCards = [
  { path: '/career-library', label: 'Career Library', icon: BookOpen, color: 'bg-career-blue/10', iconColor: 'text-career-blue', locked: 'career-library' },
  { path: '/career-assessment', label: 'Assessment', icon: Brain, color: 'bg-career-purple/10', iconColor: 'text-career-purple', locked: false },
  { path: '/master-class', label: 'Master Class', icon: GraduationCap, color: 'bg-career-orange/10', iconColor: 'text-career-orange', locked: 'master-class' },
  { path: '/entrance-exam', label: 'Entrance Exam', icon: Calendar, color: 'bg-career-green/10', iconColor: 'text-career-green', locked: false },
  { path: '/institute', label: 'Institutes', icon: Building2, color: 'bg-career-pink/10', iconColor: 'text-career-pink', locked: false },
  { path: '/book-mentor', label: 'Book Mentor', icon: Users, color: 'bg-gold/10', iconColor: 'text-gold', locked: 'book-mentor' },
  { path: '/scholarship', label: 'Scholarships', icon: Award, color: 'bg-career-green/10', iconColor: 'text-career-green', locked: 'scholarship' },
  { path: '/quiz', label: 'Quiz', icon: HelpCircle, color: 'bg-career-blue/10', iconColor: 'text-career-blue', locked: false },
  { path: '/abroad', label: 'Study Abroad', icon: Globe, color: 'bg-teal/10', iconColor: 'text-teal', locked: 'abroad-consultancy' },
];

const featuredMentors = [
  { name: 'Dr. Priya Sharma', spec: 'Career Counselling', rating: 4.9, exp: '12 yrs', avatar: '👩‍⚕️' },
  { name: 'Prof. Rahul Verma', spec: 'Engineering', rating: 4.8, exp: '15 yrs', avatar: '👨‍🏫' },
  { name: 'Ms. Anjali Singh', spec: 'Design & Arts', rating: 4.7, exp: '8 yrs', avatar: '👩‍🎨' },
];

const featuredScholarships = [
  { name: 'INSPIRE Scholarship', amount: '₹80,000/yr', deadline: 'Mar 2025', tag: 'Merit Based' },
  { name: 'KVPY Fellowship', amount: '₹7,000/mo', deadline: 'Aug 2025', tag: 'Science' },
  { name: 'Pragati Scholarship', amount: '₹50,000/yr', deadline: 'Dec 2024', tag: 'Girls in Tech' },
];

const featuredInstitutes = [
  { name: 'IIT Bombay', location: 'Mumbai', type: 'Engineering', emoji: '🏛️' },
  { name: 'AIIMS Delhi', location: 'New Delhi', type: 'Medical', emoji: '🏥' },
  { name: 'IIM Ahmedabad', location: 'Gujarat', type: 'Business', emoji: '🎓' },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { state, isUnlocked } = useApp();

  return (
    <MobileFrame>
      <div className="flex flex-col min-h-[750px]">
        {/* Header */}
        <div className="px-5 pt-4 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center text-xl ring-2 ring-primary/20">
              👦
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground font-body">Good morning 👋</p>
              <h2 className="text-base font-bold font-display text-foreground">{state.user.name}</h2>
            </div>
          </div>
          <button
            onClick={() => navigate('/notifications')}
            className="relative w-10 h-10 rounded-xl bg-card shadow-card flex items-center justify-center border border-border/60"
          >
            <Bell className="w-[18px] h-[18px] text-foreground" strokeWidth={1.8} />
            <div className="absolute -top-0.5 -right-0.5 w-[18px] h-[18px] bg-primary rounded-full flex items-center justify-center">
              <span className="text-[9px] font-bold text-primary-foreground">3</span>
            </div>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 pb-4 space-y-5">
          {/* Assessment Hero Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-5 relative overflow-hidden"
          >
            <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-primary-foreground/5" />
            <div className="absolute right-4 top-4 text-5xl opacity-15">🎯</div>
            <div className="relative z-10">
              <div className="flex items-center gap-1.5 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                <span className="text-[10px] font-bold text-gold uppercase tracking-wider">Recommended</span>
              </div>
              <h3 className="text-lg font-extrabold font-display text-primary-foreground mb-1">
                Discover Your Career Strengths
              </h3>
              <p className="text-primary-foreground/60 text-xs mb-4 max-w-[220px] leading-relaxed">
                Take a psychometric test to find your ideal career path
              </p>
              <Button
                variant="secondary"
                size="default"
                onClick={() => navigate('/psychometric-test')}
                className="font-display shadow-md"
              >
                Take a Test →
              </Button>
            </div>
          </motion.div>

          {/* Module Grid */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="section-title">Explore Modules</h3>
            </div>
            <div className="grid grid-cols-3 gap-2.5">
              {moduleCards.map((card, i) => {
                const isLocked = card.locked && !isUnlocked(card.locked as string);
                const Icon = card.icon;
                return (
                  <motion.button
                    key={card.path}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => navigate(card.path)}
                    className="relative flex flex-col items-center gap-1.5 p-3 rounded-xl bg-card shadow-card border border-border/40 transition-all duration-200 active:scale-[0.96] hover:shadow-card-hover"
                  >
                    {isLocked && (
                      <div className="absolute top-1.5 right-1.5">
                        <Lock className="w-2.5 h-2.5 text-muted-foreground/60" />
                      </div>
                    )}
                    <div className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${card.iconColor}`} strokeWidth={1.8} />
                    </div>
                    <span className="text-[10px] font-bold font-display text-foreground leading-tight text-center">
                      {card.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Explore Mentors */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="section-title">Explore Your Mentors</h3>
              <button onClick={() => navigate('/book-mentor')} className="text-xs text-primary font-bold font-display">See all</button>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
              {featuredMentors.map((m, i) => (
                <motion.button
                  key={m.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => navigate('/book-mentor')}
                  className="flex-shrink-0 w-[160px] p-4 rounded-xl bg-card shadow-card border border-border/40 text-center active:scale-[0.97] transition-all"
                >
                  <div className="text-4xl mb-2">{m.avatar}</div>
                  <h4 className="text-xs font-bold font-display text-foreground truncate">{m.name}</h4>
                  <p className="text-[10px] text-primary font-semibold mt-0.5">{m.spec}</p>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
                      <Star className="w-3 h-3 text-gold fill-gold" />{m.rating}
                    </span>
                    <span className="text-[10px] text-muted-foreground">{m.exp}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Explore Scholarships */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="section-title">Explore Scholarships</h3>
              <button onClick={() => navigate('/scholarship')} className="text-xs text-primary font-bold font-display">See all</button>
            </div>
            <div className="space-y-2.5">
              {featuredScholarships.map((s, i) => (
                <motion.button
                  key={s.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => navigate('/scholarship')}
                  className="w-full flex items-center gap-3 p-3.5 rounded-xl bg-card shadow-card border border-border/40 text-left active:scale-[0.98] transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-career-green/10 flex items-center justify-center flex-shrink-0">
                    <Award className="w-5 h-5 text-career-green" strokeWidth={1.8} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold font-display text-foreground truncate">{s.name}</h4>
                    <p className="text-[10px] text-career-green font-bold mt-0.5">{s.amount}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-primary/8 text-primary">{s.tag}</span>
                    <p className="text-[10px] text-muted-foreground mt-1">{s.deadline}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Explore Institutes */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="section-title">Explore Institutes</h3>
              <button onClick={() => navigate('/institute')} className="text-xs text-primary font-bold font-display">See all</button>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
              {featuredInstitutes.map((inst, i) => (
                <motion.button
                  key={inst.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => navigate('/institute')}
                  className="flex-shrink-0 w-[150px] p-4 rounded-xl bg-card shadow-card border border-border/40 text-center active:scale-[0.97] transition-all"
                >
                  <div className="text-3xl mb-2">{inst.emoji}</div>
                  <h4 className="text-xs font-bold font-display text-foreground">{inst.name}</h4>
                  <p className="text-[10px] text-muted-foreground flex items-center justify-center gap-0.5 mt-1">
                    <MapPin className="w-2.5 h-2.5" />{inst.location}
                  </p>
                  <span className="inline-block mt-1.5 text-[9px] font-bold px-2 py-0.5 rounded-full bg-career-blue/10 text-career-blue">{inst.type}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card-elevated p-4">
            <h3 className="section-title mb-3">Quick Actions</h3>
            {[
              { label: 'View Subscription Plans', path: '/subscription', icon: Sparkles, iconColor: 'text-gold' },
              { label: 'Your Test History', path: '/profile', icon: Clock, iconColor: 'text-career-blue' },
              { label: 'Saved Careers', path: '/profile', icon: Star, iconColor: 'text-career-orange' },
            ].map(item => (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className="flex items-center justify-between w-full py-3 border-b border-border/60 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                    <item.icon className={`w-4 h-4 ${item.iconColor}`} strokeWidth={1.8} />
                  </div>
                  <span className="text-sm font-semibold font-display text-foreground">{item.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>
            ))}
          </div>
        </div>

        <BottomNav />
      </div>
    </MobileFrame>
  );
};

export default Dashboard;
