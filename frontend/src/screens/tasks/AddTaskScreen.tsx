import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScreenWrapper } from '@/components/layout/ScreenWrapper';
import { CustomHeader } from '@/components/layout/CustomHeader';
import { TaskForm } from '@/components/task/TaskForm';
import { tasksApi } from '@/services/api/tasks.api';
import { useTaskStore } from '@/store/task.store';
import { useUIStore } from '@/store/ui.store';
import { useTheme, useStyles } from '@/theme/useTheme';
import { ThemeColors } from '@/constants/colors';
import { notificationService } from '@/services/notification.service';

const AddTaskScreen = ({ navigation }: any) => {
    const { colors } = useTheme();
    const styles = useStyles(createStyles);

    const [isLoading, setIsLoading] = useState(false);
    const { fetchTasks } = useTaskStore();
    const { showToast } = useUIStore();

    const handleCreateTask = async (data: any) => {
        setIsLoading(true);
        try {
            const newTask = await tasksApi.createTask({
                ...data,
                status: 'pending'
            });
            await notificationService.scheduleTaskReminder(newTask._id, newTask.title, newTask.deadline);
            await fetchTasks();
            showToast('Task added successfully', 'success');
            navigation.goBack();
        } catch (error) {
            // API Errors are displayed via global axios interceptor toast
            console.log('AddTask error handled globally');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ScreenWrapper withBottomInset style={styles.container}>
            <CustomHeader title="Add Task" showBackButton />
            <TaskForm
                onSubmit={handleCreateTask}
                isLoading={isLoading}
                submitLabel="Save Task"
            />
        </ScreenWrapper>
    );
};

const createStyles = (colors: ThemeColors) => StyleSheet.create({
    container: {
        backgroundColor: colors.bgSecondary,
    },
});

export default AddTaskScreen;
