import { EntryStatus, RestaurantEntry } from '@/api/models/restaurant-entry';
import { useRestaurantEntriesQuery } from '@/hooks/queries/use-restaurant-entries-query';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import EntryCard from './_components/entry-card/entry-card';
import { useHomeStyles } from './home.styles';

type SortOption = 'updated' | 'visited' | 'rating' | 'name';
type SortDir = 'asc' | 'desc';

export default function HomePage() {
  const router = useRouter();
  const styles = useHomeStyles();

  const [activeTab, setActiveTab] = useState<EntryStatus>(EntryStatus.Visited);
  const [sortBy, setSortBy] = useState<SortOption>('updated');
  const [sortDir, setSortDir] = useState<SortDir>('desc');

  const visitedQuery = useRestaurantEntriesQuery(EntryStatus.Visited);
  const plannedQuery = useRestaurantEntriesQuery(EntryStatus.Planned);

  const activeQuery = activeTab === EntryStatus.Visited ? visitedQuery : plannedQuery;

  const sortedData = useMemo(() => {
    const list = activeQuery.data ? [...activeQuery.data] : [];
    const dir = sortDir === 'asc' ? 1 : -1;

    list.sort((a, b) => {
      if (sortBy === 'name') {
        return a.restaurantName.localeCompare(b.restaurantName) * dir;
      }
      if (sortBy === 'visited') {
        const aDate = a.visitedAt ? new Date(a.visitedAt).getTime() : 0;
        const bDate = b.visitedAt ? new Date(b.visitedAt).getTime() : 0;
        return (aDate - bDate) * dir;
      }
      if (sortBy === 'rating') {
        const aRating = a.rating ?? 0;
        const bRating = b.rating ?? 0;
        return (aRating - bRating) * dir;
      }
      // default: updated
      return (new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()) * dir;
    });

    return list;
  }, [activeQuery.data, sortBy, sortDir]);

  const cycleSortOption = () => {
    if (activeTab === EntryStatus.Visited) {
      // cycle: updated -> name -> visited -> rating -> updated
      if (sortBy === 'updated') setSortBy('name');
      else if (sortBy === 'name') setSortBy('visited');
      else if (sortBy === 'visited') setSortBy('rating');
      else setSortBy('updated');
    } else {
      // planned: updated -> name -> updated
      if (sortBy === 'updated') setSortBy('name');
      else setSortBy('updated');
    }
  };

  const toggleSortDir = () => {
    setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
  };

  const handleTabChange = (tab: EntryStatus) => {
    setActiveTab(tab);
    // Reset to default sort when switching tabs
    setSortBy('updated');
    setSortDir('desc');
  };

  const sortLabel =
    sortBy === 'name' ? 'Name' : sortBy === 'visited' ? 'Last Visited' : sortBy === 'rating' ? 'Rating' : 'Recently Updated';

  const handleEntryPress = useCallback(
    (entry: RestaurantEntry) => {
      router.push({
        pathname: '/(app)/entry-form',
        params: { entry: JSON.stringify(entry) },
      });
    },
    [router]
  );

  const handleAddPress = () => {
    router.push({
      pathname: '/(app)/add-modal',
      params: { defaultStatus: activeTab },
    });
  };

  const handleSettingsPress = () => {
    router.push('/(app)/settings');
  };

  const renderItem = useCallback(
    ({ item }: { item: RestaurantEntry }) => (
      <EntryCard entry={item} onPress={handleEntryPress} />
    ),
    [handleEntryPress]
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Restaurants</Text>
        <TouchableOpacity style={styles.settingsButton} onPress={handleSettingsPress}>
          <Ionicons name="settings-outline" size={24} color={styles.settingsIcon.color} />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === EntryStatus.Visited && styles.tabActive]}
          onPress={() => handleTabChange(EntryStatus.Visited)}
        >
          <Text style={[styles.tabText, activeTab === EntryStatus.Visited && styles.tabTextActive]}>
            Visited
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === EntryStatus.Planned && styles.tabActive]}
          onPress={() => handleTabChange(EntryStatus.Planned)}
        >
          <Text style={[styles.tabText, activeTab === EntryStatus.Planned && styles.tabTextActive]}>
            Want to Try
          </Text>
        </TouchableOpacity>
      </View>

      {/* Sort controls */}
      <View style={styles.sortRow}>
        <View style={styles.sortLeft}>
          <Text style={styles.sortLabel}>Sort:</Text>
          <TouchableOpacity style={styles.sortButton} onPress={cycleSortOption}>
            <Text style={styles.sortButtonText}>{sortLabel}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.sortDirButton} onPress={toggleSortDir}>
          <Text style={styles.sortArrow}>{sortDir === 'desc' ? '↓' : '↑'}</Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      {activeQuery.isLoading ? (
        <ActivityIndicator style={styles.spinner} size="large" />
      ) : sortedData.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            No saved restaurants yet.{'\n'}Click the '+' below to add one.
          </Text>
        </View>
      ) : (
        <FlatList
          data={sortedData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Add button */}
      <Pressable
        style={({ pressed }) => [styles.addButton, pressed && styles.addButtonPressed]}
        onPress={handleAddPress}
      >
        <Text style={styles.addButtonText}>+</Text>
      </Pressable>
    </SafeAreaView>
  );
}
