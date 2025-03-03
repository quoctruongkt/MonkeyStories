export interface ISwitchProps {
  /**
   * Trạng thái bật/tắt của switch
   */
  value?: boolean;
  /**
   * Hàm callback khi thay đổi giá trị
   */
  onChange?: (value: boolean) => void;
  /**
   * Vô hiệu hoá switch
   */
  disabled?: boolean;
  /**
   * Màu nền khi switch bật
   */
  backgroundTrueColor?: string;
  /**
   * Màu nền khi switch tắt
   */
  backgroundFalseColor?: string;
  /**
   * Màu của chấm tròn
   */
  dotColor?: string;
}
