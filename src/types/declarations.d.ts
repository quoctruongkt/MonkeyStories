declare module '@azesmway/react-native-unity' {
  import {Component} from 'react';
  import {ViewProps} from 'react-native';

  export interface UnityViewProps extends ViewProps {
    onUnityMessage?: (event: {nativeEvent: {message: string}}) => void;
  }

  export default class UnityView extends Component<UnityViewProps> {
    postMessage(gameObject: string, methodName: string, message: string): void;
  }
}

declare module '*.svg' {
  import React from 'react';
  import {SvgProps} from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}
