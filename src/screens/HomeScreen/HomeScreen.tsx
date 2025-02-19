import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useStyles} from 'react-native-unistyles';

import {stylesheet} from './HomeScreen.style';

import {Switch} from '@/components';
import {EScreenName} from '@/constants';
import {useAppNavigation} from '@/hooks';

export function HomeScreen() {
  const {styles} = useStyles(stylesheet);
  const navigation = useAppNavigation<EScreenName.HOME>();

  const openUnity = () => {
    navigation.navigate(EScreenName.UNITY);
  };

  const openMap = () => {
    navigation.navigate(EScreenName.MAP_LESSON);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openUnity} style={styles.button}>
        <Text>Unity</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={openMap} style={styles.button}>
        <Text>Map Lesson</Text>
      </TouchableOpacity>
      <Switch />
    </View>
  );
}
