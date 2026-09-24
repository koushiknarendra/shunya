import crypto from 'crypto';
import { pushOrder, timedFetch, zohoConfigured } from '../_lib/zoho.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: 0, error: 'Method not allowed' });
  }

  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

  if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
    return res.status(400).json({ success: 0, error: 'Missing payment details' });
  }

  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  if (expectedSignature !== razorpay_signature) {
    return res.status(400).json({ success: 0, error: 'Invalid payment signature' });
  }

  // Signature is valid, so mark the lead Paid in Zoho. The order's notes hold the customer details
  // (verify only receives Razorpay IDs). Failures are logged and never block the payment confirmation.
  if (zohoConfigured()) {
    try {
      const credentials = Buffer.from(
        `${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`
      ).toString('base64');
      const orderRes = await timedFetch(
        `https://api.razorpay.com/v1/orders/${encodeURIComponent(razorpay_order_id)}`,
        { headers: { Authorization: `Basic ${credentials}` } }
      );
      if (orderRes.ok) {
        await pushOrder(await orderRes.json(), 'Paid', { paymentId: razorpay_payment_id, paidAt: new Date() });
      } else {
        console.error('Zoho paid-update: Razorpay order fetch failed', orderRes.status, razorpay_order_id);
      }
    } catch (e) {
      console.error('Zoho paid-update error:', e.message, razorpay_order_id);
    }
  }

  res.status(200).json({ success: 1 });
}
