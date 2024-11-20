import { Text, TouchableOpacity, View, StyleSheet, Image  } from 'react-native';
import BackArrow from '../components/backArrow';
import { Footer } from '../components/footer';
import { Entypo, FontAwesome5 } from '@expo/vector-icons';

export default function Orders() {
  return (
    <View className='flex-1'>
		<View className='flex-1'>
			<BackArrow color='black' title='Meus pedidos' route='/'/>
			<View className='flex-1 mx-8 mt-4'>
				<View className='flex-row gap-4 items-center mb-6'>
					<FontAwesome5 name="history" size={20} color="black" />
					<Text className='text-lg font-semibold'>Histórico de Pedidos</Text>
				</View>
				<View className='bg-white px-2 py-6' style={styles.shadowContainer}>
					<View className='flex-row items-center justify-between'>
						<View className='flex-row items-center gap-1'>
							<Image
								source={{ uri: 'https://instagram.fnat16-1.fna.fbcdn.net/v/t51.2885-19/347767811_626861479483283_5985919623548770224_n.jpg?_nc_ht=instagram.fnat16-1.fna.fbcdn.net&_nc_cat=111&_nc_ohc=rnSE3XwWN1AQ7kNvgFXXm_6&_nc_gid=4ec0c8c1eeb44fd0bd2f34c9bff15f25&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AYBmYVQ7LAkkQ5LidS1aRowYjZI8FV8IWYYq071Y2Dx_xg&oe=6741E25F&_nc_sid=7a9f4b' }}
								style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }}
							/>
							<Text className='font-semibold'>A marmitaria • Nº 2029</Text>
						</View>
						<Entypo name="chevron-right" size={24} color="black" className='mr-4'/>
					</View>
					<View className="w-full h-[1px] mt-4 mb-6 bg-gray-line" />
					<View className='flex-row px-6 justify-between'>
						<View className='flex-col'>
							<View className='flex-row gap-2'>
								<Text className='bg-slate-100 px-1 rounded-sm'>1</Text>
								<Text>Hambúrguer</Text>
							</View>
							<Text>+1 item</Text>
						</View>
						<View className='flex items-center justify-center bg-red-main rounded-xl px-4'>
							<Text className='text-white'>Pedir novamente</Text>
						</View>
					</View>
				
				</View>
				
			</View>
		</View>
		<Footer/>
    </View>
  );
}

const styles = StyleSheet.create({
	shadowContainer: {
	  
	  // Sombra para Android
	  elevation: 5,
  
	  // Sombra para iOS
	  shadowColor: '#000',
	  shadowOffset: { width: 0, height: 2 },
	  shadowOpacity: 0.25,
	  shadowRadius: 4,
	},
  });