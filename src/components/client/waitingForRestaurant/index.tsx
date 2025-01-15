// WaitingForRestaurant.tsx
import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import OrderPending from "@/src/app/client/orderPending";
import OrderConfirmed from "@/src/app/client/orderConfirmed";
import OrderDenied from "@/src/app/client/orderDenied";

type WaitingForRestaurantProps = {
  isOrderConfirmed: boolean;
  onProceedToPayment: () => void;
};

export default function WaitingForRestaurant({ isOrderConfirmed, onProceedToPayment }: WaitingForRestaurantProps) {
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const router = useRouter();

  if (isOrderConfirmed) {
    return <OrderConfirmed onProceedToPayment={onProceedToPayment} />;
  }

  if (timeLeft === 0) {
    return <OrderDenied onReturnHome={() => router.push(`/client`)} />;
  }

  return <OrderPending timeLeft={timeLeft} />;
}
