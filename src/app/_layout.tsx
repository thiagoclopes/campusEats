import Constants from "expo-constants";
import "../styles/global.css";
import { Slot } from "expo-router";
import { StatusBar, View, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler';


const statusBarHeight = Constants.statusBarHeight


export default function RootLayout() {
  
  return (
      <GestureHandlerRootView>
			<View className="flex flex-1 h-full" style={Platform.OS === 'ios' ? { marginTop: statusBarHeight } : null}>
				<Slot/>
			</View>
      </GestureHandlerRootView>
  )
}
