import React from 'react';
import { ActivityIndicator, Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { styled } from 'tamagui';
import { AppText } from './AppText';
import { colors } from '../../constants/colors';

export interface AppButtonProps extends PressableProps {
    label: string;
    variant?: 'filled' | 'outlined' | 'ghost';
    colorType?: 'accent' | 'danger' | 'success';
    loading?: boolean;
    style?: StyleProp<ViewStyle>;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const AppButton: React.FC<AppButtonProps> = ({
    label,
    variant = 'filled',
    colorType = 'accent',
    loading = false,
    disabled,
    onPressIn,
    onPressOut,
    style,
    ...rest
}) => {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const handlePressIn = (e: any) => {
        scale.value = withSpring(0.96, { damping: 15, stiffness: 300 });
        if (onPressIn) onPressIn(e);
    };

    const handlePressOut = (e: any) => {
        scale.value = withSpring(1, { damping: 15, stiffness: 300 });
        if (onPressOut) onPressOut(e);
    };

    const baseColor = colorType === 'accent' ? colors.accentPrimary : colorType === 'danger' ? colors.danger : colors.success;

    const getBgColor = () => {
        if (variant === 'filled') return baseColor;
        return 'transparent';
    };

    const getBorderColor = () => {
        if (variant === 'outlined') return baseColor;
        return 'transparent';
    };

    const getTextColor = () => {
        if (variant === 'filled') return 'white';
        return baseColor;
    };

    const opacity = disabled || loading ? 0.6 : 1;

    return (
        <AnimatedPressable
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            disabled={disabled || loading}
            style={[
                {
                    height: 52,
                    borderRadius: 10,
                    backgroundColor: getBgColor(),
                    borderColor: getBorderColor(),
                    borderWidth: variant === 'outlined' ? 1 : 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity,
                    paddingHorizontal: 16,
                },
                animatedStyle,
                style,
            ]}
            {...rest}
        >
            {loading ? (
                <ActivityIndicator color={getTextColor()} />
            ) : (
                <AppText style={{ color: getTextColor(), fontFamily: 'SpaceGrotesk', fontWeight: 'bold' }}>
                    {label}
                </AppText>
            )}
        </AnimatedPressable>
    );
};
