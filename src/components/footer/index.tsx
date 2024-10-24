import { View, Pressable, Text } from "react-native";
import { Ionicons, Feather, Fontisto, AntDesign, FontAwesome5, Entypo } from '@expo/vector-icons'
export function Footer() {
    return (
        <View className="absolute bottom-0 right-0 left-0 w-full h-16 flex flex-row items-center justify-center gap-8 bg-red-main">
            <Pressable className="w-12 h-12 flex justify-center items-center">
                <Feather name="home" size={24} color="#FFFFFF" />
            </Pressable>
            <Pressable className="w-12 h-12 flex justify-center items-center">
                <Feather name="search" size={24} color="#FFFFFF" />
            </Pressable>

            <Pressable className="w-12 h-12 flex justify-center items-center">
                <FontAwesome5 name="list-alt" size={24} color="#FFFFFF" />
            </Pressable>

            <Pressable className="w-12 h-12 flex justify-center items-center">
                <Entypo name="chat" size={24} color="#FFFFFF" />
            </Pressable>

            <Pressable className="w-12 h-12 flex justify-center items-center">
                <AntDesign name="user" size={24} color="#FFFFFF"/>
            </Pressable>
            
            
           
            
        </View>
    );
}