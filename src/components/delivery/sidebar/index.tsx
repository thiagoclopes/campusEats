import { Entypo, Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MenuItem {
    title: string;
    onPress: () => void;
}

const menuItems: MenuItem[] = [
    { title: 'Notificações', onPress: () => router.push('/delivery/notifications') },
    { title: 'Ganhos', onPress: () => router.push('/delivery/earnings') },
    { title: 'Carteira', onPress: () => router.push('/delivery/wallet') },
    { title: 'Meu Perfil', onPress: () => router.push('/delivery/profile') }, 
  ];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    if (!isOpen) return null;
  
    return (
      <View className="absolute z-10 left-0 top-0 p-4 bottom-0 w-64 bg-white">
        <View className='flex flex-row items-center mb-6'>
            <Image 
                source={{ uri: 'https://img.criativodahora.com.br/2023/10/MTQvMTAvMjAyMyAxOWgzOQ==652b18a66840f.jpeg' }} 
                style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }} 
            />
            <View className='flex flex-col justify-center'>
                <Text className='font-semibold'>MATHEUS</Text>
                <View className='flex flex-row items-center gap-1'>
                    <Entypo name="star" size={20} color="#FF9633" />
                    <Text className='font-semibold'>4.90</Text>
                </View>
            </View>
            <TouchableOpacity onPress={onClose} className="absolute right-4 top-4">
                <Feather name="x" size={25} color="black" />
            </TouchableOpacity>
        </View>
        
        {menuItems.map((item, index) => (
            <TouchableOpacity key={index} className="p-4" onPress={item.onPress}>
                <Text className="text-black text-lg font-semibold">{item.title}</Text>
            </TouchableOpacity>
        ))}
      </View>
    );
  }
