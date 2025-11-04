import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export function TestTabIcon({
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


