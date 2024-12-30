import { Keyboard, TextInput, View, Modal, TouchableOpacity, Text, FlatList } from 'react-native';
import BackArrow from '../components/backArrow';
import { Footer } from '../components/footer';
import { Products } from '../components/productsList';
import { useEffect, useRef, useState } from 'react';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

function useDebounce(value: string, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

export default function Search() {
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedQuery = useDebounce(searchQuery, 300);
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
    const [isFilterModalVisible, setFilterModalVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
    const [appliedCategoryCount, setAppliedCategoryCount] = useState<number>(0);

    const textInputRef = useRef<TextInput>(null);

    const categories = [
        'Combos', 'Almoço', 'Pizza', 'Açaí', 'Salgados', 'Bebidas'
    ];

    useEffect(() => {
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            if (textInputRef.current) {
                textInputRef.current.blur();
            }
        });

        return () => {
            keyboardDidHideListener.remove();
        };
    }, []);

    const handleFocus = () => {
        setIsKeyboardVisible(true);
    };

    const handleBlur = () => {
        textInputRef.current?.blur();
        setIsKeyboardVisible(false);
    };

    const toggleFilterModal = () => {
        setFilterModalVisible(!isFilterModalVisible);
    };

    const toggleCategorySelection = (category: string) => {
        setSelectedCategory((prev) =>
            prev.includes(category)
                ? prev.filter((item) => item !== category) 
                : [...prev, category]                    
        );
    };

    const handleApplyFilters = () => {
        setAppliedCategoryCount(selectedCategory.length); 
        setFilterModalVisible(false); 
    };

    return (
        <View className="flex-1">
            <BackArrow color="black" title="Pesquisar" route="/" />

            <TextInput
                ref={textInputRef}
                className="m-4 bg-slate-100 rounded-3xl px-4"
                placeholder="Buscar produtos..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />

            <View className="flex-row items-center mx-4">
                <TouchableOpacity
                    className="w-24 flex-row justify-center gap-2 py-4 rounded-xl bg-off-white"
                    onPress={toggleFilterModal}
                >
                    <Text className="font-bold text-center text-black-gray">
                        {appliedCategoryCount > 0 ? appliedCategoryCount : 'Todos'} 
                    </Text>
                    <AntDesign name={isFilterModalVisible ? 'up' : 'down'} size={16} color="#EF2A39"/>
                </TouchableOpacity>
            </View>

            <Modal
                transparent={true}
                visible={isFilterModalVisible}
                animationType="slide"
                onRequestClose={toggleFilterModal}
            >
                <View className="flex-1 justify-center items-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
                    <View className="w-4/5 bg-white rounded-xl p-4">
                        <Text className="text-xl font-bold text-center mb-4">Categorias</Text>
                        <FlatList
                            data={categories}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    className="py-2 flex-row justify-between items-center"
                                    onPress={() => toggleCategorySelection(item)}
                                >
                                    <Text
                                        className={`text-lg ${selectedCategory.includes(item) ? 'text-red-500 font-bold' : 'text-black'}`}
                                    >
                                        {item}
                                    </Text>
                                    {selectedCategory.includes(item) && (
                                        <MaterialIcons name="check-box" size={24} color="red" />
                                    )}
                                    {!selectedCategory.includes(item) && (
                                        <MaterialIcons name="check-box-outline-blank" size={24} color="black" />
                                    )}
                                </TouchableOpacity>
                            )}
                        />

                        <TouchableOpacity
                            className="mt-4 rounded-full py-2"
                            onPress={() => setSelectedCategory([])}
                        >
                            <Text className="text-center text-black font-bold">Limpar Seleções</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            className="mt-4 bg-red-500 rounded-full py-2"
                            onPress={handleApplyFilters} 
                        >
                            <Text className="text-center text-white font-bold">Aplicar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Products showFilters={false} searchQuery={debouncedQuery} restaurantId={undefined} showFavorites={false} />

            {!isKeyboardVisible && <Footer />}
        </View>
    );
}
