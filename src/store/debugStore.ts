import {create} from 'zustand';

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

export const useDebug = create<IDebug>()(set => ({
  isContentVisible: false,
  lastLocation: {x: 0, y: 0},
  showContentDebug: () => set({isContentVisible: true}),
  hideContentDebug: () => set({isContentVisible: false}),
  updateLastLocation: location => set({lastLocation: location}),
}));
