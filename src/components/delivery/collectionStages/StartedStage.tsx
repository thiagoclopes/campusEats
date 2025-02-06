

import LOCAL_IP from "@/config";
import BackArrow from "@/src/components/shared/backArrow";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, Modal } from "react-native";
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

interface StartedStageProps {
    currentOrder: Order | null
    updatecollectionStatus: (newStatus: string) => void;
}

export default function StartedStage({ currentOrder, updatecollectionStatus }: StartedStageProps) {
    const [modalVisible, setModalVisible] = useState(false);

    return (

        <View className="flex-1 justify-between flex-col px-4 py-8">

            <View className="flex">
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
                
                <View className="flex flex-row justify-end mt-4">
                    <OpenMapsButton/>
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
                        newStatus="arrived"
                        title="Você realmente chegou na coleta?"
                        buttonText="Sim, cheguei"
                        secondaryButtonText="Voltar"
                    />
                ) : null}

            </Modal>
        </View>

    )
}