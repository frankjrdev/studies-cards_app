export interface Deck {
  id: string;
  title: string;
  project: string;
  author: string;
  totalCards: number;
}

export interface DecksHomeScreenProps {
  decks: Deck[];
}
