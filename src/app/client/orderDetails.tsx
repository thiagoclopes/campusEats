import LOCAL_IP from "@/config";
import { Entypo, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { View, Image, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import BackArrow from "../../components/shared/backArrow";

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

interface FoodItem {
    id: string;
    name: string;
    restaurantId: string;
    rating: string;
    isFavorite: boolean;
    category: string;
    url: string;
    price: number;
}

export default function OrderDetails(){
    const [order, setOrder] = useState<Order | null>(null);
    const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
    const [orderRestaurant, setOrderRestaurant] = useState<Restaurant | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [isPreparing, setIsPreparing] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [orderStatus, setOrderStatus] = useState<string>("Preparing");
    const [updateKey, setUpdateKey] = useState(0);
    const [isSearchingCourier, setIsSearchingCourier] = useState(false);

    const simulateOrderPreparation = async (): Promise<void> => {
        setIsPreparing(true);
        setIsButtonDisabled(true);
      
        return new Promise((resolve) => {
          setTimeout(() => {
            setOrderStatus("Out for Delivery");
            resolve();
          }, 5000);
        });
    };
    

    const fetchRestaurant = async (restaurantId: string) => {
        try {
            const response = await axios.get(`${LOCAL_IP}/restaurants/${restaurantId}`);
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar restaurante:', error);
            return null;
        }
    };

    const fetchFoodItem = async (foodId: string) => {
        try {
            const response = await axios.get(`${LOCAL_IP}/products/${foodId}`);
            return response.data;
        } catch (error) {
            console.error("Failed to fetch food item", error);
            return null;
        }
    };

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await axios.get(`${LOCAL_IP}/orders`);
                const OrderFetched = response.data.find((order: Order) => order.status === "Preparing" || order.status === "Out for Delivery") as Order | undefined;
                
                if (OrderFetched) {
                    setOrder(OrderFetched);
                    const OrderFetchedRestaurant = await fetchRestaurant(OrderFetched.items[0].restaurantId);
                    setOrderRestaurant(OrderFetchedRestaurant);

                    const fetchedFoodItems = await Promise.all(
                    OrderFetched.items.map(item => fetchFoodItem(item.foodId))
                    );

                    setFoodItems(fetchedFoodItems.filter((foodItem): foodItem is FoodItem => foodItem !== null));

                    if (OrderFetched.status == "Preparing"){
                        await simulateOrderPreparation();
                        const updatedOrder = { ...OrderFetched, status: "Out for Delivery" };
                        console.log("TESTE")
                        setOrderStatus("Out for Delivery");
                        setOrder(updatedOrder);
                        await axios.put(`${LOCAL_IP}/orders/${OrderFetched.id}`, updatedOrder); 
                    }
                    
                    if(!OrderFetched.courierId) {
                        setIsSearchingCourier(true);
                    } else if (OrderFetched.status == "Out for Delivery") {
                        setIsButtonDisabled(false);
                    }

                } else {
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
    
        fetchOrder();

    }, [updateKey]);

    useEffect(() => {
        console.log("TESTE")
        if(order && isSearchingCourier==true){
            assignCourierToOrder(order.id);
        }
        console.log("FUI CHAMADO")
    }, [isSearchingCourier]);



	const fetchAvailableCouriers = async () => {
		try {
		  const response = await axios.get(`${LOCAL_IP}/couriers`);
		  const couriers = response.data;
	
		  const availableCouriers = couriers.filter((courier: { availability: boolean }) => courier.availability === true);
	
		  if (availableCouriers.length > 0) {
			const randomCourier = availableCouriers[Math.floor(Math.random() * availableCouriers.length)];
			return randomCourier.id;
		  } else {
			throw new Error('Nenhum entregador disponível no momento');
		  }
		} catch (error) {
		  console.error('Erro ao buscar entregadores:', error);
		  return null;
		}
	  };

    const assignCourierToOrder = async (orderId: string) => {
        try {
        const courierId = await fetchAvailableCouriers();
        console.log("COURIERID: "+courierId)
        if (courierId) {
            await axios.patch(`${LOCAL_IP}/orders/${orderId}`, {
            courierId: courierId,
        });
        setIsSearchingCourier(false);
        setIsButtonDisabled(false);
        } else {
            console.error('Não foi possível atribuir um entregador.');
        }
        } catch (error) {
        console.error('Erro ao atribuir entregador à ordem:', error);
        }
    };


    const totalOrder = order?.items.reduce((total, orderItem) => {
        const foodItem = foodItems.find((item) => item.id === orderItem.foodId);
        if (foodItem) {
          total += orderItem.quantity * foodItem.price;
        }
        return total;
      }, 0) || 0;
    

    if (order === null) {
        return <Text>No pending order available</Text>;
    }

    return (
        <View className="flex-col flex-1 w-fit h-full bg-slate-100">
            <BackArrow color='black' title='Detalhes do pedido' route='/client'/>
            <View className="w-full h-16 flex items-center justify-center bg-red-main">
                {
                    orderStatus == "Preparing" ? (
                        <Text className="text-white text-semibold text-center">Disponível para entrega em 20 minutos</Text>
                    ) : (
                        <Text className="text-white text-semibold text-center">Previsão de entrega: 18:30 - 19:00</Text>
                    )
                }
            </View>
            <TouchableOpacity className="mt-14 -mb-6 flex flex-row w-full items-center justify-center" onPress={() => setUpdateKey((prev) => prev + 1)}>
                <Ionicons name="reload-circle-sharp" size={36} color="black" />
            </TouchableOpacity>
            <View className="mt-16 -mb-14 w-28 h-28 rounded-full overflow-hidden z-10 mx-auto">
                <Image
                    source={{
                        uri: orderRestaurant?.logo
                    }}
                    style={{ width: '100%', height: '100%' }}
                />
            </View>
            <View className="flex flex-col p-4 mx-6 bg-white elevation-2xl shadow-lg">
                <View className='mt-12'>
                    <View className='flex-row justify-center items-center w-fit mx-auto'>
                        <Entypo name="dot-single" size={24} color="red" />
                        {
                            order.status == 'Preparing' ? (
                                <Text className='font-semibold text-base'>Pedido em preparação • Nº {order.id}</Text>
                            ) : (
                                <Text className='font-semibold text-base'>Saiu para entrega • Nº {order.id}</Text>
                            )
                        }
                    </View>
                    <View className="flex flex-row justify-between mt-6 mb-2">
                        <Text className="font-bold text-sm w-1/5 text-left">ITEM</Text>
                        <Text className="font-bold text-sm w-3/5 text-left">DESCRIÇÃO</Text>
                        <Text className="font-bold text-sm w-1/5 text-right">VALOR</Text>
                    </View>
                    <View className="w-full h-[1px] bg-gray-line mb-4" />
                    {order.items.map((orderItem) => {
                        const foodItem = foodItems.find((item) => item.id === orderItem.foodId);
                        return (
                        <View key={orderItem.id} className="flex flex-row justify-between items-center py-2">
                            <View className="flex-row items-center w-1/5">
                                <Text className="text-sm">{orderItem.quantity}x</Text>
                            </View>
                            <View className="w-3/5">
                                {foodItem && <Text className="text-gray-700 text-sm">{foodItem.name}</Text>}
                            </View>
                            <Text className="text-sm w-1/5 text-right">
                                R$ {(orderItem.quantity * (foodItem?.price || 0)).toFixed(2)}
                            </Text>
                        </View>
                        );
                    })}
                </View>
                <View className="w-full h-[1px] bg-gray-line my-4" />
                <View className="flex-row justify-between items-center mb-4">
                    <Text className="font-semibold text-base">
                        Total: R$ {totalOrder.toFixed(2)}
                    </Text>
                    
                </View>
                <TouchableOpacity className={`mx-auto py-4 rounded-xl ${isButtonDisabled ? 'bg-black-gray opacity-70' : 'bg-red-main'}`} onPress={() => !isButtonDisabled && router.push(`/client/orderProgress?orderId=${order?.id}`)} disabled={isButtonDisabled}>
                    <Text className="text-white text-center">
                        {isButtonDisabled ? 'Seu pedido está sendo preparado' : 'Acompanhar pedido'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
    
}
