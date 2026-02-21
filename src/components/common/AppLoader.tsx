import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useUIStore } from '../../store/ui.store';
import { colors } from '../../constants/colors';

export const AppLoader = () => {
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

const styles = StyleSheet.create({
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
