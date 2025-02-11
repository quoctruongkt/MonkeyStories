import React from 'react';
import {FasterImageView, FasterImageProps} from '@candlefinance/faster-image';

interface ImageAppProps extends FasterImageProps {}

export function ImageApp(props: ImageAppProps) {
  return <FasterImageView {...props} />;
}
