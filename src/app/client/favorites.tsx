import { ScrollView, View } from 'react-native';
import BackArrow from '../../components/shared/backArrow';
import { Footer } from '../../components/client/footer';
import { Products } from '../../components/client/productsList';

export default function Favorites() {
  return (
  <View className='flex-1'>
    <View className='flex-1'>
      <BackArrow color='black' title='Favoritos' route='/client/profile'/>
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
