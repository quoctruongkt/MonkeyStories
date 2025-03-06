import {IMessageUnityBase} from './unityBase';

import {EMessageTypeUN, OpenUnityDestination} from '@/constants';

interface IOpenUnityPayload
  extends IMessageUnityBase<EMessageTypeUN.OPEN_UNITY> {
  payload: {
    destination: (typeof OpenUnityDestination)[keyof typeof OpenUnityDestination];
  };
}

interface IOrientationPayload
  extends IMessageUnityBase<EMessageTypeUN.ORIENTATION> {
  payload: {};
}

interface ICloseUnityPayload
  extends IMessageUnityBase<EMessageTypeUN.CLOSE_UNITY> {
  payload: {};
}

interface ICoinPayload extends IMessageUnityBase<EMessageTypeUN.COIN> {
  payload: {
    action: 'get' | 'update';
    amount?: number;
  };
}

interface IUserPayload extends IMessageUnityBase<EMessageTypeUN.USER> {
  payload: {
    action: 'get';
  };
}

export type TMessageUnity =
  | IOpenUnityPayload
  | IOrientationPayload
  | ICloseUnityPayload
  | ICoinPayload
  | IUserPayload;
