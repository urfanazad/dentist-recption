// Test script to verify Claude API integration without needing Twilio
// Run with: node test-claude.js

const Anthropic = require('@anthropic-ai/sdk');

// REPLACE WITH YOUR ACTUAL CLAUDE API KEY
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || 'your-claude-api-key-here';

const anthropic = new Anthropic({ apiKey: ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are a friendly dental receptionist. Help patients book appointments.

Available slots:
- Monday 18th Nov: 9am, 10am, 11am, 2pm, 3pm
- Tuesday 19th Nov: 9am, 10am, 11am, 2pm, 3pm

When booking, confirm:
1. Patient name
2. Phone number
3. Date and time
4. Reason for visit

Be friendly and professional.`;

async function testClaude() {
  console.log('🦷 Testing Claude AI Receptionist...\n');
  
  try {
    const testMessage = "Hi, I'd like to book an appointment for next Monday at 10am please";
    
    console.log('Patient says:', testMessage);
    console.log('\nCalling Claude API...\n');
    
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      system: SYSTEM_PROMPT,
      messages: [{
        role: 'user',
        content: testMessage
      }]
    });
    
    const response = message.content[0].text;
    
    console.log('✅ Claude Response:');
    console.log('─'.repeat(60));
    console.log(response);
    console.log('─'.repeat(60));
    
    console.log('\n✅ Test successful! Claude is responding correctly.');
    console.log('\nNext: Set up Twilio to handle phone calls.');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    
    if (error.message.includes('401')) {
      console.log('\n💡 Tip: Check your ANTHROPIC_API_KEY is correct');
      console.log('Get your key from: https://console.anthropic.com/');
    }
  }
}

// Run the test
testClaude();
