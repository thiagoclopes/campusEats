import React from 'react';
import { router } from 'expo-router';
import PopUpComponent from '@/src/components/client/popUp';
import { FontAwesome } from '@expo/vector-icons';

export default function NoResponse() {
  return (
    <PopUpComponent
      title="Cancelar pedido"
      subtitle="Tem certeza que deseja cancelar este pedido? Esta ação não pode ser desfeita."
      onPress={() => router.push(`/client/cancelled`)}
      buttonText="Confirmar cancelamento"
      IconComponent={FontAwesome}
      iconName="exclamation"
      iconSize={60}
      iconColor="red"
      primaryButtonSize={{ width: 250, height: 60 }}
      secondaryButtonText="Voltar"
      onSecondaryPress={() => router.push(`/client`)}
      secondaryButtonSize={{ width: 250, height: 60 }}
      backgroundColor="#FEECEC"
    />
  );
}


// rota dos botões não estão certas