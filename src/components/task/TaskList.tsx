import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { TaskCard } from './TaskCard';
import { TaskEmptyState } from './TaskEmptyState';
import { useTaskStore } from '../../store/task.store';
import { tasksApi } from '../../services/api/tasks.api';
import { sortTasks } from '../../utils/sortTasks';
import { filterTasks } from '../../utils/filterTasks';
import { useUIStore } from '../../store/ui.store';
import { colors } from '../../constants/colors';

export const TaskList = () => {
    const { tasks, setTasks, isLoading, setLoading, activeFilter, activeSortMode } = useTaskStore();
    const { showToast } = useUIStore();
    const [refreshing, setRefreshing] = useState(false);

    const loadTasks = async () => {
        try {
            setLoading(true);
            const data = await tasksApi.fetchTasks();
            setTasks(data);
        } catch (error) {
            showToast('Failed to load tasks', 'error');
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

const styles = StyleSheet.create({
    listContent: {
        flexGrow: 1,
        paddingBottom: 24,
    },
});
