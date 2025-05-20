export type FlashcardData = {
  id: string;
  question: string;
  answer: string;
};

export type Deck = {
  id: string;
  name: string;
  color: string;
  cards: FlashcardData[];
};