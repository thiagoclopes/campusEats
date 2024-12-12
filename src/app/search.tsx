import { Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import BackArrow from '../components/backArrow';
import { Footer } from '../components/footer';


export default function Search() {
  
  return (
  <View className='flex-1'>
    <View className='flex-1'>
      <BackArrow color='black' title='Pesquisar' route='/'/>

    </View>
    <Footer/>
  </View>);
}
