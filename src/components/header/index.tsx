import { View, Pressable, Text, Image } from "react-native";
import { Ionicons, Feather, Fontisto, AntDesign } from '@expo/vector-icons'
import { router } from "expo-router";
export function Header() {
    return (
        <View className=" w-full flex flex-row items-center justify-between px-4">
            <View className="w-[30%] h-16">
                <Image
                    source={require("../../assets/Logo (1).png")}
                    className="w-full h-full"
                />
            </View>

            <View className="w-[30%] flex flex-row items-center justify-center gap-8">
                <Pressable className="bg-off-white h-10 w-10 rounded-full flex justify-center items-center" onPress={() => router.push('/notifications')}>
                    <Feather name="bell" size={20} color="black"/>
                </Pressable>
                <Pressable className="bg-off-white h-10 w-10 rounded-full flex justify-center items-center" onPress={() => router.push('/mapscreen')}>
                    <Fontisto name="map" size={20} color="black"/>
                </Pressable>
            </View>
            
            
            
        </View>
    );
}