import React, {useEffect, useState} from 'react';
import {Pressable, Text, useWindowDimensions, View} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useStyles} from 'react-native-unistyles';

import {Icon} from '../bases';

import {stylesheet} from './Debug.style';

const PressableAnimated = Animated.createAnimatedComponent(Pressable);

type TDebugProps = {};

const BUTTON_SIZE = 50;

export const Debug: React.FC<TDebugProps> = () => {
  const {styles} = useStyles(stylesheet);
  const insets = useSafeAreaInsets();
  const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = useWindowDimensions();
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(insets.top);

  const [showContent, setShowContent] = useState(false);

  const stylez = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}, {translateY: translateY.value}],
  }));

  const handleFinal = () => {
    'worklet';
    const middleX = SCREEN_WIDTH / 2;
    const destinationX =
      translateX.value + BUTTON_SIZE / 2 < middleX
        ? 0
        : SCREEN_WIDTH - BUTTON_SIZE;

    // Giới hạn trục Y trong khoảng an toàn (không vượt qua insets trên và dưới)
    let destinationY = translateY.value;
    if (destinationY < insets.top) {
      destinationY = insets.top;
    }
    if (destinationY > SCREEN_HEIGHT - BUTTON_SIZE - insets.bottom) {
      destinationY = SCREEN_HEIGHT - BUTTON_SIZE - insets.bottom;
    }

    // Dùng withTiming để thực hiện animation chuyển vị trí
    translateX.value = withTiming(destinationX, {duration: 300});
    translateY.value = withTiming(destinationY, {duration: 300});
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
    setShowContent(!showContent);
  };

  useEffect(() => {
    handleFinal();
  }, [SCREEN_WIDTH, SCREEN_HEIGHT]);

  return (
    <>
      <GestureDetector gesture={pan}>
        <PressableAnimated style={[styles.button, stylez]} onPress={toggle}>
          <Icon name="setting" size={BUTTON_SIZE} />
        </PressableAnimated>
      </GestureDetector>
      <View
        style={[
          styles.container,
          {height: SCREEN_HEIGHT, marginTop: insets.top},
          {transform: [{translateY: showContent ? 50 : SCREEN_HEIGHT}]},
        ]}>
        <Text>Content</Text>
      </View>
    </>
  );
};
