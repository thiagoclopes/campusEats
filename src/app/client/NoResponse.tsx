import React from 'react';
import { router } from 'expo-router';
import PopUpComponent from '@/src/components/client/popUp';
import { FontAwesome } from '@expo/vector-icons';

export default function NoResponse() {
  return (
    <PopUpComponent
      title="Sinto muito!"
      subtitle="O estabelecimento não respondeu sua confirmação. Aconselhamos que procure em outro vendedor ou tente novamente"
      onPress={() => router.push(`/client/orderConfirmation`)}
      buttonText="Tentar novamente"
      IconComponent={FontAwesome}
      iconName="exclamation-circle"
      iconSize={90}
      iconColor="red"
      primaryButtonSize={{ width: 250, height: 60 }}
      secondaryButtonText="Voltar para o pedido"
      onSecondaryPress={() => router.push(`/client/cart`)}
      secondaryButtonSize={{ width: 250, height: 60 }}
    />
  );
}


// rota dos botões não estão certas