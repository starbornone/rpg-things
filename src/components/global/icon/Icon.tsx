import { SVGProps } from 'react';

export type IconSize =
  | '8'
  | '12'
  | '16'
  | '20'
  | '24'
  | '28'
  | '32'
  | '64'
  | 'tiny'
  | 'small'
  | 'base'
  | 'medium'
  | 'x-large'
  | string;

export interface BaseIconProps {
  /** Allows you to override the existing behaviour of currentColor. */
  color?: string;
  /** A label to describe the Icon. */
  label?: string;
  /** Signals if the icon’s SVG is an inline element. */
  isInlineBlock?: boolean;
  /** Ensures the icon can not be smaller than the dimensions given */
  isExactSize?: boolean;
  /** Allows you to choose from a number of standard sizes. */
  size?: IconSize;
  title?: string;
}

interface IconProps extends BaseIconProps {
  /** SVG viewbox. */
  viewBox: string;
  /** Contents of the Icon, used for custom icons with `<Icon>` wrapper. */
  children: React.ReactNode;
}

export const Icon = ({
  color = 'currentColor',
  size = 'small',
  label,
  viewBox,
  isInlineBlock,
  children,
  isExactSize = false,
  title = '',
  ...props
}: IconProps & SVGProps<SVGSVGElement>) => {
  const iconSizes = ['8', '16', '20', '24', '28', '32', '64', 'tiny', 'small', 'base', 'medium', 'x-large'];

  const isStandardSize = iconSizes.includes(size);

  const iconStyles = {
    height: `${size}px`,
    width: `${size}px`,
  };

  return (
    <svg
      aria-hidden="true"
      aria-label={label}
      fill={color}
      focusable="false"
      style={!isStandardSize && size ? iconStyles : {}}
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>{title}</title>
      {children}
    </svg>
  );
};
