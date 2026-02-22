import { NavigatorScreenParams } from '@react-navigation/native';
import { Task } from '@/types/task.types';

export type AuthStackParamList = {
    Login: undefined;
    Register: undefined;
};

export type AppTabParamList = {
    HomeTab: NavigatorScreenParams<HomeStackParamList>;
    AddTaskDummy: undefined; // Used for custom tab button
    Profile: undefined;
};

export type HomeStackParamList = {
    Home: undefined;
    AddTask: undefined;
    EditTask: { task: Task };
    TaskDetail: { taskId: string };
};

export type RootStackParamList = {
    Auth: NavigatorScreenParams<AuthStackParamList>;
    App: NavigatorScreenParams<AppTabParamList>;
};
