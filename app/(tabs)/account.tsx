import { Link } from "expo-router"
import { Text, SafeAreaView } from "react-native"

export default function Account() {
  return <SafeAreaView>
    <Text>Account</Text>
    <Link href="/accountinfo">
      <Text>Account Information</Text>
    </Link>
  </SafeAreaView>
}