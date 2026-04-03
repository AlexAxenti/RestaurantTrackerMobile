import { useTheme } from '@/hooks/use-theme';
import { StyleSheet } from 'react-native';

export const useRegisterStyles = () => {
  const { colors } = useTheme();

  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    backButton: {
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    backButtonText: {
      fontSize: 16,
      color: colors.text,
      fontWeight: '500',
    },
    container: {
      flex: 1,
      paddingHorizontal: 28,
      justifyContent: 'center',
    },
    title: {
      fontSize: 28,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 15,
      color: colors.textMuted,
      marginBottom: 36,
    },
    label: {
      fontSize: 14,
      fontWeight: '500',
      color: colors.textMuted,
      marginBottom: 6,
    },
    input: {
      backgroundColor: colors.inputBackground,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 10,
      paddingHorizontal: 14,
      paddingVertical: 12,
      fontSize: 16,
      color: colors.text,
      marginBottom: 18,
    },
    inputFocused: {
      borderColor: colors.accent,
    },
    button: {
      paddingVertical: 15,
      borderRadius: 10,
      alignItems: 'center',
      backgroundColor: colors.accent,
      marginTop: 6,
    },
    buttonDisabled: {
      backgroundColor: colors.primary,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.textOnAccent,
    },
    errorText: {
      fontSize: 14,
      color: colors.danger,
      marginBottom: 16,
      textAlign: 'center',
    },
    switchRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 22,
    },
    switchText: {
      fontSize: 14,
      color: colors.textMuted,
    },
    switchLink: {
      fontSize: 14,
      color: colors.accent,
      fontWeight: '600',
    },
  });
};
