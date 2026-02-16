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
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Please fill in all fields!",
      });
      return;
    }

    if (!executeRecaptcha) {
      Swal.fire({
        icon: "error",
        title: "Recaptcha not loaded",
        text: "Please try again later.",
      });
      return;
    }

    const token = await executeRecaptcha("contact_form");

    Swal.fire({
      title: "Sending your message...",
      html: "Please wait",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, token }),
      });

      if (!res.ok) throw new Error("Failed to send");

      Swal.fire({
        icon: "success",
        title: "Message Sent!",
        text: "Thank you for reaching out. I will get back to you soon.",
        timer: 2500,
        showConfirmButton: false,
      });

      setName("");
      setEmail("");
      setMessage("");
    } catch {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong. Please try again later.",
      });
    }
  };



  return (
    <div className="w-full h-[350px] flex flex-col justify-start items-start p-4 gap-3 -mt-3">
      <div className="mb-4 w-full flex flex-row justify-between">
        <div className="gap-1 flex flex-col justify-start w-[250px] h-[57px]">
          <p className="text-lg text-[var(--color-text-main)]">Name:</p>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-sm border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>
        <div className="gap-1 flex flex-col justify-start w-[250px] h-[57px]">
          <p className="text-lg text-[var(--color-text-main)]">Email:</p>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-sm border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>
      </div>
      <div className="w-full h-full gap-1 flex flex-col justify-start">
        <p className="text-lg text-[var(--color-text-main)]">Message:</p>
        <textarea
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full h-full resize-none rounded-sm border border-gray-300 px-3 py-2 text-sm leading-5 focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-hidden text-black "
        />
      </div>
      <div className="w-full flex justify-end h-[60px]">
        <button
          onClick={handleSubmit}
          className="w-[150px] h-[40px] bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
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
