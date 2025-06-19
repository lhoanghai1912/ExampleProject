import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Screen_Name } from './ScreenName';
import { BottomTabNavigator } from './BottomTabNavigator';
import HomeScreen from '../screens/HomeScreen';
import SettingScreen from '../screens/SettingScreen';

const Stack = createNativeStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
      initialRouteName={Screen_Name.Bottom_Navigator}
    >
      <Stack.Screen
        name={Screen_Name.Bottom_Navigator}
        component={BottomTabNavigator}
      />
      <Stack.Screen name={Screen_Name.Home_Screen} component={HomeScreen} />
      <Stack.Screen
        name={Screen_Name.Setting_Screen}
        component={SettingScreen}
      />
    </Stack.Navigator>
  );
};
export default HomeNavigator;
