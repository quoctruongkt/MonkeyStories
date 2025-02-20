// UnityBridge.ts
import {RefObject} from 'react';

import {EUnityGameObject, EUnityMethodName} from '@/constants';
import {OnMessageHandler, TMessageUnity} from '@/types';
import {generateId} from '@/utils';

export class UnityBridge {
  private unityRef: RefObject<any>;
  private onMessageHandler: OnMessageHandler;

  constructor(unityRef: RefObject<any>, onMessageHandler: OnMessageHandler) {
    this.unityRef = unityRef;
    this.onMessageHandler = onMessageHandler;
  }

  // Hàm gửi message từ RN sang Unity
  sendMessageToUnity(params: TMessageUnity): void {
    try {
      const id = generateId();
      const message = JSON.stringify({...params, id});
      console.log('UnityBridge', '📤 Gửi message đến Unity', {...params, id});

      this.unityRef.current?.postMessage(
        EUnityGameObject.REACT_NATIVE_BRIDGE,
        EUnityMethodName.REQUEST_UNITY_ACTION,
        message,
      );
    } catch (error) {
      console.error('Error sending message to Unity:', error);
    }
  }

  returnToUnity(params: TMessageUnity): void {
    try {
      this.unityRef.current?.postMessage(
        EUnityGameObject.REACT_NATIVE_BRIDGE,
        EUnityMethodName.RESULT_FROM_RN,
        JSON.stringify(params),
      );
      console.log('UnityBridge', '📤 Gửi result đến Unity', params);
    } catch (error) {
      console.error('UnityBridge', 'Error sending message to Unity:', error);
    }
  }

  // Hàm xử lý message nhận từ Unity và gửi response
  async handleUnityMessage(data: string): Promise<void> {
    let message: TMessageUnity;
    try {
      message = JSON.parse(data);
    } catch (parseError) {
      console.error('Error parsing message from Unity:', parseError);
      return; // Không có id để phản hồi
    }

    try {
      const payload = JSON.parse(message.payload || '{}');
      console.log('UnityBridge', '📥 Nhận message từ Unity', {
        ...message,
        payload,
      });
      // Gọi business logic được cung cấp (onMessageHandler)
      const result = await this.onMessageHandler({...message, payload});

      // Nếu thành công, gửi response dạng resolve
      const response: TMessageUnity = {
        id: message.id,
        type: message.type,
        payload: {success: true, result},
      };
      this.returnToUnity(response);
    } catch (error) {
      // Nếu có lỗi, gửi response dạng reject
      const response: TMessageUnity = {
        id: message.id,
        type: message.type,
        payload: {
          success: false,
          result: error instanceof Error ? error.message : error,
        },
      };
      this.returnToUnity(response);
    }
  }
}
