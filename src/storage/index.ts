import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV();

//TO BE USED IN REDUX PERSIST
export const zustandPersistStorage = {
  setItem: (name: string, value: string) => storage.set(name, value),
  getItem: (name: string) => storage.getString(name) ?? null,
  removeItem: (name: string) => storage.delete(name),
};
