import { View, Text } from "react-native";
import BackArrow from '../../components/shared/backArrow';

export default function Profile(){
    return(
        <View className="flex-1 bg-white">
            <View className="flex-1">
                <BackArrow color='black' title='Meu Perfil' route='/delivery'/>
                <Text>Meu Perfil</Text>
            </View>
        </View>
    )
}