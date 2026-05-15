import { Button } from "./ui/button";
import { BookOpen, Menu, User, Languages, LogOut, ShieldCheck, Sun, Moon } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../contexts/ThemeContext";

interface NavbarProps {
  onLeaderboardClick: () => void;
  onProfileClick: () => void;
  onGetStartedClick: () => void;
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
  onAchievementsClick?: () => void;
  onAdminClick?: () => void;
  onLanguageToggle: () => void;
  language: 'en' | 'si';
  onLogout?: () => void;
}

export function Navbar({ 
  onLeaderboardClick, 
  onProfileClick, 
  onGetStartedClick, 
  onLoginClick, 
  onRegisterClick, 
  onAchievementsClick, 
  onAdminClick,
  onLanguageToggle,
  language,
  onLogout,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const handleLogout = () => {
    logout();       // clears shared AuthContext state → all components update instantly
    onLogout?.();   // navigate back to home
  };

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-green-600 p-2 rounded-xl">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-extrabold text-gray-900 dark:text-white">
              EduSmart
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#courses" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 font-medium transition-colors">
              {language === 'en' ? 'Courses' : 'පාඨමාලා'}
            </a>
            <button 
              onClick={onLeaderboardClick}
              className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 font-medium transition-colors"
            >
              {language === 'en' ? 'Leaderboard' : 'ලීඩර්බෝඩ්'}
            </button>
            <a href="#about" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 font-medium transition-colors">
              {language === 'en' ? 'About' : 'පිළිබඳව'}
            </a>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-9 h-9 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
              title={isDark ? 'Light mode' : 'Dark mode'}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Language Toggle */}
            <button
              onClick={onLanguageToggle}
              className="flex items-center gap-2 px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
              title={language === "en" ? "සිංහල" : "English"}
            >
              <Languages className="w-4 h-4" />
              <span className="font-semibold text-sm">
                {language === "en" ? "EN" : "සිං"}
              </span>
            </button>

            {user ? (
              // Logged in — show Profile + Logout
              <>
                {(user as any).isAdmin && (
                  <Button
                    variant="ghost"
                    onClick={onAdminClick}
                    className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 gap-2 font-semibold"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    {language === 'en' ? 'Admin' : 'පරිපාලක'}
                  </Button>
                )}
                <Button 
                  variant="ghost" 
                  onClick={onProfileClick}
                  className="text-gray-700 hover:text-green-600 gap-2"
                >
                  <User className="w-4 h-4" />
                  {user.name || (language === 'en' ? 'Profile' : 'පැතිකඩ')}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="border-2 border-red-400 text-red-500 hover:bg-red-50 rounded-xl gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  {language === 'en' ? 'Logout' : 'ඉවත් වන්න'}
                </Button>
              </>
            ) : (
              // Not logged in — show Login + Get Started
              <>
                <Button 
                  variant="ghost" 
                  onClick={onProfileClick}
                  className="text-gray-700 hover:text-green-600 gap-2"
                >
                  <User className="w-4 h-4" />
                  {language === 'en' ? 'Profile' : 'පැතිකඩ'}
                </Button>
                <Button 
                  variant="outline"
                  onClick={onLoginClick}
                  className="border-2 border-green-600 text-green-600 hover:bg-green-50 rounded-xl"
                >
                  {language === 'en' ? 'Login' : 'පුරන්න'}
                </Button>
                <Button 
                  onClick={onGetStartedClick}
                  className="bg-green-600 hover:bg-green-700 text-white rounded-xl"
                >
                  {language === 'en' ? 'Get Started' : 'ආරම්භ කරන්න'}
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-3 bg-white dark:bg-gray-900">
              <a href="#courses" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 font-medium">
                {language === 'en' ? 'Courses' : 'පාඨමාලා'}
              </a>
              <button 
                onClick={onLeaderboardClick}
                className="block w-full text-left py-2 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 font-medium"
              >
                {language === 'en' ? 'Leaderboard' : 'ලීඩර්බෝඩ්'}
              </button>
              <a href="#about" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 font-medium">
                {language === 'en' ? 'About' : 'පිළිබඳව'}
              </a>
              <div className="pt-3 border-t border-gray-200 dark:border-gray-700 space-y-2">
                {/* Mobile dark mode toggle */}
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-2 w-full py-2 text-gray-700 dark:text-gray-300 font-medium"
                >
                  {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  {isDark ? (language === 'en' ? 'Light Mode' : 'සැහැල්ලු මෝදය') : (language === 'en' ? 'Dark Mode' : 'අඳුරු මෝදය')}
                </button>
                {user ? (
                  <>
                    {(user as any).isAdmin && (
                      <Button
                        variant="outline"
                        onClick={onAdminClick}
                        className="w-full border-purple-500 text-purple-600 hover:bg-purple-50 gap-2 font-semibold"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        {language === 'en' ? 'Admin Dashboard' : 'පරිපාලක මණ්ඩලය'}
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      onClick={onProfileClick}
                      className="w-full gap-2"
                    >
                      <User className="w-4 h-4" />
                      {user.name || (language === 'en' ? 'Profile' : 'පැතිකඩ')}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleLogout}
                      className="w-full border-red-400 text-red-500 hover:bg-red-50 gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      {language === 'en' ? 'Logout' : 'ඉවත් වන්න'}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="outline" 
                      onClick={onProfileClick}
                      className="w-full gap-2"
                    >
                      <User className="w-4 h-4" />
                      {language === 'en' ? 'Profile' : 'පැතිකඩ'}
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={onLoginClick}
                      className="w-full border-green-600 text-green-600"
                    >
                      {language === 'en' ? 'Login' : 'පුරන්න'}
                    </Button>
                    <Button 
                      onClick={onGetStartedClick}
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                    >
                      {language === 'en' ? 'Get Started' : 'ආරම්භ කරන්න'}
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
