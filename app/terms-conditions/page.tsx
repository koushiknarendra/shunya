import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Terms & Conditions — Shunya",
  description: "Terms and conditions for using Shunya's CA and compliance services.",
};

const sections = [
  {
    body: `For the purpose of these Terms and Conditions, the term "we", "us", "our" used anywhere on this page shall mean Advocare Technologies Private Limited, whose registered/operational office is Shop No. 5, Topiwala Centre, Kakaji Nagar, Jawahar Nagar, Goregaon West, Mumbai, Maharashtra 400104. "You", "your", "user", "visitor" shall mean any natural or legal person who is visiting our website and/or agreed to purchase from us.`,
  },
  {
    body: "Your use of the website and/or purchase from us are governed by the following Terms and Conditions:",
  },
  {
    body: "The content of the pages of this website is subject to change without notice.",
  },
  {
    body: "Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.",
  },
  {
    body: "Your use of any information or materials on our website and/or product pages is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through our website and/or product pages meet your specific requirements.",
  },
  {
    body: "Our website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these Terms and Conditions.",
  },
  {
    body: "All trademarks reproduced on our website which are not the property of, or licensed to, the operator are acknowledged on the website.",
  },
  {
    body: "Unauthorised use of information provided by us shall give rise to a claim for damages and/or be a criminal offence.",
  },
  {
    body: "From time to time our website may also include links to other websites. These links are provided for your convenience to provide further information.",
  },
  {
    body: "You may not create a link to our website from another website or document without Advocare Technologies Private Limited's prior written consent.",
  },
  {
    body: "Any dispute arising out of use of our website and/or purchase with us and/or any engagement with us is subject to the laws of India.",
  },
  {
    body: "We shall be under no liability whatsoever in respect of any loss or damage arising directly or indirectly out of the decline of authorisation for any transaction, on account of the cardholder having exceeded the preset limit mutually agreed by us with our acquiring bank from time to time.",
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
            style={{ background: "radial-gradient(ellipse, rgba(20,110,255,0.07) 0%, transparent 70%)" }}
          />
          <div className="relative z-10 max-w-3xl mx-auto px-6 py-20">
            {/* Heading */}
            <div className="mb-10">
              <h1
                className="text-4xl md:text-5xl leading-tight mb-3"
                style={{ fontFamily: "var(--font-bricolage)", fontWeight: 300, color: "#bcd9f5" }}
              >
                terms &{" "}
                <span style={{ fontWeight: 700, color: "#fff", textShadow: "0 0 50px #9747ff" }}>conditions</span>
              </h1>
              <p className="text-white/35 text-sm">Last updated on Nov 13, 2025</p>
            </div>

            {/* Content */}
            <div
              className="rounded-2xl border p-8 flex flex-col gap-5"
              style={{ backgroundColor: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.07)" }}
            >
              {sections.map((s, i) => (
                <p key={i} className="text-white/65 text-sm leading-relaxed">
                  {s.body}
                </p>
              ))}
            </div>

            {/* Contact section */}
            <div
              className="mt-8 rounded-2xl border p-7"
              style={{ backgroundColor: "rgba(20,110,255,0.05)", borderColor: "rgba(20,110,255,0.15)" }}
            >
              <h2
                className="text-lg font-semibold text-white mb-4"
                style={{ fontFamily: "var(--font-bricolage)" }}
              >
                Contact Us
              </h2>
              <p className="text-white/50 text-xs uppercase tracking-wide font-semibold mb-4">Last updated on Nov 13, 2025</p>
              <div className="flex flex-col gap-3 text-sm text-white/65">
                <div><span className="text-white/40">Merchant Legal Entity:</span> Advocare Technologies Private Limited</div>
                <div>
                  <span className="text-white/40">Registered Address:</span> Shop No. 5, Topiwala Centre, Kakaji Nagar, Jawahar Nagar, Goregaon West, Mumbai, Maharashtra 400104
                </div>
                <div>
                  <span className="text-white/40">Operational Address:</span> Shop No. 5, Topiwala Centre, Kakaji Nagar, Jawahar Nagar, Goregaon West, Mumbai, Maharashtra 400104
                </div>
                <div>
                  <span className="text-white/40">Telephone:</span>{" "}
                  <a href="tel:+918433775085" className="hover:text-white transition-colors">+91 84337 75085</a>
                </div>
                <div>
                  <span className="text-white/40">Email:</span>{" "}
                  <a href="mailto:namaste@shunya.so" className="hover:text-white transition-colors">namaste@shunya.so</a>
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
