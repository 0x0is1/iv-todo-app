import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';

export const AppDivider = () => {
    return <View style={styles.divider} />;
};

const styles = StyleSheet.create({
    divider: {
        height: 1,
        backgroundColor: colors.border,
        width: '100%',
        marginVertical: 16,
    },
});
