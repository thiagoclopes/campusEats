import React from 'react';
import { router } from 'expo-router';
import PopUpComponent from '@/src/components/client/popUp';
import { FontAwesome } from '@expo/vector-icons';

export default function NoCourier() {
  return (
    <PopUpComponent
      title="Nenhum entregador encontrado!"
      subtitle="..."
      onPress={() => router.push(`/client`)}
      buttonText="Continuar procurando"
      IconComponent={FontAwesome}
      iconName="exclamation"
      iconSize={60}
      iconColor="red"
      primaryButtonSize={{ width: 250, height: 60 }}
      secondaryButtonText="Cancelar pedido"
      onSecondaryPress={() => router.push(`/client/cancelled`)}
      secondaryButtonSize={{ width: 250, height: 60 }}
      backgroundColor="#FEECEC"
    />
  );
}


// rota dos botões não estão certas