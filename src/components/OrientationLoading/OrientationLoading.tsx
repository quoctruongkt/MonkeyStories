import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {ActivityIndicator, Text} from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import {styles} from './OrientationLoading.style';

// Group related constants
const ANIMATION_CONFIG = {
  RADIUS: {
    START: 30,
    END: 0,
  },
  SCALE: {
    START: 0.9,
    END: 1,
  },
  OPACITY: {
    START: 0,
    END: 1,
  },
} as const;

// Add timing configuration
const TIMING_CONFIG = {
  duration: 300,
} as const;

type TOrientationLoading = {
  /**
   * Ẩn hiện loading
   */
  show: boolean;
  /**
   * Text hiển thị trong loading
   */
  loadingText?: string;
};

/**
 * Component hiển thị loading khi thay đổi hướng màn hình (orientation)
 * @param param0
 * @returns
 */
export const OrientationLoading = ({
  show,
  loadingText = 'Đang xoay',
}: TOrientationLoading) => {
  const borderRadius = useSharedValue<number>(ANIMATION_CONFIG.RADIUS.START);
  const scale = useSharedValue<number>(ANIMATION_CONFIG.SCALE.START);
  const opacity = useSharedValue<number>(ANIMATION_CONFIG.OPACITY.START);
  const [isVisible, setIsVisible] = useState(show);

  // Memoize animated style to prevent unnecessary recalculations
  const stylez = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
    borderRadius: borderRadius.value,
    opacity: opacity.value,
  }));

  // Extract animation logic into separate functions
  const showAnimation = useCallback(() => {
    setIsVisible(true);
    borderRadius.value = ANIMATION_CONFIG.RADIUS.START;
    scale.value = ANIMATION_CONFIG.SCALE.START;
    opacity.value = ANIMATION_CONFIG.OPACITY.END;

    borderRadius.value = withTiming(ANIMATION_CONFIG.RADIUS.END, TIMING_CONFIG);
    scale.value = withTiming(ANIMATION_CONFIG.SCALE.END, TIMING_CONFIG);
    opacity.value = withTiming(ANIMATION_CONFIG.OPACITY.END, TIMING_CONFIG);
  }, [borderRadius, scale, opacity]);

  const hideAnimation = useCallback(() => {
    borderRadius.value = withTiming(
      ANIMATION_CONFIG.RADIUS.START,
      TIMING_CONFIG,
    );
    opacity.value = withTiming(ANIMATION_CONFIG.OPACITY.START, TIMING_CONFIG);
    scale.value = withTiming(
      ANIMATION_CONFIG.SCALE.START,
      TIMING_CONFIG,
      () => {
        runOnJS(setIsVisible)(false);
      },
    );
  }, [borderRadius, scale, opacity]);

  useEffect(() => {
    if (show) {
      showAnimation();
    } else {
      hideAnimation();
    }
  }, [show, showAnimation, hideAnimation]);

  // Memoize container style
  const containerStyle = useMemo(
    () => [styles.container, stylez],
    [styles.container, stylez],
  );

  if (!isVisible) {
    return null;
  }

  return (
    <Animated.View style={containerStyle}>
      <ActivityIndicator size={'large'} />
      <Text style={styles.text}>{loadingText}</Text>
    </Animated.View>
  );
};
