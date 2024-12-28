import { FontAwesome6 } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";

export default function WaitingForRestaurant({ isOrderConfirmed, onProceedToPayment }: { isOrderConfirmed: boolean, onProceedToPayment: () => void; }) {
    const [timeLeft, setTimeLeft] = useState(60);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [timeLeft]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };
    
    return (
        <View className="justify-center items-center p-14 flex-1 w-full">
            {isOrderConfirmed ? (
                <View className="flex flex-col items-center justify-center p-4 bg-white h-[50%] w-full rounded-xl elevation-lg shadow-md">
                    <View className="flex flex-col items-center justify-center rounded-full bg-red-200 h-20 w-20">
                        <FontAwesome6 name="check" size={40} color="red" />
                    </View>
                    <Text className="text-center text-2xl mt-4 font-bold text-red-main">Pedido confirmado</Text>
                    <Text className="text-center text-sm mt-2 font-normal text-gray-300">Seu pedido foi confirmado. Volte para efetuar seu pagamento</Text>
                    <View className="flex bg-red-main mt-8 p-4 rounded-xl">
                        <TouchableOpacity onPress={onProceedToPayment}>
                            <Text className="text-white">Ir para pagamento</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : timeLeft === 0 ? (
                <View className="flex flex-col items-center justify-center p-4 bg-white h-[50%] w-full rounded-xl elevation-lg shadow-md">
                    <View className="flex flex-col items-center justify-center rounded-full bg-red-200 h-20 w-20">
                        <FontAwesome6 name="x" size={40} color="red" />
                    </View>
                    <Text className="text-center text-2xl mt-4 font-bold text-red-main">Pedido negado</Text>
                    <Text className="text-center text-sm mt-2 font-normal text-gray-300">Infelizmente o estabelecimento negou o seu pedido.</Text>
                    <View className="flex bg-red-main mt-8 p-4 rounded-xl">
                        <TouchableOpacity>
                            <Text className="text-white">Voltar para tela inicial</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <View className="flex flex-col items-center justify-center p-4 bg-white h-[50%] w-full rounded-xl elevation-lg shadow-md">
                    <View className="flex flex-col items-center justify-center rounded-full bg-red-200 h-20 w-20">
                        <ActivityIndicator size="large" color="red"/>
                    </View>
                    <Text className="text-center text-2xl mt-4 font-bold text-red-main">Aguarde...</Text>
                    <Text className="text-center text-sm mt-2 font-normal text-gray-300">Seu pedido está sendo confirmado pelo estabelecimento</Text>
                    <View className="flex bg-red-main mt-8 p-4 rounded-xl">
                        <Text className="text-center text-lg font-medium text-white">
                            {formatTime(timeLeft)}
                        </Text>
                    </View>
                </View>
            )}
        </View>
    );
}
