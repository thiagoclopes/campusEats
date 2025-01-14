import React from 'react';
import AvaliationComponent from '@/src/components/client/avaliation';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function CourierAvaliation() {
  return (
    <AvaliationComponent
      title="Avalie o entregador!"
      subtitle="Sua avaliação é muito importante."
      type="courier"
      imageUrl="https://img.criativodahora.com.br/2023/10/MTQvMTAvMjAyMyAxOWgzOQ==652b18a66840f.jpeg"
      iconSize={100}
    />
  );
}