import React from 'react';
import { View, StyleSheet, ViewProps, Platform, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme, useStyles } from '@/theme/useTheme';
import { ThemeColors } from '@/constants/colors';

export interface ScreenWrapperProps extends ViewProps {
    children: React.ReactNode;
    withTopInset?: boolean;
    withBottomInset?: boolean;
}

export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
    children,
    withTopInset = true,
    withBottomInset = true,
    style,
    ...rest
}) => {
    const { colors } = useTheme();
    const styles = useStyles(createStyles);

    const insets = useSafeAreaInsets();

    return (
        <View
            style={[
                styles.container,
                {
                    paddingTop: withTopInset ? Math.max(insets.top, Platform.OS === 'android' ? (StatusBar.currentHeight || 24) : 0) : 0,
                    paddingBottom: withBottomInset ? insets.bottom : 0,
                },
                style,
            ]}
            {...rest}
        >
            {children}
        </View>
    );
};

const createStyles = (colors: ThemeColors) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgPrimary,
    },
});
