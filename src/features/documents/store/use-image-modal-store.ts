import { create } from "zustand";

interface useImageModalState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useImageModalStore = create<useImageModalState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
