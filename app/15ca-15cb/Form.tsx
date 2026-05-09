"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

const inputBase: React.CSSProperties = {
  width: "100%",
  backgroundColor: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.10)",
  borderRadius: "0.75rem",
  padding: "0.875rem 1rem",
  color: "#fff",
  fontSize: "0.9375rem",
  outline: "none",
  transition: "border-color 0.2s",
};

function Field({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-white/50 uppercase tracking-wide">
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          ...inputBase,
          borderColor: focused ? "#146EFF" : "rgba(255,255,255,0.10)",
        }}
      />
    </div>
  );
}

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Create Cashfree order via API
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || !data.paymentSessionId) {
        throw new Error(data.error || "Could not initiate payment. Please try again.");
      }

      // Load Cashfree SDK and open modal
      const { load } = await import("@cashfreepayments/cashfree-js");
      const cashfree = await load({ mode: "production" });

      cashfree.checkout({
        paymentSessionId: data.paymentSessionId,
        redirectTarget: "_modal",
      });

    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field
          label="Full Name"
          name="name"
          placeholder="Ravi Sharma"
          value={form.name}
          onChange={handleChange}
          required
        />
        <Field
          label="Company Name (optional)"
          name="company"
          placeholder="Acme Exports Pvt Ltd"
          value={form.company}
          onChange={handleChange}
        />
      </div>
      <Field
        label="Email"
        name="email"
        type="email"
        placeholder="you@company.com"
        value={form.email}
        onChange={handleChange}
        required
      />
      <Field
        label="Phone"
        name="phone"
        type="tel"
        placeholder="+91 98765 43210"
        value={form.phone}
        onChange={handleChange}
        required
      />

      {error && (
        <p className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        style={{
          background: loading
            ? "rgba(20,110,255,0.4)"
            : "linear-gradient(103deg, #146EFF -6%, rgba(255,255,255,0.85) 94%)",
          padding: "1.5px",
          borderRadius: "9999px",
          boxShadow: loading ? "none" : "0 0 40px 0 rgba(151,71,255,0.4)",
          border: "none",
          cursor: loading ? "not-allowed" : "pointer",
          width: "100%",
        }}
      >
        <span
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full text-sm font-semibold text-white"
          style={{ backgroundColor: loading ? "rgba(20,110,255,0.4)" : "#146EFF" }}
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              setting up payment…
            </>
          ) : (
            <>
              Start the process now — ₹999 <ArrowRight size={16} />
            </>
          )}
        </span>
      </button>

      <div className="flex items-center justify-center gap-4 text-[11px] text-white/25">
        <span className="flex items-center gap-1">
          <CheckCircle2 size={11} />
          Secure payment
        </span>
        <span className="flex items-center gap-1">
          <CheckCircle2 size={11} />
          Powered by Cashfree
        </span>
        <span className="flex items-center gap-1">
          <CheckCircle2 size={11} />
          Certificate in 30 min
        </span>
      </div>
    </form>
  );
}
