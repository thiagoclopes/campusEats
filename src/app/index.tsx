import { Text, View, ScrollView, StatusBar } from "react-native";
import { Header } from "../components/header";
import Constants from 'expo-constants'
import { Banner } from "../components/banner";
import { Footer } from "../components/footer";
import { Products } from "../components/productsList";
import CartStatusBar from "../components/cartStatusBar";
import OrderStatusBar from "../components/orderStatusBar";
import axios from "axios";
import LOCAL_IP from "@/config";
import { useEffect, useState } from "react";

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
		const response = await axios.get(`${LOCAL_IP}/orders`, {
			params: { status: "Pendente" },
		});
		return response.data;
	} catch (error) {
		console.error("Erro ao buscar itens do carrinho:", error);
		return [];
	}
};


export default function Index() {
	const [cartItems, setCartItems] = useState<CartItem[]>([]);
	const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
	const [pendingOrder, setPendingOrder] = useState<Order | null>(null);
	const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
	useEffect(() => {
	const getCartItems = async () => {
		const items = await fetchCartItems();
		const pendingOrders = await fetchPendingOrder();
		setCartItems(items);
		setPendingOrder(pendingOrders)

		if (items.length > 0 && items[0].restaurantId) {
			const fetchedRestaurant = await fetchRestaurant(items[0].restaurantId);
			setRestaurant(fetchedRestaurant);

			} else {
				// console.log('Nenhum restaurantId encontrado.');
			}

			const foodItemsPromises = items.map(item => {
				return fetchFoodItem(item.foodId);
			});
			const fetchedFoodItems = await Promise.all(foodItemsPromises);
			setFoodItems(fetchedFoodItems.filter(item => item !== null));
	}
	getCartItems();
	}, []);

	const firstItemName = foodItems.length > 0 ? foodItems[0].name : '';

	const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

	const subTotal = cartItems.reduce((acc, item) => {
		const foodItem = foodItems.find(food => food.id === item.foodId);
		const price = foodItem ? foodItem.price : 0;

		return acc + (price * item.quantity);
	}, 0);
	
	const imageUrl = restaurant ? restaurant.logo : 'https://media.istockphoto.com/id/1222357475/vector/image-preview-icon-picture-placeholder-for-website-or-ui-ux-design-vector-illustration.jpg?s=612x612&w=0&k=20&c=KuCo-dRBYV7nz2gbk4J9w1WtTAgpTdznHu55W9FjimE=';
	const restaurantId = restaurant ? restaurant.id : null;
		
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
			{/*{pendingOrder &&(
				<OrderStatusBar
					imageUrl={}
				/>
			)}*/}
			{cartItems.length > 0 && (
				<CartStatusBar
					imageUrl={imageUrl}
					firstItemName={firstItemName}
					itemCount={itemCount}
					subTotal={subTotal}
				/>
			)}
			<Footer/>
		</View>
	);
}
