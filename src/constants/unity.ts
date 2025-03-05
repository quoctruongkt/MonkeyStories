export enum EUnityGameObject {
  REACT_NATIVE_BRIDGE = 'ReactNativeBridge',
}

export enum EUnityMethodName {
  REQUEST_UNITY_ACTION = 'RequestUnityAction',
  RESULT_FROM_RN = 'OnResultFromNative',
}

export enum EMessageTypeUN {
  ORIENTATION = 'orientation',
  OPEN_UNITY = 'open_unity',
  CLOSE_UNITY = 'CloseUnity',
  LESSON_PRESS = 'GetDataLesson',
  LESSON_DONE = 'FinishLesson',
  COIN = 'coin',
}

export enum ELessonStatus {
  Lock = 1,
  Doing = 2,
  Done = 3,
}
