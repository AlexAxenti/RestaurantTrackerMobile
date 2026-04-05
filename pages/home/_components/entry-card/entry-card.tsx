import { EntryStatus, RestaurantEntry } from '@/api/models/restaurant-entry';
import { useDeleteRestaurantEntryMutation } from '@/hooks/mutations/use-delete-restaurant-entry-mutation';
import { useRef, useState } from 'react';
import { Alert, Linking, Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { useEntryCardStyles } from './entry-card.styles';

interface EntryCardProps {
  entry: RestaurantEntry;
  onPress: (entry: RestaurantEntry) => void;
}

export default function EntryCard({ entry, onPress }: EntryCardProps) {
  const styles = useEntryCardStyles();
  const deleteMutation = useDeleteRestaurantEntryMutation();
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 });
  const menuButtonRef = useRef<View>(null);

  const visitedDate = entry.visitedAt
    ? new Date(entry.visitedAt).toLocaleDateString()
    : null;

  const handleDelete = () => {
    setMenuVisible(false);
    Alert.alert('Delete Entry', 'Are you sure you want to delete this restaurant entry?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => deleteMutation.mutate(entry.id),
      },
    ]);
  };

  const handleOpenInMaps = () => {
    setMenuVisible(false);
    const query = encodeURIComponent(entry.restaurantName + ' ' + entry.restaurantAddress);
    const url = `comgooglemaps://?q=${query}`;
    const webUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;

    Linking.openURL(url).catch(() => Linking.openURL(webUrl));
  };

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(entry)} activeOpacity={0.7}>
      <View style={styles.headerRow}>
        <View style={styles.headerText}>
          <Text style={styles.name} numberOfLines={1}>{entry.restaurantName}</Text>
          {entry.restaurantAddress ? (
            <Text style={styles.address} numberOfLines={1}>{entry.restaurantAddress}</Text>
          ) : null}
        </View>
        <TouchableOpacity
          ref={menuButtonRef as any}
          style={styles.menuButton}
          onPress={(e) => {
            e.stopPropagation();
            menuButtonRef.current?.measureInWindow((x, y, width, height) => {
              setMenuPosition({ top: y + height + 4, right: 0 });
              setMenuVisible(true);
            });
          }}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <View style={styles.menuDotsColumn}>
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.metaRow}>
        {entry.status === EntryStatus.Visited && entry.rating != null && (
          <Text style={styles.ratingText}>★ {entry.rating.toFixed(1)}</Text>
        )}
        {entry.status === EntryStatus.Visited && visitedDate && (
          <Text style={styles.metaText}>Visited {visitedDate}</Text>
        )}
        {entry.notes ? (
          <Text style={styles.metaTextNotes} numberOfLines={1}>📝 {entry.notes}</Text>
        ) : null}
      </View>

      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <Pressable style={styles.menuOverlay} onPress={() => setMenuVisible(false)}>
          <View style={[styles.menuPopup, { position: 'absolute', top: menuPosition.top, right: 16 }]}>
            <TouchableOpacity style={styles.menuItem} onPress={handleOpenInMaps}>
              <Text style={styles.menuItemText}>Open in Google Maps</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={handleDelete}>
              <Text style={styles.menuItemTextDanger}>Delete</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </TouchableOpacity>
  );
}
