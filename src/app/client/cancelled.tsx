import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

export default function Cancelled() {
  return (
    <View className="flex-1 bg-white-80 items-center justify-center">
      <View className="bg-white rounded-2xl shadow-lg py-16 px-10 w-[82%] items-center">
        <Image source={require('@/src/assets/chameleon.jpg')} style={{ width: 150, height: 150, borderRadius: 45 }} />


        <Text className="text-3xl font-bold text-red-main text-center mt-5">Pedido cancelado</Text>


          <TouchableOpacity
            className="bg-black-gray rounded-2xl py-5 w-64 mt-12"
            onPress={() => router.push(`/client`)}
          >
            <Text className="text-white text-lg text-center font-semibold">Voltar</Text>
          </TouchableOpacity>

      </View>
    </View>
  );
}