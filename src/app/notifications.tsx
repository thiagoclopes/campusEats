import BackArrow from '../components/backArrow';
import { useEffect, useState } from 'react';
import { FlatList, Text, View, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Footer } from '../components/footer';
import LOCAL_IP from '@/config';

interface Restaurant {
  id: string;
  name: string;
  logo: string;
}

interface Notification {
  restaurantId: string;
  restaurantImage: string;
  restaurantName: string;
  message: string;
  timestamp: string;
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchNotifications() {
      try {
        const [notificationsResponse, restaurantsResponse] = await Promise.all([
          fetch(`${LOCAL_IP}/notifications`),
          fetch(`${LOCAL_IP}/restaurants`),
        ]);

        const notificationsData: Notification[] = await notificationsResponse.json();
        const restaurants: Restaurant[] = await restaurantsResponse.json();

        // Mapeando as notificações com os dados dos restaurantes
        const mappedNotifications = notificationsData.map((notification) => {
          const restaurant = restaurants.find(r => r.id === notification.restaurantId);
          return {
            ...notification,
            restaurantName: restaurant ? restaurant.name : 'Desconhecido',
            restaurantImage: restaurant ? restaurant.logo : '',
          };
        });

        setNotifications(mappedNotifications);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    }

    fetchNotifications();
  }, []);

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1">
        <BackArrow color='black' title='Notificações' route='/'/>

        <FlatList
          data={notifications}
          keyExtractor={(item) => item.restaurantId}
          renderItem={({ item }) => (
            <View className="bg-white-80 rounded-xl p-6 shadow-sm mt-4 w-[90%] mx-auto">
              <View className="flex-row items-center">
                <Image
                  source={{ uri: item.restaurantImage }}
                  style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }}
                />
                <View>
                  <Text className="text-black font-medium text-lg ml-4">{item.restaurantName}</Text>
                  <Text className="text-black-gray font-regular text-md ml-4">{item.message}</Text>
                </View>
              </View>
              <Text className="text-black-gray text-xs absolute top-4 right-4">
                {new Date(item.timestamp).toLocaleString()}
              </Text>
            </View>
          )}
        />
      </View>
      <Footer />
    </View>
  );
}
