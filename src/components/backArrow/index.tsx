import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { TouchableOpacity, View } from "react-native";

export default function BackArrow({ color = "black" }) {
    return (
        <TouchableOpacity onPress={() => router.push('/')}>
            <AntDesign name="arrowleft" size={24} color={color} className="p-4" />
        </TouchableOpacity>
    );
}
