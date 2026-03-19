import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import MobileFrame from '@/components/MobileFrame';
import { ArrowLeft } from 'lucide-react';

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', email: '', mobile: '', password: '', confirmPassword: '',
    gender: '', dob: '', city: '', state: '',
  });

  const update = (key: string, val: string) => setForm({ ...form, [key]: val });

  return (
    <MobileFrame>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col min-h-[750px] p-6"
      >
        <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4 font-display font-semibold">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <h1 className="text-2xl font-black font-display mb-1">Create Account</h1>
        <p className="text-muted-foreground text-sm mb-5">Join Career Map today</p>

        <div className="flex flex-col gap-3.5 overflow-y-auto flex-1 pb-4">
          {[
            { key: 'name', label: 'Full Name', type: 'text', placeholder: 'Enter your full name' },
            { key: 'email', label: 'Email Address', type: 'email', placeholder: 'Enter email' },
            { key: 'mobile', label: 'Mobile Number', type: 'tel', placeholder: '+91 XXXXX XXXXX' },
            { key: 'password', label: 'Password', type: 'password', placeholder: 'Create password' },
            { key: 'confirmPassword', label: 'Confirm Password', type: 'password', placeholder: 'Re-enter password' },
          ].map(f => (
            <div key={f.key}>
              <label className="text-xs font-bold font-display text-muted-foreground mb-1.5 block">{f.label}</label>
              <input
                type={f.type}
                placeholder={f.placeholder}
                value={(form as any)[f.key]}
                onChange={e => update(f.key, e.target.value)}
                className="input-field"
              />
            </div>
          ))}

          <div>
            <label className="text-xs font-bold font-display text-muted-foreground mb-1.5 block">Gender</label>
            <div className="flex gap-2">
              {['Male', 'Female', 'Other'].map(g => (
                <button
                  key={g}
                  onClick={() => update('gender', g)}
                  className={`flex-1 h-11 rounded-xl font-bold font-display text-xs transition-all ${
                    form.gender === g ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-card border border-border text-foreground'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold font-display text-muted-foreground mb-1.5 block">Date of Birth</label>
            <input
              type="date"
              value={form.dob}
              onChange={e => update('dob', e.target.value)}
              className="input-field"
            />
          </div>

          {[
            { key: 'city', label: 'City', placeholder: 'Enter city' },
            { key: 'state', label: 'State', placeholder: 'Enter state' },
          ].map(f => (
            <div key={f.key}>
              <label className="text-xs font-bold font-display text-muted-foreground mb-1.5 block">{f.label}</label>
              <input
                type="text"
                placeholder={f.placeholder}
                value={(form as any)[f.key]}
                onChange={e => update(f.key, e.target.value)}
                className="input-field"
              />
            </div>
          ))}

          <Button variant="hero" size="lg" className="w-full mt-4" onClick={() => navigate('/otp-verify')}>
            Register
          </Button>
        </div>
      </motion.div>
    </MobileFrame>
  );
};

export default Signup;
