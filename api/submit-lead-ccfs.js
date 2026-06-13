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
    name: name.trim(),
    company: company.trim(),
    phone: cleanPhone,
    filings: filings || 'Not specified',
  };

  console.log('CCFS-2026 Lead:', JSON.stringify(lead));

  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          from: 'leads@shunya.so',
          to: 'namaste@shunya.so',
          subject: `New lead: ${lead.company} — CCFS-2026 closure`,
          html: `
            <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px 24px;background:#f9f9fb;border-radius:12px;">
              <h2 style="margin:0 0 4px;font-size:18px;color:#111;">New company closure lead</h2>
              <p style="margin:0 0 24px;font-size:13px;color:#888;">via CCFS-2026 landing page</p>
              <table style="width:100%;border-collapse:collapse;">
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #eee;font-size:13px;color:#555;width:40%;">Name</td>
                  <td style="padding:10px 0;border-bottom:1px solid #eee;font-size:13px;color:#111;font-weight:600;">${lead.name}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #eee;font-size:13px;color:#555;">Company</td>
                  <td style="padding:10px 0;border-bottom:1px solid #eee;font-size:13px;color:#111;font-weight:600;">${lead.company}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #eee;font-size:13px;color:#555;">Phone</td>
                  <td style="padding:10px 0;border-bottom:1px solid #eee;font-size:13px;color:#111;font-weight:600;">${lead.phone}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;font-size:13px;color:#555;">Annual filings</td>
                  <td style="padding:10px 0;font-size:13px;color:#111;font-weight:600;">${lead.filings}</td>
                </tr>
              </table>
              <a href="https://wa.me/91${lead.phone}" style="display:inline-block;margin-top:24px;padding:10px 20px;background:#25D366;border-radius:8px;color:#fff;text-decoration:none;font-size:13px;font-weight:600;">Reply on WhatsApp</a>
            </div>
          `,
        }),
      });
    } catch (e) {
      console.error('Resend error:', e.message);
    }
  }

  return res.status(200).json({ success: true });
}
