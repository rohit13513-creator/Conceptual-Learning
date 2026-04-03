# ⚛️ Conceptual Learning – Coach & Student Portal

A complete Math & Science coaching platform with AI-powered homework feedback, doubt portal, daily assignments and lectures.

---

## 🚀 Deploy to Vercel in 5 Steps (Free)

### STEP 1 – Create a GitHub Account
Go to https://github.com and sign up for free.

### STEP 2 – Upload This Project to GitHub
1. On GitHub, click the **+** button → **New repository**
2. Name it: `conceptual-learning`
3. Click **Create repository**
4. Click **uploading an existing file**
5. Drag and drop ALL files from this folder → Click **Commit changes**

### STEP 3 – Create a Vercel Account
Go to https://vercel.com → Sign up with your GitHub account (free).

### STEP 4 – Deploy
1. On Vercel dashboard, click **Add New Project**
2. Select your `conceptual-learning` repository
3. Leave all settings as default
4. Click **Deploy**
5. Wait ~2 minutes ✅

### STEP 5 – Get Your Link
Vercel gives you a free link like:
👉 `https://conceptual-learning.vercel.app`

Share this in your WhatsApp group!

---

## 📱 Install on Student Phones (No App Store!)

**Android:**
1. Open the link in **Chrome**
2. Tap the 3-dot menu (⋮)
3. Tap **"Add to Home Screen"**
4. Done! App icon appears on phone

**iPhone:**
1. Open the link in **Safari**
2. Tap the **Share** button (box with arrow)
3. Tap **"Add to Home Screen"**
4. Done!

---

## 🔑 Login Credentials

| Role | Email | Password |
|------|-------|----------|
| Coach (You) | coach@conceptual.com | coach123 |
| Demo Student | aditya@student.com | pass123 |

**Important:** Change coach password after first login by editing `src/App.jsx` line with `SEED_USERS`.

---

## ✨ Features
- ✅ Student registration with coach approval
- ✅ Daily assignments posting
- ✅ Lecture notes + YouTube video embedding
- ✅ Homework upload (JPEG/PNG/PDF) with AI feedback & grading
- ✅ Doubt portal (answered by coach or Claude AI instantly)
- ✅ Announcements with pin support
- ✅ PWA – installable on any phone

---

## 🛠 Run Locally (Optional)
```bash
npm install
npm run dev
```
Open http://localhost:5173

---

## ⚠️ Important Note on AI Features
The AI homework grading and doubt answering use the Claude API.
In the current setup, API calls go directly from the browser.
For production use, you should add your own Anthropic API key via a backend proxy.
Contact a developer to set this up securely if needed.
