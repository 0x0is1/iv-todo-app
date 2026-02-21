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

const loginSchema = z.object({
    email: z.string().email('Please enter a valid email'),
    password: z.string().min(1, 'Password is required'),
});

type LoginForm = z.infer<typeof loginSchema>;

const LoginScreen = ({ navigation }: any) => {
    const { login } = useAuthStore();
    const { showToast } = useUIStore();
    const [isLoading, setIsLoading] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: '', password: '' },
    });

    const onSubmit = async (data: LoginForm) => {
        try {
            setIsLoading(true);
            const res = await authApi.login(data.email, data.password);
            await login(res.user, res.token);
            showToast('Logged in successfully', 'success');
            // Navigation to App takes place automatically via RootNavigator's observer
        } catch (error: any) {
            showToast(error.response?.data?.message || 'Login failed', 'error');
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
                    <AppText style={styles.tagline}>Welcome back.</AppText>
                </View>

                <View style={styles.form}>
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
                                placeholder="Enter your password"
                                secureTextEntry
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                error={errors.password?.message}
                            />
                        )}
                    />

                    <AppButton
                        label="Login"
                        onPress={handleSubmit(onSubmit)}
                        loading={isLoading}
                        style={styles.submitButton}
                    />

                    <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.linkContainer}>
                        <AppText variant="muted">
                            Don't have an account? <AppText style={styles.link}>Register</AppText>
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
    },
    header: {
        alignItems: 'center',
        marginBottom: 48,
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

export default LoginScreen;
