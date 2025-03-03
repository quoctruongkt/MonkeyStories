import React from 'react';
import {Image, ImageProps} from 'react-native';
import TurboImage, {TurboImageProps} from 'react-native-turbo-image';

type ImageAppProps = ImageProps | TurboImageProps;
export function ImageApp(props: ImageAppProps) {
  const isLocalImage = typeof props.source === 'number';

  return isLocalImage ? <Image {...props} /> : <TurboImage {...props} />;
}
