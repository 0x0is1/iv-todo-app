import React from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenWrapper } from '../../components/layout/ScreenWrapper';
import { CustomHeader } from '../../components/layout/CustomHeader';
import { AppText } from '../../components/common/AppText';
import { AppButton } from '../../components/common/AppButton';
import { AppBadge } from '../../components/common/AppBadge';
import { TaskBadgePriority } from '../../components/task/TaskBadgePriority';
import { AppDivider } from '../../components/common/AppDivider';
import { colors } from '../../constants/colors';
import { useTaskStore } from '../../store/task.store';
import { tasksApi } from '../../services/api/tasks.api';
import { useUIStore } from '../../store/ui.store';
import { dateHelpers } from '../../utils/dateHelpers';
import { notificationService } from '../../services/notification.service';

const TaskDetailScreen = ({ route, navigation }: any) => {
    const { taskId } = route.params;
    const { tasks, fetchTasks } = useTaskStore();
    const { showToast } = useUIStore();

    const task = tasks.find(t => t._id === taskId);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: task ? task.title : 'Task Detail',
            headerRight: () => (
                <Ionicons
                    name="create-outline"
                    size={24}
                    color={colors.accentPrimary}
                    onPress={() => task && navigation.navigate('EditTask', { task })}
                    style={{ padding: 8 }}
                />
            )
        });
    }, [navigation, task]);

    if (!task) return null; // Or a fallback view

    const isCompleted = task.status === 'completed';

    const getDeadlineColor = () => {
        if (isCompleted) return colors.textMuted;
        if (dateHelpers.isOverdue(task.deadline)) return colors.danger;
        if (dateHelpers.isDueSoon(task.deadline)) return colors.warning;
        return colors.textPrimary;
    };

    const handleToggleStatus = async () => {
        try {
            const updatedTask = await tasksApi.toggleComplete(task._id);
            if (updatedTask.status === 'completed') {
                await notificationService.cancelTaskReminder(task._id);
            } else {
                await notificationService.scheduleTaskReminder(updatedTask._id, updatedTask.title, updatedTask.deadline);
            }
            await fetchTasks();
            showToast(isCompleted ? 'Marked pending' : 'Marked completed', 'success');
        } catch (error) {
            showToast('Failed to update task', 'error');
        }
    };

    const handleDelete = () => {
        Alert.alert(
            "Delete Task",
            "Are you sure you want to delete this task? This cannot be undone.",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await tasksApi.deleteTask(task._id);
                            await notificationService.cancelTaskReminder(task._id);
                            await fetchTasks();
                            showToast('Task deleted', 'info');
                            navigation.goBack();
                        } catch (error) {
                            showToast('Failed to delete task', 'error');
                        }
                    }
                }
            ]
        );
    };

    return (
        <ScreenWrapper>
            <CustomHeader title="Task Details" showBackButton />
            <ScrollView contentContainerStyle={styles.container}>
                <AppText variant="heading2" style={[styles.title, isCompleted && styles.completedText]}>
                    {task.title}
                </AppText>

                {task.description && (
                    <AppText style={[styles.description, isCompleted && styles.completedText]}>
                        {task.description}
                    </AppText>
                )}

                <AppDivider />

                <View style={styles.detailRow}>
                    <Ionicons name="calendar-outline" size={20} color={colors.textSecondary} />
                    <View style={styles.detailTextContainer}>
                        <AppText variant="small" style={styles.label}>Task Date & Time</AppText>
                        <AppText style={styles.value}>{dateHelpers.formatForDisplay(task.dateTime)}</AppText>
                    </View>
                </View>

                <View style={styles.detailRow}>
                    <Ionicons name="alarm-outline" size={20} color={colors.textSecondary} />
                    <View style={styles.detailTextContainer}>
                        <AppText variant="small" style={styles.label}>Deadline</AppText>
                        <AppText style={[styles.value, { color: getDeadlineColor(), fontWeight: '600' }]}>
                            {dateHelpers.formatForDisplay(task.deadline)}
                        </AppText>
                    </View>
                </View>

                <View style={styles.detailRow}>
                    <Ionicons name="flag-outline" size={20} color={colors.textSecondary} />
                    <View style={styles.detailTextContainer}>
                        <AppText variant="small" style={styles.label}>Priority</AppText>
                        <TaskBadgePriority priority={task.priority} />
                    </View>
                </View>

                {task.category && (
                    <View style={styles.detailRow}>
                        <Ionicons name="pricetag-outline" size={20} color={colors.textSecondary} />
                        <View style={styles.detailTextContainer}>
                            <AppText variant="small" style={styles.label}>Category</AppText>
                            <AppBadge label={task.category} bgColor={colors.bgTertiary} textColor={colors.textPrimary} />
                        </View>
                    </View>
                )}

                <View style={styles.detailRow}>
                    <Ionicons name="checkmark-circle-outline" size={20} color={colors.textSecondary} />
                    <View style={styles.detailTextContainer}>
                        <AppText variant="small" style={styles.label}>Status</AppText>
                        <AppBadge
                            label={isCompleted ? 'Completed' : 'Pending'}
                            bgColor={isCompleted ? colors.success + '20' : colors.warning + '20'}
                            textColor={isCompleted ? colors.success : colors.warning}
                        />
                    </View>
                </View>

            </ScrollView>

            <View style={styles.footer}>
                <AppButton
                    label={isCompleted ? "Mark Pending" : "Mark Complete"}
                    variant={isCompleted ? "outlined" : "filled"}
                    colorType={isCompleted ? "accent" : "success"}
                    onPress={handleToggleStatus}
                    style={styles.actionButton}
                />
                <AppButton
                    label="Delete Task"
                    variant="outlined"
                    colorType="danger"
                    onPress={handleDelete}
                    style={styles.actionButton}
                />
            </View>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 24,
        paddingBottom: 40,
    },
    title: {
        color: colors.textPrimary,
        marginBottom: 12,
    },
    description: {
        lineHeight: 22,
        color: colors.textSecondary,
    },
    completedText: {
        color: colors.textMuted,
        textDecorationLine: 'line-through',
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 24,
    },
    detailTextContainer: {
        marginLeft: 16,
        flex: 1,
    },
    label: {
        color: colors.textSecondary,
        marginBottom: 4,
    },
    value: {
        color: colors.textPrimary,
    },
    footer: {
        padding: 24,
        paddingBottom: 40,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        backgroundColor: colors.bgSecondary,
    },
    actionButton: {
        marginBottom: 12,
    },
});

export default TaskDetailScreen;
