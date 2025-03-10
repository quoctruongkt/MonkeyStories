import {StyleSheet} from 'react-native-unistyles';

export const styles = StyleSheet.create((theme, rt) => ({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: rt.statusBar.height,
    zIndex: 100,
    flex: 1,
  },
}));
