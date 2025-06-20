// app/navigation/BottomTabNavigator.tsx

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/MainStack';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export const BottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          //   tabBarIcon: ({ color, size }) => (
          //     <Ionicons name="home" color={color} size={size} />
          //   ),
        }}
      />
    </Tab.Navigator>
  );
};
