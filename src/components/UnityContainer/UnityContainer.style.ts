import {StyleSheet} from 'react-native';
import {createStyleSheet} from 'react-native-unistyles';

export const stylesheet = createStyleSheet(() => ({
  unityContainer: {...StyleSheet.absoluteFillObject, backgroundColor: '#ccc'},
  unityView: {flex: 1},
  button: {
    position: 'absolute',
    top: 100,
    left: 100,
    width: 50,
    height: 50,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
