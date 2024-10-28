// MapScreen.tsx
import React from 'react';
import { StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import BackArrow from '../components/backArrow';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function MapScreen() {
    const initialRegion = {
        latitude: -5.84341,      // Defina a latitude inicial
        longitude: -35.19939,    // Defina a longitude inicial
        latitudeDelta: 0.01,    
        longitudeDelta: 0.01,
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="white" barStyle="dark-content" />
            <TouchableOpacity onPress={() => router.push('/')} className="absolute p-2 rounded-full z-10">
                <AntDesign name="arrowleft" size={24} color='black' className="p-4" />
            </TouchableOpacity>

            <MapView
                style={styles.map}
                initialRegion={initialRegion}
            >
                <Marker
                    coordinate={{ latitude: -5.84341, longitude: -35.19939 }}
                    title="Meu Local"
                    description="Este é um exemplo de marcador."
                />
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
});
