/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import LoginScreen from './app/screens/AuthStack';
import AppNavigator from './app/navigation/AppNavigator';
import { Provider } from 'react-redux';
import store from './app/redux/store';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

export default App;
