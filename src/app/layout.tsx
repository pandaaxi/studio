import type {Metadata} from 'next';
import { Geist_Sans as GeistSans, Geist_Mono as GeistMono } from 'next/font/google'; // Corrected import object names
import './globals.css';
import { Toaster } from "@/components/ui/toaster"; // Added Toaster for notifications

const geistSans = GeistSans({ // Corrected variable name usage
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = GeistMono({ // Corrected variable name usage
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Link Oasis - Curated Web Resources',
  description: 'Your personal oasis of categorized website links, easily managed and discovered.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
