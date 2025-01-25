import { ScrollView, TouchableOpacity, View, Text, Image, TextInput } from 'react-native';
import { useEffect, useState } from 'react';
import LOCAL_IP from '@/config';
import { AntDesign } from '@expo/vector-icons';

interface Address {
  id: string;
  setor: string;
  subtitle: string;
}

interface Card {
  id: string;
  method: string;
  name?: string;
  flag?: string;
  number?: number;
}

interface CardListProps {
  type: 'address' | 'payment';
  onSelect?: (id: string, additionalData?: string) => void;
}

export default function CardList({ type, onSelect }: CardListProps) {
  const [items, setItems] = useState<(Card | Address)[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [cashChange, setCashChange] = useState<string>('');

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await fetch(`${LOCAL_IP}/profile`);
        const profileData = await response.json();
        const userProfile = profileData[0];

        if (type === 'payment') {
          const userCard = userProfile?.card
            ? {
                id: userProfile.card.id,
                method: userProfile.card.method || 'Cartão',
                flag: userProfile.card.flag,
                number: userProfile.card.number.toString(),
              }
            : null;

          const fixedOptions = [
            { id: 'cash', method: 'Dinheiro', flag: 'dinheiro' },
            { id: 'pix', method: 'Pix', flag: 'pix' },
          ];

          setItems(userCard ? [userCard, ...fixedOptions] : fixedOptions);
        } else if (type === 'address') {
          const addresses = userProfile?.address
            ? [
                {
                  id: userProfile.address.id,
                  setor: userProfile.address.setor,
                  subtitle: userProfile.address.subtitle,
                },
              ]
            : [];
          setItems(addresses);
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    }

    fetchItems();
  }, [type]);

  const handleSelect = (id: string) => {
    const isDeselecting = selectedId === id;
    const newSelectedId = isDeselecting ? null : id;
  
    setSelectedId(newSelectedId);
  
    if (type === 'payment' && id !== 'cash') {
      setCashChange('');
    }
  
    onSelect?.(
      newSelectedId || "",
      type === 'payment' && newSelectedId === 'cash' ? cashChange : undefined
    );
  };
  

  const incrementCashChange = (value: number) => {
    setCashChange((prev) => {
      const numericValue = parseFloat(prev) || 0;
      return (numericValue + value).toString();
    });
  };

  const renderCardFlag = (flag?: string) => {
    if (flag?.toLowerCase() === 'visa') {
      return <Image source={require('@/assets/images/visa.png')} style={{ width: 50, height: 50, resizeMode: 'contain' }} />;
    } else if (flag?.toLowerCase() === 'master') {
      return <Image source={require('@/assets/images/master.png')} style={{ width: 50, height: 50, resizeMode: 'contain' }} />;
    } else if (flag?.toLowerCase() === 'dinheiro') {
      return <Image source={require('@/src/assets/dinheiro.jpg')} style={{ width: 50, height: 50, resizeMode: 'contain' }} />;
    } else if (flag?.toLowerCase() === 'pix') {
      return <Image source={require('@/src/assets/pix.png')} style={{ width: 50, height: 50, resizeMode: 'contain' }} />;
    }
    return null;
  };

  return (
    <ScrollView style={{ width: '100%' }} nestedScrollEnabled>
      {items.map((item) => {
        const isSelected = item.id === selectedId;

        return (
          <TouchableOpacity
            key={item.id}
            onPress={() => handleSelect(item.id)}
            className={`rounded-xl p-6 shadow-sm mt-3 w-[100%] mx-auto ${
              isSelected ? 'bg-button-press' : 'bg-white-80'
            }`}
          >
            {type === 'payment' ? (
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <View className="w-12 h-12 rounded-full flex items-center justify-center">
                    {'flag' in item ? renderCardFlag(item.flag) : null}
                  </View>
                  <View className="ml-6">
                    <Text
                      className={`font-medium text-lg ${
                        isSelected ? 'text-white' : 'text-black'
                      }`}
                    >
                      {item.method}
                    </Text>
                    {'number' in item && item.number && (
                      <Text className="text-black-gray font-regular text-md">{item.number}</Text>
                    )}
                  </View>
                </View>
              </View>
            ) : (
              <View className='flex-row'>
                <View className="w-12 h-12 rounded-full bg-red-main flex items-center justify-center">
                  <AntDesign name="enviroment" size={20} color="#FFFFFF" />
                </View>
                <View className="ml-6">
                  <Text className={`font-medium text-lg ${
                        isSelected ? 'text-white' : 'text-black'
                      }`}>{item.setor}</Text>
                  <Text className="text-black-gray font-regular text-md">{item.subtitle}</Text>
                </View>
              </View>
            )}

            {isSelected && type === 'payment' && item.id === 'cash' && (
              <View className="mt-4">
                <Text className="text-white font-regular text-md mb-2">Troco para:</Text>
                <View className="flex-row items-center">
                  <TextInput
                    value={cashChange}
                    onChangeText={(text) => setCashChange(text)}
                    placeholder="Digite o valor do troco"
                    keyboardType="numeric"
                    className="border border-white rounded-lg p-2 text-white flex-1"
                  />
                </View>
                <View className="flex-row justify-around mt-3">
                  {[2, 5, 10, 20, 50].map((value) => (
                    <TouchableOpacity
                      key={value}
                      onPress={() => incrementCashChange(value)}
                      className="bg-white rounded-lg px-4 py-2"
                    >
                      <Text className="text-black font-medium">+{value}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
