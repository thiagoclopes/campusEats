import { Text, View, ScrollView } from "react-native";
import { Header } from "../components/header";
import Constants from 'expo-constants'
import { Banner } from "../components/banner";
import { Footer } from "../components/footer";

const statusBarHeight = Constants.statusBarHeight

export default function Index() {
  return (
    <ScrollView 
      style={{ flex: 1}}
      className="bg-white"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View className="w-full px-4" style={{marginTop: statusBarHeight + 8}}>
        <Header/>
        <Banner/>
      </View>
      <Footer/>
    </ScrollView>
  );
}
