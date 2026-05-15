import { useState } from "react";
import { Navbar } from "./components/navbar";
import { HeroSection } from "./components/hero-section";
import { CardLearningPath } from "./components/card-learning-path";
import { FeaturesSection } from "./components/features-section";
import { StatsSection } from "./components/stats-section";
import { AboutSection } from "./components/about-section";
import { ComingSoonSubjects } from "./components/coming-soon-subjects";
import { CTASection } from "./components/cta-section";
import { QuickAccessSection } from "./components/quick-access-section";
import { SriLankanLessonsGrid } from "./components/sri-lankan-lessons-grid";
import { SriLankanLessonView } from "./components/sri-lankan-lesson-view";
import { MathsLessonsGrid } from "./components/maths-lessons-grid";
import { MathsLessonView } from "./components/maths-lesson-view";
import { EnglishLessonsGrid } from "./components/english-lessons-grid";
import { EnglishLessonView } from "./components/english-lesson-view";
import { ScienceLessonsGrid } from "./components/science-lessons-grid";
import { ScienceLessonView } from "./components/science-lesson-view";
import { Footer } from "./components/footer";
import { LessonPage } from "./components/lesson-page";
import { ProfilePage } from "./components/profile-page";
import { LeaderboardPage } from "./components/leaderboard-page";
import { GetStartedPage } from "./components/get-started-page";
import { LoginPage } from "./components/login-page";
import { RegisterPage } from "./components/register-page";
import { ForgotPasswordPage } from "./components/forgot-password-page";
import { AchievementsPage } from "./components/achievements-page";
import { AdminDashboard } from "./components/admin-dashboard";
import { AdminLoginPage } from "./components/admin-login-page";
import { SettingsPage } from "./components/settings-page";
import { AIPracticePage } from "./components/ai-practice-page";
import { AITutor } from "./components/ai-tutor";
import { HistoricalRoleplay } from "./components/historical-roleplay";
import { AIStudyBuddy } from "./components/ai-study-buddy";
import { AIEssayGrader } from "./components/ai-essay-grader";
import { useAuth } from "../hooks/useAuth";
import { LanguageProvider, useLanguage } from "../contexts/LanguageContext";
import { ThemeProvider } from "../contexts/ThemeContext";


type Page = "home" | "lessons" | "profile" | "leaderboard" | "getstarted" | "login" | "register" | "forgot-password" | "achievements" | "admin" | "admin-login" | "single-lesson" | "settings" | "ai-practice" | "ai-tutor" | "ai-roleplay" | "ai-study-buddy" | "ai-essay-grader" | "maths" | "maths-lesson" | "english" | "english-lesson" | "science" | "science-lesson" | "history";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null);
  const [selectedMathsLessonId, setSelectedMathsLessonId] = useState<number | null>(null);
  const [selectedEnglishLessonId, setSelectedEnglishLessonId] = useState<number | null>(null);
  const [selectedScienceLessonId, setSelectedScienceLessonId] = useState<number | null>(null);

  const handleLogout = () => {
    setCurrentPage("home");
  };

  return (
    <ThemeProvider>
    <LanguageProvider>
      <AppContent
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        selectedLessonId={selectedLessonId}
        setSelectedLessonId={setSelectedLessonId}
        selectedMathsLessonId={selectedMathsLessonId}
        setSelectedMathsLessonId={setSelectedMathsLessonId}
        selectedEnglishLessonId={selectedEnglishLessonId}
        setSelectedEnglishLessonId={setSelectedEnglishLessonId}
        selectedScienceLessonId={selectedScienceLessonId}
        setSelectedScienceLessonId={setSelectedScienceLessonId}
        onLogout={handleLogout}
      />
    </LanguageProvider>
    </ThemeProvider>
  );
}

function AppContent({
  currentPage,
  setCurrentPage,
  selectedLessonId,
  setSelectedLessonId,
  selectedMathsLessonId,
  setSelectedMathsLessonId,
  selectedEnglishLessonId,
  setSelectedEnglishLessonId,
  selectedScienceLessonId,
  setSelectedScienceLessonId,
  onLogout,
}: {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  selectedLessonId: number | null;
  setSelectedLessonId: (id: number | null) => void;
  selectedMathsLessonId: number | null;
  setSelectedMathsLessonId: (id: number | null) => void;
  selectedEnglishLessonId: number | null;
  setSelectedEnglishLessonId: (id: number | null) => void;
  selectedScienceLessonId: number | null;
  setSelectedScienceLessonId: (id: number | null) => void;
  onLogout: () => void;
}) {
  const { language, toggleLanguage } = useLanguage();
  const { user } = useAuth();

  // Pages that don't require login
  const PUBLIC_PAGES: Page[] = ["home", "login", "register", "getstarted", "forgot-password"];

  // If not logged in and trying to access a protected page → redirect to login
  if (!user && !PUBLIC_PAGES.includes(currentPage)) {
    const intendedPage = currentPage;
    return (
      <div>
        <div style={{
          background: '#f0fdf4',
          borderBottom: '1px solid #bbf7d0',
          padding: '12px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '14px',
          color: '#166534',
        }}>
          <span>🔒</span>
          <span>Please log in to access this page.</span>
          <button
            onClick={() => setCurrentPage("home")}
            style={{ marginLeft: 'auto', color: '#16a34a', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px' }}
          >
            Go to Home
          </button>
        </div>
        <LoginPage
          onBack={() => setCurrentPage("home")}
          onSwitchToRegister={() => setCurrentPage("register")}
          onLoginSuccess={() => setCurrentPage(intendedPage)}
          onForgotPassword={() => setCurrentPage("forgot-password")}
        />
      </div>
    );
  }

  if (currentPage === "login") {
    return (
      <LoginPage
        onBack={() => setCurrentPage("home")}
        onSwitchToRegister={() => setCurrentPage("register")}
        onLoginSuccess={() => setCurrentPage("home")}
        onForgotPassword={() => setCurrentPage("forgot-password")}
      />
    );
  }

  if (currentPage === "forgot-password") {
    return (
      <ForgotPasswordPage
        onBack={() => setCurrentPage("home")}
        onSwitchToLogin={() => setCurrentPage("login")}
      />
    );
  }

  if (currentPage === "register") {
    return (
      <RegisterPage
        onBack={() => setCurrentPage("home")}
        onSwitchToLogin={() => setCurrentPage("login")}
        onRegisterSuccess={() => setCurrentPage("getstarted")}
      />
    );
  }

  if (currentPage === "getstarted") {
    return <GetStartedPage onComplete={() => setCurrentPage("home")} />;
  }

  if (currentPage === "lessons") {
    return <LessonPage onBack={() => setCurrentPage("home")} />;
  }

  if (currentPage === "profile") {
    return <ProfilePage onBack={() => setCurrentPage("home")} onSettingsClick={() => setCurrentPage("settings")} />;
  }

  if (currentPage === "leaderboard") {
    return <LeaderboardPage onBack={() => setCurrentPage("home")} />;
  }


  if (currentPage === "achievements") {
    return <AchievementsPage onBack={() => setCurrentPage("home")} />;
  }

  if (currentPage === "admin-login") {
    return (
      <AdminLoginPage
        onBack={() => setCurrentPage("home")}
        onAdminLoginSuccess={() => setCurrentPage("admin")}
      />
    );
  }

  if (currentPage === "admin") {
    // Guard: only allow if logged in as admin
    const rawUser = (() => { try { return JSON.parse(localStorage.getItem('history_app_user') || 'null'); } catch { return null; } })();
    if (!rawUser || !rawUser.isAdmin) {
      // Redirect to admin login immediately — no setTimeout race condition
      return (
        <AdminLoginPage
          onBack={() => setCurrentPage("home")}
          onAdminLoginSuccess={() => setCurrentPage("admin")}
        />
      );
    }
    return <AdminDashboard onBack={() => setCurrentPage("home")} />;
  }

  if (currentPage === "single-lesson") {
    return (
      <SriLankanLessonView 
        lessonId={selectedLessonId || 1} 
        onBack={() => setCurrentPage("history")}
        onComplete={(score) => {
          console.log("Lesson completed with score:", score);
        }}
        onNextLesson={(nextLessonId) => {
          setSelectedLessonId(nextLessonId);
          window.scrollTo(0, 0);
        }}
      />
    );
  }

  if (currentPage === "settings") {
    return <SettingsPage onBack={() => setCurrentPage("profile")} />;
  }

  if (currentPage === "ai-practice") {
    return <AIPracticePage onBack={() => setCurrentPage("home")} />;
  }

  if (currentPage === "ai-tutor") {
    return <AITutor onBack={() => setCurrentPage("home")} />;
  }

  if (currentPage === "ai-roleplay") {
    return <HistoricalRoleplay onBack={() => setCurrentPage("home")} />;
  }

  if (currentPage === "ai-study-buddy") {
    return <AIStudyBuddy onBack={() => setCurrentPage("home")} />;
  }

  if (currentPage === "ai-essay-grader") {
    return <AIEssayGrader onBack={() => setCurrentPage("home")} />;
  }

  if (currentPage === "history") {
    return (
      <div className="min-h-screen bg-white">
        <Navbar
          onLeaderboardClick={() => setCurrentPage("leaderboard")}
          onProfileClick={() => setCurrentPage("profile")}
          onGetStartedClick={() => setCurrentPage("register")}
          onLoginClick={() => setCurrentPage("login")}
          onRegisterClick={() => setCurrentPage("register")}
          onAchievementsClick={() => setCurrentPage("achievements")}
          onAdminClick={() => setCurrentPage("admin-login")}
          onLanguageToggle={toggleLanguage}
          language={language}
          onLogout={onLogout}
        />
        <SriLankanLessonsGrid
          onLessonClick={(lessonId) => {
            setSelectedLessonId(lessonId);
            setCurrentPage("single-lesson");
          }}
          onBack={() => setCurrentPage("home")}
          onRoleplayClick={() => setCurrentPage("ai-roleplay")}
        />
        <Footer />
      </div>
    );
  }

  if (currentPage === "maths") {
    return (
      <div className="min-h-screen bg-white">
        <Navbar
          onLeaderboardClick={() => setCurrentPage("leaderboard")}
          onProfileClick={() => setCurrentPage("profile")}
          onGetStartedClick={() => setCurrentPage("register")}
          onLoginClick={() => setCurrentPage("login")}
          onRegisterClick={() => setCurrentPage("register")}
          onAchievementsClick={() => setCurrentPage("achievements")}
          onAdminClick={() => setCurrentPage("admin-login")}
          onLanguageToggle={toggleLanguage}
          language={language}
          onLogout={onLogout}
        />
        <MathsLessonsGrid
          onLessonClick={(lessonId) => {
            setSelectedMathsLessonId(lessonId);
            setCurrentPage("maths-lesson");
          }}
          onBack={() => setCurrentPage("home")}
        />
        <Footer />
      </div>
    );
  }

  if (currentPage === "maths-lesson") {
    return (
      <MathsLessonView
        lessonId={selectedMathsLessonId || 1001}
        onBack={() => setCurrentPage("maths")}
        onComplete={(score) => { console.log("Maths lesson completed with score:", score); }}
        onNextLesson={(nextLessonId) => {
          setSelectedMathsLessonId(nextLessonId);
          window.scrollTo(0, 0);
        }}
      />
    );
  }

  if (currentPage === "english") {
    return (
      <div className="min-h-screen bg-white">
        <Navbar
          onLeaderboardClick={() => setCurrentPage("leaderboard")}
          onProfileClick={() => setCurrentPage("profile")}
          onGetStartedClick={() => setCurrentPage("register")}
          onLoginClick={() => setCurrentPage("login")}
          onRegisterClick={() => setCurrentPage("register")}
          onAchievementsClick={() => setCurrentPage("achievements")}
          onAdminClick={() => setCurrentPage("admin-login")}
          onLanguageToggle={toggleLanguage}
          language={language}
          onLogout={onLogout}
        />
        <EnglishLessonsGrid
          onLessonClick={(lessonId) => {
            setSelectedEnglishLessonId(lessonId);
            setCurrentPage("english-lesson");
          }}
          onBack={() => setCurrentPage("home")}
        />
        <Footer />
      </div>
    );
  }

  if (currentPage === "english-lesson") {
    return (
      <EnglishLessonView
        lessonId={selectedEnglishLessonId || 2001}
        onBack={() => setCurrentPage("english")}
        onComplete={(score) => { console.log("English lesson completed with score:", score); }}
        onNextLesson={(nextLessonId) => {
          setSelectedEnglishLessonId(nextLessonId);
          window.scrollTo(0, 0);
        }}
      />
    );
  }

  if (currentPage === "science") {
    return (
      <div className="min-h-screen bg-white">
        <Navbar
          onLeaderboardClick={() => setCurrentPage("leaderboard")}
          onProfileClick={() => setCurrentPage("profile")}
          onGetStartedClick={() => setCurrentPage("register")}
          onLoginClick={() => setCurrentPage("login")}
          onRegisterClick={() => setCurrentPage("register")}
          onAchievementsClick={() => setCurrentPage("achievements")}
          onAdminClick={() => setCurrentPage("admin-login")}
          onLanguageToggle={toggleLanguage}
          language={language}
          onLogout={onLogout}
        />
        <ScienceLessonsGrid
          onLessonClick={(lessonId) => {
            setSelectedScienceLessonId(lessonId);
            setCurrentPage("science-lesson");
          }}
          onBack={() => setCurrentPage("home")}
        />
        <Footer />
      </div>
    );
  }

  if (currentPage === "science-lesson") {
    return (
      <ScienceLessonView
        lessonId={selectedScienceLessonId || 3001}
        onBack={() => setCurrentPage("science")}
        onComplete={(score) => { console.log("Science lesson completed with score:", score); }}
        onNextLesson={(nextLessonId) => {
          setSelectedScienceLessonId(nextLessonId);
          window.scrollTo(0, 0);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar 
        onLeaderboardClick={() => setCurrentPage("leaderboard")}
        onProfileClick={() => setCurrentPage("profile")}
        onGetStartedClick={() => setCurrentPage("register")}
        onLoginClick={() => setCurrentPage("login")}
        onRegisterClick={() => setCurrentPage("register")}
        onAchievementsClick={() => setCurrentPage("achievements")}
        onAdminClick={() => setCurrentPage("admin-login")}
        onLanguageToggle={toggleLanguage}
        language={language}
        onLogout={onLogout}
      />
      <main>
        <HeroSection onGetStartedClick={() => setCurrentPage("register")} />
        <CardLearningPath onSubjectClick={(subject) => {
          if (subject === "history") setCurrentPage("history");
          else if (subject === "maths") setCurrentPage("maths");
          else if (subject === "english") setCurrentPage("english");
          else if (subject === "science") setCurrentPage("science");
        }} />

        <QuickAccessSection 
          onAchievementsClick={() => setCurrentPage("achievements")}
          onAdminClick={() => setCurrentPage("admin-login")}
          isAdmin={!!user?.isAdmin}
          onAIPracticeClick={() => setCurrentPage("ai-practice")}
          onAITutorClick={() => setCurrentPage("ai-tutor")}
          onStudyBuddyClick={() => setCurrentPage("ai-study-buddy")}
          onEssayGraderClick={() => setCurrentPage("ai-essay-grader")}
          language={language}
        />
        <FeaturesSection />
        <StatsSection />
        <AboutSection />
        <ComingSoonSubjects onMathsClick={() => setCurrentPage("maths")} onEnglishClick={() => setCurrentPage("english")} onScienceClick={() => setCurrentPage("science")} />
        <CTASection onGetStartedClick={() => setCurrentPage("register")} />
      </main>
      <Footer />
    </div>
  );
}