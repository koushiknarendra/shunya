import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email, phone, company } = await req.json();

  if (!name || !email || !phone) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const cleanPhone = phone.replace(/[^\d]/g, "").slice(-10);
  if (cleanPhone.length !== 10) {
    return NextResponse.json({ error: "Invalid phone number" }, { status: 400 });
  }

  const orderId = `SH15CB_${Date.now()}_${Math.random().toString(36).slice(2, 7).toUpperCase()}`;

  const res = await fetch("https://api.cashfree.com/pg/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-version": "2023-08-01",
      "x-client-id": process.env.CASHFREE_APP_ID!,
      "x-client-secret": process.env.CASHFREE_SECRET_KEY!,
    },
    body: JSON.stringify({
      order_id: orderId,
      order_amount: 999,
      order_currency: "INR",
      customer_details: {
        customer_id: `cust_${Date.now()}`,
        customer_name: name,
        customer_email: email,
        customer_phone: cleanPhone,
      },
      order_meta: {
        return_url: `https://soshunya.vercel.app/15ca-15cb?order_id=${orderId}&status=success`,
      },
      order_note: company ? `Company: ${company}` : "Individual / NRI",
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    console.error("Cashfree error:", err);
    return NextResponse.json({ error: "Failed to create payment order" }, { status: 500 });
  }

  const data = await res.json();
  return NextResponse.json({ paymentSessionId: data.payment_session_id, orderId: data.order_id });
}
