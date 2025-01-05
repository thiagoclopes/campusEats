import React, { useMemo, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Button} from 'react-native';
import { Feather, FontAwesome6 } from '@expo/vector-icons';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

type CourierStatusSheetProps = {
    isOnline: boolean;
    handleToggleOnlineStatus: () => void;
  };

export default function CourierStatusSheet({ isOnline, handleToggleOnlineStatus }: CourierStatusSheetProps){

	const bottomSheetRef = useRef<BottomSheet>(null);
	const snapPoints = useMemo(() => ["20%", "30%"], [])

	const handleCloseAction = () => {
		handleToggleOnlineStatus();
		
		bottomSheetRef.current?.close();
	};
	

    return(
		<>
			{!isOnline ? (
				<View className={`absolute bottom-0 left-0 right-0 p-8 rounded-t-3xl shadow-md flex flex-row items-center justify-between bg-white`}>
					<TouchableOpacity className="w-[20%]">
						<FontAwesome6 name="sliders" size={24} color="black" />
					</TouchableOpacity>
					<Text className="text-center font-semibold text-xl flex-1">Você está offline</Text>
					<View className="w-[20%]" />
				</View>
			) : (
				<BottomSheet
					ref={bottomSheetRef}
					index={0}
					snapPoints={snapPoints}
					backgroundStyle={{backgroundColor: "#FFF"}}
					enableOverDrag={false}
					style={{ zIndex: 10 }}
					
				>
					<BottomSheetView className={`p-8 rounded-t-3xl shadow-md flex flex-row items-center justify-between bg-white`}>
						<BottomSheetView className="flex flex-col items-center justify-center w-full flex-1">
							<ActivityIndicator color="red" size="small"/>
							<Text className="text-center font-semibold text-xl mt-2">Procurando entregas</Text>

							<TouchableOpacity
								className={`z-50 h-24 w-24 rounded-full items-center justify-center bg-gray-300 mt-8`}
								onPress={handleToggleOnlineStatus}
							>
								<Feather name="x" size={42} color="white" />
							</TouchableOpacity>

						</BottomSheetView>
					</BottomSheetView>
				</BottomSheet>
			)}
		</>
				
			
    )
}