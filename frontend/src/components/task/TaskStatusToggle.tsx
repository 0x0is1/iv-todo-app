import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, useStyles } from '@/theme/useTheme';
import { ThemeColors } from '@/constants/colors';
import { TaskStatus } from '@/types/task.types';

interface TaskStatusToggleProps {
    status: TaskStatus;
    onToggle: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const TaskStatusToggle: React.FC<TaskStatusToggleProps> = ({ status, onToggle }) => {
    const { colors } = useTheme();
    const styles = useStyles(createStyles);

    const scale = useSharedValue(1);
    const isCompleted = status === 'completed';

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const handlePressIn = () => {
        scale.value = withSpring(0.8, { damping: 10, stiffness: 200 });
    };

    const handlePressOut = () => {
        scale.value = withSpring(1, { damping: 10, stiffness: 200 });
        onToggle();
    };

    return (
        <AnimatedPressable
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={[
                styles.circle,
                {
                    backgroundColor: isCompleted ? colors.success : 'transparent',
                    borderColor: isCompleted ? colors.success : colors.borderActive,
                },
                animatedStyle,
            ]}
        >
            {isCompleted && <Ionicons name="checkmark" size={16} color="white" />}
        </AnimatedPressable>
    );
};

const createStyles = (colors: ThemeColors) => StyleSheet.create({
    circle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
