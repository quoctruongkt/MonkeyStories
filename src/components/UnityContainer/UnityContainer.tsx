// UnityContainer.js
import {useUnity} from '@/contexts';
import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Platform, Dimensions} from 'react-native';
import {useStyles} from 'react-native-unistyles';
import {stylesheet} from './UnityContainer.style';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
// import UnityView from '@azesmway/react-native-unity';

const {width, height} = Dimensions.get('screen');
const POSITION_HIDE = width + height;
const POSITION_SHOW = 0;

export const UnityContainer = () => {
  const unityRef = useRef(null);
  const {styles} = useStyles(stylesheet);
  const {isUnityVisible} = useUnity();
  const position = useSharedValue(POSITION_HIDE);

  const stylez = useAnimatedStyle(() => ({
    transform: [{translateX: position.value}],
  }));

  useEffect(() => {
    position.value = withTiming(isUnityVisible ? POSITION_SHOW : POSITION_HIDE);
  }, [isUnityVisible]);

  return (
    <Animated.View style={[styles.unityContainer, stylez]}>
      {/* <UnityView
        ref={unityRef}
        style={styles.unityView}
        onUnityMessage={result =>
          console.log('onUnityMessage:', result.nativeEvent.message)
        }
      /> */}
    </Animated.View>
  );
};
