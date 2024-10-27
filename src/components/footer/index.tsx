import { View, Pressable, Text, Button } from "react-native";
import { Ionicons, Feather, Fontisto, AntDesign, FontAwesome5, Entypo } from '@expo/vector-icons'
import { Link, useRouter } from 'expo-router';

export function Footer() {
    const router = useRouter();
    return (
        <View style={{
            height: 64,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            backgroundColor: 'red',
            elevation: 5
        }}>
            <Pressable className="w-12 h-12 flex justify-center items-center}"onPress={() => router.push('/')}>
                <Feather name="home" size={24} color="#FFFFFF" />
            </Pressable>
            <Pressable className="w-12 h-12 flex justify-center items-center" onPress={() => router.push('/search')}>
                <Feather name="search" size={24} color="#FFFFFF" />
            </Pressable>

            <Pressable className="w-12 h-12 flex justify-center items-center" onPress={() => router.push('/orders')}>
                <FontAwesome5 name="list-alt" size={24} color="#FFFFFF" />
            </Pressable>

            <Pressable className="w-12 h-12 flex justify-center items-center" onPress={() => router.push('/chat')}>
                <Entypo name="chat" size={24} color="#FFFFFF" />
            </Pressable>

            <Pressable className="w-12 h-12 flex justify-center items-center" onPress={() => router.push('/profile')}>
                <AntDesign name="user" size={24} color="#FFFFFF"/>
            </Pressable>

            
        </View>
    );
}