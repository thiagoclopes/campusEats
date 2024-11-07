import { Text, TouchableOpacity, View } from 'react-native';
import BackArrow from '../components/backArrow';
import { Footer } from '../components/footer';

export default function Notifications() {
  return (
  <View className='flex-1'>
    <View className='flex-1'>
      <BackArrow />

      <View className='bg-white-80 w-[90%] mx-auto rounded-xl p-4 shadow-sm'>
        <Text className='text-black font-medium text-2xl ml-4'>Campus Eats</Text>
        <Text className='text-black-gray font-regular text-xl ml-4'>Seu pedido saiu para entrega!</Text>
      </View>

    </View>
    <Footer/>
  </View>);
}
