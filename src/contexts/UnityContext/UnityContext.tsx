// UnityContext.js
import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useRef,
} from 'react';

import {TUnityContext, TUnityProvider} from './UnityContext.type';

import {UnityContainer, UnityContainerRef} from '@/components';
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
  sendMessageToUnityWithResponse: async () => {},
});

export const UnityProvider = ({children}: TUnityProvider) => {
  const [isUnityVisible, setUnityVisible] = useState(false);
  const handlersRef = useRef<Record<EMessageTypeUN, THandlerMessageUnity>>({});
  const unityRef = useRef<UnityContainerRef>(null);

  const showUnity = () => setUnityVisible(true);
  const hideUnity = () => setUnityVisible(false);
  const sendMessageToUnity = (message: TMessageUnity): void => {
    try {
      unityRef.current?.onSendMessage(message);
    } catch (error) {
      console.error('Lỗi khi gửi message đến Unity:', error);
    }
  };

  const sendMessageToUnityWithResponse = async (message: TMessageUnity) => {
    try {
      return unityRef.current?.onSendMessageWithResponse(message);
    } catch (error) {
      console.error('Lỗi khi gửi message đến Unity:', error);
      throw error;
    }
  };

  // Đăng ký một handler cho một message type cụ thể
  const registerHandler = useCallback(
    (type: EMessageTypeUN, handler: THandlerMessageUnity): void => {
      handlersRef.current = {...handlersRef.current, [type]: handler};
    },
    [],
  );

  // Hủy đăng ký handler khi không cần thiết
  const unregisterHandler = useCallback((type: EMessageTypeUN): void => {
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
        sendMessageToUnityWithResponse,
        registerHandler,
        unregisterHandler,
        onBusinessLogic,
      }}>
      {children}
      <UnityContainer ref={unityRef} />
    </UnityContext.Provider>
  );
};

// Hook để sử dụng context dễ dàng
export const useUnity = () => useContext(UnityContext);
