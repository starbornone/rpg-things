import { BaseIconProps, Icon, IconSize } from '@/components';

interface Props extends BaseIconProps {
  size?: IconSize;
}

export const AccountIcon = ({ color = 'currentColor', ...rest }: Props) => {
  return (
    <Icon viewBox="0 0 16 16" fill={color} {...rest}>
      <path d="M2.84 12.5c.84-.587 1.673-1.037 2.5-1.35A7.443 7.443 0 0 1 8 10.68c.947 0 1.837.157 2.67.47.833.313 1.67.763 2.51 1.35.587-.72 1.003-1.447 1.25-2.18.247-.733.37-1.507.37-2.32 0-1.933-.65-3.55-1.95-4.85C11.55 1.85 9.933 1.2 8 1.2c-1.933 0-3.55.65-4.85 1.95C1.85 4.45 1.2 6.067 1.2 8c0 .813.127 1.587.38 2.32.253.733.673 1.46 1.26 2.18ZM8 8.6c-.773 0-1.423-.263-1.95-.79-.527-.527-.79-1.177-.79-1.95 0-.773.263-1.423.79-1.95.527-.527 1.177-.79 1.95-.79.773 0 1.423.263 1.95.79.527.527.79 1.177.79 1.95 0 .773-.263 1.423-.79 1.95-.527.527-1.177.79-1.95.79ZM8 16a7.74 7.74 0 0 1-3.1-.63 8.114 8.114 0 0 1-2.55-1.72A8.115 8.115 0 0 1 .63 11.1 7.74 7.74 0 0 1 0 8c0-1.107.21-2.143.63-3.11a8.146 8.146 0 0 1 1.72-2.54A8.114 8.114 0 0 1 4.9.63 7.74 7.74 0 0 1 8 0a7.72 7.72 0 0 1 3.11.63c.967.42 1.813.993 2.54 1.72a8.146 8.146 0 0 1 1.72 2.54c.42.967.63 2.003.63 3.11a7.74 7.74 0 0 1-.63 3.1 8.115 8.115 0 0 1-1.72 2.55 8.146 8.146 0 0 1-2.54 1.72A7.72 7.72 0 0 1 8 16Zm0-1.2c.733 0 1.45-.107 2.15-.32.7-.213 1.39-.587 2.07-1.12a8.703 8.703 0 0 0-2.08-1.1A6.302 6.302 0 0 0 8 11.88c-.72 0-1.433.127-2.14.38-.707.253-1.4.62-2.08 1.1.68.533 1.37.907 2.07 1.12.7.213 1.417.32 2.15.32Zm0-7.4c.453 0 .823-.143 1.11-.43.287-.287.43-.657.43-1.11 0-.453-.143-.823-.43-1.11-.287-.287-.657-.43-1.11-.43-.453 0-.823.143-1.11.43-.287.287-.43.657-.43 1.11 0 .453.143.823.43 1.11.287.287.657.43 1.11.43Z" />
    </Icon>
  );
};
