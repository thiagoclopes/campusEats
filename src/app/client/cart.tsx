import React, { useCallback, useEffect, useState } from "react";
import { Text, View, ScrollView, TouchableOpacity, ActivityIndicator, Image, StatusBar } from "react-native";
import { Href, router, useLocalSearchParams, useRouter } from "expo-router";
import axios from 'axios';
import LOCAL_IP from '../../../config';
import BackArrow from "../../components/shared/backArrow";
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { debounce } from 'lodash';
import PaymentDetails from "../../components/client/paymentDetails";
import ChameleonWarning from "../../components/shared/chameleonWarning";

interface CartItem {
    id: string;
    foodId: string;
    restaurantId: string;
    quantity: number;
    price: number;
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
        status: 'Awaiting Confirmation',
    };

    try {
        const response = await axios.post(`${LOCAL_IP}/orders`, orderData);
        cartItems.forEach(async item => await removeCartItem(item.id));
        return response.data.id;
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
    } catch (error) {
        console.error('Erro ao remover item do carrinho:', error);
    }
};

const updateCartItemQuantity = async (id: string, quantity: number) => {
    try {
        await axios.patch(`${LOCAL_IP}/cart/${id}`, { quantity });
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
    const [errorMessage, setErrorMessage] = useState(""); 


    useEffect(() => {

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
            const orderId = await createOrder(cartItems, selectedAddress, latitude, longitude);
            
            if (orderId) {
                const subtotal = totalAmount;
                const deliveryFee = 3.75;
                const deliveryTime = "15 - 30mins";

                router.push({
                    pathname: `/client/orderConfirmation`,
                    params: {
                        orderId,
                        subtotal,
                        deliveryFee,
                        deliveryTime,
                    },
                });
            } else {
                console.log("Erro ao criar pedido");
            }
        } else {
            console.log("Endereço não selecionado ou carrinho vazio");
            setErrorMessage("Selecione um endereço antes de confirmar pedido.");
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


    const increaseQuantity = (id: string) => {
        setCartItems((prevCartItems) =>
            prevCartItems.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

	const decreaseQuantity = (id: string) => {
        setCartItems((prevCartItems) =>
            prevCartItems.map((item) =>
                item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };
    
    const handleSaveAndNavigate = async (route: Href) => {
        try {
            for (const item of cartItems) {
                await updateCartItemQuantity(item.id, item.quantity);
            }
            router.push(route);
        } catch (error) {
            console.error("Erro ao salvar os itens do carrinho:", error);
            alert("Ocorreu um erro ao salvar o carrinho. Tente novamente.");
        }
    };


	const totalAmount = cartItems.reduce((acc, item) => {
        const foodItem = foodItems.find(food => food.id === item.foodId);
        const price = foodItem ? foodItem.price : 0;
        return acc + (price * item.quantity);
    }, 0);


    if (loading){
        return(
            <View className="flex-1 flex-col items-center justify-center">
                <ActivityIndicator color="red" size="large"/>
            </View>
        )
    }

    return (
		<View className='w-full flex flex-col bg-red-main flex-1'>
			<StatusBar backgroundColor="#EF2A39" barStyle="light-content" />
			<BackArrow color='white' route='/client'  onClick={handleSaveAndNavigate}/>
			<View className="flex flex-row items-center justify-start gap-8 p-8">
				<Image className="rounded-full border-white border-2"
					source={restaurant?.logo ? { uri: restaurant?.logo } : require('@/assets/images/icon.png')} 
					style={{ width: 64, height: 64, resizeMode: 'cover' }}
				/>
				<View className="flex flex-col gap-1 pb-2 ">
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <>
                        <TouchableOpacity onPress={() => router.push(restaurant ? `/client/restaurant_profile?id=${restaurant?.id}` : '/client')}>
                            <Text className="text-2xl font-semibold text-white">
                                {restaurant ? `${restaurant.name}` : 'Nenhum restaurante selecionado.'}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="bg-slate-200 rounded-2xl" onPress={() => router.push(restaurant ? `/client/restaurant_profile?id=${restaurant?.id}` : '/client')}>
                            <Text className="font-medium text-black text-center p-2 px-4">Adicionar mais itens +</Text>
                        </TouchableOpacity>
                    </>
                )}
				</View>
			</View>
			
			<View className='w-full flex-1 rounded-t-3xl px-4 bg-white'>
				<ScrollView style={{ width: '100%'}} showsVerticalScrollIndicator={false}>
					{cartItems.length === 0 ? (
                        <View className="mt-[20%] flex-1">
                            <ChameleonWarning message='Seu carrinho está vazio'/>

                            <TouchableOpacity className={'w-[80%] mx-auto rounded-2xl bg-red-main py-5'} onPress={() => router.push('/client')}>
                                <Text className='text-center text-white font-semibold px-6'>Voltar para a tela inicial</Text>
                            </TouchableOpacity>
                        </View>
					) : (
						cartItems.map(item => {
							const foodItem = foodItems.find(food => food.id === item.foodId);
							const price = foodItem ? foodItem.price : 0;
							return (
								<View key={item.id} className="flex flex-row mx-auto items-center border-b border-gray-400 border-dashed py-2">
									<View className="flex flex-row gap-0 items-center justify-center">
                                        <View className="px-4">
                                            <Image
                                                className="mx-auto"
                                                source={{ uri: foodItem?.url }} 
                                                style={{ width: 64, height: 64, resizeMode: 'cover' }}
                                            />
                                        </View>
										<View className="flex flex-col w-72 p-4">
											<View className="flex flex-row justify-between">
												<Text className="text-lg font-semibold">{foodItem ? foodItem.name : 'Item não encontrado'}</Text>
												<TouchableOpacity onPress={() => handleRemoveItem(item.id)}>
													<Feather name="x" size={15} color="black" className="mt-1"/>
												</TouchableOpacity>
											</View>
											<View className='flex flex-row h-10 items-center justify-between'>
												<Text className="text-gray-600">R$ {(price * item.quantity).toFixed(2).replace('.', ',')}</Text>
												<View className="flex flex-row">
													<TouchableOpacity className='w-5 h-5 rounded-lg bg-red-main flex items-center justify-center'>
														<FontAwesome5 name="minus" size={12} color="white" onPress={() => decreaseQuantity(item.id)}/>
													</TouchableOpacity>
													<Text className='mx-5'>{item.quantity}</Text>
													<TouchableOpacity className='w-5 h-5 rounded-lg bg-red-main flex items-center justify-center'>
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
					
                    {cartItems.length > 0 && (
					<View className="w-96 mt-5 mx-auto">
                        <TouchableOpacity
                            className="flex-row gap-2 items-center bg-white-gray w-[95%] mx-auto mt-3 mb-6 p-4 rounded-lg border border-black-gray-500"
                            onPress={() => handleSaveAndNavigate('/client/selectAddress')}>
                            <Feather name="map-pin" size={14} color="#7D7D7D" />
                            {selectedAddress ? (
                                <Text className="text-black-gray-500">{selectedAddress}</Text>
                            ) : (
                                <Text className="text-black-gray-500">Calcular taxa de entrega</Text>
                            )}
                        </TouchableOpacity>

                        {errorMessage && (
    <Text className="text-red-600 mb-6">{errorMessage}</Text>
)}


                        <Text className="font-semibold mb-5 text-xl">Valores</Text>
                        <PaymentDetails 
    subtotal={totalAmount} 
    deliveryFee={3.75} 
    deliveryTime="15 - 30mins" 
/>
                    </View>
                        )}
				</ScrollView>
			</View>
			
			{cartItems.length > 0 && (
				<View className="shadow-md" 
                style={{
					height: 100,
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'space-around',
					backgroundColor: 'white',
				}}>
					<View className='flex flex-col items-center justify-center'>
						<Text className='text-slate-500 text-xl'>Total:</Text>
						<Text className='font-bold text-2xl'>R$ {(totalAmount+3.75).toFixed(2).replace('.', ',')}</Text>
					</View>
					<TouchableOpacity className={'w-[55%] rounded-xl bg-red-main py-5'} onPress={handleOrderCreation}>
						<Text className='text-center text-white font-semibold'>CONFIRMAR PEDIDO</Text>
					</TouchableOpacity>
				</View>
			)}
		</View>
	);
	
};

export default Cart;
