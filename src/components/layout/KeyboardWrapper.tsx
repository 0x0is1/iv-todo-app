import React from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
    ViewProps,
    ScrollView,
    StyleProp,
    ViewStyle,
} from 'react-native';

export interface KeyboardWrapperProps extends ViewProps {
    children: React.ReactNode;
    scrollable?: boolean;
    contentContainerStyle?: StyleProp<ViewStyle>;
}

export const KeyboardWrapper: React.FC<KeyboardWrapperProps> = ({
    children,
    scrollable = true,
    contentContainerStyle,
    style, // Destructure style here
    ...rest
}) => {
    const content = scrollable ? (
        <ScrollView
            contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
        >
            {children}
        </ScrollView>
    ) : (
        children
    );

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            {...rest}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                {content}
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
});
