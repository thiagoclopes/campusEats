import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Footer } from "@/src/components/restaurant/footer";
import React from "react";
import { Header } from "../../components/shared/header";
import { AntDesign } from "@expo/vector-icons";

export default function RestaurantHome() {
  return (
    <View className="flex-1">
      <ScrollView
        style={{ flex: 1 }}
        className="bg-white"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="w-full px-4">
          <Header />

          <View className="mt-10">
          <View className="flex justify-end">
            <TouchableOpacity className="flex flex-row items-center mb-4 bg-gray-line rounded-lg px-4 py-2 w-24">
                <Text className="text-center">Mês</Text>
                <AntDesign name="down" size={16} color="black" style={{ marginLeft: 4 }} />
              </TouchableOpacity>
          </View>
            <View className="flex flex-col elevation-md rounded-md px-4 py-6 bg-white shadow-sm mb-4">
              <View className="flex flex-row justify-between ">
                <View className="">
                  <Text className="font-medium text-lg">Receita total</Text>
                  <Text className="font-bold text-2xl">R$ 563,80</Text>
                  <Text className="text-sm">+2k em relação ao mês passado</Text>
                </View>
                <View className="d-flex absolute right-0 top-0 bg-green-400 rounded-lg px-6">
                  <Text className="text-green-700 ">Pronto</Text>
                </View>
              </View>
            </View>
            <View className="flex flex-col elevation-md rounded-md px-4 py-6 bg-white shadow-sm mb-4">
              <View className="flex flex-row justify-between ">
                <View className="">
                  <Text className="font-medium text-lg">Pedidos</Text>
                  <Text className="font-bold text-2xl">58</Text>
                  <Text className="text-sm">-1% em relação ao mês passado</Text>
                </View>
                <View className="d-flex absolute right-0 top-0 bg-green-400 rounded-lg px-6">
                  <Text className="text-green-700 ">Pronto</Text>
                </View>
              </View>
            </View>
            <View className="flex flex-col elevation-md rounded-md px-4 py-6 bg-white shadow-sm mb-4">
              <View className="flex flex-row justify-between ">
                <View className="">
                  <Text className="font-medium text-lg">Cancelamentos</Text>
                  <Text className="font-bold text-2xl">3</Text>
                  <Text className="text-sm">-3% em relação ao mês passado</Text>
                </View>
                <View className="d-flex absolute right-0 top-0 bg-green-400 rounded-lg px-6">
                  <Text className="text-green-700 ">Pronto</Text>
                </View>
              </View>
            </View>
            <View className="flex flex-col elevation-md rounded-md px-4 py-6 bg-white shadow-sm mb-4">
              <View className="flex flex-row justify-between ">
                <View className="">
                  <Text className="font-medium text-lg">Produtos populares</Text>
                </View>
              </View>
            </View>
          </View>



        </View>
      </ScrollView>
      <Footer />
    </View>
  );
}
