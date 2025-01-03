import { Keyboard, TextInput, View, Modal, TouchableOpacity, Text, FlatList, TouchableWithoutFeedback  } from 'react-native';
import BackArrow from '../../components/shared/backArrow';
import { Footer } from '../../components/client/footer';
import { Products } from '../../components/client/productsList';
import { useEffect, useRef, useState } from 'react';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import React from 'react';

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

type FilterType = 'status' | 'order' | 'categories';
type CategoriesType = ('Combos' | 'Almoço' | 'Pizza' | 'Açaí' | 'Salgados' | 'Bebidas')[];
type SortOrderType = 'rating' | 'price' | 'default' | null;

export default function Search() {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const debouncedQuery = useDebounce(searchQuery, 300);
    const [isKeyboardVisible, setIsKeyboardVisible] = useState<boolean>(false);
    const [isFilterModalVisible, setFilterModalVisible] = useState<boolean>(false);
    const [selectedCategory, setSelectedCategory] = useState<CategoriesType>([]);
    const [filterType, setFilterType] = useState<FilterType>('categories');
    const [statusFilter, setStatusFilter] = useState<string | null>(null);
    const [orderFilter, setOrderFilter] = useState<SortOrderType>('default');
    const [activeFilter, setActiveFilter] = useState<FilterType | null>(null);
    const [appliedCategories, setAppliedCategories] = useState<CategoriesType>([]);
    const [appliedSortOrder, setAppliedSortOrder] = useState<SortOrderType>(null);
    
    

    const textInputRef = useRef<TextInput>(null)

    const categories = ['Combos', 'Almoço', 'Pizza', 'Açaí', 'Salgados', 'Bebidas'] as const;

    const orderOptions = ['rating', 'price', 'default'];

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

    const handleApplyFilters = () => {
        setFilterModalVisible(false);
        setActiveFilter(null);
        setAppliedCategories(selectedCategory)
        setAppliedSortOrder(orderFilter)
    };

    const toggleFilterModal = (type: FilterType) => {
        if (activeFilter === type) {
            setFilterModalVisible(false);
            setActiveFilter(null);
        } else {
            setActiveFilter(type);
            setFilterType(type);
            setFilterModalVisible(true);
        }
    };

    const toggleCategorySelection = (category: typeof categories[number]) => {
        setSelectedCategory((prev) =>
            prev.includes(category)
                ? prev.filter((item) => item !== category)
                : [...prev, category]
        );
    };

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    const reverseSortOrderMap: { [key in Exclude<SortOrderType, null>]: string } = {
        'rating': 'Melhor avaliação',
        'price': 'Menor preço',
        'default': 'Ordenação padrão'
    };

    const handleOrderDisplay = (orderFilter: SortOrderType) => {
        if (orderFilter === null) {
            return;
        }
    
        return reverseSortOrderMap[orderFilter];
    };
    

    return (
        <>
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View className="flex-1">
            <BackArrow color="black" title="Pesquisar" route="/client" />

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
                    className="w-48 flex-row justify-center gap-2 py-4 rounded-xl bg-off-white"
                    onPress={() => toggleFilterModal('order')}
                >
                    <Text className="font-bold text-center text-black-gray">
                        {orderFilter === 'default' ? 'Ordenar por' : handleOrderDisplay(orderFilter)}
                    </Text>
                    <AntDesign name={activeFilter === 'order' ? 'up' : 'down'} size={16} color="#EF2A39" />
                </TouchableOpacity>

                <TouchableOpacity
                    className="w-24 flex-row justify-center gap-2 py-4 rounded-xl bg-off-white"
                    onPress={() => toggleFilterModal('categories')}
                >
                    <Text className="font-bold text-center text-black-gray">
                        {selectedCategory.length > 0 ? selectedCategory.length : 'Todos'}
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
                                        onPress={() => {
                                            setOrderFilter(option as SortOrderType);
                                        }}
                                    >
                                        <Text>
                                        {handleOrderDisplay(option as SortOrderType)}
                                        </Text>
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

            <Products showFilters={false} searchQuery={debouncedQuery} restaurantId={undefined} showFavorites={false} categories={appliedCategories} sortBy={appliedSortOrder}/>

            {!isKeyboardVisible && <Footer />}
        </View>
        </TouchableWithoutFeedback>
        </>
    );
}
