export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: 0, error: 'Method not allowed' });
  }

  const {
    founder_name,
    startup_name,
    mobile_number,
    email_address,
    company_type,
    date_of_incorporation,
    business_brief,
    isDiscounted,
  } = req.body;

  if (!founder_name || !mobile_number || !email_address || !company_type) {
    return res.status(400).json({ success: 0, error: 'Missing required fields' });
  }

  const cleanPhone = mobile_number.replace(/[^\d]/g, '').slice(-10);
  if (cleanPhone.length !== 10) {
    return res.status(400).json({ success: 0, error: 'Invalid mobile number' });
  }

  const amount = isDiscounted ? 499900 : 549900; // ₹4,999 or ₹5,499 in paise
  const receipt = `SHSI_${Date.now()}_${Math.random().toString(36).slice(2, 7).toUpperCase()}`;

  const credentials = Buffer.from(
    `${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`
  ).toString('base64');

  const rzRes = await fetch('https://api.razorpay.com/v1/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${credentials}`,
    },
    body: JSON.stringify({
      amount,
      currency: 'INR',
      receipt,
      notes: {
        founder_name,
        startup_name: startup_name || '',
        email_address,
        mobile_number: cleanPhone,
        company_type,
        date_of_incorporation: date_of_incorporation || '',
        service: 'Startup India Registration',
      },
    }),
  });

  if (!rzRes.ok) {
    const err = await rzRes.json();
    console.error('Razorpay error:', err);
    return res.status(500).json({ success: 0, error: 'Failed to create payment order' });
  }

  const order = await rzRes.json();

  res.status(200).json({
    success: 1,
    data: {
      registration: {
        founder_name,
        email_address,
        mobile_number: cleanPhone,
      },
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        key: process.env.RAZORPAY_KEY_ID,
        notes: order.notes,
      },
    },
  });
}
