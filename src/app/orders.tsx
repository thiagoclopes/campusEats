import React, { useEffect, useState } from 'react';
import { 
  Text, 
  TouchableOpacity, 
  View, 
  StyleSheet, 
  Image, 
  FlatList, 
  ActivityIndicator 
} from 'react-native';
import BackArrow from '../components/backArrow';
import { Footer } from '../components/footer';
import { Entypo, FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';
import LOCAL_IP from '@/config';

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

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#000" />
        <Text>Carregando pedidos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      	<BackArrow color="black" title="Meus pedidos" route="/" />
      	<View style={styles.content}>
	    <FlatList
			data={pendingOrders}
			keyExtractor={(item) => item.id.toString()}
			renderItem={({ item }) => (
				<View className='bg-slate-300'>
					<View className="-mb-8 w-36 h-36 rounded-full bg-slate-500 overflow-hidden z-10 mx-auto">
						<Image
							source={{ uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' }}
							style={{ width: '100%', height: '100%' }}
						/>
					</View>
					<Text className='pt-8'>Pedido ID: {item.id}</Text>
					<FlatList
						data={item.items}
						keyExtractor={(orderItem) => orderItem.id.toString()}
						renderItem={({ item: orderItem }) => {
							// Obtenha o restaurante usando o restaurantId
							const restaurant = restaurants.get(orderItem.restaurantId);
							return (
								<Text>
								{orderItem.quantity}x Produto: {orderItem.foodId}
								{restaurant && (
									<Text> - Restaurante: {restaurant.name}</Text> // Exibe o nome do restaurante
								)}
								</Text>
							);
						}}
					/>
				</View>
			)}
			ListEmptyComponent={
				<Text>Nenhum pedido pendente encontrado.</Text>
			}
	 	/>
        <Text style={{ marginTop: 20 }}>Histórico de Pedidos</Text>
        <FlatList
			data={deliveredOrders}
			keyExtractor={(item) => item.id.toString()}
			renderItem={({ item }) => {

				const total = item.items.reduce((sum, orderItem) => {
				const foodItem = foodItems.get(orderItem.foodId);
				if (foodItem) {
					return sum + (foodItem.price * orderItem.quantity);
				}
				return sum;
				}, 0);

				return (
					<View className="bg-white px-4 py-6 mb-4 rounded-lg shadow-md">
						{item.items.length > 0 && (
							<View className="flex-row items-center justify-between mb-4">
								<View className="flex-row items-center gap-2">
								{restaurants.get(item.items[0].restaurantId) && (
									<Image
									source={{
										uri: restaurants.get(item.items[0].restaurantId)?.logo,
									}}
									style={{ width: 50, height: 50, borderRadius: 25 }}
									/>
								)}
								<Text className="font-semibold text-lg">
									{restaurants.get(item.items[0].restaurantId)?.name} • Pedido Nº {item.id}
								</Text>
								</View>
								<Entypo name="chevron-right" size={24} color="black" />
							</View>
						)}

						<View className="w-full h-[1px] bg-gray-line mb-4" />

						{item.items.map((orderItem) => {
							const foodItem = foodItems.get(orderItem.foodId);
							return (
								<View key={orderItem.id} className="flex-row justify-between items-center mb-2">
								<View className="flex-row gap-2">
									<Text className="bg-gray-200 px-2 py-1 rounded text-sm">{orderItem.quantity}x</Text>
									{foodItem && <Text className="text-gray-700">{foodItem.name}</Text>}
								</View>
								<Text className="text-gray-500">
									R$ {(orderItem.quantity * (foodItem?.price || 0)).toFixed(2)}
								</Text>
								</View>
							);
						})}

						<View className="flex-row justify-between items-center mt-6">
						<Text className="font-semibold text-lg">
							Total: R$ {total.toFixed(2)}
						</Text>
						<View className="bg-red-main px-4 py-2 rounded-xl">
							<Text className="text-white">Pedir novamente</Text>
						</View>
						</View>
					</View>
				);
			}}
			ListEmptyComponent={<Text>Nenhum pedido entregue encontrado.</Text>}
		/>

      </View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 16,
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    elevation: 2,
  },
});
