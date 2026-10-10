import type { Metadata } from "next";
import { Bebas_Neue, Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin", "latin-ext"],
  weight: "400",
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://warriorstandup.com"),
  title: {
    default:
      "Warrior Stand-Up Program — Online MMA program od Miloša Cvjetićanina",
    template: "%s | Warrior Stand-Up Program",
  },
  description:
    "Nauči da se biješ pravilno. Online program udaračkih borilačkih vještina od profesionalnog MMA borca. 12 sedmica strukturiranog treninga. Tvoj tempo. Tvoj ring.",
  keywords: [
    "MMA program",
    "stand-up borba",
    "borilačke vještine",
    "kickboxing",
    "online trening",
    "Miloš Cvjetićanin",
    "CobraMMA",
    "warrior program",
    "udaračke tehnike",
    "MMA trening online",
    "borilački sportovi",
  ],
  authors: [{ name: "Miloš Cvjetićanin" }],
  creator: "Miloš Cvjetićanin",
  openGraph: {
    title: "Warrior Stand-Up Program — Online MMA program",
    description:
      "Nauči da se biješ pravilno. 12 sedmica strukturiranog MMA treninga od profesionalnog borca.",
    url: "https://warriorstandup.com",
    siteName: "Warrior Stand-Up Program",
    locale: "sr_Latn",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 1200,
        alt: "Warrior Stand-Up Program - Miloš Cvjetićanin",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Warrior Stand-Up Program — Online MMA program",
    description:
      "Nauči da se biješ pravilno. 12 sedmica strukturiranog MMA treninga od profesionalnog borca.",
    images: ["/images/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  alternates: {
    canonical: "https://warriorstandup.com",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sr" className={`${bebasNeue.variable} ${manrope.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
