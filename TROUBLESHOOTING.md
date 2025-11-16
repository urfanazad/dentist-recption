# 🔧 Troubleshooting Guide

Common issues and how to fix them!

---

## 🚨 Server Won't Start

### Error: "Cannot find module 'express'"

**Problem:** Dependencies not installed

**Solution:**
```bash
npm install
```

Wait for it to finish, then try `npm start` again.

---

### Error: "Port 3000 is already in use"

**Problem:** Something else is using port 3000

**Solution 1:** Stop the other process
- Find what's using port 3000
- Close that application

**Solution 2:** Use a different port
- Edit `.env` file
- Change `PORT=3000` to `PORT=3001`
- Restart server

---

### Error: "ANTHROPIC_API_KEY is not set"

**Problem:** API key not configured

**Solution:**
1. Check `.env` file exists (not `.env.example`)
2. Open `.env` and verify your Claude API key is there
3. Make sure there are no spaces or quotes around the key
4. Restart the server

---

## 📞 Twilio Issues

### Error: "11200 - HTTP retrieval failure"

**Problem:** Twilio can't reach your server

**Solutions:**

1. **Check ngrok is running:**
   - Look for the terminal window running ngrok
   - Make sure it says "Session Status: online"
   - Copy the HTTPS URL it shows

2. **Update Twilio webhook:**
   - Go to Twilio Console
   - Phone Numbers → Your Number
   - Update webhook URL to match ngrok URL
   - Must end with `/voice/welcome`
   - Example: `https://abc123.ngrok-free.app/voice/welcome`

3. **Restart ngrok if URL changed:**
   - Stop ngrok (Ctrl+C)
   - Start again: `ngrok http 3000`
   - Update Twilio with new URL

---

### Error: No voice when calling

**Problem:** Webhook not configured correctly

**Solution:**
1. Check Twilio webhook URL is correct
2. Must start with `https://` (not http)
3. Must end with `/voice/welcome`
4. Check "HTTP POST" is selected
5. Save changes in Twilio

---

### Call immediately hangs up

**Problem:** Server error or API issue

**Solution:**
1. Check server terminal for error messages
2. Verify Claude API key is correct
3. Check you have API credit remaining
4. Look at Twilio error logs: https://console.twilio.com/monitor/logs/errors

---

## 🤖 Claude API Issues

### Error: "Invalid API key"

**Problem:** Wrong API key or format issue

**Solution:**
1. Go to https://console.anthropic.com/
2. Check your API key
3. Copy it again (make sure you get the whole thing)
4. Update `.env` file
5. Remove any quotes or spaces
6. Restart server

---

### Error: "Insufficient credits"

**Problem:** Used up your free $5 credit

**Solution:**
1. Check usage: https://console.anthropic.com/
2. Add payment method if you want to continue
3. Or create new account for more free credit (for testing)

---

### Claude gives weird responses

**Problem:** System prompt might need adjustment

**Solution:**
1. Open `server.js`
2. Find `SYSTEM_PROMPT` (around line 18)
3. Modify the instructions to be more specific
4. Restart server

---

## 💻 Installation Issues

### "node: command not found"

**Problem:** Node.js not installed or not in PATH

**Solution:**
1. Download Node.js: https://nodejs.org/
2. Install it
3. Restart your computer
4. Try again

---

### "npm: command not found"

**Problem:** npm not installed (should come with Node.js)

**Solution:**
1. Reinstall Node.js from https://nodejs.org/
2. Make sure to check "Add to PATH" during installation
3. Restart computer

---

### Permission errors on Mac/Linux

**Problem:** Need admin rights

**Solution:**
Add `sudo` before your command:
```bash
sudo npm install
```

Or fix npm permissions: https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally

---

## 🌐 ngrok Issues

### "ngrok: command not found"

**Problem:** ngrok not in PATH or wrong location

**Solution - Windows:**
1. Put `ngrok.exe` in your project folder
2. Run it from there: `.\ngrok.exe http 3000`

**Solution - Mac/Linux:**
1. Move ngrok to /usr/local/bin
2. Or run from current location: `./ngrok http 3000`

---

### ngrok URL keeps changing

**Problem:** Free ngrok gives random URLs

**Solution:**
1. This is normal for free tier
2. Each time you restart ngrok, update Twilio webhook
3. Or upgrade to ngrok paid plan for static URL

---

### "Session expired"

**Problem:** ngrok session timed out

**Solution:**
1. Stop ngrok (Ctrl+C)
2. Start again: `ngrok http 3000`
3. Update Twilio webhook with new URL

---

## 📊 Dashboard Issues

### Dashboard shows "Error loading appointments"

**Problem:** Can't connect to server

**Solution:**
1. Make sure server is running (`npm start`)
2. Check URL: `http://localhost:3000/dashboard`
3. If using different port, update URL accordingly

---

### Appointments not showing

**Problem:** No appointments booked yet OR server restarted

**Solution:**
1. Make a test call and book an appointment
2. Refresh dashboard
3. Remember: appointments are lost when server restarts (this is temporary for testing)

---

## 🔐 Security & .env Issues

### API keys visible in code

**Problem:** Accidentally put keys in `.js` files instead of `.env`

**Solution:**
1. NEVER put real API keys in .js files
2. Always use `.env` file
3. Add `.env` to `.gitignore`
4. Use environment variables in code

---

### Can't find .env file

**Problem:** Hidden files not showing

**Solution - Windows:**
1. Open folder
2. View → Show → File name extensions
3. View → Show → Hidden items

**Solution - Mac:**
1. Press Cmd+Shift+. to show hidden files
2. Or use terminal: `ls -la`

---

## 🎯 Testing Issues

### Can't hear AI speaking

**Problem:** Text-to-speech not working

**Solution:**
1. Check Twilio webhook is configured
2. Verify `voice` parameter in code
3. Check Twilio account is active
4. Look at Twilio error logs

---

### AI doesn't understand me

**Problem:** Speech recognition issues

**Solution:**
1. Speak clearly and pause between sentences
2. Reduce background noise
3. Check Twilio speech recognition logs
4. Try different phrases

---

### Appointments not saving correctly

**Problem:** Data parsing or storage issue

**Solution:**
1. Check server terminal for errors
2. Look at `/appointments` endpoint to see raw data
3. Verify Claude is returning correct JSON format
4. Check the logs in terminal

---

## 📱 Mobile/Phone Issues

### Twilio number not receiving calls

**Problem:** Number configuration

**Solution:**
1. Check number is active in Twilio console
2. Verify you're calling the correct number
3. Check your Twilio trial balance
4. Verify number in Twilio console

---

### Call quality issues

**Problem:** Network or configuration

**Solution:**
1. Check your internet connection
2. Restart ngrok
3. Check Twilio status page: https://status.twilio.com/
4. Try from a different phone

---

## 💾 Data Issues

### Appointments disappear

**Problem:** Server restarted (data is in memory)

**Solution:**
This is expected for the test version! Solutions:
1. For testing: Keep server running
2. For production: Add a database (PostgreSQL, MongoDB)
3. See README for database setup instructions

---

## 🔄 General Debugging Steps

If nothing else works, try these in order:

1. **Restart everything:**
   ```bash
   # Stop server (Ctrl+C)
   # Stop ngrok (Ctrl+C)
   npm start
   ngrok http 3000
   ```

2. **Check all URLs match:**
   - ngrok URL in Twilio webhook
   - Includes `/voice/welcome` at end
   - Uses HTTPS not HTTP

3. **Verify API keys:**
   - Claude key works: Run `node test-claude.js`
   - Twilio credentials correct
   - No extra spaces in `.env`

4. **Clear and reinstall:**
   ```bash
   rm -rf node_modules
   npm install
   npm start
   ```

5. **Check logs:**
   - Server terminal for errors
   - Twilio console for call logs
   - ngrok console for requests

---

## 🆘 Still Stuck?

### Check These Resources:

1. **Twilio Documentation:**
   - https://www.twilio.com/docs/voice

2. **Claude API Documentation:**
   - https://docs.anthropic.com/

3. **ngrok Documentation:**
   - https://ngrok.com/docs

4. **Node.js Help:**
   - https://nodejs.org/en/docs/

### Get More Help:

- Twilio Support: https://support.twilio.com/
- Anthropic Support: https://support.anthropic.com/

---

## 💡 Pro Tips

1. **Always check terminal output first** - errors usually show there
2. **Use the test script** (`node test-claude.js`) to verify Claude API
3. **Keep ngrok and server running** in separate terminal windows
4. **Save your ngrok URL** so you can quickly update Twilio
5. **Test with simple phrases first** before complex requests
6. **Check Twilio logs** for detailed error information

---

Remember: This is a test version! Many issues go away when you move to production with a proper hosting solution and database.

Good luck! 🦷✨
