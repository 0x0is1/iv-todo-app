import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme, useStyles } from '@/theme/useTheme';
import { ThemeColors } from '@/constants/colors';

export const AppDivider = () => {
    const { colors } = useTheme();
    const styles = useStyles(createStyles);

    return <View style={styles.divider} />;
};

const createStyles = (colors: ThemeColors) => StyleSheet.create({
    divider: {
        height: 1,
        backgroundColor: colors.border,
        width: '100%',
        marginVertical: 16,
    },
});
