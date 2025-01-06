import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList  } from "react-native";
import MapView, {Region } from "react-native-maps";
import { getCurrentPositionAsync, Accuracy } from "expo-location";
import * as Location from 'expo-location';
import { Entypo, Feather, FontAwesome6 } from "@expo/vector-icons";
import Sidebar from "@/src/components/delivery/sidebar";
import CourierStatusSheet from "@/src/components/delivery/courierStatusSheet";
import axios from "axios";
import LOCAL_IP from "@/config";
import OrderCard from "@/src/components/delivery/orderCard";
import { router } from "expo-router";

interface Order {
    id: string;
    items: CartItem[];
    address: string;
    status: string;
    courierId: string;
	recused?: boolean;
}

interface CartItem {
    id: string;
    foodId: string;
    restaurantId: string;
    quantity: number;
    price: number;
}

export default function DeliveryHome() {
	const courierId = "321";
	const [region, setRegion] = useState<Region | null>(null);
	const [isOnline, setIsOnline] = useState(false);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [orders, setOrders] = useState<Order[]>([]);
	const [currentOrder, setCurrentOrder] = useState<Order>();

  	useEffect(() => {
		const getLocation = async () => {
			const { coords } = await getCurrentPositionAsync({
				accuracy: Accuracy.High,
			});
			setRegion({
				latitude: coords.latitude,
				longitude: coords.longitude,
				latitudeDelta: 0.0922,
				longitudeDelta: 0.0421,
			});
		};

		getLocation();
	}, []);


	useEffect(() => {
        const fetchCourierStatus = async () => {
			try {
				const response = await axios.get(`${LOCAL_IP}/couriers/${courierId}`);
				const courierData = response.data;
	
				if (courierData) {
					setIsOnline(courierData.availability);
				}
			} catch (error) {
				console.error("Erro ao buscar status do entregador:", error);
			}
		};
		fetchCourierStatus();
    }, []);

	useEffect(() => {
			const fetchOrders = async () => {
				console.log('procurando pedidos...');
				try {

					const response = await axios.get(`${LOCAL_IP}/orders`)
					const ordersData = response.data;

					const assignedOrder = ordersData.find((order: Order) => order.courierId === courierId);
					if (assignedOrder) {
						setCurrentOrder(assignedOrder);
						return; 
					}

					
					const filteredOrders = ordersData.filter(
						(order: Order) => !order.courierId && !order.recused
					);

					setOrders(filteredOrders);

				} catch(error) {
					console.error("Erro ao buscar pedidos", error)
				}
			};

			if(!currentOrder){
				fetchOrders();
				const interval = setInterval(() => {
					fetchOrders();
				}, 5000);

				return () => clearInterval(interval);
			}
			

	}, [isOnline, currentOrder])

	const acceptOrder = async (order: Order) => {
		try {
			const updatedOrder = { ...order, courierId: courierId};
	
			await axios.patch(`${LOCAL_IP}/orders/${order.id}`, updatedOrder);
			setOrders((prevOrders) => prevOrders.filter((o: Order) => o.id !== order.id));
			handleToggleOnlineStatus();
			router.push('/delivery/collection')
			console.log("Pedido aceito:", updatedOrder);
		} catch (error) {
			console.error("Erro ao aceitar pedido:", error);
		}
	};

	const rejectOrder = async (orderId: string) => {
		try {
			await axios.patch(`${LOCAL_IP}/orders/${orderId}`, {recused: true});
			setOrders((prevOrders) => prevOrders.filter((o: Order) => o.id !== orderId));
			console.log(`Pedido ${orderId} rejeitado.`);
		} catch (error) {
			console.error("Erro ao recusar pedido:", error);
		}
	};

	const handleToggleOnlineStatus = async () => {
		try {
			console.log("TOGGLEONLINE");
			setIsOnline((prevState) => {
				const newStatus = !prevState;
	
				updateCourierAvailability(newStatus);
	
				return newStatus;
			});
		} catch (error) {
			console.error("Erro ao atualizar status de disponibilidade:", error);
		}
	};

	const updateCourierAvailability = async (availabilityStatus: boolean) => {
		try {
			await axios.patch(`${LOCAL_IP}/couriers/${courierId}`, {
				availability: availabilityStatus,
			})
		} catch (error) {
			console.error("Erro ao atualizar disponibilidade no backend:", error);
		}
	}

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

  	const requestLocationPermission = async () => {
		const { status } = await Location.requestForegroundPermissionsAsync();
		if (status === 'granted') {
			console.log('You can use the Location');
		} else {
			console.log('Location permission denied');
		}
	};

  	useEffect(() => {
        requestLocationPermission();
    }, []);

	if (!region) {
		return <Text>Loading...</Text>;
	}

  	return (
		<View style={{ flex: 1 }}>
			{isSidebarOpen && (
				<View style={{ 
					position: 'absolute', 
					top: 0, 
					left: 0, 
					right: 0, 
					bottom: 0, 
					backgroundColor: 'rgba(0, 0, 0, 0.5)', 
					zIndex: 3
					}} 
				/>
			)}
			
			<TouchableOpacity 
				className="absolute z-10 top-5 left-5 w-16 h-16 bg-red-main flex items-center justify-center rounded-full"
				onPress={toggleSidebar}
			>
				<Entypo name="menu" size={36} color="white"/>
			</TouchableOpacity>
			<Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />

			<View 
				className="absolute z-10 top-5 left-1/2 transform -translate-x-1/2 px-6 h-16 bg-black flex items-center justify-center rounded-full"
				style={{ zIndex: 2}}
			>
				<Text className="text-white text-xl">R$ 249,80</Text>
			</View>

			<MapView
				style={{ flex: 1 }}
				region={region}
				showsUserLocation={true}
				showsCompass={false}
				showsMyLocationButton={false}
				followsUserLocation={true}
				loadingEnabled={true}
			/>

			{!currentOrder ? (
				<>
					{orders[0] && isOnline ? (
						<OrderCard
							order={orders[0]}
							onAccept={acceptOrder}
							onReject={rejectOrder}
						/>
					) : (
						<CourierStatusSheet isOnline={isOnline} handleToggleOnlineStatus={handleToggleOnlineStatus}/>
					)}

					{!isOnline && (
						<TouchableOpacity
							className={`absolute  bottom-36 left-1/2 transform -translate-x-1/2 h-24 w-24 rounded-full items-center justify-center bg-red-main`}
							onPress={handleToggleOnlineStatus}
						>
							<Text className="text-white text-lg font-bold">INICIAR</Text>
						</TouchableOpacity>
					)}
							
				</>
			) : (
				<View className="absolute bottom-0 left-0 right-0 p-8 rounded-t-3xl shadow-md flex flex-row items-center justify-between bg-white">
					<TouchableOpacity className={`mx-auto p-6 rounded-xl bg-red-main`} onPress={() => router.push(`/delivery/collection`)} >
						<Text className="text-white text-center">
							IR PARA COLETA
						</Text>
					</TouchableOpacity>
				</View>
			)}
			

			
		</View>
	);
	
}