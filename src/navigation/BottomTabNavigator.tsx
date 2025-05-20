import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import { TabParamList } from '../types/navigation.types';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import HomeScreen from '@/screens/home/HomeScreen';
import StudyScreen from '@/screens/study/StudyScreen';
import SettingsScreen from '@/screens/settings/SettingsScreen';

export default function BottomTabNavigator() {
  const Tab = createBottomTabNavigator<TabParamList>();

  return (
    <Tab.Navigator
      screenOptions={({
        route,
      }: {
        route: RouteProp<TabParamList, keyof TabParamList>;
      }) => ({
        tabBarIcon: ({ focused, color, size }: any) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else if (route.name === 'Study') {
            iconName = focused ? 'book' : 'book-outline';
          }

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.pink[500],
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Study" component={StudyScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
