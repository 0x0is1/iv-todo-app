import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AppInput } from '../common/AppInput';
import { AppButton } from '../common/AppButton';
import { AppText } from '../common/AppText';
import { KeyboardWrapper } from '../layout/KeyboardWrapper';
import { colors } from '../../constants/colors';
import { dateHelpers } from '../../utils/dateHelpers';
import { taskSchema } from '../../utils/validators';
import { z } from 'zod';
import { Priority } from '../../types/task.types';

type TaskFormValues = z.infer<typeof taskSchema>;

interface TaskFormProps {
    initialValues?: Partial<TaskFormValues>;
    onSubmit: (data: TaskFormValues) => Promise<void>;
    isLoading: boolean;
    submitLabel: string;
}

export const TaskForm: React.FC<TaskFormProps> = ({ initialValues, onSubmit, isLoading, submitLabel }) => {
    const defaultDate = new Date();
    const defaultDeadline = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const {
        control,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<TaskFormValues>({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            title: initialValues?.title || '',
            description: initialValues?.description || '',
            dateTime: initialValues?.dateTime || defaultDate.toISOString(),
            deadline: initialValues?.deadline || defaultDeadline.toISOString(),
            priority: initialValues?.priority || 'medium',
            category: initialValues?.category || '',
        },
    });

    const [showDatePicker, setShowDatePicker] = useState<{ visible: boolean; mode: 'date' | 'time'; field: 'dateTime' | 'deadline' }>({
        visible: false,
        mode: 'date',
        field: 'dateTime'
    });

    const currentDateTime = watch('dateTime');
    const currentDeadline = watch('deadline');
    const currentPriority = watch('priority');

    const onDateChange = (event: any, selectedDate?: Date) => {
        if (Platform.OS === 'android') {
            // Must handle Android dismissal
            setShowDatePicker({ ...showDatePicker, visible: false });
        }

        if (selectedDate && event.type === 'set') {
            setValue(showDatePicker.field, selectedDate.toISOString(), { shouldValidate: true });
        }
    };

    const openPicker = (field: 'dateTime' | 'deadline', mode: 'date' | 'time') => {
        setShowDatePicker({ visible: true, mode, field });
    };

    const PriorityCard = ({ value, label }: { value: Priority, label: string }) => {
        const isSelected = currentPriority === value;

        let activeColor = colors.accentPrimary;
        if (value === 'high') activeColor = colors.danger;
        if (value === 'medium') activeColor = colors.warning;
        if (value === 'low') activeColor = colors.info;

        return (
            <TouchableOpacity
                style={[
                    styles.priorityCard,
                    isSelected && { borderColor: activeColor, backgroundColor: activeColor + '20' }
                ]}
                onPress={() => setValue('priority', value)}
                activeOpacity={0.7}
            >
                <AppText style={{ color: isSelected ? activeColor : colors.textPrimary, fontWeight: isSelected ? 'bold' : 'normal' }}>
                    {label}
                </AppText>
            </TouchableOpacity>
        );
    };

    const DateDisplayField = ({ label, value, field }: { label: string, value: string, field: 'dateTime' | 'deadline' }) => {
        const errorStr = errors[field]?.message;
        return (
            <View style={{ marginBottom: 16 }}>
                <AppText variant="small" style={styles.label}>{label}</AppText>
                <View style={styles.dateRow}>
                    <TouchableOpacity
                        style={[styles.dateInput, errorStr && { borderColor: colors.danger }]}
                        onPress={() => openPicker(field, 'date')}
                    >
                        <AppText style={styles.dateText}>
                            {new Date(value).toLocaleDateString()}
                        </AppText>
                    </TouchableOpacity>
                    <View style={{ width: 12 }} />
                    <TouchableOpacity
                        style={[styles.dateInput, errorStr && { borderColor: colors.danger }]}
                        onPress={() => openPicker(field, 'time')}
                    >
                        <AppText style={styles.dateText}>
                            {new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </AppText>
                    </TouchableOpacity>
                </View>
                {errorStr && <AppText variant="small" style={styles.errorText}>{errorStr}</AppText>}
            </View>
        );
    };

    return (
        <KeyboardWrapper contentContainerStyle={styles.container}>
            <Controller
                control={control}
                name="title"
                render={({ field: { onChange, onBlur, value } }) => (
                    <AppInput
                        label="Title"
                        placeholder="What needs to be done?"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        error={errors.title?.message}
                    />
                )}
            />

            <Controller
                control={control}
                name="description"
                render={({ field: { onChange, onBlur, value } }) => (
                    <AppInput
                        label="Description (Optional)"
                        placeholder="Add details..."
                        multiline
                        numberOfLines={4}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        error={errors.description?.message}
                    />
                )}
            />

            <DateDisplayField label="Task Date & Time" value={currentDateTime} field="dateTime" />
            <DateDisplayField label="Deadline" value={currentDeadline} field="deadline" />

            <View style={{ marginBottom: 16 }}>
                <AppText variant="small" style={styles.label}>Priority</AppText>
                <View style={styles.priorityRow}>
                    <PriorityCard value="low" label="Low" />
                    <PriorityCard value="medium" label="Medium" />
                    <PriorityCard value="high" label="High" />
                </View>
            </View>

            <Controller
                control={control}
                name="category"
                render={({ field: { onChange, onBlur, value } }) => (
                    <AppInput
                        label="Category (Optional)"
                        placeholder="e.g. Work, Personal"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        error={errors.category?.message}
                    />
                )}
            />

            <AppButton
                label={submitLabel}
                onPress={handleSubmit(onSubmit)}
                loading={isLoading}
                style={styles.submitButton}
            />

            {showDatePicker.visible && (
                <DateTimePicker
                    value={new Date(showDatePicker.field === 'dateTime' ? currentDateTime : currentDeadline)}
                    mode={showDatePicker.mode}
                    display="default"
                    onChange={onDateChange}
                    themeVariant="dark" // iOS specific, ignored on Android
                />
            )}
        </KeyboardWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
    },
    label: {
        color: colors.textSecondary,
        marginBottom: 6,
        fontWeight: '500',
    },
    dateRow: {
        flexDirection: 'row',
    },
    dateInput: {
        flex: 1,
        height: 52,
        backgroundColor: colors.bgTertiary,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.border,
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    dateText: {
        color: colors.textPrimary,
    },
    errorText: {
        color: colors.danger,
        marginTop: 4,
    },
    priorityRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    priorityCard: {
        flex: 1,
        height: 52,
        backgroundColor: colors.bgTertiary,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.border,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 4,
    },
    submitButton: {
        marginTop: 16,
    }
});
