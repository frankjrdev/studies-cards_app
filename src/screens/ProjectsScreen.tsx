import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function ProjectsScreen() {
  const projects = [
    { id: '1', title: 'Project A', description: 'Description of Project A' },
    { id: '2', title: 'Project B', description: 'Description of Project B' },
    { id: '3', title: 'Project C', description: 'Description of Project C' },
  ];

  const handleAddProject = () => {
    console.log('Add Project button pressed');
    // Aquí puedes abrir un modal o navegar a una nueva pantalla para crear un proyecto
  };

  return (
    <View style={styles.container}>
      {/* Botón de "+" en la esquina superior izquierda */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddProject}>
        <Ionicons name="add" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Projects</Text>

      <ScrollView contentContainerStyle={styles.projectsContainer}>
        {projects.map((project) => (
          <View key={project.id} style={styles.card}>
            <Text style={styles.cardTitle}>{project.title}</Text>
            <Text style={styles.cardDescription}>{project.description}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#F5F5F5',
  },
  addButton: {
    position: 'absolute',
    top: 15,
    right: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  projectsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});
