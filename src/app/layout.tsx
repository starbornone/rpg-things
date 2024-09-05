import clsx from 'clsx';
import type { Metadata } from 'next';
import { Lexend, Source_Code_Pro } from 'next/font/google';

import { Providers } from '@/app/providers';
import { Layout } from '@/components';
import '@/styles/globals.css';

const lexend = Lexend({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-source-code-pro',
});

export const metadata: Metadata = {
  title: {
    template: '%s - RPG Things',
    default: 'RPG Things',
  },
  description: 'A collection of tools for tabletop role-playing games.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={clsx('h-full antialiased', lexend.variable, sourceCodePro.variable)}
      suppressHydrationWarning
    >
      <body className="flex min-h-full bg-white dark:bg-gray-900">
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
