import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { LanguageProvider } from "@/components/i18n";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import SiteBackground from "@/components/SiteBackground";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Janfred Naranjo · Transformo ideas en software",
  description: "Portafolio de Janfred Naranjo, developer junior construyendo GymVibe, un SaaS de gestión para gimnasios en LATAM.",
  applicationName: "Janfred",
  appleWebApp: {
    capable: true,
    title: "Janfred",
    statusBarStyle: "black",
  },
  icons: {
    apple: "/icons/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b10" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d);}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <SiteBackground />
        <Preloader />
        <CustomCursor />
        <LanguageProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}
