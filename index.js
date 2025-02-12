/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Orientation from 'react-native-orientation-locker';
if (__DEV__) {
  require('@/configs/debug/ReactotronConfig');
}

Orientation.lockToPortrait();

AppRegistry.registerComponent(appName, () => App);
