import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import MobileFrame from '@/components/MobileFrame';
import BottomNav from '@/components/BottomNav';
import { ArrowLeft, ChevronRight, User, Lock, Bell, HelpCircle, LogOut } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

const settingsItems = [
  { label: 'Edit Profile', icon: User, iconColor: 'text-career-blue' },
  { label: 'Change Password', icon: Lock, iconColor: 'text-career-purple' },
  { label: 'Notification Preferences', icon: Bell, iconColor: 'text-career-orange' },
  { label: 'Help Centre', icon: HelpCircle, iconColor: 'text-teal' },
];

const SettingsPage = () => {
  const navigate = useNavigate();
  const { logout } = useApp();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <MobileFrame>
      <div className="flex flex-col min-h-[750px]">
        <div className="px-5 pt-4 pb-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <h1 className="text-lg font-bold font-display">Settings</h1>
        </div>
        <div className="flex-1 overflow-y-auto px-5 pb-4 space-y-4">
          <div className="card-elevated overflow-hidden">
            {settingsItems.map((item, i) => (
              <motion.button
                key={item.label}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center justify-between w-full p-4 border-b border-border/60 last:border-0 text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                    <item.icon className={`w-4 h-4 ${item.iconColor}`} strokeWidth={1.8} />
                  </div>
                  <span className="text-sm font-semibold font-display text-foreground">{item.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </motion.button>
            ))}
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full p-4 rounded-xl bg-destructive/8 border border-destructive/15 text-destructive font-bold font-display text-sm"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
        <BottomNav />
      </div>
    </MobileFrame>
  );
};

export default SettingsPage;
