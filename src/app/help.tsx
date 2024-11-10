import { Text, TouchableOpacity, View } from 'react-native';
import BackArrow from '../components/backArrow';
import { Footer } from '../components/footer';

export default function Help() {
  return (
  <View className='flex-1'>
    <View className='flex-1'>
      <View className="flex-row items-center justify-center px-4 py-4">
          <View className="absolute left-1">
            <BackArrow />
          </View>
          <Text className="text-2xl font-medium">Ajuda e suporte</Text>
        </View>
    </View>
    <Footer/>
  </View>);
}
