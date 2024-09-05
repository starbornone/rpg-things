'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Heading } from '@/components';
import { navigation } from '@/lib/navigation';

export function Navigation({
  className,
  onLinkClick,
}: {
  className?: string;
  onLinkClick?: React.MouseEventHandler<HTMLAnchorElement>;
}) {
  let pathname = usePathname();

  return (
    <nav className={clsx('text-base lg:text-sm', className)}>
      <ul role="list" className="space-y-9">
        {navigation.map((section) => (
          <li key={section.title}>
            {section.links && (
              <Heading level={3} className="text-lg">
                {section.title}
              </Heading>
            )}
            {/* Check if the section has links (array) or a single href */}
            {section.links ? (
              <ul
                role="list"
                className="mt-2 space-y-2 border-l-2 border-gray-100 lg:mt-4 lg:space-y-4 lg:border-gray-200 dark:border-gray-800"
              >
                {section.links.map((link) => (
                  <li key={link.href} className="relative">
                    <Link
                      href={link.href}
                      onClick={onLinkClick}
                      className={clsx(
                        'block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full',
                        link.href === pathname
                          ? 'font-semibold text-cyan-500 before:bg-cyan-500'
                          : 'text-gray-500 before:hidden before:bg-gray-300 hover:text-gray-600 hover:before:block dark:text-gray-400 dark:before:bg-gray-700 dark:hover:text-gray-300'
                      )}
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              /* Render single link if no links array is provided */
              <div className="relative">
                <Link
                  href={section.href}
                  onClick={onLinkClick}
                  className={clsx(
                    'block w-full pl-3.5 before:pointer-events-none before:absolute before:left-0 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full',
                    section.href === pathname
                      ? 'font-semibold text-cyan-500 before:bg-cyan-500'
                      : 'text-gray-500 before:hidden before:bg-gray-300 hover:text-gray-600 hover:before:block dark:text-gray-400 dark:before:bg-gray-700 dark:hover:text-gray-300'
                  )}
                >
                  {section.title}
                </Link>
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
