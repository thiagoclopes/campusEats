import { Text, View, TouchableOpacity } from 'react-native';
import { Octicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function PrivacyPolicyPopUp() {

  return (
    <View className="flex-1 bg-white-80 items-center justify-center"> 
      <View className="bg-white rounded-2xl shadow-lg p-10 w-[82%] items-center">
        <Octicons name="alert" size={90} color="#EF2A39" />
        <Text className="text-3xl font-bold text-red-main text-center mt-5">Atenção!</Text>
        <Text className="text-lg font-regular text-black-gray text-center mt-2 w-full">
          Você precisa concordar com os termos e políticas para continuar usando o app
        </Text> 
        <TouchableOpacity onPress={() => router.push('/privacyPolicy')}
          className="bg-red-main rounded-2xl py-5 px-8 mt-12"> 
          <Text className="text-white text-lg text-center font-semibold">VOLTAR E CONCORDAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
