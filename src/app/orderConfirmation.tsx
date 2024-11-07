import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";

export default function OrderConfirmation(){
    const router = useRouter();
    return (
        <View className="flex flex-col h-full items-center justify-center">
            <TouchableOpacity className=" bg-slate-500 p-4" onPress={() => router.push('/orderProgress')}>
                <Text className="text-white">
                    Confirmar Pagamento
                </Text>
            </TouchableOpacity>
            
        </View>
    )
}