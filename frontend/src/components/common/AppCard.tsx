import React from 'react';
import { View, ViewProps } from 'react-native';
import { useTheme, useStyles } from '@/theme/useTheme';
import { ThemeColors } from '@/constants/colors';

export interface AppCardProps extends ViewProps {
    children: React.ReactNode;
    isActive?: boolean;
}

export const AppCard: React.FC<AppCardProps> = ({ children, isActive, style, ...rest }) => {
    const { colors } = useTheme();

    return (
        <View
            style={[
                {
                    backgroundColor: colors.bgSecondary,
                    borderRadius: 12,
                    padding: 16,
                    borderColor: isActive ? colors.borderActive : colors.border,
                    borderWidth: 1,
                    shadowColor: isActive ? colors.accentPrimary : 'transparent',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: isActive ? 0.15 : 0,
                    shadowRadius: 8,
                    elevation: isActive ? 4 : 0,
                },
                style,
            ]}
            {...rest}
        >
            {children}
        </View>
    );
};
