import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Clock, FileCheck, Globe, ShieldCheck, Zap } from "lucide-react";
import { ContactForm } from "./Form";

export const metadata: Metadata = {
  title: "15CA / 15CB in 30 Minutes — Shunya | CA-Certified Foreign Remittance",
  description:
    "Get your 15CA and 15CB foreign remittance certificates from a qualified CA in 30 minutes. Zero rejections. ₹999 only. Fully online, RBI & FEMA compliant.",
};

const benefits = [
  "certificate delivered in 30 minutes",
  "100% CA certified — qualified sign-off every time",
  "zero rejection track record",
  "fully RBI & FEMA compliant",
  "100% online — no office visit needed",
];

const destinationCountries = [
  { flag: "🇺🇸", name: "USA" },
  { flag: "🇬🇧", name: "UK" },
  { flag: "🇦🇺", name: "Australia" },
  { flag: "🇨🇦", name: "Canada" },
  { flag: "🇸🇬", name: "Singapore" },
  { flag: "🇦🇪", name: "UAE" },
  { flag: "🇩🇪", name: "Germany" },
  { flag: "🇳🇿", name: "New Zealand" },
];

const testimonials = [
  {
    initials: "KM",
    name: "Karan Mehta",
    role: "Director",
    company: "Mehta Exports Pvt Ltd",
    location: "Mumbai",
    quote:
      "Our freight partner needed the 15CB before 5 PM or we'd lose the LC. Called Shunya at 3:30 PM — got the signed certificate by 4:15 PM. Saved us ₹6 lakh in penalties. Will always use them for urgent filings.",
  },
  {
    initials: "PI",
    name: "Priya Iyer",
    role: "NRI",
    company: "Software Engineer",
    location: "Singapore",
    quote:
      "I send money abroad regularly and larger transfers always need a 15CB. Shunya handles it within the hour, every time. No back and forth, no confusion. Just done. Haven't needed to look elsewhere in over a year.",
  },
  {
    initials: "RK",
    name: "Rohan Kapoor",
    role: "CFO",
    company: "Stackblue Technologies",
    location: "Bengaluru",
    quote:
      "We pay foreign vendors every month and 15CB used to take 2–3 days with our old CA. Shunya does it in 30 minutes flat. We've filed 40+ certificates with them — not a single rejection from the bank.",
  },
  {
    initials: "AS",
    name: "Anita Sharma",
    role: "Founder",
    company: "Designcraft Studio",
    location: "Delhi",
    quote:
      "First time I needed a 15CB, I had no idea what documents to submit. The Shunya CA walked me through everything on WhatsApp in 15 minutes and the certificate was ready before I finished lunch. Brilliant service.",
  },
  {
    initials: "SN",
    name: "Suresh Nair",
    role: "Managing Director",
    company: "Nair Trading Co.",
    location: "Kochi",
    quote:
      "₹999 for a same-day 15CB is genuinely the best deal in the market. I was paying ₹2,500 elsewhere and waiting 2 days. Switched to Shunya 6 months ago, haven't looked back once.",
  },
];

const articles = [
  {
    tag: "Complete Guide",
    tagColor: "#146EFF",
    tagBg: "rgba(20,110,255,0.15)",
    title: "Form 15CA & 15CB Explained: What Every Indian Business Sending Money Abroad Must Know",
    excerpt:
      "Paying a foreign vendor? Sending money to a subsidiary overseas? Indian tax law requires specific CA-certified forms before your bank processes any international transfer above ₹5 lakh. Here's exactly what 15CA and 15CB are, who needs them, and what happens if you skip them.",
    keywords: ["15CA", "15CB", "foreign remittance", "RBI compliance", "FEMA"],
    readTime: "5 min read",
  },
  {
    tag: "Compliance",
    tagColor: "#9747ff",
    tagBg: "rgba(151,71,255,0.15)",
    title: "When Is Form 15CB Mandatory? The Full Exemption List for 2026–27",
    excerpt:
      "Not every foreign payment needs a 15CB certificate. The Income Tax Act lists specific categories of remittances that are exempt — including certain NRI repatriations, travel expenses, and imports below ₹5 lakh. Find out if your payment qualifies before you pay for a certificate you may not need.",
    keywords: ["15CB mandatory", "15CB exemption", "exempt remittances", "DTAA", "income tax"],
    readTime: "4 min read",
  },
  {
    tag: "NRI Guide",
    tagColor: "#2dd4bf",
    tagBg: "rgba(13,148,136,0.15)",
    title: "15CA / 15CB for NRIs: Sending Money Abroad from India in 2026–27",
    excerpt:
      "NRIs repatriating funds, paying foreign EMIs, or supporting family abroad often get stuck on 15CA/15CB requirements. This guide covers exactly when you need them, which documents to prepare, how your bank will ask for the certificate, and how to get it done in under 30 minutes.",
    keywords: ["NRI", "repatriation", "foreign remittance India", "NRE NRO", "15CB NRI"],
    readTime: "6 min read",
  },
];

const faqs = [
  {
    q: "What is Form 15CA?",
    a: "Form 15CA is a declaration filed by the remitter (the person sending money abroad) to certify that applicable taxes have been deducted or that the payment is not taxable under the Income Tax Act. It must be submitted online on the Income Tax portal before the remittance.",
  },
  {
    q: "What is Form 15CB?",
    a: "Form 15CB is a certificate issued by a Chartered Accountant confirming that the remittance is compliant with the relevant provisions of the Income Tax Act and DTAA (Double Tax Avoidance Agreement). It is required when the remittance amount exceeds ₹5 lakh.",
  },
  {
    q: "When do I need both 15CA and 15CB?",
    a: "You need both when making foreign payments exceeding ₹5 lakh that are taxable in India and are not covered under an exemption. The CA issues 15CB first, and then 15CA is filed on the IT portal referencing the 15CB.",
  },
  {
    q: "How long does it take?",
    a: "Once you share the required documents, we deliver the 15CB certificate and file 15CA within 30 minutes. For urgent same-day needs, WhatsApp us directly on +91 80809 18797.",
  },
];

const steps = [
  {
    num: "01",
    icon: Globe,
    title: "share the remittance details",
    desc: "Tell us the purpose of payment, the amount, the foreign entity, and share the relevant invoice or agreement.",
  },
  {
    num: "02",
    icon: FileCheck,
    title: "CA reviews & issues 15CB",
    desc: "Our CA verifies the documents, assesses tax liability, and issues the signed 15CB certificate.",
  },
  {
    num: "03",
    icon: ShieldCheck,
    title: "15CA filed, you're clear to remit",
    desc: "We file Form 15CA on the Income Tax portal and share the acknowledgement — your bank can now process the transfer.",
  },
];

const avatarInitials = ["NV", "SK", "PR", "AM"];
const WHATSAPP_URL = "https://wa.me/918080918797";
const PAYMENT_URL = "https://payments.cashfree.com/forms/shunya15cb"; // TODO: replace with actual Cashfree link

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0b]">
      {/* Sticky WhatsApp button */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full text-white text-sm font-semibold shadow-lg transition-all hover:scale-105"
        style={{ backgroundColor: "#25D366", boxShadow: "0 4px 24px rgba(37,211,102,0.35)" }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        WhatsApp us
      </a>

      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-[#0a0a0b]/95 backdrop-blur border-b border-white/10">
        <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-center">
          <Image src="/logo-white.png" alt="shunya" width={110} height={32} priority className="object-contain" />
        </nav>
      </header>

      <main className="flex-1">
        {/* Urgency banner */}
        <div
          className="w-full py-2.5 px-4 text-center text-sm font-medium flex items-center justify-center gap-2"
          style={{ backgroundColor: "rgba(37,211,102,0.12)", borderBottom: "1px solid rgba(37,211,102,0.2)", color: "#4ade80" }}
        >
          <Zap size={14} fill="currentColor" />
          Deadline today? We handle urgent 15CB within 30 minutes —{" "}
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 font-semibold hover:opacity-80">
            WhatsApp us now
          </a>
        </div>

        {/* Hero */}
        <section className="relative min-h-[92vh] flex items-center overflow-hidden">
          <Image src="/bg3.jpg" alt="" fill className="object-cover object-center" priority />
          <div className="absolute inset-0 bg-[#0a0a0b]/78" />
          <div className="absolute top-1/4 left-1/4 w-[700px] h-[500px] pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(151,71,255,0.10) 0%, transparent 70%)" }} />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(20,110,255,0.10) 0%, transparent 70%)" }} />

          <div className="relative z-10 max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center py-20">
            {/* Left */}
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-[#161616] border border-white/10 rounded-full px-4 py-2 mb-6">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#146EFF", boxShadow: "0 0 8px #146EFF" }} />
                <span className="text-xs font-semibold text-white/60 uppercase tracking-wide">
                  Foreign Remittance · 15CA / 15CB
                </span>
              </div>

              <h1
                className="text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight mb-4"
                style={{ fontFamily: "var(--font-bricolage)", fontWeight: 300, color: "#bcd9f5" }}
              >
                get your 15CA / 15CB{" "}
                <span style={{ fontWeight: 700, color: "#fff", textShadow: "0 0 50px #9747ff" }}>
                  in 30 minutes.
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-base text-white/55 max-w-lg mb-6 leading-relaxed">
                For NRIs, businesses & individuals sending money abroad. Avoid delays, rejections, and penalties. Handled by experienced Chartered Accountants.
              </p>

              {/* Benefits */}
              <ul className="flex flex-col gap-3 mb-7">
                {benefits.map((b) => (
                  <li key={b} className="flex items-center gap-3">
                    <CheckCircle2 size={16} style={{ color: "#7ab8ff", flexShrink: 0 }} strokeWidth={2} />
                    <span className="text-sm text-white/65">{b}</span>
                  </li>
                ))}
              </ul>

              {/* Country flags */}
              <div className="mb-7">
                <p className="text-xs text-white/35 uppercase tracking-wide font-semibold mb-3">send money to</p>
                <div className="flex flex-wrap gap-2">
                  {destinationCountries.map(({ flag, name }) => (
                    <div
                      key={name}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-white/60"
                      style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      <span className="text-base leading-none">{flag}</span>
                      {name}
                    </div>
                  ))}
                  <div
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-white/40"
                    style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    + 50 more countries
                  </div>
                </div>
              </div>

              {/* Trust */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {avatarInitials.map((init, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-white/15 flex items-center justify-center text-white text-[10px] font-bold"
                      style={{ backgroundColor: i % 2 === 0 ? "#146EFF" : "#1e1e24", zIndex: 4 - i }}
                    >
                      {init}
                    </div>
                  ))}
                </div>
                <span className="text-xs text-white/40">10,000+ remittances processed</span>
              </div>
            </div>

            {/* Right: form card */}
            <div id="get-started" className="w-full">
              <div
                className="rounded-2xl border relative overflow-hidden"
                style={{
                  backgroundColor: "rgba(13,13,18,0.92)",
                  borderColor: "rgba(255,255,255,0.10)",
                  backdropFilter: "blur(20px)",
                  boxShadow: "0 0 80px rgba(151,71,255,0.08), 0 0 0 1px rgba(255,255,255,0.05)",
                }}
              >
                {/* Price banner */}
                <div
                  className="px-8 pt-7 pb-5 border-b"
                  style={{ borderColor: "rgba(255,255,255,0.07)" }}
                >
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div>
                      <div className="flex items-baseline gap-2 mb-0.5">
                        <span className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-bricolage)" }}>₹999</span>
                        <span className="text-base text-white/30 line-through">₹1,850</span>
                        <span
                          className="text-xs font-bold px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: "rgba(74,222,128,0.15)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.25)" }}
                        >
                          46% off
                        </span>
                      </div>
                      <p className="text-xs text-white/35">per 15CA + 15CB filing</p>
                    </div>
                    <div
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                      style={{ backgroundColor: "rgba(20,110,255,0.15)", border: "1px solid rgba(20,110,255,0.25)", color: "#7ab8ff" }}
                    >
                      <ShieldCheck size={12} strokeWidth={2} />
                      100% CA certified
                    </div>
                  </div>
                </div>

                {/* Urgency strip */}
                <div
                  className="px-8 py-3 flex items-center gap-2 border-b text-sm"
                  style={{ backgroundColor: "rgba(37,211,102,0.06)", borderColor: "rgba(37,211,102,0.15)", color: "#4ade80" }}
                >
                  <Clock size={14} strokeWidth={2} />
                  <span className="font-medium">Urgent filing?</span>
                  <span className="text-white/45">We deliver in 30 minutes.</span>
                </div>

                <div className="px-8 py-6">
                  <div className="mb-5">
                    <h2 className="text-lg font-bold text-white mb-0.5" style={{ fontFamily: "var(--font-bricolage)" }}>
                      Start the process
                    </h2>
                    <p className="text-white/40 text-sm">a CA will reach out within minutes</p>
                  </div>
                  <ContactForm />

                  {/* WhatsApp alternative */}
                  <div className="mt-5 pt-5 border-t" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
                    <p className="text-xs text-white/35 text-center mb-3">or connect instantly</p>
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-full text-sm font-semibold transition-all hover:opacity-90"
                      style={{ backgroundColor: "rgba(37,211,102,0.12)", border: "1px solid rgba(37,211,102,0.25)", color: "#4ade80" }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      Need it today? Call / WhatsApp +91 80809 18797
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust bar */}
        <section className="border-y border-white/8 bg-[#0d0d12]">
          <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 divide-x divide-white/8">
            {[
              { value: "10,000+", label: "certificates issued" },
              { value: "Zero", label: "rejection track record" },
              { value: "30 min", label: "average delivery time" },
              { value: "100%", label: "CA certified filings" },
            ].map((s) => (
              <div key={s.label} className="text-center px-4 py-2">
                <div className="text-2xl md:text-3xl font-bold mb-1" style={{ fontFamily: "var(--font-bricolage)", color: "#146EFF" }}>{s.value}</div>
                <div className="text-xs text-white/35 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* What is 15CA / 15CB */}
        <section className="relative overflow-hidden bg-[#0d0d12] border-b border-white/8">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(20,110,255,0.06) 0%, transparent 70%)" }} />
          <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
            <div className="text-center mb-12">
              <h2
                className="text-3xl md:text-4xl leading-tight mb-4"
                style={{ fontFamily: "var(--font-bricolage)", fontWeight: 300, color: "#bcd9f5" }}
              >
                what are{" "}
                <span style={{ fontWeight: 700, color: "#fff", textShadow: "0 0 50px #9747ff" }}>
                  15CA & 15CB?
                </span>
              </h2>
              <p className="text-white/40 text-base max-w-xl mx-auto">
                mandatory tax compliance forms required before any foreign remittance from India.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="rounded-2xl p-7 border" style={{ backgroundColor: "rgba(20,110,255,0.06)", borderColor: "rgba(20,110,255,0.20)" }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white" style={{ backgroundColor: "#146EFF" }}>CA</div>
                  <div>
                    <div className="text-white font-semibold text-sm">Form 15CA</div>
                    <div className="text-white/40 text-xs">filed by the remitter</div>
                  </div>
                </div>
                <p className="text-white/55 text-sm leading-relaxed">
                  A self-declaration submitted online by the person sending money abroad, certifying that the applicable tax has been withheld or that the remittance is exempt. Filed directly on the Income Tax portal.
                </p>
              </div>
              <div className="rounded-2xl p-7 border" style={{ backgroundColor: "rgba(151,71,255,0.06)", borderColor: "rgba(151,71,255,0.20)" }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white" style={{ backgroundColor: "#9747ff" }}>CB</div>
                  <div>
                    <div className="text-white font-semibold text-sm">Form 15CB</div>
                    <div className="text-white/40 text-xs">issued by a CA</div>
                  </div>
                </div>
                <p className="text-white/55 text-sm leading-relaxed">
                  A certificate issued by a Chartered Accountant confirming that the remittance complies with the Income Tax Act and applicable DTAA provisions. Required for payments above ₹5 lakh that are taxable in India.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="relative overflow-hidden bg-[#0a0a0b]">
          <div className="absolute top-0 right-0 w-[500px] h-[400px] pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(151,71,255,0.07) 0%, transparent 70%)" }} />
          <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
            <div className="text-center mb-12">
              <h2
                className="text-3xl md:text-4xl leading-tight mb-4"
                style={{ fontFamily: "var(--font-bricolage)", fontWeight: 300, color: "#bcd9f5" }}
              >
                how we{" "}
                <span style={{ fontWeight: 700, color: "#fff", textShadow: "0 0 50px #9747ff" }}>get it done</span>
              </h2>
              <p className="text-white/40 text-base max-w-xl mx-auto">simple three-step process — from documents to clearance in 30 minutes.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map(({ num, icon: Icon, title, desc }, i) => (
                <div key={num} className="relative">
                  <div className="rounded-2xl p-8 border h-full" style={{ backgroundColor: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.07)" }}>
                    <div className="flex items-start gap-3 mb-5">
                      <span className="text-5xl font-bold leading-none select-none" style={{ fontFamily: "var(--font-bricolage)", color: "#146EFF", opacity: 0.2 }}>{num}</span>
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 mt-1" style={{ backgroundColor: "rgba(20,110,255,0.2)" }}>
                        <Icon size={20} style={{ color: "#7ab8ff" }} strokeWidth={1.75} />
                      </div>
                    </div>
                    <h3 className="font-semibold text-white mb-2 text-base">{title}</h3>
                    <p className="text-white/45 text-sm leading-relaxed">{desc}</p>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10">
                      <ArrowRight size={20} className="text-white/20" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="relative overflow-hidden bg-[#0d0d12] border-t border-white/8">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(151,71,255,0.07) 0%, transparent 70%)" }} />
          <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-[#161616] border border-white/10 rounded-full px-4 py-2 mb-6">
                <span className="text-xs font-semibold text-white/50 uppercase tracking-wide">Verified reviews</span>
              </div>
              <h2
                className="text-3xl md:text-4xl leading-tight mb-4"
                style={{ fontFamily: "var(--font-bricolage)", fontWeight: 300, color: "#bcd9f5" }}
              >
                10,000+ businesses{" "}
                <span style={{ fontWeight: 700, color: "#fff", textShadow: "0 0 50px #9747ff" }}>trust shunya</span>
              </h2>
              <p className="text-white/40 text-base max-w-xl mx-auto">
                exporters, NRIs, startups, and businesses across India rely on us for every foreign remittance.
              </p>
            </div>

            {/* Rating summary */}
            <div className="flex items-center justify-center gap-3 mb-10">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#146EFF"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                ))}
              </div>
              <span className="text-white font-semibold text-lg" style={{ fontFamily: "var(--font-bricolage)" }}>4.9 / 5</span>
              <span className="text-white/35 text-sm">from 500+ reviews</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {testimonials.map(({ initials, name, role, company, location, quote }) => (
                <div
                  key={name}
                  className="rounded-2xl p-7 border flex flex-col gap-5"
                  style={{ backgroundColor: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.07)" }}
                >
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#146EFF"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    ))}
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed flex-1">"{quote}"</p>
                  <div className="flex items-center gap-3 pt-2 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                      style={{ backgroundColor: "#146EFF" }}
                    >
                      {initials}
                    </div>
                    <div>
                      <div className="text-white text-sm font-semibold">{name}</div>
                      <div className="text-white/35 text-xs">{role}, {company} · {location}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Articles */}
        <section className="relative overflow-hidden bg-[#0a0a0b] border-t border-white/8">
          <div className="absolute bottom-0 right-0 w-[600px] h-[400px] pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(20,110,255,0.06) 0%, transparent 70%)" }} />
          <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
            <div className="text-center mb-12">
              <h2
                className="text-3xl md:text-4xl leading-tight mb-4"
                style={{ fontFamily: "var(--font-bricolage)", fontWeight: 300, color: "#bcd9f5" }}
              >
                understand{" "}
                <span style={{ fontWeight: 700, color: "#fff", textShadow: "0 0 50px #9747ff" }}>
                  15CA & 15CB
                </span>
              </h2>
              <p className="text-white/40 text-base max-w-xl mx-auto">
                everything you need to know before your next foreign remittance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {articles.map(({ tag, tagColor, tagBg, title, excerpt, keywords, readTime }) => (
                <div
                  key={title}
                  className="rounded-2xl p-7 border flex flex-col gap-5 group"
                  style={{ backgroundColor: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.07)" }}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide"
                      style={{ backgroundColor: tagBg, color: tagColor, border: `1px solid ${tagColor}30` }}
                    >
                      {tag}
                    </span>
                    <span className="text-xs text-white/25">{readTime}</span>
                  </div>

                  <div className="flex-1">
                    <h3
                      className="text-white font-semibold text-base leading-snug mb-3"
                      style={{ fontFamily: "var(--font-bricolage)" }}
                    >
                      {title}
                    </h3>
                    <p className="text-white/45 text-sm leading-relaxed">{excerpt}</p>
                  </div>

                  <div className="pt-4 border-t flex flex-wrap gap-2" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                    {keywords.map((kw) => (
                      <span
                        key={kw}
                        className="text-[11px] text-white/30 px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <a
                href="#get-started"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white/50 hover:text-white transition-colors"
              >
                have questions? talk to a CA directly <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="relative overflow-hidden bg-[#0d0d12] border-t border-white/8">
          <div className="absolute bottom-0 left-1/4 w-[600px] h-[300px] pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(20,110,255,0.06) 0%, transparent 70%)" }} />
          <div className="relative z-10 max-w-3xl mx-auto px-6 py-20">
            <div className="text-center mb-12">
              <h2
                className="text-3xl md:text-4xl leading-tight mb-4"
                style={{ fontFamily: "var(--font-bricolage)", fontWeight: 300, color: "#bcd9f5" }}
              >
                common{" "}
                <span style={{ fontWeight: 700, color: "#fff", textShadow: "0 0 50px #9747ff" }}>questions</span>
              </h2>
            </div>
            <div className="flex flex-col gap-4">
              {faqs.map(({ q, a }) => (
                <div key={q} className="rounded-2xl p-6 border" style={{ backgroundColor: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.07)" }}>
                  <h3 className="text-white font-semibold text-sm mb-2">{q}</h3>
                  <p className="text-white/45 text-sm leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden">
          <Image src="/bg2.jpg" alt="" fill className="object-cover object-center" />
          <div className="absolute inset-0 bg-[#0a0a0b]/72" />
          <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 text-center">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-2 mb-6">
                {[...Array(3)].map((_, i) => (
                  <CheckCircle2 key={i} size={18} style={{ color: "#7ab8ff" }} strokeWidth={2} />
                ))}
              </div>
              <h2
                className="text-3xl md:text-4xl leading-tight mb-5"
                style={{ fontFamily: "var(--font-bricolage)", fontWeight: 300, color: "#bcd9f5" }}
              >
                ready to send your{" "}
                <span style={{ fontWeight: 700, color: "#fff", textShadow: "0 0 50px #9747ff" }}>remittance?</span>
              </h2>
              <p className="text-white/45 text-base mb-8">fill in the form above and a CA will reach out within minutes.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={PAYMENT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ background: "linear-gradient(103deg, #146EFF -6%, rgba(255,255,255,0.85) 94%)", padding: "1.5px", borderRadius: "9999px", boxShadow: "0 0 50px 0 rgba(151,71,255,0.5)", display: "inline-block" }}
                >
                  <span className="inline-flex items-center gap-2 text-sm font-semibold px-8 py-3.5 rounded-full" style={{ backgroundColor: "#146EFF", color: "#fff" }}>
                    Start the process now <ArrowRight size={16} />
                  </span>
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold px-8 py-3.5 rounded-full transition-all hover:opacity-90"
                  style={{ backgroundColor: "rgba(37,211,102,0.15)", border: "1px solid rgba(37,211,102,0.3)", color: "#4ade80" }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp us now
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#060608]">
        {/* Main footer body */}
        <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10 border-b border-white/8">

          {/* Brand + description */}
          <div className="flex flex-col gap-4">
            <Image src="/logo-white.png" alt="shunya" width={100} height={28} className="object-contain opacity-80" />
            <p className="text-sm text-white/70 leading-relaxed max-w-xs">
              Shunya is a professional CA services platform offering 15CA/15CB foreign remittance certificates and compliance services for businesses, NRIs, and individuals across India.
            </p>
            <p className="text-xs text-white/45 font-medium">Advocare Technologies Private Limited</p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white transition-colors w-fit"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              +91 80809 18797
            </a>
            <p className="text-sm text-white/50">hello@shunya.so</p>
          </div>

          {/* CA Credentials */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-semibold text-white/70 uppercase tracking-widest">CA Credentials</h4>
            <div className="flex flex-col gap-3">
              {[
                { label: "Regulatory Body", value: "Institute of Chartered Accountants of India (ICAI)" },
                { label: "CA Membership No.", value: "184675" },
                { label: "Firm Registration No.", value: "148981W" },
                { label: "UDIN", value: "Generated per certificate & verifiable on ICAI portal" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-xs text-white/45 uppercase tracking-wide mb-0.5">{label}</p>
                  <p className="text-sm text-white/80 font-medium">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance & Legal */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-semibold text-white/70 uppercase tracking-widest">Compliance & Legal</h4>
            <div className="flex flex-col gap-3">
              {[
                { label: "Governed by", value: "Income Tax Act, 1961 — Section 195" },
                { label: "Foreign Exchange", value: "FEMA, 1999 & RBI Guidelines" },
                { label: "Tax Treaty Coverage", value: "DTAA — 90+ countries" },
                { label: "GST Registration", value: "Registered under GST Act" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-xs text-white/45 uppercase tracking-wide mb-0.5">{label}</p>
                  <p className="text-sm text-white/80 font-medium">{value}</p>
                </div>
              ))}
            </div>

            {/* Compliance badges */}
            <div className="flex flex-wrap gap-2 mt-1">
              {["ICAI Registered", "RBI Compliant", "FEMA Compliant", "Income Tax Act"].map((badge) => (
                <span
                  key={badge}
                  className="text-xs font-medium px-2 py-1 rounded"
                  style={{ backgroundColor: "rgba(20,110,255,0.10)", color: "#7ab8ff", border: "1px solid rgba(20,110,255,0.2)" }}
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="max-w-6xl mx-auto px-6 py-6 border-b border-white/8">
          <p className="text-xs text-white/50 leading-relaxed">
            <span className="text-white/70 font-semibold">Disclaimer:</span> The 15CA and 15CB certificates issued through Shunya are prepared and digitally certified by ICAI-registered Chartered Accountants in accordance with Section 195 of the Income Tax Act, 1961 and applicable provisions of the Foreign Exchange Management Act (FEMA), 1999. A Unique Document Identification Number (UDIN) is generated for every 15CB certificate issued, verifiable on the ICAI UDIN portal. Certificates are issued based on documents and declarations submitted by the client. Shunya and its associated CAs do not assume liability for incorrect or incomplete information provided by clients. This website is for informational purposes only and does not constitute legal, financial, or tax advice. Please consult a qualified professional for advice specific to your situation.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} Advocare Technologies Private Limited. All rights reserved.
          </p>
          <div className="flex gap-5 text-xs text-white/50">
            <a href="/contact-us" className="hover:text-white transition-colors">Contact Us</a>
            <a href="/terms-conditions" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="/cancellation-refund" className="hover:text-white transition-colors">Refund Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
