import { Entypo, FontAwesome6, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, Image } from "react-native";
import PopUpCollection from "../../../app/delivery/popUpCollection";
import OpenMapsButton from "./OpenMapsButton";

interface Order {
    id: string;
    items: CartItem[];
    address: string;
    status: string;
    courierId: string;
    recused?: boolean;
}

interface CartItem {
    id: string;
    foodId: string;
    restaurantId: string;
    quantity: number;
    price: number;
}


interface DeliveryArrivedStageProps {
    currentOrder: Order | null
    updatecollectionStatus: (newStatus: string) => void;
}

export default function DeliveryArrivedStage({ currentOrder, updatecollectionStatus }: DeliveryArrivedStageProps){
    const [modalVisible, setModalVisible] = useState(false);
    
    return(
        <View className="flex-1 justify-between flex-col px-4 py-8">

            <View className="flex">
                <View className="flex flex-row items-center bg-white mt-2 rounded-xl shadow-sm elevation-md">
                    <View className="w-80 px-4 ">
                        <View className="flex flex-row">
                            <Ionicons className="my-auto " name="storefront" size={16} color="black" />
                            <Text className="font-semibold p-2 ml-2">Entregue para Luciana dos Santos</Text>
                            <Text className="font-medium p-2 ml-2">1.5km</Text>
                        </View>
                        <View className="flex h-[1px] w-full bg-gray" />
                        <Text className="text-sm p-2">Próximo ao setor 4, local chamado de galinheiro.</Text>
                    </View>
                    <View className="aspect-square flex-1 flex items-center justify-end ml-auto">
                        <Image
                            source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKDxIZuYWiY5x3xXGFEjPqcPuiG3LUsSxSoA&s' }}
                            style={{ flex: 1, resizeMode: 'cover' }}
                            className="w-full rounded-r-xl"
                        />
                    </View>
                </View>

                <View className="flex flex-col justify-center p-4 bg-white mt-2 rounded-xl shadow-sm elevation-md">
                    <Text className="font-bold">Pedido Nº 4502</Text>
                    <Text className="mt-6 font-bold">Forma de pagamento: APP</Text>
                    <View className="mt-6 flex flex-row justify-between items-center">
                        <TouchableOpacity className=" py-6 w-[80%] bg-red-main rounded-xl">
                            <Text className="text-white text-center">Digitar código do cliente</Text>
                        </TouchableOpacity>
                        <Entypo name="circle" size={24} color="gray" />
                    </View>
                    <View className="mt-6 flex flex-row justify-between items-center">
                        <TouchableOpacity className=" py-6 w-[80%] bg-gray-line border border-gray-300 rounded-xl">
                            <Text className="text-gray-300 text-center">Iniciar cobrança</Text>
                        </TouchableOpacity>
                        <Entypo name="circle" size={24} color="gray" />
                    </View>
                </View>
            </View>

            

            <TouchableOpacity
                className="flex p-4 rounded-xl bg-gray-line border border-gray-300"
                disabled
                onPress={() => setModalVisible(true)}
            >
                <Text className="text-gray-300 text-center" >FINALIZAR ENTREGA</Text>
            </TouchableOpacity>

            <Modal
                transparent
                animationType="fade"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                {currentOrder?.id ? (
                    <PopUpCollection
                        setModalVisible={setModalVisible}
                        updatecollectionStatus={updatecollectionStatus}
                        newStatus="delivered"
                        title="Você realmente chegou na coleta?"
                        buttonText="Sim, confirmar chegada"
                        secondaryButtonText="Voltar"
                    />
                ) : null}

            </Modal>
        </View>
    )
}