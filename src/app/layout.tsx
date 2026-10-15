import type { Metadata } from "next";
import Script from "next/script";
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
      "Warrior Stand-Up Program — Online kickboxing program od Miloša Cvjetićanina",
    template: "%s | Warrior Stand-Up Program",
  },
  description:
    "Nauči da se biješ pravilno. Online program udaračkih borilačkih vještina od profesionalnog kickboxera. 12 sedmica strukturiranog treninga. Tvoj tempo. Tvoj ring.",
  keywords: [
    "kickboxing program",
    "stand-up borba",
    "borilačke vještine",
    "kickboxing",
    "online trening",
    "Miloš Cvjetićanin",
    "GLORY kickboxing",
    "warrior program",
    "udaračke tehnike",
    "kickboxing trening online",
    "borilački sportovi",
  ],
  authors: [{ name: "Miloš Cvjetićanin" }],
  creator: "Miloš Cvjetićanin",
  openGraph: {
    title: "Warrior Stand-Up Program — Online kickboxing program",
    description:
      "Nauči da se biješ pravilno. 12 sedmica strukturiranog kickboxing treninga od profesionalnog borca.",
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
    title: "Warrior Stand-Up Program — Online kickboxing program",
    description:
      "Nauči da se biješ pravilno. 12 sedmica strukturiranog kickboxing treninga od profesionalnog borca.",
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
        <Script id="fb-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '3353516261508273');
fbq('track', 'PageView');`}
        </Script>
        <noscript>
          <img height="1" width="1" style={{ display: "none" }} src="https://www.facebook.com/tr?id=3353516261508273&ev=PageView&noscript=1" />
        </noscript>
      </body>
    </html>
  );
}
