import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from '../common/AppText';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/colors';

export const TaskEmptyState = () => {
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

const styles = StyleSheet.create({
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
