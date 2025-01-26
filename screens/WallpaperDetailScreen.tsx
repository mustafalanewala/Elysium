import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useFavorites } from '../context/FavoritesContext';
import * as FileSystem from 'expo-file-system';  // Expo FileSystem for downloading

interface WallpaperDetailScreenProps {
  route: any;
}

const WallpaperDetailScreen = ({ route }: WallpaperDetailScreenProps) => {
  const { wallpaper } = route.params;
  const { favorites, toggleFavorite } = useFavorites();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const isFav = favorites.some((item) => item.id === wallpaper.id);
    setIsFavorite(isFav);
  }, [favorites, wallpaper]);

  const handleToggleFavorite = () => {
    toggleFavorite(wallpaper);
    Alert.alert(isFavorite ? 'Removed from Favorites' : 'Added to Favorites');
  };

  const handleDownload = async () => {
    try {
      const uri = wallpaper.urls.full;
      const fileUri = FileSystem.documentDirectory + wallpaper.id + '.jpg';

      // Download the wallpaper image
      const { uri: localUri } = await FileSystem.downloadAsync(uri, fileUri);
      Alert.alert('Download Successful', `Wallpaper downloaded to: ${localUri}`);
    } catch (error) {
      console.error('Error downloading wallpaper:', error);
      Alert.alert('Download Failed', 'An error occurred while downloading the wallpaper.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: wallpaper.urls.full }} style={styles.image} />
      <View style={styles.actions}>
        <TouchableOpacity style={styles.button} onPress={handleDownload}>
          <AntDesign name="download" size={20} color="skyblue" />
          <Text style={styles.buttonText}>Download</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleToggleFavorite}>
          <AntDesign
            name={isFavorite ? 'heart' : 'hearto'}
            size={20}
            color="red"
          />
          <Text style={styles.buttonText}>
            {isFavorite ? 'Unfavorite' : 'Favorite'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#111',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#444',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    marginLeft: 5,
  },
});

export default WallpaperDetailScreen;
