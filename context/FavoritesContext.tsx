import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Wallpaper {
  id: string;
  urls: { small: string; full: string };
}

interface FavoritesContextType {
  favorites: Wallpaper[];
  toggleFavorite: (wallpaper: Wallpaper) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Wallpaper[]>([]);

  useEffect(() => {
    const loadFavorites = async () => {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      setFavorites(storedFavorites ? JSON.parse(storedFavorites) : []);
    };
    loadFavorites();
  }, []);

  const toggleFavorite = async (wallpaper: Wallpaper) => {
    const isFavorite = favorites.some((item) => item.id === wallpaper.id);
    let updatedFavorites;
    if (isFavorite) {
      updatedFavorites = favorites.filter((item) => item.id !== wallpaper.id);
    } else {
      updatedFavorites = [...favorites, wallpaper];
    }
    setFavorites(updatedFavorites);
    await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
