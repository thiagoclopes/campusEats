import { View, Pressable } from "react-native";
import { Feather, FontAwesome5, Entypo, AntDesign } from '@expo/vector-icons';
import { useRouter, usePathname, Href } from 'expo-router';
import { useState, useEffect } from 'react';



interface IconWithDotProps {
    route: Href<string | object>;
    IconComponent: typeof Feather | typeof FontAwesome5 | typeof Entypo | typeof AntDesign;
    iconName: string;
}


export function Footer() {
    const router = useRouter();
    const pathname = usePathname();
    const [activeRoute, setActiveRoute] = useState('/');

    useEffect(() => {
        setActiveRoute(pathname);
    }, [pathname]);
    

    const IconWithDot = ({ route, IconComponent, iconName }: IconWithDotProps) => (
        <Pressable className="w-12 h-12 flex justify-center items-center" onPress={() => router.push(route)}>
            <IconComponent name={iconName} size={24} color="#FFFFFF" />
            {activeRoute === route && (
                <View style={{
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: '#FFFFFF',
                    marginTop: 4,
                }} />
            )}
        </Pressable>
    );

    return (
        <View style={{
            height: 70,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            backgroundColor: '#EF2A39',
            elevation: 5,
        }}>
            <IconWithDot route="/" IconComponent={Feather} iconName="home" />
            <IconWithDot route="/success" IconComponent={Feather} iconName="search" />
            <IconWithDot route="/orders" IconComponent={FontAwesome5} iconName="list-alt" />
            <IconWithDot route="/chatList" IconComponent={Entypo} iconName="chat" />
            <IconWithDot route="/profile" IconComponent={AntDesign} iconName="user" />
        </View>
    );
}
