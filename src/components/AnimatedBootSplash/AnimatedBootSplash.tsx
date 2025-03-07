import React from 'react';
import {Dimensions, Image} from 'react-native';
import BootSplash from 'react-native-bootsplash';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import {ImagePaths} from '@/assets/images';

type TAnimatedBootSplashProps = {
  onAnimationEnd: () => void;
};

const POSITION_START = 0;
const POSITION_MIDDLE = -30;
const POSITION_END = Dimensions.get('window').height;

export const AnimatedBootSplash: React.FC<TAnimatedBootSplashProps> = ({
  onAnimationEnd,
}) => {
  const position = useSharedValue(POSITION_START);

  const {container, logo /*, brand */} = BootSplash.useHideAnimation({
    manifest: require('../../../assets/bootsplash/manifest.json'),
    logo: ImagePaths.LOGO,

    animate: () => {
      position.value = withSequence(
        withTiming(POSITION_MIDDLE, {duration: 150}), // Bước nảy lên
        withTiming(POSITION_START, {duration: 100}), // Quay về vị trí ban đầu
        withTiming(POSITION_END, {duration: 400}, () => {
          runOnJS(onAnimationEnd)();
        }), // Di chuyển xuống dưới
      );
    },
  });

  const stylez = useAnimatedStyle(() => {
    const opacity = interpolate(
      position.value,
      [POSITION_START, POSITION_MIDDLE, POSITION_END],
      [1, 1, 0.2],
    );
    return {
      opacity,
    };
  });

  const imageStylez = useAnimatedStyle(() => {
    const scale = interpolate(
      position.value,
      [POSITION_START, POSITION_MIDDLE, POSITION_END],
      [1, 1.1, 0],
    );
    return {transform: [{translateY: position.value}, {scale: scale}]};
  });

  return (
    <Animated.View {...container} style={[container.style, stylez]}>
      <Animated.View style={imageStylez}>
        <Image {...logo} />
      </Animated.View>
    </Animated.View>
  );
};
