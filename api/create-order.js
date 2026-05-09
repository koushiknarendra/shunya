export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, company } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const cleanPhone = phone.replace(/[^\d]/g, '').slice(-10);
  if (cleanPhone.length !== 10) {
    return res.status(400).json({ error: 'Invalid phone number' });
  }

  const orderId = `SH15CB_${Date.now()}_${Math.random().toString(36).slice(2, 7).toUpperCase()}`;

  const cfRes = await fetch('https://api.cashfree.com/pg/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-version': '2023-08-01',
      'x-client-id': process.env.CASHFREE_APP_ID,
      'x-client-secret': process.env.CASHFREE_SECRET_KEY,
    },
    body: JSON.stringify({
      order_id: orderId,
      order_amount: 999,
      order_currency: 'INR',
      customer_details: {
        customer_id: `cust_${Date.now()}`,
        customer_name: name,
        customer_email: email,
        customer_phone: cleanPhone,
      },
      order_meta: {
        return_url: `https://soshunya.vercel.app/15ca-15cb?order_id=${orderId}&status=success`,
      },
      order_note: company ? `Company: ${company}` : 'Individual / NRI',
    }),
  });

  if (!cfRes.ok) {
    const err = await cfRes.json();
    console.error('Cashfree error:', err);
    return res.status(500).json({ error: 'Failed to create payment order' });
  }

  const data = await cfRes.json();
  res.status(200).json({ paymentSessionId: data.payment_session_id, orderId: data.order_id });
}
