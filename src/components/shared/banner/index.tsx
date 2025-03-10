import { Feather } from "@expo/vector-icons";
import { View, Pressable, Text, Image } from "react-native";
import PagerView from "react-native-pager-view"
export function Banner(){
    return(
        <View className="w-full h-36 rounded-2xl mt-5 mb-4 px-4">
            <PagerView style={{ flex: 1}} initialPage={0} pageMargin={14}>
                <Pressable 
                    className="w-full h-36 rounded-2xl" 
                    key={1}
                >
                    <Image
                        source={require("../../../assets/banner2.png")}
                        className="w-full h-36 rounded-xl"
                    />
                </Pressable>
                <Pressable 
                    className="w-full h-36 rounded-2xl" 
                    key={2}
                >
                    <Image
                        source={require("../../../assets/banner1.png")}
                        className="w-full h-36 rounded-xl"
                    />
                </Pressable>
                <Pressable 
                    className="w-full h-36 rounded-2xl" 
                    key={3}
                >
                    <Image
                        source={require("../../../assets/banner3.png")}
                        className="w-full h-36 rounded-xl"
                    />
                </Pressable>
                <Pressable 
                    className="w-full h-36 rounded-2xl" 
                    key={4}
                >
                    <Image
                        source={require("../../../assets/banner4.png")}
                        className="w-full h-36 rounded-xl"
                    />
                </Pressable>
            </PagerView>
        </View>
    )
}