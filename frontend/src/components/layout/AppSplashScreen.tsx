import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn, SlideInUp, runOnJS } from 'react-native-reanimated';
import { useTheme, useStyles } from '@/theme/useTheme';
import { ThemeColors } from '@/constants/colors';
import { AppText } from '@/components/common/AppText';

interface SplashProps {
    onFinish: () => void;
}

export const AppSplashScreen: React.FC<SplashProps> = ({ onFinish }) => {
    const { colors } = useTheme();
    const styles = useStyles(createStyles);

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
                    <View style={styles.brandBox}>
                        <AppText style={[styles.brand, styles.do]}>DO</AppText>
                        <AppText style={[styles.brand, styles.it]}>IT</AppText>
                    </View>
                </Animated.View>
            </Animated.View>
        </View>
    );
};

const createStyles = (colors: ThemeColors) => StyleSheet.create({
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
    brandBox: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    brand: {
        fontFamily: 'SpaceGrotesk',
        fontSize: 60,
        fontWeight: 'bold',
        lineHeight: 60,
    },
    do: {
        color: colors.textPrimary,
        letterSpacing: 4,
    },
    it: {
        color: colors.accentPrimary,
        letterSpacing: 4,
    },
});
