import { create } from 'zustand';
import { Deck } from '../types/flashcard.types';

// Sample decks
const sampleDecks: Deck[] = [
  {
    id: 'anatomy',
    name: 'Anatomía',
    color: 'pink',
    cards: [
      {
        question: '¿Cuáles son las capas de la piel?',
        answer:
          'Epidermis, dermis e hipodermis. La epidermis es la capa más externa, la dermis contiene vasos sanguíneos y nervios, y la hipodermis es la capa más profunda compuesta principalmente de tejido adiposo.',
        id: 'anatomy_1',
      },
      {
        question: '¿Cuáles son los huesos del oído medio?',
        answer:
          'Martillo, yunque y estribo. Son los huesos más pequeños del cuerpo humano.',
        id: 'anatomy_2',
      },
      {
        question: '¿Qué es el sistema linfático?',
        answer:
          'Es una red de órganos, ganglios linfáticos, conductos y vasos que transportan linfa por todo el cuerpo. Ayuda a mantener el equilibrio de fluidos y juega un papel importante en el sistema inmunológico.',
        id: 'anatomy_3',
      },
    ],
  },
  {
    id: 'physiology',
    name: 'Fisiología',
    color: 'purple',
    cards: [
      {
        question: '¿Qué es la homeostasis?',
        answer:
          'Es el proceso por el cual un organismo mantiene condiciones internas constantes necesarias para la vida, a pesar de los cambios en el entorno externo.',
        id: 'physiology_1',
      },
      {
        question: '¿Cuál es la función de los riñones?',
        answer:
          'Los riñones filtran la sangre, eliminan desechos y exceso de agua como orina, regulan electrolitos, mantienen el equilibrio ácido-base y producen hormonas como la eritropoyetina.',
        id: 'physiology_2',
      },
    ],
  },
  {
    id: 'gynecology',
    name: 'Ginecología',
    color: 'rose',
    cards: [
      {
        question: '¿Cuáles son las fases del ciclo menstrual?',
        answer:
          'Fase menstrual, fase folicular, ovulación y fase lútea. Cada fase está regulada por diferentes hormonas y prepara al cuerpo para un posible embarazo.',
        id: 'gynecology_1',
      },
      {
        question: '¿Qué es la endometriosis?',
        answer:
          'Es un trastorno en el que el tejido similar al revestimiento del útero (endometrio) crece fuera del útero, causando dolor, inflamación y a veces problemas de fertilidad.',
        id: 'gynecology_2',
      },
    ],
  },
];

interface DecksStore {
  decks: Deck[];
  selectedDeckIds: string[];
  toggleDeckSelection: (deckId: string) => void;
  startStudySession: () => void;
}

export const useDecksStore = create<DecksStore>((set, get) => ({
  decks: sampleDecks,
  selectedDeckIds: [],

  toggleDeckSelection: (deckId) => {
    set((state) => {
      if (state.selectedDeckIds.includes(deckId)) {
        return {
          selectedDeckIds: state.selectedDeckIds.filter((id) => id !== deckId),
        };
      } else {
        return { selectedDeckIds: [...state.selectedDeckIds, deckId] };
      }
    });
  },

  startStudySession: () => {
    const { decks, selectedDeckIds } = get();
    const selectedDecks = decks.filter((deck) =>
      selectedDeckIds.includes(deck.id)
    );
    const combinedCards = selectedDecks.flatMap((deck) => deck.cards);

    // Actualizar el store de estudio con las tarjetas seleccionadas
    // Esto se haría normalmente con una acción en useStudyStore
    // Pero para simplificar, podríamos hacerlo directamente aquí
  },
}));
