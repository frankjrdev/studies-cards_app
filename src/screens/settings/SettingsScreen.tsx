import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider';
import { useSettingsStore } from '../../store/useSettingsStore';
import { colors } from '../../constants/colors';

export default function SettingsScreen() {
  const { timerDuration, updateTimerDuration } = useSettingsStore();

  const [localTimerValue, setLocalTimerValue] = useState(timerDuration);

  const handleSaveTimer = () => {
    updateTimerDuration(localTimerValue);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Configuración</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferencias de estudio</Text>

        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>
            Tiempo por tarjeta: {localTimerValue} segundos
          </Text>
          <Slider
            minimumValue={5}
            maximumValue={30}
            step={1}
            value={localTimerValue}
            onValueChange={setLocalTimerValue}
            minimumTrackTintColor={colors.pink[500]}
            maximumTrackTintColor={colors.pink[100]}
            thumbTintColor={colors.pink[600]}
            style={styles.slider}
          />
          <View style={styles.sliderLabels}>
            <Text style={styles.sliderLabel}>5s</Text>
            <Text style={styles.sliderLabel}>30s</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveTimer}>
          <Text style={styles.saveButtonText}>Guardar cambios</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Acerca de</Text>
        <Text style={styles.aboutText}>FlashMed v1.0.0</Text>
        <Text style={styles.aboutDescription}>
          Una aplicación para estudiar medicina con tarjetas de memoria.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.pink[700],
    marginBottom: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.pink[800],
    marginBottom: 16,
  },
  settingItem: {
    marginBottom: 24,
  },
  settingLabel: {
    color: colors.pink[700],
    marginBottom: 8,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  sliderLabel: {
    fontSize: 12,
    color: colors.pink[600],
  },
  saveButton: {
    backgroundColor: colors.pink[500],
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  aboutText: {
    color: colors.pink[700],
    marginBottom: 4,
  },
  aboutDescription: {
    color: colors.pink[600],
  },
});
