import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { AppText } from '@/components/common/AppText';
import { useTaskStore } from '@/store/task.store';
import { useTheme, useStyles } from '@/theme/useTheme';
import { ThemeColors } from '@/constants/colors';

export const TaskFilterBar = () => {
    const { colors } = useTheme();
    const styles = useStyles(createStyles);

    const { activeFilter, setFilter, tasks } = useTaskStore();

    const handleFilterPress = (type: 'status' | 'priority' | 'category', value: string) => {
        setFilter({ [type]: value });
    };

    const Chip = ({ label, isActive, onPress }: { label: string, isActive: boolean, onPress: () => void }) => (
        <TouchableOpacity
            style={[styles.chip, isActive && styles.chipActive]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <AppText style={[styles.chipText, isActive && styles.chipTextActive]}>
                {label}
            </AppText>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <Chip label="All" isActive={activeFilter.status === 'all' && activeFilter.priority === 'all'} onPress={() => setFilter({ status: 'all', priority: 'all', category: 'all' })} />
                <View style={styles.divider} />
                <Chip label="Pending" isActive={activeFilter.status === 'pending'} onPress={() => handleFilterPress('status', 'pending')} />
                <Chip label="Completed" isActive={activeFilter.status === 'completed'} onPress={() => handleFilterPress('status', 'completed')} />
                <View style={styles.divider} />
                <Chip label="High" isActive={activeFilter.priority === 'high'} onPress={() => handleFilterPress('priority', 'high')} />
                <Chip label="Medium" isActive={activeFilter.priority === 'medium'} onPress={() => handleFilterPress('priority', 'medium')} />
                <Chip label="Low" isActive={activeFilter.priority === 'low'} onPress={() => handleFilterPress('priority', 'low')} />
            </ScrollView>
        </View>
    );
};

const createStyles = (colors: ThemeColors) => StyleSheet.create({
    container: {
        height: 42,
    },
    scrollContent: {
        paddingHorizontal: 16,
        alignItems: 'center',
    },
    chip: {
        backgroundColor: colors.bgTertiary,
        paddingHorizontal: 16,
        height: 42,
        borderRadius: 21,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    chipActive: {
        backgroundColor: colors.accentPrimary,
    },
    chipText: {
        color: colors.textPrimary,
        fontWeight: '500',
    },
    chipTextActive: {
        color: colors.bgPrimary,
    },
    divider: {
        width: 1,
        height: 20,
        backgroundColor: colors.border,
        marginRight: 8,
    }
});
