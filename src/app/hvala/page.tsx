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
          HVALA TI, <span className="text-coral">WARRIOR.</span>
        </h1>

        <p className="text-white/70 text-lg md:text-xl leading-relaxed mb-10 max-w-lg mx-auto">
          Tvoja uplata je uspješna i pristup programu{" "}
          <strong className="text-white">Warrior Stand-Up Program</strong>{" "}
          ti je odmah dostupan.
        </p>

        {/* What happens next */}
        <div className="bg-dark-gray/50 border border-white/10 rounded-2xl p-8 md:p-10 text-left mb-10">
          <h2 className="font-[family-name:var(--font-bebas-neue)] text-3xl md:text-4xl text-white tracking-wide mb-6 text-center">
            ŠTA DALJE?
          </h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-coral/20 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-coral font-bold text-sm">1</span>
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg mb-1">
                  Provjeri email
                </h3>
                <p className="text-white/50 leading-relaxed">
                  Na email ti stiže potvrda kupnje i link za pristup svim
                  materijalima. Provjeri i spam folder.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-coral/20 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-coral font-bold text-sm">2</span>
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg mb-1">
                  Pristupi programu
                </h3>
                <p className="text-white/50 leading-relaxed">
                  Ulogiraj se na platformu i kreni sa prvom sedmicom. Sve lekcije
                  su dostupne odmah — idi svojim tempom.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-coral/20 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-coral font-bold text-sm">3</span>
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg mb-1">
                  Pridruži se zajednici
                </h3>
                <p className="text-white/50 leading-relaxed">
                  Uđi u privatnu zajednicu gdje možeš postavljati pitanja,
                  dijeliti napredak i dobiti podršku od Miloša i ostalih polaznika.
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
