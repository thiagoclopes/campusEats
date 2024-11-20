import { Text, TouchableOpacity, View, StyleSheet, StatusBar, Image, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { useLocalSearchParams, useRouter } from 'expo-router';
import axios from 'axios';
import LOCAL_IP from '@/config';
import { Entypo, Feather, FontAwesome5, FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';

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
    latitude: number;
    longitude: number;
    status: string;
    courierId: string;
}

interface Courier {
    id: string;
    name: string;
    vehicle: string;
    vehiclePlate: number;
    rating: string;
    availability: boolean;
}

export default function OrderProgress() {
    const { orderId } = useLocalSearchParams();
    const [order, setOrder] = useState<Order | null>(null);
    const [courier, setCourier] = useState<Courier | null>(null);
    const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
    const [loadingCourier, setLoadingCourier] = useState(true);
    const router = useRouter();

    const requestLocationPermission = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
            getuserLocation();
        } else {
            console.log('Location permission denied');
        }
    };

    const getuserLocation = async () => {
        try {
            const location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;
            setUserLocation({ latitude, longitude });
        } catch (error) {
            alert(error);
        }
    };

    useEffect(() => {
        requestLocationPermission()
        async function fetchOrderData() {
            try {
                const response = await axios.get(`${LOCAL_IP}/orders/${orderId}`);
                setOrder(response.data);
                setLoadingCourier(false);
            } catch (error) {
                console.error('Erro ao buscar dados do pedido:', error);
            }
        }

        if (orderId) {
            fetchOrderData();
        }
    }, [orderId]);

    useEffect(() => {
        if (order && order.courierId) {
            const courierId = order.courierId;
            
            async function fetchCourierData() {
                try {
                    const response = await axios.get(`${LOCAL_IP}/delivery_persons/${courierId}`);
                    setCourier(response.data)
                    setLoadingCourier(false);
                } catch (error) {
                    console.error('Erro ao buscar dados do entregador:', error);
                }
            }
    
            fetchCourierData();
        }
    }, [order]);


    async function handleOrderReceived(orderId: string) {
        try {
            await axios.delete(`${LOCAL_IP}/orders/${orderId}`);
            
            setOrder(prevOrder => {
                if (prevOrder && prevOrder.id === orderId) {
                    return null;
                }
                return prevOrder;
            });
    
            router.push('/');
        } catch (error) {
            console.error('Erro ao deletar o pedido:', error);
        }
    }

    const customMapStyle = [
        { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#e0e0e0" }] },
        { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }] },
        { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#b0d0d0" }] },
        { "featureType": "poi", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }
    ];

    const initialRegion = {
        latitude: -5.84341,
        longitude: -35.19939,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    };

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
    
            <TouchableOpacity
                className='absolute z-10 px-5 py-2 ml-2 mt-4 bg-red-main rounded-2xl'
                onPress={() => {
                    if (order) {
                        handleOrderReceived(order.id);
                    }
                }}
            >
                <Text className='text-white'>Voltar</Text>
            </TouchableOpacity>
    
            <MapView
                mapType="standard"
                showsCompass={false}
                style={styles.map}
                initialRegion={initialRegion}
                showsUserLocation={true}
                customMapStyle={customMapStyle}
            >
                {order && (
                    <Marker
                        key={order.id}
                        coordinate={{
                            latitude: order.latitude,
                            longitude: order.longitude,
                        }}
                        title={order.address}
                    />
                )}
                {userLocation && order && (
                    <MapViewDirections
                        origin={userLocation}
                        destination={{
                            latitude: order.latitude,
                            longitude: order.longitude,
                        }} 
                        apikey="AIzaSyBMj0JfoC2r9JnxFcq_1n6wXusosepUZRc"
                        strokeWidth={3}
                        strokeColor="blue"
                    />
                )}
            </MapView>
    
            <View className='w-full h-72 bg-white rounded-t-3xl -mt-9 flex flex-col items-center py-4 '
                style={{
                    backgroundColor: 'white',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: -3 },
                    shadowOpacity: 0.3,
                    shadowRadius: 4,
                    elevation: 10, 
                }}
            >
                {loadingCourier ? (
                    <View className="flex-1 justify-center items-center">
                        <ActivityIndicator size="large" color="#EF2A39" />
                        <Text>Loading Courier...</Text>
                    </View>
                ) : (
                    <>
                        <View className="-mt-20 w-28 h-28 rounded-2xl bg-slate-500 overflow-hidden z-10">
                            <Image
                                source={{ uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' }}
                                style={{ width: '100%', height: '100%' }}
                            />
                        </View>
                        <View className='flex flex-row items-center justify-center gap-2'>
                            <Text className='font-bold text-xl'>{courier?.name} </Text>
                            <View className='flex-row items-center justify-center'>
                                <Entypo name="star" size={24} color="#FF9633" />
                                <Text className='font-medium text-lg'>{courier?.rating}</Text>
                            </View>
                        </View>
                        <Text className='text-sm text-black-gray text-center font-medium'>{courier?.vehicle} | {courier?.vehiclePlate}</Text>
                        <View className='h-full w-full flex flex-col gap-3 items-center mt-4 p-2 shadow-xl'
                            style={{
                                backgroundColor: 'white',
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: -3 },
                                shadowOpacity: 0.1,
                                shadowRadius: 4, 
                                elevation: 10, 
                            }}
                        >
                            <View className='flex-row gap-1'>
                                <MaterialCommunityIcons name="chef-hat" size={24} color="#EF2A39" />
                                <Text className='font-bold text-red-main'>.....</Text>
                                <FontAwesome6 name="box" size={24} color="#EF2A39" />
                                <Text className='font-bold text-red-main'>.....</Text>
                                <FontAwesome6 name="motorcycle" size={24} color="#EF2A39" />
                                <Text className='font-bold text-red-main'>.....</Text>
                                <FontAwesome5 name="hands-helping" size={24} color="#EF2A39" style={{ opacity: 0.3 }} />
                            </View>
                            <View className='flex-col items-center'>
                                <Text className='font-medium text-lg'>O entregador está a caminho...</Text>
                                <Text className='font-medium'>Tempo estimado: 2min</Text>
                            </View>
                            
                            <TouchableOpacity
                                className="px-5 py-2 ml-2 mt-4 bg-red-main rounded-xl"
                            >
                                <MaterialCommunityIcons name="chat-plus" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                    </>
                )}
    
                
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e0e0e0',
    },
    map: {
        flex: 1,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
