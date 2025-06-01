import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

type AuthState = {
  user: string | null;
  token: string | null;
  setUser: (user: string | null) => void;
  setToken: (token: string | null) => void;
};

export const useAuth = create<AuthState>((set) => ({
  user: null,
  token: null,
  setUser: (user) => {
    set({ user });
    saveToStorage('user', user);
  },
  setToken: (token) => {
    set({ token });
    saveToStorage('token', token);
  },
}));

// Helper functions to handle storage
const saveToStorage = async (key: string, value: string | null) => {
  try {
    if (Platform.OS === 'web') {
      if (value === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, value);
      }
    } else {
      if (value === null) {
        await AsyncStorage.removeItem(key);
      } else {
        await AsyncStorage.setItem(key, value);
      }
    }
  } catch (e) {
    console.error('Error saving to storage', e);
  }
};
