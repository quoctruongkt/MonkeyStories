// UnityContext.js
import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useRef,
} from 'react';

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
  // Sử dụng useRef thay vì useState để tránh re-render không cần thiết
  const handlersRef = useRef<Record<EMessageTypeUN, THandlerMessageUnity>>({});

  const showUnity = () => setUnityVisible(true);
  const hideUnity = () => setUnityVisible(false);
  const sendMessageToUnity = (message: TMessageUnity) => {
    try {
      UnityEvents.emitSendMessageToUnity(message);
    } catch (error) {
      console.error('Lỗi khi gửi message đến Unity:', error);
    }
  };

  // Đăng ký một handler cho một message type cụ thể
  const registerHandler = useCallback(
    (type: EMessageTypeUN, handler: THandlerMessageUnity) => {
      handlersRef.current = {...handlersRef.current, [type]: handler};
    },
    [],
  );

  // Hủy đăng ký handler khi không cần thiết
  const unregisterHandler = useCallback((type: EMessageTypeUN) => {
    const newHandlers = {...handlersRef.current};
    delete newHandlers[type];
    handlersRef.current = newHandlers;
  }, []);

  // Hàm xử lý được gọi khi UnityContainer gửi message
  const onBusinessLogic = useCallback(async (data: TMessageUnity) => {
    try {
      const handler = handlersRef.current[data.type];
      if (handler) {
        const result = await handler(data);
        return result;
      } else {
        // Nếu không có handler đăng ký từ màn hình, xử lý mặc định trong UnityProvider
        return handlerLogicDefaults(data);
      }
    } catch (error) {
      console.error('Lỗi trong onBusinessLogic:', error);
      throw new Error(`Lỗi xử lý message type ${data.type}: ${error.message}`);
    }
  }, []);

  const handlerLogicDefaults = useCallback((data: TMessageUnity) => {
    try {
      switch (data.type) {
        default:
          console.warn(
            'handlerLogicDefaults',
            `Không tìm thấy handler cho type ${data.type}`,
          );
          return null;
      }
    } catch (error) {
      console.error('Lỗi trong handlerLogicDefaults:', error);
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
