import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useEffect} from 'react';

import {EMessageTypeUN, OpenUnityDestination} from '@/constants';
import {useUnity} from '@/contexts';
import {useAppNavigation} from '@/hooks';

export function UnityScreen() {
  const navigation = useAppNavigation();

  const {
    showUnity,
    hideUnity,
    sendMessageToUnity,
    registerHandler,
    unregisterHandler,
  } = useUnity();

  useEffect(() => {
    sendMessageToUnity({
      type: EMessageTypeUN.OPEN_UNITY,
      payload: {destination: OpenUnityDestination.OPEN_MAP},
    });
  }, []);

  useEffect(() => {
    // Đăng ký handler cho loại message "LESSON_PRESS"
    registerHandler(EMessageTypeUN.CLOSE_UNITY, async () => {
      navigation.goBack();
      return null;
    });

    return () => {
      unregisterHandler(EMessageTypeUN.CLOSE_UNITY);
    };
  }, [registerHandler, unregisterHandler]);

  useFocusEffect(
    useCallback(() => {
      showUnity();

      return () => {
        hideUnity();
      };
    }, []),
  );

  return null;
}
