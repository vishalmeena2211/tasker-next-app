import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import axios from 'axios';
import { AuthState } from '@/lib/types';

// const BASE_URL = "http://localhost:5000/api/v1/";
const BASE_URL = "https://tasker-next-app.onrender.com/api/v1/";

export const useAuthStore = create(
    persist<AuthState>(
        (set) => ({
            user: null,
            isLoading: false,
            error: null,

            login: async (credentials) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await axios.post(BASE_URL + 'login', credentials);
                    set({ user: response.data, isLoading: false });
                } catch (error: any) {
                    set({ error: error.message, isLoading: false });
                }
            },

            logout: () => {
                set({ user: null });
            },

            signup: async (credentials) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await axios.post(BASE_URL + 'signup', credentials);
                    set({ user: response.data, isLoading: false });
                } catch (error: any) {
                    set({ error: error.message, isLoading: false });
                }
            },
        }),
        {
            name: 'authStore',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
