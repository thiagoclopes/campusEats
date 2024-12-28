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
import BackArrow from '../components/backArrow';
import { Footer } from '../components/footer';
import { Entypo, FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';
import LOCAL_IP from '@/config';
import { router } from 'expo-router';
import ChameleonWarning from '../components/chameleonWarning';

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
  status: 'Pendente' | 'Entregue';
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
  const [pendingOrders, setPendingOrders] = useState<Order[]>([]);
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

        setPendingOrders(allOrders.filter((order) => order.status === 'Pendente'));
        setDeliveredOrders(allOrders.filter((order) => order.status === 'Entregue'));

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
		router.push(`/cart`)
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


  return (
    <View style={styles.container}>
      	<BackArrow color="black" title="Meus pedidos" route="/" />
      	<ScrollView className='flex-1 mt-4'>
		  	<FlatList
				data={pendingOrders}
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
						<View className='w-fit px-4 mb-4'>
							{restaurants.get(item.items[0].restaurantId) && (
								<View className="-mb-14 w-28 h-28 rounded-full bg-slate-500 overflow-hidden z-10 mx-auto">
									<Image
										source={{
											uri: restaurants.get(item.items[0].restaurantId)?.logo,
										}}
										style={{ width: '100%', height: '100%' }}
									/>
								</View>
							)}
							<View
								className="bg-white rounded-xl p-6"
								style={{
									shadowColor: '#000',
									shadowOffset: { width: 0, height: 2 },
									shadowOpacity: 0.25,
									shadowRadius: 3.84,
									elevation: 5,
								}}
                            >
								{item.items.length > 0 && (
									<View className='mt-12'>
										<View className='flex-row justify-center items-center w-fit mx-auto'>
											<Entypo name="dot-single" size={24} color="red" />
											<Text className='font-semibold text-base'>Pedido em preparação • Nº {item.id}</Text>
										</View>
									</View>
								)}


								<View className="flex flex-row justify-between mt-6 mb-2">
									<Text className="font-bold text-sm w-1/5 text-left">ITEM</Text>
									<Text className="font-bold text-sm w-3/5 text-left">DESCRIÇÃO</Text>
									<Text className="font-bold text-sm w-1/5 text-right">VALOR</Text>
								</View>
								<View className="w-full h-[1px] bg-gray-line mb-4" />
								{item.items.map((orderItem) => {
									const foodItem = foodItems.get(orderItem.foodId);
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
								<View className="w-full h-[1px] bg-gray-line my-4" />
								<View className="flex-row justify-between items-center mb-4">
									<Text className="font-semibold text-base">
										Total: R$ {total.toFixed(2)}
									</Text>
									
								</View>
								<TouchableOpacity className="bg-red-main mx-auto py-4 rounded-xl" onPress={() => router.push(`/orderProgress?orderId=${item.id}`)}>
									<Text className="text-white text-center">Acompanhar pedido</Text>
								</TouchableOpacity>
							</View>
						</View>
					);
				}}
			/>
			{pendingOrders.length != 0 && deliveredOrders.length != 0 && (
				<View className="flex-row items-center px-4 py-4 gap-2">
					<FontAwesome5 name="history" size={24} color="black" />
					<Text className="text-lg font-semibold">Histórico de Pedidos</Text>
				</View>
				)}
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
					<View className='flex-1 justify-center items-center mt-[45%]'>
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
