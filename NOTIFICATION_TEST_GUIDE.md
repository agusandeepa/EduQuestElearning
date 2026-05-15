# 🔔 Notification System Testing Guide - EduQuest

## ✅ Backend අවශ්‍ය නෑ! 100% Frontend!

Notification system එක **Browser Notifications API** use කරලා තියෙන්නේ. ඒ නිසා backend එකක් නැතුව **දැන්ම test කරන්න පුළුවන්!**

---

## 🚀 Quick Test - දැන්ම Try කරන්න!

### **Method 1: Browser Console එකෙන් Test කරමු**

1. **Open your app:** `http://localhost:5173`
2. **Open Browser Console:** `F12` හෝ `Right Click → Inspect → Console`
3. **Type these commands:**

```javascript
// Step 1: Check if notifications are supported
console.log('Notifications supported:', 'Notification' in window);

// Step 2: Check current permission
console.log('Permission:', Notification.permission);

// Step 3: Request permission (if not granted)
Notification.requestPermission().then(permission => {
  console.log('Permission granted:', permission === 'granted');
});

// Step 4: Send a test notification
new Notification('🎉 EduQuest Test', {
  body: 'Notifications are working perfectly!',
  vibrate: [200, 100, 200]
});
```

**Expected Output:**
```
Notifications supported: true
Permission: "default" (or "granted" or "denied")
Permission granted: true
[You should see a notification popup!]
```

---

### **Method 2: Use the Settings Page (Recommended)**

#### **Step-by-Step:**

1. **Start your app:** `npm run dev`

2. **Navigate:**
   ```
   Home → Profile (top right) → Settings (top right button)
   ```

3. **Enable Notifications:**
   - Toggle **"Notifications"** to **ON**
   - Browser will show permission popup → Click **"Allow"**
   - ✅ Permission granted!

4. **Configure Settings:**
   - ✅ Enable **"Daily Reminder"**
   - Set time: e.g., **18:00** (6 PM)
   - ✅ Enable **"Streak Warning"**
   - ✅ Enable **"Achievement Alerts"**

5. **Test Immediately:**
   - Click **"Send Test Notification"** button
   - 🎉 You should see a notification!

---

## 🧪 **Detailed Testing Scenarios**

### **Test 1: Permission Request**

```javascript
// Open Console and run:
const notificationService = await import('/src/services/notificationService.ts');
const service = notificationService.notificationService;

// Request permission
const granted = await service.requestPermission();
console.log('Permission granted:', granted);
```

**Expected:**
- Browser shows permission dialog
- Returns `true` if allowed, `false` if denied

---

### **Test 2: Daily Reminder**

**Option A: UI Test**
1. Go to Settings
2. Enable Notifications
3. Enable Daily Reminder
4. Set time to **current time + 1 minute** (e.g., if 2:30 PM, set to 2:31 PM)
5. Wait 1 minute
6. 🔔 Notification should appear!

**Option B: Console Test**
```javascript
// Manually trigger reminder
const { notificationService } = await import('/src/services/notificationService.ts');
notificationService.sendDailyReminder();
```

**Expected:**
```
📚 Time to Learn!
Don't forget to continue your history journey today! Keep your streak alive 🔥
```

---

### **Test 3: Streak Warning**

```javascript
// Console test
const { notificationService } = await import('/src/services/notificationService.ts');
notificationService.sendStreakWarning(12);
```

**Expected:**
```
⚠️ Streak Warning!
You haven't learned today! Your 12-day streak is at risk! 🔥
```

---

### **Test 4: Achievement Notification**

```javascript
// Console test
const { notificationService } = await import('/src/services/notificationService.ts');
notificationService.sendAchievementNotification('Week Warrior', 'Maintain a 7-day streak');
```

**Expected:**
```
🏆 Achievement Unlocked!
Week Warrior: Maintain a 7-day streak
```

---

### **Test 5: Streak Auto-Update (Integration Test)**

**Steps:**
1. Go to Lessons page
2. Select any lesson
3. Complete the quiz with 70%+ score
4. Open Console
5. Check: `console.log(JSON.parse(localStorage.getItem('user')).lastActivityDate)`
6. Should show today's date!

**Repeat next day:**
- Complete another lesson
- Check streak: `console.log(JSON.parse(localStorage.getItem('user')).streak)`
- Should increment by 1!

---

## 🎯 **Verification Checklist**

### ✅ **Before Testing:**
- [ ] App is running (`npm run dev`)
- [ ] Using modern browser (Chrome, Firefox, Edge)
- [ ] Not in Incognito/Private mode (notifications may be blocked)
- [ ] Browser notifications not globally disabled

### ✅ **During Testing:**
- [ ] Permission dialog appears
- [ ] Permission is granted
- [ ] Test notification appears
- [ ] Settings page loads correctly
- [ ] Toggles work properly

### ✅ **After Testing:**
- [ ] Settings persist (refresh page, check if still enabled)
- [ ] Notifications appear at scheduled time
- [ ] Streak updates after completing lessons
- [ ] Console shows no errors

---

## 🔍 **Check Current Status**

### **Check in Browser Console:**

```javascript
// 1. Check if user has notification settings
const user = JSON.parse(localStorage.getItem('user'));
console.log('User settings:', user?.notificationSettings);

// 2. Check permission status
console.log('Permission:', Notification.permission);

// 3. Check if service is initialized
const { notificationService } = await import('/src/services/notificationService.ts');
console.log('Service:', notificationService);

// 4. Check scheduled reminders
console.log('Reminder scheduled:', notificationService.reminderTimeout !== null);
```

**Expected Output:**
```javascript
User settings: {
  enabled: true,
  dailyReminder: true,
  reminderTime: "18:00",
  streakWarning: true,
  achievementNotifications: true
}
Permission: "granted"
Service: NotificationService { ... }
Reminder scheduled: true
```

---

## 🐛 **Troubleshooting**

### **Problem: "Permission Denied"**
**Solution:**
1. Browser settings → Site settings → Notifications
2. Allow notifications for `localhost:5173`
3. Refresh page
4. Try again

### **Problem: "Notifications not appearing"**
**Solution:**
1. Check browser notification settings
2. Check OS notification settings (Windows/Mac)
3. Ensure not in "Do Not Disturb" mode
4. Try different browser

### **Problem: "Permission popup not showing"**
**Solution:**
1. Clear browser cache
2. Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
3. Check if permission was already denied before
4. Reset site permissions in browser settings

### **Problem: "Reminder not firing"**
**Solution:**
1. Check console for scheduled time: Should see "⏰ Reminder scheduled for..."
2. Ensure page is open (notifications won't fire if page is closed)
3. Check if time is set correctly
4. Try setting time to current time + 1 minute for testing

---

## 📊 **Browser Compatibility**

| Browser | Support | Test Command |
|---------|---------|--------------|
| Chrome | ✅ Full | Works perfectly |
| Firefox | ✅ Full | Works perfectly |
| Edge | ✅ Full | Works perfectly |
| Safari | ⚠️ Partial | Requires macOS Big Sur+ |
| Opera | ✅ Full | Works perfectly |

---

## 🎓 **How It Works (Technical)**

### **1. Browser Notifications API**
```javascript
// Request permission
Notification.requestPermission()

// Create notification
new Notification('Title', {
  body: 'Message',
  tag: 'unique-id'
})
```

### **2. LocalStorage for Settings**
```javascript
// Save settings
localStorage.setItem('user', JSON.stringify({
  ...user,
  notificationSettings: { ... }
}))

// Load settings
const user = JSON.parse(localStorage.getItem('user'))
```

### **3. Automatic Scheduling**
```javascript
// Calculate time until reminder
const msUntilReminder = scheduledTime.getTime() - now.getTime();

// Set timeout
setTimeout(() => {
  sendDailyReminder();
  scheduleReminders(); // Reschedule for next day
}, msUntilReminder);
```

---

## ✅ **Quick Verification (5 Minutes)**

### **Do This Right Now:**

1. **Open app in browser**
   ```bash
   npm run dev
   # Open: http://localhost:5173
   ```

2. **Open Console (F12)**

3. **Paste and run:**
   ```javascript
   // Enable notifications
   await Notification.requestPermission();
   
   // Send test
   new Notification('✅ Test Successful!', {
     body: 'Notifications are working! No backend needed! 🎉'
   });
   ```

4. **Did you see the notification?**
   - ✅ YES → Everything works!
   - ❌ NO → Check troubleshooting section

---

## 🎉 **Summary**

| Question | Answer |
|----------|--------|
| Backend needed? | ❌ NO |
| Can test now? | ✅ YES |
| Works offline? | ✅ YES (after page load) |
| Needs internet? | ❌ NO (except to load app) |
| Free to use? | ✅ YES (browser API) |
| Cross-platform? | ✅ YES (all modern browsers) |

---

## 🚀 **Next Steps**

1. **Test now** using Method 1 or Method 2 above
2. **Report results** - Did it work?
3. **Customize** reminder times to your preference
4. **Enjoy** automatic daily reminders and streak tracking!

---

**🔥 No Backend Needed - Pure Frontend Power! 🔥**
