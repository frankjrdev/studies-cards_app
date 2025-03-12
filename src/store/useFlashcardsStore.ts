import { create } from 'zustand';

interface FlashcardsState {
  cards: number;
  decks: number;
  addCard: () => void;
  addDeck: () => void;
}

export const useFlashcardsStore = create<FlashcardsState>((set) => ({
  cards: 12,
  decks: 1,
  addCard: () => set((state) => ({ cards: state.cards + 1 })),
  addDeck: () => set((state) => ({ decks: state.decks + 1 })),
}));
