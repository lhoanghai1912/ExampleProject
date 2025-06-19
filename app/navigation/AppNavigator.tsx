import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { navigationRef } from './RootNavigator';
import AuthNavigator from './AuthNavigator';
import HomeNavigator from './HomeNavigator';
const AppNavigator = () => {
  const [isLogin, SetIsLogin] = useState(false);

  return (
    <NavigationContainer ref={navigationRef}>
      {
        //   isLogin ? <HomeNavigator /> :
        <AuthNavigator />
      }
    </NavigationContainer>
  );
};

export default AppNavigator;
