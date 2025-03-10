import { AntDesign } from "@expo/vector-icons";
import { Href, router } from "expo-router";
import React from "react";
import { TouchableOpacity, View, Text } from "react-native";



interface BackArrowProps {
    color: string;
    title?: string;
    route?: Href;
    onClick?: () => void;
}

export default function BackArrow({ color, title, route, onClick }: BackArrowProps) {

    const handleBackPress = async () => {
        if (onClick) {
            onClick();
        } else if (route) {
            router.push(route); 
        } else {
            router.back();
        }
    };

    return (
        <View className="flex-row items-center justify-center px-4 py-4">
            <View className="absolute left-1">
                <TouchableOpacity
                    onPress={handleBackPress}
                >
                    <AntDesign name="arrowleft" size={24} color={color} className="p-4" />
                </TouchableOpacity>
            </View>
            <Text className="text-2xl font-medium" style={{ color }}>{title}</Text>
        </View>
    );
}
