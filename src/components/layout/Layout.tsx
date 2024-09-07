'use client';

import { Navigation } from '@/components';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { Header } from './Header';

export function Layout({ children }: { children: React.ReactNode }) {
  let pathname = usePathname();
  const isBattleMap = pathname === '/battle/map';

  if (isBattleMap) {
    return (
      <div className="flex w-full flex-col">
        <Header />
        <main className="p-12">{children}</main>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col">
      <Header />
      <div className="relative mx-auto flex w-full flex-auto justify-center sm:px-2 lg:px-8">
        <div className="hidden lg:relative lg:block lg:flex-none">
          <div className="absolute inset-y-0 right-0 w-[50vw] bg-gray-50 dark:hidden" />
          <div className="absolute bottom-0 right-0 top-16 hidden h-12 w-px bg-gradient-to-t from-gray-800 dark:block" />
          <div className="absolute bottom-0 right-0 top-28 hidden w-px bg-gray-800 dark:block" />
          <div className="sticky top-[4.75rem] -ml-0.5 h-[calc(100vh-4.75rem)] w-64 overflow-y-auto overflow-x-hidden py-16 pl-0.5 pr-8 xl:w-60 xl:pr-12">
            <Navigation />
          </div>
        </div>
        <main className="p-12">
          <div className={clsx('prose', !isBattleMap && 'max-w-prose')}>{children}</div>
        </main>
      </div>
    </div>
  );
}
