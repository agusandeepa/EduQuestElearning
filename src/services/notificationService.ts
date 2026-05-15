// Notification Service for EduQuest
import { getUser, updateUser } from './localStorage';
import type { NotificationSettings } from './types';

export class NotificationService {
  private static instance: NotificationService;
  private notificationPermission: NotificationPermission = 'default';
  private reminderTimeout: number | null = null;

  private constructor() {
    this.checkPermission();
    this.scheduleReminders();
  }

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  // Check browser notification permission
  private async checkPermission(): Promise<void> {
    if ('Notification' in window) {
      this.notificationPermission = Notification.permission;
    }
  }

  // Request notification permission
  async requestPermission(): Promise<boolean> {
    if (!('Notification' in window)) {
      console.warn('This browser does not support notifications');
      return false;
    }

    if (this.notificationPermission === 'granted') {
      return true;
    }

    const permission = await Notification.requestPermission();
    this.notificationPermission = permission;
    return permission === 'granted';
  }

  // Send a browser notification
  sendNotification(title: string, options?: NotificationOptions): void {
    if (!('Notification' in window)) {
      console.warn('Browser notifications not supported');
      return;
    }

    if (this.notificationPermission !== 'granted') {
      console.warn('Notification permission not granted');
      return;
    }

    const defaultOptions = {
      vibrate: [200, 100, 200],
      ...options,
    } as NotificationOptions;

    new Notification(title, defaultOptions);
  }

  // Daily reminder notification
  sendDailyReminder(): void {
    const user = getUser();
    if (!user) return;

    const settings = user.notificationSettings;
    if (!settings?.enabled || !settings?.dailyReminder) return;

    this.sendNotification('📚 Time to Learn!', {
      body: "Don't forget to continue your history journey today! Keep your streak alive 🔥",
      tag: 'daily-reminder',
      requireInteraction: false,
    });
  }

  // Streak warning notification
  sendStreakWarning(streakDays: number): void {
    const user = getUser();
    if (!user) return;

    const settings = user.notificationSettings;
    if (!settings?.enabled || !settings?.streakWarning) return;

    this.sendNotification('⚠️ Streak Warning!', {
      body: `You haven't learned today! Your ${streakDays}-day streak is at risk! 🔥`,
      tag: 'streak-warning',
      requireInteraction: true,
    });
  }

  // Achievement unlocked notification
  sendAchievementNotification(achievementName: string, description: string): void {
    const user = getUser();
    if (!user) return;

    const settings = user.notificationSettings;
    if (!settings?.enabled || !settings?.achievementNotifications) return;

    this.sendNotification(`🏆 Achievement Unlocked!`, {
      body: `${achievementName}: ${description}`,
      tag: 'achievement',
      requireInteraction: false,
    });
  }

  // Schedule daily reminders
  scheduleReminders(): void {
    const user = getUser();
    if (!user?.notificationSettings?.enabled || !user.notificationSettings.dailyReminder) {
      return;
    }

    // Clear existing timeout
    if (this.reminderTimeout) {
      clearTimeout(this.reminderTimeout);
    }

    const settings = user.notificationSettings;
    const [hours, minutes] = settings.reminderTime.split(':').map(Number);

    // Calculate milliseconds until next reminder time
    const now = new Date();
    const scheduledTime = new Date();
    scheduledTime.setHours(hours, minutes, 0, 0);

    // If the time has passed today, schedule for tomorrow
    if (scheduledTime <= now) {
      scheduledTime.setDate(scheduledTime.getDate() + 1);
    }

    const msUntilReminder = scheduledTime.getTime() - now.getTime();

    // Schedule the reminder
    this.reminderTimeout = window.setTimeout(() => {
      this.sendDailyReminder();
      // Reschedule for next day
      this.scheduleReminders();
    }, msUntilReminder);

    console.log(`⏰ Reminder scheduled for ${scheduledTime.toLocaleString()}`);
  }

  // Check if user needs streak warning (hasn't learned today)
  checkStreakStatus(): void {
    const user = getUser();
    if (!user) return;

    const lastActivity = user.lastActivityDate;
    if (!lastActivity) return;

    const lastActivityDate = new Date(lastActivity);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    lastActivityDate.setHours(0, 0, 0, 0);

    const daysSinceActivity = Math.floor(
      (today.getTime() - lastActivityDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    // If user hasn't learned today (and it's past noon), send warning
    const currentHour = new Date().getHours();
    if (daysSinceActivity >= 1 && currentHour >= 12) {
      this.sendStreakWarning(user.streak);
    }
  }

  // Update user's last activity date (call this when user completes a lesson)
  updateLastActivity(): void {
    const user = getUser();
    if (!user) return;

    const today = new Date().toISOString();
    const lastActivity = user.lastActivityDate;

    if (lastActivity) {
      const lastDate = new Date(lastActivity);
      const currentDate = new Date();
      lastDate.setHours(0, 0, 0, 0);
      currentDate.setHours(0, 0, 0, 0);

      const daysDiff = Math.floor(
        (currentDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (daysDiff === 1) {
        // Consecutive day - increment streak
        updateUser({ 
          lastActivityDate: today,
          streak: user.streak + 1 
        });
      } else if (daysDiff === 0) {
        // Same day - just update timestamp
        updateUser({ lastActivityDate: today });
      } else {
        // Streak broken - reset to 1
        updateUser({ 
          lastActivityDate: today,
          streak: 1 
        });
      }
    } else {
      // First time activity
      updateUser({ lastActivityDate: today });
    }
  }

  // Get default notification settings
  static getDefaultSettings(): NotificationSettings {
    return {
      enabled: false,
      dailyReminder: true,
      reminderTime: '18:00', // 6 PM default
      streakWarning: true,
      achievementNotifications: true,
    };
  }

  // Update notification settings
  async updateSettings(settings: Partial<NotificationSettings>): Promise<boolean> {
    const user = getUser();
    if (!user) return false;

    const currentSettings = user.notificationSettings || NotificationService.getDefaultSettings();
    const newSettings = { ...currentSettings, ...settings };

    // If enabling notifications, request permission
    if (newSettings.enabled && !currentSettings.enabled) {
      const granted = await this.requestPermission();
      if (!granted) {
        newSettings.enabled = false;
        return false;
      }
    }

    updateUser({ notificationSettings: newSettings });

    // Reschedule reminders if settings changed
    if (newSettings.dailyReminder && newSettings.enabled) {
      this.scheduleReminders();
    } else if (this.reminderTimeout) {
      clearTimeout(this.reminderTimeout);
      this.reminderTimeout = null;
    }

    return true;
  }
}

// Export singleton instance
export const notificationService = NotificationService.getInstance();