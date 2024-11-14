import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isAuthenticated: boolean;
  userType: 'admin' | 'merchant' | null;
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
  login: (userType: 'admin' | 'merchant', userData: any) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      userType: null,
      user: null,
      login: (userType, userData) => set({
        isAuthenticated: true,
        userType,
        user: userData,
      }),
      logout: () => set({
        isAuthenticated: false,
        userType: null,
        user: null,
      }),
    }),
    {
      name: 'auth-storage',
    }
  )
);