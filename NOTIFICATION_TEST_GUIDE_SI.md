# 🔔 දැනුම්දීම් පද්ධතිය පරීක්ෂා කිරීමේ මාර්ගෝපදේශය - EduQuest

## ✅ Backend එකක් අවශ්‍ය නෑ! 100% Frontend!

Notification system එක **Browser Notifications API** use කරලා තියෙන්නේ. ඒ නිසා backend එකක් නැතුව **දැන්ම test කරන්න පුළුවන්!**

---

## 🚀 ඉක්මන් පරීක්ෂණය - දැන්ම Try කරන්න!

### **ක්‍රමය 1: Browser Console එකෙන් Test කරමු**

1. **App එක open කරන්න:** `http://localhost:5173`
2. **Browser Console open කරන්න:** `F12` හෝ `Right Click → Inspect → Console`
3. **මේ commands type කරන්න:**

```javascript
// Step 1: Notifications support කරනවද බලමු
console.log('Notifications supported:', 'Notification' in window);

// Step 2: දැනට permission එක check කරමු
console.log('Permission:', Notification.permission);

// Step 3: Permission request කරමු (granted නැත්නම්)
Notification.requestPermission().then(permission => {
  console.log('Permission granted:', permission === 'granted');
});

// Step 4: Test notification එකක් යවමු
new Notification('🎉 EduQuest Test', {
  body: 'දැනුම්දීම් හොඳින් වැඩ කරයි!',
  vibrate: [200, 100, 200]
});
```

**ලැබිය යුතු ප්‍රතිඵලය:**
```
Notifications supported: true
Permission: "default" (හෝ "granted" හෝ "denied")
Permission granted: true
[ඔබට notification popup එකක් පෙනේවි!]
```

---

### **ක්‍රමය 2: Settings Page එක Use කරමු (නිර්දේශිත)**

#### **පියවර:**

1. **App එක start කරන්න:** `npm run dev`

2. **Navigate කරන්න:**
   ```
   Home → Profile (top right) → Settings (top right button)
   ```

3. **Notifications Enable කරන්න:**
   - **"Notifications"** toggle එක **ON** කරන්න
   - Browser එකෙන් permission popup එකක් එයි → **"Allow"** click කරන්න
   - ✅ Permission ලැබුණා!

4. **Settings Configure කරන්න:**
   - ✅ **"Daily Reminder"** enable කරන්න
   - Time set කරන්න: උදා., **18:00** (සවස 6)
   - ✅ **"Streak Warning"** enable කරන්න
   - ✅ **"Achievement Alerts"** enable කරන්න

5. **දැන්ම Test කරන්න:**
   - **"Send Test Notification"** button එක click කරන්න
   - 🎉 ඔබට notification එකක් පෙනේවි!

---

## 🧪 **විස්තරාත්මක පරීක්ෂණ සිනාරියෝ**

### **Test 1: Permission Request**

```javascript
// Console එකේ run කරන්න:
const notificationService = await import('/src/services/notificationService.ts');
const service = notificationService.notificationService;

// Permission request කරන්න
const granted = await service.requestPermission();
console.log('Permission granted:', granted);
```

**ප්‍රතිඵලය:**
- Browser එකෙන් permission dialog එකක් එයි
- Allow කළොත් `true`, Deny කළොත් `false`

---

### **Test 2: දෛනික මතක් කිරීම (Daily Reminder)**

**විකල්පය A: UI Test**
1. Settings වෙත යන්න
2. Notifications enable කරන්න
3. Daily Reminder enable කරන්න
4. **දැනට වේලාව + 1 මිනිත්තුව** set කරන්න (උදා., දැන් 2:30 PM නම්, 2:31 PM set කරන්න)
5. මිනිත්තුවක් බලාගෙන ඉන්න
6. 🔔 Notification එක එයි!

**විකල්පය B: Console Test**
```javascript
// Manually trigger reminder
const { notificationService } = await import('/src/services/notificationService.ts');
notificationService.sendDailyReminder();
```

**ප්‍රතිඵලය:**
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

**ප්‍රතිඵලය:**
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

**ප්‍රතිඵලය:**
```
🏆 Achievement Unlocked!
Week Warrior: Maintain a 7-day streak
```

---

### **Test 5: Streak Auto-Update (Integration Test)**

**පියවර:**
1. Lessons page වෙත යන්න
2. ඕනෑම lesson එකක් select කරන්න
3. Quiz එක 70%+ score එකක් ගෙන complete කරන්න
4. Console open කරන්න
5. Check කරන්න: `console.log(JSON.parse(localStorage.getItem('user')).lastActivityDate)`
6. අද දිනය පෙන්විය යුතුයි!

**ඊළඟ දවසේ නැවත කරන්න:**
- තවත් lesson එකක් complete කරන්න
- Streak check කරන්න: `console.log(JSON.parse(localStorage.getItem('user')).streak)`
- 1 කින් වැඩි විය යුතුයි!

---

## 🎯 **සත්‍යාපන පරීක්ෂා ලැයිස්තුව**

### ✅ **පරීක්ෂණයට පෙර:**
- [ ] App එක run වෙනවද (`npm run dev`)
- [ ] නවීන browser එකක් use කරනවද (Chrome, Firefox, Edge)
- [ ] Incognito/Private mode එකේ නෙමෙද (notifications block විය හැකියි)
- [ ] Browser notifications globally disable කරලා නැද්ද

### ✅ **පරීක්ෂණ අතරතුර:**
- [ ] Permission dialog එක එනවද
- [ ] Permission granted වෙනවද
- [ ] Test notification එක පෙන්වනවද
- [ ] Settings page load වෙනවද
- [ ] Toggles වැඩ කරනවද

### ✅ **පරීක්ෂණයෙන් පසුව:**
- [ ] Settings save වෙනවද (page refresh කරලා බලන්න)
- [ ] Notifications scheduled time එකට එනවද
- [ ] Lessons complete වෙද්දී streak update වෙනවද
- [ ] Console එකේ errors නැද්ද

---

## 🔍 **වත්මන් තත්ත්වය පරීක්ෂා කරන්න**

### **Browser Console එකෙන්:**

```javascript
// 1. User ට notification settings තියෙනවද බලමු
const user = JSON.parse(localStorage.getItem('user'));
console.log('User settings:', user?.notificationSettings);

// 2. Permission status බලමු
console.log('Permission:', Notification.permission);

// 3. Service initialize වෙලාද බලමු
const { notificationService } = await import('/src/services/notificationService.ts');
console.log('Service:', notificationService);

// 4. Reminders schedule වෙලාද බලමු
console.log('Reminder scheduled:', notificationService.reminderTimeout !== null);
```

**ලැබිය යුතු ප්‍රතිඵලය:**
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

## 🐛 **ගැටළු විසඳීම**

### **ගැටළුව: "Permission Denied"**
**විසඳුම:**
1. Browser settings → Site settings → Notifications
2. `localhost:5173` සඳහා notifications Allow කරන්න
3. Page refresh කරන්න
4. නැවත try කරන්න

### **ගැටළුව: "Notifications පෙන්වන්නේ නැහැ"**
**විසඳුම:**
1. Browser notification settings check කරන්න
2. OS notification settings check කරන්න (Windows/Mac)
3. "Do Not Disturb" mode එකේ නැද්ද බලන්න
4. වෙනත් browser එකක try කරන්න

### **ගැටළුව: "Permission popup එක එන්නේ නැහැ"**
**විසඳුම:**
1. Browser cache clear කරන්න
2. Hard refresh: `Ctrl+Shift+R` (Windows) හෝ `Cmd+Shift+R` (Mac)
3. පෙර permission denied කරලා තිබේද බලන්න
4. Browser settings එකෙන් site permissions reset කරන්න

### **ගැටළුව: "Reminder fire වෙන්නේ නැහැ"**
**විසඳුම:**
1. Console එකේ scheduled time එක බලන්න: "⏰ Reminder scheduled for..." පෙන්විය යුතුයි
2. Page open තියෙනවද තහවුරු කරන්න (page close නම් fire වෙන්නේ නැහැ)
3. Time නිවැරදිව set වෙලාද බලන්න
4. Test කරන්න current time + 1 minute set කරලා

---

## 📊 **Browser ගැළපුම**

| Browser | Support | Test Command |
|---------|---------|--------------|
| Chrome | ✅ සම්පූර්ණ | හොඳින් වැඩ කරයි |
| Firefox | ✅ සම්පූර්ණ | හොඳින් වැඩ කරයි |
| Edge | ✅ සම්පූර්ණ | හොඳින් වැඩ කරයි |
| Safari | ⚠️ අර්ධ | macOS Big Sur+ අවශ්‍යයි |
| Opera | ✅ සම්පූර්ණ | හොඳින් වැඩ කරයි |

---

## 🎓 **මෙය වැඩ කරන ආකාරය (තාක්ෂණික)**

### **1. Browser Notifications API**
```javascript
// Permission request කරන්න
Notification.requestPermission()

// Notification එකක් හදන්න
new Notification('Title', {
  body: 'Message',
  tag: 'unique-id'
})
```

### **2. LocalStorage සඳහා Settings**
```javascript
// Settings save කරන්න
localStorage.setItem('user', JSON.stringify({
  ...user,
  notificationSettings: { ... }
}))

// Settings load කරන්න
const user = JSON.parse(localStorage.getItem('user'))
```

### **3. ස්වයංක්‍රීය Scheduling**
```javascript
// Reminder එක දක්වා කාලය ගණනය කරන්න
const msUntilReminder = scheduledTime.getTime() - now.getTime();

// Timeout set කරන්න
setTimeout(() => {
  sendDailyReminder();
  scheduleReminders(); // ඊළඟ දවසට නැවත schedule කරන්න
}, msUntilReminder);
```

---

## ✅ **ඉක්මන් සත්‍යාපනය (මිනිත්තු 5)**

### **දැන්ම මෙය කරන්න:**

1. **Browser එකේ app එක open කරන්න**
   ```bash
   npm run dev
   # Open: http://localhost:5173
   ```

2. **Console Open කරන්න (F12)**

3. **Paste කරලා run කරන්න:**
   ```javascript
   // Notifications enable කරන්න
   await Notification.requestPermission();
   
   // Test එකක් යවන්න
   new Notification('✅ Test Successful!', {
     body: 'දැනුම්දීම් වැඩ කරයි! Backend එකක් ඕන නෑ! 🎉'
   });
   ```

4. **Notification එක පෙනුණාද?**
   - ✅ ඔව් → සියල්ල වැඩ කරයි!
   - ❌ නැහැ → ගැටළු විසඳීම් බලන්න

---

## 🎉 **සාරාංශය**

| ප්‍රශ්නය | පිළිතුර |
|----------|--------|
| Backend අවශ්‍යද? | ❌ නැහැ |
| දැන් test කරන්න පුළුවන්ද? | ✅ ඔව් |
| Offline වැඩ කරනවද? | ✅ ඔව් (page load වීමෙන් පසු) |
| Internet ඕනද? | ❌ නැහැ (app load කරන්න විතරයි) |
| Free ද? | ✅ ඔව් (browser API) |
| Cross-platform ද? | ✅ ඔව් (සියලුම නවීන browsers) |

---

## 🚀 **මීළඟ පියවර**

1. **දැන්ම test කරන්න** ඉහත ක්‍රමය 1 හෝ 2 use කරලා
2. **ප්‍රතිඵල වාර්තා කරන්න** - වැඩ කළාද?
3. **Customize කරන්න** reminder times ඔබේ කැමැත්ත පරිදි
4. **විනෝද වන්න** ස්වයංක්‍රීය daily reminders සහ streak tracking සමඟ!

---

**🔥 Backend එකක් ඕන නෑ - Pure Frontend Power! 🔥**
