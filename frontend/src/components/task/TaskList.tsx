import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { TaskCard } from '@/components/task/TaskCard';
import { TaskEmptyState } from '@/components/task/TaskEmptyState';
import { useTaskStore } from '@/store/task.store';
import { tasksApi } from '@/services/api/tasks.api';
import { sortTasks } from '@/utils/sortTasks';
import { filterTasks } from '@/utils/filterTasks';
import { useUIStore } from '@/store/ui.store';
import { useTheme, useStyles } from '@/theme/useTheme';
import { ThemeColors } from '@/constants/colors';

export const TaskList = () => {
    const { colors } = useTheme();
    const styles = useStyles(createStyles);

    const { tasks, setTasks, isLoading, setLoading, activeFilter, activeSortMode } = useTaskStore();
    const { showToast } = useUIStore();
    const [refreshing, setRefreshing] = useState(false);

    const loadTasks = async () => {
        try {
            setLoading(true);
            const data = await tasksApi.fetchTasks();
            setTasks(data);
        } catch (error) {
            // API Errors are displayed via global axios interceptor toast
            console.log('Task list load error handled globally');
        } finally {
            setLoading(false);
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await loadTasks();
        setRefreshing(false);
    };

    useEffect(() => {
        loadTasks();
    }, []); // Run on mount

    const displayTasks = sortTasks(filterTasks(tasks, activeFilter), activeSortMode);

    return (
        <FlatList
            data={displayTasks}
            keyExtractor={(item) => item._id}
            renderItem={({ item, index }) => <TaskCard task={item} index={index} />}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={!isLoading ? <TaskEmptyState /> : null}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    tintColor={colors.accentPrimary}
                    colors={[colors.accentPrimary]}
                />
            }
        />
    );
};

const createStyles = (colors: ThemeColors) => StyleSheet.create({
    listContent: {
        flexGrow: 1,
        paddingBottom: 100,
        paddingTop: 16,
    },
});
