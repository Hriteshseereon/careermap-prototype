import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import MobileFrame from '@/components/MobileFrame';
import { useApp } from '@/contexts/AppContext';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    login();
    navigate('/dashboard');
  };

  return (
    <MobileFrame>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col min-h-[750px] p-6"
      >
        <div className="flex flex-col items-center gap-2 pt-8 mb-8">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl mb-2">🗺️</div>
          <h1 className="text-2xl font-black font-display text-foreground">Welcome Back!</h1>
          <p className="text-muted-foreground text-sm">Sign in to continue your journey</p>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-bold font-display text-muted-foreground mb-1.5 block">Email or Mobile</label>
            <input
              type="text"
              placeholder="Enter email or mobile number"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <label className="text-xs font-bold font-display text-muted-foreground mb-1.5 block">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="input-field pr-12"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button className="text-xs text-primary font-bold font-display text-right" onClick={() => navigate('/forgot-password')}>
            Forgot Password?
          </button>

          <Button variant="hero" size="lg" className="w-full mt-2" onClick={handleLogin}>
            Login
          </Button>

          <div className="flex items-center gap-3 my-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-[11px] text-muted-foreground font-body">or continue with</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <Button variant="outline" size="lg" className="w-full gap-2">
            <span className="text-lg">G</span> Google
          </Button>
        </div>

        <div className="mt-auto pb-8 text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <button className="text-primary font-bold font-display" onClick={() => navigate('/signup')}>
              Create Account
            </button>
          </p>
        </div>
      </motion.div>
    </MobileFrame>
  );
};

export default Login;
