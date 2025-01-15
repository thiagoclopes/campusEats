import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import PopUpComponent from "@/src/components/client/popUp";

type OrderConfirmedProps = {
  onProceedToPayment: () => void;
};

export default function OrderConfirmed({ onProceedToPayment }: OrderConfirmedProps) {
  return (
    <PopUpComponent
      title="Pedido confirmado"
      subtitle="Seu pedido foi confirmado. Volte para efetuar seu pagamento"
      onPress={onProceedToPayment}
      buttonText="Ir para pagamento"
      IconComponent={FontAwesome6}
      iconName="check"
      iconSize={60}
      iconColor="red"
      primaryButtonSize={{ width: 250, height: 60 }}
      backgroundColor="#FEECEC"
    />
  );
}
