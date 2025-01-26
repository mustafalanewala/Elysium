import React, { useState, useEffect } from 'react';
import { View, FlatList, TextInput, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const UNSPLASH_API_KEY = 'sIj0YuBPU7Rq0FhaoTOfe083eBczi08FCD6GOS-o7lE';

interface Wallpaper {
  id: string;
  urls: {
    small: string;
    full: string;
  };
}

const ExploreScreen = ({ navigation }: any) => {
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');

  // Fetch wallpapers based on the search query or default to "dark"
  const fetchWallpapers = async (query: string) => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      const response = await axios.get('https://api.unsplash.com/search/photos', {
        params: {
          client_id: UNSPLASH_API_KEY,
          query: query,
          per_page: 20,
        },
      });
      setWallpapers(response.data.results);
    } catch (error) {
      console.error('Error fetching wallpapers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchText.trim()) {
      fetchWallpapers(searchText);
    } else {
      fetchWallpapers('dark');
    }
  };

  const renderWallpaper = ({ item }: { item: Wallpaper }) => (
    <TouchableOpacity
      style={styles.wallpaperCard}
      onPress={() => navigation.navigate('WallpaperDetail', { wallpaper: item })}
    >
      <Image source={{ uri: item.urls.small }} style={styles.wallpaperImage} />
    </TouchableOpacity>
  );

  useEffect(() => {
    fetchWallpapers('dark');
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search wallpapers..."
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Image source={{ uri: 'https://img.icons8.com/ios/50/000000/search.png' }} style={styles.searchIcon} />
        </TouchableOpacity>
      </View>

      {/* Wallpapers Grid */}
      <FlatList
        data={wallpapers}
        renderItem={renderWallpaper}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.wallpaperGrid}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    height: 45,
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingLeft: 15,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  searchButton: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: '#000',
    borderRadius: 25,
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: '#fff',
  },
  wallpaperGrid: {
    paddingTop: 10,
  },
  wallpaperCard: {
    flex: 1,
    margin: 8,
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    position: 'relative',
  },
  wallpaperImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ExploreScreen;
