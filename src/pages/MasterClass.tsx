import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import MobileFrame from '@/components/MobileFrame';
import BottomNav from '@/components/BottomNav';
import { ArrowLeft, Lock, Play, Clock, ExternalLink } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';

const masterDomains = [
  { name: 'Engineering', emoji: '⚙️', count: '24 videos' },
  { name: 'Medical', emoji: '🏥', count: '18 videos' },
  { name: 'Business', emoji: '💼', count: '15 videos' },
  { name: 'Design', emoji: '🎨', count: '12 videos' },
  { name: 'Technology', emoji: '💻', count: '20 videos' },
  { name: 'Law', emoji: '⚖️', count: '10 videos' },
];

const domainCategories: Record<string, { name: string; emoji: string; videoCount: string }[]> = {
  Engineering: [
    { name: 'Career Guidance', emoji: '🧭', videoCount: '6 videos' },
    { name: 'JEE Preparation', emoji: '📝', videoCount: '8 videos' },
    { name: 'Branch Selection', emoji: '🔀', videoCount: '5 videos' },
    { name: 'College Life & Tips', emoji: '🎓', videoCount: '5 videos' },
  ],
  Medical: [
    { name: 'NEET Preparation', emoji: '📝', videoCount: '7 videos' },
    { name: 'Medical Career Paths', emoji: '🩺', videoCount: '5 videos' },
    { name: 'Specialization Guide', emoji: '🔬', videoCount: '4 videos' },
    { name: 'Study Abroad (Medical)', emoji: '🌍', videoCount: '2 videos' },
  ],
  Business: [
    { name: 'MBA Preparation', emoji: '📚', videoCount: '5 videos' },
    { name: 'Entrepreneurship', emoji: '🚀', videoCount: '4 videos' },
    { name: 'Finance Careers', emoji: '💰', videoCount: '3 videos' },
    { name: 'Marketing & Sales', emoji: '📢', videoCount: '3 videos' },
  ],
  Design: [
    { name: 'UX/UI Design', emoji: '📱', videoCount: '4 videos' },
    { name: 'Fashion Design', emoji: '👗', videoCount: '3 videos' },
    { name: 'Animation & VFX', emoji: '🎬', videoCount: '3 videos' },
    { name: 'Architecture', emoji: '🏛️', videoCount: '2 videos' },
  ],
  Technology: [
    { name: 'AI & Machine Learning', emoji: '🤖', videoCount: '6 videos' },
    { name: 'Web Development', emoji: '🌐', videoCount: '5 videos' },
    { name: 'Cybersecurity', emoji: '🔒', videoCount: '4 videos' },
    { name: 'Data Science', emoji: '📊', videoCount: '5 videos' },
  ],
  Law: [
    { name: 'CLAT Preparation', emoji: '📝', videoCount: '4 videos' },
    { name: 'Legal Career Paths', emoji: '⚖️', videoCount: '3 videos' },
    { name: 'Corporate Law', emoji: '🏢', videoCount: '3 videos' },
  ],
};

const categoryVideos: Record<string, { title: string; mentor: string; duration: string; locked: boolean; url: string }[]> = {
  // Engineering
  'Career Guidance': [
    { title: 'How to Choose the Right Engineering Branch', mentor: 'Dr. Rajesh Kumar', duration: '15 min', locked: true, url: 'https://youtube.com/watch?v=example1' },
    { title: 'Top 10 Engineering Colleges in India', mentor: 'Prof. Anita Sharma', duration: '20 min', locked: true, url: 'https://youtube.com/watch?v=example2' },
    { title: 'Engineering vs Pure Sciences - What to Choose?', mentor: 'Mr. Vikram Singh', duration: '12 min', locked: false, url: 'https://youtube.com/watch?v=example3' },
    { title: 'Career Opportunities After B.Tech', mentor: 'Ms. Priya Mehta', duration: '18 min', locked: true, url: 'https://youtube.com/watch?v=example4' },
    { title: 'Day in the Life of an Engineer', mentor: 'Er. Suresh Patel', duration: '10 min', locked: false, url: 'https://youtube.com/watch?v=example5' },
    { title: 'Engineering Abroad: Is It Worth It?', mentor: 'Dr. Kavita Nair', duration: '22 min', locked: true, url: 'https://youtube.com/watch?v=example6' },
  ],
  'JEE Preparation': [
    { title: 'JEE Main 2025 - Complete Strategy', mentor: 'Mr. Arun Mishra', duration: '25 min', locked: true, url: 'https://youtube.com/watch?v=jee1' },
    { title: 'Physics Tips for JEE Advanced', mentor: 'Prof. Deepak Joshi', duration: '18 min', locked: true, url: 'https://youtube.com/watch?v=jee2' },
    { title: 'Mathematics Problem Solving for JEE', mentor: 'Ms. Rekha Gupta', duration: '22 min', locked: false, url: 'https://youtube.com/watch?v=jee3' },
    { title: 'Chemistry Quick Revision Techniques', mentor: 'Dr. Manish Verma', duration: '15 min', locked: true, url: 'https://youtube.com/watch?v=jee4' },
  ],
  'Branch Selection': [
    { title: 'Computer Science vs IT - The Real Difference', mentor: 'Prof. Sneha Patel', duration: '14 min', locked: false, url: 'https://youtube.com/watch?v=branch1' },
    { title: 'Mechanical vs Electrical Engineering', mentor: 'Er. Rahul Desai', duration: '16 min', locked: true, url: 'https://youtube.com/watch?v=branch2' },
    { title: 'Emerging Branches: AI, Robotics, Data Science', mentor: 'Dr. Amit Kulkarni', duration: '20 min', locked: true, url: 'https://youtube.com/watch?v=branch3' },
  ],
  'College Life & Tips': [
    { title: 'How to Make the Most of College', mentor: 'Mr. Karan Oberoi', duration: '12 min', locked: false, url: 'https://youtube.com/watch?v=college1' },
    { title: 'Internship Strategies for Engineers', mentor: 'Ms. Neha Agarwal', duration: '15 min', locked: true, url: 'https://youtube.com/watch?v=college2' },
  ],
  // Medical
  'NEET Preparation': [
    { title: 'NEET 2025 - Complete Roadmap', mentor: 'Dr. Sanjay Gupta', duration: '30 min', locked: true, url: 'https://youtube.com/watch?v=neet1' },
    { title: 'Biology Mastery for NEET', mentor: 'Prof. Meera Iyer', duration: '22 min', locked: false, url: 'https://youtube.com/watch?v=neet2' },
    { title: 'Physics & Chemistry Strategy for NEET', mentor: 'Dr. Rakesh Sharma', duration: '20 min', locked: true, url: 'https://youtube.com/watch?v=neet3' },
  ],
  'Medical Career Paths': [
    { title: 'MBBS to MD - The Complete Journey', mentor: 'Dr. Prerna Singh', duration: '25 min', locked: true, url: 'https://youtube.com/watch?v=med1' },
    { title: 'Dentistry as a Career', mentor: 'Dr. Ritu Kapoor', duration: '15 min', locked: false, url: 'https://youtube.com/watch?v=med2' },
    { title: 'Pharmacy vs Nursing - Career Comparison', mentor: 'Dr. Ashok Kumar', duration: '18 min', locked: true, url: 'https://youtube.com/watch?v=med3' },
  ],
  'Specialization Guide': [
    { title: 'Top Medical Specializations in India', mentor: 'Dr. Vivek Jain', duration: '20 min', locked: true, url: 'https://youtube.com/watch?v=spec1' },
    { title: 'Cardiology vs Neurology - Which to Choose?', mentor: 'Dr. Sunita Rao', duration: '18 min', locked: true, url: 'https://youtube.com/watch?v=spec2' },
  ],
  'Study Abroad (Medical)': [
    { title: 'MBBS Abroad - Countries & Costs', mentor: 'Dr. Alok Mehta', duration: '22 min', locked: true, url: 'https://youtube.com/watch?v=abroad1' },
  ],
  // Business
  'MBA Preparation': [
    { title: 'CAT Exam Strategy - Score 99+ Percentile', mentor: 'Prof. Nitin Sharma', duration: '28 min', locked: true, url: 'https://youtube.com/watch?v=cat1' },
    { title: 'MBA vs Direct Job After Graduation', mentor: 'Mr. Rohit Bansal', duration: '15 min', locked: false, url: 'https://youtube.com/watch?v=cat2' },
  ],
  'Entrepreneurship': [
    { title: 'Starting Up While in College', mentor: 'Ms. Shreya Ghoshal', duration: '20 min', locked: false, url: 'https://youtube.com/watch?v=entre1' },
    { title: 'Building a Business Plan', mentor: 'Mr. Arvind Kejriwal', duration: '18 min', locked: true, url: 'https://youtube.com/watch?v=entre2' },
  ],
  'Finance Careers': [
    { title: 'Career in Investment Banking', mentor: 'Mr. Rajeev Mishra', duration: '22 min', locked: true, url: 'https://youtube.com/watch?v=fin1' },
  ],
  'Marketing & Sales': [
    { title: 'Digital Marketing Career Guide', mentor: 'Ms. Pallavi Sinha', duration: '16 min', locked: false, url: 'https://youtube.com/watch?v=mkt1' },
  ],
  // Technology
  'AI & Machine Learning': [
    { title: 'Career in AI & Machine Learning', mentor: 'Prof. Sneha Patel', duration: '22 min', locked: true, url: 'https://youtube.com/watch?v=ai1' },
    { title: 'How to Start with Machine Learning', mentor: 'Dr. Ramesh Narayan', duration: '18 min', locked: false, url: 'https://youtube.com/watch?v=ai2' },
    { title: 'AI Job Market in India 2025', mentor: 'Ms. Divya Sharma', duration: '15 min', locked: true, url: 'https://youtube.com/watch?v=ai3' },
  ],
  'Web Development': [
    { title: 'Full Stack Development Roadmap', mentor: 'Mr. Harsh Agarwal', duration: '20 min', locked: false, url: 'https://youtube.com/watch?v=web1' },
    { title: 'Frontend vs Backend - Which to Choose?', mentor: 'Ms. Ananya Reddy', duration: '14 min', locked: true, url: 'https://youtube.com/watch?v=web2' },
  ],
  'Cybersecurity': [
    { title: 'Career in Cybersecurity', mentor: 'Mr. Aman Gupta', duration: '18 min', locked: true, url: 'https://youtube.com/watch?v=cyber1' },
  ],
  'Data Science': [
    { title: 'Data Science vs Data Analytics', mentor: 'Dr. Pooja Mehta', duration: '16 min', locked: false, url: 'https://youtube.com/watch?v=ds1' },
    { title: 'Python for Data Science - Getting Started', mentor: 'Prof. Sunil Kumar', duration: '22 min', locked: true, url: 'https://youtube.com/watch?v=ds2' },
  ],
  // Design
  'UX/UI Design': [
    { title: 'UX Design Career Path', mentor: 'Ms. Ria Kapoor', duration: '15 min', locked: false, url: 'https://youtube.com/watch?v=ux1' },
    { title: 'Tools Every Designer Should Know', mentor: 'Mr. Sahil Verma', duration: '12 min', locked: true, url: 'https://youtube.com/watch?v=ux2' },
  ],
  'Fashion Design': [
    { title: 'Career in Fashion Design', mentor: 'Ms. Nandita Das', duration: '18 min', locked: true, url: 'https://youtube.com/watch?v=fashion1' },
  ],
  'Animation & VFX': [
    { title: 'Animation Industry in India', mentor: 'Mr. Rajat Kapoor', duration: '20 min', locked: false, url: 'https://youtube.com/watch?v=anim1' },
  ],
  'Architecture': [
    { title: 'Becoming an Architect in India', mentor: 'Ar. Meena Srinivasan', duration: '22 min', locked: true, url: 'https://youtube.com/watch?v=arch1' },
  ],
  // Law
  'CLAT Preparation': [
    { title: 'CLAT 2025 - Complete Strategy', mentor: 'Adv. Rahul Mehra', duration: '25 min', locked: true, url: 'https://youtube.com/watch?v=clat1' },
    { title: 'Legal Reasoning Tips for CLAT', mentor: 'Prof. Sita Ram', duration: '18 min', locked: false, url: 'https://youtube.com/watch?v=clat2' },
  ],
  'Legal Career Paths': [
    { title: 'Careers After Law School', mentor: 'Adv. Priya Nair', duration: '20 min', locked: true, url: 'https://youtube.com/watch?v=law1' },
  ],
  'Corporate Law': [
    { title: 'Corporate Law as a Career', mentor: 'Adv. Vikram Chadha', duration: '18 min', locked: true, url: 'https://youtube.com/watch?v=corp1' },
  ],
};

const MasterClass = () => {
  const navigate = useNavigate();
  const { isUnlocked } = useApp();
  const [level, setLevel] = useState(0);
  const [selectedDomain, setSelectedDomain] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const unlocked = isUnlocked('master-class');

  const goBack = () => {
    if (level > 0) setLevel(l => l - 1);
    else navigate('/dashboard');
  };

  const getTitle = () => {
    switch (level) {
      case 0: return 'Master Class';
      case 1: return selectedDomain;
      case 2: return selectedCategory;
      default: return 'Master Class';
    }
  };

  return (
    <MobileFrame>
      <div className="flex flex-col min-h-[750px]">
        <div className="px-5 pt-4 pb-3 flex items-center gap-3">
          <button onClick={goBack} className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <h1 className="text-lg font-bold font-display">{getTitle()}</h1>
        </div>

        <div className="flex-1 overflow-y-auto px-5 pb-4">
          {/* Level 0: Domains */}
          {level === 0 && (
            <div className="space-y-2.5">
              <p className="text-sm text-muted-foreground mb-1">Choose a domain to explore classes</p>
              {masterDomains.map((d, i) => (
                <motion.button
                  key={d.name}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => { setSelectedDomain(d.name); setLevel(1); }}
                  className="w-full flex items-center gap-3.5 p-4 rounded-xl bg-card shadow-card border border-border/40 active:scale-[0.98] transition-all"
                >
                  <div className="w-11 h-11 rounded-xl bg-career-orange/10 flex items-center justify-center text-2xl">{d.emoji}</div>
                  <div className="text-left flex-1">
                    <span className="font-bold font-display text-foreground text-sm">{d.name}</span>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{d.count}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          )}

          {/* Level 1: Categories */}
          {level === 1 && (
            <div className="space-y-2.5">
              <p className="text-sm text-muted-foreground mb-1">Select a category</p>
              {(domainCategories[selectedDomain] || []).map((cat, i) => (
                <motion.button
                  key={cat.name}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => { setSelectedCategory(cat.name); setLevel(2); }}
                  className="w-full flex items-center justify-between p-4 rounded-xl bg-card shadow-card border border-border/40 active:scale-[0.98] transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/8 flex items-center justify-center text-xl">{cat.emoji}</div>
                    <div className="text-left">
                      <span className="font-bold font-display text-foreground text-sm">{cat.name}</span>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{cat.videoCount}</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 text-muted-foreground">›</div>
                </motion.button>
              ))}
            </div>
          )}

          {/* Level 2: Video Links */}
          {level === 2 && (
            <div className="space-y-3">
              {(categoryVideos[selectedCategory] || []).map((v, i) => {
                const isLocked = v.locked && !unlocked;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`relative p-4 rounded-xl bg-card shadow-card border border-border/40 ${isLocked ? 'opacity-75' : ''}`}
                  >
                    <div className="flex items-start gap-3.5">
                      <div className={`w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 ${isLocked ? 'bg-muted' : 'bg-primary/8'}`}>
                        {isLocked ? (
                          <Lock className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
                        ) : (
                          <Play className="w-6 h-6 text-primary" strokeWidth={1.5} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold font-display text-sm text-foreground leading-snug">{v.title}</h3>
                        <p className="text-[11px] text-muted-foreground mt-1">{v.mentor}</p>
                        <div className="flex items-center gap-3 mt-1.5">
                          <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                            <Clock className="w-3 h-3" /> {v.duration}
                          </div>
                        </div>
                      </div>
                    </div>
                    {isLocked ? (
                      <Button
                        variant="locked"
                        size="sm"
                        className="w-full mt-3"
                        onClick={() => navigate('/subscription')}
                      >
                        <Lock className="w-3 h-3" /> Subscribe to Watch
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full mt-3 gap-2"
                        onClick={() => window.open(v.url, '_blank')}
                      >
                        <ExternalLink className="w-3 h-3" /> Watch Video
                      </Button>
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
        <BottomNav />
      </div>
    </MobileFrame>
  );
};

export default MasterClass;
