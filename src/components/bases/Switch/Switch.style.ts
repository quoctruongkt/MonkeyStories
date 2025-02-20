import {createStyleSheet} from 'react-native-unistyles';

export const stylesheet = createStyleSheet(() => ({
  button: (disabled?: boolean) => ({opacity: disabled ? 0.8 : 1}),

  background: {
    width: 50,
    height: 30,
    borderRadius: 90,
    padding: 2,
    marginTop: 20,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowColor: '#000',
  },

  dot: {
    height: '100%',
    aspectRatio: 1,
    borderRadius: 90,
  },
}));
