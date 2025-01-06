import React from 'react';
import { router } from 'expo-router';
import PopUpComponent from '@/src/components/client/popUp';
import { Octicons } from '@expo/vector-icons';

export default function Success() {
  return (
    <PopUpComponent
      title="Sucesso!"
      subtitle="Seu pagamento foi aceito."
      onPress={() => router.push(`/client/orderDetails`)}
      buttonText="Aguardar pedido"
      IconComponent={Octicons}
      iconName="check-circle-fill"
      iconSize={90}
      iconColor="red"
    />
  );
}