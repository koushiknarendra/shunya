import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, FileCheck, Globe, ShieldCheck } from "lucide-react";
import { ContactForm } from "./Form";

export const metadata: Metadata = {
  title: "15CA / 15CB Certificate Service — Shunya | Fast CA Sign-off",
  description:
    "Get your 15CA and 15CB foreign remittance certificates signed by a qualified CA in 48 hours. Fully online, RBI & FEMA compliant.",
};

const benefits = [
  "done in 48 hours, guaranteed",
  "qualified CA sign-off on every certificate",
  "fully RBI & FEMA compliant",
  "100% online — no office visit needed",
  "transparent, fixed pricing",
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
    a: "Once you share the required documents, we typically deliver the 15CB certificate and file 15CA within 24–48 hours. Urgent processing can be arranged on request.",
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

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0b]">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-[#0a0a0b]/95 backdrop-blur border-b border-white/10">
        <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/">
            <Image
              src="/logo-white.png"
              alt="shunya"
              width={110}
              height={32}
              priority
              className="object-contain"
            />
          </Link>
          <div className="hidden md:flex items-center gap-1 bg-white/10 rounded-full p-1">
            <Link
              href="/#services"
              className="text-sm font-medium text-zinc-300 px-4 py-1.5 rounded-full hover:bg-white/10 hover:text-white transition-all"
            >
              services
            </Link>
            <Link
              href="/#how"
              className="text-sm font-medium text-zinc-300 px-4 py-1.5 rounded-full hover:bg-white/10 hover:text-white transition-all"
            >
              how it works
            </Link>
            <Link
              href="/#contact"
              className="text-sm font-medium text-zinc-300 px-4 py-1.5 rounded-full hover:bg-white/10 hover:text-white transition-all"
            >
              contact
            </Link>
          </div>
          <a
            href="#get-started"
            className="text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
            style={{ backgroundColor: "#146EFF", color: "#fff" }}
          >
            get started
          </a>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative min-h-[92vh] flex items-center overflow-hidden">
          <Image
            src="/bg3.jpg"
            alt=""
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-[#0a0a0b]/78" />
          {/* Glow orbs */}
          <div
            className="absolute top-1/4 left-1/4 w-[700px] h-[500px] pointer-events-none"
            style={{ background: "radial-gradient(ellipse, rgba(151,71,255,0.10) 0%, transparent 70%)" }}
          />
          <div
            className="absolute bottom-0 right-1/4 w-[500px] h-[400px] pointer-events-none"
            style={{ background: "radial-gradient(ellipse, rgba(20,110,255,0.10) 0%, transparent 70%)" }}
          />

          <div className="relative z-10 max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center py-20">
            {/* Left: copy */}
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-[#161616] border border-white/10 rounded-full px-4 py-2 mb-8">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: "#146EFF", boxShadow: "0 0 8px #146EFF" }}
                />
                <span className="text-xs font-semibold text-white/60 uppercase tracking-wide">
                  Foreign Remittance · 15CA / 15CB
                </span>
              </div>

              <h1
                className="text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight mb-6"
                style={{ fontFamily: "var(--font-bricolage)", fontWeight: 300, color: "#bcd9f5" }}
              >
                get your 15CA / 15CB{" "}
                <span style={{ fontWeight: 700, color: "#fff", textShadow: "0 0 50px #9747ff" }}>
                  done in 48 hours.
                </span>
              </h1>

              <p className="text-base md:text-lg text-white/50 max-w-lg mb-8 leading-relaxed">
                sending money abroad? a qualified CA handles your 15CA & 15CB filings end-to-end — fast,
                compliant, and fully online.
              </p>

              {/* Benefits list */}
              <ul className="flex flex-col gap-3 mb-8">
                {benefits.map((b) => (
                  <li key={b} className="flex items-center gap-3">
                    <CheckCircle2 size={16} style={{ color: "#7ab8ff", flexShrink: 0 }} strokeWidth={2} />
                    <span className="text-sm text-white/65">{b}</span>
                  </li>
                ))}
              </ul>

              {/* Trust badge */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {avatarInitials.map((init, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-white/15 flex items-center justify-center text-white text-[10px] font-bold"
                      style={{
                        backgroundColor: i % 2 === 0 ? "#146EFF" : "#1e1e24",
                        zIndex: 4 - i,
                      }}
                    >
                      {init}
                    </div>
                  ))}
                </div>
                <span className="text-xs text-white/40">
                  200+ foreign remittances processed
                </span>
              </div>
            </div>

            {/* Right: form card */}
            <div id="get-started" className="w-full">
              <div
                className="rounded-2xl p-8 border relative overflow-hidden"
                style={{
                  backgroundColor: "rgba(13,13,18,0.9)",
                  borderColor: "rgba(255,255,255,0.10)",
                  backdropFilter: "blur(20px)",
                  boxShadow: "0 0 80px rgba(151,71,255,0.08), 0 0 0 1px rgba(255,255,255,0.05)",
                }}
              >
                {/* Card glow */}
                <div
                  className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
                  style={{ background: "radial-gradient(ellipse, rgba(151,71,255,0.12) 0%, transparent 70%)" }}
                />

                <div className="relative z-10">
                  <div className="mb-6">
                    <h2
                      className="text-xl font-bold text-white mb-1"
                      style={{ fontFamily: "var(--font-bricolage)" }}
                    >
                      get a free consultation
                    </h2>
                    <div className="flex items-center gap-2 text-white/40 text-sm">
                      <Clock size={13} strokeWidth={2} />
                      a CA will reach out within 24 hours
                    </div>
                  </div>
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What is 15CA / 15CB */}
        <section className="relative overflow-hidden bg-[#0d0d12] border-y border-white/8">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] pointer-events-none"
            style={{ background: "radial-gradient(ellipse, rgba(20,110,255,0.06) 0%, transparent 70%)" }}
          />
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
              {/* 15CA */}
              <div
                className="rounded-2xl p-7 border"
                style={{
                  backgroundColor: "rgba(20,110,255,0.06)",
                  borderColor: "rgba(20,110,255,0.20)",
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white"
                    style={{ backgroundColor: "#146EFF" }}
                  >
                    CA
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">Form 15CA</div>
                    <div className="text-white/40 text-xs">filed by the remitter</div>
                  </div>
                </div>
                <p className="text-white/55 text-sm leading-relaxed">
                  A self-declaration submitted online by the person sending money abroad, certifying that the applicable tax has been withheld or that the remittance is exempt. Filed directly on the Income Tax portal.
                </p>
              </div>

              {/* 15CB */}
              <div
                className="rounded-2xl p-7 border"
                style={{
                  backgroundColor: "rgba(151,71,255,0.06)",
                  borderColor: "rgba(151,71,255,0.20)",
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white"
                    style={{ backgroundColor: "#9747ff" }}
                  >
                    CB
                  </div>
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
          <div
            className="absolute top-0 right-0 w-[500px] h-[400px] pointer-events-none"
            style={{ background: "radial-gradient(ellipse, rgba(151,71,255,0.07) 0%, transparent 70%)" }}
          />
          <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
            <div className="text-center mb-12">
              <h2
                className="text-3xl md:text-4xl leading-tight mb-4"
                style={{ fontFamily: "var(--font-bricolage)", fontWeight: 300, color: "#bcd9f5" }}
              >
                how we{" "}
                <span style={{ fontWeight: 700, color: "#fff", textShadow: "0 0 50px #9747ff" }}>
                  get it done
                </span>
              </h2>
              <p className="text-white/40 text-base max-w-xl mx-auto">
                simple three-step process — from documents to clearance.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map(({ num, icon: Icon, title, desc }, i) => (
                <div key={num} className="relative">
                  <div
                    className="rounded-2xl p-8 border h-full"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.03)",
                      borderColor: "rgba(255,255,255,0.07)",
                    }}
                  >
                    <div className="flex items-start gap-3 mb-5">
                      <span
                        className="text-5xl font-bold leading-none select-none"
                        style={{ fontFamily: "var(--font-bricolage)", color: "#146EFF", opacity: 0.2 }}
                      >
                        {num}
                      </span>
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 mt-1"
                        style={{ backgroundColor: "rgba(20,110,255,0.2)" }}
                      >
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

        {/* FAQ */}
        <section className="relative overflow-hidden bg-[#0d0d12] border-t border-white/8">
          <div
            className="absolute bottom-0 left-1/4 w-[600px] h-[300px] pointer-events-none"
            style={{ background: "radial-gradient(ellipse, rgba(20,110,255,0.06) 0%, transparent 70%)" }}
          />
          <div className="relative z-10 max-w-3xl mx-auto px-6 py-20">
            <div className="text-center mb-12">
              <h2
                className="text-3xl md:text-4xl leading-tight mb-4"
                style={{ fontFamily: "var(--font-bricolage)", fontWeight: 300, color: "#bcd9f5" }}
              >
                common{" "}
                <span style={{ fontWeight: 700, color: "#fff", textShadow: "0 0 50px #9747ff" }}>
                  questions
                </span>
              </h2>
            </div>
            <div className="flex flex-col gap-4">
              {faqs.map(({ q, a }) => (
                <div
                  key={q}
                  className="rounded-2xl p-6 border"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.03)",
                    borderColor: "rgba(255,255,255,0.07)",
                  }}
                >
                  <h3 className="text-white font-semibold text-sm mb-2">{q}</h3>
                  <p className="text-white/45 text-sm leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA bottom */}
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
                <span style={{ fontWeight: 700, color: "#fff", textShadow: "0 0 50px #9747ff" }}>
                  remittance?
                </span>
              </h2>
              <p className="text-white/45 text-base mb-10">
                fill in the form above and a CA will reach out within 24 hours.
              </p>
              <a
                href="#get-started"
                style={{
                  background: "linear-gradient(103deg, #146EFF -6%, rgba(255,255,255,0.85) 94%)",
                  padding: "1.5px",
                  borderRadius: "9999px",
                  boxShadow: "0 0 50px 0 rgba(151,71,255,0.5)",
                  display: "inline-block",
                }}
              >
                <span
                  className="inline-flex items-center gap-2 text-sm font-semibold px-10 py-4 rounded-full"
                  style={{ backgroundColor: "#146EFF", color: "#fff" }}
                >
                  get started now <ArrowRight size={16} />
                </span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#0a0a0b]">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/">
            <Image
              src="/logo-white.png"
              alt="shunya"
              width={90}
              height={26}
              className="object-contain opacity-50"
            />
          </Link>
          <p className="text-xs text-zinc-500 text-center">
            © {new Date().getFullYear()} shunya. all rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-zinc-500">
            <a href="#" className="hover:text-zinc-200 transition-colors">privacy</a>
            <a href="#" className="hover:text-zinc-200 transition-colors">terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
