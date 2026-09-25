import { pageUrlFromRequest, pushOrder } from './_lib/zoho.js';

const SERVICE_CONFIG = {
  '15ca_15cb': {
    receiptPrefix: 'SH15CB',
    label: 'Form 145 / 146 (15CA/15CB)',
    amount: 199900,
    notesExtra: ({ company }) => ({ company: company || 'Individual / NRI' }),
  },
  'gst-refund': {
    receiptPrefix: 'SHGRFD',
    label: 'GST Refund Filing',
    amount: 299900,
    notesExtra: ({ gstin }) => ({ gstin: gstin || 'Not provided' }),
  },
  gstr9: {
    receiptPrefix: 'SHG9C',
    label: 'GSTR-9 & GSTR-9C Filing',
    plans: { gstr9: 199900, gstr9c: 599900 },
    defaultPlan: 'gstr9',
    notesExtra: ({ gstin }) => ({ gstin: gstin || 'Not provided' }),
  },
  gst_registration: {
    receiptPrefix: 'SHGSTR',
    label: 'GST Registration',
    amount: 149900,
    notesExtra: ({ business }) => ({ business: business || 'Not specified' }),
  },
  gst_return_filing: {
    receiptPrefix: 'SHGSTF',
    label: 'GST Return Filing',
    amount: 79900,
    notesExtra: ({ gstin }) => ({ gstin: gstin || 'Not provided' }),
  },
  itr: {
    receiptPrefix: 'SHITR',
    label: 'ITR Filing',
    plans: { salaried: 99900, capital: 249900, business: 449900 },
    defaultPlan: 'salaried',
  },
  tax_audit: {
    receiptPrefix: 'SHAUDIT',
    label: 'Tax Audit (44AB)',
    plans: { audit_only: 499900, audit_itr: 799900, fo_package: 599900 },
    defaultPlan: 'audit_only',
  },
  fssai_registration: {
    receiptPrefix: 'SHFSSAI',
    label: 'FSSAI Registration & License',
    plans: { basic_registration: 149900, state_license: 499900, central_license: 999900 },
    defaultPlan: 'state_license',
  },
  gst_lut: {
    receiptPrefix: 'SHLUT',
    label: 'GST LUT Filing',
    plans: { lut_only: 49900, lut_iec: 199900, export_compliance: 399900 },
    defaultPlan: 'lut_iec',
  },
  lower_tds_nri: {
    receiptPrefix: 'SHLTC',
    label: 'Lower TDS Certificate (NRI)',
    plans: { rental_interest: 499900, property_sale: 1199900, other_income: 699900 },
    defaultPlan: 'property_sale',
  },
};

// Consolidated endpoint for all Razorpay order creation — replaces the former
// create-order-cc.js, create-order-gst-filing.js, create-order-gst-refund-9c.js,
// create-order-gst-reg.js, and create-order-itr.js, which were near-identical
// per-service duplicates. Kept as one function since the Vercel Hobby plan
// caps serverless functions at 12.
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, service, plan } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const config = SERVICE_CONFIG[service] || SERVICE_CONFIG['15ca_15cb'];

  for (const field of config.requiredFields || []) {
    if (!req.body[field]) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
  }

  const cleanPhone = phone.replace(/[^\d]/g, '').slice(-10);
  if (cleanPhone.length !== 10) {
    return res.status(400).json({ error: 'Invalid phone number' });
  }

  let amount;
  let selectedPlan;
  if (config.plans) {
    selectedPlan = config.plans[plan] ? plan : config.defaultPlan;
    amount = config.plans[selectedPlan];
  } else {
    amount = config.amount;
  }

  const receipt = `${config.receiptPrefix}_${Date.now()}_${Math.random().toString(36).slice(2, 7).toUpperCase()}`;

  const pageUrl = pageUrlFromRequest(req);

  const notes = {
    name,
    email,
    phone: cleanPhone,
    service: config.label,
    ...(selectedPlan ? { plan: selectedPlan } : {}),
    ...(config.notesExtra ? config.notesExtra(req.body) : {}),
    ...(pageUrl ? { page_url: pageUrl } : {}),
  };

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
      notes,
    }),
  });

  if (!rzRes.ok) {
    const err = await rzRes.json();
    console.error('Razorpay error:', err);
    return res.status(500).json({ error: 'Failed to create payment order' });
  }

  const data = await rzRes.json();
  await pushOrder(data, 'Pending');
  res.status(200).json({
    orderId: data.id,
    amount: data.amount,
    currency: data.currency,
    keyId: process.env.RAZORPAY_KEY_ID,
  });
}
