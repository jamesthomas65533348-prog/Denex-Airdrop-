export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(200).send('ok');
  
  const { message } = req.body;
  const token = '8753778149:AAH1dS_Din1NRZCUbRJEo58Va8twh_9ubIo';
  
  if (message?.text === '/start') {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: message.chat.id,
        text: `🔥 Welcome to Denex Airdrop!\n\nTap to mine DTK tokens daily.\nInvite friends = +500 DTK\nEnergy refills every 7 hours.\n\nReady to start?`,
        reply_markup: {
          inline_keyboard: [[
            { text: "🚀 Start Mining", web_app: { url: "https://t.me/Denex_airdrop_bot/Denex" } }
          ]]
        }
      })
    });
  }
  
  res.status(200).send('ok');
}
