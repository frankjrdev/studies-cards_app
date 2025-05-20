import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../constants/colors';

interface TimerProps {
  timeLeft: number;
}

export default function Timer({ timeLeft }: TimerProps) {
  const animatedValue = useRef(new Animated.Value(1)).current;

  // Pulse animation when time is running low
  useEffect(() => {
    if (timeLeft <= 5 && timeLeft > 0) {
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1.2,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [timeLeft, animatedValue]);

  // Determine color based on time left
  const getTimerColor = () => {
    if (timeLeft <= 3) return colors.rose[600];
    if (timeLeft <= 5) return colors.rose[500];
    return colors.pink[700];
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ scale: animatedValue }],
        },
      ]}
    >
      <Ionicons name="time-outline" size={20} color={getTimerColor()} />
      <Text style={[styles.timeText, { color: getTimerColor() }]}>
        {timeLeft}s
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(252, 231, 243, 0.5)', // Light pink background
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
});
