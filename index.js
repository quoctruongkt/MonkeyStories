/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Orientation from 'react-native-orientation-locker';

import App from './App';
import {name as appName} from './app.json';
if (__DEV__) {
  require('@/configs/debug/ReactotronConfig');
}

Orientation.lockToPortrait();

AppRegistry.registerComponent(appName, () => App);
