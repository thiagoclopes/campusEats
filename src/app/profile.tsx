import { Image, StatusBar, Text, TouchableOpacity, View, Pressable, ScrollView } from 'react-native';
import BackArrow from '../components/backArrow';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router'; 
import { Footer } from '../components/footer';

const sections = [
    {
        title: 'Meus cartões',
        description: 'Adicione um novo método de pagamento',
        icon: 'credit-card',
        route: '/cards', 
    },
    {
        title: 'Favoritos',
        description: 'Meus produtos favoritos',
        icon: 'star',
        route: '/favorites',
    },
    {
        title: 'Endereços',
        description: 'Meus locais',
        icon: 'map-marker',
        route: '/address',
    },
    {
        title: 'Ajuda e suporte',
        description: 'Perguntas frequentes',
        icon: 'question-circle',
        route: '/help',
    },
    {
        title: 'Termos e políticas',
        description: 'Nossas regras',
        icon: 'book',
        route: '/privacyPolicy',
    }
];

export default function Profile() {
    const router = useRouter(); 

    return (
        <View className="flex-1 bg-red-main">
            <StatusBar backgroundColor="#EF2A39" barStyle="dark-content" />

            <ScrollView className="flex-1 w-full">
                <BackArrow color='white' title='Perfil' route='/'/>

                <View className="mt-6 w-40 h-40 rounded-2xl bg-slate-500 overflow-hidden z-10 mx-auto">
                    <Image
                        source={{ uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' }}
                        style={{ width: '100%', height: '100%' }}
                    />
                </View>

                <View className="w-full h-full rounded-t-3xl px-4 -mt-10 bg-white shadow-lg">
                    <View className="h-14 mt-28 px-6 w-full rounded-xl border border-gray-line flex justify-center">
                        <Text className="font-semibold">Thiago Lopes</Text>
                    </View>
                    <View className="h-14 mt-8 px-6 w-full rounded-xl border border-gray-line flex justify-center">
                        <Text className="font-semibold">thiagoviniciusc33@gmail.com</Text>
                    </View>
                    <TouchableOpacity className="flex justify-center mt-4 mb-4 w-[50%] shadow-sm py-2 rounded-full bg-black">
                        <Text className="text-center text-white">Editar Perfil</Text>
                    </TouchableOpacity>

                    <View className="border-t border-gray-line mt-4" />

                    {sections.map((section, index) => (
                        <View
                            key={index}
                            className={`mt-4 w-full ${index === sections.length - 1 ? 'mb-6' : ''}`}>
                            <Pressable
                                className="flex-row items-center ml-4"
                                onPress={() => router.push(section.route)}
                            >
                                <View style={{ width: 30, alignItems: 'center' }}>
                                    <FontAwesome name={section.icon} size={20} color="black" />
                                </View>
                                <View className="ml-4 flex-1">
                                    <Text className="font-semibold text-lg">{section.title}</Text>
                                    <Text className="text-sm text-black-gray">{section.description}</Text>
                                </View>
                            </Pressable>

                            {index < sections.length - 1 && <View className="border-t border-gray-line mt-4" />}
                        </View>
                    ))}
                </View>
            </ScrollView>

            <Footer />
        </View>
    );
}
