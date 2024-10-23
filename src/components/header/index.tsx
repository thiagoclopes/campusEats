import { View, Pressable, Text } from "react-native";
import { Ionicons, Feather, Fontisto, AntDesign } from '@expo/vector-icons'
export function Header() {
    return (
        <View className=" w-full flex flex-row items-center justify-between">
            <Pressable className="w-12 h-12 bg-white rounded-full flex justify-center items-center">
                <AntDesign name="user" size={30} color="#121212"/>
            </Pressable>
            
            <View className="pl-10 flex flex-col items-center justify-center">
                <Text className="text-center text-sm text-slate-800">Localização</Text>

                <View className="flex-row items-center justify-center gap-1">
                    <Feather name="map-pin" size={14} color="#FF0000"/>
                    <Text className="text-lg font-bold">ECT</Text>
                </View>
            </View>
            <View className="flex flex-row gap-3">
                <Pressable className="w-10 h-10 bg-white rounded-full flex justify-center items-center">
                    <Feather name="bell" size={20} color="#121212"/>
                </Pressable>
                <Pressable className="w-10 h-10 bg-white rounded-full flex justify-center items-center">
                    <Fontisto name="map" size={20} color="#121212"/>
                </Pressable>
            </View>
        </View>
    );
}