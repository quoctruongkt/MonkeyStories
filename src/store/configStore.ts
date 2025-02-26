import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

import {BaseUrls} from '@/configs/api';
import {EEnv, KeyStorages} from '@/constants';
import {zustandPersistStorage} from '@/storage';
import {TApis} from '@/types';

interface IAppConfig {
  env: EEnv;
  baseUrls: TApis;
  changeEnv: (env: EEnv) => void;
}

export const useAppConfig = create<IAppConfig>()(
  persist(
    set => ({
      env: EEnv.PROD,
      baseUrls: BaseUrls[EEnv.PROD],
      changeEnv: env => set({env, baseUrls: BaseUrls[env]}),
    }),
    {
      name: KeyStorages.CONFIG,
      storage: createJSONStorage(() => zustandPersistStorage),
      partialize: state => ({env: state.env, baseUrls: state.baseUrls}),
    },
  ),
);
