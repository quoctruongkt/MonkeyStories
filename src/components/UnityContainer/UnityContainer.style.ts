import {StyleSheet} from 'react-native-unistyles';

export const styles = StyleSheet.create(() => ({
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
  coin: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 1,
    backgroundColor: 'yellow',
  },
}));
