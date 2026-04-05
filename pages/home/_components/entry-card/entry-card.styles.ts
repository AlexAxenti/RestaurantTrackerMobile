import { useTheme } from '@/hooks/use-theme';
import { StyleSheet } from 'react-native';

export const useEntryCardStyles = () => {
  const { colors } = useTheme();

  return StyleSheet.create({
    card: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 14,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: colors.border,
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    headerText: {
      flex: 1,
      marginRight: 8,
    },
    name: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 3,
    },
    address: {
      fontSize: 13,
      color: colors.textMuted,
      marginBottom: 6,
    },
    menuButton: {
      paddingHorizontal: 6,
      paddingVertical: 4,
    },
    menuDotsColumn: {
      alignItems: 'center',
      justifyContent: 'center',
      gap: 3,
    },
    dot: {
      width: 4,
      height: 4,
      borderRadius: 2,
      backgroundColor: colors.textMuted,
    },
    metaRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    metaText: {
      fontSize: 12,
      color: colors.textMuted,
      flexShrink: 0,
    },
    metaTextNotes: {
      fontSize: 12,
      color: colors.textMuted,
      flex: 1,
    },
    ratingText: {
      fontSize: 12,
      color: colors.accent,
      fontWeight: '600',
    },
    menuOverlay: {
      flex: 1,
      backgroundColor: 'transparent',
    },
    menuPopup: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      paddingVertical: 8,
      minWidth: 200,
      borderWidth: 1,
      borderColor: colors.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 6,
    },
    menuItem: {
      paddingHorizontal: 20,
      paddingVertical: 14,
    },
    menuItemText: {
      fontSize: 15,
      color: colors.text,
    },
    menuItemTextDanger: {
      fontSize: 15,
      color: colors.danger,
      fontWeight: '600',
    },
  });
};
