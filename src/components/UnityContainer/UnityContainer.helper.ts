import Orientation, {OrientationType} from 'react-native-orientation-locker';

import {EOrientationNavigationTypes, EOrientationToUnity} from '@/constants';

/**
 * Khóa hướng màn hình theo tùy chọn định hướng được chỉ định
 * @param orientation - Loại định hướng cần khóa từ navigation
 * @description
 * - Xử lý khóa màn hình theo các chế độ: dọc, ngang trái, ngang phải
 * - Trường hợp landscape sẽ tự động xác định hướng hiện tại của thiết bị để khóa cho phù hợp
 * - Mặc định sẽ mở khóa tất cả các hướng nếu không khớp với các trường hợp trên
 */
export const onLockOrientation = (
  orientation: EOrientationNavigationTypes,
): void => {
  switch (orientation) {
    case EOrientationNavigationTypes.PORTRAIT:
    case EOrientationNavigationTypes.PORTRAIT_UP:
    case EOrientationNavigationTypes.PORTRAIT_DOWN:
      Orientation.lockToPortrait();
      return;
    case EOrientationNavigationTypes.LANDSCAPE:
      Orientation.getDeviceOrientation(deviceOrientation => {
        if (deviceOrientation === OrientationType['LANDSCAPE-RIGHT']) {
          Orientation.lockToLandscapeRight();
          return;
        }

        Orientation.lockToLandscapeLeft();
      });
      return;
    case EOrientationNavigationTypes.LANDSCAPE_LEFT:
      Orientation.lockToLandscapeLeft();
      return;
    case EOrientationNavigationTypes.LANDSCAPE_RIGHT:
      Orientation.lockToLandscapeRight();
      return;
    default:
      Orientation.unlockAllOrientations();
      return;
  }
};

/**
 * Chuyển đổi loại định hướng của thiết bị sang định dạng phù hợp với Unity
 * @param orientation - Loại định hướng từ thiết bị
 * @returns Loại định hướng tương ứng cho Unity
 * @description
 * - Chuyển đổi các trạng thái orientation của thiết bị sang 3 trạng thái cơ bản cho Unity:
 *   + Dọc (PORTRAIT)
 *   + Ngang trái (LANDSCAPE_LEFT)
 *   + Ngang phải (LANDSCAPE_RIGHT)
 */
export const getOrientationType = (
  orientation: OrientationType,
): EOrientationToUnity => {
  switch (orientation) {
    case OrientationType.PORTRAIT:
    case OrientationType['FACE-UP']:
    case OrientationType['PORTRAIT-UPSIDEDOWN']:
    case OrientationType['FACE-DOWN']:
      return EOrientationToUnity.PORTRAIT;
    case OrientationType['LANDSCAPE-RIGHT']:
      return EOrientationToUnity.LANDSCAPE_RIGHT;
    default:
      return EOrientationToUnity.LANDSCAPE_LEFT;
  }
};
