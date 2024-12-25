import { useEffect, useState } from 'react';
import { FlatList, Pressable, StatusBar, Text, View, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Footer } from '../components/footer';
import LOCAL_IP from '@/config';
import BackArrow from '../components/backArrow';
import ChameleonWarning from '../components/chameleonWarning';

interface Restaurant {
  id: string;
  name: string;
  logo: string;
}

interface Message {
  id: string;
  restaurantId: string;
  sender: string;
  text: string;
  timestamp: string;
}

interface Chat {
  restaurantId: string;
  restaurantName: string;
}

interface ChatItem {
  id: string;
  lastMessage: string;
  timestamp: string;
  restaurantName: string;
  restaurantImage: string; 
}

export default function ChatList() {
  const [chatList, setChatList] = useState<ChatItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchChatData() {
      try {
        const [chatListResponse, messagesResponse, restaurantsResponse] = await Promise.all([
          fetch(`${LOCAL_IP}/chatList`),
          fetch(`${LOCAL_IP}/messages`),
          fetch(`${LOCAL_IP}/restaurants`),
        ]);

        const chatListData: Chat[] = await chatListResponse.json();
        const messages: Message[] = await messagesResponse.json();
        const restaurants: Restaurant[] = await restaurantsResponse.json();

        const chatsWithLastMessages = chatListData.map((chat: Chat) => {
          const restaurantMessages = messages
            .filter(message => message.restaurantId === chat.restaurantId)
            .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

          const restaurant = restaurants.find(r => r.id === chat.restaurantId);

          return {
            id: chat.restaurantId,
            lastMessage: restaurantMessages[0]?.text || "Nenhuma mensagem",
            timestamp: restaurantMessages[0]?.timestamp || "",
            restaurantName: restaurant ? restaurant.name : 'Desconhecido',
            restaurantImage: restaurant ? restaurant.logo : '',
          };
        });

        setChatList(chatsWithLastMessages);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    }

    fetchChatData();
  }, []);

  return (
    <View className='w-full h-full'>
      <BackArrow color='black' title='Lista de Chats' route='/'/>
      <FlatList
        data={chatList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable
            className="h-30 flex-row items-center my-2 p-4"
            onPress={() => router.push(`/chat?restaurantId=${item.id}`)}
          >
            <Image 
              source={{ uri: item.restaurantImage }} 
              style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }} 
            />
            <View>
              <Text style={{ fontWeight: 'bold' }}>{item.restaurantName}</Text>
              <Text>{item.lastMessage}</Text>
              <Text>{new Date(item.timestamp).toLocaleString()}</Text>
            </View>
          </Pressable>
        )}
        ListEmptyComponent={
          <View className='flex-1 justify-center items-center mt-[45%]'>
            <ChameleonWarning message="Você não tem nenhuma conversa ainda!"/>
          </View>
        }
      />
      <Footer/>
    </View>
  );
}
