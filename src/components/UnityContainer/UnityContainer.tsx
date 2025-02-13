// UnityContainer.js
import UnityView from '@azesmway/react-native-unity';
import React, {useEffect, useMemo, useRef} from 'react';
import {Dimensions, Text, TouchableOpacity} from 'react-native';
import Orientation, {OrientationType} from 'react-native-orientation-locker';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useStyles} from 'react-native-unistyles';

import {getOrientationType, onLockOrientation} from './UnityContainer.helper';
import {stylesheet} from './UnityContainer.style';

import {EOrientationNavigationTypes} from '@/constants';
import {useUnity} from '@/contexts';
import {useAppNavigation} from '@/hooks';
import {navigationRef} from '@/navigation';
import {UnityBridge} from '@/services/unity/UnityBridge';
import {TMessageUnity} from '@/types';

const {width, height} = Dimensions.get('screen');
const POSITION_HIDE = width + height;
const POSITION_SHOW = 0;

export const UnityContainer = () => {
  const unityRef = useRef<UnityView>(null);
  const {styles} = useStyles(stylesheet);
  const {isUnityVisible} = useUnity();
  const position = useSharedValue(POSITION_HIDE);
  const navigation = useAppNavigation();

  const stylez = useAnimatedStyle(() => ({
    transform: [{translateX: position.value}],
  }));

  const onBusinessLogic = async (data: TMessageUnity) => {
    switch (data) {
    }
  };

  const {handleUnityMessage, sendMessageToUnity} = useMemo(
    () => new UnityBridge(unityRef, onBusinessLogic),
    [unityRef.current],
  );

  useEffect(() => {
    position.value = withTiming(isUnityVisible ? POSITION_SHOW : POSITION_HIDE);
  }, [isUnityVisible]);

  useEffect(() => {
    const onOrientationOptionChanged = (
      orientation: EOrientationNavigationTypes,
    ) => {
      onLockOrientation(orientation);
    };

    const onOrientationChanged = (orientation: OrientationType) => {
      let orientationUnity = getOrientationType(orientation);
      sendMessageToUnity(orientationUnity);
    };
    const unsubscribe = navigationRef.addListener('options', ({data}) => {
      const options = data.options as any;
      onOrientationOptionChanged(options?.orientation);
    });

    Orientation.addLockListener(onOrientationChanged);

    return () => {
      unsubscribe();
      Orientation.removeLockListener(onOrientationChanged);
    };
  }, []);

  return (
    <Animated.View style={[styles.unityContainer, stylez]}>
      <UnityView
        ref={unityRef}
        style={styles.unityView}
        onUnityMessage={({nativeEvent}) => {
          handleUnityMessage(nativeEvent.message);
        }}
      />
      <TouchableOpacity onPress={navigation.goBack} style={styles.button}>
        <Text>Back</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};
