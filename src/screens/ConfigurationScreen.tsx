import { useEffect, useRef, useState } from "react";
import Toast from "react-native-toast-message";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Checkbox, RadioButton } from "react-native-paper";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { GooglePlacesAutocompleteRef, Styles } from "react-native-google-places-autocomplete";
import { Ionicons } from "@expo/vector-icons";

import { ConfigurationSection } from "src/components/ConfigurationSection";
import { GoogleAutocompleteInput } from "src/components/GoogleAutocompleteInput";
import { useError } from "src/contexts/modal.context";
import { RootStackParamList } from "src/types/navigation";
import { useRequiredUserRegistration } from "src/contexts/registration.context";
import { CollectionDay, CollectionDayLabelPTBR, CollectionDaySchema, CollectionDays, CollectionShift, CollectionShiftLabelPTBR, CollectionShiftSchema, UserRegistration } from "src/types";

type SetupScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Configuration'>;

export function ConfigurationScreen() {
    const { showError } = useError();
    const { registration, updateRegistration } = useRequiredUserRegistration();
    const [ collectionDays, setCollectionDays ] = useState<CollectionDays>(registration.collectionDays);
    const [ collectionShift, setCollectionShift ] = useState<CollectionShift>(registration.collectionShift);
    const ref = useRef<GooglePlacesAutocompleteRef | null>(null);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const pendingDaysRef = useRef<CollectionDays>(registration.collectionDays);
    const debounceShiftRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const pendingShiftRef = useRef<CollectionShift>(registration.collectionShift);
    const navigation = useNavigation<SetupScreenNavigationProp>();

    useEffect(() => {
        setCollectionDays(registration.collectionDays);
    }, [registration.collectionDays]);

    useEffect(() => {
        setCollectionShift(registration.collectionShift);
    }, [registration.collectionShift]);

    function handleDayToggle(day: CollectionDay) {
        const next = collectionDays.includes(day)
            ? collectionDays.filter(d => d !== day)
            : [...collectionDays, day];

        if (next.length === 0) return;

        setCollectionDays(next);
        pendingDaysRef.current = next;

        if (debounceRef.current) clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(async () => {
            const updated: UserRegistration = { ...registration, collectionDays: pendingDaysRef.current };
            const saved = await updateRegistration(updated);
            if (saved) {
                Toast.show({
                    type: "success",
                    text1: "Preferências salvas",
                    text2: "Seus dias de coleta foram atualizados.",
                });
            } else {
                Toast.show({
                    type: "error",
                    text1: "Erro ao salvar",
                    text2: "Não foi possível salvar sua preferência de dias de coleta. Tente novamente.",
                });
                setCollectionDays(registration.collectionDays);
            }
        }, 800);
    }

    function handleShiftChange(shift: CollectionShift) {
        setCollectionShift(shift);
        pendingShiftRef.current = shift;

        if (debounceShiftRef.current) clearTimeout(debounceShiftRef.current);

        debounceShiftRef.current = setTimeout(async () => {
            const updated: UserRegistration = { ...registration, collectionShift: pendingShiftRef.current };
            const saved = await updateRegistration(updated);
            if (saved) {
                Toast.show({
                    type: "success",
                    text1: "Preferências salvas",
                    text2: "Seu horário de coleta foi atualizado.",
                });
            } else {
                Toast.show({
                    type: "error",
                    text1: "Erro ao salvar",
                    text2: "Não foi possível salvar seu horário de coleta. Tente novamente.",
                });
                setCollectionShift(registration.collectionShift);
            }
        }, 800);
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
                title="Coleta"
                description="Dias de coleta na sua rua"
            >
                {CollectionDaySchema.options.map(day => (
                    <TouchableOpacity
                        key={day}
                        style={styles.itemContainer}
                        onPress={() => handleDayToggle(day)}
                    >
                        <Text style={styles.daysListContainer}>{CollectionDayLabelPTBR[day].toUpperCase()}</Text>
                        <View style={styles.itemSwitch}>
                            <Checkbox
                                status={collectionDays.includes(day) ? "checked" : "unchecked"}
                                onPress={() => handleDayToggle(day)}
                                color="#0FAD83"
                            />
                        </View>
                    </TouchableOpacity>
                ))}
            </ConfigurationSection>
            <ConfigurationSection
                nameIcon="time"
                title="Horário da coleta"
                description="Período em que a coleta passa"
            >
                {CollectionShiftSchema.options.map(shift => (
                    <TouchableOpacity
                        key={shift}
                        style={styles.itemContainer}
                        onPress={() => handleShiftChange(shift)}
                    >
                        <Text style={styles.daysListContainer}>{CollectionShiftLabelPTBR[shift].toUpperCase()}</Text>
                        <View style={styles.itemSwitch}>
                            <RadioButton
                                value={shift}
                                status={collectionShift === shift ? "checked" : "unchecked"}
                                onPress={() => handleShiftChange(shift)}
                                color="#0FAD83"
                            />
                        </View>
                    </TouchableOpacity>
                ))}
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