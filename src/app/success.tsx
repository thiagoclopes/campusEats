import { Text, View, Image, TouchableOpacity } from 'react-native';
import BackArrow from '../components/backArrow';
import { router } from 'expo-router';

export default function Success() {
  return (
    <View className="flex-1 bg-white-80 items-center justify-center"> 
      <View className="bg-white rounded-2xl shadow-lg p-6 w-80 items-center">
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }}
          style={{ width: '100%', height: 150, borderRadius: 10 }}
        />
        <Text className="text-3xl font-bold text-red-main text-center mt-4">Sucesso!</Text>
        <Text className="text-lg font-regular text-black-gray text-center mt-2 w-full">Seu pagamento foi aceito. Aguarde seu pedido...</Text> 
        
        <TouchableOpacity className="bg-red-main rounded-2xl p-6 w-[70%] mt-10" onPress={() => router.push('/')}> 
          <Text className="text-white text-center font-bold">Voltar para o menu</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
