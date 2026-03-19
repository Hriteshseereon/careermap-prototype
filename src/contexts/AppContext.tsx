import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserProfile {
  name: string;
  email: string;
  mobile: string;
  class: string;
  stream: string;
  interests: string[];
  gender: string;
  dob: string;
  city: string;
  state: string;
  avatar: string;
}

interface AppState {
  isLoggedIn: boolean;
  user: UserProfile;
  unlockedFeatures: string[];
  notifications: { id: string; title: string; message: string; time: string; read: boolean }[];
  testHistory: { id: string; date: string; score: number; total: number }[];
  bookings: { id: string; mentorName: string; date: string; time: string; status: string }[];
  savedCareers: string[];
  subscription: string | null;
}

interface AppContextType {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
  login: () => void;
  logout: () => void;
  unlockFeature: (feature: string) => void;
  isUnlocked: (feature: string) => boolean;
  setSubscription: (plan: string) => void;
}

const defaultUser: UserProfile = {
  name: 'Arjun Sharma',
  email: 'arjun@example.com',
  mobile: '+91 98765 43210',
  class: 'Class 11',
  stream: 'Science',
  interests: ['Technology and Computers', 'Problem Solving'],
  gender: 'Male',
  dob: '2008-05-15',
  city: 'Mumbai',
  state: 'Maharashtra',
  avatar: '',
};

const defaultState: AppState = {
  isLoggedIn: false,
  user: defaultUser,
  unlockedFeatures: ['career-assessment-basic', 'quiz', 'entrance-exam', 'institute'],
  notifications: [
    { id: '1', title: 'Welcome to Career Map! 🎉', message: 'Start your career discovery journey today.', time: '2 min ago', read: false },
    { id: '2', title: 'New Quiz Available', message: 'Test your knowledge about Engineering careers.', time: '1 hour ago', read: false },
    { id: '3', title: 'Mentor Session Reminder', message: 'Your session with Dr. Priya is tomorrow at 4 PM.', time: '3 hours ago', read: true },
    { id: '4', title: 'Scholarship Deadline', message: 'INSPIRE scholarship deadline is approaching.', time: '1 day ago', read: true },
  ],
  testHistory: [
    { id: '1', date: '2024-01-15', score: 78, total: 100 },
  ],
  bookings: [],
  savedCareers: ['Software Engineering', 'Data Science'],
  subscription: null,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AppState>(defaultState);

  const login = () => setState(s => ({ ...s, isLoggedIn: true }));
  const logout = () => setState(s => ({ ...s, isLoggedIn: false }));
  const unlockFeature = (feature: string) =>
    setState(s => ({ ...s, unlockedFeatures: [...s.unlockedFeatures, feature] }));
  const isUnlocked = (feature: string) => state.unlockedFeatures.includes(feature);
  const setSubscription = (plan: string) => {
    const featureMap: Record<string, string[]> = {
      psychometric: ['psychometric-report'],
      'psychometric-counselling': ['psychometric-report', 'book-mentor'],
      infocentre: ['psychometric-report', 'book-mentor', 'career-library', 'scholarship', 'master-class'],
      abroad: ['abroad-consultancy'],
    };
    setState(s => ({
      ...s,
      subscription: plan,
      unlockedFeatures: [...s.unlockedFeatures, ...(featureMap[plan] || [])],
    }));
  };

  return (
    <AppContext.Provider value={{ state, setState, login, logout, unlockFeature, isUnlocked, setSubscription }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
