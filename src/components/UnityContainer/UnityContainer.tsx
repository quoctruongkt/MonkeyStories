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

import {EOrientationNavigationTypes} from '@/constants';
import {useUnity} from '@/contexts';
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
      // Xử lý các loại message khác nhau tại đây
      // Ví dụ:
      // case 'example':
      //   return 'Kết quả của example';
      default:
        return;
    }
  }, []);

  // Tạo UnityBridge một lần duy nhất, vì unityRef là object ổn định và onBusinessLogic có dependency rõ ràng
  const unityBridge = useMemo(
    () => new UnityBridge(unityRef, onBusinessLogic),
    [onBusinessLogic],
  );

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
      // Chuyển đổi thông tin orientation thành message theo cấu trúc TMessageUnity
      const orientationUnity = getOrientationType(orientation);
      unityBridge.sendMessageToUnity(orientationUnity);
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
      <TouchableOpacity onPress={navigation.goBack} style={styles.button}>
        <Text>Back</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};
