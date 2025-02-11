import {createStyleSheet} from 'react-native-unistyles';

export const stylesheet = createStyleSheet(() => ({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  button: {
    width: 100,
    height: 50,
    backgroundColor: 'yellow',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
