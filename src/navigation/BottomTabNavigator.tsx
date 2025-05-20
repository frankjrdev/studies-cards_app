import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import { TabParamList } from '../types/navigation.types';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { Easing } from 'react-native';
import HomeScreen from '@/screens/home/HomeScreen';
import StudyScreen from '@/screens/study/StudyScreen';
import SettingsScreen from '@/screens/settings/SettingsScreen';

type TabBarIconProps = {
  focused: boolean;
  color: string;
  size: number;
};

export default function BottomTabNavigator() {
  const Tab = createBottomTabNavigator<TabParamList>();

  const getTabBarIcon = (routeName: string) => {
    return ({ focused, color, size }: TabBarIconProps) => {
      let iconName: keyof typeof Ionicons.glyphMap = 'help';
      
      switch (routeName) {
        case 'Home':
          iconName = focused ? 'home' : 'home-outline';
          break;
        case 'Settings':
          iconName = focused ? 'settings' : 'settings-outline';
          break;
        case 'Study':
          iconName = focused ? 'book' : 'book-outline';
          break;
      }

      return <Ionicons name={iconName} size={size} color={color} />;
    };
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.pink[500],
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarHideOnKeyboard: true,
        animationEnabled: false, // Desactivar animaciones para evitar el error
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarIcon: getTabBarIcon('Home')
        }}
      />
      <Tab.Screen 
        name="Study" 
        component={StudyScreen}
        options={{
          tabBarIcon: getTabBarIcon('Study')
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{
          tabBarIcon: getTabBarIcon('Settings')
        }}
      />
    </Tab.Navigator>
  );
}
