import { digestConfigured, searchLeads } from '../_lib/zoho.js';

// Daily digest of checkouts that were started but not paid. Zoho's Free plan cannot delay an action
// ("still Payment Pending after 24h"), so this job does it: it looks for leads that reached Payment
// Pending between 24 and 48 hours ago, so each lead lands in exactly one digest, and emails the list.
// Triggered by the cron in vercel.json; Vercel sends `Authorization: Bearer $CRON_SECRET`.
// `?minAgeHours=&maxAgeHours=` override the window (still requires the secret; used for testing).

const ALERT_TO = 'namaste@shunya.so';
const HOUR_MS = 3600 * 1000;

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const line = (desc, label) => (String(desc || '').match(new RegExp(`^${label}: (.+)$`, 'm')) || [])[1] || '';

export default async function handler(req, res) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.authorization !== `Bearer ${secret}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  if (!digestConfigured()) return res.status(200).json({ skipped: true, reason: 'Zoho digest token not set' });

  const q = req.query || {};
  const minAge = Number.isFinite(Number(q.minAgeHours)) && q.minAgeHours !== undefined ? Number(q.minAgeHours) : 24;
  const maxAge = Number.isFinite(Number(q.maxAgeHours)) && q.maxAgeHours !== undefined ? Number(q.maxAgeHours) : 48;

  let leads;
  try {
    leads = await searchLeads('(Lead_Status:equals:Payment Pending)', 'Last_Name,Email,Phone,Company,Description,Modified_Time');
  } catch (e) {
    console.error('Abandoned-checkout digest: Zoho error:', e.message);
    return res.status(502).json({ error: 'Zoho lookup failed' });
  }

  const now = Date.now();
  const stuck = leads.filter(l => {
    const age = (now - new Date(l.Modified_Time).getTime()) / HOUR_MS;
    return age >= minAge && age < maxAge;
  });
  if (stuck.length === 0) return res.status(200).json({ sent: false, count: 0 });

  const rows = stuck
    .map(l => {
      const service = line(l.Description, 'Service') || 'Unknown service';
      const amount = (line(l.Description, 'Payment').match(/₹[\d,]+/) || [''])[0];
      const url = line(l.Description, 'URL');
      const contact = [l.Phone, l.Email].filter(Boolean).join(' · ');
      return `<li><b>${esc(l.Last_Name)}</b> — ${esc(service)}${amount ? ` ${esc(amount)}` : ''}<br>${esc(contact)}${
        url ? `<br><span style="color:#666">${esc(url)}</span>` : ''
      }</li>`;
    })
    .join('');

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('Abandoned-checkout digest: RESEND_API_KEY missing, not sent', stuck.length);
    return res.status(500).json({ error: 'Email not configured' });
  }
  try {
    const mail = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'leads@updates.shunya.so',
        to: ALERT_TO,
        subject: `Abandoned checkouts: ${stuck.length} to follow up`,
        html: `<p>Started checkout but not paid yet (24 to 48 hours ago). Worth a call:</p><ul>${rows}</ul><p style="color:#666">Open them in Zoho: Leads → Payment Pending.</p>`,
      }),
    });
    if (!mail.ok) {
      console.error('Abandoned-checkout digest: Resend error', mail.status, (await mail.text()).slice(0, 300));
      return res.status(502).json({ error: 'Email failed' });
    }
  } catch (e) {
    console.error('Abandoned-checkout digest: email error', e.message);
    return res.status(502).json({ error: 'Email failed' });
  }
  return res.status(200).json({ sent: true, count: stuck.length });
}
