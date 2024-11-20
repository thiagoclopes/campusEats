import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar, Text, TouchableOpacity, View, StyleSheet, TextInput, FlatList, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import BackArrow from '../components/backArrow';
import { useRouter } from 'expo-router';

interface LocationCoords {
    latitude: number;
    longitude: number;
}

interface ReferencePoint {
    id: number;
    name: string;
    description: string;
    coords: LocationCoords;
}

const referencePoints: ReferencePoint[] = [
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

export default function SelectAddress() {
    const [currentLocation, setCurrentLocation] = useState<LocationCoords | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredPoints, setFilteredPoints] = useState(referencePoints);
    const router = useRouter();

    const requestLocationPermission = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
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
        } catch (error) {
            alert(error);
        }
    };

    useEffect(() => {
        requestLocationPermission();
    }, []);

    useEffect(() => {
        if (searchQuery) {
            const filtered = referencePoints.filter(point =>
                point.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredPoints(filtered);
        } else {
            setFilteredPoints(referencePoints);
        }
    }, [searchQuery]);

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

    const handleSelectPoint = (point: ReferencePoint) => {
        router.push({
            pathname: '/cart',
            params: { 
                pointName: point.name,
                latitudeParam: String(point.coords.latitude),
                longitudeParam: String(point.coords.longitude)
            },
        });
    };

    return (
        <View className='w-full flex flex-col bg-red-main flex-1'>
            <StatusBar backgroundColor="#EF2A39" barStyle="light-content" />
            <View className='w-full flex flex-row items-center justify-between'>
                <BackArrow color='white' route='/'/>
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
                    
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Pesquisar setor..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />

                    {searchQuery.length > 0 && (
                        <ScrollView
                            style={styles.suggestionList}
                            showsVerticalScrollIndicator={true}
                        >
                            {filteredPoints.map((item) => (
                                <TouchableOpacity
                                    key={item.id}
                                    style={styles.suggestionItem}
                                    onPress={() => handleSelectPoint(item)}
                                >
                                    <Text style={styles.suggestionText}>{item.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    )}
                    
                    <MapView
                        mapType="standard"
                        showsCompass={false}
                        style={styles.map}
                        initialRegion={initialRegion}
                        showsUserLocation={true}
                        customMapStyle={customMapStyle}
                    >
                        {referencePoints.map((point) => (
                            <Marker
                                key={point.id}
                                coordinate={point.coords}
                                title={point.name}
                                description={point.description}
                                onPress={() => handleSelectPoint(point)}
                            >
                                <View className="items-center">
                                    <Text className="font-bold text-lg mb-1 text-red-main bg-white/50">
                                        {point.name}
                                    </Text>
                                    <FontAwesome name="map-pin" size={28} color="red" />
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
