import {FasterImageView, FasterImageProps} from '@candlefinance/faster-image';
import React from 'react';

interface ImageAppProps extends FasterImageProps {}

export function ImageApp(props: ImageAppProps) {
  return <FasterImageView {...props} />;
}
