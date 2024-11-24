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

export default function Orders() {
  const [pendingOrders, setPendingOrders] = useState<Order[]>([]);
  const [deliveredOrders, setDeliveredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [restaurants, setRestaurants] = useState<Map<string, Restaurant>>(new Map());

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await axios.get<Order[]>(`${LOCAL_IP}/orders`);
        const allOrders = response.data;

        setPendingOrders(allOrders.filter((order) => order.status === 'Pendente'));
        setDeliveredOrders(allOrders.filter((order) => order.status === 'Entregue'));

        // Buscar restaurantes
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
        {pendingOrders.length > 0 && (
          <View>
			<View className="-mb-8 w-36 h-36 rounded-full bg-slate-500 overflow-hidden z-10 mx-auto">
				<Image
					source={{ uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' }}
					style={{ width: '100%', height: '100%' }}
				/>
			</View>
			<View className='pt-10' style={styles.card}>
				<View className='flex-row items-center justify-center'>
					<Entypo name="dot-single" size={24} color="red" />
					<Text className='font-semibold text-lg'>Pedido em preparação</Text>
				</View>
				<FlatList
				data={pendingOrders}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<View >
					<Text>Pedido ID: {item.id}</Text>
					<FlatList
						data={item.items}
						keyExtractor={(cartItem) => cartItem.id}
						renderItem={({ item: cartItem }) => (
						<Text>
							{cartItem.quantity}x Produto: {cartItem.foodId}
						</Text>
						)}
					/>
					</View>
				)}
				ListEmptyComponent={
					<Text>Nenhum pedido pendente encontrado.</Text>
				}
				/>
			</View>
          </View>
        )}

        <Text style={{ marginTop: 20 }}>Histórico de Pedidos</Text>
        <FlatList
          data={deliveredOrders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="bg-white px-2 py-6" style={styles.card}>
              {item.items.map((cartItem) => {
                const restaurant = restaurants.get(cartItem.restaurantId);
                return (
                  <View key={cartItem.id} className='flex-row items-center justify-between'>
                    <View className='flex-row items-center gap-1'>
                      {restaurant && (
                        <Image
                          source={{ uri: restaurant.logo }}
                          style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }}
                        />
                      )}
                      <Text className='font-semibold'>{restaurant?.name} • Nº {item.id}</Text>
                    </View>
                    <Entypo name="chevron-right" size={24} color="black" className='mr-4'/>
                  </View>
                );
              })}
              <View className="w-full h-[1px] mt-4 mb-6 bg-gray-line" />
              <View className='flex-row px-6 justify-between'>
                <View className='flex-col'>
                  <View className='flex-row gap-2'>
                    <Text className='bg-slate-100 px-1 rounded-sm'>1</Text>
                    <Text>Hambúrguer</Text>
                  </View>
                  <Text>+1 item</Text>
                </View>
                <View className='flex items-center justify-center bg-red-main rounded-xl px-4'>
                  <Text className='text-white'>Pedir novamente</Text>
                </View>
              </View>
            </View>
          )}
          ListEmptyComponent={
            <Text>Nenhum pedido entregue encontrado.</Text>
          }
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
