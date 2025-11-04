import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export function HomeTabIcon({
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


