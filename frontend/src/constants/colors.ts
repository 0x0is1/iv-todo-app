export const darkTheme = {
    bgPrimary: '#0A0A0F',
    bgSecondary: '#12121A',
    bgTertiary: '#1A1A27',

    accentPrimary: '#00D4FF',
    accentSecondary: '#0099BB',
    accentGlow: '#00D4FF20',

    textPrimary: '#F0F0F5',
    textSecondary: '#A0A0B0',
    textMuted: '#505065',

    success: '#00E5A0',
    warning: '#FFB830',
    danger: '#FF4560',
    info: '#00D4FF',

    border: '#1E1E2E',
    borderActive: '#00D4FF40',

    overlay: '#00000080',
};

// "Choose not too bright colour, take care of aesthetics, with light dim colors"
export const lightTheme = {
    bgPrimary: '#F5F5F8',       // Off-white/gray, not blinding
    bgSecondary: '#FCFCFD',     // Very soft white for cards
    bgTertiary: '#EAEAEF',      // Subtle dim contrast

    accentPrimary: '#0099BB',   // Slightly darker cyan for contrast on light
    accentSecondary: '#007A94',
    accentGlow: '#00D4FF30',

    textPrimary: '#1A1A27',     // Deep slate, not pitch black
    textSecondary: '#505065',
    textMuted: '#A0A0B0',

    success: '#00B37E',         // Deepened for contrast
    warning: '#E59F00',
    danger: '#E52E4D',
    info: '#0099BB',

    border: '#E0E0E6',          // Soft borders
    borderActive: '#0099BB40',

    overlay: '#00000040',       // Lighter overlay for light mode
};

export type ThemeColors = typeof darkTheme;

// Export dark theme as default 'colors' for backwards compatibility during migration
export const colors = darkTheme;
