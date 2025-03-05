import {EMessageTypeUN} from '@/constants';
import {THandlerMessageUnity, TMessageUnity, TUnregisterHandler} from '@/types';

export type TUnityContext = {
  /** Trạng thái hiển thị của Unity view */
  isUnityVisible: boolean;
  /** Hàm hiển thị Unity view */
  showUnity: () => void;
  /** Hàm ẩn Unity view */
  hideUnity: () => void;
  /** Hàm gửi message từ React Native sang Unity và đợi response */
  sendMessageToUnityWithResponse: (message: TMessageUnity) => Promise<any>;
  /** Hàm gửi message từ React Native sang Unity */
  sendMessageToUnity: (message: TMessageUnity) => void;
  /**
   * Đăng ký handler xử lý message cho một type cụ thể
   * @param type - Loại message cần xử lý
   * @param handler - Hàm xử lý message
   */
  registerHandler: (
    type: EMessageTypeUN,
    handler: THandlerMessageUnity,
  ) => void;
  /** Hủy đăng ký handler xử lý message */
  unregisterHandler: TUnregisterHandler;
  /** Hàm xử lý business logic chính khi nhận message từ Unity */
  onBusinessLogic: THandlerMessageUnity;
};

/** Provider component cung cấp context Unity cho toàn bộ ứng dụng */
export type TUnityProvider = {
  children: React.ReactNode;
};
