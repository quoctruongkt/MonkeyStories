// unityEvents.js
import EventEmitter from 'eventemitter3';

import {EUnityMessageTypes} from '@/constants';
import {TMessageUnity} from '@/types';

const unityEvents = new EventEmitter();

const emitSendMessageToUnity = (message: TMessageUnity) => {
  unityEvents.emit(EUnityMessageTypes.SEND_MESSAGE, message);
};

const emitReceiveMessageFromUnity = (message: TMessageUnity) => {
  unityEvents.emit(EUnityMessageTypes.RECEIVE_MESSAGE, message);
};

const addUnityMessageListener = (
  type: EUnityMessageTypes,
  listener: (data: TMessageUnity) => void,
) => {
  unityEvents.addListener(type, listener);
};

const removeUnityMessageListener = (
  type: EUnityMessageTypes,
  listener: (data: TMessageUnity) => void,
) => {
  unityEvents.removeListener(type, listener);
};

export const UnityEvents = {
  emitSendMessageToUnity,
  emitReceiveMessageFromUnity,
  addUnityMessageListener,
  removeUnityMessageListener,
};
