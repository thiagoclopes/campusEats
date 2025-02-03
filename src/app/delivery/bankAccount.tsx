import LOCAL_IP from "@/config";
import React, { useEffect, useState } from "react";
import BackArrow from "@/src/components/shared/backArrow";
import { useRouter } from "expo-router";
import { ScrollView, TextInput, View, Text, TouchableOpacity } from "react-native";

export default function BankAccount() {
    const [courierProfile, setCourierProfile] = useState({
        id: "",
        name: "",
        email: "",
        phone: "",
        vehicle: "",
        vehicleName: "",
        vehiclePlate: "",
        avaliation: 0,
        bankAccount: {
            name: "",
            address: "",
            city: "",
            cep: "",
            bankName: "",
            agencyCity: "",
            agencyNumber: "",
            number: "",
            type: "",
            cpf: "",
        },
    });

    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter();

    useEffect(() => {
        async function fetchCourierProfile() {
            try {
                const response = await fetch(`${LOCAL_IP}/courierProfile`);
                const courierProfileData = await response.json();

                if (courierProfileData.length > 0) {
                    const profile = courierProfileData[0];
                    const bankAccount = profile.bankAccount || {};

                    setCourierProfile({ ...profile, bankAccount });
                }
            } catch (error) {
                console.error("Erro ao buscar perfil:", error);
            }
        }

        fetchCourierProfile();
    }, []);

    async function handleSave() {
        try {
            const response = await fetch(`${LOCAL_IP}/courierProfile/${courierProfile.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ bankAccount: courierProfile.bankAccount }),
            });

            if (response.ok) {
                setIsEditing(false);
            } else {
                alert("Erro ao atualizar conta bancária.");
            }
        } catch (error) {
            console.error("Erro ao salvar conta bancária:", error);
            alert("Erro ao salvar conta bancária.");
        }
    }

    return (
        <View className='flex-1'>
            <ScrollView className='flex-1 px-4'>
                <BackArrow color='black' title='Conta Bancária' route='/delivery' />

                <Text className="font-semibold mt-10 ml-4 mb-2">Nome</Text>
                <TextInput
                    value={courierProfile.bankAccount?.name || ""}
                    editable={isEditing}
                    onChangeText={(text) => setCourierProfile({
                        ...courierProfile,
                        bankAccount: { ...courierProfile.bankAccount, name: text },
                    })}
                    className="h-14 px-6 w-full rounded-xl border border-gray-line flex justify-center"
                />

                <Text className="font-semibold mt-4 ml-4 mb-2">Endereço</Text>
                <TextInput
                    value={courierProfile.bankAccount?.address || ""}
                    editable={isEditing}
                    onChangeText={(text) => setCourierProfile({
                        ...courierProfile,
                        bankAccount: { ...courierProfile.bankAccount, address: text },
                    })}
                    className="h-14 px-6 w-full rounded-xl border border-gray-line flex justify-center"
                />

                <Text className="font-semibold mt-4 ml-4 mb-2">Cidade</Text>
                <TextInput
                    value={courierProfile.bankAccount?.city || ""}
                    editable={isEditing}
                    onChangeText={(text) => setCourierProfile({
                        ...courierProfile,
                        bankAccount: { ...courierProfile.bankAccount, city: text },
                    })}
                    className="h-14 px-6 w-full rounded-xl border border-gray-line flex justify-center"
                />

                <Text className="font-semibold mt-4 ml-4 mb-2">CEP</Text>
                <TextInput
                    value={courierProfile.bankAccount?.cep || ""}
                    editable={isEditing}
                    onChangeText={(text) => setCourierProfile({
                        ...courierProfile,
                        bankAccount: { ...courierProfile.bankAccount, cep: text },
                    })}
                    className="h-14 px-6 w-full rounded-xl border border-gray-line flex justify-center"
                />

                <Text className="font-semibold mt-4 ml-4 mb-2">Nome do banco</Text>
                <TextInput
                    value={courierProfile.bankAccount?.bankName || ""}
                    editable={isEditing}
                    onChangeText={(text) => setCourierProfile({
                        ...courierProfile,
                        bankAccount: { ...courierProfile.bankAccount, bankName: text },
                    })}
                    className="h-14 px-6 w-full rounded-xl border border-gray-line flex justify-center"
                />

                <Text className="font-semibold mt-4 ml-4 mb-2">Cidade da agência</Text>
                <TextInput
                    value={courierProfile.bankAccount?.agencyCity || ""}
                    editable={isEditing}
                    onChangeText={(text) => setCourierProfile({
                        ...courierProfile,
                        bankAccount: { ...courierProfile.bankAccount, agencyCity: text },
                    })}
                    className="h-14 px-6 w-full rounded-xl border border-gray-line flex justify-center"
                />

                <Text className="font-semibold mt-4 ml-4 mb-2">Número da agência</Text>
                <TextInput
                    value={courierProfile.bankAccount?.agencyNumber || ""}
                    editable={isEditing}
                    onChangeText={(text) => setCourierProfile({
                        ...courierProfile,
                        bankAccount: { ...courierProfile.bankAccount, agencyNumber: text },
                    })}
                    className="h-14 px-6 w-full rounded-xl border border-gray-line flex justify-center"
                />

                <Text className="font-semibold mt-4 ml-4 mb-2">Número da conta</Text>
                <TextInput
                    value={courierProfile.bankAccount?.number || ""}
                    editable={isEditing}
                    onChangeText={(text) => setCourierProfile({
                        ...courierProfile,
                        bankAccount: { ...courierProfile.bankAccount, number: text },
                    })}
                    className="h-14 px-6 w-full rounded-xl border border-gray-line flex justify-center"
                />

                <Text className="font-semibold mt-4 ml-4 mb-2">CPF</Text>
                <TextInput
                    value={courierProfile.bankAccount?.cpf || ""}
                    editable={isEditing}
                    onChangeText={(text) => setCourierProfile({
                        ...courierProfile,
                        bankAccount: { ...courierProfile.bankAccount, cpf: text },
                    })}
                    className="h-14 px-6 w-full rounded-xl border border-gray-line flex justify-center"
                />

                {isEditing ? (
                    <TouchableOpacity
                        className="flex justify-center mt-4 mb-4 w-[50%] shadow-sm py-2 rounded-full bg-green-500"
                        onPress={handleSave}
                    >
                        <Text className="text-center text-white">Salvar</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        className="flex justify-center mt-4 mb-4 w-[50%] shadow-sm py-2 rounded-full bg-black"
                        onPress={() => setIsEditing(true)}
                    >
                        <Text className="text-center text-white">Editar Conta</Text>
                    </TouchableOpacity>
                )}
            </ScrollView>
        </View>
    );
}
