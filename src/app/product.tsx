import { Text, View, ScrollView, Image, ActivityIndicator, TouchableOpacity, TextInput, StatusBar } from "react-native";
import Constants from 'expo-constants'
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import BackArrow from "../components/backArrow";

const statusBarHeight = Constants.statusBarHeight

interface FoodItem {
    id: string;
    name: string;
    category: string;
    url: string;
  }

const fetchProduct = async (id: string) => {
    try {
        const response = await fetch(`http://192.168.72.176:3000/products/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched product data:', data);
        return data;
    } catch (error) {
        console.error('Erro ao buscar produto:', error);
        return null;
    }
};

export default function Product() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [product, setProduct] = useState<FoodItem | null>(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const getProductData = async () => {
            if (id) {
                const fetchedProduct = await fetchProduct(id);
                setProduct(fetchedProduct);
            }
            setLoading(false);
        };
        getProductData();
    }, [id]);
    
    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (!product) {
        return (
            <View className="p-4">
                <Text className="text-center">Produto não encontrado.</Text>
            </View>
        );
    }
    return (
        <View className="flex flex-1">
            <StatusBar backgroundColor="white" barStyle="dark-content" />
            <BackArrow />
            <ScrollView 
                style={{ flex: 1 }}
                className="bg-white"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <View className="w-full">
                    <Image
                        source={{ uri: product.url }} 
                        style={{ width: '100%', height: 280, resizeMode: 'cover'}}
                    />
                    <View className='flex w-full p-4 flex-row justify-between mb-3'>
                        <View>
                            <Text className='text-xl text-gray font-semibold'>{product.category}</Text>
                            <Text className='text-3xl font-semibold'>{product.name}</Text>
                            <Text className='text-lg mt-1 text-black-gray'>* 4.9 | 26 mins</Text>
                        </View>
    
                        <View className='flex flex-row h-24 items-center'>
                            <TouchableOpacity className='w-12 h-12 rounded-xl bg-red-main flex items-center justify-center'>
                                <Text className='text-white text-2xl font-semibold'>-</Text>
                            </TouchableOpacity>
                            <Text className='mx-5 text-2xl'>1</Text>
                            <TouchableOpacity className='w-12 h-12 rounded-xl bg-red-main flex items-center justify-center'>
                                <Text className='text-white text-2xl font-semibold'>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
    
                    <View className='px-4'>
                        <View className='mx-auto flex items-center'>
                            <Text className='text-black-gray text-lg'>
                                O {product.name} é uma deliciosa combinação de ingredientes frescos e saborosos, proporcionando uma experiência irresistível a cada mordida.
                            </Text>
                        </View>
    
                        <View className='mt-2'>
                            <Text className='text-xl font-semibold'>Adicionar observação</Text>
                            <TextInput
                                className='border border-black-400 rounded-lg p-2 mb-2'
                                placeholder="Ex: Tirar a cebola"
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>

            <View style={{
                height: 100,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                backgroundColor: 'white',
            }}>
                <View className='flex flex-col items-center justify-center'>
                    <Text className='text-slate-500 text-xl'>Total:</Text>
                    <Text className='font-bold text-2xl'>R$ 20,00</Text>
                </View>
                <TouchableOpacity className={'w-[65%] rounded-xl bg-red-main py-5'}>
                    <Text className={'text-center text-white'}>ADICIONAR AO CARRINHO</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
