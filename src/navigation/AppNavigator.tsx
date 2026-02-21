import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { AppTabParamList, HomeStackParamList } from '../types/navigation.types';
import { colors } from '../constants/colors';

// Screens
import HomeScreen from '../screens/tasks/HomeScreen';
import AddTaskScreen from '../screens/tasks/AddTaskScreen';
import EditTaskScreen from '../screens/tasks/EditTaskScreen';
import TaskDetailScreen from '../screens/tasks/TaskDetailScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

const Tab = createBottomTabNavigator<AppTabParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();

const HomeStackNavigator = () => {
    return (
        <HomeStack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: colors.bgSecondary },
                headerTintColor: colors.textPrimary,
                headerTitleStyle: { fontFamily: 'SpaceGrotesk', fontSize: 18 },
                headerShadowVisible: false,
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
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: colors.bgSecondary,
                    borderTopColor: colors.border,
                },
                tabBarActiveTintColor: colors.accentPrimary,
                tabBarInactiveTintColor: colors.textMuted,
                tabBarShowLabel: false,
            }}
        >
            <Tab.Screen
                name="HomeTab"
                component={HomeStackNavigator}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
                    ),
                }}
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
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="add-circle" size={32} color={colors.accentPrimary} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};
