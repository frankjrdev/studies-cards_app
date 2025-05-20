import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Deck } from '../../../types/flashcard.types';
import { colors } from '../../../constants/colors';

interface DeckItemProps {
  deck: Deck;
  isSelected: boolean;
  onToggle: () => void;
}

export default function DeckItem({
  deck,
  isSelected,
  onToggle,
}: DeckItemProps) {
  const getIconName = (deckId: string) => {
    if (deckId === 'anatomy') return 'body-outline';
    if (deckId === 'physiology') return 'heart-outline';
    if (deckId === 'gynecology') return 'fitness-outline';
    return 'document-text-outline';
  };

  const getColorStyle = (deckId: string) => {
    if (deckId === 'anatomy') {
      return {
        bg: colors.pink[100],
        border: colors.pink[300],
        icon: colors.pink[600],
      };
    }
    if (deckId === 'physiology') {
      return {
        bg: colors.purple[100],
        border: colors.purple[300],
        icon: colors.purple[600],
      };
    }
    if (deckId === 'gynecology') {
      return {
        bg: colors.rose[100],
        border: colors.rose[300],
        icon: colors.rose[600],
      };
    }
    return {
      bg: colors.pink[100],
      border: colors.pink[300],
      icon: colors.pink[600],
    };
  };

  const colorStyle = getColorStyle(deck.id);

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: colorStyle.bg, borderColor: colorStyle.border },
        isSelected && styles.selectedContainer,
      ]}
      onPress={onToggle}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons
            name={getIconName(deck.id)}
            size={24}
            color={colorStyle.icon}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{deck.name}</Text>
          <Text style={styles.subtitle}>{deck.cards.length} tarjetas</Text>
        </View>
        <View style={styles.checkboxContainer}>
          <View
            style={[
              styles.checkbox,
              isSelected
                ? {
                    backgroundColor: colors.pink[500],
                    borderColor: colors.pink[500],
                  }
                : {},
            ]}
          >
            {isSelected && (
              <Ionicons name="checkmark" size={16} color="white" />
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 12,
    overflow: 'hidden',
  },
  selectedContainer: {
    borderColor: colors.pink[500],
    borderWidth: 2,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconContainer: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.pink[900],
  },
  subtitle: {
    fontSize: 14,
    color: colors.pink[700],
    marginTop: 2,
  },
  checkboxContainer: {
    marginLeft: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.pink[300],
    justifyContent: 'center',
    alignItems: 'center',
  },
});
