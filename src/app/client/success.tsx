import React from 'react';
import { router } from 'expo-router';
import PopUpComponent from '@/src/components/client/popUp';

export default function Success() {
  return (
    <PopUpComponent
      title="Sucesso!"
      subtitle="Seu pagamento foi aceito."
      onPress={() => router.push(`/client/orderDetails`)}
      buttonText="Aguardar pedido"
    />
  );
}
