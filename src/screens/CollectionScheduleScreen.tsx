import React, { useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RadioButton } from "react-native-paper";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import Logo from "src/components/Logo";
import { RootStackParamList } from "src/types/navigation";
import { CollectionSchedule } from "src/types";
import { useError } from "src/hooks/useModal";
import UserMapper from "src/mapper/UserMapper";
import UserService from "src/service/UserService";
import { useCurrentLocation } from "src/hooks/useCurrentLocation";

type CollectionScheduleRouteProp = RouteProp<RootStackParamList, "CollectionSchedule">;
type CollectionScheduleScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "CollectionSchedule">;

export function CollectionScheduleScreen() {
    const route = useRoute<CollectionScheduleRouteProp>();
    const navigation = useNavigation<CollectionScheduleScreenNavigationProp>();
    const { showError } = useError();
    const { saveCurrentLocation, clearData } = useCurrentLocation();
    const [ collectionSchedule, setCollectionSchedule ] = useState<CollectionSchedule | null>(null);
    const [ isSaving, setIsSaving ] = useState(false);

    async function handleContinue() {
        if (!collectionSchedule) {
            showError("Atenção!", "Selecione os dias da coleta para continuar.");
            return;
        }

        if (isSaving) {
            return;
        }

        setIsSaving(true);

        try {
            const { selectedAddress } = route.params;
            const userToBeCreated = UserMapper.toCreateUserLocationRequest(selectedAddress);
            const response = await UserService.createUser(userToBeCreated);
            console.log("Usuário criado no servidor com sucesso.");
            const user = UserMapper.fromCreateResponse(response, selectedAddress, collectionSchedule);

            const result = await saveCurrentLocation(user);
            if (!result) {
                showError("Erro ao salvar localização", "Não foi possível salvar sua localização. Tente novamente mais tarde.");
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
                <Text style={styles.title}>Dias da coleta</Text>
                <Text style={styles.description}>Selecione os dias em que a coleta passa na sua rua:</Text>

                <View style={styles.scheduleContainer}>
                    <TouchableOpacity
                        style={styles.scheduleOption}
                        onPress={() => setCollectionSchedule("SEG_QUA_SEX")}
                    >
                        <RadioButton
                            value="SEG_QUA_SEX"
                            status={collectionSchedule === "SEG_QUA_SEX" ? "checked" : "unchecked"}
                            onPress={() => setCollectionSchedule("SEG_QUA_SEX")}
                            color="#0FAD83"
                        />
                        <Text style={styles.scheduleText}>Segunda, Quarta e Sexta</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.scheduleOption, styles.scheduleOptionBorderTop]}
                        onPress={() => setCollectionSchedule("TER_QUI_SAB")}
                    >
                        <RadioButton
                            value="TER_QUI_SAB"
                            status={collectionSchedule === "TER_QUI_SAB" ? "checked" : "unchecked"}
                            onPress={() => setCollectionSchedule("TER_QUI_SAB")}
                            color="#0FAD83"
                        />
                        <Text style={styles.scheduleText}>Terça, Quinta e Sábado</Text>
                    </TouchableOpacity>
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
