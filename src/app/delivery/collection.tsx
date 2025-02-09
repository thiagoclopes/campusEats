import LOCAL_IP from "@/config";
import ArrivedStage from "@/src/components/delivery/collectionStages/ArrivedStage";
import Delivered from "@/src/components/delivery/collectionStages/Delivered";
import DeliveryArrivedStage from "@/src/components/delivery/collectionStages/DeliveryArrivedStage";
import DeliveryStartedStage from "@/src/components/delivery/collectionStages/DeliveryStartedStage";
import InProgressStage from "@/src/components/delivery/collectionStages/InProgressStage";
import StartedStage from "@/src/components/delivery/collectionStages/StartedStage";
import BackArrow from "@/src/components/shared/backArrow";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { View } from "react-native";

interface Order {
    id: string;
    items: CartItem[];
    address: string;
    status: string;
    courierId: string;
    recused?: boolean;
    collectionStatus: string;
}

interface CartItem {
    id: string;
    foodId: string;
    restaurantId: string;
    quantity: number;
    price: number;
}

export default function Collection(){
    const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
    const [collectionStatus, setcollectionStatus] = useState<string>('');
    const [isUpdated, setIsUpdated] = useState<boolean>(false);
    const [screenTitle, setScreenTitle] = useState<string>('Coleta');

    useEffect(() => {
        const fetchCurrentOrder = async () => {
            try {
                const response = await axios.get(`${LOCAL_IP}/orders?courierId=321`);
                
                if (response.data[0]) {
                    setCurrentOrder(response.data[0])
                    setcollectionStatus(response.data[0].collectionStatus);
                  }
    
            } catch (error) {
                console.error("Erro:", error);
            }
        };
        fetchCurrentOrder();
    }, [isUpdated]);

    const updatecollectionStatus = async (newStatus: string) => {
        try {
            const response = await axios.patch(`${LOCAL_IP}/orders/${currentOrder?.id}`, {
                collectionStatus: newStatus,
            });
        
            if (response.status === 200) {
                setcollectionStatus(newStatus);
                setIsUpdated(true);
            }
        } catch (error) {
            console.error("Erro ao atualizar o status da entrega:", error);
        }
    };

    useEffect(() => {
        if (
            collectionStatus === "collection-completed" ||
            collectionStatus === "delivery-arrived" ||
            collectionStatus === "delivered" 
        ) {
            setScreenTitle("Entrega");
        } else {
            setScreenTitle("Coleta");
        }
    }, [collectionStatus]);

    
    const renderContent = () => {
        switch (collectionStatus) {
            case 'started':
                return <StartedStage currentOrder={currentOrder} updatecollectionStatus={updatecollectionStatus}/>;
            case 'arrived':
                return <ArrivedStage currentOrder={currentOrder} updatecollectionStatus={updatecollectionStatus}/>;
            case 'in-progress':
                return <InProgressStage currentOrder={currentOrder} updatecollectionStatus={updatecollectionStatus}/>;
            case 'collection-completed':
                return <DeliveryStartedStage currentOrder={currentOrder} updatecollectionStatus={updatecollectionStatus}/>;
            case 'delivery-arrived':
                return <DeliveryArrivedStage currentOrder={currentOrder} updatecollectionStatus={updatecollectionStatus}/>;
            case 'delivered':
                return <Delivered currentOrder={currentOrder} updatecollectionStatus={updatecollectionStatus}/>;
            default:
            return null;
        }
    };

return (
  <View className="flex w-full h-full">
    <BackArrow color="black" title={screenTitle}/>
    {renderContent()}
  </View>
);
}