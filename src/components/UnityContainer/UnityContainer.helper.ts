import Orientation, {OrientationType} from 'react-native-orientation-locker';

import {EOrientationNavigationTypes, EOrientationToUnity} from '@/constants';

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
