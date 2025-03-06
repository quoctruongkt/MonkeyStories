import {IMessageUnityBase} from './unityBase';

import {EMessageTypeUN, EUnityStatus} from '@/constants';

interface ICoinResult {
  status: EUnityStatus;
  message?: string;
  current_balance?: number;
}

interface ICloseResult extends IMessageUnityBase<EMessageTypeUN.CLOSE_UNITY> {
  payload: {
    success: boolean;
    result: string | unknown | null;
  };
}

interface IUserGetResult extends IMessageUnityBase<EMessageTypeUN.USER> {
  payload: {
    success: boolean;
    result: {
      userId: number;
      name: string;
    };
  };
}

export type TResultFromUnity = ICoinResult;

export type TResultFromRN = ICloseResult | IUserGetResult;
