import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation.types';
import { AuthNavigator } from './AuthNavigator';
import { AppNavigator } from './AppNavigator';
import { useAuthStore } from '../store/auth.store';
import { View } from 'react-native';
import { colors } from '../constants/colors';
import { AppSplashScreen } from '../components/layout/AppSplashScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
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
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    {isAuthenticated ? (
                        <Stack.Screen name="App" component={AppNavigator} />
                    ) : (
                        <Stack.Screen name="Auth" component={AuthNavigator} />
                    )}
                </Stack.Navigator>
            </NavigationContainer>
            {splashVisible && <AppSplashScreen onFinish={() => setSplashVisible(false)} />}
        </>
    );
};
