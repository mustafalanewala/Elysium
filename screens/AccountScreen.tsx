import React from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useFavorites } from '../context/FavoritesContext';

const AccountScreen = () => {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Favorites</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* Display wallpaper image */}
            <Image source={{ uri: item.urls.small }} style={styles.image} />
            {/* Remove button below image */}
            <TouchableOpacity
              onPress={() => toggleFavorite(item)}
              style={styles.unfavoriteButton}
            >
              <AntDesign name="heart" size={20} color="red" />
              <Text style={styles.unfavoriteText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyMessage}>
            No favorites yet. Start exploring and add wallpapers to your
            favorites!
          </Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  card: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    elevation: 2,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 8,
  },
  unfavoriteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#ffe6e6',
    borderRadius: 5,
    marginTop: 5,
    alignSelf: 'center',
  },
  unfavoriteText: {
    marginLeft: 5,
    color: '#d32f2f',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyMessage: {
    textAlign: 'center',
    color: 'gray',
    marginTop: 20,
    fontSize: 16,
  },
});

export default AccountScreen;
