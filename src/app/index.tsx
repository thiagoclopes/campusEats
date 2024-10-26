import { Text, View, ScrollView, StatusBar } from "react-native";
import { Header } from "../components/header";
import Constants from 'expo-constants'
import { Banner } from "../components/banner";
import { Footer } from "../components/footer";
import { Products } from "../components/productsList";

const statusBarHeight = Constants.statusBarHeight

export default function Index() {
  return (
    <ScrollView 
      style={{ flex: 1}}
      className="bg-white"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <StatusBar backgroundColor="#EF2A39" barStyle="light-content" />
      <View className="w-full px-4">
        <Header/>
        <Banner/>
        <Products/>
      </View>
      <Footer/>
    </ScrollView>
  );
}
