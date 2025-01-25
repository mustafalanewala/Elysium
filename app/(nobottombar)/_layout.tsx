import { Slot, Link } from "expo-router"
import { Text, SafeAreaView, View } from "react-native"

export default function RootLayout() {
  return <View>
    <Link href="/account">
      <Text>Go Back</Text>
    </Link>
    <Slot />
  </View>
}