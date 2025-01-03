import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import BackArrow from '../../components/shared/backArrow';
import { Footer } from '../../components/client/footer';

interface CardProps {
  icon: React.ReactNode;
  title: string;
  content: string;
}

export default function Help() {
  const [expanded, setExpanded] = useState<number |null>(null);
  const [activeTab, setActiveTab] = useState('contact'); // Estado para alternar entre abas

  const questions = [
    {
      question: "Como faço para alterar ou cancelar um pedido?",
      answer: "Se o pedido ainda não foi aceito pelo restaurante, você pode alterá-lo ou cancelá-lo. Para pedidos já em andamento, infelizmente não será possível efetuar o cancelamento."
    },
    {
      question: "Quais métodos de pagamento são aceitos?",
      answer: "Aceitamos cartões de crédito e débito, PIX ou pagamentos em dinheiro na entrega."
    },
    {
      question: "O que fazer se o entregador não conseguir encontrar meu endereço?",
      answer: "Se o entregador tiver dificuldades para encontrar seu endereço, você pode entrar em contato com ele diretamente pelo aplicativo e fornecer instruções adicionais, além de conseguir identificar onde ele está."
    },
    {
      question: "Posso alterar o endereço de entrega após confirmar o pedido?",
      answer: "Se o pedido ainda não foi aceito pelo restaurante, é possível alterar o endereço de entrega. Caso o pedido já esteja em preparação ou em trânsito, entre em contato com o próprio entregador ou com o suporte para verificarmos a possibilidade de alterar o endereço de entrega."
    },
    {
      question: "Como posso saber se meu pedido foi confirmado?",
      answer: "Você receberá uma notificação no aplicativo assim que o restaurante aceitar o seu pedido e o status será atualizado para 'Em preparação'."
    },
    {
      question: "O que fazer se o pedido chegar errado ou com defeito?",
      answer: "Caso o pedido chegue errado ou com defeito, entre em contato com o suporte via aplicativo para solicitar um reembolso ou a reposição do pedido, conforme o caso."
    },
    {
      question: "O que faço se o meu pedido atrasar?",
      answer: "Se o seu pedido atrasar, o aplicativo irá notificar sobre a situação. Você pode acompanhar o status do pedido em tempo real. Se o atraso for significativo, entre em contato com o suporte para que o problema seja solucionado."
    },
    {
      question: "O que fazer se houver cobrança indevida ou erro no pagamento?",
      answer: "Caso você perceba que houve um erro no pagamento, entre em contato com o suporte para revisar a cobrança. O suporte irá verificar e corrigir o problema se for necessário."
    },
    {
      question: "O que faço se o entregador não trouxer meu pedido?",
      answer: "Se houver problemas com a entrega e você não receber seu pedido, entre em contato com o suporte que reembolsaremos o valor do pedido o mais rápido que pudermos."
    },
    {
      question: "Não encontrou a resposta que precisa?",
      answer: "Entre em contato com nosso suporte no canal suporte para que possamos te ajudar!"
    }
  ];

  const toggleAccordion = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };

  const Card: React.FC<CardProps> = ({ icon, title, content }) => {
    return (
      <View className="bg-white p-6 rounded-2xl shadow mt-6" style={{
									shadowColor: '#000',
									shadowOffset: { width: 0, height: 2 },
									shadowOpacity: 0.25,
									shadowRadius: 3.84,
									elevation: 5,
								}}>
        <View className="flex-row items-center mb-2">
          {icon}
          <Text className="ml-4 text-xl font-medium">{title}</Text>
        </View>
        <View className="border-t border-gray-line my-2" />
        <Text className="text-base text-black-gray font-medium mt-2">{content}</Text>
      </View>
    );
  }

  return (
    <View className='flex-1'>
      <ScrollView className='flex-1'>
        <BackArrow color='black' title='Ajuda e suporte' route='/client/profile' />

        <View className="flex-row justify-center mt-4">
          <TouchableOpacity
            onPress={() => setActiveTab('contact')}
            className={`w-1/2 py-2 border-b-2 ${
              activeTab === 'contact' ? 'border-red-main' : 'border-gray-line'
            }`}
          >
            <Text className={`text-lg mx-auto font-medium ${activeTab === 'contact' ? 'text-red-main' : 'text-black'}`}>
              Contato
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab('faq')}
            className={`w-1/2 py-2 border-b-2 ${
              activeTab === 'faq' ? 'border-red-main' : 'border-gray-line'
            }`}
          >
            <Text className={`text-lg mx-auto font-medium ${activeTab === 'faq' ? 'text-red-main' : 'text-black'}`}>
              Perguntas Frequentes
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'contact' && (
          <View className='px-4 mt-4'>

            <View className="space-y-4">
              <Card 
                icon={<MaterialIcons name="language" size={28} color="#EF2A39" />}
                title="Site"
                content="www.campuseats.com.br"
              />
              <Card 
                icon={<AntDesign name="phone" size={26} color="#EF2A39" />}
                title="Suporte"
                content="campuseats@suporte.com"
              />
              <Card 
                icon={<FontAwesome name="whatsapp" size={24} color="#EF2A39" />}
                title="WhatsApp"
                content=" (84) 98877-6655"
              />
              <Card 
                icon={<AntDesign name="instagram" size={24} color="#EF2A39" />}
                title="Instagram"
                content="@campuseats"
              />
              <Card 
                icon={<MaterialIcons name="business" size={28} color="#EF2A39" />}
                title="Comercial"
                content="comercial@campuseats.com.br"
              />
            </View>
          </View>
        )}


{activeTab === 'faq' && (
  <View className="px-4 mt-4">

    <View className="space-y-4">
      {questions.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => toggleAccordion(index)}
          activeOpacity={0.8}
        >
          <View
            className="bg-white p-6 rounded-2xl shadow mt-6"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <View className="flex-row justify-between items-center">
              <Text className="text-lg font-medium flex-1">{item.question}</Text>
              <AntDesign
                name={expanded === index ? "up" : "down"}
                size={16}
                color="black"
              />
            </View>
            {expanded === index && (
              <>
                <View className="border-t border-gray-line my-2" />
                <Text className="mt-2 text-base  text-black-gray">
                  {item.answer}
                </Text>
              </>
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  </View>
)}

      </ScrollView>

      <Footer />
    </View>
  );
}
