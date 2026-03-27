import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { RadioButton } from "react-native-paper";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { GooglePlacesAutocompleteRef, Styles } from "react-native-google-places-autocomplete";
import { Ionicons } from "@expo/vector-icons";

import { ConfigurationSection } from "src/components/ConfigurationSection";
import { GoogleAutocompleteInput } from "src/components/GoogleAutocompleteInput";
import { useError } from "src/hooks/useModal";
import { RootStackParamList } from "src/types/navigation";
import { useRequiredCurrentLocation } from "src/hooks/useCurrentLocation";
import { CollectionSchedule } from "src/types";

type SetupScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Configuration'>;

export function ConfigurationScreen() {
    const { showError } = useError();
    const { currentLocation, updateCollectionSchedule } = useRequiredCurrentLocation();
    const [ collectionSchedule, setCollectionSchedule ] = useState<CollectionSchedule>(currentLocation.collection_schedule);
    const ref = useRef<GooglePlacesAutocompleteRef | null>(null);
    const navigation = useNavigation<SetupScreenNavigationProp>();

    useEffect(() => {
        setCollectionSchedule(currentLocation.collection_schedule);
    }, [currentLocation.collection_schedule]);

    async function handleCollectionScheduleChange(newSchedule: CollectionSchedule) {
        setCollectionSchedule(newSchedule);

        const saved = await updateCollectionSchedule(newSchedule);
        if (!saved) {
            showError("Erro ao salvar", "Não foi possível salvar sua preferência de dias de coleta. Tente novamente.");
            setCollectionSchedule(currentLocation.collection_schedule);
        }
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
                    <Text style={styles.daysListContainer}>SEGUNDA, QUARTA, SEXTA</Text>
                    <View style={styles.itemSwitch}>
                        <RadioButton
                            value="first"
                            status={collectionSchedule === "SEG_QUA_SEX" ? 'checked' : 'unchecked'}
                            onPress={() => handleCollectionScheduleChange("SEG_QUA_SEX")}
                        />
                    </View>
                </View>
                <View style={styles.itemContainer}>
                    <Text style={styles.daysListContainer}>TERÇA, QUINTA, SÁBADO</Text>
                    <View style={styles.itemSwitch}>
                        <RadioButton
                            value="second"
                            status={collectionSchedule === "TER_QUI_SAB" ? 'checked' : 'unchecked'}
                            onPress={() => handleCollectionScheduleChange("TER_QUI_SAB")}
                        />
                    </View>
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
    daysListContainer: {
        fontWeight: "600",
        fontSize: 14,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
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