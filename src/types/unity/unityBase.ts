import {TMessageUnity} from './unityPayload';

import {EMessageTypeUN} from '@/constants';

// Callback xử lý business logic: nhận message và trả về Promise với kết quả hoặc lỗi
export type OnMessageHandler = (message: TMessageUnity) => Promise<any>;

export type THandlerMessageUnity = (message: TMessageUnity) => Promise<any>;

export type TUnregisterHandler = (type: EMessageTypeUN) => void;

export interface IMessageUnityBase<T extends EMessageTypeUN> {
  id?: string;
  type: T;
}

export interface IResultFromRNBase<T extends EMessageTypeUN> {
  id?: string;
  type: T;
  payload: {
    success: boolean;
  };
}
