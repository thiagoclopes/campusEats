import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Text, TouchableOpacity, View, ScrollView, TextInput, Image, Pressable, StatusBar, ActivityIndicator, Platform, KeyboardAvoidingView } from 'react-native';
import BackArrow from '../../components/shared/backArrow';
import { useEffect, useState } from 'react';
import axios from 'axios';
import LOCAL_IP from '@/config';

interface Message {
    id: number;
    sender: string;
    text: string;
    timestamp: string;
    restaurantId: string;
}

interface Restaurant {
    id: string;
    name: string;
    logo: string;
}

export default function Chat({ color = "black" }) {
    const router = useRouter();
    const { restaurantId } = useLocalSearchParams<{ restaurantId: string }>();
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
    const [loading, setLoading] = useState<Boolean>(true);

    useEffect(() => {
        const fetchMessagesAndRestaurant = async () => {
            try {
                const messagesResponse = await axios.get(`${LOCAL_IP}/messages`);
                const allMessages: Message[] = messagesResponse.data;

                const filteredMessages = allMessages.filter(
                    (message) => message.restaurantId === restaurantId
                );
                setMessages(filteredMessages);

                const restaurantResponse = await axios.get(`${LOCAL_IP}/restaurants/${restaurantId}`);
                const restaurantData: Restaurant = restaurantResponse.data;
                setRestaurant(restaurantData);

            } catch (error) {
                console.error("Erro ao buscar mensagens ou restaurante:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMessagesAndRestaurant();
    }, [restaurantId]);

    const handleSendMessage = async () => {
        if (newMessage.trim()) {
            const message: Message = {
                id: messages.length + 1,
                sender: 'user',
                text: newMessage,
                timestamp: new Date().toISOString(),
                restaurantId: restaurantId as string,
            };

            try {
                await axios.post(`${LOCAL_IP}/messages`, message);
                setMessages([...messages, message]);
                setNewMessage('');
            } catch (error) {
                console.error("Erro ao enviar mensagem:", error);
            }
        }
    };

    if(loading) {
        return (
            <View className='flex-1 flex-col justify-center items-center'>
                <ActivityIndicator color="red" size="large"/>
            </View>
        )
    }

    return (
        <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1"
                keyboardVerticalOffset={40}
            >
            <View className="flex-1 bg-white">
                <StatusBar backgroundColor="white" barStyle="dark-content" />
                <View className='flex flex-row items-center py-4 px-4'>
                    <TouchableOpacity onPress={() => router.push('/client/chatList')}>
                        <AntDesign name="arrowleft" size={24} color={color} className="p-4" />
                    </TouchableOpacity>
                    <View className="flex flex-row items-center gap-2 p-4">
                        {restaurant?.logo && (
                            <Image
                                source={{ uri: restaurant.logo }} 
                                style={{ width: 40, height: 40, resizeMode: 'cover' }}
                            />
                        )}
                        <View>
                            <TouchableOpacity onPress={() => router.push(`/client/restaurant_profile?id=${restaurant?.id}`)}>
                                <Text className="font-semibold text-black">{restaurant?.name || "Carregando..."}</Text>
                            </TouchableOpacity>
                            <Text className="text-sm font-semibold text-gray">Loja</Text>
                        </View>
                    </View>
                </View>
                <ScrollView className="flex-1 mb-4 p-4">
                    {messages.map((message) => (
                        <View 
                            key={message.id} 
                            className={`flex-row items-center my-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            {message.sender !== 'user' && (
                                <Image 
                                    source={{ uri: 'https://cdn-icons-png.flaticon.com/512/266/266033.png' }}
                                    className="w-10 h-10 rounded-full mr-2 bg-white"
                                />
                            )}
                            <View
                                style={{
                                    padding: 12,
                                    borderRadius: 15,
                                    backgroundColor: message.sender === 'user' ? '#EF2A39' : '#F1F5F9',
                                    maxWidth: '80%',
                                }}
                            >
                                <Text className={`font-medium ${ message.sender === 'user' ? 'text-white' : 'text-black'}`}>
                                    {message.text}
                                </Text>
                                <Text
                                    className={`text-xs ${ message.sender === 'user' ? 'text-white' : 'text-black'}`}
                                >
                                    {new Date(message.timestamp).toLocaleTimeString()}
                                </Text>
                            </View>
                            {message.sender === 'user' && (
                                <Image 
                                    source={{ uri: 'https://cdn-icons-png.flaticon.com/512/266/266033.png' }}
                                    className="w-10 h-10 rounded-full ml-2"
                                />
                            )}
                        </View>
                    ))}
                </ScrollView>
                <View
                    className="flex-row items-center bg-white rounded-xl mx-4 mb-6"
                    style={{
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 4,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.5,
                        elevation: 5, 
                    }}
                >
                    <TextInput
                        className="flex-1 py-4 pl-4 pr-2 rounded-l-xl"
                        placeholder="Digite uma mensagem..."
                        value={newMessage}
                        onChangeText={setNewMessage}
                        multiline={true}
                        style={{ paddingVertical: 8 }}  
                    />
                    <Pressable 
                        className="w-16 h-16 bg-red-main rounded-xl flex justify-center items-center -ml-2"
                        onPress={handleSendMessage}
                    >
                        <FontAwesome name="send-o" size={20} color="white" />
                    </Pressable>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}
