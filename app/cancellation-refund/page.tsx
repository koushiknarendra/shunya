import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Cancellation & Refund Policy — Shunya",
  description: "Shunya's cancellation and refund policy for CA and compliance services.",
};

const policies = [
  {
    body: "Cancellations will be considered only if the request is made within the same day of placing the order. However, the cancellation request may not be entertained if the orders have been communicated to the vendors/merchants and they have initiated the process.",
  },
  {
    body: "Shunya does not accept cancellation requests for services that have already been initiated or delivered by a Chartered Accountant.",
  },
  {
    body: "In case of receipt of an incorrect or defective service, please report the same to our Customer Service team. The request will be entertained once the issue has been reviewed and verified at our end. This should be reported within the same day of receipt.",
  },
  {
    body: "In case you feel that the service received is not as described on the site or as per your expectations, you must bring it to the notice of our customer service within the same day of receiving the service. The Customer Service Team, after looking into your complaint, will take an appropriate decision.",
  },
  {
    body: "In case of any refunds approved by Shunya (Advocare Technologies Private Limited), it will take 6–8 business days for the refund to be processed to the end customer.",
  },
];

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
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] pointer-events-none"
            style={{ background: "radial-gradient(ellipse, rgba(151,71,255,0.07) 0%, transparent 70%)" }}
          />
          <div className="relative z-10 max-w-3xl mx-auto px-6 py-20">
            {/* Heading */}
            <div className="mb-10">
              <h1
                className="text-4xl md:text-5xl leading-tight mb-3"
                style={{ fontFamily: "var(--font-bricolage)", fontWeight: 300, color: "#bcd9f5" }}
              >
                cancellation &{" "}
                <span style={{ fontWeight: 700, color: "#fff", textShadow: "0 0 50px #9747ff" }}>refund policy</span>
              </h1>
              <p className="text-white/35 text-sm">Last updated on Nov 13, 2025</p>
            </div>

            {/* Intro */}
            <p className="text-white/55 text-sm leading-relaxed mb-8">
              Shunya (Advocare Technologies Private Limited) believes in helping its customers as far as possible, and has therefore a liberal cancellation policy. Under this policy:
            </p>

            {/* Policy cards */}
            <div className="flex flex-col gap-4">
              {policies.map((p, i) => (
                <div
                  key={i}
                  className="rounded-2xl border p-6 flex gap-4"
                  style={{ backgroundColor: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.07)" }}
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold text-white"
                    style={{ backgroundColor: "rgba(20,110,255,0.2)", color: "#7ab8ff" }}
                  >
                    {i + 1}
                  </div>
                  <p className="text-white/65 text-sm leading-relaxed">{p.body}</p>
                </div>
              ))}
            </div>

            {/* Contact note */}
            <div
              className="mt-8 rounded-2xl border p-6"
              style={{ backgroundColor: "rgba(20,110,255,0.05)", borderColor: "rgba(20,110,255,0.15)" }}
            >
              <p className="text-white/55 text-sm leading-relaxed">
                For any cancellation or refund requests, please contact us at{" "}
                <a href="mailto:namaste@shunya.so" className="text-[#7ab8ff] hover:text-white transition-colors">
                  namaste@shunya.so
                </a>{" "}
                or call{" "}
                <a href="tel:+918433775085" className="text-[#7ab8ff] hover:text-white transition-colors">
                  +91 84337 75085
                </a>.
              </p>
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
