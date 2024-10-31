import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import BackArrow from '../components/backArrow';

export default function Cart() {
  return (
  <View className='w-full h-full absolute bg-red-main'>
    <BackArrow />
    <View className='px-4 mt-10 bg-slate-600'>
      <Text>Carrinho </Text>
    </View>
    <View className='mt-4 rounded-t-3xl p-6 h-full bg-white'><Text>gadsjdskla</Text></View>
  </View>);
}
