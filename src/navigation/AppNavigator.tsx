import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation.types';
import BottomTabNavigator from './BottomTabNavigator';

export default function AppNavigator() {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        animationDuration: 300,
      }}
    >
      <Stack.Screen 
        name="Main" 
        component={BottomTabNavigator}
      />
    </Stack.Navigator>
  );
}
