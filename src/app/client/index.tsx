import { Text, View, ScrollView, StatusBar } from "react-native";
import { Header } from "../../components/shared/header";
import Constants from 'expo-constants'
import { Banner } from "../../components/shared/banner";
import { Footer } from "../../components/client/footer";
import { Products } from "../../components/client/productsList";
import CartStatusBar from "../../components/client/cartStatusBar";
import OrderStatusBar from "../../components/client/orderStatusBar";
import axios from "axios";
import LOCAL_IP from "@/config";
import { useEffect, useState } from "react";
import React from "react";

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

interface Order {
	id: string;
	items: CartItem[];
	address: string;
	latitude: number;
	longitude: number;
	status: 'Pendente' | 'Entregue';
	courierId: string;  
}

interface Courier {
	id: string;
	name: string;
	photo: string;
	vehicle: string;
	vehicleName: string;
	vehiclePlate: string;
	rating: string;
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

const fetchRestaurant = async (restaurantId: string) => {
    try {
        const response = await axios.get(`${LOCAL_IP}/restaurants/${restaurantId}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar restaurante:', error);
        return null;
    }
};

const fetchCourier = async (courierId: string) => {
    try {
        const response = await axios.get(`${LOCAL_IP}/couriers/${courierId}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar entregador:', error);
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

const fetchPendingOrder = async () => {
	try {
		let response = await axios.get<Order[]>(`${LOCAL_IP}/orders`, {
			params: { status: "Preparing" },
		});

		if (response.data.length === 0) {
			response = await axios.get<Order[]>(`${LOCAL_IP}/orders`, {
				params: { status: "Out for Delivery" },
			});
		}

		return response.data;
	} catch (error) {
		console.error("Erro ao buscar itens do carrinho:", error);
		return [];
	}
};


export default function Index() {
	const [cartItems, setCartItems] = useState<CartItem[]>([]);
	const [foodItemsOnCart, setFoodItemsOnCart] = useState<FoodItem[]>([]);
	const [pendingOrder, setPendingOrder] = useState<Order | null>(null);
	const [pendingOrderCourier, setPendingOrderCourier] = useState<Courier | null>(null);
	const [restaurantOnCart, setRestaurantOnCart] = useState<Restaurant | null>(null);

	useEffect(() => {
		const getCartItems = async () => {
			const items = await fetchCartItems();
			setCartItems(items);

			if (items.length > 0 && items[0].restaurantId) {
				const fetchedRestaurant = await fetchRestaurant(items[0].restaurantId);
				setRestaurantOnCart(fetchedRestaurant);
			}

			const foodItemsPromises = items.map(item => {
				return fetchFoodItem(item.foodId);
			});
			const fetchedFoodItems = await Promise.all(foodItemsPromises);
			setFoodItemsOnCart(fetchedFoodItems.filter(item => item !== null));
		}
		getCartItems();

		const getActiveOrders = async () => {
			const pendingOrders = await fetchPendingOrder();
			const pendingOrderCouriers = await fetchCourier(pendingOrders[0].courierId);
			setPendingOrder(pendingOrders[0])
			setPendingOrderCourier(pendingOrderCouriers)
		}
		getActiveOrders();
	}, []);


	const firstItemName = foodItemsOnCart.length > 0 ? foodItemsOnCart[0].name : '';
	const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
	const subTotal = cartItems.reduce((acc, item) => {
		const foodItem = foodItemsOnCart.find(food => food.id === item.foodId);
		const price = foodItem ? foodItem.price : 0;

		return acc + (price * item.quantity);
	}, 0);
	
	const imageUrl = restaurantOnCart ? restaurantOnCart.logo : 'https://media.istockphoto.com/id/1222357475/vector/image-preview-icon-picture-placeholder-for-website-or-ui-ux-design-vector-illustration.jpg?s=612x612&w=0&k=20&c=KuCo-dRBYV7nz2gbk4J9w1WtTAgpTdznHu55W9FjimE=';
		
	return (
		<View className="flex flex-1">
			<StatusBar backgroundColor="white" barStyle="dark-content" />
				<ScrollView 
					style={{ flex: 1}}
					className="bg-white"
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ flexGrow: 1 }}
				>
					<View className="w-full">
						<Header/>
						<Banner/>
						<Products/>
					</View>
				</ScrollView>
				{cartItems.length > 0 && (
					<CartStatusBar
						imageUrl={imageUrl}
						firstItemName={firstItemName}
						itemCount={itemCount}
						subTotal={subTotal}
					/>
				)}
				{pendingOrder && pendingOrderCourier && (
					<OrderStatusBar
						imageUrl={pendingOrderCourier.photo}
						name={pendingOrderCourier.name}
						vehicle={pendingOrderCourier.vehicleName}
						plate={pendingOrderCourier.vehiclePlate}
						rating={pendingOrderCourier.rating}
					/>
				)}
			<Footer/>
		</View>
	);
}
