import { Ionicons } from '@expo/vector-icons'; // Puedes usar cualquier icono
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import CustomHeader from '../components/CustomHeader';
import HomeScreen from '../screens/HomeScreen';
import ProjectsScreen from '../screens/ProjectsScreen';
import StatsScreenScreen from '../screens/StatsScreen.';
import colors from '../theme/colors';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        header: (props) => <CustomHeader {...props} />,

        tabBarIcon: ({ color, size }) => {
          let iconName: 'home' | 'folder' | 'stats-chart' = 'home';

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Projects') {
            iconName = 'folder';
          } else if (route.name === 'Stats') {
            iconName = 'stats-chart';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.background,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Projects" component={ProjectsScreen} />
      <Tab.Screen name="Stats" component={StatsScreenScreen} />
    </Tab.Navigator>
  );
}
