import { Text, SafeAreaView, Button, View } from "react-native"
import { useState } from "react"
import { DownloadPicture } from "@/components/BottomSheet";
export default function Explore() {
  const [pictureOpen, setPictureOpen] = useState(false);

  return <SafeAreaView style={{ flex: 1 }}>
    <View style={{ flex: 1 }}>
      <Text>Explore</Text>
      <Button title="open Bottom Sheet" onPress={() => {
        setPictureOpen(true);
      }}></Button>
      {pictureOpen && <DownloadPicture onClose={() => setPictureOpen(false)} />}
    </View>
  </SafeAreaView>
}