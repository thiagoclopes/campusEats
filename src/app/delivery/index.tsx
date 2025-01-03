import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet  } from "react-native";
import MapView, {Region } from "react-native-maps";
import { getCurrentPositionAsync, Accuracy } from "expo-location";
import * as Location from 'expo-location';
import { Entypo, FontAwesome6 } from "@expo/vector-icons";

export default function DeliveryHome() {
  const [region, setRegion] = useState<Region | null>(null);

  useEffect(() => {
    const getLocation = async () => {
      const { coords } = await getCurrentPositionAsync({
        accuracy: Accuracy.High,
      });
      setRegion({
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    };

    getLocation();
  }, []);

  const requestLocationPermission = async () => {
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status === 'granted') {
              console.log('You can use the Location');
          } else {
              console.log('Location permission denied');
          }
      };

  useEffect(() => {
          requestLocationPermission();
      }, []);

  if (!region) {
    return <Text>Loading...</Text>;
  }

  return (
	<View style={{ flex: 1 }}>
		<TouchableOpacity className="absolute z-10 top-5 left-5 w-16 h-16 bg-red-main flex items-center justify-center rounded-full">
			<Entypo name="menu" size={36} color="white"/>
		</TouchableOpacity>
		<MapView
			style={{ flex: 1 }}
			region={region}
			showsUserLocation={true}
			showsCompass={false}
			showsMyLocationButton={false}
			followsUserLocation={true}
			loadingEnabled={true}
		/>
		<View className="absolute bottom-32 left-1/2 transform -translate-x-1/2 h-20 w-20 rounded-full items-center justify-center bg-red-main">
			<Text className="text-white font-semibold">INICIAR</Text>
		</View>
		<View className="absolute bottom-0 left-0 right-0 p-10 rounded-3xl flex flex-row items-center justify-between bg-white">
			<FontAwesome6 name="sliders" size={24} color="black" />
			<Text className="flex-1 text-center">Você está offline</Text>
		</View>
	</View>
  );
  
}