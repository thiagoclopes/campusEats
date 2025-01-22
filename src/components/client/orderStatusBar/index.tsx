import { Entypo, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { TouchableOpacity, View, Text, Image } from "react-native";

interface OrderStatusBarProps {
    imageUrl: string;
    name: string;
    vehicle: string;
    plate: string;
    rating: string;
}

export default function orderStatusBar({imageUrl, name, vehicle, plate, rating}: OrderStatusBarProps) {
    return (
        <View className="flex-row items-center justify-center gap-3 py-2.5 bg-off-white">
            <Image
                source={{ uri: imageUrl }} 
                style={{ width: 46, height: 46, resizeMode: 'cover' }}
                className="rounded-lg"
            />
            <View className="flex flex-col">
                <View className="flex-row gap-2 items-center">
                    <Text className="text-sm font-semibold">{name}</Text>
                    <View className="flex flex-row">
                        <Ionicons name="star" size={12} color="#FFD700" />
                        <Text className="ml-2 text-xs">{rating}</Text>
                    </View>
                </View>
                <Text className="text-xs">{vehicle}  |  {plate}</Text>
            </View>
            <TouchableOpacity
                className="px-4 py-2 ml-1 bg-red-main rounded-xl"
                onPress={() => router.push(`/client/orderDetails`)}
            >
                <Text className="text-off-white">Acompanhar Pedido</Text>
            </TouchableOpacity>
        </View>
    );
}
