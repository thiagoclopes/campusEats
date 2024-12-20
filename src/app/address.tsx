import { Text, TouchableOpacity, View, FlatList } from 'react-native';
import BackArrow from '../components/backArrow';
import { Footer } from '../components/footer';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import LOCAL_IP from '@/config';
import ChameleonWarning from '../components/chameleonWarning';

interface Address {
  id: string;
  setor: string;
  subtitle: string;
}

export default function Address() {

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
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

  const handleSelectAddress = (id: string) => {
    setSelectedAddressId(prevId => (prevId === id ? null : id));
  };

  const handleAddNewAddress = () => {
    // adicionar novo endereço
  };

  return (
    <View className='flex-1'>
      <View className='flex-1'>
        <BackArrow color='black' title='Meus Endereços' route='/profile' />

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
              <ChameleonWarning message="Nenhum endereço cadastrado!"/>
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
