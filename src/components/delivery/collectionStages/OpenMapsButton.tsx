import { FontAwesome5 } from "@expo/vector-icons"; 
import React from "react";
import { TouchableOpacity, Text, Alert } from "react-native";
import * as Linking from "expo-linking";

interface OpenMapsButtonProps {
    latitude: number;
    longitude: number;
}

export default function OpenMapsButton({ latitude, longitude }: OpenMapsButtonProps) {
    const handleOpenMaps = async () => {
        if (!latitude || !longitude) {
            Alert.alert("Erro", "Coordenadas inválidas");
            return;
        }

        const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

        try {
            await Linking.openURL(mapsUrl);
        } catch (error) {
            Alert.alert("Erro", "Não foi possível abrir o aplicativo de mapas.");
        }
    };

    return (
        <TouchableOpacity 
            onPress={handleOpenMaps}
            className="flex-row items-center justify-center gap-2 bg-red-main p-3 rounded-lg"
        >
            <Text className="text-white text-xs font-semibold">VER ROTA</Text>
            <FontAwesome5 name="route" size={16} color="white" />
        </TouchableOpacity>
    );
}
