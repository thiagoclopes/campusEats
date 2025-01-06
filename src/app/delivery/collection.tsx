import LOCAL_IP from "@/config";
import BackArrow from "@/src/components/shared/backArrow";
import { FontAwesome6 } from "@expo/vector-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";

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

export default function CollectionScreen() {
    const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
    
    useEffect(() => {
        const fetchCurrentOrder = async () => {
			try {
				const response = await axios.get(`${LOCAL_IP}/orders?courierId=321`);
                
				setCurrentOrder(response.data[0])

			} catch (error) {
				console.error("Erro:", error);
			}
		};
		fetchCurrentOrder();
    }, []);
    
    return (
        <View className="flex-1 flex-col w-full bg-white">
            <BackArrow color="black" title="Coleta"/>
            <View className="px-4 py-8">
                <View className="elevation-md rounded-md h-44 bg-white">
                    <View className="flex flex-row p-4 w-full h-full justify-between">
                        <View className="flex flex-row items-center pb-2 gap-2 w-[50%] border-b border-b-gray">
                            <FontAwesome6 name="store" size={18} color="black" />
                            <Text>Colete em {currentOrder?.address}</Text>
                        </View>
                        <Image
                            source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKDxIZuYWiY5x3xXGFEjPqcPuiG3LUsSxSoA&s'}}
                            style={{ flex: 1, resizeMode: 'cover'}}
                        />
                    </View>
                    
                </View>
            </View>
            
        </View>
    )
}