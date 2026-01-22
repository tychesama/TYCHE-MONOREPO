import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message, token } = body;

    if (!name || !email || !message || !token) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const secret = process.env.RECAPTCHA_SECRET_KEY!;
    const recaptchaRes = await fetch(
      `https://www.google.com/recaptcha/api/siteverify`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${secret}&response=${token}`,
      }
    );
    const data = await recaptchaRes.json();

    if (!data.success || data.score < 0.5) {
      return NextResponse.json({ error: "Failed CAPTCHA verification" }, { status: 400 });
    }

    await resend.emails.send({
      from: process.env.CONTACT_FROM!,
      to: process.env.CONTACT_TO!,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
