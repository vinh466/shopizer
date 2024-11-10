import { TClientProvider } from '@shopizer/templates';
import 'react-image-gallery/styles/css/image-gallery.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './global.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { RecoilRoot } from 'recoil';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Shopizer',
  description: 'Shopizer',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TClientProvider>{children}</TClientProvider>
      </body>
    </html>
  );
}
