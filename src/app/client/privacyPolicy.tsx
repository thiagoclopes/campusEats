import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import BackArrow from '../../components/shared/backArrow';
import { Footer } from '../../components/client/footer';

export default function PrivacyPolicy() {

  return (
    <View className="flex-1">
      <View className="flex-1">
        <BackArrow color="black" title="Termos e Políticas" />
        <ScrollView>
          <View className="mx-auto mt-8 w-96">
            <Text className="font-semibold text-xl text-justify">
              Termos de uso e políticas de privacidade dos usuários
            </Text>
            <Text className="text-black-gray font-semibold text-md mt-8 text-justify">
              Olá, usuário! Sua privacidade é importante para nós. {'\n'} {'\n'}
              É política do Campus Eats respeitar a sua privacidade em relação a qualquer informação sua que possamos
              coletar no aplicativo Campus Eats. Este documento contém os Termos de Uso e a Política de Privacidade
              aplicáveis ao uso do nosso aplicativo. Ao acessar ou utilizar o nosso serviço, você concorda com as condições
              descritas abaixo. {'\n'} {'\n'}
              Solicitamos informações pessoais apenas quando realmente se faz necessário. O fazemos por meios justos e
              legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado. {'\n'} {'\n'}
              Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando
              armazenamos dados, os protegemos dentro de meios comercialmente exigidos pela LGPD. Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto se exigido por lei.{'\n'} {'\n'}
            </Text>

            <Text className="font-semibold text-xl text-justify">
          1. Coleta de Dados Pessoais
        </Text>
        <Text className="text-black-gray font-semibold text-md mt-4 text-justify">
          Coletamos e processamos dados pessoais para fornecer os nossos serviços de delivery de forma eficiente e segura. Os tipos de dados que podemos coletar incluem:
          {'\n \n'}<Text className='font-semibold text-black'>• Informações pessoais:</Text> como nome, endereço, número de telefone e e-mail.
          {'\n \n'}<Text className='font-semibold text-black'>• Dados de localização:</Text> para identificar e realizar entregas no endereço correto.
          {'\n \n'}<Text className='font-semibold text-black'>• Informações sobre uso do aplicativo:</Text> como dados de navegação, interações com o aplicativo, informações de dispositivos e localização.
          {'\n \n'}A coleta de dados é realizada de maneira transparente, sempre com o seu consentimento. Algumas informações podem ser coletadas automaticamente, como o uso de cookies e outras tecnologias de rastreamento.
        </Text>

        <Text className="font-semibold text-xl text-justify mt-8">
          2. Uso das Informações Pessoais
        </Text>
        <Text className="text-black-gray font-semibold text-md mt-4 text-justify">
          As informações pessoais coletadas serão utilizadas para os seguintes fins:
          {'\n \n'}<Text className='font-semibold text-black'>• Prestação de serviços:</Text> para processar pedidos, gerenciar entregas e realizar cobranças.
          {'\n \n'}<Text className='font-semibold text-black'>• Comunicação:</Text> para notificações, atualizações sobre o status dos pedidos, promoções e ofertas especiais.
          {'\n \n'}<Text className='font-semibold text-black'>• Segurança:</Text> para prevenir fraudes e garantir a integridade das transações realizadas no aplicativo.
          {'\n \n'}<Text className='font-semibold text-black'>• Melhoria do serviço:</Text> para analisar o uso do aplicativo e melhorar a experiência do usuário.
          {'\n \n'}Se você optou por receber notificações de marketing, podemos enviar promoções, novidades ou outros conteúdos relacionados aos nossos serviços. Você pode, a qualquer momento, optar por não receber essas mensagens.
        </Text>

        <Text className="font-semibold text-xl text-justify mt-8">
          2.1 Informações sensíveis de pagamentos
        </Text>
        <Text className="text-black-gray font-semibold text-md mt-4 text-justify">
          Para realizar um pagamento não presencial (que não seja via pix), você deverá cadastrar um cartão, seja ele de crédito ou débito no aplicativo Campus Eats. Siga as instruções da plataforma para inserir as informações necessárias.
          {'\n \n'}Fique tranquilo, pois suas informações de pagamento online não são armazenadas por nós, o pagamento é processado por uma financeira que fará o intermédio do pagamento. Assim, os dados completos de seus cartões não ficam armazenados em nossas bases e suas transações online são feitas com o mais alto padrão de segurança.
        </Text>

        <Text className="font-semibold text-xl text-justify mt-8">
          3. Direitos dos Usuários em conformidade com a LGPD
        </Text>
        <Text className="text-black-gray font-semibold text-md mt-4 text-justify">
          A Lei Geral de Proteção de Dados (LGPD), assegura a você os seguintes direitos em relação aos seus dados pessoais:
          {'\n \n'}<Text className='font-semibold text-black'>• Acesso:</Text> solicitar informações sobre os dados pessoais que temos sobre você.
          {'\n \n'}<Text className='font-semibold text-black'>• Correção:</Text> solicitar a correção de dados incompletos, inexatos ou desatualizados.
          {'\n \n'}<Text className='font-semibold text-black'>• Exclusão:</Text> solicitar a exclusão total de seus dados pessoais, salvo em situações onde a manutenção é obrigatória por lei.
          {'\n \n'}<Text className='font-semibold text-black'>• Portabilidade:</Text> solicitar a transferência dos seus dados para outro serviço ou fornecedor, quando aplicável.
          {'\n \n'}<Text className='font-semibold text-black'>• Revogação do consentimento:</Text> você pode retirar seu consentimento para o uso de dados pessoais a qualquer momento, exceto nos casos onde o tratamento é necessário para cumprir com uma obrigação legal.
          {'\n \n'}<Text className='font-semibold text-black'>• Oposição:</Text> você pode se opor ao tratamento dos seus dados pessoais para determinadas finalidades, como marketing direto.
          {'\n \n'}Se desejar exercer qualquer um desses direitos, por favor, entre em contato conosco através dos canais informados na guia de suporte.
        </Text>

        <Text className="font-semibold text-xl text-justify mt-8">
          4. Termos de Responsabilidade do usuário
        </Text>
        <Text className="text-black-gray font-semibold text-md mt-4 text-justify">
          Ao utilizar o nosso aplicativo, você concorda com os seguintes termos de responsabilidade:
          {'\n \n'}<Text className='font-semibold text-black'>• 4.1 Veracidade das informações:</Text> você é responsável por fornecer informações precisas, verdadeiras e completas ao utilizar o nosso aplicativo, como endereço de entrega, dados de pagamento e informações de contato.
          {'\n \n'}<Text className='font-semibold text-black'>• 4.2 Disponibilidade para receber seus pedidos:</Text> você é responsável por estar pronto em tempo hábil para receber seus pedidos não fazendo o entregador esperar mais do que o necessário.
          {'\n \n'}<Text className='font-semibold text-black'>• 4.3 Seguir normas de conduta:</Text> você é responsável por seguir uma conduta adequada com os colaboradores, sejam dos restaurantes, suporte ou entregadores. É importante que se mantenha sempre o respeito.
          {'\n \n'}<Text className='font-semibold text-black'>• 4.4 Conferir pedidos e pagamentos:</Text> antes de confirmar um pagamento, confira se estão certos todos os itens do seu pedido, não poderemos cancelar pedidos ou aceitar devoluções após serem entregues, nesses casos não haverá nenhum tipo de reembolso.
          {'\n \n'}<Text className='font-semibold text-black'>• 4.5 Respeitar as diretrizes do aplicativo e sua política de cancelamento:</Text> os casos onde será possível cancelar um pedido estão especificados no tópico Política de Cancelamento, e devem ser respeitadas as normas da empresa.
          {'\n \n'}<Text className='font-semibold text-black'>• 4.6 Responsabilidade legal:</Text> o usuário não deve em momento algum utilizar dos meios fornecidos pelo aplicativo para exercer qualquer tipo de atividade ilegal, qualquer movimentação suspeita percebida pode gerar o banimento do aplicativo.
        </Text>

        <Text className="font-semibold text-xl text-justify mt-8">
          5. Política de cancelamento
        </Text>
        <Text className="text-black-gray font-semibold text-md mt-4 text-justify">
          x {'\n'} x {'\n'} x {'\n'} x {'\n'} x {'\n'} x {'\n'} x {'\n'} x
        </Text>

        <Text className="font-semibold text-xl text-justify mt-8">
          6. Alterações nos Termos e Política de Privacidade
        </Text>
        <Text className="text-black-gray font-semibold text-md mt-4 text-justify">
          O Campus Eats pode atualizar este documento periodicamente. Quaisquer alterações serão comunicadas por meio do aplicativo ou enviados para o seu e-mail cadastrado.
        </Text>

        <Text className="font-semibold text-xl text-justify mt-8">
          7. Contatos
        </Text>
        <Text className="text-black-gray font-semibold text-md mt-4 text-justify">
          Caso tenha dúvidas sobre nossa Política de Privacidade ou os Termos de Uso, entre em contato conosco através de:
          {'\n \n'}<Text className='font-semibold text-black'>• E-mail:</Text> campuseats@gmail.com
          {'\n \n'}<Text className='font-semibold text-black'>• Telefone:</Text> (84) 99988-7766
          {'\n \n'}<Text className='font-semibold text-black'>• Endereço:</Text> Rua 1 do lado da rua 2
        </Text>
          </View>
        </ScrollView>
      </View>
      <Footer />
    </View>
  );
}
