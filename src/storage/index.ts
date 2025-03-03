import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV();

//TO BE USED IN REDUX PERSIST
export const zustandPersistStorage = {
  setItem: (name: string, value: string) => storage.set(name, value),
  getItem: (name: string) => storage.getString(name) ?? null,
  removeItem: (name: string) => storage.delete(name),
};

export const storybookStorage = {
  setItem: async (name: string, value: string) => storage.set(name, value),
  getItem: async (name: string) => storage.getString(name) ?? null,
};
