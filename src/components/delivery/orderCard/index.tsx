import LOCAL_IP from "@/config";
import axios from "axios";
import { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import TimerCircle from "./timerCircle";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

interface Order {
    id: string;
    items: CartItem[];
    address: string;
    status: string;
    courierId: string;
}

interface CartItem {
    id: string;
    foodId: string;
    restaurantId: string;
    quantity: number;
    price: number;
}

interface Restaurant {
    id: string;
    name: string;
    logo: string;
}

export default function OrderCard({ order, onAccept, onReject }: { order: Order, onAccept: (order: Order) => void, onReject: (orderId: string) => void }){
    const [timeLeft, setTimeLeft] = useState<number>(10); 
    const [restaurant, setRestaurant] = useState<Restaurant>();

    useEffect(() => {
            if (timeLeft > 0) {
                const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
                return () => clearTimeout(timer);
            }
        }, [timeLeft]);

    useEffect(() => {
        const fetchRestaurant = async () => {
            try{
                const response = await axios.get(`${LOCAL_IP}/restaurants`, {
                    params: { id: order.items[0].restaurantId },
                });
                setRestaurant(response.data[0]);
            } catch (error) {
                console.log("erro")
            }
        }
        fetchRestaurant();
    }, [])

    return (
        <View className="absolute z-10 bottom-14 left-3 right-3">
        <View className="flex flex-col items-center bg-white rounded-xl">
            <TimerCircle timeLeft={timeLeft} />
            <View className="flex flex-row items-center gap-40 p-8">
                <Text className="text-2xl font-bold">R$ 3,50</Text>
                <Text className="text-2xl font-bold">1,5km</Text>
            </View>
            <View className="flex h-[1px] w-full bg-gray-line"/>
            <View className="flex w-full p-8">
                <Text>{`Itens: ${order.items.length}`}</Text>

                <View className="flex flex-row items-center mt-4">
                    <View className="flex flex-col items-center">
                        <View className="w-3 h-3 rounded-full border-2 border-black mb-2" />
                        <View className="w-[2px] h-6 bg-black mb-2" />
                        <View className="w-3 h-3 rounded-full bg-black" />
                    </View>
                    <View className="flex flex-col justify-center pl-2 gap-7">
                        <Text className="text-gray">{restaurant?.name}</Text>
                        <Text className="text-gray">{order.address}</Text>
                    </View>
                </View>
                
                
            </View>
            <View className="flex flex-row w-full items-center justify-center gap-2 px-6 pb-6">
                <TouchableOpacity onPress={() => onReject(order.id)} className="w-[30%] bg-red-main p-4 rounded-lg">
                    <Text className="text-center font-semibold text-white">Recusar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onAccept(order)} className="w-[70%] bg-green-700 p-4 rounded-lg" >
                    <Text className="text-center font-semibold text-white">Aceitar</Text>
                </TouchableOpacity>
                
            </View>
        </View>

        <View className="flex flex-row items-center bg-white mt-2 rounded-xl">
            <View className="w-80 px-4">
                <View className="flex flex-row">
                    <Ionicons className="my-auto " name="storefront" size={16} color="black" />
                    <Text className="font-semibold p-2 ml-2">Colete em</Text>
                    <Text className="font-medium p-2 ml-2">1.5km</Text>
                </View>
                <View className="flex h-[1px] w-full bg-gray"/>
                <Text className="text-sm p-2">Final da rua</Text>
            </View>
            <View className="aspect-square flex-1 flex items-center justify-end ml-auto">
                <Image
                    source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKDxIZuYWiY5x3xXGFEjPqcPuiG3LUsSxSoA&s'}}
                    style={{ flex: 1, resizeMode: 'cover'}}
                    className="w-full rounded-r-xl"
                />
            </View>
        </View>

        <View className="flex flex-row items-center bg-white mt-2 rounded-xl">
            <View className="w-80 p-4">
                <View className="flex flex-row">
                    <FontAwesome className="my-auto" name="flag" size={16} color="black" />
                    <Text className="font-semibold p-2 ml-2">Entregue em</Text>
                    <Text className="font-medium p-2 ml-2">+ 1.5km</Text>
                </View>
                <View className="flex h-[1px] w-full bg-gray"/>
                <Text className="text-sm p-2">Final da rua</Text>
            </View>
            <View className="aspect-square flex-1 flex items-center justify-end ml-auto">
                <Image
                    source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKDxIZuYWiY5x3xXGFEjPqcPuiG3LUsSxSoA&s'}}
                    style={{ flex: 1, resizeMode: 'cover'}}
                    className="w-full rounded-r-xl"
                />
            </View>
        </View>
        </View>
    );
}