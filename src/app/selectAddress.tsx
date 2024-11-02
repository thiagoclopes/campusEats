import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar, Text, TouchableOpacity, View } from 'react-native';
import BackArrow from '../components/backArrow';

export default function SelectAdress() {
  return (
    <View className='w-full flex flex-col bg-red-main flex-1'>
        <StatusBar backgroundColor="#EF2A39" barStyle="light-content" />
        <View className='w-full flex flex-row items-center justify-between'>
            <BackArrow color='white'/>
        </View>
        <View className="flex flex-row items-center justify-start gap-8 mt-8 p-8">
            <View className="flex flex-col gap-1 pb-2">
                <Text className="text-2xl text-white text-center p-2">Endereço de entrega</Text>
            </View>
        </View>
        
        <View className='w-full flex-1 rounded-t-3xl px-4 bg-white'>
            <View style={{ width: '100%'}}>
            </View>
        </View>
        
        
    </View>
  );
}
