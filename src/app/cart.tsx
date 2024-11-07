import React, { useCallback, useEffect, useState } from "react";
import { Text, View, ScrollView, TouchableOpacity, ActivityIndicator, Image, StatusBar } from "react-native";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import axios from 'axios';
import LOCAL_IP from '../../config';
import BackArrow from "../components/backArrow";
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import DashedLine from "../components/dashedLine";
import { debounce } from 'lodash';

interface CartItem {
    id: string;
    foodId: string;
    restaurantId: string;
    quantity: number;
    price: number;
}

interface Order {
    id: string;
    items: CartItem[];
    address: string;
    status: string;
}

interface Restaurant {
    id: string;
    name: string;
    logo: string;
}

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

const fetchCartItems = async (): Promise<CartItem[]> => {
    try {
        const response = await axios.get(`${LOCAL_IP}/cart`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar itens do carrinho:', error);
        return [];
    }
};

const createOrder = async (cartItems: CartItem[], address: string, latitude: number, longitude: number) => {
    const orderData = {
        items: cartItems,
        address: address,
        latitude: latitude,
        longitude: longitude,
        status: 'Pendente',
    };

    try {
        const response = await axios.post(`${LOCAL_IP}/orders`, orderData);
        console.log("Pedido criado com sucesso:", response.data);
        cartItems.forEach(async item => await removeCartItem(item.id));
    } catch (error) {
        console.error("Erro ao criar pedido:", error);
    }
};

const fetchRestaurant = async (restaurantId: string) => {
    try {
        const response = await axios.get(`${LOCAL_IP}/restaurants/${restaurantId}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar restaurante:', error);
        return null;
    }
};

const fetchFoodItem = async (foodId: string) => {
    try {
        const response = await axios.get(`${LOCAL_IP}/products/${foodId}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar item de comida:', error);
        return null;
    }
};

const removeCartItem = async (id: string) => {
    try {
        await axios.delete(`${LOCAL_IP}/cart/${id}`);
        console.log(`Produto com id ${id} removido do carrinho.`);
    } catch (error) {
        console.error('Erro ao remover item do carrinho:', error);
    }
};

const updateCartItemQuantity = async (id: string, quantity: number) => {
    try {
        await axios.patch(`${LOCAL_IP}/cart/${id}`, { quantity });
        console.log(`Quantidade do item com id ${id} atualizada para ${quantity}.`);
    } catch (error) {
        console.error('Erro ao atualizar quantidade do item no carrinho:', error);
    }
};



const Cart = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

    const { pointName, latitudeParam, longitudeParam } = useLocalSearchParams();
    const latitude = latitudeParam ? Number(latitudeParam) : 0;
    const longitude = longitudeParam ? Number(longitudeParam) : 0;


    useEffect(() => {
        console.log('latitudeParam:', latitudeParam);
        console.log('longitudeParam:', longitudeParam);

        if (pointName) {
            setSelectedAddress(Array.isArray(pointName) ? pointName[0] : pointName);
        }
    }, [pointName]);

    useEffect(() => {
        const getCartItems = async () => {
            const items = await fetchCartItems();
            setCartItems(items);
			
			if (items.length === 0) {
                setFoodItems([]);
                setRestaurant(null);
                setLoading(false);
                return;
            }
            if (items.length > 0 && items[0].restaurantId) {
                const fetchedRestaurant = await fetchRestaurant(items[0].restaurantId);
                setRestaurant(fetchedRestaurant);
                console.log('Restaurante buscado:', fetchedRestaurant);
            } else {
                console.log('Nenhum restaurantId encontrado.');
            }

            const foodItemsPromises = items.map(item => {
				return fetchFoodItem(item.foodId);
			});
            const fetchedFoodItems = await Promise.all(foodItemsPromises);
            setFoodItems(fetchedFoodItems.filter(item => item !== null));
            setLoading(false);
        };

        getCartItems();
    }, []);

    const handleOrderCreation = async () => {
        if (cartItems.length > 0 && selectedAddress) {
            await createOrder(cartItems, selectedAddress, latitude, longitude);
            router.push("/orderConfirmation");
        } else {
            console.log("Endereço não selecionado ou carrinho vazio");
        }
    };

    const handleRemoveItem = async (id: string) => {
        await removeCartItem(id);
		const updatedCartItems = cartItems.filter(item => item.id !== id);
		setCartItems(updatedCartItems);

		if (updatedCartItems.length === 0) {
			setFoodItems([]);
			setRestaurant(null);
		}
    };

    const updateCartItemQuantityDebounced = useCallback(
        debounce(async (id: string, quantity: number) => {
            await updateCartItemQuantity(id, quantity);
        }, 1000),
        []
    );

    const increaseQuantity = async (id: string) => {
        setCartItems((prevCartItems) => {
            const updatedCartItems = prevCartItems.map(item => {
                if (item.id === id) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            });
            const newQuantity = updatedCartItems.find(item => item.id === id)!.quantity;
            updateCartItemQuantityDebounced(id, newQuantity);
            return updatedCartItems;
        });
    };

	const decreaseQuantity = async (id: string) => {
        setCartItems((prevCartItems) => {
            const updatedCartItems = prevCartItems.map(item => {
                if (item.id === id && item.quantity > 1) {
                    return { ...item, quantity: item.quantity - 1 };
                }
                return item;
            });
            const newQuantity = updatedCartItems.find(item => item.id === id)!.quantity;
            updateCartItemQuantityDebounced(id, newQuantity);
            return updatedCartItems;
        });
    };

	const totalAmount = cartItems.reduce((acc, item) => {
        const foodItem = foodItems.find(food => food.id === item.foodId);
        const price = foodItem ? foodItem.price : 0;
        return acc + (price * item.quantity);
    }, 0);


    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
		<View className='w-full flex flex-col bg-red-main flex-1'>
			<StatusBar backgroundColor="#EF2A39" barStyle="light-content" />
			<View className='w-full flex flex-row items-center justify-between'>
				<BackArrow color='white'/>
			</View>
			<View className="flex flex-row items-center justify-start gap-8 mt-8 p-8">
				<Image
					source={{ uri: restaurant?.logo }} 
					style={{ width: 64, height: 64, resizeMode: 'cover' }}
				/>
				<View className="flex flex-col gap-1 pb-2">
					<Text className="text-2xl font-semibold text-white">{restaurant ? `${restaurant.name}` : 'Nenhum restaurante selecionado.'}</Text>
					<TouchableOpacity className="bg-slate-200 rounded-2xl" onPress={() => router.push('/')}>
						<Text className="font-medium text-black text-center p-2">Adicionar mais itens +</Text>
					</TouchableOpacity>
				</View>
			</View>
			
			<View className='w-full flex-1 rounded-t-3xl px-4 bg-white'>
				<ScrollView style={{ width: '100%'}} showsVerticalScrollIndicator={false}>
					{cartItems.length === 0 ? (
						<Text className="text-center mt-10">Seu carrinho está vazio.</Text>
					) : (
						cartItems.map(item => {
							const foodItem = foodItems.find(food => food.id === item.foodId);
							const price = foodItem ? foodItem.price : 0;
							return (
								<View key={item.id} className="flex flex-row items-center border-b border-gray-400 border-dashed py-2">
									<View className="flex flex-row gap-8 items-center justify-center">
										<Image
											source={{ uri: foodItem?.url }} 
											style={{ width: 64, height: 64, resizeMode: 'cover' }}
										/>
										<View className="flex flex-col w-72 px-4 pt-8">
											<View className="flex flex-row justify-between">
												<Text className="text-lg font-semibold">{foodItem ? foodItem.name : 'Item não encontrado'}</Text>
												<TouchableOpacity onPress={() => handleRemoveItem(item.id)}>
													<Feather name="x" size={15} color="black" className="mt-1"/>
												</TouchableOpacity>
											</View>
											<View className='flex flex-row h-16 items-center justify-between'>
												<Text className="text-gray-600">R$ {(price * item.quantity).toFixed(2).replace('.', ',')}</Text>
												<View className="flex flex-row">
													<TouchableOpacity className='w-5 h-5 rounded-full bg-red-main flex items-center justify-center'>
														<FontAwesome5 name="minus" size={12} color="white" onPress={() => decreaseQuantity(item.id)}/>
													</TouchableOpacity>
													<Text className='mx-5'>{item.quantity}</Text>
													<TouchableOpacity className='w-5 h-5 rounded-full bg-red-main flex items-center justify-center'>
														<FontAwesome5 name="plus" size={12} color="white" onPress={() => increaseQuantity(item.id)}/>
													</TouchableOpacity>
												</View>
											</View>
										</View>
									</View>
								</View>
							);
						})
					)}
					
					<View className="w-96 mt-5">
                        <TouchableOpacity
                            className="flex-row flex-1 gap-2 items-center bg-white-gray mx-6 mt-3 mb-6 p-4 rounded-lg border border-black-gray-500"
                            onPress={() => router.push('/selectAddress')}>
                            <Feather name="map-pin" size={14} color="#7D7D7D" />
                            {selectedAddress ? (
                                <Text className="text-black-gray-500">{selectedAddress}</Text>
                            ) : (
                                <Text className="text-black-gray-500">Calcular taxa de entrega</Text>
                            )}
                        </TouchableOpacity>
                        <Text className="font-semibold mb-5 text-xl">Valores</Text>
                        <View className="flex flex-col gap-3 w-full px-4">
                            <View className="flex flex-row justify-between ">
                                <Text>Subtotal</Text>
                                <Text>R$ {totalAmount.toFixed(2).replace('.', ',')}</Text>
                            </View>
                            <View className="flex flex-row justify-between ">
                                <Text>Taxa de entrega</Text>
                                <Text>R$ 3,75</Text>
                            </View>
                            <View className="flex flex-row justify-between mt-5">
                                <Text className="font-bold">Total</Text>
                                <Text className="font-bold">R$ {(totalAmount+3.75).toFixed(2).replace('.', ',')}</Text>
                            </View>
                            <View className="flex flex-row justify-between mt-5">
                                <Text className="font-bold">Tempo de entrega: </Text>
                                <Text className="font-bold text-sm">15 - 30mins</Text>
                            </View>
                        </View>
                    </View>
				</ScrollView>
			</View>
			
			{cartItems.length > 0 && (
				<View style={{
					height: 100,
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'space-around',
					backgroundColor: 'white',
				}}>
					<View className='flex flex-col items-center justify-center'>
						<Text className='text-slate-500 text-lg'>Total:</Text>
						<Text className='font-bold text-xl'>R$ {(totalAmount+3.75).toFixed(2).replace('.', ',')}</Text>
					</View>
					<TouchableOpacity className={'w-[60%] rounded-xl bg-red-main py-5'} onPress={handleOrderCreation}>
						<Text className='text-center text-white font-semibold'>Continuar</Text>
					</TouchableOpacity>
				</View>
			)}
		</View>
	);
	
};

export default Cart;
