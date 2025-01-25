import { View, Text, KeyboardAvoidingView, ScrollView, TouchableOpacity, TextInput, Image, StatusBar, Platform } from "react-native";
import BackArrow from '../../components/shared/backArrow';
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import LOCAL_IP from "@/config";
import { FontAwesome, Ionicons, Octicons } from "@expo/vector-icons";

export default function CourierProfile(){
    const [courierProfile, setCourierProfile] = useState({
        id: "",
        name: "",
        email: "",
        phone: "",
        vehicle: "",
        vehicleName: "",
        vehiclePlate: "",
        avaliation: 0
      });
      const [isEditing, setIsEditing] = useState(false);
      const router = useRouter();
    
      useEffect(() => {
        async function fetchCourierProfile() {
          try {
            const response = await fetch(`${LOCAL_IP}/courierProfile`);
            const courierProfileData = await response.json();
            if (courierProfileData.length > 0) {
              setCourierProfile(courierProfileData[0]);
            }
          } catch (error) {
            console.error("Erro ao buscar perfil:", error);
          }
        }
    
        fetchCourierProfile();
      }, []);
    
      async function handleSave() {
        try {
          const response = await fetch(`${LOCAL_IP}/courierProfile/${courierProfile.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(courierProfile),
          });
    
          if (response.ok) {
            setIsEditing(false);
          } else {
            alert("Erro ao atualizar perfil.");
          }
        } catch (error) {
          console.error("Erro ao salvar perfil:", error);
          alert("Erro ao salvar perfil.");
        }
      }

    return(
        <View className="flex-1 bg-red-main">
        <StatusBar backgroundColor="#EF2A39" barStyle="dark-content" />
        <BackArrow color="white" title="Meu Perfil" route="/delivery" />
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView className="flex-1 w-full">
            <View className="mt-6 w-40 h-40 rounded-2xl bg-slate-500 overflow-hidden z-10 mx-auto">
              <Image
                source={{
                  uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
                }}
                style={{ width: "100%", height: "100%" }}
              />
            </View>

            <View className="w-full h-full rounded-t-3xl px-4 -mt-10 bg-white shadow-lg">
              <View className="flex flex-row justify-center mt-14 items-center">
                <Text className="text-center font-semibold text-xl">{courierProfile.name}</Text>
                <Ionicons name="star" size={20} color="#FFD700" className="ml-4"/>
                <Text className="ml-1 font-bold text-xl">{courierProfile.avaliation}</Text>
              </View>
            <View className="flex-row justify-around mt-6">
						<View
							style={{
								width: '45%',
								backgroundColor: '#fff',
								borderRadius: 10,
								padding: 16,
								alignItems: 'center',
								shadowColor: '#000',
								shadowOffset: { width: 0, height: 2 },
								shadowOpacity: 0.2,
								shadowRadius: 4,
								elevation: 5,
							}}
						>
							<Octicons name="package" size={20} color="#EF2A39" />
							<Text className="text-lg font-bold text-gray-700 mt-2">240</Text>
							<Text className="text-gray-600">Entregas</Text>
						</View>

						<View
							style={{
								width: '45%',
								backgroundColor: '#fff',
								borderRadius: 10,
								padding: 16,
								alignItems: 'center',
								shadowColor: '#000',
								shadowOffset: { width: 0, height: 2 },
								shadowOpacity: 0.2,
								shadowRadius: 4,
								elevation: 5,
							}}
						>
							<View className="flex-row items-center">
								{courierProfile.vehicle.toLowerCase() === 'moto' ? (
								<FontAwesome name="motorcycle" size={20} color="#EF2A39" />
								) : courierProfile.vehicle.toLowerCase() === 'carro' ? (
								<FontAwesome name="automobile" size={20} color="#EF2A39" />
								) : courierProfile.vehicle.toLowerCase() === 'bike' ? (
								<FontAwesome name="bicycle" size={20} color="#EF2A39" />
								) : null}
							</View>
							<Text className="text-lg font-bold text-gray-700 ml-2 mt-2">{courierProfile.vehicleName}</Text>
							<Text className="text-gray-600">{courierProfile.vehiclePlate}</Text>
						</View>
					</View>

              <Text className="font-semibold mt-10 ml-4 mb-2">Nome</Text>
              <TextInput
                value={courierProfile.name}
                editable={isEditing}
                onChangeText={(text) => setCourierProfile({ ...courierProfile, name: text })}
                className={`h-14 px-6 w-full rounded-xl border ${
                  isEditing ? "border-blue-500" : "border-gray-line"
                } flex justify-center`}
              />
              <Text className="font-semibold mt-4 ml-4 mb-2">Email</Text>
              <TextInput
                value={courierProfile.email}
                editable={isEditing}
                onChangeText={(text) => setCourierProfile({ ...courierProfile, email: text })}
                className={`h-14 px-6 w-full rounded-xl border ${
                  isEditing ? "border-blue-500" : "border-gray-line"
                } flex justify-center`}
              />
              <Text className="font-semibold mt-4 ml-4 mb-2">Telefone</Text>
              <TextInput
                value={courierProfile.phone}
                editable={isEditing}
                onChangeText={(text) => setCourierProfile({ ...courierProfile, phone: text })}
                className={`h-14 px-6 w-full rounded-xl border ${
                  isEditing ? "border-blue-500" : "border-gray-line"
                } flex justify-center`}
              />
              <Text className="font-semibold mt-4 ml-4 mb-2">Veículo</Text>
              <TextInput
                value={courierProfile.vehicle}
                editable={isEditing}
                onChangeText={(text) => setCourierProfile({ ...courierProfile, vehicle: text })}
                className={`h-14 px-6 w-full rounded-xl border ${
                  isEditing ? "border-blue-500" : "border-gray-line"
                } flex justify-center`}
              />
              <Text className="font-semibold mt-4 ml-4 mb-2">Nome do veículo</Text>
              <TextInput
                value={courierProfile.vehicleName}
                editable={isEditing}
                onChangeText={(text) => setCourierProfile({ ...courierProfile, vehicleName: text })}
                className={`h-14 px-6 w-full rounded-xl border ${
                  isEditing ? "border-blue-500" : "border-gray-line"
                } flex justify-center`}
              />
              <Text className="font-semibold mt-4 ml-4 mb-2">Placa</Text>
              <TextInput
                value={courierProfile.vehiclePlate}
                editable={isEditing}
                onChangeText={(text) => setCourierProfile({ ...courierProfile, vehiclePlate: text })}
                className={`h-14 px-6 w-full rounded-xl border ${
                  isEditing ? "border-blue-500" : "border-gray-line"
                } flex justify-center`}
              />

              {isEditing ? (
                <TouchableOpacity
                  className="flex justify-center mt-4 mb-4 w-[50%] shadow-sm py-2 rounded-full bg-green-500"
                  onPress={handleSave}
                >
                  <Text className="text-center text-white">Salvar</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  className="flex justify-center mt-4 mb-4 w-[50%] shadow-sm py-2 rounded-full bg-black"
                  onPress={() => setIsEditing(true)}
                >
                  <Text className="text-center text-white">Editar Perfil</Text>
                </TouchableOpacity>
              )}
              
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
}