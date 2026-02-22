import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useUIStore } from '@/store/ui.store';
import { useTheme, useStyles } from '@/theme/useTheme';
import { ThemeColors } from '@/constants/colors';

export const AppLoader = () => {
    const { colors } = useTheme();
    const styles = useStyles(createStyles);

    const { isGlobalLoading } = useUIStore();

    if (!isGlobalLoading) return null;

    return (
        <View style={styles.container}>
            <View style={styles.loaderBox}>
                <ActivityIndicator size="large" color={colors.accentPrimary} />
            </View>
        </View>
    );
};

const createStyles = (colors: ThemeColors) => StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: colors.overlay,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10000,
    },
    loaderBox: {
        backgroundColor: colors.bgSecondary,
        padding: 24,
        borderRadius: 16,
    },
});
