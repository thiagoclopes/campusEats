import { router } from "expo-router";
import { TouchableOpacity, View, Text, Image } from "react-native";

interface CartStatusBarProps {
    imageUrl: string;
    firstItemName: string;
    itemCount: number;
    subTotal: number;
}

export default function CartStatusBar({imageUrl, firstItemName, itemCount, subTotal}: CartStatusBarProps) {
    const formatedSubTotal = subTotal.toFixed(2).replace('.', ',')
    return (
        <View className="flex-row items-center justify-center py-2.5 bg-off-white">
            <Image
                source={{ uri: imageUrl }} 
                style={{ width: 46, height: 46, resizeMode: 'cover' }}
                className="rounded-lg"
            />
            <View className="flex-col gap-0 m-2.5">
                <Text className="font-normal text-xs">Subtotal</Text>
                <Text className="font-semibold text-base -mt-1.5">R$ {formatedSubTotal}</Text>
            </View>
            <View className="w-px h-10 bg-black" />
            <View className="flex-col gap-0 m-2.5">
                <Text className="font-normal text-xs">{firstItemName},</Text>
                <Text className="font-semibold text-sm -mt-1.5">+{itemCount-1} itens</Text>
            </View>
            <TouchableOpacity
                className="px-8 py-2 ml-1 bg-red-main rounded-xl"
                onPress={() => router.push('/client/cart')}
            >
                <Text className="text-off-white">Ver carrinho</Text>
            </TouchableOpacity>
        </View>
    );
}
