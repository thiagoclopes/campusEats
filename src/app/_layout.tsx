import Constants from "expo-constants";
import "../styles/global.css";
import { Slot } from "expo-router";
import { StatusBar, View, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import { StripeProvider } from '@stripe/stripe-react-native';
import axios from "axios";
import LOCAL_IP from "@/config";

const statusBarHeight = Constants.statusBarHeight


export default function RootLayout() {
  
  return (
    <StripeProvider publishableKey="pk_test_51QUyDUA120NL3CCB91oyY7ko0i5ghfFzMQR9jv84FYkco8xlg6aglcxJx8GgnTn29Pogkt3rYwuFQ6uPKTai5XG500Bj2WzHbN">
      <View className="flex flex-1 h-full" style={Platform.OS === 'ios' ? { marginTop: statusBarHeight } : null}>
        <Slot/>
      </View>
    </StripeProvider>
  )
}
