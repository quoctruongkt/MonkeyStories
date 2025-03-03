import {BottomSheetModal, BottomSheetView} from '@gorhom/bottom-sheet';
import {createStaticNavigation, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useMemo, useRef} from 'react';
import {Text, TouchableOpacity, useWindowDimensions, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import StorybookUIRoot from '../../../.storybook';

import {ChangeEnv} from './ChangeEnv';
import {styles} from './DebugScreen.style';
import {Files} from './Files/Files';

import {BUTTON_DEBUG_SIZE} from '@/constants';
import {useAppConfig, useDebug} from '@/store';

type TDebugScreenProps = {};
const Stack = createNativeStackNavigator({
  screens: {
    home: {screen: Content, options: {title: 'DEBUG'}},
    files: Files,
    env: ChangeEnv,
    storybook: StorybookUIRoot,
  },
});
const Navigation = createStaticNavigation(Stack);

export const DebugScreen: React.FC<TDebugScreenProps> = () => {
  const bottomSheet = useRef<BottomSheetModal | null>(null);
  const insets = useSafeAreaInsets();
  const {isContentVisible, hideContentDebug} = useDebug();
  const {height: SCREEN_HEIGHT} = useWindowDimensions();
  const snapPoints = useMemo(
    () => [SCREEN_HEIGHT - insets.top - BUTTON_DEBUG_SIZE, '100%'],
    [SCREEN_HEIGHT],
  );

  const handleDismiss = () => {
    hideContentDebug();
  };

  useEffect(() => {
    if (isContentVisible) {
      bottomSheet.current?.present();
    } else {
      bottomSheet.current?.close();
    }
  }, [isContentVisible]);

  return (
    <BottomSheetModal
      ref={bottomSheet}
      style={styles.container}
      enableDynamicSizing={false}
      snapPoints={snapPoints}
      onDismiss={handleDismiss}>
      <BottomSheetView style={styles.container}>
        <Navigation />
      </BottomSheetView>
    </BottomSheetModal>
  );
};

function Content() {
  const navigation = useNavigation();
  const {env} = useAppConfig();

  const openFiles = () => {
    navigation.navigate('files');
  };

  const openEnv = () => {
    navigation.navigate('env');
  };

  const openStorybook = () => {
    navigation.navigate('storybook');
  };

  return (
    <View style={styles.bottomSheetView}>
      <View style={styles.buttons}>
        <Button label={env} onPress={openEnv} />
        <Button label="Duyệt Files" onPress={openFiles} />
        <Button label="Storybook" onPress={openStorybook} />
      </View>
    </View>
  );
}

const Button = ({label, onPress}: {label: string; onPress?: () => void}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text>{label}</Text>
    </TouchableOpacity>
  );
};
