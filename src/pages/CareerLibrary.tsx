import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import MobileFrame from '@/components/MobileFrame';
import BottomNav from '@/components/BottomNav';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import LockedOverlay from '@/components/LockedOverlay';

const streams = [
  { name: 'Science', emoji: '🔬', desc: 'Medical, Engineering & Research' },
  { name: 'Commerce', emoji: '📊', desc: 'Business, Finance & Accounting' },
  { name: 'Arts & Humanities', emoji: '🎨', desc: 'Design, Media & Social Work' },
  { name: 'Vocational', emoji: '🔧', desc: 'Hospitality, Fashion & More' },
  { name: 'Neutral', emoji: '⚡', desc: 'Law, Education & Defence' },
];

// Level 1: Stream → Categories
const categories: Record<string, { name: string; emoji: string }[]> = {
  Science: [
    { name: 'Medical', emoji: '🏥' },
    { name: 'Engineering', emoji: '⚙️' },
    { name: 'Pure Sciences', emoji: '🔬' },
    { name: 'Agriculture & Allied', emoji: '🌾' },
  ],
  Commerce: [
    { name: 'Business Management', emoji: '💼' },
    { name: 'Finance & Banking', emoji: '💰' },
    { name: 'Accounting & Taxation', emoji: '📋' },
    { name: 'Marketing & Advertising', emoji: '📢' },
  ],
  'Arts & Humanities': [
    { name: 'Design & Fine Arts', emoji: '🎨' },
    { name: 'Media & Journalism', emoji: '📺' },
    { name: 'Literature & Languages', emoji: '📖' },
    { name: 'Social Sciences', emoji: '🤝' },
  ],
  Vocational: [
    { name: 'Hospitality & Tourism', emoji: '🏨' },
    { name: 'Fashion & Textile', emoji: '👗' },
    { name: 'Agriculture & Dairy', emoji: '🌾' },
    { name: 'Automotive & Mechanical', emoji: '🚗' },
  ],
  Neutral: [
    { name: 'Law & Legal Studies', emoji: '⚖️' },
    { name: 'Education & Teaching', emoji: '📚' },
    { name: 'Defence & Security', emoji: '🎖️' },
    { name: 'Sports & Fitness', emoji: '⚽' },
  ],
};

// Level 2: Category → 2nd Category (Programs/Degrees)
const secondCategories: Record<string, { name: string; emoji: string }[]> = {
  // Science > Medical
  Medical: [
    { name: 'MBBS', emoji: '🩺' },
    { name: 'BDS (Dentistry)', emoji: '🦷' },
    { name: 'BAMS (Ayurveda)', emoji: '🌿' },
    { name: 'B.Pharm (Pharmacy)', emoji: '💊' },
    { name: 'B.Sc Nursing', emoji: '🏥' },
    { name: 'BPT (Physiotherapy)', emoji: '🦴' },
  ],
  // Science > Engineering
  Engineering: [
    { name: 'B.Tech / B.E.', emoji: '⚙️' },
    { name: 'M.Tech', emoji: '🎓' },
    { name: 'Diploma Engineering', emoji: '📐' },
    { name: 'B.Arch (Architecture)', emoji: '🏛️' },
  ],
  // Science > Pure Sciences
  'Pure Sciences': [
    { name: 'B.Sc Physics', emoji: '⚛️' },
    { name: 'B.Sc Chemistry', emoji: '🧪' },
    { name: 'B.Sc Mathematics', emoji: '📐' },
    { name: 'B.Sc Biology', emoji: '🧬' },
    { name: 'M.Sc Programs', emoji: '🎓' },
  ],
  'Agriculture & Allied': [
    { name: 'B.Sc Agriculture', emoji: '🌱' },
    { name: 'B.V.Sc (Veterinary)', emoji: '🐾' },
    { name: 'B.F.Sc (Fisheries)', emoji: '🐟' },
    { name: 'B.Sc Forestry', emoji: '🌲' },
  ],
  // Commerce categories
  'Business Management': [
    { name: 'BBA', emoji: '💼' },
    { name: 'MBA', emoji: '🎓' },
    { name: 'BMS', emoji: '📊' },
    { name: 'Entrepreneurship', emoji: '🚀' },
  ],
  'Finance & Banking': [
    { name: 'B.Com (Hons)', emoji: '📋' },
    { name: 'CA (Chartered Accountant)', emoji: '📈' },
    { name: 'CFA', emoji: '💹' },
    { name: 'Banking & Insurance', emoji: '🏦' },
  ],
  'Accounting & Taxation': [
    { name: 'B.Com', emoji: '📋' },
    { name: 'CA Foundation', emoji: '📈' },
    { name: 'CS (Company Secretary)', emoji: '📜' },
    { name: 'CMA', emoji: '📊' },
  ],
  'Marketing & Advertising': [
    { name: 'BBA Marketing', emoji: '📢' },
    { name: 'B.Com Advertising', emoji: '🎯' },
    { name: 'Digital Marketing', emoji: '💻' },
    { name: 'MBA Marketing', emoji: '🎓' },
  ],
  // Arts categories
  'Design & Fine Arts': [
    { name: 'B.Des', emoji: '🎨' },
    { name: 'B.F.A', emoji: '🖌️' },
    { name: 'M.Des', emoji: '🎓' },
    { name: 'Animation & VFX', emoji: '🎬' },
  ],
  'Media & Journalism': [
    { name: 'B.A Journalism', emoji: '📰' },
    { name: 'BJMC', emoji: '🎙️' },
    { name: 'Film Making', emoji: '🎥' },
    { name: 'Mass Communication', emoji: '📺' },
  ],
  'Literature & Languages': [
    { name: 'B.A English', emoji: '📖' },
    { name: 'B.A Hindi', emoji: '📝' },
    { name: 'Foreign Languages', emoji: '🌍' },
    { name: 'M.A Literature', emoji: '🎓' },
  ],
  'Social Sciences': [
    { name: 'B.A Psychology', emoji: '🧠' },
    { name: 'B.A Sociology', emoji: '👥' },
    { name: 'B.A Political Science', emoji: '🏛️' },
    { name: 'B.S.W (Social Work)', emoji: '🤝' },
  ],
  // Vocational
  'Hospitality & Tourism': [
    { name: 'BHM (Hotel Mgmt)', emoji: '🏨' },
    { name: 'B.Sc Hospitality', emoji: '🍽️' },
    { name: 'Tourism Management', emoji: '✈️' },
    { name: 'Culinary Arts', emoji: '👨‍🍳' },
  ],
  'Fashion & Textile': [
    { name: 'B.Des Fashion', emoji: '👗' },
    { name: 'Textile Design', emoji: '🧵' },
    { name: 'Fashion Technology', emoji: '✂️' },
    { name: 'Apparel Management', emoji: '👔' },
  ],
  'Agriculture & Dairy': [
    { name: 'Dairy Technology', emoji: '🥛' },
    { name: 'Food Technology', emoji: '🍕' },
    { name: 'Horticulture', emoji: '🌺' },
    { name: 'Sericulture', emoji: '🦋' },
  ],
  'Automotive & Mechanical': [
    { name: 'Auto Engineering', emoji: '🚗' },
    { name: 'Mechanical Diploma', emoji: '🔧' },
    { name: 'ITI Courses', emoji: '🛠️' },
    { name: 'EV Technology', emoji: '⚡' },
  ],
  // Neutral
  'Law & Legal Studies': [
    { name: 'BA LLB (5 Year)', emoji: '⚖️' },
    { name: 'LLB (3 Year)', emoji: '📜' },
    { name: 'LLM', emoji: '🎓' },
    { name: 'Corporate Law', emoji: '🏢' },
  ],
  'Education & Teaching': [
    { name: 'B.Ed', emoji: '📚' },
    { name: 'D.El.Ed', emoji: '✏️' },
    { name: 'M.Ed', emoji: '🎓' },
    { name: 'Special Education', emoji: '🌟' },
  ],
  'Defence & Security': [
    { name: 'NDA', emoji: '🎖️' },
    { name: 'CDS', emoji: '⭐' },
    { name: 'Indian Navy', emoji: '⚓' },
    { name: 'Air Force', emoji: '✈️' },
  ],
  'Sports & Fitness': [
    { name: 'B.P.Ed', emoji: '🏃' },
    { name: 'Sports Management', emoji: '🏆' },
    { name: 'Sports Science', emoji: '🧬' },
    { name: 'Yoga & Naturopathy', emoji: '🧘' },
  ],
};

// Level 3: 2nd Category → Sub Categories (Specializations)
const subCategories: Record<string, { name: string; emoji: string }[]> = {
  // Engineering > B.Tech
  'B.Tech / B.E.': [
    { name: 'Computer Science', emoji: '💻' },
    { name: 'Electronics & Communication', emoji: '📡' },
    { name: 'Mechanical Engineering', emoji: '⚙️' },
    { name: 'Civil Engineering', emoji: '🏗️' },
    { name: 'Electrical Engineering', emoji: '⚡' },
    { name: 'Chemical Engineering', emoji: '🧪' },
    { name: 'Aerospace Engineering', emoji: '🚀' },
    { name: 'Information Technology', emoji: '🌐' },
  ],
  'M.Tech': [
    { name: 'AI & Machine Learning', emoji: '🤖' },
    { name: 'Data Science', emoji: '📊' },
    { name: 'VLSI Design', emoji: '🔌' },
    { name: 'Structural Engineering', emoji: '🏛️' },
    { name: 'Robotics', emoji: '🦾' },
  ],
  'Diploma Engineering': [
    { name: 'Diploma in CS', emoji: '💻' },
    { name: 'Diploma in Mech', emoji: '⚙️' },
    { name: 'Diploma in Civil', emoji: '🏗️' },
    { name: 'Diploma in Electrical', emoji: '⚡' },
  ],
  'B.Arch (Architecture)': [
    { name: 'Residential Design', emoji: '🏠' },
    { name: 'Urban Planning', emoji: '🏙️' },
    { name: 'Landscape Architecture', emoji: '🌳' },
    { name: 'Interior Design', emoji: '🛋️' },
  ],
  // Medical
  MBBS: [
    { name: 'General Medicine', emoji: '🩺' },
    { name: 'Surgery', emoji: '🔪' },
    { name: 'Pediatrics', emoji: '👶' },
    { name: 'Orthopedics', emoji: '🦴' },
    { name: 'Dermatology', emoji: '🧴' },
    { name: 'Cardiology', emoji: '❤️' },
    { name: 'Neurology', emoji: '🧠' },
    { name: 'Ophthalmology', emoji: '👁️' },
  ],
  'BDS (Dentistry)': [
    { name: 'Orthodontics', emoji: '🦷' },
    { name: 'Oral Surgery', emoji: '🔪' },
    { name: 'Prosthodontics', emoji: '🦷' },
    { name: 'Periodontics', emoji: '🦷' },
  ],
  'BAMS (Ayurveda)': [
    { name: 'Panchakarma', emoji: '🌿' },
    { name: 'Kayachikitsa', emoji: '🍃' },
    { name: 'Shalya Tantra', emoji: '🌱' },
  ],
  'B.Pharm (Pharmacy)': [
    { name: 'Pharmaceutical Chemistry', emoji: '🧪' },
    { name: 'Pharmacology', emoji: '💊' },
    { name: 'Clinical Pharmacy', emoji: '🏥' },
    { name: 'Drug Design', emoji: '🔬' },
  ],
  'B.Sc Nursing': [
    { name: 'Critical Care Nursing', emoji: '🏥' },
    { name: 'Community Nursing', emoji: '🤝' },
    { name: 'Pediatric Nursing', emoji: '👶' },
  ],
  'BPT (Physiotherapy)': [
    { name: 'Sports Physiotherapy', emoji: '🏃' },
    { name: 'Neuro Physiotherapy', emoji: '🧠' },
    { name: 'Ortho Physiotherapy', emoji: '🦴' },
  ],
  // Commerce
  BBA: [
    { name: 'General Management', emoji: '💼' },
    { name: 'International Business', emoji: '🌍' },
    { name: 'Human Resource', emoji: '👥' },
    { name: 'Operations', emoji: '📊' },
  ],
  MBA: [
    { name: 'MBA Finance', emoji: '💰' },
    { name: 'MBA Marketing', emoji: '📢' },
    { name: 'MBA HR', emoji: '👥' },
    { name: 'MBA Operations', emoji: '⚙️' },
    { name: 'MBA IT', emoji: '💻' },
  ],
  'CA (Chartered Accountant)': [
    { name: 'Audit & Assurance', emoji: '🔍' },
    { name: 'Taxation', emoji: '📋' },
    { name: 'Financial Reporting', emoji: '📈' },
    { name: 'Corporate Law', emoji: '⚖️' },
  ],
  // Arts
  'B.Des': [
    { name: 'Product Design', emoji: '📱' },
    { name: 'Communication Design', emoji: '🎨' },
    { name: 'UX/UI Design', emoji: '💻' },
    { name: 'Industrial Design', emoji: '🏭' },
  ],
  'B.A Journalism': [
    { name: 'Print Journalism', emoji: '📰' },
    { name: 'Digital Media', emoji: '📱' },
    { name: 'Broadcast Journalism', emoji: '📺' },
  ],
  // Law
  'BA LLB (5 Year)': [
    { name: 'Criminal Law', emoji: '🔒' },
    { name: 'Corporate Law', emoji: '🏢' },
    { name: 'Constitutional Law', emoji: '📜' },
    { name: 'International Law', emoji: '🌍' },
  ],
};

// Career details mapped by sub-category
const careerDetails: Record<string, {
  title: string;
  overview: string;
  path: string[];
  education: string;
  exams: string[];
  jobs: string[];
  salary: string;
  institutes: string[];
}> = {
  'Computer Science': {
    title: 'Computer Science Engineering',
    overview: 'Computer Science engineers design, develop, test and maintain software applications, systems, and networks. They work across domains like AI, web development, cybersecurity, and cloud computing.',
    path: ['10+2 (Science/Maths)', 'B.Tech/B.E. in CS/IT', 'Internships & Projects', 'Junior Developer', 'Senior Engineer', 'Tech Lead / Architect'],
    education: 'B.Tech/B.E. in Computer Science, MCA, M.Tech in CS',
    exams: ['JEE Main', 'JEE Advanced', 'BITSAT', 'VITEEE', 'COMEDK'],
    jobs: ['Software Developer', 'Full Stack Engineer', 'DevOps Engineer', 'Data Scientist', 'System Architect'],
    salary: '₹4-25 LPA (varies by experience & company)',
    institutes: ['IIT Bombay', 'IIT Delhi', 'IIT Madras', 'BITS Pilani', 'NIT Trichy', 'IIIT Hyderabad'],
  },
  'General Medicine': {
    title: 'General Medicine (MD)',
    overview: 'General Medicine involves the diagnosis, treatment, and prevention of adult diseases. Physicians in general medicine handle a wide range of health conditions and serve as the first point of contact for patients.',
    path: ['10+2 (PCB)', 'MBBS (5.5 years)', 'Internship (1 year)', 'MD General Medicine (3 years)', 'Senior Resident', 'Consultant / Professor'],
    education: 'MBBS followed by MD in General Medicine',
    exams: ['NEET UG', 'NEET PG', 'AIIMS', 'JIPMER'],
    jobs: ['General Physician', 'Consultant', 'Hospital Medical Officer', 'Academic Professor', 'ICU Specialist'],
    salary: '₹8-30 LPA (varies by hospital & experience)',
    institutes: ['AIIMS Delhi', 'CMC Vellore', 'JIPMER', 'Maulana Azad Medical College', 'KEM Mumbai'],
  },
  'Surgery': {
    title: 'General Surgery (MS)',
    overview: 'Surgeons perform operations to treat injuries, diseases, and deformities. General surgery covers a broad range of conditions including abdominal, trauma, oncologic, and endocrine surgeries.',
    path: ['10+2 (PCB)', 'MBBS (5.5 years)', 'Internship', 'MS General Surgery (3 years)', 'MCh Specialization', 'Senior Surgeon'],
    education: 'MBBS + MS in General Surgery, MCh for super-specialization',
    exams: ['NEET UG', 'NEET PG', 'NEET SS'],
    jobs: ['General Surgeon', 'Laparoscopic Surgeon', 'Trauma Surgeon', 'Surgical Oncologist'],
    salary: '₹10-50 LPA',
    institutes: ['AIIMS Delhi', 'PGI Chandigarh', 'CMC Vellore', 'SGPGI Lucknow'],
  },
  'Cardiology': {
    title: 'Cardiology',
    overview: 'Cardiologists specialize in diagnosing and treating diseases of the heart and blood vessels. They manage conditions like heart attacks, heart failure, arrhythmias, and congenital heart defects.',
    path: ['10+2 (PCB)', 'MBBS', 'MD General Medicine', 'DM Cardiology (3 years)', 'Consultant Cardiologist'],
    education: 'MBBS + MD + DM Cardiology',
    exams: ['NEET UG', 'NEET PG', 'NEET SS'],
    jobs: ['Interventional Cardiologist', 'Clinical Cardiologist', 'Electrophysiologist', 'Cardiac Researcher'],
    salary: '₹15-60 LPA',
    institutes: ['AIIMS Delhi', 'Sree Chitra Institute', 'PGIMER Chandigarh', 'Narayana Health'],
  },
  'Electronics & Communication': {
    title: 'Electronics & Communication Engineering',
    overview: 'ECE engineers design electronic circuits, communication systems, and embedded devices. The field spans telecommunications, signal processing, VLSI, and IoT.',
    path: ['10+2 (Science/Maths)', 'B.Tech in ECE', 'Internships', 'Associate Engineer', 'Senior Engineer', 'Lead / Manager'],
    education: 'B.Tech/B.E. in ECE, M.Tech in VLSI/Communication',
    exams: ['JEE Main', 'JEE Advanced', 'GATE', 'BITSAT'],
    jobs: ['Embedded Systems Engineer', 'VLSI Designer', 'RF Engineer', 'Telecom Engineer', 'IoT Developer'],
    salary: '₹3.5-20 LPA',
    institutes: ['IIT Bombay', 'IIT Kharagpur', 'NIT Surathkal', 'BITS Pilani', 'DTU Delhi'],
  },
  'Mechanical Engineering': {
    title: 'Mechanical Engineering',
    overview: 'Mechanical engineers design, manufacture, and maintain mechanical systems. They work in automotive, aerospace, energy, robotics, and manufacturing industries.',
    path: ['10+2 (Science/Maths)', 'B.Tech in Mechanical', 'Internships', 'Design/Manufacturing Engineer', 'Senior Engineer', 'Manager / Consultant'],
    education: 'B.Tech/B.E. in Mechanical Engineering',
    exams: ['JEE Main', 'JEE Advanced', 'GATE', 'MHT CET'],
    jobs: ['Design Engineer', 'Manufacturing Engineer', 'Automotive Engineer', 'HVAC Engineer', 'Robotics Engineer'],
    salary: '₹3-18 LPA',
    institutes: ['IIT Bombay', 'IIT Kanpur', 'NIT Trichy', 'BITS Pilani', 'VIT Vellore'],
  },
  'MBA Finance': {
    title: 'MBA in Finance',
    overview: 'MBA Finance prepares professionals for roles in corporate finance, investment banking, financial planning, and wealth management across global markets.',
    path: ['Graduation (Any Stream)', 'MBA Entrance Exam', 'MBA Finance (2 years)', 'Analyst / Associate', 'Manager', 'VP / CFO'],
    education: 'MBA/PGDM with Finance specialization',
    exams: ['CAT', 'XAT', 'GMAT', 'SNAP', 'NMAT'],
    jobs: ['Financial Analyst', 'Investment Banker', 'Portfolio Manager', 'CFO', 'Risk Manager'],
    salary: '₹8-35 LPA',
    institutes: ['IIM Ahmedabad', 'IIM Bangalore', 'IIM Calcutta', 'FMS Delhi', 'XLRI Jamshedpur'],
  },
};

// Default detail for sub-categories without specific data
const defaultDetail = (name: string) => ({
  title: name,
  overview: `${name} is a specialized field offering excellent career prospects. Students gain in-depth knowledge and practical skills required for industry roles.`,
  path: ['Complete 10+2', 'Entrance Examination', 'Undergraduate Degree', 'Internship & Training', 'Entry-level Position', 'Senior Professional'],
  education: 'Relevant undergraduate and postgraduate degrees',
  exams: ['Relevant National Entrance Exams', 'State-level Exams', 'University-specific Tests'],
  jobs: ['Entry-level Professional', 'Specialist', 'Consultant', 'Senior Professional', 'Department Head'],
  salary: '₹3-20 LPA (varies by experience)',
  institutes: ['Top National Institutes', 'State Universities', 'Private Universities', 'Deemed Universities'],
});

const CareerLibrary = () => {
  const navigate = useNavigate();
  const { isUnlocked } = useApp();
  const [level, setLevel] = useState(0);
  const [selectedStream, setSelectedStream] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSecondCat, setSelectedSecondCat] = useState('');
  const [selectedSubCat, setSelectedSubCat] = useState('');

  const locked = !isUnlocked('career-library');

  const goBack = () => {
    if (level > 0) setLevel(l => l - 1);
    else navigate('/dashboard');
  };

  const getTitle = () => {
    switch (level) {
      case 0: return 'Career Library';
      case 1: return selectedStream;
      case 2: return selectedCategory;
      case 3: return selectedSecondCat;
      case 4: return selectedSubCat;
      default: return 'Career Library';
    }
  };

  if (locked && level > 1) {
    return (
      <MobileFrame>
        <div className="flex flex-col min-h-[750px]">
          <div className="px-5 pt-4 flex items-center gap-3">
            <button onClick={() => setLevel(l => l - 1)} className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <h1 className="text-lg font-bold font-display">Career Library</h1>
          </div>
          <div className="flex-1 flex items-center">
            <LockedOverlay title="Career Details Locked" description="Subscribe to access detailed career information, education paths, and salary insights." />
          </div>
          <BottomNav />
        </div>
      </MobileFrame>
    );
  }

  const currentCats = categories[selectedStream] || [];
  const currentSecondCats = secondCategories[selectedCategory] || [];
  const currentSubCats = subCategories[selectedSecondCat] || [];
  const detail = careerDetails[selectedSubCat] || defaultDetail(selectedSubCat);

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
          {/* Level 0: Streams */}
          {level === 0 && (
            <div className="flex flex-col gap-2.5">
              <p className="text-sm text-muted-foreground mb-1">Choose a career stream to explore</p>
              {streams.map((s, i) => (
                <motion.button
                  key={s.name}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => { setSelectedStream(s.name); setLevel(1); }}
                  className="flex items-center justify-between p-4 rounded-xl bg-card shadow-card border border-border/40 transition-all active:scale-[0.98]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-primary/8 flex items-center justify-center text-2xl">{s.emoji}</div>
                    <div className="text-left">
                      <span className="font-bold font-display text-foreground text-sm">{s.name}</span>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{s.desc}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </motion.button>
              ))}
            </div>
          )}

          {/* Level 1: Categories */}
          {level === 1 && (
            <div className="grid grid-cols-2 gap-3">
              {currentCats.map((d, i) => (
                <motion.button
                  key={d.name}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => { setSelectedCategory(d.name); setLevel(2); }}
                  className="flex flex-col items-center gap-2 p-5 rounded-xl bg-card shadow-card border border-border/40 transition-all active:scale-[0.96]"
                >
                  <span className="text-3xl">{d.emoji}</span>
                  <span className="font-bold font-display text-sm text-foreground">{d.name}</span>
                </motion.button>
              ))}
            </div>
          )}

          {/* Level 2: 2nd Category (Programs/Degrees) */}
          {level === 2 && (
            <div className="flex flex-col gap-2.5">
              <p className="text-sm text-muted-foreground mb-1">Select a program or degree</p>
              {currentSecondCats.map((d, i) => (
                <motion.button
                  key={d.name}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => { setSelectedSecondCat(d.name); setLevel(3); }}
                  className="flex items-center justify-between p-4 rounded-xl bg-card shadow-card border border-border/40 transition-all active:scale-[0.98]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/8 flex items-center justify-center text-xl">{d.emoji}</div>
                    <span className="font-bold font-display text-foreground text-sm">{d.name}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </motion.button>
              ))}
            </div>
          )}

          {/* Level 3: Sub Categories (Specializations) */}
          {level === 3 && (
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <p className="text-sm text-muted-foreground mb-3">Choose a specialization</p>
              </div>
              {currentSubCats.length > 0 ? currentSubCats.map((d, i) => (
                <motion.button
                  key={d.name}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => { setSelectedSubCat(d.name); setLevel(4); }}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card shadow-card border border-border/40 transition-all active:scale-[0.96]"
                >
                  <span className="text-2xl">{d.emoji}</span>
                  <span className="font-bold font-display text-xs text-foreground text-center">{d.name}</span>
                </motion.button>
              )) : (
                <div className="col-span-2 text-center py-8">
                  <p className="text-muted-foreground text-sm">Specializations coming soon</p>
                  <button
                    onClick={() => { setSelectedSubCat(selectedSecondCat); setLevel(4); }}
                    className="mt-3 text-primary font-bold text-sm underline"
                  >
                    View general details →
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Level 4: Career Detail */}
          {level === 4 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3.5">
              <div className="text-center py-3">
                <h2 className="text-xl font-black font-display">{detail.title}</h2>
              </div>

              {[
                { title: 'Overview', content: <p className="text-sm text-muted-foreground leading-relaxed">{detail.overview}</p> },
                { title: 'Career Path', content: (
                  <div className="space-y-2">
                    {detail.path.map((step, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">{i + 1}</div>
                        <span className="text-sm text-foreground">{step}</span>
                      </div>
                    ))}
                  </div>
                )},
                { title: 'Education', content: <p className="text-sm text-muted-foreground">{detail.education}</p> },
                { title: 'Entrance Exams', content: (
                  <div className="flex flex-wrap gap-2">
                    {detail.exams.map(e => (
                      <span key={e} className="px-3 py-1 rounded-full bg-primary/8 text-primary text-xs font-bold">{e}</span>
                    ))}
                  </div>
                )},
                { title: 'Job Opportunities', content: detail.jobs.map(j => <p key={j} className="text-sm text-muted-foreground">• {j}</p>) },
                { title: 'Salary Range', content: <p className="text-sm text-foreground font-semibold">{detail.salary}</p> },
                { title: 'Top Institutes', content: detail.institutes.map(inst => <p key={inst} className="text-sm text-muted-foreground">🏛️ {inst}</p>) },
              ].map(section => (
                <div key={section.title} className="card-elevated p-4">
                  <h3 className="font-bold font-display text-sm text-primary mb-2">{section.title}</h3>
                  {section.content}
                </div>
              ))}
            </motion.div>
          )}
        </div>
        <BottomNav />
      </div>
    </MobileFrame>
  );
};

export default CareerLibrary;
