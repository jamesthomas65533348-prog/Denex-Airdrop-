export default async function handler(req, res) {
  console.log('=== NEW REQUEST ===');
  console.log('Method:', req.method);
  console.log('Body:', JSON.stringify(req.body));
  
  if (req.method !== 'POST') {
    return res.status(200).send('ok');
  }
  
  const message = req.body?.message;
  
  if (!message || !message.text) {
    console.log('No message.text');
    return res.status(200).send('ok');
  }
  
  console.log('From:', message.from?.id);
  console.log('Text:', message.text);
  
  if (message.text === '/start') {
    const token = '8753778149:AAEQkHzL7P3A1yx55VhJGgpwB9FYl5AKCdI';
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    
    const body = {
      chat_id: message.chat.id,
      text: '🔥 Welcome to Denex Airdrop!\n\nTap to mine DTK tokens daily.\nInvite friends = +500 DTK\nEnergy refills every 7 hours.\n\nReady to start?',
      reply_markup: {
        inline_keyboard: [[
          { text: '🚀 Start Mining', web_app: { url: 'https://t.me/Denex_airdrop_bot/Denex' } }
        ]]
      }
    };
    
    try {
      const r = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await r.json();
      console.log('TG Response:', JSON.stringify(data));
    } catch (e) {
      console.log('FETCH ERROR:', e.message);
    }
  }
  
  console.log('=== END ===');
  return res.status(200).send('ok');
}
