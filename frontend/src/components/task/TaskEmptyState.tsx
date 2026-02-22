import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from '@/components/common/AppText';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, useStyles } from '@/theme/useTheme';
import { ThemeColors } from '@/constants/colors';

export const TaskEmptyState = () => {
    const { colors } = useTheme();
    const styles = useStyles(createStyles);

    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <Ionicons name="checkmark-done-circle" size={80} color={colors.textMuted} />
            </View>
            <AppText variant="heading3" style={styles.title}>All clear!</AppText>
            <AppText variant="muted" style={styles.subtitle}>No tasks match your current filters.</AppText>
        </View>
    );
};

const createStyles = (colors: ThemeColors) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        marginTop: 60,
    },
    iconContainer: {
        marginBottom: 20,
        opacity: 0.5,
    },
    title: {
        marginBottom: 8,
    },
    subtitle: {
        textAlign: 'center',
    },
});
