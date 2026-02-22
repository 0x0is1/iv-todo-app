import React from 'react';
import { Text as TamaguiText, TextProps as TamaguiTextProps, styled } from 'tamagui';

export interface AppTextProps extends TamaguiTextProps {
    variant?: 'heading1' | 'heading2' | 'heading3' | 'body' | 'small' | 'muted';
}

const StyledText = styled(TamaguiText, {
    fontFamily: '$body',
    color: '$textPrimary',

    variants: {
        variant: {
            heading1: {
                fontFamily: '$heading',
                fontSize: 36,
                fontWeight: 'bold',
            },
            heading2: {
                fontFamily: '$heading',
                fontSize: 28,
                fontWeight: 'bold',
            },
            heading3: {
                fontFamily: '$heading',
                fontSize: 18,
                fontWeight: '600',
            },
            body: {
                fontFamily: '$body',
                fontSize: 14,
            },
            small: {
                fontFamily: '$body',
                fontSize: 12,
            },
            muted: {
                fontFamily: '$body',
                fontSize: 14,
                color: '$textMuted',
            },
        },
    } as const,

    defaultVariants: {
        variant: 'body',
    },
});

export const AppText: React.FC<AppTextProps> = (props) => {
    return <StyledText {...props} />;
};
