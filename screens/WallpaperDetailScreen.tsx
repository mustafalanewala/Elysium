import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';

interface WallpaperDetailScreenProps {
  route: any; // Route prop from React Navigation
}

const WallpaperDetailScreen = ({ route }: WallpaperDetailScreenProps) => {
  const { wallpaper } = route.params;

  // Function to download wallpaper
  const downloadWallpaper = async () => {
    try {
      const uri = wallpaper.urls.full; // High-quality image URL
      const fileUri = FileSystem.documentDirectory + `${wallpaper.id}.jpg`;
      await FileSystem.downloadAsync(uri, fileUri);
      Alert.alert('Download Complete', `Wallpaper saved to ${fileUri}`);
    } catch (error) {
      Alert.alert('Download Failed', 'Unable to download the wallpaper.');
      console.error('Download error:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Display Wallpaper */}
      <Image source={{ uri: wallpaper.urls.full }} style={styles.image} />

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.button} onPress={downloadWallpaper}>
          <Text style={styles.buttonText}>Download</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Mark as Favorite</Text>
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
  },
  buttonText: {
    color: '#fff',
  },
});

export default WallpaperDetailScreen;
