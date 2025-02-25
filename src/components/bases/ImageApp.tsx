import React from 'react';
import TurboImage, {TurboImageProps} from 'react-native-turbo-image';

interface ImageAppProps extends TurboImageProps {}

export function ImageApp(props: ImageAppProps) {
  return <TurboImage {...props} />;
}
