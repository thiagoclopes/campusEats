import React from 'react';
import { router } from 'expo-router';
import PopUpComponent from '@/src/components/client/popUp';
import { FontAwesome } from '@expo/vector-icons';

export default function PopUpCollection() {
  return (
    <PopUpComponent
      title="Você realmente chegou na coleta?"
      subtitle="..."
      onPress={() => router.push(`/delivery`)}
      buttonText="Sim, cheguei"
      IconComponent={FontAwesome}
      iconName="exclamation"
      iconSize={60}
      iconColor="red"
      primaryButtonSize={{ width: 250, height: 60 }}
      secondaryButtonText="Voltar"
      onSecondaryPress={() => router.push(`/delivery`)}
      secondaryButtonSize={{ width: 250, height: 60 }}
      backgroundColor="#FEECEC"
    />
  );
}


// rota dos botões não estão certas