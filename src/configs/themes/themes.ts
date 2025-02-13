const margins = {
  sm: 2,
  md: 4,
  lg: 8,
  xl: 12,
} as const;

export const lightTheme = {
  colors: {
    typography: '#000000',
    background: '#ffffff',
  },
  margins,
};

export const darkTheme = {
  colors: {
    typography: '#ffffff',
    background: '#000000',
  },
  margins,
} as const;

// define other themes
