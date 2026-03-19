import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppProvider } from "@/contexts/AppContext";

import SplashScreen from "./pages/SplashScreen";
import Onboarding from "./pages/Onboarding";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import OtpVerify from "./pages/OtpVerify";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import CareerLibrary from "./pages/CareerLibrary";
import CareerAssessment from "./pages/CareerAssessment";
import PsychometricTest from "./pages/PsychometricTest";
import MasterClass from "./pages/MasterClass";
import EntranceExam from "./pages/EntranceExam";
import Institute from "./pages/Institute";
import BookMentor from "./pages/BookMentor";
import Scholarship from "./pages/Scholarship";
import AbroadConsultancy from "./pages/AbroadConsultancy";
import Quiz from "./pages/Quiz";
import Subscription from "./pages/Subscription";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SplashScreen />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/otp-verify" element={<OtpVerify />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/career-library" element={<CareerLibrary />} />
            <Route path="/career-assessment" element={<CareerAssessment />} />
            <Route path="/psychometric-test" element={<PsychometricTest />} />
            <Route path="/master-class" element={<MasterClass />} />
            <Route path="/entrance-exam" element={<EntranceExam />} />
            <Route path="/institute" element={<Institute />} />
            <Route path="/book-mentor" element={<BookMentor />} />
            <Route path="/scholarship" element={<Scholarship />} />
            <Route path="/abroad" element={<AbroadConsultancy />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
