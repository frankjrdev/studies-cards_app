import { create } from 'zustand';
import { FlashcardData } from '../types/flashcard.types';
import { useSettingsStore } from './useSettingsStore';

interface StudyStore {
  currentStudyCards: FlashcardData[];
  currentCardIndex: number;
  isFlipped: boolean;
  timeLeft: number;
  timerActive: boolean;

  setStudyCards: (cards: FlashcardData[]) => void;
  flipCard: () => void;
  nextCard: (option: 'repeat-later' | 'repeat-soon' | 'forget') => void;
  resetStudySession: () => void;
  tickTimer: () => void;
  resetTimer: () => void;
  pauseTimer: () => void;
}

export const useStudyStore = create<StudyStore>((set, get) => ({
  currentStudyCards: [],
  currentCardIndex: 0,
  isFlipped: false,
  timeLeft: useSettingsStore.getState().timerDuration,
  timerActive: false,

  setStudyCards: (cards) => {
    set({
      currentStudyCards: cards,
      currentCardIndex: 0,
      isFlipped: false,
      timeLeft: useSettingsStore.getState().timerDuration,
      timerActive: true,
    });
  },

  flipCard: () => {
    set({
      isFlipped: true,
      timerActive: false,
    });
  },

  nextCard: (option) => {
    const { currentCardIndex, currentStudyCards } = get();

    // En una app real, aquí manejarías la lógica de repetición espaciada
    // basada en la opción seleccionada

    if (currentCardIndex < currentStudyCards.length - 1) {
      set({
        currentCardIndex: currentCardIndex + 1,
        isFlipped: false,
        timeLeft: useSettingsStore.getState().timerDuration,
        timerActive: true,
      });
    } else {
      // Fin del mazo
      set({
        currentStudyCards: [],
        currentCardIndex: 0,
        isFlipped: false,
        timerActive: false,
      });
    }
  },

  resetStudySession: () => {
    set({
      currentStudyCards: [],
      currentCardIndex: 0,
      isFlipped: false,
      timerActive: false,
    });
  },

  tickTimer: () => {
    const { timeLeft, isFlipped } = get();
    if (timeLeft > 0 && !isFlipped) {
      set({ timeLeft: timeLeft - 1 });
    } else if (timeLeft === 0 && !isFlipped) {
      set({ isFlipped: true, timerActive: false });
    }
  },

  resetTimer: () => {
    set({
      timeLeft: useSettingsStore.getState().timerDuration,
      timerActive: true,
    });
  },

  pauseTimer: () => {
    set({ timerActive: false });
  },
}));
