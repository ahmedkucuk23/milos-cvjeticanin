"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { loadWhop } from "@whop/elements";
import { Checkout, CheckoutElement, WhopElements } from "@whop/elements-react";

const CTA_LINK = "#pricing";

/* ─── Language detection hook ─── */
type Locale = "sr" | "en";

function useLocale(): Locale {
  const [locale, setLocale] = useState<Locale>("sr");
  useEffect(() => {
    const lang = navigator.language?.toLowerCase() || "";
    // Dutch (nl), English (en), and other non-Balkan languages → English
    const balkan = ["sr", "hr", "bs", "me", "mk", "sl"];
    const isBalkan = balkan.some((b) => lang.startsWith(b));
    if (!isBalkan) setLocale("en");
  }, []);
  return locale;
}

const t = {
  sr: {
    cta: "ZAPOČNI",
    heroSub: "Nauči da se biješ — pravilno.",
    heroDesc: "Online program udaračkih borilačkih vještina od Miloša Cvjetićanina. 12 sedmica. Tvoj tempo. Tvoj ring.",
    offerExpires: "Ponuda ističe za",
    days: "DANA", hours: "SATI", min: "MIN", sec: "SEK",
    startProgram: "ZAPOČNI PROGRAM",
    watchVideo: "POGLEDAJ",
    videoSub: "Miloš ti objašnjava šta te čeka u programu.",
    hostedOn: "Ovaj program je hostan na:",
    fullProgram: "FULL PROGRAM.",
    onePlatform: "JEDNA PLATFORMA.",
    whopDesc: <>Whop je <strong className="text-white">#1 platforma na svijetu</strong> za online kurseve i coaching. Preko{" "}<strong className="text-white">$2.5 milijardi</strong> je procesirano kroz kurseve na Whopu. Sigurna plaćanja, trenutan pristup, i sve na jednom mjestu.</>,
    whyWhop: "ZAŠTO",
    secureCheckout: "Siguran Checkout",
    secureCheckoutDesc: "Kartica, PayPal ili Apple Pay. Podaci tvojih kupaca su 100% zaštićeni.",
    instantAccess: "Trenutan Pristup",
    instantAccessDesc: "Sekund nakon što platiš, unutra si. Svi moduli, video lekcije i materijali — otključani odmah.",
    communityIncluded: "Zajednica Uključena",
    communityIncludedDesc: "Grupni chat, podrška članova i motivacija — sve u jednoj aplikaciji.",
    lifetimeAccess: "Doživotan Pristup",
    lifetimeAccessDesc: "Kupi jednom — tvoje zauvijek. Pristup sa telefona, tableta ili desktopa.",
    stopWasting: "PRESTANI DA",
    wasteTime: "GUBIŠ VRIJEME",
    problemSub: "Ako se prepoznaješ u nečemu od ovoga, ovaj program je za tebe.",
    pain1: "Gledaš YouTube tutoriale koji nemaju strukturu",
    pain2: "Treniraš godinama ali tehnika ti stoji",
    pain3: "Nemaš pristup kvalitetnom treneru",
    pain4: "Ne znaš šta vježbati i kojim redom",
    whoIs: "KO JE",
    aboutP1: "Miloš Cvjetićanin, poznat kao CobraMMA, je profesionalni MMA borac sa više od decenije iskustva u borilačkim sportovima. Sa preko 100 borbi iza sebe, Miloš je prošao put od početnika do profesionalca — i sada to znanje prenosi tebi kroz strukturirani online program.",
    aboutP2: "Ovo nije teorija. Ovo je program od borca koji je bio u ringu, koji zna šta funkcioniše pod pritiskom i koji te može naučiti da se biješ pravilno.",
    stat1: "godina u borilačkim sportovima", stat2: "profesionalni MMA borac", stat3: "borbi u karijeri", stat4: "pristup programu",
    whatYouGet: "ŠTA",
    get: "DOBIJAŠ",
    featuresSub: "Sve što ti treba da savladaš stand-up borbu — na jednom mjestu.",
    feat1Title: "12-sedmični program", feat1Desc: "Strukturirani plan treninga koji te vodi korak po korak od početnika do borca.",
    feat2Title: "Video lekcije", feat2Desc: "Svaka tehnika detaljno objašnjena i demonstrirana na video snimku.",
    feat3Title: "Progresivni sistem", feat3Desc: "Od osnova do naprednih kombinacija — sistem dizajniran za konstantan napredak.",
    feat4Title: "Udarci & kombinacije", feat4Desc: "Džeb, kros, aperkot, udarci nogama, kolenima — sve što ti treba za stand-up borbu.",
    feat5Title: "Privatna zajednica", feat5Desc: "Pristupi grupi istomišljenika, postavljaj pitanja i dijeli napredak.",
    feat6Title: "Kondiciona priprema", feat6Desc: "Plan kondicione pripreme koji prati program borbe — snaga, izdržljivost, eksplozivnost.",
    howItWorks: "KAKO",
    works: "FUNKCIONIŠE",
    stepsSub: "Tri jednostavna koraka do tvoje transformacije.",
    step1Title: "Prijavi se", step1Desc: "Klikni na dugme, završi uplatu i odmah dobij pristup cijelom programu.",
    step2Title: "Prati lekcije", step2Desc: "Gledaj video lekcije svojim tempom. Svaka sedmica donosi nove tehnike i kombinacije.",
    step3Title: "Postani borac", step3Desc: "Vježbaj, napreduj i razvij stand-up igru koja radi u ringu i na ulici.",
    joinWarrior: "PRIDRUŽI SE",
    warriorProgram: "WARRIOR PROGRAMU",
    pricingSub: "Jednokratna uplata. Doživotni pristup. Bez skrivenih troškova.",
    oneTimePayment: "jednokratna uplata",
    pf1: "12 sedmica strukturiranog programa",
    pf2: "Video lekcije svake tehnike",
    pf3: "Progresivni sistem treninga",
    pf4: "Udarci, kombinacije, kretanje, odbrana",
    pf5: "Plan kondicione pripreme",
    pf6: "Pristup privatnoj zajednici",
    pf7: "Doživotni pristup materijalu",
    pf8: "Besplatna ažuriranja programa",
    faqTitle: "ČESTA",
    faqHighlight: "PITANJA",
    faq1q: "Da li je program za početnike?",
    faq1a: "Da. Program je dizajniran tako da može pratiti svako — od potpunog početnika do iskusnijeg borca koji želi unaprijediti stand-up tehniku. Kreće se od osnova i postepeno se gradi.",
    faq2q: "Da li mi treba oprema za trening?",
    faq2a: "Za početak ti trebaju samo rukavice i vreća za udaranje. Ako nemaš vreću, mnoge vježbe možeš raditi i sa shadow boxing-om. Kako napreduješ, preporučujemo i štitnike.",
    faq3q: "Koliko vremena dnevno treba izdvojiti?",
    faq3a: "Program je dizajniran za 45-60 minuta treninga, 3-5 puta sedmično. Ali možeš ga prilagoditi svom rasporedu — sve lekcije su dostupne 24/7.",
    faq4q: "Šta ako propustim sedmicu?",
    faq4a: "Nema brige. Imaš doživotni pristup programu, pa možeš nastaviti kad god želiš. Nema pritiska — radi svojim tempom.",
    faq5q: "Da li mogu postavljati pitanja?",
    faq5a: "Naravno. Imaš pristup privatnoj zajednici gdje možeš postavljati pitanja, dijeliti snimke svojih tehnika i dobiti povratnu informaciju.",
    faq6q: "Kakve tehnike program pokriva?",
    faq6a: "Program pokriva kompletnu stand-up igru: džeb, kros, aperkot, huk, udarce nogama (low kick, middle kick, head kick), udarce koljenima, kombinacije, footwork, odbranu i kontra-napade.",
    faq7q: "Da li je ovo samo za MMA borce?",
    faq7a: "Ne. Program je koristan za svakoga ko želi naučiti da se bije pravilno — bilo da planiraš takmičenje, treniraš za samoodbranu ili jednostavno želiš naučiti borilačke vještine.",
    faq8q: "Kako izgleda pristup programu?",
    faq8a: "Nakon uplate dobijaš pristup online platformi sa svim video lekcijama, planom treninga i zajednicom. Možeš pristupiti sa telefona, tableta ili kompjutera.",
    footerRights: "Warrior Stand-Up Program. Sva prava zadržana.",
  },
  en: {
    cta: "START NOW",
    heroSub: "Learn to fight — the right way.",
    heroDesc: "Online striking & martial arts program by Miloš Cvjetićanin. 12 weeks. Your pace. Your ring.",
    offerExpires: "Offer expires in",
    days: "DAYS", hours: "HRS", min: "MIN", sec: "SEC",
    startProgram: "START PROGRAM",
    watchVideo: "WATCH THE",
    videoSub: "Miloš explains what awaits you in the program.",
    hostedOn: "This program is hosted on:",
    fullProgram: "FULL PROGRAM.",
    onePlatform: "ONE PLATFORM.",
    whopDesc: <>Whop is the <strong className="text-white">#1 platform in the world</strong> for online courses and coaching. Over{" "}<strong className="text-white">$2.5 billion</strong> has been processed through courses on Whop. Secure payments, instant access, and everything in one place.</>,
    whyWhop: "WHY",
    secureCheckout: "Secure Checkout",
    secureCheckoutDesc: "Card, PayPal or Apple Pay. Your data is 100% protected.",
    instantAccess: "Instant Access",
    instantAccessDesc: "The second you pay, you're in. All modules, video lessons and materials — unlocked immediately.",
    communityIncluded: "Community Included",
    communityIncludedDesc: "Group chat, member support and motivation — all in one app.",
    lifetimeAccess: "Lifetime Access",
    lifetimeAccessDesc: "Buy once — yours forever. Access from phone, tablet or desktop.",
    stopWasting: "STOP",
    wasteTime: "WASTING TIME",
    problemSub: "If any of this sounds familiar, this program is for you.",
    pain1: "Watching YouTube tutorials with no structure",
    pain2: "Training for years but your technique is stuck",
    pain3: "No access to a quality coach",
    pain4: "Don't know what to practice or in what order",
    whoIs: "WHO IS",
    aboutP1: "Miloš Cvjetićanin, known as CobraMMA, is a professional MMA fighter with over a decade of experience in martial arts. With over 100 fights under his belt, Miloš has gone from beginner to professional — and now passes that knowledge to you through a structured online program.",
    aboutP2: "This isn't theory. This is a program from a fighter who's been in the ring, who knows what works under pressure, and who can teach you to fight the right way.",
    stat1: "years in martial arts", stat2: "professional MMA fighter", stat3: "fights in career", stat4: "access to program",
    whatYouGet: "WHAT YOU",
    get: "GET",
    featuresSub: "Everything you need to master stand-up fighting — in one place.",
    feat1Title: "12-week program", feat1Desc: "A structured training plan that takes you step by step from beginner to fighter.",
    feat2Title: "Video lessons", feat2Desc: "Every technique explained in detail and demonstrated on video.",
    feat3Title: "Progressive system", feat3Desc: "From basics to advanced combinations — a system designed for constant progress.",
    feat4Title: "Strikes & combos", feat4Desc: "Jab, cross, uppercut, kicks, knees — everything you need for stand-up fighting.",
    feat5Title: "Private community", feat5Desc: "Join a group of like-minded people, ask questions and share your progress.",
    feat6Title: "Conditioning plan", feat6Desc: "A conditioning plan that follows the fight program — strength, endurance, explosiveness.",
    howItWorks: "HOW IT",
    works: "WORKS",
    stepsSub: "Three simple steps to your transformation.",
    step1Title: "Sign up", step1Desc: "Click the button, complete payment and get instant access to the entire program.",
    step2Title: "Follow lessons", step2Desc: "Watch video lessons at your own pace. Each week brings new techniques and combinations.",
    step3Title: "Become a fighter", step3Desc: "Practice, progress and develop a stand-up game that works in the ring and on the street.",
    joinWarrior: "JOIN THE",
    warriorProgram: "WARRIOR PROGRAM",
    pricingSub: "One-time payment. Lifetime access. No hidden fees.",
    oneTimePayment: "one-time payment",
    pf1: "12 weeks of structured program",
    pf2: "Video lessons for every technique",
    pf3: "Progressive training system",
    pf4: "Strikes, combos, movement, defense",
    pf5: "Conditioning plan",
    pf6: "Access to private community",
    pf7: "Lifetime access to all materials",
    pf8: "Free program updates",
    faqTitle: "FREQUENTLY ASKED",
    faqHighlight: "QUESTIONS",
    faq1q: "Is this program for beginners?",
    faq1a: "Yes. The program is designed so anyone can follow along — from complete beginners to more experienced fighters looking to improve their stand-up technique. It starts from the basics and builds gradually.",
    faq2q: "Do I need equipment for training?",
    faq2a: "To start, you only need gloves and a heavy bag. If you don't have a bag, many exercises can be done with shadow boxing. As you progress, we also recommend shin guards.",
    faq3q: "How much time per day do I need?",
    faq3a: "The program is designed for 45-60 minutes of training, 3-5 times per week. But you can adjust it to your schedule — all lessons are available 24/7.",
    faq4q: "What if I miss a week?",
    faq4a: "No worries. You have lifetime access to the program, so you can continue whenever you want. No pressure — work at your own pace.",
    faq5q: "Can I ask questions?",
    faq5a: "Of course. You have access to a private community where you can ask questions, share videos of your techniques and get feedback.",
    faq6q: "What techniques does the program cover?",
    faq6a: "The program covers the complete stand-up game: jab, cross, uppercut, hook, kicks (low kick, middle kick, head kick), knee strikes, combinations, footwork, defense and counter-attacks.",
    faq7q: "Is this only for MMA fighters?",
    faq7a: "No. The program is useful for anyone who wants to learn to fight properly — whether you plan to compete, train for self-defense, or simply want to learn martial arts.",
    faq8q: "How do I access the program?",
    faq8a: "After payment, you get access to an online platform with all video lessons, training plan and community. You can access it from your phone, tablet or computer.",
    footerRights: "Warrior Stand-Up Program. All rights reserved.",
  },
};

/* ─── Countdown hook (7 days from first visit) ─── */
function useCountdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 7, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const STORAGE_KEY = "warrior_countdown_end";
    let endTime = localStorage.getItem(STORAGE_KEY);
    if (!endTime) {
      const end = Date.now() + 7 * 24 * 60 * 60 * 1000;
      localStorage.setItem(STORAGE_KEY, String(end));
      endTime = String(end);
    }
    const deadline = Number(endTime);

    const tick = () => {
      const diff = Math.max(0, deadline - Date.now());
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return timeLeft;
}

/* ─── Scroll reveal hook ─── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll(".reveal").forEach((child) =>
            child.classList.add("visible")
          );
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

/* ─── Section wrapper ─── */
function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useReveal();
  return (
    <section ref={ref} id={id} className={`px-5 md:px-8 ${className}`}>
      <div className="max-w-6xl mx-auto">{children}</div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════ */

const PAIN_POINTS = [
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    text: "Gledaš YouTube tutoriale koji nemaju strukturu",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    text: "Treniraš godinama ali tehnika ti stoji",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
    ),
    text: "Nemaš pristup kvalitetnom treneru",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
      </svg>
    ),
    text: "Ne znaš šta vježbati i kojim redom",
  },
];

const FEATURES = [
  {
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
    title: "12-sedmični program",
    desc: "Strukturirani plan treninga koji te vodi korak po korak od početnika do borca.",
  },
  {
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
      </svg>
    ),
    title: "Video lekcije",
    desc: "Svaka tehnika detaljno objašnjena i demonstrirana na video snimku.",
  },
  {
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    title: "Progresivni sistem",
    desc: "Od osnova do naprednih kombinacija — sistem dizajniran za konstantan napredak.",
  },
  {
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.047 8.287 8.287 0 009 9.601a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.468 5.99 5.99 0 00-1.925 3.547 5.975 5.975 0 01-2.133-1.001A3.75 3.75 0 0012 18z" />
      </svg>
    ),
    title: "Udarci & kombinacije",
    desc: "Džeb, kros, aperkot, udarci nogama, kolenima — sve što ti treba za stand-up borbu.",
  },
  {
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    title: "Privatna zajednica",
    desc: "Pristupi grupi istomišljenika, postavljaj pitanja i dijeli napredak.",
  },
  {
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: "Kondiciona priprema",
    desc: "Plan kondicione pripreme koji prati program borbe — snaga, izdržljivost, eksplozivnost.",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Prijavi se",
    desc: "Klikni na dugme, završi uplatu i odmah dobij pristup cijelom programu.",
  },
  {
    num: "02",
    title: "Prati lekcije",
    desc: "Gledaj video lekcije svojim tempom. Svaka sedmica donosi nove tehnike i kombinacije.",
  },
  {
    num: "03",
    title: "Postani borac",
    desc: "Vježbaj, napreduj i razvij stand-up igru koja radi u ringu i na ulici.",
  },
];

const PRICING_FEATURES = [
  "12 sedmica strukturiranog programa",
  "Video lekcije svake tehnike",
  "Progresivni sistem treninga",
  "Udarci, kombinacije, kretanje, odbrana",
  "Plan kondicione pripreme",
  "Pristup privatnoj zajednici",
  "Doživotni pristup materijalu",
  "Besplatna ažuriranja programa",
];

const FAQS = [
  {
    q: "Da li je program za početnike?",
    a: "Da. Program je dizajniran tako da može pratiti svako — od potpunog početnika do iskusnijeg borca koji želi unaprijediti stand-up tehniku. Kreće se od osnova i postepeno se gradi.",
  },
  {
    q: "Da li mi treba oprema za trening?",
    a: "Za početak ti trebaju samo rukavice i vreća za udaranje. Ako nemaš vreću, mnoge vježbe možeš raditi i sa shadow boxing-om. Kako napreduješ, preporučujemo i štitnike.",
  },
  {
    q: "Koliko vremena dnevno treba izdvojiti?",
    a: "Program je dizajniran za 45-60 minuta treninga, 3-5 puta sedmično. Ali možeš ga prilagoditi svom rasporedu — sve lekcije su dostupne 24/7.",
  },
  {
    q: "Šta ako propustim sedmicu?",
    a: "Nema brige. Imaš doživotni pristup programu, pa možeš nastaviti kad god želiš. Nema pritiska — radi svojim tempom.",
  },
  {
    q: "Da li mogu postavljati pitanja?",
    a: "Naravno. Imaš pristup privatnoj zajednici gdje možeš postavljati pitanja, dijeliti snimke svojih tehnika i dobiti povratnu informaciju.",
  },
  {
    q: "Kakve tehnike program pokriva?",
    a: "Program pokriva kompletnu stand-up igru: džeb, kros, aperkot, huk, udarce nogama (low kick, middle kick, head kick), udarce koljenima, kombinacije, footwork, odbranu i kontra-napade.",
  },
  {
    q: "Da li je ovo samo za MMA borce?",
    a: "Ne. Program je koristan za svakoga ko želi naučiti da se bije pravilno — bilo da planiraš takmičenje, treniraš za samoodbranu ili jednostavno želiš naučiti borilačke vještine.",
  },
  {
    q: "Kako izgleda pristup programu?",
    a: "Nakon uplate dobijaš pristup online platformi sa svim video lekcijama, planom treninga i zajednicom. Možeš pristupiti sa telefona, tableta ili kompjutera.",
  },
];

const STATS = [
  { value: "10+", label: "godina u borilačkim sportovima" },
  { value: "PRO", label: "profesionalni MMA borac" },
  { value: "100+", label: "borbi u karijeri" },
  { value: "24/7", label: "pristup programu" },
];

/* ═══════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════ */

export default function Home() {
  const detectedLocale = useLocale();
  const [locale, setLocale] = useState<Locale>(detectedLocale);
  const [langOpen, setLangOpen] = useState(false);
  useEffect(() => { setLocale(detectedLocale); }, [detectedLocale]);
  const l = t[locale];
  const countdown = useCountdown();
  const checkoutFired = useRef(false);

  // Fire InitiateCheckout when pricing section becomes visible
  useEffect(() => {
    const el = document.getElementById("pricing");
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !checkoutFired.current) {
          checkoutFired.current = true;
          (window as any).fbq?.("track", "InitiateCheckout", {
            content_name: "Warrior Stand-Up Program",
            currency: "EUR",
            value: 49.99,
          });
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ─── NAVBAR ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center">
            <img src="/images/logo.png" alt="Warrior Stand-Up" className="h-10" />
          </a>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 bg-white/10 hover:bg-white/15 rounded-lg px-2.5 py-2 text-sm transition-colors"
              >
                <span>{locale === "sr" ? "🇷🇸" : "🇬🇧"}</span>
                <svg className="w-3.5 h-3.5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-1 bg-black/95 border border-white/10 rounded-lg overflow-hidden shadow-xl z-50">
                  <button
                    onClick={() => { setLocale("sr"); setLangOpen(false); }}
                    className={`flex items-center gap-2 w-full px-4 py-2.5 text-sm transition-colors ${locale === "sr" ? "bg-coral/20 text-white" : "text-white/70 hover:bg-white/10"}`}
                  >
                    <span>🇷🇸</span> Srpski
                  </button>
                  <button
                    onClick={() => { setLocale("en"); setLangOpen(false); }}
                    className={`flex items-center gap-2 w-full px-4 py-2.5 text-sm transition-colors ${locale === "en" ? "bg-coral/20 text-white" : "text-white/70 hover:bg-white/10"}`}
                  >
                    <span>🇬🇧</span> English
                  </button>
                </div>
              )}
            </div>
            <a
              href={CTA_LINK}
              className="bg-coral hover:bg-coral-dark text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors"
            >
              {l.cta}
            </a>
          </div>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background image */}
        <div className="absolute inset-0">
          {/* Desktop hero */}
          <Image
            src="/images/hero-desktop.png"
            alt="Warrior Stand-Up Program"
            fill
            className="hidden md:block object-cover object-center"
            priority
          />
          {/* Mobile hero */}
          <Image
            src="/images/hero-mobile.png"
            alt="Warrior Stand-Up Program"
            fill
            className="block md:hidden object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#F15959]/20 via-transparent to-transparent" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-4xl mx-auto px-5 md:px-8 text-center py-24 md:py-32 flex flex-col items-center justify-end min-h-[80vh]">
          <h1 className="font-[family-name:var(--font-bebas-neue)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] tracking-wide text-white mb-4">
            WARRIOR<br />
            <span className="text-coral">STAND-UP</span><br />
            PROGRAM
          </h1>
          <p className="text-lg md:text-2xl font-semibold text-white/90 mb-3">
            {l.heroSub}
          </p>
          <p className="text-sm md:text-base text-white/60 max-w-xl mx-auto mb-6 leading-relaxed">
            {l.heroDesc}
          </p>

          {/* Countdown timer */}
          <div className="mb-6">
            <p className="text-xs md:text-sm text-coral font-semibold uppercase tracking-widest mb-3">{l.offerExpires}</p>
            <div className="flex gap-3 md:gap-4 justify-center">
              {[
                { value: countdown.days, label: l.days },
                { value: countdown.hours, label: l.hours },
                { value: countdown.minutes, label: l.min },
                { value: countdown.seconds, label: l.sec },
              ].map((item) => (
                <div key={item.label} className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 md:px-4 md:py-3 min-w-[60px] md:min-w-[72px]">
                  <span className="font-[family-name:var(--font-bebas-neue)] text-2xl md:text-3xl text-white">{String(item.value).padStart(2, "0")}</span>
                  <p className="text-[10px] md:text-xs text-white/50 tracking-wider">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <a
            href={CTA_LINK}
            className="inline-block bg-coral hover:bg-coral-dark text-white font-bold text-base md:text-lg px-10 py-4 rounded-lg transition-all hover:scale-105 shadow-lg shadow-coral/25"
          >
            {l.startProgram}
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2" opacity="0.4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* ─── VSL VIDEO ─── */}
      <Section className="py-20 md:py-28 bg-black" id="video">
        <h2 className="reveal font-[family-name:var(--font-bebas-neue)] text-4xl sm:text-5xl md:text-6xl text-center text-white tracking-wide mb-4">
          {l.watchVideo} <span className="text-coral">VIDEO</span>
        </h2>
        <p className="reveal reveal-delay-1 text-center text-white/50 text-lg mb-10 max-w-2xl mx-auto">
          {l.videoSub}
        </p>
        <div className="reveal reveal-delay-2 max-w-3xl mx-auto">
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10">
            <video
              className="w-full h-full object-cover"
              controls
              preload="metadata"
              playsInline
              poster="/images/vsl-poster.jpg"
            >
              <source src="https://cvcynsuaxofnbltikbwp.supabase.co/storage/v1/object/public/videos/warrior-vsl.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </Section>

      {/* ─── WHOP PLATFORM ─── */}
      <Section className="py-20 md:py-28 bg-black border-t border-white/5">
        <div>
          <div className="reveal text-center mb-12">
            <p className="text-sm text-white/50 mb-4 uppercase tracking-widest">
              {l.hostedOn}{" "}
              <Image src="/whop-logo.svg" alt="Whop" width={80} height={24} className="inline-block align-middle ml-2 h-[22px] w-auto" />
            </p>
            <h2 className="font-[family-name:var(--font-bebas-neue)] text-4xl sm:text-5xl md:text-6xl text-white tracking-wide mb-5">
              {l.fullProgram}{" "}
              <span className="text-coral">{l.onePlatform}</span>
            </h2>
            <p className="reveal reveal-delay-1 text-white/60 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              {l.whopDesc}
            </p>
          </div>

          <div className="reveal reveal-delay-2 grid md:grid-cols-2 gap-12 items-center max-w-4xl mx-auto">
            {/* Phone mockup */}
            <div className="flex justify-center">
              <div className="w-[280px] rounded-[36px] overflow-hidden border-[6px] border-white/10 shadow-[0_24px_64px_rgba(0,0,0,0.5)] bg-black">
                <video autoPlay muted loop playsInline className="w-[104%] -ml-[2%] block">
                  <source src="/videos/whop-mockup.mp4" type="video/mp4" />
                </video>
              </div>
            </div>

            {/* Why Whop */}
            <div>
              <h3 className="font-[family-name:var(--font-bebas-neue)] text-2xl md:text-3xl text-white mb-8 tracking-wide">
                {l.whyWhop} <span className="text-coral">WHOP?</span>
              </h3>
              <div className="flex flex-col gap-5">
                {[
                  {
                    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F15959" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
                    title: l.secureCheckout,
                    desc: l.secureCheckoutDesc,
                  },
                  {
                    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F15959" strokeWidth="2" strokeLinecap="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
                    title: l.instantAccess,
                    desc: l.instantAccessDesc,
                  },
                  {
                    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F15959" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
                    title: l.communityIncluded,
                    desc: l.communityIncludedDesc,
                  },
                  {
                    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F15959" strokeWidth="2" strokeLinecap="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>,
                    title: l.lifetimeAccess,
                    desc: l.lifetimeAccessDesc,
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4 p-5 rounded-2xl bg-white/5 border border-white/10">
                    <div className="w-11 h-11 rounded-xl bg-coral/15 flex items-center justify-center shrink-0">{item.icon}</div>
                    <div>
                      <div className="text-[15px] font-bold text-white mb-1">{item.title}</div>
                      <div className="text-[13px] text-white/50 leading-relaxed">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ─── PROBLEM ─── */}
      <Section className="py-20 md:py-28 bg-black" id="problem">
        <h2 className="reveal font-[family-name:var(--font-bebas-neue)] text-4xl sm:text-5xl md:text-6xl text-center text-white tracking-wide mb-4">
          {l.stopWasting} <span className="text-coral">{l.wasteTime}</span>
        </h2>
        <p className="reveal reveal-delay-1 text-center text-white/50 text-lg mb-14 max-w-2xl mx-auto">
          {l.problemSub}
        </p>
        <div className="grid sm:grid-cols-2 gap-5">
          {PAIN_POINTS.map((p, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${i + 2} bg-black/40 border border-white/5 rounded-xl p-6 flex items-start gap-4 hover:border-coral/30 transition-colors`}
            >
              <div className="text-coral mt-0.5 shrink-0">{p.icon}</div>
              <p className="text-white/80 text-base leading-relaxed">{[l.pain1, l.pain2, l.pain3, l.pain4][i]}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── ABOUT / CREDENTIALS ─── */}
      <Section className="py-20 md:py-28 bg-black" id="about">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="reveal relative aspect-[3/4] rounded-2xl overflow-hidden">
            <Image
              src="/images/milos-stance.png"
              alt="Miloš Cvjetićanin - profesionalni MMA borac"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
          <div>
            <h2 className="reveal font-[family-name:var(--font-bebas-neue)] text-4xl sm:text-5xl md:text-6xl text-white tracking-wide mb-6">
              {l.whoIs} <span className="text-coral">MILOŠ CVJETIĆANIN</span>?
            </h2>
            <p className="reveal reveal-delay-1 text-white/60 text-base leading-relaxed mb-8">
              {l.aboutP1}
            </p>
            <p className="reveal reveal-delay-2 text-white/60 text-base leading-relaxed mb-10">
              {l.aboutP2}
            </p>

            <div className="grid grid-cols-2 gap-4">
              {STATS.map((s, i) => (
                <div
                  key={i}
                  className={`reveal reveal-delay-${i + 3} bg-dark-gray/60 border border-white/5 rounded-xl p-4 text-center`}
                >
                  <div className="font-[family-name:var(--font-bebas-neue)] text-3xl text-coral mb-1">
                    {s.value}
                  </div>
                  <div className="text-white/50 text-sm">{[l.stat1, l.stat2, l.stat3, l.stat4][i]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ─── FEATURES ─── */}
      <Section className="py-20 md:py-28 bg-black" id="features">
        <h2 className="reveal font-[family-name:var(--font-bebas-neue)] text-4xl sm:text-5xl md:text-6xl text-center text-white tracking-wide mb-4">
          {l.whatYouGet} <span className="text-coral">{l.get}</span>
        </h2>
        <p className="reveal reveal-delay-1 text-center text-white/50 text-lg mb-14 max-w-2xl mx-auto">
          {l.featuresSub}
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${i + 1} group bg-dark-gray/40 border border-white/5 rounded-xl p-6 hover:border-coral/30 transition-all hover:-translate-y-1`}
            >
              <div className="text-coral mb-4 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{[l.feat1Title, l.feat2Title, l.feat3Title, l.feat4Title, l.feat5Title, l.feat6Title][i]}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{[l.feat1Desc, l.feat2Desc, l.feat3Desc, l.feat4Desc, l.feat5Desc, l.feat6Desc][i]}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── HOW IT WORKS ─── */}
      <Section className="py-20 md:py-28 bg-black" id="steps">
        <h2 className="reveal font-[family-name:var(--font-bebas-neue)] text-4xl sm:text-5xl md:text-6xl text-center text-white tracking-wide mb-4">
          {l.howItWorks} <span className="text-coral">{l.works}</span>
        </h2>
        <p className="reveal reveal-delay-1 text-center text-white/50 text-lg mb-14 max-w-2xl mx-auto">
          {l.stepsSub}
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {STEPS.map((s, i) => (
            <div key={i} className={`reveal reveal-delay-${i + 2} text-center`}>
              <div className="font-[family-name:var(--font-bebas-neue)] text-7xl text-coral/20 mb-2">
                {s.num}
              </div>
              <h3 className="text-white font-bold text-xl mb-3">{[l.step1Title, l.step2Title, l.step3Title][i]}</h3>
              <p className="text-white/50 text-sm leading-relaxed max-w-xs mx-auto">
                {[l.step1Desc, l.step2Desc, l.step3Desc][i]}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Gallery section removed */}

      {/* ─── PRICING ─── */}
      <Section className="py-20 md:py-28 bg-black" id="pricing">
        <h2 className="reveal font-[family-name:var(--font-bebas-neue)] text-4xl sm:text-5xl md:text-6xl text-center text-white tracking-wide mb-4">
          {l.joinWarrior} <span className="text-coral">{l.warriorProgram}</span>
        </h2>
        <p className="reveal reveal-delay-1 text-center text-white/50 text-lg mb-14 max-w-2xl mx-auto">
          {l.pricingSub}
        </p>

        <div className="reveal reveal-delay-2 max-w-lg mx-auto bg-dark-gray/50 border border-coral/20 rounded-2xl p-8 md:p-10">
          <div className="text-center mb-8">
            <div className="font-[family-name:var(--font-bebas-neue)] text-6xl md:text-7xl text-white mb-2">
              <span className="text-coral">&euro;49</span>
              <span className="text-2xl text-white/40">.99</span>
            </div>
            <p className="text-white/40 text-sm">{l.oneTimePayment}</p>
          </div>

          <ul className="space-y-3 mb-10">
            {PRICING_FEATURES.map((f, i) => (
              <li key={i} className="flex items-start gap-3 text-white/70 text-sm">
                <svg className="w-5 h-5 text-coral shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                {[l.pf1, l.pf2, l.pf3, l.pf4, l.pf5, l.pf6, l.pf7, l.pf8][i]}
              </li>
            ))}
          </ul>

          <div className="mt-2">
            <WhopElements elements={loadWhop()}>
              <Checkout plan="plan_X5w94LuMarxni" returnUrl="https://warriorstandup.com/hvala">
                <CheckoutElement />
              </Checkout>
            </WhopElements>
          </div>
        </div>
      </Section>

      {/* ─── FAQ ─── */}
      <Section className="py-20 md:py-28 bg-black" id="faq">
        <h2 className="reveal font-[family-name:var(--font-bebas-neue)] text-4xl sm:text-5xl md:text-6xl text-center text-white tracking-wide mb-14">
          {l.faqTitle} <span className="text-coral">{l.faqHighlight}</span>
        </h2>
        <div className="max-w-3xl mx-auto space-y-3">
          {FAQS.map((faq, i) => (
            <details
              key={i}
              className={`reveal reveal-delay-${Math.min(i + 1, 7)} group bg-dark-gray/40 border border-white/5 rounded-xl overflow-hidden hover:border-white/10 transition-colors`}
            >
              <summary className="flex items-center justify-between p-5 md:p-6 text-white font-semibold text-base md:text-lg">
                {[l.faq1q, l.faq2q, l.faq3q, l.faq4q, l.faq5q, l.faq6q, l.faq7q, l.faq8q][i]}
                <svg
                  className="faq-chevron w-5 h-5 shrink-0 ml-4 text-coral transition-transform duration-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </summary>
              <div className="faq-body px-5 pb-5 md:px-6 md:pb-6 text-white/50 text-sm leading-relaxed">
                {[l.faq1a, l.faq2a, l.faq3a, l.faq4a, l.faq5a, l.faq6a, l.faq7a, l.faq8a][i]}
              </div>
            </details>
          ))}
        </div>
      </Section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-black border-t border-white/5 py-12 px-5 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <img src="/images/logo.png" alt="Warrior Stand-Up" className="h-10 mb-1" />
              <p className="text-white/30 text-sm">powered by <a href="https://money-plug.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white/50 transition-colors underline">MoneyPlugLab</a></p>
            </div>

            <div className="flex items-center gap-6">
              {/* Instagram placeholder */}
              <a href="https://www.instagram.com/cvjeticaninmilos/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-coral transition-colors" aria-label="Instagram">
                <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              {/* YouTube placeholder */}
              <a href="#" className="text-white/40 hover:text-coral transition-colors" aria-label="YouTube">
                <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              {/* TikTok placeholder */}
              <a href="#" className="text-white/40 hover:text-coral transition-colors" aria-label="TikTok">
                <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-white/20 text-sm">
              &copy; {new Date().getFullYear()} {l.footerRights}
            </p>
          </div>
        </div>
      </footer>

      {/* ─── STICKY MOBILE CTA (hidden for now) ─── */}
      {/* <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-black/95 backdrop-blur-md border-t border-white/10 p-3">
        <a
          href={CTA_LINK}
          className="block w-full text-center bg-coral hover:bg-coral-dark text-white font-bold text-base py-3.5 rounded-lg transition-colors shadow-lg shadow-coral/20"
        >
          ZAPOČNI PROGRAM — &euro;49.99
        </a>
      </div> */}
    </>
  );
}
