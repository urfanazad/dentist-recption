const express = require('express');
const twilio = require('twilio');
const VoiceResponse = twilio.twiml.VoiceResponse;
const Anthropic = require('@anthropic-ai/sdk');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Configuration - YOU'LL NEED TO ADD YOUR API KEYS
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || 'your-claude-api-key-here';
const anthropic = new Anthropic({ apiKey: ANTHROPIC_API_KEY });

// Simple in-memory storage for testing (replace with real database later)
let appointments = [];
let conversationHistory = {};

// Available appointment slots (simplified for testing)
const availableSlots = {
  '2025-11-18': ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
  '2025-11-19': ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
  '2025-11-20': ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
  '2025-11-21': ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
  '2025-11-22': ['09:00', '10:00', '11:00', '14:00', '15:00']
};

// System prompt for Claude to act as dental receptionist
const SYSTEM_PROMPT = `You are a friendly and professional dental receptionist AI assistant for a dental surgery. Your tasks are:

1. Answer calls warmly and professionally
2. Help patients book, reschedule, or cancel appointments
3. Answer common questions about the practice
4. For emergencies, let them know to visit A&E or call 999 if severe

Practice Information:
- Name: Bright Smile Dental Surgery
- Address: 123 High Street, London
- Hours: Monday-Friday 9am-6pm, Saturday 9am-1pm
- Emergency: Direct to NHS 111 or A&E for severe pain

Available appointment slots are provided to you. Always confirm:
- Patient name
- Phone number
- Preferred date and time
- Reason for visit (checkup, cleaning, pain, etc.)

Be concise, friendly, and efficient. If you need to book an appointment, ask for details and confirm everything clearly.

When responding, provide your answer in this JSON format:
{
  "response": "What you want to say to the patient",
  "action": "none|book_appointment|check_availability|transfer_to_staff",
  "appointment_details": {
    "name": "patient name",
    "phone": "phone number",
    "date": "YYYY-MM-DD",
    "time": "HH:MM",
    "reason": "reason for visit"
  }
}`;

// Welcome message when someone calls
app.post('/voice/welcome', (req, res) => {
  const twiml = new VoiceResponse();
  
  twiml.say({
    voice: 'Polly.Amy-Neural', // British English voice
    language: 'en-GB'
  }, 'Hello, you have reached Bright Smile Dental Surgery. How may I help you today?');
  
  // Gather speech input
  const gather = twiml.gather({
    input: 'speech',
    action: '/voice/process',
    speechTimeout: 'auto',
    language: 'en-GB'
  });
  
  res.type('text/xml');
  res.send(twiml.toString());
});

// Process speech and respond with AI
app.post('/voice/process', async (req, res) => {
  const userSpeech = req.body.SpeechResult || '';
  const callSid = req.body.CallSid;
  
  console.log('User said:', userSpeech);
  
  try {
    // Initialize conversation history for this call if needed
    if (!conversationHistory[callSid]) {
      conversationHistory[callSid] = [];
    }
    
    // Add user message to history
    conversationHistory[callSid].push({
      role: 'user',
      content: userSpeech
    });
    
    // Get available slots info
    const slotsInfo = JSON.stringify(availableSlots, null, 2);
    const bookedInfo = JSON.stringify(appointments, null, 2);
    
    // Call Claude API
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      system: SYSTEM_PROMPT + `\n\nCurrent available slots:\n${slotsInfo}\n\nCurrently booked appointments:\n${bookedInfo}`,
      messages: conversationHistory[callSid]
    });
    
    const aiResponse = message.content[0].text;
    console.log('Claude response:', aiResponse);
    
    // Try to parse JSON response
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(aiResponse);
    } catch (e) {
      // If not JSON, just use the text
      parsedResponse = { response: aiResponse, action: 'none' };
    }
    
    // Handle appointment booking
    if (parsedResponse.action === 'book_appointment' && parsedResponse.appointment_details) {
      appointments.push({
        ...parsedResponse.appointment_details,
        callSid: callSid,
        bookedAt: new Date().toISOString()
      });
      console.log('Appointment booked:', parsedResponse.appointment_details);
    }
    
    // Add AI response to history
    conversationHistory[callSid].push({
      role: 'assistant',
      content: aiResponse
    });
    
    // Create TwiML response
    const twiml = new VoiceResponse();
    
    twiml.say({
      voice: 'Polly.Amy-Neural',
      language: 'en-GB'
    }, parsedResponse.response);
    
    // Continue gathering input
    const gather = twiml.gather({
      input: 'speech',
      action: '/voice/process',
      speechTimeout: 'auto',
      language: 'en-GB'
    });
    
    res.type('text/xml');
    res.send(twiml.toString());
    
  } catch (error) {
    console.error('Error processing with Claude:', error);
    
    const twiml = new VoiceResponse();
    twiml.say({
      voice: 'Polly.Amy-Neural',
      language: 'en-GB'
    }, 'I apologize, I am having technical difficulties. Please call back later or hold for a staff member.');
    
    res.type('text/xml');
    res.send(twiml.toString());
  }
});

// Endpoint to view booked appointments (for testing)
app.get('/appointments', (req, res) => {
  res.json({
    total: appointments.length,
    appointments: appointments
  });
});

// Endpoint to check available slots
app.get('/available-slots', (req, res) => {
  res.json(availableSlots);
});

// Serve dashboard
app.get('/dashboard', (req, res) => {
  res.sendFile(__dirname + '/dashboard.html');
});

// Health check
app.get('/', (req, res) => {
  res.json({
    status: 'running',
    message: 'Dental AI Receptionist is active',
    endpoints: {
      dashboard: '/dashboard',
      voice_webhook: '/voice/welcome',
      appointments: '/appointments',
      available_slots: '/available-slots'
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🦷 Dental AI Receptionist server running on port ${PORT}`);
  console.log(`📞 Set Twilio webhook to: http://your-server-url/voice/welcome`);
});
