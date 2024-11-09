import { Image, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import BackArrow from '../components/backArrow';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Footer } from '../components/footer';

export default function Profile() {
	return (
		<View className="flex-1 bg-red-main">
			<StatusBar backgroundColor="#EF2A39" barStyle="light-content" />

			<View className="flex-1 items-center w-full">
				<View className="w-full flex flex-row items-center justify-between p-4">
					<BackArrow color="white" />
					<FontAwesome name="gear" size={24} color="white" />
				</View>

				<View className="mt-6 w-40 h-40 rounded-2xl bg-slate-500 overflow-hidden z-10">
					<Image
						source={{ uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' }}
						style={{ width: '100%', height: '100%' }}
					/>
				</View>

				<View className="w-full h-full rounded-t-3xl px-4 -mt-10 bg-white">
					<View className="h-14 mt-28 px-6 w-full rounded-xl border border-gray-line flex justify-center">
						<Text className="font-semibold">Thiago Lopes</Text>
					</View>
					<View className="h-14 mt-8 px-6 w-full rounded-xl border border-gray-line flex justify-center">
						<Text className="font-semibold">thiagoviniciusc33@gmail.com</Text>
					</View>
					<TouchableOpacity className="flex justify-center mt-4 mb-4 w-[50%] py-2 rounded-full bg-black">
						<Text className="text-center text-white">Editar Perfil</Text>
					</TouchableOpacity>
				</View>
			</View>
			
			<Footer />
		</View>
	);
}
