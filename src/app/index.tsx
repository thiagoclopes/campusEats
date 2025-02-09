import { View, Text } from "react-native";
import { Link } from "expo-router";
import CourierStatusSheet from "../components/delivery/courierStatusSheet";
import { useState } from "react";
import React from "react";

export default function Home() {    
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-xl font-bold mb-5">Bem-vindo ao CampusEats</Text>
      <View className="w-4/5 items-center">
        <Link href="/client" className="w-full mb-4">
          <View className="p-4 border border-gray-500 rounded-lg items-center">
            <Text className="text-base">Entrar como Cliente</Text>
          </View>
        </Link>

        <Link href="/delivery" className="w-full mb-4">
          <View className="p-4 border border-gray-500 rounded-lg items-center">
            <Text className="text-base">Entrar como Entregador</Text>
          </View>
        </Link>

        <Link href="/restaurant" className="w-full mb-4">
          <View className="p-4 border border-gray-500 rounded-lg items-center">
            <Text className="text-base">Entrar como Restaurante</Text>
          </View>
        </Link>
      </View>
    </View>
  );
}
