export enum EMessageTypeUN {
  ORIENTATION = 'orientation',
  OPEN_UNITY = 'open_unity',
  CLOSE_UNITY = 'CloseUnity',
  COIN = 'coin',
  USER = 'user',
}

export enum EUnityStatus {
  SUCCESS = 'success',
  FAILED = 'failed',
}

export const UnityGameObject = {
  REACT_NATIVE_BRIDGE: 'ReactNativeBridge',
};

export const UnityMethodName = {
  REQUEST_UNITY_ACTION: 'RequestUnityAction',
  RESULT_FROM_RN: 'OnResultFromNative',
};

export const OpenUnityDestination = {
  OPEN_MAP: 'map_lesson',
} as const;
