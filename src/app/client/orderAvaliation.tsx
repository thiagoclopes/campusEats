import React from 'react';
import AvaliationComponent from '@/src/components/client/avaliation';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function OrderAvaliation() {
  return (
    <AvaliationComponent
      title="Avalie seu pedido!"
      subtitle="Sua avaliação é muito importante."
      type="order"
      IconComponent={MaterialCommunityIcons}
      iconName="star-circle"
      iconSize={100}
      iconColor="red"
    />
  );
}