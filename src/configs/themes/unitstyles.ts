import {StyleSheet} from 'react-native-unistyles';

import {breakpoints} from './breakpoints';
import {lightTheme} from './themes';

// if you defined breakpoints
type AppBreakpoints = typeof breakpoints;

// if you defined themes
type AppThemes = {
  light: typeof lightTheme;
};

// override library types
declare module 'react-native-unistyles' {
  export interface UnistylesBreakpoints extends AppBreakpoints {}
  export interface UnistylesThemes extends AppThemes {}
}

StyleSheet.configure({
  breakpoints,
  themes: {
    light: lightTheme,
  },
  settings: {
    initialTheme: 'light',
  },
});
