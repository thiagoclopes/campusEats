import { View, Pressable, Text, Button } from "react-native";
import { Ionicons, Feather, Fontisto, AntDesign, FontAwesome5, Entypo } from '@expo/vector-icons'
export function Footer() {
    return (
        <View style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 64, // Ajuste conforme necessário
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            backgroundColor: 'red', // Ou use sua cor definida
            elevation: 5 // Adiciona sombra para Android
        }}>
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