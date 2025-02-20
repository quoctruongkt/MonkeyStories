import React from 'react';

import {iconMap} from '@/assets';

type IconProps = {
  name: keyof typeof iconMap;
  size?: number;
  color?: string;
};

export const Icon: React.FC<IconProps> = ({name, size = 24, color}) => {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    return null;
  }

  return <IconComponent width={size} height={size} color={color} />;
};
