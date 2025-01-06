import { Text, TouchableOpacity, View, FlatList } from 'react-native';
import BackArrow from '../../components/shared/backArrow';
import { Footer } from '../../components/client/footer';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import LOCAL_IP from '@/config';
import ChameleonWarning from '../../components/shared/chameleonWarning';

interface Address {
  id: string;
  setor: string;
  subtitle: string;
}

export default function Address() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: null,
    card: null
  });
  const router = useRouter();

  useEffect(() => {
    async function fetchAddresses() {
      try {
        const response = await fetch(`${LOCAL_IP}/addresses`);
        const addressesData: Address[] = await response.json();
        setAddresses(addressesData);
      } catch (error) {
        console.error('Erro ao buscar endereços:', error);
      }
    }

    fetchAddresses();
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
          setSelectedAddressId(profileData.address?.id || null); 
        }
      } catch (error) {
        console.error('Erro ao buscar perfil:', error);
      }
    }

    fetchProfile();
  }, []);

  const handleSelectAddress = (id: string) => {
    setSelectedAddressId(prevId => (prevId === id ? null : id));
  };

  const handleSaveAndRedirect = async () => {
    if (selectedAddressId) {
      const selectedAddress = addresses.find(address => address.id === selectedAddressId);

      if (selectedAddress) {
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
              address: selectedAddress,
              card: profile.card, 
              id: "2aae",
            }),
          });

          if (response.ok) {
            console.log('Endereço salvo com sucesso no perfil:', selectedAddress);
            router.push('/client/profile');
          } else {
            console.error('Erro ao salvar endereço no perfil');
          }
        } catch (error) {
          console.error('Erro ao salvar endereço no perfil:', error);
        }
      }
    } else {
      router.push('/client/profile');
    }
  };

  const handleAddNewAddress = () => {
    // Adicionar novo endereço
  };

  return (
    <View className='flex-1'>
      <View className='flex-1'>
        <BackArrow color='black' title='Meus Endereços' route='/client/profile' onClick={handleSaveAndRedirect} />

        <FlatList
          data={addresses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const isSelected = item.id === selectedAddressId;

            return (
              <TouchableOpacity
                onPress={() => handleSelectAddress(item.id)}
                className="bg-white-80 rounded-xl p-4 shadow-sm mt-3 w-[90%] mx-auto"
              >
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center">
                    <View className="w-12 h-12 rounded-full bg-red-main flex items-center justify-center">
                      <AntDesign name="enviroment" size={20} color="#FFFFFF" />
                    </View>
                    <View className="ml-6">
                      <Text className="text-black font-medium text-lg">{item.setor}</Text>
                      <Text className="text-black-gray font-regular text-md">{item.subtitle}</Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={() => handleSelectAddress(item.id)}
                    className={`w-6 h-6 rounded-full border-2 border-red-main flex items-center justify-center relative`}
                  >
                    {isSelected && (
                      <View className="w-4 h-4 rounded-full bg-red-main absolute top-0.5 left-0.5" />
                    )}
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          }}
          ListEmptyComponent={
            <View className='flex-1 justify-center items-center mt-[45%]'>
              <ChameleonWarning message="Nenhum endereço cadastrado!" />
            </View>
          }
        />

        <View className="mb-4 w-[90%] mx-auto">
          <TouchableOpacity
            onPress={handleAddNewAddress}
            className="bg-red-main w-full py-3 rounded-xl flex items-center justify-center"
          >
            <Text className="text-white font-semibold text-lg">Adicionar novo endereço</Text>
          </TouchableOpacity>
        </View>

      </View>
      <Footer />
    </View>
  );
}
