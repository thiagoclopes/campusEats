import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import PopUpComponent from "@/src/components/client/popUp";

type OrderDeniedProps = {
  onReturnHome: () => void;
};

export default function OrderDenied({ onReturnHome }: OrderDeniedProps) {
  return (
    <PopUpComponent
      title="Pedido negado"
      subtitle="Infelizmente o estabelecimento negou o seu pedido"
      onPress={onReturnHome}
      buttonText="Voltar para tela inicial"
      IconComponent={FontAwesome6}
      iconName="x"
      iconSize={40}
      iconColor="red"
      primaryButtonSize={{ width: 250, height: 60 }}
      backgroundColor="#FEECEC"
    />
  );
}
