import React, {useEffect} from 'react';
import {Pressable} from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import {styles} from './Switch.style';

type TSwitchProps = {
  value?: boolean;
  onChange?: (value: boolean) => void;
  disabled?: boolean;
  backgroundTrueColor?: string;
  backgroundFalseColor?: string;
  dotColor?: string;
};

const POSITION_FALSE = 0;
const POSITION_TRUE = 21;
const PROGRESS_FALSE = 0;
const PROGRESS_TRUE = 1;
const BACKGROUND_FALSE = '#CCCCCC';
const BACKGROUND_TRUE = '#76EE59';
const DOT_COLOR = '#FFFFFF';

export const Switch: React.FC<TSwitchProps> = ({
  value = true,
  onChange,
  disabled,
  backgroundTrueColor = BACKGROUND_TRUE,
  backgroundFalseColor = BACKGROUND_FALSE,
  dotColor = DOT_COLOR,
}) => {
  const progress = useSharedValue(0);

  const wrapStylez = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [PROGRESS_FALSE, PROGRESS_TRUE],
      [backgroundFalseColor, backgroundTrueColor],
    );
    return {backgroundColor};
  });

  const stylez = useAnimatedStyle(() => {
    const translateX = interpolate(
      progress.value,
      [PROGRESS_FALSE, PROGRESS_TRUE],
      [POSITION_FALSE, POSITION_TRUE],
    );
    return {
      transform: [{translateX}],
    };
  });

  const handlePress = () => {
    onChange?.(!value);
  };

  useEffect(() => {
    progress.value = withTiming(value ? PROGRESS_TRUE : PROGRESS_FALSE);
  }, [value]);

  return (
    <Pressable
      style={styles.button(disabled)}
      disabled={disabled}
      onPress={handlePress}>
      <Animated.View style={[styles.background, wrapStylez]}>
        <Animated.View
          style={[styles.dot, stylez, {backgroundColor: dotColor}]}
        />
      </Animated.View>
    </Pressable>
  );
};
