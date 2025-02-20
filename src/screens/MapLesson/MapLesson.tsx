import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useEffect} from 'react';

import {ELessonStatus, EMessageTypeUN} from '@/constants';
import {useUnity} from '@/contexts';

const list_map = [
  {lesson_id: 1, status: ELessonStatus.Lock},
  {lesson_id: 2, status: ELessonStatus.Lock},
  {lesson_id: 3, status: ELessonStatus.Lock},
  {lesson_id: 4, status: ELessonStatus.Lock},
  {lesson_id: 5, status: ELessonStatus.Lock},
  {lesson_id: 6, status: ELessonStatus.Lock},
  {lesson_id: 7, status: ELessonStatus.Lock},
  {lesson_id: 8, status: ELessonStatus.Lock},
  {lesson_id: 9, status: ELessonStatus.Lock},
  {lesson_id: 10, status: ELessonStatus.Lock},
  {lesson_id: 11, status: ELessonStatus.Lock},
  {lesson_id: 12, status: ELessonStatus.Lock},
  {lesson_id: 13, status: ELessonStatus.Lock},
  {lesson_id: 14, status: ELessonStatus.Lock},
  {lesson_id: 15, status: ELessonStatus.Lock},
];

export function MapLesson() {
  const {sendMessageToUnity, showUnity, hideUnity} = useUnity();

  useEffect(() => {
    sendMessageToUnity({
      type: EMessageTypeUN.OPEN_MAP,
      payload: {list_lesson: list_map},
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      showUnity();

      return hideUnity;
    }, []),
  );

  return null;
}
