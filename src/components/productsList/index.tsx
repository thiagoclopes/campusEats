import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { TouchableOpacity, View, Text, Image, Pressable } from "react-native";

interface FoodItem {
    id: string;
    name: string;
    category: string;
    url: string;
}

const fetchItems = async () => {
    try {
        const response = await fetch('http://192.168.1.12:3000/products');
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
    const router = useRouter();

    useEffect(() => {
        const getData = async () => {
            const fetchedItems = await fetchItems();
            console.log('Fetched items:', fetchedItems);
            setItems(fetchedItems);
        };
        getData();
    }, []);

    return (
        <View className="p-4">
            <View className="flex flex-row gap-2 mb-4">
                <TouchableOpacity className={`w-24 py-4 rounded-xl`}>
                    <Text className={`font-bold text-center`}>Todos</Text>
                </TouchableOpacity>
                <TouchableOpacity className={`w-24 py-4 rounded-xl`}>
                    <Text className={`font-bold text-center`}>Combos</Text>
                </TouchableOpacity>
                <TouchableOpacity className={`w-24 py-4 rounded-xl`}>
                    <Text className={`font-bold text-center`}>Almoço</Text>
                </TouchableOpacity>
                <TouchableOpacity className={`w-24 py-4 rounded-xl`}>
                    <Text className={`font-bold text-center`}>Pizza</Text>
                </TouchableOpacity>
            </View>

            <View className="flex flex-row flex-wrap">
                {items.length === 0 ? (
                    <Text className="text-center">Nenhum item disponível</Text>
                ) : (
                    items.map(item => (
                        <View key={item.id} className="w-1/2 p-2">
                            <Pressable
                                className="bg-slate-100 rounded-xl overflow-hidden"
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
