export default async function handler(req, res) {
  // Log every request that hits your webhook
  console.log('=== NEW REQUEST ===');
  console.log('Method:', req.method);
  console.log('Body:', JSON.stringify(req.body, null, 2));
  
  // Telegram only sends POST requests. GET = you testing in browser
  if (req.method !== 'POST') {
    console.log('Not a POST request, returning ok');
    return res.status(200).send('ok');
  }
  
  const { message } = req.body;
  
  // No message = edited message, callback query, etc. Ignore for now
  if (!message || !message.text) {
    console.log('No message.text found. Ignoring.');
    return res.status(200).send('ok');
  }
  
  console.log('Message from:', message.from.id, message.from.username);
  console.log('Chat ID:', message.chat.id);
  console.log('Text:', message.text);
  
  const token = '8753778149:AAEQkHzL7P3A1yx55VhJGgpwB9FYl5AKCdI';
  
  // Only reply to /start command
  if (message.text === '/start') {
    console.log('Processing /start command...');
    
    try {
      const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;
      
      const payload = {
        chat_id: message.chat.id,
        text: `🔥 Welcome to Denex Airdrop!\n\nTap to mine DTK tokens daily.\nInvite friends = +500 DTK\nEnergy refills every 7 hours.\n\nReady to start?`,
        reply_markup: {
          inline_keyboard: [[
            { text: "🚀 Start Mining", web_app: { url: "https://t.me/Denex_airdrop_bot/Denex" } }
          ]]
        }
      };
      
      console.log('Sending to Telegram:', payload);
      
      const tgResponse = await fetch(telegramUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const result = await tgResponse.json();
      console.log('Telegram API Response:', JSON.stringify(result, null, 2));
      
      if (result.ok) {
        console.log('SUCCESS: Message sent to user');
      } else {
        console.log('ERROR: Telegram rejected message:', result.description);
      }
      
    } catch (error) {
      console.log('FETCH ERROR:', error.message);
    }
    
  } else {
    console.log('Not /start command. Ignoring:', message.text);
  }
  
  console.log('=== END REQUEST ===\n');
  res.status(200).send('ok');
}
