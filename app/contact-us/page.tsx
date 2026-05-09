import type { Metadata } from "next";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us — Shunya",
  description: "Get in touch with the Shunya team. We'd love to hear from you.",
};

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0b]">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-[#0a0a0b]/95 backdrop-blur border-b border-white/10">
        <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/">
            <Image src="/logo-white.png" alt="shunya" width={110} height={32} priority className="object-contain" />
          </a>
          <a
            href="/"
            className="text-sm font-semibold px-5 py-2.5 rounded-full border border-white/15 text-white/70 hover:border-white/40 hover:text-white transition-colors"
          >
            ← back to home
          </a>
        </nav>
      </header>

      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
            style={{ background: "radial-gradient(ellipse, rgba(20,110,255,0.08) 0%, transparent 70%)" }}
          />
          <div className="relative z-10 max-w-5xl mx-auto px-6 py-20">
            {/* Heading */}
            <div className="text-center mb-14">
              <h1
                className="text-4xl md:text-5xl leading-tight mb-4"
                style={{ fontFamily: "var(--font-bricolage)", fontWeight: 300, color: "#bcd9f5" }}
              >
                get in{" "}
                <span style={{ fontWeight: 700, color: "#fff", textShadow: "0 0 50px #9747ff" }}>touch</span>
              </h1>
              <p className="text-white/40 text-lg max-w-md mx-auto">
                have a question? we&apos;d love to hear from you. send us a message and we&apos;ll respond as soon as possible.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
              {/* Contact info */}
              <div className="lg:col-span-2 flex flex-col gap-6">
                <div
                  className="rounded-2xl p-7 border flex flex-col gap-6"
                  style={{ backgroundColor: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.07)" }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "rgba(20,110,255,0.15)" }}
                    >
                      <Mail size={18} style={{ color: "#7ab8ff" }} strokeWidth={1.75} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white/40 uppercase tracking-wide mb-1">Email</p>
                      <a
                        href="mailto:namaste@shunya.so"
                        className="text-white/80 text-sm hover:text-white transition-colors"
                      >
                        namaste@shunya.so
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "rgba(20,110,255,0.15)" }}
                    >
                      <Phone size={18} style={{ color: "#7ab8ff" }} strokeWidth={1.75} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white/40 uppercase tracking-wide mb-1">Phone</p>
                      <a
                        href="tel:+918433775085"
                        className="text-white/80 text-sm hover:text-white transition-colors"
                      >
                        +91 84337 75085
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "rgba(20,110,255,0.15)" }}
                    >
                      <MapPin size={18} style={{ color: "#7ab8ff" }} strokeWidth={1.75} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white/40 uppercase tracking-wide mb-1">Address</p>
                      <p className="text-white/80 text-sm leading-relaxed">
                        Shop No. 5, Topiwala Centre,<br />
                        Kakaji Nagar, Jawahar Nagar,<br />
                        Goregaon West, Mumbai<br />
                        Maharashtra 400104
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className="rounded-2xl p-6 border"
                  style={{ backgroundColor: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}
                >
                  <p className="text-xs font-semibold text-white/40 uppercase tracking-wide mb-1">Merchant Legal Entity</p>
                  <p className="text-white/70 text-sm">Advocare Technologies Private Limited</p>
                </div>
              </div>

              {/* Form */}
              <div className="lg:col-span-3">
                <div
                  className="rounded-2xl border p-8"
                  style={{
                    backgroundColor: "rgba(13,13,18,0.92)",
                    borderColor: "rgba(255,255,255,0.10)",
                    backdropFilter: "blur(20px)",
                    boxShadow: "0 0 80px rgba(151,71,255,0.06), 0 0 0 1px rgba(255,255,255,0.04)",
                  }}
                >
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#0a0a0b]">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Image src="/logo-white.png" alt="shunya" width={90} height={26} className="object-contain opacity-50" />
          <p className="text-xs text-zinc-500 text-center">
            © {new Date().getFullYear()} Advocare Technologies Private Limited. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-zinc-500">
            <a href="/contact-us" className="hover:text-zinc-200 transition-colors">contact</a>
            <a href="/terms-conditions" className="hover:text-zinc-200 transition-colors">terms</a>
            <a href="/cancellation-refund" className="hover:text-zinc-200 transition-colors">refunds</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
