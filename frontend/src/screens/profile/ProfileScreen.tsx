import React from 'react';
import { View, StyleSheet, Alert, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenWrapper } from '@/components/layout/ScreenWrapper';
import { AppText } from '@/components/common/AppText';
import { AppButton } from '@/components/common/AppButton';
import { AppCard } from '@/components/common/AppCard';
import { useTheme, useStyles } from '@/theme/useTheme';
import { ThemeColors } from '@/constants/colors';
import * as Notifications from 'expo-notifications';
import { useAuthStore } from '@/store/auth.store';
import { useTaskStore } from '@/store/task.store';

const ProfileScreen = () => {
    const { colors, isDark, toggleTheme } = useTheme();
    const styles = useStyles(createStyles);

    const { user, logout } = useAuthStore();
    const { tasks } = useTaskStore();

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === 'completed').length;
    const pendingTasks = totalTasks - completedTasks;

    const handleLogout = () => {
        Alert.alert(
            "Logout",
            "Are you sure you want to logout?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Logout",
                    style: "destructive",
                    onPress: async () => {
                        await logout();
                    }
                }
            ]
        );
    };

    const handleTestNotification = async () => {
        try {
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: "Test Notification! 🚀",
                    body: "If you see this, notifications are working.",
                    sound: true,
                },
                trigger: {
                    type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
                    seconds: 5,
                    repeats: false
                }
            });
            Alert.alert("Scheduled", "Notification will trigger in 5 seconds. Put the app in background to test!");
        } catch (error: any) {
            Alert.alert("Error", error.message);
        }
    };

    if (!user) return null;

    return (
        <ScreenWrapper style={styles.container}>
            <View style={styles.header}>
                <AppText variant="heading3" style={styles.headerText}>Profile</AppText>
            </View>

            <View style={styles.userInfo}>
                <Ionicons name="person-circle" size={100} color={colors.accentPrimary} />
                <AppText variant="heading2" style={styles.name}>{user.name}</AppText>
                <AppText style={styles.email}>{user.email}</AppText>
            </View>

            <AppCard style={styles.statsCard}>
                <View style={styles.statItem}>
                    <AppText variant="heading2" style={styles.statNumber}>{totalTasks}</AppText>
                    <AppText variant="small" style={styles.statLabel}>Total Tasks</AppText>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                    <AppText variant="heading2" style={[styles.statNumber, { color: colors.success }]}>{completedTasks}</AppText>
                    <AppText variant="small" style={styles.statLabel}>Completed</AppText>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                    <AppText variant="heading2" style={[styles.statNumber, { color: colors.warning }]}>{pendingTasks}</AppText>
                    <AppText variant="small" style={styles.statLabel}>Pending</AppText>
                </View>
            </AppCard>

            <View style={styles.section}>
                <View style={styles.row}>
                    <Ionicons name="mail-outline" size={20} color={colors.textSecondary} />
                    <AppText style={styles.rowText}>Email</AppText>
                    <AppText style={styles.rowValue}>{user.email}</AppText>
                </View>
                <View style={[styles.row]}>
                    <Ionicons name="color-palette-outline" size={20} color={colors.textSecondary} />
                    <AppText style={styles.rowText}>Dark Mode</AppText>
                    <Switch
                        value={isDark}
                        style={{ marginVertical: -20 }}
                        onValueChange={toggleTheme}
                        trackColor={{ false: colors.border, true: colors.accentPrimary }}
                        thumbColor={isDark ? '#FFF' : '#FFF'}
                    />
                </View>
                <View style={styles.row}>
                    <Ionicons name="calendar-outline" size={20} color={colors.textSecondary} />
                    <AppText style={styles.rowText}>Member Since</AppText>
                    <AppText style={styles.rowValue}>Just now</AppText>
                </View>
            </View>

            <View style={styles.footer}>
                <AppButton
                    label="Logout"
                    variant="outlined"
                    colorType="danger"
                    onPress={handleLogout}
                    style={styles.logoutButton}
                />
            </View>
            <View
                style={styles.fabContainer}
                onTouchEnd={handleTestNotification}
            >
                <Ionicons name="notifications" size={24} color="#FFF" />
            </View>
        </ScreenWrapper>
    );
};

const createStyles = (colors: ThemeColors) => StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    },
    header: {
        paddingVertical: 16,
        alignItems: 'center',
    },
    headerText: {
        color: colors.textPrimary,
    },
    userInfo: {
        alignItems: 'center',
        marginVertical: 16,
    },
    name: {
        marginTop: 16,
        color: colors.textPrimary,
    },
    email: {
        color: colors.textMuted,
        marginTop: 4,
    },
    statsCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 24,
        marginBottom: 32,
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statNumber: {
        color: colors.accentPrimary,
        marginBottom: 4,
    },
    statLabel: {
        color: colors.textSecondary,
        fontWeight: '500',
    },
    statDivider: {
        width: 1,
        height: 40,
        backgroundColor: colors.border,
        alignSelf: 'center',
    },
    section: {
        backgroundColor: colors.bgSecondary,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.border,
        overflow: 'hidden',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    rowText: {
        flex: 1,
        marginLeft: 12,
        color: colors.textPrimary,
    },
    rowValue: {
        color: colors.textSecondary,
    },
    footer: {
        marginTop: 'auto',
        marginBottom: 120,
    },
    logoutButton: {
        borderColor: colors.danger,
    },
    fabContainer: {
        position: 'absolute',
        bottom: 30,
        right: 20,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: colors.accentPrimary,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: colors.accentPrimary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
        zIndex: 1000,
    }
});

export default ProfileScreen;
