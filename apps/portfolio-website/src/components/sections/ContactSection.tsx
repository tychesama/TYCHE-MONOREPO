"use client";

import React, { useState } from "react";
import Swal from "sweetalert2";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";

const ContactFormInner: React.FC = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (!name || !email || !message) {
      Swal.fire({ icon: "warning", title: "Oops...", text: "Please fill in all fields!" });
      return;
    }
    if (!executeRecaptcha) {
      Swal.fire({ icon: "error", title: "Recaptcha not loaded", text: "Please try again later." });
      return;
    }

    const token = await executeRecaptcha("contact_form");
    Swal.fire({ title: "Sending your message...", html: "Please wait", allowOutsideClick: false, didOpen: () => Swal.showLoading() });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, token }),
      });
      if (!res.ok) throw new Error("Failed to send");

      Swal.fire({ icon: "success", title: "Message Sent!", text: "Thank you for reaching out. I will get back to you soon.", timer: 2500, showConfirmButton: false });
      setName(""); setEmail(""); setMessage("");
    } catch {
      Swal.fire({ icon: "error", title: "Oops...", text: "Something went wrong. Please try again later." });
    }
  };

  const inputClass = "w-full rounded-sm border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black text-sm";
  const labelClass = "text-base sm:text-lg text-[var(--color-text-main)]";

  return (
    <div className="w-full flex flex-col justify-start items-start p-4 gap-3 -mt-3">
      {/* Name + Email row — stacks on mobile, side by side on desktop */}
      <div className="w-full flex flex-col sm:flex-row gap-3 sm:gap-0 sm:justify-between mb-1">
        <div className="gap-1 flex flex-col w-full sm:w-[250px]">
          <p className={labelClass}>Name:</p>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="gap-1 flex flex-col w-full sm:w-[250px]">
          <p className={labelClass}>Email:</p>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      {/* Message */}
      <div className="w-full gap-1 flex flex-col">
        <p className={labelClass}>Message:</p>
        <textarea
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          className={`${inputClass} resize-none leading-5`}
        />
      </div>

      {/* Submit */}
      <div className="w-full flex justify-end">
        <button
          onClick={handleSubmit}
          className="w-full sm:w-[150px] h-[40px] bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  );
};

const ContactSection: React.FC = () => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}>
      <ContactFormInner />
    </GoogleReCaptchaProvider>
  );
};

export default ContactSection;