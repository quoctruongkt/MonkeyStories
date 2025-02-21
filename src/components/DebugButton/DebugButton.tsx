import React, {useEffect} from 'react';
import {TouchableOpacity, useWindowDimensions} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useStyles} from 'react-native-unistyles';

import {Icon} from '../bases';

import {stylesheet} from './DebugButton.style';

import {BUTTON_DEBUG_SIZE} from '@/constants';
import {useAppDispatch, useAppSelector} from '@/hooks';
import {
  hideContentDebug,
  showContentDebug,
  updateLastLocation,
} from '@/store/slices/debugSlice';

const PressableAnimated = Animated.createAnimatedComponent(TouchableOpacity);

type TDebugProps = {};

export const DebugButton: React.FC<TDebugProps> = () => {
  const {styles} = useStyles(stylesheet);
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();
  const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = useWindowDimensions();
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(insets.top);
  const {lastLocation, isContentVisible} = useAppSelector(state => state.debug);

  const stylez = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}, {translateY: translateY.value}],
  }));

  const updateLastValues = (x: number, y: number) => {
    if (!isContentVisible) {
      dispatch(updateLastLocation({x, y}));
    }
  };

  const handleFinal = () => {
    'worklet';
    const middleX = SCREEN_WIDTH / 2;
    const destinationX =
      translateX.value + BUTTON_DEBUG_SIZE / 2 < middleX
        ? 0
        : SCREEN_WIDTH - BUTTON_DEBUG_SIZE;

    // Giới hạn trục Y trong khoảng an toàn (không vượt qua insets trên và dưới)
    let destinationY = translateY.value;
    if (destinationY < insets.top) {
      destinationY = insets.top;
    }
    if (destinationY > SCREEN_HEIGHT - BUTTON_DEBUG_SIZE - insets.bottom) {
      destinationY = SCREEN_HEIGHT - BUTTON_DEBUG_SIZE - insets.bottom;
    }

    // Dùng withTiming để thực hiện animation chuyển vị trí
    translateX.value = withTiming(destinationX, {duration: 300});
    translateY.value = withTiming(destinationY, {duration: 300});
    runOnJS(updateLastValues)(destinationX, destinationY);
  };

  const pan = Gesture.Pan()
    .onChange(event => {
      translateX.value += event.changeX;
      translateY.value += event.changeY;
    })
    .onFinalize(() => {
      handleFinal();
    });

  const toggle = () => {
    if (isContentVisible) {
      dispatch(hideContentDebug());
    } else {
      dispatch(showContentDebug());
    }
  };

  useEffect(() => {
    handleFinal();
  }, [SCREEN_WIDTH, SCREEN_HEIGHT]);

  useEffect(() => {
    if (isContentVisible) {
      translateX.value = withTiming(
        SCREEN_WIDTH - insets.right - BUTTON_DEBUG_SIZE,
        {
          duration: 300,
        },
      );
      translateY.value = withTiming(insets.top, {duration: 300});
    } else {
      translateX.value = withTiming(lastLocation.x, {
        duration: 300,
      });
      translateY.value = withTiming(lastLocation.y, {duration: 300});
    }
  }, [isContentVisible]);

  return (
    <GestureDetector gesture={pan}>
      <PressableAnimated style={[styles.button, stylez]} onPress={toggle}>
        <Icon name="setting" size={BUTTON_DEBUG_SIZE} />
      </PressableAnimated>
    </GestureDetector>
  );
};
