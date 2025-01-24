import { View, Text, KeyboardAvoidingView, ScrollView, TouchableOpacity, TextInput, Image, StatusBar, Platform } from "react-native";
import BackArrow from '../../components/shared/backArrow';
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import LOCAL_IP from "@/config";
import { FontAwesome, Octicons } from "@expo/vector-icons";

export default function RestaurantProfile(){
    const [restaurantProfile, setRestaurantProfile] = useState({
        id: "",
        name: "",
        email: "",
        category: "",
        workingHours: "",
        whatsapp: "",
        instagram: ""
      });
      const [isEditing, setIsEditing] = useState(false);
      const router = useRouter();
    
      useEffect(() => {
        async function fetchRestaurantProfile() {
          try {
            const response = await fetch(`${LOCAL_IP}/restaurantProfile`);
            const restaurantProfileData = await response.json();
            if (restaurantProfileData.length > 0) {
              setRestaurantProfile(restaurantProfileData[0]);
            }
          } catch (error) {
            console.error("Erro ao buscar perfil:", error);
          }
        }
    
        fetchRestaurantProfile();
      }, []);
    
      async function handleSave() {
        try {
          const response = await fetch(`${LOCAL_IP}/restaurantProfile/${restaurantProfile.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(restaurantProfile),
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
            <View className="flex-row justify-around mt-16">
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
							<Text className="text-lg font-bold text-gray-700 ml-2 mt-2">Fox</Text>
							<Text className="text-gray-600">OWD-5868</Text>
						</View>
					</View>

              <Text className="font-semibold mt-10 ml-4 mb-2">Nome</Text>
              <TextInput
                value={restaurantProfile.name}
                editable={isEditing}
                onChangeText={(text) => setRestaurantProfile({ ...restaurantProfile, name: text })}
                className={`h-14 px-6 w-full rounded-xl border ${
                  isEditing ? "border-blue-500" : "border-gray-line"
                } flex justify-center`}
              />
              <Text className="font-semibold mt-4 ml-4 mb-2">Email</Text>
              <TextInput
                value={restaurantProfile.email}
                editable={isEditing}
                onChangeText={(text) => setRestaurantProfile({ ...restaurantProfile, email: text })}
                className={`h-14 px-6 w-full rounded-xl border ${
                  isEditing ? "border-blue-500" : "border-gray-line"
                } flex justify-center`}
              />
              <Text className="font-semibold mt-4 ml-4 mb-2">Categoria</Text>
              <TextInput
                value={restaurantProfile.category}
                editable={isEditing}
                onChangeText={(text) => setRestaurantProfile({ ...restaurantProfile, category: text })}
                className={`h-14 px-6 w-full rounded-xl border ${
                  isEditing ? "border-blue-500" : "border-gray-line"
                } flex justify-center`}
              />
              <Text className="font-semibold mt-4 ml-4 mb-2">Horário de funcionamento</Text>
              <TextInput
                value={restaurantProfile.workingHours}
                editable={isEditing}
                onChangeText={(text) => setRestaurantProfile({ ...restaurantProfile, workingHours: text })}
                className={`h-14 px-6 w-full rounded-xl border ${
                  isEditing ? "border-blue-500" : "border-gray-line"
                } flex justify-center`}
              />
              <Text className="font-semibold mt-4 ml-4 mb-2">Instagram</Text>
              <TextInput
                value={restaurantProfile.instagram}
                editable={isEditing}
                onChangeText={(text) => setRestaurantProfile({ ...restaurantProfile, instagram: text })}
                className={`h-14 px-6 w-full rounded-xl border ${
                  isEditing ? "border-blue-500" : "border-gray-line"
                } flex justify-center`}
              />
              <Text className="font-semibold mt-4 ml-4 mb-2">Telefone</Text>
              <TextInput
                value={restaurantProfile.whatsapp}
                editable={isEditing}
                onChangeText={(text) => setRestaurantProfile({ ...restaurantProfile, whatsapp: text })}
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