import { Octicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';


interface AddCardModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (card: {
    method: string;
    name: string;
    flag: string;
    number: number;
    expiration: string;
    ccv: number;
  }) => void;
}

export function AddCardModal({ visible, onClose, onSave }: AddCardModalProps) {
  const [method, setMethod] = React.useState('');
  const [name, setName] = React.useState('');
  const [flag, setFlag] = React.useState('');
  const [number, setNumber] = React.useState('');
  const [expiration, setExpiration] = React.useState('');
  const [ccv, setCcv] = React.useState('');

  const handleSave = () => {
    if (method && name && flag && number && expiration && ccv) {
      onSave({
        method,
        name,
        flag,
        number: parseInt(number),
        expiration,
        ccv: parseInt(ccv),
      });
      onClose();
    } else {
      alert('Por favor, preencha todos os campos!');
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className='flex-1' style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} />
      <View className='flex-1 justify-center items-center absolute' style={{ inset: 0 }}>
        <View style={{ backgroundColor: 'white', borderRadius: 10, padding: 20, width: '90%', shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 5 }}>
        <TouchableOpacity
  onPress={onClose}
  className="absolute top-6 right-6 flex items-center justify-center w-12 h-12 bg-red-main"
>
  <Octicons name="x" size={24} color="#fff" />
</TouchableOpacity>


          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16 }}>Adicionar novo cartão</Text>

          <View style={{ marginBottom: 16 }}>
            <Text style={{ color: '#555', marginBottom: 8 }}>Método de pagamento</Text>
            <View className='flex-row gap-3'>
              <TouchableOpacity
                onPress={() => setMethod('Crédito')}
                style={{
                  padding: 10,
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: method === 'Crédito' ? '#e63946' : '#ccc',
                }}
              >
                <Text style={{ color: method === 'Crédito' ? '#e63946' : '#555', fontWeight: method === 'Crédito' ? 'bold' : 'normal' }}>
                  Crédito
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setMethod('Débito')}
                style={{
                  padding: 10,
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: method === 'Débito' ? '#e63946' : '#ccc',
                }}
              >
                <Text style={{ color: method === 'Débito' ? '#e63946' : '#555', fontWeight: method === 'Débito' ? 'bold' : 'normal' }}>
                  Débito
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ marginBottom: 16 }}>
            <Text style={{ color: '#555', marginBottom: 8 }}>Nome no cartão</Text>
            <TextInput
              placeholder="Digite o nome no cartão"
              value={name}
              onChangeText={setName}
              style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10 }}
            />
          </View>

          <View style={{ marginBottom: 16 }}>
            <Text style={{ color: '#555', marginBottom: 8 }}>Bandeira (Ex: Visa)</Text>
            <TextInput
              placeholder="Digite a bandeira do cartão"
              value={flag}
              onChangeText={setFlag}
              style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10 }}
            />
          </View>

          <View style={{ marginBottom: 16 }}>
            <Text style={{ color: '#555', marginBottom: 8 }}>Número do cartão</Text>
            <TextInput
              placeholder="Digite o número do cartão"
              keyboardType="numeric"
              value={number}
              onChangeText={setNumber}
              style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10 }}
            />
          </View>

          <View style={{ marginBottom: 16 }}>
            <Text style={{ color: '#555', marginBottom: 8 }}>Data de Expiração</Text>
            <TextInput
              placeholder="MM/AA"
              value={expiration}
              onChangeText={setExpiration}
              style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10 }}
            />
          </View>

          <View style={{ marginBottom: 16 }}>
            <Text style={{ color: '#555', marginBottom: 8 }}>CCV</Text>
            <TextInput
              placeholder="Digite o código de segurança"
              keyboardType="numeric"
              value={ccv}
              onChangeText={setCcv}
              style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10 }}
            />
          </View>

          <TouchableOpacity
            onPress={handleSave}
            style={{ backgroundColor: '#e63946', borderRadius: 5, padding: 15, marginTop: 16 }}
          >
            <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
