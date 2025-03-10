import {StyleSheet} from 'react-native-unistyles';

export const styles = StyleSheet.create(({colors, gap}) => ({
  container: {
    backgroundColor: colors.background,
    padding: gap(2),
    borderRadius: 4,
  },
}));
