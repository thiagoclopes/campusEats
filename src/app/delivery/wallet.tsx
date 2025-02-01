import { View, Text, Pressable } from "react-native";
import BackArrow from '../../components/shared/backArrow';
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";

export default function Wallet(){
    return(
        <View className="flex-1 bg-white">
            <View className="flex-1 p-4">
                <BackArrow color="black" title="Carteira" route="/delivery" />

                <View className="bg-white-80 rounded-2xl m-10 p-8 shadow-md h-60 w-96 mx-auto">
                    <Text className="text-black text-sm font-medium">Total:</Text>
                    <Text className="text-black text-3xl font-bold mt-2">R$ 112,50</Text>

                    <Text className="text-black text-lg font-medium text-center mt-12">RESGATAR</Text>

                    <View className="border-t border-gray-line mt-4 w-[100%]" />

                    <Text className="text-black-gray text-md font-regular text-right mt-4">CampusEats</Text>
                </View>

                <Text className="font-semibold mt-16 mb-6 text-xl">Meus recursos:</Text>

                <View
                  className={`mt-4 w-full mb-6"`}
                >
                  <Pressable
                    className="flex-row items-center ml-4 p-2"
                    onPress={() => router.push(`/delivery/balance`)}
                  >
                    <View style={{ width: 30, alignItems: "center" }}>
                      <FontAwesome5 name='wallet' size={20} color="#EF2A39" />
                    </View>
                    <View className="ml-4 flex-1">
                      <Text className="font-semibold text-lg text-black-gray">Saldo</Text>
                    </View>
                  </Pressable>
                  <View className="border-t border-gray-line mt-4" />
                </View>

                <View
                  className={`mt-4 w-full mb-6"`}
                >
                  <Pressable
                    className="flex-row items-center ml-4 p-2"
                    onPress={() => router.push(`/delivery/bankAccount`)}
                  >
                    <View style={{ width: 30, alignItems: "center" }}>
                      <FontAwesome name='university' size={20} color="#EF2A39" />
                    </View>
                    <View className="ml-4 flex-1">
                      <Text className="font-semibold text-lg text-black-gray">Conta bancária</Text>
                    </View>
                  </Pressable>
                </View>
            </View>
        </View>
    )
}