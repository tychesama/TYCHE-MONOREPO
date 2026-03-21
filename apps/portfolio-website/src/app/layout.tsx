import '@shared/ui/globals.css';
import '../styles.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Showcasing my projects and work',
  icons: {
    icon: '/static/Dice-logo.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}