# 🏗️ SYSTEM ARCHITECTURE

## How Everything Works Together

```
┌─────────────────────────────────────────────────────────────────┐
│                        YOUR SYSTEM                               │
│                                                                  │
│  ┌──────────────┐                                               │
│  │   Patient    │  ①                                            │
│  │   Calls      │────┐                                          │
│  └──────────────┘    │                                          │
│                      │                                          │
│                      ▼                                          │
│              ┌───────────────┐                                  │
│              │               │  ②                               │
│              │    TWILIO     │────────────────┐                 │
│              │  (Phone API)  │                │                 │
│              │               │                │                 │
│              └───────────────┘                │                 │
│                      ▲                        │                 │
│                      │                        │                 │
│                      │                        ▼                 │
│                      │                ┌──────────────┐          │
│                      │                │              │          │
│                      │          ③     │    ngrok     │          │
│                      │         ┌──────│  (Tunnel)    │          │
│                      │         │      │              │          │
│                      │         │      └──────────────┘          │
│                      │         │             │                  │
│                      │         │             │                  │
│                      │         │             ▼                  │
│                      │         │      ┌──────────────────────┐  │
│                      │         │      │   YOUR COMPUTER      │  │
│                      │         │      │                      │  │
│                      │         │      │  ┌───────────────┐  │  │
│                      │         │      │  │  server.js    │  │  │
│                      │         │      │  │  (Node.js)    │  │  │
│                      │         └──────┼─▶│               │  │  │
│                      │                │  │  Port 3000    │  │  │
│                      │                │  └───────┬───────┘  │  │
│                      │                │          │          │  │
│                      │                │          │          │  │
│                      │         ④      │          ▼          │  │
│                      │         ┌──────│   ┌──────────────┐ │  │
│                      └─────────┘      │   │   CLAUDE     │ │  │
│                              Response │   │     API      │ │  │
│                                       │   │ (Anthropic)  │ │  │
│                                       │   └──────────────┘ │  │
│                                       │          │         │  │
│                                       │          ▼         │  │
│                                       │   ┌──────────────┐ │  │
│                                       │   │  In-Memory   │ │  │
│                                       │   │  Database    │ │  │
│                                       │   │ (temporary)  │ │  │
│                                       │   └──────────────┘ │  │
│                                       └──────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Access Points                                │  │
│  │                                                           │  │
│  │  📞 Phone: +44 XXXX XXXXXX (Twilio number)              │  │
│  │  🌐 Dashboard: http://localhost:3000/dashboard          │  │
│  │  📊 API: http://localhost:3000/appointments             │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 CALL FLOW - STEP BY STEP

### When Someone Calls:

```
① Patient dials Twilio number
       ↓
② Twilio receives call
       ↓
③ Twilio makes HTTP request to your webhook
       ↓
④ ngrok forwards request to your computer
       ↓
⑤ server.js receives request
       ↓
⑥ server.js converts speech to text (Twilio)
       ↓
⑦ server.js sends text to Claude API
       ↓
⑧ Claude AI processes and responds
       ↓
⑨ server.js converts response to speech (Twilio)
       ↓
⑩ Response sent back through ngrok → Twilio → Patient
       ↓
⑪ If booking appointment, saves to memory
       ↓
⑫ Visible on dashboard instantly
```

---

## 📦 COMPONENTS EXPLAINED

### 1️⃣ Twilio (Phone System)
**What it does:**
- Provides phone number
- Converts speech to text
- Converts text to speech
- Manages phone calls

**Cost:** $15 free credit (750 minutes)

---

### 2️⃣ ngrok (Tunnel Service)
**What it does:**
- Makes your computer accessible from internet
- Creates secure HTTPS tunnel
- Gives you a public URL

**Cost:** Free for testing

**Why needed:** Twilio is on the internet, your computer is local. ngrok connects them.

---

### 3️⃣ Your Server (Node.js)
**What it does:**
- Receives webhook calls from Twilio
- Manages conversation flow
- Calls Claude API
- Stores appointments
- Serves dashboard

**Runs on:** Your computer (Port 3000)

---

### 4️⃣ Claude API (AI Brain)
**What it does:**
- Understands patient requests
- Generates natural responses
- Handles booking logic
- Manages conversation context

**Cost:** $5 free credit (500-1000 calls)

---

### 5️⃣ In-Memory Storage
**What it does:**
- Stores appointments (temporarily)
- Keeps available time slots
- Holds conversation history

**Note:** Lost when server restarts (OK for testing)

---

### 6️⃣ Dashboard (Web Interface)
**What it does:**
- Shows all appointments
- Real-time updates
- Beautiful visualization
- Quick statistics

**Access:** http://localhost:3000/dashboard

---

## 🔐 DATA FLOW

```
Patient Info Flow:
─────────────────

Patient speaks → Twilio (speech-to-text)
                      ↓
                 Your Server
                      ↓
                 Claude API (understands intent)
                      ↓
                 Your Server (extracts booking details)
                      ↓
                 In-Memory Database (stores)
                      ↓
                 Dashboard (displays)
```

---

## 🌐 NETWORK ARCHITECTURE

```
Internet                  Your Home              Your Computer
─────────                ──────────              ─────────────

┌──────────┐            ┌──────────┐           ┌──────────────┐
│          │            │          │           │              │
│  Twilio  │───HTTPS───▶│  Router  │───Port───▶│  ngrok       │
│          │            │          │   3000    │              │
└──────────┘            └──────────┘           └──────┬───────┘
                                                      │
                                                      │ Forward
                                                      │
                                               ┌──────▼───────┐
                                               │              │
                                               │  server.js   │
                                               │  (Port 3000) │
                                               │              │
                                               └──────────────┘
```

**Key Point:** ngrok bypasses your router's firewall safely!

---

## 🔄 PRODUCTION VERSION (FUTURE)

```
When you go live, this changes to:

┌──────────────────────────────────────────────────┐
│           CLOUD SERVER                           │
│         (Digital Ocean, AWS, etc)                │
│                                                  │
│    ┌────────────┐         ┌────────────┐       │
│    │ server.js  │────────▶│ PostgreSQL │       │
│    │ (24/7)     │         │ Database   │       │
│    └─────┬──────┘         └────────────┘       │
│          │                                      │
│          │  Static IP/Domain                   │
│          │  (no ngrok needed)                  │
└──────────┼──────────────────────────────────────┘
           │
           │ HTTPS (SSL Certificate)
           │
      ┌────▼─────┐
      │  Twilio  │
      └──────────┘

Benefits:
✅ No ngrok needed
✅ Permanent URL
✅ 24/7 uptime
✅ Persistent database
✅ More reliable
✅ Better security
```

---

## 📊 REQUEST/RESPONSE FLOW

### Detailed Example Call:

```
┌─────────────────────────────────────────────────┐
│ 1. Patient calls Twilio number                 │
└────────────────┬────────────────────────────────┘
                 ▼
┌─────────────────────────────────────────────────┐
│ 2. Twilio → POST to webhook                    │
│    https://abc123.ngrok.io/voice/welcome       │
└────────────────┬────────────────────────────────┘
                 ▼
┌─────────────────────────────────────────────────┐
│ 3. server.js responds with TwiML:              │
│    "Hello, how can I help you?"                │
└────────────────┬────────────────────────────────┘
                 ▼
┌─────────────────────────────────────────────────┐
│ 4. Patient speaks:                             │
│    "I'd like to book an appointment"           │
└────────────────┬────────────────────────────────┘
                 ▼
┌─────────────────────────────────────────────────┐
│ 5. Twilio → POST to /voice/process             │
│    SpeechResult: "I'd like to book..."         │
└────────────────┬────────────────────────────────┘
                 ▼
┌─────────────────────────────────────────────────┐
│ 6. server.js → Claude API                      │
│    "User said: I'd like to book..."            │
└────────────────┬────────────────────────────────┘
                 ▼
┌─────────────────────────────────────────────────┐
│ 7. Claude responds:                            │
│    "I'd be happy to help book an               │
│     appointment. What day works for you?"      │
└────────────────┬────────────────────────────────┘
                 ▼
┌─────────────────────────────────────────────────┐
│ 8. server.js → Twilio (TwiML)                  │
│    Say: "I'd be happy to help..."              │
└────────────────┬────────────────────────────────┘
                 ▼
┌─────────────────────────────────────────────────┐
│ 9. Patient hears response                      │
│    Conversation continues...                   │
└─────────────────────────────────────────────────┘
```

---

## 🔌 API ENDPOINTS

Your server.js creates these endpoints:

```
GET  /                      → Health check & info
GET  /dashboard            → Beautiful appointment viewer
GET  /appointments         → JSON list of all bookings
GET  /available-slots      → JSON of available times
POST /voice/welcome        → Twilio webhook (initial greeting)
POST /voice/process        → Twilio webhook (handle responses)
```

---

## 💾 DATA STRUCTURE

### Appointment Object:
```javascript
{
  name: "John Smith",
  phone: "07700900123",
  date: "2025-11-18",
  time: "10:00",
  reason: "Checkup",
  callSid: "CAxxxxx",         // Twilio call ID
  bookedAt: "2025-11-15T23:30:00Z"
}
```

### Available Slots Object:
```javascript
{
  "2025-11-18": ["09:00", "10:00", "11:00", "14:00"],
  "2025-11-19": ["09:00", "10:00", "11:00", "14:00"]
}
```

---

## 🔧 CONFIGURATION FILES

```
.env               → Your secret API keys (NEVER commit!)
package.json       → Node.js dependencies list
server.js          → Main application code
dashboard.html     → Frontend web interface
```

---

## 🚀 SCALING FOR PRODUCTION

Current: **1 concurrent call**  
Upgrade: **Unlimited concurrent calls**

Just need:
- Cloud server ($10-20/month)
- Real database (PostgreSQL free tier)
- SSL certificate (Let's Encrypt free)
- Proper domain name ($10/year)

---

This architecture is designed to be:
✅ Simple to understand
✅ Easy to test locally
✅ Simple to upgrade to production
✅ Cost-effective
✅ Reliable

Start here, scale when ready! 🚀
