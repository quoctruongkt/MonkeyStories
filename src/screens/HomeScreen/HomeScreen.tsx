import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import {styles} from './HomeScreen.style';

import {EApiType, EScreenName} from '@/constants';
import {useAppNavigation} from '@/hooks';
import axiosInstance from '@/services/network';

export function HomeScreen() {
  const navigation = useAppNavigation<EScreenName.HOME>();

  const callApi = () => {
    axiosInstance(EApiType.DATA, 'sign-in').get('');
  };

  const openMap = () => {
    navigation.navigate(EScreenName.MAP_LESSON);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={callApi} style={styles.button}>
        <Text>Call Api</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={openMap} style={styles.button}>
        <Text>Map Lesson</Text>
      </TouchableOpacity>
    </View>
  );
}
