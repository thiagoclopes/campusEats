import { View, Text, Image } from "react-native";



interface ChameleonWarningProps {
    message: string; 
    imageSource?: any;
}

export default function ChameleonWarning({ message, imageSource = require('@/src/assets/chameleon.jpg') }: ChameleonWarningProps) {

    return (
        <View className="justify-center items-center p-14 flex-1">
            <Image source={imageSource} style={{ width: 150, height: 150, resizeMode: 'contain', opacity: 0.8 }} />
            <Text className="text-center text-lg mt-2 font-semibold">{message}</Text>
        </View>
    );
}
