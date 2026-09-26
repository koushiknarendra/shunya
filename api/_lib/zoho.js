// Zoho CRM adapter. Lives in api/_lib so Vercel does not count it as a serverless function.
// Every handler calls pushLead() / pushOrder() and nothing else, so switching CRM later means editing this file only.
//
// Env vars (India data centre): ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, ZOHO_REFRESH_TOKEN
// Optional overrides: ZOHO_ACCOUNTS_URL, ZOHO_API_URL
// With the required vars unset this is a no-op, like the Resend alert.
//
// Custom fields: the current Zoho plan blocks them, so everything is written to standard fields
// (Lead_Source, Lead_Status, Description). After upgrading, create these Leads fields in Zoho, then set
// ZOHO_CUSTOM_FIELDS=1 and they are filled as well:
//   Source_Page (text), Service (text), GSTIN (text), UTM_Source (text),
//   Payment_Status (picklist: Pending, Paid), Amount_Paid (currency), Payment_ID (text),
//   Razorpay_Order_ID (text), Paid_On (datetime)
// Setting the flag before those fields exist makes every push fail.

const ACCOUNTS_URL = process.env.ZOHO_ACCOUNTS_URL || 'https://accounts.zoho.in';
const API_URL = process.env.ZOHO_API_URL || 'https://www.zohoapis.in';
const API_VERSION = 'v8';
const TIMEOUT_MS = 5000;
const LEAD_SOURCE = 'Shunya Website';
// Zoho ignores a picklist default set through its API, so new leads are given their first pipeline stage here.
const FIRST_STAGE = 'Not Contacted';

// One cached access token per refresh token (the lead push and the read-only digest use different ones).
const cached = new Map();

export function zohoConfigured() {
  return !!(process.env.ZOHO_CLIENT_ID && process.env.ZOHO_CLIENT_SECRET && process.env.ZOHO_REFRESH_TOKEN);
}

export async function timedFetch(url, options) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    return await fetch(url, { ...options, signal: ctrl.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function getAccessToken(refreshToken, force = false) {
  const hit = cached.get(refreshToken);
  if (!force && hit && Date.now() < hit.expiresAt) return hit.token;

  const params = new URLSearchParams({
    refresh_token: refreshToken,
    client_id: process.env.ZOHO_CLIENT_ID,
    client_secret: process.env.ZOHO_CLIENT_SECRET,
    grant_type: 'refresh_token',
  });
  const res = await timedFetch(`${ACCOUNTS_URL}/oauth/v2/token?${params}`, { method: 'POST' });
  const data = await res.json();
  if (!data.access_token) throw new Error(`token error: ${data.error || res.status}`);

  // Refresh 5 minutes early so a token never expires mid-request.
  cached.set(refreshToken, { token: data.access_token, expiresAt: Date.now() + (data.expires_in - 300) * 1000 });
  return data.access_token;
}

async function zohoRequest(method, path, body, refreshToken) {
  const send = async token =>
    timedFetch(`${API_URL}/crm/${API_VERSION}/${path}`, {
      method,
      headers: { Authorization: `Zoho-oauthtoken ${token}`, 'Content-Type': 'application/json' },
      body: body === undefined ? undefined : JSON.stringify(body),
    });

  let res = await send(await getAccessToken(refreshToken));
  if (res.status === 401) res = await send(await getAccessToken(refreshToken, true));
  return res;
}

const zohoPost = (path, body, method = 'POST') => zohoRequest(method, path, body, process.env.ZOHO_REFRESH_TOKEN);

// Zoho datetime fields want an ISO string with offset; IST has no DST so a fixed +05:30 is exact.
function istIso(date) {
  return new Date(date.getTime() + 330 * 60000).toISOString().slice(0, 19) + '+05:30';
}

function utmSource(url) {
  try {
    return new URL(url).searchParams.get('utm_source') || '';
  } catch {
    return '';
  }
}

// Service a visitor was looking at, from the page URL. Labels match the `service` note the
// create-order endpoints put on Razorpay orders, so popup leads and paid leads share one vocabulary.
// Content-only pages (blogs, tools, about, home) return '' — no service to claim.
const SERVICE_BY_PATH = [
  [/^\/gst-registration/, 'GST Registration'],
  [/^\/gst-return-filing/, 'GST Return Filing'],
  [/^\/gst-refund-filing/, 'GST Refund Filing'],
  [/^\/gstr-9-gstr-9c-filing/, 'GSTR-9 & GSTR-9C Filing'],
  [/^\/gst-lut/, 'GST LUT Filing'],
  [/^\/itr-filing/, 'ITR Filing'],
  [/^\/(tax-audit|form-3cd)/, 'Tax Audit (44AB)'],
  [/^\/lower-tds-certificate-nri/, 'Lower TDS Certificate (NRI)'],
  [/^\/fssai-registration/, 'FSSAI Registration & License'],
  [/^\/(company-closure|ccfs-2026-company-closure)/, 'Company Closure / Strike Off'],
  [/^\/company-registration/, 'Company Registration'],
  [/^\/startup-india/, 'Startup India Registration'],
  [/^\/15ca-15cb/, 'Form 145 / 146 (15CA/15CB)'],
  [/^\/consultation/, 'CA Consultation'],
];

function serviceFromUrl(url) {
  try {
    const path = new URL(url).pathname;
    const hit = SERVICE_BY_PATH.find(([re]) => re.test(path));
    return hit ? hit[1] : '';
  } catch {
    return '';
  }
}

const rupees = paise => `₹${(paise / 100).toLocaleString('en-IN')}`;

// Page a request came from (browsers send it as the Referer header on same-site fetches), shortened for
// storage: origin + path + UTM params. Razorpay notes cap values at 256 chars, so long ad click IDs
// (gclid etc.) are dropped. Returns '' when the header is missing or unparseable.
export function pageUrlFromRequest(req) {
  try {
    const u = new URL(req.headers.referer || '');
    const params = new URLSearchParams();
    for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']) {
      if (u.searchParams.get(k)) params.set(k, u.searchParams.get(k));
    }
    const query = params.toString();
    return (u.origin + u.pathname + (query ? `?${query}` : '')).slice(0, 250);
  } catch {
    return '';
  }
}

// lead: { name, phone, email?, company?, source, service?, gstin?, url?, details?: { label: value },
//         payment?: { status: 'Pending' | 'Paid', amountPaise?, paymentId?, orderId?, paidAt?: Date } }
// Never throws: a CRM outage must not break the visitor's form submit or payment.
export async function pushLead(lead) {
  if (!zohoConfigured()) return { ok: false, skipped: true };

  try {
    const pay = lead.payment;
    const utm = lead.url ? utmSource(lead.url) : '';
    const service = lead.service || (lead.url ? serviceFromUrl(lead.url) : '');

    const description = [
      `Source: ${lead.source}`,
      service && `Service: ${service}`,
      lead.gstin && `GSTIN: ${lead.gstin}`,
      lead.url && `URL: ${lead.url}`,
      utm && `UTM source: ${utm}`,
      ...Object.entries(lead.details || {})
        .filter(([, v]) => v)
        .map(([k, v]) => `${k}: ${v}`),
      pay &&
        `Payment: ${pay.status}${pay.amountPaise ? ` ${rupees(pay.amountPaise)}` : ''}` +
          (pay.paidAt ? ` on ${istIso(pay.paidAt).replace('T', ' ').slice(0, 16)} IST` : ''),
      pay && pay.paymentId && `Razorpay payment ID: ${pay.paymentId}`,
      pay && pay.orderId && `Razorpay order ID: ${pay.orderId}`,
    ]
      .filter(Boolean)
      .join('\n');

    const record = {
      Last_Name: lead.name || 'Not provided',
      Phone: lead.phone,
      Lead_Source: LEAD_SOURCE,
      Description: description,
    };
    if (lead.email) record.Email = lead.email;
    if (lead.company) record.Company = lead.company;
    // Payment events set their own status. Other submits never touch an existing lead's status, so a later
    // popup submit cannot downgrade a Paid lead; a brand-new lead gets its first stage below.
    if (pay) record.Lead_Status = pay.status === 'Paid' ? 'Paid' : 'Payment Pending';
    else if (!lead.email) record.Lead_Status = FIRST_STAGE; // phone-only leads are always plain inserts

    if (process.env.ZOHO_CUSTOM_FIELDS === '1') {
      record.Source_Page = lead.source;
      if (service) record.Service = service;
      if (lead.gstin) record.GSTIN = lead.gstin;
      if (utm) record.UTM_Source = utm;
      if (pay) {
        record.Payment_Status = pay.status;
        if (pay.status === 'Paid' && pay.amountPaise) record.Amount_Paid = pay.amountPaise / 100;
        if (pay.paymentId) record.Payment_ID = pay.paymentId;
        if (pay.orderId) record.Razorpay_Order_ID = pay.orderId;
        if (pay.paidAt) record.Paid_On = istIso(pay.paidAt);
      }
    }

    // Email is Zoho's built-in duplicate key for Leads. Phone-only leads are plain inserts
    // until Phone is marked "no duplicates" in Zoho and added to duplicate_check_fields.
    const res = lead.email
      ? await zohoPost('Leads/upsert', { data: [record], duplicate_check_fields: ['Email'] })
      : await zohoPost('Leads', { data: [record] });

    const body = await res.json().catch(() => ({}));
    const result = body.data && body.data[0];
    if (!res.ok || !result || !['SUCCESS', 'DUPLICATE_DATA'].includes(result.code)) {
      console.error('Zoho lead error:', res.status, JSON.stringify(body).slice(0, 500));
      return { ok: false };
    }

    // Email upserts do not say up front whether the lead is new; the response does. Best effort, the lead is saved.
    if (!pay && lead.email && result.action === 'insert' && result.details && result.details.id) {
      try {
        const stageRes = await zohoPost('Leads', { data: [{ id: result.details.id, Lead_Status: FIRST_STAGE }] }, 'PUT');
        if (!stageRes.ok) console.error('Zoho first-stage error:', stageRes.status);
      } catch (e) {
        console.error('Zoho first-stage error:', e.message);
      }
    }
    return { ok: true };
  } catch (e) {
    console.error('Zoho error:', e.message);
    return { ok: false };
  }
}

// Notes keys the create-order endpoints put on a Razorpay order, mapped to lead fields.
// Anything else in the notes (plan, city, company type, ...) goes into the Description.
const NOTE_KEYS = {
  name: ['name', 'founder_name'],
  email: ['email', 'email_address'],
  phone: ['phone', 'mobile_number'],
  company: ['company', 'business', 'startup_name'],
  gstin: ['gstin'],
  service: ['service'],
  url: ['page_url'],
};
const PLACEHOLDERS = new Set(['Not provided', 'Not specified', 'Individual / NRI']);

// Turns a Razorpay order (its notes carry what the visitor typed) into a lead push.
// status 'Pending' = checkout opened; 'Paid' = signature verified. Same email upserts the same lead.
export function pushOrder(order, status, extra = {}) {
  const notes = order.notes || {};
  const pick = keys => {
    const key = keys.find(k => notes[k] && !PLACEHOLDERS.has(notes[k]));
    return key ? String(notes[key]) : '';
  };
  const mapped = new Set(Object.values(NOTE_KEYS).flat());
  const details = {};
  for (const [k, v] of Object.entries(notes)) {
    if (!mapped.has(k) && v) details[k.replace(/_/g, ' ').replace(/^./, c => c.toUpperCase())] = v;
  }
  const service = pick(NOTE_KEYS.service);

  return pushLead({
    name: pick(NOTE_KEYS.name),
    phone: pick(NOTE_KEYS.phone),
    email: pick(NOTE_KEYS.email),
    company: pick(NOTE_KEYS.company),
    gstin: pick(NOTE_KEYS.gstin),
    service,
    url: pick(NOTE_KEYS.url),
    source: `Payment page — ${service || 'Website'}`,
    details,
    payment: { status, amountPaise: order.amount, orderId: order.id, ...extra },
  });
}

// --- Read side, used by the daily abandoned-checkout digest ---------------------------------------
// Separate read-only refresh token (scope ZohoCRM.modules.leads.READ) so reading can never affect the
// lead push, and the push token never needs read access.
export function digestConfigured() {
  return !!(process.env.ZOHO_CLIENT_ID && process.env.ZOHO_CLIENT_SECRET && process.env.ZOHO_DIGEST_REFRESH_TOKEN);
}

// Leads matching a Zoho search criteria string, e.g. '(Lead_Status:equals:Payment Pending)'. Max 200.
// Throws on failure: the caller (a cron job) should surface errors, unlike the lead push.
export async function searchLeads(criteria, fields) {
  const path = `Leads/search?criteria=${encodeURIComponent(criteria)}&fields=${encodeURIComponent(fields)}&per_page=200`;
  const res = await zohoRequest('GET', path, undefined, process.env.ZOHO_DIGEST_REFRESH_TOKEN);
  if (res.status === 204) return []; // Zoho's "no matches"
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`Zoho search failed: ${res.status} ${JSON.stringify(body).slice(0, 300)}`);
  return body.data || [];
}
