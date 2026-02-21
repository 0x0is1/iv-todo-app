import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn, SlideInUp, runOnJS } from 'react-native-reanimated';
import { colors } from '../../constants/colors';
import { AppText } from '../../components/common/AppText';

interface SplashProps {
    onFinish: () => void;
}

export const AppSplashScreen: React.FC<SplashProps> = ({ onFinish }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onFinish();
        }, 1400); // 800ms animation + 600ms wait
        return () => clearTimeout(timer);
    }, [onFinish]);

    return (
        <View style={styles.container}>
            <Animated.View entering={FadeIn.duration(800)} style={styles.textContainer}>
                <Animated.View entering={SlideInUp.duration(800).withInitialValues({ transform: [{ translateY: 10 }] })}>
                    <AppText style={styles.brand}>
                        <AppText style={styles.do}>DO</AppText>
                        <AppText style={styles.it}>IT</AppText>
                    </AppText>
                    <AppText style={styles.tagline}>Get it done.</AppText>
                </Animated.View>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: colors.bgPrimary,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 99999,
    },
    textContainer: {
        alignItems: 'center',
    },
    brand: {
        fontFamily: 'SpaceGrotesk',
        fontSize: 48,
        fontWeight: 'bold',
    },
    do: {
        color: '#F0F0F5',
    },
    it: {
        color: colors.accentPrimary,
    },
    tagline: {
        fontFamily: 'Inter',
        fontSize: 16,
        color: colors.textMuted,
        marginTop: 8,
    },
});
