import { createTokens } from '@tamagui/core';
import { colors } from '@/constants/colors';
import { fontConfig, fonts } from '@/constants/fonts';
import { spacing } from '@/constants/spacing';

export const tokens = createTokens({
    size: spacing,
    space: spacing,
    radius: {
        1: 4,
        2: 8,
        3: 10, // buttons, inputs
        4: 12, // cards
        5: 16, // modals
        6: 20, // pill badges
        true: 12,
    },
    zIndex: {
        1: 100,
        2: 200,
        3: 300,
        4: 400,
        5: 500,
        true: 100,
    },
    color: colors,
});
