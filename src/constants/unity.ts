export enum EUnityGameObject {
  REACT_NATIVE_BRIDGE = 'ReactNativeBridge',
}

export enum EUnityMethodName {
  REQUEST_UNITY_ACTION = 'RequestUnityAction',
  RESULT_FROM_RN = 'RequestUnityAction',
}

export enum EMessageTypeUN {
  ORIENTATION = 'orientation',
  OPEN_MAP = 'open_map',
  CLOSE_MAP = 'CloseUnity',
  LESSON_PRESS = 'GetDataLesson',
  LESSON_DONE = 'FinishLesson',
}

export enum EUnityMessageTypes {
  SEND_MESSAGE = 'send_message',
  RECEIVE_MESSAGE = 'receive_message',
}

export enum ELessonStatus {
  Lock = 1,
  Doing = 2,
  Done = 3,
}
