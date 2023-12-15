import './globals.css';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';

import Provider from './components/provider';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: ' - AI Caption Generator',
  description: 'Crafting Captivating using AI-driven Social Captions',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <title>InstaCapt</title>
      <body className={inter.className}>
        <Provider>
          <Navbar />
          {children}
          <Footer />
        </Provider>
        <Analytics />
      </body>
    </html>
  );
}
