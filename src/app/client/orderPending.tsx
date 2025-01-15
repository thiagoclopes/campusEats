import PopUpComponent from "@/src/components/client/popUp";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { ActivityIndicator } from "react-native";

type OrderPendingProps = {
  timeLeft: number;
};

export default function OrderPending({ timeLeft }: OrderPendingProps) {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  return (
    <PopUpComponent
      title="Aguarde"
      subtitle="Seu pedido está sendo confirmado pelo estabelecimento"
      onPress={() => (console.log('hora'))}
      buttonText={formatTime(timeLeft)}
      IconComponent={ActivityIndicator}
      iconName="exclamation-circle"
      iconSize={90}
      iconColor="red"
      primaryButtonSize={{ width: 250, height: 60 }}
      backgroundColor="#FEECEC"
    />
  );
}


//activity indicator está muito pequeno