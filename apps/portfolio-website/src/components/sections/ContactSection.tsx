"use client";

import React, { useState } from "react";

const ContactSection: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async () => {
    setLoading(true);
    setStatus("idle");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) throw new Error("Failed");

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-[95%] flex flex-col justify-start items-start p-4 gap-3 -mt-3">
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
          className="
            w-full h-full
            resize-none
            rounded-sm
            border border-gray-300
            px-3 py-2
            text-sm
            leading-5
            focus:outline-none
            focus:ring-2 focus:ring-blue-500
            overflow-hidden
            text-black
          "
        />
      </div>
      <div className="w-full flex justify-end h-[60px]">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-[150px] h-[40px] bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>

      {status === "success" && (
        <p className="text-green-500 text-sm">Message sent successfully!</p>
      )}
      {status === "error" && (
        <p className="text-red-500 text-sm">Something went wrong.</p>
      )}
    </div>
  );
};

export default ContactSection;
