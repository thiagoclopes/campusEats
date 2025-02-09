import { View, Text, TouchableOpacity } from "react-native";
import { Footer } from "@/src/components/restaurant/footer";
import BackArrow from "@/src/components/shared/backArrow";
import { useState } from "react";
import React = require("react");

export default function Orders() {
	type TabOptions = 'novos' | 'em-preparo' | 'prontos';
	const [selectedTab, setSelectedTab] = useState<TabOptions>('novos');

	const renderContent = () => {
		switch (selectedTab) {
			case 'novos':
				return <View><Text>Conteúdo para Novos</Text></View>;
			case 'em-preparo':
				return <View><Text>Conteúdo para Em Preparo</Text></View>;
			case 'prontos':
				return <View><Text>Conteúdo para Prontos</Text></View>;
			default:
				return null;
		}
	};

	return (
	<View className="flex-1">
		<View className="flex-1">
			<BackArrow color="black" title="Pedidos" route="/restaurant" />
			<View className="w-full flex flex-row">
				<TouchableOpacity
					className={`flex-1 items-center justify-center p-4 border-b-2 ${
						selectedTab === 'novos' ? 'border-black' : 'border-gray-line'
					}`}
					onPress={() => setSelectedTab('novos')}
				>
					<Text>Novos</Text>
				</TouchableOpacity>
				<TouchableOpacity
					className={`flex-1 items-center justify-center p-4 border-b-2 ${
						selectedTab === 'em-preparo' ? 'border-black' : 'border-gray-line'
					}`}
					onPress={() => setSelectedTab('em-preparo')}
				>
					<Text>Em preparo</Text>
				</TouchableOpacity>
				<TouchableOpacity
					className={`flex-1 items-center justify-center p-4 border-b-2 ${
						selectedTab === 'prontos' ? 'border-black' : 'border-gray-line'
					}`}
					onPress={() => setSelectedTab('prontos')}
				>
					<Text>Prontos</Text>
				</TouchableOpacity>
			</View>

			<View className="mt-4">
				{renderContent()}
			</View>
		</View>
		<Footer/>
	</View>
	);
}
