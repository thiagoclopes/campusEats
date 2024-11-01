import { View } from 'react-native';

const DashedLine = () => {
    return (
        <View className="flex flex-row items-center">
            <View className="flex-1 h-0.5 border-t border-dashed border-gray-400" />
        </View>
    );
};

export default DashedLine;