import React, { useState } from 'react';
import { View, TextInput, TextInputProps, TouchableOpacity, StyleSheet } from 'react-native';
import { AppText } from '@/components/common/AppText';
import { useTheme, useStyles } from '@/theme/useTheme';
import { ThemeColors } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';

export interface AppInputProps extends TextInputProps {
    label?: string;
    error?: string;
    rightIcon?: keyof typeof Ionicons.glyphMap;
    onRightIconPress?: () => void;
}

export const AppInput: React.FC<AppInputProps> = ({
    label,
    error,
    rightIcon,
    onRightIconPress,
    secureTextEntry,
    multiline,
    style,
    ...rest
}) => {
    const { colors } = useTheme();
    const styles = useStyles(createStyles);

    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const isPassword = secureTextEntry !== undefined;
    const currentSecure = isPassword ? !isPasswordVisible : false;

    const handlePasswordToggle = () => setIsPasswordVisible(!isPasswordVisible);

    return (
        <View style={styles.container}>
            {label && (
                <AppText variant="small" style={styles.label}>
                    {label}
                </AppText>
            )}

            <View
                style={[
                    styles.inputContainer,
                    isFocused && styles.inputFocused,
                    error && styles.inputError,
                    multiline && styles.inputMultilineContainer,
                ]}
            >
                <TextInput
                    style={[
                        styles.input,
                        multiline && styles.multilineInput,
                        style,
                    ]}
                    secureTextEntry={currentSecure}
                    placeholderTextColor={colors.textMuted}
                    onFocus={(e) => {
                        setIsFocused(true);
                        rest.onFocus?.(e);
                    }}
                    onBlur={(e) => {
                        setIsFocused(false);
                        rest.onBlur?.(e);
                    }}
                    multiline={multiline}
                    {...rest}
                />

                {isPassword ? (
                    <TouchableOpacity onPress={handlePasswordToggle} style={styles.iconContainer}>
                        <Ionicons
                            name={isPasswordVisible ? 'eye-off' : 'eye'}
                            size={20}
                            color={colors.textMuted}
                        />
                    </TouchableOpacity>
                ) : rightIcon ? (
                    <TouchableOpacity onPress={onRightIconPress} style={styles.iconContainer} disabled={!onRightIconPress}>
                        <Ionicons name={rightIcon} size={20} color={colors.textMuted} />
                    </TouchableOpacity>
                ) : null}
            </View>

            {error && (
                <AppText variant="small" style={styles.errorText}>
                    {error}
                </AppText>
            )}
        </View>
    );
};

const createStyles = (colors: ThemeColors) => StyleSheet.create({
    container: {
        marginBottom: 16,
        width: '100%',
    },
    label: {
        color: colors.textSecondary,
        marginBottom: 6,
        fontWeight: '500',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.bgTertiary,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: 10,
        height: 52,
        paddingHorizontal: 16,
    },
    inputMultilineContainer: {
        height: 'auto',
        minHeight: 100,
        alignItems: 'flex-start',
        paddingVertical: 12,
    },
    inputFocused: {
        borderColor: colors.borderActive,
    },
    inputError: {
        borderColor: colors.danger,
    },
    input: {
        flex: 1,
        color: colors.textPrimary,
        fontFamily: 'Inter',
        fontSize: 14,
        height: '100%',
    },
    multilineInput: {
        textAlignVertical: 'top',
    },
    iconContainer: {
        marginLeft: 10,
        padding: 2,
    },
    errorText: {
        color: colors.danger,
        marginTop: 4,
    },
});
