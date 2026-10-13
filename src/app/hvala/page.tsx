import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hvala ti!",
  robots: { index: false, follow: false },
};

export default function HvalaPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-5 py-20 bg-black">
      <div className="max-w-2xl mx-auto text-center">
        {/* Checkmark */}
        <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-coral/20 flex items-center justify-center">
          <svg
            className="w-10 h-10 text-coral"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="font-[family-name:var(--font-bebas-neue)] text-5xl md:text-6xl lg:text-7xl text-white tracking-wide mb-4">
          HVALA TI, <span className="text-coral">WARRIOR. 🎉</span>
        </h1>

        <p className="text-white/70 text-lg md:text-xl leading-relaxed mb-10 max-w-lg mx-auto">
          Upravo si napravio najbolju odluku za sebe. Dobrodošao u{" "}
          <strong className="text-white">Warrior Stand-Up</strong> porodicu!
        </p>

        {/* Steps */}
        <div className="bg-dark-gray/50 border border-white/10 rounded-2xl p-8 md:p-10 text-left mb-10">
          <h2 className="font-[family-name:var(--font-bebas-neue)] text-3xl md:text-4xl text-white tracking-wide mb-8 text-center">
            SLJEDEĆI KORACI:
          </h2>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-coral/20 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-coral font-bold text-sm">1</span>
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg mb-1">
                  Skini Whop aplikaciju
                </h3>
                <p className="text-white/50 leading-relaxed mb-3">
                  Sav sadržaj programa se nalazi na Whop platformi. Skini aplikaciju na telefon za najbolje iskustvo.
                </p>
                <div className="flex gap-3">
                  <a href="https://apps.apple.com/us/app/whop/id1600181492" target="_blank" rel="noopener noreferrer" className="inline-block bg-white/10 hover:bg-white/15 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
                    App Store
                  </a>
                  <a href="https://play.google.com/store/apps/details?id=com.whop.app" target="_blank" rel="noopener noreferrer" className="inline-block bg-white/10 hover:bg-white/15 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
                    Google Play
                  </a>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-coral/20 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-coral font-bold text-sm">2</span>
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg mb-1">
                  Uloguj se sa istim emailom
                </h3>
                <p className="text-white/50 leading-relaxed">
                  Koristi isti email s kojim si kupio program. To je jedini način da ti se automatski otključa pristup svemu.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-coral/20 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-coral font-bold text-sm">3</span>
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg mb-1">
                  Kreni redom kroz module
                </h3>
                <p className="text-white/50 leading-relaxed">
                  Program je podijeljen u module i lekcije. Kreni od Modula 1 i idi redom. Svaka lekcija ima video objašnjenje — pogledaj ga prije nego kreneš.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-coral/20 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-coral font-bold text-sm">4</span>
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg mb-1">
                  Vježbaj uz video lekcije
                </h3>
                <p className="text-white/50 leading-relaxed">
                  Svaka tehnika ima detaljno video objašnjenje. Pogledaj, pa vježbaj. Ponavljanje je ključ — tu je prava transformacija.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-coral/20 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-coral font-bold text-sm">5</span>
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg mb-1">
                  Pridruži se zajednici
                </h3>
                <p className="text-white/50 leading-relaxed">
                  Unutar Whop aplikacije imaš pristup zatvorenoj grupi. Predstavi se, postavi pitanja, i poveži se sa ostalim članovima. Nisi sam u ovome!
                </p>
              </div>
            </div>
          </div>
        </div>

        <Link
          href="/"
          className="inline-block text-coral hover:text-coral/80 font-medium transition-colors"
        >
          &larr; Nazad na početnu
        </Link>
      </div>
    </main>
  );
}
