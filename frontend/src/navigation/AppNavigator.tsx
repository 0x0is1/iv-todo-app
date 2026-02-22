import React from 'react';
import { View, StyleSheet, Platform, StatusBar } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { AppTabParamList, HomeStackParamList } from '@/types/navigation.types';
import { useTheme, useStyles } from '@/theme/useTheme';
import { ThemeColors } from '@/constants/colors';

// Screens
import HomeScreen from '@/screens/tasks/HomeScreen';
import AddTaskScreen from '@/screens/tasks/AddTaskScreen';
import EditTaskScreen from '@/screens/tasks/EditTaskScreen';
import TaskDetailScreen from '@/screens/tasks/TaskDetailScreen';
import ProfileScreen from '@/screens/profile/ProfileScreen';

const Tab = createBottomTabNavigator<AppTabParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();

const HomeStackNavigator = () => {
    const { colors } = useTheme();
    const styles = useStyles(createStyles);

    return (
        <HomeStack.Navigator
            screenOptions={{
                headerShown: false,
                animation: 'fade',
            }}
        >
            <HomeStack.Screen name="Home" component={HomeScreen} options={{ title: 'DOIT' }} />
            <HomeStack.Screen name="TaskDetail" component={TaskDetailScreen} options={{ title: 'Task Details' }} />
            <HomeStack.Screen name="EditTask" component={EditTaskScreen} options={{ title: 'Edit Task' }} />
            <HomeStack.Screen name="AddTask" component={AddTaskScreen} options={{ title: 'Add Task' }} />
        </HomeStack.Navigator>
    );
};

export const AppNavigator = () => {
    const { colors } = useTheme();
    const styles = useStyles(createStyles);

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: styles.tabBarStyle,
                tabBarIconStyle: {
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1
                },
                tabBarActiveTintColor: colors.accentPrimary,
                tabBarInactiveTintColor: colors.textMuted,
                tabBarShowLabel: false,
            }}
        >
            <Tab.Screen
                name="HomeTab"
                component={HomeStackNavigator}
                options={({ route }) => ({
                    tabBarIcon: ({ color, focused }) => (
                        <View style={[
                            styles.iconContainer,
                            focused && { backgroundColor: colors.accentPrimary + '20' }
                        ]}>
                            <Ionicons name="home" size={24} color={color} />
                        </View>
                    ),
                    tabBarStyle: ((route) => {
                        const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
                        if (routeName === 'AddTask' || routeName === 'EditTask' || routeName === 'TaskDetail') {
                            return { display: 'none' };
                        }
                        return styles.tabBarStyle;
                    })(route),
                })}
            />
            <Tab.Screen
                name="AddTaskDummy"
                component={AddTaskScreen} // Never really stays here, overriden below
                listeners={({ navigation }) => ({
                    tabPress: (e) => {
                        e.preventDefault();
                        // We push the AddTask screen onto the current HomeStack
                        navigation.navigate('HomeTab', { screen: 'AddTask' });
                    },
                })}
                options={{
                    tabBarIcon: () => (
                        <View style={styles.iconContainer}>
                            <Ionicons name="add-circle" size={32} color={colors.success} />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <View style={[
                            styles.iconContainer,
                            focused && { backgroundColor: colors.accentPrimary + '20' }
                        ]}>
                            <Ionicons name="person" size={24} color={color} />
                        </View>
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

const createStyles = (colors: ThemeColors) => StyleSheet.create({
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabBarStyle: {
        position: 'absolute',
        bottom: 25,
        left: 20,
        right: 20,
        backgroundColor: colors.bgSecondary,
        borderRadius: 20,
        height: 64,
        borderTopWidth: 0,
        paddingBottom: 0,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        marginHorizontal: 16,
    },
});
