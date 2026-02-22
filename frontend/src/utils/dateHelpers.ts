import { format, isPast, isToday, isTomorrow, formatDistanceToNow } from 'date-fns';

export const dateHelpers = {
    formatForDisplay: (isoString: string) => {
        const date = new Date(isoString);
        if (isToday(date)) {
            return `Today, ${format(date, 'h:mm a')}`;
        }
        if (isTomorrow(date)) {
            return `Tomorrow, ${format(date, 'h:mm a')}`;
        }
        return format(date, 'MMM d, h:mm a');
    },

    isOverdue: (isoString: string) => {
        return isPast(new Date(isoString));
    },

    isDueSoon: (isoString: string) => {
        // Due within 24 hours
        const date = new Date(isoString);
        const now = new Date();
        const diffHours = (date.getTime() - now.getTime()) / (1000 * 60 * 60);
        return diffHours > 0 && diffHours <= 24;
    }
};
