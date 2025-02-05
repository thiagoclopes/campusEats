

import LOCAL_IP from "@/config";
import BackArrow from "@/src/components/shared/backArrow";
import { FontAwesome6 } from "@expo/vector-icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, Modal } from "react-native";
import PopUpCollection from "../../../app/delivery/popUpCollection";

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

interface StartedStageProps {
    currentOrder: Order | null
    updatecollectionStatus: (newStatus: string) => void;
}
  
export default function StartedStage({ currentOrder, updatecollectionStatus }: StartedStageProps) {
    const [modalVisible, setModalVisible] = useState(false);
    
    return (

        <View className="flex-1 justify-between flex-col px-4 py-8">
            <View className="elevation-md rounded-md h-44 bg-white">
                <View className="flex flex-row p-4 w-full h-full justify-between">
                    <View className="flex flex-row items-center pb-2 gap-2 w-[50%] border-b border-b-gray">
                        <FontAwesome6 name="store" size={18} color="black" />
                        <Text>Colete em {currentOrder?.address}</Text>

                    </View>
                </View>
            </View>
            <TouchableOpacity
                className="flex p-4 rounded-xl bg-red-main"
                onPress={() => setModalVisible(true)}
            >
                <Text className="text-white text-center" >CHEGUEI NA COLETA</Text>
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