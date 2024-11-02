import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Text, TouchableOpacity, View, ScrollView, TextInput, Image, Pressable, StatusBar } from 'react-native';
import BackArrow from '../components/backArrow';
import { useEffect, useState } from 'react';
import axios from 'axios';
import LOCAL_IP from '@/config';

interface Message {
    id: number;
    sender: string;
    text: string;
    timestamp: string;
}

export default function Chat() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`${LOCAL_IP}/messages`);
                setMessages(response.data);
            } catch (error) {
                console.error("Erro ao buscar mensagens:", error);
            }
        };

        fetchMessages();
    }, []);

    const handleSendMessage = async () => {
        if (newMessage.trim()) {
            const message: Message = {
                id: messages.length + 1,
                sender: 'user',
                text: newMessage,
                timestamp: new Date().toISOString(),
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

    return (
        <View className="flex-1 bg-white">
          <StatusBar backgroundColor="white" barStyle="dark-content" />
            <View className='flex flex-row items-center py-4'>
                <BackArrow />
                <View className="flex flex-row items-center gap-2 p-4">
                    <Image
                        source={{ uri: "https://instagram.fnat16-1.fna.fbcdn.net/v/t51.2885-19/74892118_745468709301582_6308768175651553280_n.jpg?_nc_ht=instagram.fnat16-1.fna.fbcdn.net&_nc_cat=106&_nc_ohc=RvZCmU74I_AQ7kNvgH3BrZC&_nc_gid=eb0821703f0740e39781387f438587bc&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AYCkTMicajCjWuLoAtM1v6PXs2oEapRpgJw07_Gs0ulxIw&oe=6729DE73&_nc_sid=7a9f4b" }} 
                        style={{ width: 40, height: 40, resizeMode: 'cover' }}
                    />
                    <View>
                        <Text className="font-semibold text-black">Nordestino</Text>
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
                                padding: 8,
                                borderRadius: 15,
                                backgroundColor: message.sender === 'user' ? '#EF2A39' : '#F1F5F9',
                                maxWidth: '80%',
                            }}
                        >
                            <Text className={`font-medium ${ message.sender === 'user' ? 'text-white' : 'text-black'}`}>
                                {message.text}
                            </Text>
                            <Text
                                className={`text-xs ${
                                    message.sender === 'user' ? 'text-white' : 'text-black'
                                }`}
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
    );
}
