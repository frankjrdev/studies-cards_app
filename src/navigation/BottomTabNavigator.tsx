import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { TabParamList } from '../types/navigation.types';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';

export default function BottomTabNavigator() {
    const Tab = createBottomTabNavigator<TabParamList>();



    return (
        <Tab.Navigator screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
                let iconName;
                if (route.name === 'Home') {
                    iconName = focused ? 'home' : 'home-outline';
                } else if (route.name === 'Settings') {
                    iconName = focused ? 'settings' : 'settings-outline';
                }else if (route.name === 'Study') {
                    iconName = focused ? 'book' : 'book-outline';
                }

                return <Ionicons name={iconName as any} size={size} color={color} />
            },
            tabBarActiveTintColor: colors.pink[500],
            tabBarInactiveTintColor: 'gray',
            headerShown: false,
        })} >
            <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio' }} />
      <Tab.Screen 
        name="Study" 
        component={StudyScreen} 
        options={{ 
          title: 'Estudiar',
          tabBarButton: (props) => null, // Ocultar esta pestaña del tab bar
        }} 
      />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: 'Config' }} />
        </Tab.Navigator>
    )
}