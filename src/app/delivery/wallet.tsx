import { View, Text } from "react-native";
import BackArrow from '../../components/shared/backArrow';

export default function Wallet(){
    return(
        <View className="flex-1 bg-white">
            <View className="flex-1">
                <BackArrow color='black' title='Carteira' route='/delivery'/>
                <Text>Carteira</Text>
            </View>
        </View>
    )
}