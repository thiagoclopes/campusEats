import { Text, TouchableOpacity, View } from 'react-native';
import BackArrow from '../components/backArrow';
import { Footer } from '../components/footer';

export default function Orders() {
  return (
  <View className='flex-1'>
    <View className='flex-1'>
      <BackArrow color='black' title='Histórico de pedidos' route='/'/>
    </View>
    <Footer/>
  </View>);
}
