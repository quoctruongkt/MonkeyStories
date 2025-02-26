import {EApiType, EEnv} from '@/constants';
import {TApis} from '@/types';

export const BaseUrls: Record<EEnv, TApis> = {
  [EEnv.DEV]: {
    [EApiType.DATA]: 'https://api.dev.data.com/',
    [EApiType.MEDIA]: 'https://api.dev.media.com/',
  },
  [EEnv.PROD]: {
    [EApiType.DATA]: 'https://api.data.com/',
    [EApiType.MEDIA]: 'https://api.media.com/',
  },
};
