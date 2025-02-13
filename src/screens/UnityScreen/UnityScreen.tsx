import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';

import {useUnity} from '@/contexts';

export function UnityScreen() {
  const {showUnity, hideUnity} = useUnity();

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
