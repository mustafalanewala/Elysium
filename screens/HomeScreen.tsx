import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, Image, StyleSheet, ActivityIndicator, Text } from 'react-native';
import axios from 'axios';

const UNSPLASH_API_KEY = 'sIj0YuBPU7Rq0FhaoTOfe083eBczi08FCD6GOS-o7lE';

interface Wallpaper {
  id: string;
  urls: {
    small: string;
    full: string;
  };
}

const HomeScreen = ({ navigation }: any) => {
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true); // To track if there are more wallpapers to load

  const fetchWallpapers = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const response = await axios.get('https://api.unsplash.com/photos', {
        params: {
          client_id: UNSPLASH_API_KEY,
          query: 'wallpapers',
          per_page: 30,
          page: page,
        },
      });

      const newWallpapers = response.data;

      setWallpapers((prevWallpapers) => [...prevWallpapers, ...newWallpapers]);
      setPage((prevPage) => prevPage + 1);
      if (newWallpapers.length < 30) setHasMore(false);
    } catch (error) {
      console.error('Error fetching wallpapers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWallpapers();
  }, []);

  const handleNextPage = () => {
    fetchWallpapers();
  };

  if (loading && page === 1) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={wallpapers}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('WallpaperDetail', { wallpaper: item })}
          >
            <Image source={{ uri: item.urls.small }} style={styles.image} />
          </TouchableOpacity>
        )}
        ListFooterComponent={
          loading ? (
            <ActivityIndicator size="small" color="#0000ff" />
          ) : (
            hasMore ? (
              <TouchableOpacity style={styles.loadMoreButton} onPress={handleNextPage}>
                <Text style={styles.loadMoreText}>Load More</Text>
              </TouchableOpacity>
            ) : null
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  item: {
    flex: 1,
    margin: 5,
    height: 260,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    resizeMode: 'cover',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadMoreButton: {
    padding: 10,
    backgroundColor: 'skyblue',
    alignItems: 'center',
    marginVertical: 20,
    borderRadius: 5,
    width: '60%',
    alignSelf: 'center'
  },
  loadMoreText: {
    color: '#fff',
    fontSize: 16,
  },
});


export default HomeScreen;
