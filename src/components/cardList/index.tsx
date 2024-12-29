import { ScrollView, TouchableOpacity, View, Text, Image } from 'react-native';
import { useEffect, useState } from 'react';
import LOCAL_IP from '@/config';

interface Cards {
  id: string;
  method: string;
  name: string;
  flag: string;
  number: number;
}

export default function CardList({ onCardSelect }: { onCardSelect?: (id: string) => void }) {
  const [cards, setCards] = useState<Cards[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCards() {
      try {
        const response = await fetch(`${LOCAL_IP}/cards`);
        const cardsData: Cards[] = await response.json();
        setCards(cardsData);
      } catch (error) {
        console.error('Erro ao buscar cartões:', error);
      }
    }

    fetchCards();
  }, []);

  const handleSelectCard = (id: string) => {
    setSelectedCardId((prevId) => (prevId === id ? null : id));
    onCardSelect?.(id);
  };

  const renderCardFlag = (flag: string) => {
    if (flag.toLowerCase() === 'visa') {
      return <Image source={require('@/assets/images/visa.png')} style={{ width: 50, height: 50, resizeMode: 'contain' }} />;
    } else if (flag.toLowerCase() === 'master') {
      return <Image source={require('@/assets/images/master.png')} style={{ width: 50, height: 50, resizeMode: 'contain' }} />;
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
                  {renderCardFlag(item.flag)}
                </View>
                <View className="ml-6">
                  <Text
                    className={`font-medium text-lg ${
                      isSelected ? 'text-white' : 'text-black'
                    }`}
                  >
                    {item.method}
                  </Text>
                  <Text className="text-black-gray font-regular text-md">{item.number}</Text>
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
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}