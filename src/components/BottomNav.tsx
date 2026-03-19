import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Brain, GraduationCap, User } from 'lucide-react';

const tabs = [
  { path: '/dashboard', label: 'Home', icon: LayoutDashboard },
  { path: '/career-library', label: 'Library', icon: BookOpen },
  { path: '/career-assessment', label: 'Test', icon: Brain },
  { path: '/master-class', label: 'Learn', icon: GraduationCap },
  { path: '/profile', label: 'Profile', icon: User },
];

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="sticky bottom-0 left-0 right-0 bg-card/95 backdrop-blur-md border-t border-border/60 px-2 pb-7 pt-2 z-50">
      <div className="flex justify-around items-center">
        {tabs.map(tab => {
          const active = location.pathname.startsWith(tab.path);
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 ${
                active
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className={`p-1 rounded-lg transition-all duration-200 ${active ? 'bg-primary/10' : ''}`}>
                <tab.icon className="w-5 h-5" strokeWidth={active ? 2.5 : 1.8} />
              </div>
              <span className={`text-[10px] font-display ${active ? 'font-extrabold' : 'font-semibold'}`}>{tab.label}</span>
              {active && <div className="w-4 h-[2px] rounded-full bg-primary mt-0.5" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
