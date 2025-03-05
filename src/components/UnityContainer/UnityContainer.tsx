import UnityView from '@azesmway/react-native-unity';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {Dimensions} from 'react-native';
import Orientation, {OrientationType} from 'react-native-orientation-locker';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import {getOrientationType, onLockOrientation} from './UnityContainer.helper';
import {styles} from './UnityContainer.style';

import {EMessageTypeUN, EOrientationNavigationTypes} from '@/constants';
import {useUnity} from '@/contexts';
import {navigationRef} from '@/navigation';
import {UnityBridge} from '@/services/unity/UnityBridge';
import {TMessageUnity} from '@/types';

const {width, height} = Dimensions.get('screen');
const POSITION_HIDE = width + height;
const POSITION_SHOW = 0;
type TMessageFromUnity = {nativeEvent: {message: string}};

interface IUnityContainerProps {}
export interface UnityContainerRef {
  onSendMessage: (message: TMessageUnity) => void;
  onSendMessageWithResponse: (message: TMessageUnity) => Promise<any>;
}

/**
 * Component quản lý tích hợp và hiển thị Unity trong React Native
 * */

export const UnityContainer = forwardRef<
  UnityContainerRef,
  IUnityContainerProps
>((props, ref) => {
  // Khởi tạo ref cho UnityView (ban đầu sẽ là null, nhưng không ảnh hưởng vì ref là object ổn định)
  const unityRef = useRef(null);
  const currentOrientation = useRef<OrientationType>(OrientationType.PORTRAIT);
  const {isUnityVisible, onBusinessLogic} = useUnity();
  const position = useSharedValue(POSITION_HIDE);

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

  const handleSendMessageWithResponse = useCallback(
    (message: TMessageUnity) => {
      return unityBridge.sendMessageToUnityWithResponse(message);
    },
    [unityBridge],
  );

  useImperativeHandle(ref, () => ({
    onSendMessage: handleSendMessage,
    onSendMessageWithResponse: handleSendMessageWithResponse,
  }));

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

  return (
    <Animated.View style={[styles.unityContainer, stylez]}>
      <UnityView
        ref={unityRef}
        style={styles.unityView}
        onUnityMessage={handleUnityMessage}
      />
    </Animated.View>
  );
});
