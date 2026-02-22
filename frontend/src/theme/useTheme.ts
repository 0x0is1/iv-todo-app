import { useThemeStore } from '@/store/theme.store';
import { darkTheme, lightTheme, ThemeColors } from '@/constants/colors';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

export const useTheme = () => {
    const { theme, toggleTheme, setTheme } = useThemeStore();

    const colors = useMemo<ThemeColors>(() => {
        return theme === 'light' ? lightTheme : darkTheme;
    }, [theme]);

    return {
        theme,
        isDark: theme === 'dark',
        colors,
        toggleTheme,
        setTheme,
    };
};

/**
 * A utility hook to create dynamic styles that react to theme changes.
 * Pass a callback that receives the active colors object.
 */
export const useStyles = <T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>>(
    styleFactory: (colors: ThemeColors) => T
): T => {
    const { colors } = useTheme();
    return useMemo(() => StyleSheet.create(styleFactory(colors)), [colors]);
};
