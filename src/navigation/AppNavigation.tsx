import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import {EScreenName, EOrientationNavigationTypes} from '@/constants';
import {HomeScreen, UnityScreen} from '@/screens';

const Stack = createNativeStackNavigator();

export function AppNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{orientation: EOrientationNavigationTypes.PORTRAIT}}>
      <Stack.Screen name={EScreenName.HOME} component={HomeScreen} />
      <Stack.Screen
        name={EScreenName.UNITY}
        component={UnityScreen}
        options={{orientation: EOrientationNavigationTypes.LANDSCAPE}}
      />
    </Stack.Navigator>
  );
}
