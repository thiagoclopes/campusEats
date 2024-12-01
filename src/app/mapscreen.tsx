import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import { AntDesign, Entypo, Feather, FontAwesome5 } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router } from 'expo-router';
import * as Location from 'expo-location';
import { Asset } from 'expo-asset';
import axios from 'axios';
import LOCAL_IP from '@/config';
import BackArrow from '../components/backArrow';

interface LocationCoords {
    latitude: number;
    longitude: number;
}

interface Restaurant {
    id: number;
    name: string;
    logo: string;
    rating: string;
    workingHours: string;
    coords: LocationCoords;
}

interface Sector {
    id: number;
    name: string;
    description: string;
    coords: LocationCoords;
}


const Sectors: Sector[] = [
    {
        id: 1,
        name: 'Setor 1', 
        description: 'Próximo à entrada principal e de fácil acesso.',
        coords: { latitude: -5.8374872488393645, longitude: -35.199658102831926 },
    },
    {
        id: 2,
        name: 'Setor 2',
        description: 'Área de convivência com mesas e bancos para os estudantes.',
        coords: { latitude: -5.840452832201686, longitude: -35.19724725069943 },
    },
    {
        id: 3,
        name: 'Setor 3',
        description: 'Ponto central próximo à administração da UFRN.',
        coords: { latitude: -5.840709167986833, longitude: -35.20058612478776 },
    },
    {
        id: 4,
        name: 'Setor 4', 
        description: 'Perto do Instituto de Física e Departamento de Matemática.',
        coords: { latitude: -5.842412943228999, longitude: -35.19972013385473 },
    },
    {
        id: 5,
        name: 'ECT',
        description: 'Área com movimentação frequente de estudantes.',
        coords: { latitude: -5.843395493045956, longitude: -35.199395317946305 },
    },
    {
        id: 6,
        name: 'Setor 5', 
        description: '.',
        coords: { latitude: -5.838337951119542, longitude: -35.19796197544989 },
    },
];

export default function MapScreen() {
    const [currentLocation, setCurrentLocation] = useState<LocationCoords | null>(null);
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRestaurants = async () => {
          try {
            const response = await axios.get<Restaurant[]>(`${LOCAL_IP}/restaurants?locationType=fixed`);
            setRestaurants(response.data);
            setLoading(false);
          } catch (error) {
            console.error('Erro ao buscar restaurantes:', error);
            setLoading(false);
          }
        };
    
        fetchRestaurants();
      }, []);

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

    const customMapStyle = [
        { 
            "featureType": "landscape", 
            "elementType": "geometry", 
            "stylers": [{ "color": "#e0e0e0" }] 
        },
        { 
            "featureType": "road", 
            "elementType": "geometry", 
            "stylers": [{ "color": "#ffffff" }] 
        },
        { 
            "featureType": "water", 
            "elementType": "geometry", 
            "stylers": [{ "color": "#a2d1d1" }] 
        },
        { 
            "featureType": "poi", 
            "elementType": "labels.icon", 
            "stylers": [{ "visibility": "off" }] 
        },
        { 
            "featureType": "road", 
            "elementType": "labels", 
            "stylers": [{ "visibility": "off" }]
        },
        { 
            "featureType": "poi", 
            "elementType": "labels", 
            "stylers": [{ "visibility": "off" }]
        },
        { 
            "featureType": "transit", 
            "elementType": "labels", 
            "stylers": [{ "visibility": "off" }] 
        }
    ];

    const customRestaurantPin = Asset.fromModule(require('../assets/custom_pin.png')).uri;
    const customSectorPin = Asset.fromModule(require('../assets/custom_sector_pin.png')).uri;
    const [showView, setShowView] = useState(false);
    const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);


    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="white" barStyle="dark-content" />
            
            <BackArrow color="black" title="Perto de você" route="/" />

            <MapView
                mapType="standard"
                showsCompass={false}
                style={styles.map}
                initialRegion={initialRegion}
                showsUserLocation={true}
                customMapStyle = {customMapStyle}
                onPress={() => setShowView(false)}
            >
                {!loading && restaurants.map((restaurant) => (
                    <Marker
                        key={restaurant.id}
                        coordinate={restaurant.coords}
                        title={restaurant.name}
                        onPress={() => {
                            setSelectedRestaurant(restaurant);
                            setShowView(true);
                        }}
                        
                    >
                        <Image
                            source={{ uri: customRestaurantPin }}
                            style={{ width: 35, height: 35 }}
                            resizeMode="contain"
                        />
                    </Marker>
                ))}
                {Sectors.map((sector) => (
                    <Marker
                        key={sector.id}
                        coordinate={sector.coords}
                        title={sector.name}
                    >
                        <View>
                            <Text className='opacity-65 text-xs'>{sector.name}</Text>
                        </View>
                    </Marker>
                ))}
            </MapView>
            {showView && selectedRestaurant && (
                <View style={styles.bottomView} className='w-fit h-fit px-8 flex-col items-center justify-center gap-8'>
                    <View className='w-full flex-row items-center gap-2'>
                        <Image
                            source={{uri: selectedRestaurant.logo}}
                            style={{width: 55, height: 55, borderRadius: 27.5}}
                            resizeMode="contain"
                        />
                        <View className='flex-col justify-center'>
                            <Text className='font-bold'>{selectedRestaurant.name}</Text>
                            <View className='flex flex-row items-center gap-2'>
                                <Feather name="star" size={20} color="#FFCC00" />
                                <Text>{selectedRestaurant.rating}</Text>
                            </View>
                        </View>
                        <View style={{marginLeft: 24}}>
                            <Text className='text-right'>{selectedRestaurant.workingHours}</Text>
                        </View>
                    </View>
                    <TouchableOpacity className='w-full mx-auto rounded-xl bg-red-main py-5' onPress={() => {
                        router.push(`/restaurant_profile?id=${selectedRestaurant.id}`)
                    }}>
                        <Text className='text-center text-white'>VER PERFIL COMPLETO</Text>
                    </TouchableOpacity>
                </View>
            )}
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
    bottomView: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        elevation: 5,
        paddingVertical: 36,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      },
});
