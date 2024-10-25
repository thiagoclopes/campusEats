import { Image, Text, TouchableOpacity, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Constants from 'expo-constants';
import { router } from 'expo-router';

export default function Product() {
  return (
  <View className='h-full flex-1 bg-white'>
    <TouchableOpacity onPress={() => router.push('/')}>
        <AntDesign name="arrowleft" size={24} color="black" className='p-2'/>
    </TouchableOpacity>
    <View className='h-[40%]'>
        <Image
            source={{ uri: 'https://d2umxhib5z7frz.cloudfront.net/Brasil/9600337_mop_1.png' }} 
            className="w-full h-full" 
            style={{ resizeMode: 'cover' }}
        />
    </View>
    <View className='flex h-full w-full p-4 rounded-t-3xl'>
        <Text className='text-2xl'>X - Burger</Text>
    </View>
    <View className='flex flex-row justify-between p-8 w-full absolute bottom-0'>
        <View className='flex flex-col items-center justify-center'>
            <Text className='text-slate-500'>Total:</Text>
            <Text className='font-bold'>R$ 20,00</Text>
        </View>
        <TouchableOpacity
            className={'w-[70%] rounded-xl'}
            >
            <Text className={'text-center text-white bg-red-main py-5 rounded-2xl'}>
                ADICIONAR AO CARRINHO
            </Text>
        </TouchableOpacity>
    </View>
  </View>);
}
