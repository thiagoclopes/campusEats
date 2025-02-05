import PopUpCollection from "@/src/app/delivery/popUpCollection";
import { FontAwesome6 } from "@expo/vector-icons";
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


interface CompletedStageProps {
    currentOrder: Order | null
    updatecollectionStatus: (newStatus: string) => void;
}

export default function CompletedStage({ currentOrder, updatecollectionStatus }: CompletedStageProps){
    const [modalVisible, setModalVisible] = useState(false);
    
    return(
        <View><Text>oi</Text></View>
    )
}