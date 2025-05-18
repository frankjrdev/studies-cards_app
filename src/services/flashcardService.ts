import { z } from "zod"; // Usando Zod para validación opcional
import { UserFeedback } from "../types/UserFeedBack";

// --- Mock Database ---
const mockDatabase: {
  flashcards: Record<string, any>;
  userFeedback: Record<string, any>;
} = {
  flashcards: {},
  userFeedback: {},
};

// --- Flashcard Operations ---

// Zod schema para validación básica de Flashcard
const FlashcardSchema = z.object({
  question: z.string().min(1, "Question cannot be empty"),
  answer: z.string().min(1, "Answer cannot be empty"),
});

/**
 * Agrega una nueva flashcard al "mock database".
 * @param flashcardData - Los datos de la nueva flashcard (pregunta y respuesta).
 * @returns El ID de la flashcard recién creada.
 */
export const addFlashcard = async (flashcardData: {
  question: string;
  answer: string;
}): Promise<string> => {
  const validationResult = FlashcardSchema.safeParse(flashcardData);
  if (!validationResult.success) {
    throw new Error(
      `Invalid flashcard data: ${validationResult.error.errors.map((e) => e.message).join(", ")}`
    );
  }

  const id = `flashcard_${Date.now()}`;
  mockDatabase.flashcards[id] = { id, ...flashcardData };
  return id;
};

/**
 * Actualiza una flashcard existente.
 * @param flashcardId - El ID de la flashcard a actualizar.
 * @param flashcardData - Los datos a actualizar.
 */
export const updateFlashcard = async (
  flashcardId: string,
  flashcardData: Partial<{ question: string; answer: string }>
): Promise<void> => {
  if (!mockDatabase.flashcards[flashcardId]) {
    throw new Error(`Flashcard with ID ${flashcardId} not found`);
  }
  mockDatabase.flashcards[flashcardId] = {
    ...mockDatabase.flashcards[flashcardId],
    ...flashcardData,
  };
};

/**
 * Elimina una flashcard.
 * @param flashcardId - El ID de la flashcard a eliminar.
 */
export const deleteFlashcard = async (flashcardId: string): Promise<void> => {
  delete mockDatabase.flashcards[flashcardId];
};

/**
 * Obtiene una flashcard por su ID.
 * @param flashcardId - El ID de la flashcard.
 * @returns La flashcard o null si no existe.
 */
export const getFlashcard = async (
  flashcardId: string
): Promise<{ id: string; question: string; answer: string } | null> => {
  return mockDatabase.flashcards[flashcardId] || null;
};

/**
 * Obtiene todas las flashcards.
 * @returns Un array de todas las flashcards.
 */
export const getAllFlashcards = async (): Promise<
  { id: string; question: string; answer: string }[]
> => {
  return Object.values(mockDatabase.flashcards);
};

/**
 * Obtiene una flashcard aleatoria.
 * @returns Una flashcard aleatoria o null si no hay flashcards.
 */
export const getRandomFlashcard = async (): Promise<{
  id: string;
  question: string;
  answer: string;
} | null> => {
  const flashcards = Object.values(mockDatabase.flashcards);
  if (flashcards.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * flashcards.length);
  return flashcards[randomIndex];
};

// --- User Feedback Operations ---

const UserFeedbackSchema = z.object({
  flashcardId: z.string().min(1),
  userId: z.string().min(1),
  feedbackType: z.enum(["Repeat Forgot", "Repeat Later"]),
});

/**
 * Agrega feedback de usuario.
 * @param feedbackData - Los detalles del feedback.
 * @returns El ID del feedback recién creado.
 */
export const addUserFeedback = async (feedbackData: {
  flashcardId: string;
  userId: string;
  feedbackType: UserFeedback;
}): Promise<string> => {
  const validationResult = UserFeedbackSchema.safeParse(feedbackData);
  if (!validationResult.success) {
    throw new Error(
      `Invalid feedback data: ${validationResult.error.errors.map((e) => e.message).join(", ")}`
    );
  }

  const id = `feedback_${Date.now()}`;
  mockDatabase.userFeedback[id] = {
    id,
    ...feedbackData,
    timestamp: new Date(),
  };
  return id;
};

/**
 * Obtiene feedback de un usuario.
 * @param userId - El ID del usuario.
 * @returns Un array de feedbacks del usuario.
 */
export const getUserFeedback = async (userId: string): Promise<any[]> => {
  return Object.values(mockDatabase.userFeedback).filter(
    (feedback) => feedback.userId === userId
  );
};

// --- API Interaction (Mock) ---

const mockApiFlashcards = [
  { id: "1", question: "What is 2+2?", answer: "4" },
  { id: "2", question: "What is the capital of France?", answer: "Paris" },
];

/**
 * Simula la obtención de flashcards desde una API externa.
 * @returns Un array de flashcards.
 */
export const fetchFlashcardsFromAPI = async (): Promise<
  { id: string; question: string; answer: string }[]
> => {
  return mockApiFlashcards;
};

/**
 * Carga flashcards desde la API al "mock database".
 * @returns Un objeto con el número de flashcards agregadas y omitidas.
 */
export const loadApiFlashcardsToFirestore = async (): Promise<{
  added: number;
  skipped: number;
}> => {
  const apiFlashcards = await fetchFlashcardsFromAPI();
  let addedCount = 0;
  let skippedCount = 0;

  for (const card of apiFlashcards) {
    if (!mockDatabase.flashcards[card.id]) {
      mockDatabase.flashcards[card.id] = card;
      addedCount++;
    } else {
      skippedCount++;
    }
  }

  return { added: addedCount, skipped: skippedCount };
};
