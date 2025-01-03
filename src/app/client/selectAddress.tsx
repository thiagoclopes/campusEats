import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar, Text, TouchableOpacity, View, StyleSheet, TextInput, FlatList, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import BackArrow from '../../components/shared/backArrow';
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
    const [selectedPoint, setSelectedPoint] = useState<ReferencePoint | null>(null); 
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
        setSelectedPoint(point);
        setSearchQuery(''); // Clear the search input after selecting a point
    };

    const handleConfirmSelection = () => {
        if (selectedPoint) {
            router.push({
                pathname: '/client/cart',
                params: { 
                    pointName: selectedPoint.name,
                    latitudeParam: String(selectedPoint.coords.latitude),
                    longitudeParam: String(selectedPoint.coords.longitude)
                },
            });
        } else {
            alert('Selecione um setor primeiro!');
        }
    };

    const handleInputFocus = () => {
        if (selectedPoint) {
            setSearchQuery(''); // Clear the selected point when the user focuses on the input to search again
            setSelectedPoint(null); // Optionally reset the selected point
        }
    };

    return (
        <View className='w-full flex flex-col bg-red-main flex-1'>
            <StatusBar backgroundColor="#EF2A39" barStyle="light-content" />
            <BackArrow color='white' title='Selecionar endereço'/>

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1"
            >
            
            <View className='w-full flex-1 rounded-t-3xl bg-white'>
                <View style={styles.container}>
                    <View className='shadow-xl' style={styles.searchContainer} >
                        <Text className='text-center font-semibold text-2xl'>Localização</Text>
                        <TextInput
                            className=" bg-white-gray w-[90%] mx-auto mt-6 mb-6 p-4 rounded-lg border border-gray-300"
                            placeholder="Pesquisar setor..."
                            value={selectedPoint ? selectedPoint.name : searchQuery} // Show selected point name or search query
                            onChangeText={setSearchQuery}
                            onFocus={handleInputFocus} // Clear the input and reset selected point on focus
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

                        <TouchableOpacity 
                            className="h-12 w-[90%] mx-auto rounded-2xl bg-red-main flex items-center justify-center"
                            onPress={handleConfirmSelection}
                        >
                            <Text className="text-xl text-white">Confirmar</Text>
                        </TouchableOpacity>
                    </View>
                    
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
                                className='w-32 h-10 bg-slate-600'
                            >
                                
                                <View className="items-center absolute z-10">
                                    
                                    <FontAwesome name="map-pin" size={24} color={selectedPoint?.id === point.id ? 'green' : 'red'} />
                                </View>
                            </Marker>
                        ))}
                    </MapView>
                </View>
            </View>
        </KeyboardAvoidingView>
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
    searchContainer: {
        position: 'absolute',
        justifyContent: 'center',
        width: '100%',
        bottom: 0,
        zIndex: 10,
        backgroundColor: 'white',
        paddingHorizontal: 6,
        paddingVertical: 32,
        borderRadius: 14,
        elevation: 3,
    },
    suggestionList: {
        borderWidth: 1,
        width: '90%',
        left: '5%',
        zIndex: 10,
        backgroundColor: 'white',
        borderRadius: 8,
        elevation: 3,
        maxHeight: 150,
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
