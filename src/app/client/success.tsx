import { Text, View, Image, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Octicons } from '@expo/vector-icons';
import axios from 'axios';
import LOCAL_IP from '@/config';

export default function Success() {

  return (
    <View className="flex-1 bg-white-80 items-center justify-center"> 
      <View className="bg-white rounded-2xl shadow-lg p-10 w-[82%] items-center">
        <Octicons name="check-circle-fill" size={90} color="#EF2A39" />
        <Text className="text-3xl font-bold text-red-main text-center mt-5">Sucesso!</Text>
        <Text className="text-lg font-regular text-black-gray text-center mt-2 w-full">
          Seu pagamento foi aceito.
        </Text> 
        <TouchableOpacity 
          className="bg-red-main rounded-2xl py-5 px-8 mt-12" 
          onPress={() => router.push(`/client/orderDetails`)}
        > 
          <Text className="text-white text-lg text-center font-semibold">Aguardar pedido</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
