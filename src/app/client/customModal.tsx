import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';

interface CustomModalProps {
    visible: boolean;
    title: string;
    subtitle: string;
    onClose: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({ visible, title, subtitle, onClose }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
        >
            <View className="flex-1 justify-end" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <View className="absolute bottom-0 w-full bg-white rounded-t-3xl p-8 shadow-lg">
                    <Text className="text-center text-lg font-bold text-black mb-4">{title}</Text>
                    <Text className="text-center text-lg font-semibold text-black-gray mb-4">{subtitle}</Text>
                    <TouchableOpacity
                        className="bg-red-main py-4 px-6 rounded-xl w-80 mx-auto mb-2"
                        onPress={onClose}
                    >
                        <Text className="text-white text-center font-semibold">Limpar carrinho</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="bg-black-gray py-4 px-6 rounded-xl w-80 mx-auto"
                        onPress={onClose}
                    >
                        <Text className="text-white text-center font-semibold">Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default CustomModal;
