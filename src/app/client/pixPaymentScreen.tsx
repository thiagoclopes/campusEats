import BackArrow from '@/src/components/shared/backArrow';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function PixPaymentScreen() {
    const pixCode = "00020126330014BR.GOV.BCB.PIX0114+55419999999999204000053039865405840.905802BR5908CLIENTE6009BRASIL62070503***6304ABCD";

    return (
        <View className="flex-1 p-4 bg-white">
            <BackArrow color="black" title="PIX" route="/client/orderConfirmation" />

            <View className="mt-6">
                <Text className="text-lg font-semibold text-black-gray">Valor do pedido</Text>
                <Text className="text-3xl font-bold text-black">R$ 84,90</Text>
            </View>

            <View className="mt-6 items-center justify-center">
                <Text className="text-lg font-semibold text-black-gray mb-4">Escaneie o QR Code para pagar</Text>
                <QRCode
                    value={pixCode}
                    size={200}
                    backgroundColor="white"
                    color="black"
                />
            </View>

            <View className="mt-4">
                <Text className="text-black mb-2">{pixCode}</Text>
                <TouchableOpacity className="border border-black rounded-xl py-2">
                    <Text className="text-center">Copiar código Pix</Text>
                </TouchableOpacity>
            </View>

            <View className="mt-6">
                <Text className="text-xl font-bold text-black">Como pagar com Pix</Text>
                <Text className="mt-2 text-base text-black">
                    - Entre no aplicativo da sua instituição financeira e acesse o ambiente Pix;
                </Text>
                <Text className="text-base text-black">
                    - Escolha a opção de Copiar e Colar o código Pix;
                </Text>
                <Text className="text-base text-black">
                    - Cole o código Pix;
                </Text>
                <Text className="text-base text-black">
                    - Confirme as informações e confirme o pagamento.
                </Text>
            </View>
        </View>
    );
}
