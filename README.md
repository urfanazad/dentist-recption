# 🦷 Dental AI Receptionist - Free Testing Prototype

A simple AI-powered phone receptionist for dental practices using Claude and Twilio.

## 🎯 What This Does

- Answers phone calls automatically
- Books appointments using natural conversation
- Checks available time slots
- Confirms patient details
- Handles basic questions about your practice

## 💰 Free Testing Setup (No Cost for 1-3 months)

All services used have free tiers perfect for testing!

---

## 📋 Step-by-Step Setup Guide

### Step 1: Get Your Free API Keys

#### A) Claude API Key (FREE $5 credit)

1. Go to https://console.anthropic.com/
2. Sign up for a free account
3. Click "Get API Keys"
4. Create a new key and copy it
5. **You get $5 free credit** = ~500-1000 test calls

#### B) Twilio Account (FREE $15 credit)

1. Go to https://www.twilio.com/try-twilio
2. Sign up for free trial
3. Verify your phone number
4. **You get $15 free credit** = ~750 minutes of calls
5. Go to Console Dashboard and copy:
   - Account SID
   - Auth Token
6. Get a phone number:
   - Click "Phone Numbers" → "Manage" → "Buy a number"
   - Choose a UK number (free during trial)
   - Copy the phone number

---

### Step 2: Install the Code

**Option A: Run on Your Computer (Easiest)**

1. Install Node.js:
   - Download from https://nodejs.org/ (get the LTS version)
   - Install it on your computer

2. Download this code:
   - Click the green "Code" button → Download ZIP
   - Or copy all files to a folder

3. Open Terminal/Command Prompt:
   - Windows: Press Win+R, type `cmd`, press Enter
   - Mac: Press Cmd+Space, type `terminal`, press Enter

4. Navigate to the folder:
   ```bash
   cd path/to/dental-ai-receptionist
   ```

5. Install dependencies:
   ```bash
   npm install
   ```

**Option B: Run on Replit (No Installation)**

1. Go to https://replit.com/
2. Sign up for free
3. Click "Create Repl"
4. Choose "Node.js"
5. Upload all the files
6. Replit will install dependencies automatically

---

### Step 3: Configure Your API Keys

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` file and add your keys:
   ```
   ANTHROPIC_API_KEY=sk-ant-api03-xxx (your Claude key)
   TWILIO_ACCOUNT_SID=ACxxxxxxxxxx (from Twilio)
   TWILIO_AUTH_TOKEN=your_auth_token (from Twilio)
   TWILIO_PHONE_NUMBER=+44xxxxxxxxxx (your Twilio number)
   PORT=3000
   ```

---

### Step 4: Make Your Server Publicly Accessible

Twilio needs to reach your server from the internet.

**Option A: Using ngrok (If running locally)**

1. Download ngrok: https://ngrok.com/download
2. Sign up for free account
3. Install ngrok
4. In a NEW terminal window, run:
   ```bash
   ngrok http 3000
   ```
5. Copy the HTTPS URL (looks like: https://abc123.ngrok.io)

**Option B: Using Replit**

- Replit gives you a public URL automatically
- Look for the URL at the top of your repl (looks like: https://your-project.username.repl.co)

---

### Step 5: Start Your Server

```bash
npm start
```

You should see:
```
🦷 Dental AI Receptionist server running on port 3000
📞 Set Twilio webhook to: http://your-server-url/voice/welcome
```

---

### Step 6: Connect Twilio to Your Server

1. Go to Twilio Console: https://console.twilio.com/
2. Click "Phone Numbers" → "Manage" → "Active Numbers"
3. Click on your phone number
4. Scroll to "Voice Configuration"
5. Under "A CALL COMES IN":
   - Change to "Webhook"
   - Enter your URL: `https://your-ngrok-url/voice/welcome`
   - (or `https://your-replit-url/voice/welcome`)
   - Method: HTTP POST
6. Click "Save"

---

### Step 7: Test It! 📞

1. Call your Twilio phone number from your mobile
2. The AI should answer and greet you
3. Try saying: "I'd like to book an appointment"
4. Follow the conversation!

**Test Commands to Try:**
- "I need to book an appointment for next Monday at 10am"
- "What are your opening hours?"
- "I want to reschedule my appointment"
- "Do you accept NHS patients?"

---

## 🔍 Monitoring & Testing

### Check Booked Appointments

Open in browser:
```
http://localhost:3000/appointments
```

Or with ngrok/Replit URL:
```
https://your-url/appointments
```

### Check Available Slots

```
http://localhost:3000/available-slots
```

### View Twilio Call Logs

Go to: https://console.twilio.com/monitor/logs/calls

---

## 🎨 Customization

### Change Practice Information

Edit `server.js` around line 26:
```javascript
Practice Information:
- Name: YOUR PRACTICE NAME
- Address: YOUR ADDRESS
- Hours: YOUR HOURS
```

### Add More Appointment Slots

Edit `server.js` around line 20:
```javascript
const availableSlots = {
  '2025-11-25': ['09:00', '10:00', '11:00', '14:00'],
  // Add more dates and times
};
```

### Change the Voice

Edit `server.js` around line 75:
```javascript
voice: 'Polly.Amy-Neural'  // British female
```

Options:
- `Polly.Brian-Neural` - British male
- `Polly.Emma-Neural` - British female
- See all: https://www.twilio.com/docs/voice/twiml/say/text-speech#amazon-polly

---

## 💡 Troubleshooting

**"API key invalid"**
- Double-check your keys in `.env` file
- Make sure there are no extra spaces

**"Twilio can't reach my server"**
- Make sure ngrok is running
- Check the ngrok URL hasn't changed
- Update Twilio webhook if needed

**"AI not responding"**
- Check console for errors
- Verify Claude API key is correct
- Check you have credit remaining

**"No voice on call"**
- Check Twilio console for errors
- Verify webhook URL is correct
- Make sure URL starts with `https://`

---

## 📊 Costs After Free Trial

Once you use your free credits:

- **Claude API**: ~£15/1000 calls
- **Twilio**: ~£0.01-0.02/minute
- **Server**: Free (Replit) or £10/month (Digital Ocean)

**Estimated: £30-50/month** for moderate usage

---

## 🚀 Next Steps After Testing

1. **Add Real Database**: Replace in-memory storage with PostgreSQL
2. **SMS Reminders**: Add appointment reminder calls/texts
3. **Integration**: Connect to your existing booking system
4. **HIPAA Compliance**: Add encryption and security
5. **Advanced Features**: Handle cancellations, reschedules, multiple locations

---

## 🆘 Need Help?

Common issues and solutions:

1. **Server won't start**: Run `npm install` again
2. **Can't install Node.js**: Use Replit instead
3. **Webhook errors**: Check the URL in Twilio matches your ngrok URL
4. **API errors**: Verify both API keys are correct

---

## 📝 Important Notes

- This is a **testing prototype** - not production-ready
- Free credits last 1-3 months of testing
- Keep your API keys secret (don't share `.env` file)
- Current version stores appointments in memory (resets when server restarts)

---

## ✅ Success Checklist

- [ ] Node.js installed
- [ ] Claude API key obtained
- [ ] Twilio account created
- [ ] Phone number purchased
- [ ] Dependencies installed (`npm install`)
- [ ] API keys added to `.env`
- [ ] Server running (`npm start`)
- [ ] ngrok running (if local)
- [ ] Twilio webhook configured
- [ ] Test call successful

---

Ready to test? Just follow the steps above and you'll be up and running in 30-60 minutes!

Questions? Let me know! 🦷
