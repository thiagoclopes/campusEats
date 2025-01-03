import React from 'react';
import { View, Text } from 'react-native';

interface PaymentDetailsProps {
    subtotal: number;
    deliveryFee: number;
    deliveryTime: string;
}

const PaymentDetails: React.FC<PaymentDetailsProps> = ({ subtotal, deliveryFee, deliveryTime }) => {
    const total = subtotal + deliveryFee;

    return (
        <View className="flex flex-col gap-3 w-full px-4">
            <View className="flex flex-row justify-between text-black-gray-500">
                <Text>Subtotal</Text>
                <Text>R$ {subtotal.toFixed(2).replace('.', ',')}</Text>
            </View>
            <View className="flex flex-row justify-between text-black-gray-500">
                <Text>Taxa de entrega</Text>
                <Text>R$ {deliveryFee.toFixed(2).replace('.', ',')}</Text>
            </View>
            <View className="flex flex-row justify-between mt-5">
                <Text className="font-bold">Total</Text>
                <Text className="font-bold">R$ {total.toFixed(2).replace('.', ',')}</Text>
            </View>
            <View className="flex flex-row justify-between mt-5">
                <Text className="font-bold">Tempo de entrega:</Text>
                <Text className="font-bold text-sm">{deliveryTime}</Text>
            </View>
        </View>
    );
};

export default PaymentDetails;
