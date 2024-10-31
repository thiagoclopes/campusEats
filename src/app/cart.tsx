import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import BackArrow from '../components/backArrow';

export default function Cart() {
  return (
  <View>
    <BackArrow />
    <Text>Carrinho </Text>
  </View>);
}
