// src/navigation/RootTabs.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { TabParamList } from './types';
import HomeScreen from '../screens/HomeScreen';
import TestScreen from '../screens/TestScreen';
import { HomeTabIcon, TestTabIcon } from '../../shared/ui/tab-icons';

const Tab = createBottomTabNavigator<TabParamList>();

export default function RootTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarLabelStyle: { fontSize: 14 },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Home', tabBarIcon: HomeTabIcon }}
      />
      <Tab.Screen
        name="Test"
        component={TestScreen}
        options={{ title: 'Test', tabBarIcon: TestTabIcon }}
      />
    </Tab.Navigator>
  );
}
