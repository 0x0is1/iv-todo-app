import React, { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { SpaceGrotesk_400Regular, SpaceGrotesk_700Bold } from '@expo-google-fonts/space-grotesk';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TamaguiProvider } from '@tamagui/core';

import { tamaguiConfig } from './src/theme/tamagui.config';
import { RootNavigator } from './src/navigation/RootNavigator';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter: Inter_400Regular,
    InterBold: Inter_700Bold,
    SpaceGrotesk: SpaceGrotesk_400Regular,
    SpaceGroteskBold: SpaceGrotesk_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      // Hide splash after fonts load
      // Real splash animation will happen in Auth navigator if needed,
      // but the spec wants a textual splash. For now we just hide native.
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Or a simple view, while fonts load
  }

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme="dark">
      <SafeAreaProvider>
        <RootNavigator />
        <StatusBar style="light" />
      </SafeAreaProvider>
    </TamaguiProvider>
  );
}
