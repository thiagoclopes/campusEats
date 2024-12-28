import { ScrollView, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import BackArrow from '../components/backArrow';
import { Footer } from '../components/footer';
import { Products } from '../components/productsList';
import { useEffect, useState } from 'react';


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
	const [searchQuery, setSearchQuery] = useState("");
	const debouncedQuery = useDebounce(searchQuery, 300);
  
  return (
  <View className='flex-1'>
		<View className='flex-1'>
			<BackArrow color='black' title='Pesquisar' route='/'/>
			<TextInput
				className='m-4 bg-slate-100 rounded-3xl px-4'
				placeholder="Buscar produtos..."
				value={searchQuery}
				onChangeText={setSearchQuery}
			/>
			<ScrollView>
				<Products showFilters={true} searchQuery={debouncedQuery}/>
			</ScrollView>
		</View>
		<Footer/>
  </View>);
}
