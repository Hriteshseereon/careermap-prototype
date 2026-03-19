import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import MobileFrame from '@/components/MobileFrame';
import BottomNav from '@/components/BottomNav';
import { useApp } from '@/contexts/AppContext';
import { ChevronRight, Star, History, Calendar, CreditCard, Settings } from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const { state } = useApp();

  const menuItems = [
    { label: 'Saved Careers', icon: Star, iconColor: 'text-career-orange', value: `${state.savedCareers.length} saved` },
    { label: 'Test History', icon: History, iconColor: 'text-career-blue', value: `${state.testHistory.length} tests` },
    { label: 'Mentor Bookings', icon: Calendar, iconColor: 'text-career-purple', value: `${state.bookings.length} bookings` },
    { label: 'Subscription', icon: CreditCard, iconColor: 'text-gold', value: state.subscription || 'None', path: '/subscription' },
    { label: 'Settings', icon: Settings, iconColor: 'text-muted-foreground', path: '/settings' },
  ];

  return (
    <MobileFrame>
      <div className="flex flex-col min-h-[750px]">
        <div className="px-5 pt-6 pb-4">
          <h1 className="text-lg font-bold font-display mb-4">My Profile</h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center p-5 rounded-2xl card-elevated-lg"
          >
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-3xl mb-3 ring-2 ring-primary/20">
              👦
            </div>
            <h2 className="text-lg font-black font-display">{state.user.name}</h2>
            <p className="text-xs text-muted-foreground mt-0.5">{state.user.email}</p>
            <p className="text-xs text-muted-foreground">{state.user.mobile}</p>
            <div className="flex gap-2 mt-3">
              <span className="px-3 py-1 rounded-full bg-primary/8 text-primary text-xs font-bold">{state.user.class}</span>
              <span className="px-3 py-1 rounded-full bg-career-purple/10 text-career-purple text-xs font-bold">{state.user.stream}</span>
            </div>
          </motion.div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 pb-4">
          <div className="card-elevated overflow-hidden">
            {menuItems.map((item, i) => (
              <motion.button
                key={item.label}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => item.path && navigate(item.path)}
                className="flex items-center justify-between w-full p-4 border-b border-border/60 last:border-0 text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                    <item.icon className={`w-4 h-4 ${item.iconColor}`} strokeWidth={1.8} />
                  </div>
                  <span className="text-sm font-semibold font-display text-foreground">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {item.value && <span className="text-[11px] text-muted-foreground">{item.value}</span>}
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </motion.button>
            ))}
          </div>
        </div>
        <BottomNav />
      </div>
    </MobileFrame>
  );
};

export default Profile;
