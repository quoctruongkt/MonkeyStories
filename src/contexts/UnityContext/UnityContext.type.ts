import {EMessageTypeUN} from '@/constants';
import {THandlerMessageUnity, TMessageUnity, TUnregisterHandler} from '@/types';

export type TUnityContext = {
  isUnityVisible: boolean;
  showUnity: () => void;
  hideUnity: () => void;
  sendMessageToUnity: (message: TMessageUnity) => void;
  registerHandler: (
    type: EMessageTypeUN,
    handler: THandlerMessageUnity,
  ) => void;
  unregisterHandler: TUnregisterHandler;
  onBusinessLogic: THandlerMessageUnity;
};

export type TUnityProvider = {
  children: React.ReactNode;
};
