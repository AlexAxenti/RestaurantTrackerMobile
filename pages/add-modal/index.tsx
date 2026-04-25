import { AutocompletePlaceDto } from '@/api/dtos/places/autocomplete-places-response';
import { useLocation } from '@/hooks/use-location';
import { BlurView } from 'expo-blur';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useMemo } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { PlaceSearchBar } from './_components/place-search-bar/place-search-bar';
import { useAddModalStyles } from './add-modal.styles';

function generateSessionToken(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 32; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export default function AddModalPage() {
  const router = useRouter();
  const styles = useAddModalStyles();
  const params = useLocalSearchParams<{ defaultStatus?: string }>();
  const defaultStatus = params.defaultStatus ?? '0';

  // Token lives as long as this modal is mounted
  const sessionToken = useMemo(() => generateSessionToken(), []);
  const { latitude, longitude } = useLocation();

  const handleSelect = useCallback(
    (place: AutocompletePlaceDto) => {
      router.dismiss();
      router.push({
        pathname: '/(app)/entry-form',
        params: { placeId: place.placeId, sessionToken, defaultStatus },
      });
    },
    [router, sessionToken, defaultStatus]
  );

  const handleManual = () => {
    router.dismiss();
    router.push({
      pathname: '/(app)/entry-form',
      params: { defaultStatus },
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.overlay}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Pressable style={styles.backdrop} onPress={() => router.back()}>
        <BlurView intensity={30} tint="dark" style={styles.blur} />
      </Pressable>
      <View style={styles.modal}>

        <PlaceSearchBar sessionToken={sessionToken} onSelect={handleSelect} latitude={latitude} longitude={longitude} />

        <View style={styles.dividerRow}>
          <View style={styles.divider} />
        </View>

        <TouchableOpacity style={styles.manualButton} onPress={handleManual} activeOpacity={0.8}>
          <Text style={styles.manualButtonText}>Input Manually</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
