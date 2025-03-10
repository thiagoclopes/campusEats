import React, { useEffect, useState } from 'react';
import { 
  Text, 
  TouchableOpacity, 
  View, 
  StyleSheet, 
  Image, 
  FlatList, 
  ActivityIndicator, 
  ScrollView,
  Pressable
} from 'react-native';
import BackArrow from '../../components/shared/backArrow';
import { Footer } from '../../components/client/footer';
import { Entypo, FontAwesome5, Ionicons, Octicons } from '@expo/vector-icons';
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

export default function Orders() {
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
      	<BackArrow color="black" title="Meus pedidos" route="/client" />
      	<ScrollView className='flex-1 mt-4'>
			{pendingOrder && (
				<>
					<View className="flex-row items-center px-4 py-4 gap-2">
						<Octicons name="hourglass" size={24} color="black" />
						<Text className="text-lg font-semibold">Pedidos ativos</Text>
					</View>
					
					<View className="mt-2 flex flex-col items-center bg-white m-4 px-4 py-6 mb-4 rounded-xl shadow-md"
						style={{
							shadowColor: '#000',
							shadowOffset: { width: 0, height: 2 },
							shadowOpacity: 0.25,
							shadowRadius: 3.84,
							elevation: 5,
						}}
					>
						<View className='flex flex-row w-full items-center'>
							<Image
								source={{
									uri: restaurants.get(pendingOrder.items[0].restaurantId)?.logo
								}}
								style={{ width: 40, height: 40, borderRadius: 25 }}
							/>
							<View className="flex-row items-center">
								<Entypo name="dot-single" size={24} color="red" />
								{
									pendingOrder.status == 'Preparing' ? (
										<Text className="font-semibold text-base text-center">Em preparação • Pedido Nº {pendingOrder.id}</Text>
									) : (
										<Text className='font-semibold text-base text-center'>Saiu para entrega • Pedido Nº {pendingOrder.id}</Text>
									)
								}
							</View>
						</View>
						<TouchableOpacity
							className="flex w-full px-2 py-2 mt-6 bg-red-main rounded-xl"
							onPress={() => router.push(`/client/orderDetails`)}
						>
							<Text className="text-off-white text-center">Detalhes do pedido</Text>
						</TouchableOpacity>
					
					</View>
				</>
			)}
			<View className="flex-row items-center px-4 py-4 gap-2 mt-5">
				<FontAwesome5 name="history" size={24} color="black" />
				<Text className="text-lg font-semibold">Histórico de Pedidos</Text>
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
										<View className="flex-row items-center gap-2">
											{restaurants.get(item.items[0].restaurantId) && (
												<Image
												source={{
													uri: restaurants.get(item.items[0].restaurantId)?.logo,
												}}
												style={{ width: 40, height: 40, borderRadius: 25 }}
												/>
											)}
											<Text className="font-semibold text-base">
												{restaurants.get(item.items[0].restaurantId)?.name} • Pedido Nº {item.id}
											</Text>
										</View>
										<Entypo
											name={expandedItemId === item.id ? "chevron-down" : "chevron-right"}
											size={24}
											color="black"
										/>
									</TouchableOpacity>
								)}
								{expandedItemId === item.id && (
									<>
										<View className="w-full h-[1px] bg-gray-line my-4" />

										{item.items.map((orderItem) => {
											const foodItem = foodItems.get(orderItem.foodId);
											return (
												<View key={orderItem.id} className="flex-row justify-between items-center mb-2">
												<View className="flex-row gap-2 items-center justify-center">
													<Text className="bg-gray-200 px-2 py-1 rounded text-sm">{orderItem.quantity}x</Text>
													{foodItem && <Text className="text-gray-700 text-sm">{foodItem.name}</Text>}
												</View>
												<Text className="text-gray-500">
													R$ {(orderItem.quantity * (foodItem?.price || 0)).toFixed(2)}
												</Text>
												</View>
											);
										})}
										<View className="w-full h-[1px] bg-gray-line mt-2 mb-4" />
										<View className="flex-row justify-between items-center">
											<Text className="font-semibold text-base">
												Total: R$ {total.toFixed(2)}
											</Text>
											<TouchableOpacity className="bg-red-main px-6 py-2 rounded-xl"
												onPress={() => {
													addToCart(item.items)
												}}
											>
												<Text className="text-white">Pedir novamente</Text>
											</TouchableOpacity>
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
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
