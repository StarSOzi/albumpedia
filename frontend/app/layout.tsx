import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Albumpedia - Album Portal',
  description: 'Modern album ordering system',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
