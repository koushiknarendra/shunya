export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, company, phone, filings } = req.body;

  if (!name || !company || !phone) {
    return res.status(400).json({ error: 'Please fill in all required fields.' });
  }

  const cleanPhone = phone.replace(/[^\d]/g, '').slice(-10);
  if (cleanPhone.length !== 10) {
    return res.status(400).json({ error: 'Please enter a valid 10-digit phone number.' });
  }

  const lead = {
    source: 'CCFS-2026 Landing Page',
    name: name.trim(),
    company: company.trim(),
    phone: cleanPhone,
    filings: filings || 'Not specified',
    timestamp: new Date().toISOString(),
  };

  console.log('CCFS-2026 Lead captured:', JSON.stringify(lead));

  const webhookUrl = process.env.LEAD_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
      });
    } catch (e) {
      console.error('Webhook delivery failed:', e.message);
    }
  }

  return res.status(200).json({ success: true });
}
