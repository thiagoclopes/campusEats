import Constants from "expo-constants";
import "../styles/global.css";
import { Slot } from "expo-router";
import { StatusBar, View } from "react-native";
import { useEffect } from "react";

const statusBarHeight = Constants.statusBarHeight
export default function RootLayout() {
  
  return (
    <View className="flex flex-1 h-full">
      <Slot/>
    </View>
  )
}
