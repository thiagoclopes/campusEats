import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { IconProps } from "@expo/vector-icons/build/createIconSet";

type PopUpProps = {
  title: string;
  subtitle: string;
  onPress: () => void;
  buttonText: string;
  IconComponent: React.ComponentType<IconProps>;
  iconName: string;
  iconSize?: number;
  iconColor?: string;
  primaryButtonSize?: { width: number; height: number };
  secondaryButtonText?: string;
  onSecondaryPress?: () => void;
  secondaryButtonSize?: { width: number; height: number };
  backgroundColor?: string; 
};

const PopUpComponent: React.FC<PopUpProps> = ({
  title,
  subtitle,
  onPress,
  buttonText,
  IconComponent,
  iconName,
  iconSize = 90,
  iconColor = "#EF2A39",
  primaryButtonSize = { width: 200, height: 50 },
  secondaryButtonText,
  onSecondaryPress,
  secondaryButtonSize = { width: 200, height: 50 },
  backgroundColor = "#FFFFFF", 
}) => {
  return (
    <View className="flex-1 bg-white-80 items-center justify-center">
      <View className="bg-white rounded-2xl shadow-lg py-16 px-10 w-[82%] items-center">
        <View
          className="items-center justify-center rounded-full"
          style={{ width: 100, height: 100, backgroundColor }}
        >
          <IconComponent name={iconName} size={iconSize} color={iconColor} />
        </View>
        <Text className="text-3xl font-bold text-red-main text-center mt-5">{title}</Text>
        <Text className="text-lg font-regular text-black-gray text-center mt-2">{subtitle}</Text>

        <TouchableOpacity
          className="bg-red-main rounded-2xl mt-12"
          onPress={onPress}
          style={{
            width: primaryButtonSize.width,
            height: primaryButtonSize.height,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text className="text-white text-lg text-center font-semibold">{buttonText}</Text>
        </TouchableOpacity>

        {secondaryButtonText && onSecondaryPress && (
          <TouchableOpacity
            className="bg-black-gray rounded-2xl mt-4"
            onPress={onSecondaryPress}
            style={{
              width: secondaryButtonSize.width,
              height: secondaryButtonSize.height,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text className="text-white text-lg text-center font-semibold">{secondaryButtonText}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default PopUpComponent;
