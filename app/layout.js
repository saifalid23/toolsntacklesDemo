import { Inter, Outfit } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata = {
  title: 'Tools & Tackles — Hardware Store | Ranigunj, Secunderabad',
  description:
    'Your trusted hardware store in Ranigunj, Secunderabad. Shop hand tools, power tools, electrical supplies, plumbing fittings, fasteners, safety gear & industrial supplies from Bosch, Stanley, Makita & more.',
  keywords:
    'hardware store, tools, Secunderabad, Ranigunj, Bosch, Stanley, Makita, power tools, hand tools, electrical, plumbing',
  openGraph: {
    title: 'Tools & Tackles — All Hardware & Tools Under One Roof',
    description:
      'Quality tools and hardware supplies in Ranigunj, Secunderabad. Call 099590 48707.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
