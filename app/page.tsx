import Image from "next/image";
import {
  Building2,
  FileText,
  ShieldCheck,
  BookOpen,
  Users,
  Globe,
  ArrowRight,
  CheckCircle2,
  Wifi,
  BadgeIndianRupee,
  UserCheck,
  Star,
  ClipboardList,
  Handshake,
  TrendingUp,
} from "lucide-react";

const services = [
  {
    icon: Building2,
    title: "company registration",
    desc: "Pvt Ltd, LLP, OPC, and more — set up the right structure from day one.",
    color: "#7ab8ff",
    bg: "rgba(20,110,255,0.15)",
  },
  {
    icon: FileText,
    title: "GST & tax filing",
    desc: "End-to-end GST registration, returns, and income tax filing handled for you.",
    color: "#4ade80",
    bg: "rgba(22,163,74,0.15)",
  },
  {
    icon: ShieldCheck,
    title: "regulatory compliance",
    desc: "ROC filings, annual returns, and statutory compliance — never miss a deadline.",
    color: "#a78bfa",
    bg: "rgba(124,58,237,0.15)",
  },
  {
    icon: BookOpen,
    title: "bookkeeping & accounts",
    desc: "Clean, accurate books maintained by professionals so you always know where you stand.",
    color: "#fb923c",
    bg: "rgba(234,88,12,0.15)",
  },
  {
    icon: Users,
    title: "payroll management",
    desc: "Salary processing, PF, ESI, TDS — payroll handled fully end-to-end.",
    color: "#2dd4bf",
    bg: "rgba(13,148,136,0.15)",
  },
  {
    icon: Globe,
    title: "foreign remittance (15CA/15CB)",
    desc: "Chartered Accountant certificates for international payments, done fast.",
    color: "#818cf8",
    bg: "rgba(79,70,229,0.15)",
  },
];

const stats = [
  { value: "500+", label: "businesses served" },
  { value: "15+", label: "CA services under one roof" },
  { value: "100%", label: "online, no office visits" },
];

const steps = [
  {
    num: "01",
    icon: ClipboardList,
    title: "share your requirements",
    desc: "Tell us what you need — company registration, compliance, GST, or anything else. A CA will get in touch within 24 hours.",
  },
  {
    num: "02",
    icon: Handshake,
    title: "we handle everything",
    desc: "Your dedicated CA handles all filings, paperwork, and follow-ups. Zero back-and-forth for you.",
  },
  {
    num: "03",
    icon: TrendingUp,
    title: "focus on your business",
    desc: "Compliances done, deadlines met, regular updates — so you can focus entirely on growth.",
  },
];

const reasons = [
  {
    icon: Wifi,
    title: "fully online",
    desc: "No office visits. Share documents digitally and track everything from your phone.",
  },
  {
    icon: BadgeIndianRupee,
    title: "fixed, transparent pricing",
    desc: "No hidden charges. Know exactly what you're paying before you sign up.",
  },
  {
    icon: UserCheck,
    title: "qualified CAs",
    desc: "Every service is handled by a licensed Chartered Accountant — not a junior or intern.",
  },
];

const testimonials = [
  {
    name: "Arjun Mehta",
    role: "Founder, Kairos D2C",
    location: "Bengaluru",
    quote:
      "Shunya registered our Pvt Ltd in under a week. The CA was prompt, explained everything clearly, and there were zero hidden fees.",
    initials: "AM",
  },
  {
    name: "Priya Sharma",
    role: "Director, Nexgen Exports",
    location: "New Delhi",
    quote:
      "15CA/15CB used to stress me out every quarter. Shunya handles it in 48 hours now. Genuinely transformed our workflow.",
    initials: "PS",
  },
  {
    name: "Rohan Desai",
    role: "CTO, Stackforge Labs",
    location: "Mumbai",
    quote:
      "GST filings, payroll, annual returns — all handled by one team. We stopped worrying about compliance entirely.",
    initials: "RD",
  },
];

const avatarInitials = ["AK", "RS", "PM", "NV"];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0b]">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-[#0a0a0b]/95 backdrop-blur border-b border-white/10">
        <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Image
            src="/logo-white.png"
            alt="shunya"
            width={110}
            height={32}
            priority
            className="object-contain"
          />
          <div className="hidden md:flex items-center gap-1 bg-white/10 rounded-full p-1">
            <a
              href="#services"
              className="text-sm font-medium text-zinc-300 px-4 py-1.5 rounded-full hover:bg-white/10 hover:text-white transition-all"
            >
              services
            </a>
            <a
              href="#how"
              className="text-sm font-medium text-zinc-300 px-4 py-1.5 rounded-full hover:bg-white/10 hover:text-white transition-all"
            >
              how it works
            </a>
            <a
              href="#contact"
              className="text-sm font-medium text-zinc-300 px-4 py-1.5 rounded-full hover:bg-white/10 hover:text-white transition-all"
            >
              contact
            </a>
          </div>
          <a
            href="#contact"
            className="text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
            style={{ backgroundColor: "#146EFF", color: "#fff" }}
          >
            get started
          </a>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative flex items-center min-h-[92vh] overflow-hidden">
          <Image
            src="/bg3.jpg"
            alt=""
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-[#0a0a0b]/70" />
          {/* Purple glow orb */}
          <div
            className="absolute top-1/4 left-1/3 w-[600px] h-[400px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(ellipse, rgba(151,71,255,0.12) 0%, transparent 70%)" }}
          />
          <div className="relative z-10 max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-24">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-3 bg-[#161616] border border-white/10 rounded-full px-4 py-2 mb-8">
                <div className="flex -space-x-2">
                  {avatarInitials.map((initials, i) => (
                    <div
                      key={i}
                      className="w-7 h-7 rounded-full border-2 border-white/20 flex items-center justify-center text-white text-[10px] font-bold"
                      style={{
                        backgroundColor: i % 2 === 0 ? "#146EFF" : "#1e1e24",
                        zIndex: 4 - i,
                      }}
                    >
                      {initials}
                    </div>
                  ))}
                </div>
                <span className="text-xs font-semibold text-white/60 uppercase tracking-wide">
                  trusted by 500+ businesses
                </span>
              </div>

              <h1
                className="text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight mb-6"
                style={{ fontFamily: "var(--font-bricolage)", fontWeight: 300, color: "#bcd9f5" }}
              >
                everything{" "}
                <span style={{ fontWeight: 700, color: "#fff", textShadow: "0 0 50px #9747ff" }}>
                  CA.
                </span>
                <br />
                for your business.
              </h1>
              <p className="text-lg md:text-xl text-white/50 max-w-xl mb-10 leading-relaxed">
                from registration to compliance to accounting — shunya handles every CA and
                accounting need so you stay focused on growing your business.
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <a
                  href="#contact"
                  className="flex items-center gap-2 text-sm font-semibold px-8 py-4 rounded-full transition-all hover:opacity-90 w-full sm:w-auto justify-center"
                  style={{
                    background: "linear-gradient(103deg, #146EFF -6%, rgba(255,255,255,0.85) 94%)",
                    padding: "1.5px",
                    borderRadius: "9999px",
                    boxShadow: "0 0 50px 0 rgba(151,71,255,0.5)",
                  }}
                >
                  <span
                    className="flex items-center gap-2 px-7 py-3.5 rounded-full w-full justify-center"
                    style={{ backgroundColor: "#146EFF", color: "#fff" }}
                  >
                    start for free <ArrowRight size={16} />
                  </span>
                </a>
                <a
                  href="#services"
                  className="text-sm font-semibold text-white/70 px-8 py-4 rounded-full border border-white/15 hover:border-white/40 hover:text-white transition-colors w-full sm:w-auto text-center"
                >
                  see all services
                </a>
              </div>
            </div>

            {/* Right: brand cover */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-full blur-3xl bg-[#9747ff]/15 scale-125" />
                <div className="absolute inset-0 rounded-full blur-2xl bg-[#146EFF]/20 scale-110" />
                <Image
                  src="/cover.png"
                  alt="shunya — zero friction compliance"
                  width={480}
                  height={396}
                  priority
                  className="relative rounded-2xl opacity-95"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats bar */}
        <section className="border-b border-white/8 bg-[#0d0d12]">
          <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-3 divide-x divide-white/8">
            {stats.map((s) => (
              <div key={s.label} className="text-center px-4">
                <div
                  className="text-3xl md:text-4xl font-bold mb-1"
                  style={{ fontFamily: "var(--font-bricolage)", color: "#146EFF" }}
                >
                  {s.value}
                </div>
                <div className="text-xs md:text-sm text-white/40 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Services */}
        <section id="services" className="relative overflow-hidden bg-[#0a0a0b]">
          {/* Subtle glow */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
            style={{ background: "radial-gradient(ellipse, rgba(20,110,255,0.07) 0%, transparent 70%)" }}
          />
          <div className="relative z-10 max-w-6xl mx-auto px-6 py-24">
            <div className="text-center mb-14">
              <h2
                className="text-4xl md:text-5xl leading-tight mb-4"
                style={{ fontFamily: "var(--font-bricolage)", fontWeight: 300, color: "#bcd9f5" }}
              >
                one roof.{" "}
                <span style={{ fontWeight: 700, color: "#fff", textShadow: "0 0 50px #9747ff" }}>
                  every service.
                </span>
              </h2>
              <p className="text-white/40 text-lg max-w-xl mx-auto">
                no juggling between CAs, accountants, and consultants. we do it all.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {services.map(({ icon: Icon, title, desc, color, bg }) => (
                <div
                  key={title}
                  className="group p-7 rounded-2xl border transition-all hover:border-white/15"
                  style={{ backgroundColor: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.07)" }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                    style={{ backgroundColor: bg }}
                  >
                    <Icon size={20} style={{ color }} strokeWidth={1.75} />
                  </div>
                  <h3 className="font-semibold text-white mb-2 text-[15px]">{title}</h3>
                  <p className="text-white/45 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="relative overflow-hidden bg-[#0d0d12] border-y border-white/8">
          <div
            className="absolute bottom-0 right-1/4 w-[500px] h-[300px] pointer-events-none"
            style={{ background: "radial-gradient(ellipse, rgba(151,71,255,0.07) 0%, transparent 70%)" }}
          />
          <div className="relative z-10 max-w-6xl mx-auto px-6 py-24">
            <div className="text-center mb-14">
              <h2
                className="text-4xl md:text-5xl leading-tight mb-4"
                style={{ fontFamily: "var(--font-bricolage)", fontWeight: 300, color: "#bcd9f5" }}
              >
                how it{" "}
                <span style={{ fontWeight: 700, color: "#fff", textShadow: "0 0 50px #9747ff" }}>
                  works
                </span>
              </h2>
              <p className="text-white/40 text-lg max-w-xl mx-auto">
                from first message to fully compliant — in three simple steps.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map(({ num, icon: Icon, title, desc }, i) => (
                <div key={num} className="relative">
                  <div
                    className="rounded-2xl p-8 border h-full"
                    style={{ backgroundColor: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.07)" }}
                  >
                    <div className="flex items-start gap-3 mb-5">
                      <span
                        className="text-5xl font-bold leading-none select-none"
                        style={{
                          fontFamily: "var(--font-bricolage)",
                          color: "#146EFF",
                          opacity: 0.2,
                        }}
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
                    <h3 className="font-semibold text-white mb-2 text-lg">{title}</h3>
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
        <section className="relative overflow-hidden bg-[#0a0a0b]">
          <div
            className="absolute top-0 right-0 w-[600px] h-[400px] pointer-events-none"
            style={{ background: "radial-gradient(ellipse, rgba(20,110,255,0.06) 0%, transparent 70%)" }}
          />
          <div className="relative z-10 max-w-6xl mx-auto px-6 py-24">
            <div className="text-center mb-14">
              <h2
                className="text-4xl md:text-5xl leading-tight mb-4"
                style={{ fontFamily: "var(--font-bricolage)", fontWeight: 300, color: "#bcd9f5" }}
              >
                what{" "}
                <span style={{ fontWeight: 700, color: "#fff", textShadow: "0 0 50px #9747ff" }}>
                  founders
                </span>{" "}
                say
              </h2>
              <p className="text-white/40 text-lg max-w-xl mx-auto">
                businesses across India trust shunya for their CA needs.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map(({ name, role, location, quote, initials }) => (
                <div
                  key={name}
                  className="rounded-2xl p-8 border"
                  style={{ backgroundColor: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.07)" }}
                >
                  <div className="flex gap-1 mb-5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="#146EFF" style={{ color: "#146EFF" }} />
                    ))}
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed mb-6">"{quote}"</p>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                      style={{ backgroundColor: "#146EFF" }}
                    >
                      {initials}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{name}</div>
                      <div className="text-xs text-white/40">
                        {role} · {location}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Shunya — dark with bg1 */}
        <section id="why" className="relative overflow-hidden">
          <Image
            src="/bg1.jpg"
            alt=""
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#0a0a0b]/75" />
          <div className="relative z-10 max-w-6xl mx-auto px-6 py-24">
            <div className="text-center mb-14">
              <h2
                className="text-4xl md:text-5xl leading-tight mb-4"
                style={{ fontFamily: "var(--font-bricolage)", fontWeight: 300, color: "#bcd9f5" }}
              >
                why{" "}
                <span style={{ fontWeight: 700, color: "#fff", textShadow: "0 0 50px #9747ff" }}>
                  shunya?
                </span>
              </h2>
              <p className="text-white/40 text-lg max-w-xl mx-auto">
                built for Indian businesses who want professional CA services without the friction.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {reasons.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="backdrop-blur-sm rounded-2xl p-8 border"
                  style={{ backgroundColor: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.10)" }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                    style={{ backgroundColor: "rgba(20,110,255,0.25)" }}
                  >
                    <Icon size={20} style={{ color: "#7ab8ff" }} strokeWidth={1.75} />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA — dark with bg2 */}
        <section id="contact" className="relative overflow-hidden">
          <Image
            src="/bg2.jpg"
            alt=""
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#0a0a0b]/72" />
          <div className="relative z-10 max-w-6xl mx-auto px-6 py-28 text-center">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-2 mb-6">
                {[...Array(3)].map((_, i) => (
                  <CheckCircle2 key={i} size={18} style={{ color: "#7ab8ff" }} strokeWidth={2} />
                ))}
              </div>
              <h2
                className="text-4xl md:text-5xl leading-tight mb-5"
                style={{ fontFamily: "var(--font-bricolage)", fontWeight: 300, color: "#bcd9f5" }}
              >
                let&apos;s get your business{" "}
                <span style={{ fontWeight: 700, color: "#fff", textShadow: "0 0 50px #9747ff" }}>
                  sorted.
                </span>
              </h2>
              <p className="text-white/45 text-lg mb-10">
                reach out and a CA will connect with you within 24 hours.
              </p>
              <a
                href="mailto:hello@shunya.so"
                style={{
                  background: "linear-gradient(103deg, #146EFF -6%, rgba(255,255,255,0.85) 94%)",
                  padding: "1.5px",
                  borderRadius: "9999px",
                  boxShadow: "0 0 50px 0 rgba(151,71,255,0.5)",
                  display: "inline-block",
                }}
              >
                <span
                  className="inline-flex items-center gap-2 text-sm font-semibold px-10 py-4 rounded-full transition-all hover:opacity-90"
                  style={{ backgroundColor: "#146EFF", color: "#fff" }}
                >
                  talk to an expert <ArrowRight size={16} />
                </span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#0a0a0b]">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Image
            src="/logo-white.png"
            alt="shunya"
            width={90}
            height={26}
            className="object-contain opacity-50"
          />
          <p className="text-xs text-zinc-500 text-center">
            © {new Date().getFullYear()} Advocare Technologies Private Limited. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-zinc-500">
            <a href="/contact-us" className="hover:text-zinc-200 transition-colors">
              Contact Us
            </a>
            <a href="/terms-conditions" className="hover:text-zinc-200 transition-colors">
              Terms of Service
            </a>
            <a href="/cancellation-refund" className="hover:text-zinc-200 transition-colors">
              Refund Policy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
