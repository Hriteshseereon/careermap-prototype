import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import MobileFrame from '@/components/MobileFrame';
import { Button } from '@/components/ui/button';
import { ArrowLeft, KeyRound } from 'lucide-react';

const ForgotPassword = () => {
  const navigate = useNavigate();

  return (
    <MobileFrame>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col min-h-[750px] p-6">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6 font-display font-semibold">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
            <KeyRound className="w-8 h-8 text-primary" strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl font-black font-display text-center mb-1">Forgot Password</h1>
          <p className="text-sm text-muted-foreground text-center max-w-[260px]">Enter your email to receive a reset link</p>
        </div>
        <div>
          <label className="text-xs font-bold font-display text-muted-foreground mb-1.5 block">Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="input-field"
          />
        </div>
        <Button variant="hero" size="lg" className="w-full mt-6">
          Send Reset Link
        </Button>
      </motion.div>
    </MobileFrame>
  );
};

export default ForgotPassword;
