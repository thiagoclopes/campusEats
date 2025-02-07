import BackArrow from "@/src/components/shared/backArrow";
import React, { useEffect, useState } from "react";
import { View, Text, StatusBar, KeyboardAvoidingView, Platform, ScrollView, Image, ActivityIndicator, TouchableOpacity, TextInput } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Entypo } from "@expo/vector-icons";
import LOCAL_IP from "@/config";

interface FoodItem {
    id: string;
    name: string;
    restaurantId: string;
    rating: string;
    isFavorite: boolean;
    category: string;
    url: string;
    price: number;
}

interface Restaurant {
    id: string;
    name: string;
    logo: string;
    rating: number;
}

const fetchProduct = async (id: string) => {
    try {
        const response = await fetch(`${LOCAL_IP}/products/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar produto:', error);
        return null;
    }
};

const fetchRestaurant = async (id: string) => {
    try {
        const response = await fetch(`${LOCAL_IP}/restaurants/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar restaurante:', error);
        return null;
    }
};

export default function editProduct() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();
    const [product, setProduct] = useState<FoodItem | null>(null);
    const [loading, setLoading] = useState(true);
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const getProductData = async () => {
            if (id) {
                const fetchedProduct = await fetchProduct(id);
                if (fetchedProduct) {
                    const fetchedRestaurant = await fetchRestaurant(fetchedProduct.restaurantId);
                    setProduct(fetchedProduct);
                    setRestaurant(fetchedRestaurant);
                }
            }
            setLoading(false);
        };
        getProductData();
    }, [id]);

    if (product === null) return null;

    async function handleSave() {
        if (!product) return;
        try {
          const response = await fetch(`${LOCAL_IP}/products/${id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
          });
    
          if (response.ok) {
            setIsEditing(false);
          } else {
            alert("Erro ao atualizar produto.");
          }
        } catch (error) {
          console.error("Erro ao salvar produto:", error);
          alert("Erro ao salvar produto.");
        }
      }

    return (
        <View className="flex flex-1">
            <StatusBar backgroundColor="white" barStyle="dark-content" />
            <BackArrow color='black' route='/restaurant/menu' />

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1"
            >
                <ScrollView
                    style={{ flex: 1 }}
                    className="bg-white"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <View className="w-full">
                        <View className="w-full h-72 relative">
                            {loading && (
                                <ActivityIndicator
                                    size="large"
                                    color="#0000ff"
                                    className="absolute top-1/2 left-1/2"
                                    style={{ transform: [{ translateX: -10 }, { translateY: -10 }] }}
                                />
                            )}
                            <Image
                                source={{ uri: product.url }}
                                style={{ width: '100%', height: 280, resizeMode: 'cover' }}
                            />
                        </View>

                        <View className="h-full mt-6 rounded-t-3xl px-4 bg-white shadow-lg py-4">
                            <View className='flex w-full p-4 justify-between'>
                                <Text className="font-semibold ml-4 mb-2">Nome</Text>
                                <TextInput
                                    value={product.name}
                                    editable={isEditing}
                                    onChangeText={(text) => setProduct({ ...product, name: text })}
                                    className={`h-14 px-6 w-full rounded-xl border ${isEditing ? "border-blue-500" : "border-gray-line"
                                        } flex justify-center`}
                                />

                                <Text className="font-semibold mt-4 ml-4 mb-2">Descrição</Text>
                                <TextInput
                                    value={product.rating}
                                    editable={isEditing}
                                    onChangeText={(text) => setProduct({ ...product, rating: text })}
                                    className={`h-14 px-6 w-full rounded-xl border ${isEditing ? "border-blue-500" : "border-gray-line"
                                        } flex justify-center`}
                                />
                                <Text className="font-semibold mt-4 ml-4 mb-2">Categoria</Text>
                                <TextInput
                                    value={product.category}
                                    editable={isEditing}
                                    onChangeText={(text) => setProduct({ ...product, category: text })}
                                    className={`h-14 px-6 w-full rounded-xl border ${isEditing ? "border-blue-500" : "border-gray-line"
                                        } flex justify-center`}
                                />

                                <View className="flex flex-row justify-between">
                                    <View className="w-[48%]">
                                        <Text className="font-semibold mt-4 ml-4 mb-2">Preço</Text>
                                        <TextInput
                                            value={product.price.toString()}
                                            editable={isEditing}
                                            keyboardType="numeric"
                                            onChangeText={(text) => setProduct({ ...product, price: parseFloat(text) || 0 })}
                                            className={`h-14 px-6 w-full rounded-xl border ${isEditing ? "border-blue-500" : "border-gray-line"
                                                } flex justify-center`}
                                        />
                                    </View>
                                    <View className="w-[48%]">
                                        <Text className="font-semibold mt-4 ml-4 mb-2">Tempo estimado</Text>
                                        <TextInput
                                            value={product.category}
                                            editable={isEditing}
                                            onChangeText={(text) => setProduct({ ...product, category: text })}
                                            className={`h-14 px-6 w-full rounded-xl border ${isEditing ? "border-blue-500" : "border-gray-line"
                                                } flex justify-center`}
                                        />
                                    </View>
                                </View>
                            </View>

                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            <View
                style={{
                    height: 100,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    backgroundColor: 'white',
                }}>
                {isEditing ? (
                    <TouchableOpacity
                        className="w-[55%] shadow-sm rounded-xl bg-red-main py-5"
                        onPress={handleSave}
                    >
                        <Text className={'text-center font-semibold text-white'}>SALVAR</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        className="w-[55%] shadow-sm rounded-xl bg-black-gray py-5"
                        onPress={() => setIsEditing(true)}
                    >
                        <Text className="text-center text-white">Editar Perfil</Text>
                    </TouchableOpacity>
                )}
            </View>

        </View>
    )
}