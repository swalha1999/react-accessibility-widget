import React, { useState, useRef, useEffect, useId } from 'react';
import type { CSSProperties } from 'react';
import type { AccessibilityWidgetProps } from './types';
import { useAccessibilitySettings, useReadingGuide, useBackgroundContrast } from './hooks';
import {
  AccessibilityIcon,
  TextSizeIcon,
  LineHeightIcon,
  LetterSpacingIcon,
  InvertIcon,
  GrayscaleIcon,
  LinkIcon,
  CursorIcon,
  ReadingGuideIcon,
  ImageIcon,
  ResetIcon,
  CloseIcon,
} from './icons';

export const AccessibilityWidget: React.FC<AccessibilityWidgetProps> = ({
  translations,
  dir = 'ltr',
  styles = {},
  classNames = {},
  position = 'bottom-right',
  storageKey = 'accessibility-settings',
  onSettingsChange,
  defaultSettings,
  zIndex = 9999,
  disablePersistence = false,
  buttonIcon,
  primaryColor = '#6366f1',
  buttonAriaLabel,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [buttonHovered, setButtonHovered] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const uniqueId = useId();

  const isDarkBackground = useBackgroundContrast(buttonRef);

  const {
    settings,
    toggleSetting,
    resetSettings,
    incrementSetting,
    decrementSetting,
  } = useAccessibilitySettings({
    storageKey,
    defaultSettings,
    onSettingsChange,
    disablePersistence,
  });

  useReadingGuide(settings.readingGuide, primaryColor);

  // Handle open/close with animation
  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  // Handle escape key to close panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
        buttonRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Focus trap within panel
  useEffect(() => {
    if (!isOpen || !panelRef.current) return;

    const panel = panelRef.current;
    const focusableElements = panel.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    };

    panel.addEventListener('keydown', handleTabKey);
    firstElement?.focus();

    return () => panel.removeEventListener('keydown', handleTabKey);
  }, [isOpen]);

  // Position calculations
  const getPositionStyles = (): CSSProperties => {
    const base: CSSProperties = { position: 'fixed' };
    const offset = 24;

    switch (position) {
      case 'bottom-left':
        return { ...base, bottom: offset, left: offset };
      case 'bottom-right':
        return { ...base, bottom: offset, right: offset };
      case 'top-left':
        return { ...base, top: offset, left: offset };
      case 'top-right':
        return { ...base, top: offset, right: offset };
      default:
        return { ...base, bottom: offset, right: offset };
    }
  };

  const getPanelPositionStyles = (): CSSProperties => {
    const base: CSSProperties = { position: 'fixed' };

    if (position.includes('bottom')) {
      base.bottom = 100;
    } else {
      base.top = 100;
    }

    if (position.includes('left')) {
      base.left = 24;
    } else {
      base.right = 24;
    }

    return base;
  };

  // Generate gradient from primary color
  const lightenColor = (hex: string, percent: number): string => {
    const num = parseInt(hex.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = ((num >> 8) & 0x00ff) + amt;
    const B = (num & 0x0000ff) + amt;
    return `#${(
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)}`;
  };

  const darkenColor = (hex: string, percent: number): string => {
    return lightenColor(hex, -percent);
  };

  // Button styles
  const buttonStyle: CSSProperties = {
    ...getPositionStyles(),
    width: 64,
    height: 64,
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
    zIndex,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: isDarkBackground
      ? 'linear-gradient(145deg, #ffffff 0%, #f0f0f0 100%)'
      : `linear-gradient(145deg, ${lightenColor(primaryColor, 10)} 0%, ${darkenColor(primaryColor, 15)} 100%)`,
    color: isDarkBackground ? primaryColor : 'white',
    boxShadow: buttonHovered
      ? isDarkBackground
        ? '0 8px 32px rgba(0, 0, 0, 0.15), 0 4px 12px rgba(0, 0, 0, 0.1)'
        : `0 8px 32px ${primaryColor}50, 0 4px 12px ${primaryColor}30`
      : isDarkBackground
        ? '0 4px 20px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.05)'
        : `0 4px 20px ${primaryColor}40, 0 2px 8px ${primaryColor}20`,
    transform: buttonHovered ? 'scale(1.1) translateY(-2px)' : 'scale(1)',
    ...styles.button,
    ...(isDarkBackground ? styles.buttonLight : styles.buttonDark),
  };

  // Overlay styles
  const overlayStyle: CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.4)',
    backdropFilter: 'blur(4px)',
    WebkitBackdropFilter: 'blur(4px)',
    zIndex: zIndex - 1,
    ...styles.overlay,
  };

  // Panel styles
  const panelStyle: CSSProperties = {
    ...getPanelPositionStyles(),
    width: 400,
    maxWidth: 'calc(100vw - 48px)',
    maxHeight: '85vh',
    background: 'linear-gradient(180deg, #ffffff 0%, #fafbfc 100%)',
    borderRadius: 24,
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 12px 24px -8px rgba(0, 0, 0, 0.1)',
    zIndex,
    overflow: 'hidden',
    direction: dir,
    border: '1px solid rgba(255, 255, 255, 0.8)',
    ...styles.panel,
  };

  // Header styles
  const headerStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '24px 28px',
    background: `linear-gradient(135deg, ${primaryColor} 0%, ${darkenColor(primaryColor, 20)} 100%)`,
    color: 'white',
    position: 'relative',
    overflow: 'hidden',
    ...styles.panelHeader,
  };

  // Header decorative elements
  const headerDecoStyle: CSSProperties = {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 150,
    height: 150,
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.1)',
    pointerEvents: 'none',
  };

  const headerDeco2Style: CSSProperties = {
    position: 'absolute',
    bottom: -30,
    left: -30,
    width: 80,
    height: 80,
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.05)',
    pointerEvents: 'none',
  };

  const headerTitleStyle: CSSProperties = {
    margin: 0,
    fontSize: 22,
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
    position: 'relative',
    zIndex: 1,
  };

  const closeButtonStyle: CSSProperties = {
    background: 'rgba(255, 255, 255, 0.15)',
    border: 'none',
    width: 36,
    height: 36,
    borderRadius: 12,
    color: 'white',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 1,
    backdropFilter: 'blur(10px)',
  };

  // Content styles
  const contentStyle: CSSProperties = {
    padding: '20px 24px',
    maxHeight: 'calc(85vh - 160px)',
    overflowY: 'auto',
    overflowX: 'hidden',
    ...styles.panelContent,
  };

  // Setting item styles
  const getSettingItemStyle = (key: string, isToggle: boolean): CSSProperties => ({
    background: hoveredItem === key
      ? 'linear-gradient(145deg, #f8f9ff 0%, #f0f4ff 100%)'
      : 'linear-gradient(145deg, #f8fafc 0%, #f1f5f9 100%)',
    borderRadius: 16,
    padding: '18px 20px',
    marginBottom: 12,
    boxShadow: hoveredItem === key
      ? `0 4px 12px ${primaryColor}15, 0 2px 4px rgba(0, 0, 0, 0.05)`
      : '0 1px 3px rgba(0, 0, 0, 0.04)',
    border: hoveredItem === key
      ? `1px solid ${primaryColor}20`
      : '1px solid transparent',
    cursor: 'default',
    ...(isToggle && {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }),
    ...styles.settingItem,
  });

  const itemHeaderStyle = (isToggle: boolean): CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    ...(isToggle ? { flex: 1 } : { marginBottom: 14 }),
  });

  const iconContainerStyle: CSSProperties = {
    width: 40,
    height: 40,
    borderRadius: 12,
    background: `linear-gradient(145deg, ${primaryColor}15 0%, ${primaryColor}08 100%)`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  };

  const iconStyle: CSSProperties = {
    width: 22,
    height: 22,
    color: primaryColor,
  };

  const labelStyle: CSSProperties = {
    fontWeight: 600,
    color: '#1e293b',
    fontSize: 15,
    lineHeight: 1.4,
    letterSpacing: '-0.01em',
  };

  // Control buttons styles
  const controlContainerStyle: CSSProperties = {
    display: 'flex',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
    background: '#ffffff',
    padding: '8px 12px',
    borderRadius: 14,
    boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.06)',
  };

  const controlButtonStyle = (disabled: boolean): CSSProperties => ({
    background: disabled
      ? '#f1f5f9'
      : `linear-gradient(145deg, ${primaryColor} 0%, ${darkenColor(primaryColor, 10)} 100%)`,
    border: 'none',
    borderRadius: 10,
    width: 42,
    height: 42,
    fontSize: 16,
    fontWeight: 700,
    color: disabled ? '#94a3b8' : 'white',
    cursor: disabled ? 'not-allowed' : 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: disabled ? 'none' : `0 2px 8px ${primaryColor}30`,
    opacity: disabled ? 0.5 : 1,
    ...styles.controlButton,
  });

  const valueDisplayStyle: CSSProperties = {
    minWidth: 70,
    textAlign: 'center',
    fontWeight: 700,
    color: '#334155',
    fontSize: 14,
    fontFamily: 'ui-monospace, monospace',
    background: '#f8fafc',
    padding: '8px 12px',
    borderRadius: 8,
  };

  // Toggle switch styles
  const toggleTrackStyle = (checked: boolean): CSSProperties => ({
    position: 'relative',
    width: 56,
    height: 30,
    flexShrink: 0,
    display: 'inline-block',
    cursor: 'pointer',
  });

  const toggleSliderStyle = (checked: boolean): CSSProperties => ({
    position: 'absolute',
    cursor: 'pointer',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: checked
      ? primaryColor
      : '#e2e8f0',
    borderRadius: 30,
    boxShadow: checked
      ? `inset 0 2px 4px ${darkenColor(primaryColor, 20)}40, 0 2px 8px ${primaryColor}30`
      : 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
    ...styles.toggleTrack,
  });

  const toggleKnobStyle = (checked: boolean): CSSProperties => ({
    position: 'absolute',
    height: 24,
    width: 24,
    left: checked ? 28 : 3,
    bottom: 3,
    backgroundColor: 'white',
    borderRadius: '50%',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.1)',
    ...styles.toggleThumb,
  });

  // Divider styles
  const dividerStyle: CSSProperties = {
    height: 1,
    background: 'linear-gradient(90deg, transparent 0%, #e2e8f0 50%, transparent 100%)',
    margin: '20px 0',
  };

  // Section label styles
  const sectionLabelStyle: CSSProperties = {
    fontSize: 11,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: '#94a3b8',
    marginBottom: 12,
    marginTop: 4,
    paddingLeft: 4,
  };

  // Reset button styles
  const resetButtonStyle: CSSProperties = {
    width: '100%',
    padding: '16px 20px',
    background: 'linear-gradient(145deg, #fef2f2 0%, #fee2e2 100%)',
    border: '1px solid #fecaca',
    borderRadius: 14,
    color: '#dc2626',
    fontWeight: 700,
    fontSize: 15,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 16,
    boxShadow: '0 2px 8px rgba(220, 38, 38, 0.1)',
    ...styles.resetButton,
  };

  const panelId = `a11y-panel-${uniqueId}`;

  // Render toggle item
  const renderToggleItem = (
    key: keyof typeof settings,
    icon: React.ReactNode,
    label: string
  ) => (
    <div
      style={getSettingItemStyle(key, true)}
      onMouseEnter={() => setHoveredItem(key)}
      onMouseLeave={() => setHoveredItem(null)}
      className={classNames.settingItem}
    >
      <div style={itemHeaderStyle(true)}>
        <div style={iconContainerStyle}>
          <span style={iconStyle}>{icon}</span>
        </div>
        <span style={labelStyle}>{label}</span>
      </div>
      <label style={toggleTrackStyle(settings[key] as boolean)}>
        <input
          type="checkbox"
          id={`${key}-${uniqueId}`}
          checked={settings[key] as boolean}
          onChange={() => toggleSetting(key)}
          style={{ opacity: 0, width: 0, height: 0, position: 'absolute' }}
          aria-label={label}
          role="switch"
          aria-checked={settings[key] as boolean}
        />
        <span style={toggleSliderStyle(settings[key] as boolean)} aria-hidden="true">
          <span style={toggleKnobStyle(settings[key] as boolean)} />
        </span>
      </label>
    </div>
  );

  // Render slider item
  const renderSliderItem = (
    key: 'textSize' | 'lineHeight' | 'letterSpacing',
    icon: React.ReactNode,
    label: string,
    decrementLabel = '−',
    incrementLabel = '+'
  ) => (
    <div
      style={getSettingItemStyle(key, false)}
      onMouseEnter={() => setHoveredItem(key)}
      onMouseLeave={() => setHoveredItem(null)}
      className={classNames.settingItem}
    >
      <div style={itemHeaderStyle(false)}>
        <div style={iconContainerStyle}>
          <span style={iconStyle}>{icon}</span>
        </div>
        <span style={labelStyle}>{label}</span>
      </div>
      <div style={controlContainerStyle} role="group" aria-label={label}>
        <button
          type="button"
          onClick={() => decrementSetting(key)}
          disabled={settings[key] === -2}
          style={controlButtonStyle(settings[key] === -2)}
          aria-label={`Decrease ${label}`}
        >
          {decrementLabel}
        </button>
        <span style={valueDisplayStyle} aria-live="polite">
          {settings[key] === 0
            ? translations.normal
            : settings[key] > 0
              ? `+${settings[key]}`
              : settings[key]}
        </span>
        <button
          type="button"
          onClick={() => incrementSetting(key)}
          disabled={settings[key] === 2}
          style={controlButtonStyle(settings[key] === 2)}
          aria-label={`Increase ${label}`}
        >
          {incrementLabel}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Floating Button */}
      <button
        ref={buttonRef}
        type="button"
        className={classNames.button}
        style={buttonStyle}
        onClick={() => (isOpen ? handleClose() : handleOpen())}
        onMouseEnter={() => setButtonHovered(true)}
        onMouseLeave={() => setButtonHovered(false)}
        aria-label={buttonAriaLabel || translations.title}
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-haspopup="dialog"
      >
        {buttonIcon || <AccessibilityIcon size={32} />}
      </button>

      {/* Accessibility Panel */}
      {isOpen && (
        <>
          <div
            className={classNames.overlay}
            style={overlayStyle}
            onClick={handleClose}
            aria-hidden="true"
          />
          <div
            ref={panelRef}
            id={panelId}
            role="dialog"
            aria-modal="true"
            aria-label={translations.title}
            className={classNames.panel}
            style={panelStyle}
          >
            <div className={classNames.panelHeader} style={headerStyle}>
              <div style={headerDecoStyle} aria-hidden="true" />
              <div style={headerDeco2Style} aria-hidden="true" />
              <h2 style={headerTitleStyle}>{translations.title}</h2>
              <button
                type="button"
                style={closeButtonStyle}
                onClick={handleClose}
                aria-label={translations.close}
              >
                <CloseIcon size={20} />
              </button>
            </div>

            <div className={classNames.panelContent} style={contentStyle}>
              {/* Text Adjustments Section */}
              <div style={sectionLabelStyle}>
                {translations.textAdjustments || 'Text Adjustments'}
              </div>

              {renderSliderItem('textSize', <TextSizeIcon />, translations.textSize, 'A−', 'A+')}
              {renderSliderItem('lineHeight', <LineHeightIcon />, translations.lineSpacing)}
              {renderSliderItem('letterSpacing', <LetterSpacingIcon />, translations.letterSpacing)}

              <div style={dividerStyle} role="separator" aria-hidden="true" />

              {/* Visual Adjustments Section */}
              <div style={sectionLabelStyle}>
                {translations.visualAdjustments || 'Visual Adjustments'}
              </div>

              {renderToggleItem('invertColors', <InvertIcon />, translations.invertColors)}
              {renderToggleItem('grayscale', <GrayscaleIcon />, translations.grayscale)}
              {renderToggleItem('hideImages', <ImageIcon />, translations.hideImages)}

              <div style={dividerStyle} role="separator" aria-hidden="true" />

              {/* Navigation Aids Section */}
              <div style={sectionLabelStyle}>
                {translations.navigationAids || 'Navigation Aids'}
              </div>

              {renderToggleItem('underlineLinks', <LinkIcon />, translations.underlineLinks)}
              {renderToggleItem('bigCursor', <CursorIcon />, translations.bigCursor)}
              {renderToggleItem('readingGuide', <ReadingGuideIcon />, translations.readingGuide)}

              {/* Reset Button */}
              <button
                type="button"
                style={resetButtonStyle}
                onClick={resetSettings}
                className={classNames.resetButton}
              >
                <ResetIcon size={20} />
                {translations.reset}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};
