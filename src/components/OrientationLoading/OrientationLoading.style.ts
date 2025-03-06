import {StyleSheet} from 'react-native-unistyles';

export const styles = StyleSheet.create(() => ({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(1,1,1,1)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  text: {
    color: '#fff',
  },
}));
