// UnityContext.js
import React, {createContext, useState, useContext} from 'react';

import {TUnityContext, TUnityProvider} from './UnityContext.type';

const UnityContext = createContext<TUnityContext>({
  isUnityVisible: false,
  showUnity: () => {},
  hideUnity: () => {},
});

export const UnityProvider = ({children}: TUnityProvider) => {
  const [isUnityVisible, setUnityVisible] = useState(false);

  const showUnity = () => setUnityVisible(true);
  const hideUnity = () => setUnityVisible(false);

  return (
    <UnityContext.Provider value={{isUnityVisible, showUnity, hideUnity}}>
      {children}
    </UnityContext.Provider>
  );
};

// Hook để sử dụng context dễ dàng
export const useUnity = () => useContext(UnityContext);
