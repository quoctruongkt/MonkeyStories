// UnityContainer.js
import UnityView from '@azesmway/react-native-unity';
import React, {useEffect, useMemo, useRef, useCallback} from 'react';
import {Dimensions, Text, TouchableOpacity} from 'react-native';
import Orientation, {OrientationType} from 'react-native-orientation-locker';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useStyles} from 'react-native-unistyles';

import {getOrientationType, onLockOrientation} from './UnityContainer.helper';
import {stylesheet} from './UnityContainer.style';

import {
  EMessageTypeUN,
  EOrientationNavigationTypes,
  EUnityMessageTypes,
} from '@/constants';
import {UnityEvents, useUnity} from '@/contexts';
import {useAppNavigation} from '@/hooks';
import {navigationRef} from '@/navigation';
import {UnityBridge} from '@/services/unity/UnityBridge';
import {TMessageUnity} from '@/types';

const {width, height} = Dimensions.get('screen');
const POSITION_HIDE = width + height;
const POSITION_SHOW = 0;

export const UnityContainer = () => {
  // Khởi tạo ref cho UnityView (ban đầu sẽ là null, nhưng không ảnh hưởng vì ref là object ổn định)
  const unityRef = useRef(null);
  const {styles} = useStyles(stylesheet);
  const {isUnityVisible} = useUnity();
  const position = useSharedValue(POSITION_HIDE);
  const navigation = useAppNavigation();

  const stylez = useAnimatedStyle(() => ({
    transform: [{translateX: position.value}],
  }));

  // Định nghĩa business logic xử lý message từ Unity, sử dụng useCallback để tránh tạo lại không cần thiết
  const onBusinessLogic = useCallback(async (data: TMessageUnity) => {
    switch (data.type) {
      case EMessageTypeUN.CLOSE_MAP:
        navigation.goBack();
        return null;
      default:
        return;
    }
  }, []);

  const unityBridge = useMemo(
    () => new UnityBridge(unityRef, onBusinessLogic),
    [onBusinessLogic],
  );

  useEffect(() => {
    const handleSendMessage = (message: TMessageUnity) => {
      console.log('📥 send message to Unity', message);

      unityBridge.sendMessageToUnity(message);
    };

    UnityEvents.addUnityMessageListener(
      EUnityMessageTypes.SEND_MESSAGE,
      handleSendMessage,
    );

    return () => {
      UnityEvents.removeUnityMessageListener(
        EUnityMessageTypes.SEND_MESSAGE,
        handleSendMessage,
      );
    };
  }, []);

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
        onUnityMessage={({nativeEvent}) => {
          unityBridge.handleUnityMessage(nativeEvent.message);
        }}
      />
    </Animated.View>
  );
};
