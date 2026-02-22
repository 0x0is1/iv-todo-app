import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated';
import { AppText } from '@/components/common/AppText';
import { useUIStore } from '@/store/ui.store';
import { useTheme, useStyles } from '@/theme/useTheme';
import { ThemeColors } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const AppToast = () => {
    const { colors } = useTheme();
    const styles = useStyles(createStyles);

    const { toastMessage, toastType, toastVisible, hideToast } = useUIStore();
    const insets = useSafeAreaInsets();

    useEffect(() => {
        if (toastVisible) {
            const timer = setTimeout(() => {
                hideToast();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [toastVisible, hideToast]);

    if (!toastVisible || !toastMessage) return null;

    const getBorderColor = () => {
        switch (toastType) {
            case 'success': return colors.success;
            case 'error': return colors.danger;
            default: return colors.accentPrimary;
        }
    };

    const getIcon = () => {
        switch (toastType) {
            case 'success': return 'checkmark-circle';
            case 'error': return 'close-circle';
            default: return 'information-circle';
        }
    };

    return (
        <Animated.View
            entering={FadeInDown.springify()}
            exiting={FadeOutUp}
            style={[
                styles.container,
                {
                    top: insets.top + 10,
                    borderLeftColor: getBorderColor(),
                },
            ]}
        >
            <Ionicons name={getIcon()} size={24} color={getBorderColor()} style={styles.icon} />
            <AppText variant="body" style={styles.text}>{toastMessage}</AppText>
        </Animated.View>
    );
};

const createStyles = (colors: ThemeColors) => StyleSheet.create({
    container: {
        position: 'absolute',
        left: 20,
        right: 20,
        backgroundColor: colors.bgSecondary,
        borderRadius: 8,
        borderLeftWidth: 4,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        zIndex: 9999,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    icon: {
        marginRight: 12,
    },
    text: {
        flex: 1,
        color: colors.textPrimary,
        fontWeight: '500',
    },
});
