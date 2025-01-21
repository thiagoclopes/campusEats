import { View, Pressable, Text, Image } from "react-native";
import { Ionicons, Feather, Fontisto, AntDesign } from '@expo/vector-icons'
import { router } from "expo-router";
export function Header() {
    return (
        <View className=" w-full flex flex-row items-center justify-between px-4 pt-4">
            <View className="w-[40%] h-20">
                <Image
                    source={require("../../../assets/app_logo.png")}
                    className="w-full h-full"
                    resizeMode="contain"
                />
            </View>

            <View className="w-[30%] flex flex-row items-center justify-center gap-8">
                <Pressable className="bg-gray-chat h-10 w-10 rounded-full flex justify-center items-center" onPress={() => router.push('/client/noCourier')}>
                    <Feather name="bell" size={20} color="#808080"/>
                </Pressable>
                <Pressable className="bg-gray-chat h-10 w-10 rounded-full flex justify-center items-center" onPress={() => router.push('/client/mapscreen')}>
                    <Fontisto name="map" size={20} color="#808080"/>
                </Pressable>
            </View>
            
            
            
        </View>
    );
}