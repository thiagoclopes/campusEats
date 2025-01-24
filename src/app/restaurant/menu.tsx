import { View, Text } from "react-native";
import { Footer } from "@/src/components/restaurant/footer";

export default function Menu() {
  return (
    <View className="flex-1">
      <View className="flex-1 justify-center">
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>
          Cardápio
        </Text>
      </View>
      <Footer/>
    </View>
  );
}
