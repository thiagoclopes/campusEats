import { router } from "expo-router";
import { TouchableOpacity, View, Text, Image } from "react-native";

interface OrderStatusBarProps {
    imageUrl: string;
    orderStatus: string;
}

export default function orderStatusBar({imageUrl, orderStatus}: OrderStatusBarProps) {
    return (
        <View className="flex-row items-center justify-center py-2.5 bg-off-white">
            <Image
                source={{ uri: imageUrl }} 
                style={{ width: 46, height: 46, resizeMode: 'cover' }}
                className="rounded-lg"
            />
            <View className="flex-col gap-0 m-2.5">
                <Text className="font-normal text-xs">Subtotal</Text>
                <Text className="font-semibold text-base -mt-1.5"> {orderStatus}</Text>
            </View>
            <TouchableOpacity
                className="px-8 py-2 ml-1 bg-red-main rounded-xl"
                onPress={() => router.push('/cart')}
            >
                <Text className="text-off-white">Acompanhar Entrega</Text>
            </TouchableOpacity>
        </View>
    );
}
