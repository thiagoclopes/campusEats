import { Image, StatusBar, Text, View, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import BackArrow from '../components/backArrow';
import { Footer } from '../components/footer';
import { Ionicons, FontAwesome, Octicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import LOCAL_IP from '../../config';


interface Courier {
  id: string;
  name: string;
  vehicle: string;
  vehicleName: string;
  vehiclePlate: string;
  photo: string;
  rating: string;
  delivers: string;
  availability: boolean;
}

export default function CourierProfile() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [courier, setCourier] = useState<Courier | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourier = async () => {
      try {
        if (id) {
          const response = await fetch(`${LOCAL_IP}/couriers/${id}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setCourier(data);
        }
      } catch (error) {
        console.error('Erro ao buscar entregador:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourier();
  }, [id]);

  if (loading) {
    return <Text>Carregando...</Text>;
  }

  if (!courier) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-xl">Entregador não encontrado.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-red-main">
      <StatusBar backgroundColor="#EF2A39" barStyle="dark-content" />
      <ScrollView className="flex-1 w-full">
        <BackArrow color="white" route="/" />
        <View className="mt-6 w-40 h-40 rounded-full bg-slate-500 overflow-hidden z-10 mx-auto">
          <Image
            source={{ uri: courier?.photo }}
          />
        </View>
        <View className="w-full h-full rounded-t-3xl -mt-10 bg-white shadow-lg">
          <View className="items-center mt-12">
            <Text className="text-xl font-semibold">{courier.name}</Text>
            <View className="flex flex-row items-center mt-1">
              <Ionicons name="star" size={20} color="#FFD700" />
              <Text className="ml-2 text-gray-700 text-md font-semibold">{courier.rating}</Text>
            </View>
          </View>

          <View className="flex-row justify-around mt-10">
            <View
              style={{
                width: '45%',
                backgroundColor: '#fff',
                borderRadius: 10,
                padding: 16,
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: 5,
              }}
            >
              <Octicons name="package" size={20} color="#EF2A39" />
              <Text className="text-lg font-bold text-gray-700 mt-2">{courier.delivers}</Text>
              <Text className="text-gray-600">Entregas</Text>
            </View>

            <View
              style={{
                width: '45%',
                backgroundColor: '#fff',
                borderRadius: 10,
                padding: 16,
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: 5,
              }}
            >
              <View className="flex-row items-center">
                {courier.vehicle.toLowerCase() === 'moto' ? (
                  <FontAwesome name="motorcycle" size={20} color="#EF2A39" />
                ) : courier.vehicle.toLowerCase() === 'carro' ? (
                  <FontAwesome name="automobile" size={20} color="#EF2A39" />
                ) : courier.vehicle.toLowerCase() === 'bike' ? (
                  <FontAwesome name="bicycle" size={20} color="#EF2A39" />
                ) : null}
              </View>
              <Text className="text-lg font-bold text-gray-700 ml-2 mt-2">{courier.vehicleName}</Text>
              <Text className="text-gray-600">{courier.vehiclePlate}</Text>
            </View>
          </View>

          <Text className="font-semibold mt-16 mb-5 text-xl text-red-main ml-4">Entregas recentes</Text>

          <View className="bg-white-80 rounded-xl p-4 shadow-sm mt-2 w-[90%] mx-auto">
              <View className="flex-row items-center">
                <View>
                  {/* <TouchableOpacity onPress={() => router.push(`/restaurant_profile?id=${courier.name}`)}> */}
                    <Text className="text-black font-medium text-lg ml-4">Açaí do Renatão</Text>
                  {/* </TouchableOpacity> */}
                  <View className="flex-row items-center ml-4">
                    <Ionicons name="location-outline" size={16} color="#EF2A39" />
                    <Text className="text-black-gray font-regular text-md ml-2">1.5 km • 15min</Text>
                  </View>
                </View>
              </View>
              <View
                className="absolute top-4 right-4 bg-green-500 py-1 px-4 rounded-xl"
                style={{ justifyContent: 'center', alignItems: 'center' }}
              >
                <Text className="text-white text-xs">Entregue</Text>
              </View>
            </View>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
}
