import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenWrapper } from '../../components/layout/ScreenWrapper';
import { AppText } from '../../components/common/AppText';
import { AppModal } from '../../components/common/AppModal';
import { TaskFilterBar } from '../../components/task/TaskFilterBar';
import { TaskList } from '../../components/task/TaskList';
import { colors } from '../../constants/colors';
import { useTaskStore } from '../../store/task.store';
import { CustomHeader } from '../../components/layout/CustomHeader';

const HomeScreen = ({ navigation }: any) => {
    const { activeSortMode, setSortMode } = useTaskStore();
    const [isSortModalVisible, setIsSortModalVisible] = useState(false);


    const SortOption = ({ label, value }: { label: string, value: 'smart' | 'deadline' | 'priority' | 'added' }) => {
        const isActive = activeSortMode === value;
        return (
            <TouchableOpacity
                style={[styles.sortOption, isActive && styles.sortOptionActive]}
                onPress={() => {
                    setSortMode(value);
                    setIsSortModalVisible(false);
                }}
            >
                <AppText style={[styles.sortText, isActive && styles.sortTextActive]}>{label}</AppText>
                {isActive && <Ionicons name="checkmark" size={20} color={colors.accentPrimary} />}
            </TouchableOpacity>
        );
    };

    return (
        <ScreenWrapper withTopInset={true} withBottomInset={false}>
            <CustomHeader
                title="DOIT"
                rightComponent={
                    <TouchableOpacity
                        onPress={() => navigation.navigate('AddTask')}
                        style={styles.headerButton}
                    >
                        <Ionicons name="add" size={24} color={colors.accentPrimary} />
                    </TouchableOpacity>
                }
            />
            <View style={styles.filterContainer}>
                <View style={{ flex: 1 }}>
                    <TaskFilterBar />
                </View>
                <TouchableOpacity
                    style={styles.sortButton}
                    onPress={() => setIsSortModalVisible(true)}
                >
                    <Ionicons name="funnel" size={20} color={colors.textPrimary} />
                </TouchableOpacity>
            </View>

            <TaskList />

            <AppModal
                visible={isSortModalVisible}
                onClose={() => setIsSortModalVisible(false)}
                title="Sort Tasks"
            >
                <View style={styles.sortModalContent}>
                    <SortOption label="Smart Sort (Recommended)" value="smart" />
                    <SortOption label="By Deadline" value="deadline" />
                    <SortOption label="By Priority" value="priority" />
                    <SortOption label="By Date Added" value="added" />
                </View>
            </AppModal>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    headerTitle: {
        fontFamily: 'SpaceGrotesk',
        fontSize: 22,
        fontWeight: 'bold',
        color: colors.textPrimary,
    },
    headerButton: {
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    filterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        backgroundColor: colors.bgPrimary,
    },
    sortButton: {
        height: 42,
        width: 42,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 4,
        marginRight: 16,
        backgroundColor: colors.bgTertiary,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border,
    },
    sortModalContent: {
        paddingBottom: 20,
    },
    sortOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    sortOptionActive: {
        backgroundColor: colors.bgTertiary,
        borderRadius: 8,
        paddingHorizontal: 12,
        borderBottomWidth: 0,
    },
    sortText: {
        fontSize: 16,
        color: colors.textPrimary,
    },
    sortTextActive: {
        color: colors.accentPrimary,
        fontWeight: '600',
    },
});

export default HomeScreen;
