import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface LockedOverlayProps {
  title: string;
  description: string;
}

const LockedOverlay = ({ title, description }: LockedOverlayProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center p-8 text-center gap-5"
    >
      <div className="w-20 h-20 rounded-2xl bg-primary/8 flex items-center justify-center mb-1">
        <Lock className="w-9 h-9 text-primary/60" strokeWidth={1.5} />
      </div>
      <h2 className="text-xl font-bold font-display text-foreground">{title}</h2>
      <p className="text-sm text-muted-foreground max-w-[280px] leading-relaxed">{description}</p>
      <Button variant="hero" size="lg" onClick={() => navigate('/subscription')} className="gap-2">
        <Lock className="w-4 h-4" />
        View Plans & Unlock
      </Button>
    </motion.div>
  );
};

export default LockedOverlay;
