import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { AppText } from './AppText';

export interface AppBadgeProps {
    label: string;
    bgColor: string;
    textColor?: string;
    style?: StyleProp<ViewStyle>;
}

export const AppBadge: React.FC<AppBadgeProps> = ({ label, bgColor, textColor = 'white', style }) => {
    return (
        <View style={[styles.container, { backgroundColor: bgColor }, style]}>
            <AppText variant="small" style={{ color: textColor, fontWeight: 'bold' }}>
                {label}
            </AppText>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 20, // pill shape
        alignSelf: 'flex-start',
    },
});
