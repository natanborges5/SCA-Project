"use client";
import { create } from "zustand";

interface LoadingOverlayStore {
  isLoading: boolean;
  toggle: () => void;
  toggleOn: () => void;
  toggleOff: () => void;
}

export const useLoadingOverlayStore = create<LoadingOverlayStore>((set) => ({
  isLoading: false,
  toggle: () =>
    set((current) => ({
      isLoading: !current.isLoading,
    })),
  toggleOn: () =>
    set((current) => ({
      isLoading: true,
    })),
  toggleOff: () =>
    set((current) => ({
      isLoading: false,
    })),
}));
