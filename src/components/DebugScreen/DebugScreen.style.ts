import {StyleSheet} from 'react-native-unistyles';

export const styles = StyleSheet.create(() => ({
  container: {flex: 1},
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '900',
  },
  button: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#ccc4cd',
  },
  buttons: {
    flexDirection: 'row',
    gap: 16,
  },
  bottomSheetView: {
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
}));
