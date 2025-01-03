import { Entypo } from "@expo/vector-icons";
import { router } from "expo-router";
import { TouchableOpacity, View, Text, Image } from "react-native";

interface OrderStatusBarProps {
    imageUrl: string;
}

export default function orderStatusBar({imageUrl}: OrderStatusBarProps) {
    return (
        <View className="flex-row items-center justify-center gap-3 py-2.5 bg-off-white">
            <Image
                source={{ uri: imageUrl }} 
                style={{ width: 46, height: 46, resizeMode: 'cover' }}
                className="rounded-lg"
            />
            <View className="flex-row items-center">
                <Entypo name="dot-single" size={24} color="red" />
                <Text className="text-xs">Preparação</Text>
            </View>
            <TouchableOpacity
                className="px-6 py-2 ml-1 bg-red-main rounded-xl"
                onPress={() => router.push(`/client/orderDetails`)}
            >
                <Text className="text-off-white">Acompanhar Pedido</Text>
            </TouchableOpacity>
        </View>
    );
}
