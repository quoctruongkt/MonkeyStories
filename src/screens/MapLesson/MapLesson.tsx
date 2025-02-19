import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useEffect} from 'react';

import {EMessageTypeUN} from '@/constants';
import {useUnity} from '@/contexts';

export function MapLesson() {
  const {sendMessageToUnity, showUnity, hideUnity} = useUnity();

  useEffect(() => {
    sendMessageToUnity({type: EMessageTypeUN.OPEN_MAP, payload: null});
  }, []);

  useFocusEffect(
    useCallback(() => {
      showUnity();

      return hideUnity;
    }, []),
  );

  return null;
}
