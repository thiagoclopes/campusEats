import { View, Text, TouchableOpacity } from "react-native";

export default function OrderConfirmation(){
    return (
        <View className="flex flex-col h-full items-center justify-center">
            <TouchableOpacity className=" bg-slate-500 p-4">
                <Text className="text-white">
                    Confirmar Pagamento
                </Text>
            </TouchableOpacity>
            
        </View>
    )
}