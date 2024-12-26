import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';

interface PendingOrderModalProps {
	visible: boolean;
	onConfirm: () => void;
}

const PendingOrderModal = ({visible, onConfirm}: PendingOrderModalProps) => {
  return (
    <Modal
        animationType="none"
        transparent={true}
        visible={visible}
    >
        <View className="flex-1 justify-end" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <View className="absolute bottom-0 w-full bg-white rounded-t-3xl p-8 shadow-lg">
                <Text className="text-center text-lg font-bold text-black mb-4">Não é possível adicionar ao carrinho</Text>
                <Text className="text-center text-lg font-semibold text-black-gray mb-4">Você já possui um pedido em andamento</Text>
                <TouchableOpacity
                    className="bg-red-main py-4 px-6 rounded-xl w-80 mx-auto mb-2"
                    onPress={onConfirm}
                >
                    <Text className="text-white text-center font-semibold">Ok</Text>
                </TouchableOpacity>
            </View>
        </View>
    </Modal>
  );
};

export default PendingOrderModal;
