import { AutocompletePlaceDto } from '@/api/dtos/places/autocomplete-places-response';
import { useAutocompletePlacesQuery } from '@/hooks/queries/use-autocomplete-places-query';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import { useTheme } from '@/hooks/use-theme';
import { useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { usePlaceSearchBarStyles } from './place-search-bar.styles';

interface PlaceSearchBarProps {
  sessionToken: string;
  onSelect: (place: AutocompletePlaceDto) => void;
  latitude: number | null;
  longitude: number | null;
}

export function PlaceSearchBar({ sessionToken, onSelect, latitude, longitude }: PlaceSearchBarProps) {
  const { colors } = useTheme();
  const styles = usePlaceSearchBarStyles();

  const [query, setQuery] = useState('');
  const debouncedQuery = useDebouncedValue(query, 350);

  const { data, isFetching } = useAutocompletePlacesQuery({
    input: debouncedQuery,
    sessionToken,
    latitude,
    longitude,
  });

  console.log('Autocomplete query:', debouncedQuery, 'Results:', data?.places);

  const places = data?.places ?? [];
  const showResults = debouncedQuery.trim().length > 0 && places.length > 0;

  return (
    <View style={styles.container}>
      {/* Results list (above the input) */}
      {showResults && (
        <ScrollView
          style={[styles.resultsContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}
          keyboardShouldPersistTaps="handled"
          bounces={false}
        >
          {places.map((item) => (
            <TouchableOpacity
              key={item.placeId}
              style={[styles.resultItem, { borderBottomColor: colors.border }]}
              onPress={() => onSelect(item)}
              activeOpacity={0.7}
            >
              <Text style={[styles.resultName, { color: colors.text }]} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={[styles.resultAddress, { color: colors.textMuted }]} numberOfLines={1}>
                {item.address}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* Search input */}
      <View style={styles.inputRow}>
        <TextInput
          style={[styles.searchInput, { backgroundColor: colors.inputBackground, borderColor: colors.border, color: colors.text }]}
          placeholder="Search restaurants..."
          placeholderTextColor={colors.textMuted}
          value={query}
          onChangeText={setQuery}
          autoCorrect={false}
          autoCapitalize="none"
        />
        {isFetching && (
          <ActivityIndicator
            style={styles.spinner}
            size="small"
            color={colors.accent}
          />
        )}
      </View>
    </View>
  );
}