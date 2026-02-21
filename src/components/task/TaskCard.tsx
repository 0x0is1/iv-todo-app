import React from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Animated, { FadeInDown, FadeOutLeft } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../types/navigation.types';
import { Task } from '../../types/task.types';
import { AppCard } from '../common/AppCard';
import { AppText } from '../common/AppText';
import { TaskStatusToggle } from './TaskStatusToggle';
import { TaskBadgePriority } from './TaskBadgePriority';
import { colors } from '../../constants/colors';
import { dateHelpers } from '../../utils/dateHelpers';
import { useTaskStore } from '../../store/task.store';
import { tasksApi } from '../../services/api/tasks.api';
import { useUIStore } from '../../store/ui.store';

interface TaskCardProps {
    task: Task;
    index: number;
}

type NavigationProp = NativeStackNavigationProp<HomeStackParamList>;

export const TaskCard: React.FC<TaskCardProps> = ({ task, index }) => {
    const navigation = useNavigation<NavigationProp>();
    const { fetchTasks } = useTaskStore();
    const { showToast } = useUIStore();
    const isCompleted = task.status === 'completed';

    const getBorderColor = () => {
        switch (task.priority) {
            case 'high': return colors.danger;
            case 'medium': return colors.warning;
            case 'low': return colors.info;
            default: return 'transparent';
        }
    };

    const getDeadlineColor = () => {
        if (isCompleted) return colors.textMuted;
        if (dateHelpers.isOverdue(task.deadline)) return colors.danger;
        if (dateHelpers.isDueSoon(task.deadline)) return colors.warning;
        return colors.textMuted;
    };

    const handleToggle = async () => {
        try {
            await tasksApi.toggleComplete(task._id);
            await fetchTasks(); // Sync
            showToast('Task updated', 'success');
        } catch (error) {
            showToast('Failed to update task', 'error');
        }
    };

    const handleLongPress = () => {
        Alert.alert(
            "Delete Task",
            "Are you sure you want to delete this task?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await tasksApi.deleteTask(task._id);
                            await fetchTasks();
                            showToast('Task deleted', 'info');
                        } catch (error) {
                            showToast('Failed to delete task', 'error');
                        }
                    }
                }
            ]
        );
    };

    return (
        <Animated.View
            entering={FadeInDown.delay(Math.min(index * 50, 300)).springify()}
            exiting={FadeOutLeft}
        >
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('TaskDetail', { taskId: task._id })}
                onLongPress={handleLongPress}
            >
                <AppCard style={[
                    styles.card,
                    { borderLeftWidth: 3, borderLeftColor: getBorderColor() },
                    isCompleted && styles.completedCard
                ]}>
                    <View style={styles.leftContent}>
                        <TaskStatusToggle status={task.status} onToggle={handleToggle} />
                    </View>

                    <View style={styles.centerContent}>
                        <AppText
                            style={[
                                styles.title,
                                isCompleted && styles.completedText
                            ]}
                            numberOfLines={1}
                        >
                            {task.title}
                        </AppText>
                        {task.description && (
                            <AppText
                                variant="small"
                                style={[styles.description, isCompleted && styles.completedText]}
                                numberOfLines={1}
                            >
                                {task.description}
                            </AppText>
                        )}
                        <AppText
                            variant="small"
                            style={{ color: getDeadlineColor(), marginTop: 4, fontWeight: '500' }}
                        >
                            Due {dateHelpers.formatForDisplay(task.deadline)}
                        </AppText>
                    </View>

                    <View style={styles.rightContent}>
                        <TaskBadgePriority priority={task.priority} />
                    </View>
                </AppCard>
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        marginHorizontal: 16,
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    completedCard: {
        opacity: 0.6,
    },
    leftContent: {
        marginRight: 16,
    },
    centerContent: {
        flex: 1,
        justifyContent: 'center',
    },
    rightContent: {
        marginLeft: 12,
        alignItems: 'flex-end',
    },
    title: {
        fontFamily: 'SpaceGrotesk',
        fontWeight: '600',
        fontSize: 16,
    },
    description: {
        color: colors.textSecondary,
        marginTop: 2,
    },
    completedText: {
        textDecorationLine: 'line-through',
        color: colors.textMuted,
    },
});
