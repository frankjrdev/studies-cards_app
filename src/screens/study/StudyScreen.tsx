import { useNavigation } from '@react-navigation/native';
import {
  Animated,
  Dimensions,
  Easing,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import { useStudyStore } from '../../store/useStudyStore';
import Timer from './components/Timer';
import React, { useEffect, useRef } from 'react';
import {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { colors } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
const { width, height } = Dimensions.get('window');
import ResultOptions from './components/ResultOptions';

export default function StudyScreen() {
  const navigation = useNavigation();
  const {
    currentStudyCards,
    currentCardIndex,
    isFlipped,
    timeLeft,
    timerActive,
    flipCard,
    nextCard,
    resetStudySession,
    tickTimer,
  } = useStudyStore();

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const rotation = useSharedValue(0);

  const currentCard = currentStudyCards[currentCardIndex];

  useEffect(() => {
    if (currentStudyCards.length === 0) {
      navigation.navigate('Main' as never);
    }
  }, [currentStudyCards, navigation]);

  useEffect(() => {
    if (isFlipped) {
      rotation.value = withTiming(190, {
        duration: 500,
        easing: Easing.inOut(Easing.ease),
      });
    }
  }, [isFlipped, rotation]);

  useEffect(() => {
    if (!timerActive && timeLeft > 0 && !isFlipped) {
      timerRef.current = setTimeout(() => {
        tickTimer();
      }, 1000);
    } else if (timeLeft === 0 && !isFlipped) {
      flipCard();
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timerActive, timeLeft, isFlipped, tickTimer, flipCard]);

  const frontAnimatedStyle = useAnimatedStyle(() => {
    const rotateValue = interpolate(rotation.value, [0, 190], [0, 180]);

    return {
      transform: [
        {
          perspective: 1000,
        },
        {
          rotateY: `${rotateValue}deg`,
        },
      ],
      backfaceVisibility: 'hidden',
      opacity: rotation.value < 90 ? 1 : 0,
    };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    const rotateValue = interpolate(rotation.value, [0, 180], [180, 360]);

    return {
      transform: [{ perspective: 1000 }, { rotateY: `${rotateValue}deg` }],
      backfaceVisibility: 'hidden',
      opacity: rotation.value >= 90 ? 1 : 0,
    };
  });

  const handleDoubleTap = () => {
    if (!isFlipped) {
      flipCard();
    }
  };

  const handleBackToDeck = () => {
    resetStudySession();
    navigation.navigate('Home' as never);
  };

  if (!currentCard) return null;

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
                width: `${(currentCardIndex / currentStudyCards.length) * 100}%`,
              },
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          {currentCardIndex + 1} / {currentStudyCards.length}
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
              <Text style={styles.questionText}>{currentCard.question}</Text>
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
              <Text style={styles.answerText}>{currentCard.answer}</Text>
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
    height: '100%',
    borderRadius: 12,
    padding: 24,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
