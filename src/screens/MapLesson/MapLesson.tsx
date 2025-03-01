import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useEffect, useState} from 'react';
import {Platform} from 'react-native';

import {ELessonStatus, EMessageTypeUN} from '@/constants';
import {useUnity} from '@/contexts';
import {unZipActivitiesPath, useAppNavigation, wordsPath} from '@/hooks';

const games = [
  {gameId: 1000157, lessonId: 1, activityId: '1528589-60755-dne'},
  {gameId: 1000158, lessonId: 2, activityId: '1528588-60755-uut'},
  {gameId: 1000091, lessonId: 3, activityId: '1514950-55245-jzz'},
  {gameId: 1000124, lessonId: 4, activityId: '1528589-60755-dne'},
  {gameId: 0, lessonId: 5, activityId: null},
];

export function MapLesson() {
  const navigation = useAppNavigation();
  const {
    sendMessageToUnity,
    showUnity,
    hideUnity,
    registerHandler,
    unregisterHandler,
  } = useUnity();

  const [data, setData] = useState(
    Array.from({length: 300}, (_, i) => ({
      lesson_id: i + 1,
      status: ELessonStatus.Lock,
    })),
  );

  useEffect(() => {
    sendMessageToUnity({
      type: EMessageTypeUN.OPEN_MAP,
      payload: {list_lesson: data},
    });
  }, []);

  useEffect(() => {
    // Đăng ký handler cho loại message "LESSON_PRESS"
    registerHandler(EMessageTypeUN.CLOSE_MAP, async () => {
      navigation.goBack();
      return null;
    });
    registerHandler(EMessageTypeUN.LESSON_PRESS, async message => {
      const index = message.payload.lesson_id % games.length;
      const game = games[index];

      return {
        game_id: game?.gameId,
        lesson_id: message.payload.lesson_id,
        activity_path: Platform.select({
          android: `file://${unZipActivitiesPath}/${game?.activityId}`,
          default: `${unZipActivitiesPath}/${game?.activityId}`,
        }),
        word_path: Platform.select({
          android: `file://${wordsPath}`,
          default: wordsPath,
        }),
      };
    });
    registerHandler(EMessageTypeUN.LESSON_DONE, async message => {
      const newData = data.map(item =>
        item.lesson_id === message.payload.lesson_id
          ? {...item, status: message.payload.status}
          : item,
      );
      setData(newData);

      return {
        list_lesson: newData,
      };
    });

    return () => {
      unregisterHandler(EMessageTypeUN.CLOSE_MAP);
      unregisterHandler(EMessageTypeUN.LESSON_PRESS);
      unregisterHandler(EMessageTypeUN.LESSON_DONE);
    };
  }, [registerHandler, unregisterHandler]);

  useFocusEffect(
    useCallback(() => {
      showUnity();

      return hideUnity;
    }, []),
  );

  return null;
}
