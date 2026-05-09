import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email, subject, message } = await req.json();

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  // TODO: integrate an email service (e.g. Resend, SendGrid, Nodemailer) to
  // forward this submission to namaste@shunya.so
  console.log("Contact form submission:", { name, email, subject, message });

  return NextResponse.json({ ok: true });
}
