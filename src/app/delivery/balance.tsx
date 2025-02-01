import BackArrow from "@/src/components/shared/backArrow";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text, TouchableOpacity } from "react-native";

export default function Balance() {
    return (
        <View>
            <BackArrow color="black" title="Saldo" route="/delivery"/>
            <View className="flex-col p-6">
                <View className="flex flex-row justify-between items-center">
                    <View className="flex flex-col">
                        <Text className="text-lg">Saldo atual</Text>
                        <Text className="text-2xl font-semibold">R$ 15,00</Text>
                    </View>
                    <MaterialCommunityIcons name="export-variant" size={32} color="red" />
                </View>
                <TouchableOpacity className="flex flex-row items-center justify-center gap-2 mt-10 ml-auto bg-gray-line px-3 py-2 rounded-md">
                    <Text>Dia</Text>
                    <Entypo name="chevron-down" size={18} color="black" />
                </TouchableOpacity>
                <View className="flex flex-row items-center justify-between mt-6">
                    <Text className="text-lg font-semibold">21 de Janeiro de 2025</Text>
                    <Text className="text-sm">Saldo do dia: R$ 15,00</Text>
                </View>
                <View className="w-full h-[1px] bg-gray-line mt-4" />
                <View className="flex flex-row items-center justify-between mt-4">
                    <View className="flex flex-row items-center gap-2">
                        <Entypo name="dot-single" size={24} color="red" />
                        <Text className="text-md">-30,00</Text>
                        <Text className="text-md">(PIX)</Text>
                    </View>
                    <View className="flex flex-row items-center gap-1">
                        <Text className="text-sm">Saldo:</Text>
                        <Text className="text-sm">15,00</Text>
                    </View>
                    
                </View>
            </View>
        </View>
    )
}