import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { TouchableOpacity, View, Text, Image, Pressable, ActivityIndicator, ScrollView } from "react-native";

interface FoodItem {
    id: string;
    name: string;
    category: string;
    url: string;
}

const fetchItems = async () => {
    try {
        const response = await fetch('http://192.168.1.11:3000/products');
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
                            className={`w-24 py-4 rounded-xl ${selectedCategory === category ? 'bg-red-500' : 'bg-slate-100'}`}
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
                                className="bg-white rounded-xl shadow-xl overflow-hidden"
                                onPress={() => router.push(`/product?id=${item.id}`)}
                            >
                                <Image
                                    source={{ uri: item.url }}
                                    className="w-full h-40"
                                    style={{ resizeMode: 'cover' }}
                                />
                                <Text className="text-slate-500 font-bold text-center py-2">{item.name}</Text>
                            </Pressable>
                        </View>
                    ))
                )}
            </View>
        </View>
    );
}
