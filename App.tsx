import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import ExploreScreen from './screens/ExploreScreen';
import AccountScreen from './screens/AccountScreen';
import WallpaperDetailScreen from './screens/WallpaperDetailScreen';
import { Ionicons } from '@expo/vector-icons';
import { FavoritesProvider } from './context/FavoritesContext';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => {
  return (
    <FavoritesProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomeTab">
          <Stack.Screen name="HomeTab" component={HomeTabs} options={{ headerShown: false }} />
          <Stack.Screen name="WallpaperDetail" component={WallpaperDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </FavoritesProvider>

  );
};

// Bottom Tabs Navigator
const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: string = '';
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Explore') {
            iconName = 'search';
          } else if (route.name === 'Account') {
            iconName = 'person';
          }
          return <Ionicons name={iconName as keyof typeof Ionicons.glyphMap} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
};

export default App;
