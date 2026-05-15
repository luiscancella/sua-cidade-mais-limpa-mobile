import React, { useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Checkbox } from "react-native-paper";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import Logo from "src/components/Logo";
import { RootStackParamList } from "src/types/navigation";
import { CollectionDay, CollectionDayLabelPTBR, CollectionDaySchema, CollectionDays } from "src/types";
import { useError } from "src/contexts/modal.context";

type CollectionScheduleRouteProp = RouteProp<RootStackParamList, "CollectionSchedule">;
type CollectionScheduleScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "CollectionSchedule">;

export function CollectionScheduleScreen() {
    const route = useRoute<CollectionScheduleRouteProp>();
    const navigation = useNavigation<CollectionScheduleScreenNavigationProp>();
    const { showError } = useError();
    const [ selectedDays, setSelectedDays ] = useState<CollectionDays>([]);

    function toggleDay(day: CollectionDay) {
        setSelectedDays(prev =>
            prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
        );
    }

    function handleContinue() {
        if (selectedDays.length === 0) {
            showError("Atenção!", "Selecione ao menos um dia da coleta para continuar.");
            return;
        }

        navigation.navigate("CollectionShift", {
            selectedAddress: route.params.selectedAddress,
            selectedDays,
        });
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={styles.card}>
                <Logo />
                <Text style={styles.title}>Dias da coleta</Text>
                <Text style={styles.description}>Selecione os dias em que a coleta passa na sua rua:</Text>

                <View style={styles.scheduleContainer}>
                    {CollectionDaySchema.options.map((day, index) => (
                        <TouchableOpacity
                            key={day}
                            style={[styles.scheduleOption, index > 0 && styles.scheduleOptionBorderTop]}
                            onPress={() => toggleDay(day)}
                        >
                            <Checkbox
                                status={selectedDays.includes(day) ? "checked" : "unchecked"}
                                onPress={() => toggleDay(day)}
                                color="#0FAD83"
                            />
                            <Text style={styles.scheduleText}>{CollectionDayLabelPTBR[day]}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.buttonsRow}>
                    <TouchableOpacity
                        style={[styles.buttonContainer, styles.backButton]}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.backButtonText}>Voltar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.buttonContainer}
                        onPress={handleContinue}
                    >
                        <Text style={styles.buttonText}>Continuar</Text>
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
