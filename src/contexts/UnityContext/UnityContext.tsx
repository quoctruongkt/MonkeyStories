// UnityContext.js
import React, {createContext, useState, useContext} from 'react';

import {TUnityContext, TUnityProvider} from './UnityContext.type';
import {UnityEvents} from './UnityEvent';

import {TMessageUnity} from '@/types';

const UnityContext = createContext<TUnityContext>({
  isUnityVisible: false,
  showUnity: () => {},
  hideUnity: () => {},
  sendMessageToUnity: () => {},
});

export const UnityProvider = ({children}: TUnityProvider) => {
  const [isUnityVisible, setUnityVisible] = useState(false);

  const showUnity = () => setUnityVisible(true);
  const hideUnity = () => setUnityVisible(false);
  const sendMessageToUnity = (message: TMessageUnity) => {
    UnityEvents.emitSendMessageToUnity(message);
  };

  return (
    <UnityContext.Provider
      value={{isUnityVisible, showUnity, hideUnity, sendMessageToUnity}}>
      {children}
    </UnityContext.Provider>
  );
};

// Hook để sử dụng context dễ dàng
export const useUnity = () => useContext(UnityContext);
