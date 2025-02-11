import {useAppDispatch, useAppSelector} from '@/hooks';
import {increment} from '@/store/slices/counterSlice';
import React from 'react';
import {Text, Touchable, TouchableOpacity, View} from 'react-native';

export function HomeScreen() {
  const count = useAppSelector(state => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen {count}</Text>
      <TouchableOpacity onPress={() => dispatch(increment())}>
        <Text>Increment</Text>
      </TouchableOpacity>
    </View>
  );
}
