import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "node_modules/@react-navigation/native-stack/lib/typescript/src/types";
import { Button, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyledButton } from "src/components/StyledButton";
import { RootStackParamList } from "src/types/navigation";

type SetupScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Setup'>;

export function TermsOfService() {
    const navigation = useNavigation<SetupScreenNavigationProp>();

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.documentContainer}>
                <Text style={styles.title}>TERMO DE USO E RESPONSABILIDADE</Text>
                <ScrollView>
                    <Text style={styles.subtitle}>1. ACEITAÇÃO DOS TERMOS</Text>
                    <Text style={styles.description}>
                        O presente Termo de Uso se refere a um contrato de adesão firmado entre o usuário e o fornecedor deste serviço, a empresa SINAURB SERVIÇOS E EMPREENDIMENTOS LTDA, localizada na Avenida Amazonas, 2280, Sala 01 - Barro Preto, Belo Horizonte / MG, CEP: 30.180-012.
                        O uso deste serviço está condicionado à aceitação dos termos e das políticas associadas. O usuário deverá ler tais termos e políticas, certificar-se de havê-los entendido, concordar com todas as condições estabelecidas no Termo de Uso e se comprometer a cumpri-las.
                        {"\n"}{"\n"}
                        Ao utilizar o serviço, o usuário manifesta sua livre, expressa e inequívoca concordância com relação ao conteúdo deste Termo de Uso e estará legalmente vinculado a todas as condições aqui previstas.
                    </Text>

                    <Text style={styles.subtitle}>2. DEFINIÇÕES DO TERMO DE USO</Text>
                    <Text style={styles.description}>
                        Para os fins deste Termo de Uso, são aplicáveis as seguintes definições:
                        {"\n"}{"\n"}
                        - Códigos maliciosos: são qualquer programa de computador, ou parte de um programa, construído com a intenção de provocar danos, obter - informações não autorizadas ou interromper o funcionamento de sistemas e/ou redes de computadores;
                        {"\n"}{"\n"}
                        - Internet: o sistema constituído do conjunto de protocolos lógicos, estruturado em escala mundial para uso público e irrestrito, com a finalidade de possibilitar a comunicação de dados entre terminais por meio de diferentes redes;
                        {"\n"}{"\n"}
                        - Sítios e aplicativos: sítios e aplicativos por meio dos quais o usuário acessa os serviços e os conteúdos disponibilizados;
                        {"\n"}{"\n"}
                        - Terceiro: pessoa ou entidade que não participa diretamente em um contrato, em um ato jurídico ou em um negócio, ou que, para além das partes envolvidas, pode ter interesse num processo jurídico.
                        {"\n"}{"\n"}
                        - Usuários (ou "Usuário", quando individualmente considerado): todas as pessoas naturais que utilizarem o serviço (citar o serviço).
                    </Text>

                    <Text style={styles.subtitle}>3. ARCABOUÇO LEGAL</Text>
                    <Text style={styles.description}>
                        O arcabouço legal aplicável ao serviço Sua Cidade Mais Limpa compreende os seguintes atos legislativos e normativos:
                        {"\n"}{"\n"}
                        - Lei nº 13.460, de 26 de junho de 2017 - Dispõe sobre participação, proteção e defesa dos direitos do usuário dos serviços públicos da administração pública.
                        {"\n"}{"\n"}
                        - Lei nº 13.709, de 14 de agosto de 2018 - Dispõe sobre o tratamento de dados pessoais, inclusive nos meios digitais, por pessoa natural ou por pessoa jurídica de direito público ou privado, com o objetivo de proteger os direitos fundamentais de liberdade e de privacidade e o livre desenvolvimento da personalidade da pessoa natural.
                        {"\n"}{"\n"}
                        - Decreto nº 7.724, de 16 de maio de 2012 - Regulamenta a Lei nº 12.527, de 18 de novembro de 2011 (Lei de Acesso à Informação), que dispõe sobre o acesso a informações previsto na Constituição.
                        {"\n"}{"\n"}
                        - Lei nº 13.460, de 26 de junho de 2017 - Defesa dos Direitos dos Usuários do Serviço Público.
                    </Text>
                    <Text style={styles.subtitle}>4. DESCRIÇÃO DO SERVIÇO</Text>
                    <Text style={styles.description}>
                        TODO: Implementar
                    </Text>

                    <Text style={styles.subtitle}>5. DIREITOS DO USUÁRIO</Text>
                    <Text style={styles.description}>
                        O usuário do serviço possui os seguintes direitos, conferidos pela Lei de Proteção de Dados Pessoais:
                        {"\n"}{"\n"}
                        - Direito de confirmação e acesso (Art. 18, I e II): é o direito do usuário de obter do serviço a confirmação de que os dados pessoais que lhe digam respeito são ou não pessoais.
                        {"\n"}{"\n"}
                        - Direito de retificação (Art. 18, III): é o direito de solicitar a correção de dados incompletos, inexatos ou desatualizados.
                        {"\n"}{"\n"}
                        - Direito à limitação do tratamento dos dados (Art. 18, IV): é o direito do usuário de limitar o tratamento de seus dados pessoais, podendo exigir a eliminação de dados desnecessários, excessivos ou tratados em desconformidade com o disposto na Lei Geral de Proteção de Dados.
                        {"\n"}{"\n"}
                        - Direito de oposição (Art. 18, § 2º): é o direito do usuário de, a qualquer momento, se opor ao tratamento de dados por motivos relacionados com a sua situação particular, com fundamento em uma das hipóteses de dispensa de consentimento ou em caso de descumprimento ao disposto na Lei Geral de Proteção de Dados.
                        {"\n"}{"\n"}
                        - Direito de portabilidade dos dados (Art. 18, V): é o direito do usuário de realizar a portabilidade dos dados a outro fornecedor de serviço ou produto, mediante requisição expressa, de acordo com a regulamentação da autoridade nacional, observados os segredos comercial e industrial.
                        {"\n"}{"\n"}
                        - Direito de não ser submetido a decisões automatizadas (Art. 20, LGPD): o titular dos dados tem direito a solicitar a revisão de decisões tomadas unicamente com base em tratamento automatizado de dados pessoais que afetem seus interesses, incluídas as decisões destinadas a definir o seu perfil pessoal, profissional, de consumo e de crédito ou os aspectos de sua personalidade.
                    </Text>

                    <Text style={styles.subtitle}>6. RESPONSABILIDADES DO USUÁRIO</Text>
                    <Text style={styles.description}>
                        Usuário se responsabiliza pela precisão e veracidade dos dados informados no cadastro e reconhece que a inconsistência de tais dados poderá implicar a impossibilidade de utilizar serviços da Plataforma.
                        {"\n"}{"\n"}
                        O login e senha só poderão ser utilizados pelo usuário cadastrado. O usuário deve manter o sigilo da senha, que é pessoal e intransferível, não sendo possível, em qualquer hipótese, a alegação de uso indevido após o ato de compartilhamento.
                        {"\n"}{"\n"}
                        O usuário da Plataforma é responsável pela atualização das suas informações pessoais e pelas consequências em caso de omissão ou erros nas informações pessoais cadastradas.
                        {"\n"}{"\n"}
                        O Usuário é responsável pela reparação de todos e quaisquer danos, diretos ou indiretos (inclusive decorrentes de violação de quaisquer direitos de outros usuários e de terceiros, inclusive direitos de propriedade intelectual, de sigilo e de personalidade), que sejam causados à SINAURB SERVIÇOS E EMPREENDIMENTOS LTDA, a qualquer outro usuário, ou, ainda, a qualquer terceiro, inclusive em virtude do descumprimento do disposto nestes Termos de Uso e Política de Privacidade ou de qualquer ato praticado a partir de seu acesso à Internet, ao sítio e/ou aplicativo.
                        {"\n"}{"\n"}
                        O usuário não deve interferir no serviço, tampouco comprometê-lo ou interrompê-lo. O usuário não deve igualmente interferir, comprometer ou interromper servidores ou redes conectadas ao serviço, inclusive por meio da transmissão de qualquer malware, worm, vírus, spyware, ou qualquer outro código de natureza destrutiva ou perturbadora. O usuário não pode inserir conteúdo ou códigos, ou de outra forma alterar ou interferir na maneira como a página do serviço é exibida ou processada no dispositivo do usuário.
                        {"\n"}{"\n"}
                        A SINAURB SERVIÇOS E EMPREENDIMENTOS LTDA não poderá ser responsabilizada pelos seguintes fatos:
                        {"\n"}{"\n"}
                        - equipamento infectado ou invadido por atacantes;
                        {"\n"}{"\n"}
                        - equipamento avariado no momento do consumo de serviços;
                        {"\n"}{"\n"}
                        - proteção do dispositivo de acesso do usuário ao serviço;
                        {"\n"}{"\n"}
                        - proteção das informações baseadas nos dispositivos de acesso dos usuários;
                        {"\n"}{"\n"}
                        - abuso de uso dos dispositivos de acesso dos usuários;
                        {"\n"}{"\n"}
                        - monitoração clandestina do dispositivo de acesso dos usuários;
                        {"\n"}{"\n"}
                        - vulnerabilidades ou instabilidades existentes nos sistemas dos usuários;
                        {"\n"}{"\n"}
                        - perímetro inseguro.
                        {"\n"}{"\n"}
                        O uso comercial das expressões utilizadas em aplicativos como marca, nome empresarial ou nome de domínio, além dos conteúdos do serviço, assim como os programas, bancos de dados, redes e arquivos que permitem que o usuário acesse sua conta, estão protegidos por leis e tratados internacionais de direito autoral, marcas, patentes, modelos e desenhos industriais.
                        {"\n"}{"\n"}
                        Ao acessar o aplicativo, os usuários declaram que irão respeitar todos os direitos de propriedade intelectual e os decorrentes da proteção de marcas, patentes e/ou desenhos industriais, depositados ou registrados em, bem como todos os direitos referentes a terceiros que porventura estejam, ou estiverem de alguma forma, disponíveis no serviço. O simples acesso ao serviço não confere aos usuários qualquer direito ao uso dos nomes, títulos, palavras, frases, marcas, patentes, imagens, dados e informações, dentre outras, que nele estejam ou estiverem disponíveis.
                        {"\n"}{"\n"}
                        A reprodução do conteúdo descrito anteriormente está proibida, salvo com prévia autorização por escrito ou caso se destinem ao uso exclusivamente pessoal e sem que em nenhuma circunstância os usuários adquiram qualquer direito sobre esse conteúdo.
                        {"\n"}{"\n"}
                        É vedada a utilização do serviço para finalidades comerciais, publicitárias ou qualquer outra que contrarie a finalidade para a qual foi concebido, conforme definido neste documento, sob pena de sujeição às sanções cabíveis na Lei nº 9.610, de 19 de fevereiro de 1998, que protege os direitos autorais no Brasil.
                        {"\n"}{"\n"}
                        Os visitantes e usuários assumem toda e qualquer responsabilidade, de caráter civil e/ou criminal, pela utilização indevida das informações, textos, gráficos, marcas, imagens, enfim, todo e qualquer direito de propriedade intelectual ou industrial do serviço.
                    </Text>

                    <Text style={styles.subtitle}>7. RESPONSABILIDADES DA SINAURB SERVIÇOS E EMPREENDIMENTOS LTDA</Text>
                    <Text style={styles.description}>
                        A SINAURB SERVIÇOS E EMPREENDIMENTOS LTDA, no papel de custodiante das informações pessoais dos usuários, deve cumprir todas as legislações inerentes ao uso correto dos dados pessoais do cidadão de forma a preservar a privacidade dos dados utilizados na plataforma.
                        {"\n"}{"\n"}
                        Tal dever inclui publicar e informar ao Usuário as futuras alterações a estes Termos de Uso e Política de Privacidade por meio do sítio (https://XXXXXX.COM.BR/), conforme o princípio da publicidade estabelecido no artigo 37, caput, da Constituição Federal.
                        {"\n"}{"\n"}
                        Em nenhuma hipótese, a SINAURB SERVIÇOS E EMPREENDIMENTOS LTDA será responsável pela instalação no equipamento do Usuário ou de terceiros, de códigos maliciosos (vírus, trojans, malware, worm, bot, backdoor, spyware, rootkit, ou de quaisquer outros que venham a ser criados), em decorrência da navegação na Internet pelo Usuário.
                        {"\n"}{"\n"}
                        Em hipótese alguma, o serviço e seus colaboradores responsabilizam-se por eventuais danos diretos, indiretos, emergentes, especiais, imprevistos ou multas causadas em matéria de responsabilidade, seja contratual, objetiva ou civil (inclusive negligência ou outras), decorrentes de qualquer forma de uso do serviço, mesmo que advertida a possibilidade de tais danos.
                        {"\n"}{"\n"}
                        Tendo em vista que o serviço lida com informações pessoais, o usuário concorda que não usará robôs, sistemas de varredura e armazenamento de dados (como “spiders” ou “scrapers”), links escondidos ou qualquer outro recurso escuso, ferramenta, programa, algoritmo ou método coletor/extrator de dados automático para acessar, adquirir, copiar ou monitorar o serviço, sem permissão expressa e por escrito do órgão.
                        {"\n"}{"\n"}
                        Em se tratando de aplicativos em dispositivos móveis, sua comercialização é expressamente proibida. Ao concordar com este Termo de Uso e utilizar o aplicativo móvel, o usuário receberá uma permissão do órgão para uso não comercial dos serviços oferecidos pelo aplicativo – o que, em nenhuma hipótese, fará dele proprietário do aplicativo móvel. Caso o usuário descumpra o Termo de Uso ou a Política de Privacidade, ou seja, investigado em razão de má conduta, o órgão poderá restringir seu acesso. O usuário também deverá responder legalmente por essa conduta.
                        {"\n"}{"\n"}
                        A SINAURB SERVIÇOS E EMPREENDIMENTOS LTDA poderá, quanto às ordens judiciais de pedido de informações, compartilhar informações necessárias para investigações ou tomar medidas relacionadas a atividades ilegais, suspeitas de fraude ou ameaças potenciais contra pessoas, bens ou sistemas que sustentam o serviço ou de outra forma necessária para cumprir com as obrigações legais. Caso ocorra, a Administração Pública notificará os titulares dos dados, salvo quando o processo estiver em segredo de justiça.
                        {"\n"}{"\n"}
                        A SINAURB SERVIÇOS E EMPREENDIMENTOS LTDA se compromete a preservar a funcionalidade do serviço ou aplicativo, utilizando um layout que respeite a usabilidade e navegabilidade, facilitando a navegação sempre que possível, e exibir as funcionalidades de maneira completa, precisa e suficiente, de modo que as operações realizadas no serviço sejam claras.
                    </Text>

                    <Text style={styles.subtitle}>8. POLÍTICA DE PRIVACIDADE</Text>
                    <Text style={styles.description}>
                        A Política de Privacidade estabelecida pela SINAURB SERVIÇOS E EMPREENDIMENTOS LTDA e utilizada pelo serviço Sua Cidade Mais Limpa trata sobre a utilização de dados pessoais.
                        {"\n"}{"\n"}
                        Tal Política específica, caso aplicável, fará parte, de forma inerente, do presente Termo de Uso, ressaltando-se que os dados pessoais tratados por esse serviço serão tratados nos termos da legislação em vigor.
                    </Text>

                    <Text style={styles.subtitle}>9. MUDANÇAS NO TERMO DE USO</Text>
                    <Text style={styles.description}>
                        A presente versão deste Termo de Uso foi atualizada pela última vez na data de: 12/09/2025.
                        {"\n"}{"\n"}
                        O editor se reserva o direito de modificar no site, a qualquer momento, as presentes normas, especialmente para adaptá-las às evoluções do serviço - seja pela disponibilização de novas funcionalidades, seja pela supressão ou pela modificação daquelas já existentes.
                        {"\n"}{"\n"}
                        O usuário será expressamente notificado em caso de alteração deste Termo de Uso.
                    </Text>

                    <Text style={styles.subtitle}>10. INFORMAÇÕES PARA CONTATO</Text>
                    <Text style={styles.description}>
                        Em caso de dúvidas relacionadas ao plano e/ou serviços entre em contato com (31) 3351-4703 - e-mail: suprimentos@sinaurb.com.br.
                    </Text>

                    <Text style={styles.subtitle}>11. FORO</Text>
                    <Text style={styles.description}>
                        Este Termo será regido pela legislação brasileira. Qualquer reclamação ou controvérsia com base neste Termo será dirimida exclusivamente pela Justiça Federal, na seção judiciária do domicílio do usuário, por previsão do artigo 109, §§ 1º, 2º e 3º da Constituição Federal.
                        {"\n"}{"\n"}
                        Sem prejuízo de qualquer outro meio extrajudicial ou judicial, todos os titulares de dados têm igualmente direito a peticionar ou a apresentar reclamação administrativa junto à Autoridade Nacional de Proteção de Dados.
                    </Text>

                    <StyledButton style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Text style={styles.backButtonText}>Voltar</Text>
                    </StyledButton>
                </ScrollView>
            </SafeAreaView>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
        paddingHorizontal: 15,
        backgroundColor: "#FFFFFF",
    },
    documentContainer: {
        flex: 1,
        paddingBottom: 30,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
    subtitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 5,
    },
    description: {
        fontSize: 14,
        marginBottom: 10,
    },
    backButton: {
        justifyContent: "center",
        alignItems: "center",
    },
    backButtonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
});