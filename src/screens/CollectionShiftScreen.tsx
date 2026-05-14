import React, { useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RadioButton } from "react-native-paper";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import Logo from "src/components/Logo";
import { RootStackParamList } from "src/types/navigation";
import { CollectionShift, CollectionShiftLabelPTBR, CollectionShiftSchema } from "src/types";
import { useError } from "src/hooks/useModal";
import UserMapper from "src/mapper/UserMapper";
import UserService from "src/service/UserService";
import { useCurrentLocation } from "src/hooks/useCurrentLocation";

type CollectionShiftRouteProp = RouteProp<RootStackParamList, "CollectionShift">;
type CollectionShiftScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "CollectionShift">;

export function CollectionShiftScreen() {
    const route = useRoute<CollectionShiftRouteProp>();
    const navigation = useNavigation<CollectionShiftScreenNavigationProp>();
    const { showError } = useError();
    const { clearData, createUserLocation } = useCurrentLocation();
    const [ selectedShift, setSelectedShift ] = useState<CollectionShift | null>(null);
    const [ isSaving, setIsSaving ] = useState(false);

    async function handleContinue() {
        if (!selectedShift) {
            showError("Atenção!", "Selecione o horário da coleta para continuar.");
            return;
        }

        if (isSaving) return;

        setIsSaving(true);

        try {
            const { selectedAddress, selectedDays } = route.params;
            const userCreated = await createUserLocation(selectedAddress, selectedDays, selectedShift);
            if (!userCreated) {
                showError("Erro ao salvar localização", "Não foi possível salvar sua localização. Verifique sua conexão com a internet e tente novamente mais tarde.");
                console.error("Falha ao salvar localização localmente. Provavelmente excedeu o tamanho máximo permitido localmente.");
            }
        } catch (error) {
            console.error("Erro ao criar usuário no servidor:", error);
            showError("Erro ao salvar localização", "Não foi possível salvar sua localização. Verifique sua conexão com a internet e tente novamente mais tarde.");
            clearData();
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={styles.card}>
                <Logo />
                <Text style={styles.title}>Horário da coleta</Text>
                <Text style={styles.description}>Selecione o período em que a coleta passa na sua rua:</Text>

                <View style={styles.scheduleContainer}>
                    {CollectionShiftSchema.options.map((shift, index) => (
                        <TouchableOpacity
                            key={shift}
                            style={[styles.scheduleOption, index > 0 && styles.scheduleOptionBorderTop]}
                            onPress={() => setSelectedShift(shift)}
                        >
                            <RadioButton
                                value={shift}
                                status={selectedShift === shift ? "checked" : "unchecked"}
                                onPress={() => setSelectedShift(shift)}
                                color="#0FAD83"
                            />
                            <Text style={styles.scheduleText}>{CollectionShiftLabelPTBR[shift]}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.buttonsRow}>
                    <TouchableOpacity
                        style={[styles.buttonContainer, styles.backButton]}
                        onPress={() => navigation.goBack()}
                        disabled={isSaving}
                    >
                        <Text style={styles.backButtonText}>Voltar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.buttonContainer, isSaving && styles.buttonDisabled]}
                        onPress={handleContinue}
                        disabled={isSaving}
                    >
                        <Text style={styles.buttonText}>{isSaving ? "Salvando..." : "Finalizar"}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#EBFAF5",
        padding: 16,
    },
    card: {
        backgroundColor: "white",
        borderRadius: 30,
        padding: 30,
        width: "100%",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.05,
        shadowRadius: 11.6,
        elevation: 4,
    },
    title: {
        marginTop: 15,
        fontSize: 30,
        fontWeight: "700",
        marginBottom: 8,
        textAlign: "center",
    },
    description: {
        fontSize: 14,
        color: "#555",
        textAlign: "center",
        marginBottom: 12,
    },
    scheduleContainer: {
        marginTop: 8,
        borderWidth: 1,
        borderColor: "#E4E4E4",
        borderRadius: 13,
        overflow: "hidden",
        backgroundColor: "#FAFAFA",
    },
    scheduleOption: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 6,
        paddingRight: 10,
    },
    scheduleOptionBorderTop: {
        borderTopWidth: 1,
        borderTopColor: "#E4E4E4",
    },
    scheduleText: {
        marginLeft: 2,
        fontSize: 14,
        fontWeight: "500",
    },
    buttonsRow: {
        marginTop: 20,
        flexDirection: "row",
        gap: 10,
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: "#0FAD83",
        borderRadius: 13,
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    buttonDisabled: {
        opacity: 0.7,
    },
    buttonText: {
        color: "white",
        fontWeight: "700",
        fontSize: 18,
        width: "100%",
        textAlign: "center",
    },
    backButton: {
        backgroundColor: "#F0F0F0",
        borderWidth: 1,
        borderColor: "#DDD",
    },
    backButtonText: {
        color: "#666",
        fontWeight: "700",
        fontSize: 18,
        width: "100%",
        textAlign: "center",
    },
});
