import {EUnityGameObject, EUnityMethodName} from '@/constants';

export type TSendMessageUnity = {
  gameObject?: EUnityGameObject;
  methodName?: EUnityMethodName;
  message: any;
};
