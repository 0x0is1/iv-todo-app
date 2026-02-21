import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/colors';

interface TabBarIconProps {
    name: keyof typeof Ionicons.glyphMap;
    color: string;
    size?: number;
    focused?: boolean;
}

export const TabBarIcon: React.FC<TabBarIconProps> = ({ name, color, size = 24, focused }) => {
    return (
        <View style={{ position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name={name} size={size} color={color} />
            {focused && (
                <View
                    style={{
                        position: 'absolute',
                        bottom: -8,
                        width: 4,
                        height: 4,
                        borderRadius: 2,
                        backgroundColor: colors.accentPrimary,
                    }}
                />
            )}
        </View>
    );
};
