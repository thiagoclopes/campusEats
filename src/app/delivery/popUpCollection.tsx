import React from 'react';
import { router } from 'expo-router';
import PopUpComponent from '@/src/components/client/popUp';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import LOCAL_IP from '@/config';

interface PopUpCollectionProps {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  updatecollectionStatus: (newStatus: string) => void;
  newStatus: string;
  title: string;
  buttonText: string;
  secondaryButtonText: string;
}


export default function PopUpCollection({ setModalVisible, updatecollectionStatus, title, buttonText, newStatus, secondaryButtonText }: PopUpCollectionProps) {
	return (
		<PopUpComponent
		title={title}
		subtitle="..."
		onPress={() => {updatecollectionStatus(newStatus); setModalVisible(false)}}
		buttonText={buttonText}
		IconComponent={FontAwesome}
		iconName="exclamation"
		iconSize={60}
		iconColor="red"
		primaryButtonSize={{ width: 250, height: 60 }}
		secondaryButtonText={secondaryButtonText}
		onSecondaryPress={() => setModalVisible(false)}
		secondaryButtonSize={{ width: 250, height: 60 }}
		backgroundColor="#FEECEC"
		/>
	);
}
