import { ScrollView, TouchableOpacity, View, Text, Image, TextInput } from 'react-native';
import { useEffect, useState } from 'react';
import LOCAL_IP from '@/config';

interface Cards {
  id: string;
  method: string;
  name?: string;
  flag?: string;
  number?: number;
}

export default function CardList({ onCardSelect }: { onCardSelect?: (id: string, cashChange?: string) => void }) {
  const [cards, setCards] = useState<Cards[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [cashChange, setCashChange] = useState<string>('');

  useEffect(() => {
    async function fetchCards() {
      try {
        const response = await fetch(`${LOCAL_IP}/cards`);
        const cardsData: Cards[] = await response.json();

        const fixedOptions = [
          { id: 'cash', method: 'Dinheiro', flag: 'dinheiro' },
          { id: 'pix', method: 'Pix', flag: 'pix' },
        ];

        setCards([...cardsData, ...fixedOptions]);
      } catch (error) {
        console.error('Erro ao buscar cartões:', error);
      }
    }

    fetchCards();
  }, []);

  const handleSelectCard = (id: string) => {
    setSelectedCardId((prevId) => (prevId === id ? null : id));

    if (id !== 'cash') {
      setCashChange('');
    }

    onCardSelect?.(id, id === 'cash' ? cashChange : undefined);
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
      {cards.map((item) => {
        const isSelected = item.id === selectedCardId;

        return (
          <TouchableOpacity
            key={item.id}
            onPress={() => handleSelectCard(item.id)}
            className={`rounded-xl p-6 shadow-sm mt-3 w-[100%] mx-auto ${
              isSelected ? 'bg-button-press' : 'bg-white-80'
            }`}
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View className="w-12 h-12 rounded-full flex items-center justify-center">
                  {item.flag ? renderCardFlag(item.flag) : null}
                </View>
                <View className="ml-6">
                  <Text
                    className={`font-medium text-lg ${
                      isSelected ? 'text-white' : 'text-black'
                    }`}
                  >
                    {item.method}
                  </Text>
                  {item.number && (
                    <Text className="text-black-gray font-regular text-md">{item.number}</Text>
                  )}
                </View>
              </View>
              <TouchableOpacity
                onPress={() => handleSelectCard(item.id)}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center relative ${
                  isSelected ? 'border-white' : 'border-red-main'
                }`}
              >
                {isSelected && (
                  <View className="w-4 h-4 rounded-full bg-white absolute top-0.5 left-0.5" />
                )}
              </TouchableOpacity>
            </View>

            {isSelected && item.id === 'cash' && (
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
