import { useLocalSearchParams, useRouter } from "expo-router";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import PaymentDetails from '../components/paymentDetails';
import BackArrow from '../components/backArrow';
import CardList from "../components/cardList";

export default function OrderConfirmation(){
    const router = useRouter();
    const { orderId, subtotal, deliveryFee, deliveryTime } = useLocalSearchParams();
    const handleCardSelect = (id: string) => {
        console.log(`Cartão selecionado: ${id}`);
      };

    return (
        <View className="flex-1">
            <View className="flex-1">
                <BackArrow color='black' title='Resumo do pedido' route='/cart'/>
                <View className="w-96 mx-auto">
                    <Text className="font-semibold mb-5 text-xl">Valores</Text>
                    <PaymentDetails 
                            subtotal={Number(subtotal)} 
                            deliveryFee={Number(deliveryFee)} 
                            deliveryTime={String(deliveryTime)} 
                        />

                    <Text className="font-semibold mt-10 mb-5 text-xl">Formas de pagamento</Text>
                    <CardList onCardSelect={handleCardSelect} />

                    <TouchableOpacity className=" bg-red-main p-4 rounded-xl" onPress={() => router.push(`/success?orderId=${orderId}`)}>
                        <Text className="text-white">
                            Confirmar Pagamento
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}