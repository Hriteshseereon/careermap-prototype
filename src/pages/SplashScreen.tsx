import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import MobileFrame from '@/components/MobileFrame';

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate('/onboarding'), 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <MobileFrame>
      <div className="flex flex-col items-center justify-center min-h-[750px] bg-gradient-to-br from-primary via-primary/95 to-primary/80 p-8 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-20 -right-16 w-48 h-48 rounded-full bg-primary-foreground/5" />
        <div className="absolute -bottom-10 -left-20 w-64 h-64 rounded-full bg-primary-foreground/5" />
        
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col items-center gap-8 relative z-10"
        >
          {/* Logo */}
          <div className="w-28 h-28 rounded-3xl bg-card shadow-card-lg flex items-center justify-center relative">
            <span className="text-5xl">🗺️</span>
          </div>

          <div className="text-center">
            <h1 className="text-4xl font-black font-display text-primary-foreground tracking-tight">
              Career Map
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-primary-foreground/70 text-base font-body mt-2 tracking-wide"
            >
              Discover Your Future
            </motion.p>
          </div>

          {/* Loading bar */}
          <div className="w-32 h-1 bg-primary-foreground/20 rounded-full mt-4 overflow-hidden">
            <motion.div
              className="h-full bg-primary-foreground/60 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2.2, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </div>
    </MobileFrame>
  );
};

export default SplashScreen;
