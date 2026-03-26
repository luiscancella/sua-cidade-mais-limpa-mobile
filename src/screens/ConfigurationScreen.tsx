import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Switch, Text, View, } from "react-native";
import { GooglePlacesAutocompleteRef, Styles } from "react-native-google-places-autocomplete";
import { SafeAreaView } from "react-native-safe-area-context";
import { ConfigurationSection } from "src/components/ConfigurationSection";
import { GoogleAutocompleteInput } from "src/components/GoogleAutocompleteInput";
import { useCurrentLocation } from "src/hooks/useCurrentLocation";
import { useError } from "src/hooks/useModal";
import { RootStackParamList } from "src/types/navigation";
import { set } from "zod";

type SetupScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Configuration'>;

export function ConfigurationScreen() {
    const { currentLocation, saveCurrentLocation } = useCurrentLocation();
    const { showError } = useError();
    const [garbageCollectionNotificationEnabled, setGarbageCollectionNotificationEnabled] = useState(false);
    const [newsEnabled, setNewsEnabled] = useState(false);
    const ref = useRef<GooglePlacesAutocompleteRef | null>(null);
    const navigation = useNavigation<SetupScreenNavigationProp>();

    useEffect(() => {
        // TODO: Implementar logica de mudança de botão
        console.log("Mudando o estado da notificação:", garbageCollectionNotificationEnabled);
    }, [garbageCollectionNotificationEnabled]);

    useEffect(() => {
        // TODO: Implementar logica de mudança de botão
        console.log("Mudando o estado das notícias:", newsEnabled);
    }, [newsEnabled]);

    function handleSwitchChange(value: boolean) {
        showError("Funcionalidade em desenvolvimento", "A configuração de notícias e atualizações ainda está em desenvolvimento e será lançada em breve. Fique atento às atualizações!");
        setGarbageCollectionNotificationEnabled(false);
        setNewsEnabled(false);
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Configurações</Text>
            <Text style={styles.addressSearchLabel}>Endereço Principal</Text>
            <GoogleAutocompleteInput
                ref={ref}
                icon={<Ionicons name="location" size={24} color="#4AB469" />}
                placeholder={"Buscar endereço"}
                styles={searchAddressStyles}
                updateCurrentLocationOnSelect={true}
                onError={() => showError("Erro ao selecionar endereço", "Não foi possível processar o endereço selecionado. Por favor tente novamente ou contate o suporte.")}
            />
            <ConfigurationSection
                nameIcon="notifications"
                title="Notificações"
                description="Alterar configurações de notificações"
            >
                <View style={styles.itemContainer}>
                    <Ionicons name="newspaper" size={20} color="black" style={styles.itemIcon} />
                    <Text style={styles.itemText}>Notícias e atualizações</Text>
                    <Switch
                        value={newsEnabled}
                        onValueChange={handleSwitchChange}
                        style={styles.itemSwitch}
                        thumbColor={newsEnabled ? '#f9f9f9' : '#e2e1e1ff'}
                        trackColor={{ false: '#C5C5C5', true: '#4AB469' }}
                    />
                </View>
                <View style={styles.itemContainer}>
                    <Ionicons name="alarm" size={20} color="black" style={styles.itemIcon} />
                    <Text style={styles.itemText}>Horários de coleta</Text>
                    <Switch
                        value={garbageCollectionNotificationEnabled}
                        onValueChange={handleSwitchChange}
                        style={styles.itemSwitch}
                        thumbColor={garbageCollectionNotificationEnabled ? '#f9f9f9' : '#e2e1e1ff'}
                        trackColor={{ false: '#C5C5C5', true: '#4AB469' }}
                    />
                </View>
            </ConfigurationSection>
            <ConfigurationSection
                nameIcon="information-circle"
                title="Termos e Serviços"
                onPress={() => navigation.navigate("TermsOfService")}
            >
            </ConfigurationSection>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        // backgroundColor: "#EBFAF5",
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 36,
        fontWeight: "700",
        marginBottom: 16,
        paddingLeft: 25,
    },
    addressSearchLabel: {
        fontSize: 16,
        fontWeight: "600",
        paddingLeft: 25,
        marginTop: 18,
    },
    itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 4,
        borderColor: "#E6E6E6",
        borderTopWidth: 1,
    },
    itemIcon: {
        marginLeft: 10,
    },
    itemText: {
        fontWeight: "600",
        fontSize: 14,
        marginLeft: 14,
        marginBottom: 1,
    },
    itemSwitch: {
        marginLeft: "auto",
        marginRight: 4
    }
});

const searchAddressStyles: Partial<Styles> = {
    container: {
        width: "90%",
        alignSelf: "center",
        marginTop: 3,
        marginBottom: 15,
    },
    textInputContainer: {
        backgroundColor: "#EFEFEF",
        borderRadius: 8,
        borderWidth: 0,
        height: 45,
    }
};