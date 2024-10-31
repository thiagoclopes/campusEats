import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { TouchableOpacity, View, Text, Image, Pressable, ActivityIndicator, ScrollView } from "react-native";
import { Entypo } from '@expo/vector-icons'
import Constants from 'expo-constants';
import LOCAL_IP from '../../../config';

interface FoodItem {
    id: string;
    name: string;
    restaurant: string;
    rating: string;
    isFavorite: boolean;
    category: string;
    url: string;
    price: number;
}

const fetchItems = async () => {
    console.log(LOCAL_IP)
    try {
        const response = await fetch(`${LOCAL_IP}/products`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched data:', data);
        return data;
    } catch (error) {
        console.error('Erro ao buscar itens:', error);
        return [];
    }
};

const updateFavoriteStatus = async (id: string, isFavorite: boolean) => {
    try {
        const response = await fetch(`${LOCAL_IP}/products/${id}`, {
            method: 'PATCH', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ isFavorite }),
        });
        
        if (!response.ok) {
            throw new Error(`Erro ao atualizar o favorito: ${response.status}`);
        }

        const data = await response.json();
        console.log('Status de favorito atualizado:', data);
    } catch (error) {
        console.error('Erro ao atualizar favorito:', error);
    }
};

export function Products() {
    const [items, setItems] = useState<FoodItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
    const router = useRouter();

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            setError(null);
            try {
                const fetchedItems = await fetchItems();
                setItems(fetchedItems);
            } catch (err) {
                setError('Falha ao carregar os itens. Tente novamente mais tarde.');
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, []);

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

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="pl-4"
            >
                <View className="flex flex-row gap-2">
                    {['Todos', 'Combos', 'Almoço', 'Pizza', 'Açaí'].map((category, index, arr) => (
                        <TouchableOpacity
                            key={category}
                            className={`w-24 py-4 rounded-xl ${selectedCategory === category ? 'bg-red-500' : 'bg-slate-100'} ${index === arr.length - 1 ? 'mr-4' : ''}`}
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
                    <Text className="text-center">Nenhum item disponível</Text>
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
                                            <Entypo name="heart" size={24} color="red" /> 
                                        ) : (
                                            <Entypo name="heart-outlined" size={24} color="black" /> 
                                        )}
                                    </Pressable>
                                </View>
                                <Image
                                    source={{ uri: item.url }}
                                    className="w-full mx-auto h-40"
                                    style={{ resizeMode: 'cover' }}
                                />
                                <Text className="text-dark-brown font-regular text-left mt-2 px-1">{item.restaurant}</Text>
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
        </View>
    );
}
