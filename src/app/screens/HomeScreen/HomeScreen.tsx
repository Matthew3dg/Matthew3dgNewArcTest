import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import { TabScreenProps } from '../../navigation/types';

export default function HomeScreen(_props: TabScreenProps<'Home'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏠 HomeScreen</Text>
      <Text style={styles.text}>This is the HomeScreen component</Text>
    </View>
  );
}
