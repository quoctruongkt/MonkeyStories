import {StyleSheet} from 'react-native';
import {createStyleSheet} from 'react-native-unistyles';

export const stylesheet = createStyleSheet(() => ({
  unityContainer: {...StyleSheet.absoluteFillObject, backgroundColor: 'red'},
  unityView: {flex: 1},
}));
