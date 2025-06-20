import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Screen_Name } from './ScreenName';
import { BottomTabNavigator } from './BottomTabNavigator';
import HomeScreen from '../screens/MainStack';
import MenuScreen from '../screens/MainStack/Menu';
import TransactionScreen from '../screens/MainStack/Transaction';
import ReportScreen from '../screens/MainStack/Report';
import SettingScreen from '../screens/MainStack/Setting';
import UserScreen from '../screens/MainStack/User';

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
      <Stack.Screen name={Screen_Name.Menu_Screen} component={MenuScreen} />
      <Stack.Screen
        name={Screen_Name.Transaction_Screen}
        component={TransactionScreen}
      />
      <Stack.Screen name={Screen_Name.Report_Screen} component={ReportScreen} />
      <Stack.Screen
        name={Screen_Name.Setting_Screen}
        component={SettingScreen}
      />
      <Stack.Screen name={Screen_Name.User_Screen} component={UserScreen} />
    </Stack.Navigator>
  );
};
export default HomeNavigator;
