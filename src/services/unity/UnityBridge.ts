// UnityBridge.ts
import {RefObject} from 'react';

import {EUnityGameObject, EUnityMethodName} from '@/constants';
import {OnMessageHandler, TMessageUnity} from '@/types';
import {generateId} from '@/utils';

type TMessagePromise = {
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
  timeoutId?: NodeJS.Timeout;
};

type TMessageQueue = {
  [key: string]: TMessagePromise;
};

export class UnityBridge {
  private unityRef: RefObject<any>;
  private onMessageHandler: OnMessageHandler;
  private messageQueue: TMessageQueue = {};
  private readonly TIMEOUT_DURATION = 30000; // 30 seconds timeout

  constructor(unityRef: RefObject<any>, onMessageHandler: OnMessageHandler) {
    this.unityRef = unityRef;
    this.onMessageHandler = onMessageHandler;
  }

  // Hàm gửi message từ RN sang Unity
  sendMessageToUnity(params: TMessageUnity): void {
    try {
      const id = params.id ?? generateId();
      const message = JSON.stringify({...params, id});
      console.log('UnityBridge', '📤 Gửi message đến Unity', {...params, id});

      this.unityRef.current?.postMessage(
        EUnityGameObject.REACT_NATIVE_BRIDGE,
        EUnityMethodName.REQUEST_UNITY_ACTION,
        message,
      );
    } catch (error) {
      console.error(
        'sendMessageToUnity',
        'Error sending message to Unity:',
        error,
      );
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

  // Gửi message đến Unity và đợi response
  sendMessageToUnityWithResponse(
    params: Omit<TMessageUnity, 'id'>,
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        const id = generateId();
        const message = {...params, id};

        // Tạo timeout handler
        const timeoutId = setTimeout(() => {
          if (this.messageQueue[id]) {
            const {reject: rejectCallback} = this.messageQueue[id];
            delete this.messageQueue[id];
            rejectCallback(new Error('Unity response timeout'));
          }
        }, this.TIMEOUT_DURATION);

        // Lưu promise handlers và timeout ID vào queue
        this.messageQueue[id] = {resolve, reject, timeoutId};

        // Gửi message đến Unity
        this.sendMessageToUnity(message);
      } catch (error) {
        reject(error);
      }
    });
  }

  // Hàm xử lý message nhận từ Unity và gửi response
  async handleUnityMessage(data: string): Promise<void> {
    let message: TMessageUnity;
    try {
      message = JSON.parse(data);
    } catch (parseError) {
      console.error('Error parsing message from Unity:', parseError);
      return;
    }

    try {
      const payload =
        typeof message.payload === 'string'
          ? JSON.parse(message.payload || '{}')
          : message.payload;

      // Kiểm tra xem có promise đang đợi response không
      if (message.id && this.messageQueue[message.id]) {
        console.log(
          'UnityBridge',
          `📥 Nhận result type ${message.type}-${message.id}`,
          {
            ...message,
            payload,
          },
        );
        const {resolve, reject, timeoutId} = this.messageQueue[message.id];

        // Clear timeout trước khi xử lý response
        if (timeoutId) {
          clearTimeout(timeoutId);
        }

        delete this.messageQueue[message.id];

        if (payload.status === 'success') {
          resolve(payload);
        } else {
          reject(payload);
        }
        return;
      }

      console.log('UnityBridge', '📥 Nhận message từ Unity', {
        ...message,
        payload,
      });
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
