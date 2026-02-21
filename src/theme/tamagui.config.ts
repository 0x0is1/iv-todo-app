import { createTamagui, createFont } from '@tamagui/core';
import { tokens } from './tokens';
import { fontConfig } from '../constants/fonts';

const headingFont = createFont(fontConfig.heading);
const bodyFont = createFont(fontConfig.body);

export const tamaguiConfig = createTamagui({
    tokens,
    fonts: {
        heading: headingFont,
        body: bodyFont,
    },
    themes: {
        dark: {
            background: tokens.color.bgPrimary,
            color: tokens.color.textPrimary,
        },
        light: {
            background: tokens.color.bgPrimary,
            color: tokens.color.textPrimary,
        },
    },
});

type Conf = typeof tamaguiConfig;
declare module '@tamagui/core' {
    interface TamaguiCustomConfig extends Conf { }
}
