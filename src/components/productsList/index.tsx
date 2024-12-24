import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { TouchableOpacity, View, Text, Image, Pressable, ActivityIndicator, ScrollView, useWindowDimensions } from "react-native";
import { AntDesign, Entypo } from '@expo/vector-icons'
import Constants from 'expo-constants';
import LOCAL_IP from '../../../config';
import axios from 'axios';
import ContentLoader, { Rect } from 'react-content-loader/native'
import ChameleonWarning from "../chameleonWarning";

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

interface Restaurant {
    id: string;
    name: string;
}

const fetchItems = async () => {
    try {
        const response = await axios.get(`${LOCAL_IP}/products`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar itens:', error);
        return [];
    }
};

const fetchRestaurant = async (id: string) => {
    try {
        const response = await axios.get(`${LOCAL_IP}/restaurants/${id}`);
        return response.data.name;
    } catch (error) {
        console.error('Erro ao buscar restaurante:', error);
        return null;
    }
};

const updateFavoriteStatus = async (id: string, isFavorite: boolean) => {
    try {
        const response = await axios.patch(`${LOCAL_IP}/products/${id}`, { isFavorite });
    } catch (error) {
        console.error('Erro ao atualizar favorito:', error);
    }
};

export function Products({ restaurantId, showFavorites }: { restaurantId?: string; showFavorites?: boolean }) {
    const [items, setItems] = useState<FoodItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
    const [restaurantNames, setRestaurantNames] = useState<{ [key: string]: string }>({});
    const router = useRouter();
    const {height, width} = useWindowDimensions()

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            setError(null);
            try {
                const fetchedItems = await fetchItems();
                let filteredItems = restaurantId
                    ? fetchedItems.filter((item: FoodItem) => item.restaurantId === restaurantId)
                    : fetchedItems;

                if(showFavorites){
                    filteredItems = filteredItems.filter((item: FoodItem) => item.isFavorite);
                }

                setItems(filteredItems);

                const names: { [key: string]: string } = {};
                for (const item of filteredItems) {
                    if (!names[item.restaurantId]) {
                        const name = await fetchRestaurant(item.restaurantId);
                        names[item.restaurantId] = name || "Restaurante Desconhecido";
                    }
                }
                setRestaurantNames(names);
            } catch (err) {
                setError('Falha ao carregar os itens. Tente novamente mais tarde.');
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, [restaurantId]);

    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category);
    };

    const filteredItems = items.filter(item => 
        selectedCategory === 'Todos' || item.category === selectedCategory
    );

    const toggleFavorite = async (id: string, currentStatus: boolean) => {
        const newStatus = !currentStatus;
        setItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, isFavorite: newStatus } : item
            )
        );

        await updateFavoriteStatus(id, newStatus);
    };

    const [loadingImages, setLoadingImages] = useState<{ [key: string]: boolean }>({});

    const handleImageLoad = (id: string) => {
        setLoadingImages(prev => ({ ...prev, [id]: false }));
    };

    const handleImageStartLoading = (id: string) => {
        setLoadingImages(prev => ({ ...prev, [id]: true }));
    };



    return (
        <View>
            {loading && loadingImages ? (
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
            ):(
                <>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        className="pl-4"
                    >
                        <View className="flex flex-row gap-2">
                            {['Todos', 'Combos', 'Almoço', 'Pizza', 'Açaí'].map((category, index, arr) => (
                                <TouchableOpacity
                                    key={category}
                                    className={`w-24 py-4 rounded-xl ${selectedCategory === category ? 'bg-red-500' : 'bg-off-white'} ${index === arr.length - 1 ? 'mr-4' : ''}`}
                                    onPress={() => handleCategorySelect(category)}
                                >
                                    <Text className={`font-bold text-center ${selectedCategory === category ? 'text-white' : 'text-black-gray'}`}>
                                        {category}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>

                    <View className="flex flex-row flex-wrap p-1">
                        {filteredItems.length === 0 ? (
                            <ChameleonWarning message='Nenhum item disponível'/>
                        ) : (
                            filteredItems.map(item => (
                                <View key={item.id} className="w-1/2 p-2">
                                    <Pressable
                                        className="bg-white rounded-xl p-3"
                                        onPress={() => router.push(`/product?id=${item.id}`)}
                                        style={{
                                            shadowColor: '#000',
                                            shadowOffset: { width: 0, height: 2 },
                                            shadowOpacity: 0.25,
                                            shadowRadius: 3.84,
                                            elevation: 5,
                                        }}
                                    >
                                        <View className="flex flex-row items-center absolute left-3 top-3 z-10">
                                            <Pressable onPress={() => toggleFavorite(item.id, item.isFavorite)}>
                                                {item.isFavorite ? (
                                                    <AntDesign name="heart" size={20} color="red" /> 
                                                ) : (
                                                    <AntDesign name="hearto" size={20} color="black" /> 
                                                )}
                                            </Pressable>
                                        </View>
                                        <Image
                                            source={{ uri: item.url }}
                                            className="w-full mx-auto h-40"
                                            style={{ resizeMode: 'cover' }}
                                            onLoadStart={() => handleImageStartLoading(item.id)}
                                            onLoad={() => handleImageLoad(item.id)}
                                        />
                                        <Text className="text-dark-brown font-regular text-left mt-2 px-1">
                                            {restaurantNames[item.restaurantId] || "Carregando..."}
                                        </Text>
                                        <View className="flex flex-row justify-between items-center px-1">
                                            <Text className="text-dark-brown text-lg font-semibold text-center">{item.name}</Text>
                                        </View>
                                        <View className="flex flex-row justify-between mt-2 px-1 items-center">
                                            <View className="flex flex-row items-center">
                                                <Entypo name="star" size={16} color="#FFD700" className="mr-1" />
                                                <Text className="text-dark-brown font-bold text-center py-2">{item.rating}</Text>
                                            </View>
                                            <Text className="text-dark-brown text-lg font-semibold text-center">
                                                R$ {item.price.toFixed(2).replace('.', ',')}
                                            </Text>
                                        </View>
                                    </Pressable>
                                </View>
                            ))
                        )}
                    </View>
                </>
            )}
            
        </View>
    );
}
