// UnityBridge.ts
import {RefObject} from 'react';

import {OnMessageHandler, TMessageUnity} from '@/types';
import {generateId} from '@/utils';
import {Logger} from '../debug/Logger';

export enum EUnityGameObject {
  Message = 'Message', // Điều chỉnh theo tên GameObject trên Unity
}

export enum EUnityMethodName {
  Orientation = 'Orientation', // Điều chỉnh theo tên method trên Unity
}

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
      const id = params.id ?? generateId();
      const message = JSON.stringify({...params, id});
      this.unityRef.current?.postMessage(
        EUnityGameObject.Message,
        EUnityMethodName.Orientation,
        message,
      );
    } catch (error) {
      console.error('Error sending message to Unity:', error);
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
      // Gọi business logic được cung cấp (onMessageHandler)
      const result = await this.onMessageHandler(message);

      // Nếu thành công, gửi response dạng resolve
      const response: TMessageUnity = {
        id: message.id,
        type: message.type,
        payload: {result},
      };
      this.sendMessageToUnity(response);
    } catch (error) {
      // Nếu có lỗi, gửi response dạng reject
      const response: TMessageUnity = {
        id: message.id,
        type: message.type,
        payload: {
          success: false,
          error: error instanceof Error ? error.message : error,
        },
      };
      this.sendMessageToUnity(response);
    }
  }
}
