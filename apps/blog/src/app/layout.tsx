import type { Metadata } from "next";
import '@shared/ui/globals.css'
import './styles.css';
import ThemeSwitcher from '@shared/ui/ThemeSwitcher';
import BackgroundHost from '@shared/ui/BackgroundHost';

export const metadata: Metadata = {
  title: "Joem's Blog",
  description: "Tyche's personal blog about programming, technology, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <BackgroundHost />
        <ThemeSwitcher />
        {children}
      </body>
    </html>
  );
}
