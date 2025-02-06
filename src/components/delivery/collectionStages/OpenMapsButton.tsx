import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, Text } from "react-native";

export default function OpenMapsButton(){
    return(
        <TouchableOpacity className="flex-row items-center justify-center gap-2 bg-red-main p-3 rounded-lg">
            <Text className="text-white text-xs font-semibold">VER ROTA</Text>
            <FontAwesome5 name="route" size={16} color="white" />
        </TouchableOpacity>
    )
}