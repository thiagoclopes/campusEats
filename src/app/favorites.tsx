import { Text, TouchableOpacity, View } from 'react-native';
import BackArrow from '../components/backArrow';
import { Footer } from '../components/footer';

export default function Favorites() {
  return (
  <View className='flex-1'>
    <View className='flex-1'>
      <BackArrow color='black' title='Favorites' route='/profile'/>
    </View>
    <Footer/>
  </View>);
}
