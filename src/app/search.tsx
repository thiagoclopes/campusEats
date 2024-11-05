import { Text, TouchableOpacity, View } from 'react-native';
import BackArrow from '../components/backArrow';
import { Footer } from '../components/footer';


export default function Search() {
  return (
  <View className='flex-1'>
    <View className='flex-1'>
      <BackArrow />
      <Text>SEARCH</Text>
    </View>
    <Footer/>
  </View>);
}
