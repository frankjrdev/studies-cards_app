import { RouteProp, useRoute } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { RootStackParamList } from '../types/navigation';

export default function DecksScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'DecksScreen'>>();
  const { deckId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deck ID: {deckId}</Text>
      {/* Aquí podrías cargar las cards del deck desde una API o estado global */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
