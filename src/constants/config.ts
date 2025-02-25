import {TApis} from '@/types';

export enum EEnv {
  DEV = 'dev',
  PROD = 'production',
}

export enum EApiType {
  DATA = 'data',
  MEDIA = 'media',
}

export const ApiConfig: Record<EEnv, TApis> = {
  [EEnv.DEV]: {
    [EApiType.DATA]: 'https://api.dev.data.com/',
    [EApiType.MEDIA]: 'https://api.dev.media.com/',
  },
  [EEnv.PROD]: {
    [EApiType.DATA]: 'https://api.data.com/',
    [EApiType.MEDIA]: 'https://api.media.com/',
  },
};
