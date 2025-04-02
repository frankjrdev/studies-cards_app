import React, { useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';
import colors from '../theme/colors';

export default function StatsScreen() {
  const [filter, setFilter] = useState('projects');

  // Datos de ejemplo para estadísticas
  const pieData = [
    { name: 'Aciertos', percentage: 75, color: colors.primary },
    { name: 'Errores', percentage: 25, color: colors.background },
  ].map((item, index) => ({
    name: item.name,
    population: item.percentage,
    color: item.color,
    legendFontColor: '#333',
    legendFontSize: 14,
  }));

  const barData = {
    labels:
      filter === 'projects'
        ? ['Project A', 'Project B', 'Project C']
        : filter === 'decks'
          ? ['Deck 1', 'Deck 2', 'Deck 3']
          : ['Card X', 'Card Y', 'Card Z'],
    datasets: [{ data: [80, 60, 90] }],
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Estadísticas</Text>

      {/* Botones de filtro */}
      <View style={styles.filterContainer}>
        {['projects', 'decks', 'cards'].map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.filterButton,
              filter === item && styles.activeFilter,
            ]}
            onPress={() => setFilter(item)}
          >
            <Text style={styles.filterText}>{item.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Gráfico de torta */}
      <Text style={styles.chartTitle}>Aciertos vs Errores</Text>
      <PieChart
        data={pieData}
        width={Dimensions.get('window').width - 20}
        height={200}
        chartConfig={chartConfig}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
      />

      {/* Gráfico de barras */}
      <Text style={styles.chartTitle}>Rendimiento por {filter}</Text>
      <BarChart
        data={barData}
        width={Dimensions.get('window').width - 20}
        height={220}
        yAxisLabel="%"
        yAxisSuffix=""
        chartConfig={chartConfig}
        verticalLabelRotation={30}
      />
    </ScrollView>
  );
}

// Configuración visual de los gráficos
const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: { borderRadius: 10 },
  propsForDots: { r: '4', strokeWidth: '2', stroke: colors.primary },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  filterButton: {
    backgroundColor: '#ddd',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  activeFilter: {
    backgroundColor: colors.primary,
  },
  filterText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
});
