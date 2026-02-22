import * as Notifications from 'expo-notifications';
import { Platform, Alert, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
});

export const notificationService = {
    async setup() {
        if (Platform.OS === 'android') {
            // Default channel for general notifications
            await Notifications.setNotificationChannelAsync('default', {
                name: 'General',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#00D4FF',
            });

            // Alarm channel for deadline reminders — plays on ALARM volume
            await Notifications.setNotificationChannelAsync('task_alarms_v1', {
                name: 'Task Alarms',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 500, 200, 500, 200, 500],
                lightColor: '#FF4560',
                sound: 'default',
                audioAttributes: {
                    usage: Notifications.AndroidAudioUsage.ALARM,
                    contentType: Notifications.AndroidAudioContentType.SONIFICATION,
                },
            });
        }

        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            Alert.alert('Permission Denied', 'Notifications are disabled. Please enable them in your device settings.');
            return false;
        }

        return true;
    },

    async requestBatteryOptimizationExemption() {
        if (Platform.OS !== 'android') return;

        // Only prompt once
        const alreadyAsked = await AsyncStorage.getItem('battery_opt_asked');
        if (alreadyAsked) return;

        await AsyncStorage.setItem('battery_opt_asked', 'true');

        Alert.alert(
            'Keep Alarms Reliable',
            'To ensure task reminders work even when the app is closed, please disable battery optimization for DOIT.\n\nTap "Open Settings" and select "Unrestricted" or "Don\'t optimize".',
            [
                { text: 'Later', style: 'cancel' },
                {
                    text: 'Open Settings',
                    onPress: () => {
                        // Opens the battery optimization settings for this app
                        Linking.openSettings();
                    },
                },
            ]
        );
    },

    async scheduleTaskReminder(taskId: string, title: string, deadline: string) {
        // --- 1. Validate the deadline ---
        if (!deadline) {
            console.warn('scheduleTaskReminder: no deadline provided, skipping.');
            return;
        }

        const deadlineDate = new Date(deadline);
        if (isNaN(deadlineDate.getTime())) {
            console.warn('scheduleTaskReminder: invalid deadline date string:', deadline);
            return;
        }

        const now = new Date();

        // --- 3. Schedule the actual deadline reminder ---
        if (deadlineDate.getTime() <= now.getTime()) {
            return;
        }

        // Try these trigger windows in order: 1 hour before, 10 minutes before, 1 minute before
        const triggerWindows = [
            { label: '1 hour', ms: 60 * 60 * 1000 },
            { label: '10 minutes', ms: 10 * 60 * 1000 },
            { label: '1 minute', ms: 1 * 60 * 1000 },
        ];

        let triggerMs: number | null = null;
        for (const window of triggerWindows) {
            const candidateMs = deadlineDate.getTime() - window.ms - now.getTime();
            if (candidateMs > 0) {
                triggerMs = candidateMs;
                break;
            }
        }

        if (!triggerMs || triggerMs < 1000) {
            return;
        }

        const triggerSeconds = Math.max(Math.floor(triggerMs / 1000), 1);

        try {
            await notificationService.cancelTaskReminder(taskId);

            const identifier = await Notifications.scheduleNotificationAsync({
                content: {
                    title: '⏰ Task Reminder',
                    body: `"${title}" is due soon!`,
                    sound: true,
                },
                trigger: {
                    type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
                    seconds: triggerSeconds,
                    repeats: false,
                    channelId: 'task_alarms_v1',
                },
            });

            await AsyncStorage.setItem(`notification_${taskId}`, identifier);
        } catch (e: any) {
            console.log(`[NOTIF] ❌ ERROR at scheduling: ${e.message}`);
            console.log(`[NOTIF] ❌ Full error:`, JSON.stringify(e));
            Alert.alert('Notification Error', `Could not schedule reminder: ${e.message}`);
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
            console.warn('Failed to cancel notification:', e);
        }
    }
};

