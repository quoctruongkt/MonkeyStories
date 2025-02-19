import {TMessageUnity} from '@/types';

export type TUnityContext = {
  isUnityVisible: boolean;
  showUnity: () => void;
  hideUnity: () => void;
  sendMessageToUnity: (message: TMessageUnity) => void;
};

export type TUnityProvider = {
  children: React.ReactNode;
};
