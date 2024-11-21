import { Text, TouchableOpacity, View, FlatList, Image } from 'react-native';
import BackArrow from '../components/backArrow';
import { Footer } from '../components/footer';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import LOCAL_IP from '@/config';

interface Cards {
  id: string;
  method: string;
  name: string;
  flag: string;
  number: number;
}

export default function Cards() {

  const [cards, setCards] = useState<Cards[]>([]);
  const [selectedCardsId, setSelectedCardsId] = useState<string | null>(null);
  const router = useRouter();

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

  const handleSelectCards = (id: string) => {
    setSelectedCardsId(prevId => (prevId === id ? null : id));
  };

  const handleAddNewCards = () => {
    // adicionar novo cartão
  };

  const handleDeleteCard = (id: string) => {
    // lógica para excluir o cartão
    console.log(`Excluir cartão com ID: ${id}`);
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
    <View className='flex-1'>
      <View className='flex-1'>
        <BackArrow color='black' title='Meus Cartões' route='/profile' />

        <FlatList
          data={cards}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const isSelected = item.id === selectedCardsId;

            return (
              <TouchableOpacity
                onPress={() => handleSelectCards(item.id)}
                className="bg-white-80 rounded-xl p-6 shadow-sm mt-3 w-[90%] mx-auto"
              >
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center">
                    <View className="w-12 h-12 rounded-full flex items-center justify-center">
                      {renderCardFlag(item.flag)}
                    </View>
                    <View className="ml-6">
                      <Text className="text-black font-medium text-lg">{item.method}</Text>
                      <Text className="text-black-gray font-regular text-md">{item.number}</Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={() => handleDeleteCard(item.id)}
                    className="w-6 h-6 rounded-full flex items-center justify-center relative"
                  >
                    <AntDesign name="delete" size={20} color="red" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          }}
        />

        <View className="mb-4 w-[90%] mx-auto">
          <TouchableOpacity
            onPress={handleAddNewCards}
            className="bg-red-main w-full py-3 rounded-xl flex items-center justify-center"
          >
            <Text className="text-white font-semibold text-lg">Adicionar novo cartão</Text>
          </TouchableOpacity>
        </View>

      </View>
      <Footer />
    </View>
  );
}
