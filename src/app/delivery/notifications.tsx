import BackArrow from '../../components/shared/backArrow';
import { useEffect, useState } from 'react';
import { FlatList, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Footer } from '../../components/client/footer';
import LOCAL_IP from '@/config';
import ChameleonWarning from '../../components/shared/chameleonWarning';

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
  const [loading, setLoading] = useState<Boolean>(true);
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
      } finally {
        setLoading(false);
      }
    }

    fetchNotifications();
  }, []);

  if(loading) {
      return (
          <View className='flex-1 flex-col justify-center items-center'>
              <ActivityIndicator color="red" size="large"/>
          </View>
      )
  }

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1">
        <BackArrow color='black' title='Notificações' route='/client'/>

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
                  <TouchableOpacity onPress={() => router.push(`/client/restaurant_profile?id=${item.restaurantId}`)}>
                    <Text className="text-black font-medium text-lg ml-4">{item.restaurantName}</Text>
                  </TouchableOpacity>
                  <Text className="text-black-gray font-regular text-md ml-4">{item.message}</Text>
                </View>
              </View>
              <Text className="text-black-gray text-xs absolute top-4 right-4">
                {new Date(item.timestamp).toLocaleString()}
              </Text>
            </View>
          )}
          ListEmptyComponent={
            <View className='flex-1 justify-center items-center mt-[45%]'>
              <ChameleonWarning message="Nenhuma notificação ainda!"/>
            </View>
          }
        />
      </View>
      <Footer />
    </View>
  );
}
