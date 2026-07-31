import type { Metadata, Viewport } from "next";
import { Manrope, Geist_Mono } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Earlio — Learn a Skill. Build Proof. Start Earning.",
  description: "Earlio is a learning-to-earning platform that helps you learn practical skills, apply them through structured projects, build proof of your abilities, and prepare to pursue real paid opportunities.",
  keywords: ["learn to earn", "skill development", "web development course", "freelance skills", "portfolio builder", "practical learning", "earn from skills", "career skills platform"],
  metadataBase: new URL("https://earlio.tech"),
  openGraph: {
    title: "Earlio — Don't Just Learn a Skill. Learn How to Earn From It.",
    description: "A structured system that takes you from learning a skill to building proof, packaging a service, and pursuing your first paid opportunities.",
    url: "https://earlio.tech",
    siteName: "Earlio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Earlio — Learn. Practice. Build. Prove. Sell. Earn.",
    description: "The complete journey from skill acquisition to real economic opportunity, designed as one system.",
  },
  icons: {
    icon: "/icon.png?v=3",
    apple: "/apple-icon.png?v=3",
    shortcut: "/favicon.ico?v=3",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#080B14",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-[#080B14] text-[#A7B0C0] flex flex-col font-sans selection:bg-indigo-500/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}

