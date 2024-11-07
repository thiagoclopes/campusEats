import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { useRouter } from 'expo-router'; // Importando a navegação do expo-router
import axios from 'axios';
import LOCAL_IP from '@/config';

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
}

export default function OrderProgress() {
    const [orders, setOrders] = useState<Order[]>([]);
    const router = useRouter();

    useEffect(() => {
        async function fetchOrdersData() {
            try {
                const response = await axios.get(`${LOCAL_IP}/orders/`);
                setOrders(response.data);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        }

        fetchOrdersData();
    }, []);

    async function handleOrderReceived(orderId: string) {
        try {
            await axios.delete(`${LOCAL_IP}/orders/${orderId}`);
            // Atualiza o estado para remover o pedido localmente
            setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
            // Navega de volta para a tela inicial
            router.push('/'); // Substitua '/' pelo caminho correto para a tela inicial, se necessário
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
            <Text>PROGRESSO DO PEDIDO</Text>
            <MapView
                mapType="standard"
                showsCompass={false}
                style={styles.map}
                initialRegion={initialRegion}
                showsUserLocation={true}
                customMapStyle={customMapStyle}
            >
                {orders.length > 0 && (
                    <Marker
                        key={orders[0].id}
                        coordinate={{
                            latitude: orders[0].latitude,
                            longitude: orders[0].longitude,
                        }}
                        title={orders[0].address}
                    />
                )}
            </MapView>
            {orders.length > 0 && (
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleOrderReceived(orders[0].id)}
                >
                    <Text style={styles.buttonText}>Pedido Recebido</Text>
                </TouchableOpacity>
            )}
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
    button: {
        position: 'absolute',
        bottom: 20,
        left: '10%',
        right: '10%',
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
