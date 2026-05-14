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
import { useError } from "src/hooks/useModal";
import { RootStackParamList } from "src/types/navigation";
import { useRequiredCurrentLocation } from "src/hooks/useCurrentLocation";
import { CollectionDay, CollectionDayLabelPTBR, CollectionDaySchema, CollectionSchedule, CollectionShift, CollectionShiftLabelPTBR, CollectionShiftSchema } from "src/types";

type SetupScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Configuration'>;

export function ConfigurationScreen() {
    const { showError } = useError();
    const { currentLocation, updateCollectionSchedule, updateCollectionShift } = useRequiredCurrentLocation();
    const [ collectionSchedule, setCollectionSchedule ] = useState<CollectionSchedule>(currentLocation.collection_schedule);
    const [ collectionShift, setCollectionShift ] = useState<CollectionShift>(currentLocation.collection_shift);
    const ref = useRef<GooglePlacesAutocompleteRef | null>(null);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const pendingScheduleRef = useRef<CollectionSchedule>(currentLocation.collection_schedule);
    const navigation = useNavigation<SetupScreenNavigationProp>();

    useEffect(() => {
        setCollectionSchedule(currentLocation.collection_schedule);
    }, [currentLocation.collection_schedule]);

    useEffect(() => {
        setCollectionShift(currentLocation.collection_shift);
    }, [currentLocation.collection_shift]);

    function handleDayToggle(day: CollectionDay) {
        const next = collectionSchedule.includes(day)
            ? collectionSchedule.filter(d => d !== day)
            : [...collectionSchedule, day];

        if (next.length === 0) return;

        setCollectionSchedule(next);
        pendingScheduleRef.current = next;

        if (debounceRef.current) clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(async () => {
            const saved = await updateCollectionSchedule(pendingScheduleRef.current);
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
                setCollectionSchedule(currentLocation.collection_schedule);
            }
        }, 800);
    }

    async function handleShiftChange(shift: CollectionShift) {
        setCollectionShift(shift);
        const saved = await updateCollectionShift(shift);
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
            setCollectionShift(currentLocation.collection_shift);
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
                                status={collectionSchedule.includes(day) ? "checked" : "unchecked"}
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