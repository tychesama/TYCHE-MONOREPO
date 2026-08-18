import { NextResponse } from "next/server";
import { Resend } from "resend";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5000;
const MAX_TOKEN_LENGTH = 4096;

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function readTextField(
  body: Record<string, unknown>,
  field: string,
): string | null {
  const value = body[field];
  return typeof value === "string" ? value.trim() : null;
}

export async function POST(req: Request) {
  try {
    let parsedBody: unknown;

    try {
      parsedBody = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON body" },
        { status: 400 },
      );
    }

    if (
      parsedBody === null ||
      typeof parsedBody !== "object" ||
      Array.isArray(parsedBody)
    ) {
      return NextResponse.json(
        { error: "Invalid contact form data" },
        { status: 400 },
      );
    }

    const body = parsedBody as Record<string, unknown>;
    const rawName = readTextField(body, "name");
    const email = readTextField(body, "email");
    const message = readTextField(body, "message");
    const token = readTextField(body, "token");
    const name = rawName?.replace(/[\r\n]+/g, " ") ?? null;

    if (!name || !email || !message || !token) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    const from = process.env.CONTACT_FROM;
    const to = process.env.CONTACT_TO;

    if (!secret) {
      return NextResponse.json(
        { error: "reCAPTCHA server configuration is unavailable" },
        { status: 503 },
      );
    }

    if (!apiKey || !from || !to) {
      return NextResponse.json(
        { error: "Email service is unavailable" },
        { status: 503 },
      );
    }

    if (
      name.length > MAX_NAME_LENGTH ||
      email.length > MAX_EMAIL_LENGTH ||
      message.length > MAX_MESSAGE_LENGTH ||
      token.length > MAX_TOKEN_LENGTH ||
      !EMAIL_PATTERN.test(email)
    ) {
      return NextResponse.json(
        { error: "Invalid contact form data" },
        { status: 400 },
      );
    }

    const recaptchaRes = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ secret, response: token }),
      },
    );

    if (!recaptchaRes.ok) {
      return NextResponse.json(
        { error: "CAPTCHA service unavailable" },
        { status: 502 },
      );
    }

    const captcha = (await recaptchaRes.json()) as {
      success?: boolean;
      score?: number;
    };

    if (!captcha.success || (captcha.score ?? 0) < 0.5) {
      return NextResponse.json(
        { error: "Failed CAPTCHA verification" },
        { status: 400 },
      );
    }

    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from,
      to,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong><br>${escapeHtml(message).replaceAll("\n", "<br>")}</p>
      `,
    });

    if (result.error) {
      console.error("Contact email provider failed:", result.error.name);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}
