import { Image, Text, TouchableOpacity, View, TextInput } from 'react-native';
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


    <View className='flex w-full p-4 rounded-t-3xl flex-row justify-between mb-4'>

        <View>
            <Text className='text-xl text-gray font-semibold'>Mc Donald's</Text>
            <Text className='text-3xl font-semibold'>X - Burger</Text>
            <Text className='text-lg mt-2 text-black-gray'>* 4.9 | 26 mins</Text>
        </View>

        <View className='flex flex-row h-24 items-center'>
            <TouchableOpacity className='w-12 h-12 rounded-xl bg-red-main flex items-center justify-center'>
                <Text className='text-white text-2xl font-semibold'>-</Text>
            </TouchableOpacity>
            <Text className='mx-5 text-2xl'>1</Text>
            <TouchableOpacity className='w-12 h-12 rounded-xl bg-red-main flex items-center justify-center'>
                <Text className='text-white text-2xl font-semibold'>+</Text>
            </TouchableOpacity>
        </View>
    </View>

    <View className='mx-auto flex items-center h-30'>
        <Text className='text-black-gray text-lg'>
        O X-Burger é uma deliciosa combinação de ingredientes frescos e saborosos, proporcionando uma experiência irresistível a cada mordida.
        </Text>
    </View>

    <View className='p-4 mt-2'>
        <Text className='text-xl font-semibold'>
            Adicionar observação
        </Text>
        <TextInput 
          className='border border-black-400 rounded-lg p-2' 
          placeholder="..." 
        />
    </View>


    <View className='flex flex-row justify-between p-8 w-full absolute bottom-0'>
        <View className='flex flex-col items-center justify-center'>
            <Text className='text-slate-500 text-xl'>Total:</Text>
            <Text className='font-bold text-2xl'>R$ 20,00</Text>
        </View>
        <TouchableOpacity
            className={'w-[65%] rounded-xl bg-red-main py-5'}
            >
            <Text className={'text-center text-white'}>
                ADICIONAR AO CARRINHO
            </Text>
        </TouchableOpacity>
    </View>
  </View>);
}
