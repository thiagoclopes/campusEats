import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import { AntDesign, Entypo, FontAwesome5 } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router } from 'expo-router';
import * as Location from 'expo-location';
import { Asset } from 'expo-asset';

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

interface Sector {
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


const Sectors: Sector[] = [
    {
        id: 1,
        name: 'Setor I', 
        description: 'Próximo à entrada principal e de fácil acesso.',
        coords: { latitude: -5.8374872488393645, longitude: -35.199658102831926 },
    },
    {
        id: 2,
        name: 'Setor II',
        description: 'Área de convivência com mesas e bancos para os estudantes.',
        coords: { latitude: -5.840452832201686, longitude: -35.19724725069943 },
    },
    {
        id: 3,
        name: 'Setor III',
        description: 'Ponto central próximo à administração da UFRN.',
        coords: { latitude: -5.840709167986833, longitude: -35.20058612478776 },
    },
    {
        id: 4,
        name: 'Setor IV', 
        description: 'Perto do Instituto de Física e Departamento de Matemática.',
        coords: { latitude: -5.842412943228999, longitude: -35.19972013385473 },
    },
    {
        id: 5,
        name: 'Escola de Ciência e Tecnologia (ECT)',
        description: 'Área com movimentação frequente de estudantes.',
        coords: { latitude: -5.843395493045956, longitude: -35.199395317946305 },
    },
    {
        id: 6,
        name: 'Setor V', 
        description: '.',
        coords: { latitude: -5.838337951119542, longitude: -35.19796197544989 },
    },
];

export default function MapScreen() {
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

    const customMapStyle = [
        { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#e0e0e0" }] },
        { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }] },
        { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#b0d0d0" }] },
        { "featureType": "poi", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }
    ];

    const customRestaurantPin = Asset.fromModule(require('../assets/custom_pin.png')).uri;
    const customSectorPin = Asset.fromModule(require('../assets/custom_sector_pin.png')).uri;
    const [showView, setShowView] = useState(false);

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="white" barStyle="dark-content" />
            <TouchableOpacity onPress={() => router.push('/')} className="absolute p-3 z-10 bg-white/50 rounded-sm m-3">
                <AntDesign name="arrowleft" size={20} color='black' style={{ opacity: 0.6 }} />
            </TouchableOpacity>

            <MapView
                mapType="standard"
                showsCompass={false}
                style={styles.map}
                initialRegion={initialRegion}
                showsUserLocation={true}
                customMapStyle = {customMapStyle}
            >
                {restaurants.map((restaurant) => (
                    <Marker
                        key={restaurant.id}
                        coordinate={restaurant.coords}
                        title={restaurant.name}
                        description={restaurant.description}
                        onPress={() => {
                            setShowView(true);
                        }}
                        onDeselect={() => {
                        // Esconde a view quando o marcador é desmarcado
                        setShowView(false);
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
                            <Image 
                                source={{ uri: customSectorPin }}
                                style={{ width: 35, height: 35 }}
                                resizeMode="contain"
                            />
                        </View>
                    </Marker>
                ))}
            </MapView>
            {showView && (
                <View style={styles.bottomView}>
                <Text>Informações do marcador</Text>
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
        padding: 20,
        elevation: 5,
      },
});
