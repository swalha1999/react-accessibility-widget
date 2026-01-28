/**
 * Injects the global accessibility effect styles into the document.
 * Call this once at the root of your application.
 */
export function injectAccessibilityStyles(): void {
  if (typeof document === 'undefined') return;

  const styleId = 'a11y-widget-global-styles';

  // Don't inject twice
  if (document.getElementById(styleId)) return;

  const style = document.createElement('style');
  style.id = styleId;
  style.textContent = `
    /* Accessibility Widget Global Styles */

    /* Text scaling - only when class is active */
    body.a11y-text-scaled *:not([class*="a11y-widget"]) {
      font-size: calc(1em * var(--a11y-text-scale, 1)) !important;
    }

    /* Line height - only when class is active */
    body.a11y-line-height-active *:not([class*="a11y-widget"]) {
      line-height: var(--a11y-line-height, 1.5) !important;
    }

    /* Letter spacing - only when class is active */
    body.a11y-letter-spacing-active *:not([class*="a11y-widget"]) {
      letter-spacing: var(--a11y-letter-spacing, normal) !important;
    }

    /* Invert colors - applied to content wrapper */
    #a11y-content-wrapper.a11y-invert {
      filter: invert(1) hue-rotate(180deg);
    }

    #a11y-content-wrapper.a11y-invert img:not(.a11y-widget-icon),
    #a11y-content-wrapper.a11y-invert video,
    #a11y-content-wrapper.a11y-invert [style*="background-image"],
    #a11y-content-wrapper.a11y-invert canvas,
    #a11y-content-wrapper.a11y-invert svg:not(.a11y-widget-icon) {
      filter: invert(1) hue-rotate(180deg);
    }

    /* Grayscale - applied to content wrapper */
    #a11y-content-wrapper.a11y-grayscale {
      filter: grayscale(100%);
    }

    /* Underline links */
    body.a11y-underline-links a {
      text-decoration: underline !important;
      text-decoration-thickness: 2px !important;
      text-underline-offset: 3px !important;
    }

    /* Big cursor */
    body.a11y-big-cursor,
    body.a11y-big-cursor * {
      cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><path fill="%232d2d2d" stroke="white" stroke-width="2" d="M10 3l20 15-8 2-4 9-5-3 4-8-7-2z"/></svg>') 8 8, auto !important;
    }

    /* Hide images */
    body.a11y-hide-images img,
    body.a11y-hide-images [role="img"],
    body.a11y-hide-images svg:not([class*="a11y"]) {
      opacity: 0 !important;
      pointer-events: none !important;
    }

    /* Reading guide line is created dynamically by the hook */
  `;

  document.head.appendChild(style);
}

/**
 * Removes the global accessibility effect styles from the document.
 */
export function removeAccessibilityStyles(): void {
  if (typeof document === 'undefined') return;

  const style = document.getElementById('a11y-widget-global-styles');
  if (style) {
    style.remove();
  }
}

/**
 * CSS string for the global accessibility effects.
 * Use this if you prefer to include styles in your own CSS build process.
 */
export const accessibilityStylesCSS = `
/* Accessibility Widget Global Styles */

/* Text scaling - only when class is active */
body.a11y-text-scaled *:not([class*="a11y-widget"]) {
  font-size: calc(1em * var(--a11y-text-scale, 1)) !important;
}

/* Line height - only when class is active */
body.a11y-line-height-active *:not([class*="a11y-widget"]) {
  line-height: var(--a11y-line-height, 1.5) !important;
}

/* Letter spacing - only when class is active */
body.a11y-letter-spacing-active *:not([class*="a11y-widget"]) {
  letter-spacing: var(--a11y-letter-spacing, normal) !important;
}

/* Invert colors - applied to content wrapper */
#a11y-content-wrapper.a11y-invert {
  filter: invert(1) hue-rotate(180deg);
}

#a11y-content-wrapper.a11y-invert img:not(.a11y-widget-icon),
#a11y-content-wrapper.a11y-invert video,
#a11y-content-wrapper.a11y-invert [style*="background-image"],
#a11y-content-wrapper.a11y-invert canvas,
#a11y-content-wrapper.a11y-invert svg:not(.a11y-widget-icon) {
  filter: invert(1) hue-rotate(180deg);
}

/* Grayscale - applied to content wrapper */
#a11y-content-wrapper.a11y-grayscale {
  filter: grayscale(100%);
}

/* Underline links */
body.a11y-underline-links a {
  text-decoration: underline !important;
  text-decoration-thickness: 2px !important;
  text-underline-offset: 3px !important;
}

/* Big cursor */
body.a11y-big-cursor,
body.a11y-big-cursor * {
  cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><path fill="%232d2d2d" stroke="white" stroke-width="2" d="M10 3l20 15-8 2-4 9-5-3 4-8-7-2z"/></svg>') 8 8, auto !important;
}

/* Hide images */
body.a11y-hide-images img,
body.a11y-hide-images [role="img"],
body.a11y-hide-images svg:not([class*="a11y"]) {
  opacity: 0 !important;
  pointer-events: none !important;
}
`;
