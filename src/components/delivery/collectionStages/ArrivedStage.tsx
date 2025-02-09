import PopUpCollection from "@/src/app/delivery/popUpCollection";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, Image } from "react-native";

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


interface ArrivedStageProps {
    currentOrder: Order | null
    updatecollectionStatus: (newStatus: string) => void;
}

export default function ArrivedStage({ currentOrder, updatecollectionStatus }: ArrivedStageProps) {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View className="flex-1 justify-between flex-col px-4 py-8">
            <View className="flex flex-col gap-4">
                <View className="flex flex-row items-center bg-white mt-2 rounded-xl shadow-sm">
                    <View className="w-80 px-4 ">
                        <View className="flex flex-row">
                            <Ionicons className="my-auto " name="storefront" size={16} color="black" />
                            <Text className="font-semibold p-2 ml-2">Colete em {currentOrder?.address}</Text>
                            <Text className="font-medium p-2 ml-2">1.5km</Text>
                        </View>
                        <View className="flex h-[1px] w-full bg-gray" />
                        <Text className="text-sm p-2">Final da rua</Text>
                    </View>
                    <View className="aspect-square flex-1 flex items-center justify-end ml-auto">
                        <Image
                            source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKDxIZuYWiY5x3xXGFEjPqcPuiG3LUsSxSoA&s' }}
                            style={{ flex: 1, resizeMode: 'cover' }}
                            className="w-full rounded-r-xl"
                        />
                    </View>
                </View>

                <View className="flex flex-col elevation-md rounded-md px-4 py-10 bg-white shadow">
                    <View className="flex flex-row justify-between ">
                        <View className="">
                            <Text className="font-bold text-lg">Pedido Nº 4502</Text>
                        </View>
                        <View className="d-flex justify-center bg-green-400 rounded-lg px-6">
                            <Text className="text-green-700 ">Pronto</Text>
                        </View>
                    </View>
                </View>
            </View>

            <TouchableOpacity
                className="flex p-4 rounded-xl bg-red-main"
                onPress={() => setModalVisible(true)}
            >
                <Text className="text-white text-center" >COLETAR PEDIDOS</Text>
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
                        newStatus="in-progress"
                        title="Pronto para retirar?"
                        buttonText="Sim, confirmar saída"
                        secondaryButtonText="Voltar"
                    />
                ) : null}

            </Modal>
        </View>
    )
}