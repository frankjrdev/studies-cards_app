import { useEffect } from 'react';
import { FlashcardData } from '../../types/flashcard.types';
import {
  View,
  Text,
  Easing,
  Animated,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { colors } from '@/constants/colors';
interface FlashcardItemProps {
  card: FlashcardData;
  isFlipped: boolean;
  onFlip: () => void;
}

export default function FlashcardItem({
  card,
  isFlipped,
  onFlip,
}: FlashcardItemProps) {
  const rotation = useSharedValue(0);

  useEffect(() => {
    if (isFlipped) {
      rotation.value = withTiming(180, {
        duration: 500,
        easing: Easing.inOut(Easing.ease),
      });
    } else {
      rotation.value = withTiming(0, {
        duration: 500,
        easing: Easing.inOut(Easing.ease),
      });
    }
  }, [isFlipped, rotation]);

  const frontAnimatedStyle = useAnimatedStyle(() => {
    const rotateValue = interpolate(rotation.value, [0, 180], [0, 180]);

    return {
      transform: [{ perspective: 1000 }, { rotateY: `${rotateValue}deg` }],
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

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onFlip}
      style={styles.container}
    >
      {/* Question Side */}
      <Animated.View
        style={[styles.card, styles.questionCard, frontAnimatedStyle]}
      >
        <View style={styles.cardContent}>
          <Text style={styles.questionText}>{card.question}</Text>
        </View>
        <Text style={styles.tapHint}>Doble toque para ver la respuesta</Text>
      </Animated.View>

      {/* Answer Side */}
      <Animated.View
        style={[styles.card, styles.answerCard, backAnimatedStyle]}
      >
        <View style={styles.cardContent}>
          <Text style={styles.answerLabel}>Respuesta:</Text>
          <Text style={styles.answerText}>{card.answer}</Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 400,
    position: 'relative',
    marginBottom: 16,
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
