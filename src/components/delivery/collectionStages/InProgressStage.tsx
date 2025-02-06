import PopUpCollection from "@/src/app/delivery/popUpCollection";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";


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

interface InProgressStageProps {
    currentOrder: Order | null
    updatecollectionStatus: (newStatus: string) => void;
}

export default function InProgressStage({ currentOrder, updatecollectionStatus }: InProgressStageProps){
    const [modalVisible, setModalVisible] = useState(false);
    
    return(
        <View className="flex-1 justify-between flex-col px-4 py-8">
                <View className="flex flex-col elevation-md rounded-md px-4 py-10 bg-white shadow-sm">
                    <View className="flex flex-row justify-between ">
                        <View className="">
                            <Text className="font-bold text-lg">Pedido Nº 4502</Text>
                        </View>
                        <View className="d-flex justify-center bg-green-400 rounded-lg px-6">
                            <Text className="text-green-700 ">Pronto</Text>
                        </View>
                    </View>
                    
                    <Text className="mt-10 text-center">INFORME O CÓDIGO DE COLETA PARA A LOJA</Text>
                    <View className="bg-gray-line p-4 m-auto mt-8 w-[50%] rounded">
                        <Text className="font-semibold text-2xl text-center">1038</Text>
                    </View>
                    <Text className="text-center mt-8"> EM SEGUIDA, CONCLUA A ENTREGA</Text>
                </View>

            <TouchableOpacity
                className="flex p-4 rounded-xl bg-red-main"
                onPress={() => setModalVisible(true)}
            >
                <Text className="text-white text-center" >CONCLUIR A COLETA</Text>
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
                        newStatus="completed"
                        title="Você já coletou todos os pedidos?"
                        buttonText="Sim, confirmar saída"
                        secondaryButtonText="Voltar"
                    />
                ) : null}
                
            </Modal>
        </View>
    )
}