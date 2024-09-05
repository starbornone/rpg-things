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
  const pathname = usePathname();

  const renderLink = (href: string, title: string, isChildLink?: boolean) => (
    <Link
      href={href}
      onClick={onLinkClick}
      className={clsx(
        'block w-full pl-3.5 before:pointer-events-none before:absolute before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full',
        href === pathname
          ? 'font-semibold text-cyan-500 before:bg-cyan-500'
          : 'text-gray-500 before:hidden before:bg-gray-300 hover:text-gray-600 hover:before:block dark:text-gray-400 dark:before:bg-gray-700 dark:hover:text-gray-300',
        isChildLink ? 'before:-left-1' : 'before:left-0'
      )}
    >
      {title}
    </Link>
  );

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
            <ul
              role="list"
              className={clsx({
                'mt-2 space-y-2 border-l-2 border-gray-100 lg:mt-4 lg:space-y-4 lg:border-gray-200 dark:border-gray-800':
                  !!section.links,
              })}
            >
              {section.links ? (
                section.links.map((link) => (
                  <li key={link.href} className="relative">
                    {renderLink(link.href, link.title, true)}
                  </li>
                ))
              ) : (
                <li className="relative">{renderLink(section.href!, section.title)}</li>
              )}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
}
