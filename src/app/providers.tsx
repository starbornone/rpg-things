'use client';

import { store } from '@/store';
import { ThemeProvider } from 'next-themes';
import { Provider } from 'react-redux';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </Provider>
  );
}
