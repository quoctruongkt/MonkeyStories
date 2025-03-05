import React, {useEffect, useState} from 'react';
import {Button, Text, TouchableOpacity, View} from 'react-native';

import {styles} from './HomeScreen.style';

import {EApiType, EMessageTypeUN, EScreenName} from '@/constants';
import {useUnity} from '@/contexts';
import {useAppNavigation} from '@/hooks';
import axiosInstance from '@/services/network';

export function HomeScreen() {
  const navigation = useAppNavigation<EScreenName.HOME>();
  const [currentCoin, setCurrentCoin] = useState(0);
  const {sendMessageToUnityWithResponse} = useUnity();

  const callApi = () => {
    axiosInstance(EApiType.DATA, 'sign-in').get('');
  };

  const openMap = () => {
    navigation.navigate(EScreenName.UNITY);
  };

  const getCoin = async () => {
    const result = await sendMessageToUnityWithResponse({
      type: EMessageTypeUN.COIN,
      payload: {
        action: 'get',
      },
    });

    setCurrentCoin(result.current_balance);
  };

  const changeCoin = async (coin: number) => {
    const result = await sendMessageToUnityWithResponse({
      type: EMessageTypeUN.COIN,
      payload: {
        action: 'update',
        amount: coin,
      },
    });
    setCurrentCoin(result.current_balance);
  };

  useEffect(() => {
    getCoin();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={callApi} style={styles.button}>
        <Text>Call Api</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={openMap} style={styles.button}>
        <Text>Map Lesson</Text>
      </TouchableOpacity>
      <Text>Current coin: {currentCoin}</Text>
      <Button title="Tăng" onPress={() => changeCoin(1)} />
      <Button title="Giảm" onPress={() => changeCoin(-1)} />
    </View>
  );
}
