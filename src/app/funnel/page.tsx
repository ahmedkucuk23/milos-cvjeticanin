"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

type QuizQuestion =
  | { type: "choice"; question: string; options: string[]; layout?: "row" }
  | { type: "text"; question: string; placeholder: string }
  | { type: "video"; question: string };

const questions: QuizQuestion[] = [
  {
    type: "choice",
    question: "Koji si pol?",
    options: ["Muško", "Žensko"],
    layout: "row",
  },
  {
    type: "choice",
    question: "Koliko imaš iskustva u borilačkim sportovima?",
    options: [
      "Potpuni sam početnik",
      "Imam osnovno znanje, ali bez strukture",
      "Treniram već neko vrijeme, ali tehnika mi stoji",
      "Imam iskustva, ali želim unaprijediti stand-up",
    ],
  },
  {
    type: "choice",
    question: "Koliko imaš godina?",
    options: ["18–24", "25–34", "35–44", "45+"],
  },
  {
    type: "choice",
    question: "Šta te najviše frustrira u treningu?",
    options: [
      "Ne znam šta vježbati i kojim redom",
      "Gledam tutoriale ali tehnika mi ne napreduje",
      "Nemam pristup kvalitetnom treneru",
      "Treniram ali ne vidim rezultate",
    ],
  },
  {
    type: "text",
    question: "Kako se zoveš?",
    placeholder: "Unesi svoje ime/nadimak",
  },
  {
    type: "choice",
    question: "Šta želiš postići sa ovim programom?",
    options: [
      "Naučiti osnove stand-up borbe od nule",
      "Unaprijediti tehniku udaraca i kombinacija",
      "Pripremiti se za takmičenje",
      "Naučiti samoodbranu i biti u formi",
    ],
  },
  {
    type: "video",
    question: "Snimi kratak video svog udarca ili shadow boxing-a",
  },
  {
    type: "choice",
    question: "Koliko vremena sedmično možeš izdvojiti za trening?",
    options: [
      "Manje od 3 sata",
      "3–5 sati",
      "5–8 sati",
      "Više od 8 sati",
    ],
  },
  {
    type: "choice",
    question: "Da li imaš pristup opremi za trening?",
    options: [
      "Nemam ništa, samo sebe",
      "Imam rukavice",
      "Imam rukavice i vreću",
      "Imam punu opremu i pristup teretani/sali",
    ],
    layout: "row",
  },
  {
    type: "choice",
    question: "Čega se najviše bojiš?",
    options: [
      "Da nikada neću naučiti da se bijem pravilno",
      "Da ću nastaviti gubiti vrijeme bez strukture",
      "Da ću se povrijediti jer ne znam pravilnu tehniku",
      "Da nikada neću otkriti koliko zapravo mogu",
    ],
  },
];

type Phase =
  | "intro"
  | "quiz"
  | "collected"
  | "loading"
  | "readiness"
  | "results";

export default function Funnel() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [textInput, setTextInput] = useState("");
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [loadingPct, setLoadingPct] = useState(0);
  const [loadingStep, setLoadingStep] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const checkoutFired = useRef(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fire FB pixel on results
  useEffect(() => {
    if (phase === "results" && !checkoutFired.current) {
      checkoutFired.current = true;
      (window as any).fbq?.("track", "InitiateCheckout", {
        content_name: "Warrior Stand-Up Funnel",
        currency: "EUR",
        value: 49.99,
      });
    }
  }, [phase]);

  // Loading animation
  useEffect(() => {
    if (phase !== "loading") return;
    const interval = setInterval(() => {
      setLoadingPct((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setPhase("readiness"), 500);
          return 100;
        }
        return p + 1;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    if (phase !== "loading") return;
    if (loadingPct > 30) setLoadingStep(1);
    if (loadingPct > 60) setLoadingStep(2);
    if (loadingPct > 85) setLoadingStep(3);
  }, [loadingPct, phase]);

  const handleChoice = (option: string) => {
    setAnswers((prev) => ({ ...prev, [current]: option }));
    if (current < questions.length - 1) {
      setTimeout(() => setCurrent((c) => c + 1), 250);
    } else {
      setTimeout(() => setPhase("collected"), 250);
    }
  };

  const handleTextSubmit = () => {
    if (!textInput.trim()) return;
    setAnswers((prev) => ({ ...prev, [current]: textInput.trim() }));
    if (current < questions.length - 1) {
      setTimeout(() => setCurrent((c) => c + 1), 250);
    } else {
      setTimeout(() => setPhase("collected"), 250);
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setVideoPreview(url);
    setAnswers((prev) => ({ ...prev, [current]: file.name }));
  };

  const handleVideoSubmit = () => {
    if (!videoPreview) return;
    if (current < questions.length - 1) {
      setTimeout(() => setCurrent((c) => c + 1), 250);
    } else {
      setTimeout(() => setPhase("collected"), 250);
    }
  };

  const userName = answers[4] || "";

  const cardStyle: React.CSSProperties = {
    background: "var(--black-light)",
    borderRadius: 16,
    border: "1px solid rgba(255,255,255,0.08)",
    padding: "clamp(28px, 5vw, 48px)",
    maxWidth: 640,
    width: "100%",
    margin: "0 auto",
  };

  const Nav = () => (
    <nav
      style={{
        padding: "20px clamp(20px, 5vw, 64px)",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Link href="/">
        <img
          src="/images/logo.png"
          alt="Warrior Stand-Up"
          style={{ height: 40, width: "auto" }}
        />
      </Link>
    </nav>
  );

  // ─── INTRO ───
  if (phase === "intro") {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "var(--black)",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Nav />
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px clamp(20px, 5vw, 64px)",
          }}
        >
          <div style={{ maxWidth: 620, textAlign: "center" }}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--coral)",
                display: "inline-block",
                marginBottom: 20,
              }}
            >
              Besplatna analiza
            </span>
            <h1
              style={{
                fontSize: "clamp(28px, 5vw, 44px)",
                fontWeight: 400,
                lineHeight: 1.1,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                marginBottom: 20,
                fontFamily: "var(--font-bebas-neue)",
              }}
            >
              Treniraš, ali tehnika ti{" "}
              <span style={{ color: "var(--coral)" }}>
                ne napreduje?
              </span>
              <br />
              Saznaj zašto — i šta tačno treba da promijeniš.
            </h1>
            <p
              style={{
                fontSize: "clamp(16px, 1.5vw, 19px)",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.5)",
                maxWidth: 520,
                margin: "0 auto 32px",
              }}
            >
              Odgovori na nekoliko pitanja, pošalji snimak svog udarca i dobij
              personaliziranu analizu od Miloša. Traje samo{" "}
              <strong style={{ color: "#fff" }}>2 minute</strong>.
            </p>
            <button
              onClick={() => setPhase("quiz")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "18px 48px",
                borderRadius: 8,
                background: "var(--coral)",
                color: "#fff",
                fontFamily: "var(--font-manrope)",
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s",
              }}
            >
              Započni analizu
              <span>&#8594;</span>
            </button>
            <p
              style={{
                marginTop: 16,
                fontSize: 13,
                color: "rgba(255,255,255,0.3)",
              }}
            >
              Potpuno besplatno. Bez obaveza.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ─── QUIZ ───
  if (phase === "quiz") {
    const q = questions[current];
    const progress = ((current + 1) / questions.length) * 100;

    return (
      <div
        style={{
          minHeight: "100vh",
          background: "var(--black)",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ padding: "20px clamp(20px, 5vw, 64px)", minHeight: 60 }}>
          {current > 0 && (
            <button
              onClick={() => setCurrent((c) => c - 1)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: "none",
                border: "none",
                color: "rgba(255,255,255,0.4)",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "var(--font-manrope)",
              }}
            >
              &#8592; Nazad
            </button>
          )}
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 clamp(20px, 5vw, 64px) 40px",
          }}
        >
          <div style={cardStyle}>
            {/* Progress bar */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <div style={{ flex: 1, marginRight: 16 }}>
                <div style={{ height: 4, borderRadius: 2, background: "rgba(241,89,89,0.15)", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${progress}%`, background: "var(--coral)", borderRadius: 2, transition: "width 0.4s ease" }} />
                </div>
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", whiteSpace: "nowrap" }}>
                Pitanje {current + 1}/{questions.length}
              </span>
            </div>

            {/* Question */}
            <h2
              style={{
                fontSize: "clamp(22px, 4vw, 32px)",
                fontWeight: 400,
                lineHeight: 1.1,
                letterSpacing: "0.03em",
                textTransform: "uppercase",
                marginTop: 32,
                marginBottom: 32,
                textAlign: "center",
                fontFamily: "var(--font-bebas-neue)",
              }}
            >
              {q.question}
            </h2>

            {/* Choice */}
            {q.type === "choice" && (
              <div style={{ display: "flex", flexDirection: q.layout === "row" ? "row" : "column", gap: 12, flexWrap: q.layout === "row" ? "wrap" : undefined }}>
                {q.options.map((option) => {
                  const isSelected = answers[current] === option;
                  return (
                    <button
                      key={option}
                      onClick={() => handleChoice(option)}
                      style={{
                        flex: q.layout === "row" ? "1 1 45%" : undefined,
                        width: q.layout === "row" ? undefined : "100%",
                        padding: "16px 20px",
                        borderRadius: 10,
                        background: isSelected ? "rgba(241,89,89,0.15)" : "rgba(255,255,255,0.03)",
                        border: isSelected ? "1.5px solid var(--coral)" : "1.5px solid rgba(255,255,255,0.08)",
                        color: isSelected ? "var(--coral)" : "rgba(255,255,255,0.8)",
                        fontFamily: "var(--font-manrope)",
                        fontSize: 15,
                        fontWeight: 600,
                        cursor: "pointer",
                        textAlign: "center",
                        transition: "all 0.2s",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                      }}
                    >
                      {q.layout === "row" && option === "Muško" && <span style={{ fontSize: 18 }}>&#9794;&#65039;</span>}
                      {q.layout === "row" && option === "Žensko" && <span style={{ fontSize: 18 }}>&#9792;&#65039;</span>}
                      {option}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Text input */}
            {q.type === "text" && (
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 18px", borderRadius: 10, background: "rgba(255,255,255,0.03)", border: "1.5px solid rgba(255,255,255,0.08)", marginBottom: 16 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
                  </svg>
                  <input
                    type="text"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleTextSubmit()}
                    placeholder={q.placeholder}
                    style={{ flex: 1, background: "none", border: "none", outline: "none", color: "#fff", fontSize: 16, fontFamily: "var(--font-manrope)" }}
                  />
                </div>
                <button
                  onClick={handleTextSubmit}
                  style={{ width: "100%", padding: "16px", borderRadius: 10, background: "var(--coral)", color: "#fff", fontFamily: "var(--font-manrope)", fontWeight: 700, fontSize: 15, border: "none", cursor: "pointer" }}
                >
                  Nastavi &#8594;
                </button>
              </div>
            )}

            {/* Video upload */}
            {q.type === "video" && (
              <div style={{ textAlign: "center" }}>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/*"
                  capture="environment"
                  onChange={handleVideoUpload}
                  style={{ display: "none" }}
                />

                {!videoPreview ? (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      width: "100%",
                      padding: "40px 20px",
                      borderRadius: 16,
                      background: "rgba(241,89,89,0.06)",
                      border: "2px dashed rgba(241,89,89,0.3)",
                      color: "rgba(255,255,255,0.5)",
                      cursor: "pointer",
                      transition: "all 0.3s",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--coral)" strokeWidth="1.5" strokeLinecap="round">
                      <polygon points="23 7 16 12 23 17 23 7" />
                      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                    </svg>
                    <span style={{ fontSize: 16, fontWeight: 600, color: "#fff" }}>
                      Klikni za snimanje ili upload videa
                    </span>
                    <span style={{ fontSize: 13 }}>
                      Kratki snimak udarca ili shadow boxing-a
                    </span>
                  </button>
                ) : (
                  <div>
                    <div style={{ borderRadius: 12, overflow: "hidden", marginBottom: 20, border: "2px solid var(--coral)" }}>
                      <video src={videoPreview} controls style={{ width: "100%", maxHeight: 300 }} />
                    </div>
                    <div style={{ display: "flex", gap: 12 }}>
                      <button
                        onClick={() => { setVideoPreview(null); if (fileInputRef.current) fileInputRef.current.value = ""; }}
                        style={{ flex: 1, padding: "14px", borderRadius: 10, background: "rgba(255,255,255,0.05)", border: "1.5px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-manrope)", fontWeight: 600, fontSize: 14, cursor: "pointer" }}
                      >
                        Ponovo
                      </button>
                      <button
                        onClick={handleVideoSubmit}
                        style={{ flex: 2, padding: "14px", borderRadius: 10, background: "var(--coral)", color: "#fff", fontFamily: "var(--font-manrope)", fontWeight: 700, fontSize: 15, border: "none", cursor: "pointer" }}
                      >
                        Nastavi &#8594;
                      </button>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => {
                    setAnswers((prev) => ({ ...prev, [current]: "preskočeno" }));
                    if (current < questions.length - 1) {
                      setTimeout(() => setCurrent((c) => c + 1), 250);
                    } else {
                      setTimeout(() => setPhase("collected"), 250);
                    }
                  }}
                  style={{ marginTop: 16, background: "none", border: "none", color: "rgba(255,255,255,0.4)", fontSize: 13, cursor: "pointer", textDecoration: "underline", fontFamily: "var(--font-manrope)" }}
                >
                  Preskoči ovaj korak
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ─── COLLECTED ───
  if (phase === "collected") {
    return (
      <div style={{ minHeight: "100vh", background: "var(--black)", color: "#fff", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "20px clamp(20px, 5vw, 64px)" }}>
          <button
            onClick={() => { setCurrent(questions.length - 1); setPhase("quiz"); }}
            style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: "rgba(255,255,255,0.4)", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "var(--font-manrope)" }}
          >
            &#8592; Nazad
          </button>
        </div>
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 clamp(20px, 5vw, 64px) 40px" }}>
          <div style={{ ...cardStyle, textAlign: "center" }}>
            <div style={{ height: 4, borderRadius: 2, background: "var(--coral)", marginBottom: 40 }} />
            <h2 style={{ fontSize: "clamp(24px, 4vw, 34px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "0.03em", textTransform: "uppercase", marginBottom: 32, fontFamily: "var(--font-bebas-neue)" }}>
              Prikupili smo sve što nam treba. Tvoj personalizirani plan je spreman.
            </h2>
            <button
              onClick={() => { setLoadingPct(0); setLoadingStep(0); setPhase("loading"); }}
              style={{ width: "100%", padding: "18px", borderRadius: 10, background: "var(--coral)", color: "#fff", fontFamily: "var(--font-manrope)", fontWeight: 700, fontSize: 16, border: "none", cursor: "pointer" }}
            >
              Pokaži mi rješenje
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── LOADING ───
  if (phase === "loading") {
    const steps = [
      "Analiziramo tvoj nivo iskustva...",
      "Prilagođavamo program tvojoj situaciji...",
      "Pripremamo tvoj personalizirani plan treninga...",
    ];
    const circumference = 2 * Math.PI * 42;
    const offset = circumference - (loadingPct / 100) * circumference;

    return (
      <div style={{ minHeight: "100vh", background: "var(--black)", color: "#fff", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "20px clamp(20px, 5vw, 64px)" }}>
          <button style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: "rgba(255,255,255,0.4)", fontSize: 14, fontWeight: 600, cursor: "default", fontFamily: "var(--font-manrope)" }}>
            &#8592; Nazad
          </button>
        </div>
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 clamp(20px, 5vw, 64px) 40px" }}>
          <div style={{ ...cardStyle, textAlign: "center" }}>
            <div style={{ width: 100, height: 100, margin: "0 auto 24px", position: "relative" }}>
              <svg width="100" height="100" style={{ transform: "rotate(-90deg)" }}>
                <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(241,89,89,0.15)" strokeWidth="6" />
                <circle cx="50" cy="50" r="42" fill="none" stroke="var(--coral)" strokeWidth="6" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} style={{ transition: "stroke-dashoffset 0.3s ease" }} />
              </svg>
            </div>
            <div style={{ fontSize: 36, fontWeight: 400, color: "var(--coral)", marginBottom: 16, fontFamily: "var(--font-bebas-neue)", letterSpacing: "0.05em" }}>
              {loadingPct}%
            </div>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 24 }}>
              Analiziramo tvoje odgovore...
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, textAlign: "left" }}>
              {steps.map((step, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: i <= loadingStep ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.3)", transition: "color 0.3s", opacity: i <= loadingStep ? 1 : 0.4 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: i <= loadingStep ? "var(--coral)" : "rgba(241,89,89,0.2)", flexShrink: 0, transition: "background 0.3s" }} />
                  {step}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── READINESS ───
  if (phase === "readiness") {
    return (
      <div style={{ minHeight: "100vh", background: "var(--black)", color: "#fff", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "20px clamp(20px, 5vw, 64px)" }}>
          <button onClick={() => setPhase("collected")} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: "rgba(255,255,255,0.4)", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "var(--font-manrope)" }}>
            &#8592; Nazad
          </button>
        </div>
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 clamp(20px, 5vw, 64px) 40px" }}>
          <div style={{ ...cardStyle, textAlign: "center" }}>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--coral)", marginBottom: 16 }}>
              Još malo...
            </p>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 32px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "0.03em", textTransform: "uppercase", marginBottom: 32, fontFamily: "var(--font-bebas-neue)" }}>
              {userName ? `${userName}, da` : "Da"} li si spreman da počneš da se biješ pravilno?
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <button onClick={() => setPhase("results")} style={{ width: "100%", padding: "16px", borderRadius: 10, background: "var(--coral)", color: "#fff", fontFamily: "var(--font-manrope)", fontWeight: 700, fontSize: 16, border: "none", cursor: "pointer" }}>
                Da, spreman sam
              </button>
              <button onClick={() => setPhase("results")} style={{ width: "100%", padding: "16px", borderRadius: 10, background: "var(--coral-dark)", color: "#fff", fontFamily: "var(--font-manrope)", fontWeight: 700, fontSize: 16, border: "none", cursor: "pointer" }}>
                Da, pokaži mi kako
              </button>
              <button onClick={() => setPhase("results")} style={{ width: "100%", padding: "16px", borderRadius: 10, background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-manrope)", fontWeight: 600, fontSize: 15, border: "1.5px solid rgba(255,255,255,0.08)", cursor: "pointer" }}>
                Ne, nisam spreman
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── RESULTS (Sales Page) ───
  const features = [
    { title: "12-sedmični strukturirani program", desc: "Korak po korak, od osnova do naprednih tehnika. Bez nagađanja." },
    { title: "Video lekcije svake tehnike", desc: "Svaka tehnika detaljno objašnjena i demonstrirana od Miloša lično." },
    { title: "Progresivni sistem treninga", desc: "Od osnova do naprednih kombinacija — dizajnirano za konstantan napredak." },
    { title: "Udarci, kombinacije, kretanje, odbrana", desc: "Džeb, kros, aperkot, udarci nogama, kolenima — kompletna stand-up igra." },
    { title: "Plan kondicione pripreme", desc: "Snaga, izdržljivost, eksplozivnost — sve što ti treba da budeš spreman." },
    { title: "Pristup privatnoj zajednici", desc: "Postavljaj pitanja, dijeli napredak i budi okružen istomišljenicima." },
    { title: "Doživotni pristup materijalu", desc: "Kupi jednom — tvoje zauvijek. Vrati se na lekcije kad god želiš." },
    { title: "Besplatna ažuriranja programa", desc: "Kako se program širi, dobijaš sve novo bez dodatnog plaćanja." },
  ];

  const faqs = [
    { q: "Da li je program za početnike?", a: "Da. Program kreće od osnova i gradi se postepeno. Svaka tehnika ima detaljno video objašnjenje." },
    { q: "Da li mi treba oprema?", a: "Za početak samo rukavice. Ako nemaš vreću, shadow boxing je sasvim dovoljan. Kasnije preporučujemo štitnike." },
    { q: "Koliko vremena dnevno trebam?", a: "45-60 minuta treninga, 3-5 puta sedmično. Prilagodi svom rasporedu — lekcije su dostupne 24/7." },
    { q: "Šta ako propustim sedmicu?", a: "Nema brige. Doživotni pristup znači da nastaviš kad god možeš. Nema pritiska." },
    { q: "Kakve tehnike program pokriva?", a: "Kompletnu stand-up igru: džeb, kros, aperkot, huk, low/middle/head kick, udarce koljenima, kombinacije, footwork, odbranu i kontra-napade." },
    { q: "Da li je samo za MMA borce?", a: "Ne. Program je za svakoga ko želi naučiti pravilnu tehniku — takmičenje, samoobdrana ili fitness." },
    { q: "Kako pristupam programu?", a: "Nakon uplate dobijaš pristup platformi sa svim lekcijama. Telefon, tablet ili kompjuter." },
    { q: "Šta ako nisam zadovoljan?", a: "Imaš 30 dana da probaš. Ako ne budeš zadovoljan — vraćamo novac. Bez pitanja." },
  ];

  const scrollToCheckout = () => {
    document.getElementById("funnel-checkout")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--black)", color: "#fff" }}>
      <Nav />

      {/* ─── Hero: Plan je spreman ─── */}
      <section style={{ padding: "clamp(40px, 8vw, 80px) clamp(20px, 5vw, 64px)", textAlign: "center" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ background: "var(--black-light)", borderRadius: 16, border: "1px solid rgba(255,255,255,0.08)", padding: "clamp(32px, 5vw, 48px)", marginBottom: 32 }}>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--coral)", marginBottom: 16 }}>
              &#10022; Personalizirani plan je spreman
            </p>
            <p style={{ fontSize: "clamp(16px, 2vw, 20px)", color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>
              Rekao si da te najviše frustrira:{" "}
              <strong style={{ color: "var(--coral)", fontStyle: "italic" }}>
                {answers[3] || "Ne znam šta vježbati i kojim redom"}
              </strong>
              . Evo rješenja.
            </p>
          </div>

          <div style={{ background: "var(--black-light)", borderRadius: 16, border: "1px solid rgba(255,255,255,0.08)", padding: "clamp(32px, 5vw, 48px)" }}>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "0.03em", textTransform: "uppercase", marginBottom: 32, fontFamily: "var(--font-bebas-neue)" }}>
              Evo sve što dobijaš da za <span style={{ color: "var(--coral)" }}>12 sedmica</span> savladaš stand-up borbu:
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 20, textAlign: "left" }}>
              {features.map((f) => (
                <div key={f.title} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(241,89,89,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--coral)" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </div>
                  <div>
                    <strong style={{ fontSize: 15, fontWeight: 700 }}>{f.title}</strong>
                    <span style={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }}> — {f.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Checkout ─── */}
      <section id="funnel-checkout" style={{ padding: "clamp(40px, 6vw, 80px) clamp(20px, 5vw, 64px)" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "0.03em", textTransform: "uppercase", marginBottom: 40, fontFamily: "var(--font-bebas-neue)" }}>
            Pridruži se <span style={{ color: "var(--coral)" }}>warrior</span> programu:
          </h2>

          <div style={{ background: "var(--black-light)", borderRadius: 16, border: "2px solid var(--coral)", padding: "clamp(28px, 5vw, 40px)", position: "relative", marginBottom: 24, boxShadow: "0 0 40px rgba(241,89,89,0.15)" }}>
            <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: "var(--coral)", color: "#fff", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "6px 20px", borderRadius: 20, whiteSpace: "nowrap" }}>
              Warrior Stand-Up Program
            </div>
            <h3 style={{ fontSize: 24, fontWeight: 400, marginTop: 12, marginBottom: 8, fontFamily: "var(--font-bebas-neue)", letterSpacing: "0.03em", textTransform: "uppercase" }}>
              12-sedmični program
            </h3>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", marginBottom: 8 }}>
              Sve što trebaš za stand-up borbu — na jednom mjestu.
            </p>
            <div style={{ fontFamily: "var(--font-bebas-neue)", fontSize: 64, color: "#fff", marginBottom: 24, letterSpacing: "0.02em" }}>
              <span style={{ color: "var(--coral)" }}>&euro;49</span>
              <span style={{ fontSize: 24, color: "rgba(255,255,255,0.4)" }}>.99</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12, textAlign: "left", marginBottom: 24 }}>
              {[
                "12 sedmica strukturiranog programa",
                "Video lekcije svake tehnike",
                "Progresivni sistem treninga",
                "Udarci, kombinacije, kretanje, odbrana",
                "Plan kondicione pripreme",
                "Pristup privatnoj zajednici",
                "Doživotni pristup materijalu",
                "Besplatna ažuriranja programa",
              ].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "rgba(255,255,255,0.7)" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--coral)" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
                  {item}
                </div>
              ))}
            </div>

            <div style={{ background: "rgba(255,255,255,0.1)", border: "2px solid rgba(255,255,255,0.2)", borderRadius: 16, padding: "24px 32px", textAlign: "center" }}>
              <p style={{ fontSize: 28, fontWeight: 700, color: "#fff", marginBottom: 8 }}>SOLD OUT</p>
              <p style={{ fontSize: 14, color: "var(--text-muted)" }}>Sva mjesta su popunjena. Hvala na interesu!</p>
            </div>
          </div>

          {/* Guarantee */}
          <div style={{ background: "var(--black-light)", borderRadius: 16, border: "1px solid rgba(255,255,255,0.08)", padding: "clamp(28px, 5vw, 40px)", textAlign: "center", marginBottom: 24 }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(241,89,89,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--coral)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" />
              </svg>
            </div>
            <h3 style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "0.03em", textTransform: "uppercase", marginBottom: 16, fontFamily: "var(--font-bebas-neue)" }}>
              30 dana garancije. Bez rizika.
            </h3>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: "rgba(255,255,255,0.5)", maxWidth: 520, margin: "0 auto" }}>
              Imaš 30 dana da probaš program. Ako ne budeš zadovoljan — vraćamo ti novac.{" "}
              <strong style={{ color: "#fff" }}>Bez pitanja, bez komplikacija.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* ─── Urgency ─── */}
      <section style={{ padding: "clamp(40px, 6vw, 80px) clamp(20px, 5vw, 64px)" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(22px, 3.5vw, 32px)", fontWeight: 400, letterSpacing: "0.03em", textTransform: "uppercase", marginBottom: 24, fontFamily: "var(--font-bebas-neue)" }}>
            Moram ti reći još ovo...
          </h2>
          <div style={{ textAlign: "left", fontSize: 16, lineHeight: 1.8, color: "rgba(255,255,255,0.5)" }}>
            <p style={{ marginBottom: 20 }}>
              Ti i ja znamo jednu stvar:{" "}
              <strong style={{ color: "#fff" }}>Ako ništa ne promijeniš, ništa se neće promijeniti.</strong>
            </p>
            <p style={{ marginBottom: 20 }}>
              Koliko puta si već rekao &quot;od ponedjeljka ću početi ozbiljno trenirati&quot;?
              <br />Koliko puta si gledao tutoriale bez ikakvog napretka?
              <br />Koliko puta si trenirao a da nemaš pojma da li radiš ispravno?
            </p>
            <p style={{ marginBottom: 20 }}>
              <strong style={{ color: "var(--coral)" }}>To nije nedostatak volje. To je nedostatak sistema.</strong>{" "}
              I to se danas može promijeniti.
            </p>

            <div style={{ background: "rgba(241,89,89,0.06)", borderRadius: 16, padding: 24, border: "1px solid rgba(241,89,89,0.15)", marginBottom: 20 }}>
              <p style={{ fontWeight: 700, color: "var(--coral)", marginBottom: 12 }}>Opcija 1:</p>
              <p style={{ marginBottom: 12 }}>Klikneš dugme i <strong style={{ color: "#fff" }}>prestaješ da gubiš vrijeme.</strong></p>
              <p>Dobijaš tačan plan. Miloša lično. Program koji je prošao borac sa 100+ borbi. I prvi put u životu imaš strukturu.</p>
            </div>

            <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: 16, padding: 24, border: "1px solid rgba(255,255,255,0.05)", marginBottom: 32 }}>
              <p style={{ fontWeight: 700, color: "rgba(255,255,255,0.7)", marginBottom: 12 }}>Opcija 2:</p>
              <p style={{ marginBottom: 12 }}>Ne napraviš ništa. Zatvoriš stranicu. Vratiš se na YouTube. <strong style={{ color: "#fff" }}>I ništa se ne mijenja.</strong></p>
              <p>Za godinu dana stojiš na istom mjestu i pitaš se zašto ti tehnika i dalje stoji.</p>
            </div>

            <p style={{ textAlign: "center", marginBottom: 32 }}>
              <strong style={{ color: "#fff", fontSize: 18 }}>Koliko dugo ćeš čekati?</strong>
              <br /><span style={{ color: "var(--coral)" }}>Ovo je taj trenutak. Ovdje. Sada.</span>
            </p>
          </div>
          <button onClick={scrollToCheckout} style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "18px 48px", borderRadius: 8, background: "var(--coral)", color: "#fff", fontWeight: 700, fontSize: 14, letterSpacing: "0.12em", textTransform: "uppercase", border: "none", cursor: "pointer", fontFamily: "var(--font-manrope)" }}>
            Započni program &#8594;
          </button>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section style={{ padding: "clamp(40px, 6vw, 80px) clamp(20px, 5vw, 64px)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--coral)", marginBottom: 12 }}>
              Česta pitanja
            </p>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 400, fontFamily: "var(--font-bebas-neue)", letterSpacing: "0.03em", textTransform: "uppercase" }}>
              Imaš pitanja? <span style={{ color: "var(--coral)" }}>Imamo odgovore.</span>
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {faqs.map((item, i) => (
              <button
                key={i}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{ background: "var(--black-light)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "18px 22px", cursor: "pointer", textAlign: "left", width: "100%", transition: "all 0.3s" }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 15, fontWeight: 600, color: "#fff" }}>{item.q}</span>
                  <span style={{ color: "var(--coral)", fontSize: 20, transform: openFaq === i ? "rotate(45deg)" : "none", transition: "transform 0.3s", flexShrink: 0, marginLeft: 12 }}>+</span>
                </div>
                {openFaq === i && (
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.5)", marginTop: 12 }}>{item.a}</p>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section style={{ padding: "clamp(40px, 6vw, 80px) clamp(20px, 5vw, 64px)", textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <button onClick={scrollToCheckout} style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "18px 48px", borderRadius: 8, background: "var(--coral)", color: "#fff", fontWeight: 700, fontSize: 14, letterSpacing: "0.12em", textTransform: "uppercase", border: "none", cursor: "pointer", marginBottom: 24, fontFamily: "var(--font-manrope)" }}>
            Započni program &#8594;
          </button>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>
            Nauči da se biješ pravilno. Od profesionalnog borca.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "40px clamp(20px, 5vw, 64px)", textAlign: "center" }}>
        <img src="/images/logo.png" alt="Warrior Stand-Up" style={{ height: 32, width: "auto", opacity: 0.4, marginBottom: 16 }} />
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.2)" }}>
          &copy; 2026 Warrior Stand-Up Program. Sva prava zadržana.
        </p>
        <p style={{ fontSize: 10, color: "rgba(255,255,255,0.1)", marginTop: 8 }}>
          powered by{" "}
          <a href="https://money-plug.com/" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "underline" }}>
            MoneyPlugLab
          </a>
        </p>
      </footer>
    </div>
  );
}
