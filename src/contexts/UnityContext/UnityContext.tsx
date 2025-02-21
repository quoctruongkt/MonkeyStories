// UnityContext.js
import React, {createContext, useState, useContext, useCallback} from 'react';

import {TUnityContext, TUnityProvider} from './UnityContext.type';
import {UnityEvents} from './UnityEvent';

import {EMessageTypeUN} from '@/constants';
import {THandlerMessageUnity, TMessageUnity} from '@/types';

const UnityContext = createContext<TUnityContext>({
  isUnityVisible: false,
  showUnity: () => {},
  hideUnity: () => {},
  sendMessageToUnity: () => {},
  registerHandler: () => {},
  unregisterHandler: () => {},
  onBusinessLogic: async () => {},
});

export const UnityProvider = ({children}: TUnityProvider) => {
  const [isUnityVisible, setUnityVisible] = useState(false);
  // Lưu các handler theo kiểu: { [type]: handler }
  const [handlers, setHandlers] = useState<
    Record<EMessageTypeUN, THandlerMessageUnity>
  >({});

  const showUnity = () => setUnityVisible(true);
  const hideUnity = () => setUnityVisible(false);
  const sendMessageToUnity = (message: TMessageUnity) => {
    UnityEvents.emitSendMessageToUnity(message);
  };

  // Đăng ký một handler cho một message type cụ thể
  const registerHandler = useCallback(
    (type: EMessageTypeUN, handler: THandlerMessageUnity) => {
      setHandlers(prev => ({...prev, [type]: handler}));
    },
    [],
  );

  // Hủy đăng ký handler khi không cần thiết
  const unregisterHandler = useCallback((type: EMessageTypeUN) => {
    setHandlers(prev => {
      const newHandlers = {...prev};
      delete newHandlers[type];
      return newHandlers;
    });
  }, []);

  // Hàm xử lý được gọi khi UnityContainer gửi message
  const onBusinessLogic = useCallback(
    async (data: TMessageUnity) => {
      const handler = handlers[data.type];
      if (handler) {
        const result = await handler(data);
        return result;
      } else {
        // Nếu không có handler đăng ký từ màn hình, xử lý mặc định trong UnityProvider
        handlerLogicDefaults(data);
      }
    },
    [handlers],
  );

  const handlerLogicDefaults = useCallback((data: TMessageUnity) => {
    switch (data.type) {
      default:
        console.warn(
          'handlerLogicDefaults',
          `Không tìm thấy handler cho type ${data.type}`,
        );
        return null;
    }
  }, []);

  return (
    <UnityContext.Provider
      value={{
        isUnityVisible,
        showUnity,
        hideUnity,
        sendMessageToUnity,
        registerHandler,
        unregisterHandler,
        onBusinessLogic,
      }}>
      {children}
    </UnityContext.Provider>
  );
};

// Hook để sử dụng context dễ dàng
export const useUnity = () => useContext(UnityContext);
