import {StyleSheet} from 'react-native';
import {createStyleSheet} from 'react-native-unistyles';

export const stylesheet = createStyleSheet(() => ({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(1,1,1,1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
}));
