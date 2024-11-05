import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import BackArrow from '../components/backArrow';
import MapView, { Marker } from 'react-native-maps';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

interface LocationCoords {
    latitude: number;
    longitude: number;
}

interface Restaurant {
    id: number;
    name: string;
    description: string;
    coords: LocationCoords;
}

const restaurants: Restaurant[] = [
    {
        id: 1,
        name: 'Restaurante Nordestino',
        description: 'Tradicional para os alunos da ECT, diversos alimentos com foco em almoços.',
        coords: { latitude: -5.84409, longitude: -35.19985 },
    },
    {
        id: 2,
        name: 'Açaí do renatão',
        description: 'O melhor açaí da UFRN.',
        coords: { latitude: -5.839732, longitude: -35.19570 },
    },
    
];


export default function SelectAdress() {
    const [currentLocation, setCurrentLocation] = useState<LocationCoords | null>(null);

    const requestLocationPermission = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
            console.log('You can use the Location');
            getCurrentLocation();
        } else {
            console.log('Location permission denied');
        }
    };

    const getCurrentLocation = async () => {
        try {
            const location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;
            setCurrentLocation({ latitude, longitude });
            console.log(latitude, longitude);
        } catch (error) {
            alert(error);
        }
    };

    useEffect(() => {
        requestLocationPermission();
    }, []);

    const initialRegion = {
        latitude: -5.84341,
        longitude: -35.19939,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    };
    return (
        <View className='w-full flex flex-col bg-red-main flex-1'>
            <StatusBar backgroundColor="#EF2A39" barStyle="light-content" />
            <View className='w-full flex flex-row items-center justify-between'>
                <BackArrow color='white'/>
            </View>
            <View className="flex flex-row items-center justify-start gap-8 mt-8 p-8">
                <View className="flex flex-col gap-1 pb-2">
                    <Text className="text-2xl text-white text-center p-2">Endereço de entrega</Text>
                </View>
            </View>
            
            <View className='w-full flex-1 rounded-t-3xl bg-white'>
                <View style={styles.container}>
                    <StatusBar backgroundColor="white" barStyle="dark-content" />
                    <TouchableOpacity onPress={() => router.push('/')} className="absolute p-3 z-10 bg-white/50 rounded-sm m-3">
                        <AntDesign name="arrowleft" size={20} color='black' style={{ opacity: 0.6 }} />
                    </TouchableOpacity>

                    <MapView
                        mapType="hybrid"
                        showsCompass={false}
                        style={styles.map}
                        initialRegion={initialRegion}
                        showsUserLocation={true} // Para mostrar a localização do usuário no mapa
                    >
                        {restaurants.map((restaurant) => (
                            <Marker
                            key={restaurant.id}
                            coordinate={restaurant.coords}
                            title={restaurant.name}
                            description={restaurant.description}
                        >
                            <View className="items-center">
                                <Text className="font-bold text-lg mb-1 text-red-main bg-white/50">
                                    {restaurant.name}
                                </Text>
                                <FontAwesome name="map-pin" size={28} color="red" />
                                {/*<Image
                                    source={{ uri: 'https://pbs.twimg.com/media/FTEEVe8XoAAiyb5.jpg:large' }}
                                    className="w-16 h-16 object-contain"
                                />*/}
                            </View>
                        </Marker>
                        ))}
                    </MapView>
                </View>
            </View>
            
            
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
});