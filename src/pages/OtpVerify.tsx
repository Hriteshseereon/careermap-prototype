import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import MobileFrame from '@/components/MobileFrame';
import { useApp } from '@/contexts/AppContext';
import { ShieldCheck } from 'lucide-react';

const OtpVerify = () => {
  const navigate = useNavigate();
  const { login } = useApp();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      const next = document.getElementById(`otp-${index + 1}`);
      next?.focus();
    }
  };

  const handleVerify = () => {
    login();
    navigate('/dashboard');
  };

  return (
    <MobileFrame>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center min-h-[750px] p-6 pt-20"
      >
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
          <ShieldCheck className="w-8 h-8 text-primary" strokeWidth={1.5} />
        </div>
        <h1 className="text-2xl font-black font-display mb-2">Verify OTP</h1>
        <p className="text-muted-foreground text-sm text-center mb-8 max-w-[260px]">
          We've sent a 6-digit code to your mobile number
        </p>

        <div className="flex gap-2.5 mb-8">
          {otp.map((digit, i) => (
            <input
              key={i}
              id={`otp-${i}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={e => handleChange(i, e.target.value)}
              className="w-12 h-14 text-center text-xl font-bold font-display rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
          ))}
        </div>

        <Button variant="hero" size="lg" className="w-full" onClick={handleVerify}>
          Verify OTP
        </Button>

        <button className="mt-5 text-sm text-primary font-bold font-display">
          Resend OTP
        </button>
      </motion.div>
    </MobileFrame>
  );
};

export default OtpVerify;
