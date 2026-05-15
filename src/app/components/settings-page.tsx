import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { motion } from "motion/react";
import { 
  ArrowLeft, 
  Bell, 
  BellOff,
  Clock,
  Flame,
  Trophy,
  Settings as SettingsIcon,
  Check,
  X,
  Sun,
  Moon
} from "lucide-react";
import { getUser } from "../../services/localStorage";
import { useTheme } from "../../contexts/ThemeContext";
import { notificationService, NotificationService } from "../../services/notificationService";
import type { NotificationSettings } from "../../services/types";
import { toast } from "sonner";
import { useLanguage } from "../../contexts/LanguageContext";

interface SettingsPageProps {
  onBack: () => void;
}

export function SettingsPage({ onBack }: SettingsPageProps) {
  const { language } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const user = getUser();
  
  const [settings, setSettings] = useState<NotificationSettings>(
    user?.notificationSettings || NotificationService.getDefaultSettings()
  );
  
  const [notificationSupported, setNotificationSupported] = useState(true);
  const [permissionStatus, setPermissionStatus] = useState<NotificationPermission>('default');

  useEffect(() => {
    // Check if notifications are supported
    if (!('Notification' in window)) {
      setNotificationSupported(false);
    } else {
      setPermissionStatus(Notification.permission);
    }
  }, []);

  const handleToggleNotifications = async () => {
    const newEnabled = !settings.enabled;
    
    if (newEnabled) {
      // Request permission when enabling
      const granted = await notificationService.requestPermission();
      
      if (!granted) {
        toast.error(
          language === 'en' 
            ? "❌ Notification permission denied" 
            : "❌ දැනුම්දීම් අවසරය ප්‍රතික්ෂේප විය"
        );
        return;
      }
      
      setPermissionStatus('granted');
      toast.success(
        language === 'en' 
          ? "✅ Notifications enabled!" 
          : "✅ දැනුම්දීම් සක්‍රීය කළා!"
      );
    }

    const updated = await notificationService.updateSettings({ enabled: newEnabled });
    
    if (updated) {
      setSettings({ ...settings, enabled: newEnabled });
    }
  };

  const handleToggleDailyReminder = async () => {
    const newValue = !settings.dailyReminder;
    const updated = await notificationService.updateSettings({ dailyReminder: newValue });
    
    if (updated) {
      setSettings({ ...settings, dailyReminder: newValue });
      toast.success(
        language === 'en' 
          ? `Daily reminder ${newValue ? 'enabled' : 'disabled'}` 
          : `දෛනික මතක් කිරීම ${newValue ? 'සක්‍රීය' : 'අක්‍රීය'} විය`
      );
    }
  };

  const handleToggleStreakWarning = async () => {
    const newValue = !settings.streakWarning;
    const updated = await notificationService.updateSettings({ streakWarning: newValue });
    
    if (updated) {
      setSettings({ ...settings, streakWarning: newValue });
    }
  };

  const handleToggleAchievements = async () => {
    const newValue = !settings.achievementNotifications;
    const updated = await notificationService.updateSettings({ 
      achievementNotifications: newValue 
    });
    
    if (updated) {
      setSettings({ ...settings, achievementNotifications: newValue });
    }
  };

  const handleTimeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = e.target.value;
    const updated = await notificationService.updateSettings({ reminderTime: newTime });
    
    if (updated) {
      setSettings({ ...settings, reminderTime: newTime });
      toast.success(
        language === 'en' 
          ? `⏰ Reminder time updated to ${newTime}` 
          : `⏰ මතක් කිරීමේ වේලාව ${newTime} වෙත යාවත්කාලීන විය`
      );
    }
  };

  const handleTestNotification = () => {
    if (permissionStatus !== 'granted') {
      toast.error(
        language === 'en' 
          ? "Please enable notifications first" 
          : "කරුණාකර පළමුව දැනුම්දීම් සක්‍රීය කරන්න"
      );
      return;
    }

    notificationService.sendNotification(
      language === 'en' ? '🎉 Test Notification' : '🎉 පරීක්ෂණ දැනුම්දීම',
      {
        body: language === 'en' 
          ? 'Notifications are working perfectly!' 
          : 'දැනුම්දීම් හොඳින් වැඩ කරයි!',
        tag: 'test-notification',
      }
    );

    toast.success(
      language === 'en' 
        ? "Test notification sent!" 
        : "පරීක්ෂණ දැනුම්දීම යවන ලදී!"
    );
  };

  const content = language === 'en' ? {
    title: 'Settings',
    subtitle: 'Manage your notification preferences',
    notifications: 'Notifications',
    notificationsDesc: 'Enable browser notifications',
    notSupported: 'Your browser does not support notifications',
    dailyReminder: 'Daily Reminder',
    dailyReminderDesc: 'Get reminded to learn every day',
    reminderTime: 'Reminder Time',
    streakWarning: 'Streak Warning',
    streakWarningDesc: 'Alert when your streak is at risk',
    achievements: 'Achievement Alerts',
    achievementsDesc: 'Notify when you unlock achievements',
    testButton: 'Send Test Notification',
    preview: 'Notification Preview',
    previewDesc: 'See how notifications will look',
  } : {
    title: 'සැකසුම්',
    subtitle: 'ඔබේ දැනුම්දීම් මනාපයන් කළමනාකරණය කරන්න',
    notifications: 'දැනුම්දීම්',
    notificationsDesc: 'බ්‍රවුසර දැනුම්දීම් සක්‍රීය කරන්න',
    notSupported: 'ඔබේ බ්‍රවුසරය දැනුම්දීම් සඳහා සහාය නොදක්වයි',
    dailyReminder: 'දෛනික මතක් කිරීම',
    dailyReminderDesc: 'සෑම දිනකම ඉගෙන ගන්න මතක් කරයි',
    reminderTime: 'මතක් කිරීමේ වේලාව',
    streakWarning: 'Streak අනතුරු ඇඟවීම',
    streakWarningDesc: 'ඔබේ streak එක අහිමි වීමට ලක්විය හැකි විට දැනුම් දෙයි',
    achievements: 'ජයග්‍රහණ දැනුම්දීම්',
    achievementsDesc: 'ජයග්‍රහණ අනලොක් වූ විට දැනුම් දෙයි',
    testButton: 'පරීක්ෂණ දැනුම්දීමක් යවන්න',
    preview: 'දැනුම්දීම් පෙරදසුන',
    previewDesc: 'දැනුම්දීම් කෙසේ පෙනෙයිද බලන්න',
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={onBack} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            {language === 'en' ? 'Back' : 'ආපසු'}
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-4 mb-2">
              <div className="bg-green-100 p-3 rounded-2xl">
                <SettingsIcon className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h1 className="text-3xl font-extrabold text-gray-900">
                  {content.title}
                </h1>
                <p className="text-gray-600">{content.subtitle}</p>
              </div>
            </div>
          </motion.div>

          {/* Settings Sections */}
          <div className="space-y-6">

            {/* Appearance Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {language === 'en' ? '🎨 Appearance' : '🎨 පෙනුම'}
              </h2>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center">
                    {isDark ? <Moon className="w-6 h-6 text-blue-500" /> : <Sun className="w-6 h-6 text-yellow-500" />}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {language === 'en' ? 'Dark Mode' : 'අඳුරු මෝදය'}
                    </p>
                    <p className="text-sm text-gray-600">
                      {isDark
                        ? (language === 'en' ? 'Currently using dark theme' : 'දැනට අඳුරු තේමාව')
                        : (language === 'en' ? 'Currently using light theme' : 'දැනට සැහැල්ලු තේමාව')}
                    </p>
                  </div>
                </div>
                <button
                  onClick={toggleTheme}
                  className={`relative w-14 h-7 rounded-full transition-colors duration-200 ${
                    isDark ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform duration-200 ${
                    isDark ? 'translate-x-7' : 'translate-x-0'
                  }`} />
                </button>
              </div>
            </motion.div>
            {/* Browser Support Warning */}
            {!notificationSupported && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-yellow-50 border-2 border-yellow-200 rounded-3xl p-6"
              >
                <div className="flex items-start gap-3">
                  <BellOff className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-yellow-900 mb-1">
                      {content.notSupported}
                    </h3>
                    <p className="text-sm text-yellow-800">
                      {language === 'en' 
                        ? 'Please use a modern browser like Chrome, Firefox, or Edge to enable notifications.'
                        : 'දැනුම්දීම් සක්‍රීය කිරීමට Chrome, Firefox හෝ Edge වැනි නවීන බ්‍රවුසරයක් භාවිතා කරන්න.'}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Main Notifications Toggle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {settings.enabled ? (
                    <Bell className="w-8 h-8 text-green-600" />
                  ) : (
                    <BellOff className="w-8 h-8 text-gray-400" />
                  )}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {content.notifications}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {content.notificationsDesc}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleToggleNotifications}
                  disabled={!notificationSupported}
                  className={`relative w-16 h-8 rounded-full transition-colors ${
                    settings.enabled ? 'bg-green-600' : 'bg-gray-300'
                  } ${!notificationSupported ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <motion.div
                    animate={{ x: settings.enabled ? 32 : 4 }}
                    className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-md"
                  />
                </button>
              </div>
            </motion.div>

            {/* Notification Settings (only show if enabled) */}
            {settings.enabled && (
              <>
                {/* Daily Reminder */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-3xl p-6 shadow-lg"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <Clock className="w-7 h-7 text-blue-600" />
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">
                          {content.dailyReminder}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {content.dailyReminderDesc}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleToggleDailyReminder}
                      className={`relative w-14 h-7 rounded-full transition-colors ${
                        settings.dailyReminder ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <motion.div
                        animate={{ x: settings.dailyReminder ? 28 : 4 }}
                        className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-md"
                      />
                    </button>
                  </div>

                  {/* Time Picker */}
                  {settings.dailyReminder && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        {content.reminderTime}
                      </label>
                      <input
                        type="time"
                        value={settings.reminderTime}
                        onChange={handleTimeChange}
                        className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  )}
                </motion.div>

                {/* Streak Warning */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-3xl p-6 shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Flame className="w-7 h-7 text-orange-600" />
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">
                          {content.streakWarning}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {content.streakWarningDesc}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleToggleStreakWarning}
                      className={`relative w-14 h-7 rounded-full transition-colors ${
                        settings.streakWarning ? 'bg-orange-600' : 'bg-gray-300'
                      }`}
                    >
                      <motion.div
                        animate={{ x: settings.streakWarning ? 28 : 4 }}
                        className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-md"
                      />
                    </button>
                  </div>
                </motion.div>

                {/* Achievement Notifications */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-3xl p-6 shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Trophy className="w-7 h-7 text-yellow-600" />
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">
                          {content.achievements}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {content.achievementsDesc}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleToggleAchievements}
                      className={`relative w-14 h-7 rounded-full transition-colors ${
                        settings.achievementNotifications ? 'bg-yellow-600' : 'bg-gray-300'
                      }`}
                    >
                      <motion.div
                        animate={{ x: settings.achievementNotifications ? 28 : 4 }}
                        className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-md"
                      />
                    </button>
                  </div>
                </motion.div>

                {/* Test Notification Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-gradient-to-r from-green-400 to-blue-500 rounded-3xl p-6 text-white shadow-xl"
                >
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <h3 className="text-xl font-bold mb-1">
                        {content.preview}
                      </h3>
                      <p className="text-green-100 text-sm">
                        {content.previewDesc}
                      </p>
                    </div>
                    <Button
                      onClick={handleTestNotification}
                      className="bg-white text-green-600 hover:bg-gray-100"
                    >
                      <Bell className="w-4 h-4 mr-2" />
                      {content.testButton}
                    </Button>
                  </div>
                </motion.div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
