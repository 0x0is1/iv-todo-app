import React from 'react';
import { AppBadge } from '../common/AppBadge';
import { Priority } from '../../types/task.types';
import { colors } from '../../constants/colors';

export const TaskBadgePriority: React.FC<{ priority: Priority }> = ({ priority }) => {
    const getBadgeConfig = () => {
        switch (priority) {
            case 'high':
                return { label: 'High', bgColor: colors.danger };
            case 'medium':
                return { label: 'Medium', bgColor: colors.warning };
            case 'low':
                return { label: 'Low', bgColor: colors.info };
        }
    };

    const config = getBadgeConfig();

    return <AppBadge label={config.label} bgColor={config.bgColor} />;
};
