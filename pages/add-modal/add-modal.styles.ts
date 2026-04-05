import { useTheme } from '@/hooks/use-theme';
import { StyleSheet } from 'react-native';

export const useAddModalStyles = () => {
  const { colors } = useTheme();

  return StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    backdrop: {
      ...StyleSheet.absoluteFillObject,
    },
    blur: {
      ...StyleSheet.absoluteFillObject,
    },
    modal: {
      backgroundColor: colors.surface,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingTop: 20,
      paddingHorizontal: 24,
      paddingBottom: 40,
      borderTopWidth: 2,
      borderTopColor: colors.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -4 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 8,
    },
    closeButton: {
      position: 'absolute',
      top: 12,
      right: 16,
      zIndex: 1,
      padding: 4,
    },
    closeButtonText: {
      fontSize: 18,
      fontWeight: '700',
      color: colors.danger,
    },
    manualButton: {
      backgroundColor: colors.accent,
      paddingVertical: 14,
      borderRadius: 10,
      alignItems: 'center',
    },
    manualButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.textOnAccent,
    },
    dividerRow: {
      alignItems: 'center',
      marginVertical: 16,
    },
    divider: {
      width: '50%',
      height: 1,
      backgroundColor: colors.border,
    },
    searchInput: {
      backgroundColor: colors.inputBackground,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 10,
      paddingHorizontal: 14,
      paddingVertical: 12,
      fontSize: 15,
      color: colors.text,
    },
  });
};
