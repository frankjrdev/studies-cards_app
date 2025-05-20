import { create } from 'zustand';

interface SettingsStore {
  timerDuration: number;
  updateTimerDuration: (duration: number) => void;
}

export const useSettingsStore = create<SettingsStore>((set) => ({
  timerDuration: 10,

  updateTimerDuration: (duration) => {
    set({ timerDuration: duration });
  },
}));
