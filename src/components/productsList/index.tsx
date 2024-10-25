import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, TouchableOpacity, View, Text, Image, Pressable } from "react-native";

interface FoodItem {
    id: string;
    name: string;
    category: string;
    url: string;
  }

const foodItems: FoodItem[] = [
    { id: '1', name: 'Combo 1', category: 'Combos', url:'https://d2umxhib5z7frz.cloudfront.net/Brasil/9600337_mop_1.png' },
    { id: '2', name: 'Combo 2', category: 'Combos', url:'https://static.ifood-static.com.br/image/upload/t_high/pratos/73b7bfea-decb-4427-8814-ed33f51badfd/202303271535_U10X_i.jpg'},
    { id: '3', name: 'Almoço Executivo', category: 'Almoço', url:'https://t4.ftcdn.net/jpg/04/47/67/77/360_F_447677793_qlwuEq0EKegA6J55cIsxr39Ue4dyHIBA.jpg'},
    { id: '4', name: 'Pizza Margherita', category: 'Pizza', url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgzP_zfQ-35CWuFMZ3THXJPxF5WntHqHXETw&s'},
    { id: '5', name: 'Pizza Calabresa', category: 'Pizza', url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhyOaOF_vE3SVjyfSr_nMj059lGnS4Vh77VQ&s'},
    { id: '6', name: 'Feijoada', category: 'Almoço', url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpRYUaUvIxqFEApLRiHtIUMp2HO3dYNbe_Yw&s'},
];

const router = useRouter();

export function Products(){

    const [selectedButton, setSelectedButton] = useState('Todos');
    const [filteredItems, setFilteredItems] = useState(foodItems);

    const handleButtonPress = (button: string) => {
        setSelectedButton(button);
        
        if (button === 'Todos') {
          setFilteredItems(foodItems);
        } else {
          const filtered = foodItems.filter(item => item.category === button);
          setFilteredItems(filtered);
        }
    };

    const renderItem = ({ item }: { item: FoodItem }) => (
        <View className="py-2">
          <Text className="text-black">{item.name}</Text>
        </View>
    );

    return(
        <View className="p-4">
            <View className="flex flex-row gap-2 mb-4">
                <TouchableOpacity
                onPress={() => handleButtonPress('Todos')}
                className={`w-24 py-4 rounded-xl ${selectedButton === 'Todos' ? 'bg-red-500' : 'bg-slate-100'}`}
                >
                <Text className={`font-bold text-center ${selectedButton === 'Todos' ? 'text-white' : 'text-slate-500'}`}>
                    Todos
                </Text>
                </TouchableOpacity>

                <TouchableOpacity
                onPress={() => handleButtonPress('Combos')}
                className={`w-24 py-4 rounded-xl ${selectedButton === 'Combos' ? 'bg-red-500' : 'bg-slate-100'}`}
                >
                <Text className={`font-bold text-center ${selectedButton === 'Combos' ? 'text-white' : 'text-slate-500'}`}>
                    Combos
                </Text>
                </TouchableOpacity>

                <TouchableOpacity
                onPress={() => handleButtonPress('Almoço')}
                className={`w-24 py-4 rounded-xl ${selectedButton === 'Almoço' ? 'bg-red-500' : 'bg-slate-100'}`}
                >
                <Text className={`font-bold text-center ${selectedButton === 'Almoço' ? 'text-white' : 'text-slate-500'}`}>
                    Almoço
                </Text>
                </TouchableOpacity>

                <TouchableOpacity
                onPress={() => handleButtonPress('Pizza')}
                className={`w-24 py-4 rounded-xl ${selectedButton === 'Pizza' ? 'bg-red-500' : 'bg-slate-100'}`}
                >
                <Text className={`font-bold text-center ${selectedButton === 'Pizza' ? 'text-white' : 'text-slate-500'}`}>
                    Pizza
                </Text>
                </TouchableOpacity>
            </View>

            <View className="flex flex-row flex-wrap">
                {filteredItems.map(item => (
                <View key={item.id} className="w-1/2 p-2">
                    <Pressable className="bg-slate-100 rounded-xl overflow-hidden" onPress={() => router.push('/product')}>
                    <Image
                        source={{ uri: item.url }} 
                        className="w-full h-40" 
                        style={{ resizeMode: 'cover' }}
                    />
                    <Text className="text-slate-500 font-bold text-center py-2">{item.name}</Text>
                    </Pressable>
                </View>
                ))}
            </View>
        </View>
    );
}