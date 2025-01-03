import { View, Text } from "react-native";
import BackArrow from '../../components/shared/backArrow';

export default function Earnings(){
    return(
        <View className="flex-1 bg-white">
            <View className="flex-1">
                <BackArrow color='black' title='Ganhos' route='/delivery'/>
                <Text>Ganhos</Text>
            </View>
        </View>
    )
}