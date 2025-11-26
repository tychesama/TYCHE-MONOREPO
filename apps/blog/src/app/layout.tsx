import type { Metadata } from "next";
import { Cormorant_Garamond, Poppins } from "next/font/google";
import "./globals.css";
import '@shared/ui/themes.css';
import ThemeSwitcher from '@shared/ui/ThemeSwitcher';
import BackgroundHost from '@shared/ui/BackgroundHost';

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  weight: ["400"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400","600"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Joem's Blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cormorantGaramond.variable} ${poppins.variable}`}>
        <BackgroundHost />
        <ThemeSwitcher />
        {children}
      </body>
    </html>
  );
}
