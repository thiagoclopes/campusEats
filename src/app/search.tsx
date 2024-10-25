import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

export default function Search() {
  return (
  <View>
    <TouchableOpacity onPress={() => router.push('/')}>
        <AntDesign name="arrowleft" size={24} color="black" className='p-2'/>
    </TouchableOpacity>
    <Text>SEARCH </Text>
  </View>);
}
