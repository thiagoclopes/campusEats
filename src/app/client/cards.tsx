import { Text, TouchableOpacity, View, FlatList, Image } from 'react-native';
import BackArrow from '../../components/shared/backArrow';
import { Footer } from '../../components/client/footer';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import LOCAL_IP from '@/config';
import ChameleonWarning from '../../components/shared/chameleonWarning';
import { AddCardModal } from '@/src/components/client/addCardModal';

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
  const [modalVisible, setModalVisible] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: null,
    card: null
  });
  const [isEditing, setIsEditing] = useState(false); // Estado para controlar o modo de edição
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

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await fetch(`${LOCAL_IP}/profile/2aae`);
        const profileData = await response.json();
        
        if (profileData) {
          setProfile({
            name: profileData.name,
            email: profileData.email,
            phone: profileData.phone,
            address: profileData.address || null,
            card: profileData.card || null
          });
          setSelectedCardsId(profileData.card?.id || null); 
        }
      } catch (error) {
        console.error('Erro ao buscar perfil:', error);
      }
    }
    fetchProfile();
  }, []);


  const handleSelectCards = (id: string) => {
    setSelectedCardsId(prevId => (prevId === id ? null : id));
  };

  const handleSaveAndRedirect = async () => {
    if (selectedCardsId) {
      const selectedCard = cards.find(card => card.id === selectedCardsId);
  
      if (selectedCard) {
        try {
          const response = await fetch(`${LOCAL_IP}/profile/2aae`, {  
            method: 'PUT', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: profile.name,  
              email: profile.email,
              phone: profile.phone, 
              address: profile.address,  
              card: selectedCard,
              id: "2aae",
            }),
          });
  
          if (response.ok) {
            console.log('Endereço salvo com sucesso no perfil:', selectedCard);
          } else {
            console.error('Erro ao salvar endereço no perfil');
          }
        } catch (error) {
          console.error('Erro ao salvar endereço no perfil:', error);
        }
      }
    }
  
    router.push('/client/profile');
  };
  

  const handleAddNewCards = () => {
    setModalVisible(true);
  };

  const renderCardFlag = (flag: string) => {
    if (flag.toLowerCase() === 'visa') {
      return <Image source={require('@/assets/images/visa.png')} style={{ width: 50, height: 50, resizeMode: 'contain' }} />;
    } else if (flag.toLowerCase() === 'master') {
      return <Image source={require('@/assets/images/master.png')} style={{ width: 50, height: 50, resizeMode: 'contain' }} />;
    }
    return null;
  };

  const handleSaveCard = async (newCard: { method: string; name: string; flag: string; number: number }) => {
    try {
      const response = await fetch(`${LOCAL_IP}/cards`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: Math.random().toString(36).substr(2, 9), // Gera um ID aleatório
          ...newCard,
        }),
      });

      if (response.ok) {
        setCards((prevCards) => [...prevCards, { id: Math.random().toString(36).substr(2, 9), ...newCard }]);
        console.log('Cartão adicionado com sucesso!');
      } else {
        console.error('Erro ao adicionar cartão.');
      }
    } catch (error) {
      console.error('Erro ao adicionar cartão:', error);
    }
  };

  const handleDeleteCard = async (id: string) => {
    try {
      const response = await fetch(`${LOCAL_IP}/cards/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        setCards(prevCards => prevCards.filter(card => card.id !== id));
        console.log('Cartão deletado com sucesso!');
      } else {
        console.error('Erro ao deletar o cartão');
      }
    } catch (error) {
      console.error('Erro ao deletar o cartão:', error);
    }
  };
  

  return (
    <View className='flex-1'>
      <View className='flex-1'>
        <BackArrow color='black' title='Meus Cartões' route='/client/profile' onClick={handleSaveAndRedirect}/>

        <TouchableOpacity 
          onPress={() => setIsEditing(!isEditing)} 
          className={`flex-row justify-end items-center px-4 mr-2 ${isEditing ? 'text-red-500' : ''}`}
        >
          <Feather name="edit" size={24} color={isEditing ? 'red' : 'black'} />
        </TouchableOpacity>

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

                  {isEditing ? (
                    <TouchableOpacity
                      onPress={() => handleDeleteCard(item.id)}
                      className="w-6 h-6 rounded-full flex items-center justify-center relative"
                    >
                      <Feather name="trash-2" size={20} color="red" />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => handleSelectCards(item.id)}
                      className={`w-6 h-6 rounded-full border-2 border-red-main flex items-center justify-center relative`}
                    >
                      {isSelected && (
                        <View className="w-4 h-4 rounded-full bg-red-main absolute top-0.5 left-0.5" />
                      )}
                    </TouchableOpacity>
                  )}
                </View>
              </TouchableOpacity>
            );
          }}
          ListEmptyComponent={
            <View className='flex-1 justify-center items-center mt-[45%]'>
              <ChameleonWarning message="Nenhum cartão cadastrado!" />
            </View>
          }
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
      <AddCardModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveCard}
      />
      <Footer />
    </View>
  );
}


//BUG: O cartão é criado e selecionado e depois clica no backarrow. Quando retorna a tela, ele não está selecionado.
// teclado sobrepondo input
// sem validação nos campos