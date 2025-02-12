// UnityContainer.js
import {useUnity} from '@/contexts';
import React, {useEffect, useRef} from 'react';
import {Dimensions} from 'react-native';
import {useStyles} from 'react-native-unistyles';
import {stylesheet} from './UnityContainer.style';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import UnityView from '@azesmway/react-native-unity';
import {navigationRef} from '@/navigation';
import {
  EOrientationNavigationTypes,
  EUnityGameObject,
  EUnityMethodName,
} from '@/constants';
import Orientation, {OrientationType} from 'react-native-orientation-locker';
import {TSendMessageUnity} from './UnityContainer.type';
import {getOrientationType, onLockOrientation} from './UnityContainer.helper';

const {width, height} = Dimensions.get('screen');
const POSITION_HIDE = width + height;
const POSITION_SHOW = 0;

export const UnityContainer = () => {
  const unityRef = useRef<UnityView>(null);
  const {styles} = useStyles(stylesheet);
  const {isUnityVisible} = useUnity();
  const position = useSharedValue(POSITION_HIDE);

  const stylez = useAnimatedStyle(() => ({
    transform: [{translateX: position.value}],
  }));

  const sendMessageToUnity = (params: TSendMessageUnity) => {
    console.log(params);

    unityRef.current?.postMessage(
      params.gameObject ?? EUnityGameObject.Message,
      params.methodName ?? EUnityMethodName.Orientation,
      params.message,
    );
  };

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
      sendMessageToUnity({message: orientationUnity});
    };
    const unsubscribe = navigationRef.addListener('options', options => {
      const {orientation} = options.data.options;
      onOrientationOptionChanged(orientation);
    });

    Orientation.addLockListener(onOrientationChanged);

    return () => {
      unsubscribe();
      Orientation.removeLockListener(onOrientationChanged);
    };
  }, []);

  return (
    <Animated.View style={[styles.unityContainer, stylez]}>
      <UnityView ref={unityRef} style={styles.unityView} />
    </Animated.View>
  );
};
