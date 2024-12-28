import { Keyboard, TextInput, View, BackHandler } from 'react-native';
import BackArrow from '../components/backArrow';
import { Footer } from '../components/footer';
import { Products } from '../components/productsList';
import { useEffect, useRef, useState } from 'react';


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
	const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

	const textInputRef = useRef<TextInput>(null);

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

  
  	return (
		<View className='flex-1'>
			<BackArrow color='black' title='Pesquisar' route='/'/>
			
			<TextInput
				ref={textInputRef}
				className='m-4 bg-slate-100 rounded-3xl px-4'
				placeholder="Buscar produtos..."
				value={searchQuery}
				onChangeText={setSearchQuery}
				onFocus={handleFocus}
        		onBlur={handleBlur}
			/>
			<Products showFilters={true} searchQuery={debouncedQuery}/>
			{!isKeyboardVisible && <Footer />}
		</View>
  	);
}
