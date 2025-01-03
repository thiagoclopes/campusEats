import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator  } from "react-native";
import MapView, {Region } from "react-native-maps";
import { getCurrentPositionAsync, Accuracy } from "expo-location";
import * as Location from 'expo-location';
import { Entypo, Feather, FontAwesome6 } from "@expo/vector-icons";
import Sidebar from "@/src/components/delivery/sidebar";

export default function DeliveryHome() {
  const [region, setRegion] = useState<Region | null>(null);
  const [isOnline, setIsOnline] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  const handleToggleOnlineStatus = () => {
	setIsOnline((prevState) => !prevState);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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
		{isSidebarOpen && (
        <View style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          backgroundColor: 'rgba(0, 0, 0, 0.5)', 
          zIndex: 3
        }} />
      )}
		<TouchableOpacity 
			className="absolute z-10 top-5 left-5 w-16 h-16 bg-red-main flex items-center justify-center rounded-full"
			onPress={toggleSidebar}
		>
			<Entypo name="menu" size={36} color="white"/>
		</TouchableOpacity>
		<Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />

		{!isOnline && (
			<TouchableOpacity 
				className="absolute z-10 top-5 right-5 w-16 h-16 bg-red-main flex items-center justify-center rounded-full"
				onPress={toggleSidebar}
				style={{ zIndex: 2}}
			>
				<Entypo name="magnifying-glass" size={36} color="white"/>
			</TouchableOpacity>
		)}

		<MapView
			style={{ flex: 1 }}
			region={region}
			showsUserLocation={true}
			showsCompass={false}
			showsMyLocationButton={false}
			followsUserLocation={true}
			loadingEnabled={true}
		/>
		<TouchableOpacity
			className={`absolute bottom-36 left-1/2 transform -translate-x-1/2 h-24 w-24 rounded-full items-center justify-center ${!isOnline ? 'bg-red-main' : 'bg-gray-300'}`}
			onPress={handleToggleOnlineStatus}
		>
			{!isOnline? (
				<Text className="text-white text-lg font-semibold">INICIAR</Text>
			) : (
				<Feather name="x" size={42} color="white" />
			)}
		</TouchableOpacity>

		<View className="absolute bottom-0 left-0 right-0 h-32 p-8 rounded-3xl shadow-md flex flex-row items-center justify-between bg-white">
			{!isOnline ? (
				<>
					<TouchableOpacity className="w-[20%]">
						<FontAwesome6 name="sliders" size={24} color="black" />
					</TouchableOpacity>
					<Text className="text-center font-semibold text-xl flex-1">Você está offline</Text>
					<View className="w-[20%]" />
				</>
			) : (
				<View className="flex flex-col items-center justify-center w-full flex-1">
					<ActivityIndicator color="red" size="small" />
					<Text className="text-center font-semibold text-xl mt-2">Procurando Viagens</Text>
				</View>
			)}
			
		</View>
	</View>
  );
  
}