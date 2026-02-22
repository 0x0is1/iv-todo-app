import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { ScreenWrapper } from '../../components/layout/ScreenWrapper';
import { CustomHeader } from '../../components/layout/CustomHeader';
import { TaskForm } from '../../components/task/TaskForm';
import { tasksApi } from '../../services/api/tasks.api';
import { useTaskStore } from '../../store/task.store';
import { useUIStore } from '../../store/ui.store';
import { colors } from '../../constants/colors';
import { notificationService } from '../../services/notification.service';

const EditTaskScreen = ({ route, navigation }: any) => {
    const { task } = route.params;
    const [isLoading, setIsLoading] = useState(false);
    const { fetchTasks } = useTaskStore();
    const { showToast } = useUIStore();

    const handleUpdateTask = async (data: any) => {
        setIsLoading(true);
        try {
            const updatedTask = await tasksApi.updateTask(task._id, data);
            await notificationService.scheduleTaskReminder(updatedTask._id, updatedTask.title, updatedTask.deadline);
            await fetchTasks();
            showToast('Task updated successfully', 'success');
            navigation.goBack();
        } catch (error) {
            showToast('Failed to update task', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ScreenWrapper withBottomInset style={styles.container}>
            <CustomHeader title="Edit Task" showBackButton />
            <TaskForm
                initialValues={task}
                onSubmit={handleUpdateTask}
                isLoading={isLoading}
                submitLabel="Update Task"
            />
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.bgSecondary,
    },
});

export default EditTaskScreen;
