import {EMessageTypeUN} from '@/constants';

export type TMessageUnity = {
  id: string;
  type: EMessageTypeUN;
  payload: any;
};

// Callback xử lý business logic: nhận message và trả về Promise với kết quả hoặc lỗi
export type OnMessageHandler = (message: TMessageUnity) => Promise<any>;
