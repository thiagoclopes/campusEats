import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import BackArrow from '../components/backArrow';

export default function Chat() {
  return (
  <View>
    <StatusBar backgroundColor="white" barStyle="dark-content" />
    <BackArrow />
    <Text>CHAT LIST</Text>
    <Pressable className="h-10 flex justify-center items-center bg-red-main" onPress={() => router.push('/chat')}>
        <Text>ABRIR CHAT 1</Text>
    </Pressable>
  </View>);
}