// UnityContainer.js
import {useUnity} from '@/contexts';
import React, {useEffect, useRef} from 'react';
import {Dimensions, Text, TouchableOpacity} from 'react-native';
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
import {useAppNavigation} from '@/hooks';

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

  const sendMessageToUnity = (params: TSendMessageUnity) => {
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
      <UnityView ref={unityRef} style={styles.unityView} />
      <TouchableOpacity
        onPress={navigation.goBack}
        style={{
          position: 'absolute',
          top: 100,
          left: 100,
          width: 50,
          height: 50,
          backgroundColor: 'red',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>Back</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};
