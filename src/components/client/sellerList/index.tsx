
import { useEffect, useState } from "react";
import { View, Text, Image, Pressable, ScrollView, useWindowDimensions } from "react-native";
import { Entypo } from '@expo/vector-icons'
import LOCAL_IP from '../../../../config';
import axios from 'axios';
import ContentLoader, { Rect } from 'react-content-loader/native'
import ChameleonWarning from "../../shared/chameleonWarning";
import React from "react";



interface Restaurant {
    id: string;
    name: string;
    logo: string;
    rating: number;
}



const fetchRestaurant = async (): Promise<Restaurant[]> => {
    try {
        const response = await axios.get(`${LOCAL_IP}/restaurants`);
        return response.data; 
    } catch (error) {
        console.error('Erro ao buscar restaurante:', error);
        return [];
    }
};


export function SellerList() {
    const [loading, setLoading] = useState(true);
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const {height, width} = useWindowDimensions()

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                const fetchedRestaurants = await fetchRestaurant();
                setRestaurants(fetchedRestaurants);
            } catch (err) {
                console.error('Erro ao buscar dados:', err);
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, []);

    return (
        <View className="flex-1 bg-white">
            {loading ? (
                <ContentLoader 
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: width,
                        height: height,
                    }}
                    viewBox={`0 0 ${width} ${height}`}
                >
                    <Rect x="20" y="5" rx="4" ry="4" width="320" height="55" />
                    <Rect x="20" y="80" rx="4" ry="4" width="150" height="230" />
                    <Rect x="20" y="330" rx="4" ry="4" width="150" height="230" />
                    <Rect x="190" y="80" rx="4" ry="4" width="150" height="230" />
                    <Rect x="190" y="330" rx="4" ry="4" width="150" height="230" />
                </ContentLoader>
            ) : (
                <View className="h-full w-full">
                    <ScrollView className="bg-white" showsVerticalScrollIndicator={false}>
                        <View className="flex flex-row flex-wrap p-1">
                            {!restaurants.length ? (
                                <ChameleonWarning message="Nenhum item disponível" />
                            ) : (
                                restaurants.map(item => (
                                    <View key={item.id} className="w-1/2 p-2">
                                        <Pressable
                                            className="bg-white rounded-xl p-3"
                                            style={{
                                                shadowColor: '#000',
                                                shadowOffset: { width: 0, height: 2 },
                                                shadowOpacity: 0.25,
                                                shadowRadius: 3.84,
                                                elevation: 5,
                                            }}
                                        >
                                            <Image
                                                source={{ uri: item.logo }}
                                                className="w-24 h-24 mx-auto rounded-full"
                                                style={{ resizeMode: 'cover' }}
                                            />
                                            <Text className="text-dark-brown font-regular text-center mt-2 px-1">
                                                {item.name || "Carregando..."}
                                            </Text>
                                            
                                            <View className="flex flex-row justify-between mt-2 px-1 items-center">
                                                <View className="flex flex-row items-center">
                                                    <Entypo name="star" size={16} color="#FFD700" className="mr-1" />
                                                    <Text className="text-dark-brown font-bold text-center py-2">
                                                        {item.rating}
                                                    </Text>
                                                </View>
                                            </View>
                                        </Pressable>
                                    </View>
                                ))
                            )}
                        </View>
                    </ScrollView>
                </View>
            )}
        </View>
    );
}
