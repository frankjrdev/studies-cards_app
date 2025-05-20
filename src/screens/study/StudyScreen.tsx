import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import { useStudyStore } from '@/store/useStudyStore';
import { useSettingsStore } from '@/store/useSettingsStore';
import { useDecksStore } from '@/store/useDeckStores';
import { Deck, FlashcardData } from '@/types/flashcard.types';
import Timer from './components/Timer';
import React, { useEffect, useRef } from 'react';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { colors } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');
import ResultOptions from './components/ResultOptions';

export default function StudyScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const params = (route.params || {}) as { startSession?: boolean };

  const {
    currentStudyCards,
    currentCardIndex,
    isFlipped,
    timeLeft,
    timerActive,
    setStudyCards,
    flipCard,
    nextCard,
    tickTimer,
    resetTimer,
    pauseTimer,
    resetStudySession,
  } = useStudyStore();
  const { timerDuration } = useSettingsStore();

  const { selectedDeckIds, decks } = useDecksStore();

  const rotation = useSharedValue(0);
  
  // Flip card animation
  const handleFlipCard = () => {
    'worklet';
    if (isFlipped) {
      rotation.value = withTiming(0, {
        duration: 500,
        easing: Easing.inOut(Easing.ease),
      });
    } else {
      rotation.value = withTiming(180, {
        duration: 500,
        easing: Easing.inOut(Easing.ease),
      });
    }
    flipCard();
  };
  
  // Sync rotation with isFlipped
  useEffect(() => {
    if (isFlipped) {
      rotation.value = 180;
    } else {
      rotation.value = 0;
    }
  }, [isFlipped]);
  
  // Animated styles for front and back of card
  const frontAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1000 },
      { rotateY: `${rotation.value}deg` },
    ],
    backfaceVisibility: 'hidden',
    opacity: rotation.value < 90 ? 1 : 0,
  }));

  const backAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1000 },
      { rotateY: `${rotation.value + 180}deg` },
    ],
    backfaceVisibility: 'hidden',
    opacity: rotation.value >= 90 ? 1 : 0,
  }));

  // Initialize study session when the screen mounts or params change
  useEffect(() => {
    if (params?.startSession) {
      const selectedDecks = decks.filter((deck) => selectedDeckIds.includes(deck.id));
      const combinedCards = selectedDecks.flatMap((deck) => 
        deck.cards.map((card) => ({
          ...card,
          deckId: deck.id,
          deckName: deck.name,
          deckColor: deck.color,
        }))
      );
      setStudyCards(combinedCards);

      // Clear the startSession param to prevent re-initialization
      navigation.setParams({ startSession: false } as any);
    }
  }, [params?.startSession, selectedDeckIds, decks, setStudyCards, navigation]);

  // Handle back button press
  useEffect(() => {
    const backHandler = () => {
      if (resetStudySession) {
        resetStudySession();
      }
      return false;
    };

    const backHandlerEvent = navigation.addListener('beforeRemove', backHandler as any);
    return () => backHandlerEvent();
  }, [navigation, resetStudySession]);
  
  // Handle empty deck selection
  useEffect(() => {
    if (currentStudyCards && currentStudyCards.length === 0 && selectedDeckIds.length === 0) {
      navigation.navigate('Home');
    }
  }, [currentStudyCards, selectedDeckIds, navigation]);
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (pauseTimer) pauseTimer();
    };
  }, [pauseTimer]);

  // Efecto para el temporizador
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (timerActive && tickTimer) {
      interval = setInterval(tickTimer, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive, tickTimer]);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentCard = currentStudyCards[currentCardIndex];

  // No navegamos automáticamente para evitar problemas de navegación anidada
  // en su lugar, mostramos un estado de carga

  // Timer effect
  useEffect(() => {
    if (!timerActive && timeLeft && timeLeft > 0 && !isFlipped && tickTimer) {
      timerRef.current = setTimeout(() => {
        tickTimer();
      }, 1000);
    } else if (timeLeft === 0 && !isFlipped) {
      handleFlipCard();
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timerActive, timeLeft, isFlipped, tickTimer]);

  const handleDoubleTap = () => {
    handleFlipCard();
  };

  const handleBackToDeck = () => {
    if (resetStudySession) {
      resetStudySession();
    }
    navigation.navigate('Home');
  };

  // Show loading state if no cards are loaded yet
  if (!currentStudyCards || currentStudyCards.length === 0 || !currentCard) {
    return (
      <SafeAreaView style={[styles.container, styles.centered]}>
        <Text>No hay tarjetas para estudiar</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Ionicons name="chevron-back" size={20} color={colors.pink[700]} />
          <Text style={styles.backText}>Volver al inicio</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackToDeck}>
          <Ionicons name="chevron-back" size={20} color={colors.pink[700]} />
          <Text style={styles.backText}>Volver</Text>
        </TouchableOpacity>

        <Timer timeLeft={timeLeft} />
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${((currentCardIndex || 0) / (currentStudyCards?.length || 1)) * 100}%`,
              },
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          {(currentCardIndex || 0) + 1} / {currentStudyCards?.length || 0}
        </Text>
      </View>

      <TouchableOpacity
        activeOpacity={0.9}
        onPress={handleDoubleTap}
        style={styles.cardContainer}
      >
        <View style={styles.cardWrapper}>
          {/* Question Side */}
          <Animated.View
            style={[styles.card, styles.questionCard, frontAnimatedStyle]}
          >
            <View style={styles.cardContent}>
              <Text style={styles.questionText}>{currentCard?.question || 'No hay pregunta disponible'}</Text>
            </View>
            <Text style={styles.tapHint}>
              Doble toque para ver la respuesta
            </Text>
          </Animated.View>

          {/* Answer Side */}
          <Animated.View
            style={[styles.card, styles.answerCard, backAnimatedStyle]}
          >
            <View style={styles.cardContent}>
              <Text style={styles.answerLabel}>Respuesta:</Text>
              <Text style={styles.answerText}>{currentCard?.answer || 'No hay respuesta disponible'}</Text>
            </View>
          </Animated.View>
        </View>
      </TouchableOpacity>

      {isFlipped && <ResultOptions onSelectOption={nextCard} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    color: colors.pink[700],
    marginLeft: 4,
  },
  progressContainer: {
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.pink[100],
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.pink[500],
  },
  progressText: {
    fontSize: 12,
    textAlign: 'right',
    marginTop: 4,
    color: colors.pink[700],
  },
  cardContainer: {
    flex: 1,
    marginBottom: 16,
  },
  cardWrapper: {
    flex: 1,
    position: 'relative',
  },
  card: {
    position: 'absolute',
    width: '100%',
    height: height * 0.5, // Reducir la altura de la tarjeta
    maxHeight: 400, // Altura máxima para pantallas grandes
    borderRadius: 12,
    padding: 24,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionCard: {
    backgroundColor: colors.pink[50],
    borderColor: colors.pink[200],
    borderWidth: 1,
  },
  answerCard: {
    backgroundColor: colors.purple[50],
    borderColor: colors.purple[200],
    borderWidth: 1,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
  },
  questionText: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    color: colors.pink[900],
  },
  answerLabel: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.purple[900],
    marginBottom: 12,
  },
  answerText: {
    fontSize: 16,
    color: colors.pink[900],
  },
  tapHint: {
    fontSize: 14,
    textAlign: 'center',
    color: colors.pink[700],
    marginTop: 16,
  },
});
