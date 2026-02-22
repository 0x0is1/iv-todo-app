import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useUIStore } from '@/store/ui.store';
import { useTheme, useStyles } from '@/theme/useTheme';
import { ThemeColors } from '@/constants/colors';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

export const AppGlobalLoader = () => {
    const { colors } = useTheme();
    const styles = useStyles(createStyles);

    const { isGlobalLoading } = useUIStore();

    if (!isGlobalLoading) return null;

    return (
        <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
            style={styles.container}
        >
            <View style={styles.loaderBox}>
                <ActivityIndicator size="large" color={colors.accentPrimary} />
            </View>
        </Animated.View>
    );
};

const createStyles = (colors: ThemeColors) => StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 99999,
        elevation: 99999,
    },
    loaderBox: {
        backgroundColor: colors.bgSecondary,
        padding: 24,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    }
});
