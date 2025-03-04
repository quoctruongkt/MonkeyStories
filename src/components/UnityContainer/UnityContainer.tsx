import UnityView from '@azesmway/react-native-unity';
import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {Button, Dimensions, Text, View} from 'react-native';
import Orientation, {OrientationType} from 'react-native-orientation-locker';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import {getOrientationType, onLockOrientation} from './UnityContainer.helper';
import {styles} from './UnityContainer.style';

import {
  EMessageTypeUN,
  EOrientationNavigationTypes,
  EUnityEventTypes,
} from '@/constants';
import {UnityEvents, useUnity} from '@/contexts';
import {navigationRef} from '@/navigation';
import {UnityBridge} from '@/services/unity/UnityBridge';
import {TMessageUnity} from '@/types';

const {width, height} = Dimensions.get('screen');
const POSITION_HIDE = width + height;
const POSITION_SHOW = 0;
type TMessageFromUnity = {nativeEvent: {message: string}};

/**
 * Component quản lý tích hợp và hiển thị Unity trong React Native
 * */
export const UnityContainer = () => {
  // Khởi tạo ref cho UnityView (ban đầu sẽ là null, nhưng không ảnh hưởng vì ref là object ổn định)
  const unityRef = useRef(null);
  const currentOrientation = useRef<OrientationType>(OrientationType.PORTRAIT);
  const {isUnityVisible, onBusinessLogic} = useUnity();
  const position = useSharedValue(POSITION_HIDE);

  // const [currentCoin, setCurrentCoin] = useState(0);

  const stylez = useAnimatedStyle(() => ({
    transform: [{translateX: position.value}],
  }));

  const unityBridge = useMemo(
    () => new UnityBridge(unityRef, onBusinessLogic),
    [onBusinessLogic],
  );

  const handleUnityMessage = useCallback(
    ({nativeEvent}: TMessageFromUnity) => {
      unityBridge.handleUnityMessage(nativeEvent.message);
    },
    [unityBridge],
  );

  const handleSendMessage = useCallback(
    (message: TMessageUnity) => {
      unityBridge.sendMessageToUnity(message);
    },
    [unityBridge],
  );

  // Update useEffect to use memoized handler
  useEffect(() => {
    UnityEvents.addUnityMessageListener(
      EUnityEventTypes.SEND_MESSAGE,
      handleSendMessage,
    );

    return () => {
      UnityEvents.removeUnityMessageListener(
        EUnityEventTypes.SEND_MESSAGE,
        handleSendMessage,
      );
    };
  }, [handleSendMessage]);

  // Điều chỉnh vị trí hiển thị của UnityView dựa theo trạng thái isUnityVisible
  useEffect(() => {
    position.value = withTiming(isUnityVisible ? POSITION_SHOW : POSITION_HIDE);
  }, [isUnityVisible]);

  // Lắng nghe thay đổi Orientation và các option của navigation
  useEffect(() => {
    const onOrientationOptionChanged = (
      orientation: EOrientationNavigationTypes,
    ) => {
      onLockOrientation(orientation);
    };

    const onOrientationChanged = (orientation: OrientationType) => {
      currentOrientation.current = orientation;
      const orientationUnity = getOrientationType(orientation);
      unityBridge.sendMessageToUnity({
        type: EMessageTypeUN.ORIENTATION,
        payload: {orientation: orientationUnity},
      });
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
  }, [unityBridge]);

  const getCoin = () => {};

  return (
    <Animated.View style={[styles.unityContainer, stylez]}>
      <UnityView
        ref={unityRef}
        style={styles.unityView}
        onUnityMessage={handleUnityMessage}
      />
      <View style={styles.coin}>
        <Text>Current coin: 0</Text>
        <Button title="Tăng" />
        <Button title="Giảm" />
        <Button title="Get" onPress={getCoin} />
      </View>
    </Animated.View>
  );
};
