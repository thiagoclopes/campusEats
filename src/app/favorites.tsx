import { ScrollView, View } from 'react-native';
import BackArrow from '../components/backArrow';
import { Footer } from '../components/footer';
import { Products } from '../components/productsList';

export default function Favorites() {
  return (
  <View className='flex-1'>
    <View className='flex-1'>
      <BackArrow color='black' title='Favoritos' route='/profile'/>
      <ScrollView 
              style={{ flex: 1}}
              className="bg-white"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 1 }}
            >
              <Products showFavorites={true}/>
            </ScrollView>
    </View>
    <Footer/>
  </View>);
}
