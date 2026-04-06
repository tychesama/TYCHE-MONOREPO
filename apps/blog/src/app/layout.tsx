import type { Metadata } from "next";
import "./styles.css";
import BackgroundHost from "@shared/ui/BackgroundHost";

export const metadata: Metadata = {
  title: "Joem's Blog",
  description: "Tyche's personal blog about programming, technology, and more.",
  icons: {
    icon: '/Dice-logo.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body>
        <div id="modal-root">
          <BackgroundHost />
          {children}
        </div>
      </body>
    </html>
  );
}