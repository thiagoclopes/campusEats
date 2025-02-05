import PopUpCollection from "@/src/app/delivery/popUpCollection";
import { FontAwesome6 } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
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


interface ArrivedStageProps {
    currentOrder: Order | null
    updatecollectionStatus: (newStatus: string) => void;
}

export default function ArrivedStage({ currentOrder, updatecollectionStatus }: ArrivedStageProps){
    const [modalVisible, setModalVisible] = useState(false);
    
    return(
        <View className="flex-1 justify-between flex-col px-4 py-8">
            <View className="flex flex-col gap-4">
                <View className="elevation-md rounded-md bg-white">
                    <View className="flex flex-row p-4 w-full justify-between">
                        <View className="flex flex-row items-center pb-2 gap-2 w-[50%] border-b border-b-gray">
                            <FontAwesome6 name="store" size={18} color="black" />
                            <Text>Colete em {currentOrder?.address}</Text>
                        </View>
                        <OpenMapsButton/>
                    </View>
                </View>

                <View className="flex flex-row justify-between elevation-md rounded-md px-4 py-6 bg-white">
                    <Text>Pedido Nº 4502</Text>
                    <Text className="text-green-700 bg-green-400 px-6 rounded-lg">Pronto</Text>
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