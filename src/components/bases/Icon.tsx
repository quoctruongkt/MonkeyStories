import React from 'react';

import {iconMap} from '@/assets';

type IconProps = {
  /**
   * Tên icon từ iconMap
   */
  name: keyof typeof iconMap;
  /**
   * Kích thước icon
   */
  size?: number;
  /**
   * Màu sắc icon
   */
  color?: string;
};

/**
 * Component hiển thị icon từ tập icon có sẵn
 * @param param0
 * @returns
 */
export const Icon: React.FC<IconProps> = ({name, size = 24, color}) => {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    return null;
  }

  return <IconComponent width={size} height={size} color={color} />;
};
