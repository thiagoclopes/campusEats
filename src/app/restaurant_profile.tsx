import { Image, StatusBar, Text, TouchableOpacity, View, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import BackArrow from '../components/backArrow';
import { Footer } from '../components/footer';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import LOCAL_IP from '../../config';
import { Linking } from 'react-native';


interface Restaurant {
  id: string;
  name: string;
  logo: string;
  rating: number;
  category: string;
  workingHours: string;
  whatsapp: string;
  instagram: string;
  localization: string;
  sales: number; // Número de vendas
}

import { Products } from '../components/productsList';

export default function RestaurantProfile() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
    const [loading, setLoading] = useState(true);

    const formatPhoneNumber = (phoneNumber: string) => {
        const cleaned = phoneNumber.replace(/\D/g, '');
        
        const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
        if (match) {
            return `(${match[1]}) ${match[2]}-${match[3]}`;
        }
        return phoneNumber;
    };
    

    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                if (id) {
                    const response = await fetch(`${LOCAL_IP}/restaurants/${id}`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    setRestaurant(data);
                }
            } catch (error) {
                console.error('Erro ao buscar restaurante:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRestaurant();
    }, [id]);
    

    if (loading) {
        return <Text>Carregando...</Text>;
    }

    if (!restaurant) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text className="text-xl">Restaurante não encontrado.</Text>
            </View>
        );
    }


    return (
        <View className="flex-1 bg-red-main">
            <StatusBar backgroundColor="#EF2A39" barStyle="dark-content" />
            <ScrollView className="flex-1 w-full">
                <BackArrow color="white" route="/" />
                <View className="mt-6 w-40 h-40 rounded-full bg-slate-500 overflow-hidden z-10 mx-auto">
                    <Image source={{ uri: restaurant.logo }} style={{ width: '100%', height: '100%' }} />
                </View>
                <View className="w-full h-full rounded-t-3xl -mt-10 bg-white shadow-lg">
                    <View className="items-center mt-12">
                        <Text className="text-xl font-semibold">{restaurant.name}</Text>
                        <View className="flex flex-row items-center mt-1">
                            <Ionicons name="star" size={20} color="#FFD700" />
                            <Text className="ml-2 text-gray-700 text-md font-semibold">{restaurant.rating}</Text>
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
                            <Entypo name="clock" size={20} color="#EF2A39" />
                            <Text className="text-lg font-bold text-gray-700">Horário</Text>
                            <Text className="text-gray-600 mt-2">{restaurant.workingHours}</Text>
                        </View>

                        <View
                            style={{
                                width: '45%',
                                backgroundColor: '#fff',
                                borderRadius: 10,
                                padding: 16,
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.2,
                                shadowRadius: 4,
                                elevation: 5,
                            }}
                        >
                            
                            <View className="flex-row items-center mt-2 space-x-2 justify-start w-full">
                                <Entypo name="phone" size={20} color="#EF2A39" />
                                <TouchableOpacity onPress={() => Linking.openURL(`whatsapp://send?phone=550${restaurant.whatsapp}`)}>
                                    <Text className="text-gray-600 ml-2">{formatPhoneNumber(restaurant.whatsapp)}</Text>
                                </TouchableOpacity>
                            </View>

                            <View className="flex-row items-center mt-2 space-x-2 justify-start w-full">
                                <Entypo name="instagram" size={20} color="#EF2A39" />
                                <TouchableOpacity onPress={() => Linking.openURL(`https://instagram.com/${restaurant.instagram}`)}>
                                    <Text className="text-gray-600 ml-2">@{restaurant.instagram}</Text>
                                </TouchableOpacity>
                            </View>

                            <View className="flex-row items-center mt-2 space-x-2 justify-start w-full">
                                <Entypo name="location-pin" size={20} color="#EF2A39" />
                                <TouchableOpacity onPress={() => Linking.openURL(restaurant.localization)}>
                                    <Text className="text-gray-600 ml-2">{restaurant.name}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>

                    <Text className="font-semibold mt-16 mb-5 ml-4 text-xl text-red-main">Mais vendidos</Text>
                    <Products restaurantId={id} />
                </View>
            </ScrollView>
            <Footer />
        </View>
    );
}
