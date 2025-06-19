import { createNativeStackNavigator } from '@react-navigation/native-stack';
import App from '../../App';
import { Screen_Name } from './ScreenName';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      id={undefined}
      screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
      initialRouteName={Screen_Name.Login_Screen}
    >
      <Stack.Screen name={Screen_Name.Login_Screen} component={LoginScreen} />
      <Stack.Screen
        name={Screen_Name.Register_Screen}
        component={RegisterScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
