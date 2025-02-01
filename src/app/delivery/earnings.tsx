import React, { useEffect, useState } from 'react';
import { 
  Text, 
  TouchableOpacity, 
  View, 
  StyleSheet, 
  Image, 
  FlatList, 
  ActivityIndicator, 
  ScrollView
} from 'react-native';
import BackArrow from '../../components/shared/backArrow';
import { Entypo, FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';
import LOCAL_IP from '@/config';
import { router } from 'expo-router';
import ChameleonWarning from '../../components/shared/chameleonWarning';

interface CartItem {
  id: string;
  foodId: string;
  restaurantId: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  items: CartItem[];
  address: string;
  latitude: number;
  longitude: number;
  status: 'Preparing' | 'Delivered'| 'Out for Delivery';
  courierId: string;
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

export default function Earnings() {
  const [pendingOrder, setPendingOrder] = useState<Order | null>(null);
  const [deliveredOrders, setDeliveredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [restaurants, setRestaurants] = useState<Map<string, Restaurant>>(new Map());
  const [foodItems, setFoodItems] = useState<Map<string, FoodItem>>(new Map());
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedItemId((prevId) => (prevId === id ? null : id));
  };

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await axios.get<Order[]>(`${LOCAL_IP}/orders`);
        const allOrders = response.data;
		const PendingOrderFetched = response.data.find((order: Order) => order.status === "Preparing" || order.status === "Out for Delivery") as Order | null;

        setPendingOrder(PendingOrderFetched);
        setDeliveredOrders(allOrders.filter((order) => order.status === 'Delivered'));

        const restaurantIds = new Set(allOrders.flatMap((order) => order.items.map((item) => item.restaurantId)));
        const restaurantRequests = Array.from(restaurantIds).map((restaurantId) =>
          axios.get<Restaurant>(`${LOCAL_IP}/restaurants/${restaurantId}`)
        );

        const restaurantResponses = await Promise.all(restaurantRequests);
        const restaurantMap = new Map<string, Restaurant>();
        restaurantResponses.forEach((response) => {
          const restaurant = response.data;
          restaurantMap.set(restaurant.id, restaurant);
        });
        setRestaurants(restaurantMap);

		const foodIds = new Set(allOrders.flatMap((order) => order.items.map((item) => item.foodId)));
        const foodRequests = Array.from(foodIds).map((foodId) =>
          axios.get<FoodItem>(`${LOCAL_IP}/products/${foodId}`)
        );

        const foodResponses = await Promise.all(foodRequests);
        const foodMap = new Map<string, FoodItem>();
        foodResponses.forEach((response) => {
          const foodItem = response.data;
          foodMap.set(foodItem.id, foodItem);
        });
        setFoodItems(foodMap);
      } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  const addToCart = async (cartItems: CartItem[]) => {
	try{
		for(const item of cartItems){
			const cartItem = {
                foodId: item.foodId,
                restaurantId: item.restaurantId,
                quantity: item.quantity,
            };
			await axios.post(`${LOCAL_IP}/cart`, cartItem);
		}
		router.push(`/client/cart`)
	} catch (error) {
        console.error('Erro ao adicionar itens ao carrinho:', error);
    }
};

	if (loading){
		return(
			<View className="flex-1 flex-col items-center justify-center">
				<ActivityIndicator color="red" size="large"/>
			</View>
		)
	}

	if (pendingOrder === null) {
        return <Text>No pending order available</Text>;
    }

  return (
    <View style={styles.container}>
        <BackArrow color="black" title="Ganhos" route="/delivery"/>
      	<ScrollView className='flex-1 mt-4'>
			<View className='flex flex-col w-[90%] mx-auto p-2 bg-red-main rounded-lg'>
				<Text className='text-sm text-center text-white'>12/12 - 18/12</Text>
				<Text className='text-3xl text-white mt-12'>R$: 202,50</Text>
				<View className='w-full h-[1px] bg-gray-line mt-12'/>
				<Text className='text-sm text-right text-gray-line mt-2'>Campus Eats</Text>
			</View>

			<View className="flex-row items-center px-4 py-4 gap-2 mt-5 ml-4">
				<Text className="text-md text-black-gray font-medium">seg, 18 de dez.</Text>
			</View>
			<FlatList
				data={deliveredOrders}
				keyExtractor={(item) => item.id.toString()}
				scrollEnabled={false}
				renderItem={({ item }) => {
					const total = item.items.reduce((sum, orderItem) => {
					const foodItem = foodItems.get(orderItem.foodId);
					if (foodItem) {
						return sum + (foodItem.price * orderItem.quantity);
					}
					return sum;
					}, 0);

					return (
						<View className='w-full px-4'>
							<View className="bg-white px-4 py-6 mb-4 rounded-xl shadow-md"
								style={{
									shadowColor: '#000',
									shadowOffset: { width: 0, height: 2 },
									shadowOpacity: 0.25,
									shadowRadius: 3.84,
									elevation: 5,
								}}
							>
								{item.items.length > 0 && (
									<TouchableOpacity className="flex-row items-center justify-between" onPress={() => toggleExpand(item.id)}>
										<View className='absolute top-0 right-1'>
                                            <Text>14:35</Text>
                                        </View>
                                        
                                        <View className="flex-row items-center gap-2">
											{restaurants.get(item.items[0].restaurantId) && (
												<Image
												source={{
													uri: restaurants.get(item.items[0].restaurantId)?.logo,
												}}
												style={{ width: 40, height: 40, borderRadius: 25 }}
												/>
											)}
                                            <View className='ml-2'>
                                                <View className='flex-row items-center '>
                                                    <Text className="font-bold text-xl">
                                                        R$ 3,50
                                                    </Text>
                                                    <Text className="font-medium text-base ml-1">
                                                        (PIX)
                                                    </Text>
                                                </View>
                                                <Text className="font-medium text-base text-black-gray">
                                                    2 min 15 segundos - 1.65 km
                                                </Text> 
                                            </View>
										</View>
										<Entypo
											name={expandedItemId === item.id ? "chevron-down" : "chevron-right"}
											size={24}
											color="black"
                                            className='absolute bottom-0 right-0'
										/>
									</TouchableOpacity>
								)}
								{expandedItemId === item.id && (
									<>
										<View className="w-full h-[1px] bg-gray-line my-4" />

										<View className="flex flex-col items-start gap-1 ml-4">
                                            <View className="flex-row items-center">
                                            <View className="w-[10px] h-[10px] rounded-full border-2 "></View>
                                                <Text className="font-medium text-black-gray text-base ml-8">Setor I</Text>
                                            </View>
                                            {/* <View className="ml-[4px] w-0.5 h-3 bg-black"></View> */}
                                            <View className="flex-row items-center">
                                                <View className="bg-black w-[10px] h-[10px] rounded-full"></View>
                                                <Text className="font-medium text-black-gray text-base ml-8">ECT (Escola de Ciência e Tecnologia)</Text>
                                            </View>
                                        </View>
									</>
								)}


								
							</View>
						</View>
					);
				}}

				ListEmptyComponent={
					<View 
						className={`flex-1 justify-center items-center ${
							pendingOrder ? 'mt-0' : 'mt-[20%]'
						}`}
					>
						<ChameleonWarning message="Nenhum pedido anterior"/>
					</View>
				}
			/>

      	</ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
