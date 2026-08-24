"use client";

import React, { useState } from "react";
import Swal from "sweetalert2";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";

const ContactFormInner: React.FC = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSending) return;

    if (!name || !email || !message) {
      Swal.fire({ icon: "warning", title: "Missing information", text: "Please fill in all fields." });
      return;
    }
    if (!executeRecaptcha) {
      Swal.fire({ icon: "error", title: "Recaptcha not loaded", text: "Please try again later." });
      return;
    }

    setIsSending(true);
    try {
      const token = await executeRecaptcha("contact_form");
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, token }),
      });
      const responseBody = (await res.json().catch(() => null)) as {
        error?: string;
      } | null;
      if (!res.ok) {
        throw new Error(responseBody?.error ?? "Failed to send message");
      }

      Swal.fire({
        icon: "success",
        title: "Message sent",
        text: "Thank you for reaching out. I will get back to you soon.",
        timer: 2500,
        showConfirmButton: false,
      });
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Message not sent",
        text:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again later.",
      });
    } finally {
      setIsSending(false);
    }
  };

  const inputClass = "w-full rounded-sm border border-[rgba(255,255,255,0.12)] bg-[var(--color-mini-card)] px-3 py-2 text-sm text-[var(--color-text-main)] placeholder:text-[var(--color-text-subtle)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]";
  const labelClass = "text-sm font-medium text-[var(--color-text-main)]";

  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-full min-h-0 w-full flex-col gap-3 overflow-hidden px-4 pb-4 pt-2"
    >
      <p className="text-xs leading-relaxed text-[var(--color-text-subtle)]">
        Have a role, project, or collaboration in mind? Send me a message.
      </p>

      <div className="flex w-full flex-col gap-3 sm:flex-row">
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <label htmlFor="contact-name" className={labelClass}>Name</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={inputClass}
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <label htmlFor="contact-email" className={labelClass}>Email</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-1">
        <label htmlFor="contact-message" className={labelClass}>Message</label>
        <textarea
          id="contact-message"
          name="message"
          placeholder="Type your message..."
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          rows={4}
          className={`${inputClass} min-h-[110px] flex-1 resize-none leading-5`}
        />
      </div>

      <div className="flex w-full justify-end">
        <button
          type="submit"
          disabled={isSending}
          className="h-10 w-full rounded-sm bg-[var(--color-primary)] px-5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:w-[150px]"
        >
          {isSending ? "Sending…" : "Send"}
        </button>
      </div>
    </form>
  );
};

const ContactSection: React.FC = () => {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  if (!siteKey) {
    return (
      <div
        role="status"
        className="m-4 rounded-md border border-amber-500/40 bg-amber-950/20 p-4 text-sm text-[var(--color-text-main)]"
      >
        Contact form configuration is incomplete. Please use the social links for now.
      </div>
    );
  }

  return (
    <GoogleReCaptchaProvider reCaptchaKey={siteKey}>
      <ContactFormInner />
    </GoogleReCaptchaProvider>
  );
};

export default ContactSection;
