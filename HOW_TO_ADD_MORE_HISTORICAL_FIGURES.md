# 📖 How to Add More Historical Figures

## ✅ **3 New Characters Added!**

Your app now has **8 Historical Figures** total:
1. ✅ King Vijaya (විජය රජු)
2. ✅ King Dutugemunu (දුටුගැමුණු මහා රජ)
3. ✅ King Parakramabahu I (පරාක්‍රමබාහු මහා රජ)
4. ✅ Keppetipola Disawe (කැප්පෙටිපොළ දිසාව)
5. ✅ D.S. Senanayake (ඩි.එස්. සේනානායක)
6. ✅ **Arahant Mahinda** (අරහත් මහින්ද මහතෙරණන්) ← NEW!
7. ✅ **Queen Anula** (අනුලා දේවී) ← NEW!
8. ✅ **Buddhaghosa Thero** (බුද්ධඝෝෂ මහතෙරණන්) ← NEW!

---

## 🎯 **How to Add Even More Characters**

### **Step 1: Find a Good Image**

Use Unsplash to find relevant images:

```typescript
// Examples of searches:
"ancient king portrait crown"      → For kings
"buddhist monk meditation"         → For monks
"queen royal portrait"             → For queens
"warrior armor battle"             → For warriors
"scholar wisdom teacher"           → For scholars
"political leader statesman"       → For modern leaders
```

### **Step 2: Add to Historical Figures Array**

Open: `/src/services/aiChatService.ts`

Find the `historicalFigures` array (around line 52) and add your new character:

```typescript
{
  id: 'your_character_id',  // Unique ID (lowercase, no spaces)
  name: { 
    en: 'English Name', 
    si: 'සිංහල නම' 
  },
  title: { 
    en: 'English Title', 
    si: 'සිංහල තේමාව' 
  },
  period: 'Time Period (e.g., "543 BCE" or "1815-1818")',
  image: 'https://images.unsplash.com/photo-xxxxx...',  // Unsplash URL
  description: {
    en: 'English description of who they were and what they did',
    si: 'ඔවුන් කවුද සහ මොනවද කළේ කියන සිංහල විස්තරය'
  },
  personality: 'Key personality traits (e.g., "brave, strategic, wise")',
  keyEvents: [
    'Important Event 1',
    'Important Event 2',
    'Important Event 3'
  ]
},
```

### **Step 3: Add Conversation Starters**

Open: `/src/app/components/historical-roleplay.tsx`

Find the `suggestions` section (around line 44) and add:

```typescript
// English suggestions (around line 70)
your_character_id: [
  'Question 1 about their life?',
  'Question 2 about their achievement?',
  'Question 3 about their time?'
],

// Sinhala suggestions (around line 110)
your_character_id: [
  'ඔවුන්ගේ ජීවිතය ගැන ප්‍රශ්නය 1?',
  'ඔවුන්ගේ ජයග්‍රහණය ගැන ප්‍රශ්නය 2?',
  'ඔවුන්ගේ කාලය ගැන ප්‍රශ්නය 3?'
],
```

Also update the `getSuggestions` function (around line 210):

```typescript
const suggestionMap: { [key: string]: string[] } = {
  vijaya: content.suggestions.vijaya,
  dutugemunu: content.suggestions.dutugemunu,
  // ... existing ones ...
  your_character_id: content.suggestions.your_character_id,  // Add this
};
```

---

## 📋 **Example: Adding King Nissanka Malla**

### **1. Find Image:**
```
Search: "ancient asian king crown statue"
Result: https://images.unsplash.com/photo-xxxxx...
```

### **2. Add to aiChatService.ts:**

```typescript
{
  id: 'nissanka_malla',
  name: { 
    en: 'King Nissanka Malla', 
    si: 'නිශ්ශංක මල්ල රජු' 
  },
  title: { 
    en: 'Builder of Polonnaruwa', 
    si: 'පොළොන්නරුවේ ශිල්පියා' 
  },
  period: '1187-1196 CE',
  image: 'https://images.unsplash.com/photo-xxxxx...',
  description: {
    en: 'Built magnificent structures in Polonnaruwa including the Nissanka Lata Mandapaya',
    si: 'නිශ්ශංක ලතා මණ්ඩපය ඇතුළු පොළොන්නරුවේ විශ්මිත ගොඩනැඟිලි ඉදිකළේය'
  },
  personality: 'Artistic, ambitious, builder king',
  keyEvents: [
    'Built Nissanka Lata Mandapaya',
    'Renovated ancient structures',
    'Promoted Buddhism'
  ]
},
```

### **3. Add Conversation Starters:**

```typescript
// English
nissanka_malla: [
  'Why did you build the Nissanka Lata Mandapaya?',
  'Tell me about Polonnaruwa in your time',
  'What inspired your architectural vision?'
],

// Sinhala
nissanka_malla: [
  'ඔබ නිශ්ශංක ලතා මණ්ඩපය ඉදිකළේ ඇයි?',
  'ඔබේ කාලයේ පොළොන්නරුව ගැන කියන්න',
  'ඔබේ ගෘහනිර්මාණ දැක්මට ප්‍රේරණය වුණේ මොකෙන්ද?'
],
```

### **4. Update getSuggestions:**

```typescript
const suggestionMap: { [key: string]: string[] } = {
  // ... existing ...
  nissanka_malla: content.suggestions.nissanka_malla,
};
```

---

## 🎨 **Character Ideas You Can Add:**

### **Ancient Period:**
- King Devanampiya Tissa (දේවනම්පියතිස්ස රජු) - First Buddhist king
- King Walagamba (වලගම්බා රජු) - Built Abhayagiri
- King Vasabha (වාසභ රජු) - Tank builder

### **Medieval Period:**
- King Vijayabahu I (විජයබාහු රජු) - Liberated from Cholas
- King Nissanka Malla (නිශ්ශංක මල්ල) - Polonnaruwa builder
- Kalinga Magha (කාලිංග මාඝ) - Controversial invader

### **Kandyan Period:**
- King Rajasinghe I (රාජසිංහ රජු) - Fought Portuguese
- King Vimaladharmasuriya (විමලධර්මසූරිය රජු) - Strengthened Buddhism
- King Sri Wickrama Rajasinghe (ශ්‍රී වික්‍රමරාජසිංහ රජු) - Last king

### **Colonial Resistance:**
- Puran Appu (පූරණ අප්පු) - 1848 Rebellion
- Gongalegoda Banda (ගොංගලේගොඩ බණ්ඩ) - Matale Rebellion
- Veera Puran Appu (වීර පූරණ අප්පු) - Freedom fighter

### **Modern Era:**
- S.W.R.D. Bandaranaike (බණ්ඩාරනායක) - PM 1956
- Sirimavo Bandaranaike (සිරිමාවෝ බණ්ඩාරනායක) - World's first female PM
- Anagarika Dharmapala (අනගාරික ධර්මපාල) - Buddhist revivalist

### **Scholars & Monks:**
- Ven. Weliwita Sri Saranankara (වැලිවිට සරණංකර) - Buddhist revival
- Ven. Hikkaduwe Sri Sumangala (හික්කඩුවේ සුමංගල) - Scholar monk
- Munidasa Cumaratunga (මුනිදාස කුමාරතුංග) - Language scholar

---

## 🔧 **Testing Your New Character:**

```bash
# 1. Save your changes
# 2. Run the app
npm run dev

# 3. Navigate to Historical Roleplay
http://localhost:5173
↓ Scroll down
↓ Click "Talk to Historical Figures"
↓ See your new character card!
↓ Click and chat!
```

---

## 📝 **Quick Template (Copy-Paste):**

```typescript
// Add to aiChatService.ts historicalFigures array:
{
  id: 'character_id',
  name: { en: 'English Name', si: 'සිංහල නම' },
  title: { en: 'English Title', si: 'සිංහල තේමාව' },
  period: 'Time Period',
  image: 'https://images.unsplash.com/photo-...',
  description: {
    en: 'English description',
    si: 'සිංහල විස්තරය'
  },
  personality: 'Personality traits',
  keyEvents: ['Event 1', 'Event 2', 'Event 3']
},

// Add to historical-roleplay.tsx suggestions (English):
character_id: [
  'Question 1?',
  'Question 2?',
  'Question 3?'
],

// Add to suggestions (Sinhala):
character_id: [
  'ප්‍රශ්නය 1?',
  'ප්‍රශ්නය 2?',
  'ප්‍රශ්නය 3?'
],

// Add to getSuggestions map:
character_id: content.suggestions.character_id,
```

---

## 🎯 **Summary:**

### **Current Characters: 8**
- 5 Original
- 3 New (Mahinda, Anula, Buddhaghosa)

### **To Add More:**
1. Find image (Unsplash)
2. Add character object (aiChatService.ts)
3. Add conversation starters (historical-roleplay.tsx)
4. Update getSuggestions map
5. Test!

### **Files to Edit:**
- `/src/services/aiChatService.ts` - Add character data
- `/src/app/components/historical-roleplay.tsx` - Add suggestions

---

## ✅ **You Can Now:**
- ✅ Add unlimited historical figures
- ✅ Customize their personalities
- ✅ Create unique conversation starters
- ✅ Use any Unsplash images
- ✅ Full bilingual support (EN + SI)

---

**පහසුවෙන් characters add කරන්න පුළුවන්! 🎉**

Just follow the template and add as many as you want!
