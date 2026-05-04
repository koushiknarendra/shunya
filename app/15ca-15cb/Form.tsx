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
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center text-center py-10 gap-4">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "rgba(20,110,255,0.2)" }}
        >
          <CheckCircle2 size={32} style={{ color: "#7ab8ff" }} strokeWidth={1.75} />
        </div>
        <div>
          <h3
            className="text-xl font-bold text-white mb-1"
            style={{ fontFamily: "var(--font-bricolage)" }}
          >
            request received!
          </h3>
          <p className="text-white/45 text-sm leading-relaxed">
            a qualified CA will reach out to you within <strong className="text-white/70">24 hours</strong> to take this forward.
          </p>
        </div>
      </div>
    );
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
          label="Company Name"
          name="company"
          placeholder="Acme Exports Pvt Ltd"
          value={form.company}
          onChange={handleChange}
          required
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

      <button
        type="submit"
        disabled={loading}
        style={{
          background: loading
            ? "rgba(20,110,255,0.5)"
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
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full text-sm font-semibold text-white transition-opacity"
          style={{ backgroundColor: loading ? "rgba(20,110,255,0.5)" : "#146EFF" }}
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              submitting…
            </>
          ) : (
            <>
              get a free consultation <ArrowRight size={16} />
            </>
          )}
        </span>
      </button>

      <p className="text-center text-xs text-white/25">
        no spam. your details are safe with us.
      </p>
    </form>
  );
}
