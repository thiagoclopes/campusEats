import { Keyboard, TextInput, View, Modal, TouchableOpacity, Text, FlatList } from 'react-native';
import BackArrow from '../components/backArrow';
import { Footer } from '../components/footer';
import { Products } from '../components/productsList';
import { useEffect, useRef, useState } from 'react';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

function useDebounce(value, delay) {
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
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [appliedCategoryCount, setAppliedCategoryCount] = useState(0);
    const [filterType, setFilterType] = useState('categories');
    const [statusFilter, setStatusFilter] = useState(null);
    const [orderFilter, setOrderFilter] = useState(null);
    const [activeFilter, setActiveFilter] = useState(null);

    const textInputRef = useRef(null);

    const categories = ['Combos', 'Almoço', 'Pizza', 'Açaí', 'Salgados', 'Bebidas'];

    const orderOptions = ['Proximidade', 'Menor preço', 'Todos'];

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

    const toggleFilterModal = (type) => {
        if (activeFilter === type) {
            setFilterModalVisible(false);
            setActiveFilter(null);
        } else {
            setActiveFilter(type);
            setFilterType(type);
            setFilterModalVisible(true);
        }
    };

    const toggleCategorySelection = (category) => {
        setSelectedCategory((prev) =>
            prev.includes(category)
                ? prev.filter((item) => item !== category)
                : [...prev, category]
        );
    };

    const handleApplyFilters = () => {
        if (orderFilter === 'Todos') {
            setOrderFilter(null);
        }
        if (statusFilter === 'Todos') {
            setStatusFilter(null);
        }
        setAppliedCategoryCount(selectedCategory.length);
        setFilterModalVisible(false);
        setActiveFilter(null);
    };

    return (
        <View className="flex-1">
            <BackArrow color="black" title="Pesquisar" route="/" />

            <TextInput
                ref={textInputRef}
                className="m-4 bg-slate-100 rounded-3xl p-4"
                placeholder="Buscar produtos..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />

            <View className="flex-row items-center mx-4 gap-2">
                <TouchableOpacity
                    className="w-40 flex-row justify-center gap-2 py-4 rounded-xl bg-off-white"
                    onPress={() => toggleFilterModal('order')}
                >
                    <Text className="font-bold text-center text-black-gray">
                        {orderFilter ? orderFilter : 'Ordenar por'}
                    </Text>
                    <AntDesign name={activeFilter === 'order' ? 'up' : 'down'} size={16} color="#EF2A39" />
                </TouchableOpacity>

                <TouchableOpacity
                    className="w-24 flex-row justify-center gap-2 py-4 rounded-xl bg-off-white"
                    onPress={() => toggleFilterModal('categories')}
                >
                    <Text className="font-bold text-center text-black-gray">
                        {appliedCategoryCount > 0 ? appliedCategoryCount : 'Todos'}
                    </Text>
                    <AntDesign name={activeFilter === 'categories' ? 'up' : 'down'} size={16} color="#EF2A39" />
                </TouchableOpacity>

                <TouchableOpacity
                    className="w-24 flex-row justify-center gap-2 py-4 rounded-xl bg-off-white"
                    onPress={() => toggleFilterModal('status')}
                >
                    <Text className="font-bold text-center text-black-gray">
                        {statusFilter ? statusFilter : 'Status'}
                    </Text>
                    <AntDesign name={activeFilter === 'status' ? 'up' : 'down'} size={16} color="#EF2A39" />
                </TouchableOpacity>
            </View>

            <Modal
                transparent={true}
                visible={isFilterModalVisible}
                animationType="slide"
                onRequestClose={() => setFilterModalVisible(false)}
            >
                <View className="flex-1 justify-center items-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
                    <View className="w-4/5 bg-white rounded-xl p-4">
                        {filterType === 'categories' && (
                            <>
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
                            </>
                        )}

                        {filterType === 'order' && (
                            <>
                                <Text className="text-xl font-bold text-center mb-4">Ordenar por</Text>
                                {orderOptions.map((option) => (
                                    <TouchableOpacity
                                        key={option}
                                        className="py-2 flex-row items-center justify-between"
                                        onPress={() => setOrderFilter(option)}
                                    >
                                        <Text className="text-lg text-black">{option}</Text>
                                        <View
                                            className={`w-6 h-6 rounded-full border-2 ${orderFilter === option ? 'border-red-500 bg-red-500' : 'border-black'}`}
                                        />
                                    </TouchableOpacity>
                                ))}
                            </>
                        )}

                        {filterType === 'status' && (
                            <>
                                <Text className="text-xl font-bold text-center mb-4">Status</Text>
                                {['Ativo', 'Inativo', 'Todos'].map((status) => (
                                    <TouchableOpacity
                                        key={status}
                                        className="py-2 flex-row items-center justify-between"
                                        onPress={() => setStatusFilter(status)}
                                    >
                                        <Text className="text-lg text-black">{status}</Text>
                                        <View
                                            className={`w-6 h-6 rounded-full border-2 ${statusFilter === status ? 'border-red-500 bg-red-500' : 'border-black'}`}
                                        />
                                    </TouchableOpacity>
                                ))}
                            </>
                        )}

                        <TouchableOpacity
                            className="mt-4 bg-red-500 rounded-full py-2"
                            onPress={handleApplyFilters}
                        >
                            <Text className="text-center text-white font-bold">Aplicar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Products showFilters={false} searchQuery={debouncedQuery} restaurantId={undefined} showFavorites={false} categories={appliedCategories}/>

            {!isKeyboardVisible && <Footer />}
        </View>
    );
}

// Fazer os filtros funcionarem
// 