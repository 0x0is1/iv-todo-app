import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AppText } from '../../components/common/AppText';
import { AppInput } from '../../components/common/AppInput';
import { AppButton } from '../../components/common/AppButton';
import { ScreenWrapper } from '../../components/layout/ScreenWrapper';
import { KeyboardWrapper } from '../../components/layout/KeyboardWrapper';
import { colors } from '../../constants/colors';
import { useAuthStore } from '../../store/auth.store';
import { useUIStore } from '../../store/ui.store';
import { authApi } from '../../services/api/auth.api';

const registerSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type RegisterForm = z.infer<typeof registerSchema>;

const RegisterScreen = ({ navigation }: any) => {
    const { register } = useAuthStore();
    const { showToast } = useUIStore();
    const [isLoading, setIsLoading] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterForm>({
        resolver: zodResolver(registerSchema),
        defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
    });

    const onSubmit = async (data: RegisterForm) => {
        try {
            setIsLoading(true);
            const res = await authApi.register(data.name, data.email, data.password);
            await register(res.user, res.token);
            showToast('Account created successfully', 'success');
            // Navigation takes place automatically.
        } catch (error: any) {
            showToast(error.response?.data?.message || 'Registration failed', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ScreenWrapper>
            <KeyboardWrapper contentContainerStyle={styles.container}>
                <View style={styles.header}>
                    <AppText style={styles.brand}>
                        <AppText style={styles.do}>DO</AppText>
                        <AppText style={styles.it}>IT</AppText>
                    </AppText>
                    <AppText style={styles.tagline}>Create an account.</AppText>
                </View>

                <View style={styles.form}>
                    <Controller
                        control={control}
                        name="name"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <AppInput
                                label="Name"
                                placeholder="Enter your name"
                                autoCapitalize="words"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                error={errors.name?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <AppInput
                                label="Email"
                                placeholder="Enter your email"
                                autoCapitalize="none"
                                keyboardType="email-address"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                error={errors.email?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <AppInput
                                label="Password"
                                placeholder="Create a password"
                                secureTextEntry
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                error={errors.password?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="confirmPassword"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <AppInput
                                label="Confirm Password"
                                placeholder="Confirm your password"
                                secureTextEntry
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                error={errors.confirmPassword?.message}
                            />
                        )}
                    />

                    <AppButton
                        label="Register"
                        onPress={handleSubmit(onSubmit)}
                        loading={isLoading}
                        style={styles.submitButton}
                    />

                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.linkContainer}>
                        <AppText variant="muted">
                            Already have an account? <AppText style={styles.link}>Login</AppText>
                        </AppText>
                    </TouchableOpacity>
                </View>
            </KeyboardWrapper>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingHorizontal: 24,
        justifyContent: 'center',
        paddingVertical: 40,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    brand: {
        fontFamily: 'SpaceGrotesk',
        fontSize: 36,
        fontWeight: 'bold',
    },
    do: {
        color: '#F0F0F5',
    },
    it: {
        color: colors.accentPrimary,
    },
    tagline: {
        fontFamily: 'Inter',
        fontSize: 14,
        color: colors.textMuted,
        marginTop: 8,
    },
    form: {
        width: '100%',
    },
    submitButton: {
        marginTop: 16,
        width: '100%',
    },
    linkContainer: {
        alignItems: 'center',
        marginTop: 24,
        padding: 10,
    },
    link: {
        color: colors.accentPrimary,
        fontWeight: '600',
    },
});

export default RegisterScreen;
