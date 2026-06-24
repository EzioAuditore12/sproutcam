import { createMMKV } from "react-native-mmkv";
import { StateStorage } from "zustand/middleware";

const mmkVstorage = createMMKV();

export const zustandStorage: StateStorage = {
  setItem: (name, value) => {
    return mmkVstorage.set(name, value);
  },
  getItem: (name) => {
    const value = mmkVstorage.getString(name);
    return value ?? null;
  },
  removeItem: (name) => {
    return mmkVstorage.remove(name);
  },
};
