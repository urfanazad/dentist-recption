# ⚡ QUICK START GUIDE (10 Minutes)

For complete beginners - follow these exact steps!

---

## ✅ Before You Start - What You Need:

1. A computer (Windows, Mac, or Linux)
2. Internet connection
3. Your mobile phone (for testing calls)
4. 30-60 minutes of time

**Cost: £0 (everything is free for testing)**

---

## 📱 STEP 1: Get Claude API Key (5 minutes)

1. Go to: **https://console.anthropic.com/**
2. Click "Sign Up" (top right)
3. Enter your email and create password
4. Verify your email
5. Click "Get API Keys" 
6. Click "Create Key"
7. Give it a name: "Dental Testing"
8. **COPY THE KEY** - it looks like: `sk-ant-api03-xxxxx`
9. Paste it somewhere safe (you'll need it in Step 4)

💰 **You get $5 FREE credit = 500-1000 test calls**

---

## 📞 STEP 2: Get Twilio Account (10 minutes)

1. Go to: **https://www.twilio.com/try-twilio**
2. Click "Sign up and start building"
3. Fill in your details
4. Verify your email
5. Verify your mobile number (they'll send you a code)
6. Choose "Voice & Video" when asked what you're building
7. Skip the questionnaire (just click through)

💰 **You get $15 FREE credit = 750 minutes of calls**

### Get Your Phone Number:

1. In Twilio Console, click "Develop" → "Phone Numbers" → "Manage" → "Buy a number"
2. Choose country: "United Kingdom"
3. Check "Voice" capability
4. Click "Search"
5. Pick any number and click "Buy"
6. **COPY THIS NUMBER** - it looks like: `+44 xxxx xxxxxx`

### Get Your Account Info:

1. Click "Account" dropdown (top right) → "API keys & tokens"
2. **COPY these 2 things:**
   - Account SID (looks like: `ACxxxxxxxxxx`)
   - Auth Token (click "show" to reveal, then copy)
3. Paste both somewhere safe

---

## 💻 STEP 3: Install Node.js (5 minutes)

### For Windows:
1. Go to: **https://nodejs.org/**
2. Click the big green button "Download Node.js (LTS)"
3. Run the downloaded file
4. Click "Next" → "Next" → "Install"
5. Wait for it to finish
6. Click "Finish"

### For Mac:
1. Go to: **https://nodejs.org/**
2. Click the big green button "Download Node.js (LTS)"
3. Open the downloaded file
4. Follow the installer
5. Click "Continue" → "Install"

### Verify it worked:
1. Open Terminal/Command Prompt:
   - **Windows**: Press `Win + R`, type `cmd`, press Enter
   - **Mac**: Press `Cmd + Space`, type `terminal`, press Enter
2. Type: `node --version`
3. You should see something like: `v20.10.0`
4. ✅ Success!

---

## 📂 STEP 4: Download & Setup the Code (10 minutes)

### Download the Files:

**Option A: Download ZIP (Easiest)**
1. If you have the files as ZIP, extract them to a folder
2. Remember where you put them!

**Option B: Create Manually**
1. Create a folder called `dental-ai-receptionist`
2. Copy all the files I created into it

### Install Dependencies:

1. Open Terminal/Command Prompt
2. Navigate to your folder:
   ```
   cd C:\Users\YourName\Downloads\dental-ai-receptionist
   ```
   (Replace with your actual path)

3. Type:
   ```
   npm install
   ```
4. Wait 1-2 minutes while it downloads everything

### Add Your API Keys:

1. Open the folder in File Explorer/Finder
2. Find the file `.env.example`
3. **Right-click** → "Rename" → change to just `.env` (remove .example)
4. **Right-click** `.env` → "Open with" → Choose "Notepad" (Windows) or "TextEdit" (Mac)
5. Fill in your keys:

```
ANTHROPIC_API_KEY=sk-ant-api03-xxxxx
TWILIO_ACCOUNT_SID=ACxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_token_here
TWILIO_PHONE_NUMBER=+44xxxxxxxxxx
PORT=3000
```

6. Save the file
7. ✅ Configuration done!

---

## 🌐 STEP 5: Make Your Server Public (5 minutes)

You need ngrok so Twilio can reach your computer.

### Install ngrok:

1. Go to: **https://ngrok.com/**
2. Click "Sign up" (free account)
3. Go to: **https://ngrok.com/download**
4. Download ngrok for your system
5. **Windows**: Extract the ZIP, put `ngrok.exe` in your dental-ai-receptionist folder
6. **Mac**: Open the downloaded file, move ngrok to Applications

### Get Your Public URL:

1. Open a **NEW** Terminal/Command Prompt window (keep the old one)
2. Navigate to your folder again
3. **Windows**: Type: `ngrok.exe http 3000`
4. **Mac/Linux**: Type: `ngrok http 3000`
5. You'll see something like:

```
Forwarding   https://abc123.ngrok-free.app -> http://localhost:3000
```

6. **COPY that HTTPS URL** (the abc123.ngrok-free.app part)
7. ✅ Keep this window open!

---

## 🚀 STEP 6: Start Your Server (2 minutes)

1. Go back to your FIRST Terminal/Command Prompt window
2. Make sure you're in the dental-ai-receptionist folder
3. Type:
   ```
   npm start
   ```
4. You should see:
   ```
   🦷 Dental AI Receptionist server running on port 3000
   ```
5. ✅ Server is running!

---

## 🔗 STEP 7: Connect Twilio (5 minutes)

1. Go to Twilio Console: **https://console.twilio.com/**
2. Click "Develop" (left menu) → "Phone Numbers" → "Manage" → "Active Numbers"
3. Click on your phone number
4. Scroll down to "Voice Configuration"
5. Under "A CALL COMES IN":
   - Change dropdown to "Webhook"
   - In the URL box, paste: `https://your-ngrok-url/voice/welcome`
     (Replace your-ngrok-url with the one from Step 5)
   - Example: `https://abc123.ngrok-free.app/voice/welcome`
   - Make sure it says "HTTP POST"
6. Scroll down and click "Save"
7. ✅ Connected!

---

## 🎉 STEP 8: TEST IT!

1. Get your mobile phone
2. Call your Twilio number (from Step 2)
3. The AI should answer: "Hello, you have reached Bright Smile Dental Surgery..."
4. Say: **"I'd like to book an appointment"**
5. Follow the conversation!

### Things to Try:
- "I need an appointment for Monday at 10am"
- "What are your opening hours?"
- "Can I book for tomorrow at 2pm?"

### Check Your Bookings:

Open browser and go to:
```
http://localhost:3000/appointments
```

You'll see all booked appointments!

---

## 🎊 SUCCESS!

You now have a working AI dental receptionist!

**What's happening:**
1. Someone calls your Twilio number
2. Twilio sends the call to your computer (via ngrok)
3. Your server uses Claude AI to understand and respond
4. The person hears a natural conversation
5. Appointments get saved automatically

---

## ⚠️ Important Notes:

1. **Keep both Terminal windows open** while testing
   - One runs your server (`npm start`)
   - One runs ngrok (`ngrok http 3000`)

2. **ngrok URL changes** every time you restart it
   - If you restart ngrok, update the Twilio webhook again

3. **Server restarts = Lost appointments**
   - This is a test version - appointments aren't saved permanently
   - We'll add a database for the real version

---

## 🆘 Troubleshooting:

**"Can't find node command"**
→ Restart your computer after installing Node.js

**"Server won't start"**
→ Make sure you ran `npm install` first

**"ngrok not found"**
→ Make sure ngrok.exe is in your folder (Windows)

**"Twilio can't reach server"**
→ Check ngrok is running and URL in Twilio matches ngrok URL

**"No response on call"**
→ Check both Terminal windows are still running

---

## 💰 Cost Tracking:

Check how much free credit you have left:

- **Claude**: https://console.anthropic.com/ → "Usage"
- **Twilio**: https://console.twilio.com/ → "Account" → "Balance"

You should have enough for 1-3 months of testing!

---

## 📞 Need Help?

Check the main README.md file for more detailed information!

**You did it! 🎉**
