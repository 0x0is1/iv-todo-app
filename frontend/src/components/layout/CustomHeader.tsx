import React from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AppText } from '@/components/common/AppText';
import { useTheme, useStyles } from '@/theme/useTheme';
import { ThemeColors } from '@/constants/colors';

interface CustomHeaderProps {
    title: string;
    rightComponent?: React.ReactNode;
    showBackButton?: boolean;
}

export const CustomHeader: React.FC<CustomHeaderProps> = ({
    title,
    rightComponent,
    showBackButton = false
}) => {
    const { colors } = useTheme();
    const styles = useStyles(createStyles);

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                {showBackButton && (
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.backButton}
                    >
                        <Ionicons name="chevron-back" size={24} color={colors.textPrimary} />
                    </TouchableOpacity>
                )}
            </View>

            <View style={styles.titleContainer}>
                {title === 'DOIT' ? (
                    <AppText style={styles.brandTitle} numberOfLines={1}>
                        <AppText style={styles.do}>DO</AppText>
                        <AppText style={styles.it}>IT</AppText>
                    </AppText>
                ) : (
                    <AppText style={styles.title} numberOfLines={1}>{title}</AppText>
                )}
            </View>

            <View style={styles.rightContainer}>
                {rightComponent}
            </View>
        </View>
    );
};

const createStyles = (colors: ThemeColors) => StyleSheet.create({
    container: {
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        backgroundColor: colors.bgSecondary,
        borderBottomWidth: 0,
        // No top padding here, it should be handled by ScreenWrapper
    },
    leftContainer: {
        width: 48,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    titleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightContainer: {
        width: 48,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    title: {
        fontFamily: 'SpaceGrotesk',
        fontSize: 18,
        fontWeight: '700',
        color: colors.textPrimary,
    },
    brandTitle: {
        fontFamily: 'SpaceGrotesk',
        fontSize: 36,
        fontWeight: 'bold',
    },
    do: {
        color: colors.textPrimary,
    },
    it: {
        color: colors.accentPrimary,
    },
    backButton: {
        padding: 8,
    },
});
