import React from 'react';
import { View, Modal, StyleSheet, Pressable, Platform } from 'react-native';
import Animated, { SlideInDown, SlideOutDown, FadeIn, FadeOut } from 'react-native-reanimated';
import { colors } from '../../constants/colors';
import { AppText } from './AppText';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface AppModalProps {
    visible: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
}

export const AppModal: React.FC<AppModalProps> = ({ visible, onClose, title, children, footer }) => {
    const insets = useSafeAreaInsets();

    if (!visible) return null;

    return (
        <Modal visible={visible} transparent={true} animationType="none" onRequestClose={onClose}>
            <Animated.View style={styles.backdrop} entering={FadeIn} exiting={FadeOut}>
                <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
            </Animated.View>

            <View style={styles.bottomSheetContainer}>
                <Animated.View
                    style={[styles.modalContent, { paddingBottom: Math.max(insets.bottom, 24) }]}
                    entering={SlideInDown.springify().damping(20).stiffness(200)}
                    exiting={SlideOutDown}
                >
                    <View style={styles.notch} />

                    {title && (
                        <View style={styles.header}>
                            <AppText variant="heading3">{title}</AppText>
                            <Pressable onPress={onClose} style={styles.closeButton}>
                                <Ionicons name="close" size={24} color={colors.textSecondary} />
                            </Pressable>
                        </View>
                    )}

                    <View style={styles.body}>{children}</View>

                    {footer && <View style={styles.footer}>{footer}</View>}
                </Animated.View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: colors.overlay,
    },
    bottomSheetContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: colors.bgSecondary,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        paddingHorizontal: 20,
        paddingTop: 12,
    },
    notch: {
        width: 40,
        height: 4,
        backgroundColor: colors.border,
        borderRadius: 2,
        alignSelf: 'center',
        marginBottom: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    closeButton: {
        padding: 4,
    },
    body: {
        marginBottom: 24,
    },
    footer: {
        marginTop: 'auto',
    },
});
