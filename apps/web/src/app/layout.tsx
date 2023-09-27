import { TDevProvider, TThemeProvider } from '@shopizer/templates';
import './global.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

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
        <TThemeProvider>
          <TDevProvider>{children}</TDevProvider>
        </TThemeProvider>
      </body>
    </html>
  );
}
