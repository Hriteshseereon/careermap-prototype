import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import MobileFrame from '@/components/MobileFrame';
import BottomNav from '@/components/BottomNav';
import { ArrowLeft, Bell } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

const Notifications = () => {
  const navigate = useNavigate();
  const { state } = useApp();

  return (
    <MobileFrame>
      <div className="flex flex-col min-h-[750px]">
        <div className="px-5 pt-4 pb-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <h1 className="text-lg font-bold font-display">Notifications</h1>
        </div>
        <div className="flex-1 overflow-y-auto px-5 pb-4 space-y-2.5">
          {state.notifications.map((n, i) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`p-4 rounded-xl shadow-card border ${n.read ? 'bg-card border-border/40' : 'bg-primary/3 border-primary/20'}`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${n.read ? 'bg-muted' : 'bg-primary/10'}`}>
                  <Bell className={`w-4 h-4 ${n.read ? 'text-muted-foreground' : 'text-primary'}`} strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold font-display text-sm text-foreground">{n.title}</h3>
                    {!n.read && <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />}
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">{n.message}</p>
                  <p className="text-[10px] text-muted-foreground mt-1.5">{n.time}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <BottomNav />
      </div>
    </MobileFrame>
  );
};

export default Notifications;
