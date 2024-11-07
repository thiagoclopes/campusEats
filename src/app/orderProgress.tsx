import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import BackArrow from '../components/backArrow';
import MapView, { Marker } from 'react-native-maps';
import { FontAwesome } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
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
    status: string;
}

export default function OrderProgress() {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        async function fetchOrdersData() {
            try {
                const response = await fetch(`${LOCAL_IP}/orders/`);
                if (!response.ok) {
                    throw new Error('Erro ao buscar dados');
                }
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        }

        fetchOrdersData();
    }, []);

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
        <View>
            <Text>NOTIFICATIONS </Text>
            <MapView
                mapType="standard"
                showsCompass={false}
                style={styles.map}
                initialRegion={initialRegion}
                showsUserLocation={true}
                customMapStyle={customMapStyle}
            >
                
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    searchInput: {
        position: 'absolute',
        top: 10,
        left: 50,
        right: 50,
        zIndex: 10,
        backgroundColor: 'white',
        padding: 6,
        borderRadius: 8,
        elevation: 3,
        marginLeft: 10,
        marginRight: 10,
    },
    suggestionList: {
        position: 'absolute',
        top: 55,
        left: 50,
        right: 50,
        zIndex: 10,
        backgroundColor: 'white',
        borderRadius: 8,
        elevation: 3,
        maxHeight: 150,
        marginLeft: 10,
        marginRight: 10,
    },
    suggestionItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    suggestionText: {
        fontSize: 16,
        color: 'black',
    },
});
