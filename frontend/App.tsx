import React, { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { SpaceGrotesk_400Regular, SpaceGrotesk_700Bold } from '@expo-google-fonts/space-grotesk';
import * as SplashScreen from 'expo-splash-screen';
import * as Updates from 'expo-updates';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TamaguiProvider } from '@tamagui/core';

import { tamaguiConfig } from '@/theme/tamagui.config';
import { RootNavigator } from '@/navigation/RootNavigator';
import { notificationService } from '@/services/notification.service';

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
    async function onFetchUpdateAsync() {
      try {
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          await Updates.fetchUpdateAsync();
          await Updates.reloadAsync();
        }
      } catch (error) {
        console.log(`Error fetching latest Expo update: ${error}`);
      }
    }

    if (fontsLoaded) {
      // Hide splash after fonts load
      SplashScreen.hideAsync();
      // Setup notifications
      notificationService.setup();

      if (!__DEV__) {
        onFetchUpdateAsync();
      }
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
