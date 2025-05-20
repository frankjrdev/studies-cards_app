import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../constants/colors';

const { width } = Dimensions.get('window');

interface ResultOptionsProps {
  onSelectOption: (option: 'repeat-later' | 'repeat-soon' | 'forget') => void;
}

export default function ResultOptions({ onSelectOption }: ResultOptionsProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.option, styles.repeatLaterOption]}
        onPress={() => onSelectOption('repeat-later')}
        activeOpacity={0.7}
      >
        <Ionicons name="refresh-outline" size={20} color={colors.pink[700]} />
        <Text style={styles.repeatLaterText}>Repetir luego</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.option, styles.repeatSoonOption]}
        onPress={() => onSelectOption('repeat-soon')}
        activeOpacity={0.7}
      >
        <Ionicons name="time-outline" size={20} color={colors.purple[700]} />
        <Text style={styles.repeatSoonText}>Repetir pronto</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.option, styles.forgetOption]}
        onPress={() => onSelectOption('forget')}
        activeOpacity={0.7}
      >
        <Ionicons name="checkmark-outline" size={20} color={colors.rose[700]} />
        <Text style={styles.forgetText}>Olvidar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  option: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginHorizontal: 4,
  },
  repeatLaterOption: {
    borderColor: colors.pink[300],
    backgroundColor: colors.pink[50],
  },
  repeatSoonOption: {
    borderColor: colors.purple[300],
    backgroundColor: colors.purple[50],
  },
  forgetOption: {
    borderColor: colors.rose[300],
    backgroundColor: colors.rose[50],
  },
  repeatLaterText: {
    color: colors.pink[700],
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
  repeatSoonText: {
    color: colors.purple[700],
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
  forgetText: {
    color: colors.rose[700],
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
});
