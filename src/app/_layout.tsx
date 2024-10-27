import Constants from "expo-constants";
import "../styles/global.css";
import { Slot } from "expo-router";
import { StatusBar, View } from "react-native";

const statusBarHeight = Constants.statusBarHeight
export default function RootLayout() {
  return (
    <View className="flex flex-1 h-full" style={{marginTop: statusBarHeight + 8}}>
      <StatusBar backgroundColor="#EF2A39" barStyle="light-content" />
      <Slot/>
    </View>
  )
}
