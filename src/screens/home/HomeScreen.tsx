import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native';
import { RootStackParamList } from '../../types/navigation.types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';
import DeckItem from './components/DeckItem';
import { colors } from '../../constants/colors';
import { useDecksStore } from '@/store/useDeckStores';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { decks, selectedDeckIds, toggleDeckSelection, startStudySession } =
    useDecksStore();

  const handlerStartStudy = () => {
    startStudySession();
    navigation.navigate('Main', { screen: 'Study' });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>FlashCardMIR</Text>
      </View>

      <Text style={styles.subtitle}>
        Selecciona los mazos que deseas estudiar
      </Text>

      <FlatList
        data={decks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DeckItem
            deck={item}
            isSelected={selectedDeckIds.includes(item.id)}
            onToggle={() => toggleDeckSelection(item.id)}
          />
        )}
        contentContainerStyle={styles.listContent}
      />
      {selectedDeckIds.length > 0 && (
        <View style={styles.buttonContainer}>
          <Text style={styles.startButton} onPress={handlerStartStudy}>
            Comenzar a estudiar ({selectedDeckIds.length}{' '}
            {selectedDeckIds.length === 1 ? 'mazo' : 'mazos'})
          </Text>
        </View>
      )}
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
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.pink[700],
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.pink[500],
  },
  listContent: {
    paddingBottom: 16,
  },
  buttonContainer: {
    marginTop: 16,
    marginBottom: 16,
  },
  startButton: {
    backgroundColor: colors.pink[500],
    color: 'white',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
