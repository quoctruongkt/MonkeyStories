import React from 'react';
import {HomeScreen, UnityScreen} from '@/screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {EScreenName} from '@/constants';

const Stack = createNativeStackNavigator();

export function AppNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={EScreenName.HOME} component={HomeScreen} />
      <Stack.Screen name={EScreenName.UNITY} component={UnityScreen} />
    </Stack.Navigator>
  );
}
