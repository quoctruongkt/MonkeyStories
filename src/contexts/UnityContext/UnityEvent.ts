// unityEvents.js
import EventEmitter from 'eventemitter3';

import {EUnityEventTypes} from '@/constants';
import {TMessageUnity} from '@/types';

const unityEvents = new EventEmitter();

const emitSendMessageToUnity = (message: TMessageUnity) => {
  unityEvents.emit(EUnityEventTypes.SEND_MESSAGE, message);
};

const emitReceiveMessageFromUnity = (message: TMessageUnity) => {
  unityEvents.emit(EUnityEventTypes.RECEIVE_MESSAGE, message);
};

const addUnityMessageListener = (
  type: EUnityEventTypes,
  listener: (data: TMessageUnity) => void,
) => {
  unityEvents.addListener(type, listener);
};

const removeUnityMessageListener = (
  type: EUnityEventTypes,
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
