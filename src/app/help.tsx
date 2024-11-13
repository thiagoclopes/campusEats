import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import BackArrow from '../components/backArrow';
import { Footer } from '../components/footer';

export default function Help() {
  const [expanded, setExpanded] = useState(null); 

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

  const toggleAccordion = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <View className='flex-1'>
      <ScrollView className='flex-1'>
        <BackArrow color='black' title='Ajuda e suporte' route='/profile' />

        <View className='px-4 py-6 mt-4'>
          <Text className="text-2xl text-center font-semibold">Contato</Text>

          <View className='flex-row mt-2'>
            <Text className="text-lg font-medium">Email:</Text>
            <Text className="ml-2 text-lg font-medium text-black-gray">campuseats@suporte.com</Text>
          </View>

          <View className='flex-row'>
            <Text className="text-lg font-medium">Whatsapp:</Text>
            <Text className="ml-2 text-lg font-medium text-black-gray">(84) 98877-6655</Text>
          </View>
        </View>
        
        <View className="px-4 py-6 mt-10">
          <Text className="text-2xl text-center font-semibold">Perguntas Frequentes</Text>

          {questions.map((item, index) => (
            <View key={index} className="mt-4">
              <TouchableOpacity
                onPress={() => toggleAccordion(index)} 
                className="flex-row items-center justify-between w-full"
              >
                <View className='w-[70%] ml-4'>
                  <Text className="text-lg font-medium flex-1">{item.question}</Text>
                </View>
                <AntDesign 
                  name={expanded === index ? "up" : "down"}
                  size={16} 
                  color="black"
                  className='mr-4'
                />
              </TouchableOpacity>
              {expanded === index && (
                <Text className="mt-2 text-base text-medium text-black-gray">
                  {item.answer}
                </Text>
              )}
              <View className="border-t border-gray-line mt-4" />
            </View>
          ))}
          
        </View>
      </ScrollView>
      
      <Footer />
    </View>
  );
}
