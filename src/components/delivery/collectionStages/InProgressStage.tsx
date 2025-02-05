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
                <View className="flex flex-col elevation-md rounded-md px-4 py-6 bg-white">
                    <View className="flex flex-row justify-between ">
                        <Text>Pedido Nº 4502</Text>
                        <Text className="text-green-700 bg-green-400 px-6 rounded-lg">Pronto</Text>
                    </View>
                    
                    <Text className="mt-10">INFORME O CÓDIGO DE COLETA PARA A LOJA</Text>
                    <Text className="m-auto mt-8 w-[50%] text-center bg-gray-line p-4">1038</Text>
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