import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
  'aria-hidden'?: boolean;
}

export const AccessibilityIcon: React.FC<IconProps> = ({
  size = 24,
  className,
  'aria-hidden': ariaHidden = true
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    width={size}
    height={size}
    className={`a11y-widget-icon ${className || ''}`}
    aria-hidden={ariaHidden}
    role="img"
  >
    <path d="M12 2C13.1 2 14 2.9 14 4S13.1 6 12 6 10 5.1 10 4 10.9 2 12 2M21 9H15V22H13V16H11V22H9V9H3V7H21V9Z"/>
  </svg>
);

export const TextSizeIcon: React.FC<IconProps> = ({
  size = 24,
  className,
  'aria-hidden': ariaHidden = true
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    width={size}
    height={size}
    className={`a11y-widget-icon ${className || ''}`}
    aria-hidden={ariaHidden}
  >
    <path d="M3 7V5H21V7H3M10 17V9H14V17H10M8 19H16V21H8V19Z"/>
  </svg>
);

export const LineHeightIcon: React.FC<IconProps> = ({
  size = 24,
  className,
  'aria-hidden': ariaHidden = true
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    width={size}
    height={size}
    className={`a11y-widget-icon ${className || ''}`}
    aria-hidden={ariaHidden}
  >
    <path d="M10 13H22V11H10M10 19H22V17H10M10 7H22V5H10M6 7H8.5L5 3.5L1.5 7H4V17H1.5L5 20.5L8.5 17H6V7Z"/>
  </svg>
);

export const LetterSpacingIcon: React.FC<IconProps> = ({
  size = 24,
  className,
  'aria-hidden': ariaHidden = true
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    width={size}
    height={size}
    className={`a11y-widget-icon ${className || ''}`}
    aria-hidden={ariaHidden}
  >
    <path d="M11 3L5.5 17H7.75L8.85 14H15.15L16.25 17H18.5L13 3H11M9.55 12L12 5.67L14.45 12H9.55M2 20H22V22H2V20Z"/>
  </svg>
);

export const InvertIcon: React.FC<IconProps> = ({
  size = 24,
  className,
  'aria-hidden': ariaHidden = true
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    width={size}
    height={size}
    className={`a11y-widget-icon ${className || ''}`}
    aria-hidden={ariaHidden}
  >
    <path d="M12,18C11.11,18 10.26,17.8 9.5,17.45C11.56,16.5 13,14.42 13,12C13,9.58 11.56,7.5 9.5,6.55C10.26,6.2 11.11,6 12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18M20,8.69V4H15.31L12,0.69L8.69,4H4V8.69L0.69,12L4,15.31V20H8.69L12,23.31L15.31,20H20V15.31L23.31,12L20,8.69Z"/>
  </svg>
);

export const GrayscaleIcon: React.FC<IconProps> = ({
  size = 24,
  className,
  'aria-hidden': ariaHidden = true
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    width={size}
    height={size}
    className={`a11y-widget-icon ${className || ''}`}
    aria-hidden={ariaHidden}
  >
    <path d="M12,18.54L19.37,12.8L21,14.07L12,21.07L3,14.07L4.62,12.81L12,18.54M12,16L3,9L12,2L21,9L12,16M12,4.53L6.26,9L12,13.47L17.74,9L12,4.53Z"/>
  </svg>
);

export const LinkIcon: React.FC<IconProps> = ({
  size = 24,
  className,
  'aria-hidden': ariaHidden = true
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    width={size}
    height={size}
    className={`a11y-widget-icon ${className || ''}`}
    aria-hidden={ariaHidden}
  >
    <path d="M10.59,13.41C11,13.8 11,14.44 10.59,14.83C10.2,15.22 9.56,15.22 9.17,14.83C7.22,12.88 7.22,9.71 9.17,7.76V7.76L12.71,4.22C14.66,2.27 17.83,2.27 19.78,4.22C21.73,6.17 21.73,9.34 19.78,11.29L18.29,12.78C18.3,11.96 18.17,11.14 17.89,10.36L18.36,9.88C19.54,8.71 19.54,6.81 18.36,5.64C17.19,4.46 15.29,4.46 14.12,5.64L10.59,9.17C9.41,10.34 9.41,12.24 10.59,13.41M13.41,9.17C13.8,8.78 14.44,8.78 14.83,9.17C16.78,11.12 16.78,14.29 14.83,16.24V16.24L11.29,19.78C9.34,21.73 6.17,21.73 4.22,19.78C2.27,17.83 2.27,14.66 4.22,12.71L5.71,11.22C5.7,12.04 5.83,12.86 6.11,13.65L5.64,14.12C4.46,15.29 4.46,17.19 5.64,18.36C6.81,19.54 8.71,19.54 9.88,18.36L13.41,14.83C14.59,13.66 14.59,11.76 13.41,10.59C13,10.2 13,9.56 13.41,9.17Z"/>
  </svg>
);

export const CursorIcon: React.FC<IconProps> = ({
  size = 24,
  className,
  'aria-hidden': ariaHidden = true
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    width={size}
    height={size}
    className={`a11y-widget-icon ${className || ''}`}
    aria-hidden={ariaHidden}
  >
    <path d="M13.64,21.97C13.14,22.21 12.54,22 12.31,21.5L10.13,16.76L7.62,18.78C7.45,18.92 7.24,19 7,19A1,1 0 0,1 6,18V3A1,1 0 0,1 7,2C7.24,2 7.47,2.09 7.64,2.23L7.65,2.22L19.14,11.86C19.57,12.22 19.62,12.85 19.27,13.27C19.12,13.45 18.91,13.57 18.7,13.61L15.54,14.23L17.74,18.96C17.97,19.46 17.76,20.06 17.26,20.28L13.64,21.97Z"/>
  </svg>
);

export const ReadingGuideIcon: React.FC<IconProps> = ({
  size = 24,
  className,
  'aria-hidden': ariaHidden = true
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    width={size}
    height={size}
    className={`a11y-widget-icon ${className || ''}`}
    aria-hidden={ariaHidden}
  >
    <path d="M21,5C19.89,4.65 18.67,4.5 17.5,4.5C15.55,4.5 13.45,4.9 12,6C10.55,4.9 8.45,4.5 6.5,4.5C4.55,4.5 2.45,4.9 1,6V20.65C1,20.9 1.25,21.15 1.5,21.15C1.6,21.15 1.65,21.1 1.75,21.1C3.1,20.45 5.05,20 6.5,20C8.45,20 10.55,20.4 12,21.5C13.35,20.65 15.8,20 17.5,20C19.15,20 20.85,20.3 22.25,21.05C22.35,21.1 22.4,21.1 22.5,21.1C22.75,21.1 23,20.85 23,20.6V6C22.4,5.55 21.75,5.25 21,5M21,18.5C19.9,18.15 18.7,18 17.5,18C15.8,18 13.35,18.65 12,19.5V8C13.35,7.15 15.8,6.5 17.5,6.5C18.7,6.5 19.9,6.65 21,7V18.5Z"/>
  </svg>
);

export const ImageIcon: React.FC<IconProps> = ({
  size = 24,
  className,
  'aria-hidden': ariaHidden = true
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    width={size}
    height={size}
    className={`a11y-widget-icon ${className || ''}`}
    aria-hidden={ariaHidden}
  >
    <path d="M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z"/>
  </svg>
);

export const ResetIcon: React.FC<IconProps> = ({
  size = 24,
  className,
  'aria-hidden': ariaHidden = true
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    width={size}
    height={size}
    className={`a11y-widget-icon ${className || ''}`}
    aria-hidden={ariaHidden}
  >
    <path d="M12.5,8C9.85,8 7.45,9 5.6,10.6L2,7V16H11L7.38,12.38C8.77,11.22 10.54,10.5 12.5,10.5C16.04,10.5 19.05,12.81 20.1,16L22.47,15.22C21.08,11.03 17.15,8 12.5,8Z"/>
  </svg>
);

export const CloseIcon: React.FC<IconProps> = ({
  size = 24,
  className,
  'aria-hidden': ariaHidden = true
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    width={size}
    height={size}
    className={`a11y-widget-icon ${className || ''}`}
    aria-hidden={ariaHidden}
  >
    <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
  </svg>
);
