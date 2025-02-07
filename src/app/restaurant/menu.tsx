import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { Footer } from "@/src/components/restaurant/footer";
import { Products } from "@/src/components/client/productsList";
import LOCAL_IP from "@/config";
import BackArrow from "@/src/components/shared/backArrow";
import { AntDesign } from "@expo/vector-icons";

export default function Menu() {
  const [restaurantId, setRestaurantId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurantProfile = async () => {
      try {
        const response = await fetch(`${LOCAL_IP}/restaurantProfile`); 
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setRestaurantId(data[0].id); 
        } else {
          console.error("Dados inválidos ou array vazio recebido.");
        }
      } catch (error) {
        console.error("Erro ao buscar perfil do restaurante:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchRestaurantProfile();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#EF2A39" />
        <Text>Carregando...</Text>
      </View>
    );
  }

  if (!restaurantId) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Não foi possível carregar o perfil do restaurante.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <BackArrow color="black" title="Meu cardápio" route="/restaurant" />
      <View className="flex-1 justify-center">
      <View className="flex-row items-center mx-4 gap-2">
                        <TouchableOpacity
                            className="w-48 flex-row justify-center gap-2 py-4 rounded-xl bg-off-white"
                        >
                            <Text className="font-bold text-center text-black-gray">
                                Ordenar por
                            </Text>
                            <AntDesign name="down" size={16} color="#EF2A39" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            className="w-24 flex-row justify-center gap-2 py-4 rounded-xl bg-off-white"
                        >
                            <Text className="font-bold text-center text-black-gray">
                                Todos
                            </Text>
                            <AntDesign name='down' size={16} color="#EF2A39" />
                        </TouchableOpacity>
                    </View>
        <Products restaurantId={restaurantId} showFilters={false} showHeartIcon={false} type="restaurant" />
      </View>
      <Footer />
    </View>
  );
}
