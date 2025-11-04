// src/navigation/RootTabs.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { TabParamList } from './types';
import HomeScreen from '../screens/HomeScreen';
import TestScreen from '../screens/TestScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator<TabParamList>();

function HomeTabIcon({
  color,
  size,
  focused,
}: {
  color: string;
  size: number;
  focused: boolean;
}) {
  const name = focused ? 'home-variant' : 'home-variant-outline';
  return <MaterialCommunityIcons name={name} size={size} color={color} />;
}

function TestTabIcon({
  color,
  size,
  focused,
}: {
  color: string;
  size: number;
  focused: boolean;
}) {
  const name = focused ? 'flask' : 'flask-outline';
  return <MaterialCommunityIcons name={name} size={size} color={color} />;
}

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
