export type FlashcardData = {
  id: string;
  question: string;
  answer: string;
  deckId?: string;
  deckName?: string;
  deckColor?: string;
};

// Available color options for decks
export type DeckColor = 'pink' | 'purple' | 'rose' | 'blue' | 'green' | 'yellow' | 'indigo' | 'red';

export type Deck = {
  id: string;
  name: string;
  color: DeckColor;
  cards: FlashcardData[];
};