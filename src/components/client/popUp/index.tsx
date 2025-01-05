import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Octicons } from '@expo/vector-icons';

type PopUpProps = {
  title: string;
  subtitle: string;
  onPress: () => void;
  buttonText: string;
};

const PopUpComponent: React.FC<PopUpProps> = ({ title, subtitle, onPress, buttonText }) => {
  return (
    <View className="flex-1 bg-white-80 items-center justify-center">
      <View className="bg-white rounded-2xl shadow-lg p-10 w-[82%] items-center">
        <Octicons name="check-circle-fill" size={90} color="#EF2A39" />
        <Text className="text-3xl font-bold text-red-main text-center mt-5">{title}</Text>
        <Text className="text-lg font-regular text-black-gray text-center mt-2 w-full">
          {subtitle}
        </Text>
        <TouchableOpacity
          className="bg-red-main rounded-2xl py-5 px-8 mt-12"
          onPress={onPress}
        >
          <Text className="text-white text-lg text-center font-semibold">{buttonText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PopUpComponent;
