import React from 'react';

import {Notification, TNotificationProps} from '@/components';

export enum EModalNames {
  NOTIFICATION = 'NOTIFICATION',
}

type ModalPropsMap = {
  [EModalNames.NOTIFICATION]: TNotificationProps;
  // Add other modal props types here
};

export const ModalComponents: {
  [K in EModalNames]: React.FC<ModalPropsMap[K]>;
} = {
  [EModalNames.NOTIFICATION]: Notification,
};
