import {useUnity} from '@/contexts';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';

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
