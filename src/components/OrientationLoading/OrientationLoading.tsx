import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Text} from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useStyles} from 'react-native-unistyles';

import {stylesheet} from './OrientationLoading.style';

const RADIUS_START = 30;
const SCALE_START = 0.9;
const RADIUS_END = 0;
const SCALE_END = 1;
const OPACITY_START = 0;
const OPACITY_END = 1;

type TOrientationLoading = {
  show: boolean;
};

export const OrientationLoading = ({show}: TOrientationLoading) => {
  const {styles} = useStyles(stylesheet);
  const borderRadius = useSharedValue(RADIUS_START);
  const scale = useSharedValue(SCALE_START);
  const opacity = useSharedValue(OPACITY_START);
  const [isVisible, setIsVisible] = useState(show);

  const stylez = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
    borderRadius: borderRadius.value,
    opacity: opacity.value,
  }));

  useEffect(() => {
    if (show) {
      setIsVisible(show);
      borderRadius.value = RADIUS_START;
      scale.value = SCALE_START;
      opacity.value = OPACITY_END;

      borderRadius.value = withTiming(RADIUS_END);
      scale.value = withTiming(SCALE_END);
      opacity.value = withTiming(OPACITY_END);

      return;
    }

    borderRadius.value = withTiming(RADIUS_START);
    opacity.value = withTiming(OPACITY_START);
    scale.value = withTiming(SCALE_START, {}, () => {
      runOnJS(setIsVisible)(false);
    });
  }, [show]);

  if (!isVisible) {
    return null;
  }

  return (
    <Animated.View style={[styles.container, stylez]}>
      <ActivityIndicator size={'large'} />
      <Text style={styles.text}>Đang xoay</Text>
    </Animated.View>
  );
};
