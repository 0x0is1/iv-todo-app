import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScreenWrapper } from '../../components/layout/ScreenWrapper';
import { TaskForm } from '../../components/task/TaskForm';
import { tasksApi } from '../../services/api/tasks.api';
import { useTaskStore } from '../../store/task.store';
import { useUIStore } from '../../store/ui.store';
import { colors } from '../../constants/colors';

const AddTaskScreen = ({ navigation }: any) => {
    const [isLoading, setIsLoading] = useState(false);
    const { fetchTasks } = useTaskStore();
    const { showToast } = useUIStore();

    const handleCreateTask = async (data: any) => {
        setIsLoading(true);
        try {
            await tasksApi.createTask({
                ...data,
                status: 'pending'
            });
            await fetchTasks();
            showToast('Task added successfully', 'success');
            navigation.goBack();
        } catch (error) {
            showToast('Failed to add task', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ScreenWrapper withBottomInset style={styles.container}>
            <TaskForm
                onSubmit={handleCreateTask}
                isLoading={isLoading}
                submitLabel="Save Task"
            />
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.bgSecondary,
    },
});

export default AddTaskScreen;
