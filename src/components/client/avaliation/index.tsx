import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { IconProps } from '@expo/vector-icons/build/createIconSet';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';

type AvaliationProps = {
  title: string;
  subtitle: string;
  type: "courier" | "order"; 
  IconComponent?: React.ComponentType<IconProps>; 
  iconName?: string;
  iconSize?: number;
  iconColor?: string;
  imageUrl?: string;
};

const AvaliationComponent: React.FC<AvaliationProps> = ({
  title,
  subtitle,
  type,
  IconComponent,
  iconName,
  iconSize = 90,
  iconColor = "#EF2A39",
  imageUrl,
}) => {
  const [rating, setRating] = useState(0);
  const navigation = useNavigation();

  const handleRating = (value: number) => {
    setRating(value);
  };

  const handleEvaluate = () => {
    console.log(`Avaliação selecionada: ${rating}`);
    router.push(`/client`);
  };

  return (
    <View className="flex-1 bg-white-80 items-center justify-center">
      <View className="bg-white rounded-2xl shadow-lg p-10 w-[82%] items-center">
        {type === "courier" && imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            style={{ width: iconSize, height: iconSize, borderRadius: iconSize / 2 }}
          />
        ) : (
          IconComponent && (
            <IconComponent name={iconName} size={iconSize} color={iconColor} />
          )
        )}

        <Text className="text-3xl font-bold text-red-main text-center mt-5">{title}</Text>
        <Text className="text-lg font-regular text-black-gray text-center mt-2 w-full">
          {subtitle}
        </Text>

        <View className="flex-row mt-8">
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star} onPress={() => handleRating(star)}>
              <FontAwesome
                name={star <= rating ? "star" : "star-o"}
                size={54}
                color={star <= rating ? "#FFD700" : "#D3D3D3"}
              />
            </TouchableOpacity>
          ))}
        </View>

        <View className="mt-6 flex-row gap-2">
          <TouchableOpacity
            className="bg-black-gray rounded-2xl py-5 w-36"
            onPress={() => router.push(`/client`)}
          >
            <Text className="text-white text-lg text-center font-semibold">Agora não</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-red-main rounded-2xl py-5 w-36"
            onPress={handleEvaluate}
          >
            <Text className="text-white text-lg text-center font-semibold">Avaliar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AvaliationComponent;
