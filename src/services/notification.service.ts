import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true
    }),
});

export const notificationService = {
    async setup() {
        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#00D4FF',
            });
        }

        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        return finalStatus === 'granted';
    },

    async scheduleTaskReminder(taskId: string, title: string, deadline: string) {
        const deadlineDate = new Date(deadline);
        const now = new Date();

        // If deadline has passed, do not schedule
        if (deadlineDate.getTime() <= now.getTime()) {
            return;
        }

        let triggerDate = new Date(deadlineDate.getTime() - 60 * 60 * 1000); // 1 hour before

        // If 1 hour before is in the past, schedule 5 minutes before instead
        if (triggerDate.getTime() <= now.getTime()) {
            triggerDate = new Date(deadlineDate.getTime() - 5 * 60 * 1000); // 5 minutes before

            // If even 5 minutes before is in the past, don't schedule
            if (triggerDate.getTime() <= now.getTime()) {
                return;
            }
        }

        try {
            // First cancel any existing reminder for this task
            await this.cancelTaskReminder(taskId);

            const identifier = await Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Task Reminder',
                    body: `"${title}" is due soon!`,
                    sound: true,
                },
                trigger: {
                    type: Notifications.SchedulableTriggerInputTypes.DATE,
                    date: triggerDate
                },
            });

            // Save the identifier keyed by taskId so we can cancel it later
            await AsyncStorage.setItem(`notification_${taskId}`, identifier);
        } catch (e) {
            console.warn("Failed to schedule notification:", e);
        }
    },

    async cancelTaskReminder(taskId: string) {
        try {
            const identifier = await AsyncStorage.getItem(`notification_${taskId}`);
            if (identifier) {
                await Notifications.cancelScheduledNotificationAsync(identifier);
                await AsyncStorage.removeItem(`notification_${taskId}`);
            }
        } catch (e) {
            console.warn("Failed to cancel notification:", e);
        }
    }
};
