import { Text, View, ScrollView, Image, ActivityIndicator, TouchableOpacity, TextInput, StatusBar, Platform, KeyboardAvoidingView } from "react-native";
import Constants from 'expo-constants'
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {  Entypo } from '@expo/vector-icons'
import BackArrow from "../components/backArrow";
import { useRouter } from "expo-router";
import LOCAL_IP from '../../config';
import axios from "axios";
import RestaurantProfile from "./restaurant_profile";
import { validateCart } from "../utils/cartMiddleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomModal from "../app/customModal";


const statusBarHeight = Constants.statusBarHeight

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
    logo: string;
    rating: number;
}

const fetchProduct = async (id: string) => {
    try {
        const response = await fetch(`${LOCAL_IP}/products/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar produto:', error);
        return null;
    }
};

const fetchRestaurant = async (id: string) => {
    try {
        const response = await fetch(`${LOCAL_IP}/restaurants/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar restaurante:', error);
        return null;
    }
};

export default function Product() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();
    const [product, setProduct] = useState<FoodItem | null>(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalSubtitle, setModalSubtitle] = useState("");


    useEffect(() => {
        const getProductData = async () => {
            if (id) {
                const fetchedProduct = await fetchProduct(id);
                if (fetchedProduct) {
                    const fetchedRestaurant = await fetchRestaurant(fetchedProduct.restaurantId);
                    setProduct(fetchedProduct);
                    setRestaurant(fetchedRestaurant);
                }
            }
            setLoading(false);
        };
        getProductData();
    }, [id]);
    

    const incrementQuantity = () => {
        setQuantity(prev => prev + 1);
    };

    const decrementQuantity = () => {
        setQuantity(prev => (prev > 1 ? prev - 1 : 1));
    };


    const addToCart = async (product: FoodItem, quantity: number) => {
        try {
            const canAddToCart = await validateCart(product.restaurantId)

            if(!canAddToCart){
                setModalTitle('Você só pode adicionar produtos de um único restaurante ao carrinho!');
                setModalSubtitle('Deseja limpar o carrinho?');
                setIsModalVisible(true);
                return;
            }

            const cartItem = {
                foodId: product.id,
                restaurantId: product.restaurantId,
                quantity,
            };
            const response = await axios.post(`${LOCAL_IP}/cart`, cartItem);
            console.log('Produto adicionado ao carrinho:', response.data);
            router.push('/cart');
        } catch (error) {
            console.error('Erro ao adicionar produto ao carrinho:', error);
        }



    };

    if (!product) {
        return (
            <View className="p-4">
                <Text className="text-center">Produto não encontrado.</Text>
            </View>
        );
    }

    const totalPrice = (product.price * quantity).toFixed(2).replace('.', ',');
    
    return (
        <View className="flex flex-1">
            <StatusBar backgroundColor="white" barStyle="dark-content" />
            <BackArrow color='black' route='/'/>
            <CustomModal
            visible={isModalVisible}
            title={modalTitle}
            subtitle={modalSubtitle}
            onClose={() => setIsModalVisible(false)}/>

            
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1"
            >
                <ScrollView 
                    style={{ flex: 1 }}
                    className="bg-white"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <View className="w-full">
                        <View className="w-full h-72 relative">
                            {loading && (
                                <ActivityIndicator
                                    size="large"
                                    color="#0000ff"
                                    className="absolute top-1/2 left-1/2"
                                    style={{ transform: [{ translateX: -10 }, { translateY: -10 }] }}
                                />
                            )}
                            <Image
                                source={{ uri: product.url }} 
                                style={{ width: '100%', height: 280, resizeMode: 'cover'}}
                            />
                        </View>

                        <View className="h-full mt-6 rounded-t-3xl px-4 bg-white shadow-lg py-4">
                            <View className='flex w-full p-4 flex-row justify-between'>
                                <View>
                                <TouchableOpacity
                                    onPress={() => router.push(`/restaurant_profile?id=${restaurant?.id}`)}
                                >
                                    <Text className="text-lg text-gray font-semibold">{restaurant?.name}</Text>
                                </TouchableOpacity>
                                    <Text className='text-2xl font-semibold'>{product.name}</Text>
                                    <Text className='text-md mt-1 text-black-gray'>
                                        <Entypo name="star" size={16} color="#FFD700" className="mr-1" />
                                        4.9 | 26 mins
                                    </Text>
                                </View>
            
                                <View className='flex flex-row h-24 items-center'>
                                    <TouchableOpacity className='w-8 h-8 rounded-xl bg-red-main flex items-center justify-center' onPress={decrementQuantity}>
                                        <Text className='text-white text-xl font-semibold'>-</Text>
                                    </TouchableOpacity>
                                    <Text className='mx-5 text-xl'>{quantity}</Text>
                                    <TouchableOpacity className='w-8 h-8 rounded-xl bg-red-main flex items-center justify-center' onPress={incrementQuantity}>
                                        <Text className='text-white text-xl font-semibold'>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
            
                            <View className='px-4'>
                                <View className='mx-auto flex items-center'>
                                    <Text className='text-black-gray text-lg'>
                                        O {product.name} é uma deliciosa combinação de ingredientes frescos e saborosos, proporcionando uma experiência irresistível a cada mordida.
                                    </Text>
                                </View>
            
                                <View className='mt-6'>
                                    <Text className='text-lg font-semibold mb-2'>Adicionar observação:</Text>
                                    <TextInput
                                        className='border border-gray-300 rounded-lg p-4 mb-2'
                                        placeholder="Ex: Tirar a cebola"
                                    />
                                </View>
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
                        <Text className='font-bold text-2xl'>R$ {totalPrice}</Text>
                    </View>
                    <TouchableOpacity className={'w-[65%] rounded-xl bg-red-main py-5'} onPress={() => {
                        addToCart(product, quantity);
                    }}>
                        <Text className={'text-center text-white'}>ADICIONAR AO CARRINHO</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}
