import React from 'react';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import RootTabs from './src/app/navigation/RootTabs';
import { globalStyles } from './src/shared/styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Ensure icon font is loaded (fixes '?' glyphs when font isn't auto-registered)
MaterialCommunityIcons.loadFont();

export default function App() {
  const isDark = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={globalStyles.container}>
        <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
          <RootTabs />
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
// add styles
