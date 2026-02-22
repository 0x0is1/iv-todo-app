import { create } from 'zustand';

type ToastType = 'success' | 'error' | 'info';

interface UIState {
    isGlobalLoading: boolean;
    toastMessage: string | null;
    toastType: ToastType;
    toastVisible: boolean;

    setGlobalLoading: (isLoading: boolean) => void;
    showToast: (message: string, type: ToastType) => void;
    hideToast: () => void;
}

export const useUIStore = create<UIState>((set) => ({
    isGlobalLoading: false,
    toastMessage: null,
    toastType: 'info',
    toastVisible: false,

    setGlobalLoading: (isLoading) => set({ isGlobalLoading: isLoading }),

    showToast: (message, type) => {
        set({ toastMessage: message, toastType: type, toastVisible: true });
    },

    hideToast: () => set({ toastVisible: false }),
}));
