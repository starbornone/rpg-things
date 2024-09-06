'use client';

import { DisclosureButton, DisclosurePanel, Disclosure as DisclosureWrapper } from '@headlessui/react';
import { AnimatePresence, easeOut, motion } from 'framer-motion';
import { Fragment } from 'react';

interface DisclosureProps {
  children: React.ReactNode;
  title: string;
}

export function Disclosure({ children, title }: DisclosureProps) {
  return (
    <DisclosureWrapper
      as="div"
      className="row-start-2 w-full min-w-0 rounded-t-3xl bg-white p-4 shadow-lg ring-1 ring-gray-950/10 sm:mb-auto sm:rounded-2xl dark:bg-gray-900 dark:ring-white/10 forced-colors:outline"
    >
      {({ open }) => (
        <>
          <DisclosureButton className="w-full text-left font-semibold">{title}</DisclosureButton>
          <div className="overflow-hidden">
            <AnimatePresence>
              {open && (
                <DisclosurePanel static as={Fragment}>
                  <motion.div
                    initial={{ opacity: 0, y: -24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -24 }}
                    transition={{ duration: 0.2, ease: easeOut }}
                    className="origin-top"
                  >
                    <div className="prose py-4 text-sm">{children}</div>
                  </motion.div>
                </DisclosurePanel>
              )}
            </AnimatePresence>
          </div>
        </>
      )}
    </DisclosureWrapper>
  );
}
