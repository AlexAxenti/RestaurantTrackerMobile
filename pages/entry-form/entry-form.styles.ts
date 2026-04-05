import { useTheme } from '@/hooks/use-theme';
import { StyleSheet } from 'react-native';

export const useEntryFormStyles = () => {
  const { colors } = useTheme();

  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    headerSide: {
      minWidth: 60,
    },
    backButton: {
      padding: 4,
    },
    backButtonText: {
      fontSize: 16,
      color: colors.text,
      fontWeight: '500',
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: colors.text,
    },
    deleteButton: {
      padding: 4,
    },
    deleteButtonText: {
      fontSize: 14,
      color: colors.danger,
      fontWeight: '600',
    },
    container: {
      flexGrow: 1,
      paddingHorizontal: 24,
      paddingTop: 8,
      paddingBottom: 40,
    },
    label: {
      fontSize: 14,
      fontWeight: '500',
      color: colors.textMuted,
      marginBottom: 6,
      marginTop: 16,
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
    },
    inputDisabled: {
      opacity: 0.5,
    },
    inputSpinner: {
      position: 'absolute',
      right: 12,
      top: 0,
      bottom: 0,
      justifyContent: 'center',
    },
    notesInput: {
      minHeight: 80,
      textAlignVertical: 'top',
    },
    statusRow: {
      flexDirection: 'row',
      marginTop: 6,
      borderRadius: 10,
      backgroundColor: colors.surface,
      padding: 3,
    },
    statusOption: {
      flex: 1,
      paddingVertical: 10,
      alignItems: 'center',
      borderRadius: 8,
    },
    statusOptionActive: {
      backgroundColor: colors.accent,
    },
    statusText: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.textMuted,
    },
    statusTextActive: {
      color: colors.textOnAccent,
    },
    ratingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      marginTop: 6,
    },
    ratingInput: {
      backgroundColor: colors.inputBackground,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 10,
      paddingHorizontal: 14,
      paddingVertical: 12,
      fontSize: 16,
      color: colors.text,
      width: 80,
      textAlign: 'center',
    },
    ratingHint: {
      fontSize: 12,
      color: colors.textMuted,
    },
    dateButton: {
      backgroundColor: colors.inputBackground,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 10,
      paddingHorizontal: 14,
      paddingVertical: 12,
      marginTop: 6,
    },
    dateButtonText: {
      fontSize: 16,
      color: colors.text,
    },
    dateButtonPlaceholder: {
      color: colors.textMuted,
    },
    saveButton: {
      backgroundColor: colors.accent,
      paddingVertical: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 28,
    },
    saveButtonDisabled: {
      backgroundColor: colors.primary,
    },
    saveButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.textOnAccent,
    },
    errorText: {
      fontSize: 14,
      color: colors.danger,
      textAlign: 'center',
      marginTop: 12,
    },
  });
};
