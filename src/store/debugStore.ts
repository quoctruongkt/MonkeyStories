import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

import {KeyStorages} from '@/constants';
import {zustandPersistStorage} from '@/storage';

interface ILocation {
  x: number;
  y: number;
}

interface IDebug {
  isContentVisible: boolean;
  lastLocation: ILocation;
  showContentDebug: () => void;
  hideContentDebug: () => void;
  updateLastLocation: (location: ILocation) => void;
}

export const useDebug = create<IDebug>()(
  persist(
    set => ({
      isContentVisible: false,
      lastLocation: {x: 0, y: 0},
      showContentDebug: () => set({isContentVisible: true}),
      hideContentDebug: () => set({isContentVisible: false}),
      updateLastLocation: location => set({lastLocation: location}),
    }),
    {
      name: KeyStorages.DEBUG,
      storage: createJSONStorage(() => zustandPersistStorage),
      partialize: state => ({
        lastLocation: state.lastLocation,
      }),
    },
  ),
);
