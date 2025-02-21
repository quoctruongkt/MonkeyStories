import {createStyleSheet} from 'react-native-unistyles';

export const stylesheet = createStyleSheet(() => ({
  container: {flex: 1, padding: 10},
  buttonBack: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  jsonContainer: {flex: 1},
  jsonBack: {
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginBottom: 10,
  },
  item: {padding: 10, borderBottomWidth: 1, borderColor: '#ddd'},
}));
