# 📖 Usage Guide - භාවිත මාර්ගෝපදේශය

**EduQuest** - Gamified O/L History Learning Platform

---

## 🚀 Getting Started

### Starting the Application

```bash
# Install dependencies (first time only)
npm install

# Start development server
npm run dev

# Open browser at http://localhost:5173
```

---

## 👤 User Account

### 1️⃣ Registration

1. Click **"ආරම්භ කරන්න"** (Get Started) button on home page
2. Or click **"Sign Up"** in navigation bar
3. Fill in registration form:
   - **Email:** Your email address
   - **Name:** Your full name
   - **Password:** Choose a secure password
4. Click **"Register"** button
5. ✅ Account created and automatically logged in!

**Note:** Account data stored in browser localStorage

---

### 2️⃣ Login

If you already have an account:

1. Click **"Login"** button in navigation
2. Enter your email and password
3. Click **"Login"**
4. ✅ Logged in!

---

### 3️⃣ Logout

1. Click your profile icon in navigation bar
2. Click **"Logout"** button
3. ✅ Logged out!

---

## 📚 Learning Lessons

### Browsing Lessons

1. On **home page**, scroll to **Learning Path** section
2. View all available lessons organized by level
3. Each lesson card shows:
   - 📖 Lesson title
   - 📝 Description
   - ⭐ Level (1-3)
   - 🎯 XP reward

---

### Starting a Lesson

1. Click on any **lesson card**
2. Read the lesson content
3. View the lesson image
4. Click **"ප්‍රශ්නාවලිය ආරම්භ කරන්න"** (Start Quiz) button

---

### Taking a Quiz

1. Read each question carefully
2. Select your answer from multiple choices
3. Click **"ඊළඟ ප්‍රශ්නය"** (Next Question)
4. After all questions, click **"ප්‍රශ්නාවලිය ඉදිරිපත් කරන්න"** (Submit Quiz)
5. View your results:
   - ✅ Correct answers
   - ❌ Incorrect answers
   - 📊 Score percentage
   - 🏆 XP earned

---

### Lesson Progress

- **Completed lessons** show a ✅ checkmark
- **Locked lessons** require previous lessons to be completed
- Progress automatically saved to localStorage

---

## 📊 Profile & Stats

### Viewing Your Profile

1. Click **profile icon** in navigation bar
2. Or click **"Profile"** menu item
3. View your stats:
   - 🎯 **XP Points:** Total experience points
   - ⭐ **Level:** Current level (based on XP)
   - 🔥 **Streak:** Consecutive learning days
   - 📚 **Completed Lessons:** Number of lessons finished

---

### Quiz History

In profile page, scroll to **Quiz History** section:
- View all your quiz attempts
- See scores for each lesson
- Check submission dates

---

## 🏆 Leaderboard

### Viewing Rankings

1. Click **"Leaderboard"** in navigation
2. See top students ranked by XP
3. Find your position in the rankings
4. View other students':
   - Name
   - Level
   - Total XP
   - Streak

**Note:** Leaderboard includes mock students for demonstration

---

## 🎮 Gamification Features

### XP Points (Experience Points)

- Earn XP by completing lessons
- Each lesson rewards different XP amounts:
  - Level 1 lessons: 50-60 XP
  - Level 2 lessons: 70-80 XP
  - Level 3 lessons: 90+ XP

---

### Leveling Up

- **Level 1:** 0-99 XP
- **Level 2:** 100-199 XP
- **Level 3:** 200-299 XP
- And so on... (each 100 XP = 1 level)

---

### Streaks 🔥

- Track consecutive learning days
- Maintain your streak by completing lessons daily
- (Currently manual tracking - future: automatic daily tracking)

---

## 💾 Data Management

### Local Storage

All your data is stored locally in your browser:

- ✅ User account information
- ✅ Lesson progress
- ✅ Quiz results
- ✅ XP and levels
- ✅ Streaks

---

### Clearing Data

To reset all data:

1. Open browser **DevTools** (F12)
2. Go to **Application** tab
3. Click **Local Storage**
4. Select your site
5. Click **Clear All**
6. Refresh page

**Warning:** This will delete all your progress!

---

### Exporting Data

Currently not supported, but data persists in localStorage:

```javascript
// View your data in browser console:
console.log(localStorage.getItem('history_app_user'));
console.log(localStorage.getItem('history_app_progress'));
```

---

## 🎨 Customization

### Adding More Lessons

Developers can add lessons by editing:

`/src/services/localStorage.ts`

Add new lesson objects to `MOCK_LESSONS` array:

```typescript
{
  id: 6,
  title: "New Lesson Title",
  description: "Lesson description",
  level: 2,
  xp_reward: 85,
  content: {
    text: "Lesson content...",
    image_url: "https://images.unsplash.com/...",
  },
  quiz: {
    questions: [
      {
        id: 1,
        question: "Your question?",
        options: ["A", "B", "C", "D"],
        correct_answer: 0,
      },
    ],
  },
}
```

---

### Changing Theme Colors

Edit Tailwind theme in `/src/styles/theme.css`

---

## 🐛 Troubleshooting

### Issue: Can't see my lessons

**Solution:**
1. Clear localStorage
2. Refresh page
3. Lessons will reload from default data

---

### Issue: Login not working

**Solution:**
1. Make sure you registered first
2. Check email and password are correct
3. Try registering with a new email

---

### Issue: Progress not saving

**Solution:**
1. Check localStorage is enabled in browser
2. Make sure you're logged in
3. Don't use private/incognito mode

---

### Issue: XP not updating

**Solution:**
1. Refresh the page
2. Check profile page
3. Re-login if needed

---

## 📱 Browser Compatibility

Works best on:
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

**Note:** Requires JavaScript and localStorage enabled

---

## 🎯 Tips for Best Experience

1. **Complete lessons in order** - Start from Level 1
2. **Read carefully** - Lesson content helps with quiz
3. **Daily practice** - Maintain your streak!
4. **Check leaderboard** - Compete with others
5. **View profile regularly** - Track your progress

---

## 📞 Help & Support

### Common Questions

**Q: Is this free?**  
A: Yes! 100% free to use.

**Q: Do I need internet?**  
A: Yes, for images and initial load. Then works offline.

**Q: Is my data safe?**  
A: Data stored locally in your browser only.

**Q: Can I use on mobile?**  
A: Yes! Fully responsive design.

---

## 🎉 Have Fun Learning!

Enjoy your journey through Sri Lankan history! 

**ඉගෙනීමේදී සතුටින් සිටින්න! 📚✨**