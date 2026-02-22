import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from '@/types/navigation.types';
import { AuthNavigator } from '@/navigation/AuthNavigator';
import { AppNavigator } from '@/navigation/AppNavigator';
import { useAuthStore } from '@/store/auth.store';
import { View } from 'react-native';
import { useTheme, useStyles } from '@/theme/useTheme';
import { ThemeColors } from '@/constants/colors';
import { AppSplashScreen } from '@/components/layout/AppSplashScreen';
import { AppToast } from '@/components/common/AppToast';
import { AppGlobalLoader } from '@/components/common/AppGlobalLoader';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
    const { colors } = useTheme();

    const { isAuthenticated, isReady, restoreSession } = useAuthStore();
    const [splashVisible, setSplashVisible] = React.useState(true);

    useEffect(() => {
        restoreSession();
    }, [restoreSession]);

    if (!isReady) {
        // Show a blank bg-primary screen while restoring session
        return <View style={{ flex: 1, backgroundColor: colors.bgPrimary }} />;
    }

    return (
        <>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
                    {isAuthenticated ? (
                        <Stack.Screen name="App" component={AppNavigator} />
                    ) : (
                        <Stack.Screen name="Auth" component={AuthNavigator} />
                    )}
                </Stack.Navigator>
            </NavigationContainer>
            <AppToast />
            <AppGlobalLoader />
            {splashVisible && <AppSplashScreen onFinish={() => setSplashVisible(false)} />}
        </>
    );
};
