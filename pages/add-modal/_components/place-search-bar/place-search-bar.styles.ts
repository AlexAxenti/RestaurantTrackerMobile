import { useTheme } from '@/hooks/use-theme';
import { StyleSheet } from 'react-native';

export const usePlaceSearchBarStyles = () => {
  const { colors } = useTheme();

  return StyleSheet.create({
    container: {
      position: 'relative',
    },
    inputRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    searchInput: {
      flex: 1,
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 14,
      paddingVertical: 12,
      fontSize: 15,
    },
    spinner: {
      position: 'absolute',
      right: 12,
    },
    resultsContainer: {
      borderWidth: 1,
      borderRadius: 10,
      marginBottom: 8,
      maxHeight: 150,
      overflow: 'hidden',
    },
    resultItem: {
      paddingHorizontal: 14,
      paddingVertical: 10,
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    resultName: {
      fontSize: 15,
      fontWeight: '600',
    },
    resultAddress: {
      fontSize: 13,
      marginTop: 2,
    },
  });
};
