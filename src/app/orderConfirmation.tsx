import { useLocalSearchParams, useRouter } from "expo-router";
import { View, ScrollView, Text, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform } from "react-native";
import PaymentDetails from '../components/paymentDetails';
import BackArrow from '../components/backArrow';
import CardList from "../components/cardList";
import { useEffect, useState } from "react";
import WaitingForRestaurant from "../components/waitingForRestaurant";
import axios from "axios";
import LOCAL_IP from "@/config";

interface Order {
    id: string;
    items: CartItem[];
    address: string;
    status: string;
}

interface CartItem {
    id: string;
    foodId: string;
    restaurantId: string;
    quantity: number;
    price: number;
}

export default function OrderConfirmation(){
    const router = useRouter();
    const { orderId, subtotal, deliveryFee, deliveryTime } = useLocalSearchParams();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);
    const [isPaymentValidating, setIsPaymentValidating] = useState(false);
    const [isReadyForPayment, setIsReadyForPayment] = useState(false);

    useEffect(() => {
        axios.get(`${LOCAL_IP}/orders/${orderId}`)
          .then(response => {
            setOrder(response.data);
            setLoading(false);
          })
          .catch(err => {
            setLoading(false);
            console.error(err);
          });
      }, [orderId]);

      const updateOrderStatus = () => {
        if (order) {
          axios.patch(`${LOCAL_IP}/orders/${order.id}`, {
            status: "Preparing"
          })
            .then(response => {
              setOrder(response.data); 
              console.log("Order status updated successfully!");
            })
            .catch(err => {
              console.error(err);
            });
        }
      };

    const handleCardSelect = (id: string) => {
        console.log(`Cartão selecionado: ${id}`);
      };

    const simulateOrderConfirmation = () => {
        setTimeout(() => {
            setIsOrderConfirmed(true);
        }, 5000);
    };

    useEffect(() => {
        simulateOrderConfirmation();
    }, []);

    const simulatePaymentValidation = () => {
        setIsPaymentValidating(true); 
        setTimeout(() => {
          updateOrderStatus();
          router.push(`/success?orderId=${orderId}`)
          setIsPaymentValidating(false);
        }, 3000);
    };

    if(!isReadyForPayment) {
        return (
            <View className='flex-1 flex-col justify-center items-center'>
                <WaitingForRestaurant isOrderConfirmed={isOrderConfirmed} onProceedToPayment={() => setIsReadyForPayment(true)}/>
            </View>
        )
    }

    return (
        <View className="flex-1">
            <View className="flex-1">
                <BackArrow color='black' title='Resumo do pedido' route='/cart'/>

                {isPaymentValidating ? (
                    <View className="flex flex-col w-full my-auto items-center justify-center">
                        <View className="flex flex-col items-center justify-center rounded-full bg-red-200 h-16 w-16">
                            <ActivityIndicator size="large" color="red"/>
                        </View>
                        <Text className="text-xl font-semibold mt-3">Confirmando pagamento</Text>
                        <Text className="text-sm mt-4 pb-20">Aguarde enquanto processamos seu pedido</Text>
                    </View>
                ) : (
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        className="flex-1"
                    >
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}>
                        <View className="w-96 mx-auto mb-6">
                            <Text className="font-semibold mb-5 text-xl">Valores</Text>
                            <PaymentDetails 
                                    subtotal={Number(subtotal)} 
                                    deliveryFee={Number(deliveryFee)} 
                                    deliveryTime={String(deliveryTime)} 
                                />

                            <Text className="font-semibold mt-16 mb-5 text-xl">Endereço de Entrega</Text>
                            <Text>ENDEREÇOS</Text>
                            <TouchableOpacity>
                                <Text className="font-medium text-lg mt-2">Mudar endereço</Text>
                            </TouchableOpacity>

                            <Text className="font-semibold mt-16 mb-2 text-xl">Formas de pagamento</Text>
                            <CardList onCardSelect={handleCardSelect} />
                        </View>
                        
                    </ScrollView>
                    </KeyboardAvoidingView>
                )}
                <View className="shadow-md" 
                            style={{
                                height: 100,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-around',
                                backgroundColor: 'white',
                            }}>
                                <TouchableOpacity className={'w-[70%] rounded-xl bg-red-main py-6'} onPress={simulatePaymentValidation}>
                                    <Text className='text-center text-white font-semibold'>Efetuar pagamento - R$ total</Text>
                                </TouchableOpacity>
                        </View>

            </View>
        </View>
    )
}

// se não tiver endereço ou método de pagamento, aparecer mensagem
// Total deve ser recebido como props
// quando estiver confirmando pagamento, desaparecer botão de efetuar