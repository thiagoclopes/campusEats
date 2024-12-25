import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';

interface VendorConflictModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const VendorConflictModal = ({visible, onClose, onConfirm}: VendorConflictModalProps) => {
  return (
    <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
    >
        <View className="flex-1 justify-end" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <View className="absolute bottom-0 w-full bg-white rounded-t-3xl p-8 shadow-lg">
                <Text className="text-center text-lg font-bold text-black mb-4">Você possui itens de outro vendedor no seu carrinho</Text>
                <Text className="text-center text-lg font-semibold text-black-gray mb-4">Deseja limpar o carrinho?</Text>
                <TouchableOpacity
                    className="bg-red-main py-4 px-6 rounded-xl w-80 mx-auto mb-2"
                    onPress={onConfirm}
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

export default VendorConflictModal;
