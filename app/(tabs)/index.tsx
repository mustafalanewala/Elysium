import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, Text } from 'react-native';

const Tab = createMaterialTopTabNavigator();

export default function ForYou() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Suggested" component={HomeScreen} />
      <Tab.Screen name="Liked" component={HomeScreen} />
      <Tab.Screen name="Library" component={HomeScreen} />
    </Tab.Navigator>
  );
}


function HomeScreen() {
  return <View>
    <Text>Hello</Text>
  </View>
}